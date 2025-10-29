# Dashboard Overview 📊

**[Robot floats to top-left of screen, near overall score]**

**Robot Speech (TTS):** *"Alright! Now let me show you around your dashboard. This is where you'll spend most of your time, so let's make sure you understand everything!"*

**Speech Bubble:** "Let's explore your dashboard! 🏠"

---

## Your Home at a Glance

The **Dashboard** is your command center - it shows you everything about your home's cleanliness at once!

### Overall Score (Top Center)

**[Robot moves to hover near the overall score display]**
**[Overall score gets highlighted with pulsing yellow border]**

**Robot Speech (TTS):** *"See this big number at the top? This is your overall home cleanliness score! When it's high, I'm happy. When it drops, I get a little worried. Right now, let's see what your score is!"*

**Speech Bubble:** "This is your overall score! 📊"

```
🏠 Overall Score: 85%
      ▲
      └─── [Animated arrow pointing from robot]
```

**What it means:**
- **90-100%**: Sparkling clean! Your robot is happy 😊
- **75-89%**: Pretty good! Just a few things need attention
- **50-74%**: Getting dusty... Time to tackle some chores
- **Below 50%**: Your robot looks concerned 😟

**How it's calculated:**
- Average of all your category scores
- Updates automatically as tasks decay or get completed
- Group categories (like SWEEP/MOP) don't affect this score

---

### Save File Display

```
📁 Current Save: Default Save
```

**What it does:**
- Shows which save file you're currently using
- Click to access save file management
- Useful if you manage multiple homes or want to try different setups

---

### Category Cards

Each card shows a room or area of your home:

```
┌─────────────────────────┐
│  Kitchen        85% 🍽️  │
│  ████████████░░░        │
│  🐰 (dust bunny)        │
└─────────────────────────┘
```

**Card Elements:**
1. **Category Name** - The room/area name
2. **Score Percentage** - How clean this category is
3. **Progress Bar** - Visual representation
   - 🟢 Green (90-100%): Excellent!
   - 🟡 Yellow (75-89%): Good
   - 🟠 Orange (50-74%): Needs attention
   - 🔴 Red (Below 50%): Urgent!
4. **Dust Bunnies** 🐰 - Appear when score drops below 90%
   - More dust bunnies = lower score
   - They hop around to grab your attention!

**Card Colors:**
- **Normal Categories**: White/gradient background
- **Group Categories**: Blue glow with "GROUP" badge
- **Self Care**: Red/pink gradient (special category)

---

### Self Care Card (Special)

```
┌─────────────────────────┐
│  💖 Self Care           │
│  Track your well-being  │
│  (doesn't affect score) │
└─────────────────────────┘
```

**Unique features:**
- Red/pink styling to stand out
- Doesn't contribute to overall home score
- Tracks personal care tasks separately
- Optional - can be enabled/disabled in settings

---

### Top Navigation

**Robot Icon** 🤖
- Click to select different robot companions
- Shows your current robot's face
- Access robot selection modal

**Settings Gear** ⚙️
- App settings and preferences
- Save file management
- Tutorial restart option
- Voice settings

**Back Button** ←
- Returns to dashboard from category view
- Always accessible

---

### Interacting with the Dashboard

**Click a Category Card:**
- Opens that category's task list
- Shows individual tasks and their freshness
- Access task management tools

**What happens when you enter a category:**
- Dashboard fades out
- Category view slides in
- See all tasks in that room/area
- Complete, snooze, or edit tasks

---

### Visual Indicators

**Dust Effect Levels:**
- **No Dust** (90-100%): Clean and clear!
- **Light Dust** (70-89%): 1-2 dust bunnies
- **Medium Dust** (50-69%): 3 dust bunnies hopping around
- **Heavy Dust** (30-49%): 4 dust bunnies
- **Very Dirty** (Below 30%): 5 dust bunnies everywhere!

**Card Animations:**
- Hover effect: Slight lift and shadow
- Click effect: Brief scale down
- Dust bunnies: Gentle hopping animation

---

### Dashboard Updates

The dashboard automatically updates when:
- ✅ You complete a task
- ⏰ Time passes (freshness decay)
- 💤 Tasks get snoozed/unsnoozed
- ➕ New categories or tasks are added
- 🗑️ Categories or tasks are deleted

**Update Frequency:**
- Freshness recalculates every 60 seconds
- Scores update immediately on task completion
- Dust bunnies appear/disappear based on score changes

---

### Try It Out!

Now that you understand the dashboard, let's create your first category in the next step!

**Things to notice:**
- Your robot's expression matches your overall score
- Categories are sorted by score (lowest/urgent first)
- The overall score at the top summarizes everything

---

**Tutorial Progress:** Step 2 of 24

**Previous:** Welcome to UpKeep  
**Next:** Creating Your First Category

---

## Technical Details (For Implementation)

### UI Elements to Highlight
1. Overall score display (#overallScore)
2. Save file display (#saveFileDisplay)
3. Category card structure (.category-card)
4. Dust bunny animations (.dust-bunny)
5. Robot mascot face
6. Settings button
7. Self Care card (if enabled)

### Code References
- `renderDashboard()` - Main dashboard rendering
- `calculateOverallScore()` - Overall score calculation
- `calculateCategoryScore()` - Individual category scores
- `updateDecay()` - Freshness decay updates (runs every 60s)

### Tutorial Overlay
- Highlight entire dashboard first
- Then highlight individual elements:
  1. Overall score (pulse effect)
  2. One category card (with pointer)
  3. Dust bunnies (if visible)
  4. Robot face
  5. Settings button

### Interactive Element
- Have user click on a category card to proceed
- Detect click event and transition to next tutorial step
