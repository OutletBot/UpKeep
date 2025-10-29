# Linked Tasks 🔗

**[Robot shows two task cards connected by a glowing link]**

**Robot Speech (TTS):** *"Okay, this is a SUPER cool feature! Linked Tasks let you have the same task appear in multiple places - and they stay perfectly synchronized! When you complete one, the other updates automatically. It's like magic!"*

**Speech Bubble:** "Linked tasks sync automatically! ✨🔗"

---

## What are Linked Tasks?

**Linked Tasks** are tasks that exist in **two categories at once** and stay **perfectly synchronized**.

**Think of them like twins:**
- What happens to one happens to the other
- They share the same completion status
- They have the same freshness percentage
- Completing one completes both

---

## Why Use Linked Tasks?

**[Robot shows a real-world example]**

### The Problem (Without Linking)

```
Kitchen Category:
  ☐ Take out kitchen trash (55% fresh)

Bedroom Category:
  ☐ Take out bedroom trash (40% fresh)

Living Room Category:
  ☐ Take out living room trash (62% fresh)
```

**Issues:**
- 😩 Three separate tasks to track
- 😩 Have to complete each individually
- 😩 Can't see all trash tasks together
- 😩 Inefficient when you do all trash at once

---

### The Solution (With Linking)

```
Regular Categories:
  Kitchen → "Kitchen trash" (linked) 🔗
  Bedroom → "Bedroom trash" (linked) 🔗
  Living Room → "Living room trash" (linked) 🔗
          ↓ (all link to) ↓
Group Category:
  TRASH → Shows all 3 trash tasks together!
```

**Benefits:**
- ✅ See all trash tasks in one place
- ✅ Complete them all at once
- ✅ Each regular category still tracks its own task
- ✅ Everything stays in sync automatically

**Robot Speech (TTS):** *"This is perfect for tasks you do together! Like taking out all the trash, or sweeping all the floors at the same time!"*

---

## How Linked Tasks Work

**[Robot draws a diagram]**

### Task Synchronization

When you complete a linked task in ANY location, it updates EVERYWHERE:

```
Step 1: Complete "Kitchen trash" in Kitchen category
        ↓
Step 2: Task completion syncs to TRASH group category
        ↓
Step 3: Both tasks now show:
        - ☑ Checked
        - 100% freshness
        - Same "Last completed" time
        - Same snooze status
```

**Robot Speech (TTS):** *"It doesn't matter where you complete it - Kitchen or TRASH category. Both update instantly!"*

---

## Creating Linked Tasks

**[Robot demonstrates the process]**

Linked tasks are created automatically when you add a task to a **Group Category** (TRASH, SWEEP, MOP).

### Step 1: Open a Group Category

```
Dashboard → Click "TRASH" category card
```

**Group categories have a special blue glow:**
```
┌─────────────────────────┐
│ 🗑️ TRASH        75%    │ ← Blue glow
│ █████████░░░░░░        │
│ [GROUP]                │ ← Group badge
└─────────────────────────┘
```

---

### Step 2: Add a Task to the Group Category

```
Click [+ Add Task]

Fill out the form:
- Task Name: "Kitchen trash"
- Decay: 3 days
- **Linked Category:** Kitchen ← IMPORTANT!
```

**[Robot points to the "Linked Category" dropdown]**

**Robot Speech (TTS):** *"See that 'Linked Category' dropdown? This tells UpKeep which regular category this task belongs to. This is what creates the link!"*

---

### Step 3: Two Tasks Are Created!

```
1. Group Category (TRASH):
   ☐ Kitchen trash (linked to Kitchen) 🔗

2. Regular Category (Kitchen):
   ☐ Kitchen trash (linked to TRASH) 🔗
```

**Both tasks:**
- ✅ Share the same name
- ✅ Share the same decay time
- ✅ Have a 🔗 LINKED badge
- ✅ Stay synchronized forever

