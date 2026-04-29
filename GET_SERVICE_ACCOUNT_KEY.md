# 🔑 Get Firebase Service Account Key

## Quick Steps (2 minutes)

### Step 1: Generate Key

1. **Click this link:**
   👉 https://console.firebase.google.com/project/lekki-stays/settings/serviceaccounts/adminsdk

2. **Click the "Generate new private key" button**

3. **Click "Generate key" in the popup**
   - A JSON file will download
   - Save it somewhere safe (DON'T commit to Git!)

---

### Step 2: Open the JSON File

The file will be named something like:
```
lekki-stays-firebase-adminsdk-xxxxx-xxxxxxxxxx.json
```

Open it in a text editor. It looks like this:

```json
{
  "type": "service_account",
  "project_id": "lekki-stays",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

---

### Step 3: Copy These 3 Values

You need these three values:

1. **`project_id`** → Should be: `lekki-stays`

2. **`private_key`** → Starts with `"-----BEGIN PRIVATE KEY-----\n`
   - Copy the ENTIRE value including quotes
   - Keep the `\n` characters

3. **`client_email`** → Looks like: `firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com`

---

### Step 4: Add to server/.env

Open `server/.env` and add these lines **at the bottom**:

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=lekki-stays
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com
```

**Replace:**
- The `FIREBASE_PRIVATE_KEY` value with your actual private key
- The `FIREBASE_CLIENT_EMAIL` value with your actual client email

**Important:**
- ✅ Keep the quotes around `FIREBASE_PRIVATE_KEY`
- ✅ Keep the `\n` characters (don't remove them!)
- ✅ Copy the entire private key
- ✅ Save the file

---

### Step 5: Test It

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

## 🎯 Visual Example

### Before (in .env):
```env
# Firebase Configuration (Client SDK - already there)
FIREBASE_API_KEY=AIzaSyA8moQvtYRObBsuNlU52uN9nDIXCCq0Mfs
FIREBASE_AUTH_DOMAIN=lekki-stays.firebaseapp.com
FIREBASE_PROJECT_ID=lekki-stays
FIREBASE_STORAGE_BUCKET=lekki-stays.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=879597470658
FIREBASE_APP_ID=1:879597470658:web:9dce2da8c0413ba01e0c5b
```

### After (add these):
```env
# Firebase Configuration (Client SDK - already there)
FIREBASE_API_KEY=AIzaSyA8moQvtYRObBsuNlU52uN9nDIXCCq0Mfs
FIREBASE_AUTH_DOMAIN=lekki-stays.firebaseapp.com
FIREBASE_PROJECT_ID=lekki-stays
FIREBASE_STORAGE_BUCKET=lekki-stays.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=879597470658
FIREBASE_APP_ID=1:879597470658:web:9dce2da8c0413ba01e0c5b

# Firebase Admin SDK (ADD THESE NEW LINES)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@lekki-stays.iam.gserviceaccount.com
```

---

## ⚠️ Security Notes

### DO:
- ✅ Keep the JSON file safe and secure
- ✅ Add `.env` to `.gitignore` (already done)
- ✅ Use environment variables for credentials
- ✅ Delete the JSON file after copying values (optional)

### DON'T:
- ❌ Commit the JSON file to Git
- ❌ Share the private key publicly
- ❌ Remove the `\n` characters from private key
- ❌ Remove quotes around private key

---

## 🆘 Troubleshooting

### "Missing environment variables"
→ Make sure you added all 3 variables to `server/.env`
→ Check spelling and formatting

### "Invalid private key"
→ Make sure you copied the ENTIRE private key
→ Keep the `\n` characters
→ Keep quotes around the private key
→ Include `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### "Permission denied"
→ Make sure Firestore is enabled
→ Check security rules in Firebase Console

---

## ✅ Checklist

- [ ] Downloaded service account JSON file
- [ ] Opened JSON file in text editor
- [ ] Copied `project_id` value
- [ ] Copied `private_key` value (with quotes and \n)
- [ ] Copied `client_email` value
- [ ] Added all 3 values to `server/.env`
- [ ] Saved `server/.env` file
- [ ] Ran `npm run test:firebase`
- [ ] Test passed successfully

---

## 🎉 Next Steps

After the test passes:

1. **Migrate data:**
   ```bash
   npm run migrate
   ```

2. **Start server:**
   ```bash
   npm run dev
   ```

3. **Test the app:**
   http://localhost:3000

---

**Current Step:** 👉 Generate service account key (Step 1)

**Link:** https://console.firebase.google.com/project/lekki-stays/settings/serviceaccounts/adminsdk
