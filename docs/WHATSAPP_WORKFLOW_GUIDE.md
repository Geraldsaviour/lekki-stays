# 📱 WhatsApp Booking Workflow - Complete Guide

## 🔄 BEFORE vs AFTER Server Restart

### ❌ BEFORE (Current - Broken Links)
```
✅ CONFIRM: undefined/api/bookings/LUX734518R84/confirm?token=...
❌ DECLINE: undefined/api/bookings/LUX734518R84/decline?token=...
⚠️ CANCEL: undefined/api/bookings/LUX734518R84/decline?token=...
```
**Problem**: Links don't work because BASE_URL is undefined

---

### ✅ AFTER (Fixed - Working Links)
```
✅ CONFIRM: http://localhost:3000/api/bookings/LUX734518R84/confirm?token=cf41ea8242485d333d2914888723a6ef8&admin=lekki-admin-2025-secure-key-change-this

❌ DECLINE: http://localhost:3000/api/bookings/LUX734518R84/decline?token=cf41ea8242485d333d2914888723a6ef8&admin=lekki-admin-2025-secure-key-change-this

⚠️ CANCEL: http://localhost:3000/api/bookings/LUX734518R84/cancel?token=cf41ea8242485d333d2914888723a6ef8&admin=lekki-admin-2025-secure-key-change-this
```
**Solution**: Full URLs with admin key protection

---

## 🚀 Quick Start: Restart Your Server

### Windows (PowerShell):
```powershell
.\restart-server.ps1
```

### Mac/Linux (Bash):
```bash
chmod +x restart-server.sh
./restart-server.sh
```

### Manual Method:
```bash
# Stop server (Ctrl+C in terminal where it's running)
# Then:
cd server
npm start
```

---

## 📋 Complete Booking Flow

### 1️⃣ Guest Makes a Booking

**Guest Actions:**
- Visits your website
- Selects apartment, dates, guests
- Fills booking form:
  - Full Name: david mark
  - Email: geraldsaviour2@gmail.com
  - Phone: +234816617293
  - Check-in: 2026-05-02
  - Check-out: 2026-05-04
- Clicks "Confirm Booking"

