/**
 * UpKeep Interactive Tutorial System
 * Guides users through app features with interactive spotlights and robot mascot
 */

class TutorialSystem {
    constructor() {
        this.steps = [];
        this.currentStep = 0;
        this.totalSteps = 29; // Comprehensive tutorial with task management + PRO TIPS + auto-snooze
        this.isActive = false;
        this.steps = this.defineSteps();
        this.speechSynthesis = window.speechSynthesis;
        this.isSpeaking = false;
        this.voice = null;
        this.completedTaskId = null; // Track which task was completed during tutorial
        this.initVoice();
    }

    /**
     * Initialize text-to-speech voice
     */
    initVoice() {
        // Wait for voices to load
        if (this.speechSynthesis.getVoices().length === 0) {
            this.speechSynthesis.addEventListener('voiceschanged', () => {
                this.selectVoice();
            });
        } else {
            this.selectVoice();
        }
    }

    /**
     * Select a friendly voice for the robot
     */
    selectVoice() {
        const voices = this.speechSynthesis.getVoices();
        // Prefer English voices, prioritize female voices for friendliness
        this.voice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female')) ||
                     voices.find(v => v.lang.startsWith('en')) ||
                     voices[0];
    }

    /**
     * Speak the tutorial message
     */
    speak(text) {
        // Stop any current speech
        this.speechSynthesis.cancel();
        
        // Clean text for speech (remove emojis and markdown)
        const cleanText = text.replace(/[📊📝📑🎉🤖]/g, '').replace(/\n+/g, ' ').trim();
        
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.voice = this.voice;
        utterance.rate = 1.3; // Faster pace
        utterance.pitch = 1.1; // Slightly higher for friendly tone
        utterance.volume = 1.0;
        
        this.isSpeaking = true;
        utterance.onend = () => {
            this.isSpeaking = false;
        };
        
        this.speechSynthesis.speak(utterance);
    }

    /**
     * Stop speech
     */
    stopSpeech() {
        this.speechSynthesis.cancel();
        this.isSpeaking = false;
    }

