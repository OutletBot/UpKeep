# 🤖 COMPONENT-BASED ROBOT ARCHITECTURE PLAN

**Date:** October 16, 2025, 10:05 PM  
**Goal:** Scale from 12 to 150+ robots with professional component-based architecture  
**Status:** 📋 **PLANNING PHASE**

---

## 🎯 **OBJECTIVE**

Transform the robot system from a monolithic JSON file into a scalable, component-based architecture where:
1. Each robot is a self-contained component
2. Adding new robots is simple and standardized
3. Assets and data are co-located for easy management
4. The system can handle 150+ robots efficiently

---

## 📊 **CURRENT STATE ANALYSIS**

### **✅ GREAT NEWS: Assets Already Organized!**

You already have **151+ robot asset folders** in `Imag/Battle/Battle-data/`:
```
Imag/Battle/Battle-data/
├── Unit-001_UC_0/  (3 files)
├── Unit-002_C_0/   (3 files)
├── Unit-003_EX_0/  (3 files)
├── ... (148+ more)
└── Unit-151_EX_0/  (3 files)
```

### **❌ PROBLEM: Data Not Scalable**

Current: **12 robots** in single `data/battle-robots.json` (595 lines)
- Hard to maintain
- Hard to add new robots
- All robots load at once (even unused ones)
- No clear template for new robots

---

## 🎯 **PROPOSED ARCHITECTURE**

### **Component-Based Structure:**

```
robots/
├── unit-001-bulbasaur/
│   ├── data.json              ← Robot stats, wheel, ability
│   ├── sprite.png             ← Main battle sprite
│   ├── icon.png               ← (optional) UI icon
│   └── README.md              ← (optional) Robot info
├── unit-002-ivysaur/
│   ├── data.json
│   ├── sprite.png
│   └── ...
├── unit-025-pikachu/
│   ├── data.json
│   ├── sprite.png
│   └── ...
├── ... (144 more robots)
└── _template/                  ← Template for new robots
    ├── data.json
    ├── README.md
    └── INSTRUCTIONS.md
```

---

## 📋 **DATA STRUCTURE (data.json per robot)**

### **Example: `robots/unit-001-bulbasaur/data.json`**

```json
{
  "id": "unit-001-uc-0",
  "name": "Bulbasaur",
  "number": 1,
  "rarity": "UC",
  "mp": 3,
  "role": "Scout",
  "type": "Grass / Poison",
  "description": "UC rarity unit with 3 movement points. A Grass/Poison type with powder-based attacks.",
  
  "assets": {
    "sprite": "sprite.png",
    "icon": "icon.png"
  },
  
  "ability": {
    "name": "Powder Mastery",
    "description": "Can inflict poison and sleep status conditions."
  },
  
  "wheel": [
    {
      "moveName": "Poison Powder",
      "moveType": "Purple",
      "size": 24,
      "stars": 1,
      "effect": "The battle opponent becomes poisoned"
    },
    {
      "moveName": "Seed Bomb",
      "moveType": "White",
      "size": 20,
      "damage": 50,
      "effect": "None"
    }
  ],
  
  "statusWheels": {
    "poisoned": [ /* wheel variation */ ]
  },
  
  "stats": {
    "hp": 88,
    "attack": 77,
    "defense": 66,
    "speed": 83
  }
}
```

---

## 🔧 **LOADER SYSTEM**

### **New File: `js/robot-loader.js`**

```javascript
const RobotLoader = {
    // Registry of all available robots
    robotRegistry: [],
    
    // Loaded robot data cache
    loadedRobots: {},
    
    // Base path for robot components
    basePath: 'robots/',
    
    // Initialize: Load robot registry
    async initialize() {
        console.log('📦 Initializing Robot Loader...');
        
        // Load registry file (list of all robots)
        const registry = await this.loadRegistry();
        this.robotRegistry = registry;
        
        console.log(`✅ Robot registry loaded: ${registry.length} robots available`);
    },
    
    // Load robot registry (manifest)
    async loadRegistry() {
        try {
            const response = await fetch('robots/registry.json');
            const registry = await response.json();
            return registry;
        } catch (error) {
            console.error('❌ Failed to load robot registry:', error);
            return [];
        }
    },
    
    // Load specific robot data
    async loadRobot(robotId) {
        // Check cache first
        if (this.loadedRobots[robotId]) {
            return this.loadedRobots[robotId];
        }
        
        // Find robot in registry
        const robotInfo = this.robotRegistry.find(r => r.id === robotId);
        if (!robotInfo) {
            console.warn(`⚠️ Robot ${robotId} not found in registry`);
            return null;
        }
        
        // Load robot data
        try {
            const response = await fetch(`${this.basePath}${robotInfo.folder}/data.json`);
            const robotData = await response.json();
            
            // Resolve asset paths
            robotData.image = `${this.basePath}${robotInfo.folder}/${robotData.assets.sprite}`;
            
            // Cache the robot
            this.loadedRobots[robotId] = robotData;
            
            console.log(`✅ Loaded robot: ${robotData.name}`);
            return robotData;
            
        } catch (error) {
            console.error(`❌ Failed to load robot ${robotId}:`, error);
            return null;
        }
    },
    
    // Load multiple robots
    async loadRobots(robotIds) {
        const promises = robotIds.map(id => this.loadRobot(id));
        return await Promise.all(promises);
    },
    
    // Load all robots (for testing/admin)
    async loadAllRobots() {
        const robotIds = this.robotRegistry.map(r => r.id);
        return await this.loadRobots(robotIds);
    },
    
    // Get available robots by criteria
    getAvailableRobots(filter = {}) {
        let robots = this.robotRegistry;
        
        if (filter.rarity) {
            robots = robots.filter(r => r.rarity === filter.rarity);
        }
        
        if (filter.type) {
            robots = robots.filter(r => r.type === filter.type);
        }
        
        return robots;
    }
};
```

