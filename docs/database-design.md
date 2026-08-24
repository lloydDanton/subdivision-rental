# SubdivisionStay — Database Design

**Phase 3 Documentation**
**Database:** Supabase PostgreSQL
**Project:** Subdivision House Rental & Booking Management System

---

## 1. Purpose

This document describes the PostgreSQL database schema used by SubdivisionStay. The database is hosted on Supabase and serves as the persistent data layer for the application.

**The final architecture is:**

```
React Frontend
      │
      │ HTTP/JSON
      ▼
C++ Backend  (Controllers → Services → Repositories)
      │
      │ PostgreSQL (libpq / service_role key)
      ▼
Supabase PostgreSQL
```

React does **not** query the database directly for application data. All data access goes through the C++ backend. Supabase Auth handles user credential management.

---

## 2. Technology

| Component | Technology |
|---|---|
| Database engine | PostgreSQL (via Supabase) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| C++ DB access | libpq (PostgreSQL C client library) |
| Migration format | Plain SQL — `supabase/migrations/` |

---

## 3. Tables

### 3.1 `profiles`

Stores application-specific user data. Linked 1-to-1 with `auth.users` via the same UUID.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY | Matches `auth.users.id` |
| `full_name` | TEXT | NOT NULL, length ≥ 2 | Display name |
| `role` | TEXT | NOT NULL, DEFAULT 'guest', CHECK IN ('guest','owner','admin') | Application role |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Maintained by trigger |

**Passwords are never stored here.** Supabase Auth owns credentials.

---

### 3.2 `properties`

Rental property listings inside subdivisions.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | |
| `owner_id` | UUID | NOT NULL, FK → profiles.id RESTRICT | The listing owner |
| `title` | TEXT | NOT NULL, length ≥ 3 | |
| `description` | TEXT | nullable | |
| `house_number` | TEXT | nullable | Block/lot number |
| `location` | TEXT | NOT NULL, length ≥ 3 | Subdivision name + city |
| `price_per_night` | NUMERIC(10,2) | NOT NULL, ≥ 0 | Philippine Peso |
| `bedrooms` | INTEGER | NOT NULL, DEFAULT 1, ≥ 0 | 0 allowed for studios |
| `bathrooms` | INTEGER | NOT NULL, DEFAULT 1, ≥ 0 | |
| `max_guests` | INTEGER | NOT NULL, DEFAULT 1, > 0 | |
| `status` | TEXT | NOT NULL, DEFAULT 'pending', CHECK IN (...) | See statuses below |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Maintained by trigger |

**Property statuses:** `pending` → `available` → `unavailable` / `maintenance` / `inactive`

Properties are **never deleted** — set `status = 'inactive'` instead.

---

### 3.3 `amenities`

Master reference list of amenity types. Shared across all properties.

| Column | Type | Constraints |
|---|---|---|
| `id` | SERIAL | PRIMARY KEY |
| `name` | TEXT | NOT NULL, UNIQUE, length ≥ 2 |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

Seeded with: Wi-Fi, Air Conditioning, Parking, Kitchen, Swimming Pool, Television, Refrigerator, Washing Machine, Garden, BBQ Grill.

---

### 3.4 `property_amenities`

Junction table: many-to-many between properties and amenities.

| Column | Type | Constraints |
|---|---|---|
| `property_id` | UUID | NOT NULL, FK → properties.id CASCADE |
| `amenity_id` | INTEGER | NOT NULL, FK → amenities.id CASCADE |
| — | — | PRIMARY KEY (property_id, amenity_id) |

Both foreign keys use `ON DELETE CASCADE` because the rows have no independent meaning — if a property or amenity is removed, its associations are automatically cleaned up.

---

### 3.5 `bookings`

Records a guest's reservation of a property for a date range.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() | |
| `property_id` | UUID | NOT NULL, FK → properties.id RESTRICT | |
| `guest_id` | UUID | NOT NULL, FK → profiles.id RESTRICT | |
| `check_in` | DATE | NOT NULL | Arrival (inclusive) |
| `check_out` | DATE | NOT NULL | Departure (exclusive) |
| `guests` | INTEGER | NOT NULL, > 0 | |
| `total_price` | NUMERIC(10,2) | NOT NULL, ≥ 0 | Calculated at booking time |
| `status` | TEXT | NOT NULL, DEFAULT 'pending', CHECK IN (...) | See statuses below |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() | Maintained by trigger |

