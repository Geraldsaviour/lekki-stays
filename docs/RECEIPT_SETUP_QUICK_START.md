# Payment Receipt System - Quick Setup Guide

## 🚀 Quick Start (5 Minutes)

### Step 1: Run Database Migration (2 minutes)

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy and paste this SQL:

```sql
-- Add payment receipt fields to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS payment_receipt_url TEXT,
ADD COLUMN IF NOT EXISTS payment_receipt_uploaded_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS payment_amount INTEGER,
ADD COLUMN IF NOT EXISTS payment_reference TEXT,
ADD COLUMN IF NOT EXISTS payment_verified_by TEXT;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND column_name IN (
  'payment_receipt_url', 
  'payment_receipt_uploaded_at', 
  'payment_amount', 
  'payment_reference',
  'payment_verified_by'
);
```

5. Click **Run**
6. You should see 5 rows returned (the new columns)

### Step 2: Create Storage Bucket (2 minutes)

1. In Supabase Dashboard, go to **Storage**
2. Click **New bucket**
3. Enter these details:
   - **Name:** `payment-receipts`
   - **Public bucket:** ✅ **Yes** (check this box)
   - **File size limit:** 5MB
4. Click **Create bucket**

### Step 3: Set Storage Policies (1 minute)

1. Click on the `payment-receipts` bucket
2. Click **Policies** tab
3. Click **New Policy**
4. Choose **For full customization**
5. Add these 3 policies:

**Policy 1: Allow Uploads**
```sql
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment-receipts');
```

**Policy 2: Allow Public Read**
```sql
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-receipts');
```

**Policy 3: Allow Delete**
```sql
CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'payment-receipts');
```

### Step 4: Test It! (1 minute)

1. Go to your admin dashboard
2. Find a booking with status "Confirmed" or "Payment Pending"
3. Click **"Mark as Paid"** button
4. You should see the receipt upload modal!

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Database columns added (check SQL query result)
- [ ] Storage bucket created (visible in Storage tab)
- [ ] Bucket is public (check bucket settings)
- [ ] Storage policies added (3 policies visible)
- [ ] Modal opens when clicking "Mark as Paid"
- [ ] Can upload an image file
- [ ] Image preview shows
- [ ] Submit button enables after filling all fields

---

## 🎯 How to Use

### When Guest Sends Payment:

1. **Guest sends receipt via WhatsApp**
   - Screenshot of bank transfer
   - Or photo of receipt

2. **Admin opens dashboard**
   - Find the booking
   - Click "Mark as Paid"

3. **Upload receipt modal opens**
   - Upload the receipt image
   - Enter amount from receipt
   - Enter transaction reference
   - Check all 3 verification boxes

4. **System verifies**
   - Amount must match booking total
   - All fields must be filled
   - All checkboxes must be checked

5. **Receipt uploaded**
   - Stored in Supabase
   - Booking marked as paid
   - Admin email logged

---

## 🔧 Troubleshooting

### "Failed to upload receipt"

**Cause:** Storage bucket not created or policies missing

**Fix:**
1. Go to Supabase → Storage
2. Verify `payment-receipts` bucket exists
3. Check bucket is public
4. Verify 3 policies are added

### "Amount mismatch" error

**Cause:** Receipt amount doesn't match booking total

**Fix:**
1. Double-check the amount in the receipt
2. Verify booking total in dashboard
3. If amounts truly don't match, contact guest

### Modal doesn't open

**Cause:** JavaScript not loaded or browser cache

**Fix:**
1. Hard refresh page (Ctrl + Shift + R)
2. Clear browser cache
3. Check browser console for errors

### Submit button stays disabled

**Cause:** Not all required fields filled

**Fix:**
1. Upload a receipt file
2. Enter payment amount
3. Enter payment reference
4. Check all 3 verification boxes

---

## 📱 Mobile Support

The receipt upload modal is fully responsive:
- ✅ Works on mobile browsers
- ✅ Can upload from phone camera
- ✅ Touch-friendly interface
- ✅ Optimized for small screens

---

## 🔐 Security Features

### What's Protected:
- ✅ Can't mark as paid without receipt
- ✅ Amount must match exactly
- ✅ Transaction reference required
- ✅ Admin accountability (email logged)
- ✅ Permanent audit trail

### What's Stored:
- Receipt image/PDF
- Upload timestamp
- Payment amount
- Transaction reference
- Verifier email

---

## 📊 What Admins See

### Before (Old System):
```
[Mark as Paid] button
  ↓
Confirmation dialog
  ↓
Booking marked as paid
  ↓
No proof of payment ❌
```

### After (New System):
```
[Mark as Paid] button
  ↓
Receipt upload modal
  ↓
Upload receipt image
  ↓
Enter payment details
  ↓
Verify checklist
  ↓
System validates amount
  ↓
Receipt stored
  ↓
Booking marked as paid
  ↓
Full audit trail ✅
```

---

## 💡 Tips

### For Best Results:

1. **Ask guests for clear receipts**
   - Full transaction details visible
   - Amount clearly shown
   - Transaction reference visible

2. **Verify before uploading**
   - Check amount matches
   - Verify transaction reference
   - Ensure receipt is readable

3. **Keep receipts organized**
   - All stored in Supabase
   - Searchable by booking reference
   - Permanent record

4. **Use for disputes**
   - Download receipt if needed
   - Show proof of payment
   - Resolve conflicts quickly

---

## 🎉 You're Done!

The payment receipt verification system is now active. Every time you mark a booking as paid, you'll have:

- ✅ Proof of payment
- ✅ Verified amount
- ✅ Transaction reference
- ✅ Audit trail
- ✅ Admin accountability

No more unmarked payments or disputes! 🚀

---

## Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all setup steps completed
3. Check browser console for errors
4. Review the full documentation in `PAYMENT_RECEIPT_VERIFICATION.md`
