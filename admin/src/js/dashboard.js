// Global state
let currentPage = 1;
let currentStatus = 'all';
let currentSearch = '';
let currentBookingId = null;

// Check authentication
checkAuth();

async function checkAuth() {
    try {
        const response = await fetch('/api/auth/me', {
            credentials: 'include'
        });

        if (!response.ok) {
            window.location.href = '/';
            return;
        }

        const data = await response.json();
        if (data.success && data.admin) {
            document.getElementById('adminName').textContent = data.admin.name;
            loadDashboard();
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Auth check error:', error);
        window.location.href = '/';
    }
}

// Load dashboard data
async function loadDashboard() {
    await loadStats();
    await loadBookings();
}

// Load statistics
async function loadStats() {
    try {
        const response = await fetch('/api/bookings/stats', {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                document.getElementById('statPending').textContent = data.stats.pending || 0;
                document.getElementById('statConfirmed').textContent = data.stats.confirmed || 0;
                document.getElementById('statPaid').textContent = data.stats.paid || 0;
                document.getElementById('statCompleted').textContent = data.stats.completed || 0;
            }
        }
    } catch (error) {
        console.error('Load stats error:', error);
    }
}

// Load bookings
async function loadBookings() {
    const bookingsList = document.getElementById('bookingsList');
    bookingsList.innerHTML = `
        <div class="loading-state">
            <div class="spinner-large"></div>
            <p>Loading bookings...</p>
        </div>
    `;

    try {
        const params = new URLSearchParams({
            status: currentStatus,
            search: currentSearch,
            page: currentPage,
            limit: 20
        });

        const response = await fetch(`/api/bookings/list?${params}`, {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                displayBookings(data.bookings);
                updatePagination(data.pagination);
            }
        } else {
            bookingsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⚠️</div>
                    <p>Failed to load bookings</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Load bookings error:', error);
        bookingsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <p>Network error. Please try again.</p>
            </div>
        `;
    }
}

// Display bookings
function displayBookings(bookings) {
    const bookingsList = document.getElementById('bookingsList');

    if (bookings.length === 0) {
        bookingsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p>No bookings found</p>
            </div>
        `;
        return;
    }

    bookingsList.innerHTML = bookings.map(booking => createBookingCard(booking)).join('');
    
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Create booking card HTML
function createBookingCard(booking) {
    const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric' 
    });
    const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric' 
    });
    const createdDate = new Date(booking.createdAt).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    const statusClass = `status-${booking.status}`;
    const statusText = booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('-', ' ');

    // Determine which actions to show based on status
    let actions = '';
    if (booking.status === 'pending') {
        actions = `
            <button class="btn-action btn-confirm" onclick="showConfirmModal('${booking.id}')">
                <i data-lucide="check"></i> Confirm
            </button>
            <button class="btn-action btn-decline" onclick="showDeclineModal('${booking.id}')">
                <i data-lucide="x"></i> Decline
            </button>
        `;
    } else if (booking.status === 'confirmed') {
        actions = `
            <button class="btn-action btn-payment" onclick="sendPaymentDetails('${booking.id}')">
                <i data-lucide="message-circle"></i> Send Payment
            </button>
            <button class="btn-action btn-confirm" onclick="markAsPaid('${booking.id}')">
                <i data-lucide="dollar-sign"></i> Mark as Paid
            </button>
        `;
    } else if (booking.status === 'paid') {
        actions = `
            <button class="btn-action btn-confirm" onclick="updateStatus('${booking.id}', 'checked-in')">
                <i data-lucide="log-in"></i> Check In
            </button>
        `;
    } else if (booking.status === 'checked-in') {
        actions = `
            <button class="btn-action btn-confirm" onclick="updateStatus('${booking.id}', 'checked-out')">
                <i data-lucide="log-out"></i> Check Out
            </button>
        `;
    }

    return `
        <div class="booking-card">
            <div class="booking-header">
                <div>
                    <div class="booking-id">#${booking.id}</div>
                    <div class="booking-date">Created: ${createdDate}</div>
                </div>
                <span class="booking-status ${statusClass}">${statusText}</span>
            </div>
            <div class="booking-details">
                <div class="detail-item">
                    <div class="detail-label">Guest</div>
                    <div class="detail-value">${booking.guestName}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Phone</div>
                    <div class="detail-value">${booking.guestPhone}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Check-in</div>
                    <div class="detail-value">${checkInDate}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Check-out</div>
                    <div class="detail-value">${checkOutDate}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Guests</div>
                    <div class="detail-value">${booking.numGuests}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Total</div>
                    <div class="detail-value">₦${booking.totalPrice.toLocaleString('en-NG')}</div>
                </div>
            </div>
            <div class="booking-actions">
                ${actions}
            </div>
        </div>
    `;
}

// Update pagination
function updatePagination(pagination) {
    const paginationDiv = document.getElementById('pagination');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    if (pagination.pages > 1) {
        paginationDiv.style.display = 'flex';
        pageInfo.textContent = `Page ${pagination.page} of ${pagination.pages}`;
        
        prevBtn.disabled = pagination.page === 1;
        nextBtn.disabled = pagination.page === pagination.pages;
    } else {
        paginationDiv.style.display = 'none';
    }
}

// Show confirm modal
function showConfirmModal(bookingId) {
    currentBookingId = bookingId;
    const modal = document.getElementById('confirmModal');
    modal.classList.add('show');
    
    // Load booking details for summary
    loadBookingSummary(bookingId, 'confirmSummary');
}