**Table constraint:** `check_out > check_in` (minimum 1 night enforced at DB level)

**Booking statuses:** `pending` → `confirmed` → `completed` / `rejected` / `cancelled`

Bookings are **never deleted** — they are permanent historical records.

---

### 3.6 `reviews`

Guest reviews for completed bookings. One review per booking enforced via `UNIQUE(booking_id)`.

| Column | Type | Constraints |
|---|---|---|
| `id` | UUID | PRIMARY KEY, DEFAULT uuid_generate_v4() |
| `property_id` | UUID | NOT NULL, FK → properties.id RESTRICT |
| `guest_id` | UUID | NOT NULL, FK → profiles.id RESTRICT |
| `booking_id` | UUID | NOT NULL, FK → bookings.id RESTRICT, UNIQUE |
| `rating` | INTEGER | NOT NULL, CHECK BETWEEN 1 AND 5 |
| `comment` | TEXT | nullable |
| `created_at` | TIMESTAMPTZ | NOT NULL, DEFAULT NOW() |

Reviews are **immutable** once submitted (no UPDATE or DELETE via client).

---

## 4. Entity Relationship Diagram

```
┌─────────────┐         ┌──────────────────┐         ┌────────────┐
│  profiles   │────1:N──│   properties     │────N:M──│ amenities  │
│─────────────│         │──────────────────│         │────────────│
│ id (PK)     │         │ id (PK)          │         │ id (PK)    │
│ full_name   │         │ owner_id (FK)    │         │ name       │
│ role        │         │ title            │   via   │ created_at │
│ created_at  │         │ location         │─────────│            │
│ updated_at  │         │ price_per_night  │ property│            │
└─────────────┘         │ bedrooms         │_ameni-  └────────────┘
       │                │ bathrooms        │ ties
       │                │ max_guests       │
       │ 1:N            │ status           │
       │                └──────────────────┘
       │                         │ 1:N
       │                         │
       │                ┌────────▼─────────┐
       └───────1:N──────│    bookings      │
                        │──────────────────│
                        │ id (PK)          │
                        │ property_id (FK) │
                        │ guest_id (FK)    │
                        │ check_in         │
                        │ check_out        │
                        │ guests           │
                        │ total_price      │
                        │ status           │
                        └──────────────────┘
                                 │ 1:1
                                 │
                        ┌────────▼─────────┐
                        │    reviews       │
                        │──────────────────│
                        │ id (PK)          │
                        │ property_id (FK) │
                        │ guest_id (FK)    │
                        │ booking_id (FK, UNIQUE)│
                        │ rating (1–5)     │
                        │ comment          │
                        └──────────────────┘
```

---

## 5. Foreign Keys & Cascade Behavior

| Relationship | FK Column | ON DELETE | Reason |
|---|---|---|---|
| profiles → properties | `owner_id` | RESTRICT | Prevent accidental profile deletion while properties exist |
| profiles → bookings | `guest_id` | RESTRICT | Preserve booking history |
| properties → bookings | `property_id` | RESTRICT | Preserve booking history |
| profiles → reviews | `guest_id` | RESTRICT | Preserve review history |
| properties → reviews | `property_id` | RESTRICT | Preserve review history |
| bookings → reviews | `booking_id` | RESTRICT | Reviews reference completed bookings |
| properties → property_amenities | `property_id` | CASCADE | Junction rows have no independent value |
| amenities → property_amenities | `amenity_id` | CASCADE | Junction rows have no independent value |

---

## 6. Constraints Summary

| Table | Constraint | Rule |
|---|---|---|
| profiles | CHECK | role IN ('guest', 'owner', 'admin') |
| profiles | CHECK | char_length(full_name) >= 2 |
| properties | CHECK | price_per_night >= 0 |
| properties | CHECK | bedrooms >= 0 |
| properties | CHECK | bathrooms >= 0 |
| properties | CHECK | max_guests > 0 |
| properties | CHECK | status IN ('pending','available','unavailable','maintenance','inactive') |
| amenities | UNIQUE | name |
| bookings | CHECK | guests > 0 |
| bookings | CHECK | total_price >= 0 |
| bookings | CHECK | check_out > check_in |
| bookings | CHECK | status IN ('pending','confirmed','rejected','cancelled','completed') |
| reviews | CHECK | rating BETWEEN 1 AND 5 |
| reviews | UNIQUE | booking_id (one review per booking) |

