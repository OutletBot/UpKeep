# How to Implement "Next Turn" Status Effects

## Overview

This guide explains how to correctly implement status effects that disable a unit for "its owner's next turn" (like the **Wait** status from Psychic Shove).

## The Challenge

The phrase **"disables for owner's next turn"** is deceptively complex because the status can be applied in two different contexts:

1. **Applied during OWNER'S turn** (owner attacks and loses)
2. **Applied during OPPONENT'S turn** (opponent attacks owner)

These two scenarios require different expiration logic.

---

## The Problem: Naive Implementation

A naive approach might use a simple turn counter:

```javascript
// ❌ WRONG - Doesn't work for both scenarios
if (statusApplied) {
    tracker[robotId] = { turnCount: currentTurnCount };
}

if (currentTurnCount > tracker[robotId].turnCount) {
    expireStatus(); // Expires too early in Scenario 1!
}
```

### Why This Fails

**Scenario 1: Owner attacks and loses**
- Turn 5: Wait applied (`turnCount=5`)
- Turn 5 ends → Counter increments to 6
- Check: `6 > 5`? YES → **Expires immediately!** ❌ (Should block next turn)

**Scenario 2: Opponent attacks owner**
- Turn 5: Wait applied (`turnCount=5`)
- Turn 5 ends
- Turn 6 begins
- Turn 6 ends → Check: `6 > 5`? YES → Expires ✅ (Correct, but too late)

---

## The Solution: Context-Aware Tracking

### 1. Track Application Context

You need to know **whose turn it was** when the status was applied:

```javascript
waitStatusTurnTracker: {
    [robotId]: {
        team: 'player' | 'opponent',
        ownerTurnCountAtApplication: number,
        appliedDuringOwnTurn: boolean  // KEY FLAG
    }
}
```

### 2. Set the Flag When Applying

```javascript
applyStatusEffect(robotId, 'waiting') {
    const robotTeam = this.getRobotTeamById(robotId);
    const currentTeamTurnCount = robotTeam === 'player' 
        ? this.playerTurnCount 
        : this.opponentTurnCount;
    
    // Check if status was applied during the robot's own team's turn
    const appliedDuringOwnTurn = (this.currentControlTeam === robotTeam);
    
    this.waitStatusTurnTracker[robotId] = {
        team: robotTeam,
        ownerTurnCountAtApplication: currentTeamTurnCount,
        appliedDuringOwnTurn: appliedDuringOwnTurn
    };
}
```

### 3. Use Context-Aware Expiration Logic

```javascript
expireWaitStatusForTeam(team) {
    // Get CURRENT turn count BEFORE incrementing
    const currentTeamTurnCount = team === 'player' 
        ? this.playerTurnCount 
        : this.opponentTurnCount;
    
    for (const robotId in this.robotStatusEffects) {
        const tracker = this.waitStatusTurnTracker[robotId];
        
        let shouldExpire = false;
        if (tracker.appliedDuringOwnTurn) {
            // Applied during owner's turn - must survive until NEXT turn ends
            shouldExpire = (currentTeamTurnCount > tracker.ownerTurnCountAtApplication);
        } else {
            // Applied during opponent's turn - expires at end of current turn
            shouldExpire = (currentTeamTurnCount >= tracker.ownerTurnCountAtApplication);
        }
        
        if (shouldExpire) {
            this.removeStatusEffect(robotId, 'waiting');
            delete this.waitStatusTurnTracker[robotId];
        }
    }
    
    // NOW increment the turn counter AFTER checking expiration
    if (team === 'player') {
        this.playerTurnCount++;
    } else {
        this.opponentTurnCount++;
    }
}
```

---

## Critical Implementation Details

### ⚠️ Turn Counter Increment Timing

**CRITICAL**: Check expiration **BEFORE** incrementing the turn counter!

```javascript
// ✅ CORRECT ORDER
expireWaitStatusForTeam(team) {
    const currentTurnCount = this.getTurnCount(team);  // Get current count
    
    // Check and expire statuses using current count
    checkExpiration(currentTurnCount);
    
    // THEN increment
    this.incrementTurnCount(team);
}

// ❌ WRONG ORDER
expireWaitStatusForTeam(team) {
    this.incrementTurnCount(team);  // Incremented too early!
    
    const currentTurnCount = this.getTurnCount(team);
    checkExpiration(currentTurnCount);  // Will expire immediately
}
```

### 🎯 Team-Specific Turn Counters

Use **separate turn counters per team**, not a global turn counter:

```javascript
// ✅ CORRECT - Per-team counters
playerTurnCount: 0,
opponentTurnCount: 0,

// ❌ WRONG - Global counter (doesn't track team turns independently)
globalTurnCount: 0,
```

### 📊 Expiration Logic Summary

