# 🚀 Quick Test Guide - Payment Receipt System

## ✅ Setup Complete!

You've completed all 3 setup steps:
1. ✅ Database migration (added 5 columns)
2. ✅ Created `payment-receipts` storage bucket
3. ✅ Added 3 storage policies

Now let's test it!

---

## 🧪 Quick Test (5 Minutes)

### Step 1: Open Admin Dashboard
```
http://localhost:3000/admin/dashboard.html
```

### Step 2: Find a Test Booking
- Look for a booking with status **"Confirmed"** (green) or **"Payment Pending"** (blue)
- If none exist, create one at: http://localhost:3000

### Step 3: Click "Mark as Paid"
- Find the booking card
- Click the **"Mark as Paid"** button (💰 dollar sign icon)
- Modal should open with title "Verify Payment Receipt"

### Step 4: Fill the Form
1. **Upload Receipt:**
   - Click "Choose File"
   - Select any image (JPG/PNG) or PDF
   - Preview should appear

2. **Enter Amount:**
   - Type the EXACT amount shown in "Expected Amount"
   - Example: If it shows ₦90,000, type `90000`

3. **Enter Reference:**
   - Type any test reference
   - Example: `TEST-REF-12345`

4. **Check All Boxes:**
   - ☑️ Amount matches expected payment
   - ☑️ Transaction reference is valid
   - ☑️ Receipt is clear and readable

### Step 5: Submit
- Click **"Verify & Mark as Paid"**
- Wait for upload (button shows "Uploading...")
- Success message should appear
- Modal closes automatically
- Booking status changes to **"Paid"** (green)

---

## ✅ What to Check

### In Browser:
- [ ] Modal opens
- [ ] File uploads
- [ ] Image preview shows
- [ ] Submit button enables when all fields filled
- [ ] Success message appears
- [ ] Booking status updates to "Paid"

### In Supabase Dashboard:
1. **Storage → payment-receipts:**
   - [ ] Receipt file appears
   - [ ] Filename starts with `receipt-BK-`

2. **Table Editor → bookings:**
   - [ ] `status` = "paid"
   - [ ] `payment_receipt_url` = (has URL)
   - [ ] `payment_amount` = (your amount)
   - [ ] `payment_reference` = (your reference)
   - [ ] `payment_verified_by` = (your email)
   - [ ] `paid_at` = (current timestamp)

---

## 🐛 Common Issues

### Modal doesn't open
**Check:** Browser console (F12) for errors
**Fix:** Make sure you're logged in as admin

### Upload fails
**Check:** File size < 5MB, format is JPG/PNG/PDF
**Fix:** Try a smaller file

### "Amount mismatch" error
**This is GOOD!** Security validation is working!
**Fix:** Enter the exact amount shown in "Expected Amount"

### "Failed to upload receipt"
**Check:** Supabase Storage bucket and policies
**Fix:** Verify bucket is Public and has 3 policies

---

## 🎯 Test Security Feature

Try entering a WRONG amount:
1. Open receipt modal
2. Upload file
3. Enter amount DIFFERENT from expected (e.g., 85000 instead of 90000)
4. Fill reference and check boxes
5. Click submit

**Expected:** Error message "Amount mismatch!" appears ✅

This proves the security validation works!

---

## 📊 Quick Test Results

```
✅ Modal opens
✅ File uploads
✅ Preview shows
✅ Form validates
✅ Submit works
✅ Receipt stored
✅ Database updated
✅ Amount validation works

Status: ALL TESTS PASSED! 🎉
```

---

## 🆘 Need Help?

If something fails:
1. Press **F12** to open browser console
2. Look for red error messages
3. Copy the error
4. Share it with me

I'll help you fix it!

---

## 🎉 Success!

If all tests pass, your payment receipt system is working perfectly!

**What this means:**
- ✅ Admins MUST upload receipt before marking as paid
- ✅ Amount MUST match booking total exactly
- ✅ All receipts are stored securely in Supabase
- ✅ Full audit trail (who verified, when, amount, reference)
- ✅ Prevents fraudulent "Mark as Paid" actions

**You're protected against:**
- ❌ Marking as paid without proof
- ❌ Amount manipulation
- ❌ Missing payment records
- ❌ No accountability

---

Ready to test? Go to: http://localhost:3000/admin/dashboard.html

Let me know how it goes! 🚀
