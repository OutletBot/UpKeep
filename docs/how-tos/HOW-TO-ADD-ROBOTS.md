# 🤖 How to Add Custom Robots - Component-Based System

**Last Updated:** October 18, 2025  
**System Version:** 2.0 (Component Architecture)

---

## 📋 Table of Contents

1. [Quick Overview](#-quick-overview)
2. [Prerequisites](#-prerequisites)
3. [Step-by-Step Guide](#-step-by-step-guide)
4. [File Structure Reference](#-file-structure-reference)
5. [Testing Your Robot](#-testing-your-robot)
6. [Troubleshooting](#-troubleshooting)
7. [Complete Example](#-complete-example)

---

## 🎯 Quick Overview

### **What You'll Create:**

A **complete robot component** that:
- ✅ Appears in the Robot Factory store
- ✅ Can be purchased with currency
- ✅ Has unique personality dialogue
- ✅ Works in the chore system
- ✅ **Optionally:** Can battle in battle mode

### **Time Estimate:**
- **Chore-only robot:** 15-20 minutes
- **Chore + Battle robot:** 30-40 minutes

### **Key Difference from Old System:**

**❌ OLD (Manual):** Edit 5+ JavaScript files, risk breaking code  
**✅ NEW (Component):** Create 1 folder + 5 JSON files, add 1 registry entry

**No JavaScript editing required!** The system automatically loads everything from your component folder.

---

## ✅ Prerequisites

### **What You Need:**

1. **Images (4 required):**
   - `happy.png` - Default cheerful expression
   - `sad.png` - Disappointed/broken state
   - `thinking.png` - Processing/calculating
   - `shadow.png` - Silhouette for store preview

2. **Robot Concept:**
   - Unique name and theme
   - Personality traits
   - Price (cost in bolts)

3. **Optional - For Battle:**
   - Choose a Pokémon from `robots/Battle-data/` (150 available)
   - Or create custom battle data

### **Tools:**
- Text editor (VS Code, Notepad++, etc.)
- Image editor (for PNGs)
- JSON validator (VS Code has built-in)

---

## 📝 Step-by-Step Guide

### **Step 1: Create Robot Folder** (2 min)

Navigate to the `robots/` directory and create a new folder:

```
robots/
└── your-robot-name/    ← Create this folder (use kebab-case)
```

**Naming Convention:**
- Use lowercase
- Separate words with hyphens
- Examples: `cyber-ninja`, `space-explorer`, `garden-bot`

---

### **Step 2: Create `robot.json`** (2 min)

This file contains core metadata about your robot.

**File:** `robots/your-robot-name/robot.json`

```json
{
  "id": "YOURROBOTID",
  "name": "Your Robot Name",
  "version": "1.0.0",
  "type": "custom",
  "created": "2025-10-18"
}
```

**Field Explanations:**
- `id`: **UPPERCASE** identifier (used throughout system)
- `name`: Display name (with proper capitalization)
- `version`: Semantic version number
- `type`: Usually "custom" for user-created robots
- `created`: Creation date (YYYY-MM-DD)

**Example:**
```json
{
  "id": "CYBERNINJA",
  "name": "Cyber Ninja",
  "version": "1.0.0",
  "type": "custom",
  "created": "2025-10-18"
}
```

---

### **Step 3: Create `chore-data.json`** (3 min)

This makes your robot **purchasable and usable for chores**.

**File:** `robots/your-robot-name/chore-data.json`

```json
{
  "id": "YOURROBOTID",
  "purchasable": true,
  "cost": 150,
  "unlockRequirements": [],
  "description": "A description that appears in the store when viewing the robot.",
  "imagePaths": {
    "happy": "robots/your-robot-name/images/happy.png",
    "sad": "robots/your-robot-name/images/sad.png",
    "thinking": "robots/your-robot-name/images/thinking.png",
    "shadow": "robots/your-robot-name/images/shadow.png"
  },
  "legacyImagePaths": {
    "happy": "Imag/Achivments/Images/Your-Robot/Happy.png",
    "sad": "Imag/Achivments/Images/Your-Robot/Sad.png",
    "thinking": "Imag/Achivments/Images/Your-Robot/Thinking.png",
    "shadow": "Imag/Achivments/Images/Your-Robot/Shadow.png"
  }
}
```

**Field Explanations:**
- `id`: Must match `robot.json` ID (UPPERCASE)
- `purchasable`: Set to `true` to show in store
- `cost`: Price in currency bolts (50-250 typical range)
- `unlockRequirements`: Array of prerequisites (can be empty `[]`)
- `description`: Marketing text shown in store
- `imagePaths`: **Primary** image locations (component folder)
- `legacyImagePaths`: **Fallback** image locations (old system)

**💡 Tip:** The system tries `imagePaths` first, then falls back to `legacyImagePaths` if files not found.

---

### **Step 4: Create `dialogue.json`** (5 min)

This gives your robot a unique personality with custom dialogue.

**File:** `robots/your-robot-name/dialogue.json`

```json
{
  "hasCustomDialogue": true,
  "greeting": [
    "Hello! Ready to tackle some chores!",
    "Let's get to work!",
    "Greetings! What's on the task list today?",
    "Hi there! Time to be productive!",
    "Welcome back! Let's make today count!"
  ],
  "success": [
    "Task completed! Great work!",
    "Another one down! Excellent!",
    "Success! You're on a roll!",
    "Well done! Keep it up!",
    "Fantastic job on that task!"
  ],
  "achievement": [
    "Achievement unlocked! You earned a reward!",
    "Nice! That's an accomplishment!",
    "Way to go! Rewards incoming!",
    "Impressive! Here's your prize!"
  ],
  "broken": [
    "I need repairs... help!",
    "Systems failing... maintenance required!",
    "Can't continue without repairs!",
    "Please fix me... I'm broken!"
  ],
  "random": [
    "Did you know I can calculate pi to 1000 digits?",
    "Hmm, interesting day we're having!",
    "I wonder what's for lunch...",
    "Productivity is my middle name!",
    "Let's keep this momentum going!"
  ],
  "mad": [
    "This mess is unacceptable! Clean it NOW!",
    "I can't work in these conditions!",
    "This is frustrating! Fix it immediately!",
    "Come on, we need to do better than this!",
    "Not impressed with this situation!"
  ]
}
```

**Dialogue Categories:**
- `greeting`: When robot is first selected (5+ messages)
- `success`: When user completes a task (5+ messages)
- `achievement`: When earning rewards (4+ messages)
- `broken`: When robot needs repair (4+ messages)
- `random`: Idle chatter/periodic messages (5+ messages)
- `mad`: When upset about uncompleted tasks (5+ messages)

**⚠️ CRITICAL:** Must include `"hasCustomDialogue": true` at the top!

**✨ Writing Tips:**
- Match your robot's theme and personality
- Be creative and fun
- Add humor or character quirks
- 5+ messages per category for variety
- Keep messages concise (1-2 sentences)

---

### **Step 5: Create `store-data.json`** (2 min)

Additional store-specific metadata.

**File:** `robots/your-robot-name/store-data.json`

```json
{
  "featured": false,
  "tags": ["electric", "fast", "tech", "rare"],
  "category": "premium",
  "releaseDate": "2025-10-18"
}
```

**Field Explanations:**
- `featured`: Set to `true` to highlight in store (optional)
- `tags`: Array of descriptive tags for categorization
- `category`: Store category ("standard", "premium", "special")
- `releaseDate`: When robot was added (YYYY-MM-DD)

---

### **Step 6: Create `images/` Folder** (3 min)

Create the images folder and add your 4 required PNG files:

```
robots/your-robot-name/
└── images/
    ├── happy.png      ← Default expression
    ├── sad.png        ← Disappointed face
    ├── thinking.png   ← Processing state
    └── shadow.png     ← Silhouette for store
```

**Image Requirements:**
- **Format:** PNG with transparency
- **Size:** Flexible (100x100 to 400x400 typical)
- **Style:** Match existing robots
- **Shadow:** Should be all black silhouette

**💡 Tip:** Copy an existing robot's images as templates and customize them.

---

### **Step 7: [OPTIONAL] Add Battle Data** (10 min)

Skip this if your robot is chore-only. For battle-enabled robots:

#### **Option A: Link to Existing Pokémon Data (Recommended)**

**File:** `robots/your-robot-name/battle-data.json`

```json
{
  "linkToBattleUnit": "unit-025-r-0",
  "customizations": {
    "name": "Your Robot Name",
    "ability": {
      "name": "Custom Ability Name",
      "description": "Custom ability description."
    }
  }
}
```

This tells the system to load battle stats from `robots/Battle-data/Unit-025_R_0/` (Pikachu in this example).

**Available Units:** Browse `robots/Battle-data/` for 150+ options:
- `Unit-001_UC_0` - Bulbasaur
- `Unit-006_EX_0` - Charizard  
- `Unit-025_R_0` - Pikachu
- `Unit-150_EX_0` - Mewtwo
- And 146 more...

#### **Option B: Create Custom Battle Data**

Copy battle data from a Pokémon and customize it:

**File:** `robots/your-robot-name/battle-data.json`

```json
{
  "mp": 2,
  "role": "Vanguard",
  "stats": {
    "hp": 100,
    "attack": 88,
    "defense": 75,
    "speed": 63
  },
  "ability": {
    "name": "Lightning Strike",
    "description": "Electric attacks have increased accuracy and can paralyze multiple robots."
  },
  "image": "robots/your-robot-name/images/happy.png",
  "attacks": {
    "basic": [
      {
        "moveName": "Thunder Shock",
        "moveType": "White",
        "size": 32,
        "damage": 60,
        "effect": "Basic electric attack"
      },
      {
        "moveName": "Paralyze",
        "moveType": "Purple",
        "size": 24,
        "stars": 1,
        "effect": "The battle opponent becomes paralyzed"
      },
      {
        "moveName": "Miss",
        "moveType": "Red",
        "size": 40,
        "effect": "None"
      }
    ],
    "poisoned": [],
    "paralyzed_list": [],
    "burned_list": [],
    "frozen_list": [],
    "asleep_list": []
  }
}
```

**⚠️ CRITICAL RULES for Battle Data:**

1. **Wheel sizes MUST sum to 96:**
   - Example: 32 + 24 + 40 = 96 ✅
   - Wrong: 30 + 25 + 40 = 95 ❌ (won't work!)

2. **Move Types:**
   - `White` - Damage attack (requires `damage` field)
   - `Gold` - Priority damage (requires `damage` field)
   - `Purple` - Status effect (requires `stars` field: 1, 2, or 3)
   - `Blue` - Defensive move
   - `Red` - Miss (no damage)

3. **Use "robots" not "Pokémon":**
   - ✅ "The battle opponent becomes paralyzed"
   - ❌ "The opposing Pokémon becomes paralyzed"

4. **Stars must be numbers:**
   - ✅ `"stars": 2`
   - ❌ `"stars": "★★"`

---

## 🎨 CRITICAL: Customizing Attacks for Your Robot's Personality

**This is THE MOST IMPORTANT part of adding battle robots!**

When using Pokémon data, you **MUST customize attack names and descriptions** to match your robot's theme. The mechanics stay the same, but the flavor changes.

### **⚠️ ABSOLUTELY CRITICAL - NO POKÉMON REFERENCES! ⚠️**

**THIS IS A ROBOT GAME, NOT A POKÉMON GAME!**

You **MUST** remove ALL Pokémon-related words from:
- ❌ Attack names (no "Thunder Shock", "Solar Beam", etc.)
- ❌ Attack descriptions (no "Pokémon", "opposing Pokémon", etc.)
- ❌ Ability descriptions (no "Pokémon" references anywhere!)

**Always use "robot" or "opponent" instead of "Pokémon":**

❌ **WRONG:** "Move this Pokémon 1 space"  
✅ **CORRECT:** "Move this robot 1 space"

❌ **WRONG:** "The opposing Pokémon becomes paralyzed"  
✅ **CORRECT:** "The battle opponent becomes paralyzed" or "The opposing robot becomes paralyzed"

❌ **WRONG:** "Adjacent Pokémon gain Wait"  
✅ **CORRECT:** "Adjacent robots gain Wait"

**This is non-negotiable - EVERY Pokémon reference must be changed to robot terminology!**

### **What to KEEP (Don't Change):**

These maintain game balance and mechanics:

✅ **Keep Unchanged:**
- `moveType` - White, Gold, Purple, Blue, Red
- **Miss segments stay Red!** Never recolor a miss into a White move.
- `size` - Wheel segment size (must sum to 96)
- `damage` - Attack damage value
- `stars` - Purple move star count (1, 2, 3, or 4)
- Wheel structure (number of moves, status wheels)
- Effect behavior (keep the same meaning; only remove the word "Pokémon" if present)

### **What to CUSTOMIZE (Must Change):**

These define your robot's personality:

🎯 **Must Customize:**
- `moveName` - Attack name (match robot's theme!)
- `effect` - Wording may change **only** to remove "Pokémon" references; do not change the move's mechanics or behavior
- `ability.name` - Ability name
- `ability.description` - Ability description (remove "Pokémon" wording but keep original effect)

---

### **Step-by-Step Customization Process:**

#### **1. Copy Source Pokémon Data**

Find a Pokémon in `robots/Battle-data/Unit-XXX_X_X/Unit-XXX_attack_JSON.json`

**Example - Original Pikachu Data:**
```json
{
  "moveName": "Thunder Shock",
  "moveType": "White",
  "size": 32,
  "damage": 60,
  "effect": "Basic electric attack"
}
```

#### **2. Rename Attack to Match Theme**

**Theme: Cyber Ninja Robot**

```json
{
  "moveName": "Digital Surge",  // ← Changed from "Thunder Shock"
  "moveType": "White",          // ← Keep same
  "size": 32,                   // ← Keep same
  "damage": 60,                 // ← Keep same
  "effect": "Basic electric attack"
}
```

#### **3. Customize Description**

```json
{
  "moveName": "Digital Surge",
  "moveType": "White",
  "size": 32,
  "damage": 60,
  "effect": "Unleashes a surge of binary code energy"  // ← Customized!
}
```

**✅ Perfect!** Mechanics preserved, personality added.

---

### **Real Example: Clown Bot (Based on Gengar)**

#### **Before (Original Gengar):**
```json
{
  "moveName": "Shadow Ball",
  "moveType": "White",
  "size": 40,
  "damage": 120,
  "effect": "High damage ghost attack"
}
```

#### **After (Clown Bot):**
```json
{
  "moveName": "Pie in the Face",  // ← Circus theme!
  "moveType": "White",            // ← Same type
  "size": 40,                     // ← Same size
  "damage": 120,                  // ← Same damage
  "effect": "High damage cream pie attack"  // ← Themed description!
}
```

---

### **Attack Naming Strategy by Theme:**

#### **🤖 Tech/Cyber Theme:**
- Thunder Shock → **"Digital Surge"**, **"Cyber Blast"**, **"Code Strike"**
- Quick Attack → **"Processing Speed"**, **"Binary Rush"**, **"Data Stream"**
- Iron Tail → **"Steel Protocol"**, **"Metal Whip"**, **"Chrome Slam"**

#### **🎪 Circus/Clown Theme:**
- Shadow Ball → **"Pie in the Face"**, **"Cream Splat"**, **"Clown's Trick"**
- Protect → **"Balloon Animal Shield"**, **"Juggling Defense"**, **"Circus Barrier"**
- Hex → **"Circus Chaos"**, **"Carnival Madness"**, **"Spooky Show"**

#### **🌟 Space/Cosmic Theme:**
- Thunderbolt → **"Meteor Strike"**, **"Cosmic Ray"**, **"Star Burst"**
- Psychic → **"Gravity Warp"**, **"Void Touch"**, **"Nebula Pulse"**
- Flash Cannon → **"Photon Beam"**, **"Solar Flare"**, **"Galaxy Shot"**

#### **🌿 Nature/Garden Theme:**
- Vine Whip → **"Root Lash"**, **"Branch Strike"**, **"Thorn Whip"**
- Solar Beam → **"Sunlight Ray"**, **"Photon Burst"**, **"Growth Beam"**
- Poison Powder → **"Spore Cloud"**, **"Pollen Scatter"**, **"Toxic Bloom"**

#### **🔥 Fire/Heat Theme:**
- Flamethrower → **"Inferno Blast"**, **"Heat Wave"**, **"Torch Stream"**
- Fire Punch → **"Blazing Fist"**, **"Magma Strike"**, **"Ember Punch"**
- Will-O-Wisp → **"Flame Spirit"**, **"Heat Phantom"**, **"Burn Ghost"**

#### **❄️ Ice/Cold Theme:**
- Ice Beam → **"Frost Cannon"**, **"Arctic Blast"**, **"Cryo Ray"**
- Blizzard → **"Snowstorm"**, **"Glacier Wind"**, **"Deep Freeze"**
- Icy Wind → **"Chill Breeze"**, **"Frostbite"**, **"Winter Gust"**

---

### **Description Customization Guide:**

**⚠️ REMEMBER: No "Pokémon" references - use "robot", "opponent", or "battle opponent"!**

#### **Damage Attacks (White/Gold):**

**Generic (NO Pokémon words!):** "High damage electric attack"  
**Themed Examples:**
- **Tech:** "Overclocks circuits for massive digital damage"
- **Circus:** "Slaps opponent with oversized comedy hammer"
- **Space:** "Harnesses the power of collapsing stars"
- **Nature:** "Channels pure life energy into devastating force"

#### **Status Effects (Purple):**

**Generic (Uses "opponent" NOT "Pokémon"):** "The battle opponent becomes paralyzed"  
**Themed Examples:**
- **Tech:** "Virus injection freezes opponent's system"
- **Circus:** "Confetti explosion stuns the audience"
- **Space:** "Zero gravity field immobilizes the target"
- **Nature:** "Entangling vines root opponent in place"

#### **Movement/Position Effects:**

**Examples (Uses "robot" NOT "Pokémon"):**
- ❌ **WRONG:** "Move this Pokémon 2 spaces"
- ✅ **CORRECT:** "Move this robot 2 spaces"
- ✅ **CORRECT:** "Repositions the robot to a strategic location"
- ✅ **CORRECT:** "Teleports opponent robot 1 space backward"

#### **Multi-Target Effects:**

**Examples (Uses "robots" NOT "Pokémon"):**
- ❌ **WRONG:** "Adjacent Pokémon gain Wait 3"
- ✅ **CORRECT:** "Adjacent robots gain Wait 3"
- ✅ **CORRECT:** "All opposing robots in range become confused"
- ✅ **CORRECT:** "The battle opponent and surrounding robots take damage"

#### **Defensive Moves (Blue):**

**Generic:** "Defensive move"  
**Themed Examples:**
- **Tech:** "Activates electromagnetic force field"
- **Circus:** "Deploys inflatable balloon barrier"
- **Space:** "Creates gravitational shield bubble"
- **Nature:** "Grows protective wall of thorns"

---

### **Complete Customization Example:**

#### **Source: Pikachu (Unit-025_R_0)**

```json
{
  "ability": {
    "name": "Static",
    "description": "Can paralyze opponents with Thunder Wave."
  },
  "attacks": {
    "basic": [
      {
        "moveName": "Thunder",
        "moveType": "White",
        "size": 32,
        "damage": 100
      },
      {
        "moveName": "Thunder Wave",
        "moveType": "Purple",
        "size": 24,
        "stars": 2,
        "effect": "The battle opponent becomes paralyzed"
      },
      {
        "moveName": "Quick Attack",
        "moveType": "Gold",
        "size": 32,
        "damage": 50
      },
      {
        "moveName": "Miss",
        "moveType": "Red",
        "size": 8
      }
    ]
  }
}
```

#### **Customized: Cyber Ninja (Tech Theme)**

```json
{
  "ability": {
    "name": "Digital Strike",  // ← Themed ability name
    "description": "Virus attacks can disable multiple robot systems simultaneously."  // ← Themed description
  },
  "attacks": {
    "basic": [
      {
        "moveName": "Thunder Code",  // ← Themed name
        "moveType": "White",          // ✅ Same
        "size": 32,                   // ✅ Same
        "damage": 100                 // ✅ Same
      },
      {
        "moveName": "System Virus",  // ← Themed name
        "moveType": "Purple",        // ✅ Same
        "size": 24,                  // ✅ Same
        "stars": 2,                  // ✅ Same
        "effect": "Injects virus code that freezes opponent's circuits"  // ← Themed effect
      },
      {
        "moveName": "Speed Protocol",  // ← Themed name
        "moveType": "Gold",            // ✅ Same
        "size": 32,                    // ✅ Same
        "damage": 50                   // ✅ Same
      },
      {
        "moveName": "Miss",  // ← Keep as "Miss"
        "moveType": "Red",   // ✅ Same
        "size": 8            // ✅ Same
      }
    ]
  }
}
```

---

### **⚠️ CRITICAL Checklist for Battle Customization:**

Before finalizing your battle data:

#### **Mechanics (Must NOT Change):**
- [ ] All `moveType` values unchanged (White, Gold, Purple, Blue, Red)
- [ ] Miss slices stay Red (0 damage, effect unchanged)
- [ ] All `size` values unchanged
- [ ] Total wheel size = 96 (calculate: add all sizes)
- [ ] All `damage` values unchanged
- [ ] All `stars` values unchanged (1, 2, 3, or 4)
- [ ] Number of moves in wheel unchanged
- [ ] Status wheel structure unchanged
- [ ] Effects keep original behavior (only remove the word "Pokémon" if present)

#### **Theming (Must Change):**
- [ ] All `moveName` values customized to theme
- [ ] All `effect` descriptions customized to theme
- [ ] `ability.name` customized to theme
- [ ] `ability.description` customized to theme
- [ ] NO references to "Pokémon" (use "robots" or "opponent")
- [ ] NO references to original Pokémon names
- [ ] Attack names are creative and unique
- [ ] Descriptions match robot's personality

#### **Quality Check:**
- [ ] Names are creative and fit theme perfectly
- [ ] Descriptions are engaging and flavorful
- [ ] All text is family-friendly
- [ ] Grammar and spelling are correct
- [ ] Consistent tone throughout all attacks

---

### **Common Mistakes to Avoid:**

❌ **WRONG - Changed damage (breaks balance):**
```json
{
  "moveName": "Mega Punch",
  "damage": 150  // ← Changed from 100! DON'T DO THIS!
}
```

❌ **WRONG - Changed wheel size (breaks wheel total):**
```json
{
  "moveName": "Quick Strike",
  "size": 40  // ← Changed from 32! DON'T DO THIS!
}
```

❌ **WRONG - Generic Pokémon attack name:**
```json
{
  "moveName": "Thunder"  // ← Still using Pokémon attack name! This is a ROBOT game!
}
```

❌ **WRONG - Used "Pokémon" in description:**
```json
{
  "effect": "The opposing Pokémon becomes paralyzed"  // ← NEVER use "Pokémon"!
}
```

❌ **WRONG - Pokémon-style movement description:**
```json
{
  "effect": "Move this Pokémon 2 spaces"  // ← Say "robot" not "Pokémon"!
}
```

❌ **WRONG - Multiple Pokémon references:**
```json
{
  "effect": "Adjacent Pokémon gain Wait 3"  // ← Say "robots" not "Pokémon"!
}
```

✅ **CORRECT - Name and description customized, NO Pokémon words:**
```json
{
  "moveName": "Digital Surge",  // ← Themed robot name
  "moveType": "White",           // ← Mechanics unchanged
  "size": 32,                    // ← Mechanics unchanged
  "damage": 100,                 // ← Mechanics unchanged
  "effect": "Overloads enemy robot's circuits with data"  // ← Says "robot" not "Pokémon"
}
```

✅ **CORRECT - Movement effect properly worded:**
```json
{
  "effect": "Move this robot 2 spaces to a better position"  // ← Uses "robot"!
}
```

✅ **CORRECT - Multi-target effect properly worded:**
```json
{
  "effect": "Adjacent robots gain Wait 3 and become stunned"  // ← Uses "robots"!
}
```

---

### **Step 8: Register in `unified-registry.json`** (3 min)

**File:** `robots/unified-registry.json`

**⚠️ CRITICAL FOR BATTLE ROBOTS:**
If your robot has battle data, you **MUST**:
1. Set `hasBattleData: true` (required!)
2. Include `"battle": "robots/your-robot/battle-data.json"` in dataFiles (required!)

**Without these, your robot will NOT appear in battle mode!**

Add your robot to the array (before the closing `]` bracket):

```json
{
  "id": "YOURROBOTID",
  "folder": "your-robot-name",
  "name": "Your Robot Name",
  "purchasable": true,
  "cost": 150,
  "enabled": true,
  "hasBattleData": false,
  "hasChoreData": true,
  "dataFiles": {
    "robot": "robots/your-robot-name/robot.json",
    "chore": "robots/your-robot-name/chore-data.json",
    "dialogue": "robots/your-robot-name/dialogue.json",
    "store": "robots/your-robot-name/store-data.json"
  }
}
```

**If robot has battle data, also add:**
```json
{
  "id": "YOURROBOTID",
  "folder": "your-robot-name",
  "name": "Your Robot Name",
  "purchasable": true,
  "cost": 150,
  "enabled": true,
  "hasBattleData": true,
  "hasChoreData": true,
  "dataFiles": {
    "robot": "robots/your-robot-name/robot.json",
    "chore": "robots/your-robot-name/chore-data.json",
    "dialogue": "robots/your-robot-name/dialogue.json",
    "store": "robots/your-robot-name/store-data.json",
    "battle": "robots/your-robot-name/battle-data.json"
  }
}
```

**Field Explanations:**
- `id`: Must match robot.json (UPPERCASE)
- `folder`: Your component folder name (kebab-case)
- `name`: Display name
- `purchasable`: `true` to show in store
- `cost`: Price in bolts
- `enabled`: `true` to activate robot
- `hasBattleData`: `true` if battle-data.json exists
- `hasChoreData`: Always `true` for purchasable robots
- `dataFiles`: Paths to all JSON files

**⚠️ IMPORTANT:** Don't forget the comma after the previous robot's entry!

---

### **Step 9: Add to Battle Registry & Whitelist** (2 min) ⚠️ **REQUIRED FOR BATTLE ROBOTS!**

**🚨 CRITICAL: Battle robots need TWO registry entries!**

#### **Part A: Add to `robots/registry.json`** (Main Battle Registry)

**File:** `robots/registry.json`

Add your robot entry at the end (before the closing `]`):

```json
{
    "id":  "ghost-bot",
    "folder":  "ghost-bot",
    "number":  155,
    "name":  "Ghost Bot",
    "rarity":  "UC",
    "variation":  0,
    "type":  "Ghost / Poison",
    "mp":  3,
    "evolution":  "",
    "evolvedFrom":  "",
    "evolutionNum":  0,
    "assetPath":  "robots/ghost-bot",
    "spriteFile":  "images/happy.png",
    "dataFile":  "battle-data.json",
    "hasCompleteData":  true,
    "enabled":  true,
    "requiresPurchase":  true
}
```

**Field Guide:**
- `id`: Folder name (kebab-case)
- `folder`: Same as id
- `number`: Next sequential number (155, 156, etc.)
- `name`: Display name
- `rarity`: UC (mp:3), R (mp:2), EX (mp:1)
- `type`: Robot type (Ghost/Poison, Tech, etc.)
- `mp`: Movement points (1-3)
- `assetPath`: "robots/your-robot-name"
- `spriteFile`: "images/happy.png"
- `dataFile`: "battle-data.json"
- `hasCompleteData`: true
- `enabled`: true
- `requiresPurchase`: true (if purchasable)

**⚠️ Don't forget the comma after the previous entry!**

#### **Part B: Add to Battle Whitelist**

**File:** `js/robot-loader.js`

Find the `allowedRobots` array (around line 80) and add your robot's **folder name**:

```javascript
// WHITELIST: Only allow these robots in battle
const allowedRobots = [
    'unit-003-ex-0',    // Venusaur (default)
    'unit-025-r-0',     // Pikachu (default)
    'unit-150-ex-0',    // Mewtwo (default)
    'unit-001-uc-0',    // Jack-o'-Bot (store)
    'clown-bot',        // Clown Bot (store)
    'witch-bot',        // Witch-Bot (store)
    'freezy',           // Freezy (store)
    'ghost-bot',        // Ghost Bot (store)
    'your-robot-name'   // ← ADD YOUR ROBOT'S FOLDER NAME HERE!
];
```

**⚠️ CRITICAL NOTES:**
- Use the **folder name** (kebab-case), NOT the registry ID (UPPERCASE)
- Example: 'ghost-bot' ✓ (NOT 'GHOSTBOT' ❌)
- Must match the `id` field in registry.json
- Don't forget the comma after the previous entry!
- Without BOTH registry.json AND whitelist, robot will NOT appear!

**Why BOTH are needed:**
1. `registry.json` - RobotLoader uses this to find and load robots
2. `robot-loader.js` whitelist - Security filter to control which robots are battle-enabled

---

## ✅ Complete! Your Robot is Ready!

**That's it!** The system will automatically:
- ✅ Load your robot when the app starts
- ✅ Display it in the Robot Factory store
- ✅ Handle purchase transactions
- ✅ Load custom dialogue
- ✅ Enable for chore system
- ✅ Load battle data (if provided)
- ✅ Make it selectable in battle mode (if whitelisted)

---

## 📁 File Structure Reference

### **Complete Component Folder:**

```
robots/
└── your-robot-name/
    ├── robot.json          ← Core metadata
    ├── chore-data.json     ← Store/chore config
    ├── dialogue.json       ← Personality dialogue
    ├── store-data.json     ← Store metadata
    ├── battle-data.json    ← (Optional) Battle stats
    └── images/
        ├── happy.png       ← Default face
        ├── sad.png         ← Sad face
        ├── thinking.png    ← Processing face
        └── shadow.png      ← Store silhouette
```

### **Files to Edit:**

✅ **Only 1 file outside your component folder:**
- `robots/unified-registry.json` - Add robot entry

❌ **Do NOT edit these (old system):**
- `js/chore-system.js` - No longer needed!
- `js/robot-database.js` - No longer needed!
- `robots/store-robots.json` - Being phased out!

---

## 🧪 Testing Your Robot

### **Step 1: Start Server**

```powershell
# Run this from project root
START-SERVER.bat

# Or manually:
python -m http.server 8000
```

### **Step 2: Open App**

Navigate to: `http://localhost:8000`

### **Step 3: Check Browser Console**

Press **F12** to open DevTools, check Console tab for:

```
✅ Store robots loaded from JSON: 9 robots
✅ Scrappy dialogue loaded from JSON
✅ Loaded robot: YOURROBOTID
```

If you see errors, jump to [Troubleshooting](#-troubleshooting).

### **Step 4: Test in Store**

1. Click **"Robot Factory"** button
2. Your robot should appear in the grid
3. Click to view details
4. Check that description appears
5. Verify price is correct

### **Step 5: Test Purchase**

1. Earn enough currency (or use debug to add currency)
2. Purchase your robot
3. Check that currency is deducted
4. Verify robot added to owned robots

### **Step 6: Test Selection**

1. Go to **"Robot Select"** screen
2. Your robot should appear
3. Select your robot
4. Check that dialogue appears

### **Step 7: Test Dialogue**

1. With robot selected, complete a task
2. Check that `success` dialogue appears
3. Let robot sit idle
4. Check that `random` dialogue appears

### **Step 8: Test Battle (if applicable)**

1. Go to **"Battle"** mode
2. Click team selection
3. Your robot should appear (if purchased and has battle data)
4. Add to team
5. Start battle
6. Test attacks and wheel spins

---

## 🐛 Troubleshooting

### **Problem: Robot Not Selectable in Battle Mode** ⚠️ **COMMON ISSUE!**

**This is the #1 issue when adding battle robots!**

**Symptom:** Robot appears in store, can be purchased, works in chores, but is NOT in battle selection.

**Fix:**

**Check 1:** Is `hasBattleData: true` in registry?
- Open `robots/unified-registry.json`
- Find your robot entry
- **MUST have:** `"hasBattleData": true`

**Check 2:** Is battle data file path correct?
- Check `dataFiles` section in registry
- **MUST have:** `"battle": "robots/your-robot/battle-data.json"`
- Verify the path matches your actual file location

**Check 3:** Does battle-data.json exist?
- Navigate to `robots/your-robot/`
- Confirm `battle-data.json` exists
- Open it to verify it's valid JSON

**Check 4:** Is robot in `robots/registry.json`? ⚠️ **MOST COMMON ISSUE!**
- Open `robots/registry.json`
- Scroll to bottom
- **MUST have entry** with your robot's folder name as `id`
- If missing → Add full registry entry (see Step 9 Part A)
- Check `number` field is sequential (155, 156, etc.)

**Check 5:** Is robot in battle whitelist?
- Open `js/robot-loader.js`
- Find `allowedRobots` array (line ~80)
- **MUST contain:** your robot's folder name (e.g., `'ghost-bot'`)
- If missing → Add it to the array
- Use folder name (kebab-case), NOT registry ID (UPPERCASE)

**Check 6:** Check browser console (F12)
- Look for: `"✅ Loaded battle data: Your Robot (your-robot)"`
- Look for: `"✅ Loaded robot: Your Robot (#155) 🔒"`
- Look for: `"🔒 Filtered robots: 153 → X allowed"` - X should include your robot
- If you see: `"⚠️ Failed to load battle data for YOURROBOTID"` → file path is wrong
- If you don't see any battle loading message → `hasBattleData` is false or missing
- If robot not in "Loaded robot" list → missing from registry.json

**Check 7:** Restart server and hard refresh
- Close browser completely
- Restart `START-SERVER.bat`
- Open browser, press Ctrl+Shift+R (hard refresh)

**✅ Correct Registry Entry for Battle Robot:**
```json
{
  "id": "GHOSTBOT",
  "folder": "ghost-bot",
  "name": "Ghost Bot",
  "purchasable": true,
  "cost": 160,
  "enabled": true,
  "hasBattleData": true,          // ← MUST be true!
  "hasChoreData": true,
  "dataFiles": {
    "robot": "robots/ghost-bot/robot.json",
    "chore": "robots/ghost-bot/chore-data.json",
    "dialogue": "robots/ghost-bot/dialogue.json",
    "store": "robots/ghost-bot/store-data.json",
    "battle": "robots/ghost-bot/battle-data.json"  // ← MUST be present!
  }
}
```

---

### **Problem: Robot Not Appearing in Store**

**Check 1:** Is robot in `unified-registry.json`?
- Open `robots/unified-registry.json`
- Search for your robot's ID
- Verify all fields are correct

**Check 2:** Is `purchasable: true`?
- In `unified-registry.json`
- AND in `chore-data.json`

**Check 3:** Is `enabled: true`?
- Must be `true` in `unified-registry.json`

**Check 4:** Check browser console
- Press F12, look for errors
- Common error: "Failed to load JSON"
- Fix: Verify file paths are correct

**Check 5:** Clear browser cache
- Press Ctrl+Shift+R (hard refresh)
- Or: Ctrl+Shift+Delete to clear all cache

---

### **Problem: Robot Purchased But Not in Robot Select**

**Check:** Verify `hasChoreData: true` in registry
- Open `unified-registry.json`
- Find your robot
- Ensure `hasChoreData: true`

---

### **Problem: Dialogue Not Working**

**Check 1:** Does `dialogue.json` exist?
- Path: `robots/your-robot-name/dialogue.json`

**Check 2:** Is `hasCustomDialogue: true`?
- MUST be at top of `dialogue.json`

**Check 3:** Are all categories present?
- greeting, success, achievement, broken, random, mad
- Each needs at least 4-5 messages

**Check 4:** Valid JSON?
- Use VS Code JSON validator
- Check for missing commas, quotes

---

### **Problem: Images Not Loading**

**Check 1:** File paths correct?
- `imagePaths` in `chore-data.json`
- Must match actual file locations

**Check 2:** Files are PNG format?
- Not JPG or other formats
- PNG with transparency preferred

**Check 3:** Filenames match exactly?
- Case-sensitive: `Happy.png` ≠ `happy.png`
- Check for typos

**Check 4:** Files in `images/` subfolder?
- Must be: `robots/your-robot-name/images/happy.png`
- Not: `robots/your-robot-name/happy.png`

---

### **Problem: Battle Data Not Loading**

**Check 1:** Is `hasBattleData: true` in registry?
- In `unified-registry.json`

**Check 2:** Does `battle-data.json` exist?
- Path: `robots/your-robot-name/battle-data.json`

**Check 3:** Is battle data registered?
- Add "battle" path to `dataFiles` in unified-registry.json

**Check 4:** Wheel sizes sum to 96?
- All attack sizes must total exactly 96
- Use calculator to verify

---

### **Problem: JSON Parse Errors**

**Common Mistakes:**

1. **Missing comma:**
```json
{
  "id": "TEST"
  "name": "Test"  ← Missing comma after previous line!
}
```

2. **Trailing comma:**
```json
{
  "id": "TEST",
  "name": "Test",  ← Remove this comma!
}
```

3. **Single quotes instead of double:**
```json
{
  'id': 'TEST'  ← Must use double quotes "
}
```

4. **Comments (not allowed in JSON):**
```json
{
  "id": "TEST"  // This comment breaks JSON!
}
```

**Fix:** Use VS Code JSON validator or online JSON validator.

---

### **Problem: Garbled Text (Encoding Issues)**

**Symptom:** Robot names show as `☆●0彁` or weird symbols

**Cause:** File saved with wrong encoding

**Fix:**
1. In VS Code: Click encoding in bottom bar
2. Select "UTF-8"
3. Save file
4. Clear browser cache (Ctrl+Shift+R)

---

## 📚 Complete Example

### **Example: "Solar Bot" - Sun-themed energy robot**

#### **1. Create Folder**
```
robots/solar-bot/
```

#### **2. `robot.json`**
```json
{
  "id": "SOLARBOT",
  "name": "Solar Bot",
  "version": "1.0.0",
  "type": "custom",
  "created": "2025-10-18"
}
```

#### **3. `chore-data.json`**
```json
{
  "id": "SOLARBOT",
  "purchasable": true,
  "cost": 175,
  "unlockRequirements": [],
  "description": "A solar-powered robot that harnesses the energy of the sun! Perfect for brightening up your chores!",
  "imagePaths": {
    "happy": "robots/solar-bot/images/happy.png",
    "sad": "robots/solar-bot/images/sad.png",
    "thinking": "robots/solar-bot/images/thinking.png",
    "shadow": "robots/solar-bot/images/shadow.png"
  },
  "legacyImagePaths": {
    "happy": "Imag/Achivments/Images/Solar-Bot/Happy.png",
    "sad": "Imag/Achivments/Images/Solar-Bot/Sad.png",
    "thinking": "Imag/Achivments/Images/Solar-Bot/Thinking.png",
    "shadow": "Imag/Achivments/Images/Solar-Bot/Shadow.png"
  }
}
```

#### **4. `dialogue.json`**
```json
{
  "hasCustomDialogue": true,
  "greeting": [
    "Hello! The sun is shining and so am I!",
    "Solar power activated! Let's get started!",
    "Good day! My batteries are fully charged!",
    "Greetings! Ready to brighten your day!",
    "Welcome! Let's make today shine!"
  ],
  "success": [
    "Task completed! My solar panels are glowing with pride!",
    "Another success! The sun smiles upon us!",
    "Excellent work! You're radiating productivity!",
    "Well done! That was positively illuminating!",
    "Great job! You're shining bright today!"
  ],
  "achievement": [
    "Achievement unlocked! You're beaming with success!",
    "Reward earned! The sun rewards hard work!",
    "Nice! That's a bright accomplishment!",
    "Wonderful! Your efforts are truly radiant!"
  ],
  "broken": [
    "My solar panels are damaged... I need repairs!",
    "Running on low power... help!",
    "Systems offline... maintenance required!",
    "Can't shine without repairs... please fix me!"
  ],
  "random": [
    "Did you know solar energy is renewable?",
    "The sun provides enough energy in one hour to power Earth for a year!",
    "I love sunny days - they're energizing!",
    "My favorite color? Definitely yellow!",
    "Fun fact: I can generate 100 watts of power!"
  ],
  "mad": [
    "This mess is blocking my solar panels! Clean it NOW!",
    "I can't shine in this chaos! Fix it immediately!",
    "This darkness is unacceptable! Let there be light!",
    "My circuits are overheating from this stress! Help!",
    "This situation is eclipsing my patience!"
  ]
}
```

#### **5. `store-data.json`**
```json
{
  "featured": true,
  "tags": ["solar", "energy", "bright", "electric", "premium"],
  "category": "premium",
  "releaseDate": "2025-10-18"
}
```

#### **6. Add Images**
Create `robots/solar-bot/images/` folder with:
- `happy.png` - Smiling robot with sun rays
- `sad.png` - Dimmed, cloudy robot
- `thinking.png` - Robot with thought bubble
- `shadow.png` - Black silhouette

#### **7. `unified-registry.json` Entry**
```json
{
  "id": "SOLARBOT",
  "folder": "solar-bot",
  "name": "Solar Bot",
  "purchasable": true,
  "cost": 175,
  "enabled": true,
  "hasBattleData": false,
  "hasChoreData": true,
  "dataFiles": {
    "robot": "robots/solar-bot/robot.json",
    "chore": "robots/solar-bot/chore-data.json",
    "dialogue": "robots/solar-bot/dialogue.json",
    "store": "robots/solar-bot/store-data.json"
  }
}
```

**Done!** Solar Bot is now in the game! 🌞

---

## ✅ Final Checklist

Before you're done, verify:

### **Files Created (Minimum 5):**
- [ ] `robot.json` exists
- [ ] `chore-data.json` exists
- [ ] `dialogue.json` exists with `hasCustomDialogue: true`
- [ ] `store-data.json` exists
- [ ] `images/happy.png` exists
- [ ] `images/sad.png` exists
- [ ] `images/thinking.png` exists
- [ ] `images/shadow.png` exists
- [ ] `battle-data.json` exists (if battle-enabled)

### **Registry:**
- [ ] Added entry to `robots/unified-registry.json`
- [ ] ID matches across all files (UPPERCASE)
- [ ] Folder name matches (kebab-case)
- [ ] `purchasable: true` set
- [ ] `enabled: true` set
- [ ] ⚠️ **`hasBattleData: true`** if robot has battle-data.json (CRITICAL!)
- [ ] ⚠️ **`"battle": "robots/your-robot/battle-data.json"`** in dataFiles (CRITICAL!)
- [ ] `hasChoreData: true` set
- [ ] All `dataFiles` paths correct

### **Quality Checks:**
- [ ] All JSON files are valid (no syntax errors)
- [ ] Image paths match actual file locations
- [ ] Dialogue has 5+ messages per category
- [ ] `hasCustomDialogue: true` in dialogue.json
- [ ] Price is reasonable (50-250 bolts)
- [ ] Description is compelling

### **Battle Customization (if battle-enabled):**
- [ ] ⚠️ **CRITICAL:** NO "Pokémon" word anywhere in battle data!
- [ ] ⚠️ **CRITICAL:** All "Pokémon" changed to "robot", "robots", or "opponent"
- [ ] ⚠️ **CRITICAL:** NO Pokémon attack names (Thunder, Solar Beam, etc.)
- [ ] ⚠️ **CRITICAL:** Added entry to `robots/registry.json` (Step 9 Part A)
- [ ] ⚠️ **CRITICAL:** Added folder name to whitelist in `js/robot-loader.js` (Step 9 Part B)
- [ ] All attack names customized to robot's theme
- [ ] All attack descriptions customized to robot's theme
- [ ] Ability name customized to robot's theme
- [ ] Ability description customized to robot's theme
- [ ] Movement effects say "robot" not "Pokémon" (e.g., "Move this robot 2 spaces")
- [ ] Multi-target effects say "robots" not "Pokémon" (e.g., "Adjacent robots gain Wait")
- [ ] Damage values unchanged from source
- [ ] Size values unchanged from source
- [ ] Stars values unchanged from source
- [ ] Move types unchanged from source
- [ ] Wheel total = 96
- [ ] Attack names are creative and unique
- [ ] Descriptions match personality consistently

### **Testing:**
- [ ] Server running (`START-SERVER.bat`)
- [ ] Console shows no errors
- [ ] Robot appears in Robot Factory
- [ ] Can purchase robot
- [ ] Robot appears in Robot Select after purchase
- [ ] Dialogue works correctly
- [ ] Images load properly
- [ ] Battle works (if applicable)

---

## 🎉 You're Done!

Your robot is now fully integrated into Up-Keep!

### **What the System Does Automatically:**

- ✅ Loads all JSON data on app start
- ✅ Registers robot in store
- ✅ Handles purchase transactions
- ✅ Loads custom dialogue
- ✅ Enables in chore system
- ✅ **Loads battle data automatically** (if `hasBattleData: true`)
- ✅ **Makes robot selectable in battle mode** (automatically!)
- ✅ Manages image loading with fallbacks

### **⚠️ CRITICAL: Battle Data Loading is AUTOMATIC!**

**When you add a robot with battle data:**

1. Set `hasBattleData: true` in `unified-registry.json` ✓
2. Include `"battle": "robots/your-robot/battle-data.json"` in dataFiles ✓
3. **That's it!** The system automatically:
   - Loads the battle-data.json file on game start
   - Converts it to the battle system format
   - Adds the robot to `RobotDatabase`
   - Makes it selectable in battle mode

**NO manual JavaScript editing required!**

### **No More Manual JavaScript Editing!**

The old system required editing:
- ❌ `js/chore-system.js` (hardcoded robots array)
- ❌ `js/robot-database.js` (hardcoded battle data) ← **NOW AUTOMATIC!**
- ❌ Multiple store arrays

The new system automatically loads everything from your component folder! 🚀

---

## 📚 Additional Resources

- **Master Guide:** `docs/how-tos/PROJECT-MASTER-GUIDE.md`
- **Dialogue System:** `robots/DIALOGUE-SYSTEM-README.md`
- **Robot Architecture:** `robots/README.md`
- **Template:** `robots/_template/INSTRUCTIONS.md`
- **Battle Units:** `robots/Battle-data/` (150 Pokémon to choose from)

---

## 📋 Quick Reference: Battle Attack Customization

**For adding all 150 robots efficiently:**

### **⚠️ MOST IMPORTANT RULES:**

1. **NO POKÉMON WORDS!** - This is a ROBOT game - every "Pokémon" reference MUST be changed!
2. **ADD TO REGISTRY.JSON!** - Every battle robot must be in `robots/registry.json`!
3. **ADD TO WHITELIST!** - Every battle robot must be in `js/robot-loader.js` allowedRobots array!

### **5-Step Process:**

1. **Copy** source Pokémon's battle JSON from `robots/Battle-data/Unit-XXX/`
2. **Rename** all `moveName` values to match your robot's theme
3. **Rewrite** all `effect` descriptions to match your robot's personality
4. **⚠️ Add** robot entry to `robots/registry.json` (Step 9 Part A)
5. **⚠️ Add** robot's folder name to `js/robot-loader.js` whitelist (Step 9 Part B)

### **Keep Unchanged:**
- `moveType`, `size`, `damage`, `stars`
- Wheel structure and total (must = 96)

### **Must Customize:**
- `moveName` - Attack names (NO Pokémon names!)
- `effect` - Attack descriptions (NO "Pokémon" word!)
- `ability.name` - Ability name
- `ability.description` - Ability description (NO "Pokémon" word!)

### **⚠️ Must Remove/Replace:**
- ❌ "Pokémon" → ✅ "robot", "robots", or "opponent"
- ❌ "opposing Pokémon" → ✅ "battle opponent" or "opposing robot"
- ❌ "Move this Pokémon" → ✅ "Move this robot"
- ❌ "Adjacent Pokémon" → ✅ "Adjacent robots"
- ❌ Original Pokémon attack names → ✅ Create themed names

### **Example Transformations:**

**Attack Name:**  
**Before:** `"moveName": "Thunder Shock"`  
**After:** `"moveName": "Digital Surge"` (for tech robot)

**Status Effect:**  
**Before:** `"effect": "The opposing Pokémon becomes paralyzed"`  
**After:** `"effect": "Virus injection freezes opponent's circuits"` (for tech robot)

**Movement Effect:**  
**Before:** `"effect": "Move this Pokémon 2 spaces"`  
**After:** `"effect": "Move this robot 2 spaces to strategic position"`

**Multi-Target:**  
**Before:** `"effect": "Adjacent Pokémon gain Wait 3"`  
**After:** `"effect": "Adjacent robots gain Wait 3 and become stunned"`

---

## 💡 Tips & Best Practices

1. **⚠️ NEVER use "Pokémon" in battle data** - This is THE #1 rule! Always say "robot" or "opponent"
2. **Start with existing robots as templates** - Copy and modify (easier than from scratch)
3. **Test frequently** - Don't create everything before testing (catch errors early)
4. **Use VS Code** - Built-in JSON validation helps catch errors
5. **Keep dialogue fun and themed** - Match your robot's personality
6. **Price fairly** - 100-200 bolts is typical for custom robots
7. **Name consistently** - UPPERCASE IDs, kebab-case folders
8. **Validate JSON** - Use online validators if unsure
9. **Clear cache** - When testing, always hard refresh (Ctrl+Shift+R)
10. **⭐ For battle robots:** Spend time on creative attack names - they define the robot's identity!
11. **Batch similar themes** - Add all tech robots together, all space robots together, etc.
12. **Find-and-replace "Pokémon"** - Use search function to catch all instances

---

**Need Help?** Check existing robot folders in `robots/` for complete examples!

**Good luck creating your robot!** 🤖✨
