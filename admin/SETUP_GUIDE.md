# 🚀 Admin Dashboard Setup Guide

Complete step-by-step guide to get your admin dashboard running.

---

## 📋 Prerequisites

- Node.js installed (v18 or higher)
- MongoDB Atlas account (already configured)
- Main booking website running

---

## Step 1: Install Dependencies (2 minutes)

Open terminal and navigate to the admin folder:

```bash
cd admin
npm install
```

You should see:
```
added 50 packages
```

---

## Step 2: Verify Configuration (1 minute)

The `.env` file is already configured with:
- ✅ MongoDB connection (same as main app)
- ✅ WhatsApp number
- ✅ Bank details
- ✅ Port 3001 (different from main app)

**No changes needed for local testing!**

---

## Step 3: Create Admin User (2 minutes)

Run the setup script:

```bash
npm run setup
```

You'll be prompted:

```
🔐 Lekki Stays Admin Setup

This will create the first admin user for your dashboard.

Admin Name: Your Name
Admin Email: admin@lekkistays.com
Admin Password: (min 8 characters)
```

**Enter your details:**
- Name: Your full name
- Email: Your email address
- Password: Strong password (min 8 characters)

You should see:
```
✅ Admin user created successfully!

📋 Admin Details:
   Name: Your Name
   Email: admin@lekkistays.com
   ID: 507f1f77bcf86cd799439011

🔐 You can now login at: http://localhost:3001
```

---

## Step 4: Start the Server (1 minute)

```bash
npm start
```

You should see:
```
🔐 Lekki Stays Admin Dashboard running on port 3001
🌐 Visit: http://localhost:3001
📊 Environment: development
✅ Connected to MongoDB (Admin Dashboard)
```

---

## Step 5: Login (1 minute)

1. Open your browser
2. Go to: **http://localhost:3001**
3. You should see the login page
4. Enter your email and password
5. Click "Login"

If successful, you'll be redirected to the dashboard!

---

## Step 6: Test the Dashboard (5 minutes)

### View Statistics
You should see overview cards showing:
- Pending bookings
- Confirmed bookings
- Paid bookings
- Completed bookings

### View Bookings
Scroll down to see the bookings list.

If you have bookings from the main website, they'll appear here!

### Test Filters
- Try changing the status filter
- Try searching for a booking
- Try clicking refresh

---

## 🎉 Success!

Your admin dashboard is now running!

---

## 🧪 Testing the Complete Flow

### Test 1: Create a Booking (Main Website)

1. Go to your main website: http://localhost:3000
2. Select an apartment
3. Choose dates
4. Fill booking form
5. Submit booking

### Test 2: View in Admin Dashboard

1. Go to admin dashboard: http://localhost:3001
2. Click "Refresh" button
3. You should see the new booking with status "Pending"

### Test 3: Confirm Booking

1. Find the pending booking
2. Click "Confirm" button
3. Modal opens with booking details
4. Keep "Send payment details" checked
5. Click "Confirm & Send Payment"
6. WhatsApp should open with payment message
7. Booking status changes to "Confirmed"

### Test 4: Send Payment Details

1. Find a confirmed booking
2. Click "Send Payment" button
3. WhatsApp opens with payment message
4. You can send this to the guest

### Test 5: Mark as Paid

1. Find a confirmed booking
2. Click "Mark as Paid" button
3. Confirm the action
4. Status changes to "Paid"

---

## 🔒 Security Notes

### Current Setup (Development)
- ✅ Secure login required
- ✅ JWT tokens
- ✅ Rate limiting
- ✅ Account lockout
- ⚠️ Using development secrets

### For Production
You MUST update these in `.env`:

```env
# Generate new secrets:
JWT_SECRET=your-long-random-string-here
SESSION_SECRET=your-long-random-string-here
```

Generate secure secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Next Steps

### Option 1: Keep Testing Locally
- Create more bookings
- Test all features
- Familiarize yourself with the dashboard

### Option 2: Deploy to Production
- Follow deployment guide in README.md
- Update environment variables
- Deploy to Vercel

---

## 🆘 Troubleshooting

### "Cannot find module 'express'"
**Solution**: Run `npm install` in the admin folder

### "MongoDB connection error"
**Solution**: 
1. Check MongoDB Atlas is running
2. Verify network access (0.0.0.0/0)
3. Check connection string in `.env`

### "Admin user already exists"
**Solution**: You already created an admin user. Just login!

### Can't login
**Solution**:
1. Check you're using the correct email/password
2. Check browser console for errors
3. Try clearing cookies
4. Verify MongoDB connection

### Bookings not showing
**Solution**:
1. Create a test booking on main website first
2. Click "Refresh" in admin dashboard
3. Check MongoDB has bookings collection
4. Check browser console for errors

### WhatsApp not opening
**Solution**:
1. Check `HOST_WHATSAPP_NUMBER` in `.env`
2. Verify guest phone number format
3. Try clicking the button again

---

## 📊 What's Next?

### Immediate Tasks:
1. ✅ Create admin user
2. ✅ Login to dashboard
3. ✅ View bookings
4. ✅ Test confirmation flow

### Before Going Live:
1. ⚠️ Update JWT_SECRET
2. ⚠️ Update SESSION_SECRET
3. ⚠️ Use strong admin password
4. ⚠️ Deploy to Vercel
5. ⚠️ Test on production

---

## 🎯 Quick Reference

### URLs
- **Main Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001

### Commands
```bash
# Install dependencies
npm install

# Create admin user
npm run setup

# Start server
npm start

# Start with auto-reload (development)
npm run dev
```

### Default Credentials
- Email: (what you entered during setup)
- Password: (what you entered during setup)

---

## ✅ Checklist

Setup Complete:
- [ ] Dependencies installed (`npm install`)
- [ ] Admin user created (`npm run setup`)
- [ ] Server started (`npm start`)
- [ ] Logged into dashboard
- [ ] Viewed bookings list
- [ ] Tested confirmation flow
- [ ] WhatsApp links working

Ready for Production:
- [ ] JWT_SECRET updated
- [ ] SESSION_SECRET updated
- [ ] Strong password set
- [ ] Deployed to Vercel
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Tested on production

---

**Congratulations! Your admin dashboard is ready to use! 🎉**

For more details, see README.md
