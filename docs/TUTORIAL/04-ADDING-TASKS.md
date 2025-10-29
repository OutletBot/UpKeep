# Adding Your First Task 📝

**[Robot floats to center of category view]**

**Robot Speech (TTS):** *"Great job creating your first category! Now comes the fun part - let's add a task to it! Tasks are the individual chores you want to track. I'll walk you through creating your very first one!"*

**Speech Bubble:** "Time to add a task! Let me show you how! ✨"

---

## What is a Task?

A **Task** is a specific chore or activity that needs to be done regularly. Each task has:
- 📝 **Name** - What the chore is
- ⏰ **Decay Time** - How long until it needs doing again
- 📊 **Freshness** - Current completion status (0-100%)

**Examples of Tasks:**
- "Wash dishes" (Decay: 1 day)
- "Clean toilet" (Decay: 1 week)
- "Vacuum living room" (Decay: 3 days)
- "Water plants" (Decay: 2 days)

---

## Let's Add Your First Task!

**[Robot moves to hover near "Add Task" button]**
**[Button gets highlighted with pulsing effect]**

**Robot Speech (TTS):** *"See that plus button? Click it to create your first task!"*

**Speech Bubble:** "Click the ➕ button!" 

### Step 1: Open the Add Task Modal

Click the **"+"** or **"Add Task"** button in your category view.

```
┌─────────────────────────┐
│   ➕ Add Task          │ ← Click this!
└─────────────────────────┘
       ▲
       └─── [Animated arrow from robot]
```

**[Wait for user to click]**

---

**[Robot moves to side of modal, near task name field]**

**Robot Speech (TTS):** *"Perfect! Now you'll see a form. First, give your task a name. What chore do you want to track? Keep it short and clear!"*

**Speech Bubble:** "Name your task! 📝"

### Step 2: Enter Task Details

You'll see a form with these fields:

```
┌──────────────────────────────────┐
│  Add New Task                    │
├──────────────────────────────────┤
│  Task Name:                      │
│  [____Wash_dishes____]  ← Type here
│                                  │
│  Freshness Decay:                │
│  [___1___] [Days ▼]  ← How often│
│                                  │
│  [ Cancel ]  [ Add Task ]        │
└──────────────────────────────────┘
```

---

**[Robot bounces excitedly near the task name field]**

**Robot Speech (TTS):** *"Let's try 'Wash dishes' as your first task! It's something most people do daily, so it's a great example. Go ahead and type it in!"*

**Speech Bubble:** "Try 'Wash dishes'! 🍽️"

#### Task Name

**What to enter:**
- ✅ Short and clear: "Wash dishes", "Clean bathroom", "Take out trash"
- ✅ Action-oriented: Start with a verb
- ✅ Specific: "Vacuum living room" vs just "Vacuum"
- ❌ Avoid: Super long names, vague descriptions

**Good Examples:**
- "Wash dishes"
- "Wipe countertops"
- "Sweep kitchen floor"
- "Clean toilet"
- "Water plants"

**[Wait for user to type task name]**

---

**[Robot moves to the decay time inputs]**

**Robot Speech (TTS):** *"Now here's the cool part! How often does this task need to be done? For dishes, most people wash them every day. So let's put '1' and keep it as 'Days'. This tells UpKeep that this task gets 'stale' after one day!"*

**Speech Bubble:** "How often? Try 1 day! ⏰"

#### Decay Time (How Often)

This is where the magic happens! **Decay time** determines how fast the task's freshness drops.

**The Two Fields:**

1. **Amount** (Number)
   - How many units of time

2. **Unit** (Dropdown)
   - Hours
   - Days
   - Weeks
   - Months

**Common Decay Times:**

| Task Type | Typical Decay Time |
|-----------|-------------------|
| Dishes, counters | 1 day |
| Bedroom, bathroom | 3-7 days |
| Vacuuming, mopping | 1 week |
| Deep cleaning | 2-4 weeks |
| Organizing, decluttering | 1-3 months |

**For "Wash dishes":**
- Amount: **1**
- Unit: **Days**

