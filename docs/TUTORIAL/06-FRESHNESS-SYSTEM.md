# Understanding the Freshness System 📊

**[Robot floats near a task card with a freshness meter]**

**Robot Speech (TTS):** *"Okay, now let me explain one of the coolest parts of UpKeep - the Freshness System! This is what makes UpKeep different from other chore apps. Instead of just checking off tasks, we track how 'fresh' or 'stale' each task is!"*

**Speech Bubble:** "Let's talk about Freshness! 🌟"

---

## What is Freshness?

**Freshness** is a percentage (0% to 100%) that shows how recently a task was completed.

- **100%** = Just completed! Perfectly fresh!
- **50%** = Halfway to needing it again
- **0%** = Really needs to be done!

Think of it like **food freshness**:
- 🥗 100% = Fresh from the grocery store
- 🥙 50% = Still good but getting old
- 🥴 0% = Expired! Time to replace it!

---

## How Freshness Works

### When You Complete a Task

```
Before:  Freshness: 0%  ░░░░░░░░░░░░
             ↓
[Click ✓]
             ↓
After:   Freshness: 100% ████████████ ✨
```

**[Robot celebrates with sparkles]**

**Robot Speech (TTS):** *"When you complete a task, it instantly jumps to 100% freshness! But here's where it gets interesting - it doesn't stay at 100% forever!"*

---

### Automatic Decay (The Magic!)

**[Robot points to a task card showing decay in action]**

After completion, freshness **automatically decreases** over time based on the task's **Decay Time**.

**Example: "Wash dishes" with 1-day decay**

```
Hour 0 (Just completed):  100% ████████████
Hour 6 (1/4 day later):    75% █████████░░░
Hour 12 (1/2 day later):   50% ██████░░░░░░
Hour 18 (3/4 day later):   25% ███░░░░░░░░░
Hour 24 (1 day later):      0% ░░░░░░░░░░░░ ← Time to do it again!
```

**Robot Speech (TTS):** *"See how it smoothly drops from 100% to 0% over exactly one day? That's linear decay! It's perfectly predictable - you always know when a task will need attention!"*

**Speech Bubble:** "Decay is smooth and predictable! ⏱️"

---

## The Math Behind It

**[Robot writes on a chalkboard]**

### Freshness Formula

```
Freshness = 100% - (Time Since Completion / Decay Time) × 100%
```

**Real Example:**
- Task: "Vacuum living room"
- Decay Time: 7 days
- Completed: 3.5 days ago

```
Freshness = 100% - (3.5 days / 7 days) × 100%
Freshness = 100% - (0.5) × 100%
Freshness = 100% - 50%
Freshness = 50%
```

**Robot Speech (TTS):** *"Don't worry about the math - the app does it all for you automatically! I just wanted to show you how precise it is!"*

---

## Visual Freshness Indicators

### Freshness Meter Colors

**[Robot points to different colored bars]**

```
100-75%:  ████████████  Green  "Fresh!"
 75-50%:  ██████░░░░░░  Yellow "Getting Old"
 50-25%:  ███░░░░░░░░░  Orange "Needs Attention"
  0-25%:  ░░░░░░░░░░░░  Red    "Urgent!"
```

**What the colors mean:**
- 🟢 **Green (75-100%)**: You're doing great! Task is still fresh.
- 🟡 **Yellow (50-74%)**: Task is aging but not urgent yet.
- 🟠 **Orange (25-49%)**: Getting stale - do it soon!
- 🔴 **Red (0-24%)**: Very stale - high priority!

---

## Category Scores

**[Robot floats to a category card]**

Each category's score is the **average freshness of all tasks** in that category.

**Example: Kitchen Category**

```
Task 1: Wash dishes      → 80%
Task 2: Wipe counters    → 60%
Task 3: Sweep floor      → 40%
                    Average = 60%
                            ↓
Kitchen Score = 60% (Yellow/Orange)
```

**Robot Speech (TTS):** *"The category score shows you at a glance how that whole room is doing! If it's low, you know that room needs attention."*

---

## Overall Home Score