    /**
     * Define all tutorial steps
     */
    defineSteps() {
        return [
            {
                id: 1,
                title: "Welcome to UpKeep!",
                message: "Hi there! I'm your UpKeep companion! 🤖\n\nI'll guide you through the app step by step. Let's start by looking at your dashboard!",
                highlight: null, // No highlight, just welcome
                robotPosition: "center",
                action: "click-next"
            },
            {
                id: 2,
                title: "Your Dashboard",
                message: "This is your main dashboard! 📊\n\nHere you can see all your categories and their cleanliness scores. The big score at the top shows your overall home status!",
                highlight: ".content-top",
                robotPosition: "top",
                action: "click-next"
            },
            {
                id: 3,
                title: "Creating Categories",
                message: "Let's create your first category! 📝\n\nClick the green + button to add a new category like 'Kitchen', 'Bathroom', or 'Living Room'. Try creating one now!",
                highlight: ".fab",
                robotPosition: "bottom-right",
                action: "wait-for-modal",
                nextTrigger: "addCategoryModal"
            },
            {
                id: 4,
                title: "Fill Out Category Info",
                message: "Perfect! I've selected 'Kitchen' for you! 📝\n\nNow just click 'Create Category' to add it to your dashboard!",
                highlight: null,
                robotPosition: "top",
                action: "wait-for-category-create",
                nextTrigger: "addCategoryModal"
            },
            {
                id: 5,
                title: "Your First Category!",
                message: "Kitchen created! 🎉\n\nSee those dust bunnies? 🐰 They mean it needs cleaning! The 0% bar shows cleanliness level.\n\nAs you complete tasks, bunnies disappear and the score boosts your overall home score!\n\nClick Kitchen to open it!",
                highlight: ".category-card:first-of-type",
                robotPosition: "top",
                action: "wait-for-category-click",
                nextTrigger: ".category-card:first-of-type"
            },
            {
                id: 6,
                title: "Add Your First Task",
                message: "You're now inside the Kitchen category!\n\nClick the green plus button at the bottom of the screen to add your first task.\n\nTasks are individual cleaning actions like 'Wash dishes' or 'Clean counters'. Each task tracks its own freshness independently.\n\nClick the plus button now!",
                highlight: "#categoryView .fab",
                robotPosition: "bottom-right",
                action: "wait-for-modal",
                nextTrigger: "addTaskModal"
            },
            {
                id: 7,
                title: "Create Your First Task",
                message: "I filled in 'Wash dishes' for you!\n\nNow pick a decay time. Think about how often you actually do dishes, then add a day or two as a buffer.\n\nIf you do dishes daily? Try 2 or 3 day decay time. Do the dishes every few days? Try 3 or maybe even 4.\n\nThe buffer gives you breathing room if life gets busy.\n\nPick your time and tap 'Create Task'!",
                highlight: null,
                robotPosition: "top",
                action: "wait-for-task-create",
                nextTrigger: "addTaskModal"
            },
            {
                id: 8,
                title: "Perfect! Task Created",
                message: "Great job! Your first task is now in Kitchen.\n\nSee how it shows up in your task list? As time passes, the freshness percentage will slowly decay based on the decay time you set.\n\nWhen you complete this task, it will reset to 100 percent freshness and start the decay cycle again.\n\nLet's add more tasks to build out your Kitchen category!",
                highlight: ".task-item:first-of-type",
                robotPosition: "top",
                action: "click-next"
            },
            {
                id: 9,
                title: "Add Second Task!",
                message: "Click the plus button again to add your second task to Kitchen!",
                highlight: "#categoryView .fab",
                robotPosition: "bottom-right",
                action: "wait-for-modal",
                nextTrigger: "addTaskModal"
            },
            {
                id: 10,
                title: "Fill Out Second Task",
                message: "Choose a new task name and enter it.\n\nNext, think about how often you'd do this task, and add a bit more time on top of that to give yourself some leeway. Then enter the decay time you decided on.\n\nWhen done, click 'Create Task'!",
                highlight: null,
                robotPosition: "top",
                action: "wait-for-task-create",
                nextTrigger: "addTaskModal"
            },
            {
                id: 11,
                title: "Complete a Task",
                message: "Great! Now you have tasks in your Kitchen category.\n\nLet's mark one of the task as complete. Click the circle on dishes to see what happens.",
                highlight: ".task-card:first-of-type .checkbox",
                robotPosition: "top",
                action: "wait-for-task-complete"
            },
            {
                id: 12,
                title: "Task Completed!",
                message: "Great! Look at the task you just completed.\n\nThe freshness meter is now at 100 percent! You also earned some bolts from completing the task!",
                highlight: ".task-card:first-of-type",
                robotPosition: "top",
                action: "click-next"
            },
            {
                id: 13,
                title: "What Are Bolts?",
                message: "Bolts are your in-game currency! You earn them by completing tasks. Use them to purchase unique robots with different looks and personalities!",
                highlight: null,
                robotPosition: "center",
                action: "click-next"
            },
            {
                id: 14,
                title: "Understanding Freshness",
                message: "Each task has a freshness percentage that decays over time.\n\nWhen you complete a task, it resets to 100 percent. As time passes, it slowly drops based on your decay time setting.\n\nThis helps you see what needs attention!",
                highlight: null,
                robotPosition: "center",
                action: "click-next"
            },
            {
                id: 15,
                title: "Auto-Snooze Feature",
                message: "Notice the Snoozed badge? Auto-Snooze is ON!\n\nWhen you complete a task, it automatically snoozes. Auto-Snooze prevents the freshness from immediately dropping.",
                highlight: ".task-card:first-of-type",
                robotPosition: "top",
                action: "click-next"
            },
            {
                id: 16,
                title: "How Auto-Snooze Works",
                message: "The snooze duration is based on the task's decay time.\n\nTasks that need doing more often get shorter snoozes, while less frequent tasks get longer snoozes.\n\nFor example: A weekly task snoozes for 24 hours. You can resume it early using the Resume button, or let it wake up automatically! You can also add a snooze to any task manually!",
                highlight: ".task-card:first-of-type",
                robotPosition: "top",
                action: "click-next"
            },
            {
                id: 17,
                title: "Delete a Task",
                message: "Sometimes you need to remove a task from your list.\n\nLet's learn how. Click the Edit button on the task above!",
                highlight: ".task-card:first-of-type .edit-btn-img",
                robotPosition: "top",
                action: "wait-for-modal",
                nextTrigger: "editTaskModal"
            },
            {
                id: 18,
                title: "Edit Task Modal",
                message: "Welcome to the Edit Task modal!\n\nHere you can change the task name, adjust the decay time, or delete the task entirely.\n\nFor now, let's delete this task. Click the Delete Task button at the bottom!",
                highlight: ".delete-task-btn",
                robotPosition: "top",
                action: "wait-for-delete"
            },
            {
                id: 19,
                title: "Back to Dashboard",
                message: "Great work! Now let's head back to the main dashboard.\n\nClick the back button at the top left of the screen to return to your dashboard.",
                highlight: ".back-btn",
                robotPosition: "top",
                action: "wait-for-back"
            },
            {
                id: 20,
                title: "Overall Freshness Score",
                message: "Welcome back to your dashboard!\n\nSee the big score at the top? This is your overall home cleanliness score. It averages all your categories together to show how fresh your entire home is!",
                highlight: ".content-top",
                robotPosition: "top",
                action: "click-next"
            },
            {
                id: 21,
                title: "Add Another Category",
                message: "Let's add one more category to your home!\n\nClick the green plus button to create another category. Try 'Bathroom' or 'Living Room'!",
                highlight: ".fab",
                robotPosition: "bottom-right",
                action: "wait-for-modal",
                nextTrigger: "addCategoryModal"
            },
            {
                id: 22,
                title: "Fill Out Category Info",
                message: "Great! Now create your category by clicking 'Create Category'!",
                highlight: null,
                robotPosition: "top",
                action: "wait-for-category-create",
                nextTrigger: "addCategoryModal"
            },
            {
                id: 23,
                title: "Freshness Score Changed",
                message: "Notice how your overall score changed?\n\nWhen you add a new category with 0 percent cleanliness, it pulls down your overall average. As you complete tasks in this new category, your score will go back up!\n\nThis helps you see which areas need attention.",
                highlight: ".content-top",
                robotPosition: "top",
                action: "click-next"
            },
            {
                id: 24,
                title: "Category Tabs",
                message: "Great! Notice the tabs at the top? 📑\n\nYou can filter between Regular tasks, All tasks, and Group tasks. Try switching tabs!",
                highlight: ".category-tabs",
                robotPosition: "bottom-right",
                action: "click-next"
            },
            {
                id: 25,
                title: "PRO TIP: Testing Phase 🔬",
                message: "Your first 2-3 weeks are for calibration!\n\nYour initial decay times are guesses. Watch which tasks stay red or green, then adjust. This is normal and expected!",
                highlight: null,
                robotPosition: "center",
                action: "click-next"
            },
            {
                id: 26,
                title: "PRO TIP: Done > Perfect ✅",
                message: "Beat perfectionism with Minimum Viable Completion!\n\n'Wash dishes' = dishes clean. That's it! Counters, sink, stove are BONUS. Lower the bar to build consistency!",
                highlight: null,
                robotPosition: "center",
                action: "click-next"
            },
            {
                id: 27,
                title: "PRO TIP: Trust Your Eyes 👁️",
                message: "Task shows 0% but room looks clean?\n\nThe app is a TIMER, not a sensor! Increase the decay time. Physical reality = ground truth. Adjust to match what you SEE.",
                highlight: null,
                robotPosition: "top",
                action: "click-next"
            },
            {
                id: 28,
                title: "Robot Companions",
                message: "Collect robot companions! 🤖\n\nEarn currency by completing tasks and buy new robot friends in the Robot Factory!",
                highlight: ".bottom-nav-item[onclick*='robots']",
                robotPosition: "bottom-right",
                action: "click-next"
            },
            {
                id: 29,
                title: "Tutorial Complete!",
                message: "Awesome! You're a pro now! 🎉\n\nYou know the basics AND the pro tips! Remember: buffer zones, testing phase, done > perfect, and trust your eyes. I believe in you!",
                highlight: null,
                robotPosition: "center",
                action: "finish"
            }
        ];
    }

