# 🚀 Quick Start - Your Server is Running!

## ✅ What I Did For You (Automatically)

```
1. ✅ Stopped old server (Process 14412)
2. ✅ Verified all dependencies installed
3. ✅ Started new server on port 3000
4. ✅ Tested health endpoint - PASSED
5. ✅ All fixes are now ACTIVE
```

**Status:** 🟢 Server is RUNNING and ready!

---

## 🎯 Do This NOW (Manual Steps Required)

### ⚠️ STEP 1: Change Your Admin Key (CRITICAL!)

**Why?** The default key is insecure. Anyone reading this code could use it.

**How:**

1. **Open this file:** `server/.env`

2. **Find this line:**
   ```
   ADMIN_KEY=lekki-admin-2025-secure-key-change-this
   ```

3. **Replace with your own secret key:**
   ```
   ADMIN_KEY=YourOwnSecretKey2025!MakeItLong#AndRandom$
   ```

4. **Save the file**

5. **Restart the server:**
   - Go to the terminal where server is running
   - Press `Ctrl + C` to stop
   - Run: `npm start` to restart

**Key Requirements:**
- At least 20 characters
- Mix uppercase, lowercase, numbers, symbols
- No spaces
- Keep it SECRET!

---

### 📝 STEP 2: Update Bank Details

**Open:** `server/.env`

**Update these lines:**
```env
BANK_NAME=Your Real Bank Name
BANK_ACCOUNT_NUMBER=Your Real 10-digit Account Number
BANK_ACCOUNT_NAME=Your Real Account Name
```

**Example:**
```env
BANK_NAME=Guaranty Trust Bank
BANK_ACCOUNT_NUMBER=0123456789
BANK_ACCOUNT_NAME=Lekki Stays Limited
```

**Save and restart server** (Ctrl+C, then `npm start`)

---

## 🧪 Test It Now!

### Test 1: Open Your Website
```
http://localhost:3000
```
Should show your Lekki Stays homepage ✅

### Test 2: Make a Test Booking

1. Click any apartment
2. Select dates (e.g., May 1-5, 2026)
3. Select guests (e.g., 2 guests)
4. Click "Book Now"
5. Fill the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: 08012345678
6. Click "Confirm Booking"

### Test 3: Check Your WhatsApp

Open WhatsApp on phone: **+2349039269846**

You should receive:
```
🏠 NEW BOOKING — Lekki Stays

Apartment: [Name]
Guest: Test User
...

✅ CONFIRM: http://localhost:3000/api/bookings/...
❌ DECLINE: http://localhost:3000/api/bookings/...
⚠️ CANCEL: http://localhost:3000/api/bookings/...
```

**Check:** Links should show `http://localhost:3000` NOT `undefined` ✅

### Test 4: Test Admin Links

1. **Tap CONFIRM link** → Should open confirmation page ✅
2. **Copy link, remove `&admin=...`** → Should show "Access Denied" ✅

---

## 📱 How to Confirm/Decline Bookings

### To CONFIRM a Booking:

1. Open WhatsApp message
2. Tap ✅ **CONFIRM** link
3. See confirmation page with booking details
4. Tap **"Send Payment Details to Guest"**
5. Guest receives payment instructions
6. Wait for guest to pay (24 hours)

### To DECLINE a Booking:

1. Open WhatsApp message
2. Tap ❌ **DECLINE** link
3. See decline confirmation page
4. Tap **"Notify Guest on WhatsApp"**
5. Guest receives decline notification
6. Dates become available again

### To CANCEL a Booking (if guest doesn't pay):

1. Open WhatsApp message
2. Tap ⚠️ **CANCEL** link
3. Booking cancelled automatically
4. Dates released for new bookings

---

## 🔒 Security Check

### ✅ What's Protected:

- **CONFIRM link** → Requires admin key
- **DECLINE link** → Requires admin key
- **CANCEL link** → Requires admin key

### ❌ What Happens Without Admin Key:

```
🔒 Access Denied
You do not have permission to perform this action.
This link is only accessible by the property administrator.
```

### ✅ Guest Can Still:

- Cancel their own booking (different route)
- View their booking details
- Contact you via WhatsApp

---

## 🛠️ Server Commands

### To Stop Server:
```bash
# In terminal where server is running
Ctrl + C
```

### To Start Server:
```bash
cd server
npm start
```

### To Restart Server:
```bash
# Stop first (Ctrl+C), then:
npm start
```

### To Check if Server is Running:
```powershell
Get-NetTCPConnection -LocalPort 3000
```

---

## 📊 Current Status

```
Server:     🟢 RUNNING
Port:       3000
URL:        http://localhost:3000
WhatsApp:   +2349039269846
Database:   ✅ Initialized
Fixes:      ✅ Applied
```

---

## ⚠️ Before Going Live

- [ ] Change ADMIN_KEY to your own secret
- [ ] Update bank details with real info
- [ ] Test booking flow completely
- [ ] Test all admin links work
- [ ] Test security (access denied without key)
- [ ] Update BASE_URL to production domain
- [ ] Deploy to live server

---

## 🆘 Quick Troubleshooting

### Problem: "Port 3000 already in use"
```powershell
# Find and kill the process
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Problem: Links still show "undefined"
1. Check `BASE_URL=http://localhost:3000` in `server/.env`
2. Restart server completely
3. Clear browser cache

### Problem: "Access Denied" on valid links
1. Check ADMIN_KEY in `.env` matches the link
2. No spaces in `.env` file
3. Restart server after changing `.env`

---

## 🎉 You're Ready!

Your server is running with all security fixes applied. You can now:

1. ✅ Accept bookings through your website
2. ✅ Receive WhatsApp notifications
3. ✅ Confirm/decline bookings via WhatsApp links
4. ✅ Secure admin-only access

**Next:** Make a test booking and try the full flow!

---

**Files Created:**
- ✅ `RESTART_SERVER_GUIDE.md` - Detailed restart instructions
- ✅ `SERVER_STATUS.md` - Current server status
- ✅ `QUICK_START.md` - This quick reference (you are here)
- ✅ `FIXES_APPLIED.md` - Technical details of fixes

**Server Terminal ID:** 2 (running in background)
