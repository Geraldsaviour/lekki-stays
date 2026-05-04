# Payment Receipt System - Setup Checklist

## ✅ Complete Setup Checklist

Follow these steps in order. Check each box as you complete it.

---

## STEP 1: Database Migration ⏱️ 2 minutes

### What to do:
1. [ ] Open https://supabase.com
2. [ ] Sign in to your account
3. [ ] Click on your LuxStay project
4. [ ] Click **"SQL Editor"** in left sidebar
5. [ ] Click **"New query"** button
6. [ ] Copy this SQL:

```sql
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS payment_receipt_url TEXT,
ADD COLUMN IF NOT EXISTS payment_receipt_uploaded_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS payment_amount INTEGER,
ADD COLUMN IF NOT EXISTS payment_reference TEXT,
ADD COLUMN IF NOT EXISTS payment_verified_by TEXT;

-- Verify it worked
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

7. [ ] Paste it in the SQL editor
8. [ ] Click **"Run"** button (or press Ctrl+Enter)
9. [ ] Verify you see **5 rows** returned

### ✅ Success looks like:
```
column_name                    | data_type
-------------------------------|------------------
payment_amount                 | integer
payment_receipt_uploaded_at    | timestamp with time zone
payment_receipt_url            | text
payment_reference              | text
payment_verified_by            | text
```

---

## STEP 2: Create Storage Bucket ⏱️ 2 minutes

### What to do:
1. [ ] Click **"Storage"** in left sidebar (folder icon)
2. [ ] Click **"New bucket"** button (green, top right)
3. [ ] Fill in the form:
   - [ ] **Name:** `payment-receipts` (exactly, no spaces)
   - [ ] **Public bucket:** ✅ **CHECK THIS BOX** (very important!)
   - [ ] **File size limit:** `5` MB
4. [ ] Click **"Create bucket"** button
5. [ ] Verify you see `payment-receipts` in the buckets list

### ✅ Success looks like:
```
Buckets
├─ payment-receipts
   Public • 0 objects
```

---

## STEP 3: Add Storage Policies ⏱️ 3 minutes

### Method A: Using SQL Editor (Faster)

1. [ ] Click **"SQL Editor"** in left sidebar
2. [ ] Click **"New query"**
3. [ ] Copy this SQL:

```sql
-- Policy 1: Allow uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment-receipts');

-- Policy 2: Allow viewing
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-receipts');

-- Policy 3: Allow deleting
CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'payment-receipts');

-- Verify policies created
SELECT policyname 
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%payment-receipts%';
```

4. [ ] Paste and click **"Run"**
5. [ ] Verify you see **3 policy names** returned

### Method B: Using UI (Step-by-step)

1. [ ] Go to **Storage** → Click **"payment-receipts"** bucket
2. [ ] Click **"Policies"** tab

**Create Policy 1:**
3. [ ] Click **"New Policy"**
4. [ ] Click **"For full customization"**
5. [ ] Paste this:
```sql
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment-receipts');
```
6. [ ] Click **"Review"** → **"Save policy"**

**Create Policy 2:**
7. [ ] Click **"New Policy"** again
8. [ ] Click **"For full customization"**
9. [ ] Paste this:
```sql
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-receipts');
```
10. [ ] Click **"Review"** → **"Save policy"**

**Create Policy 3:**
11. [ ] Click **"New Policy"** again
12. [ ] Click **"For full customization"**
13. [ ] Paste this:
```sql
CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'payment-receipts');
```
14. [ ] Click **"Review"** → **"Save policy"**

### ✅ Success looks like:
```
Policies (3)
├─ Allow authenticated uploads
├─ Allow public read
└─ Allow authenticated delete
```

---

## STEP 4: Test the System ⏱️ 1 minute

### What to do:
1. [ ] Open your admin dashboard (http://localhost:3000/admin/dashboard.html)
2. [ ] Find any booking with status "Confirmed" or "Payment Pending"
3. [ ] Click the **"Mark as Paid"** button
4. [ ] Verify the receipt upload modal opens
5. [ ] Try uploading a test image (any image from your computer)
6. [ ] Verify image preview shows
7. [ ] Enter test amount: `50000`
8. [ ] Enter test reference: `TEST123`
9. [ ] Check all 3 checkboxes
10. [ ] Verify **"Verify & Mark as Paid"** button becomes enabled

### ✅ Success looks like:
- Modal opens ✅
- Can select file ✅
- Image preview shows ✅
- Submit button enables ✅

---

## 🎉 You're Done!

If all checkboxes are checked, your payment receipt system is ready!

### What You Can Do Now:

✅ **Upload payment receipts**
- Guests send receipts via WhatsApp
- You upload them in the dashboard
- System verifies amount matches

✅ **Track all payments**
- Every receipt is stored
- Full audit trail
- Admin accountability

✅ **Prevent fraud**
- Can't mark as paid without proof
- Amount must match exactly
- Transaction reference required

---

## 🆘 Troubleshooting

### If Step 1 fails:
- **Error: "column already exists"** → That's OK! Columns were already added
- **Error: "permission denied"** → Make sure you're logged in as project owner
- **No rows returned** → Run the SELECT query separately to verify

### If Step 2 fails:
- **Error: "bucket already exists"** → Delete it and recreate, or use existing one
- **Can't find "New bucket" button** → Make sure you're on Storage page
- **Bucket not showing** → Refresh the page

### If Step 3 fails:
- **Error: "policy already exists"** → That's OK! Policies were already created
- **Can't find Policies tab** → Make sure you clicked on the bucket first
- **SQL error** → Copy the SQL exactly as shown, including semicolons

### If Step 4 fails:
- **Modal doesn't open** → Hard refresh page (Ctrl+Shift+R)
- **Can't upload file** → Check Steps 2 and 3 completed correctly
- **Submit button stays disabled** → Fill all fields and check all boxes

---

## 📞 Need Help?

1. **Read the detailed guide:** `SUPABASE_STORAGE_SETUP_GUIDE.md`
2. **Check Supabase docs:** https://supabase.com/docs/guides/storage
3. **Watch a video:** Search "Supabase storage setup" on YouTube
4. **Check browser console:** Press F12 and look for error messages

---

## Quick Reference

### Bucket Name:
```
payment-receipts
```

### Bucket Settings:
- Public: ✅ Yes
- Size limit: 5MB

### Number of Policies:
```
3 policies total
```

### Test Booking Status:
```
"Confirmed" or "Payment Pending"
```

---

## Time Estimate

- ⏱️ Step 1: 2 minutes
- ⏱️ Step 2: 2 minutes  
- ⏱️ Step 3: 3 minutes
- ⏱️ Step 4: 1 minute

**Total: ~8 minutes** ⚡

---

## After Setup

Once complete, every time you mark a booking as paid:

1. Upload receipt modal opens
2. Upload the payment receipt
3. Enter amount and reference
4. Check verification boxes
5. System validates and stores receipt
6. Booking marked as paid with proof!

**No more unmarked payments!** 🎉
