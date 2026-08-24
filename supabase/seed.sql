-- ============================================================
-- seed.sql
-- Project:   SubdivisionStay
-- Purpose:   Populate the database with realistic fictional data
--            for development, testing, and portfolio demonstration.
--
-- IMPORTANT:
--   - All data is entirely fictional.
--   - No real people, addresses, or credentials are used.
--   - UUIDs are hardcoded so foreign key relationships are
--     stable and reproducible across environments.
--   - Passwords are NOT stored here. Supabase Auth manages them.
--     The profile rows below must be paired with matching
--     auth.users rows (created via Supabase Auth API or Dashboard).
--   - Run AFTER the schema migration:
--       Run 00001_initial_schema.sql first, then this file.
--
-- Data summary:
--   profiles      : 9 rows  (1 admin, 3 owners, 5 guests)
--   properties    : 8 rows  (various statuses)
--   amenities     : 10 rows
--   property_amenities : 30 rows
--   bookings      : 10 rows (pending, confirmed, completed, cancelled)
--   reviews       : 4 rows  (for completed bookings only)
-- ============================================================


-- ============================================================
-- RESET (safe for repeated development runs)
-- ============================================================
-- Delete in reverse dependency order to respect foreign keys.
-- Wrap in a transaction so a partial failure leaves DB clean.
-- ============================================================

BEGIN;

DELETE FROM reviews;
DELETE FROM bookings;
DELETE FROM property_amenities;
DELETE FROM properties;
DELETE FROM amenities;
DELETE FROM profiles;

COMMIT;


-- ============================================================
-- 1. PROFILES
-- ============================================================
-- These UUIDs simulate what Supabase Auth would generate.
-- In a real setup, create these users via Supabase Auth first,
-- then use the Auth-assigned UUIDs here.
--
-- Development test credentials (DO NOT USE IN PRODUCTION):
--   All accounts use password: TestPassword123!
--   Create matching auth.users via Supabase Dashboard or CLI.
-- ============================================================

BEGIN;

INSERT INTO profiles (id, full_name, role, created_at, updated_at) VALUES

    -- ── Admin ──────────────────────────────────────────────
    (
        '00000000-0000-0000-0000-000000000001',
        'Admin User',
        'admin',
        '2025-01-01 08:00:00+08',
        '2025-01-01 08:00:00+08'
    ),

    -- ── Owners ─────────────────────────────────────────────
    (
        '00000000-0000-0000-0000-000000000002',
        'Maria Santos',
        'owner',
        '2025-01-05 09:00:00+08',
        '2025-01-05 09:00:00+08'
    ),
    (
        '00000000-0000-0000-0000-000000000003',
        'Ricardo Dela Cruz',
        'owner',
        '2025-01-10 10:00:00+08',
        '2025-01-10 10:00:00+08'
    ),
    (
        '00000000-0000-0000-0000-000000000004',
        'Elena Reyes',
        'owner',
        '2025-01-15 11:00:00+08',
        '2025-01-15 11:00:00+08'
    ),

    -- ── Guests ─────────────────────────────────────────────
    (
        '00000000-0000-0000-0000-000000000005',
        'Jose Bautista',
        'guest',
        '2025-02-01 08:30:00+08',
        '2025-02-01 08:30:00+08'
    ),
    (
        '00000000-0000-0000-0000-000000000006',
        'Ana Fernandez',
        'guest',
        '2025-02-05 09:15:00+08',
        '2025-02-05 09:15:00+08'
    ),
    (
        '00000000-0000-0000-0000-000000000007',
        'Miguel Torres',
        'guest',
        '2025-02-10 14:00:00+08',
        '2025-02-10 14:00:00+08'
    ),
    (
        '00000000-0000-0000-0000-000000000008',
        'Liza Villanueva',
        'guest',
        '2025-02-15 10:00:00+08',
        '2025-02-15 10:00:00+08'
    ),
    (
        '00000000-0000-0000-0000-000000000009',
        'Carlo Mendoza',
        'guest',
        '2025-02-20 16:00:00+08',
        '2025-02-20 16:00:00+08'
    );

COMMIT;


-- ============================================================
-- 2. AMENITIES
-- ============================================================

BEGIN;

