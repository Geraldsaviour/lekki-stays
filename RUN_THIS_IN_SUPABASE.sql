-- ============================================================================
-- QUICK FIX: Add Decline/Cancel Reason Columns
-- ============================================================================
-- Copy and paste this entire file into Supabase SQL Editor and click "Run"
-- This will fix the "Failed to perform action" error when declining bookings
-- ============================================================================

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS decline_reason TEXT,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND column_name IN ('decline_reason', 'cancellation_reason');

-- You should see:
-- decline_reason | text
-- cancellation_reason | text

-- ✅ Done! Now you can decline and cancel bookings without errors.
