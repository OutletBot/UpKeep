# 🗺️ Battle Board Layout Guide

## 📐 The Board Structure

The battle board has **28 points** arranged in a specific pattern:

```
        [Entry]              [Entry]
           |                    |
    [Point]--[Point]--[Point]--[Point]
       |        |        |        |
    [Point]--[Inner]--[Inner]--[Point]
       |        |        |        |
    [Point]--[Inner]--[Inner]--[Point]
       |        |        |        |
    [Point]--[Point]--[Point]--[Point]
           |                    |
        [Goal]               [Goal]
```

---

## 🎯 Inner Square Points

The **inner square** has 4 points forming a smaller square in the center:

```
     [Top-Left]----[Top-Right]
          |              |
          |              |
  [Bottom-Left]----[Bottom-Right]
```

### **Each Inner Point Has 4 Connections:**
- Up
- Down  
- Left
- Right

**To surround an inner point, you need 4 robots!**

---

## 📍 Your Specific Case

If Venusaur is on **left edge of inner square**, here's the layout:

```
Outer Points:
    [B] = Bulbasaur (your robot)
    [ ] = Empty
    [ ]
    
Inner Square:
    [V] = Venusaur (enemy)
    [ ] = Empty (RIGHT of Venusaur)
    
Outer Points:
    [P] = Pikachu (your robot)
    [ ]
    [ ]
```

### **Venusaur's Connections:**
1. ✅ **Up** → Bulbasaur (occupied)
2. ✅ **Down** → Pikachu (occupied)
3. ❌ **Right** → Empty inner point (NOT occupied)
4. ❌ **Left** → Empty outer point (NOT occupied)

**Result: NOT SURROUNDED - 2 escape routes!**

---

## ✅ How to Complete the Surround

You need to occupy **ALL 4 adjacent points**:

```
Step 1: Current State
    [B]
     |
    [V]--[ ]  ← Need robot here!
     |
    [P]

Step 2: Deploy 2 more robots
    [B]
     |
[R1]-[V]-[R2]  ← Fill both sides!
     |
    [P]

Step 3: SURROUNDED! ⚡
All 4 connections occupied
Venusaur knocked out!
```

---

## 🎯 Point Connection Counts

Different points have different numbers of connections:

### **Corner Points (2 connections)**
```
[X]--[ ]
 |
[ ]

Easiest to surround!
Only need 2 robots
```

### **Edge Points (3 connections)**
```
    [ ]
     |
[X]--[ ]
     |
    [ ]

Need 3 robots
```

### **Inner Points (4 connections)**
```
    [ ]
     |
[ ]--[X]--[ ]
     |
    [ ]

Hardest to surround!
Need 4 robots
```

### **Junction Points (5+ connections)**
```
    [ ]
     |
[ ]--[X]--[ ]
   / | \
  /  |  \
[ ] [ ] [ ]

Very hard to surround!
Need 5+ robots
```

---

## 🔍 How to Check Connections

**In the console, after moving, you'll see:**

```javascript
🔍 Checking if Venusaur at point-inner-left is surrounded...
   Adjacent points (4): ['point-top', 'point-bottom', 'point-left', 'point-right']
   - point-top: Bulbasaur (player) ✅
   - point-bottom: Pikachu (player) ✅
   - point-left: EMPTY ❌
   - point-right: EMPTY ❌
   ❌ NOT surrounded - point-left is empty
```

This tells you **exactly** which points need robots!

---

## 🎮 Recommended Surround Targets

### **Easy Targets (2-3 connections):**
- ✅ Goal Points (usually 3 connections)
- ✅ Corner Entry Points (2 connections)
- ✅ Edge Points (3 connections)

### **Hard Targets (4+ connections):**
- ❌ Inner Square Points (4 connections)
- ❌ Center Junction Points (5+ connections)

**Start with easy targets to learn the mechanic!**

---

## 🎯 Your Next Steps

**To surround Venusaur on inner-left point:**

```
1. You have: Bulbasaur (top), Pikachu (bottom)
2. You need: 2 MORE robots
3. Deploy robot 3 → Move to LEFT of Venusaur
4. Deploy robot 4 → Move to RIGHT of Venusaur
5. ⚡ ALL 4 connections occupied!
6. SURROUND! Venusaur knocked out!
```

---

## 📊 Quick Reference

| Point Type | Connections | Robots Needed | Difficulty |
|------------|-------------|---------------|------------|
| Corner | 2 | 2 | ⭐ Easy |
| Edge | 3 | 3 | ⭐⭐ Medium |
| Inner | 4 | 4 | ⭐⭐⭐ Hard |
| Junction | 5+ | 5+ | ⭐⭐⭐⭐ Very Hard |

---

**The key: Count the connection LINES coming from the target, not just the robots you have nearby!** 🎯✨