**[Robot points to the big score at the top]**

Your **Overall Score** is the average of all your regular category scores.

```
Kitchen:       85%
Bathroom:      70%
Bedroom:       90%
Living Room:   75%
            Average = 80%
                    ↓
Overall Score = 80% 🏠
```

**Special Notes:**
- ✅ **Regular categories** count toward overall score
- ❌ **Group categories** (SWEEP/MOP/TRASH) do NOT count
- ❌ **Self-Care** does NOT count
- 🔄 Updates automatically every 60 seconds

---

## Freshness Updates in Real-Time

**Robot Speech (TTS):** *"The best part? You don't have to do anything! UpKeep automatically updates all freshness values every minute. So you can watch tasks decay in real-time!"*

**Update Schedule:**
- Every **60 seconds**, all task freshness recalculates
- Category scores update immediately
- Overall score updates immediately
- Dust bunnies appear/disappear based on scores

---

## Frozen Freshness (During Snooze)

**[Robot points to a snoozed task]**

```
💤 Snoozed Task:
Freshness: 75% (FROZEN) ❄️
Will resume decay in 2h 30m
```

**Special Rule:**
When a task is **snoozed**, its freshness **freezes** at the current value!

- ✅ Freshness stays locked at 75% (or whatever it was)
- ⏸️ Decay pauses completely
- ❄️ The frozen value is saved
- 🔄 When unsnoozed, decay resumes from that same value

**Robot Speech (TTS):** *"Think of snooze like putting food in the freezer - it stops aging until you take it out!"*

### MAJOR TIP: Freeze decay to reduce stress
- Right after completing a task, auto-snooze keeps freshness from instantly dropping.
- Need extra breathing room? Tap `Snooze` and choose a longer pause.
- See Step 7: “Snooze Feature” for rules, best practices, and stress-free usage.

---

## What Happens at 0% Freshness?

**[Robot looks concerned at a 0% task]**

When freshness hits **0%**:

1. ❌ Task turns **red** (urgent!)
2. 📉 Category score drops
3. 📊 Overall score affected
4. 🐰 **More dust bunnies** appear on category card
5. 😟 Robot looks worried

**But nothing breaks!**
- Tasks don't disappear
- No penalties or punishments
- Just visual indicators showing it needs attention

**Robot Speech (TTS):** *"Don't stress if tasks hit 0%! There's no punishment. It's just a reminder that you should probably do that chore soon. Real life gets busy - I understand!"*

---

## Freshness Best Practices

**[Robot gives encouraging tips]**

### Setting Realistic Decay Times

Match decay times to **your actual habits**:

❌ **Don't set what you "should" do:**
- "I should vacuum every day" (unrealistic)

✅ **Set what you actually do:**
- "I realistically vacuum once a week"

**Robot Speech (TTS):** *"Be honest with yourself! UpKeep works best when decay times match YOUR real routine, not some perfect ideal!"*

### ⚠️ IMPORTANT: The Buffer Zone Strategy

**[Robot leans in with important advice]**

**This is CRITICAL for a good experience!**

If you do a task once every 7 days (1 week), **DON'T set the decay period to exactly 7 days!**

Instead, **add a buffer of 2-3 days**:

❌ **Bad:** Task done weekly → 7-day decay  
✅ **Good:** Task done weekly → 9-10 day decay

**Why this matters:**

```
Exact Match (7-day decay):
Day 0: Complete task → 100% ✨
Day 7: Do it again → 100% ✨
Day 8: Miss by 1 day → 0% 🔴 PANIC!

With Buffer (9-day decay):
Day 0: Complete task → 100% ✨
Day 7: Do it again → 78% 🟢 Still good!
Day 8: Miss by 1 day → 67% 🟡 No stress!
Day 9: Still have time → 56% 🟡 Comfortable!
```

**Real-world example:**
- You vacuum every Saturday
- Life happens - you skip one Saturday
- With 7-day decay: Task hits 0%, looks urgent, feels stressful
- With 9-10 day decay: Task is still yellow/green, no panic!

