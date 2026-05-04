# Phase 1 — Backend Migration to Supabase (IN PROGRESS)

## Overview

Phase 1 involves completely replacing the MongoDB backend with Supabase (PostgreSQL) and rewriting the Express server with modern architecture.

---

## Progress Summary

### ✅ Completed

1. **Supabase Schema** (`supabase/schema.sql`)
   - Apartments table with 8 seeded properties
   - Bookings table with full lifecycle tracking
   - Indexes for performance (availability queries, expiration checks)
   - Row Level Security (RLS) policies
   - Helper functions (check_apartment_availability, get_booked_dates)
   - Comprehensive comments and verification queries

2. **Supabase Client** (`server/supabase-client.js`)
   - Public client (anon key, respects RLS)
   - Admin client (service role key, bypasses RLS)
   - Environment variable validation
   - Connection testing on startup

3. **New Models** (`server/models-supabase/`)
   - **Apartment.js**: Complete CRUD operations, availability checking, pricing calculation
   - **Booking.js**: Full booking lifecycle, validation, sanitization, status management

### ⏳ In Progress

4. **New Route Handlers** (TO DO)
   - `server/routes-supabase/apartments.js`
   - `server/routes-supabase/bookings.js`
   - `server/routes-supabase/availability.js`

5. **New WhatsApp Integration** (TO DO)
   - `server/utils-supabase/whatsapp.js`
   - Remove token-based links
   - Implement modern confirmation flow

6. **New Server Entry Point** (TO DO)
   - Rewrite `server/server.js`
   - Wire up new routes
   - Remove old MongoDB code
   - Add Supabase connection test

7. **Environment Configuration** (TO DO)
   - Update `server/.env.example`
   - Document required variables
   - Add Railway deployment config

8. **Data Migration** (TO DO)
   - Export existing MongoDB bookings (if any)
   - Import to Supabase
   - Verify data integrity

---

## File Structure

### New Files Created:
```
supabase/
└── schema.sql                          ✅ Complete

server/
├── supabase-client.js                  ✅ Complete
├── models-supabase/
│   ├── Apartment.js                    ✅ Complete
│   └── Booking.js                      ✅ Complete
├── routes-supabase/                    ⏳ To Do
│   ├── apartments.js
│   ├── bookings.js
│   └── availability.js
└── utils-supabase/                     ⏳ To Do
    └── whatsapp.js
```

### Files to Replace:
```
server/
├── db-mongo.js                         ❌ Delete after migration
├── models/
│   ├── Apartment.js                    ❌ Delete after migration
│   └── Booking.js                      ❌ Delete after migration
├── routes/
│   ├── apartments.js                   ❌ Replace
│   ├── bookings.js                     ❌ Replace
│   ├── notifications.js                ❌ Replace
│   └── payments.js                     ❌ Replace
└── utils/
    ├── availability.js                 ❌ Replace
    └── whatsapp.js                     ❌ Replace
```

---

## Next Steps

### 1. Create New Route Handlers

**apartments.js:**
- GET /api/apartments — List all active apartments
- GET /api/apartments/:id — Get apartment details
- GET /api/apartments/:id/availability — Check availability
- GET /api/apartments/:id/booked-dates — Get booked dates

**bookings.js:**
- POST /api/bookings — Create new booking
- GET /api/bookings/:id — Get booking details
- PUT /api/bookings/:id/status — Update booking status (admin)
- POST /api/bookings/:id/confirm — Host confirms booking
- POST /api/bookings/:id/decline — Host declines booking
- POST /api/bookings/:id/cancel — Cancel booking
- POST /api/bookings/:id/payment — Mark as paid

**availability.js:**
- POST /api/availability/check — Check availability for date range
- POST /api/availability/search — Search available apartments

### 2. Implement New WhatsApp Flow

**Remove:**
- Token-based confirmation links (?token=&admin=)
- GET routes for confirm/decline/cancel

**Implement:**
- WhatsApp message templates
- Direct booking reference system
- Admin dashboard integration (via admin-standalone)

### 3. Rewrite server.js

**Structure:**
```javascript
// Environment & Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./supabase-client');

// Middleware
app.use(cors());
app.use(express.json());
app.use(performanceMonitor);

// Static file serving (keep existing)
// ... existing static file routes ...

// API Routes (new)
app.use('/api/apartments', require('./routes-supabase/apartments'));
app.use('/api/bookings', require('./routes-supabase/bookings'));
app.use('/api/availability', require('./routes-supabase/availability'));

// Health check
app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({
    status: dbConnected ? 'OK' : 'DEGRADED',
    database: dbConnected ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, async () => {
  console.log(`🏨 Lekki Stays server running on port ${PORT}`);
  await testConnection();
});
```

### 4. Update Environment Variables

**Required:**
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# WhatsApp
HOST_WHATSAPP_NUMBER=+2349039269846

