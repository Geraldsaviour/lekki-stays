# 🔐 Admin Dashboard Firebase Setup - Complete Guide

## 📋 Quick Setup Checklist

Follow these 5 steps to get your admin dashboard fully operational:

1. ✅ **Enable Firebase Authentication** in console
2. ✅ **Create admin user** (admin@lekkistays.com)
3. ✅ **Update Firestore security rules**
4. ✅ **Test login and dashboard**
5. ✅ **Deploy to production**

---

## 🚀 Step 1: Enable Firebase Authentication

### 1.1 Access Firebase Console
1. Go to: https://console.firebase.google.com/project/lekki-stays/authentication
2. Click **"Get started"** (if first time)

### 1.2 Enable Email/Password Provider
1. Click on **"Sign-in method"** tab
2. Find **"Email/Password"** in the providers list
3. Click on it to expand
4. Toggle **"Enable"** to ON ✅
5. Click **"Save"**

### 1.3 Verify Authentication is Enabled
You should see:
- ✅ Email/Password: **Enabled**
- Status: **Active**

**Screenshot location**: Authentication → Sign-in method → Email/Password (Enabled)

---

## 👤 Step 2: Create Admin User

### 2.1 Add User in Firebase Console
1. Go to: https://console.firebase.google.com/project/lekki-stays/authentication/users
2. Click **"Add user"** button
3. Fill in the form:
   - **Email**: `admin@lekkistays.com`
   - **Password**: Create a strong password (min 6 characters)
   - Example: `Admin@Lekki2026!`
4. Click **"Add user"**

### 2.2 Copy User UID
After creating the user, you'll see a table with:
- Email: admin@lekkistays.com
- **User UID**: `abc123xyz...` ← **COPY THIS!**

**Important**: Save this UID - you'll need it for Step 2.3

### 2.3 Set Admin Custom Claims in Firestore

#### Option A: Using Firebase Console (Recommended)
1. Go to: https://console.firebase.google.com/project/lekki-stays/firestore
2. Click **"Start collection"** (or navigate to existing collections)
3. Create/Update `admins` collection:

**Collection ID**: `admins`

**Document ID**: Paste the User UID you copied (e.g., `abc123xyz...`)

**Fields**:
| Field | Type | Value |
|-------|------|-------|
| email | string | admin@lekkistays.com |
| role | string | admin |
| displayName | string | Admin User |
| createdAt | timestamp | (current time) |
| active | boolean | true |

4. Click **"Save"**

#### Option B: Using Firebase Admin SDK (Advanced)
If you have Node.js access, run this script:

```javascript
// server/set-admin-claim.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setAdminClaim(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`✅ Admin claim set for ${email}`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

setAdminClaim('admin@lekkistays.com');
```

Run: `node server/set-admin-claim.js`

