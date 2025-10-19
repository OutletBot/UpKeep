# Memory Context - Psychic Shove Implementation

**Purpose:** This file contains critical context and memory for AI assistants to continue work seamlessly after a session break or memory wipe.

---

## 🧠 Project Context

### What This Project Is
A **Pokémon-themed strategy board game** built as a single-page web application (`index.html`). Players move robots (Pokémon) on a hex-like board, battle using spinning wheels (like Pokémon Duel), and try to capture the opponent's goal.

### Codebase Structure
- **Single file:** `index.html` (~24,000+ lines)
- **No build system:** Pure HTML/CSS/JavaScript
- **Game engine:** Custom-built, object-oriented
- **Main object:** `GameBoard` (contains all game logic)
- **Database:** `RobotDatabase` (Pokémon stats and moves)

### Key Systems
1. **Board System:** Hex-like grid with entry/route/inner/goal points
2. **Movement System:** BFS pathfinding with MP (Movement Points)
3. **Battle System:** Spinning wheels with color-coded moves
4. **Status Effect System:** Conditions (poison, burn, etc.) and markers
5. **Turn Management:** Player vs AI (or debug mode for manual control)

---

## 🎯 Current Feature: Psychic Shove

### What We Just Implemented
A **special move** that knocks the battle loser backward in a straight line, with chain collisions and status effects.

### Why This Was Complex
1. **Direction calculation:** Must follow board connections, not just coordinates
2. **Chain collisions:** Multiple robots pushed in sequence
3. **Movement order:** MUST move back-to-front (farthest first)
4. **Friendly fire:** Wait status applies to ALL teams
5. **Immovable Object:** Effect fails if path completely blocked

### Critical Design Decisions

#### Decision 1: Winner vs Attacker
**Problem:** Should the attacker or the winner activate Psychic Shove?  
**Answer:** The WINNER (whoever wins the battle, regardless of who attacked)  
**Reason:** Move text says "battle opponent" (the one who lost)

#### Decision 2: Affected Pokémon
**Problem:** Who gets Wait status?  
**Answer:** ONLY robots that actually moved (not robots in blocked positions)  
**Reason:** Move text says "all affected Pokémon" (affected = moved)

#### Decision 3: Immovable Object
**Problem:** What if entire path is blocked?  
**Answer:** Effect FAILS completely - no movement, no Wait  
**Reason:** "As far back as possible" = if distance is ZERO, effect doesn't happen

#### Decision 4: Friendly Fire
**Problem:** Does Wait apply to allies caught in the path?  
**Answer:** YES - Wait applies to ALL robots that moved, regardless of team  
**Reason:** This is intentional game design (risk/reward mechanic)

---

## 🔧 Technical Implementation

### Function Locations (approximate line numbers)

#### `handlePsychicShove(winnerPointId, loserPointId, result)` - Line ~21612
**Purpose:** Main orchestration function  
**Called by:** `handleSpecialEffect()` when winner's move is "Psychic Shove"  
**Flow:**
1. Calculate knockback path
2. Execute knockback with chain collisions
3. Apply Wait status to affected robots
4. Handle failure cases

**CRITICAL:** Parameters are `winnerPointId` and `loserPointId` (NOT attacker/defender!)

#### `calculateKnockbackPath(fromPointId, targetPointId)` - Line ~21644
**Purpose:** Calculate straight-line path using board connections  
**Algorithm:**
1. Get direction vector (target - winner)
2. For each step, score all connections using dot product
3. Choose highest-scoring connection (most aligned with direction)
4. Repeat until no valid connections

**Returns:** Array of point objects `[{id: 'point-left-2'}, ...]`

**Key insight:** Uses dot product to measure directional alignment:
```javascript
const dotProduct = (vecX * dirX + vecY * dirY) * 100;
// Positive = same direction (good)
// Negative = opposite direction (bad)
```

#### `executeKnockback(startPointId, knockbackPath)` - Line ~21718
**Purpose:** Move robots with chain collision handling  
**Algorithm:**
1. Build chain: `[{pointId, robot, pathIndex}, ...]`
2. Check Immovable Object (no empty space in entire path)
3. Move robots from BACK TO FRONT (i = length-1 to 0)
4. Last robot finds first empty space
5. Earlier robots move to where next robot WAS

