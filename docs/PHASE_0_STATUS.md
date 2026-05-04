# Phase 0 — Project Cleanup Status

## 0.1 Remove Duplicate and Dead Files ✅ COMPLETE

### Deleted Files:
- backup-app.sh
- backup-db.sh  
- restart-server.ps1
- restart-server.sh
- PHASE_0_COMPLETE.md

### Kept Files:
- README.md
- vercel.json
- package.json
- .gitignore
- All .html/.css/.js files

### Docs Folder:
- Already clean (only 2 files remain)
- docs/ADMIN_DASHBOARD_SPECIFICATION.md
- docs/ADMIN_IMPLEMENTATION_ROADMAP.md

## 0.2 Remove Dead Server Code ⚠️ PENDING

### Current State:
- System is using MongoDB (via db-mongo.js), NOT SQLite or Firebase
- Old WhatsApp token system exists in:
  - server/utils/whatsapp.js
  - server/routes/bookings.js (confirm/decline/cancel routes with ?token=&admin=)
  
### Action Required:
- Will be replaced in Phase 1 with Supabase migration
- Old MongoDB code will be removed
- New WhatsApp system will be implemented

## 0.3 Fix All Broken Navigation Links ⚠️ IN PROGRESS

### Current Navigation Analysis:

#### index.html Navigation:
✅ Nav links properly configured:
- Home → #hero
- Apartments → #apartments  
- Services → #services
- Contact → #contact

✅ Hero buttons:
- "Explore Apartments" → scrolls to #apartments
- "Book Now" → scrolls to #apartments

✅ Navbar "Book Now" button → scrolls to #apartments

⚠️ Service buttons need fixing:
- "Request Chef" → currently generic button, needs href to #contact with subject
- "Book Transfer" → needs href to #contact with subject
- "Schedule Cleaning" → needs href to #contact with subject
- "Order Groceries" → needs href to #contact with subject
- "Book Spa" → needs href to #contact with subject
- "Get Support" → needs href to #contact with subject

⚠️ Service CTA buttons:
- "Contact Concierge" → needs href to #contact
- "View All Services" → needs href to #services

✅ Footer quick links:
- Already properly configured with #anchors

### Listing Pages (listing-1.html through listing-8.html):
⚠️ Need to audit:
- "Book Now" buttons → should go to booking.html?apartmentId=apt-N&name=NAME&price=PRICE
- "Back" buttons → should use document.referrer or ?from= param
- Navigation links → should link back to index.html sections

### booking.html:
⚠️ Need to audit:
- "Back" / "Cancel" buttons → should return to referring listing page
- Navigation links → should link to index.html sections

### search-results.html:
⚠️ Need to audit:
- Result cards → should link to correct listing-N.html
- Navigation links → should link to index.html sections

## 0.4 Fix Search Filter ⚠️ PENDING

### Current State:
- Search form exists on index.html
- BookingCalendar class handles UI interactions
- Search button exists but needs proper navigation

### Action Required:
- Wire search button to navigate to: search-results.html?location=VALUE&checkin=DATE&checkout=DATE&guests=N
- Update search-results.js to read URL params and filter apartments
- Implement location match and guest count filtering
- Availability filtering will come in Phase 2 after Supabase DB is live

---

## Next Steps:

1. Complete 0.3 - Fix all navigation links in all HTML files
2. Complete 0.4 - Wire search functionality
3. Begin Phase 1 - Supabase migration
