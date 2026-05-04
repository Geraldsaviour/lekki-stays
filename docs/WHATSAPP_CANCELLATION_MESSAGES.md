# WhatsApp Cancellation Messages

## Overview
When a booking is cancelled (by guest or host), the guest receives a professional WhatsApp message with all relevant details, refund information, and next steps.

---

## 📱 Message Examples

### **Example 1: Guest Cancels (With Refund)**
**Scenario:** Guest cancels 5 days before check-in, eligible for full refund

```
🚫 *BOOKING CANCELLED*

Your booking cancellation has been processed.

📋 *Cancellation Details:*
Booking Reference: BK-MOR2KX6L-8CE7
Property: Ikoyi Executive Suite
Location: 23 Kingsway Road, Ikoyi, Lagos
Check-in: 2026-05-04
Check-out: 2026-05-06
Guests: 1
Nights: 2

💰 *Payment & Refund:*
Original Amount: ₦240,000
Refund Amount: ₦240,000
Refund Status: Processing
Expected: 5-7 business days
Method: Original payment method

✅ *Cancellation Confirmed:*
Your booking has been successfully cancelled. No further action is required.

💡 *Book Again:*
We'd love to host you in the future!

🌐 *Find Your Next Stay:*
https://shortlet-booking-khaki.vercel.app

📞 *Need Assistance?*
Reply to this message or call us at +2349039269846

We hope to welcome you soon!
```

---

### **Example 2: Guest Cancels (No Refund)**
**Scenario:** Guest cancels 1 day before check-in, within 48-hour window

```
🚫 *BOOKING CANCELLED*

Your booking cancellation has been processed.

📋 *Cancellation Details:*
Booking Reference: BK-ABC123XYZ-456
Property: Victoria Island Penthouse
Location: 1161 Memorial Drive, Victoria Island, Lagos
Check-in: 2026-05-10
Check-out: 2026-05-13
Guests: 4
Nights: 3

💰 *Payment & Refund:*
Original Amount: ₦360,000
Refund Amount: ₦0
Reason: Cancellation within 48 hours of check-in

✅ *Cancellation Confirmed:*
Your booking has been successfully cancelled. No further action is required.

💡 *Book Again:*
We'd love to host you in the future!

🌐 *Find Your Next Stay:*
https://shortlet-booking-khaki.vercel.app

📞 *Need Assistance?*
Reply to this message or call us at +2349039269846

We hope to welcome you soon!
```

---

### **Example 3: Host Cancels (With Reason)**
**Scenario:** Host cancels due to maintenance issue, guest gets full refund

```
🚫 *BOOKING CANCELLED*

We regret to inform you that your booking has been cancelled by the property host.

📋 *Cancellation Details:*
Booking Reference: BK-DEF789GHI-012
Property: Lekki Phase 1 Studio
Location: 15 Admiralty Way, Lekki Phase 1, Lagos
Check-in: 2026-05-15
Check-out: 2026-05-18
Guests: 2
Nights: 3

💰 *Payment & Refund:*
Original Amount: ₦135,000
Refund Amount: ₦135,000
Refund Status: Processing
Expected: 5-7 business days
Method: Original payment method

📝 *Cancellation Reason:*
Unexpected maintenance required. We apologize for the inconvenience and are working to resolve the issue quickly.

🙏 *Our Sincere Apologies:*
We understand this is disappointing and inconvenient. We're here to help you find an alternative accommodation.

💡 *Next Steps:*
• Browse alternative properties on our website
• Contact us for personalized recommendations
• We'll prioritize your next booking

🌐 *Find Your Next Stay:*
https://shortlet-booking-khaki.vercel.app

📞 *Need Assistance?*
Reply to this message or call us at +2349039269846

Thank you for your understanding. We hope to serve you better next time.
```

---

### **Example 4: Host Cancels (No Payment Made)**
**Scenario:** Host declines pending booking before payment

