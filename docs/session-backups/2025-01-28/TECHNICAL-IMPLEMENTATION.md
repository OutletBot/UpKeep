# Technical Implementation Guide - Dual Display System

## 🏗️ Architecture Overview

This document provides deep technical details for the Dual Display System implementation.

---

## 1️⃣ Strict Hierarchical Conversion Function

### Function: `formatDecayTimeHierarchical(ms, originalUnit)`

**Location**: `js/chore-system.js` lines 1617-1691

**Purpose**: Converts milliseconds to human-readable format with strict hierarchical rules

### Conversion Rules Table

| Input Unit | Condition | Output Format | Example |
|-----------|-----------|---------------|---------|
| **hours** | < 24 hours | "X Hours" | 18 hours → "18 Hours" |
| **hours** | ≥ 24 hours | "X Days Y Hours" | 50 hours → "2 Days 2 Hours" |
| **days** | < 7 days | "X Days" | 5 days → "5 Days" |
| **days** | ≥ 7 days | "X Weeks Y Days" | 10 days → "1 Week 3 Days" |
| **weeks** | Any amount | "X Weeks Y Days" | 10 weeks → "10 Weeks" |
| **weeks** | Never | ❌ NEVER "X Months" | 12 weeks → "12 Weeks" (NOT "3 Months") |
| **months** | Any amount | "X Months Y Days" | 2 months → "2 Months" |

### Code Walkthrough

```javascript
formatDecayTimeHierarchical(ms, originalUnit) {
    const hour = 60 * 60 * 1000;        // 3,600,000 ms
    const day = 24 * hour;               // 86,400,000 ms
    const week = 7 * day;                // 604,800,000 ms
    const month = 30 * day;              // 2,592,000,000 ms

    // RULE 4: Explicit months - Only if user selected "months"
    if (originalUnit === 'months') {
        const totalMonths = Math.floor(ms / month);
        const remainingDays = Math.floor((ms % month) / day);
        // Returns: "2 Months" or "2 Months 5 Days"
    }

    // RULE 3: Weeks - NEVER auto-convert to months
    if (originalUnit === 'weeks') {
        const totalWeeks = Math.floor(ms / week);
        const remainingDays = Math.floor((ms % week) / day);
        // Returns: "10 Weeks" or "10 Weeks 3 Days"
        // Critical: Even 12+ weeks stays as weeks!
    }

    // RULE 2: Days - Auto-convert to weeks if ≥7 days
    if (originalUnit === 'days') {
        const totalDays = Math.floor(ms / day);
        if (totalDays >= 7) {
            const weeks = Math.floor(totalDays / 7);
            const days = totalDays % 7;
            // 10 days → "1 Week 3 Days"
        }
        // < 7 days → "5 Days"
    }

    // RULE 1: Hours - Auto-convert to days if ≥24 hours
    if (originalUnit === 'hours') {
        const totalHours = Math.floor(ms / hour);
        if (totalHours >= 24) {
            const days = Math.floor(totalHours / 24);
            const hours = totalHours % 24;
            // 50 hours → "2 Days 2 Hours"
        }
        // < 24 hours → "18 Hours"
    }
}
```

### Key Design Decisions

1. **Why Math.floor()?**
   - Prevents fractional units (no "2.5 Weeks")
   - User-friendly whole numbers

2. **Why modulo (%) operator?**
   - Extracts remainder for secondary unit
   - Example: 10 days % 7 = 3 days (remainder)

3. **Why pluralization logic?**
   - "1 Week" vs "2 Weeks" (grammatically correct)
   - Improves professionalism

---

## 2️⃣ Live Countdown Function

### Function: `formatLiveCountdown(task)`

**Location**: `js/chore-system.js` lines 1693-1740

**Purpose**: Calculates and displays time remaining until task decays

### Calculation Logic

```javascript
formatLiveCountdown(task) {
    // Step 1: Check if task has ever been completed
    if (!task.lastCompleted) {
        return 'Never started';
    }

    // Step 2: Calculate elapsed time since completion
    const elapsed = Date.now() - task.lastCompleted;
    
    // Step 3: Calculate time remaining
    const timeLeft = task.decayMs - elapsed;

    // Step 4: Handle expired tasks
    if (timeLeft <= 0) {
        return 'Decayed';
    }

    // Step 5: Format based on scale (weeks → days → hours → minutes)
    // Priority: Largest unit that makes sense
}
```

### Time Scale Priority

