# 🧠 MEMORY RECOVERY FILE - January 14, 2025
## Quick Context Recovery for Future Sessions

---

## 🎯 **PROJECT OVERVIEW**

**Game:** Up-Keep - A turn-based robot battle game  
**Tech Stack:** Single-file HTML/CSS/JavaScript game (index.html)  
**Current Phase:** Polishing UI and fixing Combat Dial tap-and-hold feature

---

## 🔥 **CRITICAL CONTEXT - READ THIS FIRST**

### What We're Working On (Session 4 - Jan 14, 2025)

1. **Primary Goal:** Fix tap-and-hold functionality to show Combat Dial info overlay
2. **Secondary Goal:** Add visual separators between same-color moves on spinner wheels
3. **Status:** Spinner separators FIXED (2deg black lines), tap-and-hold handlers working but user needs to test on field robots

### Key Game Mechanics

- **Turn-based gameplay:** Player vs AI (debug mode = player controls both sides)
- **Robot deployment:** From bench → entry points → board movement
- **Combat Dial:** Each robot has a "wheel" with moves (damage, effects, probability)
- **Status Effects:** Conditions (Poison, Burn, etc.) and Markers (MP-1, Rebooting)
- **Battle Modal:** Shows both spinners when robots battle

---

## 🐛 **CRITICAL BUGS FIXED (Recent History)**

### Bug #1: Event Bubbling (FIXED ✅)
**Problem:** Combat Dial handlers attached to BOTH robot group AND click circle  
**Result:** Multiple mousedown events → Hold timer constantly resets  
**Solution:** Only attach to `robotGroup`, NOT `clickCircle` child  
**Files Changed:** `index.html` lines ~17075, ~17183, ~20566-20578

### Bug #2: Handler Tracking (FIXED ✅)
**Problem:** Used `data-combat-dial-enabled` attribute to track if handler attached  
**Issue:** After animation creates NEW element, old attribute check blocks re-attachment  
**Root Cause:** DOM attributes persist across element recreation, but element INSTANCES change  
**Solution:** Switch to `element._combatDialHandlers` property (instance-specific)  
**Files Changed:** `index.html` lines 20636, 20643, 20722

### Bug #3: Spinner Separators (FIXED ✅)
**Problem:** Adjacent moves with same color blend together visually  
**Solution:** Add 2-degree black separator lines between same-color segments  
**Files Changed:** `index.html` lines 19464-19477 in `buildWheelVisual()`

---

## 📂 **FILE STRUCTURE**

```
windsurf-project-Up-Keep/
├── index.html                          # Main game file (ALL code in one file!)
├── SESSION_SUMMARY.md                  # Overall progress tracking
├── SESSION_CONTINUATION.md             # Current work tracking
├── MEMORY_RECOVERY_2025-01-14.md      # THIS FILE (for future recovery)
└── assets/
    └── images/                         # Robot sprites, UI elements
```

---

## 🔑 **KEY CODE SECTIONS IN index.html**

### Combat Dial System (Lines ~20545-20900)

```javascript
// Main handler attachment (line ~20633)
addCombatDialHandlerToElement(element, robotId) {
    // CRITICAL: Check element._combatDialHandlers (property, NOT attribute!)
    if (element._combatDialHandlers) {
        return; // Skip if already attached to THIS element instance
    }
    
    element._hasCombatDialHandler = true;
    element.dataset.holdStartX = '0';
    element.dataset.holdStartY = '0';
    const moveThreshold = 30; // pixels
    
    // Create handlers object
    const handlers = {
        mousedown: (e) => { /* ... */ },
        mouseup: (e) => { /* ... */ },
        mousemove: (e) => { /* ... */ },
        touchstart: (e) => { /* ... */ },
        touchend: (e) => { /* ... */ },
        touchcancel: (e) => { /* ... */ }
    };
    
    // Store handlers on element INSTANCE (not attribute!)
    element._combatDialHandlers = handlers;
}

// Hold timer settings
holdDuration: 250, // 250ms = 0.25 seconds
```

### Spinner Rendering (Lines ~19438-19490)

