// Simple booking management API
// This can be deployed to Vercel, Netlify Functions, or any serverless platform

class BookingManager {
    constructor() {
        // In a real app, this would connect to a database
        // For now, we'll use localStorage for demo purposes
        this.bookings = this.loadBookings();
    }

    loadBookings() {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('luxstay_bookings');
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    }

    saveBookings() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('luxstay_bookings', JSON.stringify(this.bookings));
        }
    }

    // Generate unique booking reference
    generateBookingRef() {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `LUX${timestamp}${random}`;
    }

    // Create new booking
    createBooking(bookingData) {
        const booking = {
            id: this.generateBookingRef(),
            ...bookingData,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.bookings.push(booking);
        this.saveBookings();

        return {
            success: true,
            booking: booking,
            message: 'Booking created successfully'
        };
    }

    // Get booking by ID
    getBooking(bookingId) {
        const booking = this.bookings.find(b => b.id === bookingId);
        return booking ? { success: true, booking } : { success: false, message: 'Booking not found' };
    }

    // Update booking status
    updateBookingStatus(bookingId, status) {
        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        
        if (bookingIndex === -1) {
            return { success: false, message: 'Booking not found' };
        }

        this.bookings[bookingIndex].status = status;
        this.bookings[bookingIndex].updatedAt = new Date().toISOString();
        this.saveBookings();

        return {
            success: true,
            booking: this.bookings[bookingIndex],
            message: 'Booking status updated'
        };
    }

    // Check availability for dates
    checkAvailability(propertyId, checkinDate, checkoutDate) {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);

        // Check for overlapping bookings
        const conflicts = this.bookings.filter(booking => {
            if (booking.propertyId !== propertyId || booking.status === 'cancelled') {
                return false;
            }

            const bookingCheckin = new Date(booking.checkin);
            const bookingCheckout = new Date(booking.checkout);

            // Check for date overlap
            return (checkin < bookingCheckout && checkout > bookingCheckin);
        });

        return {
            available: conflicts.length === 0,
            conflicts: conflicts.length,
            message: conflicts.length > 0 ? 'Property not available for selected dates' : 'Property available'
        };
    }

    // Get all bookings (for admin)
    getAllBookings() {
        return {
            success: true,
            bookings: this.bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        };
    }

    // Calculate pricing
    calculatePricing(propertyId, checkinDate, checkoutDate) {
        // This would typically fetch property pricing from database
        const properties = {
            1: { pricePerNight: 45000, name: "Haven Lekki - Studio" },
            2: { pricePerNight: 75000, name: "The Metropolis Lekki - Studio" },
            3: { pricePerNight: 120000, name: "Victoria Island Penthouse" },
            4: { pricePerNight: 85000, name: "Ikoyi Executive Suite" },
            5: { pricePerNight: 35000, name: "Surulere Modern Apartment" },
            6: { pricePerNight: 55000, name: "Abuja City Center Loft" },
            7: { pricePerNight: 65000, name: "Yaba Creative Space" },
            8: { pricePerNight: 150000, name: "Ajah Beachfront Villa" }
        };

        const property = properties[propertyId];
        if (!property) {
            return { success: false, message: 'Property not found' };
        }

        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);
        const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));

        const subtotal = property.pricePerNight * nights;
        const cautionFee = 10000;
        const total = subtotal + cautionFee;

        return {
            success: true,
            pricing: {
                propertyName: property.name,
                pricePerNight: property.pricePerNight,
                nights: nights,
                subtotal: subtotal,
                cautionFee: cautionFee,
                total: total
            }
        };
    }
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BookingManager;
} else if (typeof window !== 'undefined') {
    window.BookingManager = BookingManager;
}