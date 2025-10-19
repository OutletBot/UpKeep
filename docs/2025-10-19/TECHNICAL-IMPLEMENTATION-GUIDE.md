# Technical Implementation Guide - October 19, 2025

## Ouija-Bot Battle Mechanics Implementation

### Overview
This guide documents the technical implementation of Ouija-Bot's special moves and the debugger bonus spin system.

---

## 1. Planchette Push (Knockback Mechanic)

### Implementation Location
**File:** `js/battle-system.js`

### Code Changes

#### Step 1: Add to Special Effects List (Line 6770-6775)
```javascript
const specialEffectMoves = [
    'Psychic Shove',
    'Planchette Push',  // ← Added
    'Annihilate',
    // Add more special effect moves here as needed
];
```

#### Step 2: Route to Handler (Line 6786-6790)
```javascript
switch (moveName) {
    case 'Psychic Shove':
    case 'Planchette Push':  // ← Added
        await this.handlePsychicShove(winnerPointId, loserPointId, result);
        break;
    case 'Annihilate':
        await this.handleAnnihilate(winnerPointId, loserPointId, result);
        break;
    default:
        console.warn(`⚠️ Unknown special effect: ${moveName}`);
}
```

### How It Works
1. When Planchette Push wins a battle, `hasSpecialEffect()` returns true
2. `handleSpecialEffect()` routes to `handlePsychicShove()`
3. Existing knockback logic executes:
   - Calculates knockback path in straight line
   - Moves affected robots as far back as possible
   - Applies Wait status to all knocked-back robots
   - Handles chain collisions (friendly fire)

### Testing
```javascript
// Battle scenario:
// Ouija-Bot (Planchette Push) vs Enemy Robot
// Expected: Enemy knocked back + Wait status applied
console.log('🧠 Psychic Shove: [enemy] at [point] knocked back by winner at [point]');
console.log('⏸️ [enemy] gained Wait status');
```

---

## 2. Séance Slash (Bonus Spin Mechanic)

### Implementation Location
**File:** `js/battle-system.js`

### Code Changes

#### Step 1: Add Trigger Check for Attacker (Line 5716)
```javascript
// Original:
if (attackerSpin.moveName === 'Psycho Cut') {

// Updated:
if (attackerSpin.moveName === 'Psycho Cut' || attackerSpin.moveName === 'Séance Slash') {
```

#### Step 2: Add Trigger Check for Defender (Line 5819)
```javascript
// Original:
if (defenderSpin.moveName === 'Psycho Cut') {

// Updated:
if (defenderSpin.moveName === 'Psycho Cut' || defenderSpin.moveName === 'Séance Slash') {
```

#### Step 3: Make Damage Check Dynamic (Line 5728)
```javascript
// Original:
if (bonusSpin.moveName === 'Psycho Cut') {
    console.log(`✨ JACKPOT! Bonus spin landed on Psycho Cut again!`);

// Updated:
if (bonusSpin.moveName === attackerSpin.moveName) {
    console.log(`✨ JACKPOT! Bonus spin landed on ${attackerSpin.moveName} again!`);
```

#### Step 4: Fix Damage Value in JSON
**File:** `robots/ouija-bot/battle-data.json`

```json
// WRONG (causes string comparison):
"damage": "70+"

// CORRECT (numeric comparison):
"damage": 70
```

### How It Works
1. Initial spin lands on Séance Slash (70 damage)
2. Bonus spin triggered automatically
3. If bonus spin ALSO lands on Séance Slash:
   - Damage increased: 70 → 120 (+50 bonus)
   - Visual feedback: "⚡ +50 DAMAGE!"
4. If bonus spin lands on different move:
   - Use original Séance Slash (70 damage)

### Testing
```javascript
// Test Case 1: Success (Double Séance Slash)
Initial: Séance Slash (70)
Bonus:   Séance Slash (70)
Result:  120 damage (70 + 50)

// Test Case 2: Failure (Different Move)
Initial: Séance Slash (70)
Bonus:   Ethereal Escape
Result:  70 damage (original)
```

---

## 3. Debugger Bonus Spin Forcing System

### Implementation Location
**File:** `js/battle-system.js`

### Architecture

