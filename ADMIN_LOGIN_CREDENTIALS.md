# 🔐 Admin Dashboard - Login Credentials & Setup

## ✅ What's Been Completed

### 1. Supabase Configuration ✅
- **Supabase URL**: `https://kqlxdjkwklcvxfexevsi.supabase.co`
- **Anon Key**: Configured in `admin/js/config.js`
- **WhatsApp**: +2349039269846
- **Bank Details**: GTBank, 9039269846, Lekki Stays Ltd

### 2. RLS Policies Created ✅

The following Row Level Security policies have been created in your Supabase database:

```sql
✅ "Admins can read all bookings" - ON bookings FOR SELECT TO authenticated
✅ "Admins can update bookings" - ON bookings FOR UPDATE TO authenticated  
✅ "Admins can read all apartments" - ON apartments FOR SELECT TO authenticated
```

These policies allow authenticated admin users to:
- Read all bookings
- Update booking statuses
- View all apartments

### 3. Admin Dashboard Files ✅

All files are created and configured:
- ✅ Login page (`admin/index.html`)
- ✅ Dashboard UI (`admin/dashboard.html`)
- ✅ Authentication logic (`admin/js/auth.js`)
- ✅ Dashboard functionality (`admin/js/dashboard.js`)
- ✅ API client (`admin/js/api.js`)
- ✅ Configuration with real credentials (`admin/js/config.js`)
- ✅ Styles (`admin/css/admin.css`, `admin/css/dashboard.css`)

---

## 🚀 Final Step: Create Admin User

You need to create the admin user manually in Supabase Dashboard:

### Step 1: Go to Supabase Dashboard

Visit: https://supabase.com/dashboard/project/kqlxdjkwklcvxfexevsi/auth/users

### Step 2: Create Admin User

1. Click **"Add user"** button (top right)
2. Select **"Create new user"**
3. Fill in the form:
   - **Email**: `admin@luxstay.ng`
   - **Password**: (create a strong password - **SAVE THIS!**)
   - **Auto Confirm User**: ✅ **CHECK THIS BOX** (important!)
4. Click **"Create user"**

### Step 3: Save Your Credentials

**IMPORTANT**: Save these credentials securely!

```
Admin Login Credentials
========================
Email: geraldsaviour2@gmail.com
Password: [YOUR_PASSWORD_HERE]
Dashboard URL: http://localhost:3001 (local) or your deployed URL
```

---

## 🧪 Test Locally

### Start Local Server

```bash
cd admin
python -m http.server 3001
```

Or use one of these alternatives:

```bash
# Using npx serve
npx serve -p 3001

# Using PHP
php -S localhost:3001

# Using Node.js http-server
npx http-server -p 3001
```

### Access Dashboard

Visit: **http://localhost:3001**

### Login

- Email: `geraldsaviour2@gmail.com`
- Password: (your password from Step 2)

---

## 🎯 What You Should See

After logging in successfully, you should see:

1. **Dashboard Overview**
   - Total bookings count
   - Pending bookings count
   - Confirmed bookings count
   - Paid bookings count

2. **Recent Bookings**
   - List of recent bookings
   - Booking details (guest name, dates, apartment, etc.)
   - Action buttons (Confirm, Decline, Send Payment, Mark as Paid)

3. **All Bookings Page**
   - Complete list of all bookings
   - Search and filter functionality
   - Status filtering

4. **Apartments Page**
   - List of all apartments
   - Apartment details (name, location, price, etc.)

---

## 🔧 Troubleshooting

### Can't Login?

**Check these:**
1. ✅ Admin user created in Supabase?
2. ✅ "Auto Confirm User" was checked?
3. ✅ Email and password are correct?
4. ✅ Browser console shows no errors? (F12 → Console)

**Solution:**
- Go back to Supabase Dashboard → Authentication → Users
- Verify user exists with email `geraldsaviour2@gmail.com`
- Check "Email Confirmed" column shows ✅
- If not confirmed, click user → "Confirm email"

### Bookings Not Showing?

**Check these:**
1. ✅ RLS policies created? (they are!)
2. ✅ You're logged in?
3. ✅ Bookings exist in database?

**Solution:**
- Open browser console (F12)
- Look for errors
- Check Network tab for failed requests

### WhatsApp Not Working?

**Check these:**
1. ✅ Phone number format: +234XXXXXXXXXX
2. ✅ WhatsApp installed on device?

**Solution:**
- Test WhatsApp link manually
- Verify number in `admin/js/config.js`

---

## 📱 Deploy to Production

Once local testing is complete, deploy to production:

### Option 1: Vercel (Recommended)

```bash
cd admin
vercel --prod
```

### Option 2: Netlify

1. Push to GitHub
2. Connect to Netlify
3. Set build directory: `admin`
4. Deploy

### Option 3: Firebase Hosting

```bash
firebase init hosting
# Public directory: admin
firebase deploy --only hosting
```

---

## 🎊 You're Almost Done!

**Remaining steps:**

1. ✅ RLS policies created
2. ✅ Admin dashboard built
3. ✅ Configuration updated
4. ⏳ **Create admin user** (Step 2 above)
5. ⏳ **Test locally** (Step 3 above)
6. ⏳ **Deploy to production**

**After creating the admin user, you'll have:**
- ✅ Fully functional admin dashboard
- ✅ Real-time booking management
- ✅ WhatsApp payment integration
- ✅ Simplified workflow (no check-in/check-out!)
- ✅ Connected to main website

---

## 📚 Documentation

All documentation is in the `admin/` folder:

- **QUICK_START.md** - 3-minute setup guide
- **ADMIN_SETUP_COMPLETE.md** - Complete setup instructions
- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed setup guide

---

## 🔐 Security Reminders

1. **Never share your admin password**
2. **Use a strong password** (12+ characters, mixed case, numbers, symbols)
3. **Store credentials securely** (password manager recommended)
4. **Keep a backup admin account** (create another admin user as backup)
5. **Enable 2FA** (if available in Supabase)

---

## ✅ Success Checklist

Before going live:

- [ ] Admin user created in Supabase
- [ ] Email confirmed (Auto Confirm checked)
- [ ] Local testing completed
- [ ] Login works
- [ ] Dashboard loads
- [ ] Bookings display
- [ ] Actions work (Confirm, Decline, etc.)
- [ ] WhatsApp integration tested
- [ ] Deployed to production
- [ ] Production URL tested
- [ ] Credentials saved securely
- [ ] Team trained on new workflow

---

**Need Help?**

Check the documentation in the `admin/` folder or review the troubleshooting section above!

**Ready to go live?** Create the admin user and start managing bookings! 🚀
