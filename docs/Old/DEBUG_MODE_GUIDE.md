# 🐛 Debug Mode - Manual Control Guide

## ✅ What's New

You now have **full manual control of both teams** for development and testing!

---

## 🎮 How to Start

### 1. Enter Battle Mode
- Go to **Settings** → Click **"⚔️ Battle System"**
- Select **6 robots** for your team
- Click **"Deploy for Battle"**

### 2. Debug Mode Activates Automatically
- Both teams use the **same 6 robots** you selected
- You control **BOTH** the player (bottom) and opponent (top) teams
- A debug control panel appears at the top of the screen

---

## 🕹️ Debug Controls

### Control Panel (Top of Screen)
```
🐛 DEBUG MODE
Controlling: PLAYER (Bottom) / OPPONENT (Top)
[Switch Teams] button
```

**Switch Teams Button:**
- Click to toggle between controlling Player or Opponent
- Current team is highlighted in the panel
- Only the current team's robots can be selected/moved

---

## 📋 Deployment Phase

### Step 1: Deploy Player Team (Bottom)
1. **Current Control:** PLAYER (Bottom)
2. Click a robot in the **bottom bench** (player side)
3. Click one of the **bottom entry points** (corners):
   - `entry-bottom-left` (bottom-left corner)
   - `entry-bottom-right` (bottom-right corner)
4. Robot appears on the board!
5. Repeat until all 6 player robots are deployed

### Step 2: Switch to Opponent Team
1. Click **"Switch Teams"** button
2. **Current Control:** OPPONENT (Top)

### Step 3: Deploy Opponent Team (Top)
1. Click a robot in the **top bench** (opponent side)
2. Click one of the **top entry points** (corners):
   - `entry-top-left` (top-left corner)
   - `entry-top-right` (top-right corner)
3. Robot appears on the board!
4. Repeat until all 6 opponent robots are deployed

---

## 🎯 Movement Phase

### Understanding MP (Movement Points)
Each robot has an MP value that determines how far it can move:
- **3 MP (Scouts):** Can move up to 3 connected points
- **2 MP (Vanguards):** Can move up to 2 connected points
- **1 MP (Sentinels):** Can move only 1 connected point

### Moving Robots

**Player Team (Bottom):**
1. Ensure control is set to **PLAYER**
2. Click a deployed player robot (green border)
3. **Green pulsing points** show all valid destinations within MP range
4. Click any green point to move there

**Opponent Team (Top):**
1. Click **"Switch Teams"** to control **OPPONENT**
2. Click a deployed opponent robot (red border)
3. **Green pulsing points** show all valid destinations within MP range
4. Click any green point to move there

### Movement Rules
- ✅ Can move through empty points
- ❌ Cannot move through occupied points (ally or enemy)
- ⚔️ Moving adjacent to enemy triggers battle!

---

## ⚔️ Battle Phase

### When Battle Triggers
- Automatically when a robot moves **adjacent** to an enemy
- Battle modal appears showing both combatants

### Battle Options
1. **⚔️ Attack!** - Spin both Data Disks and fight
2. **↩️ Cancel** - Back out without fighting

### Battle Resolution
1. Both robots spin their Data Disks
2. Winner determined by move priority:
   - **Blue** > **Gold** > **Purple** > **White** > **Red**
3. Loser is knocked out and removed from board
4. Winner stays on the field

---

## 🎨 Visual Indicators

### Point Colors
| Color | Meaning |
|-------|---------|
| 💙 **Blue pulsing** | Valid deployment points (entry points) |
| 💚 **Green pulsing** | Valid move destinations (within MP range) |
| 🟡 **Gold glow** | Selected robot |

### Robot Borders
| Color | Team |
|-------|------|
| 🟢 **Green** | Player team (bottom) |
| 🔴 **Red** | Opponent team (top) |
| 🟡 **Gold** | Currently selected |

### Bench Robots
| State | Appearance |
|-------|------------|
| Normal | Transparent border |
| Hover | Gold border, slight scale |
| Selected | Gold border + glow |

---

## 🔧 Technical Details

### MP-Based Movement System
Uses **Breadth-First Search (BFS)** to calculate all reachable points:
```javascript
// Example: 3 MP Scout
Starting Point → 1 MP away → 2 MP away → 3 MP away
All empty points within this range are highlighted
```

### Team Control Logic
```javascript
debugMode: true
currentControlTeam: 'player' | 'opponent'

// Only current team's robots can be selected
if (robot.team !== currentControlTeam) {
    // Blocked - switch teams first
}
```

### Deployment Restrictions
- **Player team:** Can only deploy to bottom entry points
- **Opponent team:** Can only deploy to top entry points
- Each entry point can hold only 1 robot

---

