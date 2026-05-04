# WhatsApp Notification Setup Guide

## Current Issue

When a guest makes a reservation with "Pay on Arrival", the booking is created successfully in the database, but:
1. ❌ No WhatsApp message is sent to the admin
2. ❌ Success page may not be showing (need to verify)

## Root Cause

The system generates WhatsApp links but doesn't actually SEND messages. There are two types of WhatsApp integration:

### 1. **WhatsApp Web Links** (Current Implementation)
- Generates `https://wa.me/` links
- Requires manual click to open WhatsApp
- Guest clicks link → WhatsApp opens with pre-filled message
- **Problem:** Admin doesn't get notified automatically

### 2. **WhatsApp Business API** (Recommended Solution)
- Sends messages programmatically
- No user interaction required
- Requires WhatsApp Business account
- Requires API setup and approval

## Temporary Solution (Manual Notification)

Until WhatsApp Business API is set up, the admin needs to:

### Option A: Check Admin Dashboard Regularly
1. Open admin dashboard
2. Check for new "pending" bookings
3. Contact guests manually

### Option B: Use Admin Notification Link
1. After booking is created, server logs admin WhatsApp link
2. Admin clicks the link to send notification to themselves
3. Manual process but works immediately

### Option C: Email Notifications (Recommended Interim)
1. Set up email service (SendGrid, Mailgun, etc.)
2. Send email to admin on new booking
3. More reliable than manual WhatsApp

## Permanent Solution: WhatsApp Business API

### Step 1: Create WhatsApp Business Account
1. Go to https://business.whatsapp.com/
2. Create business account
3. Verify business details

### Step 2: Apply for WhatsApp Business API
1. Go to https://developers.facebook.com/
2. Create app
3. Add WhatsApp product
4. Complete business verification

### Step 3: Get API Credentials
- Phone Number ID
- WhatsApp Business Account ID
- Access Token

### Step 4: Implement in Code

```javascript
// server/utils/whatsapp-sender.js
const axios = require('axios');

class WhatsAppSender {
  static async sendMessage(to, message) {
    const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    
    try {
      const response = await axios.post(url, {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: message }
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ WhatsApp message sent:', response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('❌ WhatsApp send failed:', error.response?.data || error.message);
      return { success: false, error: error.message };
    }
  }
  
  static async sendBookingNotification(booking, apartment) {
    const message = `🏨 *NEW BOOKING REQUEST*

📋 *Booking Details:*
Ref: ${booking.bookingRef}
Apartment: ${apartment.name}

👤 *Guest Information:*
Name: ${booking.guestName}
Phone: ${booking.guestPhone}
Email: ${booking.guestEmail}

📅 *Stay Details:*
Check-in: ${booking.checkIn}
Check-out: ${booking.checkOut}
Guests: ${booking.guests}

💰 *Payment:*
Total: ₦${booking.totalPrice.toLocaleString()}

⏰ *Status:* Pending Confirmation`;

    return this.sendMessage(process.env.HOST_WHATSAPP_NUMBER, message);
  }
}

module.exports = WhatsAppSender;
```

### Step 5: Update Booking Route

```javascript
// In server/routes-supabase/bookings.js
const WhatsAppSender = require('../utils/whatsapp-sender');

// After booking is created:
const booking = await Booking.create(bookingData);

// Send WhatsApp notification to admin
await WhatsAppSender.sendBookingNotification(booking, apartment);
```

### Step 6: Add Environment Variables

```env
# .env
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
HOST_WHATSAPP_NUMBER=2349039269846
```

## Alternative: Third-Party Services

### 1. **Twilio WhatsApp API**
- Easier setup than official API
- Pay-per-message pricing
- Good documentation
- https://www.twilio.com/whatsapp

### 2. **MessageBird**
- WhatsApp Business API
- Multiple channels (SMS, WhatsApp, Email)
- https://messagebird.com/

