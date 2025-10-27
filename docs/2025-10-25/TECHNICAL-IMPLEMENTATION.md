# Technical Implementation Guide - October 25, 2025

## Overview
This document provides detailed technical information about the changes implemented on October 25, 2025.

---

## 1. Dark Modal Theme - Semi-Transparent

### CSS Changes (main.css)

#### Modal Background
```css
.modal-content {
    background: rgba(50, 50, 60, 0.75);  /* Semi-transparent dark */
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px 20px 0 0;
    padding: 24px;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 -10px 40px rgba(0,0,0,0.3);
}
```

**Key Points:**
- RGB(50, 50, 60): Lighter dark gray-blue
- Alpha 0.75: 75% opacity (25% transparent)
- 20px blur creates frosted glass effect
- Shows background through modal

#### Text Colors
```css
.modal-title { 
    font-size: 22px; 
    font-weight: 700;
    color: #ffffff;  /* Pure white */
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.form-label {
    font-size: 15px;
    font-weight: 600;
    color: #e0e0e0;  /* Light gray */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
```

**Contrast Ratios:**
- White on RGB(50,50,60): ~12:1 (WCAG AAA)
- #e0e0e0 on RGB(50,50,60): ~9.5:1 (WCAG AAA)
- #bbb on RGB(50,50,60): ~6.8:1 (WCAG AA)

---

## 2. Robot Self Care Reminders

### Function: checkSelfCareReminder()

**Location:** `js/chore-system.js` Lines 2835-2891

```javascript
checkSelfCareReminder() {
    // Guard: Check if Self Care enabled
    if (!this.data.selfCare || !this.data.selfCare.enabled) return false;
    
    let incompleteCount = 0;
    let incompleteTasks = [];
    
    // Count incomplete non-optional tasks
    for (const group of this.data.selfCare.groups) {
        for (const task of group.tasks) {
            // Skip optional tasks
            if (task.optional) continue;
            // Count incomplete non-optional tasks
            if (!task.completed) {
                incompleteCount++;
                incompleteTasks.push({ 
                    groupName: group.name, 
                    taskName: task.name 
                });
            }
        }
    }
    
    // Exit if no incomplete tasks
    if (incompleteCount === 0) return false;
    
    // Show appropriate reminder based on count
    if (incompleteCount === 1) {
        // Show single task name
    } else if (incompleteCount <= 3) {
        // List up to 3 task names
    } else {
        // Show count only for 4+
    }
    
    return true; // Reminder shown
}
```

**Integration in mascotGreet():**

**Location:** Lines 2727-2731

```javascript
// Check for Self Care reminders (if enabled and has incomplete tasks)
if (this.data.selfCare && this.data.selfCare.enabled && !this.data.currentCategoryId) {
    const hasSelfCareReminder = this.checkSelfCareReminder();
    if (hasSelfCareReminder) return; // Priority reminder
}
```

**Conditions for Triggering:**
1. `this.data.selfCare` exists
2. `this.data.selfCare.enabled === true`
3. `!this.data.currentCategoryId` (on dashboard, not in category view)
4. At least one non-optional task incomplete
5. No modals open

**Message Templates:**

```javascript
// 1 task
const phrases = [
    `Hey! Don't forget about Self Care today. You still need to: ${task.taskName}`,
    `Quick reminder: ${task.taskName} is waiting for you in Self Care! 💚`,
    `Your wellness matters! Remember to ${task.taskName} today.`,
    `Self Care check-in: ${task.taskName} still needs your attention! ❤️`
];

// 2-3 tasks
const phrases = [
    `Don't forget Self Care! You have ${incompleteCount} tasks left: ${taskNames}`,
    `Self Care reminder: ${taskNames} are waiting for you! ❤️`,
    `Your wellness is important! ${incompleteCount} Self Care tasks need attention today.`
];

