# 📱 Lekki Stays Booking Flow - Visual Guide

## 🔄 Complete Booking Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    GUEST MAKES BOOKING                          │
│                                                                 │
│  1. Guest visits: http://localhost:3000                        │
│  2. Selects apartment                                          │
│  3. Chooses dates & guests                                     │
│  4. Fills booking form                                         │
│  5. Clicks "Confirm Booking"                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              YOU RECEIVE WHATSAPP MESSAGE                       │
│                                                                 │
│  📱 To: +2349039269846 (Your WhatsApp)                         │
│                                                                 │
│  🏠 NEW BOOKING — Lekki Stays                                  │
│                                                                 │
│  Apartment: Haven Lekki - Studio                               │
│  Guest: John Doe                                               │
│  Phone: +2348012345678                                         │
│  Email: john@example.com                                       │
│  Check-in: 2026-05-01                                          │
│  Check-out: 2026-05-05                                         │
│  Guests: 2                                                     │
│  Total: ₦190,000                                               │
│  Booking ID: #BK-20260427-ABC123                               │
│                                                                 │
│  ✅ CONFIRM: http://localhost:3000/api/bookings/...            │
│  ❌ DECLINE: http://localhost:3000/api/bookings/...            │
│  ⚠️ CANCEL: http://localhost:3000/api/bookings/...             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    │                   │
                    ↓                   ↓
        ┌───────────────────┐   ┌───────────────────┐
        │   TAP CONFIRM ✅  │   │   TAP DECLINE ❌  │
        └───────────────────┘   └───────────────────┘
                    │                   │
                    ↓                   ↓
    ┌───────────────────────────┐   ┌───────────────────────────┐
    │  CONFIRMATION PAGE        │   │  DECLINE PAGE             │
    │                           │   │                           │
    │  ✅ Booking Confirmed     │   │  ❌ Booking Declined      │
    │                           │   │                           │
    │  Booking #BK-...          │   │  Booking #BK-...          │
    │  Guest: John Doe          │   │  Dates now available      │
    │  Amount: ₦190,000         │   │                           │
    │                           │   │  [Notify Guest Button]    │
    │  [Send Payment Details]   │   │                           │
    └───────────────────────────┘   └───────────────────────────┘
                    │                           │
                    ↓                           ↓
    ┌───────────────────────────┐   ┌───────────────────────────┐
    │  GUEST RECEIVES PAYMENT   │   │  GUEST RECEIVES DECLINE   │
    │  INSTRUCTIONS VIA         │   │  NOTIFICATION VIA         │
    │  WHATSAPP                 │   │  WHATSAPP                 │
    │                           │   │                           │
    │  💰 Payment Required:     │   │  😔 Booking Update        │
    │  ₦190,000                 │   │                           │
    │                           │   │  Your booking could not   │
    │  Bank: GTBank             │   │  be confirmed.            │
    │  Account: 0123456789      │   │                           │
    │  Name: Lekki Stays Ltd    │   │  Please check other       │
    │  Reference: LEKKI-#BK-... │   │  available dates.         │
    │                           │   │                           │
    │  ⏰ Pay within 24 hours   │   └───────────────────────────┘
    └───────────────────────────┘
                    │
                    ↓
        ┌───────────┴───────────┐
        │                       │
        ↓                       ↓
┌───────────────────┐   ┌───────────────────┐
│  GUEST PAYS ✅    │   │  NO PAYMENT ❌    │
│                   │   │  (After 24hrs)    │
└───────────────────┘   └───────────────────┘
        │                       │
        ↓                       ↓
┌───────────────────┐   ┌───────────────────┐
│  Guest sends      │   │  YOU TAP CANCEL   │
│  receipt to your  │   │  LINK ⚠️          │
│  WhatsApp         │   │                   │
│                   │   │  Booking cancelled│
│  You verify       │   │  Dates released   │
│  payment manually │   └───────────────────┘
└───────────────────┘
        │
        ↓
┌───────────────────┐
│  BOOKING COMPLETE │
│  ✅ PAID          │
└───────────────────┘
```

---

## 🔐 Security Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    ADMIN LINK CLICKED                           │
│                                                                 │
│  URL: /api/bookings/123/confirm?token=xyz&admin=secret         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    │  SERVER CHECKS:   │
                    │  1. Token valid?  │
                    │  2. Admin key?    │
                    └─────────┬─────────┘
                              ↓
                    ┌─────────┴─────────┐
                    │                   │
                    ↓                   ↓
        ┌───────────────────┐   ┌───────────────────┐
        │  BOTH VALID ✅    │   │  MISSING/WRONG ❌ │
        └───────────────────┘   └───────────────────┘
                    │                   │
                    ↓                   ↓
        ┌───────────────────┐   ┌───────────────────┐
        │  SHOW ACTION PAGE │   │  🔒 ACCESS DENIED │
        │  (Confirm/Decline)│   │                   │
        └───────────────────┘   │  You do not have  │
                                │  permission to    │
                                │  perform this     │
                                │  action.          │
                                └───────────────────┘
```

