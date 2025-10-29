# Group Categories 🔵

**[Robot floats near a glowing blue category card]**

**Robot Speech (TTS):** *"Alright, let's talk about Group Categories! These are special categories that collect tasks from multiple rooms. See how this card glows blue? That's how you know it's a group category!"*

**Speech Bubble:** "Group Categories are super organized! 📦✨"

---

## What are Group Categories?

**Group Categories** are special collections that gather related tasks from different regular categories into one place.

**Think of them as:**
- 📦 Collection bins for similar tasks
- 🗂️ Smart folders that auto-organize
- 🔍 Quick view of specific task types across your home

---

## Regular vs Group Categories

**[Robot shows comparison]**

### Regular Categories
```
🍽️ Kitchen
🛏️ Bedroom
🛁 Bathroom
🏡 Living Room
```

**Purpose:** Organize tasks by location/room  
**Score:** Contributes to overall home score  
**Appearance:** Standard colors

---

### Group Categories
```
🗑️ TRASH  (GROUP)
🧹 SWEEP  (GROUP)
🧽 MOP    (GROUP)
```

**Purpose:** Organize tasks by type/action  
**Score:** Does NOT affect overall home score  
**Appearance:** Blue glow + [GROUP] badge

**Robot Speech (TTS):** *"Regular categories are PLACES. Group categories are ACTIONS. One is where you clean, the other is what you're cleaning!"*

---

## The Three Built-In Group Categories

**[Robot introduces each one]**

### 1. 🗑️ TRASH Category

**Purpose:** Collect all trash-related tasks

**Shows tasks like:**
- Kitchen trash
- Bedroom trash
- Bathroom trash
- Living room trash
- Office trash
- Garage trash

**Why it's useful:**
- Take out all trash at once on trash day
- See which rooms have full bins
- Track when each trash was last emptied

**Visual:**
```
┌─────────────────────────────────┐
│ 🗑️ TRASH        [GROUP]   75%  │ ← Blue glow
│ █████████░░░░░░                │
│                                 │
│ ☐ Kitchen trash          80%   │
│ ☐ Bedroom trash          65%   │
│ ☑ Bathroom trash        100%   │
│ ☐ Living room trash      70%   │
└─────────────────────────────────┘
```

**Robot Speech (TTS):** *"Trash day is so much easier when you can see all your trash tasks in one place!"*

---

### 2. 🧹 SWEEP Category

**Purpose:** Collect all sweeping tasks

**Shows tasks like:**
- Sweep kitchen floor
- Sweep bedroom floor
- Sweep entryway
- Sweep garage
- Sweep porch
- Sweep patio

**Why it's useful:**
- Sweep entire house in one go
- Track which floors need sweeping
- Batch all sweeping together

**Visual:**
```
┌─────────────────────────────────┐
│ 🧹 SWEEP        [GROUP]   65%  │
│ ██████████░░░░░                │
│                                 │
│ ☐ Sweep kitchen         55%    │
│ ☐ Sweep bedroom         70%    │
│ ☐ Sweep living room     60%    │
│ ☐ Sweep garage          75%    │
└─────────────────────────────────┘
```

**Robot Speech (TTS):** *"When you're in cleaning mode with the broom, it's nice to see all the floors that need attention!"*

---

### 3. 🧽 MOP Category

**Purpose:** Collect all mopping tasks

**Shows tasks like:**
- Mop kitchen floor
- Mop bathroom floor
- Mop entryway
- Mop laundry room
- Mop mud room

**Why it's useful:**
- Mop entire house efficiently
- See all hard floors at once
- Do all wet cleaning together

**Visual:**
```
┌─────────────────────────────────┐
│ 🧽 MOP          [GROUP]   80%  │
│ ████████████░░░                │
│                                 │
│ ☐ Mop kitchen           75%    │
│ ☐ Mop bathroom          85%    │
│ ☐ Mop entryway          80%    │
└─────────────────────────────────┘
```

**Robot Speech (TTS):** *"Mopping all your floors at once? This category makes it easy to track progress!"*

---

## How Group Categories Appear

**[Robot points to visual differences]**

### On Dashboard

Group categories have special styling:

```
Regular Category:
┌─────────────────────────┐
│  Kitchen        85% 🍽️  │ ← Normal colors
│  ████████████░░░        │
└─────────────────────────┘

Group Category:
┌─────────────────────────┐
│ 🗑️ TRASH [GROUP]   75%  │ ← Blue glow!
│ █████████░░░░░░         │
│ Blue tint + badge       │
└─────────────────────────┘
```

---

### Inside Group Category View

```
┌─────────────────────────────────────┐
│ ← Back              🗑️ TRASH         │
│                        [GROUP]       │
├─────────────────────────────────────┤
│ [ COMPLETE ALL TRASH TASKS ]        │ ← Special button
├─────────────────────────────────────┤
│                                     │
│ Tasks (linked from regular cats):  │
│                                     │
│ ☐ Kitchen trash      🔗 LINKED      │
│ ☐ Bedroom trash      🔗 LINKED      │
│ ☐ Bathroom trash     🔗 LINKED      │
│                                     │
└─────────────────────────────────────┘
```

