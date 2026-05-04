-- Migration: Add Payment Receipt Fields
-- Run this in Supabase SQL Editor to add payment receipt tracking

-- Add payment receipt fields to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS payment_receipt_url TEXT,
ADD COLUMN IF NOT EXISTS payment_receipt_uploaded_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS payment_amount INTEGER,
ADD COLUMN IF NOT EXISTS payment_reference TEXT,
ADD COLUMN IF NOT EXISTS payment_verified_by TEXT;

-- Add comment
COMMENT ON COLUMN bookings.payment_receipt_url IS 'URL to uploaded payment receipt image';
COMMENT ON COLUMN bookings.payment_receipt_uploaded_at IS 'Timestamp when receipt was uploaded';
COMMENT ON COLUMN bookings.payment_amount IS 'Amount shown in receipt';
COMMENT ON COLUMN bookings.payment_reference IS 'Payment reference/transaction ID from receipt';
COMMENT ON COLUMN bookings.payment_verified_by IS 'Admin email who verified the payment';

-- Verify columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND column_name IN (
  'payment_receipt_url', 
  'payment_receipt_uploaded_at', 
  'payment_amount', 
  'payment_reference',
  'payment_verified_by'
)
ORDER BY column_name;
