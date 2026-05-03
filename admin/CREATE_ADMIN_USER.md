# 👤 Create Admin User - Quick Guide

## 🎯 One-Time Setup (2 Minutes)

### Step 1: Open Supabase Dashboard

Click this link: 
**https://supabase.com/dashboard/project/kqlxdjkwklcvxfexevsi/auth/users**

### Step 2: Create User

1. Click **"Add user"** (top right corner)
2. Select **"Create new user"**
3. Fill in:
   ```
   Email: admin@luxstay.ng
   Password: [CREATE STRONG PASSWORD]
   ```
4. ✅ **CHECK** "Auto Confirm User"
5. Click **"Create user"**

### Step 3: Save Credentials

**IMPORTANT**: Write these down NOW!

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ADMIN LOGIN CREDENTIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email:    admin@luxstay.ng
Password: [YOUR PASSWORD HERE]

Local:    http://localhost:3001
Deployed: [YOUR VERCEL URL]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ✅ Done! Now Test It

### Start Local Server

```bash
cd admin
python -m http.server 3001
```

### Login

1. Visit: http://localhost:3001
2. Enter email: `admin@luxstay.ng`
3. Enter your password
4. Click "Sign In"

### You Should See

- ✅ Dashboard with statistics
- ✅ Recent bookings
- ✅ All bookings page
- ✅ Apartments page
- ✅ Action buttons (Confirm, Decline, etc.)

---

## 🚨 Troubleshooting

### Login Fails?

**Check:**
1. Email is exactly: `admin@luxstay.ng`
2. Password is correct
3. "Auto Confirm User" was checked
4. User exists in Supabase Dashboard

**Fix:**
- Go to Supabase → Authentication → Users
- Find `admin@luxstay.ng`
- Check "Email Confirmed" column
- If not confirmed, click user → "Confirm email"

### Can't See Bookings?

**This is normal if:**
- No bookings exist yet
- You'll see "No bookings yet" message

**Test by:**
- Creating a test booking on main website
- Refresh admin dashboard
- Booking should appear

---

## 🎊 Success!

Once you can login and see the dashboard, you're ready to:

1. ✅ Manage bookings
2. ✅ Confirm/decline bookings
3. ✅ Send payment details via WhatsApp
4. ✅ Mark bookings as paid
5. ✅ View all apartments

**No more tedious check-in/check-out!** 🎉

---

## 📱 Next: Deploy to Production

```bash
cd admin
vercel --prod
```

Then update your credentials with the production URL!

---

**Questions?** Check `ADMIN_SETUP_COMPLETE.md` for full documentation!
