# 🚀 Quick Reference Guide - Custom Modal System

## 📦 Installation

### Option 1: Include in HTML
```html
<script src="/js/modal-utils.js"></script>
```

### Option 2: Import in JavaScript (if using modules)
```javascript
import ModalUtils from './modal-utils.js';
```

---

## 🎯 Basic Usage

### Show Alert
```javascript
await ModalUtils.showAlert(message, title, type);
```

**Example:**
```javascript
await ModalUtils.showAlert(
  'Your changes have been saved!',
  'Success',
  'success'
);
```

**Types:** `'success'`, `'error'`, `'warning'`, `'info'`

---

### Show Confirm
```javascript
const confirmed = await ModalUtils.showConfirm(message, title, confirmText, type);
```

**Example:**
```javascript
const confirmed = await ModalUtils.showConfirm(
  'Are you sure you want to delete this?',
  'Confirm Delete',
  'Delete',
  'danger'
);

if (confirmed) {
  // User clicked Delete
} else {
  // User clicked Cancel
}
```

**Types:** `'primary'`, `'danger'`, `'warning'`, `'success'`

---

### Show Prompt
```javascript
const value = await ModalUtils.showPrompt(message, title, placeholder);
```

**Example:**
```javascript
const name = await ModalUtils.showPrompt(
  'What is your name?',
  'User Input',
  'Enter your name...'
);

if (name) {
  console.log('User entered:', name);
} else {
  console.log('User cancelled');
}
```

---

### Show Toast
```javascript
ModalUtils.showToast(message, type, duration);
```

**Example:**
```javascript
ModalUtils.showToast('Changes saved!', 'success', 5000);
```

**Types:** `'success'`, `'error'`, `'warning'`, `'info'`  
**Duration:** Milliseconds (default: 5000)

---

## 🎨 Modal Types & Colors

| Type | Color | Use Case |
|------|-------|----------|
| `primary` | Gold (#D4AF37) | General confirmations |
| `danger` | Red (#EF4444) | Destructive actions |
| `success` | Green (#10B981) | Success messages |
| `warning` | Orange (#F59E0B) | Warnings |
| `info` | Blue (#3B82F6) | Information |
| `error` | Red (#EF4444) | Error messages |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` | Confirm / Submit |
| `Escape` | Cancel / Close |
| `Tab` | Navigate between buttons |
| Click outside | Dismiss modal |

---

## 📱 Responsive Breakpoints

| Screen Size | Layout |
|-------------|--------|
| Desktop (> 768px) | Side-by-side buttons, max-width 500px |
| Mobile (< 768px) | Stacked buttons, width 90% |

---

## 🔄 Migration Examples

### Replace alert()
```javascript
// ❌ Old way
alert('Hello!');

// ✅ New way
await ModalUtils.showAlert('Hello!', 'Greeting', 'info');
```

### Replace confirm()
```javascript
// ❌ Old way
if (confirm('Are you sure?')) {
  deleteItem();
}

// ✅ New way
if (await ModalUtils.showConfirm('Are you sure?')) {
  deleteItem();
}
```

### Replace prompt()
```javascript
// ❌ Old way
const name = prompt('Enter your name:');

// ✅ New way
const name = await ModalUtils.showPrompt('Enter your name:');
```

---

## 💡 Common Patterns

### Delete Confirmation
```javascript
const confirmed = await ModalUtils.showConfirm(
  'This action cannot be undone. Are you sure?',
  'Confirm Delete',
  'Delete',
  'danger'
);

if (confirmed) {
  await deleteItem();
  ModalUtils.showToast('Item deleted successfully', 'success');
}
```

### Form Validation Error
```javascript
if (!isValid) {
  await ModalUtils.showAlert(
    'Please fill in all required fields correctly.',
    'Validation Error',
    'error'
  );
  return;
}
```

### Success Notification
```javascript
try {
  await saveChanges();
  ModalUtils.showToast('Changes saved successfully!', 'success');
} catch (error) {
  await ModalUtils.showAlert(
    'Failed to save changes. Please try again.',
    'Error',
    'error'
  );
}
```

### Get User Input
```javascript
const reason = await ModalUtils.showPrompt(
  'Please provide a reason:',
  'Reason Required',
  'Enter reason...'
);

if (reason) {
  await submitReason(reason);
} else {
  ModalUtils.showToast('Action cancelled', 'info');
}
```

---

## 🎯 Best Practices

### Do's ✅
- Use appropriate modal types for context
- Provide clear, concise messages
- Use descriptive button text
- Show toast for non-critical feedback
- Handle both confirm and cancel cases

### Don'ts ❌
- Don't use modals for every notification
- Don't make messages too long
- Don't nest modals
- Don't use vague button text
- Don't block critical actions unnecessarily

---

## 🐛 Troubleshooting

### Modal doesn't appear
```javascript
// Make sure you're using await
await ModalUtils.showAlert('Message'); // ✅ Correct
ModalUtils.showAlert('Message');       // ❌ Wrong
```

### Multiple modals at once
```javascript
// Wait for first modal to close
await ModalUtils.showAlert('First');
await ModalUtils.showAlert('Second'); // ✅ Correct

// Don't open simultaneously
ModalUtils.showAlert('First');
ModalUtils.showAlert('Second');       // ❌ Wrong
```

### Toast not showing
```javascript
// Toast doesn't need await
ModalUtils.showToast('Message', 'success'); // ✅ Correct
await ModalUtils.showToast('Message');      // ❌ Unnecessary
```

---

## 📊 Cheat Sheet

```javascript
// ALERTS
await ModalUtils.showAlert('Success!', 'Done', 'success');
await ModalUtils.showAlert('Error!', 'Oops', 'error');
await ModalUtils.showAlert('Warning!', 'Caution', 'warning');
await ModalUtils.showAlert('Info', 'Notice', 'info');

// CONFIRMS
const ok = await ModalUtils.showConfirm('Sure?', 'Confirm', 'Yes', 'primary');
const del = await ModalUtils.showConfirm('Delete?', 'Confirm', 'Delete', 'danger');
const warn = await ModalUtils.showConfirm('Continue?', 'Warning', 'Continue', 'warning');

// PROMPTS
const name = await ModalUtils.showPrompt('Name?', 'Input', 'John Doe');
const email = await ModalUtils.showPrompt('Email?', 'Input', 'user@example.com');
const reason = await ModalUtils.showPrompt('Why?', 'Reason', 'Enter reason...');

// TOASTS
ModalUtils.showToast('Saved!', 'success');
ModalUtils.showToast('Error!', 'error');
ModalUtils.showToast('Warning!', 'warning');
ModalUtils.showToast('Info', 'info');
```

---

## 🔗 Related Files

- **Implementation**: `deploy-user/public/js/modal-utils.js`
- **Demo**: `modal-demo.html`
- **Documentation**: `MODAL_SYSTEM_COMPLETE.md`
- **Visual Guide**: `VISUAL_COMPARISON.md`

---

## 📞 Need Help?

1. Check the demo: `modal-demo.html`
2. Read the full docs: `MODAL_SYSTEM_COMPLETE.md`
3. Review code examples above
4. Check browser console for errors

---

**Version**: 1.0.0  
**Last Updated**: May 7, 2026  
**Status**: Production-Ready ✅