### 2.4 Verify Admin User
1. Go to Authentication → Users
2. You should see:
   - ✅ admin@lekkistays.com
   - Status: Enabled
   - Created: (today's date)

---

## 🔒 Step 3: Update Firestore Security Rules

### 3.1 Access Firestore Rules
1. Go to: https://console.firebase.google.com/project/lekki-stays/firestore/rules
2. You'll see the current rules editor

### 3.2 Update Rules
Replace the existing rules with these **production-ready** rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ============================================
    // HELPER FUNCTIONS
    // ============================================
    
    // Check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Check if user is admin (via custom claim)
    function isAdmin() {
      return isAuthenticated() && 
             request.auth.token.admin == true;
    }
    
    // Check if user is admin (via Firestore document)
    function isAdminByDoc() {
      return isAuthenticated() && 
             exists(/databases/$(database)/documents/admins/$(request.auth.uid)) &&
             get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == 'admin' &&
             get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.active == true;
    }
    
    // Combined admin check (either method)
    function isAdminUser() {
      return isAdmin() || isAdminByDoc();
    }
    
    // ============================================
    // APARTMENTS COLLECTION
    // ============================================
    // - Anyone can read apartments (public listings)
    // - Only admins can create/update/delete apartments
    match /apartments/{apartmentId} {
      allow read: if true;
      allow create, update, delete: if isAdminUser();
    }
    
    // ============================================
    // BOOKINGS COLLECTION
    // ============================================
    // - Anyone can create bookings (new reservations)
    // - Only admins can read all bookings
    // - Only admins can update/delete bookings
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if isAdminUser();
    }
    
    // ============================================
    // ADMINS COLLECTION
    // ============================================
    // - Only admins can read/write admin data
    // - Used for role-based access control
    match /admins/{adminId} {
      allow read: if isAuthenticated() && request.auth.uid == adminId;
      allow write: if isAdminUser();
    }
    
    // ============================================
    // ANALYTICS COLLECTION (Optional)
    // ============================================
    // - Only admins can read analytics
    match /analytics/{document=**} {
      allow read: if isAdminUser();
      allow write: if false; // Analytics written by Cloud Functions only
    }
  }
}
```

### 3.3 Publish Rules
1. Click **"Publish"** button
2. Wait for confirmation: "Rules published successfully"
3. Verify the rules are active

### 3.4 Test Rules (Optional)
Use the **Rules Playground** in Firebase Console:
1. Click **"Rules Playground"** tab
2. Test scenarios:
   - **Read apartments** (unauthenticated): ✅ Should allow
   - **Create booking** (unauthenticated): ✅ Should allow
   - **Read bookings** (unauthenticated): ❌ Should deny
   - **Read bookings** (authenticated as admin): ✅ Should allow

---

## 🧪 Step 4: Test Login and Dashboard

### 4.1 Start Local Development Server

#### Option A: Using npm (Recommended)
```bash
cd admin-standalone
npm install
npm run dev
```

Server starts at: **http://localhost:3001**

#### Option B: Using Firebase Hosting
```bash
firebase serve --only hosting
```

Server starts at: **http://localhost:5000**

### 4.2 Test Login Flow

1. **Open Login Page**
   - Navigate to: http://localhost:3001 (or :5000)
   - You should see the Lekki Stays Admin login page

2. **Enter Credentials**
   - Email: `admin@lekkistays.com`
   - Password: (the password you created in Step 2)

3. **Click "Sign In"**
   - Button should show "Signing in..." loading state
   - Should redirect to `dashboard.html` on success

4. **Verify Dashboard Loads**
   - Should see: "Welcome, Admin User"
   - Should see: Statistics cards (Total Bookings, Pending, Confirmed, Apartments)
   - Should see: Navigation menu (Overview, Bookings, Apartments, Settings)

### 4.3 Test Dashboard Features

#### Test 1: Overview Section
- ✅ Statistics cards display numbers
- ✅ Recent bookings list shows data
- ✅ "View All Bookings" button works

#### Test 2: Bookings Section
- ✅ All bookings list displays
- ✅ Status filter works (All, Pending, Confirmed, Cancelled)
- ✅ Booking cards show:
  - Guest name, email, phone
  - Check-in/check-out dates
  - Number of guests
  - Total price
  - Payment method
  - Special requests (if any)

#### Test 3: Apartments Section
- ✅ Apartment grid displays
- ✅ Each card shows:
  - Apartment image
  - Name and location
  - Price per night
  - Bedrooms, bathrooms, max guests

#### Test 4: Settings Section
- ✅ User email displays
- ✅ User ID displays
- ✅ Firebase connection status shows "Connected"

#### Test 5: Logout
- ✅ Click "Logout" button
- ✅ Redirects to login page
- ✅ Cannot access dashboard without logging in

### 4.4 Test Error Handling

1. **Wrong Password**
   - Enter wrong password
   - Should show: "Invalid email or password"

2. **Wrong Email**
   - Enter non-existent email
   - Should show: "No account found with this email"

3. **Empty Fields**
   - Leave fields empty
   - Should show browser validation errors

4. **Network Error**
   - Disconnect internet
   - Should show: "Login failed. Please try again."

### 4.5 Browser Console Checks

Open DevTools (F12) and check:

1. **Console Tab**
   - ✅ No errors (red messages)
   - ✅ Should see: "Firebase initialized"
   - ✅ Should see: "User authenticated: admin@lekkistays.com"

2. **Network Tab**
   - ✅ All Firebase API calls return 200 OK
   - ✅ No 401 Unauthorized errors
   - ✅ No 403 Forbidden errors

3. **Application Tab**
   - ✅ IndexedDB → firebaseLocalStorageDb → has auth token
   - ✅ Session Storage → has user data

### 4.6 Mobile Responsive Test

1. Open DevTools (F12)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Test on different devices:
   - iPhone 12 Pro (390x844)
   - iPad (768x1024)
   - Desktop (1920x1080)

Verify:
- ✅ Layout adapts to screen size
- ✅ Navigation menu is accessible
- ✅ Cards stack properly on mobile
- ✅ Text is readable
- ✅ Buttons are tappable

---

## 🚀 Step 5: Deploy to Production

### 5.1 Pre-Deployment Checklist

Before deploying, verify:
- [ ] Firebase Authentication enabled
- [ ] Admin user created and tested
- [ ] Firestore rules published
- [ ] Local testing completed successfully
- [ ] No console errors
- [ ] Mobile responsive design works
- [ ] All features functional

### 5.2 Deploy to Firebase Hosting

#### Initialize Firebase Hosting (First Time Only)
```bash
# From project root
firebase init hosting

