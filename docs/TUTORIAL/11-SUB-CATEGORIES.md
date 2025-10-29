# Sub-Categories 🗂️

**[Robot floats near a special category with sub-category buttons]**

**Robot Speech (TTS):** *"Okay, this is a neat organizational feature! Sub-Categories let you filter tasks within certain categories. It's perfect for the Sweep/Mop/Vacuum category where you have tons of tasks!"*

**Speech Bubble:** "Filter tasks with Sub-Categories! 🔍"

---

## What are Sub-Categories?

**Sub-Categories** are filters that let you view and complete specific types of tasks within a category.

**Think of them as:**
- 🗂️ Folders within a folder
- 🔍 Search filters for task types
- 📋 Quick views of related tasks

---

## The Special Category: Sweep/Mop/Vacuum

**[Robot introduces the category]**

Currently, sub-categories work with one special category:

```
🧹 Sweep/Mop/Vacuum Category

Contains three types of tasks:
  - 🧹 SWEEP tasks
  - 🧽 MOP tasks
  - 🔌 VACUUM tasks
```

**Why this category needs sub-categories:**
- Lots of tasks (every room has floor cleaning)
- Three distinct actions
- You usually do one action at a time
- Helps avoid overwhelming task lists

**Robot Speech (TTS):** *"Imagine having 15 floor cleaning tasks in one list! Sub-categories let you focus on just sweeping, or just mopping, without clutter!"*

---

## How Sub-Categories Work

**[Robot demonstrates the flow]**

### Step 1: Enter Sweep/Mop/Vacuum Category

```
Dashboard → Click "Sweep/Mop/Vacuum" card
        ↓
Sub-Category Menu appears
```

---

### Step 2: Sub-Category Menu

```
┌─────────────────────────────────────┐
│     Sweep/Mop/Vacuum Tasks          │
├─────────────────────────────────────┤
│                                     │
│  Choose a task type:                │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🧹 SWEEP                    │   │
│  │  Sweep all floors            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🧽 MOP                      │   │
│  │  Mop all hard floors         │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  🔌 VACUUM                   │   │
│  │  Vacuum all carpeted areas   │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Robot Speech (TTS):** *"Instead of showing all tasks at once, you pick which TYPE of task you want to see. Click SWEEP to see all sweeping tasks, MOP for mopping, etc."*

---

### Step 3: View Filtered Tasks

```
Click [SWEEP] button
        ↓
Shows ONLY sweep tasks:

┌─────────────────────────────────────┐
│ ← Back          SWEEP Tasks          │
├─────────────────────────────────────┤
│ [ COMPLETE ALL SWEEP TASKS ]        │
├─────────────────────────────────────┤
│ ☐ Sweep kitchen         65%         │
│ ☐ Sweep bedroom         70%         │
│ ☐ Sweep living room     55%         │
│ ☐ Sweep entryway        80%         │
│ ☐ Sweep porch           90%         │
└─────────────────────────────────────┘
```

**Filtered!**
- Only sweep tasks visible
- Mop and vacuum tasks hidden
- Can complete individually or all at once

---

## The Three Sub-Categories

**[Robot explains each type]**

### 1. 🧹 SWEEP

**Purpose:** Show all sweeping tasks

**Task examples:**
- Sweep kitchen floor
- Sweep bedroom floor
- Sweep entryway
- Sweep porch
- Sweep garage

**When to use:**
- You're sweeping the house
- Want to see which rooms need sweeping
- Batch all sweeping together

---

### 2. 🧽 MOP

**Purpose:** Show all mopping tasks

**Task examples:**
- Mop kitchen floor
- Mop bathroom floor
- Mop entryway
- Mop laundry room

**When to use:**
- You're mopping the house
- Want to see which hard floors need cleaning
- Batch all mopping together

---

### 3. 🔌 VACUUM

**Purpose:** Show all vacuuming tasks

**Task examples:**
- Vacuum living room carpet
- Vacuum bedroom carpet
- Vacuum stairs
- Vacuum car interior

**When to use:**
- You're vacuuming the house
- Want to see which carpeted areas need attention
- Batch all vacuuming together

**Robot Speech (TTS):** *"Each sub-category is a different cleaning tool! Sweep with a broom, mop with a mop, vacuum with a vacuum. Simple!"*

---

## Adding Tasks with Sub-Categories

**[Robot demonstrates task creation]**

### When Adding a Task to Sweep/Mop/Vacuum:

```
┌──────────────────────────────────┐
│  Add New Task                    │
├──────────────────────────────────┤
│  Task Name:                      │
│  [_Sweep kitchen floor__]        │
│                                  │
│  Decay Time:                     │
│  [_1_] [Week ▼]                  │
│                                  │
│  Sub-Category:  ← SPECIAL!       │
│  [Sweep ▼]                       │
│   Options: Sweep, Mop, Vacuum    │
│                                  │
│  [ Cancel ]  [ Add Task ]        │
└──────────────────────────────────┘
```

**The sub-category dropdown:**
- Only appears for Sweep/Mop/Vacuum category
- Required field (must select one)
- Determines which filter shows this task

---

### Task Gets Tagged

```
Task created:
{
    name: "Sweep kitchen floor",
    subCategory: "sweep",  ← Tagged!
    decay: 1 week,
    ...
}
```

**Now this task will:**
- ✅ Appear when you click "SWEEP" button
- ❌ Hidden when you click "MOP" or "VACUUM"
- ✅ Can still see it in the main category view (all tasks)

---

## Using Sub-Category Filtering

**[Robot shows workflows]**

### Workflow 1: Focus on One Type

**Scenario:** You're sweeping the house today

**Steps:**
1. Open "Sweep/Mop/Vacuum" category
2. Click [SWEEP] button
3. See only sweep tasks
4. Complete as you go room by room
5. Click "Complete All Sweep Tasks" when done

**Benefits:**
- No distractions from mop/vacuum tasks
- Clear focus on one action
- Progress bar shows sweep-specific completion

---

### Workflow 2: Review All Task Types

**Scenario:** Planning your cleaning week

**Steps:**
1. Check [SWEEP] - see what needs sweeping
2. Back → Check [MOP] - see what needs mopping
3. Back → Check [VACUUM] - see what needs vacuuming
4. Plan which day to do each type

**Benefits:**
- Quick overview of all floor cleaning
- Plan efficient cleaning schedule
- See urgency (freshness) for each type

---

### Workflow 3: Complete All at Once

**Scenario:** Deep cleaning day

**Steps:**
1. Enter Sweep/Mop/Vacuum category
2. Go to [SWEEP] → Complete all sweep tasks
3. Back → Go to [MOP] → Complete all mop tasks
4. Back → Go to [VACUUM] → Complete all vacuum tasks
5. Done! All floors clean!

**Robot Speech (TTS):** *"This is the power-user move! Get all your floor cleaning done in one marathon session!"*

---

## Complete All Sub-Category Button

**[Robot highlights the special button]**

Each sub-category view has a **Complete All** button:

```
[ COMPLETE ALL SWEEP TASKS ]
[ COMPLETE ALL MOP TASKS ]
[ COMPLETE ALL VACUUM TASKS ]
```

**What it does:**
1. Completes ALL tasks in that sub-category
2. Sets freshness to 100% for each
3. Applies auto-snooze to each task
4. Shows celebration animation
5. Updates category score

**Example:**
```
SWEEP tasks before:
  ☐ Sweep kitchen     (65%)
  ☐ Sweep bedroom     (70%)
  ☐ Sweep living room (55%)

[Click Complete All Sweep Tasks]
        ↓
SWEEP tasks after:
  ☑ Sweep kitchen     (100%) 💤 3h
  ☑ Sweep bedroom     (100%) 💤 3h
  ☑ Sweep living room (100%) 💤 3h
```

**Robot Speech (TTS):** *"Super satisfying! All the sweeping done in one click!"*

---

## Back Navigation

**[Robot shows navigation flow]**

### Navigation Structure:

```
Dashboard
    ↓
Sweep/Mop/Vacuum Category (Sub-Category Menu)
    ↓
SWEEP Tasks (Filtered View)
    ↓
[Back Button] → Returns to Sub-Category Menu
    ↓
[Back Button] → Returns to Dashboard
```

**Always visible:**
- Back button in top-left
- Returns to previous screen
- Easy to switch between sub-categories

---

## Sub-Category vs Group Category

**[Robot clarifies the difference]**

### Sub-Categories (Sweep/Mop/Vacuum)

**Purpose:** Filter tasks WITHIN a category

**How it works:**
- All tasks in ONE category
- Filter by sub-type
- Choose which to view

**Example:**
```
Sweep/Mop/Vacuum Category:
  - [Filter: SWEEP] → Shows sweep tasks
  - [Filter: MOP] → Shows mop tasks
  - [Filter: VACUUM] → Shows vacuum tasks