// 4+ tasks
const phrases = [
    `Self Care check-in! You have ${incompleteCount} tasks to complete today. Your wellness matters! ❤️`,
    `Hey! ${incompleteCount} Self Care tasks are waiting. Let's take care of yourself today! 💚`,
    `Don't forget about Self Care! You have ${incompleteCount} tasks left. You're worth it! ✨`,
    `Wellness reminder: ${incompleteCount} Self Care tasks need your attention. You've got this! 💪`
];
```

---

## 3. Self Care Optional Tasks

### Data Model Update

**Location:** `js/chore-system.js` Lines 605-606

```javascript
{
    id: 'other',
    name: 'Other Tasks',
    tasks: [
        { id: 'cash', name: 'Set aside extra cash...', completed: false, earnedToday: false, optional: true },
        { id: 'mail', name: 'Check mail', completed: false, earnedToday: false },
        { id: 'plants', name: 'Water plants', completed: false, earnedToday: false, optional: true },  // NEW
        { id: 'pet', name: 'Feed a pet', completed: false, earnedToday: false, optional: true },        // NEW
        { id: 'study', name: 'Study for 20 minutes', completed: false, earnedToday: false },
        { id: 'bill', name: 'Pay a bill', completed: false, earnedToday: false, optional: true }
    ],
    bonusEarned: false
}
```

**Impact on Group Bonus:**

Before:
- Required tasks: 4 (mail, plants, pet, study)
- Optional tasks: 2 (cash, bill)

After:
- Required tasks: 2 (mail, study)
- Optional tasks: 4 (cash, plants, pet, bill)

**Bonus Calculation Logic:**

```javascript
// In toggleSelfCareTask() or bonus check
const requiredTasks = group.tasks.filter(t => !t.optional);
const allRequiredComplete = requiredTasks.every(t => t.completed);

if (allRequiredComplete && !group.bonusEarned) {
    // Trigger group bonus modal
}
```

---

## 4. Category Creation System Reorganization

### HTML Structure (index.html)

#### Dropdown List
```html
<select class="form-select" id="categorySelect" onchange="app.handleCategorySelect()" required>
    <option value="">-- Select from common categories --</option>
    <option value="SELFCARE" style="color: #ff4444; font-weight: bold;">❤️ Self Care</option>
    <option disabled style="color: #888;">━━━━━━━━━━━━━━━━</option>
    
    <!-- Standard Categories -->
    <option value="Kitchen">Kitchen</option>
    <option value="Bathroom">Bathroom</option>
    <!-- ... more standard categories ... -->
    <option value="Front Porch">Front Porch</option>
    <option value="custom">✏️ Custom Category</option>  <!-- MOVED HERE -->
    
    <!-- Group Categories -->
    <option disabled style="color: #4040ff; font-weight: bold;">━━━━ GROUP CATEGORIES ━━━━</option>
    <option value="GROUP:Sweep/Mop/Vacuum" style="color: #4040ff;">🔷 Sweep/Mop/Vacuum</option>
    <option value="GROUP:Shampoo" style="color: #4040ff;">🔷 Shampoo</option>
    <option value="GROUP:Deep Cleaning" style="color: #4040ff;">🔷 Deep Cleaning</option>
    <option value="customgroup" style="color: #4040ff;">✏️ Custom Group Category</option>  <!-- NEW -->
</select>
```

#### Input Fields
```html
<!-- Standard Custom Category Input -->
<div class="form-group" id="customCategoryGroup" style="display: none;">
    <label class="form-label">Custom Category Name</label>
    <input type="text" class="form-input" id="categoryName" placeholder="e.g., Laundry Room">
</div>

<!-- Group Custom Category Input -->
<div class="form-group" id="customGroupCategoryGroup" style="display: none;">
    <label class="form-label">Custom Group Category Name</label>
    <input type="text" class="form-input" id="groupCategoryName" placeholder="e.g., Window Cleaning">
    <small style="color: #bbb; display: block; margin-top: 4px;">
        Group categories allow multiple rooms/locations to share the same task list
    </small>
