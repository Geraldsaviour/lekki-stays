# 🔐 Admin Dashboard System - Complete Specification

## Overview

A separate, secure admin dashboard for managing bookings, completely isolated from the main booking website for enhanced security.

---

## 🎯 **Key Requirements**

### **1. Separate Repository & Deployment**
- Own GitHub repository: `lekki-stays-admin`
- Separate domain: `admin.lekkistays.com` or `lekkistays-admin.vercel.app`
- No links from main website to admin
- Completely isolated codebase

### **2. Security Features**
- Email + Password authentication
- Email verification required
- Session management
- JWT tokens
- Rate limiting on login attempts
- 2FA optional (future enhancement)

### **3. Core Functionality**
- View all bookings (pending, confirmed, paid, completed, cancelled)
- Confirm bookings
- Decline/Reject bookings
- Cancel bookings (within 48hrs refund policy)
- Send payment details to guest via WhatsApp
- Update booking status (paid, checked-in, checked-out)
- View booking history
- Search and filter bookings

### **4. No WhatsApp Links**
- Remove confirmation/decline links from WhatsApp messages
- WhatsApp only notifies admin of new booking
- Admin logs into dashboard to manage bookings

---

## 📋 **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                    MAIN BOOKING WEBSITE                     │
│                  (lekkistays.vercel.app)                    │
│                                                             │
│  Guest books → Backend API → MongoDB → WhatsApp to Admin   │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    MongoDB (Shared Database)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                          │
│              (admin.lekkistays.vercel.app)                  │
│                                                             │
│  Admin Login → View Bookings → Confirm/Decline → Update    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ **Project Structure**

```
lekki-stays-admin/
├── .env
├── .gitignore
├── package.json
├── README.md
├── vercel.json
│
├── public/
│   ├── favicon.ico
│   └── logo.png
│
├── src/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── booking-details.html
│   │
│   ├── css/
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   └── components.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── dashboard.js
│   │   ├── booking-manager.js
│   │   ├── api-client.js
│   │   └── utils.js
│   │
│   └── components/
│       ├── navbar.js
│       ├── booking-card.js
│       └── modal.js
│
└── api/
    ├── auth/
    │   ├── login.js
    │   ├── logout.js
    │   ├── verify-email.js
    │   └── reset-password.js
    │
    └── bookings/
        ├── list.js
        ├── get.js
        ├── update-status.js
        └── send-payment.js
```

---

## 🔐 **Authentication System**

### **Admin User Schema (MongoDB)**
```javascript
{
  _id: ObjectId,
  email: "admin@lekkistays.com",
  passwordHash: "bcrypt_hashed_password",
  name: "Admin Name",
  role: "admin",
  isEmailVerified: true,
  emailVerificationToken: null,
  resetPasswordToken: null,
  resetPasswordExpires: null,
  lastLogin: "2026-04-28T10:30:00Z",
  loginAttempts: 0,
  lockUntil: null,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-04-28T10:30:00Z"
}
```

### **Login Flow**
```
1. Admin visits: admin.lekkistays.com
2. Sees login page (email + password)
3. Enters credentials
4. Backend validates:
   - Email exists?
   - Password correct?
   - Email verified?
   - Account not locked?
5. If valid:
   - Generate JWT token
   - Set secure cookie
   - Redirect to dashboard
6. If invalid:
   - Increment login attempts
   - Lock account after 5 failed attempts
   - Show error message
```

### **Session Management**
```javascript
// JWT Token Payload
{
  userId: "admin_id",
  email: "admin@lekkistays.com",
  role: "admin",
  iat: 1714300800,  // Issued at
  exp: 1714387200   // Expires in 24 hours
}
```

---

## 📊 **Dashboard Features**

### **1. Dashboard Home**
```
┌─────────────────────────────────────────────────────────────┐
│  Lekki Stays Admin                        [Admin] [Logout]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 OVERVIEW                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Pending  │  │Confirmed │  │   Paid   │  │Completed │   │
│  │    5     │  │    12    │  │    8     │  │    45    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  🔔 RECENT BOOKINGS                                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Filter: All ▼] [Search: ___________] [🔍]         │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🟡 PENDING  #LUX123ABC  John Doe  May 15-18        │   │
│  │    Haven Lekki  ₦145,000  [View] [Confirm] [Decline]│   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🟢 CONFIRMED #LUX456DEF  Jane Smith  Jun 1-5        │   │
│  │    Metropolis  ₦225,000  [View] [Send Payment]     │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ 🔵 PAID  #LUX789GHI  Mike Johnson  Jun 10-15       │   │
│  │    VI Penthouse  ₦600,000  [View] [Check-in]       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  [Load More]                                                │
└─────────────────────────────────────────────────────────────┘
```

