# Task Completion Reward System Design 🔩

**Created:** October 31, 2025  
**Status:** Design Phase - Awaiting Implementation

---

## 🎯 Overview

Design for rewarding users with **bolts** (🔩 screw/tool bolts - hardware fasteners) for completing individual tasks, with anti-cheat measures to prevent exploitation.

**⚠️ CRITICAL ICONOGRAPHY:**
- **Bolts = 🔩 Screw/Tool Bolts** (hardware fasteners)
- **NOT ⚡ Lightning Bolts**
- **Custom Image:** `Imag/Achivments/Images/Finished Images/Bolt.png`
- **Already Implemented:** Currency display, store display
- Fits robot/mechanical theme
- The ⚡ emoji is used in this doc for typing convenience only

---

## 📊 Current State Analysis

### Existing Bolt Sources:
```
Daily Missions:
- Check-in: 10🔩
- Complete 2 tasks: 15🔩
- Complete 4 tasks: 25🔩
Total: 50🔩/day

Self-Care Tasks:
- Each task: 2🔩 (once per day)
- Complete group: 15🔩 bonus
Example group total: 25🔩/day

Current Maximum: ~75🔩/day
```

### The Problem:
- ❌ NO rewards for individual regular task completion
- ❌ User completes 84 exhausting tasks → 0🔩 earned
- ❌ Only missions give rewards
- ❌ Feels unrewarding for big efforts
- ❌ No immediate feedback for task completion

---

## 💡 Proposed Solution: Hybrid Reward System

### System Design: Small Direct Rewards + Mission Focus

**Every regular task completion earns small bolt reward:**

```javascript
Task Reward Formula (Simple):
- Small tasks (≤1 day decay): 1🔩
- Medium tasks (2-7 days decay): 2🔩
- Large tasks (8+ days decay): 3🔩

No freshness bonus (prevents gaming)
No streak multiplier (keeps simple)
```

### Why This Works:
1. ✅ **Immediate feedback** - Feels good to get bolts instantly
2. ✅ **Not economy-breaking** - 1-3🔩 is small enough
3. ✅ **Missions stay primary** - 50🔩 from missions >> 15-30🔩 from tasks
4. ✅ **Simple to understand** - Clear, predictable rewards
5. ✅ **Hard to exploit** - Low reward per spam attempt

### Example Daily Earnings:
```
Complete 10 tasks: 15-30🔩 (task rewards)
Complete missions: 50🔩 (mission rewards)
Self-care group: 25🔩 (self-care rewards)
───────────────────────────────────
Total: 90-105🔩/day (vs current 75🔩/day)
Increase: +20% (+15-30🔩/day)
```

---

## 🛡️ Anti-Cheat System

### The Cheating Problem

**Easy Exploits Without Protection:**
1. Complete task → Get bolts → Uncomplete → Complete again → Infinite bolts
2. Set 1-minute decay → Complete 100 times/hour → Infinite bolts
3. Create fake tasks → Complete → Delete → Repeat
4. Complete task that doesn't actually need doing

### Recommended Solution: Freshness-Based Eligibility

**Core Rule: Only earn bolts if task was actually decayed**

```javascript
Bolt Reward Eligibility:
- Task must be ≤75% fresh to earn bolts
- If >75% fresh: No reward (completed too soon)

When completing task:
IF task.freshness <= 75%:
  → Earn bolts (1-3🔩 based on decay time)
  → Reset freshness to 100%
  → Show: "Task completed! +2🔩"
ELSE:
  → No bolts earned
  → Reset freshness to 100%
  → Show: "Task completed! (Wasn't due yet - no bolts)"
```

### Why This Works:

**Example: "Vacuum living room" (7-day decay)**
```
Day 1, 8am: Complete at 0% fresh
→ ✅ Earn 2🔩 (below 75% threshold)
→ Reset to 100%

Day 1, 2pm: Try to complete again at 100% fresh
→ ❌ No bolts (above 75% threshold)
→ Reset to 100% (no change)
→ Message: "Task completed! (Wasn't due yet - no bolts)"

Day 4: Task decayed to 57% fresh
→ ✅ Earn 2🔩 (below 75% threshold)
→ Reset to 100%
```

