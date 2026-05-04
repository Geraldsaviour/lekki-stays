# Admin Dashboard - Decline & Cancel Guide

## 🎉 What's New

The admin dashboard now has a **beautiful custom modal** for declining and cancelling bookings instead of the ugly browser prompt!

## ✨ Features

### Professional UI
- Large, comfortable textarea for typing reasons
- Clean, modern design matching the dashboard theme
- Smooth animations and transitions
- Mobile-responsive

### Keyboard Shortcuts
- **Ctrl+Enter** (or Cmd+Enter on Mac) - Submit quickly
- **Escape** - Cancel and close modal

### User-Friendly
- Reason is **optional** - you can submit without typing anything
- Clear labels and descriptions
- Cancel and Submit buttons clearly visible
- Click outside modal to close

## 🚀 How to Use

### Declining a Booking

1. **Find the booking** you want to decline in the Bookings section
2. **Click the "Decline" button** (red button with X icon)
3. **A modal appears** with:
   - Title: "Decline Booking"
   - Description showing the guest's name
   - Large textarea for your reason
4. **Type your reason** (optional) - for example:
   - "Property not available for those dates"
   - "Maintenance scheduled"
   - "Guest requirements don't match property"
   - Or leave it empty
5. **Submit** by:
   - Clicking the "Submit" button
   - Pressing Ctrl+Enter (Cmd+Enter on Mac)
6. **Done!** The booking is declined and the guest can be notified

### Cancelling a Booking

Same process as declining:

1. **Find the booking** (must be confirmed or paid status)
2. **Click the "Cancel" button**
3. **Modal appears** asking for cancellation reason
4. **Type reason** (optional) - for example:
   - "Guest requested cancellation"
   - "Emergency maintenance required"
   - "Property damage from previous guest"
5. **Submit** using button or Ctrl+Enter
6. **Done!** Booking is cancelled

### Confirming a Booking

Confirming is simpler (no reason needed):

1. **Click "Confirm" button** on a pending booking
2. **Browser asks** "Confirm booking for [Guest Name]?"
3. **Click OK**
4. **Done!** You can now send payment details

## 📱 Mobile Experience

The modal works great on mobile:
- Touch-friendly buttons (44px minimum)
- Textarea expands for comfortable typing
- Modal fits screen perfectly
- Smooth animations

## 🔧 Technical Details

### Database Columns
Reasons are saved to:
- `decline_reason` - When declining a booking
- `cancellation_reason` - When cancelling a booking

### Optional Reasons
You can submit without typing anything. The reason field is optional and will be saved as an empty string if left blank.

### Error Handling
If something goes wrong:
- You'll see an error message
- The modal will close
- You can try again
- Check your internet connection

## 🎨 Design

The modal uses:
- **Dark theme** matching the dashboard
- **Gold accent** color for primary actions
- **Smooth transitions** for professional feel
- **Clear typography** for easy reading
- **Proper spacing** for comfortable interaction

## 💡 Tips

1. **Be specific** - Good reasons help track patterns
2. **Be professional** - Reasons may be shared with guests
3. **Use shortcuts** - Ctrl+Enter is faster than clicking
4. **Mobile-friendly** - Works great on phones and tablets
5. **Optional** - Don't feel pressured to write a novel

## 📝 Example Reasons

### Good Decline Reasons
- "Property booked by another guest"
- "Maintenance scheduled for those dates"
- "Guest count exceeds property capacity"
- "Dates not available in our system"

### Good Cancel Reasons
- "Guest requested cancellation"
- "Emergency property maintenance"
- "Property damage requires repairs"
- "Guest violated booking terms"

### Not Necessary
- You don't need to write a reason every time
- Empty submissions are perfectly fine
- The system works with or without reasons

## 🐛 Troubleshooting

### Modal doesn't appear
- Refresh the page
- Check browser console for errors
- Make sure JavaScript is enabled

### Can't submit
- Check internet connection
- Make sure you're logged in
- Try refreshing the page

### Error message appears
- Make sure database migration was run
- Check Supabase connection
- Contact support if issue persists

## ✅ Before You Start

**IMPORTANT:** Make sure the database migration has been run!

Run this in Supabase SQL Editor:
```sql
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS decline_reason TEXT,
ADD COLUMN IF NOT EXISTS cancellation_reason TEXT;
```

Without this, you'll get errors when trying to decline or cancel bookings.

## 🎯 Summary

- ✅ Beautiful custom modal instead of browser prompt
- ✅ Large textarea for comfortable typing
- ✅ Keyboard shortcuts for power users
- ✅ Mobile-responsive design
- ✅ Optional reasons (can submit empty)
- ✅ Professional UI matching dashboard
- ✅ Smooth animations and transitions
- ✅ Clear labels and descriptions

Enjoy the improved admin experience! 🎉