---

## 📝 **ROBOT REGISTRY (robots/registry.json)**

```json
[
  {
    "id": "unit-001-uc-0",
    "folder": "unit-001-bulbasaur",
    "name": "Bulbasaur",
    "number": 1,
    "rarity": "UC",
    "type": "Grass / Poison",
    "enabled": true
  },
  {
    "id": "unit-002-c-0",
    "folder": "unit-002-ivysaur",
    "name": "Ivysaur",
    "number": 2,
    "rarity": "C",
    "type": "Grass / Poison",
    "enabled": true
  },
  // ... 148 more robots
]
```

**Purpose:**
- Quick lookup of all robots
- Filter without loading full data
- Enable/disable robots easily
- Version control

---

## 🔄 **MIGRATION STRATEGY**

### **Phase 1: Create Infrastructure (LOW RISK)**
1. Create `robots/` directory
2. Create `js/robot-loader.js`
3. Create `robots/registry.json`
4. Create `robots/_template/`
5. No changes to existing code

### **Phase 2: Migrate 12 Existing Robots (MEDIUM RISK)**
1. Create component folders for 12 current robots
2. Split `battle-robots.json` into 12 `data.json` files
3. Move images to component folders (or use symlinks)
4. Update registry.json
5. Keep old system as fallback

### **Phase 3: Update Loader System (MEDIUM RISK)**
1. Modify `RobotDatabase.loadExternalRobots()` to use `RobotLoader`
2. Test with 12 robots
3. Keep fallback to monolithic JSON

### **Phase 4: Add Remaining 138+ Robots (LOW RISK)**
1. Use template to create new robot components
2. Add to registry.json
3. Test incrementally (10-20 at a time)

### **Phase 5: Cleanup (LOW RISK)**
1. Remove `data/battle-robots.json`
2. Remove fallback code
3. Document new system

---

## 📐 **FOLDER NAMING CONVENTION**

### **Pattern:** `unit-{number}-{name}`

Examples:
- `unit-001-bulbasaur`
- `unit-025-pikachu`
- `unit-150-mewtwo`

**Benefits:**
- Sortable by number
- Human-readable
- Unique identifiers
- URL-safe

---

## 🎨 **ASSET ORGANIZATION**

### **Current Assets:**
```
Imag/Battle/Battle-data/Unit-001_UC_0/
├── Unit-001_sprite.png
├── Unit-001_shadow.png
└── (1 more file)
```

### **Option A: Keep Current Structure**
- Pros: No file moving needed
- Cons: Assets separate from data

### **Option B: Move to Component Folders** (RECOMMENDED)
```
robots/unit-001-bulbasaur/
├── data.json
├── sprite.png           ← From Unit-001_sprite.png
├── shadow.png           ← From Unit-001_shadow.png
└── icon.png
```

### **Option C: Symlinks** (HYBRID)
- Keep originals in `Imag/Battle/Battle-data/`
- Create symlinks in `robots/` folders
- Best of both worlds

---

## 🚀 **BENEFITS OF NEW ARCHITECTURE**

### **1. Scalability**
✅ Add 150+ robots easily
✅ Each robot is independent
✅ No massive JSON file

### **2. Performance**
✅ Lazy loading (load only needed robots)
✅ Smaller initial load
✅ Faster page startup

### **3. Maintainability**
✅ Edit one robot without touching others
✅ Clear structure
✅ Easy to find files

### **4. Development**
✅ Simple template for new robots
✅ Copy-paste workflow
✅ Version control friendly