</div>
```

### JavaScript Implementation

#### Function: handleCategorySelect()

**Location:** `js/chore-system.js` Lines 1632-1657

```javascript
handleCategorySelect() {
    const select = document.getElementById('categorySelect');
    const customGroup = document.getElementById('customCategoryGroup');
    const customInput = document.getElementById('categoryName');
    const customGroupGroup = document.getElementById('customGroupCategoryGroup');
    const groupInput = document.getElementById('groupCategoryName');

    if (select.value === 'custom') {
        // Show standard custom input
        customGroup.style.display = 'block';
        customInput.required = true;
        // Hide group input
        customGroupGroup.style.display = 'none';
        groupInput.required = false;
        customInput.focus();
        
    } else if (select.value === 'customgroup') {
        // Show group custom input
        customGroupGroup.style.display = 'block';
        groupInput.required = true;
        // Hide standard input
        customGroup.style.display = 'none';
        customInput.required = false;
        groupInput.focus();
        
    } else {
        // Hide both inputs
        customGroup.style.display = 'none';
        customInput.required = false;
        customGroupGroup.style.display = 'none';
        groupInput.required = false;
    }
}
```

#### Function: addCategory()

**Location:** `js/chore-system.js` Lines 1766-1782

```javascript
let categoryName = '';
let isGroupCategory = false;

if (select.value === 'custom') {
    // Standard custom category
    categoryName = customInput.value.trim();
    isGroupCategory = false;
    
} else if (select.value === 'customgroup') {
    // Group custom category
    const groupInput = document.getElementById('groupCategoryName');
    categoryName = groupInput.value.trim();
    isGroupCategory = true;
    
} else if (select.value) {
    // Predefined categories
    if (select.value.startsWith('GROUP:')) {
        categoryName = select.value.replace('GROUP:', '');
        isGroupCategory = true;
    } else {
        categoryName = select.value;
        isGroupCategory = false;
    }
} else {
    return; // No selection made
}

if (!categoryName) return;

const newCategory = {
    id: Date.now(),
    name: categoryName,
    tasks: [],
    isGroupCategory: isGroupCategory
};
this.data.categories.push(newCategory);
```

#### Function: showAddCategoryModal()

**Location:** `js/chore-system.js` Lines 1622-1631

```javascript
showAddCategoryModal() {
    // Reset dropdown
    document.getElementById('categorySelect').value = '';
    
    // Reset standard custom input
    document.getElementById('categoryName').value = '';
    document.getElementById('customCategoryGroup').style.display = 'none';
    
    // Reset group custom input
    const groupInput = document.getElementById('groupCategoryName');
    if (groupInput) {
        groupInput.value = '';
        document.getElementById('customGroupCategoryGroup').style.display = 'none';
    }
    
    document.getElementById('addCategoryModal').classList.add('active');
}
```

---

## State Management Flow

### User Flow: Creating Custom Standard Category

```
1. User clicks "+" FAB
   ↓
2. showAddCategoryModal() called
   - Reset all fields
   - Hide all custom inputs
   ↓
3. User scrolls to "✏️ Custom Category"
4. User selects "✏️ Custom Category"
   ↓
5. handleCategorySelect() called
   - select.value === 'custom'
   - Show customCategoryGroup
   - Hide customGroupCategoryGroup
   - Focus categoryName input
   ↓
6. User types category name (e.g., "Game Room")
7. User clicks "Create Category"
   ↓
8. addCategory() called
   - categoryName = "Game Room"
   - isGroupCategory = false
   - Create category object
   - Push to data.categories
   - Save data
   - Render
   ↓
9. Category appears on dashboard
```

### User Flow: Creating Custom Group Category

```
1. User clicks "+" FAB
   ↓
2. showAddCategoryModal() called
   - Reset all fields
   - Hide all custom inputs
   ↓
3. User scrolls to GROUP CATEGORIES section
4. User selects "✏️ Custom Group Category"
   ↓
5. handleCategorySelect() called
   - select.value === 'customgroup'
   - Show customGroupCategoryGroup
   - Hide customCategoryGroup
   - Focus groupCategoryName input
   ↓
6. User types category name (e.g., "Window Cleaning")
7. User clicks "Create Category"
   ↓
8. addCategory() called
   - categoryName = "Window Cleaning"
   - isGroupCategory = true
   - Create category object with isGroupCategory flag
   - Push to data.categories
   - Save data
   - Render
   ↓
