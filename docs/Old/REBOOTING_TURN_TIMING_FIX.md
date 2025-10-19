# Rebooting Turn Timing Fix

## 🐛 **Critical Bug**
Robots returning from Repair Bay could be deployed **immediately on the next turn**, instead of waiting 1 full turn.

**User Report**:
> "opponent knocked out my robot... bumped a robot out of the repair bay to my bench. his turn ends, my turn begins, my robot has rebooting displayed... i click the robot thats rebooting. im able to move it."

---

## 🔍 **Root Cause Analysis**

### **The Problem**:
Robot was set to `Rebooting: 1`, but `processRebootingStatus()` runs **at the START of each turn** and decrements the value.

### **Broken Flow**:
```
Turn X (Opponent):
  - Robot defeated → Repair Bay overflow
  - Oldest robot pushed to PLAYER bench
  - rebootingRobots[robotId] = 1 ✅
  
Turn X+1 (PLAYER turn starts):
  - processRebootingStatus('player') runs
  - Countdown: 1 → 0 ❌
  - Status removed immediately
  - Player clicks robot → DEPLOYS ❌❌❌
```

**Result**: Robot usable on the VERY NEXT TURN after returning!

---

## 🎯 **The Fix**

Changed initial rebooting value from **1 → 2**:

**Before** (Line 17743):
```javascript
this.rebootingRobots[robotId] = 1; // Wait 1 turn
console.log(`⏳ ${robotId} has "Rebooting: 1" status`);
```

**After**:
```javascript
this.rebootingRobots[robotId] = 2; // Wait 1 full turn (2 because it decrements immediately on next turn start)
console.log(`⏳ ${robotId} has "Rebooting: 2" status - cannot deploy for 1 full turn`);
```

---

## ✅ **Correct Flow**

### **Turn X (Opponent's Turn)**
```
1. Player's robot defeated
2. Repair Bay overflow (already has 2 robots)
3. Oldest robot pushed to PLAYER bench
4. rebootingRobots[robotId] = 2 ✅
5. Robot shows "⏳ Rebooting" badge
6. Opponent turn ends
```

### **Turn X+1 (PLAYER Turn Starts)**
```
7. processRebootingStatus('player') called
8. Countdown: 2 → 1 ✅
9. Check: isRobotRebooting(robotId) → TRUE (value is 1)
10. Player clicks robot → BLOCKED ✅
11. Message: "is rebooting - cannot deploy this turn"
12. Player turn ends
```

### **Turn X+2 (Opponent Turn Starts)**
```
13. processRebootingStatus('opponent') called
14. Robot belongs to PLAYER, not processed ✅
15. Player's robot still has value: 1
16. Opponent turn ends
```

### **Turn X+3 (PLAYER Turn Starts)**
```
17. processRebootingStatus('player') called
18. Countdown: 1 → 0 ✅
19. Status removed
20. Player clicks robot → DEPLOYS ✅✅✅
```

---

## 📊 **Why Set to 2 Instead of 1?**

### **Key Insight**:
`processRebootingStatus()` runs **BEFORE the player can take any action** on their turn.

### **Timeline**:
- **Value 2**: Ensures the countdown happens BEFORE player's first action
- **Value 1**: Gets decremented to 0 immediately, allowing instant deployment

### **Math**:
```
Rebooting: 2
  ↓ (Turn X+1 starts)
processRebootingStatus() → Decrement
  ↓
Rebooting: 1 → Player tries to deploy → BLOCKED ✅
  ↓ (Turn X+2)
processRebootingStatus() → Decrement  
  ↓
Rebooting: 0 → Status removed
  ↓ (Turn X+3)
Player can deploy ✅
```

**Result**: Robot waits **1 FULL TURN CYCLE** as intended!

---

## 🧪 **Testing**

### **Test Case: 1-Turn Cooldown**
1. Have 3 robots defeated (3rd pushes oldest to bench)
2. **Opponent's Turn**: Robot returns with "Rebooting: 2"
3. **Your Turn Starts**: 
   - Console: "countdown: 2 → 1"
   - Try to deploy: **BLOCKED** ✅
4. **Opponent's Turn**: No change (different team)
5. **Your Turn Starts Again**:
   - Console: "countdown: 1 → 0"
   - Try to deploy: **ALLOWED** ✅

### **Expected Behavior**:
✅ Robot cannot be deployed for **1 full turn** after returning  
✅ Robot becomes available on **the 2nd turn** after returning

---

## 🎮 **Game Balance Impact**

### **Before Fix** (Broken):
- Repair Bay overflow → Robot returns
- Next turn → **Immediately usable**
- No real penalty for losing robots
- Repair Bay = "free revive"

### **After Fix** (Correct):
- Repair Bay overflow → Robot returns
- Next turn → **Still rebooting (blocked)**
- 2nd turn → **Ready for deployment**
- Real strategic cost to losing robots

---

## 📝 **Code Changes**

| File | Line | Change |
|------|------|--------|
| `index.html` | 17743 | Changed `rebootingRobots[robotId] = 1` → `= 2` |
| `index.html` | 17744 | Updated console message for clarity |

---

## ⚠️ **Why This Was Critical**

Without this fix, the "Rebooting" mechanic was **completely broken**:
- Visual badge showed "Rebooting" ✓
- Deployment was blocked for 0.5 seconds (visual only) ✗
- Robot usable on very next turn ✗
- No actual cooldown penalty ✗

---

## ✅ **Result**

**Before**: Rebooting robots usable immediately next turn (0-turn wait)  
**After**: Rebooting robots wait 1 full turn before deployment (1-turn wait)

---

**Last Updated**: October 12, 2025  
**Status**: ✅ **FIXED**  
**Issue**: Rebooting countdown now properly enforces 1-turn wait period