#### Data Structure (Lines 5-12)
```javascript
debugger: {
    enabled: false,              // Force initial spin outcomes
    panelOpen: false,            // Debugger panel visibility
    bonusSpinEnabled: false,     // Force bonus spin outcomes ← NEW
    selectedPlayerMove: null,    // Initial move for player
    selectedOpponentMove: null,  // Initial move for opponent
    selectedPlayerBonusMove: null,   // Bonus move for player ← NEW
    selectedOpponentBonusMove: null  // Bonus move for opponent ← NEW
}
```

#### Toggle Function (Lines 76-87)
```javascript
toggleBonusSpinMode() {
    this.debugger.bonusSpinEnabled = !this.debugger.bonusSpinEnabled;
    const toggle = document.getElementById('bonusSpinToggle');
    if (this.debugger.bonusSpinEnabled) {
        toggle.classList.add('active');
        console.log('🌀 BONUS SPIN FORCING ENABLED');
    } else {
        toggle.classList.remove('active');
        console.log('🌀 BONUS SPIN FORCING DISABLED');
    }
}
```

#### Selection Handler (Lines 234-251)
```javascript
selectDebuggerBonusMove(side, index, element) {
    // Deselect all moves in this column
    const container = element.parentElement;
    container.querySelectorAll('.move-option').forEach(opt => 
        opt.classList.remove('selected')
    );
    
    // Select this move
    element.classList.add('selected');
    
    // Store selection
    if (side === 'player') {
        this.debugger.selectedPlayerBonusMove = index;
        console.log(`🌀 Player BONUS move selected: index ${index}`);
    } else {
        this.debugger.selectedOpponentBonusMove = index;
        console.log(`🌀 Opponent BONUS move selected: index ${index}`);
    }
}
```

#### Execution Logic - Attacker (Lines 5730-5749)
```javascript
let bonusSpinData;
if (this.debugger.bonusSpinEnabled) {
    console.log(`🛠️ DEBUGGER MODE: Check for forced bonus spin`);
    
    // Determine if attacker is player or opponent
    const attackerIsPlayer = attackerTeamForLog === 'player';
    const bonusMoveIndex = attackerIsPlayer ? 
        this.debugger.selectedPlayerBonusMove : 
        this.debugger.selectedOpponentBonusMove;
    
    if (bonusMoveIndex !== null) {
        // Force the selected move
        bonusSpinData = this.forceWheelPosition(attacker.wheel, bonusMoveIndex);
        console.log(`🛠️ Forced bonus spin: ${bonusSpinData.segment.moveName}`);
    } else {
        // No selection, fall back to random
        bonusSpinData = this.spinWheelWithPosition(attacker.wheel);
        console.log(`🛠️ Bonus spin (no selection, random): ${bonusSpinData.segment.moveName}`);
    }
} else {
    // Toggle OFF, always random
    bonusSpinData = this.spinWheelWithPosition(attacker.wheel);
}
```

#### Execution Logic - Defender (Lines 5833-5852)
```javascript
// Same logic as attacker, but uses defenderTeamForLog
const defenderIsPlayer = defenderTeamForLog === 'player';
const bonusMoveIndex = defenderIsPlayer ? 
    this.debugger.selectedPlayerBonusMove : 
    this.debugger.selectedOpponentBonusMove;
```

### UI Components
**File:** `index.html` (Lines 531-544)

```html
<!-- Bonus Spin Controls (Works for ANY respin moves) -->
<div class="debugger-bonus-spin-section" id="debuggerBonusSpinSection">
    <div class="bonus-spin-header">
        <span style="font-weight: bold; color: #ff00ff;">🌀 BONUS SPIN CONTROL</span>
        <span style="font-size: 12px; opacity: 0.8;">Force respin outcomes (any move)</span>
    </div>
    
    <!-- Toggle Switch -->
    <div class="debugger-toggle-container">
        <span class="debugger-toggle-label">Force Bonus Spin:</span>
        <div class="toggle-switch" id="bonusSpinToggle" onclick="GameBoard.toggleBonusSpinMode()">
            <div class="toggle-slider"></div>
            <span class="toggle-text-off">OFF</span>
            <span class="toggle-text-on">ON</span>
        </div>
    </div>
    
    <!-- Selection Columns -->
    <div class="debugger-columns">
        <div class="debugger-column">
            <div class="column-header">Player Bonus Spin</div>
            <div id="playerBonusMovesList"></div>
        </div>
        <div class="debugger-column">
            <div class="column-header">Opponent Bonus Spin</div>
            <div id="opponentBonusMovesList"></div>
        </div>
    </div>
</div>
```

