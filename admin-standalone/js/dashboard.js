// Dashboard Logic - Connects directly to Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, getDocs, query, orderBy, where, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import firebaseConfig from '../firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check authentication
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'index.html';
  } else {
    // Update user info
    document.getElementById('userName').textContent = user.displayName || 'Admin';
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('settingsEmail').textContent = user.email;
    document.getElementById('settingsUserId').textContent = user.uid;

    // Load dashboard data
    loadDashboardData();
  }
});

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Logout error:', error);
    alert('Failed to logout. Please try again.');
  }
});

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = item.dataset.section;

    // Update active nav item
    navItems.forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');

    // Show corresponding section
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(`${sectionId}-section`).classList.add('active');

    // Update page title
    const title = item.querySelector('.nav-text').textContent;
    document.getElementById('pageTitle').textContent = title;
  });
});

// Refresh button
document.getElementById('refreshBtn').addEventListener('click', () => {
  loadDashboardData();
});

// Load Dashboard Data
async function loadDashboardData() {
  try {
    // Load bookings
    const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
    const bookings = [];
    bookingsSnapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    // Load apartments
    const apartmentsSnapshot = await getDocs(collection(db, 'apartments'));
    const apartments = [];
    apartmentsSnapshot.forEach(doc => {
      apartments.push({ id: doc.id, ...doc.data() });
    });

    // Update stats
    updateStats(bookings, apartments);

    // Display recent bookings
    displayRecentBookings(bookings.slice(0, 5));

    // Display all bookings
    displayAllBookings(bookings);

    // Display apartments
    displayApartments(apartments);

  } catch (error) {
    console.error('Error loading dashboard data:', error);
    alert('Failed to load dashboard data. Please refresh the page.');
  }
}

// Update Stats
function updateStats(bookings, apartments) {
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'paid').length;
  const totalApartments = apartments.length;

  document.getElementById('totalBookings').textContent = totalBookings;
  document.getElementById('pendingBookings').textContent = pendingBookings;
  document.getElementById('confirmedBookings').textContent = confirmedBookings;
  document.getElementById('totalApartments').textContent = totalApartments;
}

// Display Recent Bookings
function displayRecentBookings(bookings) {
  const container = document.getElementById('recentBookingsList');

  if (bookings.length === 0) {
    container.innerHTML = '<p class="loading">No bookings yet</p>';
    return;
  }

  container.innerHTML = bookings.map(booking => `
    <div class="booking-card">
      <div class="booking-header">
        <div class="booking-guest">${booking.guestName}</div>
        <span class="booking-status status-${booking.status}">${booking.status}</span>
      </div>
      <div class="booking-details">
        <div class="booking-detail">
          <span>Check-in</span>
          <strong>${formatDate(booking.checkIn)}</strong>
        </div>
        <div class="booking-detail">
          <span>Check-out</span>
          <strong>${formatDate(booking.checkOut)}</strong>
        </div>
        <div class="booking-detail">
          <span>Guests</span>
          <strong>${booking.guests}</strong>
        </div>
        <div class="booking-detail">
          <span>Total</span>
          <strong>₦${booking.totalPrice?.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  `).join('');
}

// Display All Bookings
function displayAllBookings(bookings) {
  const container = document.getElementById('allBookingsList');

  if (bookings.length === 0) {
    container.innerHTML = '<p class="loading">No bookings yet</p>';
    return;
  }

  container.innerHTML = `
    <div class="bookings-list">
      ${bookings.map(booking => `
        <div class="booking-card">
          <div class="booking-header">
            <div>
              <div class="booking-guest">${booking.guestName}</div>
              <div style="font-size: 14px; color: var(--gray-600); margin-top: 4px;">
                ${booking.guestEmail} • ${booking.guestPhone}
              </div>
            </div>
            <span class="booking-status status-${booking.status}">${booking.status}</span>
          </div>
          <div class="booking-details">
            <div class="booking-detail">
              <span>Booking Ref</span>
              <strong>${booking.bookingReference || booking.id}</strong>
            </div>
            <div class="booking-detail">
              <span>Check-in</span>
              <strong>${formatDate(booking.checkIn)}</strong>
            </div>
            <div class="booking-detail">
              <span>Check-out</span>
              <strong>${formatDate(booking.checkOut)}</strong>
            </div>
            <div class="booking-detail">
              <span>Guests</span>
              <strong>${booking.guests}</strong>
            </div>
            <div class="booking-detail">
              <span>Total Price</span>
              <strong>₦${booking.totalPrice?.toLocaleString()}</strong>
            </div>
            <div class="booking-detail">
              <span>Payment Method</span>
              <strong>${booking.paymentMethod || 'Bank Transfer'}</strong>
            </div>
          </div>
          ${booking.specialRequests ? `
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--gray-200);">
              <strong style="font-size: 14px; color: var(--gray-700);">Special Requests:</strong>
              <p style="font-size: 14px; color: var(--gray-600); margin-top: 4px;">${booking.specialRequests}</p>
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// Display Apartments
function displayApartments(apartments) {
  const container = document.getElementById('apartmentsList');

  if (apartments.length === 0) {
    container.innerHTML = '<p class="loading">No apartments yet</p>';
    return;
  }

  container.innerHTML = apartments.map(apartment => `
    <div class="apartment-card">
      <img 
        src="${apartment.images?.[0] || 'https://via.placeholder.com/400x300'}" 
        alt="${apartment.name}"
        class="apartment-image"
      >
      <div class="apartment-content">
        <h3 class="apartment-name">${apartment.name}</h3>
        <div class="apartment-price">₦${apartment.price?.toLocaleString()}/night</div>
        <div class="apartment-details">
          <span>🛏️ ${apartment.bedrooms} bed</span>
          <span>🚿 ${apartment.bathrooms} bath</span>
          <span>👥 ${apartment.maxGuests} guests</span>
        </div>
        <div class="apartment-location">📍 ${apartment.location}</div>
      </div>
    </div>
  `).join('');
}

// Status Filter
document.getElementById('statusFilter')?.addEventListener('change', async (e) => {
  const status = e.target.value;
  
  try {
    let bookingsQuery;
    if (status === 'all') {
      bookingsQuery = collection(db, 'bookings');
    } else {
      bookingsQuery = query(collection(db, 'bookings'), where('status', '==', status));
    }

    const snapshot = await getDocs(bookingsQuery);
    const bookings = [];
    snapshot.forEach(doc => {
      bookings.push({ id: doc.id, ...doc.data() });
    });

    displayAllBookings(bookings);
  } catch (error) {
    console.error('Error filtering bookings:', error);
  }
});

// Helper Functions
function formatDate(timestamp) {
  if (!timestamp) return 'N/A';
  
  let date;
  if (timestamp.toDate) {
    date = timestamp.toDate();
  } else if (typeof timestamp === 'string') {
    date = new Date(timestamp);
  } else {
    date = new Date(timestamp);
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
