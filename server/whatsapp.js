// WhatsApp Integration Module for Lekki Stays
// Handles deep link generation and message formatting for Nigerian market

/**
 * Generate WhatsApp deep link with formatted message
 * @param {string} phoneNumber - Nigerian phone number (+234 format)
 * @param {string} message - Message content to send
 * @returns {string} WhatsApp deep link URL
 */
function generateWhatsAppLink(phoneNumber, message) {
  try {
    // Validate and format phone number
    const formattedPhone = formatNigerianPhone(phoneNumber);
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Generate WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    return whatsappUrl;
  } catch (error) {
    console.error('Error generating WhatsApp link:', error);
    throw new Error('Failed to generate WhatsApp link');
  }
}

/**
 * Format Nigerian phone number for WhatsApp
 * @param {string} phone - Phone number in various formats
 * @returns {string} Formatted phone number (234XXXXXXXXXX)
 */
function formatNigerianPhone(phone) {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Handle different Nigerian phone formats
  if (cleaned.startsWith('234')) {
    // Already in international format
    return cleaned;
  } else if (cleaned.startsWith('0')) {
    // Local format (0XXXXXXXXXX) -> convert to international
    return '234' + cleaned.substring(1);
  } else if (cleaned.length === 10) {
    // 10-digit format (XXXXXXXXXX) -> add country code
    return '234' + cleaned;
  } else {
    throw new Error('Invalid Nigerian phone number format');
  }
}

/**
 * Message templates for different notification types
 */
const messageTemplates = {
  bookingConfirmation: (bookingData) => `
🏠 *Lekki Stays Booking Confirmation*

Dear ${bookingData.fullName},

Thank you for your booking! Here are your details:

📋 *Booking Reference:* ${bookingData.id}
🏡 *Property:* ${bookingData.propertyName}
📅 *Check-in:* ${formatDate(bookingData.checkin)}
📅 *Check-out:* ${formatDate(bookingData.checkout)}
👥 *Guests:* ${bookingData.guests}
💰 *Total Amount:* ₦${bookingData.total.toLocaleString()}

Your booking is currently *PENDING* host confirmation. You will receive another message once the host responds.

For any questions, reply to this message.

Best regards,
Lekki Stays Team
  `.trim(),

  hostAlert: (bookingData) => `
🔔 *New Booking Alert - Lekki Stays*

You have a new booking request:

📋 *Booking ID:* ${bookingData.id}
🏡 *Property:* ${bookingData.propertyName}
👤 *Guest:* ${bookingData.fullName}
📧 *Email:* ${bookingData.email}
📱 *Phone:* ${bookingData.phone}
📅 *Dates:* ${formatDate(bookingData.checkin)} to ${formatDate(bookingData.checkout)}
👥 *Guests:* ${bookingData.guests}
💰 *Amount:* ₦${bookingData.total.toLocaleString()}

*Special Requests:* ${bookingData.specialRequests || 'None'}

Please respond within 2 hours:
✅ Confirm: [CONFIRM_LINK]
❌ Decline: [DECLINE_LINK]

Lekki Stays Management
  `.trim(),

  statusUpdate: (bookingData, status) => {
    const statusMessages = {
      confirmed: `
🎉 *Booking Confirmed - Lekki Stays*

Great news! Your booking has been confirmed:

📋 *Booking Reference:* ${bookingData.id}
🏡 *Property:* ${bookingData.propertyName}
📅 *Check-in:* ${formatDate(bookingData.checkin)} (2:00 PM)
📅 *Check-out:* ${formatDate(bookingData.checkout)} (11:00 AM)

💳 *Payment Instructions:*
Bank: ${process.env.BANK_NAME}
Account: ${process.env.ACCOUNT_NAME}
Number: ${process.env.ACCOUNT_NUMBER}
Reference: ${bookingData.id}
Amount: ₦${bookingData.total.toLocaleString()}

Please complete payment within 24 hours to secure your reservation.

Welcome to Lekki Stays! 🏠
      `.trim(),
      
      cancelled: `
❌ *Booking Cancelled - Lekki Stays*

Your booking has been cancelled:

📋 *Booking Reference:* ${bookingData.id}
🏡 *Property:* ${bookingData.propertyName}

If you have any questions, please contact us.

Lekki Stays Team
      `.trim()
    };
    
    return statusMessages[status] || `Booking status updated to: ${status}`;
  }
};

/**
 * Format date for display in messages
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Send booking confirmation to guest
 * @param {Object} bookingData - Booking information
 * @returns {string} WhatsApp URL for guest notification
 */
function sendGuestConfirmation(bookingData) {
  const message = messageTemplates.bookingConfirmation(bookingData);
  return generateWhatsAppLink(bookingData.phone, message);
}

/**
 * Send booking alert to host
 * @param {Object} bookingData - Booking information
 * @returns {string} WhatsApp URL for host notification
 */
function sendHostAlert(bookingData) {
  const message = messageTemplates.hostAlert(bookingData);
  const hostPhone = process.env.WHATSAPP_NUMBER;
  return generateWhatsAppLink(hostPhone, message);
}

/**
 * Send status update notification
 * @param {Object} bookingData - Booking information
 * @param {string} status - New booking status
 * @returns {string} WhatsApp URL for status notification
 */
function sendStatusUpdate(bookingData, status) {
  const message = messageTemplates.statusUpdate(bookingData, status);
  return generateWhatsAppLink(bookingData.phone, message);
}

module.exports = {
  generateWhatsAppLink,
  formatNigerianPhone,
  sendGuestConfirmation,
  sendHostAlert,
  sendStatusUpdate,
  messageTemplates
};