### Anti-Cheat Benefits:
- ✅ **Prevents spam** - Can't complete at 100% for bolts
- ✅ **Prevents fake tasks** - Must wait for actual decay
- ✅ **Self-regulating** - Tied to game mechanic (freshness)
- ✅ **Logical** - Only rewards when task actually needed
- ✅ **No arbitrary timers** - Uses existing freshness system
- ✅ **Allows flexibility** - Can complete early (if below 75%)

### What It Prevents:
```
Spam Attempt:
1. Complete task → 2🔩 (at 0% fresh)
2. Complete again → 0🔩 (at 100% fresh)
3. Complete again → 0🔩 (at 100% fresh)
4. Complete again → 0🔩 (at 100% fresh)
...repeat 100 times...
Result: Only 2🔩 earned total (can't spam)
```

---

## 📈 Economy Impact Analysis

### Time to Solar Panels (1000🔩):
```
Current System:
75🔩/day → 13.3 days to Solar Panels

New System:
92🔩/day → 10.9 days to Solar Panels

Difference: 2.4 days faster
Impact: Acceptable (not game-breaking)
```

### Long-term Balance:
```
Month 1 (Current):
- 75🔩/day × 30 days = 2,250🔩
- Can buy: Solar Panels (1000🔩) + 1 robot (200🔩) + fuel

Month 1 (New):
- 92🔩/day × 30 days = 2,760🔩
- Can buy: Solar Panels (1000🔩) + 1-2 robots (400🔩) + fuel

Difference: +510🔩/month (+23% increase)
Impact: Moderate increase, still requires effort
```

---

## 🎨 Implementation Details

### Code Structure:

```javascript
// In chore-system.js

completeTask(taskId) {
  const task = this.findTask(taskId);
  if (!task) return;
  
  // Calculate bolt reward
  const reward = this.calculateTaskReward(task);
  
  // Update task
  task.lastCompleted = Date.now();
  task.freshness = 100;
  
  // Award bolts if eligible
  if (reward.bolts > 0) {
    this.data.currency += reward.bolts;
    this.showRewardAnimation(task, reward.bolts);
  }
  
  // Update UI
  this.updateTaskCard(task);
  this.updateCurrencyDisplay();
  
  // Show message
  this.showMessage(reward.message);
}

calculateTaskReward(task) {
  // Check eligibility (freshness-based anti-cheat)
  if (task.freshness > 75) {
    return {
      bolts: 0,
      message: "Task completed! (Wasn't due yet - no bolts)"
    };
  }
  
  // Calculate base reward based on decay time
  let bolts = 0;
  const oneDayMs = 86400000;
  const oneWeekMs = 604800000;
  
  if (task.decayMs <= oneDayMs) {
    bolts = 1; // Small tasks
  } else if (task.decayMs <= oneWeekMs) {
    bolts = 2; // Medium tasks
  } else {
    bolts = 3; // Large tasks
  }
  
  return {
    bolts: bolts,
    message: `Task completed! +${bolts}🔩`
  };
}

showRewardAnimation(task, bolts) {
  // Visual feedback
  const taskCard = document.querySelector(`[data-task-id="${task.id}"]`);
  
  // Create floating reward animation with actual bolt image
  const reward = document.createElement('div');
  reward.className = 'bolt-reward-float';
  
  // Use actual Bolt.png image
  const boltImg = document.createElement('img');
  boltImg.src = 'Imag/Achivments/Images/Finished Images/Bolt.png';
  boltImg.className = 'bolt-reward-icon';
  
  const boltText = document.createElement('span');
  boltText.textContent = `+${bolts}`;
  
  reward.appendChild(boltText);
  reward.appendChild(boltImg);
  taskCard.appendChild(reward);
  
  // Animate up and fade out
  setTimeout(() => reward.remove(), 1000);
  
  // Play sound effect
  this.playSoundEffect('bolt-earned');
  
  // Particle effect (optional - using Bolt.png)
  this.createBoltParticles(taskCard);
}
```

### UI/UX Elements:

**Task Card Enhancement:**
```html
<div class="task-card">
  <div class="task-info">
    <h3>Vacuum living room</h3>
    <p>Freshness: 45%</p>
    <p class="bolt-preview">
      <img src="Imag/Achivments/Images/Finished Images/Bolt.png" class="bolt-icon-small">
      Reward: 2 bolts (if completed now)
    </p>
  </div>
  <button class="complete-btn">✓</button>
</div>
```

