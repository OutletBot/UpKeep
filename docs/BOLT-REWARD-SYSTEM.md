# 🔩 Bolt Reward System Design
**COLLECTION SCALE: 100-150 ROBOTS** 🤖

## Current State (Before Implementation)
- **Self-Care Tasks**: 2 bolts per task ✅
- **Self-Care Group Completion**: 15 bolts bonus ✅
- **Regular Tasks**: No rewards ❌
- **Category Completion**: No rewards ❌
- **Streak Milestones**: No rewards ❌

---

## 💰 Redesigned Bolt Economy (Collection-Focused)

### 1. Regular Task Completion
**Base Reward**: INCREASED for collection progression

| Decay Time | Difficulty | Bolt Reward | Example Tasks |
|------------|-----------|-------------|---------------|
| ≤ 24 hours | Daily | **10 bolts** | Make bed, brush teeth, feed pets |
| 2-6 days | Weekly | **25 bolts** | Vacuum, mop, laundry |
| 1-4 weeks | Bi-weekly | **50 bolts** | Deep clean bathroom, organize closet |
| 1+ months | Monthly | **100 bolts** | Change air filters, clean fridge |
| 3+ months | Seasonal | **200 bolts** | Clean gutters, rotate mattress |

**Logic**: Higher rewards to support collecting 100+ robots over time

---

### 2. Category 100% Completion Bonus
When ALL tasks in a category reach 100% freshness:

| Category Type | Bonus Reward | Notes |
|--------------|--------------|-------|
| **Small Category** (1-5 tasks) | **100 bolts** | Kitchen, Bathroom |
| **Medium Category** (6-10 tasks) | **200 bolts** | Bedroom, Living Room |
| **Large Category** (11+ tasks) | **350 bolts** | Whole House, Deep Clean |
| **Group Categories** | **250 bolts** | Sweep/Mop/Vacuum combined |

**Special**: First time completing a category = **2x bonus** (one-time achievement)

---

### 3. Streak Milestone Rewards
Reward consistency and building habits:

| Streak Days | Bolt Reward | Celebration |
|-------------|-------------|-------------|
| 3 days | **50 bolts** | 🔥 Getting started! |
| 5 days | **100 bolts** | 🔥 Building momentum! |
| 7 days | **150 bolts** | 🔥 One week strong! |
| 10 days | **250 bolts** | 🔥 Double digits! |
| 15 days | **400 bolts** | 🔥 Halfway to a month! |
| 20 days | **600 bolts** | 🔥 Unstoppable! |
| 30 days | **1000 bolts** | 🏆 ONE MONTH CHAMPION! |
| 50 days | **2000 bolts** | 🏆 LEGENDARY STREAK! |
| 100 days | **5000 bolts** | 🏆 CENTURY CLUB! |

---

### 4. Self-Care System (UPDATED)
- **Per Task**: **10 bolts** (increased from 2) ⬆️
- **Group Completion**: **75 bolts** (increased from 15) ⬆️
- **Matches regular task economy**

---

### 5. Special Achievements (Future)
Ideas for additional rewards:

| Achievement | Bolt Reward | Trigger |
|-------------|-------------|---------|
| **Speed Demon** | 150 bolts | Complete 5 tasks in 5 minutes |
| **Clean Sweep** | 500 bolts | Complete all categories in one day |
| **Early Bird** | 100 bolts | Complete 3 tasks before 9 AM |
| **Night Owl** | 100 bolts | Complete 3 tasks after 9 PM |
| **Perfectionist** | 1000 bolts | Keep all tasks at 100% for 7 days |
| **Collector** | 2500 bolts | Own 25 robots |
| **Master Collector** | 10000 bolts | Own 100 robots |

---

## 🎯 Economy Balance (Collection Scale)

### Average Daily Earnings (Estimated)
- **Light Day** (2-3 daily tasks): **20-30 bolts**
- **Normal Day** (5-7 mixed tasks): **100-200 bolts**
- **Heavy Day** (10+ tasks): **300-500 bolts**
- **With Streak Bonus** (every 3-7 days): **+50-150 bolts**
- **With Category Completion**: **+100-350 bolts**

