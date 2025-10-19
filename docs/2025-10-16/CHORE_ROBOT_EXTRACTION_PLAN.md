# 🤖 CHORE ROBOT COMPONENT EXTRACTION PLAN

**Date:** October 16, 2025, 11:10 PM  
**Goal:** Extract 5 chore robots into component-based architecture  
**Status:** 📋 **PLANNING**

---

## 🎯 OBJECTIVE

Transform chore robots from embedded data in `chore-system.js` into scalable, component-based structure where each robot has its own folder with all assets and data.

---

## 📊 CURRENT STATE ANALYSIS

### **Robots to Extract:**

1. **Default Bot** (id: 'default')
2. **Jack-o'-Bot** (id: 'JACKOBOT')
3. **Mega Rocket Man** (id: 'MEGAROCKETMAN')
4. **Pika-Bot** (id: 'PIKABOT')
5. **Buzz Lite-Point-0** (id: 'BUZZBOT')

### **Current Data Locations:**

**In `chore-system.js`:**

1. **storeRobots** array (lines 37-66)
   ```javascript
   {
       id: 'JACKOBOT',
       cost: 100,
       shadowImagePath: 'path/to/shadow.png',
       actualImagePath: 'path/to/robot.png',
       name: 'Jack-o\'-Bot'
   }
   ```

2. **robots** array (lines 215-436+)
   ```javascript
   {
       id: 'JACKOBOT',
       name: 'Jack-o\'-Bot',
       happyImage: 'path/to/happy.png',
       sadImage: 'path/to/sad.png',
       thinkingImage: 'path/to/thinking.png',
       hasCustomDialogue: true,
       dialogue: {
           greeting: [...],
           success: [...],
           achievement: [...],
           broken: [...],
           random: [...],
           mad: [...]
       }
   }
   ```

3. **scrappyDialogue** object (lines 68-207)
   - Shopkeeper dialogue (will be extracted separately)

### **Current Assets:**
```
Imag/Achivments/Images/
├── Jack-0-Bot/
│   ├── Jack-0-Bot.png (happy)
│   ├── Jack-0-Bot-mad.png (sad)
│   ├── Jack-0-Bot-low.png (thinking)
│   └── Jack-0-bot-shadow.png
├── MegaRocketMan/
│   ├── Mega.png (happy)
│   ├── Mega-mad (1).png (sad)
│   ├── Mega-low.png (thinking)
│   └── Mega-Shadow.png
├── Pike-achu/
│   ├── PikaBot.png (happy)
│   ├── PikaBot-mad.png (sad)
│   ├── PikaBot-low.png (thinking)
│   └── PikaBot-shadow.png
└── Buzz-lite-point-0/
    ├── Buzz.png (happy)
    ├── Buzz-mad.png (sad)
    ├── Buzz-low.png (thinking)
    └── Buzz-shadow.png
```

---

## 🎯 PROPOSED ARCHITECTURE

### **New Structure:**

```
chore-robots/
├── registry.json                 ← Master list of all chore robots
├── scrappy-dialogue.json         ← Shopkeeper dialogue (separate)
├── default-bot/
│   ├── data.json                 ← All robot data
│   ├── happy.png                 ← Mood images
│   ├── sad.png
│   ├── thinking.png
│   └── shadow.png                ← Store display
├── jack-o-bot/
│   ├── data.json
│   ├── happy.png
│   ├── sad.png
│   ├── thinking.png
│   └── shadow.png
├── mega-rocket-man/
│   ├── data.json
│   ├── happy.png
│   ├── sad.png
│   ├── thinking.png
│   └── shadow.png
├── pika-bot/
│   ├── data.json
│   ├── happy.png
│   ├── sad.png
│   ├── thinking.png
│   └── shadow.png
├── buzz-lite-point-0/
│   ├── data.json
│   ├── happy.png
│   ├── sad.png
│   ├── thinking.png
│   └── shadow.png
├── _template/                    ← Template for new robots
│   ├── data.json
│   └── INSTRUCTIONS.md
└── _docs/
    └── IMPLEMENTATION.md
```

---

## 📋 DATA STRUCTURE

### **chore-robots/registry.json:**

