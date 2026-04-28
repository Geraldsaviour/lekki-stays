# Lekki Stays - Security & Bug Fixes Applied

## ✅ Fix 1: BASE_URL Undefined Bug - RESOLVED

### Changes Made:
1. **server/.env** - Added missing environment variables:
   - `BASE_URL=http://localhost:3000`
   - `BANK_NAME=GTBank`
   - `BANK_ACCOUNT_NUMBER=0123456789`
   - `BANK_ACCOUNT_NAME=Lekki Stays Ltd`
   - `ADMIN_KEY=lekki-admin-2025-secure-key-change-this`

2. **server/utils/whatsapp.js** - Fixed BASE_URL usage:
   - Added `require('dotenv').config()` at the top of the file
   - All WhatsApp links now use `process.env.BASE_URL` correctly
   - Links will now show full URL (e.g., `http://localhost:3000/api/bookings/...`) instead of `undefined/api/bookings/...`

### Result:
WhatsApp messages to the host will now contain properly formatted links with the full server URL.

---

## ✅ Fix 2: Admin-Only Access to Action Routes - RESOLVED

### Changes Made:
1. **server/routes/bookings.js** - Added admin authentication:
   - Created `requireAdmin` middleware function that validates the `admin` query parameter
   - Applied middleware to all three admin routes:
     - `GET /api/bookings/:id/confirm` (requires admin key)
     - `GET /api/bookings/:id/decline` (requires admin key)
     - `GET /api/bookings/:id/cancel` (requires admin key - host only)
   - Created new guest-only route:
     - `GET /api/bookings/:id/guest-cancel` (requires only booking token, no admin key)

2. **server/utils/whatsapp.js** - Updated all action links:
   - CONFIRM link: `...?token=${booking.token}&admin=${process.env.ADMIN_KEY}`
   - DECLINE link: `...?token=${booking.token}&admin=${process.env.ADMIN_KEY}`
   - CANCEL link: `...?token=${booking.token}&admin=${process.env.ADMIN_KEY}`

### Security Model:
- **Host (Admin) Actions**: Require both `token` AND `admin` key
  - Confirm booking
  - Decline booking
  - Cancel booking (from WhatsApp link)
  
- **Guest Actions**: Require only `token` (no admin key)
  - Self-cancel via `/guest-cancel` route
  - View booking details

### Access Denied Page:
When someone tries to access an admin route without the correct admin key, they see:
```
🔒 Access Denied
You do not have permission to perform this action.
This link is only accessible by the property administrator.
```

---

## 🔐 Security Improvements

### Two-Factor Protection:
Every admin action link now requires:
1. **Booking Token** - Unique per booking (prevents targeting other bookings)
2. **Admin Key** - Secret password from .env (prevents unauthorized access)

### Attack Prevention:
- ❌ Random person with URL but no admin key → **BLOCKED**
- ❌ Guest with their own booking token → **BLOCKED** (from confirm/decline)
- ✅ Host with WhatsApp link containing both token and admin key → **ALLOWED**

---

## ⚠️ IMPORTANT: Change Your Admin Key

The `.env` file now contains:
```
ADMIN_KEY=lekki-admin-2025-secure-key-change-this
```

**You MUST change this to your own secret string!**

Suggestions:
- Use a long random string (20+ characters)
- Mix letters, numbers, and special characters
- Never share this key with anyone
- Never commit it to version control

Example: `ADMIN_KEY=Lk$t@y5-2025-Pr!v@t3-K3y-X9mQ2nP7`

---

## 📋 Testing Checklist

After restarting your server, verify:

1. ✅ **BASE_URL Fix**:
   - Create a test booking
   - Check WhatsApp message shows full URL: `http://localhost:3000/api/bookings/...`
   - Not showing: `undefined/api/bookings/...`

2. ✅ **Admin Access**:
   - Tap CONFIRM link from WhatsApp → Should work
   - Remove `&admin=...` from URL → Should show "Access Denied"
   - Tap DECLINE link from WhatsApp → Should work
   - Remove `&admin=...` from URL → Should show "Access Denied"

3. ✅ **Guest Cancel** (if implemented in frontend):
   - Guest taps cancel button → Should work (uses `/guest-cancel`)
   - Guest cannot access `/confirm` or `/decline` routes

---

## 🚀 Deployment Notes

When deploying to production:

1. Update `BASE_URL` in `.env`:
   ```
   BASE_URL=https://yourdomain.com
   ```

2. Generate a strong `ADMIN_KEY`:
   ```
   ADMIN_KEY=your-super-secret-production-key-here
   ```

3. Update bank details:
   ```
   BANK_NAME=Your Bank Name
   BANK_ACCOUNT_NUMBER=Your Account Number
   BANK_ACCOUNT_NAME=Your Account Name
   ```

4. Restart the server to load new environment variables

---

## 📝 Summary

Both fixes have been successfully implemented:
- ✅ WhatsApp links now show full URLs (not undefined)
- ✅ Admin routes are protected with two-factor authentication (token + admin key)
- ✅ Guest self-cancel route created (no admin key required)
- ✅ Access denied page displays for unauthorized access attempts

The system is now more secure and functional!
