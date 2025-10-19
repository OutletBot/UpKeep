# Team Size Update: 5 → 6 Robots

## ✅ Changes Made

### **Team Size Changed from 5 to 6 Robots Per Player**

---

## 📝 Updated Components

### **1. TeamManager Configuration**
**File**: `index.html` (Lines 18888-18889)

**Changed**:
```javascript
// OLD:
selectedTeam: [], // Array of 5 robot IDs
maxTeamSize: 5,

// NEW:
selectedTeam: [], // Array of 6 robot IDs
maxTeamSize: 6,
```

---

### **2. UI Text Updates**

#### **Team Selection Header** (Line 5517)
```html
<!-- OLD: -->
<div class="tagline" id="battleSubtitle">Choose 5 robots for battle</div>

<!-- NEW: -->
<div class="tagline" id="battleSubtitle">Choose 6 robots for battle</div>
```

#### **All "Choose 5 robots" References Updated** (Lines 9115, 15448)
- Team selection phase subtitle: "Choose 6 robots for battle"
- Return to team selection subtitle: "Choose 6 robots for battle"

#### **Error Messages Updated** (Lines 13668, 18077)
```javascript
// OLD:
'Please select 5 robots before starting battle!'

// NEW:
'Please select 6 robots before starting battle!'
```

---

### **3. Team Slot HTML Structure**

**File**: `index.html` (Lines 5555-5558)

**Added 6th Slot**:
```html
<div class="squad-slot empty" data-slot="5">
    <div class="slot-number">6</div>
    <div class="slot-label">Empty</div>
</div>
```

**Previous State**: 5 slots (data-slot 0-4)  
**Current State**: 6 slots (data-slot 0-5)

---

### **4. Auto-Fill Team Function**

**File**: `index.html` (Lines 18955-18956)

**Changed**:
```javascript
// OLD:
// Add first 5 robots (in real game, would be more strategic)
allRobots.slice(0, 5).forEach(robotId => {

// NEW:
// Add first 6 robots (in real game, would be more strategic)
allRobots.slice(0, 6).forEach(robotId => {
```

---

### **5. Bench Slots Configuration** ✅ **Already Correct**

**File**: `index.html` (Lines 14099-14116)

**No changes needed** - Bench slots already supported 6 robots:

**Player Bench**:
- `bench-slot-1` through `bench-slot-6` ✅

**Opponent Bench**:
- `opponent-bench-slot-1` through `opponent-bench-slot-6` ✅

---

## 🧪 Testing Checklist

### **Test 1: Team Selection UI**
- [ ] Open Battle System
- [ ] Verify team selection shows "Choose 6 robots for battle"
- [ ] Verify 6 empty slots are visible in active squad header
- [ ] Select 6 robots from robot bay
- [ ] Verify all 6 slots fill up correctly

### **Test 2: Team Size Validation**
- [ ] Try to select 7th robot
- [ ] Expected: "Squad is full! Remove a robot first."
- [ ] Try to start battle with only 5 robots
- [ ] Expected: "Please select 6 robots before starting battle!"
- [ ] Select 6 robots and start battle
- [ ] Expected: Battle starts successfully

### **Test 3: Bench Display**
- [ ] Deploy all 6 robots to the game board
- [ ] Verify bench shows all 6 slots (empty after deployment)
- [ ] Have robots defeated and return to bench
- [ ] Verify all 6 bench slots can hold returning robots

### **Test 4: Auto-Fill**
- [ ] Use auto-fill team feature (if available)
- [ ] Verify exactly 6 robots are selected
- [ ] Verify team is marked as complete

---

## 📊 Summary Table

| Component | Old Value | New Value | Status |
|-----------|-----------|-----------|--------|
| **Max Team Size** | 5 | 6 | ✅ Updated |
| **Team Slots (UI)** | 5 slots | 6 slots | ✅ Updated |
| **Bench Slots** | 6 slots | 6 slots | ✅ Already correct |
| **UI Text** | "5 robots" | "6 robots" | ✅ Updated |
| **Error Messages** | "select 5" | "select 6" | ✅ Updated |
| **Auto-Fill** | 5 robots | 6 robots | ✅ Updated |

---

## 🎯 Expected Behavior

### **Team Selection Flow**:
1. Open Battle System → Team Selection screen
2. Subtitle shows: "Choose 6 robots for battle"
3. Active Squad shows 6 empty slots numbered 1-6
4. Select robots from Robot Bay (max 6)
5. When 6 selected, "Deploy for Battle" button enabled
6. Click "Deploy for Battle" → Battle game phase starts

### **Bench Capacity**:
- Each player has **6 bench slots**
- Can deploy all 6 robots to board (space permitting)
- Defeated robots return to bench slots
- Repair Bay overflow pushes to bench slots

---

## ✅ Verification

All references to "5 robots" have been updated to "6 robots":
- ✅ TeamManager.maxTeamSize
- ✅ UI text and subtitles
- ✅ Error messages
- ✅ Team slot HTML structure
- ✅ Auto-fill logic
- ✅ Comments in code

**Bench slots were already configured for 6 robots** - no changes needed there.

---

**Last Updated**: October 12, 2025  
**Status**: ✅ **COMPLETE**  
**Team Size**: **6 Robots Per Player**