    /**
     * Start the tutorial from step 1
     */
    startTutorial() {
        // Close any open modals first
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            settingsModal.classList.remove('active');
        }
        
        // Close any other modals
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        
        this.currentStep = 0;
        this.isActive = true;
        this.completedTaskId = null; // Reset completed task ID for new tutorial
        
        // Small delay to let modals close smoothly
        setTimeout(() => {
            this.showStep(0);
        }, 300);
    }

    /**
     * Display a tutorial step
     */
    showStep(stepIndex) {
        const step = this.steps[stepIndex];
        if (!step) return;

        // Remove any existing tutorial UI
        this.cleanup();

        // Step 6 needs a delay to let FAB button render after category view loads
        if (step.id === 6) {
            setTimeout(() => {
                // Speak only the message (not the title)
                this.speak(step.message);

                // Create spotlight overlay
                this.createSpotlight(step.highlight);

                // Create robot and speech bubble
                this.createRobotMascot(step);

                // Setup action handlers
                this.setupStepAction(step);
            }, 600); // Wait for category view to fully render
            return;
        }
        
        // Step 18 needs a delay to let modal fully render
        if (step.id === 18) {
            setTimeout(() => {
                // Speak only the message (not the title)
                this.speak(step.message);

                // Create spotlight overlay
                this.createSpotlight(step.highlight);

                // Create robot and speech bubble
                this.createRobotMascot(step);

                // Setup action handlers
                this.setupStepAction(step);
            }, 400); // Wait for modal content to fully render
            return;
        }

        // Speak only the message (not the title)
        this.speak(step.message);

        // For steps 12, 15, and 16, use the completed task ID to highlight the correct task
        let highlightTarget = step.highlight;
        if ((step.id === 12 || step.id === 15 || step.id === 16) && this.completedTaskId) {
            // Find the checkbox with the completed task ID
            const checkboxSelector = `[onclick*="toggleTask(${this.completedTaskId})"]`;
            const checkbox = document.querySelector(checkboxSelector);
            if (checkbox) {
                // Get the parent task card
                const taskCard = checkbox.closest('.task-card');
                if (taskCard) {
                    // For step 12, highlight the freshness meter specifically
                    if (step.id === 12) {
                        const freshnessMeter = taskCard.querySelector('.freshness-meter');
                        if (freshnessMeter) {
                            highlightTarget = freshnessMeter; // Highlight the freshness meter
                        } else {
                            highlightTarget = taskCard; // Fallback to task card
                        }
                    }
                    // For step 15, highlight the snoozed badge specifically
                    else if (step.id === 15) {
                        const snoozedBadge = taskCard.querySelector('.task-meta');
                        if (snoozedBadge && snoozedBadge.textContent.includes('Snoozed')) {
                            highlightTarget = snoozedBadge; // Highlight the snoozed badge
                        } else {
                            highlightTarget = taskCard; // Fallback to task card
                        }
                    } else {
                        highlightTarget = taskCard; // Pass the actual element
                    }
                }
            }
        }

        // Create spotlight overlay
        this.createSpotlight(highlightTarget);

        // Create robot and speech bubble
        this.createRobotMascot(step);

        // Setup action handlers
        this.setupStepAction(step);
        
        // Step 4 specific: Disable Group Categories option
        if (step.id === 4) {
            this.disableGroupCategoriesOption();
        }
        
        // Step 7 specific: Auto-fill task name and make it readonly
        if (step.id === 7) {
            setTimeout(() => {
                const taskNameInput = document.getElementById('taskName');
                if (taskNameInput) {
                    taskNameInput.value = 'Wash dishes';
                    taskNameInput.readOnly = true;
                    taskNameInput.style.cursor = 'not-allowed';
                    taskNameInput.style.opacity = '0.7';
                    console.log('Tutorial: Auto-filled "Wash dishes" for step 7');
                }
            }, 300); // Small delay to ensure modal is fully rendered
        }
        
        // Step 22 specific: Disable Group Categories option but allow user to choose normal categories
        if (step.id === 22) {
            this.disableGroupCategoriesOptionStep22();
        }
    }
    
    /**
     * Disable Group Categories and Self Care options during step 4
     * Also auto-select Kitchen and lock the dropdown
     */
    disableGroupCategoriesOption() {
        // Wait a bit for modal to fully load
        setTimeout(() => {
            const categorySelect = document.getElementById('categorySelect');
            if (!categorySelect) return;
            
            // Auto-select Kitchen for the user
            categorySelect.value = 'Kitchen';
            
            // Trigger the change event to update UI if needed
            const changeEvent = new Event('change', { bubbles: true });
            categorySelect.dispatchEvent(changeEvent);
            
            // Disable the entire dropdown so user can't change selection
            categorySelect.disabled = true;
            categorySelect.style.opacity = '0.6';
            categorySelect.style.cursor = 'not-allowed';
            
            // Get all options
            const options = categorySelect.querySelectorAll('option');
            
            options.forEach(option => {
                const value = option.value;
                
                // Disable Self Care
                if (value === 'SELFCARE') {
                    option.disabled = true;
                    option.style.color = '#666';
                    option.style.textDecoration = 'line-through';
                }
                
                // Disable all Group Categories (start with "GROUP:")
                if (value.startsWith('GROUP:')) {
                    option.disabled = true;
                    option.style.color = '#666';
                    option.style.textDecoration = 'line-through';
                }
                
                // Disable custom group category option
                if (value === 'customgroup') {
                    option.disabled = true;
                    option.style.color = '#666';
                    option.style.textDecoration = 'line-through';
                }
            });
        }, 100); // Small delay to ensure modal is rendered
    }
    
    /**
     * Re-enable Group Categories and Self Care options, and unlock dropdown
     */
    enableGroupCategoriesOption() {
        const categorySelect = document.getElementById('categorySelect');
        if (!categorySelect) return;
        
        // Re-enable the dropdown
        categorySelect.disabled = false;
        categorySelect.style.opacity = '';
        categorySelect.style.cursor = '';
        
        // Get all options and re-enable them
        const options = categorySelect.querySelectorAll('option');
        
        options.forEach(option => {
            option.disabled = false;
            option.style.color = '';
            option.style.textDecoration = '';
        });
    }
    
    /**
     * Disable Group Categories and Self Care options during step 22
     * Leave dropdown enabled so user can choose normal categories
     */
    disableGroupCategoriesOptionStep22() {
        // Wait a bit for modal to fully load
        setTimeout(() => {
            const categorySelect = document.getElementById('categorySelect');
            if (!categorySelect) return;
            
            // Get all options
            const options = categorySelect.querySelectorAll('option');
            
            options.forEach(option => {
                const value = option.value;
                
                // Disable Self Care
                if (value === 'SELFCARE') {
                    option.disabled = true;
                    option.style.color = '#666';
                    option.style.textDecoration = 'line-through';
                }
                
                // Disable all Group Categories (start with "GROUP:")
                if (value.startsWith('GROUP:')) {
                    option.disabled = true;
                    option.style.color = '#666';
                    option.style.textDecoration = 'line-through';
                }
                
                // Disable custom group category option
                if (value === 'customgroup') {
                    option.disabled = true;
                    option.style.color = '#666';
                    option.style.textDecoration = 'line-through';
                }
            });
            
            console.log('Tutorial: Disabled group categories for step 22 - user can choose normal categories');
        }, 100); // Small delay to ensure modal is rendered
    }

    /**
     * Create spotlight overlay that highlights specific element
     */
    createSpotlight(selectorOrElement) {
        // Create dark overlay
        const overlay = document.createElement('div');
        overlay.id = 'tutorial-spotlight-overlay';
        overlay.className = 'tutorial-spotlight-overlay';
        document.body.appendChild(overlay);

        // If there's an element to highlight
        if (selectorOrElement) {
            // Handle both selector strings and DOM elements
            const targetElement = typeof selectorOrElement === 'string' 
                ? document.querySelector(selectorOrElement)
                : selectorOrElement;
                
            if (targetElement) {
                // Create spotlight hole
                const rect = targetElement.getBoundingClientRect();
                const spotlight = document.createElement('div');
                spotlight.className = 'tutorial-spotlight';
                spotlight.style.top = `${rect.top - 10}px`;
                spotlight.style.left = `${rect.left - 10}px`;
                spotlight.style.width = `${rect.width + 20}px`;
                spotlight.style.height = `${rect.height + 20}px`;
                
                // Add data attribute for special step styling
                if (this.currentStep === 10) { // currentStep is 0-indexed, so step 11 is index 10
                    spotlight.setAttribute('data-circular', 'true'); // Circular for checkbox
                } else if (this.currentStep === 11) { // Step 12 is index 11
                    spotlight.setAttribute('data-green', 'true'); // Green for freshness meter
                } else if (this.currentStep === 12) { // Step 13 is index 12
                    spotlight.setAttribute('data-golden', 'true'); // Golden for snoozed badge
                }
                
                document.body.appendChild(spotlight);

                // Add pulse effect to target
                targetElement.classList.add('tutorial-highlight-pulse');
            }
        }

        // Fade in
        setTimeout(() => overlay.classList.add('active'), 10);
    }

    /**
     * Create robot mascot and speech bubble
     */
    createRobotMascot(step) {
        // Create robot container
        const robotContainer = document.createElement('div');
        robotContainer.id = 'tutorial-robot';
        robotContainer.className = `tutorial-robot position-${step.robotPosition}`;
        robotContainer.setAttribute('data-step', step.id); // Add step number for CSS targeting

        // Robot image (using the default mascot)
        const robotImg = document.createElement('img');
        robotImg.src = 'Imag/mascot.png';
        robotImg.className = 'tutorial-robot-image';
        robotImg.alt = 'Tutorial Mascot';

        // Speech bubble
        const speechBubble = document.createElement('div');
        speechBubble.className = 'tutorial-speech-bubble';
        
        const title = document.createElement('div');
        title.className = 'tutorial-speech-title';
        title.textContent = step.title;
        
        const message = document.createElement('div');
        message.className = 'tutorial-speech-message';
        message.textContent = step.message;
        
        speechBubble.appendChild(title);
        speechBubble.appendChild(message);

        // Navigation buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'tutorial-speech-buttons';

        if (step.action === "click-next") {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'tutorial-speech-btn tutorial-btn-next';
            nextBtn.textContent = 'Next →';
            nextBtn.onclick = () => this.nextStep();
            buttonsContainer.appendChild(nextBtn);
        } else if (step.action === "finish") {
            const finishBtn = document.createElement('button');
            finishBtn.className = 'tutorial-speech-btn tutorial-btn-finish';
            finishBtn.textContent = '🎉 Got it!';
            finishBtn.onclick = () => this.finishTutorial();
            buttonsContainer.appendChild(finishBtn);
        }

        const skipBtn = document.createElement('button');
        skipBtn.className = 'tutorial-speech-btn tutorial-btn-skip';
        skipBtn.textContent = 'Skip Tutorial';
        skipBtn.onclick = () => {
            this.cleanup();
            this.isActive = false;
            this.completedTaskId = null; // Reset completed task ID
            localStorage.setItem('upkeepTutorialCompleted', 'true');
        };
        buttonsContainer.appendChild(skipBtn);

        speechBubble.appendChild(buttonsContainer);

        // Progress indicator
        const progress = document.createElement('div');
        progress.className = 'tutorial-progress-indicator';
        progress.textContent = `Step ${this.currentStep + 1} of ${this.totalSteps}`;
        speechBubble.appendChild(progress);

        // Assemble robot
        robotContainer.appendChild(robotImg);
        robotContainer.appendChild(speechBubble);
        document.body.appendChild(robotContainer);

        // Animate in
        setTimeout(() => robotContainer.classList.add('active'), 50);
    }

    /**
     * Setup action handlers for the current step
     */
    setupStepAction(step) {
        if (step.action === "wait-for-modal" && step.nextTrigger) {
            // Wait for specific modal to open, then advance to next step
            const checkModal = setInterval(() => {
                const modal = document.getElementById(step.nextTrigger);
                if (modal && modal.classList.contains('active')) {
                    clearInterval(checkModal);
                    // Modal opened! Advance to next step to guide user through it
                    setTimeout(() => {
                        this.nextStep();
                    }, 500); // Small delay for smooth transition
                }
            }, 200); // Check every 200ms
        }
        
        if (step.action === "wait-for-category-create" && step.nextTrigger) {
            // Wait for modal to close (category created), then advance to next step
            const checkModalClose = setInterval(() => {
                const modal = document.getElementById(step.nextTrigger);
                if (modal && !modal.classList.contains('active')) {
                    clearInterval(checkModalClose);
                    // Modal closed! Category created! Advance to next step
                    setTimeout(() => {
                        this.nextStep();
                    }, 500); // Small delay for smooth transition
                }
            }, 200); // Check every 200ms
        }
        
        if (step.action === "wait-for-category-click" && step.nextTrigger) {
            // Wait for category card to be clicked
            setTimeout(() => {
                const categoryCard = document.querySelector(step.nextTrigger);
                if (categoryCard) {
                    console.log('Tutorial: Found Kitchen card, attaching click listener');
                    
                    // Ensure the card is interactive with VERY high z-index
                    categoryCard.style.cursor = 'pointer';
                    categoryCard.style.zIndex = '99999';
                    categoryCard.style.position = 'relative';
                    categoryCard.style.pointerEvents = 'auto';
                    
                    const clickHandler = (e) => {
                        console.log('Tutorial: Kitchen card clicked!');
                        // Don't prevent default - let the card open normally
                        // Don't stop propagation - let the click bubble up
                        
                        // Category card clicked! Advance to next step
                        categoryCard.removeEventListener('click', clickHandler, true);
                        
                        setTimeout(() => {
                            this.nextStep();
                        }, 800); // Delay to let category open first
                    };
                    
                    // Use capture phase to detect click before other handlers
                    categoryCard.addEventListener('click', clickHandler, true);
                    
                    console.log('Tutorial: Click listeners attached to Kitchen card');
                } else {
                    console.error('Tutorial: Could not find Kitchen card with selector:', step.nextTrigger);
                }
            }, 300); // Wait for Kitchen card to render
        }
        
        if (step.action === "wait-for-task-create" && step.nextTrigger) {
            // Wait for task modal to close (task created), then advance to next step
            const checkTaskModalClose = setInterval(() => {
                const modal = document.getElementById(step.nextTrigger);
                if (modal && !modal.classList.contains('active')) {
                    clearInterval(checkTaskModalClose);
                    // Modal closed! Task created! Advance to next step
                    setTimeout(() => {
                        this.nextStep();
                    }, 500); // Small delay for smooth transition
                }
            }, 200); // Check every 200ms
        }
        
        if (step.action === "wait-for-task-complete") {
            // Set flag to indicate we're waiting for task completion
            // The app's toggleTask function will check this and call onTaskCompleted()
            this.waitingForTaskComplete = true;
            console.log('Tutorial: Waiting for user to complete a task');
        }
        
        if (step.action === "wait-for-delete") {
            // Set flag to indicate we're waiting for task deletion
            // The app's deleteTask function will check this and call onTaskDeleted()
            this.waitingForDelete = true;
            console.log('Tutorial: Waiting for user to delete a task');
        }
        
        if (step.action === "wait-for-back") {
            // Wait for back button click to return to dashboard
            setTimeout(() => {
                const backBtn = document.querySelector('.back-btn');
                if (backBtn) {
                    console.log('Tutorial: Found back button, attaching click listener');
                    
                    const clickHandler = (e) => {
                        console.log('Tutorial: Back button clicked!');
                        // Let the back button work normally
                        
                        // Back button clicked! Advance to next step after navigation
                        backBtn.removeEventListener('click', clickHandler, true);
                        
                        setTimeout(() => {
                            this.nextStep();
                        }, 600); // Delay to let navigation complete
                    };
                    
                    // Use capture phase to detect click
                    backBtn.addEventListener('click', clickHandler, true);
                    
                    console.log('Tutorial: Click listener attached to back button');
                } else {
                    console.error('Tutorial: Could not find back button with selector .back-btn');
                }
            }, 300); // Wait for back button to render
        }
    }
    
    /**
     * Called by the app when a task is completed during tutorial
     */
    onTaskCompleted(taskId) {
        if (this.waitingForTaskComplete && this.isActive) {
            this.waitingForTaskComplete = false;
            this.completedTaskId = taskId; // Store the completed task ID
            console.log('Tutorial: Task completed (ID:', taskId, '), advancing to next step');
            setTimeout(() => {
                this.nextStep();
            }, 800); // Delay to let completion animation play
        }
    }
    
    /**
     * Called by the app when a task is deleted during tutorial
     */
    onTaskDeleted(taskId) {
        if (this.waitingForDelete && this.isActive) {
            this.waitingForDelete = false;
            console.log('Tutorial: Task deleted (ID:', taskId, '), advancing to next step');
            setTimeout(() => {
                this.nextStep();
            }, 500); // Delay to let deletion complete
        }
    }

    /**
     * Go to next step
     */
    nextStep() {
        this.currentStep++;
        if (this.currentStep < this.totalSteps) {
            this.showStep(this.currentStep);
        } else {
            this.finishTutorial();
        }
    }

    /**
     * Clean up all tutorial UI elements
     */
    cleanup() {
        // Stop any speech
        this.stopSpeech();
        
        // Re-enable Group Categories option (in case step 4 disabled it)
        this.enableGroupCategoriesOption();
        
        // Remove overlay
        const overlay = document.getElementById('tutorial-spotlight-overlay');
        if (overlay) overlay.remove();

        // Remove spotlight
        const spotlight = document.querySelector('.tutorial-spotlight');
        if (spotlight) spotlight.remove();

        // Remove robot
        const robot = document.getElementById('tutorial-robot');
        if (robot) robot.remove();

        // Remove pulse effects and inline styles from all highlighted elements
        document.querySelectorAll('.tutorial-highlight-pulse').forEach(el => {
            el.classList.remove('tutorial-highlight-pulse');
            // Remove any inline styles added by tutorial
            el.style.zIndex = '';
            el.style.position = '';
            el.style.cursor = '';
            el.style.pointerEvents = '';
        });
        
        // Also clean up any FAB buttons that might have been highlighted
        document.querySelectorAll('.fab').forEach(fab => {
            fab.style.zIndex = '';
            fab.style.position = '';
            fab.style.cursor = '';
            fab.style.pointerEvents = '';
        });
        
        // Clean up any checkboxes that might have been highlighted
        document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.style.zIndex = '';
            checkbox.style.position = '';
            checkbox.style.cursor = '';
            checkbox.style.pointerEvents = '';
        });
        
        // Clean up any task cards that might have been highlighted
        document.querySelectorAll('.task-card').forEach(card => {
            card.style.zIndex = '';
            card.style.position = '';
            card.style.background = '';
            card.style.pointerEvents = '';
            card.style.opacity = '';
        });
        
        // Clean up task name input if it was made readonly
        const taskNameInput = document.getElementById('taskName');
        if (taskNameInput) {
            taskNameInput.readOnly = false;
            taskNameInput.style.cursor = '';
            taskNameInput.style.opacity = '';
        }
        
        // Reset task completion flag (but keep it if we're in the middle of waiting)
        // Don't reset if we're actively waiting for task completion
        if (!this.waitingForTaskComplete) {
            // Only reset if not waiting
        }
        
        // Note: Don't reset completedTaskId here - we need it for steps 12 and 13
        // It will be reset when tutorial finishes or restarts
        
        // DON'T set isActive to false here - cleanup is called between steps
        // Only finishTutorial() should set isActive to false
    }

    /**
     * Finish the tutorial
     */
    finishTutorial() {
        this.cleanup();
        this.isActive = false;
        this.completedTaskId = null; // Reset completed task ID
        localStorage.setItem('upkeepTutorialCompleted', 'true');
        
        // Show success message
        if (typeof app !== 'undefined' && app.showToast) {
            app.showToast('🎉 Tutorial Complete! You\'re ready to use UpKeep!', 'success');
        }
    }
}

// Initialize global tutorial system and expose it to window
const tutorialSystem = new TutorialSystem();
window.tutorialSystem = tutorialSystem;
