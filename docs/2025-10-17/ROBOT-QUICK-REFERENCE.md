# 🤖 Robot Creation Quick Reference

**Fast reference for adding custom robots**

---

## 🚀 Quick Start (5 Steps)

### 1️⃣ Choose Pokémon
```
Browse: robots/Battle-data/Unit-XXX_Y_0/
Copy: Unit-XXX_Y_0_attack_JSON.json
```

### 2️⃣ Create Folder
```
robots/
  └── your-robot-name/
      ├── chore-data.json
      ├── battle-data.json
      └── images/
          ├── happy.png
          ├── sad.png
          ├── thinking.png
          └── shadow.png
```

### 3️⃣ Chore Data Template
```json
{
  "id": "ROBOTID",
  "purchasable": true,
  "cost": 180,
  "description": "Your description",
  "imagePaths": {
    "happy": "robots/your-robot/images/happy.png",
    "sad": "robots/your-robot/images/sad.png",
    "thinking": "robots/your-robot/images/thinking.png",
    "shadow": "robots/your-robot/images/shadow.png"
  }
}
```

### 4️⃣ Battle Data (Customize Pokémon JSON)
```json
{
  "name": "Your Robot Name",
  "rarity": "R",
  "mp": 2,
  "type": "Your Type",
  "ability": { "name": "Ability", "description": "..." },
  "wheel": [ /* moves from Pokémon */ ],
  "stats": { "hp": 100, "attack": 88, "defense": 75, "speed": 63 }
}
```

### 5️⃣ Register
**unified-registry.json:**
```json
{
  "id": "YOUR_ROBOT",
  "name": "Your Robot",
  "folder": "your-robot-name",
  "hasBattleData": true,
  "hasChoreData": true
}
```

**robot-database.js:**
```javascript
'your-robot': {
    id: 'your-robot',
    name: 'Your Robot',
    rarity: 'R',
    mp: 2,
    wheel: [ /* copy from battle-data.json */ ],
    stats: { hp: 100, attack: 88, defense: 75, speed: 63 }
}
```

---

## 📏 Wheel Size Chart

**Total must equal 96!**

Common distributions:
- **4 moves**: 24, 24, 24, 24
- **5 moves**: 20, 20, 20, 20, 16
- **Balanced**: 32, 28, 20, 16
- **Risky**: 40, 32, 16, 8

---

## 🎨 Move Types

| Type | Use | Fields |
|------|-----|--------|
| White | Damage | `damage`, `size` |
| Gold | Priority | `damage`, `size` |
| Blue | Defense | `size`, `effect` |
| Purple | Status | `stars`, `size` |
| Red | Miss | `size` |

---

## 🎯 Rarity Stats

| Rarity | HP Range | MP |
|--------|----------|-----|
| C | 70-90 | 2 |
| UC | 80-100 | 2-3 |
| R | 90-110 | 2 |
| EX | 110-130 | 1-2 |

---

## 📂 150 Available Pokémon

**Popular choices:**
- Unit-001 (Bulbasaur) - UC, MP:3
- Unit-002 (Ivysaur) - C, MP:2
- Unit-003 (Venusaur) - EX, MP:1
- Unit-025 (Pikachu) - R, MP:2
- Unit-150 (Mewtwo) - EX, MP:2
- Unit-006 (Charizard) - EX, MP:2
- Unit-094 (Gengar) - R, MP:2
- Unit-130 (Gyarados) - R, MP:2

**Browse all:** `robots/Battle-data/`

---

## ✅ Final Checklist

- [ ] Pokémon JSON copied
- [ ] Folder created
- [ ] chore-data.json ✓
- [ ] battle-data.json ✓
- [ ] 4 images added
- [ ] unified-registry.json ✓
- [ ] robot-database.js ✓
- [ ] Wheel = 96 total
- [ ] Tested!

---

**Full Guide:** See `HOW-TO-ADD-ROBOTS.md` for detailed instructions
