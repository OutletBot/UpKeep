# Critical Bug Fix: Team Isolation for Rebooting Status

## 🐛 **Critical Bug**
Player's robots showed "Rebooting" status even though none of their robots were ever knocked out.

**User Report**:
> "okay so now one of my robots randomly started 'rebooting' even thow none of my robots were ever knocked out."

---

## 🔍 **Root Cause Analysis**

### **The Problem: Shared Robot IDs Between Teams**

Both player and opponent teams use **identical robot IDs**:
```javascript
Player team:    ["unit-001-uc-0", "unit-002-c-0", ...]
Opponent team:  ["unit-001-uc-0", "unit-002-c-0", ...]
```

### **The Bug Flow**:

```
Turn 1: Opponent's unit-001-uc-0 (Bulbasaur) defeated
  ↓
Repair Bay overflow
  ↓
returnToBench(unit-001-uc-0, 'opponent', true)
  ↓
rebootingRobots['unit-001-uc-0'] = 2  ✅

Turn 2: PLAYER's turn starts
  ↓
processRebootingStatus('player')
  ↓
Loop through rebootingRobots: { 'unit-001-uc-0': 2 }
  ↓
Check: Does 'unit-001-uc-0' exist in PLAYER bench?
  ↓
YES! (Player also has unit-001-uc-0, different robot)  ❌
  ↓
Decrement: rebootingRobots['unit-001-uc-0'] = 1  ❌❌
  ↓
PLAYER's unit-001-uc-0 shows "Rebooting"  ❌❌❌
  (Even though it was NEVER defeated!)
```

**The system couldn't distinguish** between:
- Opponent's `unit-001-uc-0` (actually defeated, should be rebooting)
- Player's `unit-001-uc-0` (never defeated, should be deployable)

---

## ✅ **The Fix: Team-Prefixed Keys**

Changed from simple robot ID to team-prefixed key format:

### **Before** (Broken):
```javascript
rebootingRobots = {
  'unit-001-uc-0': 2,  // Which team? Ambiguous! ❌
  'unit-025-r-0': 1
}

isRobotRebooting(robotId) {
  return this.rebootingRobots[robotId] !== undefined;  // Wrong team might match!
}
```

### **After** (Fixed):
```javascript
rebootingRobots = {
  'opponent:unit-001-uc-0': 2,  // Clearly opponent's robot ✅
  'opponent:unit-025-r-0': 1,   // Clearly opponent's robot ✅
  'player:unit-150-ex-0': 2     // Clearly player's robot ✅
}

isRobotRebooting(robotId, team) {
  const rebootKey = `${team}:${robotId}`;
  return this.rebootingRobots[rebootKey] !== undefined;  // Correct team checked ✅
}
```

---

## 🔧 **Code Changes**

### **1. returnToBench() - Store with Team Prefix**
**File**: `index.html`, Lines 17743-17746

```javascript
// Before:
this.rebootingRobots[robotId] = 2;

// After:
const rebootKey = `${team}:${robotId}`;
this.rebootingRobots[rebootKey] = 2;
console.log(`⏳ ${robotId} (${team}) has "Rebooting: 2" status`);
```

### **2. processRebootingStatus() - Filter by Team**
**File**: `index.html`, Lines 17817-17837

```javascript
// Before:
for (const [robotId, waitCount] of Object.entries(this.rebootingRobots)) {
    // Check if robot exists in team's bench
    let belongsToTeam = false;
    for (const slotData of Object.values(benchSlots)) {
        if (slotData.robotId === robotId) {  // ❌ Can match wrong team!
            belongsToTeam = true;
            break;
        }
    }
    
    if (belongsToTeam) {
        this.rebootingRobots[robotId]--;
        // ...
    }
}

// After:
for (const [rebootKey, waitCount] of Object.entries(this.rebootingRobots)) {
    const [keyTeam, robotId] = rebootKey.split(':');
    
    if (keyTeam === team) {  // ✅ Only process THIS team's robots
        this.rebootingRobots[rebootKey]--;
        console.log(`⏳ ${robotId} (${team}) countdown: ${waitCount} → ${this.rebootingRobots[rebootKey]}`);
        // ...
    }
}
```

### **3. isRobotRebooting() - Check Team-Specific Key**
**File**: `index.html`, Lines 17853-17859

