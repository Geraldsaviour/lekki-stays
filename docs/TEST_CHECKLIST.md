# ✅ Payment Receipt System - Test Checklist

## Pre-Test Verification

### 1. Server Running
```bash
# Check if server is running
curl http://localhost:3000
```
✅ Should return HTML page

### 2. Admin Login
- Go to: http://localhost:3000/admin/
- Login with: `geraldsaviour2@gmail.com`
- ✅ Should redirect to dashboard

### 3. Database Columns
Check in Supabase → Table Editor → bookings:
- ✅ `payment_receipt_url` (text)
- ✅ `payment_receipt_uploaded_at` (timestamp)
- ✅ `payment_amount` (numeric)
- ✅ `payment_reference` (text)
- ✅ `payment_verified_by` (text)

### 4. Storage Bucket
Check in Supabase → Storage:
- ✅ Bucket `payment-receipts` exists
- ✅ Bucket is Public
- ✅ Has 3 policies (upload, read, delete)

---

## Test Scenarios

### ✅ Test 1: Happy Path (Everything Works)

**Steps:**
1. Open dashboard: http://localhost:3000/admin/dashboard.html
2. Find booking with status "Confirmed" or "Payment Pending"
3. Click "Mark as Paid" button
4. Upload image file (< 5MB)
5. Enter EXACT amount from "Expected Amount"
6. Enter reference: `TEST-REF-001`
7. Check all 3 boxes
8. Click "Verify & Mark as Paid"

**Expected Result:**
- ✅ Success message appears
- ✅ Modal closes
- ✅ Booking status → "Paid" (green)
- ✅ Receipt in Supabase Storage
- ✅ Database updated with all fields

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 2: Amount Mismatch (Security)

**Steps:**
1. Open receipt modal for a booking
2. Upload image
3. Enter WRONG amount (e.g., 85000 instead of 90000)
4. Enter reference
5. Check all boxes
6. Click submit

**Expected Result:**
- ✅ Error message: "Amount mismatch!"
- ✅ Shows expected vs entered amounts
- ✅ Booking NOT marked as paid
- ✅ Modal stays open

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 3: Missing File

**Steps:**
1. Open receipt modal
2. DON'T upload file
3. Enter amount and reference
4. Check all boxes

**Expected Result:**
- ✅ Submit button stays DISABLED (grayed out)
- ✅ Cannot submit

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 4: Missing Amount

**Steps:**
1. Open receipt modal
2. Upload file
3. DON'T enter amount
4. Enter reference
5. Check all boxes

**Expected Result:**
- ✅ Submit button stays DISABLED
- ✅ Cannot submit

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 5: Missing Reference

**Steps:**
1. Open receipt modal
2. Upload file
3. Enter amount
4. DON'T enter reference
5. Check all boxes

**Expected Result:**
- ✅ Submit button stays DISABLED
- ✅ Cannot submit

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 6: Unchecked Boxes

**Steps:**
1. Open receipt modal
2. Upload file
3. Enter amount and reference
4. DON'T check all boxes (leave 1 unchecked)

**Expected Result:**
- ✅ Submit button stays DISABLED
- ✅ Cannot submit

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 7: Large File

**Steps:**
1. Open receipt modal
2. Try to upload file > 5MB

**Expected Result:**
- ✅ Error message or file rejected
- ✅ Cannot proceed

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 8: Wrong File Type

**Steps:**
1. Open receipt modal
2. Try to upload .txt or .doc file

**Expected Result:**
- ✅ File picker only shows images/PDFs
- ✅ Or error if wrong type selected

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 9: Image Preview

**Steps:**
1. Open receipt modal
2. Upload JPG or PNG image

**Expected Result:**
- ✅ Image preview appears below upload button
- ✅ Shows the uploaded image

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 10: Cancel Modal

**Steps:**
1. Open receipt modal
2. Fill some fields
3. Click "Cancel" button

**Expected Result:**
- ✅ Modal closes
- ✅ Form resets (all fields cleared)
- ✅ Booking NOT marked as paid

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 11: Close Modal (X button)

**Steps:**
1. Open receipt modal
2. Fill some fields
3. Click X button in top right

**Expected Result:**
- ✅ Modal closes
- ✅ Form resets
- ✅ Booking NOT marked as paid

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 12: Close Modal (Overlay)

**Steps:**
1. Open receipt modal
2. Fill some fields
3. Click outside modal (on dark overlay)

**Expected Result:**
- ✅ Modal closes
- ✅ Form resets
- ✅ Booking NOT marked as paid

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 13: Multiple Uploads

**Steps:**
1. Mark booking #1 as paid with receipt
2. Mark booking #2 as paid with receipt
3. Mark booking #3 as paid with receipt

**Expected Result:**
- ✅ All 3 receipts stored separately
- ✅ All 3 bookings marked as paid
- ✅ Each has unique receipt URL

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 14: Receipt Persistence

**Steps:**
1. Mark booking as paid with receipt
2. Refresh dashboard page
3. Check booking status

**Expected Result:**
- ✅ Booking still shows "Paid" status
- ✅ Receipt URL still in database
- ✅ Receipt file still in storage

**Status:** [ ] Pass [ ] Fail

---

### ✅ Test 15: Audit Trail

**Steps:**
1. Mark booking as paid with receipt
2. Go to Supabase → Table Editor → bookings
3. Find the booking row
4. Check `payment_verified_by` column

**Expected Result:**
- ✅ Shows admin email: `geraldsaviour2@gmail.com`
- ✅ `paid_at` timestamp is set
- ✅ All payment fields populated

**Status:** [ ] Pass [ ] Fail

---

## Summary

**Total Tests:** 15
**Passed:** ___
**Failed:** ___

**Overall Status:** [ ] All Pass [ ] Some Failed

---

## If Tests Fail

### Check Browser Console (F12)
Look for:
- Red error messages
- Network errors (failed requests)
- JavaScript errors

### Check Supabase Dashboard
- Storage → payment-receipts → Files uploaded?
- Table Editor → bookings → Fields updated?
- Logs → Any errors?

### Common Fixes

**Modal doesn't open:**
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check console for errors

**Upload fails:**
- Verify storage bucket exists
- Verify bucket is Public
- Verify policies are set

**Amount validation doesn't work:**
- Check booking total_price in database
- Verify amount is entered as number (no commas)

**Database not updating:**
- Verify columns exist
- Check Supabase connection
- Verify admin is logged in

---

## Success Criteria

System is working if:
- ✅ All 15 tests pass
- ✅ Receipts stored in Supabase
- ✅ Database updated correctly
- ✅ Amount validation works
- ✅ Form validation works
- ✅ Audit trail complete

---

## Next Steps After Testing

1. **If all pass:** System is production-ready! 🎉
2. **If some fail:** Share failed test numbers and errors
3. **Document any issues:** Note what went wrong
4. **Test on mobile:** Verify responsive design works

---

Ready to test? Start with Test 1! 🚀
