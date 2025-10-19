# Repair Bay FIFO Cycle - Visual Flow Diagram

## 🔄 **The Complete Cycle (Visual)**

```
┌─────────────────────────────────────────────────────────────────────┐
│                    REPAIR BAY FIFO CYCLE                            │
│                "First-In, First-Out" System                         │
└─────────────────────────────────────────────────────────────────────┘


STATE 0: INITIAL SETUP
═══════════════════════════════════════════════════════════════════════

    🎮 PLAYER BENCH (6 Robots Ready)
    ┌────┬────┬────┬────┬────┬────┐
    │ A  │ B  │ C  │ D  │ E  │ F  │  ← All ready for deployment
    └────┴────┴────┴────┴────┴────┘

    🔧 REPAIR BAY (Empty)
    ┌─────────┬─────────┐
    │   🔧    │   🔧    │  ← Both slots show wrench icons
    └─────────┴─────────┘
     Slot 1    Slot 2


═══════════════════════════════════════════════════════════════════════
STATE 1: FIRST DEACTIVATION (Robot A Defeated)
═══════════════════════════════════════════════════════════════════════

    💥 Robot A loses battle → Sent to Repair Bay

    🎮 PLAYER BENCH (5 Robots, 1 Empty Slot)
    ┌────┬────┬────┬────┬────┬────┐
    │ B  │ C  │ D  │ E  │ F  │    │  ← Robot A removed
    └────┴────┴────┴────┴────┴────┘

    🔧 REPAIR BAY (1/2 Occupied)
    ┌─────────┬─────────┐
    │   🤖A   │   🔧    │  ← Robot A in Slot 1 (grayscale, pulsing)
    └─────────┴─────────┘
     Slot 1    Slot 2
    (occupied) (empty)

    📊 Queue State: [A]
    ⏱️  A's Time: T1 (timestamp when defeated)


═══════════════════════════════════════════════════════════════════════
STATE 2: SECOND DEACTIVATION (Robot B Defeated)
═══════════════════════════════════════════════════════════════════════

    💥 Robot B loses battle → Sent to Repair Bay

    🎮 PLAYER BENCH (4 Robots, 2 Empty Slots)
    ┌────┬────┬────┬────┬────┬────┐
    │ C  │ D  │ E  │ F  │    │    │  ← Robots A & B removed
    └────┴────┴────┴────┴────┴────┘

    🔧 REPAIR BAY (2/2 FULL - CAPACITY REACHED)
    ┌─────────┬─────────┐
    │   🤖A   │   🤖B   │  ← Both slots occupied (both pulsing)
    └─────────┴─────────┘
     Slot 1    Slot 2
    (oldest)  (newest)

    📊 Queue State: [A, B]
    ⏱️  A's Time: T1 (oldest - FIRST IN)
    ⏱️  B's Time: T2 (newest)


═══════════════════════════════════════════════════════════════════════
STATE 3: THIRD DEACTIVATION - OVERFLOW! (Robot C Defeated)
═══════════════════════════════════════════════════════════════════════

    💥 Robot C loses battle → Triggers overflow!

    ⚠️  OVERFLOW LOGIC ACTIVATES:
    ┌──────────────────────────────────────────────────────────────┐
    │ 1. Bay is full (2/2)                                         │
    │ 2. New robot (C) needs to enter                             │
    │ 3. Oldest robot (A) is FIRST IN → Must be FIRST OUT         │
    │ 4. Robot A pushed to bench with "Rebooting: 1"              │
    │ 5. Queue shifts: B moves to Slot 1, C enters Slot 2         │
    └──────────────────────────────────────────────────────────────┘

    🎮 PLAYER BENCH (3 Robots + 1 Rebooting + 2 Empty)
    ┌────┬────┬────┬────┬────┬─────┐
    │ D  │ E  │ F  │    │    │ A⏳ │  ← Robot A returned (Rebooting)
    └────┴────┴────┴────┴────┴─────┘
                            ↑
                     Orange badge "⏳ Rebooting"
                     Grayed out (cannot deploy)

    🔧 REPAIR BAY (2/2 Still Full, But Rotated)
    ┌─────────┬─────────┐
    │   🤖B   │   🤖C   │  ← B shifted to Slot 1, C entered Slot 2
    └─────────┴─────────┘
     Slot 1    Slot 2
    (oldest)  (newest)

    📊 Queue State: [B, C]
    ⏱️  B's Time: T2 (now oldest - was in Slot 2, now in Slot 1)
    ⏱️  C's Time: T3 (newest)

    🔒 Rebooting Status:
    └─ Robot A: Wait 1 turn (cannot deploy until timer expires)


═══════════════════════════════════════════════════════════════════════
STATE 4: PLAYER TRIES TO DEPLOY ROBOT A (BLOCKED)
═══════════════════════════════════════════════════════════════════════

    🖱️  User clicks Robot A on bench

    ❌ DEPLOYMENT BLOCKED:
    ┌──────────────────────────────────────────────────────────────┐
    │ ⏳ Cannot deploy robot_001 - robot is rebooting (Wait 1)    │
    │ ⏳ Robot A is rebooting - cannot deploy this turn           │
    └──────────────────────────────────────────────────────────────┘

    No movement highlights appear
    Robot A remains on bench (grayed out)


═══════════════════════════════════════════════════════════════════════
STATE 5: TURN PASSES (Timer Decrements)
═══════════════════════════════════════════════════════════════════════

    🔄 Player ends turn
    🤖 Opponent's turn completes
    🎮 Player's new turn starts

    ⏳ REBOOTING TIMER PROCESSING:
    ┌──────────────────────────────────────────────────────────────┐
    │ Processing Rebooting status for player...                   │
    │   robot_001: Rebooting timer 1 → 0 (CLEARED)               │
    │ ✅ robot_001 is now ready for action                        │
    └──────────────────────────────────────────────────────────────┘

    🎮 PLAYER BENCH (Robot A Now Ready!)
    ┌────┬────┬────┬────┬────┬────┐
    │ D  │ E  │ F  │    │    │ A✅ │  ← Robot A fully restored
    └────┴────┴────┴────┴────┴────┘
                            ↑
                    No more badge
                    Full color (can deploy normally)

    🔧 REPAIR BAY (Unchanged)
    ┌─────────┬─────────┐
    │   🤖B   │   🤖C   │
    └─────────┴─────────┘

    🔒 Rebooting Status: (none)


═══════════════════════════════════════════════════════════════════════
STATE 6: FOURTH DEACTIVATION - CYCLE REPEATS (Robot D Defeated)
═══════════════════════════════════════════════════════════════════════

    💥 Robot D loses battle → Overflow again!

    ⚠️  OVERFLOW LOGIC ACTIVATES AGAIN:
    └─ Robot B (oldest) is pushed to bench with "Rebooting: 1"
    └─ C shifts to Slot 1, D enters Slot 2

    🎮 PLAYER BENCH
    ┌────┬────┬────┬────┬─────┬─────┐
    │ E  │ F  │    │ A  │ B⏳ │     │  ← Robot B now rebooting
    └────┴────┴────┴────┴─────┴─────┘

    🔧 REPAIR BAY
    ┌─────────┬─────────┐
    │   🤖C   │   🤖D   │  ← C shifted left, D entered
    └─────────┴─────────┘
     Slot 1    Slot 2

    📊 Queue State: [C, D]
    🔒 Rebooting Status: Robot B: Wait 1


═══════════════════════════════════════════════════════════════════════
STRATEGIC IMPLICATIONS
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                         KEY INSIGHTS                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ 1. TIMING CONTROL                                                   │
│    └─ Force opponent's specific robot back by "clogging" their bay │
│    └─ Control WHICH robot comes back and WHEN                      │
│                                                                     │
│ 2. TEMPORARY DISADVANTAGE                                           │
│    └─ Returned robots can't deploy for 1 turn (strategic delay)    │
│    └─ Creates vulnerability window for opponent to exploit         │
│                                                                     │
│ 3. QUEUE MANIPULATION                                               │
│    └─ Defeat robots in specific order to control return sequence   │
│    └─ Force opponent's strongest robot to reboot at critical time  │
│                                                                     │
│ 4. NO PERMANENT LOSS                                                │
│    └─ All defeated robots eventually return to play                │
│    └─ Game continues even after multiple defeats                   │
│                                                                     │
│ 5. CAPACITY MATTERS                                                 │
│    └─ Only 2 slots = fast rotation through Repair Bay              │
│    └─ Can't "store" defeated robots indefinitely                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
BATTLE MUSIC FLOW
═══════════════════════════════════════════════════════════════════════

    🎵 Music: Duel1.mp3

    ┌─────────────────────┐
    │   Battle Initiated  │  ← Robots adjacent, player clicks enemy
    └──────────┬──────────┘
               │
               ↓
    ┌─────────────────────┐
    │  Battle Modal Opens │  ← Shows robot matchup
    └──────────┬──────────┘
               │
               ↓
    ┌─────────────────────┐
    │  🎵 MUSIC STARTS    │  ← Auto-play from beginning, looping
    └──────────┬──────────┘
               │
               ↓
    ┌─────────────────────────────────┐
    │  User chooses action:           │
    │  • Click "⚔️ Attack!"           │
    │  • Click "↩️ Cancel"            │
    └──────────┬─────────┬────────────┘
               │         │
        Attack │         │ Cancel
               ↓         ↓
    ┌──────────────┐  ┌──────────────┐
    │ Battle       │  │ Modal        │
    │ Resolves     │  │ Closes       │
    └──────┬───────┘  └──────┬───────┘
           │                 │
           │                 │
           └────────┬────────┘
                    ↓
           ┌─────────────────┐
           │ 🎵 MUSIC STOPS  │  ← Pause + reset to start
           └─────────────────┘


═══════════════════════════════════════════════════════════════════════
CODE FLOW DIAGRAM
═══════════════════════════════════════════════════════════════════════

    Robot Defeated in Battle
            ↓
    knockOutRobot(pointId)
            ↓
    ┌───────────────────────────────┐
    │ Remove visual from board      │
    │ Remove data from point        │
    └───────────┬───────────────────┘
                ↓
    sendToRepairBay(robotId, team)
                ↓
    ┌───────────────────────────────┐
    │ Push robot to queue array     │
    └───────────┬───────────────────┘
                ↓
         Is queue.length > 2?
           ↓YES        NO↓
    ┌──────────┐   ┌──────────────────────┐
    │ OVERFLOW │   │ Update visual display│
    └────┬─────┘   └──────────────────────┘
         ↓
    Shift oldest from queue
         ↓
    returnToBench(robotId, team, addRebootingStatus=true)
         ↓
    ┌────────────────────────────┐
    │ Find empty bench slot      │
    │ Place robot on bench       │
    │ Add rebootingRobots[id]=1  │
    └──────────┬─────────────────┘
               ↓
    updateBenchDisplay(team)
         ↓
    ┌──────────────────────────────────┐
    │ Render robot with badge          │
    │ Apply grayscale + opacity        │
    │ Make non-clickable               │
    └──────────────────────────────────┘

    --- TURN PASSES ---

    onPlayerTurnStart() / onAITurnStart()
            ↓
    processRebootingStatus(team)
            ↓
    ┌──────────────────────────────────────┐
    │ For each rebooting robot:            │
    │   Decrement timer (1 → 0)            │
    │   If timer = 0: Remove from map      │
    └──────────┬───────────────────────────┘
               ↓
    updateBenchDisplay(team)
            ↓
    ┌──────────────────────────────────┐
    │ Robot rendered normally          │
    │ No badge, full color, clickable  │
    └──────────────────────────────────┘

    --- DEPLOYMENT ---

    User clicks robot on bench
            ↓
    selectRobotForDeployment(robotId, team, index)
            ↓
    isRobotRebooting(robotId)?
         ↓YES         NO↓
    ┌─────────┐   ┌───────────────────────┐
    │ BLOCKED │   │ Show deployment       │
    │ Return  │   │ movement highlights   │
    └─────────┘   └───────────────────────┘


═══════════════════════════════════════════════════════════════════════
ARRAY STATE TRANSITIONS (Technical)
═══════════════════════════════════════════════════════════════════════

    Initial:
    repairBay = []

    After Robot A defeated:
    repairBay = [{robotId: 'robot_001', timestamp: T1}]
                 ↑ Index 0 (Slot 1)

    After Robot B defeated:
    repairBay = [{robotId: 'robot_001', timestamp: T1}, 
                 {robotId: 'robot_002', timestamp: T2}]
                 ↑ Index 0 (Slot 1)               ↑ Index 1 (Slot 2)

    Robot C defeated → OVERFLOW:
    Step 1: Push to array
    repairBay = [{robotId: 'robot_001', timestamp: T1}, 
                 {robotId: 'robot_002', timestamp: T2},
                 {robotId: 'robot_003', timestamp: T3}]

    Step 2: Shift (remove index 0)
    shifted = {robotId: 'robot_001', timestamp: T1}
    repairBay = [{robotId: 'robot_002', timestamp: T2},
                 {robotId: 'robot_003', timestamp: T3}]
                 ↑ Index 0 (Slot 1 - was Slot 2)   ↑ Index 1 (Slot 2 - new)

    Step 3: Return shifted robot to bench
    returnToBench('robot_001', team, true)
    rebootingRobots = {robot_001: 1}


═══════════════════════════════════════════════════════════════════════

✅ SYSTEM STATUS: FULLY OPERATIONAL
🎵 BATTLE MUSIC: INTEGRATED (Duel1.mp3)
🔧 REPAIR BAY: FIFO CYCLE COMPLETE
⏳ REBOOTING TIMER: FUNCTIONAL
🎨 VISUAL FEEDBACK: COMPLETE

═══════════════════════════════════════════════════════════════════════
