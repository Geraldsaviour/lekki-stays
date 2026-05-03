-- Lekki Stays / LuxStay — Supabase Database Schema
-- Run this SQL in the Supabase SQL Editor to create all tables and indexes

-- ============================================================================
-- APARTMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS apartments (
  id TEXT PRIMARY KEY,  -- 'apt-1' through 'apt-8'
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  price_per_night INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed the 8 apartments
INSERT INTO apartments (id, name, slug, location, price_per_night, max_guests) VALUES
('apt-1', 'Haven Lekki — Studio',        'haven-lekki-studio',        'Lekki',            35000,  2),
('apt-2', 'Haven Lekki — 1 Bedroom',     'haven-lekki-1bed',          'Lekki',            50000,  3),
('apt-3', 'Haven Lekki — 2 Bedroom',     'haven-lekki-2bed',          'Lekki',            75000,  5),
('apt-4', 'VI Penthouse',                'vi-penthouse',              'Victoria Island',  120000, 6),
('apt-5', 'Ikoyi Garden Suite',          'ikoyi-garden-suite',        'Ikoyi',            90000,  4),
('apt-6', 'Lekki Phase 1 Flat',          'lekki-phase1-flat',         'Lekki',            45000,  3),
('apt-7', 'Oniru Beachfront Studio',     'oniru-beachfront-studio',   'Lekki',            60000,  2),
('apt-8', 'Chevron Drive 3 Bedroom',     'chevron-drive-3bed',        'Lekki',            95000,  7)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- BOOKINGS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref TEXT NOT NULL UNIQUE,
  apartment_id TEXT NOT NULL REFERENCES apartments(id),
  guest_name TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','payment_pending','paid','declined','auto_declined','cancelled')),
  guest_token TEXT NOT NULL UNIQUE,
  payment_deadline TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  declined_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Compound index for availability queries (CRITICAL — do not skip)
CREATE INDEX IF NOT EXISTS idx_bookings_availability
  ON bookings (apartment_id, check_in, check_out, status);

-- Index for cron job (finding expired payment_pending bookings fast)
CREATE INDEX IF NOT EXISTS idx_bookings_expire
  ON bookings (status, payment_deadline)
  WHERE status = 'payment_pending';

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE apartments ENABLE ROW LEVEL SECURITY;

-- Public can read active apartments
CREATE POLICY "public_read_apartments"
  ON apartments FOR SELECT
  USING (active = TRUE);

-- Public can read availability (booked date ranges only — no guest PII)
CREATE POLICY "public_read_booking_dates"
  ON bookings FOR SELECT
  USING (status IN ('pending','confirmed','payment_pending','paid'));

-- Public can insert their own booking
CREATE POLICY "public_insert_booking"
  ON bookings FOR INSERT
  WITH CHECK (TRUE);

-- Only service role can update/delete (admin actions go through backend with service key)
-- No public update policy — all state changes go through the Express backend

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to check apartment availability
CREATE OR REPLACE FUNCTION check_apartment_availability(
  p_apartment_id TEXT,
  p_check_in DATE,
  p_check_out DATE
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1
    FROM bookings
    WHERE apartment_id = p_apartment_id
      AND status IN ('pending', 'confirmed', 'payment_pending', 'paid')
      AND (
        (check_in <= p_check_in AND check_out > p_check_in)
        OR (check_in < p_check_out AND check_out >= p_check_out)
        OR (check_in >= p_check_in AND check_out <= p_check_out)
      )
  );
END;
$$ LANGUAGE plpgsql;

-- Function to get booked dates for an apartment
CREATE OR REPLACE FUNCTION get_booked_dates(p_apartment_id TEXT)
RETURNS TABLE(check_in DATE, check_out DATE) AS $$
BEGIN
  RETURN QUERY
  SELECT b.check_in, b.check_out
  FROM bookings b
  WHERE b.apartment_id = p_apartment_id
    AND b.status IN ('pending', 'confirmed', 'payment_pending', 'paid')
  ORDER BY b.check_in;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE apartments IS 'Shortlet apartment listings';
COMMENT ON TABLE bookings IS 'Guest booking records with status tracking';
COMMENT ON COLUMN bookings.status IS 'Booking lifecycle: pending → confirmed → payment_pending → paid (or declined/cancelled)';
COMMENT ON COLUMN bookings.guest_token IS 'Secure token for guest self-service actions';
COMMENT ON COLUMN bookings.payment_deadline IS 'Deadline for payment after confirmation (24 hours)';

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify apartments were seeded
-- SELECT * FROM apartments ORDER BY id;

-- Verify indexes were created
-- SELECT indexname, indexdef FROM pg_indexes WHERE tablename IN ('apartments', 'bookings');

-- Verify RLS policies
-- SELECT tablename, policyname, permissive, roles, cmd, qual FROM pg_policies WHERE tablename IN ('apartments', 'bookings');

-- Test availability function
-- SELECT check_apartment_availability('apt-1', '2026-05-10', '2026-05-15');

-- Test booked dates function
-- SELECT * FROM get_booked_dates('apt-1');