---

## 7. Indexes

| Index | Table | Columns | Purpose |
|---|---|---|---|
| `idx_profiles_role` | profiles | role | Filter users by role (admin queries, owner lookups) |
| `idx_properties_owner_id` | properties | owner_id | Find all properties by a given owner |
| `idx_properties_status` | properties | status | Browse filter — "show only available" on every search |
| `idx_properties_location` | properties | location (text_pattern_ops) | LIKE prefix search on subdivision/city name |
| `idx_bookings_property_id` | bookings | property_id | Find all bookings for a property |
| `idx_bookings_guest_id` | bookings | guest_id | Guest dashboard — find all bookings by guest |
| `idx_bookings_dates` | bookings | property_id, check_in, check_out | Composite — overlap detection query (critical for C++ BookingService) |
| `idx_bookings_status` | bookings | status | Filter upcoming/active bookings; used in overlap query |
| `idx_reviews_property_id` | reviews | property_id | Load all reviews for a property detail page |

---

## 8. Row Level Security (RLS)

RLS is enabled on all 6 tables. The C++ backend uses the `service_role` key which **bypasses RLS** — so the C++ layer is the primary authorization boundary. RLS is a secondary safety net preventing unauthorized direct Supabase client access.

### Policy Summary

| Table | Policy | Role | Action | Condition |
|---|---|---|---|---|
| profiles | select_authenticated | authenticated | SELECT | `true` (all profiles readable by logged-in users) |
| profiles | insert_own | authenticated | INSERT | `id = auth.uid()` |
| profiles | update_own | authenticated | UPDATE | `id = auth.uid()` |
| properties | select_available_public | anon, authenticated | SELECT | `status = 'available'` |
| properties | select_own_owner | authenticated | SELECT | `owner_id = auth.uid()` |
| properties | insert_own | authenticated | INSERT | `owner_id = auth.uid()` |
| properties | update_own | authenticated | UPDATE | `owner_id = auth.uid()` |
| amenities | select_public | anon, authenticated | SELECT | `true` |
| property_amenities | select_public | anon, authenticated | SELECT | `true` |
| property_amenities | insert_own | authenticated | INSERT | owner of the property |
| property_amenities | delete_own | authenticated | DELETE | owner of the property |
| bookings | select_own_guest | authenticated | SELECT | `guest_id = auth.uid()` |
| bookings | select_own_owner | authenticated | SELECT | owner of the property |
| bookings | insert_own_guest | authenticated | INSERT | `guest_id = auth.uid()` |
| bookings | update_own_guest | authenticated | UPDATE | `guest_id = auth.uid()` |
| reviews | select_public | anon, authenticated | SELECT | `true` |
| reviews | insert_own_guest | authenticated | INSERT | `guest_id = auth.uid()` |

**No DELETE policies exist on bookings or reviews** — these are permanent records.
**No permissive `USING (true)` policies on sensitive tables** (bookings, profiles updates).

---

## 9. Authentication Design

Supabase Auth manages all user credentials (registration, login, session tokens, password hashing). The `profiles` table stores only application-level data.

**Registration flow (future Phase 4):**
1. React sends email + password to C++ backend
2. C++ backend calls Supabase Auth API to create `auth.users` record
3. C++ backend inserts a matching row into `profiles` using the returned UUID
4. C++ returns a session token to React

**Request authentication flow:**
1. React attaches a Supabase JWT to every API request
2. C++ backend validates the JWT against Supabase Auth
3. C++ extracts `user_id` and `role` from the token
4. C++ enforces business-level authorization (e.g., only `owner` can create properties)
5. C++ queries the database using `service_role` credentials

---

## 10. Booking Conflict Strategy

The database schema is **designed to support** overlap detection but the algorithm itself lives in the C++ `BookingService`. This keeps business logic centralized, testable, and out of DB triggers.

**The overlap query the C++ backend will execute:**

```sql
SELECT COUNT(*)
FROM bookings
WHERE property_id   = $1
  AND status        IN ('pending', 'confirmed')
  AND check_in      < $new_check_out
  AND check_out     > $new_check_in;
```

If `COUNT > 0`, the `BookingService` returns a conflict error before inserting.