INSERT INTO amenities (id, name, created_at) VALUES
    (1,  'Wi-Fi',           '2025-01-01 08:00:00+08'),
    (2,  'Air Conditioning','2025-01-01 08:00:00+08'),
    (3,  'Parking',         '2025-01-01 08:00:00+08'),
    (4,  'Kitchen',         '2025-01-01 08:00:00+08'),
    (5,  'Swimming Pool',   '2025-01-01 08:00:00+08'),
    (6,  'Television',      '2025-01-01 08:00:00+08'),
    (7,  'Refrigerator',    '2025-01-01 08:00:00+08'),
    (8,  'Washing Machine', '2025-01-01 08:00:00+08'),
    (9,  'Garden',          '2025-01-01 08:00:00+08'),
    (10, 'BBQ Grill',       '2025-01-01 08:00:00+08');

-- Reset the sequence so future INSERTs continue from 11
SELECT setval('amenities_id_seq', 10, true);

COMMIT;


-- ============================================================
-- 3. PROPERTIES
-- ============================================================

BEGIN;

INSERT INTO properties (
    id, owner_id, title, description,
    house_number, location,
    price_per_night, bedrooms, bathrooms, max_guests,
    status, created_at, updated_at
) VALUES

    -- ── Maria Santos properties (owner 002) ────────────────
    (
        'aaaaaaaa-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000002',
        'Modern Corner House with Garden',
        'Nestled on a prime corner lot in Greenfield Estates, this four-bedroom home offers open-plan living that flows to a landscaped garden. Fully furnished with contemporary pieces, high-speed Wi-Fi, and a fully equipped kitchen.',
        'Block 4, Lot 12',
        'Greenfield Estates, Cavite',
        4500.00, 4, 3, 8,
        'available',
        '2025-01-20 10:00:00+08',
        '2025-01-20 10:00:00+08'
    ),
    (
        'aaaaaaaa-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000002',
        'Cozy Bungalow Near Clubhouse',
        'Wake up steps away from the Sunrise Village clubhouse and swimming pool. Bright interiors, cheerful décor, and a covered patio perfect for al fresco breakfasts.',
        'Block 7, Lot 5',
        'Sunrise Village, Laguna',
        3200.00, 3, 2, 6,
        'available',
        '2025-01-22 11:00:00+08',
        '2025-01-22 11:00:00+08'
    ),
    (
        'aaaaaaaa-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000002',
        'Charming Studio Loft',
        'Perfect for couples or solo travelers. Open-plan living with a queen-sized loft bed, compact kitchen, and floor-to-ceiling windows flooding the space with natural light.',
        'Block 9, Lot 2',
        'The Enclave, Rizal',
        1500.00, 1, 1, 2,
        'available',
        '2025-01-25 09:00:00+08',
        '2025-01-25 09:00:00+08'
    ),

    -- ── Ricardo Dela Cruz properties (owner 003) ───────────
    (
        'aaaaaaaa-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000003',
        'Spacious Family Home with Pool',
        'A sprawling five-bedroom residence with a private pool. Each bedroom has its own en-suite bathroom. The pool deck with sun loungers makes every evening feel like a vacation.',
        'Block 2, Lot 8',
        'Palm Ridge Subdivision, Bulacan',
        6800.00, 5, 4, 10,
        'available',
        '2025-01-28 14:00:00+08',
        '2025-01-28 14:00:00+08'
    ),
    (
        'aaaaaaaa-0000-0000-0000-000000000005',
        '00000000-0000-0000-0000-000000000003',
        'Minimalist Townhouse with Parking',
        'Clean lines and a calm palette define this elegant townhouse in Serene Heights. Three bedrooms across two floors with a private courtyard and dedicated parking.',
        'Block 11, Lot 3',
        'Serene Heights, Batangas',
        2800.00, 3, 2, 5,
        'available',
        '2025-02-01 08:00:00+08',
        '2025-02-01 08:00:00+08'
    ),
    (
        'aaaaaaaa-0000-0000-0000-000000000006',
        '00000000-0000-0000-0000-000000000003',
        'Corner Lot Villa with Lanai',
        'Expansive indoor-outdoor living anchored by a covered lanai overlooking a fully enclosed garden. Perfect for families with children and pets.',
        'Block 3, Lot 1',
        'Lakeview Residences, Cavite',
        5800.00, 4, 3, 9,
        'maintenance',
        '2025-02-03 10:00:00+08',
        '2025-03-01 09:00:00+08'
    ),

    -- ── Elena Reyes properties (owner 004) ─────────────────
    (
        'aaaaaaaa-0000-0000-0000-000000000007',
        '00000000-0000-0000-0000-000000000004',
        'Elegant Two-Storey House',
        'Meticulously maintained two-storey residence with high ceilings, large picture windows, and a gourmet kitchen. Rated 5.0 by every previous guest.',
        'Block 1, Lot 15',
        'Crestview Homes, Laguna',
        5200.00, 4, 3, 8,
        'available',
        '2025-02-05 13:00:00+08',
        '2025-02-05 13:00:00+08'
    ),
    (
        'aaaaaaaa-0000-0000-0000-000000000008',
        '00000000-0000-0000-0000-000000000004',
        'Quiet Garden Cottage',
        'Tucked away in tranquil Verdana Suites. Lush greenery surrounds the two-bedroom cottage on all sides. A private garden sanctuary for reading, yoga, or unwinding.',
        'Block 6, Lot 9',
        'Verdana Suites, Rizal',
        2200.00, 2, 1, 4,
        'pending',
        '2025-02-10 15:00:00+08',
        '2025-02-10 15:00:00+08'
    );

