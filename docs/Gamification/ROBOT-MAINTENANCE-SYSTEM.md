# 🔋 ROBOT MAINTENANCE SYSTEM - FULL DESIGN
## Battery, Items, Durability & Repair Mechanics

**Created:** October 25, 2025  
**Priority:** MEDIUM - Phase 2 (Store Items System)  
**Estimated Time:** 2-3 development sessions  
**Complexity:** Medium

**⚠️ IMPLEMENT PHASE 1 FIRST:** See `ROBOT-BREAKING-IMPLEMENTATION.md` for the breaking/repair system.  
**THIS DOCUMENT:** Phase 2 - Adding store items after breaking system works.

---

## 📋 TABLE OF CONTENTS

1. [Overview & Goals](#overview--goals)
2. [Core Mechanics](#core-mechanics)
3. [Data Model Design](#data-model-design)
4. [Store Items System](#store-items-system)
5. [Battery Decay System](#battery-decay-system)
6. [Repair System](#repair-system)
7. [Integration with Bond System](#integration-with-bond-system)
8. [UI/UX Design](#uiux-design)
9. [Step-by-Step Implementation](#step-by-step-implementation)
10. [Testing Checklist](#testing-checklist)

---

## 🎯 OVERVIEW & GOALS

### What Is The Robot Maintenance System?

Robots are mechanical companions that require care and maintenance. Over time, their **battery drains**, requiring users to purchase consumable items (oil, batteries, etc.) to keep them functional. If neglected, robots will **break completely** and require expensive repairs.

### Core Goals:

1. **Resource Management** - Strategic use of bolts for maintenance vs purchases
2. **Emotional Investment** - Players care about keeping their robots healthy
3. **Monetization Path** - Create demand for in-game currency
4. **Consequence Design** - Neglect has meaningful (but not punishing) consequences
5. **Visual Feedback** - Battery bars provide clear status at a glance

### Design Principles:

- ⚖️ **Fair, Not Punishing** - Decay is slow enough to manage easily
- 💡 **Clear Communication** - Users always know robot status
- 🎁 **Reward Integration** - Bond levels grant maintenance items
- 🚫 **No Permanent Loss** - Robots can always be repaired
- ✨ **Positive Framing** - "Caring for" not "preventing death"

---

## 🔧 CORE MECHANICS

### 🔋 Battery System

**Battery Range:** 0% - 100%

| Battery Level | Robot Status | Visual Indicator | Dialogue Impact |
|---------------|--------------|------------------|-----------------|
| 100% - 75% | Perfect condition | 🟢 Green battery | Normal happy dialogue |
| 74% - 50% | Good condition | 🟡 Yellow battery | Normal dialogue |
| 49% - 25% | Low power | 🟠 Orange battery | "Feeling tired" lines |
| 24% - 1% | Critical | 🔴 Red battery + ⚠️ | "Need maintenance!" warnings |
| 0% | BROKEN | 💔 Broken icon | "I'm broken!" + sad image |

### ⏰ Battery Decay Rate

**Passive Decay:**
- **When Active Companion:** -1% per 30 minutes of real time
- **When Inactive (not selected):** -1% per 2 hours of real time
- **Rate calculation:** Uses timestamps, not continuous timers

**Activity Drain:**
- **Task Completion:** -0.5% per task (light drain)
- **Battle Participation:** -2% per battle (moderate drain)
- **Mission Completion:** -1% per mission (light drain)

**Total Decay Example:**
- 8 hours of active use: ~16% battery loss
- 24 hours inactive: ~12% battery loss
- 10 tasks completed: ~5% battery loss
- **Daily total drain:** ~20-35% depending on activity

**Result:** Robot needs maintenance every 3-5 days with regular use (manageable!)

### 🛠️ Broken State

**What Happens When Robot Hits 0% Battery:**

1. **Robot breaks** - Displays broken image (`sad.png` or future `broken.png`)
2. **Dialogue stops** - Robot says "I'm broken! Please repair me!" then goes silent
3. **No XP earnings** - Cannot earn bond XP while broken
4. **No bolt bonus** - Loses all bond level bolt bonuses
5. **Force switch** - User must select different robot or repair immediately
6. **Repair required** - Costs **50% of original purchase price** to fix

**Example Repair Costs:**
- Jack-o-Bot (100 bolts) → 50 bolts to repair
- Pika-Bot (120 bolts) → 60 bolts to repair
- Buzz-Bot (180 bolts) → 90 bolts to repair
- Default Bot → **FREE** repair (always your fallback!)

---

## 🗃️ DATA MODEL DESIGN

### Robot Durability Data (Add to robotBonds)

```javascript
robotBonds: {
    'WITCHBOT': {
        // ... existing bond data ...
        
        // NEW: Maintenance data
        durability: {
            battery: 100,              // Current battery % (0-100)
            lastUpdate: 1729900000,    // Timestamp of last battery update
            isBroken: false,           // Is robot currently broken?
            totalRepairs: 0,           // Lifetime repair count
            maintenanceItems: {
                oilDrink: 0,           // Count of oil drinks owned
                battery: 0,            // Count of batteries owned
                solarPanel: 0,         // Count of solar panels owned (future)
                premiumOil: 0          // Count of premium oil owned (future)
            },
            lastMaintenanceDate: null, // When user last used an item
            warningShown: false        // Has low battery warning been shown today?
        }
    }
}
```

### Store Items Database

```javascript
// Add to app object (around line 90, after storeRobots)
storeItems: [
    {
        id: 'OILDIRINK',
        name: 'Oil Drink',
        description: 'Restores 25% battery instantly. Your robot will thank you!',
        cost: 30,
        effect: {
            type: 'battery',
            amount: 25,
            instant: true
        },
        icon: '🛢️',
        category: 'maintenance',
        imagePath: 'Imag/Store/Items/oil-drink.png' // Future asset
    },
    {
        id: 'BATTERY',
        name: 'Battery Pack',
        description: 'Restores 50% battery. Essential for long-term care!',
        cost: 50,
        effect: {
            type: 'battery',
            amount: 50,
            instant: true
        },
        icon: '🔋',
        category: 'maintenance',
        imagePath: 'Imag/Store/Items/battery.png'
    },
    {
        id: 'MEGABATTERY',
        name: 'Mega Battery',
        description: 'Fully restores battery to 100%! The ultimate care package.',
        cost: 80,
        effect: {
            type: 'battery',
            amount: 100,
            instant: true
        },
        icon: '⚡',
        category: 'maintenance',
        imagePath: 'Imag/Store/Items/mega-battery.png'
    },
    {
        id: 'PREMIUMOIL',
        name: 'Premium Synthetic Oil',
        description: 'Restores 50% battery AND reduces decay by 50% for 24 hours!',
        cost: 100,
        effect: {
            type: 'battery',
            amount: 50,
            instant: true,
            buff: {
                decayReduction: 0.5,
                duration: 86400000 // 24 hours in milliseconds
            }
        },
        icon: '🌟',
        category: 'premium',
        imagePath: 'Imag/Store/Items/premium-oil.png'
    },
    {
        id: 'SOLARPANEL',
        name: 'Solar Panel (Passive)',
        description: 'Slows battery decay by 25% permanently! One-time purchase.',
        cost: 200,
        effect: {
            type: 'passive',
            decayReduction: 0.25,
            permanent: true
        },
        icon: '☀️',
        category: 'upgrade',
        imagePath: 'Imag/Store/Items/solar-panel.png',
        oneTimePurchase: true
    }
]
```

### Item Inventory (Add to app.data)

```javascript
// Around line 39 in app.data
itemInventory: {
    OILDIRINK: 0,
    BATTERY: 0,
    MEGABATTERY: 0,
    PREMIUMOIL: 0,
    SOLARPANEL: false  // Boolean for one-time upgrades
}
```

---

## 🏪 STORE ITEMS SYSTEM

### Store UI Enhancement

**Current Store:** Robot purchases only  
**New Store:** Two tabs - "Robots" and "Items"

```
┌─────────────────────────────────────┐
│  SCRAPPY'S SHOP                     │
│  ┌─────────┬─────────┐             │
│  │ ROBOTS  │  ITEMS  │  ← Tabs     │
│  └─────────┴─────────┘             │
│                                     │
│  [Items Tab Content]                │
│  ┌─────────────────────────────┐  │
│  │ 🛢️ Oil Drink         30⚡   │  │
│  │ Restores 25% battery        │  │
│  │ [BUY] [USE x3]              │  │
│  └─────────────────────────────┘  │
│  ┌─────────────────────────────┐  │
│  │ 🔋 Battery Pack      50⚡   │  │
│  │ Restores 50% battery        │  │
│  │ [BUY] [USE x1]              │  │
│  └─────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Item Purchase Flow

1. User clicks "BUY" on item
2. Check if user has enough bolts
3. Deduct bolts from currency
4. Add item to `itemInventory[itemId]++`
5. Scrappy says purchase dialogue: "One [item name], coming right up!"
6. Update inventory display
7. Save data

### Item Usage Flow

1. User clicks "USE" on owned item
2. Check if active robot needs maintenance
3. Apply item effect to active robot's battery
4. Remove item from inventory (`itemInventory[itemId]--`)
5. Show battery restoration animation
6. Robot says thank you dialogue
7. Update battery display
8. Save data

---

## ⚡ BATTERY DECAY SYSTEM

### Decay Calculation Function

```javascript
// Add to chore-system.js around line 850

updateRobotBattery(robotId = null) {
    // If no robotId provided, update active companion
    if (!robotId) {
        robotId = this.data.selectedRobotId;
    }
    
    // Skip default bot (doesn't use battery)
    if (robotId === 'default') return;
    
    const bond = this.data.robotBonds[robotId];
    if (!bond || !bond.durability) return;
    
    const durability = bond.durability;
    const now = Date.now();
    const lastUpdate = durability.lastUpdate || now;
    const timePassed = now - lastUpdate; // Milliseconds since last update
    
    // Calculate passive decay
    const isActive = (robotId === this.data.selectedRobotId);
    const decayRate = isActive ? 0.000556 : 0.000139; // % per millisecond
    // Active: -1% per 30min (1800000ms) = 0.000556
    // Inactive: -1% per 2hrs (7200000ms) = 0.000139
    
    let decay = timePassed * decayRate;
    
    // Apply decay reduction buffs if any
    const hasSolarPanel = this.data.itemInventory.SOLARPANEL;
    if (hasSolarPanel) {
        decay *= 0.75; // Solar panel reduces decay by 25%
    }
    
    // Check for premium oil buff
    if (durability.premiumOilExpiry && now < durability.premiumOilExpiry) {
        decay *= 0.5; // Premium oil reduces decay by 50%
    }
    
    // Apply decay
    durability.battery = Math.max(0, durability.battery - decay);
    durability.lastUpdate = now;
    
    // Check if broken
    if (durability.battery <= 0 && !durability.isBroken) {
        this.breakRobot(robotId);
    }
    
    // Show warning at 25% (once per day)
    if (durability.battery <= 25 && durability.battery > 0 && !durability.warningShown) {
        this.showBatteryWarning(robotId);
        durability.warningShown = true;
    }
    
    // Reset warning flag if battery recharged above 25%
    if (durability.battery > 25) {
        durability.warningShown = false;
    }
    
    this.saveData();
},

// Call this function:
// - On page load
// - When switching robots
// - After completing tasks/battles
// - Every 5 minutes (setInterval)
```

### Activity-Based Drain

```javascript
// Add to existing functions

// In toggleTask() after task completion (around line 2170)
drainBatteryFromActivity(amount) {
    const robotId = this.data.selectedRobotId;
    if (robotId === 'default') return;
    
    const durability = this.data.robotBonds[robotId]?.durability;
    if (!durability || durability.isBroken) return;
    
    durability.battery = Math.max(0, durability.battery - amount);
    
    if (durability.battery <= 0) {
        this.breakRobot(robotId);
    }
    
    this.saveData();
    this.updateBatteryDisplay();
}

// Usage:
// After task: this.drainBatteryFromActivity(0.5);
// After battle: this.drainBatteryFromActivity(2);
// After mission: this.drainBatteryFromActivity(1);
```

---

## 🔨 REPAIR SYSTEM

### Repair Cost Calculation

```javascript
getRepairCost(robotId) {
    // Find robot in store
    const robotData = this.storeRobots.find(r => r.id === robotId);
    
    if (!robotData) {
        console.error(`Robot ${robotId} not found in store`);
        return 0;
    }
    
    // Default bot is always free to repair
    if (robotId === 'default') return 0;
    
    // Repair cost is 50% of original purchase price
    return Math.floor(robotData.cost * 0.5);
}
```

### Break Robot Function

```javascript
breakRobot(robotId) {
    const bond = this.data.robotBonds[robotId];
    if (!bond) return;
    
    const durability = bond.durability;
    durability.isBroken = true;
    durability.battery = 0;
    
    console.log(`💔 ${robotId} has broken!`);
    
    const robot = this.robots.find(r => r.id === robotId);
    const robotName = robot ? robot.name : robotId;
    
    // Show broken notification
    this.showRobotBrokenModal(robotId, robotName);
    
    // If this is the active robot, force switch to default
    if (this.data.selectedRobotId === robotId) {
        this.selectRobot('default');
        this.showSpeechBubble(`${robotName} has broken down! You'll need to repair them or select a different companion.`);
    }
    
    this.saveData();
}
```

### Repair Robot Function

```javascript
repairRobot(robotId) {
    const repairCost = this.getRepairCost(robotId);
    
    // Check if user has enough bolts
    if (this.data.currency < repairCost) {
        this.showSpeechBubble(`You need ${repairCost} bolts to repair this robot! You have ${this.data.currency}.`);
        return false;
    }
    
    // Deduct repair cost
    this.data.currency -= repairCost;
    this.updateCurrencyDisplay();
    
    // Repair robot
    const bond = this.data.robotBonds[robotId];
    bond.durability.isBroken = false;
    bond.durability.battery = 100; // Fully charged after repair
    bond.durability.totalRepairs++;
    bond.durability.lastUpdate = Date.now();
    
    const robot = this.robots.find(r => r.id === robotId);
    const robotName = robot ? robot.name : robotId;
    
    this.showSpeechBubble(`${robotName} has been repaired! They're as good as new! 💚`);
    
    console.log(`🔧 Repaired ${robotId} for ${repairCost} bolts`);
    
    this.saveData();
    this.updateBatteryDisplay();
    
    return true;
}
```

---

## 💝 INTEGRATION WITH BOND SYSTEM

### Updated Bond Rewards (Replace Outfits with Items)

**File:** `docs/Gamification/BOND-LEVEL-IMPLEMENTATION-GUIDE.md` - UPDATE THIS!

| Level | XP Required | Unlocks | Bolt Bonus | **NEW REWARDS** |
|-------|-------------|---------|------------|-----------------|
| 1 | 0 | Basic dialogue | 0% | - |
| 2 | 200 | Story 1 + achievement dialogue | +5% | 50 bolts + **2x Oil Drink** |
| 3 | 600 | Story 2 + thinking expression | +10% | 100 bolts + **1x Battery Pack** |
| 4 | 1200 | Story 3 + task-specific dialogue | +15% | 150 bolts + **2x Battery Pack** |
| 5 | 2000 | Story 4 + best friend mode | +20% | 200 bolts + **1x Mega Battery + 1x Premium Oil** |

### Item Reward Code

```javascript
// In unlockBondRewards() function, REPLACE outfit unlocking with:

unlockBondRewards(robotId, level) {
    const bond = this.data.robotBonds[robotId];
    
    // Award bolts
    const boltRewards = { 2: 50, 3: 100, 4: 150, 5: 200 };
    if (boltRewards[level]) {
        this.data.currency += boltRewards[level];
        this.updateCurrencyDisplay();
    }
    
    // Award maintenance items
    const itemRewards = {
        2: { OILDIRINK: 2 },
        3: { BATTERY: 1 },
        4: { BATTERY: 2 },
        5: { MEGABATTERY: 1, PREMIUMOIL: 1 }
    };
    
    if (itemRewards[level]) {
        Object.keys(itemRewards[level]).forEach(itemId => {
            this.data.itemInventory[itemId] += itemRewards[level][itemId];
            console.log(`🎁 Awarded ${itemRewards[level][itemId]}x ${itemId}`);
        });
    }
    
    // Unlock story segments (keep existing)
    if (level === 2) bond.unlockProgress.story1 = true;
    if (level === 3) bond.unlockProgress.story2 = true;
    if (level === 4) bond.unlockProgress.story3 = true;
    if (level === 5) bond.unlockProgress.story4 = true;
    
    this.saveData();
}
```

---

## 🎨 UI/UX DESIGN

### Battery Display in Robot Select Screen

```html
<!-- Add to robot selection modal -->
<div class="robot-battery-indicator">
    <div class="battery-icon">🔋</div>
    <div class="battery-bar">
        <div class="battery-fill" style="width: 75%; background: #4CAF50;"></div>
    </div>
    <div class="battery-percent">75%</div>
</div>
```

**Battery Color Logic:**
- 75-100%: Green (#4CAF50)
- 50-74%: Yellow (#FFC107)
- 25-49%: Orange (#FF9800)
- 1-24%: Red (#F44336) + ⚠️ icon
- 0%: Gray (#9E9E9E) + 💔 icon + "BROKEN" text

### Low Battery Warning Modal

```html
<div class="battery-warning-modal">
    <div class="warning-content">
        <div class="warning-icon">⚠️</div>
        <div class="warning-title">LOW BATTERY!</div>
        <div class="warning-robot">[Robot Name]</div>
        <div class="warning-battery">Battery: 23%</div>
        <div class="warning-message">
            Your robot needs maintenance soon!<br>
            Use an item or visit the shop.
        </div>
        <button class="warning-shop-btn">Go to Shop</button>
        <button class="warning-close-btn">I'll handle it later</button>
    </div>
</div>
```

### Broken Robot Repair Modal

```html
<div class="robot-broken-modal">
    <div class="broken-content">
        <div class="broken-icon">💔</div>
        <div class="broken-title">ROBOT BROKEN!</div>
        <div class="broken-robot">[Robot Name] has broken down!</div>
        <div class="broken-image">
            <img src="[robot sad/broken image]" />
        </div>
        <div class="broken-message">
            They need repairs to function again.<br>
            Repair Cost: <span class="repair-cost">50⚡</span>
        </div>
        <button class="broken-repair-btn">Repair Now (50⚡)</button>
        <button class="broken-switch-btn">Use Different Robot</button>
    </div>
</div>
```

### Item Usage UI in Store

```html
<!-- In store items tab -->
<div class="store-item-card">
    <div class="item-icon">🛢️</div>
    <div class="item-name">Oil Drink</div>
    <div class="item-description">Restores 25% battery</div>
    <div class="item-price">30⚡</div>
    <div class="item-owned">You have: 3</div>
    <div class="item-actions">
        <button class="item-buy-btn">BUY</button>
        <button class="item-use-btn">USE</button>
    </div>
</div>
```

---

## 🛠️ STEP-BY-STEP IMPLEMENTATION

### Phase 1: Data Structure (1 session)
1. Add `durability` to `robotBonds` structure
2. Add `itemInventory` to `app.data`
3. Create `storeItems` database
4. Initialize durability for all owned robots
5. Add backward compatibility in `loadData()`

### Phase 2: Battery System (1 session)
6. Create `updateRobotBattery()` function
7. Create `drainBatteryFromActivity()` function
8. Create `breakRobot()` function
9. Add battery update calls to task/battle/mission completion
10. Add setInterval for passive decay (every 5 minutes)

### Phase 3: Store & Items (1 session)
11. Add "Items" tab to robot store UI
12. Create item purchase function
13. Create item usage function
14. Add inventory display to store
15. Scrappy dialogue for item purchases

### Phase 4: Repair System (0.5 session)
16. Create `getRepairCost()` function
17. Create `repairRobot()` function
18. Add repair button to broken robot modal
19. Test repair flow

### Phase 5: UI Integration (1 session)
20. Add battery bar to robot select screen
21. Create low battery warning modal
22. Create broken robot modal
23. Add battery indicator to main dashboard (optional)
24. Style all new UI elements

### Phase 6: Bond Integration (0.5 session)
25. Update `unlockBondRewards()` to give items
26. Update bond level-up modal to show item rewards
27. Test full bond progression with new rewards

---

## ✅ TESTING CHECKLIST

### Battery System Tests
- [ ] Battery decays at correct rate when robot is active
- [ ] Battery decays slower when robot is inactive
- [ ] Activity drain works (tasks, battles, missions)
- [ ] Robot breaks at 0% battery
- [ ] Low battery warning shows at 25%
- [ ] Battery updates persist after page reload

### Item System Tests
- [ ] Can purchase items from store
- [ ] Currency deducted correctly
- [ ] Items added to inventory
- [ ] Can use items from inventory
- [ ] Battery restores by correct amount
- [ ] Items removed from inventory after use
- [ ] Cannot use items when inventory is 0

### Repair System Tests
- [ ] Repair cost calculated correctly (50% of purchase price)
- [ ] Cannot repair without enough bolts
- [ ] Repair restores battery to 100%
- [ ] Repair sets isBroken to false
- [ ] Can select repaired robot again

### Bond Integration Tests
- [ ] Level 2 awards 2x Oil Drink
- [ ] Level 3 awards 1x Battery Pack
- [ ] Level 4 awards 2x Battery Pack
- [ ] Level 5 awards Mega Battery + Premium Oil
- [ ] Items appear in inventory after level up

### Edge Cases
- [ ] Default bot doesn't use battery system
- [ ] Switching robots while one is broken works
- [ ] All robots broken forces default bot selection
- [ ] Solar panel permanent upgrade persists
- [ ] Premium oil buff expires after 24 hours

---

## 📊 BALANCE CONSIDERATIONS

### Decay vs Maintenance Cost

**Average Daily Costs (Regular Use):**
- Battery drain: ~30% per day
- Oil Drink (25% restore): 30 bolts
- Battery Pack (50% restore): 50 bolts
- **Estimated maintenance:** ~50-80 bolts per week

**Average Daily Earnings:**
- Task completions: ~100-150 bolts
- Missions: ~30-50 bolts
- **Total:** ~130-200 bolts per day

**Result:** Maintenance is affordable but meaningful (~25-40% of income)

### Repair Costs Feel Fair?

- Jack-o-Bot repair: 50 bolts (half of 100)
- Buzz-Bot repair: 90 bolts (half of 180)

**Comparison:** 1-2 days of earnings to repair expensive robot → feels consequential but not devastating

---

## 🚀 FUTURE ENHANCEMENTS

### Phase 2 Features (Later):
- **Auto-Maintenance Mode** (Premium): Automatically uses items when battery drops below 25%
- **Maintenance Reminders**: Daily notification if robot below 50%
- **Battery History Graph**: Track battery levels over time
- **Workshop Mini-Game**: Play mini-game to reduce repair costs
- **Robot Insurance**: Pay monthly premium to reduce repair costs by 75%
- **Energy Drinks**: Temporary +20% task completion speed for 1 hour

---

## ⚠️ CRITICAL NOTES

### DO NOT BREAK EXISTING SYSTEMS

1. **Default Bot Exception**: Default bot NEVER uses battery (always available fallback)
2. **Battle System**: Battery drain from battles is OPTIONAL (can disable if too harsh)
3. **Save Compatibility**: Must handle old saves without durability data
4. **Visual Assets**: Can use placeholder icons (🔋 🛢️) until custom images ready

### Balance Testing Priority

After implementation, monitor:
- Average battery levels across all users
- Repair frequency (should be rare, ~once per month per robot)
- Item purchase rates
- User complaints about "too grindy"

**Adjustment Levers:**
- Decay rates (can slow down if too fast)
- Item costs (can reduce if too expensive)
- Item effectiveness (can increase restore amounts)
- Repair costs (can reduce if too punishing)

---

## ✅ READY TO IMPLEMENT?

**Prerequisites:**
- Bond system implemented (provides item rewards)
- Store system working (can add items tab)
- Robot selection system functional
- Save/load system handles new data

**Start with:** Phase 1 (Data Structure) - safest, no UI changes yet

**Next Steps:**
1. Review this plan thoroughly
2. Create detailed step-by-step files (like bond system)
3. Implement Phase 1 first
4. Test extensively before moving to Phase 2

---

**Questions? Concerns? Ready to build?** 🛠️💚
