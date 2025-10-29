# Category Scores Explained 📊

**Robot Speech (TTS):** *"Let's break down exactly how scores are calculated! Understanding this helps you prioritize and maintain your home effectively!"*

---

## Category Score

**Formula:** Average freshness of all tasks in the category

```javascript
categoryScore = (sum of all task freshness) / (number of tasks)
```

**Example:**
```
Kitchen Category:
  Wash dishes: 80%
  Wipe counters: 60%
  Sweep floor: 70%
  
Score = (80 + 60 + 70) / 3 = 70%
```

---

## Overall Home Score

**Formula:** Average of all regular (non-group) category scores

```javascript
overallScore = (sum of category scores) / (number of regular categories)
```

**Example:**
```
Kitchen: 70%
Bathroom: 85%
Bedroom: 90%
Living Room: 75%

Overall = (70 + 85 + 90 + 75) / 4 = 80%
```

**Excluded from Overall:**
- ❌ Group categories (TRASH, SWEEP, MOP)
- ❌ Self-Care category
- ✅ Only regular room categories count

---

## Score Color Coding

**90-100%:** 🟢 Green - Excellent!  
**75-89%:** 🟡 Yellow - Good  
**50-74%:** 🟠 Orange - Needs attention  
**0-49%:** 🔴 Red - Urgent!

---

## Factors That Affect Scores

**Increase Score:**
- ✅ Complete tasks (freshness → 100%)
- ⏰ Keep up with maintenance
- 💤 Strategic snoozing (prevents decay)

**Decrease Score:**
- ⏳ Time passing (decay)
- ❌ Neglecting urgent tasks
- 📉 Long decay times mean slower recovery

---

## Empty Categories

**No tasks:** Shows 0% or "No tasks"

**Why:** Cannot calculate average with no data

**Fix:** Add at least one task

---

## Score Strategy

**Boost Overall Score:**
1. Focus on lowest category first
2. Complete multiple tasks in red categories
3. Maintain high-score categories
4. Balance across all rooms

**Maintain High Score:**
- Complete tasks before 0%
- Use auto-snooze effectively
- Set realistic decay times
- Regular maintenance schedule

---

**Tutorial Progress:** Step 22 of 24  
**Previous:** Bulk Completion | **Next:** Dust Bunnies
