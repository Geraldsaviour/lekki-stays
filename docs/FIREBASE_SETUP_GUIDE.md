# Firebase Setup Guide - Complete Implementation

## 🎯 Overview
This guide walks you through setting up Firebase for the Lekki Stays booking platform from scratch.

---

## 📋 Step 1: Create Firebase Project

### 1.1 Go to Firebase Console
- Visit: https://console.firebase.google.com/
- Click "Add project" or "Create a project"

### 1.2 Project Setup
1. **Project name**: Enter "Lekki Stays" (or your preferred name)
2. **Google Analytics**: Toggle OFF (not needed for now)
3. Click "Create project"
4. Wait for project creation (30 seconds)
5. Click "Continue"

---

## 📋 Step 2: Register Your Web App

### 2.1 Add Web App
1. In Firebase Console, click the **Web icon** (`</>`) 
2. **App nickname**: Enter "Lekki Stays Web"
3. **Firebase Hosting**: Check this box ✅
4. Click "Register app"

### 2.2 Copy Configuration
You'll see a configuration object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "lekki-stays.firebaseapp.com",
  projectId: "lekki-stays",
  storageBucket: "lekki-stays.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**IMPORTANT**: Copy this entire object! You'll need it in Step 3.

---

## 📋 Step 3: Configure Your Project

### 3.1 Update firebase-config.js
Open `firebase-config.js` in your project and replace with YOUR values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;
```

### 3.2 Add to .gitignore
Make sure `firebase-config.js` is in your `.gitignore`:

```
# Firebase
firebase-config.js
.firebaserc
firebase-debug.log
```

---

## 📋 Step 4: Enable Firestore Database

### 4.1 Create Database
1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. **Start mode**: Select "Start in production mode"
4. **Location**: Choose closest to Nigeria (e.g., "eur3 (europe-west)")
5. Click "Enable"

### 4.2 Set Security Rules
1. Go to **Rules** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apartments - Public read, admin write
    match /apartments/{apartmentId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Bookings - Public create, admin read/update
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Admin users - Admin only
    match /admins/{adminId} {
      allow read, write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

3. Click "Publish"

---

## 📋 Step 5: Enable Authentication

### 5.1 Enable Email/Password Auth
1. Go to **Build** → **Authentication**
2. Click "Get started"
3. Click **Email/Password** provider
4. Toggle "Enable" ON
5. Click "Save"

### 5.2 Create Admin User
1. Go to **Users** tab
2. Click "Add user"
3. **Email**: admin@lekkistays.com (or your email)
4. **Password**: Create a strong password
5. Click "Add user"
6. **Copy the User UID** (you'll need this!)

### 5.3 Set Admin Custom Claim
1. Go to **Build** → **Firestore Database**
2. Click "Start collection"
3. **Collection ID**: `admins`
4. Click "Next"
5. **Document ID**: Paste the User UID you copied
6. Add field:
   - **Field**: `email`
   - **Type**: string
   - **Value**: admin@lekkistays.com
7. Add another field:
   - **Field**: `role`
   - **Type**: string
   - **Value**: `admin`
8. Add another field:
   - **Field**: `createdAt`
   - **Type**: timestamp
   - **Value**: (current time)
9. Click "Save"

---

## 📋 Step 6: Seed Apartment Data

### 6.1 Add Apartments Collection
1. In Firestore, click "Start collection"
2. **Collection ID**: `apartments`
3. Click "Next"

### 6.2 Add First Apartment
**Document ID**: Auto-generate

Add these fields:

| Field | Type | Value |
|-------|------|-------|
| name | string | Luxury 2BR Lekki Phase 1 |
| location | string | Lekki Phase 1 |
| price | number | 45000 |
| bedrooms | number | 2 |
| bathrooms | number | 2 |
| maxGuests | number | 4 |
| description | string | Modern 2-bedroom apartment with pool |
| amenities | array | ["wifi", "pool", "kitchen", "ac", "parking", "tv"] |
| images | array | ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"] |
| available | boolean | true |
| createdAt | timestamp | (current time) |

Click "Save"

### 6.3 Add More Apartments
Repeat for 5-8 apartments with different:
- Names
- Locations (Lekki Phase 1, Victoria Island, Ikoyi, etc.)
- Prices (35000-85000)
- Bedrooms (1-4)
- Images from Unsplash

---

## 📋 Step 7: Install Firebase CLI

### 7.1 Install Firebase Tools
```bash
npm install -g firebase-tools
```

### 7.2 Login to Firebase
```bash
firebase login
```

This will open your browser to authenticate.

### 7.3 Initialize Firebase in Your Project
```bash
firebase init
```

**Select these options:**
- ✅ Firestore
- ✅ Hosting

**Firestore Setup:**
- Rules file: `firestore.rules` (press Enter)
- Indexes file: `firestore.indexes.json` (press Enter)

**Hosting Setup:**
- Public directory: `.` (current directory)
- Single-page app: `No`
- GitHub auto-deploy: `No`
- Overwrite index.html: `No`

---

## 📋 Step 8: Test Your Setup

### 8.1 Test Firebase Connection
Create a test file `test-firebase.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Firebase Test</title>
</head>
<body>
  <h1>Firebase Connection Test</h1>
  <div id="status">Testing...</div>
  
  <script type="module">
    import { db, collection, getDocs } from './firebase-init.js';
    
    async function testConnection() {
      try {
        const apartmentsRef = collection(db, 'apartments');
        const snapshot = await getDocs(apartmentsRef);
        
        document.getElementById('status').innerHTML = 
          `✅ Connected! Found ${snapshot.size} apartments`;
        
        snapshot.forEach(doc => {
          console.log(doc.id, doc.data());
        });
      } catch (error) {
        document.getElementById('status').innerHTML = 
          `❌ Error: ${error.message}`;
      }
    }
    
    testConnection();
  </script>
