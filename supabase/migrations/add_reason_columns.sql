-- Add decline_reason and cancellation_reason columns to bookings table
-- Run this in Supabase SQL Editor

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS decline_reason TEXT,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- Add comment for documentation
COMMENT ON COLUMN bookings.decline_reason IS 'Reason provided by admin when declining a booking';
COMMENT ON COLUMN bookings.cancellation_reason IS 'Reason provided by admin when cancelling a booking';
