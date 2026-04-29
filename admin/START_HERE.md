# 🎯 START HERE - Admin Dashboard Setup

## 👋 Welcome to Lekki Stays Admin Dashboard!

This is your **standalone admin dashboard** that connects directly to Firebase. No backend server needed!

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Enable Firebase Authentication
```
1. Go to: https://console.firebase.google.com/project/lekki-stays/authentication
2. Click "Get Started"
3. Click "Email/Password"
4. Toggle "Enable"
5. Click "Save"
```

### Step 2: Create Your Admin Account
```
1. In Firebase Console → Authentication → Users
2. Click "Add User"
3. Email: admin@lekkistays.com
4. Password: [create a secure password]
5. Click "Add User"
```

### Step 3: Update Bank Details
```
1. Open: admin/src/js/dashboard.js
2. Find line ~280 (in sendPaymentDetails function)
3. Update:
   - Bank name
   - Account name
   - Account number
4. Save file
```

### Step 4: Deploy
```bash
cd admin

# Option A: Firebase Hosting (Recommended)
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy --only hosting

# Option B: Vercel
npm install -g vercel
vercel

# Option C: Test Locally First
npm install
npm start
# Open: http://localhost:8080
```

---

## 📚 Documentation

| Document | What's Inside |
|----------|---------------|
| **QUICK_START.md** | 5-minute setup guide |
| **ADMIN_DASHBOARD_COMPLETE.md** | Complete technical docs |
| **FIREBASE_ADMIN_SETUP.md** | Firebase configuration |
| **CREATE_SEPARATE_REPO.md** | GitHub repository setup |
| **README.md** | Project overview |

---

## ✅ What's Already Done

- ✅ Firebase configuration set up
- ✅ Authentication integrated
- ✅ Dashboard connected to Firestore
- ✅ All booking actions working
- ✅ WhatsApp integration ready
- ✅ Responsive design complete
- ✅ Documentation written

---

## 🎯 What You Need to Do

1. **Enable Firebase Auth** (2 minutes)
2. **Create admin user** (1 minute)
3. **Update bank details** (1 minute)
4. **Deploy** (2 minutes)
5. **Test & enjoy!** ✨

---

## 🆘 Need Help?

- **Can't login?** → Check `QUICK_START.md` troubleshooting section
- **Bookings not loading?** → Verify Firestore security rules
- **WhatsApp not working?** → Check phone number format
- **General questions?** → Read `ADMIN_DASHBOARD_COMPLETE.md`

---

## 🎉 You're Almost There!

Just follow the 4 steps above and you'll have a fully functional admin dashboard in 5 minutes!

**Let's go! 🚀**
