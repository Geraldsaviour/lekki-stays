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

## 🔧 Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/lekki-stays.git
   cd lekki-stays
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the example file
   cp server/.env.example server/.env
   
   # Edit server/.env with your details:
   # - Update BASE_URL to http://localhost:3000
   # - Add your WhatsApp number
   # - Add your bank details
   # - Create a strong ADMIN_KEY
   ```

4. **Start the development server:**
   ```bash
   cd server
   npm run dev
   ```

5. **Visit:** http://localhost:3000

## 🌐 Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/lekki-stays)

### Manual Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Configure Environment Variables in Vercel:**
   ```
   NODE_ENV=production
   HOST_WHATSAPP_NUMBER=+2349039269846
   BASE_URL=https://your-app-name.vercel.app
   BANK_NAME=Your Bank Name
   BANK_ACCOUNT_NUMBER=Your Account Number
   BANK_ACCOUNT_NAME=Your Account Name
   ADMIN_KEY=your-super-secret-admin-key
   ```

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