**System Actions:**
- Creates booking in database
- Generates unique booking ID (e.g., #LUX734518R84)
- Generates secure token
- Sends WhatsApp notification to YOU

---

### 2️⃣ You Receive WhatsApp Notification

**Your Phone Receives:**
```
🏠 NEW BOOKING — Lekki Stays

Apartment: Haven Lekki - Studio
Guest: david mark
Phone: +234816617293
Email: geraldsaviour2@gmail.com
Check-in: 2026-05-02
Check-out: 2026-05-04
Guests: 1
Total: ₦100,000
Booking ID: #LUX734518R84

✅ CONFIRM: http://localhost:3000/api/bookings/LUX734518R84/confirm?token=cf41ea8242485d333d2914888723a6ef8&admin=lekki-admin-2025-secure-key-change-this

❌ DECLINE: http://localhost:3000/api/bookings/LUX734518R84/decline?token=cf41ea8242485d333d2914888723a6ef8&admin=lekki-admin-2025-secure-key-change-this

⚠️ If guest does not pay within 24hrs after confirming, cancel here:
http://localhost:3000/api/bookings/LUX734518R84/cancel?token=cf41ea8242485d333d2914888723a6ef8&admin=lekki-admin-2025-secure-key-change-this
```

**Important Notes:**
- ✅ Only YOU receive this message (sent to +2349039269846)
- ✅ Links contain your secret admin key
- ✅ Guest NEVER sees these links
- ✅ Links work on phone or computer (WhatsApp Web)

---

### 3️⃣ Option A: You CONFIRM the Booking

**Your Actions:**
1. Review the booking details
2. Tap the ✅ CONFIRM link

**What Happens:**
1. Browser opens to confirmation page
2. You see a styled page with:
   ```
   ✅ Booking Confirmed
   Booking #LUX734518R84 for david mark is confirmed.
   
   Amount to Collect: ₦100,000
   
   [Apartment Details]
   [Guest Details]
   [Check-in/Check-out Dates]
   
   [💬 Send Payment Details to Guest] ← Button
   ```

3. Tap "Send Payment Details to Guest" button
4. WhatsApp opens with pre-filled message to guest:
   ```
   🎉 Booking Confirmed — Lekki Stays

   Hi david mark! Your booking has been confirmed.

   📋 Booking Details:
   Apartment: Haven Lekki - Studio
   Check-in: 2026-05-02
   Check-out: 2026-05-04
   Guests: 1
   Booking ID: #LUX734518R84

   💰 Payment Required: ₦100,000
   Please make a bank transfer to:

   Bank: GTBank
   Account Number: 0123456789
   Account Name: Lekki Stays Ltd
   Amount: ₦100,000
   Reference: LEKKI-#LUX734518R84

   📸 After payment, send your receipt screenshot as a reply to this WhatsApp message to confirm your reservation.

   ⏰ Payment must be received within 24 hours or your reservation may be released.

   We look forward to hosting you! 🏠
   Lekki Stays Team
   ```

5. Send the message to guest
6. Wait for guest to pay and send receipt

---

### 4️⃣ Option B: You DECLINE the Booking

**Your Actions:**
1. Review the booking details
2. Tap the ❌ DECLINE link

**What Happens:**
1. Browser opens to decline page
2. You see a styled page with:
   ```
   ❌ Booking Declined
   Booking #LUX734518R84 for david mark has been declined.
   
   [Booking Details]
   
   ✅ Those dates are now available for new bookings.
   
   [💬 Notify Guest on WhatsApp] ← Button
   ```

3. Tap "Notify Guest on WhatsApp" button
4. WhatsApp opens with pre-filled message to guest:
   ```
   😔 Booking Update — Lekki Stays

   Hi david mark, unfortunately your booking request for Haven Lekki - Studio from 2026-05-02 to 2026-05-04 could not be confirmed at this time.

   Please visit our website to check other available dates or apartments. We hope to host you soon!

   lekkistays.com
   ```

5. Send the message to guest
6. Dates become available for other guests

---

### 5️⃣ Option C: You CANCEL Later (Guest Doesn't Pay)

**Scenario:** You confirmed the booking, but guest didn't pay within 24 hours.

**Your Actions:**
1. Go back to original WhatsApp message
2. Tap the ⚠️ CANCEL link

**What Happens:**
1. Browser opens to cancellation page
2. Booking status changes to "cancelled"
3. Dates become available again
4. System automatically opens WhatsApp to notify guest
5. Guest receives cancellation notification

---

## 🔐 Security Features

### Two-Factor Protection
Every admin link requires:
1. **Booking Token** (unique per booking)
2. **Admin Key** (your secret password)

### What If Someone Gets Your Link?

**Scenario 1: Guest sees the link**
- ❌ Can't use it (requires admin key)
- ✅ Shows "Access Denied" page

**Scenario 2: Random person gets the link**
- ❌ Can't use it (requires admin key)
- ✅ Shows "Access Denied" page

**Scenario 3: You (admin) click the link**
- ✅ Works perfectly (has admin key embedded)

### Access Denied Page
```
🔒 Access Denied
You do not have permission to perform this action.
This link is only accessible by the property administrator.
```

---

## 📱 Using WhatsApp Web

You can manage bookings from your computer:

1. Open WhatsApp Web (web.whatsapp.com)
2. Scan QR code with your phone
3. View booking notifications
4. Click links directly from computer
5. Confirmation/decline pages open in browser
6. Send messages to guests from computer

**Benefits:**
- Easier to read booking details
- Faster typing
- Better for managing multiple bookings
- Can copy/paste information

---

## ⚙️ Configuration Checklist

Before using the system, verify:

- [ ] Server is running (`npm start` in server directory)
- [ ] `.env` file has `BASE_URL=http://localhost:3000`
- [ ] `.env` file has your WhatsApp number
- [ ] `.env` file has bank details
- [ ] `.env` file has `ADMIN_KEY` (change default!)
- [ ] Test booking shows full URLs (not "undefined")
- [ ] Links work when clicked
- [ ] Confirmation page displays correctly
- [ ] WhatsApp messages open correctly

---

## 🚨 Troubleshooting

### Links still show "undefined"
→ Server not restarted. Stop and start again.

### "Access Denied" when clicking your own links
→ Admin key mismatch. Check `.env` file.

### WhatsApp doesn't open
→ Check phone number format in `.env`

### Confirmation page doesn't load
→ Check if server is running on port 3000

### Guest didn't receive payment details
→ Make sure you tapped "Send Payment Details" button

---

## 📞 Support

If you need help:
1. Check server logs for errors
2. Verify `.env` configuration
3. Test with a new booking
4. Check WhatsApp number format

---

## 🎯 Quick Reference

| Action | Link | Requires Admin Key | Guest Sees |
|--------|------|-------------------|------------|
| Confirm | ✅ CONFIRM | Yes | No |
| Decline | ❌ DECLINE | Yes | No |
| Cancel | ⚠️ CANCEL | Yes | No |
| Guest Self-Cancel | /guest-cancel | No | Yes (via confirmation page) |

---

## ✅ Success Indicators

You'll know everything is working when:
- ✅ WhatsApp messages show full URLs
- ✅ Links open confirmation/decline pages
- ✅ Guest receives payment instructions
- ✅ Bookings update in database
- ✅ Dates become available after decline/cancel

---

**Ready to test? Restart your server and create a new booking!** 🚀