```

---

### Group Categories (TRASH, SWEEP, MOP)

**Purpose:** Collect tasks FROM MULTIPLE categories

**How it works:**
- Tasks from different categories
- Linked together
- View all in one place

**Example:**
```
TRASH Group Category:
  - Kitchen trash (from Kitchen)
  - Bedroom trash (from Bedroom)
  - Bathroom trash (from Bathroom)
```

**Robot Speech (TTS):** *"Sub-categories are filters. Group categories are collections. Different tools for different jobs!"*

---

## Task Count Display

**[Robot shows the counter]**

### In Sub-Category Menu:

```
┌─────────────────────────────────────┐
│  🧹 SWEEP (5 tasks)  ← Task count   │
│  Sweep all floors                   │
└─────────────────────────────────────┘

│  🧽 MOP (3 tasks)                   │
│  Mop all hard floors                │
└─────────────────────────────────────┘

│  🔌 VACUUM (7 tasks)                │
│  Vacuum all carpeted areas          │
└─────────────────────────────────────┘
```

**Helpful for:**
- Quick overview of workload
- See which type has most tasks
- Plan time accordingly

---

## Best Practices

**[Robot gives tips]**

### Do:

✅ **Use sub-categories for large task lists**
- 10+ floor cleaning tasks? Sub-categories help!

✅ **Tag tasks accurately**
- "Sweep" for broom tasks
- "Mop" for wet cleaning
- "Vacuum" for vacuuming

✅ **Complete one type at a time**
- More efficient than bouncing between types

✅ **Use Complete All when appropriate**
- Saves time on cleaning days

---

### Don't:

❌ **Don't mix task types**
- "Sweep kitchen" → tag as "sweep" (not "mop")

❌ **Don't create too many tasks**
- You don't need "Sweep kitchen north corner" as separate task
- Keep it room-level

❌ **Don't forget to select sub-category**
- Required field when adding tasks

---

## Extending Sub-Categories (Future)

**[Robot hints at possibilities]**

**Currently:** Only Sweep/Mop/Vacuum has sub-categories

**Potential future categories:**
- 🪟 Windows (inside/outside/screens)
- 🧴 Restock (food/toiletries/cleaning supplies)
- 🐕 Pet Care (feed/walk/groom)
- 🚗 Vehicle (wash/vacuum/maintenance)

**Robot Speech (TTS):** *"For now, it's just floor cleaning. But the system could expand to other categories in the future!"*

---

## Technical Notes

**[Robot puts on glasses]**

### Sub-Category Data Structure

```javascript
task = {
    id: 12345,
    name: "Sweep kitchen floor",
    subCategory: "sweep",  // Tagged with sub-category
    decay: 604800000,      // 1 week in ms
    categoryId: 789        // Belongs to Sweep/Mop/Vacuum
}
```

### Filtering Logic

```javascript
showSubCategoryTasks(subCategory) {
    const category = this.data.categories.find(
        c => c.id === this.data.currentCategoryId
    )
    
    // Filter tasks by sub-category
    const filteredTasks = category.tasks.filter(
        t => t.subCategory === subCategory
    )
    
    // Render only filtered tasks
    this.renderFilteredTasks(filteredTasks)
}
```

### Complete All Sub-Category

```javascript
completeAllSubCategoryTasks() {
    const category = getCurrentCategory()
    const subCategory = this.data.currentSubCategory
    
    // Filter by sub-category
    const filtered = category.tasks.filter(
        t => t.subCategory === subCategory
    )
    
    // Complete all filtered tasks
    filtered.forEach(task => {
        task.freshness = 100
        task.lastCompleted = Date.now()
        applyAutoSnooze(task)
    })
}
```

---

## What's Next?

You now understand sub-categories! Next, let's explore the fun side of UpKeep - **Robot Companions** and how they encourage you!

---

**Tutorial Progress:** Step 11 of 24

**Previous:** Group Categories  
**Next:** Robot Companions

---

## Technical Details (For Implementation)

### UI Elements

- Sub-category menu with three buttons
- Filtered task views
- "Complete All [TYPE] Tasks" buttons
- Back button navigation
- Task count badges on menu buttons

### Robot Animations

- "Filtering" animation showing tasks organizing
- Sub-category button highlights
- Celebration for completing all tasks of one type
- "Sweep/Mop/Vacuum" action animations for each type

### Sub-Category Colors

```css
.sub-sweep { border-left: 4px solid #8B4513; } /* Brown */
.sub-mop { border-left: 4px solid #4169E1; }   /* Blue */
.sub-vacuum { border-left: 4px solid #9370DB; } /* Purple */
```
