# 🏠 Lekki Stays - Premium Shortlet Booking Platform

A modern, secure booking platform for luxury shortlet accommodations in Lagos, Nigeria, with WhatsApp integration for seamless host-guest communication.

## ✨ Features

- 🏡 **Beautiful Property Listings** - Showcase luxury apartments with high-quality images
- 📱 **WhatsApp Integration** - Automated notifications and booking management
- 🔐 **Secure Admin Panel** - Two-factor authentication for booking management
- 💳 **Payment Instructions** - Automated bank transfer details
- 📊 **Real-time Availability** - Prevent double bookings
- 🎨 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Optimized for speed and reliability

## 🚀 Live Demo

**Website:** https://lekki-stays.vercel.app  
**Admin WhatsApp:** +2349039269846

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** SQLite with better-sqlite3
- **Deployment:** Vercel
- **Notifications:** WhatsApp Business API
- **Security:** Rate limiting, XSS protection, Admin authentication

## 📱 How It Works

### For Guests:
1. Browse available apartments
2. Select dates and number of guests
3. Fill booking form and submit
4. Receive confirmation via WhatsApp
5. Get payment instructions after host approval

### For Hosts:
1. Receive booking notifications on WhatsApp
2. Click CONFIRM/DECLINE links to manage bookings
3. Send payment details to approved guests
4. Track booking status and payments

## 🌐 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Geraldsaviour/lekki-stays)

### Environment Variables for Vercel:

```
NODE_ENV=production
HOST_WHATSAPP_NUMBER=+2349039269846
BASE_URL=https://lekki-stays.vercel.app
BANK_NAME=GTBank
BANK_ACCOUNT_NUMBER=9039269846
BANK_ACCOUNT_NAME=Lekki Stays Ltd
ADMIN_KEY=your-super-secret-admin-key
```

## 🔧 Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Geraldsaviour/lekki-stays.git
   cd lekki-stays
   ```

2. **Install dependencies:**
   ```bash
   npm install
   cd server
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your details
   ```

4. **Start the development server:**
   ```bash
   cd server
   npm run dev
   ```

5. **Visit:** http://localhost:3000

## 🔐 Security Features

- **Two-Factor Authentication:** Admin actions require both booking token and admin key
- **Rate Limiting:** Prevents spam and abuse
- **XSS Protection:** Sanitizes all user inputs
- **CORS Configuration:** Secure cross-origin requests
- **Environment Variables:** Sensitive data never exposed in code

## 📱 WhatsApp Integration

### Booking Flow:
1. Guest submits booking → Host receives WhatsApp notification
2. Host clicks CONFIRM → Guest receives payment instructions
3. Host clicks DECLINE → Guest receives decline notification
4. Host clicks CANCEL → Booking cancelled, dates released

### Message Format:
```
🏠 NEW BOOKING — Lekki Stays

Apartment: Haven Lekki - Studio
Guest: John Doe
Phone: +2348012345678
Email: john@example.com
Check-in: 2026-05-01
Check-out: 2026-05-05
Guests: 2
Total: ₦190,000
Booking ID: #BK-20260427-ABC123

✅ CONFIRM: https://lekki-stays.vercel.app/api/bookings/.../confirm?token=...&admin=...
❌ DECLINE: https://lekki-stays.vercel.app/api/bookings/.../decline?token=...&admin=...
⚠️ CANCEL: https://lekki-stays.vercel.app/api/bookings/.../cancel?token=...&admin=...
```

## 🏗️ Project Structure

```
lekki-stays/
├── server/                 # Backend API
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── middleware/        # Express middleware
│   ├── server.js          # Main server file
│   └── package.json       # Server dependencies
├── data/                  # Database files
├── *.html                 # Frontend pages
├── *.css                  # Stylesheets
├── *.js                   # Frontend JavaScript
├── vercel.json           # Vercel configuration
└── package.json          # Root dependencies
```

## 📊 API Endpoints

### Public Endpoints:
- `GET /` - Homepage
- `GET /api/health` - Health check
- `POST /api/bookings` - Create booking
- `GET /api/apartments` - List apartments

### Admin Endpoints (require admin key):
- `GET /api/bookings/:id/confirm` - Confirm booking
- `GET /api/bookings/:id/decline` - Decline booking
- `GET /api/bookings/:id/cancel` - Cancel booking

### Guest Endpoints:
- `GET /api/bookings/:id/guest-cancel` - Guest self-cancel

## 🐛 Troubleshooting

### Common Issues:

**Links show "undefined":**
- Check `BASE_URL` in environment variables
- Ensure it matches your Vercel domain

**WhatsApp not working:**
- Verify `HOST_WHATSAPP_NUMBER` format (+234...)
- Test WhatsApp number can receive messages

**Access Denied on admin links:**
- Check `ADMIN_KEY` matches in environment and URL
- Ensure no extra spaces in environment variables

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- WhatsApp: +2349039269846

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ for the Nigerian hospitality industry**