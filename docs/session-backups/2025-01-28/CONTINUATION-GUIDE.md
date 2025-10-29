# Chat Continuation Guide - January 28, 2025

## 🎯 Quick Context Recovery

If this session disconnects or memory gets wiped, use this guide to quickly resume work.

---

## ✅ What Was Completed This Session

### 1. Group Task Visibility Toggle - Inline Placement ✅
- **Change**: Moved toggle button from header to inline position after regular tasks
- **File**: `js/chore-system.js` lines 1832-1897
- **Result**: Button now renders within task list, group tasks appear below when expanded

### 2. Decay Time Display Accuracy Fix ✅
- **Problem**: 6 weeks showed as "1mo" (50% error)
- **Fix**: Changed threshold from 4 weeks to 8 weeks
- **File**: `js/chore-system.js` line 1587
- **Result**: 6 weeks now correctly displays as "6w"

### 3. Input Integrity System ✅
- **Feature**: Preserve user's chosen time units (no auto-conversion)
- **Implementation**: Added `decayUnit` field to all task objects
- **Files**: `js/chore-system.js` multiple locations
- **Result**: "6 weeks" always displays as "6w", never auto-converts to "1mo"

### 4. Strict Hierarchical Conversion + Dual Live Display ✅
- **Feature**: Show both total decay time and live countdown
- **Functions**: 
  - `formatDecayTimeHierarchical()` - lines 1617-1691
  - `formatLiveCountdown()` - lines 1693-1740
- **UI**: Beautiful dual display with color coding
- **Result**: Users see both what they set and how much time is left

---

## 📊 Current System State

### Task Data Structure
```javascript
task: {
  id: 1234567890,
  name: "Clean Bathroom",
  decayMs: 3628800000,      // Milliseconds (6 weeks)
  decayUnit: 'weeks',       // NEW: User's original unit
  lastCompleted: 1706400000, // Timestamp
  freshness: 85,             // 0-100
  linkedCategoryId: null,    // For group tasks
  linkedTaskId: null,        // For linked tasks
  steps: []                  // Optional subtasks
}
```

### Display System Flow
```
User Input: "6 weeks"
    ↓
Storage: { decayMs: 3628800000, decayUnit: 'weeks' }
    ↓
Display Functions:
    ├─ formatDecayTimeHierarchical() → "6 Weeks"
    └─ formatLiveCountdown() → "5w 2d left"
    ↓
UI Render: Dual display with color coding
```

---

## 🔍 Key Functions to Know

### 1. `formatDecayTimeHierarchical(ms, originalUnit)`
**Purpose**: Convert to human-readable with strict rules  
**Location**: `js/chore-system.js` lines 1617-1691

**Rules**:
- Hours > 24 → "X Days Y Hours"
- Days > 7 → "X Weeks Y Days"
- Weeks → NEVER convert to months (stays as weeks)
- Months → Only if explicitly set

**Example**:
```javascript
formatDecayTimeHierarchical(3628800000, 'weeks')
// Returns: "6 Weeks"
```

### 2. `formatLiveCountdown(task)`
**Purpose**: Calculate and display time remaining  
**Location**: `js/chore-system.js` lines 1693-1740

**Logic**:
```javascript
timeLeft = task.decayMs - (Date.now() - task.lastCompleted)
```

**Example**:
```javascript
formatLiveCountdown(task)
// Returns: "5w 2d left" or "Never started" or "Decayed"
```

### 3. `renderCategory()`
**Purpose**: Render category view with tasks  
**Location**: `js/chore-system.js` lines 1832-1897

**Key Feature**: Inline toggle button rendering
```javascript
// Separates regular tasks from group tasks
// Renders toggle button inline after regular tasks
// Conditionally renders group tasks below button
```

---

## 📁 Critical Files

### JavaScript
- **File**: `js/chore-system.js`
- **Lines Modified**: 1559-1740, 1832-1897, 1949-1968, 3035, 3053, 3110, 3148, 3158, 1313-1333

### CSS
- **File**: `css/main.css`
- **Lines Added**: 669-720 (dual display), 1016-1054 (inline toggle)

### Documentation
- **File**: `docs/how-tos/PROJECT-MASTER-GUIDE.md`
- **Lines Updated**: 2405-2441, 2423-2461

---

## 🚀 How to Continue Work

### If You Need to Debug

1. **Check Task Data Structure**
   ```javascript
   console.log(app.data.categories[0].tasks[0]);
   // Verify decayUnit field exists
   ```

2. **Test Display Functions**
   ```javascript
   const ms = 6 * 7 * 24 * 60 * 60 * 1000; // 6 weeks
   console.log(app.formatDecayTimeHierarchical(ms, 'weeks'));
   // Should output: "6 Weeks"
   ```

3. **Inspect UI Elements**
   ```javascript
   document.querySelectorAll('.task-meta-dual')
   // Should exist for non-snoozed tasks
   ```

### If You Need to Add Features

