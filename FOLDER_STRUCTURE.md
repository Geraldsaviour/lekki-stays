# Project Folder Structure

## Overview
The project has been reorganized into logical folders for better maintainability.

## New Structure

```
lekki-stays/
├── public/                      # Frontend files
│   ├── index.html              # Landing page
│   ├── script.js               # Landing page JS
│   ├── styles.css              # Global styles
│   │
│   ├── listings/               # Property listing pages
│   │   ├── listing-1.html
│   │   ├── listing-2.html
│   │   ├── listing-3.html
│   │   ├── listing-4.html
│   │   ├── listing-5.html
│   │   ├── listing-6.html
│   │   ├── listing-7.html
│   │   ├── listing-8.html
│   │   ├── listing-detail.css
│   │   └── listing-detail.js
│   │
│   ├── booking/                # Booking flow
│   │   ├── booking.html
│   │   ├── booking.css
│   │   └── booking.js
│   │
│   ├── search/                 # Search functionality
│   │   ├── search-results.html
│   │   ├── search-results.css
│   │   └── search-results.js
│   │
│   └── shared/                 # Shared utilities
│       └── api-client.js       # API communication
│
├── admin/                       # Admin dashboard
│   ├── src/
│   │   ├── login.html
│   │   ├── dashboard.html
│   │   ├── css/
│   │   │   ├── auth.css
│   │   │   └── dashboard.css
│   │   └── js/
│   │       ├── auth.js
│   │       └── dashboard.js
│   ├── api/
│   │   ├── auth/
│   │   └── bookings/
│   ├── server.js
│   └── package.json
│
├── server/                      # Backend API
│   ├── server.js               # Main server
│   ├── routes/                 # API routes
│   ├── models/                 # Data models
│   ├── middleware/             # Express middleware
│   ├── utils/                  # Utilities
│   └── package.json
│
├── api/                         # API handlers
│   ├── analytics.js
│   ├── bookings.js
│   └── notifications.js
│
├── data/                        # Database & seed data
│   ├── lekki-stays.db
│   ├── apartments.json
│   ├── bookings.json
│   └── seed.js
│
├── docs/                        # Documentation
│   ├── DEPLOYMENT.md
│   ├── QUICK_START.md
│   └── [other docs]
│
└── [config files]
    ├── .env
    ├── package.json
    ├── vercel.json
    └── README.md
```

## Key Changes

### Before
- All HTML, CSS, and JS files were in the root directory
- Difficult to find related files
- No clear separation of concerns

### After
- **public/** - All frontend files organized by feature
- **public/listings/** - All listing-related files together
- **public/booking/** - Booking flow files together
- **public/search/** - Search functionality together
- **public/shared/** - Shared utilities (api-client.js)
- **admin/** - Already well-organized
- **server/** - Backend code separate from frontend

## Benefits

1. **Better Organization** - Related files are grouped together
2. **Easier Navigation** - Clear folder structure
3. **Maintainability** - Easy to find and update files
4. **Scalability** - Easy to add new features
5. **Separation of Concerns** - Frontend, backend, and admin are clearly separated

## File Paths

### Landing Page
- HTML: `public/index.html`
- JS: `public/script.js`
- CSS: `public/styles.css`

### Listings
- HTML: `public/listings/listing-[1-8].html`
- CSS: `public/listings/listing-detail.css`
- JS: `public/listings/listing-detail.js`

### Booking
- HTML: `public/booking/booking.html`
- CSS: `public/booking/booking.css`
- JS: `public/booking/booking.js`

### Search
- HTML: `public/search/search-results.html`
- CSS: `public/search/search-results.css`
- JS: `public/search/search-results.js`

### Shared
- API Client: `public/shared/api-client.js`

## Next Steps

1. Update server routes to serve files from new locations
2. Update HTML file references to use correct relative paths
3. Copy files to server directory (for Vercel deployment)
4. Test all pages locally
5. Update deployment configuration

## Notes

- The admin dashboard was already well-organized and remains unchanged
- Server directory structure remains the same
- Documentation files remain in the docs folder
- Database files remain in the data folder
