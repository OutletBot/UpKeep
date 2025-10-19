# 🎯 UP-KEEP PROJECT - MASTER DOCUMENTATION

**Last Updated:** October 18, 2025 (AI Battle Simulator Added)  
**Version:** 2.0 (Component-Based Architecture)

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Root Files](#root-files)
4. [Folder Structure](#folder-structure)
5. [JavaScript Architecture](#javascript-architecture)
6. [Data Flow & Connections](#data-flow--connections)
7. [Adding New Content](#adding-new-content)
8. [System Dependencies](#system-dependencies)
9. [Troubleshooting](#troubleshooting)

---

## 🎮 PROJECT OVERVIEW

**Up-Keep** is a gamified chore tracking app with robot companions and a strategic battle system.

### 📱 **DESIGN TARGET: ANDROID PHONE**

**⚠️ CRITICAL DESIGN CONSTRAINT:**
- This webapp is designed **exclusively for Android phone screens**
- All UI/UX is optimized for standard Android phone dimensions
- Layout, spacing, and controls are mobile-first
- Desktop view is for development/testing only
- **When adding features or styling, ALWAYS design for phone screen size**

### Core Features:
- **Chore Management** - Track tasks across categories with freshness decay
- **Robot Companions** - Purchasable robots with unique personalities
- **Battle System** - Strategic grid-based combat (Pokémon Duel-style)
- **Currency System** - Earn bolts by completing chores
- **Daily Missions** - Bonus challenges and rewards
- **PWA Support** - Installable on Android/mobile devices

### UI Navigation (Main Screen Bubbles):
- **🎯 Missions Bubble** - Top left corner, opens daily missions/achievements
- **⚙️ Settings Gear** - Top right corner, access settings/save system
- **🏪 Robot Store Bubble** - Bottom left (30px from bottom), opens Robot Factory store
- **⚡ Circuit Breaker Bubble** - Bottom left (110px from bottom), opens Circuit Breaker main menu
- **🤖 Robot Select Bubble** - Bottom right (30px from bottom), choose active companion
- **💰 Currency Display** - Top center, shows current bolt count
- **➕ Add Category FAB** - Bottom center (main screen only), create new categories

### Technology Stack:
- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Storage:** LocalStorage (client-side)
- **Architecture:** Component-based modular design
- **Design:** Mobile-first (Android phone screens)
- **Assets:** SVG game board, PNG sprites, custom fonts

---

## 🚀 QUICK START

### Running the App:

**⚠️ CRITICAL:** Do NOT open `index.html` directly in browser! This causes CORS errors.

**Method 1 (Easiest):**
1. Double-click `START-SERVER.bat`
2. Browser opens at http://localhost:8000
3. App loads automatically

**Method 2 (PowerShell):**
1. Right-click `START-SERVER.ps1` → "Run with PowerShell"
2. Navigate to http://localhost:8000

**Method 3 (Manual):**
```powershell
python -m http.server 8000
# Then open: http://localhost:8000
```

---

## 📁 ROOT FILES

### Essential Application Files:

#### `index.html` (98 KB) ✅ **MAIN ENTRY POINT**
- **Purpose:** Primary HTML file that loads the entire app
- **Contains:**
  - All UI structure (dashboard, battle view, modals)
  - Navigation bubbles (missions, settings, robot store, battle mode, robot select)
  - Currency display (top center)
  - SVG game board (28-point strategic grid)
  - Inline debug toggle scripts
- **Loads:** 
  - CSS: `css/main.css`, `css/debug.css`
  - JS: All 8 JavaScript files in specific order (see JavaScript Architecture)
  - Fonts: Inter (Google Fonts), Cocogoose, Sassy Raccoon
- **Dependencies:** Requires ALL folders intact (css/, js/, robots/, Imag/, Font/)
- **⚠️ Critical:** Script loading order must not be changed!

**Key UI Elements:**
- `.currency-display` - Bolt count (top center)
- `.missions-bubble` - Daily missions access (top left)
- `.settings-btn` - Settings panel (top right)
- `.robot-store-bubble` - Robot Factory store (bottom left, 30px)
- `.battle-mode-bubble` - Circuit Breaker menu launcher (bottom left, 110px) **[Updated Oct 18, 2025]**
- `.circuit-breaker-menu` - Circuit Breaker main menu modal (full-screen overlay) **[Added Oct 18, 2025]**
- `.ai-battle-selector` - AI difficulty selector screen (full-screen overlay) **[Added Oct 18, 2025]**
- `.robot-select-bubble` - Active companion selector (bottom right, 30px)
- `.fab` - Add Category button (bottom center, main screen only)

#### `manifest.json` (0.5 KB) ✅ **PWA CONFIG**
- **Purpose:** Progressive Web App configuration
- **Defines:**
  - App name: "Upkeep"
  - Start URL: `/index.html`
  - Display mode: `standalone` (full-screen)
  - Theme colors: `#6366f1`, `#f8fafc`
  - Icons: 192x192, 512x512 PNG (for home screen)
- **Used by:** Service Worker, mobile browsers

#### `sw.js` (1.7 KB) ✅ **SERVICE WORKER**
- **Purpose:** Offline functionality & caching
- **Features:**
  - Cache-first loading strategy
  - Version: `upkeep-v1`
  - Caches: index.html, manifest.json, icons
- **Registered by:** `js/main.js` on app load

### Server Launch Files:

#### `START-SERVER.bat` (0.4 KB) ✅
- **Purpose:** Windows batch script launcher
- **Runs:** `python -m http.server 8000`
- **Usage:** Double-click to start

#### `START-SERVER.ps1` (0.6 KB) ✅  
- **Purpose:** PowerShell alternative
- **Usage:** Right-click → "Run with PowerShell"

#### `server.py` (0.4 KB) ✅
- **Purpose:** Python server with auto-launch
- **Port:** 8000
- **Auto-opens:** Browser to localhost

### Configuration Files:

#### `.gitignore` (0.3 KB) ✅
- **Purpose:** Git version control exclusions
- **Ignores:** Backups, node_modules/, IDE configs, OS files

### Documentation:

#### `HOW-TO-RUN.md` (3.7 KB) ✅
- **Purpose:** Detailed setup instructions
- **Contains:** CORS explanation, 5 server methods, troubleshooting

---

## 📂 FOLDER STRUCTURE

### `css/` - Stylesheets (3 files)

#### `main.css` (348 KB) ✅ **PRIMARY STYLESHEET**
- **Purpose:** All application styles
- **Contains:**
  - CSS variables (`:root` - color scheme)
  - Font faces: Cocogoose, Sassy Raccoon
  - All UI components: cards, modals, buttons, forms
  - Navigation bubbles (missions, robot store, battle mode, robot select)
  - Battle system styles: game board, robots, moves
  - Animations & transitions
  - Responsive design (mobile-first)
  - Battle mode hiding rules (hides all bubbles during battle)
- **Font Dependencies:**
  - `../Font/cocogoose/Cocogoose-Condensed/Cocogoose-Condensed-Regular-trial.ttf`
  - `../Font/sassy-raccoon-font/SassyRaccoon-zrXKl.ttf`
- **Image Dependencies:** References `Imag/DUST BUNNY.png` for effects
- **Loaded by:** `index.html` line 13

**Key Styles Added:**
- `.battle-mode-bubble` - Custom CB-button.png image (70x70px) **[Updated Oct 18, 2025]**
  - Positioned at `bottom: 110px; left: 20px` (80px above robot store bubble)
  - Opens Circuit Breaker main menu instead of direct battle access
- `.circuit-breaker-menu` - Full-screen modal with dark blue/black gradient **[Added Oct 18, 2025]**
  - Background: `linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)`
  - Contains logo, 7 menu buttons (4 active, 3 placeholders)
  - Futuristic button styling with blue glow effects
- `.ai-battle-selector` - AI difficulty selector modal **[Added Oct 18, 2025]**
  - Same dark gradient background as Circuit Breaker
  - Contains VS AI logo, 5 difficulty buttons (all placeholders)
  - Exit button fixed top-left with Exit.png image
  - Compact layout with negative margins (-10px) to minimize space
  - Hover effects: slide animation, glow, shimmer
- `body.battle-mode` rules - Hides all UI bubbles during battle mode

#### `debug.css` (10 KB) ✅ **DEBUGGER STYLES**
- **Purpose:** Battle scenario debugger UI
- **Contains:**
  - Debugger panel layout
  - Move selector styles
  - Status effect manager
  - Toggle switches
  - Free movement mode indicators
- **Loaded by:** `index.html` line 14
- **Only visible:** When battle debugger is active

#### `main-fixed.css` (187 KB) ⚠️ **VERIFY STATUS**
- **May be:** Backup or alternate version
- **⚠️ Action needed:** Check if referenced anywhere, likely safe to delete

---

### `js/` - JavaScript Modules (8 files)

**⚠️ CRITICAL LOADING ORDER** (from `index.html` lines 1634-1641):

```html
<script src="js/chore-robot-loader.js"></script>  <!-- Load 1st: Registry loader -->
<script src="js/chore-system.js"></script>        <!-- Load 2nd: Core app logic -->
<script src="js/battle-system.js"></script>       <!-- Load 3rd: Battle engine -->
<script src="js/robot-loader.js"></script>        <!-- Load 4th: Battle robot loader -->
<script src="js/robot-database.js"></script>      <!-- Load 5th: Robot data -->
<script src="js/combat-system.js"></script>       <!-- Load 6th: Combat rules -->
<script src="js/team-manager.js"></script>        <!-- Load 7th: Team selection -->
<script src="js/main.js"></script>                <!-- Load 8th: Init & globals -->
```

**This order CANNOT be changed** - scripts depend on each other in sequence!

---

#### 1. `chore-robot-loader.js` (12 KB) - **Store Robot Loader**
- **Purpose:** Loads purchasable robots for the store
- **Global Object:** `ChoreRobotLoader`
- **Key Functions:**
  - `loadRegistry()` - Loads `robots/unified-registry.json`
  - `loadScrappyDialogue()` - Loads `robots/scrappy-dialogue.json`
  - `loadRobot(robotInfo)` - Loads individual robot data
  - `loadDialogue(robotFolder)` - Loads robot dialogue files
- **Data Files Loaded:**
  - `robots/unified-registry.json` (8 purchasable robots)
  - `robots/scrappy-dialogue.json` (shopkeeper dialogue)
  - `robots/[robot-name]/chore-data.json` (per robot)
  - `robots/[robot-name]/dialogue.json` (per robot)
- **Provides to:** `chore-system.js` for store functionality

---

#### 2. `chore-system.js` (348 KB) - **Core App Logic**
- **Purpose:** Main application controller
- **Global Object:** `app`
- **Manages:**
  - Categories & tasks (CRUD operations)
  - Currency system (bolts earned from chores)
  - Robot store (purchase/selection)
  - Save/load system (LocalStorage)
  - Daily missions & rewards
  - Scrappy dialogue delivery
  - TTS (Text-to-Speech) system
  - Activity logging
- **Key Data Structures:**
  - `app.data.categories[]` - All task categories
  - `app.data.currency` - Current bolt count
  - `app.data.ownedRobots[]` - Purchased robot IDs
  - `app.data.selectedRobotId` - Active companion
  - `app.robots[]` - Store robot catalog
  - `app.scrappyDialogue{}` - Shopkeeper lines
- **LocalStorage Keys:**
  - `upkeep_data_[saveFileName]` - Complete app state
- **Dependencies:**
  - Requires: `ChoreRobotLoader` (loads first)
  - Provides: `app` object to all other scripts
- **Data Files Used:**
  - Fallback: `robots/store-robots.json` (if registry fails)
  - Fallback: `robots/scrappy-dialogue.json` (if loader fails)

---

#### 3. `battle-system.js` (465 KB) - **Battle Engine**
- **Purpose:** Complete battle game system
- **Global Object:** `BattleSystem` (also aliased as `GameBoard`)
- **Features:**
  - 28-point SVG game board (strategic grid)
  - Robot movement & positioning
  - Combat resolution (attack wheel spins)
  - Status effects (poison, burn, freeze, sleep, etc.)
  - AI opponent logic
  - Turn management
  - Battle history log
  - Team selection UI
  - Repair bay system (deactivated robots)
  - Battle scenario debugger
  - Free movement mode (scenario setup)
- **Key Functions:**
  - `initializeBattle()` - Sets up game board
  - `selectRobotForBattle()` - Robot click handler
  - `handleBoardClick()` - Movement/attack handler
  - `executeBattle()` - Combat engine
  - `spinWheel()` - Random/debugged move selection
  - `applyStatusEffect()` - Status effect application
  - `checkWinConditions()` - Victory detection
- **Battle Debugger:**
  - Force specific move outcomes
  - Add/remove status effects
  - Teleport robots (free movement)
  - View all move options
  - Test scenarios
- **Dependencies:**
  - Requires: `RobotDatabase`, `CombatSystem`, `TeamManager`
  - Uses: Robot data from `robot-database.js`
- **Assets Used:**
  - `Imag/Battle/Space.png` - Background spaces
  - `Imag/Battle/Movable-space.png` - Movement indicators
  - Robot sprites from individual robot folders

---

#### 4. `robot-loader.js` (16 KB) - **Component Robot Loader**
- **Purpose:** Loads battle robots from component folders
- **Global Object:** `RobotLoader`
- **Key Functions:**
  - `loadRegistry()` - Loads `robots/registry.json`
  - `loadRobot(robotId)` - Loads individual robot data
  - `getRobot(robotId)` - Returns loaded robot
- **Data Files:**
  - `robots/registry.json` (150+ battle units)
  - `robots/Battle-data/Unit-XXX_X_X/Unit-XXX_attack_JSON.json`
- **Features:**
  - Caches loaded robots (performance)
  - Lazy loading (only loads what's needed)
  - Statistics tracking
- **Provides to:** `RobotDatabase`, `BattleSystem`

---

#### 5. `robot-database.js` (36 KB) - **Battle Robot Data**
- **Purpose:** Central battle robot registry
- **Global Object:** `RobotDatabase`
- **Contains:**
  - Hardcoded fallback data (Jack-o'-Bot, Pikachu, Mewtwo, etc.)
  - 150+ battle units from Pokémon Duel
  - Robot stats (HP, Attack, Defense, Speed)
  - Attack wheels (moves, damage, effects)
  - Status effect wheels
  - Abilities
- **Key Functions:**
  - `loadExternalRobots()` - Loads from JSON files
  - `getRobot(id)` - Returns robot by ID
  - `getAllRobots()` - Returns complete database
- **Data Sources:**
  - Primary: `robots/Battle-data/Unit-XXX_X_X/` folders
  - Fallback: Hardcoded data in file
  - Legacy: `data/battle-robots.json` (deprecated)
- **Fallback Chain:**
  1. Try component loading (robot-loader.js)
  2. Try legacy JSON file
  3. Use hardcoded data
- **Provides to:** `BattleSystem` for combat

---

#### 6. `combat-system.js` (5 KB) - **Combat Rules**
- **Purpose:** Move priority & combat resolution
- **Global Object:** `CombatSystem`
- **Move Priority:** Blue > Gold > Purple > White > Red
- **Key Function:**
  - `resolveCombat(attackerMove, defenderMove)` - Returns winner
- **Returns:** `'attacker_wins'`, `'defender_wins'`, or `'draw'`
- **Used by:** `BattleSystem.executeBattle()`

---

#### 7. `team-manager.js` (5 KB) - **Team Management**
- **Purpose:** Battle team selection (6 robots max)
- **Global Object:** `TeamManager`
- **Features:**
  - Add/remove robots from team
  - Team validation (max 6)
  - Duplicate prevention
  - Auto-fill functionality
- **Key Functions:**
  - `addToTeam(robotId)` - Adds robot
  - `removeFromTeam(robotId)` - Removes robot
  - `updateTeamDisplay()` - Updates UI
- **Used by:** `BattleSystem` team selection screen

---

#### 8. `main.js` (1.4 KB) - **Initialization**
- **Purpose:** App startup & global registration
- **Runs on Load:**
  ```javascript
  await app.init();                          // Load app data
  await RobotDatabase.loadExternalRobots(); // Load battle robots
  BattleSystem.initializeBattle();          // Setup battle board
  BattleSystem.initializePhase2();          // Setup UI handlers
  ```
- **Registers Globals:**
  ```javascript
  window.BattleSystem = BattleSystem;
  window.GameBoard = BattleSystem;  // Alias
  window.RobotDatabase = RobotDatabase;
  window.TeamManager = TeamManager;
  window.CombatSystem = CombatSystem;
  window.app = app;
  ```
- **Registers Service Worker:** For PWA offline support
- **This runs LAST** after all other scripts load

---

### `robots/` - Robot Component Data (206 items)

**Component-Based Architecture:** Each robot = one folder with modular JSON files

#### Registry Files:

**`unified-registry.json` (4 KB)** ✅ **PURCHASABLE ROBOTS INDEX**
- **Purpose:** Master index of store robots
- **Lists:** 8 purchasable robots
- **Format:**
  ```json
  {
    "id": "WITCHBOT",
    "folder": "witch-bot",
    "purchasable": true,
    "cost": 130,
    "hasBattleData": true,
    "hasChoreData": true,
    "dataFiles": { ... }
  }
  ```
- **Loaded by:** `chore-robot-loader.js`
- **Used for:** Store display, ownership tracking

**`registry.json` (83 KB)** ✅ **BATTLE UNITS INDEX**
- **Purpose:** 150+ battle robot registry
- **Lists:** All Pokémon Duel units
- **Points to:** `Battle-data/Unit-XXX_X_X/` folders
- **Loaded by:** `robot-loader.js`

**`scrappy-dialogue.json` (8 KB)** ✅ **SHOPKEEPER DIALOGUE**
- **Purpose:** All Scrappy's store dialogue
- **Categories:** greeting, idle, purchased, canceled, goodbye
- **Lines:** 25+ per category (127 total)
- **Loaded by:** `chore-robot-loader.js`

**`store-robots.json` (1.6 KB)** ⚠️ **LEGACY**
- **Status:** Being phased out
- **Replaced by:** `unified-registry.json` + individual robot folders

#### Individual Robot Folders (8 robots):

```
robots/
├── default-bot/          ✅ Free starter robot (chore-only)
├── jack-o-bot/           ✅ Halloween pumpkin (chore + battle)
├── witch-bot/            ✅ Magical witch (chore + battle)
├── clown-bot/            ✅ Circus terror (chore + battle)
├── freezy/               ✅ Arrogant ice bot (chore + battle)
├── mega-rocket-man/      🚧 Chore-only (battle pending)
├── pika-bot/             🚧 Chore-only (battle pending)
└── buzz-lite-point-0/    🚧 Chore-only (battle pending)
```

**Each robot folder contains:**

**1. `robot.json`** - Core metadata
```json
{
  "id": "WITCHBOT",
  "name": "Witch-Bot",
  "version": "1.0.0",
  "description": "A magical witch robot...",
  "theme": "Halloween Witch"
}
```

**2. `chore-data.json`** - Task bonuses
- Currency multipliers
- Special abilities
- Task completion bonuses

**3. `battle-data.json`** - Combat stats
- HP, Attack, Defense, Speed
- Movement points (MP)
- Attack wheel (moves with damage/effects)
- Status effect wheels (poisoned, frozen, etc.)
- Abilities

**4. `dialogue.json`** - Personality lines
- Greeting messages
- Task completion phrases
- Idle chatter
- Celebration lines

**5. `store-data.json`** - Shop display
- Purchase price
- Marketing description
- Preview images

**6. `images/`** - Visual assets
- `happy.png` - Default expression
- `sad.png` - Disappointed
- `thinking.png` - Processing
- `shadow.png` - Depth effect
- `battle-sprite.png` - Combat graphic

**7. `wheels/`** (optional) - Attack wheel graphics

#### Battle-data Folder (151 items):

```
Battle-data/
└── Unit-XXX_X_X/
    ├── Unit-XXX_attack_JSON.json   (21 KB) - Full battle data
    ├── Unit-XXX_sprite.png         (3-5 KB) - Battle sprite
    └── Unit-XXX_attack_table.png   (85 KB) - Wheel reference
```

**Examples:**
- `Unit-001_UC_0/` - Bulbasaur (Uncommon)
- `Unit-025_R_0/` - Pikachu (Rare)
- `Unit-150_EX_0/` - Mewtwo (Exclusive)

**Naming Convention:** `Unit-[PokédexNum]_[Rarity]_[FormNum]`

**Rarity Codes:**
- **C** = Common
- **UC** = Uncommon
- **R** = Rare
- **EX** = Exclusive (legendary)

---

### `Imag/` - Image Assets (31 items)

**Root Images:**
- `LOGO.png` - App logo (dashboard header)
- `Add.png` - Add button icon (FAB)
- `Back.png` - Back navigation button
- `Settings.png` - Settings gear icon
- `edit-category.png` - Edit button
- `DUST BUNNY.png` - Background effect (CSS)
- `mascot.png` - Default robot sprite

**Subfolders:**

#### `Achivments/Images/`
- Currency icons: `Bolt.png`, `X.png`
- Achievement/mission graphics
- `Finished Images/` - Polished assets
  - `Missions.png` - Mission bubble icon

#### `Battle/`
- `Space.png` - Game board background
- `Movable-space.png` - Movement indicator
- Battle UI elements

#### `remove background/`
- Image editing workspace
- Source files with backgrounds

---

### `Font/` - Custom Fonts (42 items)

**Used Fonts:**

**1. Cocogoose Condensed**
- **Path:** `Font/cocogoose/Cocogoose-Condensed/Cocogoose-Condensed-Regular-trial.ttf`
- **Usage:** Headers, category titles, bold text
- **Loaded in:** `css/main.css` (line 3)

**2. Sassy Raccoon**
- **Path:** `Font/sassy-raccoon-font/SassyRaccoon-zrXKl.ttf`
- **Usage:** Playful text, task names, robot dialogue
- **Loaded in:** `css/main.css` (line 9)

**3. Inter** (Google Fonts)
- **Usage:** Body text, UI elements
- **Loaded from:** Google Fonts CDN

---

### `Audio/` - Sound Files (3 items)

**Music tracks:**
- `Clean.mp3` (95 KB) - Chore completion sound
- `Duel1.mp3` (1.4 MB) - Battle music
- `Echoes in the Rain.mp3` (2.3 MB) - Ambient track

**Note:** Audio system not yet fully implemented

---

### `docs/` - Documentation Archive (100 items)

**Purpose:** Development logs, notes, and version history

**Structure:**
```
docs/
├── 2025-01-14/  - January 14 development logs
├── 2025-01-15/  - January 15 development logs
├── 2025-10-16/  - October 16 development logs
├── 2025-10-17/  - October 17 development logs
├── how-tos/     - Tutorial documents
└── Old/         - Archived old docs
```

**Contains:** Markdown files, planning docs, feature specs, bug reports

---

## 🔄 DATA FLOW & CONNECTIONS

### App Initialization Sequence:

```
1. index.html loads
   ↓
2. CSS files load (main.css, debug.css)
   ↓
3. JavaScript files load IN ORDER:
   - chore-robot-loader.js (defines ChoreRobotLoader)
   - chore-system.js (defines app, depends on ChoreRobotLoader)
   - battle-system.js (defines BattleSystem)
   - robot-loader.js (defines RobotLoader)
   - robot-database.js (defines RobotDatabase, uses RobotLoader)
   - combat-system.js (defines CombatSystem)
   - team-manager.js (defines TeamManager)
   - main.js (initializes everything)
   ↓
4. main.js runs initialization:
   - app.init() loads ChoreRobotLoader data
   - RobotDatabase.loadExternalRobots() loads battle units
   - BattleSystem.initializeBattle() sets up game board
   - Service Worker registers
   ↓
5. App ready - User sees dashboard
```

### Store System Data Flow:

```
User clicks Robot Factory
   ↓
app.openRobotStore()
   ↓
Loads: ChoreRobotLoader.robots[] 
Source: robots/unified-registry.json → individual robot folders
   ↓
Displays: Robot cards with store-data.json info
   ↓
User purchases robot
   ↓
Updates: app.data.ownedRobots[]
Deducts: app.data.currency
   ↓
Saves: LocalStorage (upkeep_data_[saveFileName])
```

### Battle System Data Flow (Circuit Breaker):

```
User clicks Circuit Breaker Bubble (⚡ bottom left main screen)
   ↓
app.openCircuitBreakerMenu() opens Circuit Breaker main menu
   ↓
Circuit Breaker Menu displays:
  ✅ START BATTLE (active - launches team selection)
  ✅ VIEW MY ROBOTS (active - opens ChoreBot Hangar)
  🔒 STORY MODE (coming soon)
  ✅ BATTLE AI (active - opens AI difficulty selector)
  🔒 RANKED BATTLE (coming soon)
  🔒 BATTLE WITH FRIENDS (coming soon)
  ✅ EXIT (active - returns to upkeep home)
   ↓
User clicks "START BATTLE" button
   ↓
app.startCircuitBreakerBattle() → app.openBattleSystem()
   ↓
Loads: RobotDatabase.robots[] 
Sources: 
  - robots/registry.json (index)
  - robots/Battle-data/Unit-XXX/Unit-XXX_attack_JSON.json (data)
  - Fallback: Hardcoded data in robot-database.js
   ↓
User selects 6-robot team (Team Selection Phase)
   ↓
TeamManager.selectedTeam[] populated
   ↓
User clicks "Deploy for Battle" button
   ↓
BattleSystem places robots on board (SVG positions)
   ↓
First turn spinner determines who goes first
   ↓
User clicks robot → clicks space → movement
User clicks enemy → executeBattle()
   ↓
Combat Resolution:
  - Both robots "spin wheels" (random move selection)
  - CombatSystem.resolveCombat() determines winner
  - Damage applied, status effects processed
  - Battle history logged
   ↓
Win condition check → Victory/Defeat screen
```

### AI Battle Simulator Data Flow:

```
User clicks Circuit Breaker Bubble → Opens Circuit Breaker main menu
   ↓
User clicks "BATTLE AI" button (VS-AI.png image)
   ↓
app.openAIBattleSelector() opens AI difficulty selector screen
   ↓
AI Difficulty Selector displays full-screen modal with 5 difficulties:
  🎓 TUTORIAL (coming soon)
  ★☆☆ EASY (coming soon)
  ★★☆ MEDIUM (coming soon)
  ★★★ HARD (coming soon)
  💎 GEMINI (coming soon - ultimate AI)
   ↓
User clicks Exit button (top-left)
   ↓
app.closeAIBattleSelector() returns to Circuit Breaker menu
```

**AI Battle Simulator Components:**

**HTML Structure** (`index.html`):
- `.ai-battle-selector` - Full-screen modal overlay (z-index: 10000)
- `.ai-selector-container` - Centered content container (max-width: 500px)
- `.ai-exit-btn` - Exit button with Exit.png image (fixed position, top-left)
- `.ai-title-container` - VS AI logo display area
- `.ai-difficulty-list` - Vertical list of 5 difficulty buttons
- `.ai-difficulty-btn` - Individual difficulty option buttons
- `.ai-btn-badge` - "COMING SOON" badge overlay

**CSS Styling** (`main.css` lines 2064-2274):
- **Background:** Same dark gradient as Circuit Breaker
  - `linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)`
- **Exit Button:**
  - Fixed positioning (top: 20px, left: 20px)
  - Z-index: 10001 (above modal)
  - Height: 50px (desktop), 45px (mobile)
  - Hover: Scale 1.1x with red glow effect
- **Title Container:**
  - Margin-top: 70px (desktop), 60px (mobile)
  - Margin-bottom: -10px (negative to reduce space)
- **Difficulty Buttons:**
  - Blue gradient with semi-transparent background
  - Border: 2px solid rgba(59, 130, 246, 0.3)
  - Padding: 20px (desktop), 16px (mobile)
  - Gap: 16px between buttons
  - Hover: Slide right 5px, blue glow, shimmer animation
- **Icons:**
  - Large size (32px desktop, 28px mobile)
  - Centered with drop-shadow
- **Mobile Responsive:** Optimized for <480px screens

**JavaScript Functions** (`chore-system.js` lines 2212-2251):

```javascript
app.openAIBattleSelector()
  - Closes Circuit Breaker menu
  - Adds 'active' class to AI selector modal
  - Logs navigation to console

app.closeAIBattleSelector()
  - Removes 'active' class from AI selector modal
  - Reopens Circuit Breaker menu
  - Logs return navigation to console
```

**Design Features:**
- **Futuristic Aesthetic:** Matches Circuit Breaker and Battle Arena themes
- **Mobile-First:** Android phone optimized (max-width 500px)
- **Clear Hierarchy:** Icon + Text layout for easy recognition
- **Visual Feedback:** Hover effects, glow animations, smooth transitions
- **Consistent Branding:** Cocogoose font, blue glow, dark theme
- **Placeholder Ready:** All buttons disabled with "COMING SOON" badges, ready for AI implementation

**Future Implementation Notes:**
- Tutorial difficulty: Guided battle for new players
- Easy/Medium/Hard: Varying AI difficulty levels
- Gemini: Top-tier AI opponent (special designation with gem icon 💎)
- When activating: Remove `disabled` attribute and `ai-btn-disabled` class, add onclick handler

### Save System Data Flow:

```
User completes task / makes change
   ↓
app.saveData()
   ↓
Serializes: app.data object to JSON
Stores: localStorage.setItem('upkeep_data_default', jsonString)
   ↓
On next app load
   ↓
app.init() → app.loadData()
   ↓
Reads: localStorage.getItem('upkeep_data_default')
Parses: JSON → app.data object
   ↓
State restored
```

---

## ➕ ADDING NEW CONTENT

### How to Add a New Robot:

**Step 1: Create Robot Folder**
```
robots/
└── my-new-robot/
```

**Step 2: Create Required Files**

Use `robots/_template/INSTRUCTIONS.md` as guide, create:

1. **`robot.json`**
```json
{
  "id": "MYNEWROBOT",
  "name": "My New Robot",
  "version": "1.0.0",
  "description": "Description here",
  "theme": "Theme here"
}
```

2. **`chore-data.json`**
```json
{
  "id": "MYNEWROBOT",
  "bonus": {
    "currency": 1.2,
    "description": "20% bonus currency"
  }
}
```

3. **`dialogue.json`**
```json
{
  "greeting": ["Hello!", "Hi there!"],
  "taskComplete": ["Great job!", "Well done!"],
  "idle": ["Hmm...", "Waiting..."],
  "celebration": ["Yay!", "Awesome!"]
}
```

4. **`store-data.json`**
```json
{
  "id": "MYNEWROBOT",
  "cost": 150,
  "description": "Store description",
  "previewImage": "robots/my-new-robot/images/happy.png"
}
```

5. **`battle-data.json`** (if battle-enabled)
```json
{
  "id": "MYNEWROBOT",
  "name": "My New Robot",
  "hp": 100,
  "attack": 80,
  "defense": 70,
  "speed": 90,
  "mp": 2,
  "wheel": [ /* moves here */ ]
}
```

6. **Create `images/` folder:**
- `happy.png` (required)
- `sad.png`
- `thinking.png`
- `shadow.png`
- `battle-sprite.png` (if battle-enabled)

**Step 3: Register in unified-registry.json**

Add entry to `robots/unified-registry.json`:
```json
{
  "id": "MYNEWROBOT",
  "folder": "my-new-robot",
  "name": "My New Robot",
  "purchasable": true,
  "cost": 150,
  "enabled": true,
  "hasBattleData": false,
  "hasChoreData": true,
  "dataFiles": {
    "robot": "robots/my-new-robot/robot.json",
    "chore": "robots/my-new-robot/chore-data.json",
    "dialogue": "robots/my-new-robot/dialogue.json",
    "store": "robots/my-new-robot/store-data.json"
  }
}
```

**Step 4: Test**
1. Start server
2. Check browser console for errors
3. Open Robot Factory - new robot should appear
4. Purchase and select robot
5. Verify dialogue works

---

### How to Add a New Battle Unit:

**Option 1: Use Existing Pokémon Duel Data**

1. Find unit folder: `robots/Battle-data/Unit-XXX_X_X/`
2. Unit is already registered in `robots/registry.json`
3. Just use the unit ID in `RobotDatabase.getRobot('unit-xxx-x-x')`

**Option 2: Create Custom Battle Unit**

1. Create folder: `robots/Battle-data/Unit-999_EX_0/`
2. Create `Unit-999_EX_0_attack_JSON.json` with full battle data
3. Add sprite: `Unit-999_sprite.png`
4. Register in `robots/registry.json`

---

### How to Add a New CSS Style:

**For App UI:**
1. Edit `css/main.css`
2. Add styles to appropriate section
3. Use existing CSS variables (`:root`)
4. Test in browser (refresh with Ctrl+F5)

**For Battle Debugger:**
1. Edit `css/debug.css`
2. Add debugger-specific styles
3. Test in battle mode with debugger open

---

### How to Add New Images:

**UI Icons:**
1. Add to `Imag/` root or appropriate subfolder
2. Reference in HTML: `<img src="Imag/filename.png">`
3. Or in CSS: `background-image: url('Imag/filename.png')`

**Robot Images:**
1. Add to `robots/[robot-name]/images/`
2. Update robot's JSON files to reference paths
3. Standard names: `happy.png`, `sad.png`, `thinking.png`

**Battle Sprites:**
1. Add to `robots/Battle-data/Unit-XXX/Unit-XXX_sprite.png`
2. Size: ~3-5 KB PNG with transparency
3. Recommended dimensions: varies (see existing sprites)

---

## 🔧 SYSTEM DEPENDENCIES

### File Dependencies Map:

```
index.html
  ├─ REQUIRES: css/main.css
  ├─ REQUIRES: css/debug.css
  ├─ REQUIRES: All 8 js/*.js files (in order)
  ├─ REQUIRES: Font/ folder (Cocogoose, Sassy Raccoon)
  └─ REQUIRES: Imag/ folder (all UI images)

css/main.css
  ├─ REQUIRES: Font/cocogoose/...
  ├─ REQUIRES: Font/sassy-raccoon/...
  └─ REQUIRES: Imag/DUST BUNNY.png

js/chore-robot-loader.js
  ├─ LOADS: robots/unified-registry.json
  ├─ LOADS: robots/scrappy-dialogue.json
  ├─ LOADS: robots/[name]/chore-data.json
  └─ LOADS: robots/[name]/dialogue.json

js/chore-system.js
  ├─ REQUIRES: ChoreRobotLoader (loaded first)
  ├─ FALLBACK: robots/store-robots.json
  └─ USES: LocalStorage for save/load

js/battle-system.js
  ├─ REQUIRES: RobotDatabase
  ├─ REQUIRES: CombatSystem
  ├─ REQUIRES: TeamManager
  ├─ USES: Imag/Battle/*.png
  └─ USES: Robot sprites from robots/

js/robot-loader.js
  ├─ LOADS: robots/registry.json
  └─ LOADS: robots/Battle-data/Unit-XXX/*.json

js/robot-database.js
  ├─ REQUIRES: RobotLoader
  └─ FALLBACK: Hardcoded data

js/main.js
  ├─ REQUIRES: app (from chore-system.js)
  ├─ REQUIRES: BattleSystem
  └─ REQUIRES: RobotDatabase

manifest.json
  └─ REQUIRES: Icon images (referenced but may not exist)

sw.js
  └─ REQUIRES: manifest.json, index.html
```

### Critical Paths - DO NOT DELETE:

✅ **Essential Folders:**
- `css/` - All styles
- `js/` - All application logic
- `robots/` - All robot data
- `Imag/` - All images
- `Font/` - Custom fonts

✅ **Essential Files:**
- `index.html` - App entry point
- `manifest.json` - PWA config
- `sw.js` - Service worker
- Server launchers (`.bat`, `.ps1`, `.py`)

✅ **Essential Robot Files:**
- `robots/unified-registry.json`
- `robots/registry.json`
- `robots/scrappy-dialogue.json`
- All robot component folders

❌ **Safe to Delete:**
- `docs/` - Development archive only
- `Audio/` - Not yet implemented
- Backup files (`.backup*`)
- `main-fixed.css` (verify first)

---

## 🐛 TROUBLESHOOTING

### Common Issues:

**Problem: "Scrappy only says 'Sold!'"**
- **Cause:** Dialogue not loading from JSON
- **Check:** Browser console for fetch errors
- **Verify:** `robots/scrappy-dialogue.json` exists
- **Solution:** Run from server (not file://)

**Problem: "CORS errors" / Files not loading**
- **Cause:** Opening index.html directly (file:// protocol)
- **Solution:** MUST use local server (see Quick Start)
- **Check:** URL should be `http://localhost:8000`

**Problem: "Robot not appearing in store"**
- **Check 1:** Added to `robots/unified-registry.json`?
- **Check 2:** `enabled: true` and `purchasable: true`?
- **Check 3:** All required files exist in robot folder?
- **Check 4:** Browser console shows no JSON errors?

**Problem: "Battle robot not found"**
- **Check 1:** Robot ID in `robots/registry.json`?
- **Check 2:** Battle-data JSON file exists?
- **Check 3:** Correct file path in registry?
- **Fallback:** Check if hardcoded in `robot-database.js`

**Problem: "Styles not applying"**
- **Check 1:** CSS file linked in `index.html`?
- **Check 2:** CSS file path correct (case-sensitive)?
- **Check 3:** Hard refresh (Ctrl+Shift+R)?
- **Check 4:** Browser console shows CSS errors?

**Problem: "JavaScript errors on load"**
- **Check 1:** All 8 JS files in correct order?
- **Check 2:** No syntax errors (check console)?
- **Check 3:** All dependencies loaded before usage?
- **Solution:** Check exact script order in index.html

**Problem: "LocalStorage data lost"**
- **Cause:** Browser cache cleared or different domain
- **Prevention:** Export save files regularly
- **Recovery:** Check if backup save file exists

**Problem: "Service Worker not updating"**
- **Solution 1:** Hard refresh (Ctrl+Shift+R)
- **Solution 2:** Unregister SW in DevTools → Application → Service Workers
- **Solution 3:** Change cache version in `sw.js`

**Problem: "Battle mode bubble not visible"**
- **Check 1:** Are you on the main dashboard screen?
- **Check 2:** Hard refresh (Ctrl+Shift+R) to clear CSS cache
- **Check 3:** Check if `.battle-mode-bubble` CSS exists in `main.css`
- **Check 4:** Verify bubble element exists in `index.html` (search for "battle-mode-bubble")
- **Location:** Should be bottom left, 110px from bottom (above robot store bubble)

**Problem: "Battle bubble shows during battle"**
- **Check 1:** Verify `body.battle-mode` CSS rules exist in `main.css`
- **Check 2:** Battle view should add `battle-mode` class to body
- **Check 3:** Check CSS specificity - `!important` flags should hide bubbles
- **Expected:** All bubbles hidden during battle except debug toggle

---

## 📝 FINAL NOTES

### Best Practices:

1. **Always run local server** - Never use file:// protocol
2. **Test in browser console** - Check for errors (F12)
3. **Backup before major changes** - Export save files
4. **Maintain script order** - index.html script tags are critical
5. **Use component architecture** - Keep robot data modular
6. **Follow naming conventions** - Match existing patterns
7. **Document changes** - Update this guide when adding features

### Quick Reference Commands:

```powershell
# Start server (easiest)
START-SERVER.bat

# Start server (PowerShell)
python -m http.server 8000

# Access app
http://localhost:8000

# Check console (in browser)
Press F12 → Console tab

# Hard refresh (clear cache)
Ctrl + Shift + R

# Export save file
Settings → Save Game → Download backup
```

---

## 📚 RELATED DOCUMENTATION

- `HOW-TO-RUN.md` - Detailed server setup
- `robots/README.md` - Robot system architecture  
- `robots/DIALOGUE-SYSTEM-README.md` - Dialogue system docs
- `robots/MIGRATION_STATUS.md` - Component migration notes
- `robots/_template/INSTRUCTIONS.md` - New robot template
- `docs/` - Historical development notes

---

**Last Updated:** October 18, 2025  
**Maintained by:** Development Team  
**Version:** 2.0 (Component-Based Architecture)

**Recent Changes (Oct 18, 2025):**
- ✅ Created Circuit Breaker main menu system (complete battle game hub)
- ✅ Added Circuit Breaker logo and 7-button menu (4 active: START BATTLE, VIEW MY ROBOTS, BATTLE AI, EXIT)
- ✅ Updated battle bubble to use custom CB-button.png image
- ✅ Battle bubble now opens Circuit Breaker menu instead of direct battle access
- ✅ Added 3 new JavaScript functions: openCircuitBreakerMenu(), closeCircuitBreakerMenu(), startCircuitBreakerBattle()
- ✅ Implemented dark blue/black gradient theme matching battle system aesthetic
- ✅ Added futuristic button styling with blue glow effects and "COMING SOON" badges
- ✅ Moved battle mode access from Settings panel to main screen bubble (earlier today)
- ✅ **AI Battle Simulator Selection Screen Added:**
  - Activated "BATTLE AI" button in Circuit Breaker menu
  - Created full-screen AI difficulty selector modal (`.ai-battle-selector`)
  - Added 5 difficulty levels: TUTORIAL, EASY, MEDIUM, HARD, GEMINI
  - Implemented Exit button with Exit.png image (fixed top-left)
  - Added VS AI title image display with blue glow effect
  - Created compact layout with negative margins to minimize wasted space
  - Implemented hover effects: slide animation, blue glow, shimmer sweep
  - Added 2 new JavaScript functions: openAIBattleSelector(), closeAIBattleSelector()
  - Mobile-responsive design optimized for Android phones (<480px)
  - All difficulties currently placeholders with "COMING SOON" badges

---

🎮 **Happy Coding!** If you make changes, please update this document!

