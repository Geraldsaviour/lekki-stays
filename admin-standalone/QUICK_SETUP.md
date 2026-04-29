# ⚡ Admin Dashboard - Quick Setup

## 🚀 5-Minute Setup

### Step 1: Enable Firebase Authentication (2 min)
```
1. Go to: https://console.firebase.google.com/project/lekki-stays/authentication
2. Click "Sign-in method" tab
3. Enable "Email/Password"
4. Click "Save"
```

### Step 2: Create Admin User (1 min)
```
1. Go to: https://console.firebase.google.com/project/lekki-stays/authentication/users
2. Click "Add user"
3. Email: admin@lekkistays.com
4. Password: (create strong password)
5. Click "Add user"
6. COPY the User UID!
```

### Step 3: Set Admin Role in Firestore (1 min)
```
1. Go to: https://console.firebase.google.com/project/lekki-stays/firestore
2. Create collection: "admins"
3. Document ID: (paste User UID from Step 2)
4. Add fields:
   - email: "admin@lekkistays.com"
   - role: "admin"
   - active: true
   - createdAt: (current timestamp)
5. Click "Save"
```

### Step 4: Update Firestore Rules (30 sec)
```
1. Go to: https://console.firebase.google.com/project/lekki-stays/firestore/rules
2. Copy rules from: docs/ADMIN_FIREBASE_SETUP_COMPLETE.md (Step 3.2)
3. Click "Publish"
```

### Step 5: Test Locally (30 sec)
```bash
cd admin-standalone
npm install
npm run dev
```

Open: http://localhost:3001

Login with:
- Email: admin@lekkistays.com
- Password: (your password from Step 2)

---

## ✅ Quick Verification

- [ ] Can access login page
- [ ] Can login with admin credentials
- [ ] Dashboard loads without errors
- [ ] Can see bookings and apartments
- [ ] Can logout successfully

---

## 🚀 Deploy to Production

```bash
firebase deploy --only hosting
```

Live URL: https://lekki-stays.web.app

---

## 🔧 Troubleshooting

**Can't login?**
- Check email is exactly: admin@lekkistays.com
- Verify password is correct
- Check browser console for errors

**Permission denied?**
- Verify Firestore rules are published
- Check admin document exists in Firestore
- Logout and login again

**Dashboard empty?**
- Normal if no bookings yet
- Create test booking through main website
- Check Firestore has data

---

## 📚 Full Documentation

See: `docs/ADMIN_FIREBASE_SETUP_COMPLETE.md`

---

**Status**: ✅ Ready to use  
**Time to setup**: ~5 minutes  
**Difficulty**: Easy
