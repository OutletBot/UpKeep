# 🤖 Adding a New Robot - Complete Guide

## Quick Start (5 Minutes)

### **Option A: Using Existing Assets**

If you already have a robot folder in `Imag/Battle/Battle-data/`:

1. ✅ **Assets already exist** - No action needed!
2. ✅ **JSON data already exists** - Auto-loaded by RobotLoader
3. ✅ **Add to registry.json** - Just add one entry

**That's it!** The RobotLoader will handle everything else.

---

### **Option B: Creating New Robot from Scratch**

1. **Copy template folder**
   ```
   Copy: robots/_template/
   To:   robots/unit-XXX-robotname/
   ```

2. **Create asset folder**
   ```
   Create: Imag/Battle/Battle-data/Unit-XXX_RARITY_0/
   ```

3. **Add files**
   - `Unit-XXX_sprite.png` - Battle sprite (required)
   - `Unit-XXX_RARITY_0_attack_JSON.json` - Wheel data (required)
   - `Unit-XXX_RARITY_0_attack_table.png` - Wheel visual (optional)

4. **Add to registry**
   - Edit `robots/registry.json`
   - Add new entry

---

## 📋 Registry Entry Format

Add this to `robots/registry.json`:

```json
{
  "id": "unit-152-newrobot-uc-0",
  "folder": "Unit-152_UC_0",
  "number": 152,
  "name": "New Robot",
  "rarity": "UC",
  "variation": 0,
  "type": "Electric / Steel",
  "mp": 2,
  "evolution": "",
  "evolvedFrom": "",
  "evolutionNum": 0,
  "assetPath": "Imag/Battle/Battle-data/Unit-152_UC_0",
  "spriteFile": "Unit-152_sprite.png",
  "dataFile": "Unit-152_UC_0_attack_JSON.json",
  "hasCompleteData": true,
  "enabled": true
}
```

---

## 📊 Attack JSON Format

`Unit-XXX_RARITY_0_attack_JSON.json`:

```json
{
  "pokemon_name": "New Robot",
  "pokemon_sprite_image": "newrobot_sprite.png",
  "attack_table_file_name": "NewRobot_UC_0_attack_table.png",
  "base_movement_points": 2,
  "rarity": "UC",
  "pokemon_type": "Electric / Steel",
  "evolution": "",
  "evolved_from": "",
  "evolution_num": 0,
  "attack_lists_by_type": {
    "basic": [
      {
        "attack_wheel_size": 32,
        "attack_name": "Thunder Shock",
        "attack_type": "White",
        "attack_value": "60",
        "attack_ability": "",
        "attack_start_angle_deg": 0,
        "attack_end_angle_deg": 119.9999,
        "attack_wheel_file_name": "NewRobot_UC_0_basic_attack_wheel.png"
      },
      {
        "attack_wheel_size": 24,
        "attack_name": "Paralyze",
        "attack_type": "Purple",
        "attack_value": "☆",
        "attack_ability": "The battle opponent becomes paralyzed",
        "attack_start_angle_deg": 120.0,
        "attack_end_angle_deg": 209.9999,
        "attack_wheel_file_name": "NewRobot_UC_0_basic_attack_wheel.png"
      },
      {
        "attack_wheel_size": 40,
        "attack_name": "Miss",
        "attack_type": "Red",
        "attack_value": "",
        "attack_ability": "",
        "attack_start_angle_deg": 210.0,
        "attack_end_angle_deg": 359.9999,
        "attack_wheel_file_name": "NewRobot_UC_0_basic_attack_wheel.png"
      }
    ],
    "paralyzed": [
      // ... alternate wheel when paralyzed
    ]
  }
}
```

---

## 🎯 Wheel Design Rules

### **CRITICAL: Wheel must sum to 96!**

```javascript
// Example wheel (must total 96):
{
  "attack_wheel_size": 32,  // White attack
  "attack_wheel_size": 24,  // Purple move
  "attack_wheel_size": 40,  // Miss
}
// Total: 32 + 24 + 40 = 96 ✅
```

### **Move Types:**
- **White** - Damage attack (`attack_value`: number)
- **Purple** - Status effect (`attack_value`: "☆", "☆☆", or "☆☆☆")
- **Blue** - Defensive move
- **Red** - Miss
- **Gold** - Special attack (rare)

### **Attack Values:**
- Numbers (10-150) = Damage
- ☆ = 1 star purple move
- ☆☆ = 2 star purple move
- ☆☆☆ = 3 star purple move
- Empty = No damage (Blue/Red moves)

---

## 🎨 Asset Guidelines

### **Sprite (Required)**
- **Filename:** `Unit-XXX_sprite.png`
- **Size:** ~100x100px (flexible)
- **Format:** PNG with transparency
- **Style:** Match existing robot sprites

### **Attack Table (Optional)**
- **Filename:** `Unit-XXX_RARITY_0_attack_table.png`
- **Purpose:** Visual reference
- **Not required for gameplay**

---

## 📝 Naming Conventions

### **Folder Names:**
```
Format: Unit-{NUMBER}_{RARITY}_{VARIATION}

Examples:
- Unit-001_UC_0    (Bulbasaur, Uncommon, variation 0)
- Unit-025_R_0     (Pikachu, Rare, variation 0)
- Unit-150_EX_0    (Mewtwo, EX, variation 0)
```

### **Robot IDs:**
```
Format: unit-{number}-{lowercase-rarity}-{variation}

Examples:
- unit-001-uc-0
- unit-025-r-0
- unit-150-ex-0
```

---

## ✅ Testing Your Robot

### **1. Verify JSON is valid**
```javascript
// In browser console:
fetch('Imag/Battle/Battle-data/Unit-152_UC_0/Unit-152_UC_0_attack_JSON.json')
  .then(r => r.json())
  .then(d => console.log('Valid!', d))
```

### **2. Load robot**
```javascript
// In browser console:
await RobotLoader.loadRobotData('unit-152-uc-0')
```

### **3. Check registry**
```javascript
// In browser console:
RobotLoader.getRobotById('unit-152-uc-0')
```

### **4. Test in battle**
- Open battle system
- Select your robot in team
- Deploy and test wheel spins

---

## 🚨 Common Mistakes

### ❌ **Wheel doesn't sum to 96**
```json
// BAD:
"attack_wheel_size": 30,  // Total: 94
"attack_wheel_size": 24,
"attack_wheel_size": 40
// Won't work! Must be 96!
```

### ❌ **Wrong file paths**
```json
// BAD:
"spriteFile": "sprite.png"  // Generic name

// GOOD:
"spriteFile": "Unit-152_sprite.png"  // Proper naming
```

### ❌ **Missing registry entry**
Robot exists in assets but not in `robots/registry.json` = Won't load!

---

## 📚 Resources

- **Example Robot:** See `Unit-001_UC_0` (Bulbasaur)
- **Registry:** `robots/registry.json` - See all 150 robots
- **Loader Code:** `js/robot-loader.js` - How loading works
- **Current Robots:** `data/battle-robots.json` - Old format (reference only)

---

## 🎯 Checklist

Before submitting a new robot:

- [ ] Attack JSON exists and is valid
- [ ] Sprite image exists
- [ ] Wheel sums to exactly 96
- [ ] Added to `robots/registry.json`
- [ ] Tested with `RobotLoader.loadRobotData()`
- [ ] Tested in battle system
- [ ] All file names follow convention

---

**Need help?** Check `robots/_docs/` for detailed documentation!
