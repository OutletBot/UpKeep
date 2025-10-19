# Context Recovery Enhancements

**Purpose:** Quick reference for AI context recovery scenarios  
**Date:** October 18, 2025

---

## 🚨 READ THIS FIRST (30-Second Summary)

**Project:** Up-Keep - Gamified chore tracker with robot companions and Pokémon Duel-style battle system

**Current Status:** ✅ Fully functional chore system, ✅ Working battle system with 150+ units

**Critical Rules:**
1. **NEVER open `index.html` directly** - Always use `START-SERVER.bat` (CORS errors)
2. **JavaScript load order is SACRED** - 8 files in specific sequence (see master guide)
3. **Component architecture** - Each robot = one folder with modular JSON files
4. **Minimal edits only** - Never replace large file sections

**Most Important Files:**
- `index.html` - Main entry point
- `js/chore-system.js` - Core app logic (app object)
- `js/battle-system.js` - Battle engine (BattleSystem/GameBoard)
- `robots/unified-registry.json` - Store robots index
- `robots/registry.json` - Battle units index

**If Something's Broken:** Check browser console (F12) → Look for CORS errors or JavaScript load order issues

---

## 📋 1. QUICK CONTEXT RECOVERY

### Project Type:
- **Category:** Web application (vanilla JavaScript)
- **Architecture:** Component-based, modular
- **Storage:** LocalStorage (client-side)
- **Deployment:** Local server required (no file:// protocol)

### Key Features:
1. **Chore Management** - Track tasks with freshness decay
2. **Robot Store** - Purchase 8 unique companions
3. **Battle System** - 28-point strategic grid combat
4. **Currency** - Earn bolts from completing chores
5. **PWA** - Installable on mobile devices

### Technology:
- Pure JavaScript (ES6+), HTML5, CSS3
- No frameworks (vanilla JS)
- No build tools required
- Python HTTP server for local hosting

### File Count:
- **8** JavaScript modules (specific load order)
- **2** CSS files (main + debug)
- **1** HTML file (all UI structure)
- **8** purchasable robots (component folders)
- **150+** battle units (Pokémon Duel data)

---

## 🐛 2. KNOWN ISSUES & WORKAROUNDS

### Issue #1: Scrappy Only Says "Sold!"
**Problem:** Scrappy dialogue not loading, only shows fallback text  
**Cause:** `robots/scrappy-dialogue.json` not loading due to CORS or path error  
**Workaround:** Ensure server is running, check console for fetch errors  
**Permanent Fix:** Already implemented - ChoreRobotLoader handles this

### Issue #2: CORS Errors Block JSON Loading
**Problem:** Opening `index.html` directly causes all data loading to fail  
**Cause:** Browser blocks file:// protocol from loading local JSON files  
**Workaround:** **ALWAYS** use `START-SERVER.bat` or local server  
**Status:** Documented in HOW-TO-RUN.md

### Issue #3: Robot Images Sometimes Not Appearing
**Problem:** Robot sprites don't load in battle or store  
**Cause:** Case-sensitive file paths (Windows vs. actual filename)  
**Workaround:** Verify exact filename case matches JSON references  
**Status:** Mostly resolved, check on case-by-case basis

### Issue #4: Battle Debugger Panel Overlaps Content
**Problem:** Debugger UI covers game board on small screens  
**Cause:** Fixed positioning without responsive breakpoints  
**Workaround:** Zoom out browser or use larger screen  
**Status:** Known limitation, low priority

### Issue #5: LocalStorage Data Loss
**Problem:** User data disappears after browser cache clear  
**Cause:** LocalStorage is not persistent across cache clears  
**Workaround:** Export save file regularly (Settings → Save Game)  
**Status:** By design, user education needed

### Issue #6: Service Worker Caching Stale Files
**Problem:** Updates don't show up after code changes  
**Cause:** Service Worker caches old versions  
**Workaround:** Hard refresh (Ctrl+Shift+R) or unregister SW in DevTools  
**Status:** Normal PWA behavior

### Issue #7: Three Robots Missing Battle Data
**Problem:** mega-rocket-man, pika-bot, buzz-lite-point-0 can't battle  
**Cause:** Battle data not yet linked (chore-only robots)  
**Workaround:** Use other 5 robots for battles  
**Status:** Pending implementation (link to Charizard, Pikachu, Mewtwo data)

---

## 📝 3. RECENT CHANGES LOG

### October 17-18, 2025:
- ✅ Created PROJECT-MASTER-GUIDE.md (1,021 lines)
- ✅ Documented all root files and folders
- ✅ Cleaned up IDE config folders (.idea deleted, .vscode kept)
- ✅ Identified obsolete backup files for deletion
- ✅ Organized documentation into `docs/how-tos/`

### October 17, 2025:
- ✅ Completed component-based architecture migration
- ✅ All 8 robots converted to component folders
- ✅ Dialogue system refactored (external JSON files)
- ✅ Created unified-registry.json for store robots

### October 16, 2025:
- ✅ Battle system debugger enhancements
- ✅ Free movement mode for scenario testing
- ✅ Status effect manager UI improvements

### January 15, 2025:
- ✅ Battle system core implementation
- ✅ 28-point SVG game board
- ✅ Combat resolution system

### January 14, 2025:
- ✅ Chore system implementation
- ✅ LocalStorage save/load
- ✅ Currency system

---

## 🚀 4. FUTURE ROADMAP / TODO

### High Priority:

**1. Link Battle Data for 3 Pending Robots**
- [ ] mega-rocket-man → Link to Unit-006 (Charizard)
- [ ] pika-bot → Link to Unit-025 (Pikachu)
- [ ] buzz-lite-point-0 → Link to Unit-150 (Mewtwo)
- **Impact:** Makes all 8 store robots battle-ready
- **Effort:** Low (just add battle-data.json and update registry)

**2. Verify and Remove Legacy Files**
- [ ] Check if `main-fixed.css` is referenced anywhere
- [ ] Remove `store-robots.json` (replaced by unified-registry)
- [ ] Delete backup HTML files if user confirms
- **Impact:** Cleaner codebase, less confusion
- **Effort:** Low (verification + deletion)

**3. Audio System Implementation**
- [ ] Integrate existing audio files (Clean.mp3, Duel1.mp3)
- [ ] Add sound effect triggers (task complete, battle moves)
- [ ] User preference toggle (mute/unmute)
- **Impact:** More engaging user experience
- **Effort:** Medium (requires audio API integration)

### Medium Priority:

**4. Battle AI Improvements**
- [ ] Smarter opponent move selection
- [ ] Difficulty levels (easy/medium/hard)
- [ ] AI learns from player strategies
- **Impact:** More challenging battles
- **Effort:** High (requires AI logic)

**5. Mission System Expansion**
- [ ] More daily mission types
- [ ] Weekly challenges
- [ ] Achievement system
- **Impact:** Increased engagement and replayability
- **Effort:** Medium (mission generation logic)

**6. Robot Evolution System**
- [ ] Robots level up with usage
- [ ] Stat improvements from battles
- [ ] Visual evolution stages
- **Impact:** Long-term progression system
- **Effort:** High (requires new data structures)

### Low Priority:

**7. Multiplayer/Online Features**
- [ ] Save file cloud sync
- [ ] Friend battles (local network)
- [ ] Leaderboards
- **Impact:** Social features
- **Effort:** Very High (requires backend)

**8. 3D Robot Models**
- [ ] Replace 2D sprites with 3D models
- [ ] Three.js integration
- [ ] Animated attack effects
- **Impact:** Visual upgrade
- **Effort:** Very High (3D modeling + rendering)

**9. Mobile App Version**
- [ ] Native Android/iOS apps
- [ ] Platform-specific optimizations
- [ ] App store deployment
- **Impact:** Better mobile experience
- **Effort:** Very High (mobile development)

---

## ⚠️ 5. CRITICAL GOTCHAS

### Gotcha #1: JavaScript Load Order is Sacred ⚠️⚠️⚠️
**DO NOT REORDER** these script tags in `index.html`:
```html
<script src="js/chore-robot-loader.js"></script>  <!-- 1st -->
<script src="js/chore-system.js"></script>        <!-- 2nd -->
<script src="js/battle-system.js"></script>       <!-- 3rd -->
<script src="js/robot-loader.js"></script>        <!-- 4th -->
<script src="js/robot-database.js"></script>      <!-- 5th -->
<script src="js/combat-system.js"></script>       <!-- 6th -->
<script src="js/team-manager.js"></script>        <!-- 7th -->
<script src="js/main.js"></script>                <!-- 8th -->
```
**Why:** Each script depends on previous ones. Order change = instant breakage.

### Gotcha #2: File Paths are Case-Sensitive
- Windows may ignore case, but code doesn't
- `Imag/Robot.png` ≠ `Imag/robot.png`
- Always check exact filename case in JSON files

### Gotcha #3: LocalStorage Keys Must Match
- Save key format: `upkeep_data_[saveFileName]`
- Default: `upkeep_data_default`
- Changing format breaks existing saves

### Gotcha #4: Component Folder Structure is Rigid
Each robot folder MUST have:
- `robot.json` (metadata)
- `chore-data.json` (chore bonuses)
- `dialogue.json` (personality lines)
- `store-data.json` (shop info)
- `images/` folder (at minimum `happy.png`)

Missing any = loader errors

### Gotcha #5: Registry Files Must Stay in Sync
- `unified-registry.json` must reference existing robot folders
- `registry.json` must point to existing Battle-data folders
- Typo in folder name = robot not found

### Gotcha #6: Never Edit While Server is Running
- Changes to HTML/CSS/JS require page refresh
- Ctrl+Shift+R to hard refresh (clear cache)
- Service Worker may cache old versions

### Gotcha #7: Browser Console is Your Best Friend
- **ALWAYS** check console on errors (F12)
- CORS errors = not using server
- "undefined" errors = load order or missing file
- Network tab shows failed file loads

### Gotcha #8: Minimal Edits Only (User Preference)
- **NEVER replace large file sections**
- Use targeted edits (specific line ranges)
- Example: "+415 -408" = BAD, breaks working code
- Read surrounding context before editing

---

## 🔍 Quick Diagnosis Checklist

**If the app doesn't load:**
1. ✅ Is server running? (URL should be http://localhost:8000)
2. ✅ Check console for CORS errors
3. ✅ Are all 8 JS files loading? (Network tab)
4. ✅ Is file path correct? (case-sensitive)

**If robot store is broken:**
1. ✅ Does `robots/unified-registry.json` exist?
2. ✅ Are robot folders present?
3. ✅ Console shows JSON parse errors?
4. ✅ Is `ChoreRobotLoader` defined?

**If battle system crashes:**
1. ✅ Does `robots/registry.json` exist?
2. ✅ Is `RobotDatabase` defined?
3. ✅ Are Battle-data folders accessible?
4. ✅ Check for undefined robot IDs

**If saves don't persist:**
1. ✅ Check LocalStorage in DevTools
2. ✅ Verify save key format
3. ✅ Browser in private/incognito mode?
4. ✅ LocalStorage quota exceeded?

---

## 📚 Related Documentation

- **Main Guide:** `docs/how-tos/PROJECT-MASTER-GUIDE.md` (complete system)
- **Robot System:** `robots/README.md` (architecture)
- **Dialogue System:** `robots/DIALOGUE-SYSTEM-README.md`
- **Setup Instructions:** `HOW-TO-RUN.md` (server setup)
- **Migration Notes:** `robots/MIGRATION_STATUS.md`

---

**Last Updated:** October 18, 2025, 12:20 AM  
**Purpose:** Quick context recovery for AI after memory wipe  
**Status:** Living document - update after major changes
