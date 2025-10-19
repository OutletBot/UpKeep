# 📖 Quick Reference Guide

## 🎯 Where Things Will Go

### CSS Files (css/)
| File | Content | Lines (est.) |
|------|---------|--------------|
| `base.css` | Variables, resets, fonts | ~200 |
| `chores.css` | Tasks, categories, scores | ~800 |
| `battle.css` | Game board, robots, wheels | ~2000 |
| `modals.css` | All modal dialogs | ~600 |
| `animations.css` | Keyframes, transitions | ~400 |
| `mobile.css` | Responsive breakpoints | ~200 |

### JavaScript Files (js/)

#### Core (js/core/)
- `app.js` - Main initialization (~500 lines)
- `storage.js` - Save/load system (~300 lines)
- `utils.js` - Helper functions (~200 lines)

#### Chores (js/chores/)
- `task-manager.js` - Task CRUD (~800 lines)
- `category-manager.js` - Categories (~400 lines)
- `score-calculator.js` - Freshness logic (~300 lines)

#### Battle System (js/battle/)
- `battle-system.js` - Main game logic (~3000 lines)
- `game-board.js` - Hex board setup (~1500 lines)
- `movement-system.js` - Pathfinding (~1200 lines)
- `combat-system.js` - Spinning wheels (~2000 lines)
- `status-effects.js` - Status system (~800 lines)
- `special-moves.js` - Psychic Shove, etc. (~500 lines)
- `ai-opponent.js` - AI logic (~800 lines)

#### Robots (js/robots/)
- `robot-database.js` - Data loader (~400 lines)
- `robot-store.js` - Shop system (~600 lines)
- `team-manager.js` - Team selection (~400 lines)

#### UI (js/ui/)
- `modal-manager.js` - Modal handlers (~500 lines)
- `mascot-controller.js` - Mascot AI (~300 lines)
- `animations.js` - UI animations (~200 lines)

### Data Files (data/)
- `robots.json` - All robot data
- `moves.json` - Move definitions
- `status-effects.json` - Status effect rules
- `missions.json` - Mission objectives

---

## 🔍 Finding Things in Current index.html

### CSS Sections (approximate lines)
- **Lines 13-4000:** All CSS styles
  - Variables & resets: ~13-100
  - Chore styles: ~200-1000
  - Battle styles: ~1000-3500
  - Modals: ~829-1500
  - Animations: ~298-542

### JavaScript Sections (approximate lines)
- **Lines 4001-25092:** All JavaScript
  - App initialization: ~4050-4500
  - Chore management: ~4500-8000
  - Battle system: ~8000-21600
  - Robot database: ~11000-14000
  - Status effects: ~15500-16500
  - Special moves: ~21610-21830
  - Psychic Shove: ~21612-21720
  - Psycho Cut: ~20882-21139

---

## 🚀 Quick Commands

### View Structure
```powershell
tree /F /A
```

### Check File Sizes
```powershell
Get-ChildItem -Recurse | Where-Object {!$_.PSIsContainer} | Measure-Object -Property Length -Sum
```

### Find Text in Files
```powershell
Select-String -Path "*.js" -Pattern "functionName"
```

---

**Created:** October 16, 2025