### **5. Team Collaboration**
✅ Multiple people can work on different robots
✅ No merge conflicts
✅ Clear ownership

---

## 📝 **TEMPLATE SYSTEM**

### **`robots/_template/data.json`**

```json
{
  "id": "unit-XXX-RARITY-0",
  "name": "ROBOT_NAME",
  "number": XXX,
  "rarity": "UC|C|R|EX",
  "mp": 1-3,
  "role": "Scout|Goalie|Runner|Attacker|Support|Specialist|All-Rounder|Vanguard",
  "type": "Type / Type",
  "description": "Description here",
  
  "assets": {
    "sprite": "sprite.png",
    "icon": "icon.png"
  },
  
  "ability": {
    "name": "Ability Name",
    "description": "Ability description"
  },
  
  "wheel": [
    {
      "moveName": "Move Name",
      "moveType": "White|Purple|Blue|Red|Gold",
      "size": 96,
      "damage": 0,
      "stars": 0,
      "effect": "Effect description"
    }
  ],
  
  "stats": {
    "hp": 100,
    "attack": 100,
    "defense": 100,
    "speed": 100
  }
}
```

### **`robots/_template/INSTRUCTIONS.md`**

```markdown
# Adding a New Robot

1. Copy this template folder
2. Rename to: `unit-{number}-{name}`
3. Edit `data.json`:
   - Fill in all fields
   - Ensure wheel sizes sum to 96
   - Add status wheel variations if needed
4. Add sprite.png (battle sprite)
5. Add icon.png (optional UI icon)
6. Add entry to `robots/registry.json`
7. Test with `RobotLoader.loadRobot('unit-XXX-rarity-0')`

Done!
```

---

## 🧪 **TESTING STRATEGY**

### **1. Unit Tests**
- Test RobotLoader.loadRobot()
- Test registry loading
- Test caching
- Test filtering

### **2. Integration Tests**
- Load 12 existing robots
- Verify data integrity
- Test battle system
- Test team selection

### **3. Performance Tests**
- Load time with 150 robots
- Memory usage
- Cache effectiveness

### **4. Manual Tests**
- Add new robot using template
- Verify it appears in game
- Test in battle
- Test in team selection

---

## 📊 **IMPLEMENTATION TIMELINE**

### **Estimated Time:**
- Phase 1 (Infrastructure): 1 hour
- Phase 2 (Migrate 12 robots): 2 hours
- Phase 3 (Update loader): 1 hour
- Phase 4 (Add 138 robots): 10-20 hours (depends on data availability)
- Phase 5 (Cleanup): 30 minutes

**Total: 14-24 hours** (spread over multiple sessions)

---

## 💡 **ALTERNATIVE: HYBRID APPROACH**

Keep both systems during transition:

1. **RobotLoader** for new component-based robots
2. **Old JSON** for existing 12 robots
3. **RobotDatabase** checks both sources
4. Migrate gradually

**Benefits:**
- Zero risk
- Can test new system alongside old
- Smooth transition

---

## 🎯 **RECOMMENDED APPROACH**

### **Start Small:**

1. ✅ Create `robots/` folder structure
2. ✅ Create `RobotLoader` class
3. ✅ Create template
4. ✅ Migrate 1 robot (Bulbasaur) as proof of concept
5. ✅ Test thoroughly
6. ✅ If successful, migrate rest

### **Then Scale:**

7. Migrate remaining 11 robots
8. Create registry for all 150 robots
9. Add data files for robots that need them
10. Test with increasing numbers

---

## 📋 **NEXT STEPS**

**Would you like me to:**

### **Option A: PROOF OF CONCEPT** (Recommended)
- Create robot loader system
- Create template
- Migrate 1 robot (Bulbasaur)
- Test it works
- **Time:** 1-2 hours
- **Risk:** VERY LOW

### **Option B: FULL MIGRATION**
- Create complete infrastructure
- Migrate all 12 robots
- Update all systems
- **Time:** 4-5 hours
- **Risk:** MEDIUM

### **Option C: ANALYZE EXISTING ASSETS FIRST**
- Scan all 151 asset folders
- Determine which have complete assets
- Create registry automatically
- Then proceed with migration
- **Time:** 30 minutes analysis + implementation
- **Risk:** LOW

---

## 🔒 **SAFETY MEASURES**

1. ✅ Keep `data/battle-robots.json` as backup
2. ✅ RobotDatabase can fall back to old system
3. ✅ All changes are additive (no deletions)
4. ✅ Test each robot individually
5. ✅ Comprehensive backups before starting

---

**Your input needed:** Which option would you like me to proceed with?

I recommend **Option A (Proof of Concept)** - we build the system, test it with 1 robot, verify it works, then scale up safely.
