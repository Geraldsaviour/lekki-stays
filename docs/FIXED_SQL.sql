-- Add decline_reason and cancellation_reason columns
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS decline_reason TEXT,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND column_name IN ('decline_reason', 'cancellation_reason');
