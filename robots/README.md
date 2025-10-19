# 🤖 UNIFIED ROBOT DATA STRUCTURE

## 📁 OVERVIEW

This directory contains **all data** for each robot in a unified, component-based structure. Each robot has its own folder with separate JSON files for different aspects of the robot.

---

## 🎯 STRUCTURE

```
robots/
├── unified-registry.json        # Master registry pointing to all robots
├── registry.json               # Legacy registry (still in use)
│
├── [robot-name]/               # One folder per robot
│   ├── robot.json             # Core metadata (id, name, type, rarity)
│   ├── battle-data.json       # Combat stats, attacks, wheels
│   ├── chore-data.json        # Chore system integration
│   ├── store-data.json        # Shop display info
│   ├── dialogue.json          # All dialogue lines
│   ├── images/                # All robot images
│   │   ├── happy.png
│   │   ├── sad.png
│   │   ├── thinking.png
│   │   ├── shadow.png
│   │   └── battle-sprite.png
│   └── wheels/                # Attack wheel images
│       ├── basic-wheel.png
│       ├── poisoned-wheel.png
│       └── ...
```

---

## 🤖 CURRENT ROBOTS

### ✅ FULLY INTEGRATED
- **jack-o-bot** - Has both chore and battle data

### 🚧 CHORE-ONLY (Battle data pending)
- **default-bot** - Starter robot (no battle integration planned)
- **mega-rocket-man** - To be linked with Charizard battle data
- **pika-bot** - To be linked with Pikachu battle data
- **buzz-lite-point-0** - To be linked with Mewtwo battle data

---

## 📋 FILE DESCRIPTIONS

### **robot.json** (Core Metadata)
```json
{
  "id": "robot-id",
  "battleId": "unit-xxx-x-x",      // Battle system ID (if applicable)
  "name": "Robot Name",
  "number": 1,                     // Pokédex-style number
  "rarity": "UC|C|R|EX",
  "type": "Type1 / Type2",
  "enabled": true,
  "hasBattleData": true,
  "hasChoreData": true
}
```

### **battle-data.json** (Combat System)
```json
{
  "mp": 3,                         // Movement points
  "role": "Scout|Vanguard|...",
  "stats": { "hp": 88, "attack": 77, ... },
  "ability": { "name": "...", "description": "..." },
  "image": "path/to/sprite.png",
  "attacks": {
    "basic": [...],               // Normal attacks
    "poisoned": [...],            // Status variations
    "confused": [...]
  }
}
```

### **chore-data.json** (Chore System)
```json
{
  "id": "UPPERCASE_ID",
  "purchasable": true,
  "cost": 100,
  "description": "...",
  "imagePaths": {                 // New paths
    "happy": "robots/.../images/happy.png"
  },
  "legacyImagePaths": {           // Old paths (fallback)
    "happy": "Imag/..."
  }
}
```

### **dialogue.json** (Robot Dialogue)
```json
{
  "hasCustomDialogue": true,
  "greeting": [...],
  "success": [...],
  "achievement": [...],
  "broken": [...],
  "random": [...],
  "mad": [...]
}
```

### **store-data.json** (Shop Display)
```json
{
  "featured": false,
  "category": "halloween|heroes|...",
  "tags": ["tag1", "tag2"],
  "displayOrder": 2,
  "availability": "always|seasonal"
}
```

---

## 🔧 USAGE

### **Loading a Robot (New System)**
```javascript
// Load all data for a robot
async function loadRobot(robotId) {
  const robot = await fetch(`robots/${robotId}/robot.json`).then(r => r.json());
  const chore = await fetch(`robots/${robotId}/chore-data.json`).then(r => r.json());
  const dialogue = await fetch(`robots/${robotId}/dialogue.json`).then(r => r.json());
  const store = await fetch(`robots/${robotId}/store-data.json`).then(r => r.json());
  
  if (robot.hasBattleData) {
    const battle = await fetch(`robots/${robotId}/battle-data.json`).then(r => r.json());
    return { ...robot, chore, dialogue, store, battle };
  }
  
  return { ...robot, chore, dialogue, store };
}
```

### **Legacy Fallback**
All files include `legacyImagePaths` and `legacyDataPath` properties that point to the old system. Loaders should attempt new paths first, then fall back to legacy paths.

---

## ✅ BENEFITS

1. **Single Source of Truth** - All robot data in one folder
2. **Easy Updates** - Change one file, update entire robot
3. **Portable** - Copy entire folder to share/backup robot
4. **Scalable** - Easy to add 150+ robots
5. **Clear Ownership** - No confusion about data location
6. **Future-Proof** - Easy to extend with new features

---

## 🚀 NEXT STEPS

### **Phase 1: Image Migration** (To Do)
- Copy images from `Imag/Achivments/Images/` to `robots/[robot]/images/`
- Copy battle sprites to `robots/[robot]/images/battle-sprite.png`
- Copy wheel images to `robots/[robot]/wheels/`

### **Phase 2: Battle Data Integration** (To Do)
- Populate `battle-data.json` for mega-rocket-man
- Populate `battle-data.json` for pika-bot
- Populate `battle-data.json` for buzz-lite-point-0
- Update attack names to match robot personalities

### **Phase 3: Loader Updates** (To Do)
- Update `js/robot-loader.js` to use new structure
- Update `js/chore-robot-loader.js` to use new structure
- Add fallback to legacy system for smooth transition

### **Phase 4: Testing** (To Do)
- Test chore system with new structure
- Test battle system with new structure
- Test store with new structure
- Verify all images load correctly

### **Phase 5: Cleanup** (After verification)
- Remove old `chore-robots/` folder
- Remove old `Imag/Battle/Battle-data/Unit-XXX/` folders
- Remove hardcoded data from `robot-database.js`
- Update `registry.json` to point to new structure

---

## ⚠️ IMPORTANT NOTES

- **DO NOT** delete old files until new system is fully tested
- **KEEP** `legacyImagePaths` for backwards compatibility
- **TEST** each robot individually after migration
- **BACKUP** before making major changes

---

## 📞 SUPPORT

For questions or issues with the new structure, refer to:
- `docs/RESTRUCTURING_PLAN.md` - Comprehensive migration plan
- `docs/2025-01-15/` - Technical documentation

---

**Last Updated:** Oct 17, 2025  
**Status:** ✅ Structure created, awaiting data population