**Robot Speech (TTS):** *"Life isn't perfectly scheduled! Give yourself breathing room. If you miss a task by a day or two, it shouldn't look like a disaster. The buffer keeps things realistic and stress-free!"*

**Recommended buffers:**
- Daily tasks (1 day) → Set 1.5-2 days decay
- Weekly tasks (7 days) → Set 9-10 days decay  
- Bi-weekly tasks (14 days) → Set 16-18 days decay
- Monthly tasks (30 days) → Set 35-40 days decay

**Speech Bubble:** "Buffer = Less stress! 🎯"

### Common Decay Times by Task Type

| Task Type | Typical Decay Time |
|-----------|-------------------|
| Dishes, wiping counters | 1 day |
| Making bed, tidying up | 1-2 days |
| Bathroom cleaning | 3-7 days |
| Vacuuming, mopping | 1 week |
| Dusting, windows | 2 weeks |
| Deep cleaning | 3-4 weeks |
| Decluttering, organizing | 1-3 months |
| Seasonal tasks | 3-6 months |

### Adjusting Decay Times

**You can always change them!**

If you find a task is:
- Always red/urgent → Increase decay time
- Always green/fresh → Decrease decay time
- Just right → Leave it!

**How to edit:**
1. Click the task card
2. Click edit/pencil icon
3. Change decay time
4. Save changes

---

## Advanced: Decay Math for Nerds 🤓

**[Robot puts on tiny glasses]**

**Robot Speech (TTS):** *"For those who love math, here are the exact calculations UpKeep uses behind the scenes!"*

### Decay Rate Calculation

```javascript
// Decay Time in milliseconds
decayMs = decayValue × timeUnit

Examples:
- 1 day = 1 × 86,400,000 ms = 86,400,000 ms
- 1 week = 7 × 86,400,000 ms = 604,800,000 ms
- 1 month = 30 × 86,400,000 ms = 2,592,000,000 ms

// Time Since Completion
timeSinceMs = Date.now() - lastCompleted

// Freshness Calculation
freshness = 100 - ((timeSinceMs / decayMs) × 100)

// Clamp to 0-100 range
if (freshness < 0) freshness = 0
if (freshness > 100) freshness = 100
```

### Update Frequency

```javascript
// Freshness updates every 60 seconds
setInterval(() => updateAllFreshness(), 60000)
```

---

## Try It Yourself!

**[Robot bounces with excitement]**

**Robot Speech (TTS):** *"Want to see decay in action? Complete a task right now, then watch the freshness bar slowly decrease over time! It's mesmerizing!"*

**Experiment:**
1. Complete a task with a short decay time (like 1 hour)
2. Watch the freshness bar
3. Check back in 30 minutes → Should be at 50%
4. Check again in 1 hour → Should be at 0%

---

## What's Next?

Now that you understand freshness decay, let's learn about the **Snooze Feature** - a way to pause decay temporarily!

---

**Tutorial Progress:** Step 6 of 24

**Previous:** Completing Tasks  
**Next:** Snooze Feature

---

## Technical Details (For Implementation)

### Code References

```javascript
// Main freshness update loop
updateDecay() {
    this.data.categories.forEach(category => {
        category.tasks.forEach(task => {
            if (task.lastCompleted && !task.snoozedUntil) {
                const timeSince = Date.now() - task.lastCompleted
                const freshness = 100 - ((timeSince / task.decayMs) * 100)
                task.freshness = Math.max(0, Math.min(100, freshness))
            }
        })
    })
}

// Runs every 60 seconds
setInterval(() => this.updateDecay(), 60000)
```

### UI Elements to Highlight

1. Task freshness meter (`.freshness-bar`)
2. Freshness percentage text
3. Color changes (green → yellow → orange → red)
4. Category score card
5. Overall score display
6. Real-time decay animation (optional)

### Robot Animations

- Point to freshness meter
- Show concern at low freshness
- Celebrate at high freshness
- "Freeze" animation when explaining snooze

### Interactive Demo (Optional)

Create a mock task with 1-minute decay time to show decay happening in real-time during tutorial.