```json
[
  {
    "id": "default",
    "folder": "default-bot",
    "name": "Default Bot",
    "purchasable": false,
    "enabled": true
  },
  {
    "id": "JACKOBOT",
    "folder": "jack-o-bot",
    "name": "Jack-o'-Bot",
    "cost": 100,
    "purchasable": true,
    "enabled": true
  },
  {
    "id": "MEGAROCKETMAN",
    "folder": "mega-rocket-man",
    "name": "Mega Rocket Man",
    "cost": 150,
    "purchasable": true,
    "enabled": true
  },
  {
    "id": "PIKABOT",
    "folder": "pika-bot",
    "name": "Pika-Bot",
    "cost": 120,
    "purchasable": true,
    "enabled": true
  },
  {
    "id": "BUZZBOT",
    "folder": "buzz-lite-point-0",
    "name": "Buzz Lite-Point-0",
    "cost": 180,
    "purchasable": true,
    "enabled": true
  }
]
```

### **chore-robots/{robot-folder}/data.json:**

```json
{
  "id": "JACKOBOT",
  "name": "Jack-o'-Bot",
  "cost": 100,
  "purchasable": true,
  
  "assets": {
    "happy": "happy.png",
    "sad": "sad.png",
    "thinking": "thinking.png",
    "shadow": "shadow.png"
  },
  
  "hasCustomDialogue": true,
  "dialogue": {
    "greeting": [
      "The season of the witch is upon us! Ready to brew up some cleanliness?",
      "My pumpkin spice circuits are fully engaged! Let's illuminate this chore list!"
    ],
    "success": [
      "Chore complete! We put the boo in bootifully clean!",
      "Mission accomplished! That mess is officially a goner!"
    ],
    "achievement": [
      "A chillingly cool achievement! My internal light is burning brighter!"
    ],
    "broken": [
      "Oh, woe is me! My pumpkin guts are spilling out... systems are degrading..."
    ],
    "random": [
      "Did you know the best way to clean is to use a little 'Hocus Pocus'?"
    ],
    "mad": [
      "By the sacred stem! This ghastly mess is simply un-boo-lievable!"
    ]
  }
}
```

### **chore-robots/scrappy-dialogue.json:**

```json
{
  "greeting": [...],
  "idle": [...],
  "purchased": [...],
  "canceled": [...],
  "goodbye": [...]
}
```

---

## 🔧 CHORE ROBOT LOADER SYSTEM

### **New File: `js/chore-robot-loader.js`**

```javascript
const ChoreRobotLoader = {
    // Registry of all chore robots
    robotRegistry: [],
    
    // Shopkeeper dialogue
    scrappyDialogue: null,
    
    // Loaded robot data cache
    loadedRobots: {},
    
    // Paths
    registryPath: 'chore-robots/registry.json',
    scrappyDialoguePath: 'chore-robots/scrappy-dialogue.json',
    robotBasePath: 'chore-robots/',
    
    // Initialize loader
    async initialize() {
        console.log('📦 Initializing Chore Robot Loader...');
        
        try {
            // Load registry and scrappy dialogue in parallel
            const [registry, dialogue] = await Promise.all([
                this.loadRegistry(),
                this.loadScrappyDialogue()
            ]);
            
            this.robotRegistry = registry || [];
            this.scrappyDialogue = dialogue;
            
            console.log(`✅ Chore Robot Loader initialized: ${this.robotRegistry.length} robots available`);
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize ChoreRobotLoader:', error);
            return false;
        }
    },
    
    // Load robot registry
    async loadRegistry() {
        const response = await fetch(this.registryPath);
        return await response.json();
    },
    
    // Load scrappy dialogue
    async loadScrappyDialogue() {
        const response = await fetch(this.scrappyDialoguePath);
        return await response.json();
    },
    
    // Load individual robot
    async loadRobot(robotId) {
        // Check cache
        if (this.loadedRobots[robotId]) {
            return this.loadedRobots[robotId];
        }
        
        // Find in registry
        const robotInfo = this.robotRegistry.find(r => r.id === robotId);
        if (!robotInfo) return null;
        
        // Load robot data
        const dataPath = `${this.robotBasePath}${robotInfo.folder}/data.json`;
        const response = await fetch(dataPath);
        const robotData = await response.json();
        
        // Build full paths for assets
        const basePath = `${this.robotBasePath}${robotInfo.folder}`;
        robotData.happyImage = `${basePath}/${robotData.assets.happy}`;
        robotData.sadImage = `${basePath}/${robotData.assets.sad}`;
        robotData.thinkingImage = `${basePath}/${robotData.assets.thinking}`;
        robotData.shadowImagePath = `${basePath}/${robotData.assets.shadow}`;
        robotData.actualImagePath = robotData.happyImage;
        
        // Cache and return
        this.loadedRobots[robotId] = robotData;
        return robotData;
    },
    
    // Load all robots
    async loadAllRobots() {
        const promises = this.robotRegistry.map(r => this.loadRobot(r.id));
        return await Promise.all(promises);
    },
    
    // Get purchasable robots
    getPurchasableRobots() {
        return this.robotRegistry.filter(r => r.purchasable);
    }
};
```

