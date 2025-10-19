# Battle Legend and Info Features

## Overview
Added two major enhancements to the battle UI:
1. **Color Legend System** - Shows all possible moves and their probabilities under each spinner
2. **Info/Preview Mode** - Allows users to preview spinners before committing to attack

---

## Feature 1: Color Legend System

### What It Does
- Displays a compact legend under each spinner showing all possible outcomes
- Each move is color-coded to match the spinner segment colors
- Shows move names and power values (e.g., "Red Slam (30)")
- Sorted by likelihood (most probable moves first)
- Visible during spinning AND after results are shown

### Visual Design
- **Position**: Directly under the wheel result box for each spinner
- **Size**: Compact 9px font in a 140px max-width container
- **Style**: Dark semi-transparent background with color squares
- **Layout**: Each legend item has:
  - 10x10px color square (matching move type color)
  - Move name and power in parentheses

### Technical Implementation
- **CSS Classes Added**:
  - `.wheel-legend` - Container styling
  - `.legend-item` - Individual move entry
  - `.legend-color` - Colored square indicator
  - `.legend-text` - Move name/power text

- **JavaScript Function**: `buildWheelLegend(legendId, wheelData)`
  - Groups duplicate moves and sums their sizes
  - Sorts by probability (total segment size)
  - Dynamically creates HTML elements
  - Called during battle initialization and info preview

- **HTML Elements**:
  ```html
  <div class="wheel-legend" id="attackerWheelLegend">
      <!-- Dynamically populated -->
  </div>
  <div class="wheel-legend" id="defenderWheelLegend">
      <!-- Dynamically populated -->
  </div>
  ```

---

## Feature 2: Info/Preview Mode

### What It Does
- Adds an **ℹ️ Info** button to the initial battle screen (alongside Attack and Cancel)
- When clicked, shows the spinners in a static preview state
- Displays complete wheel composition and legends
- User can then choose to **Attack** or go **Back** to the main battle screen

### User Flow
1. User initiates battle → sees robot portraits with 3 buttons: **Info**, **Attack**, **Cancel**
2. Clicks **ℹ️ Info** → wheels appear in preview mode
3. Preview shows:
   - Static spinner wheels (no animation)
   - "PREVIEW MODE" text where results normally appear
   - Full color legends showing all possible outcomes
   - Text: "See possible outcomes below"
4. User can then:
   - Click **⚔️ Attack!** → proceed to battle with spinning animation
   - Click **↩️ Back** → return to robot portraits screen

### Visual Design
- **Info Button**: Cyan/teal gradient (#17a2b8) to distinguish from red Attack button
- **Preview State**:
  - Wheels displayed but stationary (no rotation)
  - Result boxes show cyan "PREVIEW MODE" text
  - Legends fully visible showing all possible moves
  - Action buttons update to show "Back" and "Attack!"

### Technical Implementation
- **CSS Classes Added**:
  - `.battle-action-btn.info` - Cyan button styling with hover effects

- **JavaScript Function**: `showBattleInfo()`
  - Hides combatant portraits and initial buttons
  - Shows wheels container
  - Builds static wheels and legends (no spinning)
  - Updates result text to "PREVIEW MODE"
  - Replaces action buttons with "Back" and "Attack!"
  
- **Button Restoration**: Updated `showBattleModal()`
  - Restores original 3-button layout (Info, Attack, Cancel)
  - Ensures clean state when returning from preview

- **HTML Changes**:
  ```html
  <div class="battle-action-buttons">
      <button class="battle-action-btn info" onclick="GameBoard.showBattleInfo()">
          ℹ️ Info
      </button>
      <button class="battle-action-btn attack" onclick="GameBoard.executeBattle()">
          ⚔️ Attack!
      </button>
      <button class="battle-action-btn cancel" onclick="GameBoard.cancelBattle()">
          ↩️ Cancel
      </button>
  </div>
  ```

---

## File Changes Summary

### CSS (Lines 3876-3910)
- Added `.wheel-legend` container styling
- Added `.legend-item`, `.legend-color`, `.legend-text` for legend entries
- Added `.battle-action-btn.info` for info button styling

### HTML (Lines 6109-6111, 6126-6128)
- Added `<div class="wheel-legend" id="attackerWheelLegend">` under attacker wheel
- Added `<div class="wheel-legend" id="defenderWheelLegend">` under defender wheel
- Added Info button to battle action buttons

### JavaScript Functions

1. **`buildWheelLegend(legendId, wheelData)`** (Lines 17804-17854)
   - Analyzes wheel data to extract unique moves
   - Groups duplicates and calculates total probability
   - Sorts moves by size (most likely first)
   - Creates legend HTML with color squares and labels

2. **`showBattleInfo()`** (Lines 17633-17685)
   - Displays wheels in preview mode
   - Shows static spinners without animation
   - Populates legends with all possible outcomes
   - Swaps buttons to "Back" and "Attack!"

3. **Updated `showBattleModal()`** (Lines 17600-17613)
   - Restores original button layout (Info, Attack, Cancel)
   - Ensures clean state when returning from preview

4. **Updated `simulateDataDiskBattleWithAnimation()`** (Lines 17685-17687)
   - Calls `buildWheelLegend()` after building wheel visuals
   - Ensures legends are always populated during battles

---

## Benefits

### For Users
1. **Informed Decision Making**: See exact wheel composition before attacking
2. **Strategic Planning**: Understand risk vs reward for each battle
3. **Transparency**: No hidden mechanics - everything is visible
4. **Better UX**: Legends stay visible during and after spinning

### For Gameplay
1. **Reduces Frustration**: Users know what they're getting into
2. **Encourages Engagement**: Preview feature adds depth without complexity
3. **Educational**: Helps new players understand the battle system
4. **Professional Polish**: Makes the game feel more complete and thoughtful

---

## Testing Checklist
- [ ] Legend shows all unique moves from wheel data
- [ ] Legend colors match spinner segment colors
- [ ] Info button appears on initial battle screen
- [ ] Info preview shows static wheels correctly
- [ ] Can navigate Back from preview to main screen
- [ ] Can Attack directly from preview screen
- [ ] Legends remain visible during spinning animation
- [ ] Legends remain visible after results are shown
- [ ] Moves are sorted by probability (most likely first)
- [ ] Power values display correctly in legends