### **2. Booking Details View**
```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BOOKING DETAILS                                            │
│                                                             │
│  Status: 🟡 PENDING                                         │
│  Booking ID: #LUX123456ABC                                  │
│  Created: April 28, 2026 10:30 AM                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ GUEST INFORMATION                                   │   │
│  │ Name: John Doe                                      │   │
│  │ Email: john@example.com                             │   │
│  │ Phone: +234 801 234 5678                            │   │
│  │ Special Requests: Late check-in please              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ BOOKING DETAILS                                     │   │
│  │ Apartment: Haven Lekki - Studio                     │   │
│  │ Check-in: May 15, 2026 (2:00 PM)                    │   │
│  │ Check-out: May 18, 2026 (11:00 AM)                  │   │
│  │ Nights: 3                                           │   │
│  │ Guests: 2                                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ PRICING                                             │   │
│  │ Subtotal: ₦135,000 (₦45,000 × 3 nights)            │   │
│  │ Caution Fee: ₦10,000                                │   │
│  │ Total: ₦145,000                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ACTIONS:                                                   │
│  [✅ Confirm Booking]  [❌ Decline Booking]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### **3. Confirm Booking Modal**
```
┌─────────────────────────────────────────────────────────────┐
│  CONFIRM BOOKING #LUX123456ABC                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Are you sure you want to confirm this booking?             │
│                                                             │
│  Guest: John Doe                                            │
│  Dates: May 15-18, 2026                                     │
│  Total: ₦145,000                                            │
│                                                             │
│  ☑ Send payment details to guest via WhatsApp              │
│                                                             │
│  [Cancel]  [Confirm & Send Payment Details]                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 **Booking Status Flow**

```
PENDING → CONFIRMED → PAID → CHECKED-IN → CHECKED-OUT → COMPLETED
   ↓
DECLINED
   ↓
CANCELLED (within 48hrs = refund)
```

### **Status Definitions**
- **PENDING**: New booking, awaiting admin confirmation
- **CONFIRMED**: Admin confirmed, payment details sent to guest
- **PAID**: Guest paid, payment verified by admin
- **CHECKED-IN**: Guest arrived and checked in
- **CHECKED-OUT**: Guest left, booking complete
- **COMPLETED**: Archived, no further action needed
- **DECLINED**: Admin rejected booking
- **CANCELLED**: Booking cancelled (by admin or guest)

---

## 📱 **WhatsApp Integration (Simplified)**

### **New Booking Notification (to Admin)**
```
🏠 NEW BOOKING — Lekki Stays

Booking ID: #LUX123456ABC
Guest: John Doe
Phone: +234 801 234 5678
Apartment: Haven Lekki - Studio
Check-in: May 15, 2026
Check-out: May 18, 2026
Guests: 2
Total: ₦145,000

🔐 Login to admin dashboard to confirm:
admin.lekkistays.com
```

### **Payment Details (to Guest - sent from dashboard)**
```
🎉 Booking Confirmed — Lekki Stays

Hi John Doe! Your booking has been confirmed.

📋 Booking Details:
Booking ID: #LUX123456ABC
Apartment: Haven Lekki - Studio
Check-in: May 15, 2026 (2:00 PM)
Check-out: May 18, 2026 (11:00 AM)
Guests: 2

💰 Payment Required: ₦145,000
Please make a bank transfer to:

Bank: GTBank
Account Number: 9039269846
Account Name: Lekki Stays Ltd
Amount: ₦145,000
Reference: LEKKI-#LUX123456ABC

📸 After payment, send your receipt screenshot to this WhatsApp number.

⏰ Payment must be received within 24 hours.

We look forward to hosting you! 🏠
Lekki Stays Team
```

---

## 🔒 **Security Features**

### **1. Authentication**
- Bcrypt password hashing (10 rounds)
- JWT tokens with 24-hour expiry
- Secure HTTP-only cookies
- CSRF protection

### **2. Authorization**
- Role-based access control (admin only)
- API endpoints require valid JWT
- Session validation on every request

### **3. Rate Limiting**
- Login: 5 attempts per 15 minutes
- API calls: 100 requests per 15 minutes
- Account lockout after 5 failed logins (30 minutes)

### **4. Input Validation**
- Email format validation
- Password strength requirements (min 8 chars, uppercase, lowercase, number)
- SQL injection prevention
- XSS protection

### **5. Audit Logging**
- Log all admin actions
- Track booking status changes
- Record login attempts
- Monitor suspicious activity

---

## 🗄️ **Database Schema Updates**

### **New Collection: admin_users**
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  passwordHash: String (required),
  name: String (required),
  role: String (default: "admin"),
  isEmailVerified: Boolean (default: false),
  emailVerificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  lastLogin: Date,
  loginAttempts: Number (default: 0),
  lockUntil: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### **New Collection: admin_audit_log**
