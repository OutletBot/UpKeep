# STEP 1: Data Structure Setup
## Setting Up Bond Data Storage

**Time:** 30 minutes  
**Difficulty:** Easy  
**Files:** `js/chore-system.js`

---

## ✅ CHECKLIST

- [ ] Add robotBonds to app.data
- [ ] Create BOND_XP_REQUIREMENTS constant
- [ ] Create initializeBondData() function
- [ ] Call initialization in init() method
- [ ] Add backward compatibility in loadData()
- [ ] Test: Verify bond data appears in localStorage

---

## 📝 CODE CHANGES

### Change 1: Add robotBonds to app.data (Line ~39)

**Location:** `js/chore-system.js` line 39  
**After:** `savedDecks: []`

```javascript
savedDecks: [],   // Saved deck configurations
robotBonds: {}    // Bond levels for each owned robot
```

---

### Change 2: Create XP Requirements Constant (Line ~140)

**Location:** `js/chore-system.js` after mascotState definition  
**Around:** Line 140

```javascript
// ==========================================
// BOND LEVEL CONSTANTS
// ==========================================
const BOND_XP_REQUIREMENTS = {
    1: 0,      // Level 1: Starting level
    2: 200,    // Level 2: ~7-10 days of regular use
    3: 600,    // Level 3: ~14-20 days
    4: 1200,   // Level 4: ~20-30 days
    5: 2000    // Level 5: ~30-40 days (MAX LEVEL)
};
```

---

### Change 3: Create initializeBondData() Function (Line ~350)

**Location:** `js/chore-system.js` after initTTS() function  
**Around:** Line 365

```javascript
initializeBondData() {
    // Ensure robotBonds exists
    if (!this.data.robotBonds) {
        this.data.robotBonds = {};
    }
    
    // Initialize bond data for all owned robots
    this.data.ownedRobots.forEach(robotId => {
        if (!this.data.robotBonds[robotId]) {
            this.data.robotBonds[robotId] = {
                level: 1,
                xp: 0,
                totalXP: 0,
                lastInteraction: null,
                unlockProgress: {
                    story1: false,
                    story2: false,
                    story3: false,
                    story4: false,
                    outfit1: false,
                    outfit2: false,
                    outfit3: false
                },
                stats: {
                    tasksCompleted: 0,
                    daysActive: 0,
                    achievementsEarned: 0
                }
            };
            console.log(`💖 Initialized bond data for ${robotId}`);
        }
    });
    
    console.log(`✅ Bond system ready for ${Object.keys(this.data.robotBonds).length} robots`);
},
```

---

### Change 4: Call Initialization in init() (Line ~345)

**Location:** `js/chore-system.js` in init() method  
**After:** `this.checkObonxoCheatStatus();`

```javascript
this.checkObonxoCheatStatus();

// Initialize bond data for all owned robots
this.initializeBondData();
```

---

### Change 5: Backward Compatibility in loadData() (Line ~650)

**Location:** `js/chore-system.js` in loadData() method  
**After:** currency initialization check

```javascript
// Ensure robotBonds exists (for backward compatibility with old saves)
if (!this.data.robotBonds) {
    this.data.robotBonds = {};
}
```

---

## 🧪 TESTING

### Test 1: Check Console Logs

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Refresh the page
4. Look for: `✅ Bond system ready for X robots`

**Expected:** Should see initialization message with robot count

---

### Test 2: Check localStorage

1. In Dev Tools, go to Application tab
2. Go to Local Storage → your domain
3. Find `upkeepData_default` (or your save file name)
4. Click to view JSON
5. Search for `"robotBonds"`

**Expected:** Should see robotBonds object with entries for each owned robot

**Example:**
```json
{
    "robotBonds": {
        "default": {
            "level": 1,
            "xp": 0,
            "totalXP": 0,
            // ... rest of structure
        }
    }
}
```

---

### Test 3: Purchase New Robot

1. Open Robot Store
2. Purchase a robot (if you have enough bolts)
3. Close store
4. Check localStorage again

**Expected:** New robot should have bond data automatically created

---

## ❌ TROUBLESHOOTING

### Issue: "robotBonds is undefined"

**Cause:** initializeBondData() not being called  
**Fix:** Verify init() method calls initializeBondData()

### Issue: "BOND_XP_REQUIREMENTS is not defined"

**Cause:** Constant declared inside a function  
**Fix:** Move constant to top-level scope (outside any functions)

### Issue: Bond data not saving

**Cause:** saveData() not being called  
**Fix:** This is fine for now - Step 2 will handle saving

---

## ✅ COMPLETION CHECKLIST

Before moving to Step 2, verify:

- [ ] All 5 code changes made
- [ ] No console errors on page load
- [ ] robotBonds appears in localStorage
- [ ] Initialization message appears in console
- [ ] Default robot has bond data structure
- [ ] Ready to proceed to Step 2

**Next:** `BOND-STEP-2-FUNCTIONS.md` - Create XP earning functions
