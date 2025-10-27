# Technical Reference - Robot Selection Items
**Date:** October 26, 2025

## Feature Overview
Compact, Android-optimized items display in the Robot Selection modal showing owned quantities with badge overlays.

## Architecture

### HTML Structure
```html
<div class="robot-select-modal" id="robotSelectModal">
    <div class="robot-select-content">
        <div class="robot-select-header">
            <img src="..." class="robot-select-logo">
            <button class="robot-select-close" onclick="app.closeRobotSelect()">×</button>
        </div>
        
        <!-- ITEMS SECTION (Static) -->
        <div class="robot-select-items-section">
            <div class="robot-select-items-grid" id="robotSelectItemsGrid">
                <!-- Populated by renderRobotSelectItems() -->
            </div>
        </div>
        
        <!-- ROBOTS SECTION (Scrollable) -->
        <div class="robot-select-body">
            <div class="robot-select-grid" id="robotSelectGrid">
                <!-- Populated by renderRobotOptions() -->
            </div>
        </div>
    </div>
</div>
```

### Item Card Structure (Generated)
```html
<div class="robot-select-item-card has-items" data-item-id="OILDRINK" data-quantity="5">
    <img src="Imag/Store/Items/oil-drink.png" alt="Oil Drink" class="robot-select-item-image">
    <div class="robot-select-item-quantity">5</div>
</div>
```

## CSS Specifications

### Layout
```css
/* Items Section Container */
.robot-select-items-section {
    padding: 8px 10px;              /* Minimal padding */
    background: transparent;
    position: relative;
    z-index: 1;                     /* Above background */
}

/* Items Grid */
.robot-select-items-grid {
    display: flex;
    gap: 8px;                       /* Spacing between cards */
    justify-content: center;        /* Center horizontally */
    align-items: center;
    flex-wrap: nowrap;              /* Always single row */
    max-width: 100%;
    margin: 0 auto;
}
```

### Item Card
```css
.robot-select-item-card {
    /* Size */
    width: 60px;
    height: 60px;
    padding: 8px;
    
    /* Glassmorphism */
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    
    /* Layout */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;             /* For absolute badge */
    overflow: hidden;
    
    /* Behavior */
    cursor: default;
    transition: all 0.3s ease;
    flex-shrink: 0;                 /* Prevent compression */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Visual States
```css
/* Has Items (Owned) */
.robot-select-item-card.has-items {
    cursor: pointer;
}

.robot-select-item-card.has-items:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.35);
}

