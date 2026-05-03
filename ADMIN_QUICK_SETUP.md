# 🚀 Admin Dashboard - Quick Setup (2 Minutes)

## ✅ What's Already Done

- ✅ Supabase configured
- ✅ RLS policies created
- ✅ Admin dashboard built
- ✅ All files ready

## 🎯 Final Step: Create Your Admin User

### 1. Open Supabase Dashboard

**Click this link:**
https://supabase.com/dashboard/project/kqlxdjkwklcvxfexevsi/auth/users

### 2. Create User

1. Click **"Add user"** (top right)
2. Select **"Create new user"**
3. Fill in:
   ```
   Email: geraldsaviour2@gmail.com
   Password: [CREATE A STRONG PASSWORD]
   ```
4. ✅ **CHECK** "Auto Confirm User" (IMPORTANT!)
5. Click **"Create user"**

### 3. Save Your Password

**WRITE THIS DOWN NOW:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  YOUR ADMIN LOGIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email:    geraldsaviour2@gmail.com
Password: [YOUR PASSWORD FROM STEP 2]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🧪 Test It Now

### Start Server

```bash
cd admin
python -m http.server 3001
```

### Login

1. Visit: **http://localhost:3001**
2. Email: `geraldsaviour2@gmail.com`
3. Password: (your password)
4. Click "Sign In"

## ✅ You Should See

- Dashboard with booking statistics
- Recent bookings list
- Action buttons (Confirm, Decline, Send Payment, etc.)
- Apartments page

## 🎊 Done!

You can now:
- ✅ Manage all bookings
- ✅ Confirm/decline bookings
- ✅ Send payment details via WhatsApp
- ✅ Mark bookings as paid
- ✅ No tedious check-in/check-out!

## 📱 Deploy to Production

```bash
cd admin
vercel --prod
```

---

**Need help?** Check `admin/CREATE_ADMIN_USER.md` for detailed instructions!