## 📝 Workflow Example

### Full Game Setup (12 Robots Total)

**Phase 1: Deploy Player Team**
```
Control: PLAYER
1. Click robot in bottom bench → Click entry-bottom-left
2. Click robot in bottom bench → Click entry-bottom-right
3. Repeat for remaining 4 robots
```

**Phase 2: Deploy Opponent Team**
```
Click [Switch Teams]
Control: OPPONENT
1. Click robot in top bench → Click entry-top-left
2. Click robot in top bench → Click entry-top-right
3. Repeat for remaining 4 robots
```

**Phase 3: Battle!**
```
Control: PLAYER
1. Click player robot → Click green point to move
2. If adjacent to enemy → Battle triggers!
3. Attack or Cancel

Click [Switch Teams]
Control: OPPONENT
4. Click opponent robot → Click green point to move
5. Continue alternating turns
```

---

## 🎯 Strategy Tips

### Deployment Strategy
- **Scouts (3 MP):** Deploy for quick goal rush
- **Sentinels (1 MP):** Deploy near your goal for defense
- **Vanguards (2 MP):** Balanced - deploy in middle positions

### Movement Strategy
- **High MP robots:** Push toward enemy goal
- **Low MP robots:** Defend your goal
- **Flanking:** Attack from multiple directions
- **Retreat:** Use Cancel to avoid bad matchups

### Battle Strategy
- **Know your wheels:** Study robot Data Disks before battle
- **Blue moves:** Defensive powerhouses
- **Gold moves:** Beat Purple moves
- **White moves:** Damage-based attacks
- **Red moves:** Miss - avoid if possible

---

## 🐛 Troubleshooting

### "Can't select robot"
- ✅ Check if you're controlling the correct team
- ✅ Click "Switch Teams" if needed

### "No green points appear"
- ✅ Robot might have 0 MP (shouldn't happen)
- ✅ All adjacent points might be occupied
- ✅ Try selecting a different robot

### "Can't deploy to entry point"
- ✅ Entry point might already be occupied
- ✅ Make sure you're using correct team's entry points
  - Player: Bottom corners
  - Opponent: Top corners

### "Battle doesn't trigger"
- ✅ Robots must be on **adjacent connected points**
- ✅ Check the board connections (not all points connect)

---

## 🚀 Future Enhancements

### Coming Soon
- [ ] Turn counter (track number of moves)
- [ ] Move history log
- [ ] Undo last move
- [ ] Save/load game state
- [ ] AI opponent mode (auto-play one side)
- [ ] Spectator mode (watch AI vs AI)

### Advanced Features
- [ ] MP deduction per move (currently unlimited)
- [ ] Turn limits (300 turns max)
- [ ] Time limits (5 minutes per side)
- [ ] Goal capture win condition
- [ ] Surrounding mechanic (instant KO)
- [ ] PC/Repair Bay system

---

## 🎮 Quick Reference

### Keyboard Shortcuts (Future)
| Key | Action |
|-----|--------|
| `Space` | Switch teams |
| `Esc` | Deselect robot |
| `Z` | Undo move |
| `R` | Reset board |

### Mouse Controls
| Action | Control |
|--------|---------|
| Select bench robot | Click robot in bench |
| Deploy robot | Click entry point after selecting |
| Select field robot | Click robot on board |
| Move robot | Click green point after selecting |
| Battle | Automatic when adjacent |

---

## 📊 Testing Checklist

- [x] Deploy all 6 player robots
- [x] Switch teams
- [x] Deploy all 6 opponent robots
- [x] Move player robots with correct MP range
- [x] Move opponent robots with correct MP range
- [x] Trigger battle by moving adjacent
- [x] Test all move type combinations
- [x] Test draw scenarios
- [ ] Test goal capture
- [ ] Test full 6v6 match to completion

---

## 💡 Pro Tips

1. **Deploy First:** Get all robots on the field before moving
2. **Scout Rush:** Use 3 MP robots to quickly reach enemy goal
3. **Defensive Wall:** Place 1 MP robots near your goal
4. **Switch Often:** Alternate between teams for realistic gameplay
5. **Study Wheels:** Know your robots' Data Disks before battles
6. **Plan Ahead:** Think 2-3 moves ahead
7. **Control Center:** Keep high-value robots in middle
8. **Corner Safety:** Corners are harder to surround

---

**Status:** ✅ FULLY FUNCTIONAL - Ready for development testing!

**Debug Mode Features:**
- ✅ Manual control of both teams
- ✅ Team switching with button
- ✅ MP-based movement (BFS pathfinding)
- ✅ Proper deployment restrictions
- ✅ Visual feedback for all actions
- ✅ Full battle integration

**Last Updated:** October 10, 2025
