# Chat Continuation Prompt - October 26, 2025

## Current State

You are working on **Upkeep**, a gamified chore tracking app with robot companions. The project is 71% complete with extensive features already implemented.

## Recent Work Completed (This Session)

### Robot Selection Items Display (Android Optimized)
Successfully implemented a compact items display in the Robot Selection screen:

- **4 item cards:** Oil Drink, Battery Pack, Mega Battery, Solar Panel
- **Compact design:** 60×60px cards with 40×40px images only (no text)
- **Quantity badge:** Small overlay in bottom-right showing owned count
- **Static layout:** Items stay fixed while robots scroll independently
- **Visual states:** Full color when owned, grayed out when quantity = 0

**Files Modified:**
1. `index.html` - Added robot-select-items-section
2. `css/main.css` - Compact item cards + quantity badge styling
3. `js/chore-system.js` - renderRobotSelectItems() function
4. `docs/how-tos/PROJECT-MASTER-GUIDE.md` - Updated documentation

## Important Context

### Project Rules (CRITICAL - ALWAYS FOLLOW)
1. **Think ULTRA hard** before making changes
2. **Double-check** all edits before applying
3. **Triple-check** everything before ending reply
4. **Verify** all functions remain working after edits
5. **Nothing must break** - messing up is unacceptable
6. **Surgical edits only** - modify only what's needed, preserve everything else
7. **Update PROJECT-MASTER-GUIDE.md** after significant changes

### Current Architecture

**Tech Stack:**
- Vanilla JavaScript (ES6+)
- CSS3 with CSS Variables
- HTML5
- LocalStorage for persistence
- No external frameworks

**Key Files:**
- `index.html` - Main app structure, all modals
- `css/main.css` - All styling (7300+ lines)
- `js/chore-system.js` - Main app logic (9300+ lines)
- `js/battle-system.js` - Battle game logic
- `robots/` - Individual robot data with dialogue
- `docs/` - Comprehensive documentation

**Active Features:**
- Chore tracking with categories and tasks
- Robot companions (12+ robots with personalities)
- Battle system (Circuit Breakers game)
- Store system (robots + items tabs)
- Currency system (bolts)
- Mission system
- Save/load with multiple slots
- TTS dialogue system
- Bond level system (designed, not implemented)
- Maintenance system (designed, not implemented)

### Robot Selection System

**Current Implementation:**
- Modal opens via Robot Select bubble (bottom-right)
- Shows items section at top (static)
- Shows owned robots in zig-zag scrolling layout
- User can select active robot (updates mascot)
- Items display with quantity badges

**Structure:**
```
Robot Select Modal
├── Header (Robot Select logo + close button)
├── Items Section (static, no scroll)
│   └── 4 item cards: Oil Drink, Battery, Mega Battery, Solar Panel
├── Robot Body (scrollable)
│   └── Robot cards in zig-zag rows
```

**Items Section Specs:**
- Cards: 60×60px
- Images: 40×40px
- Quantity badge: 18px circle, bottom-right
- No text labels
- Gap: 8px between cards
- Padding: 8px section padding

### Store Items Reference

```javascript
storeItems: [
    {
        id: 'OILDRINK',
        name: 'Oil Drink',
        description: 'Quick energy boost! Restores 25% battery.',
        cost: 30,
        effect: { type: 'battery', amount: 25 },
        imagePath: 'Imag/Store/Items/oil-drink.png'
    },
    {
        id: 'BATTERY',
        name: 'Battery Pack',
        description: 'Standard recharge. Restores 50% battery.',
        cost: 50,
        effect: { type: 'battery', amount: 50 },
        imagePath: 'Imag/Store/Items/battery.png'
    },
    {
        id: 'MEGABATTERY',
        name: 'Mega Battery',
        description: 'Fully restores battery to 100%!',
        cost: 80,
        effect: { type: 'battery', amount: 100 },
        imagePath: 'Imag/Store/Items/mega-battery.png'
    },
    {
        id: 'SOLARPANEL',
        name: 'Solar Panel',
        description: 'Infinite energy! Keeps robot at 100% forever.',
        cost: 1000,
        effect: { type: 'solar', permanent: true },
        imagePath: 'Imag/Store/Items/solar-panel.png'
    }
]
```

### Item Inventory System

**Data Structure:**
```javascript
data: {
    itemInventory: {
        OILDRINK: 0,
        BATTERY: 0,
        MEGABATTERY: 0,
        SOLARPANEL: 0
    }
}
```

**Purchase Flow:**
1. User opens Robot Store → Items tab
2. Clicks BUY on item card
3. Currency deducted, inventory incremented
4. Store re-renders showing updated quantity

**Future Enhancement:**
- Drag-and-drop from Robot Selection to apply items to robots
- Currently display-only in Robot Selection screen