COMMIT;


-- ============================================================
-- 4. PROPERTY_AMENITIES
-- ============================================================

BEGIN;

INSERT INTO property_amenities (property_id, amenity_id) VALUES

    -- Modern Corner House (aaaa...001): Wi-Fi, AC, Parking, Kitchen, TV, Fridge, Washer, Garden, BBQ
    ('aaaaaaaa-0000-0000-0000-000000000001', 1),
    ('aaaaaaaa-0000-0000-0000-000000000001', 2),
    ('aaaaaaaa-0000-0000-0000-000000000001', 3),
    ('aaaaaaaa-0000-0000-0000-000000000001', 4),
    ('aaaaaaaa-0000-0000-0000-000000000001', 6),
    ('aaaaaaaa-0000-0000-0000-000000000001', 7),
    ('aaaaaaaa-0000-0000-0000-000000000001', 8),
    ('aaaaaaaa-0000-0000-0000-000000000001', 9),
    ('aaaaaaaa-0000-0000-0000-000000000001', 10),

    -- Cozy Bungalow (aaaa...002): Wi-Fi, AC, Parking, Kitchen, Pool, TV, Fridge, Washer
    ('aaaaaaaa-0000-0000-0000-000000000002', 1),
    ('aaaaaaaa-0000-0000-0000-000000000002', 2),
    ('aaaaaaaa-0000-0000-0000-000000000002', 3),
    ('aaaaaaaa-0000-0000-0000-000000000002', 4),
    ('aaaaaaaa-0000-0000-0000-000000000002', 5),
    ('aaaaaaaa-0000-0000-0000-000000000002', 6),
    ('aaaaaaaa-0000-0000-0000-000000000002', 7),
    ('aaaaaaaa-0000-0000-0000-000000000002', 8),

    -- Studio Loft (aaaa...003): Wi-Fi, AC, Kitchen, TV, Fridge
    ('aaaaaaaa-0000-0000-0000-000000000003', 1),
    ('aaaaaaaa-0000-0000-0000-000000000003', 2),
    ('aaaaaaaa-0000-0000-0000-000000000003', 4),
    ('aaaaaaaa-0000-0000-0000-000000000003', 6),
    ('aaaaaaaa-0000-0000-0000-000000000003', 7),

    -- Family Home with Pool (aaaa...004): all 10 amenities
    ('aaaaaaaa-0000-0000-0000-000000000004', 1),
    ('aaaaaaaa-0000-0000-0000-000000000004', 2),
    ('aaaaaaaa-0000-0000-0000-000000000004', 3),
    ('aaaaaaaa-0000-0000-0000-000000000004', 4),
    ('aaaaaaaa-0000-0000-0000-000000000004', 5),
    ('aaaaaaaa-0000-0000-0000-000000000004', 6),
    ('aaaaaaaa-0000-0000-0000-000000000004', 7),
    ('aaaaaaaa-0000-0000-0000-000000000004', 8),
    ('aaaaaaaa-0000-0000-0000-000000000004', 9),
    ('aaaaaaaa-0000-0000-0000-000000000004', 10),

    -- Minimalist Townhouse (aaaa...005): Wi-Fi, AC, Parking, Kitchen, TV, Fridge, Washer
    ('aaaaaaaa-0000-0000-0000-000000000005', 1),
    ('aaaaaaaa-0000-0000-0000-000000000005', 2),
    ('aaaaaaaa-0000-0000-0000-000000000005', 3),
    ('aaaaaaaa-0000-0000-0000-000000000005', 4),
    ('aaaaaaaa-0000-0000-0000-000000000005', 6),
    ('aaaaaaaa-0000-0000-0000-000000000005', 7),
    ('aaaaaaaa-0000-0000-0000-000000000005', 8),

    -- Corner Lot Villa (aaaa...006): Wi-Fi, AC, Parking, Kitchen, TV, Fridge, Washer, Garden, BBQ
    ('aaaaaaaa-0000-0000-0000-000000000006', 1),
    ('aaaaaaaa-0000-0000-0000-000000000006', 2),
    ('aaaaaaaa-0000-0000-0000-000000000006', 3),
    ('aaaaaaaa-0000-0000-0000-000000000006', 4),
    ('aaaaaaaa-0000-0000-0000-000000000006', 6),
    ('aaaaaaaa-0000-0000-0000-000000000006', 7),
    ('aaaaaaaa-0000-0000-0000-000000000006', 8),
    ('aaaaaaaa-0000-0000-0000-000000000006', 9),
    ('aaaaaaaa-0000-0000-0000-000000000006', 10),

    -- Elegant Two-Storey (aaaa...007): Wi-Fi, AC, Parking, Kitchen, TV, Fridge, Washer, Garden, BBQ
    ('aaaaaaaa-0000-0000-0000-000000000007', 1),
    ('aaaaaaaa-0000-0000-0000-000000000007', 2),
    ('aaaaaaaa-0000-0000-0000-000000000007', 3),
    ('aaaaaaaa-0000-0000-0000-000000000007', 4),
    ('aaaaaaaa-0000-0000-0000-000000000007', 6),
    ('aaaaaaaa-0000-0000-0000-000000000007', 7),
    ('aaaaaaaa-0000-0000-0000-000000000007', 8),
    ('aaaaaaaa-0000-0000-0000-000000000007', 9),
    ('aaaaaaaa-0000-0000-0000-000000000007', 10),

    -- Quiet Garden Cottage (aaaa...008): Wi-Fi, AC, Parking, Kitchen, TV, Fridge, Washer, Garden
    ('aaaaaaaa-0000-0000-0000-000000000008', 1),
    ('aaaaaaaa-0000-0000-0000-000000000008', 2),
    ('aaaaaaaa-0000-0000-0000-000000000008', 3),
    ('aaaaaaaa-0000-0000-0000-000000000008', 4),
    ('aaaaaaaa-0000-0000-0000-000000000008', 6),
    ('aaaaaaaa-0000-0000-0000-000000000008', 7),
    ('aaaaaaaa-0000-0000-0000-000000000008', 8),
    ('aaaaaaaa-0000-0000-0000-000000000008', 9);