1. **Real-Time Countdown Updates**
   - Add `setInterval()` to refresh countdown every minute
   - Update only `.meta-countdown` elements (don't re-render whole card)

2. **Urgency Color Coding**
   - Calculate percentage: `(timeLeft / decayMs) * 100`
   - Add conditional CSS classes: `countdown-critical`, `countdown-warning`

3. **Statistics Dashboard**
   - Calculate average time to completion
   - Track decay patterns
   - Generate reports

---

## 🐛 Known Issues & Limitations

### Current Limitations
1. **Countdown doesn't auto-refresh** - Requires page navigation to update
2. **Month approximation** - Uses 30 days (not exact)
3. **No timezone handling** - Uses local device time

### Not Bugs (By Design)
1. **"10 Weeks" instead of "2 Months"** - Intentional (strict rule)
2. **"Never started" for new tasks** - Correct (no lastCompleted)
3. **"Decayed" for expired tasks** - Expected behavior

---

## 💡 Common Questions

### Q: Why do weeks never convert to months?
**A**: User explicitly selected "weeks" - we respect that choice. Auto-conversion was causing confusion (6 weeks ≠ 1 month).

### Q: What happens to old tasks without decayUnit?
**A**: Backward compatibility logic infers the unit based on decayMs divisibility (lines 1313-1333).

### Q: How often does the countdown update?
**A**: Currently only on page load/navigation. Real-time updates would require `setInterval()`.

### Q: Can users switch between units after creation?
**A**: Yes, via edit task modal. The `decayUnit` updates and syncs to linked tasks.

---

## 🎨 UI Design Reference

### Color Scheme
- **Last Done**: Default text color (#333 or var(--text))
- **Total Decay**: Blue (#2563eb) - Represents the goal
- **Time Left**: Green (#059669) - Represents urgency/progress

### Layout Structure
```
┌─────────────────────────────────────┐
│ [✓] Clean Bathroom              🖊️ │
│                                     │
│ ╔═══════════════════════════════╗  │
│ ║ LAST DONE:      2 hours ago    ║  │
│ ║ TOTAL DECAY:    6 Weeks        ║ (Blue)
│ ║ TIME LEFT:      5w 2d left     ║ (Green Badge)
│ ╚═══════════════════════════════╝  │
│                                     │
│ Freshness: [████████░░] 85%        │
│                                     │
│ [Snooze] [Steps]                   │
└─────────────────────────────────────┘
```

### CSS Classes
- `.task-meta-dual` - Container with frosted glass
- `.meta-row` - Flexbox row (label + value)
- `.meta-label` - Uppercase label (left-aligned)
- `.meta-value` - Value text (right-aligned)
- `.meta-decay` - Blue colored total decay
- `.meta-countdown` - Green badge for countdown

---

## 📝 Quick Command Reference

### Create New Task with Proper Unit
```javascript
const newTask = {
    id: Date.now(),
    name: "Example Task",
    decayMs: 6 * 7 * 24 * 60 * 60 * 1000, // 6 weeks in ms
    decayUnit: 'weeks',  // IMPORTANT: Store original unit
    lastCompleted: null,
    freshness: 0
};
```

### Test Hierarchical Conversion
```javascript
// Test cases
app.formatDecayTimeHierarchical(50 * 60 * 60 * 1000, 'hours')
// Expected: "2 Days 2 Hours"

app.formatDecayTimeHierarchical(10 * 24 * 60 * 60 * 1000, 'days')
// Expected: "1 Week 3 Days"

app.formatDecayTimeHierarchical(10 * 7 * 24 * 60 * 60 * 1000, 'weeks')
// Expected: "10 Weeks" (NOT "2 Months")
```

### Test Live Countdown
```javascript
const testTask = {
    decayMs: 7 * 24 * 60 * 60 * 1000, // 7 days
    lastCompleted: Date.now() - (2 * 24 * 60 * 60 * 1000) // 2 days ago
};
app.formatLiveCountdown(testTask)
// Expected: "5d 0h left"
```

---

## 🔄 Session Recovery Steps

If connection is lost or memory wiped:

1. **Read this file first** - Get oriented quickly
2. **Check SESSION-SUMMARY.md** - See what was completed
3. **Review TECHNICAL-IMPLEMENTATION.md** - Deep technical details
4. **Test core functions**:
   ```javascript
   // Verify functions exist
   typeof app.formatDecayTimeHierarchical === 'function'
   typeof app.formatLiveCountdown === 'function'
   ```
5. **Inspect UI** - Look for `.task-meta-dual` elements
6. **Verify data** - Check that tasks have `decayUnit` field

---

## 📞 Next Steps (Potential)

If continuing development, consider:

1. **Auto-refresh countdown** - Real-time updates every minute
2. **Urgency indicators** - Color coding based on time left %
3. **Notification system** - Alert when tasks near decay
4. **Analytics dashboard** - Time tracking statistics
5. **Export functionality** - Generate reports

---

## 🛡️ Emergency Rollback

If something breaks:

1. **Backup Location**: `docs/session-backups/2025-01-28/`
2. **Key Commits**: Check git history for "Dual Display System"
3. **Critical Functions**: `formatDecayTimeHierarchical`, `formatLiveCountdown`
4. **CSS**: Lines 669-720 can be safely removed to revert UI

---

## 📌 Important Reminders

- ✅ **Weeks NEVER convert to months** - This is intentional
- ✅ **decayUnit must be stored** - Required for input integrity
- ✅ **Backward compatibility included** - Old tasks work fine
- ✅ **All tests passing** - System is production-ready
- ✅ **Documentation complete** - PROJECT-MASTER-GUIDE.md updated

---

**Last Session Date**: January 28, 2025  
**Session Status**: ✅ ALL OBJECTIVES COMPLETED  
**System Status**: 🚀 PRODUCTION READY  

**Next Session**: Use this guide to quickly resume work without losing context!
