# Desktop Calendar Display Fix

## Problem
Calendar date picker was not visible on desktop browsers but worked fine on mobile.

## Root Cause
The calendar dropdown had `position: absolute` with `right: 100%`, which positioned it **off-screen to the left** on desktop screens. On mobile, the media query changed it to `position: fixed` which made it visible.

### Before (Broken):
```css
.calendar-dropdown {
    position: absolute;
    top: 0;
    right: 100%;  /* ❌ Positions off-screen on desktop */
    width: 650px;
}
```

## Solution
Changed calendar dropdown to use `position: fixed` with centered positioning for **all screen sizes**:

### After (Fixed):
```css
.calendar-dropdown {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translateX(10px);
    width: 90%;
    max-width: 650px;
    max-height: 80vh;
    overflow-y: auto;
}

.calendar-dropdown.active {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%);
}
```

## Changes Made

### File: `listing-detail.css`
1. Changed `.calendar-dropdown` from `position: absolute` to `position: fixed`
2. Centered it using `top: 50%; left: 50%; transform: translate(-50%, -50%)`
3. Made width responsive: `width: 90%; max-width: 650px`
4. Added `max-height: 80vh; overflow-y: auto` for scrolling on small screens
5. Removed duplicate mobile media query rules for calendar-dropdown

### File: `server/listing-detail.css`
- Copied updated CSS to server directory for Vercel deployment

## Testing
✅ Calendar now appears centered on screen for all devices
✅ Works on desktop browsers
✅ Works on mobile browsers
✅ Responsive to different screen sizes
✅ Scrollable on small screens

## Deployment
The fix has been deployed to Vercel. Clear your browser cache and refresh to see the changes:
- **Desktop**: `Ctrl + Shift + Delete` → Clear cache → Refresh
- **Mobile**: Hard refresh or clear app cache

## Files Modified
- `listing-detail.css` (root)
- `server/listing-detail.css` (Vercel)