COMMIT;


-- ============================================================
-- 5. BOOKINGS
-- ============================================================
-- Mix of statuses to support all test scenarios:
--   pending    — awaiting owner confirmation
--   confirmed  — owner approved, stay upcoming
--   completed  — stay has occurred (eligible for review)
--   cancelled  — guest cancelled
--   rejected   — owner rejected
--
-- total_price formula: price_per_night × nights
-- No service fee included at DB level — that is business logic.
-- ============================================================

BEGIN;

INSERT INTO bookings (
    id, property_id, guest_id,
    check_in, check_out, guests,
    total_price, status,
    created_at, updated_at
) VALUES

    -- COMPLETED bookings (used as FK targets for reviews)

    -- booking 001: Jose at Modern Corner House (4 nights @ ₱4500 = ₱18,000)
    (
        'bbbbbbbb-0000-0000-0000-000000000001',
        'aaaaaaaa-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000005',
        '2025-03-10', '2025-03-14', 4,
        18000.00, 'completed',
        '2025-02-20 10:00:00+08', '2025-03-15 08:00:00+08'
    ),

    -- booking 002: Ana at Cozy Bungalow (3 nights @ ₱3200 = ₱9,600)
    (
        'bbbbbbbb-0000-0000-0000-000000000002',
        'aaaaaaaa-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000006',
        '2025-03-15', '2025-03-18', 2,
        9600.00, 'completed',
        '2025-02-25 11:00:00+08', '2025-03-19 09:00:00+08'
    ),

    -- booking 003: Miguel at Elegant Two-Storey (5 nights @ ₱5200 = ₱26,000)
    (
        'bbbbbbbb-0000-0000-0000-000000000003',
        'aaaaaaaa-0000-0000-0000-000000000007',
        '00000000-0000-0000-0000-000000000007',
        '2025-04-01', '2025-04-06', 6,
        26000.00, 'completed',
        '2025-03-10 14:00:00+08', '2025-04-07 10:00:00+08'
    ),

    -- booking 004: Liza at Family Home with Pool (7 nights @ ₱6800 = ₱47,600)
    (
        'bbbbbbbb-0000-0000-0000-000000000004',
        'aaaaaaaa-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000008',
        '2025-04-10', '2025-04-17', 8,
        47600.00, 'completed',
        '2025-03-15 09:00:00+08', '2025-04-18 11:00:00+08'
    ),

    -- CONFIRMED bookings (upcoming stays)

    -- booking 005: Carlo at Modern Corner House (3 nights @ ₱4500 = ₱13,500)
    (
        'bbbbbbbb-0000-0000-0000-000000000005',
        'aaaaaaaa-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000009',
        '2025-09-05', '2025-09-08', 3,
        13500.00, 'confirmed',
        '2025-08-01 10:00:00+08', '2025-08-02 09:00:00+08'
    ),

    -- booking 006: Jose at Minimalist Townhouse (2 nights @ ₱2800 = ₱5,600)
    (
        'bbbbbbbb-0000-0000-0000-000000000006',
        'aaaaaaaa-0000-0000-0000-000000000005',
        '00000000-0000-0000-0000-000000000005',
        '2025-09-20', '2025-09-22', 2,
        5600.00, 'confirmed',
        '2025-08-10 14:00:00+08', '2025-08-11 08:00:00+08'
    ),

    -- PENDING bookings (awaiting owner approval)

    -- booking 007: Ana at Elegant Two-Storey (4 nights @ ₱5200 = ₱20,800)
    (
        'bbbbbbbb-0000-0000-0000-000000000007',
        'aaaaaaaa-0000-0000-0000-000000000007',
        '00000000-0000-0000-0000-000000000006',
        '2025-10-01', '2025-10-05', 4,
        20800.00, 'pending',
        '2025-08-20 16:00:00+08', '2025-08-20 16:00:00+08'
    ),

    -- booking 008: Miguel at Studio Loft (2 nights @ ₱1500 = ₱3,000)
    (
        'bbbbbbbb-0000-0000-0000-000000000008',
        'aaaaaaaa-0000-0000-0000-000000000003',
        '00000000-0000-0000-0000-000000000007',
        '2025-10-10', '2025-10-12', 1,
        3000.00, 'pending',
        '2025-08-22 11:00:00+08', '2025-08-22 11:00:00+08'
    ),

    -- CANCELLED booking

    -- booking 009: Liza at Cozy Bungalow — guest cancelled
    (
        'bbbbbbbb-0000-0000-0000-000000000009',
        'aaaaaaaa-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000008',
        '2025-05-01', '2025-05-04', 2,
        9600.00, 'cancelled',
        '2025-04-01 09:00:00+08', '2025-04-10 14:00:00+08'
    ),

    -- REJECTED booking

    -- booking 010: Carlo at Family Home — owner rejected (dates unavailable)
    (
        'bbbbbbbb-0000-0000-0000-000000000010',
        'aaaaaaaa-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000009',
        '2025-04-08', '2025-04-13', 5,
        34000.00, 'rejected',
        '2025-03-20 10:00:00+08', '2025-03-21 08:00:00+08'
    );