**Key elements:**
- Blue-tinted header
- [GROUP] badge visible
- "Complete All" button prominent
- All tasks show 🔗 LINKED badge

---

## Group Category Behavior

**[Robot explains special features]**

### Feature 1: Doesn't Affect Overall Score

```
Overall Home Score Calculation:
├─ ✅ Kitchen: 85%
├─ ✅ Bedroom: 90%
├─ ✅ Bathroom: 75%
├─ ❌ TRASH: 75%     ← NOT INCLUDED!
├─ ❌ SWEEP: 65%     ← NOT INCLUDED!
├─ ❌ MOP: 80%       ← NOT INCLUDED!
└─ Average: 83.3%

Overall Score: 83% (only regular categories count)
```

**Why?**
- Group categories are organizational tools
- Their tasks are already counted in regular categories
- Prevents double-counting the same tasks
- Keeps overall score accurate

**Robot Speech (TTS):** *"Group categories don't add to your score because their tasks already count in their regular categories. No double-counting!"*

---

### Feature 2: Complete All Button

**[Robot highlights the big button]**

Every group category has a special **"Complete All"** button:

```
[ COMPLETE ALL TRASH TASKS ]
[ COMPLETE ALL SWEEP TASKS ]
[ COMPLETE ALL MOP TASKS ]
```

**What it does:**
1. Completes ALL unsnoozed tasks in the group
2. Syncs completion to regular categories
3. Shows celebration animation
4. Triggers auto-snooze on all tasks

**Important:** It only completes **unsnoozed** tasks!

**Example:**
```
TRASH Category:
  ☐ Kitchen trash (unsnoozed)  → Will complete ✅
  ☐ Bedroom trash (unsnoozed)  → Will complete ✅
  💤 Bathroom trash (snoozed)   → Will NOT complete ⏭️

[Click Complete All]
        ↓
Kitchen and Bedroom complete, Bathroom stays snoozed
```

**Robot Speech (TTS):** *"The Complete All button respects snooze! If you snoozed a task on purpose, Complete All won't touch it!"*

---

### Feature 3: Only Shows Linked Tasks

Group categories **cannot** have regular (non-linked) tasks.

**All tasks must be:**
- ✅ Linked to a regular category
- ✅ Have the 🔗 LINKED badge
- ✅ Created through the proper linking process

**If you try to add a non-linked task:**
```
❌ Error: Group categories require linked tasks!
   Please select a standard category to link to.
```

---

## Using Group Categories

**[Robot demonstrates workflows]**

### Workflow 1: Complete All at Once

**Best for:** Weekly cleaning, trash day, batch processing

**Steps:**
1. Open group category (e.g., TRASH)
2. Review all tasks
3. Do all the tasks
4. Click "Complete All [TYPE] Tasks"
5. All tasks complete + auto-snooze
6. Regular categories auto-update

**Robot Speech (TTS):** *"This is the power user move! Get everything done in one shot!"*

---

### Workflow 2: Cherry-Pick Tasks

**Best for:** Partial completion, spot cleaning

**Steps:**
1. Open group category
2. Review tasks
3. Click individual checkboxes
4. Complete only what you want
5. Leave the rest for later

**Example:**
```
SWEEP Category:
  ☐ Sweep kitchen     → [Complete this]
  ☐ Sweep bedroom     → [Complete this]
  ☐ Sweep garage      → [Skip - don't feel like it]
```

---

### Workflow 3: Use as Reference

**Best for:** Planning, prioritizing

**Steps:**
1. Open group category
2. See which tasks are low freshness
3. Note which rooms need attention
4. Complete tasks from regular categories

**Robot Speech (TTS):** *"Sometimes I just open TRASH to see which rooms have low trash freshness. Then I go to those rooms and complete tasks there!"*

---

## Creating Custom Group Categories

**[Robot shows how to make your own]**

### You Can Make Your Own!

**Example custom group categories:**
- 🪟 WINDOWS (all window cleaning tasks)
- 🌿 PLANTS (all plant watering tasks)
- 🐕 PET CARE (all pet-related tasks)
- 🚗 VEHICLE (all car maintenance tasks)
- 🧴 RESTOCK (all supply restocking tasks)

---

### How to Create a Custom Group

1. **Add Category → Select "Custom Group"**

```
┌──────────────────────────────────┐
│  Create New Category             │
├──────────────────────────────────┤
│  Category Type:                  │
│  ( ) Regular Category            │
│  (•) Group Category  ← Select    │
│                                  │
│  Category Name:                  │
│  [____WINDOWS____]               │
│                                  │
│  [ Cancel ]  [ Create ]          │
└──────────────────────────────────┘
```

2. **Add tasks with linking**

Just like TRASH/SWEEP/MOP:
- Add task to group category
- Select which regular category to link to
- Both tasks created automatically

**Robot Speech (TTS):** *"Custom groups work exactly like the built-in ones. Sky's the limit on what you organize!"*