**Returns:** Array of affected robots with old/new positions

**CRITICAL BUG FIX:** Must check if next robot actually moved before trying to move into its old position:
```javascript
const nextRobotMoved = affectedRobots.find(r => r.robotId === robotChain[i + 1].robot.id);
if (nextRobotMoved) {
    targetPointId = robotChain[i + 1].pointId; // Safe to move here
} else {
    targetPointId = null; // Chain broken, can't move
}
```

---

## 🐛 Major Bugs Fixed

### Bug 1: Wrong Robot Knocked Back
**Symptom:** Defender always knocked back, even when attacker lost  
**Root cause:** Function received `(winnerPointId, loserPointId)` but treated them as `(attackerPointId, defenderPointId)`, then recalculated winner/loser using `result.winner`, which reversed the values  
**Fix:** Changed function signature and removed recalculation

**Code before:**
```javascript
async handlePsychicShove(attackerPointId, defenderPointId, result) {
    const loserPointId = result.winner === 'attacker' ? defenderPointId : attackerPointId;
    // WRONG! Parameters are already winner/loser, not attacker/defender
}
```

**Code after:**
```javascript
async handlePsychicShove(winnerPointId, loserPointId, result) {
    // Parameters are correct - use them directly!
}
```

### Bug 2: Initial Target Not Moving
**Symptom:** In chain knockbacks, the initial target (loser) never moved  
**Root cause:** Algorithm moved chain robots first, then tried to move initial target into occupied space  
**Fix:** Completely rewrote to move back-to-front

**Old algorithm (WRONG):**
```javascript
// Move chain robots first
for (const robot of robotsToMove) {
    moveRobot(robot); // Moves into path
}
// Try to move initial target
moveRobot(initialTarget, finalDestination); // FAILS - destination occupied!
```

**New algorithm (CORRECT):**
```javascript
// Build complete chain including initial target
const robotChain = [initialTarget, ...robotsInPath];

// Move from BACK TO FRONT
for (let i = robotChain.length - 1; i >= 0; i--) {
    // Last robot finds empty space
    // Earlier robots move to where next robot WAS
}
```

### Bug 3: Chain Breaking Mid-Way
**Symptom:** If a robot couldn't move, earlier robots still tried to move into its position  
**Root cause:** Assumed next robot always moved  
**Fix:** Check if next robot actually moved before using its old position

**Added validation:**
```javascript
const nextRobotMoved = affectedRobots.find(r => r.robotId === robotChain[i + 1].robot.id);
if (!nextRobotMoved) {
    targetPointId = null; // Can't move - chain is broken
}
```

---

## 📊 Data Structures

### Battle Result Object
```javascript
{
    winner: 'attacker' | 'defender',
    attacker: {
        name: 'Bulbasaur',
        team: 'player',
        move: 'Vine Whip',
        damage: 20
    },
    defender: {
        name: 'Mewtwo',
        team: 'opponent',
        move: 'Psychic Shove',
        damage: 0
    }
}
```

### Knockback Path Array
```javascript
[
    {id: 'point-left-2'},
    {id: 'point-left-3'},
    {id: 'entry-bottom-left'}
]
```

### Robot Chain Array
```javascript
[
    {
        pointId: 'point-left-1',
        robot: {id: 'unit-001-uc-0', team: 'player'},
        pathIndex: -1  // Initial target (before path)
    },
    {
        pointId: 'point-left-2',
        robot: {id: 'unit-025-r-0', team: 'player'},
        pathIndex: 0  // First point in path
    },
    {
        pointId: 'point-left-3',
        robot: {id: 'unit-001-uc-0-opp', team: 'opponent'},
        pathIndex: 1  // Second point in path
    }
]
```

### Affected Robots Array
```javascript
[
    {
        robotId: 'unit-001-uc-0-opp',
        robotName: 'Bulbasaur',
        team: 'opponent',
        oldPointId: 'point-left-3',
        newPointId: 'entry-bottom-left'
    },
    // ... more robots
]
```

