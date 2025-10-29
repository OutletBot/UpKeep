# The Snooze Feature 💤

**[Robot floats near a task with a snooze button]**

**Robot Speech (TTS):** *"Alright, now let me show you one of my FAVORITE features - the Snooze system! This is what keeps UpKeep from being stressful. Life gets busy, and sometimes you need a break. That's what snooze is for!"*

**Speech Bubble:** "Time to learn about Snooze! 😌"

---

## What is Snooze?

**Snooze** temporarily **pauses** a task's freshness decay, giving you breathing room after completing it (or when you just need a break).

**Think of it like:**
- ❄️ Putting food in the freezer (stops aging)
- ⏸️ Pausing a video game
- 🛑 Hitting the snooze button on an alarm

---

## Two Types of Snooze

### 1. Auto-Snooze (Automatic)

**[Robot points to a freshly completed task]**

When you **complete a task**, it automatically snoozes for a short time!

```
[Complete Task ✓]
        ↓
💤 Auto-Snoozed for 3 hours
Freshness: 100% (FROZEN ❄️)
```

**Why?**
- Gives you time to enjoy the clean space
- Prevents immediate re-decay stress
- Rewards you for completing the task

**Robot Speech (TTS):** *"When you finish washing dishes, you don't want to see them immediately start getting 'stale' again, right? Auto-snooze gives you a few hours to relax!"*

---

### 2. Manual Snooze (You Choose)

**[Robot highlights the 💤 Snooze button]**

Click the **💤 Snooze** button on any task to pause it manually!

```
Task: Vacuum living room
Freshness: 45% ██████░░░░░░

[Click 💤 Snooze]
        ↓
How long?
[3 Hours] [1 Day] [3 Days] [1 Week]
```