### Robot Store Pricing Structure (100-150 Robots)

#### **Tier 1: Common Robots** (30-40 robots)
- **Price Range**: 100-500 bolts
- **Acquisition Time**: 1-5 days of light work
- **Examples**: Basic cleaning bots, starter companions

#### **Tier 2: Uncommon Robots** (25-35 robots)
- **Price Range**: 600-1,500 bolts
- **Acquisition Time**: 3-7 days of normal work
- **Examples**: Specialized task bots, themed companions

#### **Tier 3: Rare Robots** (20-30 robots)
- **Price Range**: 1,600-3,500 bolts
- **Acquisition Time**: 1-2 weeks of consistent work
- **Examples**: Advanced bots, unique designs

#### **Tier 4: Epic Robots** (15-20 robots)
- **Price Range**: 4,000-8,000 bolts
- **Acquisition Time**: 2-4 weeks of dedicated work
- **Examples**: Premium companions, special abilities

#### **Tier 5: Legendary Robots** (10-15 robots)
- **Price Range**: 10,000-25,000 bolts
- **Acquisition Time**: 1-3 months of consistent play
- **Examples**: Ultra-rare, ultimate companions, prestige bots

#### **Tier 6: Mythic/Event Robots** (5-10 robots)
- **Price Range**: 30,000-100,000 bolts
- **Acquisition Time**: 3-6+ months of dedicated play
- **Examples**: Limited editions, event exclusives, endgame goals

### Balance Philosophy
- **Generous early game**: Common robots feel achievable quickly (dopamine hits!)
- **Satisfying mid-game**: Uncommon/Rare robots provide steady progression goals
- **Aspirational late game**: Epic/Legendary robots give long-term goals
- **Mythic endgame**: Ultra-rare robots for dedicated collectors
- **Encourage consistency**: Daily play is rewarded more than sporadic bursts
- **Reward big wins**: Category completion feels like a major achievement
- **Fair for all play styles**: Daily tasks and weekly tasks both valuable

---

## 🔧 Implementation Notes

### Where to Add Rewards

1. **Regular Task Completion** → `toggleTask()` function
   - Calculate reward based on `task.decayMs`
   - Award bolts after `task.freshness = 100`
   - Show bolt notification

2. **Category Completion** → After `toggleTask()` check
   - Check if all tasks in category are 100%
   - Award category bonus
   - Show special celebration

3. **Streak Milestones** → `checkStreakMilestone()` in gamification.js
   - Award bolts when milestone is reached
   - Show in milestone notification

### Visual Feedback
- Use existing `showBoltNotification(amount)` function
- Add bolt icon to milestone celebrations
- Show running total in notifications
- Animate currency display when bolts are earned

---

## 📊 Testing Checklist
- [ ] Complete daily task → Verify 3 bolts awarded
- [ ] Complete weekly task → Verify 5 bolts awarded
- [ ] Complete monthly task → Verify 12 bolts awarded
- [ ] Complete all tasks in small category → Verify 25 bolt bonus
- [ ] Complete all tasks in large category → Verify 60 bolt bonus
- [ ] Reach 3-day streak → Verify 10 bolt reward
- [ ] Reach 7-day streak → Verify 25 bolt reward
- [ ] Self-care task → Verify still 2 bolts (unchanged)
- [ ] Self-care group → Verify still 15 bolts (unchanged)

---

## 🎮 Future Enhancements
- **Daily Quests**: "Complete 5 tasks today for 50 bonus bolts"
- **Weekly Challenges**: "100% all categories for 200 bolts"
- **Multiplier Events**: "2x bolts this weekend!"
- **Lucky Drops**: Random chance for bonus bolts on task completion
- **Robot Companion Bonuses**: Equipped robot gives +10% bolts

---

*Created: November 1, 2025*
*Status: Design Complete - Ready for Implementation*
