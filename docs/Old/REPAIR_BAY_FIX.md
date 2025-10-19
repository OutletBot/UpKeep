# Repair Bay Fix - Robots Returning to Bench

## 🐛 **Problem**
Robots were disappearing from the Repair Bay instead of returning to the bench with "Rebooting: 1" status.

**Logs showed**:
```
♻️ Returning unit-001-uc-0 to player bench
⏳ unit-001-uc-0 has "Rebooting: 1" status - cannot deploy next turn
📋 Bench slot 0 is empty (robot deployed)  ← Robot not showing!
```

---

## 🔍 **Root Cause**

The system was using **two different data structures** for the bench:

1. **Legacy Arrays** (old system):
   - `this.playerBench = [robotId1, robotId2, ...]`
   - `this.opponentBench = [robotId1, robotId2, ...]`
   
2. **BenchSlots Object** (Repair Bay system):
   - `this.playerZones.player.benchSlots = { 'bench-slot-1': { robotId: null }, ... }`
   - `this.playerZones.opponent.benchSlots = { 'opponent-bench-slot-1': { robotId: null }, ... }`

**The Problem**:
- `returnToBench()` was writing to `benchSlots` ✅
- `updateBenchDisplay()` was reading from legacy arrays ❌
- Result: Robot placed in `benchSlots`, but display couldn't see it!

---

## ✅ **Solution**

### **1. Updated `updateBenchDisplay()` to Read from `benchSlots`**

**Before** (Lines 16096-16108):
```javascript
updateBenchDisplay() {
    if (playerBenchEl && this.playerBench) {
        this.renderBenchRobots(playerBenchEl, this.playerBench, 'player');
    }
    if (opponentBenchEl && this.opponentBench) {
        this.renderBenchRobots(opponentBenchEl, this.opponentBench, 'opponent');
    }
}
```

**After**:
```javascript
updateBenchDisplay(team = null) {
    // Update player bench
    if ((team === null || team === 'player') && playerBenchEl) {
        // Convert benchSlots object to array format for rendering
        const benchArray = [];
        const benchSlots = this.playerZones.player.benchSlots;
        Object.keys(benchSlots).forEach(slotId => {
            benchArray.push(benchSlots[slotId].robotId);
        });
        this.renderBenchRobots(playerBenchEl, benchArray, 'player');
    }
    
    // Update opponent bench (same logic)
    ...
}
```

---

### **2. Updated `deployTeamToBench()` to Write to Both Structures**

**Before** (Lines 16081-16094):
```javascript
deployTeamToBench(teamRobots, teamType) {
    // Only populated legacy arrays
    if (teamType === 'player') {
        this.playerBench = teamRobots.slice();
    } else {
        this.opponentBench = teamRobots.slice();
    }
    this.updateBenchDisplay();
}
```

**After**:
```javascript
deployTeamToBench(teamRobots, teamType) {
    // Store in legacy arrays
    if (teamType === 'player') {
        this.playerBench = teamRobots.slice();
    } else {
        this.opponentBench = teamRobots.slice();
    }
    
    // ALSO populate benchSlots structure for Repair Bay system
    const benchSlots = this.playerZones[teamType].benchSlots;
    const slotIds = Object.keys(benchSlots).sort();
    teamRobots.forEach((robotId, index) => {
        if (index < slotIds.length) {
            benchSlots[slotIds[index]].robotId = robotId;
            console.log(`📍 Placed ${robotId} in ${slotIds[index]}`);
        }
    });
    
    this.updateBenchDisplay();
}
```

---

### **3. Updated Deployment Functions to Clear from Both Structures**

**Added to `deployRobotToPoint()` (Line 16560)**:
```javascript
// Remove from bench array
if (deploymentData.teamType === 'player') {
    this.playerBench[deploymentData.benchIndex] = null;
} else {
    this.opponentBench[deploymentData.benchIndex] = null;
}

// ALSO remove from benchSlots structure
const benchSlots = this.playerZones[deploymentData.teamType].benchSlots;
const slotIds = Object.keys(benchSlots).sort();
if (deploymentData.benchIndex < slotIds.length) {
    const slotId = slotIds[deploymentData.benchIndex];
    benchSlots[slotId].robotId = null;
    console.log(`📍 Cleared ${slotId} (robot deployed)`);
}
```

**Added to `executeSmartDeployment()` (Line 16721)** - same logic

---

## 📊 **Complete Data Flow**

### **Game Start**:
```
deployTeamToBench()
  ↓
Write to: this.playerBench[] ✅
Write to: benchSlots{} ✅
  ↓
updateBenchDisplay() reads from benchSlots{} ✅
  ↓
Bench displays all 6 robots ✅
```

### **Robot Deployment**:
```
deployRobotToPoint()
  ↓
Clear from: this.playerBench[index] = null ✅
Clear from: benchSlots[slotId].robotId = null ✅
  ↓
updateBenchDisplay() reads from benchSlots{} ✅
  ↓
Bench shows robot as deployed (empty slot) ✅
```

### **Robot Defeated → Repair Bay**:
```
Robot defeated
  ↓
sendToRepairBay(robotId)
  ↓
Repair Bay full? (3rd robot)
  ↓
returnToBench(oldestRobotId, team, addRebootingStatus=true)
  ↓
Write to: benchSlots[emptySlot].robotId = robotId ✅
Set: rebootingRobots[robotId] = 1 ✅
  ↓
updateBenchDisplay() reads from benchSlots{} ✅
  ↓
Bench shows robot with "⏳ Rebooting" badge ✅
```

---

## 🧪 **Testing**

1. **Start Game**: All 6 robots appear in bench ✅
2. **Deploy Robot**: Robot disappears from bench ✅
3. **Robot Defeated**: Goes to Repair Bay (grayscale, pulsing) ✅
4. **3rd Robot Defeated**: Oldest robot pushed to bench with "⏳ Rebooting" ✅
5. **Bench Display**: Robot visible with orange "⏳ Rebooting" badge ✅
6. **Try to Deploy**: Blocked with error message ✅
7. **End Turn**: Rebooting countdown processes ✅
8. **Next Turn**: Rebooting status removed, robot deployable ✅

---

## ✅ **Result**

**Before**: Robots disappeared when returning from Repair Bay  
**After**: Robots properly return to bench with "Rebooting: 1" status and are visible

---

## 📝 **Files Modified**

| File | Lines | Change |
|------|-------|--------|
| `index.html` | 16096-16122 | `updateBenchDisplay()` - read from `benchSlots` |
| `index.html` | 16081-16104 | `deployTeamToBench()` - write to both structures |
| `index.html` | 16560-16567 | `deployRobotToPoint()` - clear from both structures |
| `index.html` | 16721-16728 | `executeSmartDeployment()` - clear from both structures |

---

**Last Updated**: October 12, 2025  
**Status**: ✅ **FIXED**  
**Issue**: Robots now properly return to bench from Repair Bay with "Rebooting: 1" status