```javascript
{
  _id: ObjectId,
  adminId: ObjectId (ref: admin_users),
  action: String (e.g., "CONFIRM_BOOKING", "DECLINE_BOOKING"),
  bookingId: String,
  details: Object,
  ipAddress: String,
  userAgent: String,
  timestamp: Date
}
```

### **Updated: bookings collection**
```javascript
{
  // ... existing fields ...
  confirmedBy: ObjectId (ref: admin_users),
  confirmedAt: Date,
  paymentConfirmedBy: ObjectId (ref: admin_users),
  paymentConfirmedAt: Date,
  statusHistory: [
    {
      status: String,
      changedBy: ObjectId (ref: admin_users),
      changedAt: Date,
      note: String
    }
  ]
}
```

---

## 🚀 **Implementation Plan**

### **Phase 1: Setup & Authentication (Week 1)**
1. Create new GitHub repository: `lekki-stays-admin`
2. Set up project structure
3. Implement authentication system:
   - Login page
   - JWT token generation
   - Session management
   - Password hashing
4. Create admin user in MongoDB
5. Deploy to Vercel

### **Phase 2: Dashboard Core (Week 2)**
6. Build dashboard layout
7. Implement booking list view
8. Add filtering and search
9. Create booking details page
10. Connect to MongoDB (read-only)

### **Phase 3: Booking Management (Week 3)**
11. Implement confirm booking
12. Implement decline booking
13. Add WhatsApp payment details sender
14. Implement status updates (paid, checked-in, checked-out)
15. Add cancellation with refund logic

### **Phase 4: Security & Polish (Week 4)**
16. Add rate limiting
17. Implement audit logging
18. Add email verification
19. Create password reset flow
20. Security testing
21. UI/UX improvements

---

## 📝 **API Endpoints (Admin Dashboard)**

### **Authentication**
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/verify-email
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

### **Bookings**
```
GET    /api/bookings/list?status=pending&page=1&limit=20
GET    /api/bookings/:id
PUT    /api/bookings/:id/confirm
PUT    /api/bookings/:id/decline
PUT    /api/bookings/:id/cancel
PUT    /api/bookings/:id/status
POST   /api/bookings/:id/send-payment
```

### **Dashboard**
```
GET    /api/dashboard/stats
GET    /api/dashboard/recent-bookings
```

---

## 🎨 **Design System**

### **Colors**
```css
--primary: #C9A96E;      /* Gold */
--secondary: #0a0a0a;    /* Dark */
--success: #4CAF50;      /* Green */
--warning: #FF9800;      /* Orange */
--danger: #E53935;       /* Red */
--info: #2196F3;         /* Blue */
--background: #0a0a0a;
--surface: #111;
--text: #F5F0E8;
```

### **Status Colors**
```css
--status-pending: #FF9800;    /* Orange */
--status-confirmed: #4CAF50;  /* Green */
--status-paid: #2196F3;       /* Blue */
--status-checked-in: #9C27B0; /* Purple */
--status-completed: #607D8B;  /* Gray */
--status-declined: #E53935;   /* Red */
--status-cancelled: #757575;  /* Dark Gray */
```

---

## 🔐 **Environment Variables (.env)**

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://lekkistays:password@cluster0.mongodb.net/lekki-stays

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this

# Session Secret
SESSION_SECRET=your-super-secret-session-key-change-this

# Admin Email (for notifications)
ADMIN_EMAIL=admin@lekkistays.com

# WhatsApp Configuration
HOST_WHATSAPP_NUMBER=+2349039269846

# Bank Details
BANK_NAME=GTBank
BANK_ACCOUNT_NUMBER=9039269846
BANK_ACCOUNT_NAME=Lekki Stays Ltd

# Email Service (for verification emails)
EMAIL_SERVICE=sendgrid
EMAIL_API_KEY=your-sendgrid-api-key
EMAIL_FROM=noreply@lekkistays.com

# Environment
NODE_ENV=production
PORT=3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## ✅ **Benefits of This Approach**

### **Security**
✅ No public links to admin functions
✅ Separate domain/deployment
✅ Authentication required
✅ Rate limiting and account lockout
✅ Audit logging

### **Usability**
✅ Centralized dashboard for all bookings
✅ Easy filtering and search
✅ Quick actions (confirm, decline, etc.)
✅ Mobile-responsive design
✅ Real-time updates

### **Scalability**
✅ Can add multiple admin users
✅ Role-based permissions (future)
✅ Audit trail for compliance
✅ Easy to add new features

### **Maintenance**
✅ Separate codebase (easier to update)
✅ Independent deployment
✅ No impact on main website
✅ Better version control

---

## 🎯 **Next Steps**

1. **Review this specification** - Make sure it meets your needs
2. **Create GitHub repository** - `lekki-stays-admin`
3. **Start with Phase 1** - Authentication system
4. **Deploy to Vercel** - Separate deployment
5. **Test thoroughly** - Security is critical

---

**Would you like me to start building this admin dashboard system?**
