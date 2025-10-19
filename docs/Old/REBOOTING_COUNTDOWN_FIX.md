# Rebooting Countdown Fix

## 🐛 **Problem**
Robots showing "⏳ Rebooting" badge could still be deployed immediately without waiting a turn.

**User Report**:
> "okay so it does show as rebooting now, but even thow it showed rebooting i was able to play it without waiting a turn."

---

## 🔍 **Root Cause**

The `processRebootingStatus()` function had flawed logic in the countdown check:

**Before** (Line 17825):
```javascript
if (belongsToTeam) {
    if (waitCount <= 1) {
        // Remove rebooting status IMMEDIATELY
        toRemove.push(robotId);
        console.log(`✅ ${robotId} rebooting complete`);
    } else {
        // Decrement wait count
        this.rebootingRobots[robotId]--;
    }
}
```

**The Bug**:
- Robot returns with `Rebooting: 1`
- Turn starts → `processRebootingStatus()` is called
- Check: `if (waitCount <= 1)` → **TRUE** (because 1 <= 1)
- Status removed **IMMEDIATELY** on same turn
- Robot deployable right away ❌

---

## ✅ **Solution**

Changed logic to **decrement FIRST, then check**:

**After**:
```javascript
if (belongsToTeam) {
    // Decrement wait count first
    this.rebootingRobots[robotId]--;
    console.log(`⏳ ${robotId} rebooting countdown: ${waitCount} → ${this.rebootingRobots[robotId]}`);
    
    // If countdown reaches 0, remove rebooting status
    if (this.rebootingRobots[robotId] <= 0) {
        toRemove.push(robotId);
        console.log(`✅ ${robotId} rebooting complete - can now deploy`);
    }
}
```

---

## 📊 **Correct Flow**

### **Turn X: Robot Returns from Repair Bay**
```
1. 3rd robot defeated → Repair Bay overflow
2. returnToBench(robotId, team, addRebootingStatus=true)
3. rebootingRobots[robotId] = 1 ✅
4. Robot appears in bench with "⏳ Rebooting" badge ✅
```

### **Turn X: Player Tries to Deploy**
```
5. Player clicks robot
6. selectRobotForDeployment() called
7. Check: isRobotRebooting(robotId) → TRUE ✅
8. Deployment BLOCKED ✅
9. Message: "Robot is rebooting - cannot deploy this turn" ✅
```

### **Turn X Ends**
```
10. End turn button clicked
11. Turn switches to opponent
```

### **Turn X+1: Opponent Turn Starts**
```
12. processRebootingStatus('opponent') called
13. Check robot belongs to opponent → YES
14. Decrement: rebootingRobots[robotId] = 1 → 0 ✅
15. Check: if (0 <= 0) → TRUE
16. Remove status: delete rebootingRobots[robotId] ✅
17. History: "Robot ready for deployment" ✅
```

### **Turn X+2: Player Turn Starts (Robot's Team)**
```
18. Robot no longer has rebooting status
19. Player clicks robot → Deployment allowed ✅
20. Robot deploys to field successfully ✅
```

---

## 🧪 **Testing**

### **Test Case 1: Rebooting Robot Deployment Block**
1. Have 3 robots defeated (3rd pushes oldest to bench)
2. **Verify**: Robot has "⏳ Rebooting" badge
3. **Try to deploy**: Click robot in bench
4. **Expected**: Blocked with message "is rebooting - cannot deploy this turn"
5. **Actual**: ✅ Blocked correctly

### **Test Case 2: Countdown Processing**
1. Robot with `Rebooting: 1` status
2. **End turn** (switch to opponent)
3. **Opponent turn starts**: `processRebootingStatus()` runs
4. **Console check**: Should show "countdown: 1 → 0"
5. **Expected**: Status removed after decrement
6. **Actual**: ✅ Status removed correctly

### **Test Case 3: Deploy After Cooldown**
1. Robot returned with `Rebooting: 1`
2. **Turn X**: Deployment blocked ✅
3. **Turn X+1**: Status decremented to 0, removed ✅
4. **Turn X+2** (back to robot's team): Try to deploy
5. **Expected**: Deployment allowed
6. **Actual**: ✅ Deployment works

---

## 📝 **Code Changes**

| File | Lines | Change |
|------|-------|--------|
| `index.html` | 17824-17836 | Fixed `processRebootingStatus()` countdown logic |

**Key Change**:
- **Before**: Check if `<= 1`, remove status OR decrement
- **After**: Decrement FIRST, then check if `<= 0` to remove

---

## ⚠️ **Why This Matters**

### **Game Balance**:
Without this fix, the "Rebooting" status is purely cosmetic. Players could:
- Deploy robots immediately after they return from Repair Bay
- Ignore the cooldown penalty entirely
- Essentially have unlimited robot recycling

### **With Fix**:
- Robots must wait **1 full turn** before redeployment
- Creates strategic decision: "Do I risk losing this robot knowing it won't return until next turn?"
- Repair Bay overflow has meaningful consequences

---

## ✅ **Result**

**Before**: Rebooting robots could be deployed immediately (visual bug only)  
**After**: Rebooting robots properly blocked for 1 turn, then deployable

---

**Last Updated**: October 12, 2025  
**Status**: ✅ **FIXED**  
**Issue**: Rebooting countdown now enforces 1-turn wait period correctly
