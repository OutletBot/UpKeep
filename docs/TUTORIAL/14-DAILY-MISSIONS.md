# Daily Missions 🎯

**Robot Speech (TTS):** *"Daily Missions are the heart of the gamification system! Complete them every day for bolts and rewards. It's fun, rewarding, and keeps you engaged!"*

---

## The Three Daily Missions

### 1. Daily Check-In ✅
**Task:** Open the Missions window  
**Reward:** 10 bolts  
**Auto-completes:** Opens automatically when you view missions  
**Easiest mission** - just show up!

### 2. Complete 2 Chores 📝
**Task:** Complete any 2 tasks  
**Reward:** 15 bolts  
**Progress:** Shows (X/2) counter  
**Takes:** 5-10 minutes

### 3. Complete 4 Chores 📝📝
**Task:** Complete any 4 tasks  
**Reward:** 25 bolts  
**Progress:** Shows (X/4) counter  
**Takes:** 10-20 minutes

**Daily Total:** 50 bolts + 10 bonus = **60 bolts per day!**

---

## Mission Status System

**Three States:**

1. **Incomplete** (Grey, locked)
   - Not yet completed
   - Shows progress counter
   - Cannot claim

2. **Completed** (Green, unlocked)
   - Task finished!
   - [Claim Reward] button appears
   - Ready to collect bolts

3. **Claimed** (Gold, checkmark)
   - Reward collected
   - Shows ✓ checkmark
   - Done for today!

---

## Daily Reset

**Resets at midnight** (local time)

**What resets:**
- ✅ All missions back to "incomplete"
- ✅ Chore counter resets to 0/4
- ✅ Check-in becomes "unclaimed"
- ✅ Bonus reward becomes available again

**What doesn't reset:**
- ❌ Total bolt count (keeps accumulating)
- ❌ Owned robots
- ❌ Task progress/freshness

---

## Bonus Reward

**Special:** Claim all 3 missions → **+10 bonus bolts!**

**Total possible per day:** 60 bolts  
**Per week:** 420 bolts  
**Per month:** ~1800 bolts

---

## Strategy Tips

**Morning Routine:**
1. Open app
2. Click Missions bubble → Check-in auto-completes (10⚡)
3. Complete 2-4 tasks for the day
4. Claim all rewards
5. Total time: 10-15 minutes

**Efficient Task Selection:**
- Choose quick tasks (dishes, trash, making bed)
- Pick low-freshness tasks (most urgent)
- Combine with actual cleaning routine

---

## Technical Details

```javascript
// Mission status tracking
dailyMissionStatus: {
    checkIn: 'unclaimed' | 'completed' | 'claimed',
    twoChores: 'incomplete' | 'completed' | 'claimed',
    fourChores: 'incomplete' | 'completed' | 'claimed'
}

// Daily reset check
checkDailyReset() {
    const now = new Date()
    const lastReset = new Date(this.data.lastDailyReset)
    
    if (now.getDate() !== lastReset.getDate()) {
        // Reset missions
        this.data.dailyMissionStatus = {
            checkIn: 'unclaimed',
            twoChores: 'incomplete',
            fourChores: 'incomplete'
        }
        this.data.dailyChoresCompleted = 0
    }
}
```

---

**Tutorial Progress:** Step 14 of 24  
**Previous:** Currency System | **Next:** Streak System
