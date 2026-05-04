# 🔧 Payment Receipt System - Troubleshooting Guide

## Quick Diagnostics

### 1. Check Server Status
```bash
# Windows PowerShell
Get-Process -Name node

# Should show node processes running
```

### 2. Check Browser Console
Press **F12** → Console tab
Look for:
- ❌ Red error messages
- ⚠️ Yellow warnings
- 🔵 Blue info messages

### 3. Check Network Tab
Press **F12** → Network tab
Look for:
- ❌ Failed requests (red)
- ⚠️ 404 errors
- ⚠️ 500 errors

---

## Common Issues & Solutions

### Issue 1: Modal Doesn't Open

**Symptoms:**
- Click "Mark as Paid" button
- Nothing happens
- No modal appears

**Possible Causes:**
1. JavaScript error
2. Modal HTML missing
3. Event listener not attached

**Solutions:**

**Step 1: Check Console**
```javascript
// Look for errors like:
// "Cannot read property 'classList' of null"
// "receiptModal is not defined"
```

**Step 2: Verify Modal HTML**
- Open `admin/dashboard.html`
- Search for `id="receiptModal"`
- Should exist in file

**Step 3: Hard Refresh**
```
Windows: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

**Step 4: Clear Cache**
- F12 → Application → Clear storage
- Click "Clear site data"
- Refresh page

---

### Issue 2: File Upload Fails

**Symptoms:**
- Select file
- No preview appears
- Or error message

**Possible Causes:**
1. File too large (> 5MB)
2. Wrong file type
3. Storage bucket not set up

**Solutions:**

**Step 1: Check File Size**
```
Right-click file → Properties
Size should be < 5MB
```

**Step 2: Check File Type**
```
Accepted: .jpg, .jpeg, .png, .pdf
Not accepted: .txt, .doc, .docx, etc.
```

**Step 3: Verify Storage Bucket**
1. Go to Supabase Dashboard
2. Click Storage
3. Look for `payment-receipts` bucket
4. Should be Public
5. Should have 3 policies

**Step 4: Check Console Error**
```javascript
// Look for:
// "Storage bucket not found"
// "Permission denied"
// "File too large"
```

---

### Issue 3: Submit Button Stays Disabled

**Symptoms:**
- Fill all fields
- Check all boxes
- Button still grayed out

**Possible Causes:**
1. Missing required field
2. Validation not working
3. JavaScript error

**Solutions:**

**Step 1: Verify All Fields**
- [ ] File uploaded
- [ ] Amount entered (number only)
- [ ] Reference entered (any text)
- [ ] All 3 boxes checked

**Step 2: Check Console**
```javascript
// Look for validation errors
```

**Step 3: Try Different File**
- Use smaller file
- Use JPG instead of PDF
- Use different image

**Step 4: Refresh Page**
- Hard refresh (Ctrl+Shift+R)
- Try again

---

### Issue 4: "Amount Mismatch" Error

**Symptoms:**
- Submit form
- Error: "Amount mismatch!"
- Shows expected vs entered

**This is CORRECT behavior!**

**Solution:**
Enter the EXACT amount shown in "Expected Amount"

**Example:**
```
Expected Amount: ₦90,000
You must enter: 90000 (no commas, no currency symbol)
```

**Why this happens:**
- Security feature
- Prevents fraud
- Ensures payment matches booking

---

### Issue 5: Upload Succeeds But Database Not Updated

**Symptoms:**
- Success message appears
- Receipt in storage
- But booking still "Confirmed" (not "Paid")

**Possible Causes:**
1. Database columns missing
2. Update query failed
3. Permission issue

**Solutions:**

**Step 1: Verify Database Columns**
Go to Supabase → Table Editor → bookings

Check these columns exist:
- `payment_receipt_url`
- `payment_receipt_uploaded_at`
- `payment_amount`
- `payment_reference`
- `payment_verified_by`

**Step 2: Run Migration Again**
```sql
-- Copy from: supabase/migrations/add_payment_receipt_fields.sql
-- Run in Supabase SQL Editor
```

**Step 3: Check Console**
```javascript
// Look for:
// "Failed to update booking"
// "Permission denied"
```

**Step 4: Verify Admin Login**
- Make sure you're logged in
- Check email shows in top right
- Try logout and login again

---

### Issue 6: Receipt Not Appearing in Storage

**Symptoms:**
- Upload succeeds
- Database updated
- But no file in storage bucket

**Possible Causes:**
1. Upload failed silently
2. Wrong bucket name
3. Permission issue

**Solutions:**

**Step 1: Check Bucket Name**
Should be exactly: `payment-receipts` (with hyphen)

**Step 2: Verify Policies**
Go to Supabase → Storage → payment-receipts → Policies

Should have 3 policies:
1. **Upload receipts** (INSERT)
2. **Read receipts** (SELECT)
3. **Delete receipts** (DELETE)

**Step 3: Check Console**
```javascript
// Look for:
// "Failed to upload receipt"
// "Bucket not found"
```

**Step 4: Test Manual Upload**
1. Go to Supabase → Storage → payment-receipts
2. Click "Upload file"
3. Try uploading manually
4. If fails, policies are wrong

---

### Issue 7: Image Preview Not Showing

**Symptoms:**
- Upload file
- No preview appears
- But file is selected

**Possible Causes:**
1. File is PDF (no preview for PDFs)
2. Image too large
3. JavaScript error

**Solutions:**

**Step 1: Check File Type**
```
Preview only works for images (.jpg, .png)
PDFs don't show preview (this is normal)
```

**Step 2: Try Different Image**
- Use smaller image
- Use JPG format
- Use different file

**Step 3: Check Console**
```javascript
// Look for FileReader errors
```

---

### Issue 8: Modal Won't Close

**Symptoms:**
- Click X button
- Click Cancel
- Click outside
- Modal stays open

**Possible Causes:**
1. Event listener not working
2. JavaScript error
3. Modal overlay issue

**Solutions:**

**Step 1: Force Close**
```javascript
// Open console (F12)
// Type:
document.getElementById('receiptModal').classList.remove('active');
```

**Step 2: Refresh Page**
- Hard refresh (Ctrl+Shift+R)

**Step 3: Check Console**
```javascript
// Look for event listener errors
```

---

### Issue 9: "Failed to Upload Receipt" Error

**Symptoms:**
- Click submit
- Error: "Failed to upload receipt"
- Upload doesn't complete

**Possible Causes:**
1. Storage bucket not set up
2. Policies missing
3. Network error
4. File too large

**Solutions:**

**Step 1: Verify Storage Setup**
```
Supabase → Storage → payment-receipts
- Bucket exists? ✅
- Bucket is Public? ✅
- Has 3 policies? ✅
```

**Step 2: Check File Size**
```
Must be < 5MB
Check file properties
```

**Step 3: Check Network**
```
F12 → Network tab
Look for failed requests to Supabase
```

**Step 4: Check Supabase Status**
```
Go to: https://status.supabase.com
Verify all systems operational
```

---

### Issue 10: Multiple Modals Open

**Symptoms:**
- Multiple modals stacked
- Can't close any
- Page frozen

**Solution:**

**Force Close All Modals:**
```javascript
// Open console (F12)
// Type:
document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
```

**Then refresh page:**
```
Ctrl + Shift + R
```

---

## Advanced Diagnostics

### Check Supabase Connection

```javascript
// Open console (F12)
// Type:
const { data, error } = await supabase.from('bookings').select('*').limit(1);
console.log('Data:', data);
console.log('Error:', error);

