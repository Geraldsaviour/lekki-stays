# Testing Payment Receipt System

## 🧪 Test Procedure

Follow these steps to test the receipt upload system:

---

## Test 1: Open Admin Dashboard

1. **Open your admin dashboard:**
   - Go to: http://localhost:3000/admin/dashboard.html
   - Or: http://localhost:3000/admin/

2. **Verify you're logged in:**
   - Should see dashboard with bookings
   - Should see your email in top right

✅ **Expected:** Dashboard loads successfully

---

## Test 2: Find a Test Booking

1. **Look for a booking with status:**
   - "Confirmed" (green badge)
   - OR "Payment Pending" (blue badge)

2. **If no bookings exist:**
   - Go to main website: http://localhost:3000
   - Make a test booking
   - Come back to dashboard

✅ **Expected:** At least one booking with "Confirmed" or "Payment Pending" status

---

## Test 3: Open Receipt Modal

1. **Find the booking card**
2. **Click the "Mark as Paid" button** (has dollar sign icon)
3. **Wait for modal to open**

✅ **Expected:** 
- Modal opens with title "Verify Payment Receipt"
- Shows booking reference
- Shows guest name
- Shows expected amount

❌ **If modal doesn't open:**
- Press F12 to open browser console
- Look for error messages
- Share the error with me

---

## Test 4: Upload Receipt Image

1. **Click "Choose File" or the upload area**
2. **Select any image from your computer:**
   - Can be a screenshot
   - Can be any JPG or PNG
   - Should be under 5MB

3. **Wait for preview to show**

✅ **Expected:**
- File input shows filename
- Image preview appears below
- Preview shows the image you selected

❌ **If upload fails:**
- Check file size (must be < 5MB)
- Check file type (JPG, PNG, PDF only)
- Check browser console for errors

---

## Test 5: Fill Payment Details

1. **Enter Amount:**
   - Type the exact amount shown in "Expected Amount"
   - Example: If it shows ₦90,000, type `90000`

2. **Enter Transaction Reference:**
   - Type any test reference
   - Example: `TEST-REF-12345`

✅ **Expected:**
- Amount field accepts numbers
- Reference field accepts text

---

## Test 6: Complete Verification Checklist

1. **Check all 3 boxes:**
   - [ ] Amount matches expected payment
   - [ ] Transaction reference is valid
   - [ ] Receipt is clear and readable

2. **Click each checkbox**

✅ **Expected:**
- Checkboxes can be checked
- "Verify & Mark as Paid" button becomes enabled (not grayed out)

❌ **If button stays disabled:**
- Make sure file is uploaded
- Make sure amount is entered
- Make sure reference is entered
- Make sure ALL 3 boxes are checked

---

## Test 7: Submit Receipt

1. **Click "Verify & Mark as Paid" button**
2. **Wait for upload to complete**
3. **Watch for success message**

✅ **Expected:**
- Button shows "Uploading..." with spinner
- After a few seconds, success message appears
- Modal closes automatically
- Booking status changes to "Paid" (green badge)
- Booking card updates

❌ **If it fails, check console for errors:**

**Common errors and solutions:**

### Error: "Amount mismatch"
- **Cause:** Amount entered doesn't match booking total
- **Fix:** Enter the exact amount shown in "Expected Amount"

### Error: "Failed to upload receipt"
- **Cause:** Storage bucket or policies not set up correctly
- **Fix:** 
  1. Go to Supabase → Storage
  2. Verify `payment-receipts` bucket exists
  3. Verify bucket is Public
  4. Go to Policies tab
  5. Verify 3 policies exist

### Error: "Failed to update booking"
- **Cause:** Database columns not added
- **Fix:** Run Step 1 SQL migration again

### Error: "Network error" or "CORS error"
- **Cause:** Supabase connection issue
- **Fix:** 
  1. Check internet connection
  2. Verify Supabase project is active
  3. Check `.env` file has correct Supabase URL and key

---

## Test 8: Verify Receipt Stored

1. **Go to Supabase Dashboard**
2. **Click Storage → payment-receipts bucket**
3. **Look for your uploaded file**

✅ **Expected:**
- File appears in bucket
- Filename starts with `receipt-BK-`
- File can be clicked to view

---

## Test 9: Verify Database Updated

1. **In Supabase, go to Table Editor**
2. **Click "bookings" table**
3. **Find your test booking**
4. **Check these columns:**
   - `status` = "paid"
   - `payment_receipt_url` = (has URL)
   - `payment_amount` = (your entered amount)
   - `payment_reference` = (your entered reference)
   - `payment_verified_by` = (your admin email)
   - `paid_at` = (current timestamp)

✅ **Expected:** All fields populated correctly

---

## Test 10: Test Amount Mismatch (Security Test)

1. **Find another booking with "Confirmed" status**
2. **Click "Mark as Paid"**
3. **Upload a receipt**
4. **Enter WRONG amount** (different from expected)
   - Example: If expected is ₦90,000, enter `85000`
5. **Fill reference and check boxes**
6. **Click "Verify & Mark as Paid"**

✅ **Expected:**
- Error message appears
- Says "Amount mismatch!"
- Shows expected vs entered amounts
- Booking NOT marked as paid
- Modal stays open

This proves the security validation works! ✅

---

## 🎉 Success Criteria

Your system is working if:

- ✅ Modal opens when clicking "Mark as Paid"
- ✅ Can upload image file
- ✅ Image preview shows
- ✅ Can enter amount and reference
- ✅ Can check all boxes
- ✅ Submit button enables
- ✅ Upload completes successfully
- ✅ Success message appears
- ✅ Booking status changes to "Paid"
- ✅ Receipt stored in Supabase Storage
- ✅ Database updated with receipt info
- ✅ Amount mismatch shows error

---

## 📊 Test Results Template

Copy this and fill it out:

```
TEST RESULTS
============

Test 1 - Dashboard loads: [ ] Pass [ ] Fail
Test 2 - Found test booking: [ ] Pass [ ] Fail
Test 3 - Modal opens: [ ] Pass [ ] Fail
Test 4 - File upload works: [ ] Pass [ ] Fail
Test 5 - Can enter details: [ ] Pass [ ] Fail
Test 6 - Checkboxes work: [ ] Pass [ ] Fail
Test 7 - Submit succeeds: [ ] Pass [ ] Fail
Test 8 - Receipt in storage: [ ] Pass [ ] Fail
Test 9 - Database updated: [ ] Pass [ ] Fail
Test 10 - Amount validation: [ ] Pass [ ] Fail

Overall: [ ] All Pass [ ] Some Failed

Notes:
______________________________________
______________________________________
______________________________________
```

---

## 🐛 If Something Fails

1. **Note which test failed**
2. **Check browser console (F12)**
3. **Copy any error messages**
4. **Check Supabase logs**
5. **Share the error with me**

I'll help you fix it!

---

## 📸 What to Check

### In Browser Console (F12):
- Look for red error messages
- Look for "Failed to..." messages
- Look for network errors

### In Supabase Dashboard:
- Storage → payment-receipts → Files uploaded?
- Table Editor → bookings → Fields populated?
- Logs → Any error logs?

---

## ✅ Ready to Test!

1. Open admin dashboard
2. Find a booking
3. Click "Mark as Paid"
4. Follow the tests above
5. Report back with results!

Let me know how it goes! 🚀
