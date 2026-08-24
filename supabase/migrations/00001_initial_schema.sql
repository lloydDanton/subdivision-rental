-- ============================================================
-- Migration: 00001_initial_schema.sql
-- Project:   SubdivisionStay
-- Database:  Supabase PostgreSQL
-- Purpose:   Create all initial tables, constraints, indexes,
--            and Row Level Security policies.
--
-- Tables created (in dependency order):
--   1. profiles          — application user profiles (linked to Supabase Auth)
--   2. properties        — rental property listings
--   3. amenities         — master list of amenities
--   4. property_amenities — junction: properties ↔ amenities
--   5. bookings          — rental booking records
--   6. reviews           — guest reviews for completed bookings
--
-- IMPORTANT:
--   - Passwords are NOT stored here. Supabase Auth manages credentials.
--   - The C++ backend connects with the service_role key and bypasses RLS.
--   - RLS is a secondary safety boundary, not the primary auth layer.
--   - All booking conflict logic belongs in the C++ BookingService.
-- ============================================================


-- ============================================================
-- EXTENSIONS
-- ============================================================

-- pgcrypto: used for gen_random_uuid() if uuid-ossp is unavailable
-- uuid-ossp is the Supabase default; we enable both for compatibility.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ============================================================
-- 1. PROFILES
-- ============================================================
-- Stores application-specific user data.
-- Each row corresponds to exactly one Supabase Auth user.
-- The id is the UUID issued by Supabase Auth (auth.users.id).
-- Passwords are NEVER stored here — Supabase Auth owns them.
--
-- C++ integration:
--   ProfileRepository.createProfile(id, full_name, role)
--   ProfileRepository.findById(id)
--   ProfileRepository.findByEmail(email)  -- joins auth.users for email
--   ProfileRepository.updateProfile(id, full_name)
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
    id            UUID        PRIMARY KEY,  -- matches auth.users.id exactly
    full_name     TEXT        NOT NULL CHECK (char_length(full_name) >= 2),
    role          TEXT        NOT NULL DEFAULT 'guest'
                              CHECK (role IN ('guest', 'owner', 'admin')),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  profiles              IS 'Application user profiles. Linked 1-to-1 with Supabase auth.users via id.';
COMMENT ON COLUMN profiles.id          IS 'UUID from auth.users — set on registration, never changes.';
COMMENT ON COLUMN profiles.full_name   IS 'Display name, minimum 2 characters.';
COMMENT ON COLUMN profiles.role        IS 'Application role: guest | owner | admin. Default is guest.';
COMMENT ON COLUMN profiles.created_at  IS 'Row creation timestamp (UTC).';
COMMENT ON COLUMN profiles.updated_at  IS 'Last update timestamp — maintained by trigger.';


-- ============================================================
-- 2. PROPERTIES
-- ============================================================
-- Represents a rental property listed inside a subdivision.
-- Every property must be owned by a profile with role = owner.
-- The role check is enforced by the C++ Service layer, not the DB,
-- to keep business logic centralized and testable.
--
-- C++ integration:
--   PropertyRepository.create(...)
--   PropertyRepository.findById(id)
--   PropertyRepository.findAll(filters)
--   PropertyRepository.search(location, guests, checkIn, checkOut)
--   PropertyRepository.update(id, fields)
--   PropertyRepository.deactivate(id)
-- ============================================================