# Select:
# - Public directory: admin-standalone
# - Single-page app: No
# - GitHub auto-deploy: No (optional)
# - Overwrite index.html: No
```

#### Deploy Admin Dashboard
```bash
# Deploy only hosting
firebase deploy --only hosting

# Or deploy everything (hosting + rules)
firebase deploy
```

#### Deployment Output
```
=== Deploying to 'lekki-stays'...

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/lekki-stays/overview
Hosting URL: https://lekki-stays.web.app
```

### 5.3 Verify Production Deployment

1. **Visit Live URL**
   - Go to: https://lekki-stays.web.app
   - Should see admin login page

2. **Test Production Login**
   - Email: admin@lekkistays.com
   - Password: (your admin password)
   - Should successfully log in

3. **Test Production Dashboard**
   - All sections should work
   - Data should load from Firestore
   - No console errors

### 5.4 Alternative Deployment: Vercel

If you prefer Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy admin dashboard
cd admin-standalone
vercel --prod
```

Follow prompts:
- Project name: lekki-stays-admin
- Framework: Other
- Build command: (leave empty)
- Output directory: .

**Live URL**: https://lekki-stays-admin.vercel.app

### 5.5 Alternative Deployment: Netlify

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Admin dashboard ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to: https://app.netlify.com/
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository

3. **Configure Build Settings**
   - Base directory: `admin-standalone`
   - Build command: (leave empty)
   - Publish directory: `admin-standalone`

4. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete

**Live URL**: https://lekki-stays-admin.netlify.app

### 5.6 Custom Domain Setup (Optional)

#### Firebase Hosting
1. Go to: https://console.firebase.google.com/project/lekki-stays/hosting
2. Click "Add custom domain"
3. Enter: admin.lekkistays.com
4. Follow DNS configuration steps
5. Wait for SSL certificate provisioning (24-48 hours)

#### Vercel
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add domain: admin.lekkistays.com
5. Configure DNS records as shown

#### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter: admin.lekkistays.com
4. Configure DNS records as shown

---

## ✅ Final Verification Checklist

### Firebase Console Checks
- [ ] Authentication enabled (Email/Password)
- [ ] Admin user exists (admin@lekkistays.com)
- [ ] Admin document in Firestore (`admins` collection)
- [ ] Firestore rules published
- [ ] Hosting deployed successfully

### Local Testing Checks
- [ ] Can login with admin credentials
- [ ] Dashboard loads without errors
- [ ] Statistics display correctly
- [ ] Bookings list shows data
- [ ] Apartments list shows data
- [ ] Status filter works
- [ ] Logout works
- [ ] Redirects work (login → dashboard, logout → login)
- [ ] Mobile responsive design works
- [ ] No console errors

### Production Testing Checks
- [ ] Live URL accessible
- [ ] Can login on production
- [ ] Dashboard works on production
- [ ] Data loads from Firestore
- [ ] HTTPS enabled (secure connection)
- [ ] No mixed content warnings
- [ ] Performance is acceptable (< 3s load time)

---

## 🔧 Troubleshooting

### Issue 1: "Firebase: Error (auth/invalid-credential)"
**Cause**: Wrong email or password  
**Solution**: 
- Verify email is exactly: admin@lekkistays.com
- Reset password in Firebase Console → Authentication → Users
- Try logging in again