---

## Group Category Strategy

**[Robot gives pro tips]**

### Use Group Categories When:

✅ **You do tasks together**
- "I always take out all trash at once"
- "I sweep the whole house on Saturdays"

✅ **You want quick overview**
- "Show me ALL my trash tasks"
- "Which floors need mopping?"

✅ **You batch similar tasks**
- "I do all windows once a month"
- "Water all plants every Sunday"

---

### Skip Group Categories When:

❌ **Tasks are always separate**
- "I never do all trash at once"
- "Each room gets cleaned on different days"

❌ **Tasks aren't similar**
- Don't force unrelated tasks into a group

**Robot Speech (TTS):** *"Group categories are optional! Only use them if they match YOUR cleaning style!"*

---

## Sorting and Display

**[Robot shows order]**

### Dashboard Order

Group categories typically appear:
1. At the bottom of the dashboard
2. After all regular categories
3. In alphabetical order

```
Dashboard Order:
  Regular Categories:
    - Bathroom
    - Bedroom
    - Kitchen
    - Living Room
  Group Categories:
    - 🧽 MOP
    - 🧹 SWEEP
    - 🗑️ TRASH
```

**Why?**
- Keeps regular rooms at the top
- Group categories are "utility" categories
- Doesn't clutter the main view

---

## Group Category Score

**[Robot explains score calculation]**

Each group category shows a score, but it's calculated differently:

```
Regular Category Score:
  = Average of tasks in that room

Group Category Score:
  = Average of all linked tasks
  = Same as if you calculated average across multiple rooms
```

**Example:**
```
TRASH Group Category:
  Kitchen trash: 80%
  Bedroom trash: 60%
  Bathroom trash: 90%
  Average: 76.7% ≈ 77%

TRASH shows: 77%
```

**But remember:** This score does NOT affect your overall home score!

---

## Deleting Group Categories

**[Robot warns about deletion]**

### What Happens:

```
Delete TRASH category
        ↓
⚠️ Warning: This will delete all linked tasks!

Tasks that will be deleted:
  - TRASH → Kitchen trash ❌
  - Kitchen → Kitchen trash ❌
  - TRASH → Bedroom trash ❌
  - Bedroom → Bedroom trash ❌

[Cancel] [Delete Everything]
```

**Important:**
- Deletes the group category
- Deletes ALL linked tasks in regular categories
- Cannot be undone
- Use caution!

**Robot Speech (TTS):** *"Deleting a group category is serious business! All those linked tasks disappear from regular categories too!"*

---

## Troubleshooting

**[Robot answers questions]**

### Q: Why don't I see group categories?

**Check:**
- Do you have TRASH, SWEEP, or MOP categories?
- They might be created but empty (scroll down)
- They only appear if they exist

---

### Q: Why isn't my group category affecting my overall score?

**Answer:** By design! Group categories never affect overall score.

**Why:**
- Prevents double-counting
- Their tasks already count in regular categories
- Organizational tool only

---

### Q: Can I have a task in multiple group categories?

**No.** Each task can only link to ONE group category and ONE regular category.

**Example:**
- ❌ Can't link "Kitchen trash" to both TRASH and SWEEP
- ✅ Can link "Sweep kitchen" to SWEEP
- ✅ Can link "Kitchen trash" to TRASH

---

### Q: How do I move a task from one group to another?

**You can't move it directly.**

**Workaround:**
1. Delete the linked task (deletes both)
2. Recreate it in the correct group category
3. Link it to the same regular category

---

## What's Next?

You now understand group categories! Next, we'll learn about **Sub-Categories** - a special filtering system for Sweep/Mop/Vacuum tasks!

---

**Tutorial Progress:** Step 10 of 24

**Previous:** Linked Tasks  
**Next:** Sub-Categories

---

## Technical Details (For Implementation)

### Group Category Properties

```javascript
groupCategory = {
    id: 67890,
    name: "TRASH",
    tasks: [...],
    isGroupCategory: true  // Special flag
}
```

### Score Calculation Logic

```javascript
calculateOverallScore() {
    // Filter out group categories
    const standardCategories = this.data.categories.filter(
        cat => !cat.isGroupCategory
    )
    
    // Only average standard categories
    const sum = standardCategories.reduce((acc, cat) => 
        acc + this.calculateCategoryScore(cat), 0
    )
    return Math.round(sum / standardCategories.length)
}
```

### UI Styling

```css
/* Group category card */
.category-card.group {
    background: linear-gradient(135deg, 
        rgba(64, 64, 255, 0.1), 
        rgba(100, 100, 255, 0.2));
    box-shadow: 0 0 20px rgba(64, 64, 255, 0.3);
}

/* Group badge */
.group-badge {
    background: rgba(100, 100, 255, 0.9);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: bold;
}
```

### Robot Animations

- Blue glow effect around group categories
- "Collecting" animation showing tasks gathering
- Batch completion celebration (multiple confetti)
- Synchronized check animations across linked tasks
