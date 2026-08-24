-- ============================================================
-- SubdivisionStay Database Schema
-- Compatible with PostgreSQL (Supabase) and SQLite
-- ============================================================

CREATE TABLE IF NOT EXISTS properties (
    id              VARCHAR(64) PRIMARY KEY,
    owner_id        VARCHAR(64) NOT NULL,
    title           TEXT NOT NULL,
    description     TEXT,
    house_number    TEXT,
    location        TEXT NOT NULL,
    image_url       TEXT,
    images          TEXT,
    rating          REAL DEFAULT 0.0,
    bedrooms        INTEGER NOT NULL DEFAULT 1,
    bathrooms       INTEGER NOT NULL DEFAULT 1,
    max_guests      INTEGER NOT NULL DEFAULT 1,
    price_per_night REAL NOT NULL,
    amenities       TEXT,
    house_rules     TEXT,
    status          VARCHAR(32) NOT NULL DEFAULT 'available',
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