---

## 🎮 Game Board Structure

### Point Types
1. **Entry Points:** Where robots spawn (e.g., `entry-top-left`, `entry-bottom-right`)
2. **Route Points:** Main pathways (e.g., `point-left-1`, `point-top-3`)
3. **Inner Points:** Center area (e.g., `point-inner-bl`, `point-inner-top`)
4. **Goal Points:** Win condition (e.g., `goal-player`, `goal-opponent`)

### Point Object Structure
```javascript
{
    x: 67,           // SVG coordinate
    y: 600,          // SVG coordinate
    type: 'entry',
    grid: 'OE5A',
    position: 'bottom-left',
    spawnPoint: true,
    team: 'player',
    connections: ['point-bottom-1', 'point-left-3', 'point-inner-bl'],
    robot: {         // null if empty
        id: 'unit-001-uc-0',
        team: 'player'
    }
}
```

### Connection System
Each point has a `connections` array listing adjacent point IDs. This is how the board topology is defined. Movement and knockback MUST follow these connections.

---

## 🔍 Debugging Tips

### Enable Debug Mode
The game has a built-in debug mode where you control both sides:
```javascript
GameBoard.debugMode = true;
```

### Useful Console Commands
```javascript
// View board state
GameBoard.gameBoard.routePoints['point-left-1']

// Check robot statuses
GameBoard.getRobotStatuses('unit-001-uc-0')

// Apply status for testing
GameBoard.applyStatusEffect('point-left-1', 'waiting')

// View all active statuses
GameBoard.debugShowAllStatuses()
```

### Console Log Patterns
Look for these emoji patterns in logs:
- `🧠` = Psychic Shove execution
- `📐` = Direction calculation
- `📍` = Path calculation
- `🔗` = Chain building
- `💨` = Robot movement
- `⏸️` = Wait status application
- `🛑` = Immovable Object failure
- `✅` = Success
- `⚠️` = Warning
- `❌` = Error

---

## 🚨 Common Pitfalls

### Pitfall 1: Coordinate vs Connection-Based Movement
**Wrong:** Calculate straight line using coordinates  
**Right:** Follow board connections using dot product scoring

**Why:** The board is not a perfect grid. Connections define valid paths.

### Pitfall 2: Moving Robots in Wrong Order
**Wrong:** Move initial target first  
**Right:** Move from back-to-front (farthest first)

**Why:** Each robot needs to move into the space vacated by the next robot.

### Pitfall 3: Applying Wait to All Robots in Path
**Wrong:** Apply Wait to all robots in knockback path  
**Right:** Only apply Wait to robots that ACTUALLY MOVED

**Why:** If a robot couldn't move (Immovable Object), it's not "affected."