**When to use manual snooze:**
- 🎉 Having guests over (ignore cleaning for a bit)
- 🏖️ Going on vacation (pause everything)
- 🤒 Sick or injured (need a break)
- 🛠️ Renovations (can't access that area)
- 🤷 Just not feeling it today

**Robot Speech (TTS):** *"Sometimes life happens! There's no shame in hitting snooze. I'll never judge you for it!"*

---

## Auto-Snooze Rules (The Smart System!)

**[Robot draws a chart]**

When you complete a task, UpKeep automatically chooses the snooze duration based on the task's **decay time**:

### The Rules (In Order)

```
╔═══════════════════════════════════════════════════╗
║  Task Decay Time  →  Auto-Snooze Duration         ║
╠═══════════════════════════════════════════════════╣
║  1️⃣  11 months or more     →  1 week (168 hours)  ║
║  2️⃣  1 week or more        →  24 hours            ║
║  3️⃣  More than 24 hours    →  8 hours             ║
║  4️⃣  24 hours or less      →  3 hours             ║
╚═══════════════════════════════════════════════════╝
```

**Examples:**

| Task | Decay Time | Auto-Snooze |
|------|------------|-------------|
| Change HVAC filter | 6 months | **1 week** ⏰ |
| Organize closet | 2 months | **1 week** ⏰ |
| Vacuum living room | 1 week | **24 hours** ⏰ |
| Clean bathroom | 3 days | **8 hours** ⏰ |
| Wash dishes | 1 day | **3 hours** ⏰ |

**Robot Speech (TTS):** *"See how smart it is? Big tasks that you do rarely get longer breaks. Daily tasks get shorter breaks. It just makes sense!"*

---

## What Happens During Snooze?

**[Robot points to a snoozed task card]**

```
┌─────────────────────────────────────┐
│ ☑ Wash dishes                  ✨   │
│ Last: Just now                      │
│ Decay: 1 day                        │
│ Freshness: 100% ████████████        │ ← FROZEN!
│                                     │
│ 💤 Snoozed - 2h 47m remaining      │ ← Countdown
│ [Resume] ← Button to end snooze    │
└─────────────────────────────────────┘
```

### While Snoozed:

1. ❄️ **Freshness FREEZES** - Stays at current percentage
2. ⏸️ **Decay PAUSES** - Time stops for this task
3. ⏱️ **Countdown Timer** - Shows remaining snooze time
4. 💤 **Visual Indicator** - Task card shows snooze icon
5. 📊 **Score Impact** - Category still uses frozen freshness in calculations

**Robot Speech (TTS):** *"Think of snooze like putting the task in a time capsule. When it comes out, it's exactly as fresh as when you put it in!"*

---

## Resume (Unsnooze) Button

**[Robot points to Resume button]**

Want to end the snooze early?

```
💤 Snoozed task
↓
[Click Resume]
↓
⏰ Decay resumes from frozen value
```

**When to Resume:**
- You did the task manually (without checking it off first)
- Vacation ended early
- You're ready to get back to your routine
- Accidentally snoozed the wrong task

**Robot Speech (TTS):** *"The Resume button gives you full control. Snooze for as long or short as you want!"*

---

## Frozen Freshness Explained

**[Robot explains with ice cube animation]**

### How It Works:

```
Step 1: Task is at 75% freshness
        Freshness: 75% ████████░░░

Step 2: You hit Snooze
        task.frozenFreshness = 75  ← Saved!
        task.snoozedUntil = Date.now() + snoozeTime

Step 3: During snooze (freshness locked)
        Freshness: 75% ████████░░░ ❄️ (FROZEN)
        (Time passes but freshness doesn't change)

Step 4: Snooze ends or you click Resume
        Freshness: 75% ████████░░░ ← Still 75%!
        Decay resumes normally from here
```

**Robot Speech (TTS):** *"The frozen freshness is stored separately so we know exactly where to resume from. No math errors, perfectly preserved!"*

---

## Linked Tasks & Snooze

**[Robot shows two linked tasks]**

**Special Behavior:** When you snooze/unsnooze a **linked task**, all its linked counterparts snooze/unsnooze too!

### Example: Trash Tasks

```
Regular Category: Kitchen
  └─ Task: "Kitchen trash" (linked to TRASH group)
             ↓ [Snooze]
Group Category: TRASH  
  └─ Task: "Kitchen trash" (auto-snoozed too!)
```

**Why?**
- Prevents confusion (task showing differently in two places)
- Keeps everything synchronized
- Works both ways (snooze in either place)

**Robot Speech (TTS):** *"Linked tasks are like twins - whatever happens to one happens to the other!"*

---

## Complete All & Snooze

**[Robot points to Complete All button]**

When you use **Complete All** on a group category:

```
TRASH Category:
  ✓ Kitchen trash (unsnoozed)  → Will be completed ✅
  ✓ Bathroom trash (unsnoozed) → Will be completed ✅
  💤 Bedroom trash (snoozed)   → LEFT ALONE ⏭️
```

**Rule:** Complete All only affects **unsnoozed tasks**!

**Why?**
- Snoozed tasks are "on pause" for a reason
- Respects your decision to snooze
- Prevents accidentally completing tasks you meant to skip

---

## Snooze Best Practices

**[Robot gives helpful tips]**

### When to Use Manual Snooze

✅ **Good Reasons:**
- Going on vacation
- Renovations/repairs blocking access
- Seasonal tasks (don't need snow shoveling in summer)
- Temporary circumstances (injury, illness)
- Hosting events (don't want tasks nagging you)

❌ **Avoid Abuse:**
- Don't snooze everything permanently
- If a task is always snoozed, maybe delete it?
- Don't use snooze as a "complete" button
- Be honest with yourself about why you're snoozing

**Robot Speech (TTS):** *"Snooze is a tool, not a cheat code! Use it when you genuinely need a break, not to hide from chores forever!"*

---

### Snooze Duration Guidelines

**Short Term (3-8 hours):**
- Quick break after completing
- Waiting for something to dry/set
- Taking a mental health break today

**Medium Term (1-3 days):**
- Weekend trips
- Busy work week
- Short vacations

**Long Term (1 week+):**
- Vacation
- Home renovations
- Seasonal transitions
- Major life events

---

## Auto-Snooze vs Manual Snooze

**[Robot shows comparison chart]**

| Feature | Auto-Snooze | Manual Snooze |
|---------|-------------|---------------|
| **Trigger** | Automatic (on complete) | Manual (you click) |
| **Duration** | Based on decay time | You choose |
| **Purpose** | Post-completion break | Custom pause |
| **Frequency** | Every completion | As needed |
| **Can Cancel?** | Yes (Resume button) | Yes (Resume button) |

---

## Visual Indicators

**[Robot points to UI elements]**

### Snoozed Task Appearance

```
┌─────────────────────────────────────┐
│ ☑ Task Name                    💤   │ ← Snooze icon
│ Freshness: 85% ███████████░ ❄️     │ ← Freeze icon
│ 💤 Snoozed - 4h 23m remaining      │ ← Timer
│ [Resume]                            │ ← Action
└─────────────────────────────────────┘
```

### Dashboard Category Card

```
┌─────────────────────────┐
│  Kitchen        78% 🍽️  │
│  ████████████░░░        │
│  💤 2 tasks snoozed     │ ← Shows count
└─────────────────────────┘
```

---

## Snooze Mechanics (Technical Deep Dive)

**[Robot puts on professor glasses]**

### How Snooze is Stored

```javascript
task = {
    name: "Wash dishes",
    freshness: 75,
    snoozedUntil: 1698765432000,  // Timestamp
    frozenFreshness: 75,           // Saved value
    lastCompleted: 1698761832000
}
```

### Snooze Detection

```javascript
isSnoozed = task.snoozedUntil && task.snoozedUntil > Date.now()
```

### Remaining Time Calculation

```javascript
if (task.snoozedUntil) {
    const remaining = task.snoozedUntil - Date.now()
    const hours = Math.floor(remaining / (1000 * 60 * 60))
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
    display = `${hours}h ${minutes}m remaining`
}
```

### Resume Action

```javascript
unsnoozeTask(taskId) {
    const task = findTask(taskId)
    task.freshness = task.frozenFreshness  // Restore
    delete task.snoozedUntil
    delete task.frozenFreshness
    syncLinkedTaskSnooze(taskId, false)  // Sync linked tasks
}
```

---

## What's Next?

Now you understand snooze! Next, we'll learn about breaking tasks into smaller steps with the **ABC Steps** feature!

---

**Tutorial Progress:** Step 7 of 24

**Previous:** Freshness System  
**Next:** Task Steps (ABC System)

---

## Technical Details (For Implementation)

### Code References

```javascript
// Auto-snooze on complete
toggleTask(taskId) {
    task.freshness = 100
    task.lastCompleted = Date.now()
    
    if (autoSnoozeEnabled) {
        const decayTimeHours = task.decayMs / (60 * 60 * 1000)
        let snoozeHours
        
        if (decayTimeHours >= 7920) {
            // Rule 1: 11 months or more → 1 week snooze
            snoozeHours = 168
        } else if (decayTimeHours >= 168) {
            // Rule 2: 1 week or more → 24-hour snooze
            snoozeHours = 24
        } else if (decayTimeHours <= 24) {
            // Rule 3: 24 hours or less → 3-hour snooze
            snoozeHours = 3
        } else {
            // Rule 4: More than 24 hours AND less than 1 week → 8-hour snooze
            snoozeHours = 8
        }
        
        task.snoozedUntil = Date.now() + (snoozeHours * 60 * 60 * 1000)
        task.frozenFreshness = task.freshness
    }
}

// Manual snooze
snoozeTask(taskId, hours) {
    const task = findTask(taskId)
    task.snoozedUntil = Date.now() + (hours * 60 * 60 * 1000)
    task.frozenFreshness = task.freshness
    syncLinkedTaskSnooze(taskId, true)
}

// Resume/unsnooze
unsnoozeTask(taskId) {
    const task = findTask(taskId)
    if (task.frozenFreshness !== undefined) {
        task.freshness = task.frozenFreshness
    }
    delete task.snoozedUntil
    delete task.frozenFreshness
    syncLinkedTaskSnooze(taskId, false)
}
```

### UI Elements to Highlight

1. 💤 Snooze button on task cards
2. Resume button on snoozed tasks
3. Snooze duration selector modal
4. Countdown timer display
5. Frozen freshness indicator (❄️ icon)
6. Snoozed task count on category cards

### Robot Animations

- "Sleep" animation when explaining snooze
- "Freeze" animation for frozen freshness
- "Alarm clock" animation for resume
- Concerned look when seeing abuse of snooze
