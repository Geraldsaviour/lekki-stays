# Server Restart Fix ✅

## Issue

Apartments were not showing on the home page after the emoji-to-icons migration.

## Root Cause

**The server was not running!**

The server process had stopped, so the frontend couldn't fetch apartment data from the API endpoint `/api/apartments`.

## Solution

Restarted the server:

```bash
cd server
npm start
```

## Verification

Tested the API endpoint:
```bash
curl http://localhost:3000/api/apartments
```

**Result:**
- ✅ Status: 200 OK
- ✅ Apartments Count: 8
- ✅ Success: true

## Why This Happened

The server may have stopped due to:
1. Manual stop during previous work
2. Server crash or error
3. Terminal/process closed
4. System restart

## How to Check if Server is Running

### Method 1: Check Process
```bash
# Windows PowerShell
Get-Process -Name node -ErrorAction SilentlyContinue
```

### Method 2: Test API Endpoint
```bash
curl http://localhost:3000/api/apartments
```

### Method 3: Check Browser Console
Open http://localhost:3000 and check browser console for errors like:
- `Failed to fetch`
- `ERR_CONNECTION_REFUSED`
- `Network error`

## How to Start Server

### From Project Root
```bash
cd server
npm start
```

### Expected Output
```
🏨 Lekki Stays server running on port 3000
🌐 Visit: http://localhost:3000
📱 WhatsApp: +2349039269846
🔥 Using Firebase Firestore
```

## Apartments Loading Flow

1. **Page loads** → `public/index.html`
2. **Script initializes** → `public/script.js`
3. **PropertyListings class** → Creates instance
4. **init() method** → Calls `loadListings()`
5. **loadListings()** → Fetches from `/api/apartments`
6. **Server responds** → Returns 8 apartments
7. **renderListings()** → Displays apartments on page
8. **Lucide icons** → Initialized with `lucide.createIcons()`

## Troubleshooting

### Apartments Still Not Showing?

1. **Check server is running**
   ```bash
   curl http://localhost:3000/api/apartments
   ```

2. **Check browser console** (F12)
   - Look for JavaScript errors
   - Look for network errors
   - Check if API call succeeded

3. **Check network tab** (F12 → Network)
   - Look for `/api/apartments` request
   - Check status code (should be 200)
   - Check response data

4. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows)
   - Or clear cache in browser settings

5. **Check Lucide icons loaded**
   - Open console and type: `typeof lucide`
   - Should return: `"object"`

### Common Errors

**Error: `Failed to fetch`**
- **Cause:** Server not running
- **Fix:** Start server with `npm start`

**Error: `ERR_CONNECTION_REFUSED`**
- **Cause:** Server not running or wrong port
- **Fix:** Start server, check port 3000

**Error: `Unexpected token < in JSON`**
- **Cause:** Server returning HTML instead of JSON
- **Fix:** Check server logs for errors

**Error: `Cannot read property 'apartments' of undefined`**
- **Cause:** API response format changed
- **Fix:** Check API response structure

## Prevention

### Keep Server Running

Use a process manager to keep server running:

**Option 1: PM2 (Recommended)**
```bash
npm install -g pm2
cd server
pm2 start server.js --name lekki-stays
pm2 save
```

**Option 2: nodemon (Development)**
```bash
npm install -g nodemon
cd server
nodemon server.js
```

**Option 3: Background Process**
```bash
# Windows PowerShell
Start-Process -FilePath "npm" -ArgumentList "start" -WorkingDirectory "server" -WindowStyle Hidden
```

### Monitor Server

Check server status regularly:
```bash
# Check if running
curl http://localhost:3000/api/apartments

# Check process
Get-Process -Name node
```

## Status

✅ **FIXED** - Server restarted, apartments loading correctly

## Summary

**Problem:** Apartments not showing
**Cause:** Server was stopped
**Solution:** Restarted server with `npm start`
**Result:** Apartments loading successfully (8 apartments)

---

**Note:** The emoji-to-icons migration did NOT break anything. The issue was simply that the server needed to be restarted!
