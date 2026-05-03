# 🏨 LuxStay Admin Dashboard

Modern, streamlined admin dashboard for managing bookings with Supabase.

## ✨ Features

### Booking Management
- ✅ **View all bookings** with real-time updates
- ✅ **Confirm bookings** - Approve and send payment details
- ✅ **Decline bookings** - Reject with reason
- ✅ **Mark as paid** - Confirm payment received
- ✅ **Cancel bookings** - Cancel with refund policy
- ✅ **WhatsApp integration** - Send payment details directly

### Dashboard
- 📊 **Statistics** - Total, pending, confirmed, paid bookings
- 🔍 **Search & Filter** - Find bookings quickly
- 🏠 **Apartments view** - See all properties
- 📱 **Responsive design** - Works on all devices

## 🚀 Quick Setup

### 1. Configure Supabase

Update `admin/js/config.js` with your Supabase credentials:

```javascript
export const SUPABASE_URL = 'https://your-project.supabase.co';
export const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### 2. Create Admin User

In Supabase Dashboard:
1. Go to Authentication → Users
2. Click "Add user"
3. Email: `admin@luxstay.ng`
4. Password: (create strong password)
5. Confirm email automatically

### 3. Update Supabase RLS Policies

Run this SQL in Supabase SQL Editor:

```sql
-- Allow authenticated users (admins) to read/update bookings
CREATE POLICY "Admins can read all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to read apartments
CREATE POLICY "Admins can read apartments"
  ON apartments FOR SELECT
  TO authenticated
  USING (true);
```

### 4. Start Development Server

```bash
cd admin
python -m http.server 3001
# or
npx serve -p 3001
```

Visit: **http://localhost:3001**

### 5. Login

- Email: `admin@luxstay.ng`
- Password: (your password from step 2)

## 📋 Booking Workflow

### Simplified Status Flow

```
PENDING → CONFIRMED → PAID → COMPLETED
   ↓
DECLINED
   ↓
CANCELLED
```

### Admin Actions

1. **New Booking Arrives** (Status: PENDING)
   - Guest books on website
   - Booking appears in admin dashboard
   - WhatsApp notification sent to admin

2. **Admin Reviews Booking**
   - Click "View Details" to see full information
   - Check dates, guest info, special requests

3. **Confirm Booking** (Status: CONFIRMED)
   - Click "Confirm" button
   - Payment details automatically sent via WhatsApp
   - Guest receives bank details and booking confirmation

4. **Guest Pays**
   - Guest makes bank transfer
   - Guest sends payment receipt via WhatsApp

5. **Mark as Paid** (Status: PAID)
   - Admin verifies payment
   - Click "Mark as Paid"
   - Booking confirmed and secured

6. **Booking Complete** (Status: COMPLETED)
   - Automatically marked as completed after checkout date
   - Or manually mark as completed

### Alternative Actions

- **Decline Booking** - If dates unavailable or other issues
- **Cancel Booking** - If guest cancels or admin needs to cancel

## 🎨 Status Colors

- 🟡 **PENDING** - Orange (awaiting admin action)
- 🟢 **CONFIRMED** - Green (approved, awaiting payment)
- 🔵 **PAID** - Blue (payment received)
- ⚪ **COMPLETED** - Gray (booking finished)
- 🔴 **DECLINED** - Red (rejected)
- ⚫ **CANCELLED** - Dark gray (cancelled)

## 📱 WhatsApp Integration

### Payment Details Message Template

When admin clicks "Send Payment Details", guest receives:

```
🎉 Booking Confirmed — LuxStay

Hi [Guest Name]! Your booking has been confirmed.

📋 Booking Details:
Booking Ref: [REF]
Apartment: [NAME]
Check-in: [DATE]
Check-out: [DATE]
Guests: [COUNT]

💰 Payment Required: ₦[AMOUNT]

Bank: GTBank
Account: 9039269846
Name: Lekki Stays Ltd
Reference: LUXSTAY-[REF]

📸 Send payment receipt to this number.
⏰ Payment due within 24 hours.

We look forward to hosting you! 🏠
```

## 🔒 Security

- ✅ Supabase Authentication
- ✅ Row Level Security (RLS)
- ✅ Secure session management
- ✅ Admin-only access
- ✅ No public API exposure

## 📁 File Structure

```
admin/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── css/
│   ├── admin.css          # Base styles
│   └── dashboard.css      # Dashboard styles
├── js/
│   ├── config.js          # Configuration
│   ├── auth.js            # Authentication logic
│   ├── dashboard.js       # Dashboard logic
│   └── api.js             # Supabase API client
└── README.md              # This file
```

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
cd admin
vercel --prod
```

### Option 2: Netlify

1. Push to GitHub
2. Connect to Netlify
3. Set build directory: `admin`
4. Deploy

### Option 3: Firebase Hosting

```bash
firebase init hosting
# Public directory: admin
firebase deploy --only hosting
```

## 🔧 Configuration

### Update Bank Details

Edit `admin/js/config.js`:

```javascript
export const BANK_DETAILS = {
    bankName: 'Your Bank',
    accountNumber: 'Your Account Number',
    accountName: 'Your Account Name'
};
```

### Update WhatsApp Number

```javascript
export const WHATSAPP_NUMBER = '+234XXXXXXXXXX';
```

## 📝 Notes

- **No check-in/check-out** - Simplified workflow
- **Auto-complete** - Bookings auto-complete after checkout date
- **Real-time updates** - Dashboard updates automatically
- **Mobile-friendly** - Works on phones and tablets

## 🆘 Troubleshooting

### Can't login?
- Verify admin user exists in Supabase Auth
- Check email and password
- Ensure email is confirmed

### Bookings not showing?
- Check Supabase RLS policies
- Verify you're logged in
- Check browser console for errors

### WhatsApp not working?
- Verify WhatsApp number in config.js
- Check phone number format (+234...)
- Test WhatsApp link manually

## 📧 Support

For issues:
1. Check browser console for errors
2. Verify Supabase configuration
3. Check RLS policies
4. Review this README

---

**Version:** 2.0.0  
**Last Updated:** May 2026  
**Status:** ✅ Production Ready