### Issue 2: "Permission denied" when loading bookings
**Cause**: Firestore rules not updated or admin claim not set  
**Solution**:
1. Verify Firestore rules are published (Step 3)
2. Verify admin document exists in `admins` collection (Step 2.3)
3. Check browser console for specific error
4. Try logging out and back in

### Issue 3: Dashboard shows "No bookings yet"
**Cause**: No bookings in Firestore  
**Solution**:
- This is normal if no bookings have been created
- Test by creating a booking through the main website
- Or manually add a test booking in Firestore Console

### Issue 4: "Module not found" error
**Cause**: Incorrect import paths  
**Solution**:
- Verify `firebase-config.js` exists in `admin-standalone/`
- Check import statement uses `./firebase-config.js` (relative path)
- Clear browser cache and reload

### Issue 5: Infinite redirect loop (login → dashboard → login)
**Cause**: Authentication state not persisting  
**Solution**:
- Clear browser cache and cookies
- Check browser console for errors
- Verify Firebase config is correct
- Try incognito/private browsing mode

### Issue 6: "Failed to load resource: net::ERR_BLOCKED_BY_CLIENT"
**Cause**: Ad blocker or browser extension blocking Firebase  
**Solution**:
- Disable ad blockers
- Try different browser
- Whitelist Firebase domains

### Issue 7: Deployment fails
**Cause**: Various (permissions, config, etc.)  
**Solution**:
```bash
# Re-authenticate
firebase logout
firebase login

# Re-initialize
firebase init hosting

# Try deploying again
firebase deploy --only hosting
```

---

## 📚 Additional Resources

### Firebase Documentation
- Authentication: https://firebase.google.com/docs/auth
- Firestore: https://firebase.google.com/docs/firestore
- Hosting: https://firebase.google.com/docs/hosting
- Security Rules: https://firebase.google.com/docs/rules

### Project Documentation
- Admin System Overview: `ADMIN_SYSTEM_OVERVIEW.md`
- Admin Fixed Issues: `ADMIN_FIXED.md`
- Admin Standalone README: `admin-standalone/README.md`
- Firebase Setup Guide: `docs/FIREBASE_SETUP_GUIDE.md`

### Support
- Firebase Support: https://firebase.google.com/support
- Stack Overflow: https://stackoverflow.com/questions/tagged/firebase
- Firebase Community: https://firebase.google.com/community

---

## 🎉 Success!

If you've completed all 5 steps and passed all verification checks, your admin dashboard is now:

✅ **Fully functional** - All features working  
✅ **Secure** - Firebase Authentication + Firestore rules  
✅ **Deployed** - Live on Firebase Hosting (or Vercel/Netlify)  
✅ **Production-ready** - Tested and verified  

### What You Can Do Now

1. **Manage Bookings**
   - View all bookings in real-time
   - Filter by status (pending, confirmed, cancelled)
   - See guest details and special requests

2. **Monitor Apartments**
   - View all property listings
   - See availability and pricing
   - Check amenities and images

3. **Track Statistics**
   - Total bookings count
   - Pending bookings count
   - Confirmed bookings count
   - Total apartments count

4. **Secure Access**
   - Only authenticated admins can access
   - Automatic logout on session expiry
   - Protected routes and data

### Next Steps

1. **Add More Admins**
   - Create additional admin users in Firebase Console
   - Add their UIDs to `admins` collection in Firestore

2. **Enhance Features**
   - Add booking status update functionality
   - Add apartment editing capabilities
   - Add analytics and reporting
   - Add email notifications

3. **Monitor Usage**
   - Check Firebase Console for usage stats
   - Monitor authentication logs
   - Review Firestore read/write counts
   - Set up billing alerts

4. **Backup Data**
   - Export Firestore data regularly
   - Set up automated backups
   - Document recovery procedures

---

**Setup completed on**: April 29, 2026  
**Admin Dashboard URL**: https://lekki-stays.web.app  
**Admin Email**: admin@lekkistays.com  
**Status**: ✅ Production Ready

---

**Need help?** Check `admin-standalone/README.md` or `ADMIN_FIXED.md` for more details!