### Usage Flow
1. **Open Debugger** (⚙️ button) during battle
2. **Enable "Force Battle Outcome"** toggle
3. **Select initial moves** for Player and Opponent
4. **Enable "Force Bonus Spin"** toggle
5. **Select bonus spin moves** for Player and Opponent
6. When respin triggers, forced outcome executes

### Testing
```javascript
// Test Scenario:
// 1. Player spins Séance Slash
// 2. Bonus spin toggle = ON
// 3. Player bonus move = Séance Slash (index 2)
// Expected Console Output:
🛠️ DEBUGGER MODE: Check for forced bonus spin
🛠️ Forced bonus spin: Séance Slash
✨ JACKPOT! Bonus spin landed on Séance Slash again!
💥 Applying +50 damage bonus (70 → 120)
```

---

## 4. Circuit Breaker Menu Structure

### Implementation Location
**File:** `index.html` (Lines 1303-1346)

### Button Order & Functionality

```html
<div class="cb-menu-buttons">
    <!-- 1. START BATTLE - Disabled (Future Implementation) -->
    <button class="cb-menu-btn cb-btn-image cb-btn-image-disabled" disabled>
        <img src="Imag/Battle/Start-Battle.png" alt="Start Battle">
        <span class="cb-btn-badge">COMING SOON</span>
    </button>
    
    <!-- 2. VIEW MY ROBOTS - Active -->
    <button class="cb-menu-btn cb-btn-image" onclick="app.openChorebotHangar()">
        <img src="Imag/Battle/Chore-Bots-button.png" alt="View My Robots">
    </button>
    
    <!-- 3. STORY MODE - Disabled -->
    <button class="cb-menu-btn cb-btn-image cb-btn-image-disabled" disabled>
        <img src="Imag/Battle/Story-Mode-button.png" alt="Story Mode">
        <span class="cb-btn-badge">COMING SOON</span>
    </button>
    
    <!-- 4. BATTLE AI - Active -->
    <button class="cb-menu-btn cb-btn-image" onclick="app.openAIBattleSelector()">
        <img src="Imag/Battle/VS-AI.png" alt="Battle AI">
    </button>
    
    <!-- 5. RANKED BATTLE - Disabled -->
    <button class="cb-menu-btn cb-btn-image cb-btn-image-disabled" disabled>
        <img src="Imag/Battle/Ranked.png" alt="Ranked Battle">
        <span class="cb-btn-badge">COMING SOON</span>
    </button>
    
    <!-- 6. BATTLE WITH FRIENDS - Disabled -->
    <button class="cb-menu-btn cb-btn-image cb-btn-image-disabled" disabled>
        <img src="Imag/Battle/Lobby.png" alt="Lobby">
        <span class="cb-btn-badge">COMING SOON</span>
    </button>
    
    <!-- 7. DEBUGGER MODE - Active (Temporary Start Battle) -->
    <button class="cb-menu-btn cb-btn-image" 
            onclick="app.startCircuitBreakerBattle()" 
            style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                   border: 3px solid #FFD700;">
        <span style="font-size: 24px; 
                     font-weight: bold; 
                     color: #FFD700; 
                     text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
            ⚙️ DEBUGGER MODE
        </span>
    </button>
    
    <!-- 8. EXIT - Active -->
    <button class="cb-menu-btn cb-btn-image cb-btn-exit-img" 
            onclick="app.closeCircuitBreakerMenu()">
        <img src="Imag/Battle/Exit.png" alt="Exit">
    </button>
</div>
```

### Function Flow
**File:** `js/chore-system.js` (Lines 2197-2209)

```javascript
startCircuitBreakerBattle() {
    console.log("Starting Circuit Breaker battle from menu...");
    
    // Close Circuit Breaker menu
    const menu = document.getElementById('circuitBreakerMenu');
    if (menu) {
        menu.classList.remove('active');
    }
    
    // Open ChoreBot Hangar as the team selection screen
    this.openChorebotHangar();
    console.log("Circuit Breaker battle started - opening ChoreBot Hangar for team selection");
}
```

---

## Common Pitfalls & Solutions

### 1. String vs Number Damage Values
**Problem:** JSON damage as string causes comparison failures
```javascript
// ❌ WRONG
"damage": "70+"  // String comparison fails

// ✅ CORRECT
"damage": 70     // Numeric comparison works
```

### 2. Browser Cache Not Updating
**Problem:** Changes to JSON files don't reflect in browser
**Solution:**
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear cache: F12 → Application → Clear storage
- Restart dev server

