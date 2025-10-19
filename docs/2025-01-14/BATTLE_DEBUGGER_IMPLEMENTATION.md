# Battle Scenario Debugger Implementation

## Overview
Implemented a **Battle Scenario Debugger Menu** that allows pre-selecting battle outcomes for testing purposes. The debugger is accessible via a discreet gear icon on the Battle Arena screen and provides a clean, intuitive interface for forcing specific moves during battles.

## Features Implemented

### 1. **Debugger Toggle Icon**
- **Location**: Fixed position in top-right corner (20px from top and right)
- **Design**: Golden semi-transparent circular button with gear emoji (⚙️)
- **Behavior**: Toggles debugger panel visibility on click
- **Styling**: Hover effects with scale animation and glow

### 2. **Debugger Panel**
- **Layout**: Fixed position panel (400px wide, max 80vh height)
- **Design**: Dark semi-transparent background with golden border
- **Animation**: Slides in from right when opened
- **Sections**:
  - Header with title and toggle switch
  - Two-column layout for Player and Opponent moves
  - Status indicator at bottom

### 3. **Force Battle Outcome Toggle**
- **Control**: Toggle switch in panel header
- **States**: 
  - OFF (default): Battles use random spins
  - ON: Battles use pre-selected moves
- **Visual Feedback**: Green color when active, gray when inactive

### 4. **Dynamic Move Lists**
- **Population**: Automatically populated when battle is initiated
- **Display**: Each move shows:
  - Radio button for selection
  - Move name (color-coded by type)
  - Damage value or star rating
- **Interaction**: Click to select, visual highlight on selection
- **Color Coding**: Moves are colored based on their type (Red, Blue, Purple, Gold, White, Yellow)

### 5. **Status Indicator**
- **States**:
  - "Debugger disabled - battles will be random" (gray)
  - "Awaiting battle initiation..." (yellow)
  - "⚠️ Select moves for: [Player/Opponent]" (yellow)
  - "✅ Ready! Battle outcome will be forced to selected moves." (green)

### 6. **Battle Integration**
- **Trigger**: Debugger populates when `showBattleModal()` is called
- **Forced Outcomes**: When debugger is enabled and moves are selected:
  - Spin animation proceeds normally
  - Wheels land on pre-selected moves instead of random
  - Console logs indicate forced outcome
- **Cleanup**: Selections are cleared after battle completes or is cancelled

## Technical Implementation

### Files Modified
- `index.html` (all changes in single file)

### Key Functions Added

#### Debugger State Management
```javascript
debugger: {
    enabled: false,
    panelOpen: false,
    selectedPlayerMove: null,
    selectedOpponentMove: null
}
```

#### Core Functions
1. **`toggleDebugger()`** - Shows/hides debugger panel
2. **`toggleDebuggerMode()`** - Enables/disables forced outcomes
3. **`populateDebugger()`** - Fills move lists when battle starts
4. **`populateMovesList()`** - Creates move option elements
5. **`selectDebuggerMove()`** - Handles move selection
6. **`updateDebuggerStatus()`** - Updates status message
7. **`clearDebuggerSelections()`** - Resets selections after battle
8. **`forceWheelPosition()`** - Forces wheel to land on specific move

### Integration Points

#### Battle Flow Integration
- **`showBattleModal()`**: Calls `populateDebugger()` to fill move lists
- **`simulateDataDiskBattleWithAnimation()`**: Checks debugger state and uses forced outcomes if enabled
- **`closeBattleResult()`**: Clears debugger selections
- **`cancelBattle()`**: Clears debugger selections

#### Forced Outcome Logic
```javascript
if (this.debugger.enabled && 
    this.debugger.selectedPlayerMove !== null && 
    this.debugger.selectedOpponentMove !== null) {
    // Force specific moves
    attackerSpinData = this.forceWheelPosition(attacker.wheel, attackerMoveIndex);
    defenderSpinData = this.forceWheelPosition(defender.wheel, defenderMoveIndex);
} else {
    // Normal random spin
    attackerSpinData = this.spinWheelWithPosition(attacker.wheel);
    defenderSpinData = this.spinWheelWithPosition(defender.wheel);
}
```

## CSS Styling

### Key Style Classes
- `.debug-toggle-icon` - Gear icon button
- `.battle-debugger-panel` - Main panel container
- `.debugger-header` - Panel header section
- `.toggle-switch` - Toggle control
- `.debugger-columns` - Two-column layout
- `.move-option` - Individual move selection item
- `.debugger-status` - Status indicator with color states

### Design Principles
- Semi-transparent backgrounds with backdrop blur
- Golden accent color (#FFD700) for consistency
- Smooth transitions and animations
- Hover effects for better UX
- Color-coded move types for easy identification

## Usage Instructions

### For Developers
1. **Open Debugger**: Click the gear icon (⚙️) in top-right corner
2. **Enable Forcing**: Toggle "Force Battle Outcome" switch to ON (green)
3. **Initiate Battle**: Start a battle as normal (move robot adjacent to enemy and attack)
4. **Select Moves**: 
   - Click desired move for Player robot
   - Click desired move for Opponent robot
   - Status will show "✅ Ready!" when both selected
5. **Execute Battle**: Click "⚔️ Attack!" button
6. **Observe**: Wheels will spin and land on your selected moves
7. **Repeat**: Selections clear after each battle for next test

### Testing Scenarios
- Test specific move matchups (e.g., Red vs Blue, Gold vs Purple)
- Verify status effect application (Confusion, Burn, Freeze)
- Test knockout mechanics with different damage values
- Verify draw conditions (Blue protection moves)
- Test edge cases with multiple same-colored moves

## Console Logging
The debugger provides detailed console output:
- `🛠️ Debugger panel opened/closed`
- `🛠️ Debugger mode ENABLED/DISABLED`
- `🛠️ Populating debugger with battle moves`
- `🛠️ Player/Opponent move selected: index X`
- `🛠️ DEBUGGER MODE: Forcing battle outcome`
- `🛠️ Forced [Robot] to spin: [Move Name]`

## Future Enhancements (Optional)
- Save/load preset battle scenarios
- Quick-select common matchups
- Battle outcome prediction display
- Export test results to file
- Keyboard shortcuts for faster testing
- Hide debugger in production builds (environment variable)

## Notes
- Debugger is always visible (no build flag currently)
- To hide in production, add conditional rendering based on environment
- Selections are automatically cleared after each battle
- Debugger does not interfere with normal gameplay when disabled
- All existing battle mechanics remain unchanged
