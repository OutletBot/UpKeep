# Battery Configuration Guide

## Overview
Each robot has a unique battery depletion rate configured in their `chore-data.json` file. More expensive robots drain faster to balance gameplay.

## How It Works

### Battery Depletion Formula
```
Active Decay Rate = 100% / hoursToDeplete
Inactive Decay Rate = Active Decay Rate / 4

Example:
- Robot configured with hoursToDeplete: 50
- Active: 100 / 50 = 2% per hour
- Inactive: 2 / 4 = 0.5% per hour
```

### Active vs Inactive
- **Active Robot:** The currently selected companion helping with chores
- **Inactive Robots:** All other owned robots in your collection

**Result:** Inactive robots last 4x longer than active ones!

## Current Configuration

| Robot | Cost | Hours to Deplete | Active Drain | Inactive Drain |
|-------|------|------------------|--------------|----------------|
| Jack-o-Bot | 100 bolts | 60 hours | 1.67% /hr | 0.42% /hr |
| Clown Bot | 100 bolts | 60 hours | 1.67% /hr | 0.42% /hr |
| Freezy | 100 bolts | 60 hours | 1.67% /hr | 0.42% /hr |
| Pika-Bot | 120 bolts | 52 hours | 1.92% /hr | 0.48% /hr |
| Witch-Bot | 130 bolts | 48 hours | 2.08% /hr | 0.52% /hr |
| Mega Rocket Man | 150 bolts | 42 hours | 2.38% /hr | 0.60% /hr |
| Buzz Lite-Point-0 | 180 bolts | 36 hours | 2.78% /hr | 0.69% /hr |
| **Default Bot** | N/A | **Infinite** | 0% /hr | 0% /hr |

## How to Customize Battery Rate

### Step 1: Open Robot's chore-data.json
Navigate to: `robots/[robot-name]/chore-data.json`

Example: `robots/pika-bot/chore-data.json`

### Step 2: Add or Edit Battery Configuration
```json
{
  "id": "PIKABOT",
  "purchasable": true,
  "cost": 120,
  "description": "...",
  "imagePaths": { ... },
  "battery": {
    "hoursToDeplete": 52,
    "comment": "Time from 100% to 0% when active. Inactive robots drain 4x slower."
  }
}
```

### Step 3: Adjust hoursToDeplete Value
- **Lower value** = Faster drain (more challenging)
- **Higher value** = Slower drain (easier)

**Recommended Range:** 24-72 hours

### Examples

**Ultra Fast (Challenging):**
```json
"battery": {
  "hoursToDeplete": 24,
  "comment": "Drains in 1 day when active!"
}
```
- Active: 4.17% per hour
- Inactive: 1.04% per hour

**Moderate (Balanced):**
```json
"battery": {
  "hoursToDeplete": 48,
  "comment": "Drains in 2 days when active."
}
```
- Active: 2.08% per hour
- Inactive: 0.52% per hour

**Slow (Relaxed):**
```json
"battery": {
  "hoursToDeplete": 72,
  "comment": "Drains in 3 days when active."
}
```
- Active: 1.39% per hour
- Inactive: 0.35% per hour

## Design Philosophy

### Why More Expensive = Faster Drain?

1. **Balance:** Prevents expensive robots from being strictly better
2. **Engagement:** Creates meaningful choices between robots
3. **Economy:** Maintains value of cheaper robots
4. **Variety:** Encourages using different robots

### Recommended Pricing Tiers

| Price Range | Hours to Deplete | Reasoning |
|-------------|------------------|-----------|
| 100 bolts | 60 hours | Entry-level, forgiving |
| 120-130 bolts | 48-52 hours | Mid-tier, balanced |
| 150-180 bolts | 36-42 hours | Premium, challenging |

## Testing Your Changes

### Quick Test
1. Purchase or select the robot
2. Open browser console (F12)
3. Run: `app.data.robotBonds['ROBOTID'].durability.battery = 50`
4. Wait 1 hour (real time)
5. Open Robot Selection to see decay

### Fast Test (Simulate Time)
1. Open browser console
2. Run: `app.data.robotBonds['PIKABOT'].durability.lastUpdate = Date.now() - (1000 * 60 * 60 * 10)` 
   (simulates 10 hours passing)
3. Open Robot Selection modal
4. Check battery level

## Fallback Behavior

If a robot doesn't have a battery configuration:
- **Default:** 50 hours to deplete
- **Active:** 2% per hour
- **Inactive:** 0.5% per hour

This ensures the system never breaks even if config is missing.

## Special Cases

### Default Bot
- **Never drains battery**
- Always available as failsafe
- Configured in code, not in JSON

### Solar Panel Robots
- Battery locked at 100%
- No decay regardless of configuration
- Permanent once applied

## Future Customization Ideas

You can extend the battery config with:

```json
"battery": {
  "hoursToDeplete": 48,
  "taskDrain": 0.5,           // Custom task completion drain
  "battleDrain": 2,            // Custom battle drain
  "repairCostMultiplier": 0.5, // Custom repair cost (0.5 = 50% of purchase price)
  "comment": "Fully customizable battery behavior!"
}
```

## Tips for Balancing

1. **Playtest:** Test for 3-7 days with real usage
2. **Calculate:** Estimate daily task count × drain per task
3. **Adjust:** If robot breaks too often, increase hoursToDeplete
4. **Compare:** Ensure cheaper robots last noticeably longer

## Questions?

- How long should my robot last? **Aim for 2-4 days of active use**
- What if my robot drains too fast? **Increase hoursToDeplete**
- What if my robot never breaks? **Decrease hoursToDeplete**
- Can I make a robot immortal? **Set hoursToDeplete to 999999**

---

**Last Updated:** October 26, 2025
**System:** Upkeep Battery Management v2.0