```javascript
buildWheelVisual(elementId, wheelData) {
    // ... setup code ...
    
    wheelDataWithPips.forEach((segment, index) => {
        const segmentAngle = (segment.size / 96) * 360;
        const color = this.getMoveColorHex(segment.moveType);
        
        // Check if next segment has same color
        const nextSegment = wheelDataWithPips[(index + 1) % wheelDataWithPips.length];
        const nextColor = nextSegment ? this.getMoveColorHex(nextSegment.moveType) : null;
        const needsSeparator = (nextColor === color);
        
        if (needsSeparator) {
            // Add 2-degree black separator line
            const lineWidth = 2;
            gradientSegments.push(`${color} ${currentAngle}deg ${currentAngle + segmentAngle - lineWidth}deg`);
            gradientSegments.push(`#000000 ${currentAngle + segmentAngle - lineWidth}deg ${currentAngle + segmentAngle}deg`);
        } else {
            gradientSegments.push(`${color} ${currentAngle}deg ${currentAngle + segmentAngle}deg`);
        }
        
        currentAngle += segmentAngle;
    });
    
    wheelElement.style.background = `conic-gradient(${gradientSegments.join(', ')})`;
}
```

### Robot Movement Animation (Lines ~17124-17220)

```javascript
async moveRobotVisual(fromPointId, toPointId) {
    // Animation reuses SAME element instance (good!)
    // After animation completes (line ~17183):
    if (robotId) {
        // Re-attach handler to element (property check prevents duplicates)
        this.addCombatDialHandlerToElement(robotGroup, robotId);
    }
}
```

---

## 🎮 **GAME STATE ARCHITECTURE**

### Turn Flow
1. **Setup Phase:** Deploy robots from bench to entry points
2. **Player Turn:** Move 1 robot OR deploy 1 robot (costs 1 MP)
3. **Battle Check:** If adjacent to enemy, must battle or end turn
4. **AI Turn:** (Debug mode = manual control)
5. **Win Condition:** Reach opponent's goal OR surround opponent

### Robot Data Structure
```javascript
{
    id: "unit-001-uc-0",
    name: "Bulbasaur",
    rarity: "uc",
    MP: 3,  // Movement points
    wheel: [
        { moveName: "Tackle", moveType: "White", damage: 1, size: 32 },
        { moveName: "Razor Leaf", moveType: "White", damage: 2, size: 32 },
        { moveName: "Blue", moveType: "Blue", damage: 0, size: 32 }
    ]
}
```

### Status Effects
- **Conditions:** Poison, Burn, Paralysis, Frozen, Sleep, Confusion, Noxious, Wait
- **Markers:** MP-1 (reduce movement), Rebooting (skip turn)
- **Damage Modifiers:** Some statuses reduce damage on specific move colors

---

## 🔍 **DEBUGGING TIPS**

### Console Logging Convention
- `🎯` = Important action
- `✅` = Success
- `❌` = Error
- `⚠️` = Warning
- `🔍` = Debug info
- `📊` = Data display
- `⏱️` = Timer/timing

### Common Issues

**"Tap-and-hold not working!"**
- Check coordinates in logs: Field robots are ~(200-213, 300-460)
- Bench robots are ~(40-70, 60-700) - handlers work but only for info, not affected by board state
- Timer is 250ms - user must hold steady without moving >30px
- Look for: `⏱️ Started hold timer` → `✅ HOLD COMPLETE` (if cancelled, see `❌ Hold timer cancelled`)

**"Handlers not attaching after move!"**
- Check for `⏭️ Skipping duplicate handler` - This is CORRECT behavior (means handler already attached)
- Check for `element._combatDialHandlers` property (NOT attribute)
- Animation reuses same element, so handlers persist (good!)

**"Spinner looks wrong!"**
- Verify wheel data sums to 96 total segments
- Check color mapping in `getMoveColorHex()` (lines ~19723-19730)
- Separator only shows between ADJACENT same-color moves

---

## 📋 **TODO LIST (As of Jan 14, 2025)**

### Immediate (Current Session)
- [x] Fix spinner separators (2deg black lines)
- [x] Add enhanced logging for tap-and-hold
- [ ] User needs to TEST on field robots (not bench)
- [ ] Verify separators visible on all wheels

### Future Enhancements
- [ ] Visual "loading" indicator during hold (circle fill animation?)
- [ ] Haptic feedback on mobile for hold complete
- [ ] Tap-and-hold gesture for bench robots to preview stats
- [ ] Battle replay/history feature

### Known Issues (Non-Critical)
- Service Worker registration fails (file:// protocol, expected)
- First-turn handicap display could be clearer
- Movement highlights sometimes overlap with status icons

---

## 🗂️ **SESSION HISTORY**

### Session 1 (Jan 14, Early)
- Implemented status effect descriptions
- Added status icons to battle modal
- Created damage reduction display (strikethrough + modified value)

### Session 2 (Jan 14, Mid)
- Fixed Combat Dial info display
- Reduced hold timer from 500ms to 250ms
- Added coordinate storage in `element.dataset`
- Increased movement threshold to 30px

### Session 3 (Jan 14, Late)
- Fixed event bubbling bug (removed handlers from clickCircle)
- Fixed handler tracking bug (switched to element properties)
- Enhanced logging for debugging

### Session 4 (Jan 14, Current)
- Fixed spinner separators (0.5deg → 2deg for visibility)
- Created this recovery file
- User organizing MD files by date

---

## 💡 **QUICK START FOR NEXT SESSION**

### If Memory Wiped, Do This First:

1. **Read this section** to understand current state
2. **Open `index.html`** - All code is in ONE file
3. **Search for key functions:**
   - `addCombatDialHandlerToElement` (line ~20633)
   - `buildWheelVisual` (line ~19438)
   - `showCombatDialInfo` (line ~20767)
4. **Check recent changes:** Look for comments with dates/prompts
5. **Review `SESSION_SUMMARY.md`** for full history

### User Communication Style
- Prefers concise, direct responses
- Values clear debugging logs with emojis
- Wants fixes, not just suggestions
- Appreciates documentation for continuity

### Testing Instructions to Give User
1. Refresh page
2. Select team (6 robots)
3. Deploy robot to entry point
4. Move robot to field (inner square)
5. **Hold on FIELD robot** for 0.25s (not bench!)
6. Check console logs for coordinates

---

## 🚨 **CRITICAL REMINDERS**

1. **NEVER** attach handlers to `clickCircle` - causes event bubbling
2. **ALWAYS** use `element._combatDialHandlers` property, NOT attribute
3. **Animation reuses elements** - handlers persist (this is good!)
4. **Separator logic** checks NEXT segment color in circular array
5. **Hold timer** is 250ms with 30px movement tolerance
6. **User coordinates matter** - field robots have different coords than bench

---

## 📞 **WHEN USER REPORTS BUG**

### Diagnostic Checklist:
1. Ask for console logs (especially lines with 🖱️ or ⏱️)
2. Check coordinates - field vs bench
3. Look for timer start AND completion/cancellation
4. Verify handlers attached (look for ✅ Combat Dial handler attached)
5. Check if animation is running (`isMovementInProgress`)

### Common User Confusion:
- **Testing bench robots** when they should test field robots
- **Releasing too quickly** (hold needs to be steady 250ms)
- **Moving mouse** while holding (>30px cancels timer)

---

## 🎨 **VISUAL INDICATORS**

### Spinner Colors (Hex Values)
- Red: `#ff4444` (Miss)
- Blue: `#4444ff` (Dodge)
- Gold: `#ffaa00` (Special)
- Purple: `#aa44ff` (Status effect)
- White: `#ffffff` (Normal attack)