COMMIT;


-- ============================================================
-- 6. REVIEWS
-- ============================================================
-- Only for completed bookings (001–004).
-- UNIQUE(booking_id) in schema prevents duplicate reviews.
-- The C++ ReviewService verifies booking ownership and
-- completion status before allowing insertion.
-- ============================================================

BEGIN;

INSERT INTO reviews (
    id, property_id, guest_id, booking_id,
    rating, comment, created_at
) VALUES

    -- Jose reviews Modern Corner House (booking 001)
    (
        'cccccccc-0000-0000-0000-000000000001',
        'aaaaaaaa-0000-0000-0000-000000000001',
        '00000000-0000-0000-0000-000000000005',
        'bbbbbbbb-0000-0000-0000-000000000001',
        5,
        'Absolutely loved the property! The garden was perfect for morning coffee and the house was spotlessly clean. Maria was very responsive. Highly recommend for families.',
        '2025-03-16 10:00:00+08'
    ),

    -- Ana reviews Cozy Bungalow (booking 002)
    (
        'cccccccc-0000-0000-0000-000000000002',
        'aaaaaaaa-0000-0000-0000-000000000002',
        '00000000-0000-0000-0000-000000000006',
        'bbbbbbbb-0000-0000-0000-000000000002',
        4,
        'Great location near the clubhouse. The bungalow is cozy and well-maintained. Only minor feedback is that the kitchen could use a few more utensils. Overall a wonderful stay.',
        '2025-03-20 14:00:00+08'
    ),

    -- Miguel reviews Elegant Two-Storey (booking 003)
    (
        'cccccccc-0000-0000-0000-000000000003',
        'aaaaaaaa-0000-0000-0000-000000000007',
        '00000000-0000-0000-0000-000000000007',
        'bbbbbbbb-0000-0000-0000-000000000003',
        5,
        'This is easily the best subdivision rental we have ever stayed in. The high ceilings, home theatre, and gourmet kitchen made our anniversary trip incredibly special. Will definitely be back.',
        '2025-04-08 09:00:00+08'
    ),

    -- Liza reviews Family Home with Pool (booking 004)
    (
        'cccccccc-0000-0000-0000-000000000004',
        'aaaaaaaa-0000-0000-0000-000000000004',
        '00000000-0000-0000-0000-000000000008',
        'bbbbbbbb-0000-0000-0000-000000000004',
        5,
        'The pool was the highlight for our kids. Five bedrooms meant everyone had their own space. Ricardo was very accommodating with our late check-out request. Perfect for large families.',
        '2025-04-19 11:00:00+08'
    );

