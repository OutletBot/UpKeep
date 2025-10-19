# 🎯 Movement Range System - How MP Works

## 📏 Distance Calculation

### **Core Rule:**
**MP = Number of steps you can take along routes**

The entry point (where your robot starts) is **distance 0**.  
Each step along a route costs **1 MP**.

---

## 🗺️ Visual Examples

### **Example 1: Robot with 1 MP**

```
Starting Position: entry-bottom-left

Board Layout:
    [point-left-1]
         |
    [entry-bottom-left] ←── Robot here (distance 0)
         |
    [point-bottom-1]

With 1 MP, robot can reach:
✅ point-bottom-1 (distance 1 - costs 1 MP)
✅ point-left-1 (distance 1 - costs 1 MP)

Cannot reach:
❌ Points 2+ steps away (not enough MP)
```

---

### **Example 2: Robot with 2 MP**

```
Starting Position: entry-bottom-left

Board Layout:
    [point-left-2]
         |
    [point-left-1]
         |
    [entry-bottom-left] ←── Robot here (distance 0)
         |
    [point-bottom-1]
         |
    [point-bottom-2]

With 2 MP, robot can reach:
✅ point-bottom-1 (distance 1 - costs 1 MP)
✅ point-left-1 (distance 1 - costs 1 MP)
✅ point-bottom-2 (distance 2 - costs 2 MP)
✅ point-left-2 (distance 2 - costs 2 MP)

Cannot reach:
❌ Points 3+ steps away (not enough MP)
```

---

### **Example 3: Robot with 3 MP**

```
Starting Position: entry-bottom-left

Board Layout:
    [point-left-3]
         |
    [point-left-2]
         |
    [point-left-1]
         |
    [entry-bottom-left] ←── Robot here (distance 0)
         |
    [point-bottom-1]
         |
    [point-bottom-2]
         |
    [point-bottom-3]

With 3 MP, robot can reach:
✅ point-bottom-1 (distance 1)
✅ point-left-1 (distance 1)
✅ point-bottom-2 (distance 2)
✅ point-left-2 (distance 2)
✅ point-bottom-3 (distance 3)
✅ point-left-3 (distance 3)

Cannot reach:
❌ Points 4+ steps away (not enough MP)
```

---

## 🚫 Blocking Rules

### **Occupied Points Block Movement**

```
Starting Position: entry-bottom-left
Robot MP: 3

Board Layout:
    [point-left-2] ← Can't reach (blocked)
         |
    [point-left-1] ← ENEMY ROBOT HERE 🤖
         |
    [entry-bottom-left] ←── Your robot (distance 0)
         |
    [point-bottom-1] ← Can reach ✅
         |
    [point-bottom-2] ← Can reach ✅

With 3 MP, robot can reach:
✅ point-bottom-1 (distance 1 - path is clear)
✅ point-bottom-2 (distance 2 - path is clear)

Cannot reach:
❌ point-left-1 (occupied by enemy)
❌ point-left-2 (blocked by enemy at point-left-1)
```

**Key Point:** You cannot move TO or THROUGH occupied points!

---

## 🔄 BFS Algorithm Explanation

### **How the System Calculates Valid Moves:**

```javascript
1. Start at robot's position (distance 0)
2. Look at all connected points
3. For each connected point:
   - If empty: Mark as reachable at distance + 1
   - If occupied: Block (can't go here or through)
4. Continue from reachable points until MP exhausted
5. Return all reachable points
```

### **Step-by-Step Example (2 MP):**

```
Step 1: Start at entry-bottom-left (distance 0)
  └─> Queue: [entry-bottom-left]

Step 2: Explore from entry-bottom-left
  ├─> Found point-bottom-1 (empty)
  │   └─> Add to validMoves (distance 1)
  │   └─> Add to queue (can explore further)
  └─> Found point-left-1 (empty)
      └─> Add to validMoves (distance 1)
      └─> Add to queue (can explore further)

Step 3: Explore from point-bottom-1 (distance 1)
  └─> Found point-bottom-2 (empty)
      └─> Add to validMoves (distance 2)
      └─> Don't add to queue (distance 2 = maxMP)

Step 4: Explore from point-left-1 (distance 1)
  └─> Found point-left-2 (empty)
      └─> Add to validMoves (distance 2)
      └─> Don't add to queue (distance 2 = maxMP)

Result: validMoves = [
  point-bottom-1,  // 1 step away
  point-left-1,    // 1 step away
  point-bottom-2,  // 2 steps away
  point-left-2     // 2 steps away
]
```