```
timeLeft = 1,209,600,000 ms (14 days)
│
├─ ≥ 1 week (604,800,000 ms)
│  └─ Format: "2w 0d left"
│
├─ ≥ 1 day (86,400,000 ms)
│  └─ Format: "3d 5h left"
│
├─ ≥ 1 hour (3,600,000 ms)
│  └─ Format: "4h 30m left"
│
└─ < 1 hour
   └─ Format: "45m left"
```

### Example Scenarios

| Last Completed | Decay Time | Time Left Calculation | Display |
|---------------|------------|----------------------|---------|
| 2 hours ago | 7 days | 7d - 2h = 6d 22h | "6d 22h left" |
| Never | Any | N/A | "Never started" |
| 10 days ago | 7 days | 7d - 10d = -3d | "Decayed" |
| 1 day ago | 2 weeks | 14d - 1d = 13d | "1w 6d left" |

---

## 3️⃣ Task Card HTML Structure

### New Dual Display Layout

**Location**: `js/chore-system.js` lines 1949-1968

```html
<div class="task-info">
    <div class="task-name">Clean Bathroom</div>
    
    <!-- NEW: Dual Display System -->
    <div class="task-meta-dual">
        <div class="meta-row">
            <span class="meta-label">Last Done:</span>
            <span class="meta-value">2 hours ago</span>
        </div>
        <div class="meta-row">
            <span class="meta-label">Total Decay:</span>
            <span class="meta-value meta-decay">2 Weeks 4 Days</span>
        </div>
        <div class="meta-row">
            <span class="meta-label">Time Left:</span>
            <span class="meta-value meta-countdown">5d 10h left</span>
        </div>
    </div>
</div>
```

### Component Breakdown

```
task-meta-dual (Container)
│
├── meta-row (Last Done)
│   ├── meta-label: "LAST DONE:"
│   └── meta-value: "2 hours ago"
│
├── meta-row (Total Decay)
│   ├── meta-label: "TOTAL DECAY:"
│   └── meta-value + meta-decay: "2 Weeks 4 Days" (Blue)
│
└── meta-row (Time Left)
    ├── meta-label: "TIME LEFT:"
    └── meta-value + meta-countdown: "5d 10h left" (Green Badge)
```

---

## 4️⃣ CSS Architecture

### Styling System

**Location**: `css/main.css` lines 669-720

### Container: `.task-meta-dual`

```css
.task-meta-dual {
    margin-top: 8px;              /* Space from task name */
    display: flex;                /* Flexbox for column layout */
    flex-direction: column;       /* Stack rows vertically */
    gap: 6px;                     /* 6px between rows */
    
    /* Frosted Glass Effect */
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(8px);
    
    /* Spacing & Shape */
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
}
```

### Row Layout: `.meta-row`

```css
.meta-row {
    display: flex;                /* Horizontal layout */
    justify-content: space-between; /* Label left, value right */
    align-items: center;          /* Vertical center */
    gap: 12px;                    /* Space between label/value */
}
```

### Label Styling: `.meta-label`

```css
.meta-label {
    font-weight: 600;             /* Semi-bold */
    color: var(--text-secondary); /* Muted color */
    font-size: 11px;              /* Small caps size */
    text-transform: uppercase;    /* "LAST DONE:" */
    letter-spacing: 0.5px;        /* Spacing for readability */
    min-width: 80px;              /* Consistent alignment */
}
```

### Value Styling: `.meta-value`

```css
.meta-value {
    font-weight: 500;             /* Medium weight */
    color: var(--text);           /* Primary text color */
    text-align: right;            /* Right-aligned */
    flex: 1;                      /* Take remaining space */
}
```

### Special Modifiers

```css
/* Total Decay (Blue) */
.meta-decay {
    color: #2563eb;               /* Blue 600 */
    font-weight: 600;             /* Semi-bold */
    font-size: 13px;              /* Slightly larger */
}

/* Live Countdown (Green Badge) */
.meta-countdown {
    color: #059669;               /* Emerald 600 */
    font-weight: 700;             /* Bold */
    font-size: 13px;              /* Larger */
    
    /* Badge Styling */
    background: linear-gradient(135deg, 
                rgba(5, 150, 105, 0.15), 
                rgba(5, 150, 105, 0.08));
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid rgba(5, 150, 105, 0.3);
}
```

---

## 5️⃣ Data Flow Diagram

```
User Creates Task
│
├─ Selects unit: "6 weeks"
│  └─ Stored: { decayMs: 3628800000, decayUnit: 'weeks' }
│
│
Task Card Renders
│
├─ formatDecayTimeHierarchical(decayMs, decayUnit)
│  │
│  ├─ Input: 3628800000 ms, 'weeks'
│  ├─ Calculation: 3628800000 / 604800000 = 6 weeks
│  └─ Output: "6 Weeks"
│
├─ formatLiveCountdown(task)
│  │
│  ├─ lastCompleted: 1 week ago
│  ├─ elapsed: 604800000 ms
│  ├─ timeLeft: 3628800000 - 604800000 = 3024000000 ms
│  ├─ Calculation: 5 weeks = 35 days
│  └─ Output: "5w 0d left"
│
└─ HTML Renders:
   Total Decay: "6 Weeks" (Blue)
   Time Left: "5w 0d left" (Green)
```

