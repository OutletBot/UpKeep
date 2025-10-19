# 🎮 Movement Rules - Complete Guide

## 📐 The Battlefield Grid

### **Structure:**
- **26 field points** + **2 goal points** = **28 total points**
- Symmetrical design (identical halves for each player)
- Connected by routes (pathways between points)

### **Layout Zones:**

**Back Row:**
- Goal Point (center) - Your last defense, opponent's target
- Entry Points (2 corners) - Only way to deploy from bench

**Inner Lanes:**
- Shorter, direct paths
- Converge in center
- High-traffic battle zones

**Outer Lanes:**
- Longer edge pathways
- Safer but slower routes
- Flanking opportunities

---

## ✅ MOVEMENT RULES - What You CAN Do

### **1. Use Movement Points (MP)**
```
Each robot has MP stat (1-3):
- 1 MP = Defender/Goalie (slow, defensive)
- 2 MP = Fighter (balanced)
- 3 MP = Runner/Scout (fast, offensive)

You can move UP TO your MP value:
- 3 MP robot can move 1, 2, OR 3 steps
- Not required to use all MP
```

### **2. Deploy from Bench**
```
Action: Move robot from Bench → Entry Point
Cost: Exactly 1 MP
Rules:
  - Must use one of your 2 Entry Points
  - Entry Point must be EMPTY
  - This counts as your ENTIRE move for the turn
  - Robot appears on entry point (no additional movement)
```

### **3. Move in Any Direction**
```
Freedom: Can move forward, backward, sideways
Requirement: Points must be connected by routes
Limit: Cannot exceed MP value
```

---

## ❌ MOVEMENT RULES - What You CANNOT Do

### **1. CANNOT Move Through Other Robots** 🚫
```
CRITICAL RULE: Occupied points are BLOCKED

Example:
  [A]--[B]--[C]

If point B has ANY robot (yours or enemy):
  - Robot at A CANNOT reach C
  - Must go around (if alternate route exists)
  - This creates chokepoints and defensive walls
```

**Strategic Implications:**
- ✅ Create defensive formations
- ✅ Block enemy advance
- ✅ Force enemies into specific paths
- ✅ Enable "Surrounding" tactic

### **2. CANNOT Deploy to Occupied Entry Point** 🚫
```
Rule: Entry Point must be EMPTY to deploy

Scenario:
  - You have robot on Entry Point A
  - Entry Point B is also occupied
  - You CANNOT deploy new robots!
  - Must move robots away from entry points first

Enemy Tactic:
  - Enemy can BLOCK your Entry Points
  - Prevents you from deploying reinforcements
  - Powerful strategic move (Entry Point Denial)
```

### **3. CANNOT Move Multiple Robots Per Turn** 🚫
```
Rule: ONE robot moves per turn

Turn Structure:
  1. Select ONE robot
  2. Move it (up to MP steps)
  3. Battle (if adjacent to enemy)
  4. Turn ENDS

You CANNOT:
  - Move multiple robots in one turn
  - Move same robot twice
  - "Chain" movements
```

### **4. CANNOT Use Full MP on First Turn** 🚫
```
Special Rule: First move of game has -1 MP penalty

Example:
  - You go first
  - Select 3 MP robot
  - First turn only: 3 MP - 1 = 2 MP available
  - Subsequent turns: Full 3 MP

Strategy:
  ✅ Start with 3 MP robot (still gets 2 MP)
  ❌ Don't start with 1 MP robot (would get 0 MP!)
```

---

## 🎯 Strategic Concepts

### **Blocking & Chokepoints**
```
Use robots to create walls:

Defensive Wall:
  [Your Goal]
       |
  [R1]-[R2]-[R3]  ← Your robots form barrier
       |
  [Enemy approaches]

Result: Enemy must go around or battle through
```

### **Entry Point Control**
```
Offensive Tactic: Block enemy entry points

Enemy Back Row:
  [Entry]--[Goal]--[Entry]
     ↑               ↑
  [Your R1]    [Your R2]

Result: Enemy cannot deploy new robots!
```

### **Surrounding**
```
Ultimate Blocking Tactic:

    [R1]
     |
[R2]-[E]-[R3]  ← Enemy surrounded
     |
    [R4]

All adjacent points occupied = INSTANT KO!
No battle needed
```

---

## 📊 Movement Point Strategy

### **1 MP Robots (Defenders/Goalies)**
**Role:** Defensive, goal protection
**Strengths:**
- Strong combat stats
- Hard to dislodge
- Excellent goalies