---

## 🎮 In-Game Examples

### **Scenario 1: Clear Path**

```
Your Scout (3 MP) at entry-bottom-left
No obstacles

Can move to:
✅ Any point 1 step away (4 options)
✅ Any point 2 steps away (4 options)
✅ Any point 3 steps away (4 options)

Total: ~12 possible destinations
```

### **Scenario 2: Blocked Path**

```
Your Scout (3 MP) at entry-bottom-left
Enemy at point-bottom-1

Can move to:
✅ point-left-1 (1 step - clear path)
✅ point-left-2 (2 steps - clear path)
✅ point-left-3 (3 steps - clear path)

Cannot move to:
❌ point-bottom-1 (occupied)
❌ point-bottom-2 (blocked by enemy)
❌ point-bottom-3 (blocked by enemy)

Total: ~6 possible destinations (half blocked)
```

### **Scenario 3: Multiple Robots**

```
Your team:
- Scout A (3 MP) at entry-bottom-left
- Vanguard B (2 MP) at point-bottom-1

Scout A can move:
✅ Left path (clear)
❌ Bottom path (blocked by Vanguard B)

Vanguard B can move:
✅ Forward 1-2 steps
✅ Sideways if connected
❌ Backward (Scout A is there)
```

---

## 📊 MP by Robot Type

| Robot Type | MP | Description |
|------------|----|----|
| **Scout** | 3 | High mobility, can reach far points |
| **Vanguard** | 2 | Balanced, moderate range |
| **Sentinel** | 1 | Low mobility, defensive |

---

## 🧪 Testing the System

### **Test 1: Basic Movement**
1. Deploy Scout (3 MP) to entry-bottom-left
2. Click Scout → Should highlight points 1, 2, and 3 steps away
3. Count green highlights → Should be ~8-12 points

### **Test 2: Blocking**
1. Deploy Scout A to entry-bottom-left
2. Deploy Scout B to point-bottom-1
3. Click Scout A → Bottom path should be blocked
4. Only left/side paths should highlight

### **Test 3: Different MP Values**
1. Deploy Sentinel (1 MP) → Only adjacent points highlight
2. Deploy Vanguard (2 MP) → Points 1-2 steps highlight
3. Deploy Scout (3 MP) → Points 1-3 steps highlight

---

## 🔍 Console Logging

When you select a robot, watch the console:

```javascript
🔍 BFS starting from entry-bottom-left with 3 MP
🔎 Exploring from entry-bottom-left (distance 0), connections: [...]
✅ point-bottom-1 is reachable at distance 1
✅ point-left-1 is reachable at distance 1
🔎 Exploring from point-bottom-1 (distance 1), connections: [...]
✅ point-bottom-2 is reachable at distance 2
🔎 Exploring from point-bottom-2 (distance 2), connections: [...]
✅ point-bottom-3 is reachable at distance 3
⏹️ Stopping at point-bottom-3 (distance 3 >= maxMP 3)
🎯 Found 12 valid moves within 3 steps from entry-bottom-left
```

This shows:
- Starting point
- Each step of exploration
- Distance calculations
- Final count of valid moves

---

## ✅ Summary

### **How MP Works:**
1. **Entry point = distance 0** (where robot starts)
2. **Adjacent points = distance 1** (costs 1 MP)
3. **2 steps away = distance 2** (costs 2 MP)
4. **3 steps away = distance 3** (costs 3 MP)

### **Blocking:**
- ❌ Cannot move TO occupied points
- ❌ Cannot move THROUGH occupied points
- ✅ Can move around obstacles via alternate routes

### **Visual Feedback:**
- 🟢 Green highlights = Valid destinations
- ⭐ Gold glow = Selected robot
- 🔴 Red robots = Enemies (block your path)

---

**The system correctly counts steps from your starting position! Entry point is step 0, and you can move up to your MP value in steps!** 🎯✨
