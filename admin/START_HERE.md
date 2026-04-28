# 🚀 START HERE - Admin Dashboard Setup

## ⚡ Quick Start (5 Minutes)

Follow these steps to get your admin dashboard running:

---

## ✅ Step 1: Install Dependencies

Open your terminal and run:

```bash
cd admin
npm install
```

**Wait for it to complete.** You should see:
```
added 50 packages
```

---

## ✅ Step 2: Configure MongoDB Network Access

**IMPORTANT:** Without this step, the dashboard won't connect to MongoDB!

1. Go to: https://cloud.mongodb.com
2. Login with your credentials
3. Click on your cluster: **Cluster0**
4. Click **"Network Access"** in the left sidebar
5. Click **"Add IP Address"**
6. Select **"Allow Access from Anywhere"**
   - IP Address: `0.0.0.0/0`
   - Comment: "Allow all IPs"
7. Click **"Confirm"**

---

## ✅ Step 3: Create Admin User

Run this command:

```bash
npm run setup
```

**Enter your details when prompted:**

```
Admin Name: [Your Name]
Admin Email: [Your Email]
Admin Password: [Min 8 characters]
```

**Example:**
```
Admin Name: John Doe
Admin Email: admin@lekkistays.com
Admin Password: SecurePass123
```

**You should see:**
```
✅ Admin user created successfully!
🔐 You can now login at: http://localhost:3001
```

---

## ✅ Step 4: Start the Server

```bash
npm start
```

**You should see:**
```
✅ Connected to MongoDB (Admin Dashboard)
🔐 Lekki Stays Admin Dashboard running on port 3001
🌐 Visit: http://localhost:3001
```

---

## ✅ Step 5: Login

1. Open your browser
2. Go to: **http://localhost:3001**
3. Enter your email and password
4. Click **"Login"**

**You should see the dashboard!** 🎉

---

## 🎯 What You Can Do Now

### View Bookings
- See all bookings from your main website
- Filter by status (pending, confirmed, paid, etc.)
- Search by booking ID, guest name, email, or phone

### Manage Bookings
- **Confirm** pending bookings
- **Decline** bookings with a reason
- **Send payment details** via WhatsApp
- **Mark as paid** when payment is received
- **Check in** guests when they arrive
- **Check out** guests when they leave

### Monitor Activity
- View statistics (pending, confirmed, paid, completed)
- Track all booking status changes
- Review audit logs

---

## 🧪 Test the Complete Flow

### 1. Create a Test Booking

1. Go to your main website: http://localhost:3000
2. Browse apartments
3. Select dates
4. Fill the booking form
5. Submit

### 2. View in Admin Dashboard

1. Go to: http://localhost:3001
2. Click "Refresh" button
3. You should see the new booking with status "Pending"

### 3. Confirm the Booking

1. Find the pending booking
2. Click "Confirm" button
3. Keep "Send payment details" checked
4. Click "Confirm & Send Payment"
5. WhatsApp opens with payment message
6. Booking status changes to "Confirmed"

### 4. Mark as Paid

1. Find the confirmed booking
2. Click "Mark as Paid" button
3. Confirm the action
4. Status changes to "Paid"

---

## 🆘 Troubleshooting

### "Cannot find module 'express'"
**Fix:** Run `npm install` in the admin folder

### "MongoDB connection error"
**Fix:** 
1. Check MongoDB Atlas is running
2. Add 0.0.0.0/0 to Network Access
3. Verify connection string in `.env`

### "Admin user already exists"
**Fix:** You already created an admin. Just login!

### Can't login
**Fix:**
1. Check email/password are correct
2. Clear browser cookies
3. Check browser console for errors

### Bookings not showing
**Fix:**
1. Create a test booking on main website first
2. Click "Refresh" in admin dashboard
3. Check browser console for errors

---

## 📚 Documentation

Need more details? Check these files:

- **QUICK_START.md** - 5-minute quick start
- **SETUP_GUIDE.md** - Detailed setup instructions
- **README.md** - Complete documentation
- **NEXT_STEPS.md** - What to do next

---

## 🎉 You're Ready!

Your admin dashboard is now running!

### Quick Reference

**URLs:**
- Main Website: http://localhost:3000
- Admin Dashboard: http://localhost:3001

**Commands:**
```bash
# Start admin dashboard
cd admin
npm start

# Create new admin user
npm run setup

# Start with auto-reload (development)
npm run dev
```

**Features:**
- ✅ Secure login
- ✅ View all bookings
- ✅ Confirm/decline bookings
- ✅ Send payment details
- ✅ Mark as paid
- ✅ Check in/out guests
- ✅ Search and filter
- ✅ Audit logging

---

## 🚀 Next Steps

### For Development
- Keep testing the features
- Create more bookings
- Try all the actions
- Familiarize yourself with the dashboard

### Before Production
- Update JWT_SECRET in `.env`
- Update SESSION_SECRET in `.env`
- Use a strong admin password
- Deploy to Vercel
- Test on production

---

**Need help?** Check the documentation files or review the troubleshooting section above.

**Everything working?** Great! Start managing your bookings! 🎊