**Completion Animation:**
```
1. User clicks ✓
2. Checkmark appears
3. Freshness bar fills to 100%
4. "+2" with Bolt.png image floats up from task card
5. Currency counter increases with animation (using Bolt.png)
6. Sound effect plays
7. Optional: Bolt.png particles scatter
```

**Transparency Display:**
```
Task card shows:
- Current freshness: 45%
- Bolt.png icon + "Reward: 2 bolts" ✓
- Or: "No reward yet (too fresh)" ⏰

User always knows if they'll get bolts
Uses actual Bolt.png image for consistency
```

---

## 🎯 Design Decisions Summary

### ✅ Chosen Approach:
- **Reward System:** Hybrid (small direct + missions primary)
- **Reward Amount:** 1-3🔩 based on decay time
- **Anti-Cheat:** Freshness-based (≤75% threshold)
- **Economy Impact:** +20% daily earnings (acceptable)

### ❌ Rejected Alternatives:
- **Large direct rewards** - Would break economy
- **XP/Level system** - Too complex, delayed gratification
- **Time-based cooldowns** - Arbitrary, less intuitive
- **Daily caps** - Feels punishing
- **Freshness bonuses** - Encourages gaming system

---

## 🔮 Future Considerations

### Potential Enhancements (Not Initial Implementation):
1. **Streak multipliers** - 7+ day streak = +10% task bolts
2. **Urgency bonuses** - RED tasks (0-25%) = +50% bolts
3. **Category bonuses** - Complete all tasks in category = bonus
4. **Achievement rewards** - One-time bolts for milestones
5. **Weekly challenges** - Bonus bolts for specific goals

### Questions to Answer Later:
- Should self-care use same system? (currently different)
- Should linked tasks share rewards or individual?
- Should group category completion give bonus?
- Should there be diminishing returns for same task?

---

## 📋 Implementation Checklist

### Phase 1: Core System
- [ ] Add `calculateTaskReward()` function
- [ ] Modify `completeTask()` to award bolts
- [ ] Add freshness check (≤75% threshold)
- [ ] Update currency on task completion
- [ ] Test anti-cheat (spam prevention)

### Phase 2: UI/UX
- [ ] Add bolt preview to task cards
- [ ] Create "+X🔩" floating animation
- [ ] Add sound effect for bolt earning
- [ ] Update currency display animation
- [ ] Add "no reward" message for >75% fresh

### Phase 3: Polish
- [ ] Add particle effects (optional)
- [ ] Create tutorial section explaining system
- [ ] Add to tips & tricks documentation
- [ ] Balance testing (economy impact)
- [ ] User testing (feels rewarding?)

### Phase 4: Documentation
- [ ] Update PROJECT-MASTER-GUIDE.md
- [ ] Add to tutorial files
- [ ] Create user-facing explanation
- [ ] Document anti-cheat system

---

## 🎓 Tutorial Integration

### Where to Document:
1. **Tutorial Step:** Add new step "Earning Bolts from Tasks"
2. **Tips & Tricks:** Add to currency optimization section
3. **FAQ:** Address "Why didn't I get bolts?" question

### Key Messages for Users:
- ✅ "Complete tasks to earn bolts!"
- ✅ "Bigger tasks = more bolts (1-3🔩)"
- ✅ "Tasks must be decayed to earn bolts"
- ✅ "Can't spam the same task for infinite bolts"
- ✅ "Missions still give the most bolts"

---

## 🔧 Technical Notes

### Data Structure Changes:
```javascript
// No new data fields needed!
// Uses existing:
- task.freshness (already tracked)
- task.decayMs (already tracked)
- this.data.currency (already tracked)

// Only adds:
- Calculation logic
- UI feedback
```

### Performance Impact:
- Minimal (simple calculation on task completion)
- No new intervals or timers
- Uses existing freshness system
- Lightweight animations

### Compatibility:
- Works with existing save system
- No migration needed
- Backwards compatible
- Won't break existing features

---

**Status:** Ready for implementation pending final approval

**Next Steps:**
1. Review and approve design
2. Implement Phase 1 (core system)
3. Test anti-cheat effectiveness
4. Add UI/UX (Phase 2)
5. User testing and balance adjustments
