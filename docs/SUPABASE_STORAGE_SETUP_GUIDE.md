# Supabase Storage Setup - Step-by-Step Guide

## Step 2: Create Storage Bucket

### 1. Open Supabase Dashboard

1. Go to https://supabase.com
2. Click **"Sign in"** (top right)
3. Log in with your account
4. You'll see your projects list
5. Click on your **LuxStay/Lekki Stays project**

### 2. Navigate to Storage

1. On the left sidebar, look for **"Storage"** icon (looks like a folder)
2. Click **"Storage"**
3. You'll see the Storage page

### 3. Create New Bucket

1. Click the **"New bucket"** button (green button, top right)
2. A modal will pop up with these fields:

**Fill in the form:**

```
Name: payment-receipts
```
(Type exactly: payment-receipts, no spaces, lowercase)

```
Public bucket: ✅ CHECK THIS BOX
```
(Very important! Must be checked so receipts can be viewed)

```
File size limit: 5242880
```
(This is 5MB in bytes, or just type "5" and select "MB" from dropdown)

```
Allowed MIME types: (leave empty for all types)
```
(Leave this blank to allow images and PDFs)

3. Click **"Create bucket"** button at the bottom

### 4. Verify Bucket Created

You should now see `payment-receipts` in your buckets list on the left side.

---

## Step 3: Set Storage Policies

### Why Policies Are Needed

Policies control who can upload, view, and delete files. Without policies, the bucket won't work.

### 1. Open Bucket Policies

1. Click on **"payment-receipts"** bucket (in the left sidebar)
2. Click the **"Policies"** tab (top of the page)
3. You'll see "No policies created yet"

### 2. Create Policy #1: Allow Uploads

1. Click **"New Policy"** button
2. You'll see policy templates
3. Click **"For full customization"** (at the bottom)
4. A code editor will appear

**Copy and paste this EXACTLY:**

```sql
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment-receipts');
```

5. Click **"Review"** button
6. Click **"Save policy"** button

**What this does:** Allows logged-in admins to upload receipts

### 3. Create Policy #2: Allow Public Read

1. Click **"New Policy"** button again
2. Click **"For full customization"**
3. Copy and paste this:

```sql
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-receipts');
```

4. Click **"Review"**
5. Click **"Save policy"**

**What this does:** Allows anyone to view receipts (needed to display them in dashboard)

### 4. Create Policy #3: Allow Delete

1. Click **"New Policy"** button again
2. Click **"For full customization"**
3. Copy and paste this:

```sql
CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'payment-receipts');
```

4. Click **"Review"**
5. Click **"Save policy"**

**What this does:** Allows admins to delete receipts if needed

### 5. Verify All Policies Created

You should now see **3 policies** in the Policies tab:
- ✅ Allow authenticated uploads
- ✅ Allow public read
- ✅ Allow authenticated delete

---

## Visual Guide

### What You'll See:

#### Storage Page:
```
┌─────────────────────────────────────────┐
│  Storage                                │
├─────────────────────────────────────────┤
│  Buckets                [New bucket]    │
│                                         │
│  📁 payment-receipts                    │
│     Public • 0 objects                  │
└─────────────────────────────────────────┘
```

#### Policies Tab:
```
┌─────────────────────────────────────────┐
│  payment-receipts                       │
├─────────────────────────────────────────┤
│  [Files] [Policies] [Settings]          │
│                                         │
│  Policies                [New Policy]   │
│                                         │
│  ✅ Allow authenticated uploads         │
│  ✅ Allow public read                   │
│  ✅ Allow authenticated delete          │
└─────────────────────────────────────────┘
```

---

## Alternative Method: Using SQL Editor

If you prefer, you can create all policies at once using SQL Editor:

### 1. Go to SQL Editor

1. Click **"SQL Editor"** in left sidebar
2. Click **"New query"**

### 2. Run This SQL

Copy and paste ALL of this:

```sql
-- Create policies for payment-receipts bucket

-- Policy 1: Allow authenticated uploads
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'payment-receipts');

-- Policy 2: Allow public read
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payment-receipts');

-- Policy 3: Allow authenticated delete
CREATE POLICY "Allow authenticated delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'payment-receipts');

-- Verify policies were created
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'objects' 
AND policyname LIKE '%payment-receipts%';
```

3. Click **"Run"** (or press Ctrl+Enter)
4. You should see 3 rows returned showing the policies

---

## Troubleshooting

### "Bucket already exists" error

**Solution:** The bucket name is taken. Either:
- Use a different name (update code to match)
- Delete the existing bucket and recreate

### "Policy already exists" error

**Solution:** The policy was already created. Either:
- Skip that policy
- Delete it and recreate
- Check if it's working (might be fine)

### Can't see "New bucket" button

**Solution:** 
- Make sure you're on the Storage page
- Check you have admin access to the project
- Try refreshing the page

### Policies not working

**Solution:**
1. Verify all 3 policies are created
2. Check bucket is set to "Public"
3. Try deleting and recreating policies
4. Check policy names match exactly

---

## Testing the Setup

### Test Upload (Optional)

1. Go to Storage → payment-receipts bucket
2. Click **"Upload file"** button
3. Select any image from your computer
4. Click **"Upload"**
5. If successful, you'll see the file in the bucket

### Test in Dashboard

1. Go to your admin dashboard
2. Find any booking with "Confirmed" status
3. Click **"Mark as Paid"** button
4. Modal should open
5. Try uploading a test image
6. If it works, setup is complete! ✅

---

## Quick Checklist

After completing steps 2 and 3, verify:

- [ ] Bucket `payment-receipts` exists
- [ ] Bucket is set to **Public**
- [ ] Policy "Allow authenticated uploads" exists
- [ ] Policy "Allow public read" exists
- [ ] Policy "Allow authenticated delete" exists
- [ ] Can upload test file to bucket
- [ ] Receipt modal opens in dashboard
- [ ] Can select file in modal

---

## Common Questions

### Q: Why does the bucket need to be public?

**A:** So receipts can be viewed in the admin dashboard. The receipts are stored with unique filenames, so they're not easily guessable.

### Q: Can I use a different bucket name?

**A:** Yes, but you'll need to update the code in `admin/js/dashboard.js`:

```javascript
// Change this line:
.from('payment-receipts')

// To your bucket name:
.from('your-bucket-name')
```

### Q: What if I delete a receipt by accident?

**A:** The URL is still saved in the database, but the file is gone. You'll need to ask the guest for the receipt again.

### Q: How much storage do I get?

**A:** Supabase free tier includes 1GB storage. Each receipt is typically 100KB-500KB, so you can store thousands of receipts.

### Q: Can I see all uploaded receipts?

**A:** Yes! Go to Storage → payment-receipts bucket, and you'll see all uploaded files.

---

## Video Tutorial (If Needed)

If you're still stuck, here's what to search on YouTube:
- "Supabase create storage bucket"
- "Supabase storage policies tutorial"
- "Supabase storage setup"

---

## Need More Help?

If you're still having trouble:

1. **Check Supabase Docs:** https://supabase.com/docs/guides/storage
2. **Screenshot the error:** Take a screenshot of any error messages
3. **Check browser console:** Press F12 and look for errors
4. **Verify project:** Make sure you're in the correct Supabase project

---

## Summary

**Step 2: Create Bucket**
1. Go to Storage
2. Click "New bucket"
3. Name: `payment-receipts`
4. Public: ✅ Yes
5. Click "Create"

**Step 3: Add Policies**
1. Click bucket → Policies tab
2. Create 3 policies (upload, read, delete)
3. Use SQL provided above
4. Verify all 3 show in list

**Done!** ✅

Your payment receipt system is now ready to use!