---

## 6️⃣ Integration Points

### Task Creation
```javascript
// File: js/chore-system.js, line 3110
const newTask = {
    id: Date.now(),
    name: taskName,
    decayMs: decayMs,
    decayUnit: decayUnit,  // ← NEW: Store original unit
    lastCompleted: null,
    freshness: 0
};
```

### Task Editing
```javascript
// File: js/chore-system.js, line 3148
task.decayMs = this.getDecayMs(decayValue, decayUnit);
task.decayUnit = decayUnit;  // ← NEW: Update unit

// Sync to linked task (line 3158)
linkedTask.decayUnit = decayUnit;
```

### Backward Compatibility
```javascript
// File: js/chore-system.js, lines 1313-1333
this.data.categories.forEach(category => {
    category.tasks.forEach(task => {
        if (!task.decayUnit && task.decayMs) {
            // Infer unit from decayMs divisibility
            const day = 24 * 60 * 60 * 1000;
            if (task.decayMs % (30 * day) === 0) {
                task.decayUnit = 'months';
            } else if (task.decayMs % (7 * day) === 0) {
                task.decayUnit = 'weeks';
            } else if (task.decayMs % day === 0) {
                task.decayUnit = 'days';
            } else {
                task.decayUnit = 'hours';
            }
        }
    });
});
```

---

## 7️⃣ Testing Matrix

### Unit Tests (Manual)

| Test Case | Input | Expected Output | Status |
|-----------|-------|-----------------|--------|
| Hours < 24 | 18h, 'hours' | "18 Hours" | ✅ |
| Hours > 24 | 50h, 'hours' | "2 Days 2 Hours" | ✅ |
| Days < 7 | 5d, 'days' | "5 Days" | ✅ |
| Days > 7 | 10d, 'days' | "1 Week 3 Days" | ✅ |
| Weeks (small) | 3w, 'weeks' | "3 Weeks" | ✅ |
| Weeks (large) | 10w, 'weeks' | "10 Weeks" ❌ NOT "2 Months" | ✅ |
| Months | 2mo, 'months' | "2 Months" | ✅ |

### Integration Tests

1. **Create Task Flow**
   - Create task with "6 weeks"
   - Verify `decayUnit: 'weeks'` stored
   - Verify display shows "6 Weeks"

2. **Edit Task Flow**
   - Edit task from "4 weeks" to "2 months"
   - Verify `decayUnit` changes to 'months'
   - Verify display updates to "2 Months"

3. **Backward Compatibility**
   - Load old save without `decayUnit`
   - Verify unit gets inferred
   - Verify display works correctly

4. **Live Countdown**
   - Complete a task
   - Verify countdown starts
   - Wait 1 minute, refresh
   - Verify countdown updated

---

## 8️⃣ Performance Considerations

### Rendering Cost

```javascript
// Calculation performed per task card render
O(1) for formatDecayTimeHierarchical()
O(1) for formatLiveCountdown()

// Total: O(n) where n = number of visible tasks
// Typically 5-20 tasks, negligible performance impact
```

### Memory Footprint

```javascript
// Additional data per task
decayUnit: 'weeks'  // 6-7 bytes (string)

// For 1000 tasks: ~7KB additional memory
// Negligible impact
```

---

## 9️⃣ Future Enhancements

### Real-Time Updates

```javascript
// Potential implementation
setInterval(() => {
    // Re-render only countdown values
    document.querySelectorAll('.meta-countdown').forEach(el => {
        const taskId = el.dataset.taskId;
        const task = findTask(taskId);
        el.textContent = formatLiveCountdown(task);
    });
}, 60000); // Update every minute
```

### Color-Coded Urgency

```javascript
// Add urgency classes based on remaining time
if (timeLeftPercent < 10) {
    classList.add('countdown-critical');  // Red
} else if (timeLeftPercent < 30) {
    classList.add('countdown-warning');   // Orange
} else {
    classList.add('countdown-normal');    // Green
}
```

---

## 📚 References

- Main implementation: `js/chore-system.js`
- Styling: `css/main.css`
- Documentation: `docs/how-tos/PROJECT-MASTER-GUIDE.md`

**Last Updated**: January 28, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
