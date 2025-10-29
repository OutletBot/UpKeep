# Welcome to UpKeep! 🤖✨

## Meet Your New Companion

Welcome to **UpKeep** - where household chores become an adventure with your robot companion!

### 🤖 Robot Guide Introduction

**[Robot floats in from bottom of screen, centers on page]**

**Robot Speech (TTS):** *"Hi there! I'm the UpKeep Mascot, and I'll be your personal guide! I'm so excited to show you around. Don't worry - we'll take it step by step, and I'll be here to help you the entire way!"*

**Speech Bubble:** "Welcome to UpKeep! Let me show you around! 🎉"

---

### What is UpKeep?

UpKeep is a gamified chore management app that helps you:
- 📋 **Track household tasks** with automatic freshness tracking
- 🤖 **Bond with robot companions** who encourage you along the way
- 🎮 **Earn rewards** through daily missions and streaks
- 📊 **Stay organized** with visual cleanliness scores
- ⏰ **Smart scheduling** with auto-snooze after completing tasks

### Your Robot Companion

Throughout this tutorial, your robot friend will guide you! They'll:
- Give you encouraging words when you complete tasks
- Show different moods based on your home's cleanliness
- Help you understand features with friendly tips
- Celebrate your victories with you!

### Tutorial Features

- **Step-by-Step Guide**: We'll walk through each feature carefully
- **Interactive Learning**: Try features as you learn them
- **Skip Anytime**: You can exit the tutorial and return later from Settings
- **Quick Reference**: Access help topics anytime from the menu

### What You'll Learn

1. **Dashboard Basics** - Understanding your home's overview
2. **Task Management** - Creating and completing chores
3. **Freshness System** - How tasks decay over time
4. **Gamification** - Missions, rewards, and your robot bond
5. **Advanced Features** - Power user tips and tricks

### Ready to Start?

**[Robot bounces excitedly]**

**Robot Speech (TTS):** *"Are you ready to get started? I promise this will be fun! Click the button below and let's dive in!"*

**Speech Bubble:** "Ready to begin? Let's go! 🚀"

Let's begin by exploring your dashboard and creating your first category!

**[User clicks "Start Tutorial" button]**
**[Robot celebrates with sparkles]**

**Robot Speech (TTS):** *"Awesome! Here we go!"*

---

**Tutorial Progress:** Step 1 of 24

**Next Step:** Understanding the Dashboard

**Tips:**
- Take your time and experiment with each feature
- Your robot will give you hints along the way
- You can always restart this tutorial from Settings > Tutorial

---

## Technical Details (For Implementation)

### Robot Positioning & Animation

```javascript
tutorialSteps[0] = {
    id: 1,
    title: "Welcome to UpKeep!",
    
    // Robot Animation
    robot: {
        startPosition: { x: '50%', y: '120%' }, // Starts below screen
        endPosition: { x: '50%', y: '50%' },    // Centers on screen
        animation: 'float-in',
        duration: '1.2s',
        expression: 'happy'
    },
    
    // Speech
    speech: {
        text: "Hi there! I'm the UpKeep Mascot, and I'll be your personal guide! I'm so excited to show you around. Don't worry - we'll take it step by step, and I'll be here to help you the entire way!",
        mood: 'excited',
        rate: 1.2,
        pitch: 1.5
    },
    
    speechBubble: {
        text: "Welcome to UpKeep! Let me show you around! 🎉",
        position: 'bottom',
        style: 'large'
    },
    
    // User Action
    actionRequired: 'click-button',
    buttonText: 'Start Tutorial',
    skipButton: true,
    
    // On Complete
    onComplete: {
        robotAnimation: 'celebrate',
        confetti: true,
        speech: "Awesome! Here we go!",
        transitionTo: 2
    }
};
```

### Tutorial Triggers
- **First Launch Detection**: Check `localStorage.getItem('upkeepTutorialCompleted')`
- **Tutorial State**: Store current step in `localStorage.getItem('upkeepTutorialStep')`
- **Skip Flag**: `localStorage.setItem('upkeepTutorialSkipped', 'true')`

### UI Elements Needed
- Tutorial overlay (`<div class="tutorial-overlay">`)
- Floating robot mascot (`<div class="tutorial-robot">`)
- Enhanced speech bubble for tutorial mode
- "Start Tutorial" button
- "Skip Tutorial" button
- Progress indicator (Step X of 24)

### Code Integration Points
- `init()` function - Check if first launch and trigger tutorial
- Settings modal - Add "Restart Tutorial" button
- Tutorial overlay system - Dim background, highlight specific elements
- `TutorialSystem.startTutorial()` - Initialize first step
