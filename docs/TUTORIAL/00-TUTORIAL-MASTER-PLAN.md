# UPKEEP TUTORIAL - MASTER PLAN

## Tutorial Structure Overview

This tutorial will guide users step-by-step through the UpKeep app, teaching them how to manage household chores with robot companions in a gamified system.

### 🤖 INTERACTIVE ROBOT GUIDE

**The Default Bot will be your personal tutorial instructor!**

The tutorial features an **animated, talking robot guide** that:
- 🎤 **Speaks to you** using the built-in TTS (text-to-speech) system
- 🎯 **Floats around the screen** to point at UI elements
- 💬 **Shows speech bubbles** with written instructions
- 😊 **Expresses emotions** with different facial expressions
- ✨ **Animates movements** to draw attention to important features
- 🎉 **Celebrates with you** when you complete tutorial steps

This creates an engaging, interactive learning experience where the robot companion literally guides you through the app!

## Planned Tutorial Steps

### Phase 1: Introduction & Basic Setup
- **01-WELCOME.md** - Introduction to UpKeep and your robot companion
- **02-DASHBOARD-OVERVIEW.md** - Understanding the main dashboard
- **03-FIRST-CATEGORY.md** - Creating your first category

### Phase 2: Core Task Management
- **04-ADDING-TASKS.md** - How to add tasks with decay times
- **05-COMPLETING-TASKS.md** - Marking tasks as complete
- **06-FRESHNESS-SYSTEM.md** - Understanding freshness/decay mechanics
- **07-SNOOZE-FEATURE.md** - Using auto-snooze and manual snooze

### Phase 3: Advanced Features
- **08-TASK-STEPS.md** - Breaking tasks into steps (ABC system)
- **09-LINKED-TASKS.md** - Understanding linked tasks across categories
- **10-GROUP-CATEGORIES.md** - Using SWEEP/MOP/TRASH group tasks
- **11-SUB-CATEGORIES.md** - Working with sub-category views

### Phase 4: Gamification
- **12-ROBOT-COMPANIONS.md** - Your robot friend and bond system
- **13-CURRENCY-SYSTEM.md** - Earning and spending bolts
- **14-DAILY-MISSIONS.md** - Completing daily missions for rewards
- **15-STREAK-SYSTEM.md** - Building and maintaining streaks

### Phase 5: Self-Care
- **16-SELFCARE-INTRO.md** - Introduction to self-care tracking
- **17-SELFCARE-USAGE.md** - Using the self-care system

### Phase 6: Advanced Management
- **18-SAVE-FILES.md** - Managing multiple save files
- **19-SETTINGS.md** - Customizing your experience
- **20-ACTIVITY-LOG.md** - Reviewing your task history

### Phase 7: Power Features
- **21-BULK-COMPLETION.md** - Complete all tasks at once
- **22-CATEGORY-SCORES.md** - Understanding cleanliness scores
- **23-DUST-BUNNIES.md** - What those hopping creatures mean
- **24-TIPS-TRICKS.md** - Advanced tips and tricks

## Implementation Strategy

### Tutorial Flow System - Robot-Guided Interactive Experience

**Core Components:**

1. **Floating Robot Guide**
   - Robot mascot positioned as overlay (z-index above all UI)
   - CSS animations for floating/hovering effect
   - Smooth transitions between positions on screen
   - Points to specific UI elements with animated arrow/pointer

2. **Text-to-Speech Integration**
   - Use existing `speakText()` function from chore-system.js
   - Robot "speaks" each tutorial instruction
   - User can toggle TTS on/off (respects existing setting)
   - Synced with speech bubble display

3. **Speech Bubble System**
   - Use existing `showSpeechBubble()` function
   - Enhanced for tutorial with larger text area
   - Shows written instructions alongside TTS
   - "Next" button appears when speech finishes

4. **Robot Positioning Animation**
   ```
   Tutorial Step Flow:
   1. Robot floats to position near target element
   2. Speech bubble appears with instructions
   3. TTS speaks the text
   4. Arrow/pointer highlights the target element
   5. Wait for user action or "Next" click
   6. Celebrate completion (if task done)
   7. Robot floats to next position
   ```

5. **Interactive Highlighting**
   - Dim background (dark overlay with opacity)
   - Spotlight effect on current UI element
   - Robot + speech bubble + target element remain bright
   - Prevents user from clicking wrong elements

6. **Robot Expressions**
   - Happy face when user succeeds
   - Encouraging face during instructions
   - Excited face for celebrations
   - Use existing mood system