```
🚫 *BOOKING CANCELLED*

We regret to inform you that your booking has been cancelled by the property host.

📋 *Cancellation Details:*
Booking Reference: BK-JKL345MNO-678
Property: Ajah Beachfront Villa
Location: Km 35, Lekki-Epe Expressway, Ajah, Lagos
Check-in: 2026-06-01
Check-out: 2026-06-05
Guests: 6
Nights: 4

💰 *Payment & Refund:*
Original Amount: ₦600,000
Refund Amount: ₦0
Reason: Host cancellation - no charges applied

📝 *Cancellation Reason:*
Property not available for selected dates. We apologize for any inconvenience.

🙏 *Our Sincere Apologies:*
We understand this is disappointing and inconvenient. We're here to help you find an alternative accommodation.

💡 *Next Steps:*
• Browse alternative properties on our website
• Contact us for personalized recommendations
• We'll prioritize your next booking

🌐 *Find Your Next Stay:*
https://shortlet-booking-khaki.vercel.app

📞 *Need Assistance?*
Reply to this message or call us at +2349039269846

Thank you for your understanding. We hope to serve you better next time.
```

---

### **Example 5: Auto-Cancellation (Payment Deadline Expired)**
**Scenario:** Booking auto-cancelled after 24-hour payment deadline

```
⏰ *BOOKING AUTO-CANCELLED*

Your booking was automatically cancelled due to non-payment.

📋 *Booking Reference:* BK-PQR901STU-234
🏨 *Property:* Yaba Creative Space
📅 *Dates:* 2026-05-20 to 2026-05-23

The 24-hour payment deadline has passed.

💡 *Want to rebook?*
The property may still be available. Check availability and create a new booking:

https://shortlet-booking-khaki.vercel.app

Questions? Reply to this message.
```

---

## 🔧 Implementation

### Function Signature

```javascript
WhatsAppNotifier.generateCancellationMessage(
  booking,        // Booking object
  apartment,      // Apartment object
  refundAmount,   // Number (default: 0)
  cancelledBy,    // String: 'guest', 'host', or 'admin' (default: 'guest')
  reason          // String: Optional cancellation reason (default: null)
)
```

### Usage Examples

#### 1. Guest Cancels with Refund
```javascript
const message = WhatsAppNotifier.generateCancellationMessage(
  booking,
  apartment,
  240000,        // Full refund
  'guest',       // Cancelled by guest
  null           // No specific reason
);

// Send via WhatsApp API
sendWhatsAppMessage(booking.guestPhone, message);
```

#### 2. Host Cancels with Reason
```javascript
const message = WhatsAppNotifier.generateCancellationMessage(
  booking,
  apartment,
  135000,                                    // Full refund
  'host',                                    // Cancelled by host
  'Unexpected maintenance required. We apologize for the inconvenience.'
);

sendWhatsAppMessage(booking.guestPhone, message);
```

#### 3. Guest Cancels (No Refund)
```javascript
const message = WhatsAppNotifier.generateCancellationMessage(
  booking,
  apartment,
  0,             // No refund
  'guest',       // Cancelled by guest
  null
);

sendWhatsAppMessage(booking.guestPhone, message);
```

---

## 📋 Message Components

### 1. **Header**
- 🚫 Icon for cancellation
- Clear status: "BOOKING CANCELLED"
- Context: Who cancelled (guest or host)

### 2. **Cancellation Details**
- Booking reference (for tracking)
- Property name and location
- Original dates
- Number of guests and nights

### 3. **Payment & Refund Information**
- Original amount paid
- Refund amount (if applicable)
- Refund processing time (5-7 business days)
- Refund method (original payment method)
- Reason if no refund

### 4. **Cancellation Reason** (Optional)
- Only shown if reason provided
- Explains why booking was cancelled
- Particularly important for host cancellations

### 5. **Apology/Confirmation**
- **Host cancellation:** Sincere apology and acknowledgment
- **Guest cancellation:** Simple confirmation

### 6. **Next Steps**
- **Host cancellation:** Proactive help finding alternatives
- **Guest cancellation:** Invitation to book again

### 7. **Call to Action**
- Link to website for browsing properties
- Contact information for assistance

### 8. **Closing**
- **Host cancellation:** Thank you for understanding
- **Guest cancellation:** Hope to welcome you soon

---

## 🎯 Message Tone Guidelines

### For Guest Cancellations:
- ✅ Professional and neutral
- ✅ Confirm cancellation processed
- ✅ Clear refund information
- ✅ Welcoming for future bookings
- ❌ No guilt or pressure

### For Host Cancellations:
- ✅ Apologetic and empathetic
- ✅ Acknowledge inconvenience
- ✅ Proactive assistance offered
- ✅ Full transparency on refund
- ✅ Commitment to better service
- ❌ No excuses or blame