## What to Work On Next

### High Priority
1. **Battery System Implementation** - Core maintenance mechanic
   - See: `docs/Gamification/ROBOT-BREAKING-IMPLEMENTATION.md`
   - Phase 1: Breaking system
   - Phase 2: Item usage system

2. **Bond Level System Implementation** - XP and rewards
   - See: `docs/Gamification/BOND-LEVEL-IMPLEMENTATION-GUIDE.md`
   - Step-by-step guide: `docs/Gamification/BOND-STEP-1-DATA.md`

3. **Item Drag-and-Drop** - Apply items from Robot Selection
   - Add drag handlers to item cards
   - Add drop zones on robot cards
   - Implement item application logic

### Medium Priority
4. **AI Battle Opponents** - Complete battle system
5. **Daily Quest System** - Engagement mechanic
6. **Robot Personality Expansion** - More dialogue options

### Low Priority
7. **Premium Features** - Monetization ($2.99/month)
8. **Social Features** - Friend system, sharing
9. **Smart Home Integration** - Advanced features

## Key Functions Reference

### Robot Selection
```javascript
app.openRobotSelect()       // Opens modal
app.closeRobotSelect()      // Closes modal
app.renderRobotOptions()    // Renders robot cards
app.renderRobotSelectItems() // Renders item cards ✨ NEW
app.selectRobot(robotId)    // Changes active robot
```

### Store System
```javascript
app.openRobotStore()        // Opens store modal
app.closeRobotStore()       // Closes modal
app.switchStoreTab('items') // Switches between robots/items
app.renderItemsStore()      // Renders items for purchase
app.purchaseItem(itemId)    // Buys item, updates inventory
```

### Data Management
```javascript
app.saveData()              // Saves to localStorage
app.loadData()              // Loads from localStorage
app.exportData()            // Exports save data
app.importData(data)        // Imports save data
```

## Common Patterns

### Modal Structure
```html
<div class="[name]-modal" id="[name]Modal">
    <div class="[name]-content">
        <div class="[name]-header">
            <!-- Title/Logo -->
            <button class="[name]-close" onclick="app.close[Name]()">&times;</button>
        </div>
        <div class="[name]-body">
            <!-- Content -->
        </div>
    </div>
</div>
```

### CSS Naming
- BEM-like: `.component-element-modifier`
- States: `.has-items`, `.no-items`, `.active`, `.disabled`
- Responsive: Mobile-first design
- Glassmorphism: `backdrop-filter: blur(10px)`

### Data Patterns
- Always check existence before accessing nested properties
- Use `|| 0` for numeric defaults
- Save after every state change
- Validate data on load for backward compatibility

## Testing Checklist (Always Verify)

Before ending your response, verify:
- [ ] All functions still work (no breaking changes)
- [ ] Data saves/loads correctly
- [ ] UI updates properly
- [ ] No console errors
- [ ] Mobile responsive (Android focus)
- [ ] Backward compatibility maintained
- [ ] Documentation updated

## Documentation Standards

When documenting:
1. **Update PROJECT-MASTER-GUIDE.md** for major features
2. **Create dated folder** (`docs/YYYY-MM-DD/`) for sessions
3. **Include:**
   - SESSION-SUMMARY.md (what was done)
   - CHAT-CONTINUATION.md (how to continue)
   - MEMORY.md (key points to remember)
   - Any feature-specific docs

## Quick Reference Links

**Main Documentation:**
- `docs/how-tos/PROJECT-MASTER-GUIDE.md` - Project overview
- `docs/Gamification/ULTIMATE-UPKEEP-GAMIFICATION-PLAN.md` - Feature roadmap

**Implementation Guides:**
- `docs/Gamification/ROBOT-BREAKING-IMPLEMENTATION.md` - Battery/repair system
- `docs/Gamification/ROBOT-MAINTENANCE-SYSTEM.md` - Maintenance mechanics
- `docs/Gamification/BOND-LEVEL-IMPLEMENTATION-GUIDE.md` - XP/bond system
- `docs/Gamification/BOND-STEP-1-DATA.md` - Bond implementation steps

**How-To Guides:**
- `docs/how-tos/HOW-TO-ADD-ROBOTS.md` - Adding new robots
- Various dated folders in `docs/` for session summaries

## Starting Fresh

If starting a new conversation:
1. Read this CHAT-CONTINUATION.md
2. Check PROJECT-MASTER-GUIDE.md for current state
3. Review recent session summaries in latest dated folder
4. Ask user what they want to work on
5. Triple-check all changes before applying
6. Update documentation after completion

---

**Last Updated:** October 26, 2025, 1:06 AM
**Next Session:** Continue with battery system or item drag-and-drop