</body>
</html>
```

### 8.2 Run Local Server
```bash
firebase serve
```

Open: http://localhost:5000/test-firebase.html

You should see: "✅ Connected! Found X apartments"

---

## 📋 Step 9: Deploy to Firebase Hosting

### 9.1 Deploy
```bash
firebase deploy
```

### 9.2 Get Your Live URL
After deployment, you'll see:
```
✔  Deploy complete!

Hosting URL: https://lekki-stays.web.app
```

Visit your live site! 🎉

---

## 🔧 Troubleshooting

### Issue: "Firebase not defined"
**Solution**: Make sure you're using `type="module"` in script tags

### Issue: "Permission denied"
**Solution**: Check Firestore security rules allow public reads

### Issue: "Module not found"
**Solution**: Ensure firebase-config.js and firebase-init.js are in root directory

### Issue: "CORS error"
**Solution**: Use Firebase Hosting or a local server (not file://)

---

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Web app registered
- [ ] firebase-config.js updated with your values
- [ ] Firestore database enabled
- [ ] Security rules published
- [ ] Authentication enabled
- [ ] Admin user created
- [ ] Apartments collection seeded
- [ ] Firebase CLI installed
- [ ] Project initialized with `firebase init`
- [ ] Test connection successful
- [ ] Deployed to Firebase Hosting

---

## 📚 Next Steps

1. Update booking.html to use Firebase
2. Update listing pages to fetch from Firestore
3. Create admin dashboard with Firebase Auth
4. Set up Cloud Functions for WhatsApp notifications
5. Add booking validation logic

---

## 🔗 Useful Links

- Firebase Console: https://console.firebase.google.com/
- Firebase Docs: https://firebase.google.com/docs
- Firestore Docs: https://firebase.google.com/docs/firestore
- Firebase Hosting: https://firebase.google.com/docs/hosting

---

## 💡 Tips

- Keep your API key in firebase-config.js (it's safe for frontend)
- Use security rules to protect data
- Test locally with `firebase serve` before deploying
- Check Firebase Console for real-time data updates
- Use Firebase Emulator for local development

---

**You're all set! 🚀**