**What this means:**
- Task starts at 100% freshness when completed
- After 24 hours, it drops to 0% freshness
- Linear decay: 50% after 12 hours, 25% after 18 hours, etc.

**[Wait for user to set decay time]**

---

**[Robot does a little spin near the "Add Task" button]**

**Robot Speech (TTS):** *"Awesome! You've filled everything out. Now click that 'Add Task' button and watch the magic happen!"*

**Speech Bubble:** "Click 'Add Task'! Almost there! 🎯"

### Step 3: Create the Task

Click the **"Add Task"** button at the bottom of the form.

```
┌──────────────────────────────────┐
│  Task Name: Wash dishes          │
│  Decay: 1 Day                    │
│                                  │
│  [ Cancel ]  [ ✨ Add Task ]    │ ← Click!
└──────────────────────────────────┘
       ▲
       └─── [Animated arrow from robot]
```

**[Wait for user to click]**

---

## Success! You Created Your First Task! 🎉

**[Robot celebrates with confetti and bouncing animation]**

**Robot Speech (TTS):** *"YES! You did it! You just created your first task! Look at it sitting there at 0% freshness. That's normal - we haven't done the chore yet! When you complete it, it'll jump to 100%, then slowly decay over the next day. Pretty cool, right?"*

**Speech Bubble:** "You did it! Your first task! 🎊🎉"

**[Confetti animation]**

You should now see your new task in the category:

```
┌─────────────────────────────────────┐
│  📋 Kitchen                         │
├─────────────────────────────────────┤
│  ┌───────────────────────────────┐  │
│  │ ☐ Wash dishes                 │  │
│  │ Last: Never                   │  │
│  │ Decay: 1 day                  │  │
│  │ Freshness: 0% ░░░░░░░░░░░░    │  │
│  │                               │  │
│  │ [💤 Snooze] [ABC Steps]      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Why is it 0%?**
- New tasks start at 0% (never completed yet)
- Once you complete it, it jumps to 100%
- Then it decays back to 0% over the decay time period
- This creates urgency - you'll want to do it before it gets too low!

---

**[Robot floats happily]**

**Robot Speech (TTS):** *"In the next step, I'll show you how to mark this task as complete. That's when the real fun begins - you'll see the freshness jump to 100% and I'll celebrate with you!"*

**Speech Bubble:** "Next: Let's complete this task! ✅"

## Understanding Task Cards

Each task card shows:

1. **Checkbox** ☐ - Click to complete (we'll do this next!)
2. **Task Name** - What you're tracking
3. **Last Completed** - When you last did it
4. **Decay Time** - How long until it needs doing again
5. **Freshness Meter** - Visual bar showing completion status
6. **Action Buttons**:
   - 💤 **Snooze** - Pause decay temporarily
   - **ABC Steps** - Break task into smaller steps

---

## Best Practices for Tasks

**Start Simple:**
- Add 3-5 tasks to begin with
- Choose tasks you actually do regularly
- Don't overwhelm yourself with too many at once

**Realistic Decay Times:**
- Be honest about how often YOU do the task
- It's okay if it's different from "standard" times
- You can always edit it later!

**Task Name Tips:**
- Use action verbs: "Wash", "Clean", "Sweep", "Water"
- Be specific: "Sweep kitchen" not just "Sweep"
- Keep it short for better display

**Common Mistakes to Avoid:**
- ❌ Setting unrealistic decay times (1 hour for deep cleaning)
- ❌ Adding 50 tasks at once (overwhelming!)
- ❌ Vague names like "Stuff" or "Things"
- ❌ Making decay times too short (creates stress!)

---

## What's Next?

Now that you have a task, let's learn how to complete it and watch that freshness meter fill up to 100%!

---

**Tutorial Progress:** Step 4 of 24

**Previous:** Creating Your First Category  
**Next:** Completing Tasks & Watching Freshness

---

## Technical Details (For Implementation)

### Robot Positioning & Animations

```javascript
tutorialSteps[3] = {
    id: 4,
    title: "Adding Your First Task",
    
    // Initial Position
    robot: {
        startPosition: { x: '50%', y: '30%' },
        expression: 'excited'
    },
    
    // Step Sequence
    sequence: [
        {
            // Intro
            robot: {
                position: { x: '50%', y: '30%' },
                animation: 'float',
                expression: 'happy'
            },
            speech: {
                text: "Great job creating your first category! Now comes the fun part - let's add a task to it! Tasks are the individual chores you want to track. I'll walk you through creating your very first one!",
                rate: 1.2,
                pitch: 1.5
            },
            speechBubble: {
                text: "Time to add a task! Let me show you how! ✨",
                position: 'bottom'
            },
            actionRequired: 'click-next'
        },
        {
            // Highlight Add Task Button
            robot: {
                position: { x: '70%', y: '20%' },
                animation: 'point',
                expression: 'encouraging'
            },
            targetElement: '#addTaskBtn',
            highlightType: 'spotlight',
            arrow: { direction: 'down', animated: true },
            speech: {
                text: "See that plus button? Click it to create your first task!",
                rate: 1.2,
                pitch: 1.5
            },
            speechBubble: {
                text: "Click the ➕ button!",
                position: 'left'
            },
            actionRequired: 'user-click',
            waitFor: '#addTaskBtn'
        },
        {
            // Task Name Field
            robot: {
                position: { x: '20%', y: '40%' },
                animation: 'float',
                expression: 'encouraging'
            },
            targetElement: '#taskName',
            highlightType: 'spotlight',
            speech: {
                text: "Perfect! Now you'll see a form. First, give your task a name. What chore do you want to track? Keep it short and clear!",
                rate: 1.2,
                pitch: 1.5
            },
            speechBubble: {
                text: "Name your task! 📝",
                position: 'right'
            },
            actionRequired: 'wait-for-input',
            waitFor: '#taskName',
            suggestedValue: 'Wash dishes'
        },
        {
            // Decay Time
            robot: {
                position: { x: '20%', y: '55%' },
                animation: 'bounce',
                expression: 'happy'
            },
            targetElement: '#taskDecayValue',
            highlightType: 'spotlight',
            speech: {
                text: "Now here's the cool part! How often does this task need to be done? For dishes, most people wash them every day. So let's put '1' and keep it as 'Days'.",
                rate: 1.2,
                pitch: 1.5
            },
            speechBubble: {
                text: "How often? Try 1 day! ⏰",
                position: 'right'
            },
            actionRequired: 'wait-for-input',
            waitFor: ['#taskDecayValue', '#taskDecayUnit']
        },
        {
            // Add Task Button
            robot: {
                position: { x: '50%', y: '70%' },
                animation: 'spin',
                expression: 'excited'
            },
            targetElement: '.add-task-submit',
            highlightType: 'spotlight',
            arrow: { direction: 'down', animated: true },
            speech: {
                text: "Awesome! You've filled everything out. Now click that 'Add Task' button and watch the magic happen!",
                rate: 1.2,
                pitch: 1.5
            },
            speechBubble: {
                text: "Click 'Add Task'! Almost there! 🎯",
                position: 'top'
            },
            actionRequired: 'user-click',
            waitFor: '.add-task-submit'
        },
        {
            // Celebration
            robot: {
                position: { x: '50%', y: '40%' },
                animation: 'celebrate',
                expression: 'very-happy'
            },
            confetti: true,
            sparkles: true,
            speech: {
                text: "YES! You did it! You just created your first task! Look at it sitting there at 0% freshness. That's normal - we haven't done the chore yet!",
                rate: 1.3,
                pitch: 1.6
            },
            speechBubble: {
                text: "You did it! Your first task! 🎊🎉",
                position: 'bottom',
                style: 'celebration'
            },
            duration: 3000,
            actionRequired: 'auto-advance'
        }
    ]
};
```

### Code Integration
- Detect `#addTaskBtn` click
- Monitor form input changes
- Validate form completion
- Trigger celebration on successful task creation
- Update tutorial state in localStorage

### UI Elements
- Add Task button highlight
- Form field spotlights
- Confetti animation overlay
- Robot celebration animation
- Speech bubble positioning relative to form elements