**User Controls:**
- Optional skip button for experienced users
- Progress tracking (Step X of Y)
- Ability to pause tutorial
- Ability to restart tutorial from settings
- TTS toggle (on/off)

### Key Features to Highlight
✓ Robot personality and encouragement
✓ Automatic freshness decay
✓ Smart auto-snooze system
✓ Visual feedback (dust bunnies, animations)
✓ Daily missions and rewards
✓ Multiple save file support
✓ Linked tasks for efficiency

### Tutorial Triggers
1. **First Launch** - Full tutorial automatically starts
2. **Feature Discovery** - Mini-tutorials when using feature first time
3. **Settings Menu** - Manual restart option
4. **Help Button** - Quick reference to specific topics

## Technical Implementation Details

### Code Integration with Existing Systems

**Existing Functions to Leverage:**
```javascript
// TTS System (already exists)
this.speakText(text, rate, pitch)  // Robot speaks instructions

// Speech Bubble (already exists)  
this.showSpeechBubble(text, mood)  // Display written text

// Robot Mood (already exists)
this.updateMascotMood()  // Change robot expression

// Mascot Animation (already exists)
this.mascotEncourage()  // Celebration animation
```

**New Tutorial System Functions Needed:**

```javascript
// Tutorial Manager
TutorialSystem = {
    currentStep: 0,
    totalSteps: 24,
    isActive: false,
    
    // Core Functions
    startTutorial() {
        // Initialize tutorial overlay
        // Position robot at center
        // Speak welcome message
        // Show step 1
    },
    
    nextStep() {
        // Move to next tutorial step
        // Reposition robot
        // Speak new instruction
        // Highlight new target element
    },
    
    skipTutorial() {
        // Mark as skipped
        // Clean up overlay
        // Return to normal app
    },
    
    // Robot Movement
    moveRobotTo(x, y, targetElement) {
        // Smooth CSS transition
        // Position near target element
        // Add floating animation
        // Point arrow at target
    },
    
    // Highlighting System
    highlightElement(selector) {
        // Dim entire screen
        // Create spotlight on element
        // Raise z-index of element
        // Add pulsing border effect
    },
    
    // Tutorial Speech
    tutorialSpeak(text, onComplete) {
        // Show speech bubble
        // Speak with TTS
        // Wait for completion
        // Show "Next" button
        // Call onComplete callback
    }
}
```

**CSS Animations Needed:**

```css
/* Floating Robot Animation */
.tutorial-robot {
    position: fixed;
    z-index: 10000;
    animation: float 3s ease-in-out infinite;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

/* Tutorial Overlay */
.tutorial-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    pointer-events: all;
}

/* Spotlight Effect */
.tutorial-spotlight {
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7);
    position: relative;
    z-index: 10001;
    border: 3px solid #FFD93D;
    animation: pulse 2s infinite;
}

/* Arrow Pointer */
.tutorial-arrow {
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 30px solid #FFD93D;
    animation: bounce 1s infinite;
}
```

**Tutorial Data Structure:**

```javascript
tutorialSteps = [
    {
        id: 1,
        title: "Welcome to UpKeep!",
        speech: "Hi there! I'm your robot companion. Let me show you around!",
        robotPosition: { x: 'center', y: 'center' },
        targetElement: null,
        actionRequired: 'click-next',
        celebration: true
    },
    {
        id: 2,
        title: "This is Your Dashboard",
        speech: "This is your home dashboard. It shows all your categories!",
        robotPosition: { x: '20%', y: '30%' },
        targetElement: '#overallScore',
        actionRequired: 'click-next',
        celebration: false
    },
    {
        id: 3,
        title: "Let's Create a Category",
        speech: "Click this button to create your first category!",
        robotPosition: { x: '50%', y: '20%' },
        targetElement: '#addCategoryBtn',
        actionRequired: 'user-click',
        celebration: true
    }
    // ... 21 more steps
];
```

## Next Steps
1. ✅ Review existing code to understand all features
2. ✅ Create tutorial MD files one by one (4/25 done)
3. Create `tutorial-system.js` with robot guide logic
4. Create `tutorial-styles.css` for animations and overlays
5. Integrate tutorial trigger in `init()` function
6. Design each tutorial step's robot positioning
7. Test user flow with animated robot
8. Polish animations and timing
9. Add sound effects (optional)

---
**Status:** Planning Phase
**Files to Create:** 24 tutorial markdown files + tutorial system code
**Estimated Scope:** Medium-Large (requires new tutorial overlay system)
