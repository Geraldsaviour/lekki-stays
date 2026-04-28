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

**Website:** [Your Vercel URL will go here]  
**Admin WhatsApp:** +2349039269846

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js (Optional - can use Firebase only)
- **Database:** Firebase Firestore (NoSQL Cloud Database)
- **Authentication:** Firebase Authentication
- **Hosting:** Firebase Hosting
- **Notifications:** WhatsApp Business API
- **Security:** Firebase Security Rules, Rate limiting, XSS protection

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

## 🔧 Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (free tier)

### Quick Setup (20 minutes)

**See:** `FIREBASE_QUICK_START.md` for step-by-step guide

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/lekki-stays.git
   cd lekki-stays
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Create Firebase project at https://console.firebase.google.com/
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Copy your Firebase config
   - Update `firebase-config.js` with your config

4. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init
   ```

5. **Start local server:**
   ```bash
   firebase serve
   ```

6. **Visit:** http://localhost:5000

**Full Guide:** See `docs/FIREBASE_SETUP_GUIDE.md`

## 🌐 Deployment to Firebase

### One-Command Deploy

```bash
firebase deploy
```

Your site will be live at: `https://your-project.web.app`

### First-Time Deployment

1. **Complete Firebase setup** (see FIREBASE_QUICK_START.md)

2. **Initialize Firebase:**
   ```bash
   firebase init
   ```
   - Select: Firestore, Hosting
   - Public directory: `.` (current directory)
   - Single-page app: No

3. **Deploy:**
   ```bash
   firebase deploy
   ```

4. **Done!** Your site is live with:
   - ✅ Database (Firestore)
   - ✅ Hosting (Global CDN)
   - ✅ SSL Certificate (Automatic)
   - ✅ Custom domain support

### Alternative: Vercel (if using Node.js backend)

See `docs/DEPLOYMENT_GUIDE.md` for Vercel deployment instructions.

## ⚙️ Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (Vercel handles this) | `3000` |
| `HOST_WHATSAPP_NUMBER` | Your WhatsApp number | `+2349039269846` |
| `BASE_URL` | Your domain URL | `https://lekkistays.vercel.app` |
| `BANK_NAME` | Your bank name | `Guaranty Trust Bank` |
| `BANK_ACCOUNT_NUMBER` | Your account number | `0123456789` |
| `BANK_ACCOUNT_NAME` | Your account name | `Lekki Stays Ltd` |
| `ADMIN_KEY` | Secret key for admin access | `your-secret-key-here` |

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

✅ CONFIRM: https://yourapp.vercel.app/api/bookings/.../confirm?token=...&admin=...
❌ DECLINE: https://yourapp.vercel.app/api/bookings/.../decline?token=...&admin=...
⚠️ CANCEL: https://yourapp.vercel.app/api/bookings/.../cancel?token=...&admin=...
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

## 🧪 Testing

### Test Booking Flow:
1. Visit your deployed site
2. Select an apartment and dates
3. Fill out the booking form
4. Check WhatsApp for notification
5. Test CONFIRM/DECLINE links

### Test Security:
1. Copy a CONFIRM link from WhatsApp
2. Remove the `&admin=...` parameter
3. Visit the modified link
4. Should see "Access Denied" page

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

## 🎨 Customization

### Adding New Apartments:
Edit `data/apartments.json` or use the admin interface (if implemented).

### Styling:
- Main styles: `styles.css`
- Booking page: `booking.css`
- Listing details: `listing-detail.css`

### WhatsApp Messages:
Customize message templates in `server/utils/whatsapp.js`.

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
- Contact: [your-email@example.com]
- WhatsApp: +2349039269846

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the Nigerian shortlet market
- Optimized for Lagos, Abuja, and other major cities
- WhatsApp integration for seamless communication
- Designed with African user experience in mind

---

**Made with ❤️ for the Nigerian hospitality industry**