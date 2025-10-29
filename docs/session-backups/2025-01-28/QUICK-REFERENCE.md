# Quick Reference Card - Dual Display System

## 🎯 One-Minute Context Recovery

**Session Date**: January 28, 2025  
**Status**: ✅ All objectives completed  
**Main Feature**: Dual Display System with Strict Hierarchical Conversion

---

## 📊 What Changed

### Before
```
Task Card:
┌─────────────────────────┐
│ Clean Bathroom          │
│ Last done: 2h ago       │
│ Decays in: 1mo ❌       │ (Wrong! User set 6 weeks)
└─────────────────────────┘
```

### After
```
Task Card:
┌──────────────────────────────┐
│ Clean Bathroom               │
│ ╔══════════════════════════╗ │
│ ║ LAST DONE:   2 hours ago  ║ │
│ ║ TOTAL DECAY: 6 Weeks ✅   ║ │ (Blue - What user set)
│ ║ TIME LEFT:   5w 2d left ✅║ │ (Green - Live countdown)
│ ╚══════════════════════════╝ │
└──────────────────────────────┘
```

---

## 🔑 Critical Functions

### 1. Hierarchical Conversion
```javascript
app.formatDecayTimeHierarchical(ms, originalUnit)
```
**Location**: Line 1617-1691  
**Rules**:
- Hours > 24 → Days + Hours
- Days > 7 → Weeks + Days
- Weeks → **NEVER** months
- Months → Only if explicitly set

### 2. Live Countdown
```javascript
app.formatLiveCountdown(task)
```
**Location**: Line 1693-1740  
**Returns**: Time remaining or "Never started" or "Decayed"

---

## 📁 Files Changed

| File | Lines | Change |
|------|-------|--------|
| `js/chore-system.js` | 1617-1691 | New: formatDecayTimeHierarchical() |
| `js/chore-system.js` | 1693-1740 | New: formatLiveCountdown() |
| `js/chore-system.js` | 1949-1968 | Updated: Dual display HTML |
| `js/chore-system.js` | 1313-1333 | Added: Backward compatibility |
| `css/main.css` | 669-720 | New: Dual display styling |

---

## 🎨 CSS Classes

```css
.task-meta-dual       /* Container with frosted glass */
.meta-row             /* Flexbox row layout */
.meta-label           /* "LAST DONE:" labels */
.meta-value           /* Value text */
.meta-decay           /* Blue total decay */
.meta-countdown       /* Green countdown badge */
```

---

## 🧪 Quick Test

```javascript
// Test hierarchical conversion
app.formatDecayTimeHierarchical(6 * 7 * 24 * 60 * 60 * 1000, 'weeks')
// Should return: "6 Weeks" (NOT "1 Month")

// Test countdown
const task = {
    decayMs: 7 * 24 * 60 * 60 * 1000,
    lastCompleted: Date.now() - (2 * 24 * 60 * 60 * 1000)
};
app.formatLiveCountdown(task)
// Should return: "5d 0h left"
```

---

## 🚨 Strict Rules

1. **Weeks NEVER convert to months** ❌→ 🚫
   - 6 weeks = "6 Weeks" (NOT "1 Month")
   - 10 weeks = "10 Weeks" (NOT "2 Months")
   - 12 weeks = "12 Weeks" (NOT "3 Months")

2. **Input Integrity**
   - User selects unit → System preserves it forever
   - Stored in `task.decayUnit` field

3. **Hierarchical Conversion**
   - Hours > 24 → Auto-convert to Days
   - Days > 7 → Auto-convert to Weeks
   - Weeks → Stay as Weeks (no auto-convert)
   - Months → Only if user selected Months

---

## 💾 Data Structure

```javascript
task: {
  decayMs: 3628800000,    // Milliseconds
  decayUnit: 'weeks',     // NEW: User's original unit ⭐
  lastCompleted: timestamp,
  // ... other fields
}
```

---

## 🔍 Where to Look

- **Full Summary**: `SESSION-SUMMARY.md`
- **Technical Details**: `TECHNICAL-IMPLEMENTATION.md`
- **Continuation Guide**: `CONTINUATION-GUIDE.md`
- **This Card**: `QUICK-REFERENCE.md` 👈 You are here

---

## ✅ System Status

- ✅ Group Task Toggle (Inline) - DONE
- ✅ Decay Display Accuracy - FIXED
- ✅ Input Integrity System - IMPLEMENTED
- ✅ Dual Display System - COMPLETE
- ✅ Backward Compatibility - WORKING
- ✅ Documentation - UPDATED
- ✅ CSS Styling - BEAUTIFUL

**🚀 PRODUCTION READY**

---

## 🆘 Emergency Contacts

- **Backup Folder**: `docs/session-backups/2025-01-28/`
- **Main Guide**: `PROJECT-MASTER-GUIDE.md`
- **Code File**: `js/chore-system.js`
- **Styles File**: `css/main.css`

---

**Remember**: If memory is wiped, read `CONTINUATION-GUIDE.md` first!