// Should show booking data, not error
```

### Check Storage Access

```javascript
// Open console (F12)
// Type:
const { data, error } = await supabase.storage.from('payment-receipts').list();
console.log('Files:', data);
console.log('Error:', error);

// Should show files list, not error
```

### Check Admin User

```javascript
// Open console (F12)
// Type:
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user);

// Should show your email
```

---

## Error Messages Explained

### "Amount mismatch!"
✅ **This is correct!** Security feature working.
**Fix:** Enter exact amount from "Expected Amount"

### "Failed to upload receipt"
❌ Storage issue
**Fix:** Check storage bucket and policies

### "Failed to update booking"
❌ Database issue
**Fix:** Check database columns exist

### "Permission denied"
❌ Auth issue
**Fix:** Make sure you're logged in as admin

### "Bucket not found"
❌ Storage not set up
**Fix:** Create `payment-receipts` bucket

### "File too large"
❌ File > 5MB
**Fix:** Use smaller file

---

## Still Having Issues?

### Collect This Information:

1. **Error Message:**
   ```
   Copy exact error from console
   ```

2. **Browser:**
   ```
   Chrome / Firefox / Safari / Edge
   Version: ___
   ```

3. **What You Did:**
   ```
   Step-by-step what you clicked
   ```

4. **What Happened:**
   ```
   What you saw vs what you expected
   ```

5. **Console Errors:**
   ```
   Copy all red errors from F12 console
   ```

6. **Network Errors:**
   ```
   F12 → Network → Copy failed requests
   ```

### Share With Me:
Send all the above information and I'll help you fix it!

---

## Prevention Tips

### Before Testing:
1. ✅ Verify server is running
2. ✅ Verify logged in as admin
3. ✅ Verify database columns exist
4. ✅ Verify storage bucket set up
5. ✅ Clear browser cache

### During Testing:
1. ✅ Keep console open (F12)
2. ✅ Watch for errors
3. ✅ Use small test files
4. ✅ Enter exact amounts
5. ✅ Check all boxes

### After Testing:
1. ✅ Verify receipt in storage
2. ✅ Verify database updated
3. ✅ Verify booking status changed
4. ✅ Test amount validation
5. ✅ Test form validation

---

## Quick Reference

### Open Console
```
Windows: F12 or Ctrl+Shift+I
Mac: Cmd+Option+I
```

### Hard Refresh
```
Windows: Ctrl+Shift+R
Mac: Cmd+Shift+R
```

### Clear Cache
```
F12 → Application → Clear storage → Clear site data
```

### Force Close Modal
```javascript
document.getElementById('receiptModal').classList.remove('active');
```

### Check Supabase Connection
```javascript
const { data, error } = await supabase.from('bookings').select('*').limit(1);
console.log(data, error);
```

---

Ready to troubleshoot? Start with the issue that matches your problem! 🔧