CREATE TABLE IF NOT EXISTS properties (
    id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id        UUID        NOT NULL
                                REFERENCES profiles(id)
                                ON DELETE RESTRICT,
                                -- RESTRICT: cannot delete a profile that owns properties.
                                -- Prevents accidental data loss. Deactivate the profile first.
    title           TEXT        NOT NULL CHECK (char_length(title) >= 3),
    description     TEXT,
    house_number    TEXT,
    location        TEXT        NOT NULL CHECK (char_length(location) >= 3),
    price_per_night NUMERIC(10,2) NOT NULL
                                CHECK (price_per_night >= 0),
    bedrooms        INTEGER     NOT NULL DEFAULT 1
                                CHECK (bedrooms >= 0),
    bathrooms       INTEGER     NOT NULL DEFAULT 1
                                CHECK (bathrooms >= 0),
    max_guests      INTEGER     NOT NULL DEFAULT 1
                                CHECK (max_guests > 0),
    status          TEXT        NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending','available','unavailable','maintenance','inactive')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  properties                IS 'Rental property listings inside subdivisions.';
COMMENT ON COLUMN properties.owner_id       IS 'FK → profiles.id. The profile who listed the property.';
COMMENT ON COLUMN properties.price_per_night IS 'Nightly rate in PHP. Must be ≥ 0.';
COMMENT ON COLUMN properties.bedrooms       IS 'Bedroom count. Must be ≥ 0 (studio allowed).';
COMMENT ON COLUMN properties.bathrooms      IS 'Bathroom count. Must be ≥ 0.';
COMMENT ON COLUMN properties.max_guests     IS 'Maximum occupancy. Must be ≥ 1.';
COMMENT ON COLUMN properties.status         IS 'Listing state: pending | available | unavailable | maintenance | inactive.';
COMMENT ON COLUMN properties.house_number   IS 'Optional house/unit number within the subdivision.';


-- ============================================================
-- 3. AMENITIES
-- ============================================================
-- Master list of amenity types. Shared across all properties.
-- New amenities are added here; properties reference them via
-- the property_amenities junction table.
-- ============================================================

CREATE TABLE IF NOT EXISTS amenities (
    id          SERIAL      PRIMARY KEY,
    name        TEXT        NOT NULL UNIQUE CHECK (char_length(name) >= 2),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  amenities      IS 'Master list of available amenities (e.g., Wi-Fi, Pool).';
COMMENT ON COLUMN amenities.name IS 'Amenity display name. Must be unique.';


-- ============================================================
-- 4. PROPERTY_AMENITIES
-- ============================================================
-- Junction table linking properties to their amenities.
-- Composite PK prevents duplicate associations.
-- Both FK cascades are ON DELETE CASCADE:
--   - Deleting a property removes all its amenity links.
--   - Deleting an amenity removes all property links to it.
-- This is safe because the rows here have no independent meaning.
-- ============================================================

CREATE TABLE IF NOT EXISTS property_amenities (
    property_id UUID    NOT NULL
                        REFERENCES properties(id)
                        ON DELETE CASCADE,
                        -- CASCADE: removing a property cleans up its amenity links.
    amenity_id  INTEGER NOT NULL
                        REFERENCES amenities(id)
                        ON DELETE CASCADE,
                        -- CASCADE: removing an amenity type cleans up all its links.
    PRIMARY KEY (property_id, amenity_id)
);

COMMENT ON TABLE property_amenities IS 'Junction table: many-to-many between properties and amenities.';


-- ============================================================
-- 5. BOOKINGS
-- ============================================================
-- Records a guest's reservation of a property for a date range.
--
-- Booking conflict detection (overlapping dates) is intentionally
-- NOT implemented here as a trigger. The C++ BookingService will
-- query this table using the following overlap condition before
-- inserting a new booking:
--
--   SELECT COUNT(*) FROM bookings
--   WHERE property_id = $1
--     AND status IN ('pending', 'confirmed')
--     AND check_in  < $new_check_out
--     AND check_out > $new_check_in;
--
-- If COUNT > 0, the booking is rejected by the service.
-- Indexes on (property_id, check_in, check_out) make this fast.
--
-- C++ integration:
--   BookingRepository.create(...)
--   BookingRepository.findById(id)
--   BookingRepository.findByProperty(property_id)
--   BookingRepository.findByGuest(guest_id)
--   BookingRepository.findOverlappingBookings(property_id, checkIn, checkOut)
--   BookingRepository.updateStatus(id, status)
-- ============================================================

CREATE TABLE IF NOT EXISTS bookings (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID        NOT NULL
                            REFERENCES properties(id)
                            ON DELETE RESTRICT,
                            -- RESTRICT: bookings are historical records.
                            -- A property cannot be deleted while bookings exist.
    guest_id    UUID        NOT NULL
                            REFERENCES profiles(id)
                            ON DELETE RESTRICT,
                            -- RESTRICT: guest profile cannot be deleted while
                            -- booking history exists.
    check_in    DATE        NOT NULL,
    check_out   DATE        NOT NULL,
    guests      INTEGER     NOT NULL CHECK (guests > 0),
    total_price NUMERIC(10,2) NOT NULL CHECK (total_price >= 0),
    status      TEXT        NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending','confirmed','rejected','cancelled','completed')),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- check_out must be strictly after check_in (minimum 1 night)
    CONSTRAINT booking_dates_valid CHECK (check_out > check_in)
);

COMMENT ON TABLE  bookings             IS 'Guest rental booking records.';
COMMENT ON COLUMN bookings.property_id IS 'FK → properties.id. The booked property.';
COMMENT ON COLUMN bookings.guest_id    IS 'FK → profiles.id. The guest who made the booking.';
COMMENT ON COLUMN bookings.check_in    IS 'Arrival date (inclusive).';
COMMENT ON COLUMN bookings.check_out   IS 'Departure date (exclusive). Must be after check_in.';
COMMENT ON COLUMN bookings.guests      IS 'Number of guests. Must be > 0.';
COMMENT ON COLUMN bookings.total_price IS 'Calculated total at time of booking. Must be ≥ 0.';
COMMENT ON COLUMN bookings.status      IS 'Booking lifecycle: pending|confirmed|rejected|cancelled|completed.';


-- ============================================================
-- 6. REVIEWS
-- ============================================================
-- A guest can leave one review per booking.
-- The C++ ReviewService will verify:
--   1. The booking belongs to the authenticated guest.
--   2. The booking status is 'completed'.
--   3. No review already exists for this booking.
-- The database enforces constraint #3 via UNIQUE(booking_id).
--
-- C++ integration:
--   ReviewRepository.create(property_id, guest_id, booking_id, rating, comment)
--   ReviewRepository.findByProperty(property_id)
--   ReviewRepository.findByBooking(booking_id)
-- ============================================================

CREATE TABLE IF NOT EXISTS reviews (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID        NOT NULL
                            REFERENCES properties(id)
                            ON DELETE RESTRICT,
                            -- RESTRICT: preserve review history if property is deactivated.
    guest_id    UUID        NOT NULL
                            REFERENCES profiles(id)
                            ON DELETE RESTRICT,
    booking_id  UUID        NOT NULL
                            REFERENCES bookings(id)
                            ON DELETE RESTRICT,
                            -- RESTRICT: do not silently delete reviews when bookings change.
    rating      INTEGER     NOT NULL
                            CHECK (rating BETWEEN 1 AND 5),
    comment     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- One review per booking. Enforced at the DB level.
    CONSTRAINT reviews_booking_id_unique UNIQUE (booking_id)
);

COMMENT ON TABLE  reviews            IS 'Guest reviews for completed bookings. One review per booking.';
COMMENT ON COLUMN reviews.rating     IS 'Integer rating 1–5 (1 = worst, 5 = best).';
COMMENT ON COLUMN reviews.booking_id IS 'FK → bookings.id. UNIQUE — prevents duplicate reviews.';


-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================
-- Automatically maintains updated_at timestamps on any table
-- that has the column. Attach with CREATE TRIGGER below.
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Attach to profiles
CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Attach to properties
CREATE TRIGGER trg_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Attach to bookings
CREATE TRIGGER trg_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ============================================================
-- INDEXES
-- ============================================================
-- Only indexes that provide real query value are created.
-- Primary keys are automatically indexed by PostgreSQL.
-- ============================================================

-- profiles.role
-- Purpose: Dashboard/admin queries that filter users by role
--          (e.g., list all owners, find admins).
CREATE INDEX IF NOT EXISTS idx_profiles_role
    ON profiles(role);

-- properties.owner_id
-- Purpose: "Find all properties owned by user X" — used by the
--          owner dashboard and PropertyRepository.findByOwner().
CREATE INDEX IF NOT EXISTS idx_properties_owner_id
    ON properties(owner_id);

-- properties.status
-- Purpose: The most common filter — "show only available properties"
--          is on every browse/search query.
CREATE INDEX IF NOT EXISTS idx_properties_status
    ON properties(status);

-- properties.location (text_pattern_ops)
-- Purpose: Enables fast LIKE/prefix search on location text.
--          PropertyRepository.search() filters by location substring.
CREATE INDEX IF NOT EXISTS idx_properties_location
    ON properties USING btree(location text_pattern_ops);

-- bookings.property_id
-- Purpose: "Find all bookings for property X" — used by
--          BookingRepository.findByProperty() and the overlap query.
CREATE INDEX IF NOT EXISTS idx_bookings_property_id
    ON bookings(property_id);

-- bookings.guest_id
-- Purpose: "Find all bookings by guest X" — used by
--          BookingRepository.findByGuest() and guest dashboard.
CREATE INDEX IF NOT EXISTS idx_bookings_guest_id
    ON bookings(guest_id);

-- bookings.check_in + check_out (composite)
-- Purpose: Critical for the overlap detection query in C++ BookingService.
--          Queries filter by property_id + date range simultaneously.
--          Composite index covers both columns in one scan.
CREATE INDEX IF NOT EXISTS idx_bookings_dates
    ON bookings(property_id, check_in, check_out);

-- bookings.status
-- Purpose: Overlap check filters by status IN ('pending','confirmed').
--          Dashboard queries filter by status (e.g., upcoming = confirmed).
CREATE INDEX IF NOT EXISTS idx_bookings_status
    ON bookings(status);

-- reviews.property_id
-- Purpose: "Find all reviews for property X" — used on the
--          property details page and ReviewRepository.findByProperty().
CREATE INDEX IF NOT EXISTS idx_reviews_property_id
    ON reviews(property_id);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================
-- RLS is enabled on all tables.
-- The C++ backend connects using the service_role key, which
-- bypasses RLS entirely — so all business logic stays in C++.
-- RLS policies below serve as a database-level safety net,
-- protecting against direct Supabase client access.
--
-- Policy naming convention:
--   "<table>_<action>_<subject>"
-- ============================================================

-- ── Enable RLS on all tables ────────────────────────────────
ALTER TABLE profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties          ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities           ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities  ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings            ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews             ENABLE ROW LEVEL SECURITY;


-- ── PROFILES ────────────────────────────────────────────────

-- Any authenticated user can read any profile.
-- (Public names/roles are not sensitive; the UI uses this for display.)
CREATE POLICY "profiles_select_authenticated"
    ON profiles FOR SELECT
    TO authenticated
    USING (true);

-- A user can only insert their own profile row.
-- Prevents one user from creating profiles for others.
CREATE POLICY "profiles_insert_own"
    ON profiles FOR INSERT
    TO authenticated
    WITH CHECK (id = auth.uid());

-- A user can only update their own profile.
CREATE POLICY "profiles_update_own"
    ON profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

-- Profiles are never deleted via the client (use deactivation instead).
-- No DELETE policy = delete is denied for all non-service-role connections.


-- ── PROPERTIES ──────────────────────────────────────────────

-- Anyone (including anonymous users) can view available properties.
-- This allows the public browse page to work before login.
CREATE POLICY "properties_select_available_public"
    ON properties FOR SELECT
    TO anon, authenticated
    USING (status = 'available');

-- Authenticated owners can also see their own properties in any status.
-- (Allows an owner to see their 'pending' or 'inactive' listings.)
CREATE POLICY "properties_select_own_owner"
    ON properties FOR SELECT
    TO authenticated
    USING (owner_id = auth.uid());

-- Only authenticated users can insert a property.
-- The owner_id must match the authenticated user's ID.
-- Role = 'owner' check is enforced by C++ Service, not here.
CREATE POLICY "properties_insert_own"
    ON properties FOR INSERT
    TO authenticated
    WITH CHECK (owner_id = auth.uid());

-- Owners can only update their own properties.
CREATE POLICY "properties_update_own"
    ON properties FOR UPDATE
    TO authenticated
    USING (owner_id = auth.uid())
    WITH CHECK (owner_id = auth.uid());

-- No direct DELETE on properties. Use status = 'inactive' instead.


-- ── AMENITIES ───────────────────────────────────────────────

-- Amenities are public reference data. Anyone can read them.
CREATE POLICY "amenities_select_public"
    ON amenities FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only admins (via C++ service_role) can insert/update amenities.
-- No INSERT/UPDATE/DELETE policies for anon/authenticated clients.


-- ── PROPERTY_AMENITIES ──────────────────────────────────────

-- Anyone can read which amenities a property has.
CREATE POLICY "property_amenities_select_public"
    ON property_amenities FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only the property owner can manage their property's amenities.
CREATE POLICY "property_amenities_insert_own"
    ON property_amenities FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM properties p
            WHERE p.id = property_id
              AND p.owner_id = auth.uid()
        )
    );