### Pitfall 4: Assuming Parameters Are Attacker/Defender
**Wrong:** Use `result.winner` to determine who to knock back  
**Right:** Use parameters directly (they're already winner/loser)

**Why:** The calling function already determined winner/loser.

---

## 📝 Code Style & Conventions

### Logging
- Use emoji prefixes for visual scanning
- Log at key decision points (not every line)
- Include relevant data (point IDs, robot names, teams)

### Error Handling
- Check for null/undefined before accessing properties
- Return early on failure cases
- Log warnings for unexpected states

### Naming Conventions
- `pointId` = string like 'point-left-1'
- `robotId` = string like 'unit-001-uc-0'
- `team` = 'player' or 'opponent'
- `robotData` = full robot object from database
- `pointData` = point object from gameBoard

### Async/Await
- Movement functions are async (for animation)
- Always await movement before continuing
- Use `async/await`, not `.then()` chains

---

## 🔮 Related Systems to Understand

### Status Effect System
**Location:** Lines ~15500-16500  
**Key functions:**
- `applyStatusEffect(pointId, statusName)`
- `removeStatusEffect(robotId, statusName)`
- `getRobotStatuses(robotId)`
- `updateRobotStatusIndicators(pointId, robotId)`

**Status types:**
- **Conditions:** poison, burn, confusion, paralysis, frozen, sleep, waiting
- **Markers:** mp-1, rebooting

**Wait status definition:**
```javascript
'waiting': {
    name: 'Wait',
    turnsRemaining: 1,
    autoExpires: true,
    preventsMovement: true,
    preventsAttack: true,
    preventsAbilities: true,
    icon: '⏸️',
    color: '#888888'
}
```

### Battle System
**Location:** Lines ~20200-21600  
**Key functions:**
- `initiateBattle(attackerPointId, defenderPointId)`
- `executeBattle(attackerPointId, defenderPointId)`
- `handleSpecialEffect(moveName, attackerPointId, defenderPointId, result)`

**Special effects:**
- Psychic Shove (knockback + Wait)
- Annihilate (move attacker away)
- More to be implemented...

### Movement System
**Location:** Lines ~18300-20100  
**Key functions:**
- `moveRobotToPoint(fromPointId, toPointId, path)`
- `moveRobotForKnockback(fromPointId, toPointId)`
- `calculateValidMoves(pointId, mp)`
- BFS pathfinding with MP limits

---

## 🎯 If You Need to Continue This Work

### Immediate Next Steps
1. **Test edge cases:**
   - Knockback into corners
   - Knockback along board edges
   - Very long chain knockbacks (5+ robots)
   - Knockback with mixed teams in chain

2. **Performance optimization:**
   - Profile long chain knockbacks
   - Optimize BFS if needed
   - Cache direction calculations

3. **Visual polish:**
   - Add sound effects for knockback
   - Add particle effects for collisions
   - Add camera shake for impact

### If Implementing Similar Features
1. **Study `calculateKnockbackPath`** - reusable for other displacement moves
2. **Study `executeKnockback`** - template for chain effects
3. **Use dot product** for any directional pathfinding
4. **Always validate** that robots actually moved before applying effects

### If Debugging Issues
1. **Check console logs** - look for emoji patterns
2. **Verify point connections** - use `GameBoard.gameBoard.routePoints['point-id'].connections`
3. **Check robot positions** - use `GameBoard.findRobotOnField('robot-id')`
4. **Test in debug mode** - control both sides manually
5. **Add more logging** - at decision points, not loops

---

## 🔗 Related Files

### Documentation
- `docs/2025-01-15/README.md` - Session summary
- `docs/2025-01-15/CHAT_CONTINUATION.md` - Conversation history
- `docs/2025-01-15/MEMORY.md` - This file

### Code
- `index.html` - Main game file (all code)
- `Imag/Battle/Battle-data/Unit-150_EX_1/` - Mewtwo data (has Psychic Shove)

---

## 💡 Key Insights for AI Assistants

### Understanding the User
- **Highly detail-oriented:** Wants thorough explanations
- **Prefers working code:** Implement, don't just suggest
- **Values testing:** Wants to see it work in practice
- **Appreciates documentation:** Wants to understand WHY, not just WHAT

### Communication Style
- Use **emoji** for visual clarity (🧠💨⏸️)
- **Bold** important terms
- Provide **code examples** with explanations
- Show **before/after** for bug fixes
- Include **console log examples**

### Problem-Solving Approach
1. **Understand the requirement** fully before coding
2. **Think through edge cases** (Immovable Object, friendly fire)
3. **Test incrementally** (simple case first, then complex)
4. **Fix bugs systematically** (root cause, not symptoms)
5. **Document decisions** (why, not just what)

---

## ⚠️ Critical Things NOT to Change

### Don't Break These
1. **Board connection system** - movement depends on it
2. **Status effect expiration** - turn management depends on it
3. **Battle result structure** - many systems depend on it
4. **Robot ID format** - used for lookups everywhere
5. **Team naming** - 'player' and 'opponent' (not 'enemy' or 'ai')

### Don't Assume These
1. **Coordinates are grid-aligned** - they're not, use connections
2. **All robots have same MP** - they don't, check each robot
3. **Attacker always loses** - winner can be either side
4. **Status effects stack** - they don't, one instance per robot
5. **Paths are reversible** - they might not be (one-way connections possible)

---

**This memory context should enable seamless continuation of work on Psychic Shove or related features.** 🧠✨
