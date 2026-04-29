# 🚀 Firebase Setup - No CLI Required

## Quick Setup (10 minutes)

You don't need Firebase CLI to get started! Follow these steps:

---

## Step 1: Enable Firestore (3 minutes)

1. **Open Firebase Console:**
   👉 https://console.firebase.google.com/project/lekki-stays/firestore

2. **Click "Create database"**

3. **Choose "Production mode"**

4. **Select location:** eur3 (europe-west) or us-central1

5. **Click "Enable"** and wait 1-2 minutes

---

## Step 2: Get Service Account Key (2 minutes)

1. **Open Service Accounts:**
   👉 https://console.firebase.google.com/project/lekki-stays/settings/serviceaccounts/adminsdk

2. **Click "Generate new private key"**

3. **Click "Generate key"** (downloads JSON file)

4. **Open the JSON file** and copy these values:
   - `project_id`
   - `private_key`
   - `client_email`

---

## Step 3: Update server/.env (1 minute)

Open `server/.env` and add these lines:

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=lekki-stays
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com
```

**Replace:**
- `YOUR_PRIVATE_KEY_HERE` with the `private_key` from JSON
- `firebase-adminsdk-xxxxx@...` with the `client_email` from JSON

**Important:**
- Keep the quotes around `FIREBASE_PRIVATE_KEY`
- Keep the `\n` characters
- Save the file

---

## Step 4: Test Firebase Connection (30 seconds)

```bash
cd server
npm run test:firebase
```

**Expected output:**
```
🔥 Testing Firebase Connection...
✅ All environment variables present
✅ Firestore connection successful
✅ Firestore read successful
🎉 Firebase Connection Test Complete!
```

---

## Step 5: Migrate Your Data (30 seconds)

```bash
npm run migrate
```

**Expected output:**
```
🚀 Starting apartment migration...
✅ Prepared: Haven Lekki - Studio
✅ Prepared: The Metropolis Lekki - Studio
✅ Prepared: Victoria Island Penthouse
✅ Prepared: Ikoyi Executive Suite
🎉 Successfully migrated 4 apartments!
```

---

## Step 6: Set Security Rules (1 minute)

1. **Open Firestore Rules:**
   👉 https://console.firebase.google.com/project/lekki-stays/firestore/rules

2. **Replace with these rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /apartments/{apartmentId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update: if request.auth != null;
    }
  }
}
```

3. **Click "Publish"**

---

## Step 7: Start Your Server! 🎉

```bash
npm run dev
```

**Visit:** http://localhost:3000

---

## ✅ Verify Everything Works

1. **Check apartments API:**
   http://localhost:3000/api/apartments

2. **Check health:**
   http://localhost:3000/api/health

3. **Test booking flow:**
   - Browse apartments
   - Select dates
   - Create a booking
   - Check Firestore console for data

---

## 🎯 Checklist

- [ ] Firestore enabled
- [ ] Service account key downloaded
- [ ] Environment variables added to `server/.env`
- [ ] Firebase connection test passes
- [ ] Data migration successful
- [ ] Security rules published
- [ ] Server running on port 3000
- [ ] Can view apartments
- [ ] Can create bookings

---

## 🔗 Quick Links

- **Firestore Console:** https://console.firebase.google.com/project/lekki-stays/firestore
- **Service Accounts:** https://console.firebase.google.com/project/lekki-stays/settings/serviceaccounts
- **Firestore Rules:** https://console.firebase.google.com/project/lekki-stays/firestore/rules
- **Project Settings:** https://console.firebase.google.com/project/lekki-stays/settings/general

---

## 🆘 Troubleshooting

### Test fails with "Missing environment variables"
→ Check `server/.env` has all 3 Firebase variables

### Test fails with "Could not reach Cloud Firestore"
→ Make sure Firestore is enabled (Step 1)

### Migration fails
→ Run `npm run test:firebase` first
→ Make sure test passes

### "Invalid private key" error
→ Copy the ENTIRE private key from JSON
→ Keep the `\n` characters in .env
→ Keep quotes around the private key

---

## 📚 What About Firebase CLI?

**You don't need it right now!**

Firebase CLI is only needed for:
- Deploying to Firebase Hosting
- Managing rules from command line
- Advanced features

**You can install it later when needed:**
```bash
npm install -g firebase-tools
```

---

## 🎉 Success!

When everything works:
- ✅ Server running at http://localhost:3000
- ✅ 4 apartments in Firestore
- ✅ Bookings can be created
- ✅ Data visible in Firebase Console

**Next:** Test the booking flow and set up admin dashboard!

---

**Current Step:** 👉 Go to Step 1 and enable Firestore!