### 3. Edit Tool File Corruption
**Problem:** Large file edits fail with whitespace mismatches
**Solution:**
- Read exact content before editing
- Include sufficient surrounding context
- Use `git checkout [file]` to restore if corrupted

### 4. Team Detection in Bonus Spins
**Problem:** Attacker might be player or opponent
**Solution:**
```javascript
// Always check team affiliation dynamically
const attackerIsPlayer = attackerTeamForLog === 'player';
const bonusMoveIndex = attackerIsPlayer ? 
    this.debugger.selectedPlayerBonusMove : 
    this.debugger.selectedOpponentBonusMove;
```

---

## Performance Considerations

### 1. Bonus Spin Execution
- Bonus spins add ~3-4 seconds to battle animations
- Only triggers when specific moves are spun
- Does not impact general battle performance

### 2. Debugger Toggle State
- Minimal overhead when checking `bonusSpinEnabled`
- No performance impact when toggle is OFF
- Selection storage is in-memory (no persistence)

---

## Future Enhancement Opportunities

### 1. Additional Respin Moves
Pattern established works for any robot:
```javascript
if (attackerSpin.moveName === 'Psycho Cut' || 
    attackerSpin.moveName === 'Séance Slash' ||
    attackerSpin.moveName === '[NEW_RESPIN_MOVE]') {
    // Trigger bonus spin
}
```

### 2. Configurable Bonus Damage
Currently hardcoded to +50:
```javascript
attackerSpin.damage = 120; // 70 base + 50 bonus

// Could be:
const bonusDamage = move.bonusDamageValue || 50;
attackerSpin.damage = baseDamage + bonusDamage;
```

### 3. Debugger Presets
Save/load debugger configurations:
```javascript
saveDebuggerPreset(name) {
    const preset = {
        playerMove: this.debugger.selectedPlayerMove,
        opponentMove: this.debugger.selectedOpponentMove,
        playerBonus: this.debugger.selectedPlayerBonusMove,
        opponentBonus: this.debugger.selectedOpponentBonusMove
    };
    localStorage.setItem(`debugger_preset_${name}`, JSON.stringify(preset));
}
```

---

## Testing Checklist

### Ouija-Bot Planchette Push
- [ ] Triggers on winning spin
- [ ] Knocks back enemy in straight line
- [ ] Applies Wait status to affected robots
- [ ] Handles chain collisions correctly
- [ ] Shows proper console logs

### Ouija-Bot Séance Slash
- [ ] Triggers bonus spin on initial spin
- [ ] Doubles damage when bonus lands on same move (70 → 120)
- [ ] Uses original damage when bonus lands on different move
- [ ] Shows correct visual feedback (⚡ +50 DAMAGE!)
- [ ] Works for both attacker and defender

### Debugger Bonus Spin System
- [ ] Toggle switches between ON/OFF states
- [ ] Selection highlights correct move
- [ ] Forces correct move when toggle ON + move selected
- [ ] Falls back to random when toggle OFF
- [ ] Falls back to random when no move selected
- [ ] Works for player-controlled robots
- [ ] Works for opponent-controlled robots
- [ ] Console logs show forced vs random

### Circuit Breaker Menu
- [ ] START BATTLE is disabled with "COMING SOON"
- [ ] DEBUGGER MODE button is visible at bottom
- [ ] DEBUGGER MODE starts battle flow correctly
- [ ] All other buttons maintain their functionality
- [ ] EXIT button still closes menu

---

## Appendix: Key File Locations

### JavaScript Files
- `js/battle-system.js` - Core battle mechanics and debugger logic
- `js/chore-system.js` - Menu functions and battle initialization

### JSON Data Files
- `robots/ouija-bot/battle-data.json` - Ouija-Bot move definitions
- `robots/mewtwo/battle-data.json` - Reference implementation

### HTML Files
- `index.html` - Circuit Breaker menu and debugger UI

### Documentation
- `docs/2025-10-19/SESSION-SUMMARY.md` - High-level overview
- `docs/2025-10-19/CONVERSATION-CONTINUATION.md` - Detailed conversation log
- `docs/2025-10-19/TECHNICAL-IMPLEMENTATION-GUIDE.md` - This file

---

## Conclusion

All implementations follow established patterns from Mewtwo's mechanics. The debugger system is now feature-complete with full control over both initial and bonus spins. The Circuit Breaker menu is ready for future START BATTLE implementation while maintaining current development workflow.
