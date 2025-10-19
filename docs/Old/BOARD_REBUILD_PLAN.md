# 🔧 Game Board Rebuild Plan

## 📋 Issues Identified

### **Critical Problems:**

1. **Inner Square Not Connected to Outer Routes**
   - Inner 8 points only connect to each other
   - Should connect to outer route points
   - Players can't move between inner and outer areas

2. **Movement System Wrong**
   - Current: BFS allows unlimited multi-hop movement
   - Correct: MP = exact number of steps (1 step = 1 route)
   - Should count steps, not just find reachable points

3. **Deployment Costs Nothing**
   - Current: Free deployment from bench
   - Correct: Deployment costs 1 MP (counts as the move)

4. **No Blocking**
   - Current: Can move through occupied points
   - Correct: Cannot move through ANY occupied point

5. **Combat Resolution Incomplete**
   - Missing: Damage comparison (White vs White)
   - Missing: Star rating comparison (Purple vs Purple)
   - Missing: Proper draw handling

6. **Turn Structure Missing Phases**
   - Missing: Module Phase (Support Modules)
   - Missing: Subroutine Phase (Abilities)
   - Only has: Movement + Combat

7. **Advanced Mechanics Missing**
   - No Surrounding (instant KO)
   - No Repair Bay (2-unit capacity)
   - No Rebooting status
   - No Status effects

---

## 🎯 Rebuild Strategy

### **Phase 1: Fix Board Connections** ✅
Add connections between inner square and outer routes:
- `point-inner-tl` ↔ `point-top-1`, `point-left-1`
- `point-inner-tr` ↔ `point-top-4`, `point-right-1`
- `point-inner-bl` ↔ `point-bottom-1`, `point-left-3`
- `point-inner-br` ↔ `point-bottom-4`, `point-right-3`
- `point-inner-top` ↔ `goal-opponent`
- `point-inner-bottom` ↔ `goal-player`

### **Phase 2: Fix Movement System** 🔄
Replace BFS with proper step-counting:
```javascript
// OLD (Wrong):
calculateValidMovesWithinMP(startPoint, maxMP) {
    // Returns all reachable points via BFS
    // Allows moving through multiple hops
}

// NEW (Correct):
calculateValidMoves(startPoint, maxMP) {
    // Count exact steps along routes
    // Each connected point = 1 step
    // Cannot move through occupied points
    // Return points exactly 1, 2, or 3 steps away
}
```

### **Phase 3: Fix Deployment** 🔄
```javascript
// Deployment from bench:
// - Costs 1 MP
// - Can only go to Entry Points
// - Entry Point must be unoccupied
// - This IS the unit's move for the turn
```

### **Phase 4: Fix Combat** 🔄
```javascript
determineBattleWinner(attackerMove, defenderMove) {
    // Add damage comparison
    if (both White || both Gold) {
        compare damage values
    }
    
    // Add star rating comparison
    if (both Purple) {
        compare star ratings
    }
    
    // Proper draw handling
    if (equal) return 'draw'
}
```

### **Phase 5: Add Turn Structure** 🆕
```javascript
turnPhases: {
    MODULE: 'module',      // Use Support Module
    SUBROUTINE: 'ability', // Activate Ability
    MOVEMENT: 'movement',  // Move unit (mandatory)
    COMBAT: 'combat'       // Battle if adjacent
}

// Phases are irreversible
// Once you move, can't go back to Module phase
```

### **Phase 6: Add Advanced Mechanics** 🆕
```javascript
// Surrounding
checkSurrounding(pointId) {
    // If all adjacent points occupied by enemy
    // Instant KO without battle
}

// Repair Bay
repairBay: {
    capacity: 2,
    units: [],
    addUnit(robotId) {
        if (units.length >= 2) {
            // Cycle oldest to bench with Rebooting:1
        }
    }
}

// Status Effects
statusEffects: {
    poison, paralysis, burn, confusion,
    sleep, frozen, noxious
}
```

---

## 📐 Correct Board Connections

### **26 Field Points + 2 Goals = 28 Total**

**Outer Rectangle (16 points):**
- Top row: 4 points
- Right side: 3 points  
- Bottom row: 4 points
- Left side: 3 points
- 2 Entry points per corner (included in counts)

**Inner Square (8 points):**
- 4 corners
- 4 mid-points (top, bottom, left, right)

**Goals (2 points):**
- Opponent goal (top center)
- Player goal (bottom center)

### **Connection Rules:**
1. Outer points connect along the rectangle perimeter
2. Inner points connect to form inner square
3. **Inner corners connect to outer corners**
4. **Inner mid-points connect to goals**
5. Entry points are corners of outer rectangle

---

## 🔢 Movement Examples

### **3 MP Scout:**
```
Start: entry-bottom-left
Can move to:
- 1 step: point-left-1, point-bottom-1
- 2 steps: point-left-2, point-inner-bl, point-bottom-2
- 3 steps: point-left-3, point-inner-left, point-inner-bottom, goal-player

Total: 8-10 possible destinations
```

### **2 MP Vanguard:**
```
Start: point-left-2
Can move to:
- 1 step: point-left-1, point-left-3
- 2 steps: entry-top-left, entry-bottom-left, point-inner-left

Total: 5 possible destinations
```

### **1 MP Sentinel:**
```
Start: goal-player
Can move to:
- 1 step: point-bottom-2, point-bottom-3, point-inner-bottom

Total: 3 possible destinations
```

---

## ⚔️ Combat Matrix (Correct)

| Attacker ↓ / Defender → | Red | White | Purple | Gold | Blue |
|-------------------------|-----|-------|--------|------|------|
| **Red** | Draw | Lose | Lose | Lose | Lose |
| **White** | Win | Compare Damage | Lose | Compare Damage | Lose |
| **Purple** | Win | Win | Compare Stars | Lose | Lose |
| **Gold** | Win | Compare Damage | Win | Compare Damage | Lose |
| **Blue** | Win | Win | Win | Win | Draw |

**Special Rules:**
- White vs White: Higher damage wins, equal = draw
- Gold vs Gold: Higher damage wins, equal = draw
- Purple vs Purple: Higher stars win, equal = draw
- Red vs Red: Always draw
- Blue vs Blue: Always draw

---

## 🎮 Turn Structure (Correct)

```
1. MODULE PHASE (Optional)
   ↓
2. SUBROUTINE PHASE (Optional)
   ↓
3. MOVEMENT PHASE (Mandatory)
   - Select unit on board OR bench
   - Move according to MP
   - Deployment costs 1 MP
   ↓
4. COMBAT PHASE (Optional if adjacent)
   - Choose to battle or pass
   - If battle, spin Combat Dials
   - Loser goes to Repair Bay
```

**Key Rule:** Phases are irreversible. Once you move, you can't use a Module.

---

## 🛠️ Implementation Order

1. ✅ **Fix board connections** (add inner↔outer links)
2. ✅ **Rebuild movement system** (proper step counting)
3. ✅ **Fix deployment** (costs 1 MP)
4. ✅ **Fix combat** (damage/star comparison)
5. ⏳ **Add turn phases** (Module→Subroutine→Movement→Combat)
6. ⏳ **Add Repair Bay** (2-unit capacity + cycling)
7. ⏳ **Add Surrounding** (instant KO)
8. ⏳ **Add Status Effects** (Poison, Paralysis, etc.)
9. ⏳ **Add Support Modules** (Plates)
10. ⏳ **Add Subroutines** (Abilities)

---

**Status:** Ready to rebuild core systems
**Priority:** Fix movement and connections first
**Timeline:** Implement in order listed above