| Scenario | `appliedDuringOwnTurn` | Expiration Rule | Logic |
|----------|------------------------|-----------------|-------|
| Owner attacks and loses | `true` | After NEXT full turn | `currentTurn > applicationTurn` |
| Opponent attacks owner | `false` | After CURRENT turn | `currentTurn >= applicationTurn` |

---

## Complete Timeline Examples

### Scenario 1: Owner Attacks and Loses

```
Turn 0 (Opponent):
├─ Opponent attacks Player
├─ Loses, gets Wait
│  └─ tracker: { turn: 0, appliedDuringOwnTurn: true }
└─ Turn ends
   ├─ Check: 0 > 0? NO → Keep Wait ✅
   └─ Increment to 1

Turn 1 (Opponent):
├─ Robot is BLOCKED by Wait ✅
└─ Turn ends
   ├─ Check: 1 > 0? YES → Expire Wait ✅
   └─ Increment to 2

Turn 2 (Opponent):
└─ Robot can move freely ✅
```

### Scenario 2: Opponent Attacks Owner

```
Turn 0 (Player):
├─ Player attacks Opponent
├─ Opponent loses, gets Wait
│  └─ tracker: { turn: 0, appliedDuringOwnTurn: false }
└─ Player turn ends

Turn 0 (Opponent):
├─ Robot is BLOCKED by Wait ✅
└─ Turn ends
   ├─ Check: 0 >= 0? YES → Expire Wait ✅
   └─ Increment to 1

Turn 1 (Opponent):
└─ Robot can move freely ✅
```

---

## Testing Checklist

When implementing "next turn" status effects, test these scenarios:

- [ ] **Scenario 1**: Unit attacks during own turn, loses, gains status
  - [ ] Status blocks unit during their next turn
  - [ ] Status expires at end of that next turn
  - [ ] Unit can act freely on subsequent turns

- [ ] **Scenario 2**: Unit is attacked during opponent's turn, loses, gains status
  - [ ] Status blocks unit during their very next turn
  - [ ] Status expires at end of that turn
  - [ ] Unit can act freely on subsequent turns

- [ ] **Edge cases**:
  - [ ] Status doesn't expire on the same turn it's applied
  - [ ] Multiple units with the same status track independently
  - [ ] Status survives across player/opponent turn transitions

---

## Common Pitfalls

### ❌ Pitfall 1: Incrementing Turn Counter Too Early

```javascript
// WRONG - Expires immediately
incrementCounter();
checkExpiration(); // Uses incremented counter
```

**Fix**: Check expiration BEFORE incrementing.

### ❌ Pitfall 2: Using Global Turn Counter

```javascript
// WRONG - Can't distinguish team turns
this.turnCount++; // Which team?
```

**Fix**: Use separate counters per team.

### ❌ Pitfall 3: Not Tracking Application Context

```javascript
// WRONG - Same logic for both scenarios
if (currentTurn > applicationTurn) {
    expire(); // Doesn't work for both cases
}
```

**Fix**: Track `appliedDuringOwnTurn` and use different logic.

### ❌ Pitfall 4: Forgetting to Clean Up

```javascript
// WRONG - Memory leak
this.removeStatusEffect(robotId, 'waiting');
// Forgot to delete tracker!
```

**Fix**: Always delete the tracker when expiring:
```javascript
delete this.waitStatusTurnTracker[robotId];
```

---

## Debugging Tips

### Add Detailed Logging

```javascript
console.log(`⏸️ Wait applied: ${robotId}
  Team: ${robotTeam}
  Turn: ${currentTurnCount}
  Applied during own turn: ${appliedDuringOwnTurn}`);

console.log(`Checking expiration:
  Applied at turn: ${tracker.ownerTurnCountAtApplication}
  Current turn: ${currentTeamTurnCount}
  Applied during own turn: ${tracker.appliedDuringOwnTurn}
  Should expire: ${shouldExpire}`);
```

### Verify Turn Counter Behavior

Print turn counters at key moments:
- When status is applied
- At start of each turn
- At end of each turn (before and after increment)

---

## Related Patterns

This pattern applies to any status effect described as:
- "Disables for owner's next turn"
- "Lasts until end of next turn"
- "Skips owner's next action"

Examples:
- **Wait** (Psychic Shove)
- **Stun**
- **Freeze**
- **Sleep**

---

## Summary

To implement "next turn" status effects correctly:

1. ✅ Use **team-specific turn counters**
2. ✅ Track **application context** (`appliedDuringOwnTurn`)
3. ✅ Use **different expiration rules** based on context
4. ✅ Check expiration **BEFORE** incrementing counters
5. ✅ **Clean up trackers** when expiring
6. ✅ **Test both scenarios** thoroughly

Following these principles will ensure your "next turn" status effects work correctly in all situations.