### 3. **Vonage (Nexmo)**
- WhatsApp Business API
- Global coverage
- https://www.vonage.com/communications-apis/messages/

## Quick Fix for Testing

For immediate testing without API setup:

### 1. Console Log Method
```javascript
// After booking creation
console.log('='.repeat(60));
console.log('📱 NEW BOOKING - ADMIN ACTION REQUIRED');
console.log('='.repeat(60));
console.log(`Booking Ref: ${booking.bookingRef}`);
console.log(`Guest: ${booking.guestName}`);
console.log(`Phone: ${booking.guestPhone}`);
console.log(`Apartment: ${apartment.name}`);
console.log(`Check-in: ${booking.checkIn}`);
console.log(`Total: ₦${booking.totalPrice.toLocaleString()}`);
console.log('='.repeat(60));
console.log(`Admin WhatsApp Link: ${adminWhatsAppLink}`);
console.log('='.repeat(60));
```

### 2. Browser Notification (Admin Dashboard)
```javascript
// In admin dashboard
setInterval(async () => {
  const response = await fetch('/api/bookings?status=pending');
  const data = await response.json();
  
  if (data.bookings.length > lastCount) {
    // Show browser notification
    new Notification('New Booking!', {
      body: 'You have a new booking request',
      icon: '/icon.png'
    });
    
    // Play sound
    new Audio('/notification.mp3').play();
  }
  
  lastCount = data.bookings.length;
}, 30000); // Check every 30 seconds
```

### 3. Email Notification (Easiest Interim Solution)
```javascript
// Using Nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function sendBookingEmail(booking, apartment) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Booking: ${booking.bookingRef}`,
    html: `
      <h2>New Booking Request</h2>
      <p><strong>Booking Ref:</strong> ${booking.bookingRef}</p>
      <p><strong>Guest:</strong> ${booking.guestName}</p>
      <p><strong>Phone:</strong> ${booking.guestPhone}</p>
      <p><strong>Apartment:</strong> ${apartment.name}</p>
      <p><strong>Check-in:</strong> ${booking.checkIn}</p>
      <p><strong>Total:</strong> ₦${booking.totalPrice.toLocaleString()}</p>
    `
  });
}
```

## Success Page Issue

If the success page isn't showing, check:

### 1. Browser Console Errors
```javascript
// Open browser DevTools (F12)
// Check Console tab for errors
// Look for:
// - API errors
// - JavaScript errors
// - Network errors
```

### 2. Network Tab
```javascript
// Check if POST /api/bookings returns 201
// Check response body has success: true
// Check booking object is returned
```

### 3. Add Debug Logging
```javascript
// In booking.js handleSubmit()
console.log('📝 Booking payload:', bookingPayload);
console.log('📡 API response:', response);
console.log('✅ Booking object:', booking);
console.log('💳 Payment method:', selectedPaymentMethod);
```

## Testing Checklist

- [ ] Booking creates successfully in database
- [ ] Booking reference is generated
- [ ] API returns 201 status
- [ ] Response has success: true
- [ ] Response has booking object
- [ ] Success page shows
- [ ] All booking details populate
- [ ] Admin receives notification (manual or automatic)
- [ ] Guest can print confirmation
- [ ] Guest can navigate back to home

## Current Status

✅ Booking creation works
✅ Database storage works
✅ API response works
❌ Admin WhatsApp notification (manual link only)
❓ Success page display (needs verification)

## Next Steps

1. **Immediate:** Test success page display
2. **Short-term:** Implement email notifications
3. **Long-term:** Set up WhatsApp Business API
4. **Alternative:** Use Twilio WhatsApp API

## Resources

- WhatsApp Business API: https://developers.facebook.com/docs/whatsapp
- Twilio WhatsApp: https://www.twilio.com/docs/whatsapp
- Nodemailer: https://nodemailer.com/
- SendGrid: https://sendgrid.com/
