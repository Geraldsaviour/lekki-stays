# 🔥 Firebase Setup - Step by Step

## ✅ What We've Done So Far

1. ✅ Created Firebase project: **lekki-stays**
2. ✅ Updated `firebase-config.js` with credentials
3. ✅ Installed Firebase packages
4. ✅ Created Firebase admin service (`server/firebase-admin.js`)
5. ✅ Created migration script (`server/migrate-to-firebase.js`)

---

## 🎯 What You Need to Do NOW

### Step 1: Enable Firestore Database (3 minutes)

1. **Go to Firebase Console:**
   https://console.firebase.google.com/project/lekki-stays/firestore

2. **Click "Create database"**

3. **Choose "Production mode"**

4. **Select location:**
   - Choose: **eur3 (europe-west)** (closest to Nigeria)
   - Or: **us-central1** (if eur3 not available)

5. **Click "Enable"**
   - Wait 1-2 minutes for Firestore to initialize

---

### Step 2: Set Firestore Security Rules (1 minute)

1. **Go to Rules tab:**
   https://console.firebase.google.com/project/lekki-stays/firestore/rules

2. **Replace the rules with:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Apartments - public read, admin write
    match /apartments/{apartmentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Bookings - anyone can create, admin can read/update
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
  }
}
```

3. **Click "Publish"**

---

### Step 3: Get Service Account Key (2 minutes)

1. **Go to Project Settings:**
   https://console.firebase.google.com/project/lekki-stays/settings/serviceaccounts/adminsdk

2. **Click "Generate new private key"**

3. **Click "Generate key"**
   - A JSON file will download (e.g., `lekki-stays-firebase-adminsdk-xxxxx.json`)

4. **Open the downloaded JSON file**

5. **Copy these values to your `server/.env` file:**

```env
# Add these to server/.env:
FIREBASE_PROJECT_ID=lekki-stays
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[PASTE YOUR PRIVATE KEY HERE]\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com
```

**IMPORTANT:** 
- Keep the quotes around `FIREBASE_PRIVATE_KEY`
- Replace `\n` with actual newlines OR keep as `\\n` in the .env file
- Don't commit this file to Git!

---

### Step 4: Update server/.env File

Your `server/.env` should now have these Firebase variables:

```env
# Firebase Configuration (for Admin SDK)
FIREBASE_PROJECT_ID=lekki-stays
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com

# Firebase Configuration (for Client SDK)
FIREBASE_API_KEY=AIzaSyA8moQvtYRObBsuNlU52uN9nDIXCCq0Mfs
FIREBASE_AUTH_DOMAIN=lekki-stays.firebaseapp.com
FIREBASE_STORAGE_BUCKET=lekki-stays.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=879597470658
FIREBASE_APP_ID=1:879597470658:web:9dce2da8c0413ba01e0c5b
```

---

### Step 5: Migrate Your Data (1 minute)

Once you've completed steps 1-4, run:

```bash
cd server
node migrate-to-firebase.js
```

This will:
- ✅ Read apartments from `data/apartments.json`
- ✅ Upload them to Firestore
- ✅ Verify the migration
- ✅ Show you a sample apartment

---

### Step 6: Deploy Firestore Indexes (1 minute)

```bash
firebase deploy --only firestore:indexes
```

This sets up database indexes for faster queries.

---

### Step 7: Deploy Firestore Rules (1 minute)

```bash
firebase deploy --only firestore:rules
```

This deploys your security rules.

---

## 🎉 After Setup

Once everything is done, you can:

1. **View your data:**
   https://console.firebase.google.com/project/lekki-stays/firestore/data

2. **Start your server:**
   ```bash
   cd server
   npm run dev
   ```

3. **Test the API:**
   - http://localhost:3000/api/apartments
   - http://localhost:3000/api/bookings

---

## 🔍 Troubleshooting

### Error: "Could not reach Cloud Firestore backend"
- Make sure Firestore is enabled (Step 1)
- Check your internet connection
- Wait a few minutes after enabling Firestore

### Error: "Permission denied"
- Check your security rules (Step 2)
- Make sure service account key is correct (Step 3)

### Error: "Invalid private key"
- Make sure private key has proper newlines
- Keep quotes around the private key in .env
- Don't remove the `\n` characters

---

## 📚 Next Steps

After Firebase is working:

1. ✅ Test apartment listings
2. ✅ Test booking creation
3. ✅ Set up admin dashboard
4. ✅ Deploy to Firebase Hosting

---

## 🆘 Need Help?

If you get stuck:
1. Check Firebase Console for errors
2. Check server logs: `npm run dev`
3. Verify all environment variables are set
4. Make sure Firestore is enabled

---

**Current Status:** ⏳ Waiting for you to complete Steps 1-4

**Next Action:** Enable Firestore in Firebase Console (Step 1)