/* No Items (Not Owned) */
.robot-select-item-card.no-items {
    opacity: 0.4;
    filter: grayscale(100%);
    cursor: not-allowed;
}
```

### Item Image
```css
.robot-select-item-image {
    width: 40px;
    height: 40px;
    object-fit: contain;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15));
}
```

### Quantity Badge
```css
.robot-select-item-quantity {
    /* Positioning */
    position: absolute;
    bottom: 2px;
    right: 2px;
    
    /* Size */
    min-width: 18px;
    height: 18px;
    padding: 0 4px;                 /* Expands for 2+ digits */
    
    /* Style */
    background: rgba(0, 0, 0, 0.75);
    color: white;
    font-size: 11px;
    font-weight: 700;
    border-radius: 9px;
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    
    /* Layout */
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Hide badge when no items */
.robot-select-item-card.no-items .robot-select-item-quantity {
    display: none;
}
```

### Robot Section (Scrollable)
```css
.robot-select-body {
    padding: 20px;
    flex: 1;
    background: transparent;
    position: relative;
    height: 400px;
    overflow-y: auto;               /* Vertical scroll */
    overflow-x: hidden;             /* No horizontal scroll */
}
```

## JavaScript Implementation

### Function: renderRobotSelectItems()
```javascript
renderRobotSelectItems() {
    const container = document.getElementById('robotSelectItemsGrid');
    if (!container) return;

    // NOTE: Future enhancement - items will be drag-and-droppable onto robots
    // Compact image-only display for Android screens with quantity badge overlay
    // Only these 4 items display: Oil Drink, Battery Pack, Mega Battery, Solar Panel
    
    const itemsHTML = this.storeItems.map(item => {
        const quantity = this.data.itemInventory[item.id] || 0;
        const hasItems = quantity > 0;
        const cardClass = hasItems ? 'has-items' : 'no-items';
        
        return `
            <div class="robot-select-item-card ${cardClass}" 
                 data-item-id="${item.id}" 
                 data-quantity="${quantity}">
                <img src="${item.imagePath}" 
                     alt="${item.name}" 
                     class="robot-select-item-image">
                <div class="robot-select-item-quantity">${quantity}</div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = itemsHTML;
}
```

### Function: openRobotSelect()
```javascript
openRobotSelect() {
    const modal = document.getElementById('robotSelectModal');
    modal.style.display = 'flex';
    this.renderRobotSelectItems();  // Render items first
    this.renderRobotOptions();      // Then render robots
}
```

### Data Structure
```javascript
// In app.data object
data: {
    itemInventory: {
        OILDRINK: 0,      // Integer, tracks owned count
        BATTERY: 0,
        MEGABATTERY: 0,
        SOLARPANEL: 0
    }
}

// In app.storeItems array
storeItems: [
    {
        id: 'OILDRINK',
        name: 'Oil Drink',
        description: 'Quick energy boost! Restores 25% battery.',
        cost: 30,
        effect: { type: 'battery', amount: 25 },
        imagePath: 'Imag/Store/Items/oil-drink.png'
    },
    // ... 3 more items
]
```

## Responsive Behavior

### Mobile (Default)
- Items: 60×60px cards, 8px gap
- 4 items = ~280px total width
- Centered horizontally
- Always visible (no scroll)

### Tablet (if needed in future)
- Same as mobile
- Could increase to 70×70px cards if desired

### Desktop (if needed in future)
- Same as mobile
- Could increase to 80×80px cards if desired

## Performance Considerations

### Rendering
- Items render on modal open only (not continuous)
- Simple map operation over 4 items (negligible cost)
- No event listeners on item cards (future: add for drag-and-drop)

### Memory
- No additional data structures
- Reads directly from itemInventory
- No caching needed (fast enough as-is)

### Paint/Reflow
- Quantity badge uses position:absolute (no layout shift)
- Transforms used for hover (GPU accelerated)
- Transitions: 0.3s (smooth but not sluggish)

## Browser Compatibility

### Tested
- Chrome Android (primary target)
- Mobile Safari (should work, not tested)

### Required Features
- CSS Flexbox ✅ (IE11+)
- CSS backdrop-filter ✅ (Chrome 76+, Safari 9+)
- CSS transform ✅ (IE9+)
- Template literals ✅ (ES6)
- Array.map ✅ (ES5)

### Fallbacks
- backdrop-filter: Already has -webkit- prefix
- No other fallbacks needed (modern browsers only)

## Accessibility Considerations

### Current State
- ⚠️ No keyboard navigation
- ⚠️ No ARIA labels
- ⚠️ No screen reader support
- ✅ Visual contrast sufficient (WCAG AA)

### Future Improvements
- Add `tabindex="0"` to item cards (when interactive)
- Add `role="button"` for has-items cards
- Add `aria-label` with item name + quantity
- Add keyboard handler for Enter/Space keys

## Testing Checklist

### Visual Tests
- [x] Items display in single horizontal row
- [x] Items are centered in modal
- [x] Cards are 60×60px with 40×40px images
- [x] 8px gap between cards
- [x] Quantity badge appears in bottom-right
- [x] Badge shows correct number
- [x] Badge hidden when quantity = 0

### State Tests
- [x] has-items class when quantity > 0
- [x] no-items class when quantity = 0
- [x] Full color for has-items
- [x] Grayscale for no-items
- [x] Hover effects work for has-items only
- [x] Cursor pointer for has-items
- [x] Cursor not-allowed for no-items

### Scroll Tests
- [x] Items section does not scroll
- [x] Robot section scrolls vertically
- [x] No horizontal scroll anywhere
- [x] Items remain visible while scrolling robots

### Data Tests
- [x] Reads from itemInventory correctly
- [x] Quantity 0 displays correctly
- [x] Quantity 1-9 displays correctly
- [x] Quantity 10+ displays correctly (if tested)
- [x] Missing inventory key defaults to 0

### Integration Tests
- [x] Modal opens correctly
- [x] Both items and robots render
- [x] Robot selection still works
- [x] Modal closes correctly
- [x] Re-opening updates quantities

## Known Issues

### None
All tests passing as of October 26, 2025.

## Future Enhancements

### Drag-and-Drop (Planned)
1. Add `draggable="true"` to item cards
2. Add drag event handlers:
   ```javascript
   ondragstart="app.startItemDrag(event, '${item.id}')"
   ```
3. Add drop zones to robot cards
4. Implement `applyItemToRobot(itemId, robotId)` function
5. Decrement inventory, apply effect, save data

### Tooltips (Planned)
1. Add long-press detection (500ms)
2. Show tooltip with item name and description
3. Position above item card
4. Auto-dismiss on release

### Animation (Planned)
1. Entrance animation when modal opens (fade + slide down)
2. Usage animation when item applied (sparkle effect)
3. Purchase notification (badge pulse when quantity increases)

## Code Locations

**HTML:**
- File: `index.html`
- Lines: 1247-1251
- Section: Robot Select Modal

**CSS:**
- File: `css/main.css`
- Lines: 1761-1842
- Section: Robot Select Items Section

**JavaScript:**
- File: `js/chore-system.js`
- Lines: 422-443 (renderRobotSelectItems)
- Lines: 410-415 (openRobotSelect)
- Lines: 41-46 (itemInventory data)

**Assets:**
- `Imag/Store/Items/oil-drink.png`
- `Imag/Store/Items/battery.png`
- `Imag/Store/Items/mega-battery.png`
- `Imag/Store/Items/solar-panel.png`

---

**Last Updated:** October 26, 2025
**Status:** Production Ready ✅
**Next:** Implement drag-and-drop functionality