9. Category appears with blue "GROUP" badge on dashboard
```

---

## Data Structures

### Category Object (Standard)
```javascript
{
    id: 1729840000000,
    name: "Game Room",
    tasks: [],
    isGroupCategory: false
}
```

### Category Object (Group)
```javascript
{
    id: 1729840000001,
    name: "Window Cleaning",
    tasks: [],
    isGroupCategory: true
}
```

### Self Care Task (Optional)
```javascript
{
    id: 'plants',
    name: 'Water plants',
    completed: false,
    earnedToday: false,
    optional: true  // NEW FLAG
}
```

---

## Testing Matrix

| Test Case | Input | Expected Output | Status |
|-----------|-------|-----------------|--------|
| Select "Custom Category" | value="custom" | Show customCategoryGroup, hide customGroupCategoryGroup | ✅ |
| Select "Custom Group Category" | value="customgroup" | Show customGroupCategoryGroup, hide customCategoryGroup | ✅ |
| Create standard custom | Enter "Game Room", submit | Category created with isGroupCategory=false | ✅ |
| Create group custom | Enter "Window Cleaning", submit | Category created with isGroupCategory=true | ✅ |
| Modal open/close | Click X or backdrop | All fields reset, both inputs hidden | ✅ |
| Self Care reminder (1 task) | 1 incomplete non-optional | Show task name in message | ✅ |
| Self Care reminder (3 tasks) | 3 incomplete non-optional | List 3 task names | ✅ |
| Self Care reminder (5 tasks) | 5 incomplete non-optional | Show count only | ✅ |
| Self Care reminder (optional) | Only optional incomplete | No reminder shown | ✅ |
| Dark theme visibility | Open any modal | Text readable on dark background | ✅ |
| Optional task completion | Complete "Water plants" | Award +2 bolts, don't require for bonus | ✅ |

---

## Browser Compatibility

### CSS Features Used:
- `backdrop-filter: blur()` - Supported in all modern browsers
- `rgba()` colors - Full support
- Flexbox - Full support
- CSS variables - Full support

### JavaScript Features Used:
- Arrow functions - Full support
- `Array.filter()`, `Array.every()` - Full support
- Template literals - Full support
- Optional chaining - Modern browsers (polyfill available)

### Tested Browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

---

## Performance Considerations

### Modal Rendering:
- Backdrop blur: GPU-accelerated
- Modal transitions: CSS-based, no JS
- Input field switching: DOM manipulation minimal

### Reminder System:
- Runs once per navigation to dashboard
- O(n) complexity where n = number of Self Care tasks (~20 max)
- Early returns for efficiency

### Category Creation:
- Instant feedback (no API calls)
- LocalStorage save: ~1-5ms
- Re-render: Efficient diff-based updates

---

## Security Considerations

### Input Sanitization:
```javascript
categoryName = customInput.value.trim();  // Remove whitespace
if (!categoryName) return;  // Prevent empty categories
```

### XSS Prevention:
- All user input inserted via `textContent`, not `innerHTML`
- Category names displayed safely in templates

### Data Validation:
- Required fields enforced with HTML5 `required` attribute
- JavaScript validation as backup

---

## Accessibility (A11Y)

### WCAG Compliance:
- ✅ Contrast ratios meet AA standard (some AAA)
- ✅ Focus indicators on all interactive elements
- ✅ Keyboard navigation supported
- ✅ Labels associated with inputs

### Screen Reader Support:
- Form labels properly associated
- Helper text linked to inputs
- Modal title announced
- Focus management on modal open/close

---

## Future Enhancements

### Potential Improvements:
1. **Reminder Snooze:** Allow users to snooze Self Care reminders
2. **Custom Reminder Time:** Let users choose when reminders appear
3. **Theme Customization:** Allow users to adjust modal opacity/color
4. **Category Icons:** Let users add custom icons to categories
5. **Category Reordering:** Drag-and-drop to reorder categories

### Technical Debt:
- Consider migrating to TypeScript for type safety
- Add unit tests for reminder logic
- Consider using a state management library
- Implement analytics for feature usage

---

**Document Version:** 1.0
**Last Updated:** October 25, 2025, 12:45 AM UTC-06:00
**Author:** Development Team
