# 🎯 ROBOT DATA RESTRUCTURING PLAN

## 📋 GOAL
Consolidate ALL data for each robot into a single folder for better organization and maintainability.

---

## 🎨 NEW UNIFIED STRUCTURE

```
robots/
├── jack-o-bot/                    (ONE folder for entire robot)
│   ├── robot.json                 (Registry metadata)
│   ├── battle-data.json           (Attack wheels, stats)
│   ├── chore-data.json            (Chore system info)
│   ├── store-data.json            (Shop availability, cost)
│   ├── dialogue.json              (All dialogue lines)
│   ├── images/
│   │   ├── happy.png
│   │   ├── sad.png
│   │   ├── thinking.png
│   │   ├── shadow.png
│   │   └── battle-sprite.png
│   └── wheels/
│       ├── basic-wheel.png
│       ├── poisoned-wheel.png
│       ├── confused-wheel.png
│       └── ...
│
├── mega-rocket-man/
│   ├── robot.json
│   ├── battle-data.json
│   ├── chore-data.json
│   ├── store-data.json
│   ├── dialogue.json
│   ├── images/
│   └── wheels/
│
└── ... (150 more robots)
```

---

## 📦 CONSOLIDATED DATA FILES

### **robot.json** (Registry Metadata)
```json
{
  "id": "jack-o-bot",
  "name": "Jack-o'-Bot",
  "number": 1,
  "rarity": "UC",
  "type": "Grass / Poison",
  "variation": 0,
  "enabled": true,
  "hasCompleteData": true
}
```

### **battle-data.json** (Combat Stats & Attacks)
```json
{
  "mp": 3,
  "role": "Scout",
  "stats": {
    "hp": 88,
    "attack": 77,
    "defense": 66,
    "speed": 83
  },
  "ability": {
    "name": "Spooky Powers",
    "description": "Can inflict poison and sleep with haunted dust attacks."
  },
  "attacks": {
    "basic": [...],
    "poisoned": [...],
    "confused": [...],
    "paralyzed": [...],
    "asleep": [...],
    "frozen": [...],
    "burned": [...]
  }
}
```

### **chore-data.json** (Chore System Integration)
```json
{
  "purchasable": true,
  "cost": 100,
  "unlockRequirements": [],
  "specialFeatures": []
}
```

### **store-data.json** (Shop Display)
```json
{
  "featured": false,
  "category": "halloween",
  "tags": ["spooky", "poison", "sleep"],
  "description": "A spooky Halloween bot with haunting powder attacks."
}
```

### **dialogue.json** (All Robot Dialogue)
```json
{
  "greeting": [...],
  "success": [...],
  "achievement": [...],
  "broken": [...],
  "random": [...],
  "mad": [...]
}
```

---

## 🔧 MIGRATION STEPS

### **Phase 1: Create New Structure**
1. Create `robots/jack-o-bot/` folder
2. Move all Jack-o'-Bot files into this folder
3. Consolidate data from multiple sources

### **Phase 2: Update Loaders**
Update these loader systems:
- `js/robot-loader.js` → Load from new structure
- `js/chore-robot-loader.js` → Load from new structure
- `js/robot-database.js` → Remove hardcoded fallbacks

### **Phase 3: Update References**
Update these references:
- `robots/registry.json` → Point to new paths
- `chore-robots/registry.json` → Merge into main registry
- All image paths
- All data file paths

### **Phase 4: Cleanup**
Remove old files:
- `Imag/Battle/Battle-data/Unit-001_UC_0/` (old battle data)
- `chore-robots/jack-o-bot/` (move to robots/)
- `data/battle-robots.json` (no longer needed)

---

## ✅ BENEFITS

1. **Single Source of Truth** - All robot data in one place
2. **Easy Updates** - Change one folder, update entire robot
3. **Portable** - Can copy/share entire robot as one unit
4. **Scalable** - Easy to add 150 robots
5. **Clear Ownership** - No confusion about where data lives
6. **Future-Proof** - Easy to add new features per robot

---

## 🚀 NEXT STEPS

1. **Create helper script** to automate migration
2. **Test with Jack-o'-Bot** first
3. **Verify all systems work** (chores, battles, store)
4. **Migrate remaining robots** once verified
5. **Update documentation**

---

## ⚠️ IMPORTANT NOTES

- Keep old structure until new one is fully tested
- Update both systems to work in parallel during migration
- Create backup before starting
- Test each robot individually after migration

---

**Ready to start restructuring?** 🤖
