# 🚀 RUN THIS NOW - Step by Step

## Your Supabase Project
**URL:** https://kqlxdjkwklcvxfexevsi.supabase.co

## Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

Click this link to go directly to your SQL Editor:
👉 **https://supabase.com/dashboard/project/kqlxdjkwklcvxfexevsi/sql/new**

Or manually:
1. Go to https://supabase.com
2. Click on your project: `kqlxdjkwklcvxfexevsi`
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"

### Step 2: Copy This SQL

```sql
-- Add decline_reason and cancellation_reason columns
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS decline_reason TEXT,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'bookings' 
AND column_name IN ('decline_reason', 'cancellation_reason');
```

### Step 3: Paste and Run

1. Paste the SQL into the editor
2. Click the green "Run" button (or press Ctrl+Enter)
3. You should see a success message

### Step 4: Verify It Worked

You should see this output:
```
column_name          | data_type
---------------------|----------
decline_reason       | text
cancellation_reason  | text
```

### Step 5: Test the Admin Dashboard

1. Go to: http://localhost:3000/admin
2. Log in with: geraldsaviour2@gmail.com
3. Find a pending booking
4. Click "Decline" button
5. You should see a beautiful modal! 🎉

## What This Does

This SQL command adds two new columns to your `bookings` table:
- `decline_reason` - Stores why you declined a booking
- `cancellation_reason` - Stores why you cancelled a booking

The `IF NOT EXISTS` part means it's safe to run multiple times - it won't create duplicates.

## Troubleshooting

### "Permission denied"
- Make sure you're logged into Supabase
- Make sure you're the project owner

### "Table 'bookings' does not exist"
- Check if you ran the main schema.sql file first
- The bookings table should already exist

### "Column already exists"
- That's fine! It means you already ran this
- The admin dashboard should work now

## After Running This

✅ Decline booking will work without errors
✅ Cancel booking will work without errors
✅ Beautiful modal will appear instead of browser prompt
✅ Reasons will be saved to database

## Need Help?

If you get any errors:
1. Copy the error message
2. Share it with me
3. I'll help you fix it!

---

**Quick Link:** https://supabase.com/dashboard/project/kqlxdjkwklcvxfexevsi/sql/new

Just click, paste, and run! 🚀
