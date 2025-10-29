# Streak System 🔥

**Robot Speech (TTS):** *"Streaks track how many days in a row you complete tasks! The longer your streak, the more motivated you'll feel. Let's keep that fire burning!"*

---

## What is a Streak?

**Streak:** Consecutive days you've completed at least one task

**Example:**
```
Monday: Complete 1 task → 1 day streak 🔥
Tuesday: Complete 1 task → 2 day streak 🔥🔥
Wednesday: Skip (no tasks) → Streak broken! Back to 0
Thursday: Complete 1 task → 1 day streak 🔥 (restart)
```

---

## Streak Tracking

**Current Streak:** Your active consecutive days  
**Best Streak:** Your all-time longest streak (never resets)

**Display:**
```
🔥 Current: 7 days
🏆 Best: 23 days
```

---

## How Streaks Update

**Streak continues if:**
- ✅ Complete at least 1 task today
- ✅ Completed at least 1 task yesterday
- ✅ No gap days

**Streak breaks if:**
- ❌ Miss a day (no tasks completed)
- ❌ Gap of 2+ days

**Streak restarts:**
- Complete a task after breaking streak
- Starts at 1 day again

---

## Milestone Celebrations

**Special milestones trigger celebrations:**

- 🔥 **3 days:** "Getting into the groove!"
- 🔥 **7 days:** "One week strong!"
- 🔥 **14 days:** "Two weeks! Impressive!"
- 🔥 **30 days:** "One month! You're unstoppable!"
- 🔥 **100 days:** "Century streak! Legendary!"

**Celebration includes:**
- Sound effect
- Visual confetti
- Special message
- Extra encouragement

---

## Strategy

**Building Streaks:**
1. Complete ONE easy task daily (minimum)
2. Set reminders if needed
3. Use snooze strategically (keeps tasks fresh)
4. Quick tasks: trash, dishes, making bed

**Don't stress:**
- Life happens - streaks can break
- Best streak is always saved
- You can always start a new streak
- Focus on consistency, not perfection

---

## Technical Details

```javascript
streaks: {
    current: 0,      // Active streak
    best: 0,         // All-time best
    lastCompletionDate: null,  // Last task date
    milestones: [3, 7, 14, 30, 100]
}

updateStreak() {
    const today = new Date().toDateString()
    const lastDate = this.streaks.lastCompletionDate
    
    if (lastDate === today) {
        return this.streaks.current // Already counted
    }
    
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (lastDate === yesterday.toDateString()) {
        this.streaks.current++ // Continue streak
    } else {
        this.streaks.current = 1 // Restart
    }
    
    this.streaks.lastCompletionDate = today
    
    if (this.streaks.current > this.streaks.best) {
        this.streaks.best = this.streaks.current
    }
    
    return this.streaks.current
}
```

---

**Tutorial Progress:** Step 15 of 24  
**Previous:** Daily Missions | **Next:** Self-Care Introduction
