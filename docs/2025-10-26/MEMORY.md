# Session Memory - October 26, 2025

## Critical Points to Remember

### 1. Android-First Design Philosophy
The user is developing primarily for Android screens. All UI must be:
- **Compact** - Minimize space usage
- **Touch-friendly** - Large enough for finger taps
- **Scrollable** - Allow vertical scrolling where needed
- **Image-focused** - Use icons over text labels when possible

### 2. Robot Selection Items Implementation
Just completed a compact items display system with these specs:
- **Card size:** 60×60px
- **Image size:** 40×40px  
- **Quantity badge:** 18px circle in bottom-right corner
- **No text labels** - Images only
- **Static positioning** - Items don't scroll with robots
- **Exactly 4 items** - Oil Drink, Battery Pack, Mega Battery, Solar Panel

### 3. User's Strict Quality Standards
The user has **ZERO tolerance for breaking changes**. Always:
- ✅ Think ULTRA hard before edits
- ✅ Double-check correctness
- ✅ Triple-check before finishing
- ✅ Verify all functions still work
- ✅ Test that nothing breaks
- ✅ Make surgical edits only (preserve everything else)

### 4. Future Drag-and-Drop Feature
The item cards in Robot Selection are **display-only for now**, but they're being prepared for future drag-and-drop functionality:
- Each card has `data-item-id` attribute
- Each card has `data-quantity` attribute
- User will drag items onto robots to apply them
- This is Phase 2 (not implemented yet)

### 5. Inventory System Architecture
```javascript
// Item inventory stored in main data object
data: {
    itemInventory: {
        OILDRINK: 0,      // Integer count
        BATTERY: 0,       // Integer count
        MEGABATTERY: 0,   // Integer count
        SOLARPANEL: 0     // Integer count (added today)
    }
}
```

### 6. Store Items Always 4 Items
The items array will **NEVER have more than 4 items**:
1. Oil Drink (30 bolts) - Restore 25% battery
2. Battery Pack (50 bolts) - Restore 50% battery
3. Mega Battery (80 bolts) - Restore 100% battery
4. Solar Panel (1000 bolts) - Infinite energy forever

This is a design decision - don't suggest adding more items.

### 7. Documentation Requirements
After significant work, always:
- Update `PROJECT-MASTER-GUIDE.md`
- Create dated folder (`docs/YYYY-MM-DD/`)
- Write session summary
- Write chat continuation guide
- Write memory document
- Add any feature-specific docs needed

### 8. Key File Locations
**Main Code:**
- `index.html` - All HTML structure and modals
- `css/main.css` - All styling (7300+ lines)
- `js/chore-system.js` - Main app logic (9300+ lines)
- `js/battle-system.js` - Battle game
- `robots/[name]/` - Individual robot folders with dialogue

**Documentation:**
- `docs/how-tos/PROJECT-MASTER-GUIDE.md` - Master reference
- `docs/Gamification/` - Feature implementation guides
- `docs/YYYY-MM-DD/` - Session summaries

**Assets:**
- `Imag/Store/Items/` - Item images
- `Imag/Achivments/Images/Finished Images/` - UI assets
- Robot images in respective robot folders

### 9. Common User Patterns
Based on this session, the user typically:
1. Requests a feature
2. Reviews implementation
3. Requests mobile optimization
4. Requests visual fixes (e.g., "it's still just text")
5. Requests documentation updates

Always assume **mobile-first** unless specified otherwise.

### 10. Glassmorphism UI Style
The app uses a glassmorphism aesthetic:
- `background: rgba(255, 255, 255, 0.25)`
- `backdrop-filter: blur(10px)`
- `-webkit-backdrop-filter: blur(10px)`
- `border: 2px solid rgba(255, 255, 255, 0.3)`
- Smooth shadows and transitions

Match this style when adding new UI elements.

### 11. Quantity Badge Pattern
When showing item quantities, use this pattern:
```css
.quantity-badge {
    position: absolute;
    bottom: 2px;
    right: 2px;
    min-width: 18px;
    height: 18px;
    background: rgba(0, 0, 0, 0.75);
    color: white;
    font-size: 11px;
    font-weight: 700;
    border-radius: 9px;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
}
```

This is the approved design - reuse it for other quantity displays.

### 12. Scrolling Architecture
Robot Selection Modal has two scroll zones:
- **Items Section:** Static, no scroll
- **Robot Body:** Vertical scroll with `overflow-y: auto`

This pattern keeps frequently needed items always visible.

### 13. CSS Class Naming Convention
Observed patterns:
- `.robot-select-item-card` - Main component
- `.robot-select-item-image` - Child element
- `.robot-select-item-card.has-items` - State modifier
- `.robot-select-item-card.no-items` - State modifier

Follow this BEM-like pattern for consistency.

### 14. JavaScript Function Naming
Pattern observed:
- `renderRobotSelectItems()` - Render items to screen
- `openRobotSelect()` - Open modal
- `closeRobotSelect()` - Close modal
- `selectRobot(robotId)` - Action on robot

Use verb + noun for actions, render + noun for display functions.

### 15. Backward Compatibility Pattern
When adding new data fields:
```javascript
// In loadData() function
if (!this.data.itemInventory) {
    this.data.itemInventory = {
        OILDRINK: 0,
        BATTERY: 0,
        MEGABATTERY: 0,
        SOLARPANEL: 0
    };
}
// Also check for new fields in existing inventories
if (this.data.itemInventory && this.data.itemInventory.SOLARPANEL === undefined) {
    this.data.itemInventory.SOLARPANEL = 0;
}
```

Always add compatibility checks for new features.

### 16. Image Path Conventions
Store items follow this pattern:
- `Imag/Store/Items/[item-name].png`
- Example: `Imag/Store/Items/solar-panel.png`

Keep paths consistent when adding new assets.

### 17. Visual State Pattern
For items/buttons with owned/not-owned states:
```css
.has-items {
    opacity: 1;
    filter: none;
    cursor: pointer;
}
.no-items {
    opacity: 0.4;
    filter: grayscale(100%);
    cursor: not-allowed;
}
```

User approved this 40% opacity + grayscale for disabled states.

### 18. Hover Effect Pattern
Approved hover animation:
```css
.interactive-card:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
}
```

Subtle lift + slight scale for touch-friendly feedback.

### 19. Z-Index Layers
Observed z-index usage:
- Navigation bubbles: `z-index: 999`
- Modals: `z-index: 2000`
- Modal content elements: `z-index: 1` (relative)

Stay within these ranges for consistency.

### 20. Mobile Breakpoint (If Needed)
The app is mobile-first, but if desktop optimization needed:
```css
@media (min-width: 768px) {
    /* Desktop-specific overrides */
}
```

However, user hasn't requested desktop optimization yet.

---

## Quick Decision Reference

**Q: Should I add text labels?**
A: No, unless specifically requested. User prefers icons/images.

**Q: How much padding/spacing?**
A: Minimal. Use 8px padding, 8px gaps. Space is precious on mobile.

**Q: Should items scroll with robots?**
A: No. Items should be static, robots scroll independently.

**Q: Can I add a 5th item to the store?**
A: No. Design is locked to exactly 4 items.

**Q: Should I ask before making changes?**
A: No, implement directly unless ambiguous. User wants action, not discussion.

**Q: How do I show quantity?**
A: Small badge overlay in bottom-right corner with just the number.

**Q: What if a function might break?**
A: Don't make that change. Triple-check everything. Breaking is unacceptable.

---

**Created:** October 26, 2025
**Session Focus:** Robot Selection items display (Android optimization)
**Status:** Complete and verified
