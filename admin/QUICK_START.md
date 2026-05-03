# 🚀 Admin Dashboard Quick Start

## 3-Minute Setup

### 1. Create Admin User (2 minutes)

1. Go to: https://supabase.com/dashboard/project/kqlxdjkwklcvxfexevsi/auth/users
2. Click **"Add user"** → **"Create new user"**
3. Email: `admin@luxstay.ng`
4. Password: (create strong password)
5. ✅ Check "Auto Confirm User"
6. Click **"Create user"**

### 2. Add RLS Policies (1 minute)

Go to: https://supabase.com/dashboard/project/kqlxdjkwklcvxfexevsi/editor

Run this SQL:

```sql
-- Allow admins to read bookings
CREATE POLICY "Admins can read all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

-- Allow admins to update bookings
CREATE POLICY "Admins can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true);

-- Allow admins to read apartments
CREATE POLICY "Admins can read apartments"
  ON apartments FOR SELECT
  TO authenticated
  USING (true);
```

### 3. Test Locally

```bash
cd admin
python -m http.server 3001
```

Visit: http://localhost:3001

Login:
- Email: `admin@luxstay.ng`
- Password: (your password)

### 4. Deploy

```bash
vercel --prod
```

## Done! 🎉

Your admin dashboard is live and ready to manage bookings!

---

## Daily Workflow

### When New Booking Arrives

1. **Check Dashboard** - New booking appears with "Pending" status
2. **Review Details** - Click "View Details" to see guest info
3. **Confirm Booking** - Click "Confirm" button
4. **Send Payment** - Click "Send Payment Details" (opens WhatsApp)
5. **Wait for Payment** - Guest sends payment receipt
6. **Mark as Paid** - Click "Mark as Paid" button
7. **Done!** - Booking secured, guest confirmed

### Status Colors

- 🟡 **Pending** - New booking, needs review
- 🟢 **Confirmed** - Approved, awaiting payment
- 🔵 **Paid** - Payment received, booking secured
- ⚪ **Completed** - Guest checked out
- 🔴 **Declined** - Booking rejected
- ⚫ **Cancelled** - Booking cancelled

### Quick Actions

| Action | When to Use |
|--------|-------------|
| **Confirm** | Dates available, approve booking |
| **Send Payment** | After confirming, send bank details |
| **Mark as Paid** | Payment received and verified |
| **Decline** | Dates unavailable or other issues |
| **Cancel** | Guest requests cancellation |

---

## Keyboard Shortcuts

- `Ctrl + R` - Refresh dashboard
- `Ctrl + F` - Search bookings
- `Esc` - Close modal

---

## Support

**Issues?** Check:
1. Browser console (F12)
2. Supabase logs
3. `ADMIN_SETUP_COMPLETE.md` for troubleshooting

**Questions?** Review:
- `README.md` - Full documentation
- `SETUP_GUIDE.md` - Detailed setup
- `ADMIN_SETUP_COMPLETE.md` - Complete guide

---

**You're all set!** Start managing bookings now! 🏨