### Status Effect Icons
- Poison: ☠️
- Burn: 🔥
- Paralysis: ⚡
- Frozen: ❄️
- Sleep: 💤
- Confusion: 😵
- Noxious: 🤢
- Wait: ⏸️
- MP-1: 🔻
- Rebooting: 🔄

---

## 🔗 **RELATED SYSTEMS**

### Interconnected Features:
- **Combat Dial** → Shows during tap-and-hold OR battle preview
- **Spinner Wheel** → Visual representation of Combat Dial
- **Status Effects** → Modify damage/MP shown in Combat Dial
- **Battle Modal** → Uses same spinner rendering as Combat Dial
- **Movement System** → Triggers handler re-attachment after animation

---

## 📝 **CODE PATTERNS TO MAINTAIN**

### Event Handler Pattern
```javascript
// GOOD: Store handlers on element instance
element._combatDialHandlers = handlers;
if (element._combatDialHandlers) { return; }

// BAD: Use attributes (persists across element recreation)
element.setAttribute('data-handler-attached', 'true');
if (element.hasAttribute('data-handler-attached')) { return; }
```

### Logging Pattern
```javascript
console.log(`✅ Action completed: ${details}`);
console.log(`❌ Error occurred: ${error}`);
console.log(`🔍 Debug info: ${data}`);
```

### Spinner Segment Pattern
```javascript
// Check circular array for next segment
const nextSegment = array[(index + 1) % array.length];
```

---

## 🎓 **LESSONS LEARNED**

1. **Element properties > DOM attributes** for instance-specific data
2. **Event bubbling** can cause subtle timing bugs
3. **Animation element reuse** preserves handlers (feature, not bug!)
4. **Visual feedback** (0.5deg too small, 2deg works)
5. **User testing location matters** (field vs bench coordinates)

---

**Last Updated:** January 14, 2025, 1:46 AM UTC-06:00  
**Session:** 4 (Spinner separators + recovery file creation)  
**Next Action:** User to test separator visibility and organize MD files by date
