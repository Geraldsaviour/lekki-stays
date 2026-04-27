// Simple analytics system to track bookings and user behavior
// Helps understand business performance and user preferences

class AnalyticsManager {
    constructor() {
        this.events = this.loadEvents();
        this.bookingStats = this.loadBookingStats();
    }

    loadEvents() {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('luxstay_analytics');
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    }

    loadBookingStats() {
        if (typeof localStorage !== 'undefined') {
            const stored = localStorage.getItem('luxstay_booking_stats');
            return stored ? JSON.parse(stored) : {
                totalBookings: 0,
                totalRevenue: 0,
                averageBookingValue: 0,
                popularProperties: {},
                bookingsByMonth: {},
                guestSources: {}
            };
        }
        return {
            totalBookings: 0,
            totalRevenue: 0,
            averageBookingValue: 0,
            popularProperties: {},
            bookingsByMonth: {},
            guestSources: {}
        };
    }

    saveEvents() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('luxstay_analytics', JSON.stringify(this.events));
        }
    }

    saveBookingStats() {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('luxstay_booking_stats', JSON.stringify(this.bookingStats));
        }
    }

    // Track user events
    trackEvent(eventType, data = {}) {
        const event = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            type: eventType,
            timestamp: new Date().toISOString(),
            data: data,
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
            url: typeof window !== 'undefined' ? window.location.href : 'Unknown'
        };

        this.events.push(event);
        this.saveEvents();

        return event;
    }

    // Track booking completion
    trackBooking(booking) {
        // Update booking statistics
        this.bookingStats.totalBookings += 1;
        this.bookingStats.totalRevenue += booking.total;
        this.bookingStats.averageBookingValue = this.bookingStats.totalRevenue / this.bookingStats.totalBookings;

        // Track popular properties
        const propertyId = booking.propertyId.toString();
        this.bookingStats.popularProperties[propertyId] = (this.bookingStats.popularProperties[propertyId] || 0) + 1;

        // Track bookings by month
        const monthKey = new Date(booking.createdAt).toISOString().substr(0, 7); // YYYY-MM
        this.bookingStats.bookingsByMonth[monthKey] = (this.bookingStats.bookingsByMonth[monthKey] || 0) + 1;

        // Track guest sources
        const source = booking.hearAbout || 'Unknown';
        this.bookingStats.guestSources[source] = (this.bookingStats.guestSources[source] || 0) + 1;

        this.saveBookingStats();

        // Also track as an event
        this.trackEvent('booking_completed', {
            bookingId: booking.id,
            propertyId: booking.propertyId,
            total: booking.total,
            guests: booking.guests,
            nights: booking.nights,
            source: booking.hearAbout
        });

        return this.bookingStats;
    }

    // Get analytics dashboard data
    getDashboardData() {
        const recentEvents = this.events
            .filter(event => {
                const eventDate = new Date(event.timestamp);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return eventDate >= thirtyDaysAgo;
            })
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Calculate conversion rate
        const searchEvents = recentEvents.filter(e => e.type === 'property_search').length;
        const bookingEvents = recentEvents.filter(e => e.type === 'booking_completed').length;
        const conversionRate = searchEvents > 0 ? (bookingEvents / searchEvents * 100).toFixed(2) : 0;

        // Get top properties
        const topProperties = Object.entries(this.bookingStats.popularProperties)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([propertyId, bookings]) => ({
                propertyId: parseInt(propertyId),
                bookings: bookings
            }));

        // Get monthly trends
        const monthlyTrends = Object.entries(this.bookingStats.bookingsByMonth)
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(-12) // Last 12 months
            .map(([month, bookings]) => ({
                month: month,
                bookings: bookings,
                revenue: bookings * this.bookingStats.averageBookingValue // Estimated
            }));

        return {
            summary: {
                totalBookings: this.bookingStats.totalBookings,
                totalRevenue: this.bookingStats.totalRevenue,
                averageBookingValue: Math.round(this.bookingStats.averageBookingValue),
                conversionRate: conversionRate + '%'
            },
            topProperties: topProperties,
            monthlyTrends: monthlyTrends,
            guestSources: this.bookingStats.guestSources,
            recentActivity: recentEvents.slice(0, 20)
        };
    }

    // Track specific user interactions
    trackPropertyView(propertyId, propertyName) {
        return this.trackEvent('property_view', {
            propertyId: propertyId,
            propertyName: propertyName
        });
    }

    trackPropertySearch(searchData) {
        return this.trackEvent('property_search', {
            location: searchData.location,
            checkin: searchData.checkin,
            checkout: searchData.checkout,
            guests: searchData.guests
        });
    }

    trackBookingStart(propertyId) {
        return this.trackEvent('booking_start', {
            propertyId: propertyId
        });
    }

    trackBookingAbandoned(propertyId, step) {
        return this.trackEvent('booking_abandoned', {
            propertyId: propertyId,
            abandonedAt: step
        });
    }

    trackServiceRequest(serviceType) {
        return this.trackEvent('service_request', {
            serviceType: serviceType
        });
    }

    trackContactForm(contactData) {
        return this.trackEvent('contact_form', {
            name: contactData.name,
            email: contactData.email,
            source: 'contact_form'
        });
    }

    // Generate reports
    generateMonthlyReport(year, month) {
        const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
        const monthEvents = this.events.filter(event => 
            event.timestamp.startsWith(monthKey)
        );

        const bookingEvents = monthEvents.filter(e => e.type === 'booking_completed');
        const searchEvents = monthEvents.filter(e => e.type === 'property_search');
        const viewEvents = monthEvents.filter(e => e.type === 'property_view');

        const totalRevenue = bookingEvents.reduce((sum, event) => 
            sum + (event.data.total || 0), 0
        );

        return {
            month: monthKey,
            totalBookings: bookingEvents.length,
            totalRevenue: totalRevenue,
            totalSearches: searchEvents.length,
            totalViews: viewEvents.length,
            conversionRate: searchEvents.length > 0 ? 
                (bookingEvents.length / searchEvents.length * 100).toFixed(2) + '%' : '0%',
            averageBookingValue: bookingEvents.length > 0 ? 
                Math.round(totalRevenue / bookingEvents.length) : 0
        };
    }

    // Export data for external analysis
    exportData(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const filteredEvents = this.events.filter(event => {
            const eventDate = new Date(event.timestamp);
            return eventDate >= start && eventDate <= end;
        });

        return {
            events: filteredEvents,
            summary: this.getDashboardData(),
            dateRange: {
                start: startDate,
                end: endDate
            },
            exportedAt: new Date().toISOString()
        };
    }

    // Clear old data (privacy compliance)
    clearOldData(daysToKeep = 365) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

        this.events = this.events.filter(event => 
            new Date(event.timestamp) >= cutoffDate
        );

        this.saveEvents();

        return {
            success: true,
            message: `Cleared events older than ${daysToKeep} days`,
            remainingEvents: this.events.length
        };
    }
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
} else if (typeof window !== 'undefined') {
    window.AnalyticsManager = AnalyticsManager;
}