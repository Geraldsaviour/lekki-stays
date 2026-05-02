# ✅ Admin Dashboard Setup Checklist

Print this page and check off items as you complete them!

---

## 📋 Pre-Setup Requirements

- [ ] Firebase project exists (lekki-stays)
- [ ] Firebase CLI installed (`npm install -g firebase-tools`)
- [ ] Logged into Firebase (`firebase login`)
- [ ] Node.js installed (v14 or higher)

---

## 🔐 Step 1: Enable Firebase Authentication

- [ ] Opened Firebase Console: https://console.firebase.google.com/project/lekki-stays/authentication
- [ ] Clicked "Sign-in method" tab
- [ ] Found "Email/Password" provider
- [ ] Toggled "Enable" to ON
- [ ] Clicked "Save"
- [ ] Verified status shows "Enabled"

**Time**: ~2 minutes  
**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## 👤 Step 2: Create Admin User

### 2.1 Create User in Firebase Console
- [ ] Opened: https://console.firebase.google.com/project/lekki-stays/authentication/users
- [ ] Clicked "Add user" button
- [ ] Entered email: `admin@lekkistays.com`
- [ ] Created strong password: `________________` (write it down!)
- [ ] Clicked "Add user"
- [ ] User appears in users list

### 2.2 Copy User UID
- [ ] Found user in list: admin@lekkistays.com
- [ ] Copied User UID: `________________________________`
- [ ] Saved UID somewhere safe (you'll need it next!)

### 2.3 Set Admin Role in Firestore
- [ ] Opened: https://console.firebase.google.com/project/lekki-stays/firestore
- [ ] Clicked "Start collection" (or navigated to collections)
- [ ] Created collection: `admins`
- [ ] Set Document ID: (pasted User UID from above)
- [ ] Added field: `email` (string) = `admin@lekkistays.com`
- [ ] Added field: `role` (string) = `admin`
- [ ] Added field: `active` (boolean) = `true`
- [ ] Added field: `createdAt` (timestamp) = (current time)
- [ ] Clicked "Save"
- [ ] Document appears in `admins` collection

**Time**: ~3 minutes  
**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## 🔒 Step 3: Update Firestore Security Rules

- [ ] Opened: https://console.firebase.google.com/project/lekki-stays/firestore/rules
- [ ] Copied rules from `docs/ADMIN_FIREBASE_SETUP_COMPLETE.md` (Step 3.2)
- [ ] Pasted into rules editor
- [ ] Clicked "Publish"
- [ ] Saw confirmation: "Rules published successfully"
- [ ] Rules are now active

**Key Rules to Verify**:
- [ ] Apartments: Public read, admin write
- [ ] Bookings: Public create, admin read/update
- [ ] Admins: Admin only

**Time**: ~1 minute  
**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## 🧪 Step 4: Test Login and Dashboard

### 4.1 Start Local Server
- [ ] Opened terminal
- [ ] Navigated to: `cd admin-standalone`
- [ ] Ran: `npm install`
- [ ] Ran: `npm run dev`
- [ ] Server started at: http://localhost:3001

### 4.2 Test Login
- [ ] Opened browser: http://localhost:3001
- [ ] Saw login page with Lekki Stays branding
- [ ] Entered email: `admin@lekkistays.com`
- [ ] Entered password: (from Step 2.1)
- [ ] Clicked "Sign In"
- [ ] Redirected to dashboard

### 4.3 Test Dashboard Features
- [ ] Dashboard loaded without errors
- [ ] Saw welcome message: "Welcome, Admin User"
- [ ] Statistics cards display:
  - [ ] Total Bookings
  - [ ] Pending Bookings
  - [ ] Confirmed Bookings
  - [ ] Total Apartments
- [ ] Navigation menu works:
  - [ ] Overview section
  - [ ] Bookings section
  - [ ] Apartments section
  - [ ] Settings section
- [ ] Recent bookings list displays (or "No bookings yet")
- [ ] Apartments grid displays (or "No apartments yet")

### 4.4 Test Logout
- [ ] Clicked "Logout" button
- [ ] Redirected to login page
- [ ] Cannot access dashboard without logging in

### 4.5 Browser Console Check
- [ ] Opened DevTools (F12)
- [ ] Checked Console tab
- [ ] No red errors
- [ ] Saw: "Firebase initialized" (or similar)

### 4.6 Mobile Responsive Test
- [ ] Opened DevTools (F12)
- [ ] Toggled device toolbar (Ctrl+Shift+M)
- [ ] Tested on iPhone view
- [ ] Tested on iPad view
- [ ] Layout adapts correctly

**Time**: ~5 minutes  
**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## 🚀 Step 5: Deploy to Production

### 5.1 Pre-Deployment Check
- [ ] All previous steps completed
- [ ] Local testing successful
- [ ] No console errors
- [ ] All features working

### 5.2 Deploy to Firebase Hosting
- [ ] Opened terminal in project root
- [ ] Ran: `firebase init hosting` (first time only)
  - [ ] Selected public directory: `admin-standalone`
  - [ ] Single-page app: No
- [ ] Ran: `firebase deploy --only hosting`
- [ ] Deployment successful
- [ ] Copied live URL: `________________________________`

### 5.3 Test Production
- [ ] Opened live URL in browser
- [ ] Saw login page
- [ ] Logged in with admin credentials
- [ ] Dashboard works on production
- [ ] All features functional
- [ ] No console errors

### 5.4 HTTPS Verification
- [ ] URL starts with `https://`
- [ ] Browser shows secure lock icon
- [ ] No mixed content warnings

**Time**: ~3 minutes  
**Status**: ⬜ Not Started | ⏳ In Progress | ✅ Complete

---

## ✅ Final Verification

### Firebase Console
- [ ] Authentication enabled
- [ ] Admin user exists
- [ ] Admin document in Firestore
- [ ] Firestore rules published
- [ ] Hosting deployed

### Local Testing
- [ ] Can login locally
- [ ] Dashboard works locally
- [ ] All sections functional
- [ ] No errors in console

### Production Testing
- [ ] Can login on production
- [ ] Dashboard works on production
- [ ] Data loads correctly
- [ ] HTTPS enabled
- [ ] Performance acceptable

---

## 🎉 Setup Complete!

**Completion Date**: _______________  
**Setup Time**: _______________  
**Live URL**: _______________  
**Admin Email**: admin@lekkistays.com  
**Admin Password**: (stored securely)

---

## 📝 Notes & Issues

Use this space to note any issues or customizations:

```
_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
```

---

## 🔧 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Can't login | Verify email/password, check console errors |
| Permission denied | Check Firestore rules, verify admin document |
| Dashboard empty | Normal if no data yet, create test booking |
| Module not found | Check firebase-config.js exists, clear cache |
| Deployment fails | Re-authenticate: `firebase logout && firebase login` |

---

## 📚 Documentation References

- Full Setup Guide: `docs/ADMIN_FIREBASE_SETUP_COMPLETE.md`
- Quick Setup: `admin-standalone/QUICK_SETUP.md`
- Admin Overview: `ADMIN_SYSTEM_OVERVIEW.md`
- Troubleshooting: `ADMIN_FIXED.md`

---

## 🆘 Need Help?

1. Check browser console for errors (F12)
2. Review Firebase Console for status
3. Read full documentation
4. Check Firestore rules are correct
5. Verify admin document exists

---

**Total Estimated Time**: 15-20 minutes  
**Difficulty Level**: Easy to Moderate  
**Prerequisites**: Basic Firebase knowledge

---

**Print this checklist and keep it handy during setup!**
