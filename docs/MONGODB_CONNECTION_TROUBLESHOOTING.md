# 🔧 MongoDB Connection Troubleshooting

## Error: `querySrv ECONNREFUSED`

This error means your computer cannot reach MongoDB Atlas. Here's how to fix it:

---

## ✅ Solution 1: Check Network Access in MongoDB Atlas (Most Common)

### Step 1: Go to MongoDB Atlas
1. Open https://cloud.mongodb.com
2. Log in to your account
3. Select your project

### Step 2: Configure Network Access
1. Click **"Network Access"** in the left sidebar
2. Check if you see any IP addresses listed
3. If empty or you see specific IPs only:
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (all IPs)
   - Click **"Confirm"**
4. Wait 1-2 minutes for changes to take effect

### Step 3: Verify Status
- The IP entry should show status: **"Active"** (green)
- If it says "Pending", wait a minute and refresh

---

## ✅ Solution 2: Check Your Internet Connection

### Test Basic Connectivity
```bash
ping google.com
```

If this fails, check your internet connection.

### Test MongoDB Atlas Connectivity
```bash
nslookup cluster0.ih2gp5o.mongodb.net
```

If this fails, there's a DNS issue.

---

## ✅ Solution 3: Disable VPN/Proxy

If you're using a VPN or proxy:
1. Temporarily disable it
2. Restart your server
3. Try connecting again

---

## ✅ Solution 4: Check Firewall

### Windows Firewall
1. Open Windows Security
2. Go to Firewall & network protection
3. Click "Allow an app through firewall"
4. Make sure Node.js is allowed

### Antivirus
- Temporarily disable antivirus
- Try connecting again
- If it works, add Node.js to antivirus exceptions

---

## ✅ Solution 5: Use Alternative DNS

### Change DNS to Google DNS
1. Open Network Settings
2. Change DNS to:
   - Primary: `8.8.8.8`
   - Secondary: `8.8.4.4`
3. Restart your computer
4. Try again

---

## ✅ Solution 6: Verify MongoDB Atlas Cluster

### Check Cluster Status
1. Go to MongoDB Atlas
2. Click "Database" in left sidebar
3. Check if cluster shows "Active" status
4. If it says "Paused", click "Resume"

---

## 🧪 Quick Test

After making changes, test the connection:

```bash
cd server
npm start
```

Look for:
```
✅ Connected to MongoDB successfully
```

---

## 📞 Still Not Working?

### Check These:

1. **Network Access in MongoDB Atlas**
   - [ ] 0.0.0.0/0 is added
   - [ ] Status is "Active" (green)
   - [ ] Waited 2 minutes after adding

2. **Credentials**
   - [ ] Username: `lekkistays`
   - [ ] Password: `shortlet41923`
   - [ ] No typos in .env file

3. **Connection String**
   - [ ] Cluster URL: `cluster0.ih2gp5o.mongodb.net`
   - [ ] Database name: `/lekki-stays`
   - [ ] No extra spaces

4. **Network**
   - [ ] Internet connection working
   - [ ] VPN disabled
   - [ ] Firewall allows Node.js
   - [ ] Antivirus not blocking

---

## 🎯 Most Likely Solution

**90% of the time, this error is because:**
- Network Access is not configured in MongoDB Atlas
- You need to add `0.0.0.0/0` to allow all IPs

**Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere**

Then wait 2 minutes and restart your server!

---

## ✅ Alternative: Use MongoDB Compass to Test

1. Download MongoDB Compass: https://www.mongodb.com/try/download/compass
2. Use your connection string:
   ```
   mongodb+srv://lekkistays:shortlet41923@cluster0.ih2gp5o.mongodb.net/lekki-stays
   ```
3. Click "Connect"
4. If Compass connects, the issue is with your Node.js environment
5. If Compass fails, the issue is with MongoDB Atlas configuration

---

## 📋 Checklist

- [ ] Added 0.0.0.0/0 to Network Access in MongoDB Atlas
- [ ] Waited 2 minutes for changes to take effect
- [ ] Cluster status is "Active"
- [ ] Internet connection is working
- [ ] VPN is disabled
- [ ] Firewall allows Node.js
- [ ] Connection string is correct in .env
- [ ] No typos in username/password

---

**After fixing, restart your server:**
```bash
cd server
npm start
```

You should see: `✅ Connected to MongoDB successfully`