**Weaknesses:**
- Very slow
- Can't chase enemies
- Easy to surround if isolated

**Best Use:**
- Place on Goal Point
- Defensive chokepoints
- Last line of defense

### **2 MP Robots (Fighters)**
**Role:** Balanced, core units
**Strengths:**
- Good mobility + combat
- Versatile positioning
- Main battle force

**Weaknesses:**
- Not specialized
- Can be outrun by 3 MP
- Can be outfought by 1 MP

**Best Use:**
- Control center of board
- Main offensive push
- Flexible response

### **3 MP Robots (Runners/Scouts)**
**Role:** Offensive, mobility
**Strengths:**
- Fastest movement
- Goal rush capability
- Flanking maneuvers

**Weaknesses:**
- Often weaker combat
- Fragile if caught
- Can overextend

**Best Use:**
- Early pressure
- Entry Point blocking
- Goal capture attempts

---

## 🎮 Turn Structure

### **Complete Turn Sequence:**
```
1. Module Phase (NOT IMPLEMENTED YET)
   - Use Support Module (optional)

2. Subroutine Phase (NOT IMPLEMENTED YET)
   - Activate robot ability (optional)

3. Movement Phase (REQUIRED)
   - Select ONE robot
   - Move up to MP steps
   - OR deploy from bench

4. Combat Phase (OPTIONAL)
   - If adjacent to enemy after move
   - Can initiate battle
   - Turn ends after battle

5. Turn Ends
   - Next player's turn begins
```

---

## ✅ Current Implementation Status

### **Implemented:**
- ✅ MP-based movement (1-3 MP)
- ✅ BFS pathfinding (finds valid moves)
- ✅ Blocking (cannot move through robots)
- ✅ Entry Point deployment
- ✅ Turn system with "End Turn" button
- ✅ Multiple robots can move per turn
- ✅ Surrounding mechanic (instant KO)

### **Partially Implemented:**
- ⚠️ Deployment = full turn (currently can deploy + move)
- ⚠️ Entry Point blocking (works but not enforced)

### **Not Implemented:**
- ❌ First turn -1 MP penalty
- ❌ Module Phase
- ❌ Subroutine Phase
- ❌ Entry Point deployment restriction (if occupied)

---

## 🔧 Fixes Needed

### **Priority 1: Deployment Should End Turn**
```
CURRENT (WRONG):
  1. Deploy robot to entry point
  2. Robot auto-selected
  3. Can move full MP
  4. Effectively gets MP+1 movement

SHOULD BE:
  1. Deploy robot to entry point
  2. Turn ENDS immediately
  3. Next turn can move normally
  4. Deployment costs 1 MP (your entire move)
```

### **Priority 2: First Turn MP Penalty**
```
NEEDED:
  - Track if this is first move of game
  - If yes, reduce selected robot's MP by 1
  - Only for first move, then normal MP
```

### **Priority 3: Entry Point Deployment Check**
```
NEEDED:
  - Before deploying, check if entry point is empty
  - If occupied, show error message
  - Force player to move robot away first
```

---

## 🎯 Key Takeaways

**The Golden Rules:**
1. **One robot moves per turn** (no exceptions)
2. **Cannot move through occupied points** (creates all tactics)
3. **Entry Points are critical** (control them or lose)
4. **Deployment = your entire move** (costs 1 MP, turn ends)
5. **First move has -1 MP** (balance mechanic)

**Strategic Pillars:**
- **Blocking** creates defensive walls
- **Entry Point control** denies reinforcements
- **Surrounding** achieves instant KO
- **MP management** balances speed vs power
- **Route control** dominates the board

---

## 📋 Implementation Checklist

**Core Movement (DONE):**
- ✅ MP-based pathfinding
- ✅ Route connections
- ✅ Blocking occupied points
- ✅ Visual movement

**Deployment (NEEDS FIX):**
- ✅ Deploy to entry points
- ❌ Deployment ends turn (currently broken)
- ❌ Check entry point is empty

**Turn System (NEEDS FIX):**
- ✅ End Turn button
- ✅ Turn counter
- ❌ First turn -1 MP penalty
- ❌ One move per turn enforcement

**Advanced (NOT STARTED):**
- ❌ Module Phase
- ❌ Subroutine Phase
- ❌ Entry Point blocking enforcement

---

**Movement is the foundation of all strategy - master it to dominate!** 🎯✨
