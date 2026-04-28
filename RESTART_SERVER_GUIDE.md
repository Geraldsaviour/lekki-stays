# � Lekki Stays Server Restart Guide

## 📋 Overview
This guide will help you restart your Lekki Stays server to apply the security fixes and configuration changes.

---

## ⚙️ Prerequisites Check

Before restarting, ensure you have:
- ✅ Node.js installed (v14 or higher)
- ✅ npm installed
- ✅ All dependencies installed in `server/` folder

---

## 🔧 Step 1: Update Your Admin Key (CRITICAL!)

**Why?** The default admin key is insecure. You MUST change it before going live.

### Option A: Generate a Strong Random Key (Recommended)

**On Windows (PowerShell):**
```powershell
# Generate a random 32-character key
-join ((65..90) + (97..122) + (48..57) + (33,35,36,37,38,42,43,45,61) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

**On Windows (Command Prompt):**
```cmd
# Use this online generator or create your own
# Example: Lk$t@y5-2025-Pr!v@t3-K3y-X9mQ2nP7wZ4
```

### Option B: Create Your Own Key

Requirements:
- At least 20 characters long
- Mix of uppercase, lowercase, numbers, and symbols
- No spaces
- Keep it secret!

**Example:** `MySecret2025!LekkiStays#Admin$Key`

### How to Update:

1. Open `server/.env` file
2. Find this line:
   ```
   ADMIN_KEY=lekki-admin-2025-secure-key-change-this
   ```
3. Replace with your new key:
   ```
   ADMIN_KEY=YourNewSecretKeyHere
   ```
4. Save the file

**⚠️ IMPORTANT:** Never share this key or commit it to GitHub!

---

## 🏦 Step 2: Update Bank Details

Open `server/.env` and update these lines with your real bank information:

```env
BANK_NAME=Your Bank Name (e.g., GTBank, Access Bank, Zenith Bank)
BANK_ACCOUNT_NUMBER=Your 10-digit account number
BANK_ACCOUNT_NAME=Your Account Name (as registered with bank)
```

**Example:**
```env
BANK_NAME=Guaranty Trust Bank
BANK_ACCOUNT_NUMBER=0123456789
BANK_ACCOUNT_NAME=Lekki Stays Limited
```

---

## 📱 Step 3: Verify WhatsApp Number

Ensure your WhatsApp number is correct in `server/.env`:

```env
HOST_WHATSAPP_NUMBER=+2349039269846
```

**Format:** Must include country code (+234 for Nigeria)

---

## 🌐 Step 4: Update BASE_URL (For Production)

### For Local Testing (Current):
```env
BASE_URL=http://localhost:3000
```

### For Production Deployment:
```env
BASE_URL=https://yourdomain.com
```

**Examples:**
- `BASE_URL=https://lekkistays.com`
- `BASE_URL=https://www.lekkistays.ng`
- `BASE_URL=https://booking.lekkistays.com`

---

## 🔄 Step 5: Stop Any Running Server

### Check if Server is Running:

**Windows PowerShell:**
```powershell
# Check if port 3000 is in use
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
```

**Windows Command Prompt:**
```cmd
netstat -ano | findstr :3000
```

### Stop the Server:

**Method 1: If running in terminal**
- Press `Ctrl + C` in the terminal window

**Method 2: Kill the process (Windows)**
```powershell
# Find the process ID (PID) from the netstat command above
# Then kill it (replace 1234 with actual PID)
Stop-Process -Id 1234 -Force
```

**Command Prompt:**
```cmd
# Replace 1234 with actual PID from netstat
taskkill /PID 1234 /F
```

---

## 📦 Step 6: Install/Update Dependencies

Navigate to the server folder and install dependencies:

```bash
cd server
npm install
```

**What this does:**
- Installs all required packages
- Updates existing packages
- Ensures `dotenv` is installed (needed for .env file)

---

## 🚀 Step 7: Start the Server

### Option A: Production Mode (Recommended)
```bash
npm start
```

### Option B: Development Mode (Auto-restart on changes)
```bash
npm run dev
```

**Expected Output:**
```
🏨 Lekki Stays server running on port 3000
🌐 Visit: http://localhost:3000
📱 WhatsApp: +2349039269846
```

---

## ✅ Step 8: Verify Server is Running

### Test 1: Health Check
Open your browser and visit:
```
http://localhost:3000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-04-27T...",
  "environment": "production"
}
```

### Test 2: Homepage
Visit:
```
http://localhost:3000
```

You should see your Lekki Stays homepage.

---

## 🧪 Step 9: Test the Fixes

### Test A: Create a Test Booking

1. Go to `http://localhost:3000`
2. Click on any apartment
3. Select dates and guests
4. Fill out the booking form
5. Submit the booking

### Test B: Check WhatsApp Message

1. Open WhatsApp on your phone (+2349039269846)
2. You should receive a message with booking details
3. **Verify the links show full URLs:**
   - ✅ Good: `http://localhost:3000/api/bookings/...`
   - ❌ Bad: `undefined/api/bookings/...`

### Test C: Test Admin Links

1. **Tap the CONFIRM link** from WhatsApp
   - Should open a confirmation page
   - Should show booking details

2. **Test security** - Copy the CONFIRM link and remove `&admin=...` from the end
   - Should show "🔒 Access Denied" page

---

## 🐛 Troubleshooting

### Problem: "Port 3000 is already in use"

**Solution:**
```powershell
# Find and kill the process using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

### Problem: "Cannot find module 'dotenv'"

**Solution:**
```bash
cd server
npm install dotenv
```

### Problem: "ADMIN_KEY is not defined"

**Solution:**
1. Check `server/.env` file exists
2. Verify `ADMIN_KEY=...` line is present
3. Restart the server

### Problem: WhatsApp links still show "undefined"

**Solution:**
1. Verify `BASE_URL=http://localhost:3000` in `server/.env`
2. Ensure `require('dotenv').config()` is at top of `server/server.js`
3. Restart the server completely

### Problem: "Access Denied" even with correct link

**Solution:**
1. Check the `admin` parameter in the URL matches `ADMIN_KEY` in `.env`
2. Ensure no extra spaces in the `.env` file
3. Restart the server after changing `.env`

---

## � Monitoring Your Server

### View Server Logs
The terminal will show:
- Incoming requests
- Booking creations
- Errors (if any)

### Check Performance
```bash
npm run health
```

### Monitor System
```bash
npm run monitor
```

---

## � Security Checklist

Before going live, ensure:
- ✅ Changed `ADMIN_KEY` to a strong secret
- ✅ Updated `BASE_URL` to your production domain
- ✅ Updated bank details with real information
- ✅ Verified WhatsApp number is correct
- ✅ Tested all booking flows
- ✅ Tested admin links work
- ✅ Tested security (access denied without admin key)

---

## 🆘 Need Help?

If you encounter issues:
1. Check the terminal for error messages
2. Verify all `.env` variables are set correctly
3. Ensure Node.js and npm are installed
4. Try restarting the server
5. Check the troubleshooting section above

---

## 📝 Quick Reference Commands

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development with auto-restart)
npm run dev

# Stop server
Ctrl + C

# Check health
npm run health

# Run tests
npm test
```

---

## 🎯 Next Steps After Server Restart

1. ✅ Server is running
2. ✅ Test booking flow
3. ✅ Verify WhatsApp notifications
4. ✅ Test admin links
5. 🚀 Deploy to production (when ready)

---

**Server Status:** Ready to accept bookings! 🎉
