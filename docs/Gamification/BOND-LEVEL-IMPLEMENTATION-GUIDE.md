# 🫶 BOND LEVEL SYSTEM - IMPLEMENTATION GUIDE
## Step-by-Step Plan for All Existing & Future Robots

**Created:** October 25, 2025  
**Estimated Time:** 2-3 development sessions  
**Files to Modify:** 3 main files (chore-system.js, index.html, main.css)

---

## 📋 QUICK OVERVIEW

**What we're building:**
- 5-level bond system for each robot
- XP earning through daily interactions
- Visual bond meter on dashboard
- Level-up celebrations with rewards
- Story segments unlock at each level
- Bolt earning bonuses (5% → 20%)

**Total Features:** 8 core features + future extensibility

---

## 🗃️ DATA MODEL

### Add to app.data (chore-system.js line ~39):

```javascript
robotBonds: {}  // Will populate for each owned robot
```

### Bond Structure Per Robot:

```javascript
{
    level: 1,           // Current level (1-5)
    xp: 0,              // XP progress toward next level
    totalXP: 0,         // Lifetime XP
    lastInteraction: null,
    unlockProgress: {
        story1: false,  // Level 2 - First story segment
        story2: false,  // Level 3 - Second story segment
        story3: false,  // Level 4 - Third story segment
        story4: false   // Level 5 - Final story segment
        // NOTE: Items are given directly to itemInventory, not tracked here
    },
    stats: {
        tasksCompleted: 0,
        daysActive: 0,
        achievementsEarned: 0
    }
}
```

### XP Requirements:

```javascript
const BOND_XP_REQUIREMENTS = {
    1: 0,      // Starting
    2: 200,    // ~7-10 days
    3: 600,    // ~14-20 days
    4: 1200,   // ~20-30 days
    5: 2000    // ~30-40 days MAX
};
```

---

## 🎯 LEVEL REWARDS

| Level | XP Required | Unlocks | Bolt Bonus | Reward |
|-------|-------------|---------|------------|--------|
| 1 | 0 | Basic dialogue | 0% | - |
| 2 | 200 | Story 1 + achievement dialogue | +5% | 50 bolts + **2x Oil Drink** 🛢️ |
| 3 | 600 | Story 2 + thinking expression | +10% | 100 bolts + **1x Battery Pack** 🔋 |
| 4 | 1200 | Story 3 + task-specific dialogue | +15% | 150 bolts + **2x Battery Pack** 🔋🔋 |
| 5 | 2000 | Story 4 + best friend mode | +20% | 200 bolts + **1x Mega Battery + 1x Premium Oil** ⚡🌟 |

**Note:** Items help maintain your robot's battery! See `ROBOT-MAINTENANCE-SYSTEM.md` for details.

---

## 💫 XP EARNING RATES

| Action | XP | Daily Cap | Location in Code |
|--------|-----|-----------|------------------|
| Complete task | +5 | 100 (20 tasks) | toggleTask() |
| 100% category | +20 | 60 (3 times) | toggleTask() |
| Achievement | +15 | 45 (3 times) | mission system |
| Daily check-in | +10 | 10 (once) | showDashboard() |
| Self-care task | +3 | 30 (10 tasks) | toggleSelfCareTask() |
| Daily mission | +15 | 45 (3 missions) | mission complete |
| Win battle | +25 | 75 (3 battles) | battle system |

**Daily XP Cap:** ~365 XP (prevents grinding, encourages consistency)

---

## 🛠️ IMPLEMENTATION STEPS

See separate detailed files:
- `BOND-STEP-1-DATA.md` - Data structure setup
- `BOND-STEP-2-FUNCTIONS.md` - Core XP functions
- `BOND-STEP-3-INTEGRATION.md` - Integrate into existing systems
- `BOND-STEP-4-UI.md` - Visual bond meter & celebrations
- `BOND-STEP-5-STORIES.md` - Add story content for each robot
- `BOND-STEP-6-TESTING.md` - Testing checklist

---

## 🤖 FUTURE ROBOT INTEGRATION

### For Every New Robot, Add:

**1. Story Segments (in dialogue.json):**

```json
{
    "hasCustomDialogue": true,
    "bondStories": {
        "level2": "Short backstory reveal (3-4 sentences)",
        "level3": "Deeper personality reveal",
        "level4": "Personal motivation",
        "level5": "Complete character arc"
    },
    // ... existing dialogue
}
```

**2. System automatically handles:**
- ✅ Bond data creation when robot is purchased
- ✅ XP earning while robot is active
- ✅ Level progression
- ✅ Bolt bonuses
- ✅ UI updates

**3. No code changes needed!** Just add story content to dialogue.json

---

## ✅ SUCCESS METRICS

- Users reach Level 2 with a robot within first week
- 60%+ of users have at least one Level 3 bond
- Users switch robots to try bonding with different personalities
- Bond system feels rewarding, not grindy
- Story unlocks encourage deeper engagement

---

## 📝 NEXT STEPS

1. **Start with BOND-STEP-1-DATA.md** - Set up data structures
2. **Follow each step sequentially** - Don't skip ahead
3. **Test after each step** - Verify functionality works
4. **Add stories last** - Once system is proven working

Let's build this! 🚀