CREATE POLICY "property_amenities_delete_own"
    ON property_amenities FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM properties p
            WHERE p.id = property_id
              AND p.owner_id = auth.uid()
        )
    );


-- ── BOOKINGS ────────────────────────────────────────────────

-- Guests can view their own bookings.
CREATE POLICY "bookings_select_own_guest"
    ON bookings FOR SELECT
    TO authenticated
    USING (guest_id = auth.uid());

-- Property owners can view bookings on their properties.
CREATE POLICY "bookings_select_own_owner"
    ON bookings FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM properties p
            WHERE p.id = property_id
              AND p.owner_id = auth.uid()
        )
    );

-- A guest can create a booking for themselves only.
-- Business logic (availability, overlap check) is in C++ BookingService.
CREATE POLICY "bookings_insert_own_guest"
    ON bookings FOR INSERT
    TO authenticated
    WITH CHECK (guest_id = auth.uid());

-- Guests may cancel their own pending/confirmed bookings.
-- Full status transition logic is enforced by C++ BookingService.
CREATE POLICY "bookings_update_own_guest"
    ON bookings FOR UPDATE
    TO authenticated
    USING (guest_id = auth.uid())
    WITH CHECK (guest_id = auth.uid());

-- No direct DELETE on bookings — bookings are permanent records.
-- Use status = 'cancelled' or 'rejected' instead.


-- ── REVIEWS ─────────────────────────────────────────────────

-- Reviews are public — anyone can read property reviews.
CREATE POLICY "reviews_select_public"
    ON reviews FOR SELECT
    TO anon, authenticated
    USING (true);

-- Guests can only insert reviews for their own bookings.
-- C++ ReviewService verifies booking is 'completed' before inserting.
CREATE POLICY "reviews_insert_own_guest"
    ON reviews FOR INSERT
    TO authenticated
    WITH CHECK (guest_id = auth.uid());

-- Reviews are immutable once submitted. No UPDATE or DELETE policies.


-- ============================================================
-- END OF MIGRATION 00001
-- ============================================================