COMMIT;


-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================
-- Run these after seeding to confirm data integrity.
-- All counts should match the summary at the top of this file.
-- ============================================================

-- Row counts
SELECT 'profiles'           AS tbl, COUNT(*) AS rows FROM profiles
UNION ALL
SELECT 'properties',                COUNT(*)         FROM properties
UNION ALL
SELECT 'amenities',                 COUNT(*)         FROM amenities
UNION ALL
SELECT 'property_amenities',        COUNT(*)         FROM property_amenities
UNION ALL
SELECT 'bookings',                  COUNT(*)         FROM bookings
UNION ALL
SELECT 'reviews',                   COUNT(*)         FROM reviews
ORDER BY tbl;

-- Booking status breakdown
SELECT status, COUNT(*) AS count
FROM bookings
GROUP BY status
ORDER BY status;

-- Properties with amenity counts
SELECT p.title, COUNT(pa.amenity_id) AS amenity_count
FROM properties p
LEFT JOIN property_amenities pa ON pa.property_id = p.id
GROUP BY p.title
ORDER BY amenity_count DESC;

-- Reviews with property and guest names
SELECT
    r.rating,
    p.title        AS property,
    pr.full_name   AS reviewer,
    LEFT(r.comment, 60) AS comment_preview
FROM reviews r
JOIN properties p  ON p.id = r.property_id
JOIN profiles pr   ON pr.id = r.guest_id
ORDER BY r.created_at;