---

## 🔄 INTEGRATION WITH CHORE-SYSTEM.JS

### **Modified `app.init()` method:**

```javascript
async init() {
    console.log('📦 Loading app data...');
    
    // Try ChoreRobotLoader first
    if (typeof ChoreRobotLoader !== 'undefined') {
        try {
            const initialized = await ChoreRobotLoader.initialize();
            
            if (initialized) {
                // Load all robots
                const robots = await ChoreRobotLoader.loadAllRobots();
                this.robots = robots.filter(r => r !== null);
                
                // Build storeRobots array
                this.storeRobots = ChoreRobotLoader.getPurchasableRobots().map(r => ({
                    id: r.id,
                    cost: r.cost,
                    shadowImagePath: `chore-robots/${r.folder}/${r.assets.shadow}`,
                    actualImagePath: `chore-robots/${r.folder}/${r.assets.happy}`,
                    name: r.name
                }));
                
                // Load scrappy dialogue
                if (ChoreRobotLoader.scrappyDialogue) {
                    this.scrappyDialogue = ChoreRobotLoader.scrappyDialogue;
                }
                
                console.log(`✅ Loaded ${this.robots.length} chore robots via ChoreRobotLoader`);
                return; // Success!
            }
        } catch (error) {
            console.warn('⚠️ ChoreRobotLoader failed:', error);
        }
    }
    
    // Fallback to store-robots.json and scrappy-dialogue.json
    // ... existing code ...
}
```

---

## 📁 MIGRATION STEPS

### **Phase 1: Create Infrastructure** ✅
1. Create `chore-robots/` directory
2. Create registry.json
3. Create scrappy-dialogue.json
4. Create robot folders
5. Create _template/

### **Phase 2: Extract Robot Data** ✅
1. Create data.json for each robot
2. Copy/symlink images to robot folders
3. Verify all data is complete

### **Phase 3: Create Loader System** ✅
1. Create chore-robot-loader.js
2. Implement all methods
3. Add error handling

### **Phase 4: Integrate with Chore System** ✅
1. Add chore-robot-loader.js to HTML
2. Modify chore-system.js init method
3. Add fallback to existing JSON files

### **Phase 5: Test & Verify** ✅
1. Test robot selection
2. Test store purchases
3. Test dialogue system
4. Test all mood changes

---

## 🔒 SAFETY MEASURES

### **Triple Fallback System:**

```
Level 1: ChoreRobotLoader (component-based)
    ↓ (if fails)
Level 2: store-robots.json + scrappy-dialogue.json
    ↓ (if fails)
Level 3: Hardcoded data in chore-system.js
```

### **Backups:**
- Keep existing data in chore-system.js
- Keep store-robots.json and scrappy-dialogue.json
- All changes reversible

---

## 🎯 BENEFITS

1. ✅ **Scalability** - Easy to add more robots
2. ✅ **Organization** - Each robot self-contained
3. ✅ **Maintainability** - Edit one robot without touching others
4. ✅ **File Size** - chore-system.js becomes much smaller
5. ✅ **Asset Management** - Images co-located with data
6. ✅ **Future-Proof** - Ready for 20+ chore robots

---

## 📊 ESTIMATED TIME

- Phase 1 (Infrastructure): 15 minutes
- Phase 2 (Extract Data): 30 minutes
- Phase 3 (Loader System): 30 minutes
- Phase 4 (Integration): 20 minutes
- Phase 5 (Testing): 15 minutes

**Total: ~110 minutes (2 hours)**

---

**Ready to proceed with implementation!**