```javascript
// Before:
isRobotRebooting(robotId) {
    return this.rebootingRobots[robotId] !== undefined;  // ❌ Ambiguous
}

// After:
isRobotRebooting(robotId, team) {
    const rebootKey = `${team}:${robotId}`;
    return this.rebootingRobots[rebootKey] !== undefined;  // ✅ Team-specific
}
```

### **4. Updated Function Calls**
**Lines 16172, 16274**:
```javascript
// Before:
const isRebooting = this.isRobotRebooting(robotId);

// After:
const isRebooting = this.isRobotRebooting(robotId, teamType);
```

---

## 📊 **Correct Flow Now**

### **Scenario: Both Teams Have Same Robot IDs**

```
Turn 1: Opponent's unit-001-uc-0 defeated
  ↓
returnToBench('unit-001-uc-0', 'opponent', true)
  ↓
rebootingRobots['opponent:unit-001-uc-0'] = 2  ✅

Turn 2: PLAYER's turn starts
  ↓
processRebootingStatus('player')
  ↓
Loop: { 'opponent:unit-001-uc-0': 2 }
  ↓
Extract team: 'opponent'
  ↓
Check: Is 'opponent' === 'player'? NO  ✅
  ↓
Skip processing (wrong team)  ✅
  ↓
PLAYER's unit-001-uc-0 stays deployable  ✅✅✅

Turn 3: OPPONENT's turn starts
  ↓
processRebootingStatus('opponent')
  ↓
Extract team: 'opponent'
  ↓
Check: Is 'opponent' === 'opponent'? YES  ✅
  ↓
Decrement: 2 → 1  ✅
  ↓
OPPONENT's unit-001-uc-0 still rebooting  ✅
```

---

## 🧪 **Testing**

### **Test Case: Cross-Team Robot ID Conflict**

1. **Setup**: Both teams have `unit-001-uc-0` in their starting roster
2. **Action**: Defeat OPPONENT's `unit-001-uc-0`
3. **Expected**: 
   - Opponent's robot goes to Repair Bay
   - Eventually returns to opponent bench with "Rebooting"
   - PLAYER's `unit-001-uc-0` (same ID) remains deployable ✅
4. **Player Turn**: Try to deploy player's `unit-001-uc-0`
5. **Result**: Should work without "Rebooting" error ✅

### **Test Case: Multiple Robots Rebooting**

```
Opponent robots defeated: unit-001-uc-0, unit-002-c-0
Player robots defeated: unit-025-r-0

rebootingRobots = {
  'opponent:unit-001-uc-0': 2,
  'opponent:unit-002-c-0': 1,
  'player:unit-025-r-0': 2
}

Player turn starts:
  → Only process 'player:unit-025-r-0' ✅
  → Player's unit-025-r-0 countdown: 2 → 1 ✅
  → Opponent robots unchanged ✅

Opponent turn starts:
  → Only process opponent robots ✅
  → Countdown both opponent robots ✅
  → Player robots unchanged ✅
```

---

## 🎯 **Why This Was Critical**

### **Impact of Bug**:
1. ❌ Random robots marked as "Rebooting" incorrectly
2. ❌ Player confused why robot can't be deployed
3. ❌ Breaks game balance (wrong team penalized)
4. ❌ Makes Repair Bay system unusable in practice

### **Impact of Fix**:
1. ✅ Perfect team isolation
2. ✅ Only defeated team's robots get "Rebooting" status
3. ✅ Clear console logs show team association
4. ✅ System works correctly even with identical robot IDs

---

## 📝 **Summary**

| Aspect | Before | After |
|--------|--------|-------|
| **Key Format** | `robotId` | `team:robotId` |
| **Team Isolation** | ❌ None | ✅ Perfect |
| **Cross-Team Conflicts** | ❌ Frequent | ✅ None |
| **Debugging** | ❌ Ambiguous logs | ✅ Clear team indicators |

---

## ✅ **Result**

**Before**: Wrong team's robots showed "Rebooting" due to shared IDs  
**After**: Each team's rebooting status tracked independently

**System now works correctly** even when both teams use identical robot IDs!

---

**Last Updated**: October 12, 2025  
**Status**: ✅ **FIXED**  
**Issue**: Team isolation for rebooting status now enforced correctly
