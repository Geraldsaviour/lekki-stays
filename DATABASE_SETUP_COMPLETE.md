# ✅ Supabase Database Setup Complete

## Summary

Your Lekki Stays database has been successfully built and configured in Supabase with all required tables, indexes, security policies, and helper functions.

## What Was Created

### 1. **Tables**

#### Apartments Table
- **8 apartments seeded** (apt-1 through apt-8)
- Fields: id, name, slug, location, price_per_night, max_guests, active, created_at
- RLS enabled with public read access for active apartments

#### Bookings Table
- Fields: id, booking_ref, apartment_id, guest details, dates, status, tokens, timestamps
- Status flow: `pending → confirmed → payment_pending → paid`
- Alternative flows: `declined`, `auto_declined`, `cancelled`
- RLS enabled with controlled access

### 2. **Indexes (Performance Optimized)**

- `idx_bookings_availability` - Critical compound index for fast availability queries
- `idx_bookings_expire` - Partial index for payment deadline cron jobs

### 3. **Helper Functions**

#### `check_apartment_availability(apartment_id, check_in, check_out)`
- Returns `boolean` - true if available, false if booked
- Checks for overlapping bookings with active statuses
- Secured with `SET search_path = public`

#### `get_booked_dates(apartment_id)`
- Returns table of `(check_in, check_out)` dates
- Shows all active bookings for an apartment
- Useful for calendar displays

### 4. **Row Level Security (RLS)**

#### Apartments
- ✅ Public can read active apartments
- ❌ Only service role can modify

#### Bookings
- ✅ Public can read booking dates (for availability)
- ✅ Public can insert new bookings
- ❌ Only service role can update/delete (via backend)

### 5. **Migrations Applied**

1. `create_apartments_table` - Base apartments structure
2. `seed_apartments_data` - 8 apartments with real data
3. `create_bookings_table` - Booking records with status tracking
4. `create_performance_indexes` - Optimized query performance
5. `enable_row_level_security` - Security policies
6. `create_helper_functions` - Availability checking
7. `fix_security_warnings` - Enhanced function security

## Database Statistics

- **Tables**: 2 (apartments, bookings)
- **Apartments**: 8 seeded
- **Bookings**: 1 test booking created
- **Functions**: 2 helper functions
- **Indexes**: 2 performance indexes
- **RLS Policies**: 3 security policies

## TypeScript Types Generated

TypeScript types have been generated and saved to:
- `server/types/supabase.ts`

Use these types for type-safe database operations in your Node.js backend.

## Test Results

### ✅ Apartments Query
All 8 apartments successfully seeded and queryable.

### ✅ Availability Function
- Correctly detects overlapping bookings (returns `false`)
- Correctly identifies available dates (returns `true`)

### ✅ Booked Dates Function
- Returns all active bookings for an apartment
- Properly ordered by check-in date

### ✅ Test Booking Created
- Booking Ref: `BK-TEST-001`
- Apartment: `apt-1` (Haven Lekki — Studio)
- Dates: June 1-5, 2026
- Status: `pending`

## Security Advisors

### Expected Warnings (Intentional Design)

1. **Public Insert Booking** - Allows guests to create bookings without authentication (required for public booking flow)
2. **Public Functions** - Availability checking functions are intentionally public for the booking interface

These warnings are expected and align with your business requirements.

## Next Steps

### 1. Update Backend to Use Supabase

Replace MongoDB/SQLite calls with Supabase client:

```javascript
import { createClient } from '@supabase/supabase-js'
import { Database } from './types/supabase'

const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Example: Get all apartments
const { data: apartments } = await supabase
  .from('apartments')
  .select('*')
  .eq('active', true)

// Example: Check availability
const { data: isAvailable } = await supabase
  .rpc('check_apartment_availability', {
    p_apartment_id: 'apt-1',
    p_check_in: '2026-06-01',
    p_check_out: '2026-06-05'
  })

// Example: Create booking
const { data: booking } = await supabase
  .from('bookings')
  .insert({
    booking_ref: 'BK-' + Date.now(),
    apartment_id: 'apt-1',
    guest_name: 'John Doe',
    guest_phone: '+2349012345678',
    guest_email: 'john@example.com',
    check_in: '2026-06-10',
    check_out: '2026-06-15',
    guests: 2,
    total_price: 175000,
    guest_token: crypto.randomUUID()
  })
  .select()
  .single()
```

### 2. Add Supabase Credentials to .env

Add these to `server/.env`:

```env
SUPABASE_URL=https://kqlxdjkwklcvxfexevsi.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. Install Supabase Client

```bash
cd server
npm install @supabase/supabase-js
```

### 4. Migrate API Routes

Update these files to use Supabase:
- `server/routes/apartments.js` - Use Supabase queries
- `server/routes/bookings.js` - Use Supabase inserts/updates
- `api/analytics.js` - Use Supabase aggregations

### 5. Set Up Cron Job (Optional)

For auto-declining expired payment_pending bookings:

```sql
-- Run this query periodically (via Supabase Edge Function or external cron)
UPDATE bookings
SET status = 'auto_declined',
    declined_at = NOW()
WHERE status = 'payment_pending'
  AND payment_deadline < NOW();
```

## Database Access

You can now manage the database through:

1. **Kiro AI** - I can query, insert, update, and analyze data directly
2. **Supabase Dashboard** - Visual table editor and SQL editor
3. **Backend API** - Using `@supabase/supabase-js` client
4. **Direct SQL** - Via Supabase SQL Editor

## Support

For database operations, just ask me! I have direct access via MCP and can:
- Query data
- Create/update bookings
- Check availability
- Run analytics
- Apply schema changes
- Debug issues

---

**Database Status**: ✅ Fully Operational
**Last Updated**: May 3, 2026