// Show decline modal
function showDeclineModal(bookingId) {
    currentBookingId = bookingId;
    const modal = document.getElementById('declineModal');
    modal.classList.add('show');
    
    // Load booking details for summary
    loadBookingSummary(bookingId, 'declineSummary');
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    currentBookingId = null;
}

// Load booking summary
async function loadBookingSummary(bookingId, elementId) {
    try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                const booking = data.booking;
                const apartment = data.apartment;
                
                const summary = `
                    <div class="summary-row">
                        <span class="summary-label">Booking ID:</span>
                        <span class="summary-value">#${booking.id}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Guest:</span>
                        <span class="summary-value">${booking.guestName}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Apartment:</span>
                        <span class="summary-value">${apartment ? apartment.name : 'Property ' + booking.apartmentId}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Dates:</span>
                        <span class="summary-value">${new Date(booking.checkIn).toLocaleDateString()} - ${new Date(booking.checkOut).toLocaleDateString()}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Total:</span>
                        <span class="summary-value">₦${booking.totalPrice.toLocaleString('en-NG')}</span>
                    </div>
                `;
                
                document.getElementById(elementId).innerHTML = summary;
            }
        }
    } catch (error) {
        console.error('Load booking summary error:', error);
    }
}

// Confirm booking
document.getElementById('confirmBookingBtn').addEventListener('click', async () => {
    if (!currentBookingId) return;

    const btn = document.getElementById('confirmBookingBtn');
    const sendPayment = document.getElementById('sendPaymentCheck').checked;
    
    btn.disabled = true;
    btn.textContent = 'Confirming...';

    try {
        const response = await fetch(`/api/bookings/${currentBookingId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                status: 'confirmed',
                note: 'Confirmed by admin'
            })
        });

        if (response.ok) {
            // If send payment is checked, open WhatsApp
            if (sendPayment) {
                await sendPaymentDetails(currentBookingId);
            }
            
            closeModal('confirmModal');
            await loadDashboard();
            alert('Booking confirmed successfully!');
        } else {
            alert('Failed to confirm booking. Please try again.');
        }
    } catch (error) {
        console.error('Confirm booking error:', error);
        alert('Network error. Please try again.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Confirm & Send Payment';
    }
});

// Decline booking
document.getElementById('declineBookingBtn').addEventListener('click', async () => {
    if (!currentBookingId) return;

    const btn = document.getElementById('declineBookingBtn');
    const note = document.getElementById('declineNote').value;
    
    btn.disabled = true;
    btn.textContent = 'Declining...';

    try {
        const response = await fetch(`/api/bookings/${currentBookingId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                status: 'declined',
                note: note || 'Declined by admin'
            })
        });

        if (response.ok) {
            closeModal('declineModal');
            await loadDashboard();
            alert('Booking declined successfully!');
        } else {
            alert('Failed to decline booking. Please try again.');
        }
    } catch (error) {
        console.error('Decline booking error:', error);
        alert('Network error. Please try again.');
    } finally {
        btn.disabled = false;
        btn.textContent = 'Decline Booking';
    }
});

// Send payment details
async function sendPaymentDetails(bookingId) {
    try {
        const response = await fetch(`/api/bookings/${bookingId}/send-payment`, {
            method: 'POST',
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success && data.whatsappUrl) {
                window.open(data.whatsappUrl, '_blank');
            }
        }
    } catch (error) {
        console.error('Send payment error:', error);
    }
}

// Mark as paid
async function markAsPaid(bookingId) {
    if (!confirm('Mark this booking as paid?')) return;

    try {
        const response = await fetch(`/api/bookings/${bookingId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                status: 'paid',
                note: 'Payment confirmed by admin'
            })
        });

        if (response.ok) {
            await loadDashboard();
            alert('Booking marked as paid!');
        } else {
            alert('Failed to update booking. Please try again.');
        }
    } catch (error) {
        console.error('Mark as paid error:', error);
        alert('Network error. Please try again.');
    }
}

// Update status
async function updateStatus(bookingId, newStatus) {
    const statusNames = {
        'checked-in': 'Check In',
        'checked-out': 'Check Out',
        'completed': 'Complete'
    };

    if (!confirm(`${statusNames[newStatus]} this booking?`)) return;

    try {
        const response = await fetch(`/api/bookings/${bookingId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ 
                status: newStatus,
                note: `${statusNames[newStatus]} by admin`
            })
        });

        if (response.ok) {
            await loadDashboard();
            alert(`Booking ${statusNames[newStatus].toLowerCase()}ed successfully!`);
        } else {
            alert('Failed to update booking. Please try again.');
        }
    } catch (error) {
        console.error('Update status error:', error);
        alert('Network error. Please try again.');
    }
}

// Event listeners
document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        });
        window.location.href = '/';
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/';
    }
});

document.getElementById('refreshBtn').addEventListener('click', () => {
    loadDashboard();
});

document.getElementById('statusFilter').addEventListener('change', (e) => {
    currentStatus = e.target.value;
    currentPage = 1;
    loadBookings();
});

document.getElementById('searchBtn').addEventListener('click', () => {
    currentSearch = document.getElementById('searchInput').value.trim();
    currentPage = 1;
    loadBookings();
});

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        currentSearch = e.target.value.trim();
        currentPage = 1;
        loadBookings();
    }
});

document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadBookings();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    loadBookings();
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
    }
});
