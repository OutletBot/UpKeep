# Bulk Task Completion ⚡

**Robot Speech (TTS):** *"Complete All buttons let you finish multiple tasks at once! Perfect for cleaning days when you tackle a whole category or group!"*

---

## Complete All Buttons

**Two Types:**

### 1. Complete All in Group Categories
**Location:** TRASH, SWEEP, MOP categories

**Button:** "COMPLETE ALL [TYPE] TASKS"

**What it does:**
- Completes ALL unsnoozed tasks in the group
- Syncs to regular categories (linked tasks)
- Applies auto-snooze to each task
- Shows total bolts earned
- Celebration animation

**Example:**
```
TRASH Group:
  ☐ Kitchen trash
  ☐ Bedroom trash
  💤 Bathroom trash (snoozed)

[Click Complete All Trash Tasks]
        ↓
Kitchen ✓ (100%, snoozed 24h)
Bedroom ✓ (100%, snoozed 24h)
Bathroom still snoozed (untouched)
```

---

### 2. Complete All in Sub-Categories
**Location:** SWEEP, MOP, VACUUM filtered views

**Button:** "COMPLETE ALL [SUBTYPE] TASKS"

**What it does:**
- Completes all tasks in that sub-category filter
- Only affects tasks shown in current view
- Respects snooze (skips snoozed tasks)

**Example:**
```
Sweep/Mop/Vacuum → [SWEEP] view
Shows only sweep tasks

[Click Complete All Sweep Tasks]
        ↓
All sweep tasks complete
Mop and vacuum tasks unaffected
```

---

## Rules & Behavior

**Important Rules:**

1. **Only Unsnoozed Tasks**
   - Snoozed tasks are skipped
   - Respects your snooze decisions
   - Won't override manual snooze

2. **Confirmation Required**
   - Shows count of tasks
   - Confirms action
   - Can cancel

3. **Auto-Snooze Applies**
   - All tasks get auto-snoozed
   - Based on individual decay times
   - Prevents immediate re-urgency

4. **Linked Task Sync**
   - Updates both locations
   - Group + regular category
   - Everything stays synchronized

---

## When to Use

**Perfect for:**
- ✅ Trash day (complete all trash)
- ✅ Sweeping entire house
- ✅ Mopping all floors
- ✅ Weekend cleaning spree
- ✅ Catching up after vacation

**Not ideal for:**
- ❌ Tasks not actually done
- ❌ Selective completion
- ❌ Mixed urgency tasks
- ❌ When you want to track individual progress

---

## Gamification Impact

**Bolts Earned:**
- Daily mission progress counts
- If 4+ tasks: Completes "4 chores" mission
- Each completion contributes
- Can earn mission rewards instantly

**Streak:**
- Counts as completing tasks
- Maintains daily streak
- Multiple tasks = still one day

---

## Visual Feedback

**Success Message:**
```
🎉 Completed 3 tasks!
⚡ Earned mission progress
Total cleanup time saved: 15 minutes
```

**Shows:**
- Number of tasks completed
- Estimated time saved
- Bolt rewards (if applicable)
- Celebration confetti

---

## Bulk Completion Strategy

**Efficient Workflow:**
1. Do all similar tasks (e.g., sweep all rooms)
2. Open relevant group/sub-category
3. Click Complete All
4. Confirm
5. Get satisfaction of bulk completion!

**Time Savings:**
- No clicking individual checkboxes
- Instant gratification
- Batch completion reward feeling
- Efficient for power cleaning sessions

---

**Tutorial Progress:** Step 21 of 24  
**Previous:** Activity Log | **Next:** Category Scores
