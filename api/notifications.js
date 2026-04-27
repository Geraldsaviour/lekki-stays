// Simple notification system for booking updates
// Integrates with WhatsApp, Email, and SMS

class NotificationManager {
    constructor() {
        this.whatsappNumber = '+2349039269846';
        this.adminEmail = 'bookings@luxstay.ng';
    }

    // Send booking confirmation
    async sendBookingConfirmation(booking) {
        const messages = this.generateBookingMessages(booking);
        
        // Send to customer via WhatsApp
        this.sendWhatsAppMessage(booking.phone, messages.customer);
        
        // Send to admin
        this.sendAdminNotification(booking, messages.admin);
        
        return {
            success: true,
            message: 'Notifications sent successfully'
        };
    }

    // Generate message templates
    generateBookingMessages(booking) {
        const checkinDate = new Date(booking.checkin).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const checkoutDate = new Date(booking.checkout).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const customerMessage = `🏨 *LuxStay Booking Confirmation*

Hello ${booking.fullName}! 

Your reservation has been confirmed:

📍 *Property:* ${booking.propertyName}
📅 *Check-in:* ${checkinDate}
📅 *Check-out:* ${checkoutDate}
👥 *Guests:* ${booking.guests}
🆔 *Booking ID:* ${booking.id}
💰 *Total:* ₦${booking.total.toLocaleString('en-NG')}

*Next Steps:*
1. We'll send check-in details 24 hours before arrival
2. Payment instructions will follow shortly
3. Contact us for any special requests

Thank you for choosing LuxStay! 🌟

*Need help?* Reply to this message or call us.`;

        const adminMessage = `🔔 *New Booking Alert*

*Booking ID:* ${booking.id}
*Property:* ${booking.propertyName}
*Guest:* ${booking.fullName}
*Phone:* ${booking.phone}
*Email:* ${booking.email}
*Check-in:* ${checkinDate}
*Check-out:* ${checkoutDate}
*Guests:* ${booking.guests}
*Total:* ₦${booking.total.toLocaleString('en-NG')}
*Payment Method:* ${booking.paymentMethod}

*Special Requests:*
${booking.specialRequests || 'None'}

*How they heard about us:*
${booking.hearAbout}

*Status:* Pending Confirmation`;

        return {
            customer: customerMessage,
            admin: adminMessage
        };
    }

    // Send WhatsApp message (opens WhatsApp with pre-filled message)
    sendWhatsAppMessage(phoneNumber, message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
        
        // In a real backend, you'd use WhatsApp Business API
        // For now, we'll return the URL for manual sending
        return {
            success: true,
            whatsappUrl: whatsappUrl,
            message: 'WhatsApp URL generated'
        };
    }

    // Send admin notification
    sendAdminNotification(booking, message) {
        // In a real app, this would send email/SMS to admin
        console.log('Admin Notification:', message);
        
        // For demo, we'll also create a WhatsApp message for admin
        const encodedMessage = encodeURIComponent(message);
        const adminWhatsAppUrl = `https://wa.me/${this.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
        
        return {
            success: true,
            adminWhatsAppUrl: adminWhatsAppUrl
        };
    }

    // Send booking status update
    sendStatusUpdate(booking, newStatus) {
        let statusMessage = '';
        
        switch (newStatus) {
            case 'confirmed':
                statusMessage = `✅ *Booking Confirmed*

Hello ${booking.fullName}!

Great news! Your booking ${booking.id} has been confirmed.

We'll send check-in details 24 hours before your arrival.

Looking forward to hosting you! 🏨`;
                break;
                
            case 'cancelled':
                statusMessage = `❌ *Booking Cancelled*

Hello ${booking.fullName},

Your booking ${booking.id} has been cancelled as requested.

If you have any questions, please don't hesitate to contact us.

We hope to serve you in the future! 🙏`;
                break;
                
            case 'checked-in':
                statusMessage = `🎉 *Welcome to LuxStay!*

Hello ${booking.fullName}!

Welcome to ${booking.propertyName}! We hope you have a wonderful stay.

*Need assistance?*
- Housekeeping: Reply "CLEAN"
- Maintenance: Reply "HELP"
- Concierge: Reply "SERVICE"

Enjoy your stay! ⭐`;
                break;
        }

        return this.sendWhatsAppMessage(booking.phone, statusMessage);
    }

    // Send reminder messages
    sendCheckInReminder(booking) {
        const checkinDate = new Date(booking.checkin).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });

        const reminderMessage = `⏰ *Check-in Reminder*

Hello ${booking.fullName}!

This is a friendly reminder about your upcoming stay:

📍 *Property:* ${booking.propertyName}
📅 *Check-in:* Tomorrow (${checkinDate})
🕐 *Time:* 2:00 PM onwards
🆔 *Booking ID:* ${booking.id}

*Check-in Instructions:*
1. Call us when you arrive: ${this.whatsappNumber}
2. Have your booking ID ready
3. Valid ID required for all guests

*Property Address:*
[Address will be shared via private message]

Safe travels! 🚗`;

        return this.sendWhatsAppMessage(booking.phone, reminderMessage);
    }

    // Generate email templates (for future email integration)
    generateEmailTemplate(booking, type = 'confirmation') {
        const templates = {
            confirmation: {
                subject: `Booking Confirmation - ${booking.id}`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #D4AF37;">LuxStay Booking Confirmation</h2>
                    <p>Dear ${booking.fullName},</p>
                    <p>Thank you for choosing LuxStay! Your booking has been confirmed.</p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>Booking Details</h3>
                        <p><strong>Booking ID:</strong> ${booking.id}</p>
                        <p><strong>Property:</strong> ${booking.propertyName}</p>
                        <p><strong>Check-in:</strong> ${new Date(booking.checkin).toLocaleDateString()}</p>
                        <p><strong>Check-out:</strong> ${new Date(booking.checkout).toLocaleDateString()}</p>
                        <p><strong>Guests:</strong> ${booking.guests}</p>
                        <p><strong>Total:</strong> ₦${booking.total.toLocaleString('en-NG')}</p>
                    </div>
                    
                    <p>We'll send check-in details 24 hours before your arrival.</p>
                    <p>For any questions, contact us at ${this.whatsappNumber}</p>
                    
                    <p>Best regards,<br>The LuxStay Team</p>
                </div>
                `
            }
        };

        return templates[type] || templates.confirmation;
    }
}

// Export for use in different environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationManager;
} else if (typeof window !== 'undefined') {
    window.NotificationManager = NotificationManager;
}