---

## 👤 Guest Self-Cancel Flow

```
┌─────────────────────────────────────────────────────────────────┐
│              GUEST WANTS TO CANCEL BOOKING                      │
│                                                                 │
│  (If you implement a cancel button on confirmation page)       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  Guest clicks "Cancel Booking" button                           │
│  URL: /api/bookings/123/guest-cancel?token=xyz                 │
│  (No admin key required)                                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    │  SERVER CHECKS:   │
                    │  1. Token valid?  │
                    │  2. Not paid yet? │
                    └─────────┬─────────┘
                              ↓
                    ┌─────────┴─────────┐
                    │                   │
                    ↓                   ↓
        ┌───────────────────┐   ┌───────────────────┐
        │  VALID ✅         │   │  INVALID ❌       │
        └───────────────────┘   └───────────────────┘
                    │                   │
                    ↓                   ↓
        ┌───────────────────┐   ┌───────────────────┐
        │  CHECK TIMING     │   │  SHOW ERROR       │
        └───────────────────┘   └───────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ↓                       ↓
┌───────────────────┐   ┌───────────────────┐
│  >48hrs before    │   │  <48hrs before    │
│  check-in         │   │  check-in         │
│                   │   │                   │
│  ✅ FULL REFUND   │   │  ❌ NO REFUND     │
│  ELIGIBLE         │   │                   │
└───────────────────┘   └───────────────────┘
        │                       │
        └───────────┬───────────┘
                    ↓
        ┌───────────────────────┐
        │  CANCELLATION PAGE    │
        │                       │
        │  🚫 Booking Cancelled │
        │                       │
        │  Refund Status: ...   │
        │                       │
        │  [Contact Us Button]  │
        └───────────────────────┘
                    │
                    ↓
        ┌───────────────────────┐
        │  YOU RECEIVE ALERT    │
        │  ON WHATSAPP          │
        │                       │
        │  🚫 BOOKING CANCELLED │
        │  Guest: John Doe      │
        │  Refund: ₦190,000     │
        └───────────────────────┘
```

---

## 🎯 Quick Reference

### Admin Actions (Require Admin Key)
```
✅ CONFIRM  → /api/bookings/:id/confirm?token=X&admin=Y
❌ DECLINE  → /api/bookings/:id/decline?token=X&admin=Y
⚠️ CANCEL   → /api/bookings/:id/cancel?token=X&admin=Y
```

### Guest Actions (No Admin Key)
```
🚫 SELF-CANCEL → /api/bookings/:id/guest-cancel?token=X
```

---

## 📊 Status Transitions

```
NEW BOOKING
    ↓
[PENDING] ──────────────────────────────────────┐
    │                                           │
    │ (You tap CONFIRM)                         │ (You tap DECLINE)
    ↓                                           ↓
[CONFIRMED] ─────────────────────────────→ [CANCELLED]
    │                                           ↑
    │ (Guest pays)                              │
    ↓                                           │
[PAID] ──────────────────────────────────────────┘
    │                                    (You tap CANCEL
    │                                     if no payment)
    ↓
[COMPLETED]
(After checkout)
```

---

## 🔑 Key Points

### For You (Admin):
- ✅ Receive all booking notifications on WhatsApp
- ✅ Click links to confirm/decline/cancel
- ✅ Links work on phone or computer
- ✅ Links are secure (require admin key)
- ✅ Send payment details to guest after confirming

### For Guests:
- ✅ Book through website
- ✅ Receive confirmation/decline notifications
- ✅ Get payment instructions after confirmation
- ✅ Can cancel their own booking (if implemented)
- ✅ Contact you via WhatsApp for questions

### Security:
- 🔒 Admin links require secret key
- 🔒 Guest can't access admin functions
- 🔒 Each booking has unique token
- 🔒 Access denied without proper credentials

---

## 📱 Your WhatsApp Number

**All notifications go to:** +2349039269846

Make sure:
- ✅ WhatsApp is installed on this number
- ✅ You can receive messages
- ✅ You can click links in messages

---

## 🎉 You're All Set!

Your booking system is now:
- ✅ Secure
- ✅ Automated
- ✅ Easy to use
- ✅ Ready for bookings

**Test it now with a real booking!**
