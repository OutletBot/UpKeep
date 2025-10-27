# 💔 ROBOT BREAKING SYSTEM - IMPLEMENTATION GUIDE
## Battery Decay, Breaking, and Repair Mechanics

**Priority:** HIGH - Implement First  
**Time:** 2-3 hours  
**Complexity:** Medium

---

## 🎯 WHAT WE'RE BUILDING

A simple battery system where:
1. Robots have a battery (0-100%)
2. Battery drains slowly over time
3. At 0%, robot breaks and shows broken image
4. User must repair robot for bolts to use them again
5. Default bot NEVER breaks (always available)

---

## 📊 BATTERY MECHANICS

### Battery Levels

| Battery % | Color | Status | Icon |
|-----------|-------|--------|------|
| 75-100% | Green | Perfect | 🟢 |
| 50-74% | Yellow | Good | 🟡 |
| 25-49% | Orange | Low | 🟠 |
| 1-24% | Red | Critical | 🔴⚠️ |
| 0% | Gray | BROKEN | 💔 |

### Decay Rates

- **Active companion:** -1% per 30 minutes
- **Inactive robots:** -1% per 2 hours
- **Task completion:** -0.5% per task
- **Battle participation:** -2% per battle

**Result:** Robot needs maintenance every 3-5 days

---

## 🗃️ DATA STRUCTURE

### Add to app.data (line ~39):

```javascript
itemInventory: {
    OILDIRINK: 0,
    BATTERY: 0,
    MEGABATTERY: 0
}
```

### Add to robotBonds structure:

```javascript
robotBonds: {
    'ROBOTID': {
        level: 1,
        xp: 0,
        // ... existing bond data ...
        
        // NEW: Durability data
        durability: {
            battery: 100,
            lastUpdate: null,
            isBroken: false,
            totalRepairs: 0
        }
    }
}
```

---

## 🛠️ IMPLEMENTATION STEPS

### STEP 1: Initialize Durability Data

**File:** `js/chore-system.js`

**Location 1:** Add to app.data (line ~39)
```javascript
itemInventory: {
    OILDIRINK: 0,
    BATTERY: 0,
    MEGABATTERY: 0
}
```

**Location 2:** Update `initializeBondData()` function (line ~350)

Add after the `unlockProgress` section:
```javascript
durability: {
    battery: 100,
    lastUpdate: Date.now(),
    isBroken: false,
    totalRepairs: 0
}
```

**Location 3:** Add to `loadData()` backward compatibility (line ~650)

```javascript
// Ensure itemInventory exists
if (!this.data.itemInventory) {
    this.data.itemInventory = {
        OILDIRINK: 0,
        BATTERY: 0,
        MEGABATTERY: 0
    };
}

// Ensure durability exists for all robots
if (this.data.robotBonds) {
    Object.keys(this.data.robotBonds).forEach(robotId => {
        if (!this.data.robotBonds[robotId].durability) {
            this.data.robotBonds[robotId].durability = {
                battery: 100,
                lastUpdate: Date.now(),
                isBroken: false,
                totalRepairs: 0
            };
        }
    });
}
```

---

### STEP 2: Battery Decay Function

**File:** `js/chore-system.js`  
**Add after `saveData()` function (around line 800)**

```javascript
// ==========================================
// ROBOT BATTERY SYSTEM
// ==========================================

updateRobotBattery(robotId = null) {
    if (!robotId) robotId = this.data.selectedRobotId;
    
    // Skip default bot
    if (robotId === 'default') return;
    
    const bond = this.data.robotBonds[robotId];
    if (!bond || !bond.durability) return;
    
    const durability = bond.durability;
    const now = Date.now();
    const lastUpdate = durability.lastUpdate || now;
    const timePassed = now - lastUpdate;
    
    // Calculate decay
    const isActive = (robotId === this.data.selectedRobotId);
    const decayRate = isActive ? 0.000556 : 0.000139;
    // Active: -1% per 30min, Inactive: -1% per 2hrs
    
    const decay = timePassed * decayRate;
    durability.battery = Math.max(0, durability.battery - decay);
    durability.lastUpdate = now;
    
    // Check if broken
    if (durability.battery <= 0 && !durability.isBroken) {
        this.breakRobot(robotId);
    }
    
    this.saveData();
},

breakRobot(robotId) {
    const bond = this.data.robotBonds[robotId];
    if (!bond) return;
    
    bond.durability.isBroken = true;
    bond.durability.battery = 0;
    
    console.log(`💔 ${robotId} has broken!`);
    
    const robot = this.robots.find(r => r.id === robotId);
    const robotName = robot ? robot.name : robotId;
    
    // If active, force switch to default
    if (this.data.selectedRobotId === robotId) {
        this.selectRobot('default');
        this.showSpeechBubble(`${robotName} has broken! Repair them to use them again.`);
    }
    
    this.saveData();
},

getRepairCost(robotId) {
    if (robotId === 'default') return 0;
    
    const robotData = this.storeRobots.find(r => r.id === robotId);
    if (!robotData) return 0;
    
    return Math.floor(robotData.cost * 0.5);
},

repairRobot(robotId) {
    const cost = this.getRepairCost(robotId);
    
    if (this.data.currency < cost) {
        this.showSpeechBubble(`Need ${cost} bolts to repair! You have ${this.data.currency}.`);
        return false;
    }
    
    this.data.currency -= cost;
    this.updateCurrencyDisplay();
    
    const bond = this.data.robotBonds[robotId];
    bond.durability.isBroken = false;
    bond.durability.battery = 100;
    bond.durability.totalRepairs++;
    bond.durability.lastUpdate = Date.now();
    
    const robot = this.robots.find(r => r.id === robotId);
    const robotName = robot ? robot.name : robotId;
    
    this.showSpeechBubble(`${robotName} repaired! Good as new! 💚`);
    this.saveData();
    
    return true;
}
```