**[Robot celebrates with sparkles]**

**Robot Speech (TTS):** *"And that's it! You now have a linked task! One task, two locations, zero confusion!"*

---

## Visual Indicators

**[Robot points to the badges]**

### Linked Task Badge

```
┌─────────────────────────────────────┐
│ ☐ Kitchen trash  🔗 LINKED          │ ← Badge
│ Last: 2 days ago                    │
│ Freshness: 55% ███████░░░░░         │
└─────────────────────────────────────┘
```

**The 🔗 LINKED badge shows:**
- This task is linked to another category
- Changes will sync automatically
- You can complete it from either location

---

### Group Category Badge

```
┌─────────────────────────────────────┐
│ 🗑️ TRASH              [GROUP] 75%   │ ← Group badge
│ ████████████░░░░                    │
└─────────────────────────────────────┘
```

**Group categories are special:**
- Blue glow around the card
- [GROUP] badge in corner
- Don't affect overall home score
- Designed for collecting linked tasks

---

## Synchronization Rules

**[Robot explains what syncs and what doesn't]**

### What DOES Sync:

✅ **Task Completion**
- Check one → Both checked
- Freshness updates on both

✅ **Freshness Percentage**
- Always identical
- Updates every 60 seconds

✅ **Last Completed Time**
- Same timestamp on both

✅ **Snooze Status**
- Snooze one → Both snoozed
- Resume one → Both resumed
- Same countdown timer

✅ **Name Changes**
- Rename one → Both renamed

✅ **Decay Time Changes**
- Change one → Both change

---

### What DOESN'T Sync:

❌ **Task Steps (ABC)**
- Each task has independent steps
- Can have different steps for context

❌ **Sub-Categories**
- Only relevant for "Sweep/Mop/Vacuum" tasks

**Robot Speech (TTS):** *"Most things sync, but steps stay independent. That way you can have different checklists in different contexts if you want!"*

---

## Completing Linked Tasks

**[Robot shows different scenarios]**

### Scenario 1: Complete from Regular Category

```
Kitchen Category:
  ☐ Kitchen trash → [Click ✓]
           ↓
  ☑ Kitchen trash (100% fresh) ✨
           ↓ (syncs to) ↓
TRASH Category:
  ☑ Kitchen trash (100% fresh) ✨
```

**Robot Speech (TTS):** *"Complete it in the Kitchen, and it automatically updates in TRASH too!"*

---

### Scenario 2: Complete from Group Category

```
TRASH Category:
  ☐ Kitchen trash → [Click ✓]
           ↓
  ☑ Kitchen trash (100% fresh) ✨
           ↓ (syncs to) ↓
Kitchen Category:
  ☑ Kitchen trash (100% fresh) ✨
```

**Robot Speech (TTS):** *"Works the other way too! Complete it in TRASH, and Kitchen updates!"*

---

### Scenario 3: Complete All in Group Category

```
TRASH Category (group):
  ☐ Kitchen trash
  ☐ Bedroom trash
  ☐ Living room trash

[Click "COMPLETE ALL TRASH TASKS"]
           ↓
All 3 complete in TRASH category
           ↓ (syncs to) ↓
All 3 complete in their regular categories too!
```

**[Robot celebrates with confetti]**

**Robot Speech (TTS):** *"This is the REAL power of linked tasks! You can complete them all at once in the group category, and every regular category updates automatically!"*

---

## Snoozing Linked Tasks

**[Robot demonstrates snooze sync]**

### Snooze Synchronization

When you snooze a linked task:

```
Snooze in Kitchen:
  Kitchen trash → [Snooze 3 hours]
           ↓
  💤 Snoozed - 3h remaining
           ↓ (syncs to) ↓
TRASH category:
  💤 Snoozed - 3h remaining
```

**Robot Speech (TTS):** *"Snooze status syncs too! So if you snooze trash in your Kitchen, it's also snoozed in the TRASH group. Makes sense, right?"*

---

### Resume Synchronization

```
Resume in TRASH:
  Kitchen trash → [Resume]
           ↓
  ⏰ Decay resumes
           ↓ (syncs to) ↓
Kitchen category:
  ⏰ Decay resumes
```

**Everything stays in sync:**
- Snooze time remaining
- Frozen freshness value
- Resume action

---

## Editing Linked Tasks

**[Robot shows edit menu]**

### Name Changes

```
Edit "Kitchen trash" to "Kitchen garbage"
           ↓
Both tasks rename automatically:
- Kitchen: "Kitchen garbage" 🔗
- TRASH: "Kitchen garbage" 🔗
```

---

### Decay Time Changes

```
Change decay from 3 days to 1 week
           ↓
Both tasks update:
- New decay: 1 week
- Freshness recalculates
- Both stay in sync
```

**Robot Speech (TTS):** *"Any edits you make apply to both tasks. You can't have mismatched decay times - they always match!"*

---

## Deleting Linked Tasks

**[Robot shows delete warning]**

### Delete Confirmation

```
Delete "Kitchen trash"
           ↓
⚠️ Warning: This will delete the linked task too!
- Kitchen: "Kitchen trash" ← WILL BE DELETED
- TRASH: "Kitchen trash" ← WILL BE DELETED
           ↓
[Cancel] [Delete Both]
```

**Important:**
- Deleting one deletes BOTH
- Can't delete just one side
- Linked tasks are a package deal

**Robot Speech (TTS):** *"Deleting is permanent and affects both tasks. Be careful!"*

---

## The Three Group Categories

**[Robot introduces the built-in groups]**

### 1. 🗑️ TRASH

**Purpose:** Collect all trash tasks

**Common linked tasks:**
- Kitchen trash
- Bedroom trash
- Bathroom trash
- Living room trash
- Office trash

**Why it's useful:**
- Take out all trash at once
- See which rooms need emptying
- Complete all together

---

### 2. 🧹 SWEEP

**Purpose:** Collect all sweeping tasks

**Common linked tasks:**
- Sweep kitchen floor
- Sweep bedroom floor
- Sweep porch
- Sweep garage

**Why it's useful:**
- Sweep entire house in one session
- Track sweeping across all rooms
- Batch sweeping tasks together

---

### 3. 🧽 MOP

**Purpose:** Collect all mopping tasks

**Common linked tasks:**
- Mop kitchen floor
- Mop bathroom floor
- Mop entryway
- Mop laundry room

**Why it's useful:**
- Mop entire house efficiently
- See all floors that need mopping
- Do all mopping at once

**Robot Speech (TTS):** *"These three group categories cover the most common tasks people do all at once. Trash, sweeping, and mopping!"*

---

## Using Group Categories Effectively

**[Robot gives strategy tips]**

### Strategy 1: Complete in Groups

**Best for:**
- Tasks you naturally do together
- Weekly cleaning sessions
- Efficient batch processing

**How:**
1. Open group category (TRASH, SWEEP, MOP)
2. See all related tasks
3. Do them all
4. Click "Complete All"
5. Every regular category updates

---

### Strategy 2: Complete Individually

**Best for:**
- Daily maintenance
- Spot cleaning
- One room at a time

**How:**
1. Work in regular categories (Kitchen, Bedroom, etc.)
2. Complete tasks as needed
3. Group category automatically stays updated

---

### Strategy 3: Hybrid Approach

**Most people do this:**
- Use regular categories for daily tasks
- Use group categories for weekly "power hours"
- Mix and match based on your energy level

**Robot Speech (TTS):** *"There's no wrong way to use it! The system adapts to however YOU want to clean!"*

---

## Linked Tasks vs Regular Tasks

**[Robot compares]**

### When to Use Linked Tasks:

✅ **Tasks you do together**
- All trash at once
- All floors at once
- All windows at once

✅ **Tasks in multiple locations**
- Trash in every room
- Sweeping in every room
- Dusting in every room

---

### When to Use Regular Tasks:

✅ **Unique, location-specific tasks**
- "Cook dinner" (only in Kitchen)
- "Make bed" (only in Bedroom)
- "Clean toilet" (only in Bathroom)

✅ **Tasks with different schedules**
- Some rooms need more frequent attention
- Different decay times per location

**Robot Speech (TTS):** *"If you do a task in just ONE place, it doesn't need to be linked. But if you do it EVERYWHERE and want to batch them, linking is perfect!"*

---

## Troubleshooting

**[Robot answers common questions]**

### Q: Why isn't my task syncing?

**Check:**
1. Does it have the 🔗 LINKED badge?
2. Is it actually a linked task (created from group category)?
3. Try completing it again

**If still not working:**
- Task might have been created incorrectly
- Delete and recreate with proper linking

---

### Q: Can I unlink a task?

**No, not directly.**
- Once linked, always linked
- To "unlink": Delete the linked task
- Create a new regular task instead

---

### Q: Can I link tasks to custom group categories?

**Yes!**
- Create a custom group category
- Add tasks with linked categories
- Works the same as TRASH/SWEEP/MOP

---

### Q: Do linked tasks affect my overall score?

**Only the regular category task counts:**
- Kitchen trash → Counts toward Kitchen score
- TRASH category → Does NOT affect overall score
- Group categories never affect overall home score

---

## Technical Details

**[Robot puts on glasses]**

### Link Data Structure

```javascript
// Task in regular category
regularTask = {
    id: 12345,
    name: "Kitchen trash",
    linkedCategoryId: 67890,  // Points to TRASH category
    linkedTaskId: 54321       // Points to group task
}

// Task in group category
groupTask = {
    id: 54321,
    name: "Kitchen trash",
    linkedCategoryId: 11111,  // Points to Kitchen category
    linkedTaskId: 12345       // Points to regular task
}
```

### Sync Function

```javascript
syncLinkedTaskCompletion(taskId) {
    const sourceTask = findTask(taskId)
    
    // Find all linked tasks
    for (const category of this.data.categories) {
        for (const task of category.tasks) {
            if (task.linkedTaskId === taskId || 
                sourceTask.linkedTaskId === task.id) {
                // Sync properties
                task.lastCompleted = sourceTask.lastCompleted
                task.freshness = 100
                // Apply auto-snooze
                if (autoSnoozeEnabled) {
                    task.snoozedUntil = sourceTask.snoozedUntil
                    task.frozenFreshness = sourceTask.frozenFreshness
                }
            }
        }
    }
}
```

---

## What's Next?

Now you understand linked tasks! Next, let's dive deeper into **Group Categories** and how they organize your linked tasks!

---

**Tutorial Progress:** Step 9 of 24

**Previous:** Task Steps  
**Next:** Group Categories

---

## Technical Details (For Implementation)

### UI Elements

- 🔗 LINKED badge on task cards
- [GROUP] badge on category cards
- Blue glow effect on group categories
- Linked category dropdown in add task modal
- "Complete All" button for group categories

### Robot Animations

- "Connecting" animation showing link between tasks
- Synchronized check animations on both tasks
- Celebration when completing multiple linked tasks
- "Sync" animation showing data flowing between tasks

### Code References

```javascript
// Create linked tasks
createLinkedTasks(groupCategory, linkedCategoryId, taskData) {
    const groupTask = { ...taskData, linkedCategoryId, linkedTaskId: null }
    const regularTask = { ...taskData, linkedCategoryId: groupCategory.id, linkedTaskId: null }
    
    // Add both tasks
    groupCategory.tasks.push(groupTask)
    linkedCategory.tasks.push(regularTask)
    
    // Link them
    groupTask.linkedTaskId = regularTask.id
    regularTask.linkedTaskId = groupTask.id
}
```