---

## 💰 Refund Policy Reference

### Full Refund (100%)
- Cancellation 48+ hours before check-in
- Host cancellation (any time)
- System error or double booking

### No Refund (0%)
- Cancellation within 48 hours of check-in
- No-show without cancellation
- Violation of terms and conditions

### Partial Refund (Varies)
- Special circumstances (case-by-case)
- Force majeure events
- Negotiated settlements

---

## 🔄 Integration Points

### 1. Admin Dashboard
When admin cancels a booking:
```javascript
// In admin/js/dashboard.js
async function cancelBooking(bookingId, reason) {
  const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      guestToken: booking.guestToken,
      cancelledBy: 'admin',
      reason: reason
    })
  });
  
  // Backend sends WhatsApp message automatically
}
```

### 2. Guest Cancellation
When guest cancels via website:
```javascript
// In guest cancellation flow
async function cancelMyBooking(bookingRef) {
  const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      guestToken: guestToken,
      cancelledBy: 'guest'
    })
  });
  
  // Backend sends WhatsApp message automatically
}
```

### 3. Automated Cancellation
For payment deadline expiry:
```javascript
// In scheduled job
async function checkPaymentDeadlines() {
  const expiredBookings = await getExpiredPaymentBookings();
  
  for (const booking of expiredBookings) {
    await booking.updateStatus('auto_declined');
    
    // Send auto-decline message
    const message = WhatsAppNotifier.generateAutoDeclineMessage(
      booking,
      apartment
    );
    
    await sendWhatsAppMessage(booking.guestPhone, message);
  }
}
```

---

## 📊 Message Delivery

### Delivery Method
- **Primary:** WhatsApp Business API (when available)
- **Fallback:** WhatsApp Web link (current implementation)
- **Backup:** Email notification

### Timing
- **Immediate:** Upon cancellation action
- **Confirmation:** Within 1 minute
- **Refund:** Separate message when processed

### Tracking
- Log all message sends
- Track delivery status
- Monitor response rates

---

## ✅ Testing Checklist

- [ ] Guest cancels with full refund
- [ ] Guest cancels with no refund
- [ ] Host cancels with reason
- [ ] Host cancels without reason
- [ ] Admin cancels from dashboard
- [ ] Auto-cancellation (payment deadline)
- [ ] Message formatting correct
- [ ] All variables populated
- [ ] Links work correctly
- [ ] Phone numbers formatted properly
- [ ] Emojis display correctly
- [ ] Message length within WhatsApp limits

---

## 🔐 Security & Privacy

### Data Protection
- ✅ Only send to verified guest phone number
- ✅ Include booking reference for verification
- ✅ Don't include sensitive payment details
- ✅ Use secure WhatsApp API

### Message Content
- ✅ Professional language only
- ✅ No personal opinions or judgments
- ✅ Clear and factual information
- ✅ Respectful tone always

---

## 📈 Future Enhancements

1. **Multi-language Support**
   - Detect guest language preference
   - Send message in preferred language

2. **Rich Media**
   - Include property image
   - Add location map
   - Attach cancellation receipt PDF

3. **Interactive Buttons**
   - "Browse Properties" button
   - "Contact Support" button
   - "Rebook" quick action

4. **Personalization**
   - Use guest's first name
   - Reference previous stays
   - Offer loyalty discounts

5. **Follow-up**
   - Automated follow-up after 24 hours
   - Satisfaction survey
   - Re-engagement campaigns

---

## 📞 Support Integration

### Guest Replies
When guest replies to cancellation message:
- Route to support team
- Flag as "cancellation inquiry"
- Priority handling
- Track resolution time

### Common Questions
- "When will I receive my refund?"
- "Can I rebook the same property?"
- "Why was my booking cancelled?"
- "Can I get a partial refund?"

### Support Scripts
Prepare responses for common scenarios to ensure consistent, helpful support.

---

## Status: ✅ IMPLEMENTED

The enhanced cancellation message system is now live with:
- ✅ Comprehensive booking details
- ✅ Clear refund information
- ✅ Differentiated messaging (guest vs host)
- ✅ Optional cancellation reason
- ✅ Professional tone and formatting
- ✅ Next steps and support contact
- ✅ Mobile-friendly formatting