# Server
PORT=3000
NODE_ENV=production
BASE_URL=https://your-domain.com
```

### 5. Install Dependencies

```bash
cd server
npm install @supabase/supabase-js
npm uninstall mongodb mongoose
```

### 6. Test Migration

**Steps:**
1. Create Supabase project
2. Run schema.sql in Supabase SQL Editor
3. Update .env with Supabase credentials
4. Install dependencies
5. Start server and test connection
6. Test each endpoint with Postman/curl
7. Verify RLS policies work correctly

---

## Database Schema Summary

### Apartments Table
- **id**: TEXT (primary key) — 'apt-1' through 'apt-8'
- **name**: TEXT — Display name
- **slug**: TEXT (unique) — URL-friendly identifier
- **location**: TEXT — City/area
- **price_per_night**: INTEGER — Price in Naira
- **max_guests**: INTEGER — Maximum occupancy
- **active**: BOOLEAN — Visibility flag
- **created_at**: TIMESTAMPTZ — Creation timestamp

### Bookings Table
- **id**: UUID (primary key) — Auto-generated
- **booking_ref**: TEXT (unique) — Human-readable reference (LUX123456ABC)
- **apartment_id**: TEXT (foreign key) — References apartments(id)
- **guest_name**: TEXT — Guest full name
- **guest_phone**: TEXT — Nigerian phone number
- **guest_email**: TEXT — Email address
- **check_in**: DATE — Check-in date
- **check_out**: DATE — Check-out date
- **guests**: INTEGER — Number of guests
- **total_price**: INTEGER — Total price in Naira
- **status**: TEXT — Booking status (pending, confirmed, payment_pending, paid, declined, auto_declined, cancelled)
- **guest_token**: TEXT (unique) — Secure token for guest actions
- **payment_deadline**: TIMESTAMPTZ — Payment deadline (24h after confirmation)
- **confirmed_at**: TIMESTAMPTZ — Confirmation timestamp
- **paid_at**: TIMESTAMPTZ — Payment timestamp
- **declined_at**: TIMESTAMPTZ — Decline timestamp
- **cancelled_at**: TIMESTAMPTZ — Cancellation timestamp
- **created_at**: TIMESTAMPTZ — Creation timestamp

---

## Booking Status Flow

```
pending
  ↓
confirmed → payment_pending
  ↓              ↓
paid         (24h timeout)
              ↓
          auto_declined

Alternative paths:
pending → declined (host declines)
pending → cancelled (guest cancels)
confirmed → cancelled (guest cancels)
payment_pending → cancelled (guest cancels)
```

---

## API Endpoints Design

### Apartments

```
GET /api/apartments
Response: { success: true, apartments: [...] }

GET /api/apartments/:id
Response: { success: true, apartment: {...} }

GET /api/apartments/:id/availability?checkIn=DATE&checkOut=DATE
Response: { success: true, available: true/false }

GET /api/apartments/:id/booked-dates
Response: { success: true, bookedDates: [{checkIn, checkOut}, ...] }
```

### Bookings

```
POST /api/bookings
Body: { apartmentId, guestName, guestPhone, guestEmail, checkIn, checkOut, guests, totalPrice }
Response: { success: true, booking: {...}, bookingRef: "LUX123456ABC" }

GET /api/bookings/:id
Response: { success: true, booking: {...}, apartment: {...} }

POST /api/bookings/:id/confirm
Body: { guestToken }
Response: { success: true, booking: {...}, message: "Booking confirmed" }

POST /api/bookings/:id/decline
Body: { guestToken }
Response: { success: true, booking: {...}, message: "Booking declined" }

POST /api/bookings/:id/cancel
Body: { guestToken }
Response: { success: true, booking: {...}, refundAmount: 0 }

POST /api/bookings/:id/payment
Body: { guestToken, paymentReference }
Response: { success: true, booking: {...}, message: "Payment confirmed" }
```

### Availability

```
POST /api/availability/check
Body: { apartmentId, checkIn, checkOut }
Response: { success: true, available: true/false }

POST /api/availability/search
Body: { location?, checkIn, checkOut, guests }
Response: { success: true, available: [...] }
```

---

## Estimated Completion

- **Phase 1 Progress:** 40% complete
- **Remaining Work:** Route handlers, WhatsApp integration, server rewrite, testing
- **Estimated Time:** 1-2 days

---

## Notes

1. **RLS Policies:** Public can read apartments and booking dates (no PII). All writes go through service role.
2. **Guest Token:** Used for guest self-service actions (confirm, cancel, payment). Never exposed in public APIs.
3. **Booking Reference:** Human-readable format (LUX123456ABC) for customer service.
4. **Payment Deadline:** Auto-set to 24 hours after confirmation. Cron job needed to auto-decline expired bookings.
5. **Service Fee:** Fixed ₦10,000 added to all bookings.

---

**Status:** Phase 1 — 40% Complete
**Next:** Create route handlers