---

### STEP 3: Call Battery Updates

**Location 1:** In `init()` method (line ~345)
```javascript
// After initializeBondData()
// Update all robot batteries on load
if (this.data.robotBonds) {
    Object.keys(this.data.robotBonds).forEach(robotId => {
        this.updateRobotBattery(robotId);
    });
}
```

**Location 2:** In `toggleTask()` after task completion (line ~2170)
```javascript
// After task completed
this.updateRobotBattery();
```

**Location 3:** Add passive decay check every 5 minutes
```javascript
// In init() method, add at end
setInterval(() => {
    if (this.data.robotBonds) {
        Object.keys(this.data.robotBonds).forEach(robotId => {
            this.updateRobotBattery(robotId);
        });
    }
}, 300000); // Every 5 minutes
```

---

### STEP 4: Prevent Broken Robot Selection

**File:** `js/chore-system.js`  
**Update `selectRobot()` function (around line 467)**

Add at the start of the function:
```javascript
selectRobot(robotId) {
    // Check if robot is broken
    const bond = this.data.robotBonds[robotId];
    if (bond && bond.durability && bond.durability.isBroken) {
        const robot = this.robots.find(r => r.id === robotId);
        const robotName = robot ? robot.name : robotId;
        const repairCost = this.getRepairCost(robotId);
        this.showSpeechBubble(`${robotName} is broken! Repair for ${repairCost}⚡ to use them.`);
        return;
    }
    
    // ... rest of existing selectRobot code ...
}
```

---

### STEP 5: Show Battery in Robot Select UI

**File:** `js/chore-system.js`  
**Update `renderRobotOptions()` function**

Add battery display to each robot card:
```javascript
// Inside the robot card HTML, add:
<div class="robot-battery">
    <div class="battery-bar">
        <div class="battery-fill" style="width: ${battery}%; background: ${batteryColor};"></div>
    </div>
    <div class="battery-text">${Math.floor(battery)}%</div>
    ${isBroken ? '<div class="broken-badge">💔 BROKEN</div>' : ''}
</div>
```

Get battery values:
```javascript
const bond = this.data.robotBonds[robot.id];
const battery = bond?.durability?.battery || 100;
const isBroken = bond?.durability?.isBroken || false;
const batteryColor = battery > 75 ? '#4CAF50' : battery > 50 ? '#FFC107' : battery > 25 ? '#FF9800' : '#F44336';
```

---

## 🎨 CSS STYLES

**File:** `css/main.css`

```css
/* Robot Battery Display */
.robot-battery {
    margin-top: 8px;
}

.battery-bar {
    width: 100%;
    height: 6px;
    background: rgba(255,255,255,0.2);
    border-radius: 10px;
    overflow: hidden;
}

.battery-fill {
    height: 100%;
    border-radius: 10px;
    transition: width 0.3s ease;
}

.battery-text {
    font-size: 11px;
    color: white;
    margin-top: 4px;
    text-align: center;
}

.broken-badge {
    background: linear-gradient(135deg, #F44336, #D32F2F);
    color: white;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: bold;
    text-align: center;
    margin-top: 6px;
}
```

---

## ✅ TESTING CHECKLIST

- [ ] Battery initializes at 100% for new robots
- [ ] Battery decays over time (check localStorage after 5 mins)
- [ ] Robot breaks at 0% battery
- [ ] Broken robot cannot be selected
- [ ] Can repair broken robot with bolts
- [ ] Repair costs 50% of purchase price
- [ ] Default bot never breaks
- [ ] Battery displays correctly in robot select
- [ ] Old saves load without errors

---

## 🔧 TESTING COMMANDS

Open browser console and run:

```javascript
// Check battery status
app.data.robotBonds

// Manually drain battery (testing)
app.data.robotBonds['WITCHBOT'].durability.battery = 5;
app.saveData();

// Force break robot (testing)
app.breakRobot('WITCHBOT');

// Check repair cost
app.getRepairCost('WITCHBOT');

// Repair robot
app.repairRobot('WITCHBOT');
```

---

## 📝 NOTES

- Default bot NEVER uses battery (always available failsafe)
- Battery decay uses timestamps (no performance impact)
- Repair restores battery to 100%
- Broken robots keep all bond progress (not lost!)
- System is forgiving - 3-5 days before needing attention

**After this works, we'll add store items in a separate phase!**