The composite index `idx_bookings_dates` on `(property_id, check_in, check_out)` makes this query fast even at scale.

---

## 11. Storage Design

**Bucket:** `property-images`
**Access:** Public read (property images are not sensitive)

**Recommended file organization:**
```
property-images/
└── property-{uuid}/
    ├── image-1.jpg
    ├── image-2.jpg
    └── image-3.jpg
```

| Setting | Value |
|---|---|
| Allowed types | image/jpeg, image/png, image/webp |
| Max file size | 5 MB |
| Access | Public (read), authenticated owner (write) |
| Upload management | C++ backend generates signed upload URLs |

The React frontend currently uses Unsplash URLs for mock images. Storage integration will be wired in a future phase when the C++ backend is connected.

---

## 12. How to Apply the Schema

### Prerequisites
- A Supabase project created at [supabase.com](https://supabase.com)
- Supabase CLI installed (optional, for local dev): `npm install -g supabase`

### Option A — Supabase Dashboard (recommended for first setup)

1. Open your Supabase project
2. Go to **SQL Editor**
3. Paste the contents of `supabase/migrations/00001_initial_schema.sql`
4. Click **Run**
5. Paste the contents of `supabase/seed.sql`
6. Click **Run**

### Option B — Supabase CLI

```bash
# Link to your project
supabase link --project-ref your-project-ref

# Apply the migration
supabase db push

# Seed manually via psql
psql "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres" \
  -f supabase/seed.sql
```

### Option C — Direct psql

```bash
# Apply schema
psql "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres" \
  -f supabase/migrations/00001_initial_schema.sql

# Apply seed data
psql "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres" \
  -f supabase/seed.sql
```

---

## 13. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Used By | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | React frontend | Project URL (safe for browser) |
| `VITE_SUPABASE_ANON_KEY` | React frontend | Anon key (safe for browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | C++ backend only | Bypasses RLS — never expose to browser |
| `SUPABASE_DB_HOST` | C++ backend only | Direct PostgreSQL host |
| `SUPABASE_DB_PORT` | C++ backend only | 5432 |
| `SUPABASE_DB_NAME` | C++ backend only | postgres |
| `SUPABASE_DB_USER` | C++ backend only | postgres |
| `SUPABASE_DB_PASSWORD` | C++ backend only | Database password |

**Never commit `.env.local` to Git.** It is protected by `.gitignore`.

---

## 14. Future C++ Repository Interface

The schema is designed so these repository methods map directly to simple queries:

```
ProfileRepository
  createProfile(id, full_name, role)          → INSERT INTO profiles
  findById(id)                                → SELECT WHERE id = $1
  findByEmail(email)                          → JOIN auth.users WHERE email = $1
  updateProfile(id, full_name)               → UPDATE profiles SET ...

PropertyRepository
  create(owner_id, title, ...)               → INSERT INTO properties
  findById(id)                               → SELECT WHERE id = $1
  findAll(status, location, guests)          → SELECT WHERE status/location/max_guests
  search(location, guests, checkIn, checkOut)→ SELECT + date availability subquery
  update(id, fields)                         → UPDATE properties SET ...
  deactivate(id)                             → UPDATE SET status = 'inactive'

BookingRepository
  create(property_id, guest_id, ...)         → INSERT INTO bookings
  findById(id)                               → SELECT WHERE id = $1
  findByProperty(property_id)               → SELECT WHERE property_id = $1
  findByGuest(guest_id)                      → SELECT WHERE guest_id = $1
  findOverlappingBookings(pid, in, out)      → SELECT overlap query (see §10)
  updateStatus(id, status)                   → UPDATE bookings SET status = $2

ReviewRepository
  create(property_id, guest_id, booking_id, rating, comment)  → INSERT INTO reviews
  findByProperty(property_id)               → SELECT WHERE property_id = $1
  findByBooking(booking_id)                  → SELECT WHERE booking_id = $1
```

---

## 15. What Is NOT Implemented (Future Phases)

| Item | Phase |
|---|---|
| C++ backend controllers, services, repositories | Phase 4 |
| REST API endpoints | Phase 4 |
| React → C++ API integration | Phase 5 |
| React authentication screens (wired to backend) | Phase 5 |
| Booking conflict enforcement in C++ | Phase 4 |
| Property image upload via Storage | Phase 5 |
| Payment processing | Future |
