        // Global Default Task List Template - Loaded from js/default-task-list.js
        // Contains the complete household task management system from "THIS" save file
        // DEFAULT_TASK_LIST constant is now defined in that external file

        const app = {
            // VERSION IDENTIFIER - Update this when making critical changes
            APP_VERSION: '2.0.1-snooze-fix',
            data: {
                categories: [],
                currentCategoryId: null,
                currentTaskId: null,
                currentSaveFile: 'default',
                lastSaveTime: null,
                ttsEnabled: true,
                autoSnoozeEnabled: true,
                showGroupTasksInRegularCategories: false,
                activityLog: [],
                voiceStyle: 'robotic',
                voicePitch: 1.5,
                voiceRate: 1.2,
                scrappyPitch: 0.5,
                scrappyRate: 1.3,
                selectedRobotId: 'default',
                currency: 250,
                ownedRobots: ['default'],
                lastDailyReset: null,
                dailyChoresCompleted: 0,
                dailyMissionStatus: {
                    checkIn: 'unclaimed',
                    twoChores: 'incomplete',
                    fourChores: 'incomplete'
                },

                currentMissionTab: 'daily',
                currentCategoryTab: 'all', // 'all', 'regular', 'group'
                mysteryGamePlayed: false,
                mysteryGameState: {
                    isActive: false,
                    gamePhase: 'start', // 'start', 'reveal', 'shuffle', 'pick', 'result'
                    prizes: [],
                    selectedBox: null,
                    wonPrize: null,
                    isLocked: false // Prevents closing during animation
                },
                // ChoreBot Hangar - Deck Management
                currentDeck: [], // Active deck being built (max 6 robots)
                savedDecks: [],   // Saved deck configurations: [{ name: "Deck Name", robots: [id1, id2, ...] }]
                
                // Item Inventory - Maintenance items owned by user
                itemInventory: {
                    OILDRINK: 0,
                    BATTERY: 0,
                    MEGABATTERY: 0,
                    SOLARPANEL: 0
                },
                
                // Robot Bonds & Durability - Tracks battery and repair status for each robot
                robotBonds: {
                    // Format: 'ROBOTID': { durability: { battery: 100, lastUpdate: timestamp, isBroken: false, totalRepairs: 0 } }
                    // Default Bot never breaks (no entry needed)
                }
            },

            storeRobots: [
                {
                    id: 'JACKOBOT',
                    cost: 100,
                    shadowImagePath: 'Imag/Achivments/Images/Jack-0-Bot/Jack-0-bot-shadow.png',
                    actualImagePath: 'Imag/Achivments/Images/Jack-0-Bot/Jack-0-Bot.png',
                    name: 'Jack-o\'-Bot',
                    clue: '🎃 "This helper loves carved grins and glowing nights..."'
                },
                {
                    id: 'MEGAROCKETMAN',
                    cost: 150,
                    shadowImagePath: 'Imag/Achivments/Images/MegaRocketMan/Mega-Shadow.png',
                    actualImagePath: 'Imag/Achivments/Images/MegaRocketMan/Mega.png',
                    name: 'Mega Rocket Man',
                    clue: '🎸 "A legendary performer who brings explosive energy to every task..."'
                },
                {
                    id: 'VOLTBOT',
                    cost: 120,
                    shadowImagePath: 'robots/volt-bot/images/shadow.png',
                    actualImagePath: 'robots/volt-bot/images/happy.png',
                    name: 'Volt-Bot',
                    clue: '⚡ "A tiny companion with electrifying enthusiasm and sparking energy..."'
                },
                {
                    id: 'BUZZBOT',
                    cost: 180,
                    shadowImagePath: 'Imag/Achivments/Images/Buzz-lite-point-0/Buzz-shadow.png',
                    actualImagePath: 'Imag/Achivments/Images/Buzz-lite-point-0/Buzz.png',
                    name: 'Buzz Lite-Point-0',
                    clue: '🚀 "A cosmic explorer programmed for stellar missions and duty..."'
                },
                {
                    id: 'CLOWNBOT',
                    cost: 100,
                    shadowImagePath: 'robots/clown-bot/images/shadow.png',
                    actualImagePath: 'robots/clown-bot/images/happy.png',
                    name: 'Clown Bot',
                    clue: '🎪 "Under the big top, this colorful entertainer never stops smiling..."'
                },
                {
                    id: 'WITCHBOT',
                    cost: 130,
                    shadowImagePath: 'robots/witch-bot/images/shadow.png',
                    actualImagePath: 'robots/witch-bot/images/happy.png',
                    name: 'Witch-Bot',
                    clue: '🔮 "Brewing up magical solutions, this spellcaster sweeps with supernatural flair..."'
                },
                {
                    id: 'FREEZY',
                    cost: 100,
                    shadowImagePath: 'robots/freezy/images/shadow.png',
                    actualImagePath: 'robots/freezy/images/happy.png',
                    name: 'Freezy',
                    clue: '❄️ "Built for frosty conditions, this chilly friend never melts under pressure..."'
                }
            ],

            // Store Items - Maintenance items for robots
            storeItems: [
                {
                    id: 'OILDRINK',
                    name: 'Robo-Fuel',
                    description: 'Restores 25% battery. Quick maintenance for your robot!',
                    cost: 30,
                    effect: { type: 'battery', amount: 25 },
                    imagePath: 'Imag/Store/Items/oil-drink.png'
                },
                {
                    id: 'BATTERY',
                    name: 'Battery Pack',
                    description: 'Restores 50% battery. Essential for regular care!',
                    cost: 50,
                    effect: { type: 'battery', amount: 50 },
                    imagePath: 'Imag/Store/Items/battery.png'
                },
                {
                    id: 'MEGABATTERY',
                    name: 'Mega Battery',
                    description: 'Fully restores battery to 100%! The ultimate care package.',
                    cost: 80,
                    effect: { type: 'battery', amount: 100 },
                    imagePath: 'Imag/Store/Items/mega-battery.png'
                },
                {
                    id: 'SOLARPANEL',
                    name: 'Solar Panel',
                    description: 'Infinite energy! Keeps your robot at 100% battery forever.',
                    cost: 1000,
                    effect: { type: 'solar', permanent: true },
                    imagePath: 'Imag/Store/Items/solar-panel.png'
                }
            ],

            // SCRAPPY'S DIALOGUE - Loaded dynamically from robots/scrappy-dialogue.json
            // This is just a minimal fallback. The ChoreRobotLoader will populate this
            // with the full dialogue loaded from the external JSON file
            scrappyDialogue: {
                greeting: ["Welcome to the shop!"],
                idle: ["Just another day in the factory."],
                purchased: ["Sold!"],
                canceled: ["Canceled."],
                goodbye: ["See you later!"]
            },

            scrappyIdleTimer: null,
            purchaseInProgress: false,

            // Unlimited bolts debug state (controlled by battle debugger toggle)
            unlimitedBoltsActive: false,
            unlimitedBoltsActualCurrency: null,
            
            // OBONXO Cheat Code State
            isObonxoCheatActive: false,

            // ROBOTS ARRAY - Loaded dynamically from individual robot folders via ChoreRobotLoader
            // This is just a minimal fallback array. The ChoreRobotLoader will populate this
            // with robots loaded from the robots/ directory, each with their own dialogue.json file
            robots: [
                {
                    id: 'default',
                    name: 'Default Bot',
                    happyImage: 'Imag/mascot.png',
                    sadImage: 'Imag/mascot.png',
                    thinkingImage: 'Imag/mascot.png'
                }
            ],

            mascotState: {
                isSpeaking: false,
                isThinking: false,
                lastMentionedTask: null,
                lastThoughtTime: 0,
                speechTimeout: null,
                thoughtTimeout: null
            },

            tts: {
                synthesis: window.speechSynthesis,
                currentUtterance: null
            },

            // Context-Aware Mode Flags (CRITICAL for dialogue management)
            isStoreMode: false,    // When true, suppress companion robot dialogue (Scrappy only)
            isBattleMode: false,   // When true, suppress companion robot dialogue (battle focus)
            returnToStartBattleMenu: false,
            currentBattleMode: null,      // 'debug', 'ai', etc.
            currentAIDifficulty: null,    // 'easy', 'medium', etc. when in AI mode
            pendingBattleLaunch: null,

            ui: {
                categoryColors: [
                    { bg: 'linear-gradient(135deg, #65D46E, #93E198)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #5C9DFF, #8AB6FF)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #A478FF, #C1A3FF)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #FF8A54, #FFB28E)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #FF588A, #FF8FAB)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #5CDAFF, #99E5FF)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #4ECDC4, #44A08D)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #FF6B6B, #FFE66D)', text: '#000' },
                    { bg: 'linear-gradient(135deg, #9B59B6, #8E44AD)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #3498DB, #2980B9)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #E74C3C, #C0392B)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #2ECC71, #27AE60)', text: '#fff' },
                    { bg: 'linear-gradient(135deg, #F39C12, #E67E22)', text: '#fff' },
                ],
                categoryBackgrounds: {
                    'Kitchen': 'Imag/Kitchen Background.png',
                    'Bathroom': 'Imag/Bathroom Background.png',
                    'Bedroom': 'Imag/Bedroom Background.png',
                    'Guest Bedroom': 'Imag/Guest Bedroom background.png',
                    'Living Room': 'Imag/Living room background.png',
                    'Hallway': 'Imag/Hallway Background.png',
                    'Laundry Room': 'Imag/Laundry room background.png',
                    'Backyard': 'Imag/Backyard Background.png',
                    'Back Porch': 'Imag/Back Portch Background.png',
                    'Vehicle': 'Imag/Vehicle Background.png',
                    'Vacuum & Sweeping': 'Imag/Vacum and Sweeping background.png',
                    'Front Yard': 'Imag/Front Yard Background.png',
                    'Front Porch': 'Imag/Front Porch background.png'
                },
                mainBackgrounds: [
                    'Imag/Main Background.png',
                    'Imag/Main Background 2.png',
                    'Imag/Main background 3.png'
                ]
            },

            async loadExternalData() {
                // Try to load data from component-based ChoreRobotLoader
                // If loading fails, fall back to JSON files
                // If that fails, hardcoded data is used as final fallback
                console.log('📦 Loading external data files...');
                
                // OPTION 1: Try component-based ChoreRobotLoader (NEW - scalable)
                if (typeof ChoreRobotLoader !== 'undefined') {
                    console.log('🔍 Attempting component-based loading (ChoreRobotLoader)...');
                    
                    try {
                        const initialized = await ChoreRobotLoader.initialize();
                        
                        if (initialized && ChoreRobotLoader.robotRegistry.length > 0) {
                            console.log(`✅ ChoreRobotLoader initialized: ${ChoreRobotLoader.robotRegistry.length} robots available`);
                            
                            // PRIORITY: If user owns APIBOT2, load it first with extra time
                            if (this.data.ownedRobots && this.data.ownedRobots.includes('APIBOT2')) {
                                console.log('🚨 Priority loading APIBOT2 (user owns it)...');
                                const apiBot = await ChoreRobotLoader.loadRobot('APIBOT2');
                                if (!apiBot) {
                                    console.error('❌ CRITICAL: APIBOT2 failed priority load! Retrying...');
                                    await new Promise(resolve => setTimeout(resolve, 300));
                                    // One more try
                                    await ChoreRobotLoader.loadRobot('APIBOT2');
                                }
                            }
                            
                            // Load all robots into this.robots array
                            const loadPromises = ChoreRobotLoader.robotRegistry.map(r => ChoreRobotLoader.loadRobot(r.id));
                            const loadedRobots = await Promise.all(loadPromises);
                            this.robots = loadedRobots.filter(r => r !== null);
                            
                            // Build storeRobots array with actual loaded image paths
                            this.storeRobots = ChoreRobotLoader.buildStoreRobotsArray();
                            
                            // Load scrappy dialogue
                            const scrappyLoaded = !!ChoreRobotLoader.scrappyDialogue;
                            if (scrappyLoaded) {
                                delete this.scrappyDialogue;
                                this.scrappyDialogue = ChoreRobotLoader.scrappyDialogue;
                                console.log('✅ Scrappy dialogue loaded from ChoreRobotLoader');
                                console.log(`   - ${Object.keys(this.scrappyDialogue).length} dialogue categories`);
                                console.log(`   - ${this.scrappyDialogue.purchased?.length || 0} purchase lines`);
                                console.log(`   - First purchase line: "${this.scrappyDialogue.purchased[0]}"`);
                            } else {
                                console.warn('⚠️ ChoreRobotLoader.scrappyDialogue is null/undefined');
                                console.warn('   Will attempt fallback loading method...');
                            }
                            
                            console.log(`✅ Loaded ${this.robots.length} chore robots via ChoreRobotLoader`);
                            console.log(`✅ ${this.storeRobots.length} robots available for purchase`);
                            
                            // Only return early if BOTH robots AND scrappy dialogue loaded successfully
                            if (scrappyLoaded) {
                                return; // Success! Exit early
                            }
                            // Otherwise, fall through to try loading scrappy dialogue via fallback method
                        }
                    } catch (error) {
                        console.warn('⚠️ ChoreRobotLoader failed:', error);
                        console.log('⬇️ Falling back to JSON method...');
                    }
                }
                
                // OPTION 2: Fall back to monolithic JSON files (OLD)
                const robotsAlreadyLoaded = this.robots && this.robots.length > 1; // More than just default bot
                if (robotsAlreadyLoaded) {
                    console.log('📦 Robots already loaded, attempting to load scrappy-dialogue.json only...');
                } else {
                    console.log('📦 Loading from store-robots.json and scrappy-dialogue.json...');
                }
                
                try {
                    // Load both JSON files in parallel
                    const [storeRobotsResponse, scrappyDialogueResponse] = await Promise.all([
                        fetch('robots/store-robots.json').catch(err => {
                            console.warn('⚠️ Failed to fetch store-robots.json, using hardcoded fallback');
                            return null;
                        }),
                        fetch('robots/scrappy-dialogue.json').catch(err => {
                            console.warn('⚠️ Failed to fetch scrappy-dialogue.json, using hardcoded fallback');
                            return null;
                        })
                    ]);
                    
                    // Update store robots if fetch succeeded (and not already loaded)
                    if (!robotsAlreadyLoaded && storeRobotsResponse && storeRobotsResponse.ok) {
                        const storeRobotsData = await storeRobotsResponse.json();
                        this.storeRobots = storeRobotsData;
                        console.log('✅ Store robots loaded from JSON:', storeRobotsData.length, 'robots');
                    } else if (!robotsAlreadyLoaded) {
                        console.log('ℹ️ Using hardcoded store robots (7 robots)');
                    }
                    
                    // Update scrappy dialogue if fetch succeeded - FORCE COMPLETE REPLACEMENT
                    if (scrappyDialogueResponse && scrappyDialogueResponse.ok) {
                        const scrappyDialogueData = await scrappyDialogueResponse.json();
                        // Delete old object and create new one to avoid any reference issues
                        delete this.scrappyDialogue;
                        this.scrappyDialogue = scrappyDialogueData;
                        console.log('✅ Scrappy dialogue loaded from fallback JSON');
                        console.log(`   - ${Object.keys(scrappyDialogueData).length} dialogue categories`);
                        console.log(`   - ${scrappyDialogueData.purchased?.length || 0} purchase lines`);
                        console.log(`   - First purchase line: "${scrappyDialogueData.purchased[0]}"`);
                    } else {
                        console.error('❌ Fallback Scrappy dialogue loading FAILED!');
                        console.error('   Response status:', scrappyDialogueResponse?.status || 'null response');
                        console.error('   Response URL:', scrappyDialogueResponse?.url || 'no URL');
                        console.log('ℹ️ Using minimal hardcoded scrappy dialogue (FALLBACK)');
                        console.log('⚠️ This means Scrappy will only say "Sold!" and basic phrases!');
                        console.log('🔧 Check if robots/scrappy-dialogue.json exists and is accessible');
                    }
                    
                } catch (error) {
                    // OPTION 3: If anything goes wrong, keep using hardcoded data
                    console.warn('⚠️ Error loading external data:', error);
                    console.log('ℹ️ Continuing with hardcoded data (no functionality lost)');
                }
            },

            // DEBUG HELPER: Check Scrappy dialogue status
            checkScrappyDialogue() {
                console.log('🔍 Scrappy Dialogue Status:');
                console.log('   Categories:', Object.keys(this.scrappyDialogue));
                console.log('   Greeting lines:', this.scrappyDialogue.greeting?.length || 0);
                console.log('   Idle lines:', this.scrappyDialogue.idle?.length || 0);
                console.log('   Purchased lines:', this.scrappyDialogue.purchased?.length || 0);
                console.log('   Canceled lines:', this.scrappyDialogue.canceled?.length || 0);
                console.log('   Goodbye lines:', this.scrappyDialogue.goodbye?.length || 0);
                
                if (this.scrappyDialogue.purchased?.length === 1) {
                    console.error('❌ CRITICAL: Only 1 purchase line - using hardcoded fallback!');
                    console.error('   Current line:', this.scrappyDialogue.purchased[0]);
                    console.error('   Expected 25+ purchase lines from robots/scrappy-dialogue.json');
                    console.error('   This is why Scrappy only says "Sold!"');
                } else if (this.scrappyDialogue.purchased?.length > 20) {
                    console.log('✅ Full dialogue loaded successfully!');
                    console.log('   Sample lines:');
                    console.log('   -', this.scrappyDialogue.purchased[0]);
                    console.log('   -', this.scrappyDialogue.purchased[1]);
                    console.log('   -', this.scrappyDialogue.purchased[2]);
                }
            },

            async init() {
                // ===== SHOW LOADING SCREEN ON INITIAL APP LOAD =====
                if (window.UpkeepLoadingScreen) {
                    UpkeepLoadingScreen.show('System initializing...');
                    console.log('🔄 [Init] Loading screen activated for initial load');
                }
                
                // Log version for debugging
                console.log(`%c🤖 UpKeep App Version: ${this.APP_VERSION}`, 'color: #00c8ff; font-weight: bold; font-size: 16px;');
                console.log('%cIf GitHub version shows different version than localhost, clear browser cache!', 'color: #ff9500; font-weight: bold;');
                
                // Update loading message
                if (window.UpkeepLoadingScreen) {
                    UpkeepLoadingScreen.updateMessage('Loading robot data...');
                }
                
                // Load external data first (with fallbacks to hardcoded)
                await this.loadExternalData();
                
                // DEBUG: Check if Scrappy dialogue loaded properly
                this.checkScrappyDialogue();
                
                // Update loading message
                if (window.UpkeepLoadingScreen) {
                    UpkeepLoadingScreen.updateMessage('Loading save data...');
                }
                
                this.loadData();
                // Always start on the dashboard
                this.data.currentCategoryId = null;
                this.data.currentTaskId = null;
                // Set random main background
                this.setRandomMainBackground();
                // Load selected robot
                this.loadSelectedRobot();
                
                // Update loading message
                if (window.UpkeepLoadingScreen) {
                    UpkeepLoadingScreen.updateMessage('Calculating maintenance...');
                }
                
                this.render();
                // Update currency display
                this.updateCurrencyDisplay();
                // Update decay every minute
                setInterval(() => this.updateDecay(), 60000);
                // Initial decay update
                this.updateDecay();
                
                // Update loading message
                if (window.UpkeepLoadingScreen) {
                    UpkeepLoadingScreen.updateMessage('Finalizing...');
                }
                
                // Mascot dodge behavior
                this.initMascotDodge();
                // Load TTS voices
                this.initTTS();
                // Ensure Scrappy is hidden on startup
                const scrappyContainer = document.getElementById('scrappyContainer');
                if (scrappyContainer) {
                    scrappyContainer.style.display = 'none';
                }
                // Check cheat status on startup
                this.checkObonxoCheatStatus();
                
                // ===== HIDE LOADING SCREEN AFTER INITIALIZATION =====
                setTimeout(() => {
                    if (window.UpkeepLoadingScreen) {
                        UpkeepLoadingScreen.hide();
                        console.log('✅ [Init] Initial load complete, loading screen hidden');
                    }
                    // Mascot greeting after loading screen is gone
                    setTimeout(() => this.mascotGreet(), 300);
                }, 100);
            },

            initTTS() {
                // Load voices (some browsers need this)
                if (this.tts.synthesis.getVoices().length === 0) {
                    this.tts.synthesis.addEventListener('voiceschanged', () => {
                        console.log('TTS voices loaded');
                    });
                }
            },

            async openRobotSelect() {
                const modal = document.getElementById('robotSelectModal');
                modal.style.display = 'flex';
                
                // Defensive check: Ensure robots are loaded before opening
                if (!this.robots || this.robots.length === 0) {
                    console.warn('⚠️ [openRobotSelect] Robots not loaded, attempting to load...');
                    await this.loadExternalData();
                }
                
                // Update all battery levels before rendering
                this.updateAllBatteries();
                
                this.renderRobotSelectItems();
                this.renderRobotOptions();
            },

            closeRobotSelect() {
                const modal = document.getElementById('robotSelectModal');
                modal.style.display = 'none';
            },

            renderRobotSelectItems() {
                const container = document.getElementById('robotSelectItemsGrid');
                if (!container) return;

                // DRAG-AND-DROP ENABLED: Items can be dragged onto robots to apply them!
                // Also supports click-to-use for accessibility
                // Compact image-only display for Android screens with quantity badge overlay
                // Only these 4 items display: Robo-Fuel, Battery Pack, Mega Battery, Solar Panel
                
                const itemsHTML = this.storeItems.map(item => {
                    const quantity = this.data.itemInventory[item.id] || 0;
                    const hasItems = quantity > 0;
                    const cardClass = hasItems ? 'has-items' : 'no-items';
                    
                    // Add click handler and drag/drop support if items owned
                    const clickHandler = hasItems ? `onclick="app.promptItemUse('${item.id}')"` : '';
                    const dragHandlers = hasItems ? `
                        draggable="true"
                        ondragstart="app.handleItemDragStart(event, '${item.id}')"
                        ondragend="app.handleItemDragEnd(event)"
                    ` : '';
                    
                    return `
                        <div class="robot-select-item-card ${cardClass}" 
                             data-item-id="${item.id}" 
                             data-quantity="${quantity}" 
                             ${clickHandler} 
                             ${dragHandlers}
                             title="${item.name}">
                            <img src="${item.imagePath}" alt="${item.name}" class="robot-select-item-image">
                            <div class="robot-select-item-quantity">${quantity}</div>
                        </div>
                    `;
                }).join('');
                
                container.innerHTML = itemsHTML;
            },

            // Battery & Durability System
            initializeRobotDurability(robotId) {
                // Default Bot gets special solar panel treatment
                if (robotId === 'DEFAULTBOT' || robotId === 'default') {
                    if (!this.data.robotBonds[robotId]) {
                        this.data.robotBonds[robotId] = {
                            durability: {
                                battery: 100,
                                lastUpdate: Date.now(),
                                isBroken: false,
                                totalRepairs: 0,
                                hasSolarPanel: true  // Default bot has infinite battery
                            }
                        };
                    } else if (!this.data.robotBonds[robotId].durability.hasSolarPanel) {
                        // Ensure existing default bot data has solar panel flag
                        this.data.robotBonds[robotId].durability.hasSolarPanel = true;
                    }
                    return;
                }
                
                // Initialize durability for new robot if not exists
                if (!this.data.robotBonds[robotId]) {
                    this.data.robotBonds[robotId] = {
                        durability: {
                            battery: 100,
                            lastUpdate: Date.now(),
                            isBroken: false,
                            totalRepairs: 0
                        }
                    };
                }
            },
            
            getRobotBattery(robotId) {
                // Default Bot always at 100%
                if (robotId === 'DEFAULTBOT' || robotId === 'default') return 100;
                
                // Initialize if missing
                if (!this.data.robotBonds[robotId]) {
                    this.initializeRobotDurability(robotId);
                }
                
                return this.data.robotBonds[robotId]?.durability?.battery || 100;
            },
            
            getBatteryColor(percentage) {
                if (percentage >= 75) return '#65D46E'; // Green
                if (percentage >= 50) return '#FFD93D'; // Yellow
                if (percentage >= 25) return '#FF8C42'; // Orange
                if (percentage > 0) return '#FF5757';   // Red
                return '#888888'; // Gray (broken)
            },
            
            getBatteryStatus(percentage) {
                if (percentage >= 75) return 'Perfect';
                if (percentage >= 50) return 'Good';
                if (percentage >= 25) return 'Low';
                if (percentage > 0) return 'Critical';
                return 'BROKEN';
            },
            
            // Calculate time remaining until battery depletes
            getBatteryTimeRemaining(robotId) {
                const robot = this.robots.find(r => r.id === robotId);
                if (!robot) return null;
                
                const durability = this.data.robotBonds[robotId]?.durability;
                if (!durability || durability.isBroken) return null;
                
                // Solar panel = infinite battery
                if (durability.hasSolarPanel) return '∞';
                
                const battery = durability.battery || 100;
                if (battery <= 0) return null;
                
                // Get robot's depletion rate
                let hoursToDeplete = 50; // Default
                if (robot.choreData?.battery?.hoursToDeplete) {
                    hoursToDeplete = robot.choreData.battery.hoursToDeplete;
                }
                
                // Calculate decay rate
                const activeDecayRate = 100 / hoursToDeplete; // % per hour when active
                const isActive = robotId === this.data.selectedRobotId;
                const decayRate = isActive ? activeDecayRate : (activeDecayRate / 4);
                
                // Calculate hours remaining
                const hoursRemaining = battery / decayRate;
                
                // Convert to hours and minutes
                const hours = Math.floor(hoursRemaining);
                const minutes = Math.round((hoursRemaining - hours) * 60);
                
                // Format display with emoji clock
                if (hours > 0 && minutes > 0) {
                    return `⏱️ ${hours}h ${minutes}m`;
                } else if (hours > 0) {
                    return `⏱️ ${hours}h`;
                } else if (minutes > 0) {
                    return `⏱️ ${minutes}m`;
                } else {
                    return '⏱️ < 1m';
                }
            },
            
            // Battery Decay & Management
            updateBatteryDecay(robotId) {
                // Default Bot never decays
                if (robotId === 'DEFAULTBOT' || robotId === 'default') return;
                
                // Initialize if missing
                if (!this.data.robotBonds[robotId]) {
                    this.initializeRobotDurability(robotId);
                    return;
                }
                
                const durability = this.data.robotBonds[robotId].durability;
                
                // Skip if already broken or has solar panel
                if (durability.isBroken || durability.hasSolarPanel) return;
                
                const now = Date.now();
                const lastUpdate = durability.lastUpdate || now;
                const timeDiff = now - lastUpdate;
                
                // Calculate decay based on time passed
                const hoursElapsed = timeDiff / (1000 * 60 * 60);
                
                // Get robot's unique battery depletion rate from robot data
                const robot = this.robots.find(r => r.id === robotId);
                let hoursToDeplete = 50; // Default fallback if not configured
                
                if (robot && robot.choreData && robot.choreData.battery && robot.choreData.battery.hoursToDeplete) {
                    hoursToDeplete = robot.choreData.battery.hoursToDeplete;
                }
                
                // Calculate decay rate: 100% / hoursToDeplete = % per hour when active
                // Example: 50 hours to deplete = 2% per hour when active
                const activeDecayRate = 100 / hoursToDeplete;
                
                // Inactive robots drain 4x slower
                const isActive = robotId === this.data.selectedRobotId;
                const decayRate = isActive ? activeDecayRate : (activeDecayRate / 4);
                const decay = hoursElapsed * decayRate;
                
                // Apply decay
                if (decay > 0) {
                    durability.battery = Math.max(0, durability.battery - decay);
                    durability.lastUpdate = now;
                    
                    // Mark as broken if battery hits 0
                    if (durability.battery === 0) {
                        durability.isBroken = true;
                    }
                    
                    this.saveData();
                }
            },
            
            updateAllBatteries() {
                // Update battery for all owned robots (except default)
                this.data.ownedRobots.forEach(robotId => {
                    if (robotId !== 'default' && robotId !== 'DEFAULTBOT') {
                        this.updateBatteryDecay(robotId);
                    }
                });
            },
            
            drainBattery(robotId, amount) {
                // Default Bot never drains
                if (robotId === 'DEFAULTBOT' || robotId === 'default') return;
                
                if (!this.data.robotBonds[robotId]) {
                    this.initializeRobotDurability(robotId);
                }
                
                const durability = this.data.robotBonds[robotId].durability;
                
                // Skip if solar panel equipped
                if (durability.hasSolarPanel) return;
                
                durability.battery = Math.max(0, durability.battery - amount);
                durability.lastUpdate = Date.now();
                
                // Mark as broken if battery hits 0
                if (durability.battery === 0) {
                    durability.isBroken = true;
                }
                
                this.saveData();
            },
            
            repairRobot(robotId) {
                if (!this.data.robotBonds[robotId]) return false;
                
                const robot = this.robots.find(r => r.id === robotId);
                if (!robot) return false;
                
                // Calculate repair cost: 50% of robot purchase price
                const repairCost = Math.floor(robot.cost * 0.5);
                
                // Check if user has enough bolts
                if (this.data.currency < repairCost) {
                    this.showSpeechBubble(`You need ${repairCost} bolts to repair ${robot.name}!`, 'concerned');
                    return false;
                }
                
                // Deduct cost
                this.deductCurrency(repairCost);
                
                // Repair robot
                const durability = this.data.robotBonds[robotId].durability;
                durability.battery = 100;
                durability.isBroken = false;
                durability.lastUpdate = Date.now();
                durability.totalRepairs++;
                
                this.saveData();
                this.showSpeechBubble(`${robot.name} repaired! Battery restored to 100%!`, 'happy');
                
                // Refresh robot selection display
                this.renderRobotOptions();
                
                return true;
            },
            
            promptItemUse(itemId) {
                // Get item details
                const item = this.storeItems.find(i => i.id === itemId);
                if (!item) return;
                
                // Get all owned robots (except default)
                const availableRobots = this.robots.filter(robot => 
                    this.data.ownedRobots.includes(robot.id) && robot.id !== 'default'
                );
                
                if (availableRobots.length === 0) {
                    this.showSpeechBubble('You need to own a robot first! Visit the Robot Store!', 'concerned');
                    return;
                }
                
                // Create robot selection buttons
                const robotButtons = availableRobots.map(robot => {
                    const battery = this.getRobotBattery(robot.id);
                    const batteryColor = this.getBatteryColor(battery);
                    return `
                        <button class="item-use-robot-btn" onclick="app.useItem('${itemId}', '${robot.id}'); app.closeItemPrompt();">
                            <img src="${robot.happyImage}" alt="${robot.name}" style="width: 40px; height: 40px;">
                            <div>
                                <div style="font-weight: 700;">${robot.name}</div>
                                <div style="font-size: 10px; color: ${batteryColor};">Battery: ${battery}%</div>
                            </div>
                        </button>
                    `;
                }).join('');
                
                // Show prompt with robot selection
                const message = `
                    <div style="text-align: center; margin-bottom: 15px;">
                        <div style="width: 80px; height: 80px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                            <img src="${item.imagePath}" style="max-width: 80px; max-height: 80px; width: auto; height: auto; object-fit: contain;">
                        </div>
                        <h3 style="margin: 0; font-size: 16px;">${item.name}</h3>
                        <p style="margin: 8px 0; font-size: 12px; opacity: 0.9;">${item.description}</p>
                        <p style="margin: 0; font-weight: 700;">Select a robot to apply:</p>
                    </div>
                    <div class="item-use-robots-grid">
                        ${robotButtons}
                    </div>
                `;
                
                this.showItemPrompt(message);
            },
            
            showItemPrompt(htmlContent) {
                // Create or update item prompt modal
                let modal = document.getElementById('itemUsePromptModal');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.id = 'itemUsePromptModal';
                    modal.className = 'modal-overlay';
                    modal.innerHTML = `
                        <div class="modal-content" style="max-width: 400px; padding: 20px;">
                            <button class="modal-close" onclick="app.closeItemPrompt()">&times;</button>
                            <div id="itemPromptContent"></div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                }
                
                document.getElementById('itemPromptContent').innerHTML = htmlContent;
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                modal.classList.add('active');
            },
            
            closeItemPrompt() {
                const modal = document.getElementById('itemUsePromptModal');
                if (modal) {
                    modal.classList.remove('active');
                }
            },
            
            useItem(itemId, robotId) {
                // Check if user owns the item
                if (!this.data.itemInventory[itemId] || this.data.itemInventory[itemId] <= 0) {
                    this.showSpeechBubble('You don\'t have any of this item!', 'concerned');
                    return false;
                }
                
                // Default Bot doesn't need items
                if (robotId === 'DEFAULTBOT' || robotId === 'default') {
                    this.showSpeechBubble('Default Bot doesn\'t need maintenance!', 'regular');
                    return false;
                }
                
                if (!this.data.robotBonds[robotId]) {
                    this.initializeRobotDurability(robotId);
                }
                
                const durability = this.data.robotBonds[robotId].durability;
                const robot = this.robots.find(r => r.id === robotId);
                const robotName = robot ? robot.name : 'Robot';
                
                // Apply item effect
                switch(itemId) {
                    case 'OILDRINK':
                        // +25% battery
                        durability.battery = Math.min(100, durability.battery + 25);
                        durability.isBroken = false;
                        this.showSpeechBubble(`${robotName} drank Oil! +25% battery!`, 'happy');
                        break;
                        
                    case 'BATTERY':
                        // +50% battery
                        durability.battery = Math.min(100, durability.battery + 50);
                        durability.isBroken = false;
                        this.showSpeechBubble(`${robotName} charged up! +50% battery!`, 'happy');
                        break;
                        
                    case 'MEGABATTERY':
                        // Full restore to 100%
                        durability.battery = 100;
                        durability.isBroken = false;
                        this.showSpeechBubble(`${robotName} fully charged! 100% battery!`, 'excited');
                        break;
                        
                    case 'SOLARPANEL':
                        // Permanent solar charging
                        durability.battery = 100;
                        durability.isBroken = false;
                        durability.hasSolarPanel = true;
                        this.showSpeechBubble(`${robotName} now has infinite energy! Solar Panel installed!`, 'excited');
                        break;
                        
                    default:
                        return false;
                }
                
                // Update timestamp and consume item
                durability.lastUpdate = Date.now();
                this.data.itemInventory[itemId]--;
                
                this.saveData();
                
                // Refresh displays
                this.renderRobotOptions();
                this.renderRobotSelectItems();
                
                return true;
            },
            
            // Drag-and-Drop Handlers
            handleItemDragStart(event, itemId) {
                event.dataTransfer.effectAllowed = 'copy';
                event.dataTransfer.setData('text/plain', itemId);
                event.target.classList.add('dragging');
                
                // Store the item being dragged
                this.draggedItemId = itemId;
            },
            
            handleItemDragEnd(event) {
                event.target.classList.remove('dragging');
                this.draggedItemId = null;
                
                // Remove any hover states from robot cards
                document.querySelectorAll('.robot-select-card').forEach(card => {
                    card.classList.remove('drag-over');
                });
            },
            
            handleRobotDragOver(event) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';
                
                // Add visual feedback
                const card = event.currentTarget;
                card.classList.add('drag-over');
            },
            
            handleRobotDragLeave(event) {
                // Only remove if leaving the card entirely
                const card = event.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = event.clientX;
                const y = event.clientY;
                
                if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
                    card.classList.remove('drag-over');
                }
            },
            
            handleRobotDrop(event, robotId) {
                event.preventDefault();
                event.stopPropagation();
                
                const card = event.currentTarget;
                card.classList.remove('drag-over');
                
                const itemId = event.dataTransfer.getData('text/plain') || this.draggedItemId;
                
                if (!itemId) return;
                
                // Get item details
                const item = this.storeItems.find(i => i.id === itemId);
                if (!item) return;
                
                // Show confirmation dialog
                this.confirmItemUse(itemId, robotId);
            },
            
            confirmItemUse(itemId, robotId) {
                const item = this.storeItems.find(i => i.id === itemId);
                const robot = this.robots.find(r => r.id === robotId);
                
                if (!item || !robot) return;
                
                // Create confirmation modal
                const message = `
                    <div style="text-align: center;">
                        <div style="width: 80px; height: 80px; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                            <img src="${item.imagePath}" style="max-width: 80px; max-height: 80px; width: auto; height: auto; object-fit: contain;">
                        </div>
                        <h3 style="margin: 10px 0; font-size: 16px;">Use ${item.name}?</h3>
                        <p style="margin: 10px 0; font-size: 13px;">${item.description}</p>
                        <img src="${robot.happyImage}" style="width: 50px; height: 50px; margin: 10px 0;">
                        <p style="margin: 10px 0; font-weight: 700; font-size: 14px;">Apply to ${robot.name}?</p>
                        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
                            <button onclick="app.confirmItemUseYes('${itemId}', '${robotId}')" style="padding: 10px 20px; background: #65D46E; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer;">
                                Yes, Use It
                            </button>
                            <button onclick="app.closeItemPrompt()" style="padding: 10px 20px; background: rgba(255, 255, 255, 0.2); color: white; border: 2px solid white; border-radius: 8px; font-weight: 700; cursor: pointer;">
                                Cancel
                            </button>
                        </div>
                    </div>
                `;
                
                this.showItemPrompt(message);
            },
            
            confirmItemUseYes(itemId, robotId) {
                this.closeItemPrompt();
                this.useItem(itemId, robotId);
            },

            renderRobotOptions() {
                const container = document.getElementById('robotSelectGrid');
                
                if (!container) return;
                
                // Defensive check: Ensure robots are loaded
                if (!this.robots || this.robots.length === 0) {
                    console.warn('⚠️ [renderRobotOptions] Robots not loaded yet, retrying in 100ms...');
                    setTimeout(() => this.renderRobotOptions(), 100);
                    return;
                }
                
                // Filter to only show owned robots with valid data
                const ownedRobots = this.robots.filter(robot => 
                    robot && robot.id && this.data.ownedRobots.includes(robot.id)
                );
                
                console.log(`🤖 [renderRobotOptions] Total robots available: ${this.robots.length}`);
                console.log(`🤖 [renderRobotOptions] Owned robot IDs:`, this.data.ownedRobots);
                console.log(`🤖 [renderRobotOptions] Rendering ${ownedRobots.length} owned robots:`, ownedRobots.map(r => r.name));
                
                // CRITICAL: If user owns APIBOT2 but it's not in ownedRobots, something is wrong
                if (this.data.ownedRobots.includes('APIBOT2')) {
                    const apiBot2Present = ownedRobots.some(r => r.id === 'APIBOT2');
                    if (!apiBot2Present) {
                        console.error('🚨🚨🚨 CRITICAL: User owns APIBOT2 but it did not load!');
                        console.error('Available robot IDs:', this.robots.map(r => r.id));
                        console.error('This should have been caught by priority loading. Attempting emergency reload...');
                        
                        // Emergency: Try to reload APIBOT2 right now
                        setTimeout(async () => {
                            const apiBot = await ChoreRobotLoader.loadRobot('APIBOT2');
                            if (apiBot && !this.robots.some(r => r.id === 'APIBOT2')) {
                                this.robots.push(apiBot);
                                console.log('✅ Emergency reload successful! Re-rendering...');
                                this.renderRobotOptions();
                            }
                        }, 500);
                    }
                }
                
                // Validate robot data
                ownedRobots.forEach(robot => {
                    if (!robot.happyImage) {
                        console.warn(`⚠️ [renderRobotOptions] Robot ${robot.id} missing happyImage:`, robot);
                    }
                    // Special validation for APIBOT2
                    if (robot.id === 'APIBOT2') {
                        if (!robot.dialogue) {
                            console.error(`❌ [renderRobotOptions] APIBOT2 missing dialogue! This will cause issues.`);
                        } else if (!robot.dialogue.success || !Array.isArray(robot.dialogue.success)) {
                            console.error(`❌ [renderRobotOptions] APIBOT2 dialogue malformed:`, robot.dialogue);
                        } else {
                            console.log(`✅ [renderRobotOptions] APIBOT2 validated - dialogue loaded properly`);
                        }
                    }
                });
                
                // Create zig-zag layout using the specified slot pattern
                // Pattern: [1][2][5][7][9]...
                //          [3][4][6][8][10]...
                // Robots fill sequentially: 1st robot->Slot1, 2nd robot->Slot2, etc.
                const createZigZagLayout = (robots) => {
                    const row1 = [];
                    const row2 = [];
                    
                    // For each robot, determine its visual position based on slot number
                    robots.forEach((robot, robotIndex) => {
                        const slotNumber = robotIndex + 1; // 1-based slot numbering
                        
                        // Determine position based on slot number pattern
                        if (slotNumber === 1 || slotNumber === 2) {
                            // First 2x2 block, top row
                            row1.push(robot);
                        } else if (slotNumber === 3 || slotNumber === 4) {
                            // First 2x2 block, bottom row
                            row2.push(robot);
                        } else {
                            // For slots 5+, determine which block and position
                            const adjustedSlot = slotNumber - 4; // Slots 5,6,7,8 become 1,2,3,4
                            const blockNumber = Math.floor((adjustedSlot - 1) / 4);
                            const positionInBlock = ((adjustedSlot - 1) % 4) + 1;
                            
                            if (positionInBlock === 1 || positionInBlock === 2) {
                                // Top row of this block
                                row1.push(robot);
                            } else {
                                // Bottom row of this block  
                                row2.push(robot);
                            }
                        }
                    });
                    
                    // Ensure both rows have the same length by padding with nulls
                    const maxLength = Math.max(row1.length, row2.length);
                    while (row1.length < maxLength) row1.push(null);
                    while (row2.length < maxLength) row2.push(null);
                    
                    return { row1, row2 };
                };
                
                const { row1, row2 } = createZigZagLayout(ownedRobots);
                
                // Create robot card HTML
                const createRobotCard = (robot) => {
                    if (!robot) {
                        return `
                            <div class="robot-select-card empty-slot">
                                <div class="empty-slot-icon">⚪</div>
                                <div class="empty-slot-text">Empty Slot</div>
                            </div>
                        `;
                    }
                    
                    // Get battery level and color
                    const battery = Math.round(this.getRobotBattery(robot.id));
                    const batteryColor = this.getBatteryColor(battery);
                    const isBroken = battery === 0;
                    
                    // Get battery class for styling
                    let batteryClass = 'battery-perfect';
                    if (battery < 75 && battery >= 50) batteryClass = 'battery-good';
                    else if (battery < 50 && battery >= 25) batteryClass = 'battery-low';
                    else if (battery < 25 && battery > 0) batteryClass = 'battery-critical';
                    else if (battery === 0) batteryClass = 'battery-broken';
                    
                    // Ensure default bot has durability data initialized
                    if (robot.id === 'default' && !this.data.robotBonds[robot.id]) {
                        this.initializeRobotDurability(robot.id);
                        this.saveData();
                    }
                    
                    // Also ensure existing default bot has solar panel flag
                    if (robot.id === 'default' && this.data.robotBonds[robot.id] && !this.data.robotBonds[robot.id].durability.hasSolarPanel) {
                        this.data.robotBonds[robot.id].durability.hasSolarPanel = true;
                        this.saveData();
                    }
                    
                    const durability = this.data.robotBonds[robot.id]?.durability;
                    const hasSolarPanel = durability?.hasSolarPanel || false;
                    
                    // Calculate repair cost
                    const repairCost = Math.floor(robot.cost * 0.5);
                    
                    // Show broken image if robot is broken
                    // Defensive: Use fallback image if robot images are missing
                    const robotImage = isBroken ? 
                        (robot.thinkingImage || robot.sadImage || robot.happyImage || 'Imag/mascot.png') : 
                        (robot.happyImage || 'Imag/mascot.png');
                    
                    // Get time remaining
                    const timeRemaining = this.getBatteryTimeRemaining(robot.id);
                    const timeDisplay = timeRemaining ? `<div class="robot-battery-timer">${timeRemaining}</div>` : '';
                    
                    return `
                        <div class="robot-select-card ${robot.id === this.data.selectedRobotId ? 'selected' : ''} ${isBroken ? 'broken' : ''}" 
                             data-robot-id="${robot.id}"
                             ${isBroken ? '' : `onclick="app.selectRobot('${robot.id}')"`}
                             ondragover="app.handleRobotDragOver(event)"
                             ondragleave="app.handleRobotDragLeave(event)"
                             ondrop="app.handleRobotDrop(event, '${robot.id}')">
                            <img src="${robotImage}" 
                                 alt="${robot.name}" 
                                 class="robot-select-card-image"
                                 onerror="this.src='Imag/mascot.png'; console.warn('Failed to load image for ${robot.name}')">
                            <div class="robot-select-card-name">${robot.name}${hasSolarPanel ? ' ☀️' : ''}</div>
                            
                            <!-- Battery Bar with Label and Timer -->
                            <div class="robot-battery-label">
                                <span>Battery: <span style="color: ${batteryColor};">${isBroken ? 'BROKEN' : battery + '%'}</span></span>
                                ${timeDisplay}
                            </div>
                            <div class="robot-battery-container">
                                <div class="robot-battery-bar ${batteryClass}" style="width: ${battery}%;"></div>
                                <div class="robot-battery-text">${battery}%</div>
                            </div>
                            
                            ${isBroken ? `
                                <button class="robot-repair-button" onclick="event.stopPropagation(); app.repairRobot('${robot.id}')">
                                    🔧 Repair - Cost: ${repairCost} ⚡
                                </button>
                            ` : `
                                <div class="robot-select-card-status">
                                    ${robot.id === this.data.selectedRobotId ? 'Currently Active' : 'Available'}
                                </div>
                            `}
                            
                            ${robot.id === this.data.selectedRobotId && !isBroken ? 
                                '<div class="robot-selected-badge">✓</div>' : ''}
                        </div>
                    `;
                };
                
                // Display robots in zig-zag pattern
                container.innerHTML = `
                    <div class="robot-select-row">
                        ${row1.map(createRobotCard).join('')}
                    </div>
                    <div class="robot-select-row">
                        ${row2.map(createRobotCard).join('')}
                    </div>
                `;
            },

            selectRobot(robotId) {
                this.data.selectedRobotId = robotId;
                this.saveData();
                this.renderRobotOptions();
                
                // Update mascot image
                const selectedRobot = this.robots.find(r => r.id === robotId);
                const mascotImg = document.querySelector('.mascot-container-global img');
                if (mascotImg && selectedRobot) {
                    mascotImg.src = selectedRobot.happyImage;
                }
                
                // Mascot speaks with custom dialogue if available
                if (selectedRobot && selectedRobot.hasCustomDialogue) {
                    const message = selectedRobot.dialogue.greeting[Math.floor(Math.random() * selectedRobot.dialogue.greeting.length)];
                    this.showSpeechBubble(message, 'regular');
                } else {
                    this.mascotSpeak(`You selected ${selectedRobot.name}! Let's keep things clean!`);
                }
            },

            loadSelectedRobot() {
                // Load the selected robot on app startup
                const selectedRobot = this.robots.find(r => r.id === this.data.selectedRobotId) || this.robots[0];
                const mascotImg = document.querySelector('.mascot-container-global img');
                if (mascotImg && selectedRobot) {
                    mascotImg.src = selectedRobot.happyImage;
                }
            },

            setRandomMainBackground() {
                document.body.style.backgroundImage = `url('Imag/Main Background 2.png')`;
            },

            initMascotDodge() {
                const mascotContainer = document.querySelector('.mascot-container-global');
                let dodgeTimeout;

                document.addEventListener('click', (e) => {
                    const mascotRect = mascotContainer.getBoundingClientRect();
                    const mascotCenterX = mascotRect.left + mascotRect.width / 2;
                    const mascotCenterY = mascotRect.top + mascotRect.height / 2;
                    
                    const distance = Math.sqrt(
                        Math.pow(e.clientX - mascotCenterX, 2) + 
                        Math.pow(e.clientY - mascotCenterY, 2)
                    );

                    // If click is within 150px of mascot, make it dodge
                    if (distance < 150) {
                        const angle = Math.atan2(mascotCenterY - e.clientY, mascotCenterX - e.clientX);
                        const dodgeDistance = 80;
                        const dodgeX = Math.cos(angle) * dodgeDistance;
                        const dodgeY = Math.sin(angle) * dodgeDistance;

                        mascotContainer.classList.add('dodging');
                        mascotContainer.style.transform = `translate(${dodgeX}px, ${dodgeY}px)`;

                        clearTimeout(dodgeTimeout);
                        dodgeTimeout = setTimeout(() => {
                            mascotContainer.classList.remove('dodging');
                            mascotContainer.style.transform = '';
                        }, 1000);
                    }
                });

                document.addEventListener('touchstart', (e) => {
                    if (e.touches.length === 0) return;
                    const touch = e.touches[0];
                    const mascotRect = mascotContainer.getBoundingClientRect();
                    const mascotCenterX = mascotRect.left + mascotRect.width / 2;
                    const mascotCenterY = mascotRect.top + mascotRect.height / 2;
                    
                    const distance = Math.sqrt(
                        Math.pow(touch.clientX - mascotCenterX, 2) + 
                        Math.pow(touch.clientY - mascotCenterY, 2)
                    );

                    if (distance < 150) {
                        const angle = Math.atan2(mascotCenterY - touch.clientY, mascotCenterX - touch.clientX);
                        const dodgeDistance = 80;
                        const dodgeX = Math.cos(angle) * dodgeDistance;
                        const dodgeY = Math.sin(angle) * dodgeDistance;

                        mascotContainer.classList.add('dodging');
                        mascotContainer.style.transform = `translate(${dodgeX}px, ${dodgeY}px)`;

                        clearTimeout(dodgeTimeout);
                        dodgeTimeout = setTimeout(() => {
                            mascotContainer.classList.remove('dodging');
                            mascotContainer.style.transform = '';
                        }, 1000);
                    }
                });
            },

            initializeSelfCareData() {
                const now = Date.now();
                return {
                    enabled: false,
                    lastReset: now,
                    bedtimeTarget: '22:00', // Default 10:00 PM
                    groups: [
                        {
                            id: 'basic',
                            name: 'Basic Self-Care & Hygiene',
                            tasks: [
                                { id: 'bed', name: 'Get out of bed', completed: false, earnedToday: false },
                                { id: 'brush', name: 'Brush teeth', completed: false, earnedToday: false },
                                { id: 'floss', name: 'Floss', completed: false, earnedToday: false },
                                { id: 'wash-face', name: 'Wash face', completed: false, earnedToday: false },
                                { id: 'shower', name: 'Take a shower or bath', completed: false, earnedToday: false },
                                { id: 'dressed', name: 'Get dressed (even just into clean pajamas)', completed: false, earnedToday: false },
                                { id: 'medication', name: 'Take vitamins/ medication', completed: false, earnedToday: false, optional: true }
                            ],
                            bonusEarned: false
                        },
                        {
                            id: 'physical',
                            name: 'Physical Health',
                            tasks: [
                                { id: 'water', name: 'Drink Water', completed: false, earnedToday: false },
                                { id: 'breakfast', name: 'Eat breakfast / lunch / dinner', completed: false, earnedToday: false },
                                { id: 'healthy', name: 'Eat something healthy', completed: false, earnedToday: false },
                                { id: 'walk', name: 'Go for a walk', completed: false, earnedToday: false },
                                { id: 'outside', name: 'Step outside for 5 minutes', completed: false, earnedToday: false },
                                { id: 'stretch', name: 'Stretch for 5 minutes', completed: false, earnedToday: false },
                                { id: 'workout', name: 'Complete a workout', completed: false, earnedToday: false },
                                { id: 'bedtime', name: 'Go to bed by set time', completed: false, earnedToday: false }
                            ],
                            bonusEarned: false
                        },
                        {
                            id: 'other',
                            name: 'Other Tasks',
                            tasks: [
                                { id: 'cash', name: 'Set aside extra cash for yourself if possible', completed: false, earnedToday: false, optional: true },
                                { id: 'mail', name: 'Check mail', completed: false, earnedToday: false },
                                { id: 'plants', name: 'Water plants', completed: false, earnedToday: false, optional: true },
                                { id: 'pet', name: 'Feed a pet', completed: false, earnedToday: false, optional: true },
                                { id: 'study', name: 'Study for 20 minutes', completed: false, earnedToday: false },
                                { id: 'bill', name: 'Pay a bill', completed: false, earnedToday: false, optional: true }
                            ],
                            bonusEarned: false
                        }
                    ]
                };
            },

            loadData() {
                const currentFile = localStorage.getItem('upkeepCurrentFile') || 'default';
                this.data.currentSaveFile = currentFile;
                
                const saved = localStorage.getItem(`upkeepData_${currentFile}`);
                if (saved) {
                    this.data = JSON.parse(saved);
                    this.data.currentSaveFile = currentFile;
                    
                    // Ensure activityLog exists
                    if (!this.data.activityLog) {
                        this.data.activityLog = [];
                    }
                    
                    // Ensure ownedRobots exists (for backward compatibility with old saves)
                    if (!this.data.ownedRobots) {
                        this.data.ownedRobots = ['default'];
                    }
                    
                    // Ensure currentDeck exists (for backward compatibility with old saves)
                    if (!this.data.currentDeck) {
                        this.data.currentDeck = [];
                    }
                    
                    // Ensure savedDecks exists (for backward compatibility with old saves)
                    if (!this.data.savedDecks) {
                        this.data.savedDecks = [];
                    }
                    
                    // Ensure currency exists (for backward compatibility with old saves)
                    if (this.data.currency === undefined || this.data.currency === null) {
                        this.data.currency = 250;
                    }
                    
                    // Ensure selectedRobotId exists
                    if (!this.data.selectedRobotId) {
                        this.data.selectedRobotId = 'default';
                    }
                    
                    // Ensure voice settings exist
                    if (this.data.ttsEnabled === undefined) {
                        this.data.ttsEnabled = true;
                    }
                    if (!this.data.voiceStyle) {
                        this.data.voiceStyle = 'robotic';
                    }
                    if (!this.data.voicePitch) {
                        this.data.voicePitch = 1.5;
                    }
                    if (!this.data.voiceRate) {
                        this.data.voiceRate = 1.2;
                    }
                    if (!this.data.scrappyPitch) {
                        this.data.scrappyPitch = 0.5;
                    }
                    if (!this.data.scrappyRate) {
                        this.data.scrappyRate = 1.3;
                    }
                    
                    // Ensure auto-snooze setting exists (default ON for backward compatibility)
                    if (this.data.autoSnoozeEnabled === undefined) {
                        this.data.autoSnoozeEnabled = true;
                    }
                    
                    // Ensure group task visibility toggle exists (default OFF/hidden for backward compatibility)
                    if (this.data.showGroupTasksInRegularCategories === undefined) {
                        this.data.showGroupTasksInRegularCategories = false;
                    }
                    
                    // INPUT INTEGRITY: Ensure all tasks have decayUnit for accurate display
                    // This preserves user's chosen unit (e.g., "6 weeks" stays as "6w", never converts to "1mo")
                    this.data.categories.forEach(category => {
                        if (category.tasks) {
                            category.tasks.forEach(task => {
                                if (!task.decayUnit && task.decayMs) {
                                    // Backward compatibility: infer most likely unit from decayMs
                                    const day = 24 * 60 * 60 * 1000;
                                    if (task.decayMs % (30 * day) === 0) {
                                        task.decayUnit = 'months';
                                    } else if (task.decayMs % (7 * day) === 0) {
                                        task.decayUnit = 'weeks';
                                    } else if (task.decayMs % day === 0) {
                                        task.decayUnit = 'days';
                                    } else {
                                        task.decayUnit = 'hours';
                                    }
                                }
                            });
                        }
                    });
                    
                    // MIGRATION FIX: Ensure all snoozed tasks have frozenFreshness set
                    // This fixes any tasks that were snoozed before the frozenFreshness fix
                    this.data.categories.forEach(category => {
                        if (category.tasks) {
                            category.tasks.forEach(task => {
                                const isSnoozed = task.snoozedUntil && task.snoozedUntil > Date.now();
                                if (isSnoozed && task.frozenFreshness === undefined) {
                                    // Freeze freshness at current level to prevent further decay
                                    task.frozenFreshness = task.freshness || 0;
                                }
                            });
                        }
                    });
                    
                    // Ensure itemInventory exists (for backward compatibility with old saves)
                    if (!this.data.itemInventory) {
                        this.data.itemInventory = {
                            OILDRINK: 0,
                            BATTERY: 0,
                            MEGABATTERY: 0,
                            SOLARPANEL: 0
                        };
                    }
                    // Ensure SOLARPANEL exists in existing inventories
                    if (this.data.itemInventory && this.data.itemInventory.SOLARPANEL === undefined) {
                        this.data.itemInventory.SOLARPANEL = 0;
                    }
                    
                    // Ensure robotBonds exists (for battery/durability system)
                    if (!this.data.robotBonds) {
                        this.data.robotBonds = {};
                    }
                    // Initialize durability for all owned robots (including default with solar panel)
                    this.data.ownedRobots.forEach(robotId => {
                        if (!this.data.robotBonds[robotId]) {
                            this.initializeRobotDurability(robotId);
                        }
                    });
                    
                    // Ensure mission fields exist
                    if (!this.data.lastDailyReset) {
                        this.data.lastDailyReset = null;
                    }
                    if (!this.data.lastDailyResetDate) {
                        this.data.lastDailyResetDate = '';
                    }
                    if (this.data.dailyChoresCompleted === undefined) {
                        this.data.dailyChoresCompleted = 0;
                    }
                    if (this.data.dailyBonusClaimed === undefined) {
                        this.data.dailyBonusClaimed = false;
                    }
                    if (!this.data.dailyMissionStatus) {
                        this.data.dailyMissionStatus = {
                            checkIn: 'unclaimed',
                            twoChores: 'incomplete',
                            fourChores: 'incomplete'
                        };
                    }
                    if (!this.data.currentMissionTab) {
                        this.data.currentMissionTab = 'daily';
                    }
                    
                    // Ensure Self Care data exists
                    if (!this.data.selfCare) {
                        this.data.selfCare = this.initializeSelfCareData();
                    }
                    
                    // Load Gamification streak data
                    if (typeof Gamification !== 'undefined' && this.data.gamification) {
                        Gamification.loadData(this.data.gamification);
                    }
                } else {
                    // Demo data for first-time users
                    this.data = {
                        categories: [
                            {
                                id: Date.now(),
                                name: 'Kitchen',
                                tasks: [
                                    {
                                        id: Date.now() + 1,
                                        name: 'Wipe down counters',
                                        decayMs: 2 * 24 * 60 * 60 * 1000, // 2 days
                                        decayUnit: 'days',
                                        lastCompleted: Date.now() - (1 * 24 * 60 * 60 * 1000), // 1 day ago
                                        freshness: 50
                                    },
                                    {
                                        id: Date.now() + 2,
                                        name: 'Clean stovetop',
                                        decayMs: 3 * 24 * 60 * 60 * 1000, // 3 days
                                        decayUnit: 'days',
                                        lastCompleted: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
                                        freshness: 33
                                    }
                                ]
                            },
                            {
                                id: Date.now() + 100,
                                name: 'Bathroom',
                                tasks: [
                                    {
                                        id: Date.now() + 101,
                                        name: 'Clean toilet',
                                        decayMs: 7 * 24 * 60 * 60 * 1000, // 7 days
                                        decayUnit: 'weeks',
                                        lastCompleted: Date.now() - (3 * 24 * 60 * 60 * 1000), // 3 days ago
                                        freshness: 57
                                    }
                                ]
                            }
                        ],
                        currentCategoryId: null,
                        currentTaskId: null,
                        currentSaveFile: currentFile,
                        lastSaveTime: Date.now(),
                        ttsEnabled: true,
                        activityLog: [],
                        voiceStyle: 'robotic',
                        voicePitch: 1.5,
                        voiceRate: 1.2,
                        scrappyPitch: 0.5,
                        scrappyRate: 1.3,
                        selectedRobotId: 'default',
                        currency: 250,
                        ownedRobots: ['default'],
                        currentDeck: [],
                        savedDecks: []
                    };
                    this.saveData();
                }
            },

            saveData() {
                this.data.lastSaveTime = Date.now();
                
                // Save Gamification streak data
                if (typeof Gamification !== 'undefined') {
                    this.data.gamification = Gamification.saveData();
                }
                
                localStorage.setItem(`upkeepData_${this.data.currentSaveFile}`, JSON.stringify(this.data));
                localStorage.setItem('upkeepCurrentFile', this.data.currentSaveFile);
                
                // Update save file list
                const saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                if (!saveFiles.find(f => f.name === this.data.currentSaveFile)) {
                    saveFiles.push({
                        name: this.data.currentSaveFile,
                        displayName: this.data.currentSaveFile === 'default' ? 'Default Save' : this.data.currentSaveFile,
                        lastModified: Date.now()
                    });
                    localStorage.setItem('upkeepSaveFiles', JSON.stringify(saveFiles));
                } else {
                    // Update last modified time
                    const file = saveFiles.find(f => f.name === this.data.currentSaveFile);
                    file.lastModified = Date.now();
                    localStorage.setItem('upkeepSaveFiles', JSON.stringify(saveFiles));
                }
            },

            // OBONXO Cheat Code Check Function
            checkObonxoCheatStatus() {
                // Search for a category with the exact name "OBONXO"
                const obonxoCategory = this.data.categories.find(category => category.name === "OBONXO");
                
                if (!obonxoCategory) {
                    this.isObonxoCheatActive = false;
                    return;
                }
                
                // Search for a chore named "OBONXO" within the "OBONXO" category
                const obonxoChore = obonxoCategory.tasks && obonxoCategory.tasks.find(task => task.name === "OBONXO");
                
                if (obonxoChore) {
                    this.isObonxoCheatActive = true;
                    
                    // Auto-complete all daily missions when cheat is active
                    this.data.dailyMissionStatus.checkIn = 'completed';
                    this.data.dailyMissionStatus.twoChores = 'completed';
                    this.data.dailyMissionStatus.fourChores = 'completed';
                    this.data.dailyChoresCompleted = Math.max(this.data.dailyChoresCompleted, 4); // Ensure enough chores completed
                } else {
                    this.isObonxoCheatActive = false;
                }
            },

            updateDecay() {
                let updated = false;
                this.data.categories.forEach(category => {
                    if (!category.tasks) return;
                    category.tasks.forEach(task => {
                        // Check if task is snoozed
                        const isSnoozed = task.snoozedUntil && task.snoozedUntil > Date.now();
                        
                        // Auto-resume if snooze period has ended
                        if (task.snoozedUntil && task.snoozedUntil <= Date.now()) {
                            if (task.frozenFreshness !== undefined) {
                                task.freshness = task.frozenFreshness;
                                delete task.frozenFreshness;
                            }
                            delete task.snoozedUntil;
                            updated = true;
                        }
                        
                        // Don't decay if snoozed
                        if (isSnoozed) {
                            return;
                        }
                        
                        if (task.lastCompleted) {
                            const elapsed = Date.now() - task.lastCompleted;
                            const freshness = Math.max(0, Math.min(100, 100 - (elapsed / task.decayMs) * 100));
                            if (Math.abs(task.freshness - freshness) > 0.1) {
                                task.freshness = freshness;
                                updated = true;
                            }
                        }
                    });
                });
                if (updated) {
                    this.saveData();
                    this.render();
                }
            },

            calculateCategoryScore(category) {
                if (!category.tasks || category.tasks.length === 0) return 0;
                const sum = category.tasks.reduce((acc, task) => acc + (task.freshness || 0), 0);
                return Math.round(sum / category.tasks.length);
            },

            calculateOverallScore() {
                // Filter out Group Categories (they don't affect overall score)
                const standardCategories = this.data.categories.filter(cat => !cat.isGroupCategory);
                if (standardCategories.length === 0) return 0;
                const sum = standardCategories.reduce((acc, cat) => acc + this.calculateCategoryScore(cat), 0);
                return Math.round(sum / standardCategories.length);
            },

            getProgressClass(score) {
                if (score >= 70) return '';
                if (score >= 40) return 'warning';
                return 'danger';
            },

            formatTimeAgo(timestamp) {
                if (!timestamp) return 'Never';
                const seconds = Math.floor((Date.now() - timestamp) / 1000);
                if (seconds < 60) return 'Just now';
                const minutes = Math.floor(seconds / 60);
                if (minutes < 60) return `${minutes}m ago`;
                const hours = Math.floor(minutes / 60);
                if (hours < 24) return `${hours}h ago`;
                const days = Math.floor(hours / 24);
                if (days < 7) return `${days}d ago`;
                const weeks = Math.floor(days / 7);
                if (weeks < 4) return `${weeks}w ago`;
                const months = Math.floor(days / 30);
                return `${months}mo ago`;
            },

            formatDecayTime(ms, originalUnit) {
                // STRICT INPUT INTEGRITY: If originalUnit is provided, use it exclusively
                // This ensures "6 weeks" ALWAYS displays as "6w", never auto-converts to "1mo"
                if (originalUnit) {
                    const day = 24 * 60 * 60 * 1000;
                    switch (originalUnit) {
                        case 'hours':
                            const hours = Math.round(ms / (60 * 60 * 1000));
                            return `${hours}h`;
                        case 'days':
                            const days = Math.round(ms / day);
                            return `${days}d`;
                        case 'weeks':
                            const weeks = Math.round(ms / (7 * day));
                            return `${weeks}w`;
                        case 'months':
                            const months = Math.round(ms / (30 * day));
                            return `${months}mo`;
                    }
                }
                
                // FALLBACK: Only used for old tasks without stored unit (backward compatibility)
                const hours = ms / (60 * 60 * 1000);
                if (hours < 24) return `${Math.round(hours)}h`;
                const days = hours / 24;
                if (days < 7) return `${Math.round(days)}d`;
                const weeks = days / 7;
                // Display as weeks if less than 8 weeks (56 days) to avoid "6 weeks = 1 month" error
                if (weeks < 8) return `${Math.round(weeks)}w`;
                const months = days / 30;
                return `${Math.round(months)}mo`;
            },

            // STRICT HIERARCHICAL CONVERSION - Full human-readable format
            // RULE 1: Hours > 24 → Convert to "X Days Y Hours"
            // RULE 2: Days > 7 → Convert to "X Weeks Y Days"  
            // RULE 3: Weeks → NEVER convert to months (stays as weeks forever)
            // RULE 4: Months → Only if explicitly set by user
            formatDecayTimeHierarchical(ms, originalUnit) {
                const hour = 60 * 60 * 1000;
                const day = 24 * hour;
                const week = 7 * day;
                const month = 30 * day;

                // If user explicitly set months, display in months
                if (originalUnit === 'months') {
                    const totalMonths = Math.floor(ms / month);
                    const remainingDays = Math.floor((ms % month) / day);
                    if (remainingDays > 0) {
                        return `${totalMonths} Month${totalMonths !== 1 ? 's' : ''} ${remainingDays} Day${remainingDays !== 1 ? 's' : ''}`;
                    }
                    return `${totalMonths} Month${totalMonths !== 1 ? 's' : ''}`;
                }

                // If user set weeks, display in weeks (NEVER convert to months)
                if (originalUnit === 'weeks') {
                    const totalWeeks = Math.floor(ms / week);
                    const remainingDays = Math.floor((ms % week) / day);
                    if (remainingDays > 0) {
                        return `${totalWeeks} Week${totalWeeks !== 1 ? 's' : ''} ${remainingDays} Day${remainingDays !== 1 ? 's' : ''}`;
                    }
                    return `${totalWeeks} Week${totalWeeks !== 1 ? 's' : ''}`;
                }

                // If user set days, convert to weeks if > 7 days
                if (originalUnit === 'days') {
                    const totalDays = Math.floor(ms / day);
                    if (totalDays >= 7) {
                        const weeks = Math.floor(totalDays / 7);
                        const days = totalDays % 7;
                        if (days > 0) {
                            return `${weeks} Week${weeks !== 1 ? 's' : ''} ${days} Day${days !== 1 ? 's' : ''}`;
                        }
                        return `${weeks} Week${weeks !== 1 ? 's' : ''}`;
                    }
                    return `${totalDays} Day${totalDays !== 1 ? 's' : ''}`;
                }

                // If user set hours, convert to days if > 24 hours
                if (originalUnit === 'hours') {
                    const totalHours = Math.floor(ms / hour);
                    if (totalHours >= 24) {
                        const days = Math.floor(totalHours / 24);
                        const hours = totalHours % 24;
                        if (hours > 0) {
                            return `${days} Day${days !== 1 ? 's' : ''} ${hours} Hour${hours !== 1 ? 's' : ''}`;
                        }
                        return `${days} Day${days !== 1 ? 's' : ''}`;
                    }
                    return `${totalHours} Hour${totalHours !== 1 ? 's' : ''}`;
                }

                // Fallback for tasks without unit
                const totalDays = Math.floor(ms / day);
                if (totalDays >= 7) {
                    const weeks = Math.floor(totalDays / 7);
                    const days = totalDays % 7;
                    if (days > 0) {
                        return `${weeks} Week${weeks !== 1 ? 's' : ''} ${days} Day${days !== 1 ? 's' : ''}`;
                    }
                    return `${weeks} Week${weeks !== 1 ? 's' : ''}`;
                }
                if (totalDays > 0) {
                    return `${totalDays} Day${totalDays !== 1 ? 's' : ''}`;
                }
                const totalHours = Math.floor(ms / hour);
                return `${totalHours} Hour${totalHours !== 1 ? 's' : ''}`;
            },

            // LIVE COUNTDOWN - Shows time remaining until freshness = 0
            formatLiveCountdown(task) {
                if (!task.lastCompleted) {
                    return 'Never started';
                }

                const elapsed = Date.now() - task.lastCompleted;
                const timeLeft = task.decayMs - elapsed;

                if (timeLeft <= 0) {
                    return 'Decayed';
                }

                const hour = 60 * 60 * 1000;
                const day = 24 * hour;
                const week = 7 * day;

                // Format countdown based on time scale
                if (timeLeft >= week) {
                    const weeks = Math.floor(timeLeft / week);
                    const days = Math.floor((timeLeft % week) / day);
                    if (days > 0) {
                        return `${weeks}w ${days}d left`;
                    }
                    return `${weeks}w left`;
                }

                if (timeLeft >= day) {
                    const days = Math.floor(timeLeft / day);
                    const hours = Math.floor((timeLeft % day) / hour);
                    if (hours > 0) {
                        return `${days}d ${hours}h left`;
                    }
                    return `${days}d left`;
                }

                if (timeLeft >= hour) {
                    const hours = Math.floor(timeLeft / hour);
                    const minutes = Math.floor((timeLeft % hour) / (60 * 1000));
                    if (minutes > 0) {
                        return `${hours}h ${minutes}m left`;
                    }
                    return `${hours}h left`;
                }

                const minutes = Math.floor(timeLeft / (60 * 1000));
                return `${minutes}m left`;
            },

            getDecayMs(value, unit) {
                const val = parseInt(value);
                const day = 24 * 60 * 60 * 1000;
                switch (unit) {
                    case 'hours': return val * 60 * 60 * 1000;
                    case 'days': return val * day;
                    case 'weeks': return val * 7 * day;
                    case 'months': return val * 30 * day;
                    default: return val * day;
                }
            },

            render() {
                const dashboardView = document.getElementById('dashboardView');
                const categoryView = document.getElementById('categoryView');
                const subCategoryMenuView = document.getElementById('subCategoryMenuView');
                const subCategoryTaskView = document.getElementById('subCategoryTaskView');
                
                if (this.data.currentCategoryId === 'SELFCARE') {
                    dashboardView.classList.remove('active');
                    categoryView.classList.add('active');
                    subCategoryMenuView.classList.remove('active');
                    subCategoryTaskView.classList.remove('active');
                    this.renderSelfCare();
                } else if (this.data.currentCategoryId) {
                    dashboardView.classList.remove('active');
                    categoryView.classList.add('active');
                    subCategoryMenuView.classList.remove('active');
                    subCategoryTaskView.classList.remove('active');
                    this.renderCategory();
                } else {
                    dashboardView.classList.add('active');
                    categoryView.classList.remove('active');
                    subCategoryMenuView.classList.remove('active');
                    subCategoryTaskView.classList.remove('active');
                    this.renderDashboard();
                }
                
                // Update mascot mood based on scores
                setTimeout(() => this.updateMascotMood(), 500);
            },

            renderDashboard() {
                const overallScore = this.calculateOverallScore();
                document.getElementById('overallScore').textContent = `${overallScore}%`;
                const overallProgress = document.getElementById('overallProgress');
                overallProgress.style.width = `${overallScore}%`;
                overallProgress.className = `progress-fill ${this.getProgressClass(overallScore)}`;

                // Update save file name display
                const saveFileDisplay = document.getElementById('saveFileDisplay');
                const displayName = this.data.currentSaveFile === 'default' ? 'Default Save' : this.data.currentSaveFile;
                saveFileDisplay.textContent = displayName;

                const categoryList = document.getElementById('categoryList');
                
                // Build Self Care card if enabled
                let selfCareCard = '';
                if (this.data.selfCare && this.data.selfCare.enabled) {
                    // Self Care card without percentage (doesn't affect upkeep score)
                    selfCareCard = `
                        <div class="category-card" onclick="app.showSelfCare()" style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); position: relative;">
                            <div style="position: absolute; top: 8px; right: 8px; font-size: 24px;">❤️</div>
                            <div class="category-header">
                                <div class="category-name" style="color: white; font-weight: 700;">Self Care</div>
                            </div>
                            <div style="text-align: center; color: rgba(255,255,255,0.9); font-size: 12px; margin-top: -8px;">
                                Track your wellness
                            </div>
                        </div>
                    `;
                }
                
                if (this.data.categories.length === 0 && !selfCareCard) {
                    categoryList.innerHTML = `
                        <div class="empty-state" style="grid-column: 1 / -1;">
                            <div class="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M5.4 10.5h13.2"/><path d="M5.4 10.5V4.5c0-1.1.9-2 2-2h8.2c1.1 0 2 .9 2 2v6"/><path d="M10.2 10.5V2.5"/><path d="M13.8 10.5V2.5"/><path d="M18.6 10.5c.9 0 1.8.3 2.4.9"/><path d="M18.6 10.5H5.4c-.9 0-1.8.3-2.4.9"/><path d="M3 11.4v7.1c0 1.1.9 2 2-2h14c1.1 0 2-.9 2-2v-7.1"/></svg></div>
                            <div class="empty-text">No categories yet. Add one with the '+' button!</div>
                        </div>
                    `;
                } else {
                    // Filter categories based on active tab
                    let filteredCategories = this.data.categories;
                    if (this.data.currentCategoryTab === 'regular') {
                        filteredCategories = this.data.categories.filter(cat => !cat.isGroupCategory);
                    } else if (this.data.currentCategoryTab === 'group') {
                        filteredCategories = this.data.categories.filter(cat => cat.isGroupCategory);
                    }
                    
                    // Check if filtered list is empty
                    if (filteredCategories.length === 0) {
                        const emptyMessage = this.data.currentCategoryTab === 'regular' 
                            ? 'No regular categories yet. Add one with the \'+\' button!'
                            : 'No group categories yet. Create one with the \'+\' button!';
                        categoryList.innerHTML = selfCareCard + `
                            <div class="empty-state" style="grid-column: 1 / -1;">
                                <div class="empty-icon">📋</div>
                                <div class="empty-text">${emptyMessage}</div>
                            </div>
                        `;
                        return;
                    }
                    
                    const regularCategoriesHTML = filteredCategories.map((category, index) => {
                        const score = this.calculateCategoryScore(category);
                        const color = this.ui.categoryColors[index % this.ui.categoryColors.length];
                        const bgImage = this.ui.categoryBackgrounds[category.name] || '';
                        const bgStyle = bgImage ? `background-image: url('${bgImage}');` : `background: ${color.bg};`;
                        
                        // Drag and drop attributes
                        const dragAttrs = `draggable="true" 
                            ondragstart="app.handleCategoryDragStart(event, ${category.id})" 
                            ondragover="app.handleCategoryDragOver(event)" 
                            ondragenter="app.handleCategoryDragEnter(event)" 
                            ondragleave="app.handleCategoryDragLeave(event)" 
                            ondrop="app.handleCategoryDrop(event, ${category.id})" 
                            ondragend="app.handleCategoryDragEnd(event)"`;
                        
                        // Add dust effect based on score
                        let dustClass = '';
                        if (score < 70 && score >= 50) {
                            dustClass = 'dusty-light';
                        } else if (score < 50 && score >= 30) {
                            dustClass = 'dusty-medium';
                        } else if (score < 30) {
                            dustClass = 'dusty-heavy';
                        }
                        
                        // Add dust bunnies based on score
                        let dustBunnies = '';
                        let bunnyCount = 0;
                        if (score < 90 && score >= 75) bunnyCount = 1;
                        else if (score < 75 && score >= 70) bunnyCount = 2;
                        else if (score < 70 && score >= 65) bunnyCount = 3;
                        else if (score < 65 && score >= 60) bunnyCount = 4;
                        else if (score < 60) bunnyCount = 5;
                        
                        for (let i = 1; i <= bunnyCount; i++) {
                            dustBunnies += `<div class="dust-bunny hop${i}"></div>`;
                        }
                        
                        // Add group category badge and blue styling
                        const groupBadge = category.isGroupCategory ? 
                            '<div style="position: absolute; top: 8px; right: 8px; background: rgba(100, 100, 255, 0.9); color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">GROUP</div>' : '';
                        const categoryNameStyle = category.isGroupCategory ? 
                            'color: #4040ff; font-weight: 700; text-shadow: 0 0 8px rgba(64, 64, 255, 0.3);' : '';
                        
                        return `
                            <div class="category-card ${dustClass}" 
                                 data-category-id="${category.id}"
                                 ${dragAttrs}
                                 onclick="app.showCategory(${category.id})" 
                                 style="${bgStyle}">
                                ${groupBadge}
                                ${dustBunnies}
                                <div class="category-header">
                                    <div class="category-name" style="${categoryNameStyle}">${category.name}</div>
                                    <div class="category-score">${score}%</div>
                                </div>
                                <div class="category-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${score}%"></div>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('');
                    
                    // Combine Self Care card (first) + regular categories
                    categoryList.innerHTML = selfCareCard + regularCategoriesHTML;
                }
            },

            // ==========================================
            // CATEGORY TAB SWITCHING
            // ==========================================
            
            switchCategoryTab(tabName) {
                // Update active tab state
                this.data.currentCategoryTab = tabName;
                
                // Update tab button active states and animate indicator
                const tabs = document.querySelectorAll('.category-tab');
                const tabsContainer = document.querySelector('.category-tabs');
                let activeIndex = 0;
                
                tabs.forEach((tab, index) => {
                    if (tab.dataset.tab === tabName) {
                        tab.classList.add('active');
                        activeIndex = index;
                    } else {
                        tab.classList.remove('active');
                    }
                });
                
                // Animate the slide indicator
                if (tabsContainer) {
                    const translateX = activeIndex * (100 / 3);
                    tabsContainer.style.setProperty('--tab-indicator-position', `${translateX}%`);
                }
                
                // Re-render dashboard with filtered categories
                this.renderDashboard();
                
                // Save the preference
                this.saveData();
                
                console.log(`📑 Switched to ${tabName} tab`);
            },

            // ==========================================
            // DRAG AND DROP CATEGORY SORTING
            // ==========================================
            
            dragState: {
                draggedCategoryId: null,
                draggedElement: null
            },

            handleCategoryDragStart(event, categoryId) {
                this.dragState.draggedCategoryId = categoryId;
                this.dragState.draggedElement = event.target;
                
                // Add dragging class for visual feedback
                event.target.style.opacity = '0.5';
                event.target.style.cursor = 'grabbing';
                
                // Set drag data
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/html', event.target.innerHTML);
                
                console.log('🎯 Started dragging category:', categoryId);
            },

            handleCategoryDragOver(event) {
                if (event.preventDefault) {
                    event.preventDefault(); // Necessary to allow drop
                }
                event.dataTransfer.dropEffect = 'move';
                return false;
            },

            handleCategoryDragEnter(event) {
                const card = event.target.closest('.category-card');
                if (card && card !== this.dragState.draggedElement) {
                    // Add visual feedback
                    card.style.transform = 'scale(1.05)';
                    card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                    card.style.border = '2px dashed var(--primary)';
                }
            },

            handleCategoryDragLeave(event) {
                const card = event.target.closest('.category-card');
                if (card && card !== this.dragState.draggedElement) {
                    // Remove visual feedback
                    card.style.transform = '';
                    card.style.boxShadow = '';
                    card.style.border = '';
                }
            },

            handleCategoryDrop(event, targetCategoryId) {
                if (event.stopPropagation) {
                    event.stopPropagation(); // Stops some browsers from redirecting
                }
                
                const draggedId = this.dragState.draggedCategoryId;
                
                // Don't do anything if dropping on itself
                if (draggedId === targetCategoryId) {
                    return false;
                }
                
                console.log(`📦 Dropped category ${draggedId} onto ${targetCategoryId}`);
                
                // Find indices
                const draggedIndex = this.data.categories.findIndex(c => c.id === draggedId);
                const targetIndex = this.data.categories.findIndex(c => c.id === targetCategoryId);
                
                if (draggedIndex === -1 || targetIndex === -1) {
                    console.error('❌ Could not find category indices');
                    return false;
                }
                
                // Reorder array
                const [draggedCategory] = this.data.categories.splice(draggedIndex, 1);
                this.data.categories.splice(targetIndex, 0, draggedCategory);
                
                console.log('✅ Reordered categories:', this.data.categories.map(c => c.name));
                
                // Save and re-render
                this.saveData();
                this.renderDashboard();
                
                // Show success feedback
                this.showNotification('Categories reordered! 📋', 'success');
                
                return false;
            },

            handleCategoryDragEnd(event) {
                // Reset opacity and remove visual feedback from all cards
                const allCards = document.querySelectorAll('.category-card');
                allCards.forEach(card => {
                    card.style.opacity = '';
                    card.style.cursor = '';
                    card.style.transform = '';
                    card.style.boxShadow = '';
                    card.style.border = '';
                });
                
                // Clear drag state
                this.dragState.draggedCategoryId = null;
                this.dragState.draggedElement = null;
                
                console.log('🏁 Drag ended');
            },

            showNotification(message, type = 'info') {
                // Simple notification system (you can style this better later)
                const notification = document.createElement('div');
                notification.textContent = message;
                notification.style.cssText = `
                    position: fixed;
                    top: 80px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    z-index: 10000;
                    font-size: 14px;
                    font-weight: 600;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    animation: slideDown 0.3s ease;
                `;
                
                document.body.appendChild(notification);
                
                // Remove after 2 seconds
                setTimeout(() => {
                    notification.style.animation = 'slideUp 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            },

            // ==========================================
            // END DRAG AND DROP
            // ==========================================

            generateTaskCardHTML(task, category) {
                const freshness = task.freshness || 0;
                        const isSnoozed = task.snoozedUntil && task.snoozedUntil > Date.now();
                        
                        // Calculate countdown for snoozed tasks
                        let countdownText = '';
                        if (isSnoozed) {
                            const timeLeft = task.snoozedUntil - Date.now();
                            const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
                            const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                            const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
                            
                            if (days > 0) {
                                countdownText = `${days}d ${hours}h ${minutes}m remaining`;
                            } else if (hours > 0) {
                                countdownText = `${hours}h ${minutes}m remaining`;
                            } else {
                                countdownText = `${minutes}m remaining`;
                            }
                        }
                        
                        // Add dust effect based on freshness
                        let dustClass = '';
                        if (freshness < 70 && freshness >= 50) {
                            dustClass = 'dusty-light';
                        } else if (freshness < 50 && freshness >= 30) {
                            dustClass = 'dusty-medium';
                        } else if (freshness < 30) {
                            dustClass = 'dusty-heavy';
                        }
                        
                        // Add snoozed class
                        if (isSnoozed) dustClass += ' task-snoozed';
                        
                        // Check if this is a linked task
                        const isLinkedTask = task.linkedTaskId !== undefined;
                        const linkedBadge = isLinkedTask ? 
                            '<span style="display: inline-block; margin-left: 8px; padding: 2px 6px; background: rgba(64, 64, 255, 0.15); color: #4040ff; border: 1px solid rgba(64, 64, 255, 0.3); border-radius: 4px; font-size: 10px; font-weight: 600;">🔗 LINKED</span>' : '';
                        
                        // Check if task has steps
                        const hasSteps = task.steps && task.steps.length > 0;
                        const completedSteps = hasSteps ? task.steps.filter(s => s.completed).length : 0;
                        const stepsDisplay = hasSteps ? `
                            <div style="margin-top: 12px;">
                                <button onclick="app.toggleStepsDisplay(${task.id})" style="background: none; border: none; color: var(--primary); cursor: pointer; font-size: 13px; font-weight: 600; padding: 4px 0;">
                                    <span id="steps-toggle-${task.id}">▼</span> Show Steps (${completedSteps}/${task.steps.length})
                                </button>
                                <div id="steps-list-${task.id}" style="display: none; margin-top: 8px; padding: 12px; background: rgba(0,0,0,0.05); border-radius: 8px;">
                                    ${task.steps.map(step => `
                                        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
                                            <div class="checkbox ${step.completed ? 'checked' : ''}" onclick="app.toggleStepCompletion(${task.id}, ${step.id})" style="min-width: 24px; height: 24px; background: white; border: 2px solid var(--primary); box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex-shrink: 0;">
                                                <svg style="width: 14px; height: 14px;"><use href="#icon-checkmark" /></svg>
                                            </div>
                                            <span style="font-size: 13px; flex: 1; ${step.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}"><strong>${step.label}.</strong> ${step.description}</span>
                                            <button onclick="app.deleteStep(${task.id}, ${step.id})" style="background: none; border: none; color: #ff4444; cursor: pointer; font-size: 16px; padding: 0 8px;">×</button>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : '';
                        
                        return `
                            <div class="task-card ${dustClass}">
                                <div class="task-header">
                                    <div class="checkbox ${freshness === 100 ? 'checked' : ''}" onclick="app.toggleTask(${task.id})">
                                        <svg><use href="#icon-checkmark" /></svg>
                                    </div>
                                    <div class="task-info">
                                        <div class="task-name">${task.name}${linkedBadge}</div>
                                        ${isSnoozed ? `
                                            <div class="task-meta">
                                                💤 Snoozed - ${countdownText}
                                            </div>
                                        ` : `
                                            <div class="task-meta-oneline">
                                                <span class="meta-item">Last: ${this.formatTimeAgo(task.lastCompleted)}</span>
                                                <span class="meta-separator">•</span>
                                                <span class="meta-item meta-decay-inline">Set: ${this.formatDecayTimeHierarchical(task.decayMs, task.decayUnit)}</span>
                                                <span class="meta-separator">•</span>
                                                <span class="countdown-badge-inline">⏳ ${this.formatLiveCountdown(task)}</span>
                                            </div>
                                        `}
                                    </div>
                                    <div class="task-actions">
                                        <button class="edit-btn-img" onclick="app.showEditTaskModal(${task.id})"><img src="Imag/Edit.png" alt="Edit"></button>
                                    </div>
                                </div>
                                <div class="freshness-meter">
                                    <div class="freshness-label">
                                        <span>Freshness</span>
                                        <span>${Math.round(freshness)}%</span>
                                    </div>
                                    <div class="progress-bar" style="height: 8px; border-radius: 4px; background: var(--border);">
                                        <div class="progress-fill ${this.getProgressClass(freshness)}" style="width: ${freshness}%; border-radius: 4px;"></div>
                                    </div>
                                </div>
                                ${!isSnoozed ? `
                                <div style="margin-top: 12px; display: flex; gap: 8px; justify-content: center; align-items: center;">
                                    <button class="task-snooze-btn" onclick="app.snoozeTask(${task.id})"><img src="Imag/Snooze.png" alt="Snooze" style="width: 60px; height: 60px; display: block;"></button>
                                    <button onclick="app.showAddStepModal(${task.id})" style="width: 60px; height: 60px; background: var(--primary); color: white; border: none; border-radius: 50%; font-size: 24px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">ABC</button>
                                </div>
                                ` : `
                                <div style="margin-top: 12px;">
                                    <button class="task-resume-btn" onclick="app.unsnoozeTask(${task.id})">✓ Resume Task</button>
                                </div>
                                `}
                                ${stepsDisplay}
                            </div>
                        `;
            },
            
            renderCategory() {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category) return;

                document.getElementById('categoryTitle').textContent = category.name;
                
                // Show/hide Complete All button for group categories
                const completeAllGroupBtn = document.getElementById('completeAllGroupBtn');
                if (completeAllGroupBtn) {
                    if (category.isGroupCategory && category.tasks && category.tasks.length > 0) {
                        // Update button text with category name
                        completeAllGroupBtn.textContent = `COMPLETE ALL ${category.name.toUpperCase()} TASKS`;
                        
                        // Enable button if there are any unsnoozed tasks (regardless of freshness)
                        const unsnoozedTasks = category.tasks.filter(t => !t.snoozedUntil || t.snoozedUntil <= Date.now());
                        console.log('[Complete All Button]', {
                            category: category.name,
                            totalTasks: category.tasks.length,
                            unsnoozedCount: unsnoozedTasks.length,
                            tasks: category.tasks.map(t => ({
                                name: t.name,
                                snoozedUntil: t.snoozedUntil,
                                isSnoozed: t.snoozedUntil && t.snoozedUntil > Date.now(),
                                freshness: t.freshness
                            }))
                        });
                        completeAllGroupBtn.disabled = unsnoozedTasks.length === 0;
                        completeAllGroupBtn.style.display = 'block';
                    } else {
                        completeAllGroupBtn.style.display = 'none';
                    }
                }
                
                // Handle Group Task Visibility Toggle (only for regular categories)
                // Hide the toggle button in header area - we'll render it inline
                const groupTaskToggleBtn = document.getElementById('groupTaskToggleBtn');
                if (groupTaskToggleBtn) {
                    groupTaskToggleBtn.style.display = 'none';
                }
                
                const taskList = document.getElementById('taskList');
                
                if (!category.tasks || category.tasks.length === 0) {
                    taskList.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
                            <div class="empty-text">No tasks yet. Add one to start tracking!</div>
                        </div>
                    `;
                    return;
                }
                
                // Separate regular tasks from group tasks
                const regularTasks = [];
                const groupTasks = [];
                
                if (!category.isGroupCategory) {
                    category.tasks.forEach(task => {
                        if (task.linkedCategoryId) {
                            const linkedCat = this.data.categories.find(c => c.id === task.linkedCategoryId);
                            if (linkedCat && linkedCat.isGroupCategory) {
                                groupTasks.push(task);
                                return;
                            }
                        }
                        regularTasks.push(task);
                    });
                } else {
                    // If this is a group category, all tasks are regular
                    regularTasks.push(...category.tasks);
                }
                
                // INTELLIGENT SORTING: Sort tasks by maintenance priority (lowest freshness first = most urgent)
                // This preserves category groupings while prioritizing urgent tasks within each group
                regularTasks.sort((a, b) => {
                    const isSnoozedA = a.snoozedUntil && a.snoozedUntil > Date.now();
                    const isSnoozedB = b.snoozedUntil && b.snoozedUntil > Date.now();
                    
                    // First priority: unsnoozed tasks come before snoozed tasks
                    if (isSnoozedA !== isSnoozedB) {
                        return isSnoozedA ? 1 : -1; // unsnoozed (false) comes first
                    }
                    
                    // Second priority: sort by freshness (lowest/most urgent first)
                    const freshnessA = a.freshness || 0;
                    const freshnessB = b.freshness || 0;
                    return freshnessA - freshnessB; // Ascending: lowest freshness (most urgent) first
                });
                
                groupTasks.sort((a, b) => {
                    const isSnoozedA = a.snoozedUntil && a.snoozedUntil > Date.now();
                    const isSnoozedB = b.snoozedUntil && b.snoozedUntil > Date.now();
                    
                    // First priority: unsnoozed tasks come before snoozed tasks
                    if (isSnoozedA !== isSnoozedB) {
                        return isSnoozedA ? 1 : -1;
                    }
                    
                    // Second priority: sort by freshness (lowest/most urgent first)
                    const freshnessA = a.freshness || 0;
                    const freshnessB = b.freshness || 0;
                    return freshnessA - freshnessB; // Ascending: lowest freshness (most urgent) first
                });
                
                // Build HTML: Regular tasks + Toggle button (if needed) + Group tasks (if expanded)
                let taskListHTML = '';
                
                // 1. Render regular tasks (now sorted by urgency)
                taskListHTML += regularTasks.map(task => this.generateTaskCardHTML(task, category)).join('');
                
                // 2. If there are group tasks, add inline toggle button
                if (groupTasks.length > 0 && !category.isGroupCategory) {
                    const isExpanded = this.data.showGroupTasksInRegularCategories;
                    const icon = isExpanded ? '▼' : '▶';
                    const text = isExpanded ? 'Hide Group Tasks' : 'Show Group Tasks';
                    const expandedClass = isExpanded ? 'expanded' : '';
                    
                    taskListHTML += `
                        <button class="group-task-toggle-btn-inline ${expandedClass}" onclick="app.toggleGroupTaskVisibility()">
                            <span class="group-task-toggle-icon">${icon}</span>
                            <span>${text}</span>
                        </button>
                    `;
                    
                    // 3. If expanded, render group tasks below the button
                    if (isExpanded) {
                        taskListHTML += groupTasks.map(task => this.generateTaskCardHTML(task, category)).join('');
                    }
                }
                
                taskList.innerHTML = taskListHTML;
            },
            
            renderSelfCare() {
                if (!this.data.selfCare) return;
                
                // Set title with extra margin to avoid clipping with bolt display
                const categoryTitle = document.getElementById('categoryTitle');
                categoryTitle.textContent = '❤️ Self Care';
                categoryTitle.style.marginTop = '20px';
                
                // Calculate time until next 12:00 AM (midnight) reset
                const now = new Date();
                const todayMidnight = new Date();
                todayMidnight.setHours(0, 0, 0, 0);
                
                // Next reset is always tomorrow's midnight
                const tomorrowMidnight = new Date(todayMidnight.getTime() + 24 * 60 * 60 * 1000);
                
                const timeUntilReset = tomorrowMidnight - now;
                
                const hoursLeft = Math.floor(timeUntilReset / (1000 * 60 * 60));
                const minutesLeft = Math.floor((timeUntilReset % (1000 * 60 * 60)) / (1000 * 60));
                
                const resetText = timeUntilReset > 0 ? 
                    `Resets at 12:00 AM (in ${hoursLeft}h ${minutesLeft}m)` : 
                    'Resetting now...';
                
                const taskList = document.getElementById('taskList');
                
                // Add reset counter before task groups
                const resetCounterHTML = `
                    <div style="text-align: center; padding: 12px 20px; background: linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(255, 107, 107, 0.05) 100%); border-radius: 12px; margin-bottom: 20px; border: 2px solid rgba(255, 107, 107, 0.3);">
                        <div style="font-size: 14px; color: #ff6b6b; font-weight: 600;">
                            🕐 ${resetText}
                        </div>
                        <div style="font-size: 11px; color: #666; margin-top: 4px;">
                            All tasks and rewards will refresh
                        </div>
                    </div>
                `;
                
                const groupsHTML = this.data.selfCare.groups.map(group => {
                    const requiredTasks = group.tasks.filter(t => !t.optional);
                    const completedRequired = requiredTasks.filter(t => t.completed).length;
                    const groupPercent = requiredTasks.length > 0 ? Math.round((completedRequired / requiredTasks.length) * 100) : 0;
                    
                    const tasksHTML = group.tasks.map(task => {
                        const isOptional = task.optional;
                        const optionalLabel = isOptional ? ' <span style="color: #888; font-size: 11px;">(Optional)</span>' : '';
                        const isBedtime = task.id === 'bedtime';
                        
                        // Bedtime logic
                        let taskName = task.name;
                        let bedtimeCheckable = true;
                        let bedtimeDisabledMessage = '';
                        
                        if (isBedtime) {
                            const bedtimeTarget = this.data.selfCare.bedtimeTarget;
                            
                            if (bedtimeTarget) {
                                // Convert 24-hour to 12-hour AM/PM format
                                const [targetHour, targetMinute] = bedtimeTarget.split(':').map(Number);
                                const period = targetHour >= 12 ? 'PM' : 'AM';
                                const displayHour = targetHour === 0 ? 12 : (targetHour > 12 ? targetHour - 12 : targetHour);
                                const displayTime = `${displayHour}:${targetMinute.toString().padStart(2, '0')} ${period}`;
                                
                                // Display bedtime in task name with AM/PM
                                taskName = `Go to bed by ${displayTime}`;
                                
                                // Check if current time has passed the bedtime
                                const now = new Date();
                                const targetTime = new Date();
                                targetTime.setHours(targetHour, targetMinute, 0, 0);
                                
                                if (now > targetTime) {
                                    bedtimeCheckable = false;
                                    bedtimeDisabledMessage = '<div style="font-size: 11px; color: #ff6b6b; margin-top: 4px;">⏰ Time has passed for today</div>';
                                }
                            } else {
                                // No time set
                                bedtimeCheckable = false;
                                bedtimeDisabledMessage = '<div style="font-size: 11px; color: #ff6b6b; margin-top: 4px;">⏰ Please set a bedtime first</div>';
                            }
                        }
                        
                        const checkboxDisabled = isBedtime && !bedtimeCheckable;
                        const checkboxStyle = checkboxDisabled ? 'opacity: 0.4; cursor: not-allowed;' : 'cursor: pointer;';
                        const checkboxClick = checkboxDisabled ? '' : `onclick="app.toggleSelfCareTask('${group.id}', '${task.id}')"`;
                        
                        return `
                            <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: ${task.completed ? 'rgba(76, 175, 80, 0.1)' : 'white'}; border-radius: 8px; margin-bottom: 8px; border: 2px solid ${task.completed ? '#4CAF50' : '#e0e0e0'};">
                                <div class="checkbox ${task.completed ? 'checked' : ''}" ${checkboxClick} style="min-width: 28px; height: 28px; background: white; border: 3px solid ${task.completed ? '#4CAF50' : '#ff6b6b'}; box-shadow: 0 2px 4px rgba(0,0,0,0.15); flex-shrink: 0; ${checkboxStyle}">
                                    <svg style="width: 16px; height: 16px;"><use href="#icon-checkmark" /></svg>
                                </div>
                                <div style="flex: 1; ${task.completed ? 'text-decoration: line-through; opacity: 0.7;' : ''}">
                                    <div style="font-size: 15px; font-weight: 500; color: var(--text);">${taskName}${optionalLabel}</div>
                                    ${task.earnedToday ? '<div style="font-size: 12px; color: #4CAF50; font-weight: 600;">✓ +10 bolts earned</div>' : ''}
                                    ${bedtimeDisabledMessage}
                                </div>
                                ${isBedtime ? `<button onclick="app.showBedtimeModal()" style="padding: 6px 12px; background: var(--primary); color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer;">⏰ Set Time</button>` : ''}
                            </div>
                        `;
                    }).join('');
                    
                    const bonusBadge = group.bonusEarned ? 
                        '<div style="display: inline-block; margin-left: 8px; padding: 4px 8px; background: #4CAF50; color: white; border-radius: 4px; font-size: 11px; font-weight: bold;">✓ BONUS EARNED +75</div>' :
                        '<div style="display: inline-block; margin-left: 8px; padding: 4px 8px; background: rgba(255, 107, 107, 0.2); color: #ff6b6b; border-radius: 4px; font-size: 11px; font-weight: bold;">Complete all for +75 bonus</div>';
                    
                    return `
                        <div style="margin-bottom: 24px; background: rgba(255, 255, 255, 0.95); border-radius: 12px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                                <div>
                                    <h3 style="margin: 0; color: #ff6b6b; font-size: 18px; font-weight: 700;">${group.name}</h3>
                                    <div style="font-size: 13px; color: #666; margin-top: 4px;">${completedRequired}/${requiredTasks.length} completed</div>
                                </div>
                                <div style="font-size: 24px; font-weight: bold; color: ${groupPercent === 100 ? '#4CAF50' : '#ff6b6b'};">${groupPercent}%</div>
                            </div>
                            ${bonusBadge}
                            <div style="margin-top: 16px;">
                                ${tasksHTML}
                            </div>
                        </div>
                    `;
                }).join('');
                
                // Combine reset counter with groups HTML
                taskList.innerHTML = resetCounterHTML + groupsHTML;
            },

            showDashboard() {
                // ===== PHASE 1: SHOW LOADING SCREEN =====
                if (window.UpkeepLoadingScreen) {
                    UpkeepLoadingScreen.show('Calculating upkeep priority...');
                    console.log('🔄 [Dashboard] Loading screen activated');
                }
                
                // Small delay to ensure loading screen renders before heavy calculations
                setTimeout(() => {
                    try {
                        // ===== PHASE 2: PERFORM CALCULATIONS =====
                        console.log('⚙️ [Dashboard] Starting calculations...');
                        
                        this.data.currentCategoryId = null;
                        this.data.currentSubCategory = null; // Clear sub-category state
                        
                        // Hide sub-category views
                        document.getElementById('subCategoryMenuView').classList.remove('active');
                        document.getElementById('subCategoryTaskView').classList.remove('active');
                        
                        // Restore main background
                        document.body.style.backgroundImage = `url('Imag/Main Background 2.png')`;
                        // Reset category title margin
                        document.getElementById('categoryTitle').style.marginTop = '';
                        // Show settings, currency display, missions bubble, store bubble, and robot bubble
                        document.getElementById('settingsBtn').classList.remove('hidden');
                        document.getElementById('currencyDisplay').classList.remove('hidden');
                        document.getElementById('missionsBubble').classList.remove('hidden');
                        document.querySelector('.robot-store-bubble').classList.remove('hidden');
                        document.querySelector('.robot-select-bubble').classList.remove('hidden');
                        document.getElementById('battleModeBubble').classList.remove('hidden');
                        
                        // Update loading message
                        if (window.UpkeepLoadingScreen) {
                            UpkeepLoadingScreen.updateMessage('Rendering dashboard...');
                        }
                        
                        // ===== PHASE 3: RENDER UI =====
                        this.render();
                        
                        console.log('✅ [Dashboard] Calculations complete');
                        
                        // ===== PHASE 4: HIDE LOADING SCREEN =====
                        // Wait for render to complete, then hide loading screen
                        setTimeout(() => {
                            if (window.UpkeepLoadingScreen) {
                                UpkeepLoadingScreen.hide();
                                console.log('✅ [Dashboard] Loading screen hidden');
                            }
                            // Greet after loading screen is gone
                            setTimeout(() => this.mascotGreet(), 300);
                        }, 100);
                        
                    } catch (error) {
                        console.error('❌ [Dashboard] Error during initialization:', error);
                        // Force hide loading screen on error
                        if (window.UpkeepLoadingScreen) {
                            UpkeepLoadingScreen.forceHide();
                        }
                    }
                }, 50); // 50ms delay to ensure loading screen renders
            },

            showCategory(id) {
                this.data.currentCategoryId = id;
                const category = this.data.categories.find(c => c.id === id);
                
                // Check if this is Sweep/Mop/Vacuum - show sub-category menu instead
                if (category && category.name === 'Sweep/Mop/Vacuum') {
                    this.showSubCategoryMenu();
                    return;
                }
                
                // Reset category title margin
                document.getElementById('categoryTitle').style.marginTop = '';
                // Change background to category-specific if available, otherwise keep main background
                if (category && this.ui.categoryBackgrounds[category.name]) {
                    document.body.style.backgroundImage = `url('${this.ui.categoryBackgrounds[category.name]}')`;
                }
                // For custom categories or categories without specific backgrounds, keep main background
                // Hide settings, currency display, missions bubble, store bubble, battle bubble, and robot bubble
                document.getElementById('settingsBtn').classList.add('hidden');
                document.getElementById('currencyDisplay').classList.add('hidden');
                document.getElementById('missionsBubble').classList.add('hidden');
                document.querySelector('.robot-store-bubble').classList.add('hidden');
                document.querySelector('.robot-select-bubble').classList.add('hidden');
                document.getElementById('battleModeBubble').classList.add('hidden');
                // Show the FAB button in regular categories
                const categoryFab = document.querySelector('#categoryView .fab');
                if (categoryFab) categoryFab.classList.remove('hidden');
                this.render();
                setTimeout(() => this.mascotGreet(), 500);
            },
            
            showSubCategoryMenu() {
                // Hide all views
                document.getElementById('dashboardView').classList.remove('active');
                document.getElementById('categoryView').classList.remove('active');
                document.getElementById('subCategoryTaskView').classList.remove('active');
                
                // Show sub-category menu view
                document.getElementById('subCategoryMenuView').classList.add('active');
                
                // Hide UI elements
                document.getElementById('settingsBtn').classList.add('hidden');
                document.getElementById('currencyDisplay').classList.add('hidden');
                document.getElementById('missionsBubble').classList.add('hidden');
                document.querySelector('.robot-store-bubble').classList.add('hidden');
                document.querySelector('.robot-select-bubble').classList.add('hidden');
                document.getElementById('battleModeBubble').classList.add('hidden');
            },
            
            showSubCategoryTasks(subCategory) {
                this.data.currentSubCategory = subCategory;
                
                // Hide other views
                document.getElementById('dashboardView').classList.remove('active');
                document.getElementById('categoryView').classList.remove('active');
                document.getElementById('subCategoryMenuView').classList.remove('active');
                
                // Show sub-category task view
                document.getElementById('subCategoryTaskView').classList.add('active');
                
                // Hide UI elements (same as regular category view)
                document.getElementById('settingsBtn').classList.add('hidden');
                document.getElementById('currencyDisplay').classList.add('hidden');
                document.getElementById('missionsBubble').classList.add('hidden');
                document.querySelector('.robot-store-bubble').classList.add('hidden');
                document.querySelector('.robot-select-bubble').classList.add('hidden');
                document.getElementById('battleModeBubble').classList.add('hidden');
                
                // Update title
                const subCategoryNames = {
                    'sweep': 'SWEEP Tasks',
                    'mop': 'MOP Tasks',
                    'vacuum': 'VACUUM Tasks'
                };
                document.getElementById('subCategoryTaskTitle').textContent = subCategoryNames[subCategory] || 'Tasks';
                
                // Update Complete All button text
                const completeAllBtn = document.getElementById('completeAllBtn');
                const completeAllLabels = {
                    'sweep': 'COMPLETE ALL SWEEP TASKS',
                    'mop': 'COMPLETE ALL MOP TASKS',
                    'vacuum': 'COMPLETE ALL VACUUM TASKS'
                };
                completeAllBtn.textContent = completeAllLabels[subCategory] || 'COMPLETE ALL TASKS';
                
                // Render filtered tasks
                this.renderSubCategoryTasks(subCategory);
                
                // Update Complete All button state (always visible, but disabled if all tasks are 100%)
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (category && category.tasks) {
                    const filteredTasks = category.tasks.filter(t => t.subCategory === subCategory);
                    const incompleteTasks = filteredTasks.filter(t => t.freshness < 100);
                    
                    // Always show button, but disable if no incomplete tasks
                    completeAllBtn.disabled = incompleteTasks.length === 0;
                }
            },
            
            backToSubCategoryMenu() {
                this.data.currentSubCategory = null;
                this.showSubCategoryMenu();
            },
            
            renderSubCategoryTasks(subCategory) {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category || !category.tasks) {
                    document.getElementById('subCategoryTaskList').innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No tasks yet. Add a task to get started!</p>';
                    return;
                }
                
                // Filter tasks by sub-category
                const filteredTasks = category.tasks.filter(t => t.subCategory === subCategory);
                
                if (filteredTasks.length === 0) {
                    document.getElementById('subCategoryTaskList').innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No tasks in this category yet. Add a task to get started!</p>';
                    return;
                }
                
                // INTELLIGENT SORTING: Prioritize unsnoozed tasks over snoozed, then sort by urgency
                filteredTasks.sort((a, b) => {
                    const isSnoozedA = a.snoozedUntil && a.snoozedUntil > Date.now();
                    const isSnoozedB = b.snoozedUntil && b.snoozedUntil > Date.now();
                    
                    // First priority: unsnoozed tasks come before snoozed tasks
                    if (isSnoozedA !== isSnoozedB) {
                        return isSnoozedA ? 1 : -1; // unsnoozed (false) comes first
                    }
                    
                    // Second priority: sort by freshness (lowest/most urgent first)
                    const freshnessA = a.freshness || 0;
                    const freshnessB = b.freshness || 0;
                    return freshnessA - freshnessB; // Ascending: lowest freshness (most urgent) first
                });
                
                // Render tasks using the same rendering logic as regular categories
                const taskListHTML = filteredTasks.map(task => {
                    // Use existing task rendering logic - we'll call the same function that renderCategory uses
                    return this.generateTaskCardHTML(task, category);
                }).join('');
                
                document.getElementById('subCategoryTaskList').innerHTML = taskListHTML;
            },
            
            completeAllSubCategoryTasks() {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category || !category.tasks || !this.data.currentSubCategory) return;
                
                // Filter tasks by current sub-category
                const filteredTasks = category.tasks.filter(t => t.subCategory === this.data.currentSubCategory);
                
                if (filteredTasks.length === 0) return;
                
                // Confirm with user
                const subCategoryLabel = this.data.currentSubCategory.toUpperCase();
                if (!confirm(`Complete all ${subCategoryLabel} tasks? This will mark ${filteredTasks.length} task(s) as complete.`)) {
                    return;
                }
                
                // Update mission progress for each task
                this.updateChoreProgress();
                
                // Complete all filtered tasks with gamification effects
                filteredTasks.forEach((task, index) => {
                    task.lastCompleted = Date.now();
                    task.freshness = 100;
                    
                    // AUTO-SNOOZE FEATURE: Check if auto-snooze is enabled
                    if (this.data.autoSnoozeEnabled) {
                        const decayTimeHours = (task.decayMs || (3 * 24 * 60 * 60 * 1000)) / (60 * 60 * 1000);
                        let snoozeHours;
                        
                        if (decayTimeHours >= 7920) {
                            // 11 months or more → 1 week snooze
                            snoozeHours = 168;
                        } else if (decayTimeHours >= 168) {
                            // 1 week or more → 24-hour snooze
                            snoozeHours = 24;
                        } else if (decayTimeHours <= 24) {
                            // 24 hours or less → 3-hour snooze
                            snoozeHours = 3;
                        } else {
                            // More than 24 hours AND less than 1 week → 8-hour snooze
                            snoozeHours = 8;
                        }
                        
                        task.snoozedUntil = Date.now() + (snoozeHours * 60 * 60 * 1000);
                        
                        // CRITICAL: Freeze freshness at current level (100%) to prevent decay during snooze
                        task.frozenFreshness = task.freshness;
                    } else {
                        delete task.snoozedUntil; // Clear any snooze if auto-snooze disabled
                        delete task.frozenFreshness; // Clear frozen freshness as well
                    }
                    
                    // Reset steps
                    if (task.steps && task.steps.length > 0) {
                        task.steps.forEach(step => {
                            step.completed = false;
                        });
                    }
                    
                    // Sync linked task if exists
                    if (task.linkedTaskId && task.linkedCategoryId) {
                        this.syncLinkedTaskCompletion(task.id);
                    }
                    
                    // Log each completion
                    if (this.addLogEntry) {
                        this.addLogEntry(
                            'completed',
                            `Completed: ${task.name}`,
                            `Part of ${subCategoryLabel} bulk completion`
                        );
                    }
                    
                    // GAMIFICATION: Celebrate each task completion with staggered timing
                    if (typeof Gamification !== 'undefined') {
                        setTimeout(() => {
                            // Find the task card element for visual effects
                            const taskCards = document.querySelectorAll('.task-card');
                            const taskElement = taskCards[index];
                            
                            if (taskElement) {
                                // Celebrate with confetti and sounds
                                Gamification.celebrateTaskCompletion(taskElement, task.name);
                            }
                        }, index * 200); // Stagger celebrations by 200ms each
                    }
                });
                
                this.saveData();
                this.renderSubCategoryTasks(this.data.currentSubCategory);
                
                // Update Complete All button state (keep visible but disable)
                const completeAllBtn = document.getElementById('completeAllBtn');
                const remainingTasks = category.tasks.filter(t => t.subCategory === this.data.currentSubCategory && t.freshness < 100);
                if (completeAllBtn) {
                    completeAllBtn.disabled = remainingTasks.length === 0;
                }
                
                // GAMIFICATION: Show streak updates and check for category completion
                if (typeof Gamification !== 'undefined') {
                    // Update and check streak
                    const currentStreak = Gamification.updateStreak();
                    
                    // Show streak notification for milestones
                    setTimeout(() => {
                        if (currentStreak > 1 && Gamification.checkStreakMilestone(currentStreak)) {
                            Gamification.celebrateMilestone(
                                currentStreak,
                                `${currentStreak} days in a row! You're unstoppable!`
                            );
                        } else if (currentStreak > 1 && currentStreak % 2 === 0) {
                            // Show streak every 2 days
                            Gamification.celebrateStreak(currentStreak);
                        }
                    }, filteredTasks.length * 200 + 500);
                    
                    // Check if entire category is now 100% complete
                    setTimeout(() => {
                        const allComplete = category.tasks.every(t => t.freshness === 100);
                        if (allComplete) {
                            Gamification.celebrateCategoryCompletion(category.name);
                        }
                    }, filteredTasks.length * 200 + 1000);
                }
                
                // Show success message
                setTimeout(() => {
                    this.mascotSpeak(`Great job! All ${subCategoryLabel} tasks completed!`);
                }, filteredTasks.length * 200 + 300);
            },
            
            completeAllGroupTasks() {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category || !category.tasks || !category.isGroupCategory) return;
                
                // Filter for unsnoozed tasks only
                const unsnoozedTasks = category.tasks.filter(t => !t.snoozedUntil || t.snoozedUntil <= Date.now());
                if (unsnoozedTasks.length === 0) return;
                
                // Confirm with user
                const categoryName = category.name.toUpperCase();
                if (!confirm(`Complete all ${categoryName} tasks? This will mark ${unsnoozedTasks.length} unsnoozed task(s) as complete.`)) {
                    return;
                }
                
                // Update mission progress for each task
                this.updateChoreProgress();
                
                // Complete all unsnoozed tasks with gamification effects
                unsnoozedTasks.forEach((task, index) => {
                    task.lastCompleted = Date.now();
                    task.freshness = 100;
                    
                    // AUTO-SNOOZE FEATURE: Check if auto-snooze is enabled
                    if (this.data.autoSnoozeEnabled) {
                        const decayTimeHours = (task.decayMs || (3 * 24 * 60 * 60 * 1000)) / (60 * 60 * 1000);
                        let snoozeHours;
                        
                        if (decayTimeHours >= 7920) {
                            // 11 months or more → 1 week snooze
                            snoozeHours = 168;
                        } else if (decayTimeHours >= 168) {
                            // 1 week or more → 24-hour snooze
                            snoozeHours = 24;
                        } else if (decayTimeHours <= 24) {
                            // 24 hours or less → 3-hour snooze
                            snoozeHours = 3;
                        } else {
                            // More than 24 hours AND less than 1 week → 8-hour snooze
                            snoozeHours = 8;
                        }
                        
                        task.snoozedUntil = Date.now() + (snoozeHours * 60 * 60 * 1000);
                        
                        // CRITICAL: Freeze freshness at current level (100%) to prevent decay during snooze
                        task.frozenFreshness = task.freshness;
                    } else {
                        delete task.snoozedUntil; // Clear any snooze if auto-snooze disabled
                        delete task.frozenFreshness; // Clear frozen freshness as well
                    }
                    
                    // Reset steps if they exist
                    if (task.steps && task.steps.length > 0) {
                        task.steps.forEach(step => {
                            step.completed = false;
                        });
                    }
                    
                    // Sync linked task if exists
                    if (task.linkedTaskId && task.linkedCategoryId) {
                        this.syncLinkedTaskCompletion(task.id);
                    }
                    
                    // Log each completion
                    if (this.addLogEntry) {
                        this.addLogEntry(
                            'completed',
                            `Completed: ${task.name}`,
                            `Part of ${categoryName} bulk completion`
                        );
                    }
                    
                    // GAMIFICATION: Celebrate each task completion with staggered timing
                    if (typeof Gamification !== 'undefined') {
                        setTimeout(() => {
                            // Find the task card element for visual effects
                            const taskCards = document.querySelectorAll('.task-card');
                            const taskElement = taskCards[index];
                            
                            if (taskElement) {
                                // Celebrate with confetti and sounds
                                Gamification.celebrateTaskCompletion(taskElement, task.name);
                            }
                        }, index * 200); // Stagger celebrations by 200ms each
                    }
                });
                
                this.saveData();
                this.renderCategory();
                
                // Update Complete All button state (check for remaining unsnoozed tasks)
                const completeAllGroupBtn = document.getElementById('completeAllGroupBtn');
                if (completeAllGroupBtn) {
                    const remainingUnsnoozed = category.tasks.filter(t => !t.snoozedUntil || t.snoozedUntil <= Date.now());
                    completeAllGroupBtn.disabled = remainingUnsnoozed.length === 0;
                }
                
                // GAMIFICATION: Show streak updates and check for category completion
                if (typeof Gamification !== 'undefined') {
                    // Update and check streak
                    const currentStreak = Gamification.updateStreak();
                    
                    // Show streak notification for milestones
                    setTimeout(() => {
                        if (currentStreak > 1 && Gamification.checkStreakMilestone(currentStreak)) {
                            Gamification.celebrateMilestone(
                                currentStreak,
                                `${currentStreak} days in a row! You're unstoppable!`
                            );
                        } else if (currentStreak > 1 && currentStreak % 2 === 0) {
                            // Show streak every 2 days
                            Gamification.celebrateStreak(currentStreak);
                        }
                    }, unsnoozedTasks.length * 200 + 500);
                    
                    // Category completion celebration
                    setTimeout(() => {
                        Gamification.celebrateCategoryCompletion(category.name);
                    }, unsnoozedTasks.length * 200 + 1000);
                }
                
                // Show success message
                setTimeout(() => {
                    this.mascotSpeak(`Amazing! All unsnoozed ${categoryName} tasks completed!`);
                }, unsnoozedTasks.length * 200 + 300);
            },

            showSelfCare() {
                // Check for daily reset
                this.checkSelfCareReset();
                
                this.data.currentCategoryId = 'SELFCARE';
                document.getElementById('settingsBtn').classList.add('hidden');
                // Keep currency display visible in Self Care
                document.getElementById('currencyDisplay').classList.remove('hidden');
                document.getElementById('missionsBubble').classList.add('hidden');
                document.querySelector('.robot-store-bubble').classList.add('hidden');
                document.querySelector('.robot-select-bubble').classList.add('hidden');
                document.getElementById('battleModeBubble').classList.add('hidden');
                // Hide the FAB button in Self Care
                const categoryFab = document.querySelector('#categoryView .fab');
                if (categoryFab) categoryFab.classList.add('hidden');
                this.render();
            },
            
            checkSelfCareReset() {
                if (!this.data.selfCare) return;
                
                const now = new Date();
                const lastReset = new Date(this.data.selfCare.lastReset || 0);
                
                // Get today's 12:00 AM (midnight) in local time
                const todayMidnight = new Date();
                todayMidnight.setHours(0, 0, 0, 0);
                
                // Get yesterday's midnight
                const yesterdayMidnight = new Date(todayMidnight);
                yesterdayMidnight.setDate(yesterdayMidnight.getDate() - 1);
                
                // Check if we've passed today's midnight AND last reset was before today's midnight
                const shouldReset = now >= todayMidnight && lastReset < todayMidnight;
                
                if (shouldReset) {
                    this.data.selfCare.groups.forEach(group => {
                        group.tasks.forEach(task => {
                            task.completed = false;
                            task.earnedToday = false;
                        });
                        group.bonusEarned = false;
                    });
                    this.data.selfCare.lastReset = now.getTime();
                    this.saveData();
                }
            },
            
            toggleSelfCareTask(groupId, taskId) {
                const group = this.data.selfCare.groups.find(g => g.id === groupId);
                if (!group) return;
                
                const task = group.tasks.find(t => t.id === taskId);
                if (!task) return;
                
                task.completed = !task.completed;
                
                // Award 10 bolts for completing the task (only once per day)
                if (task.completed && !task.earnedToday) {
                    this.data.currency += 10;
                    task.earnedToday = true;
                    
                    // Update currency display immediately
                    this.updateCurrencyDisplay();
                    
                    // Show bolt notification
                    this.showBoltNotification(10);
                    
                    // 25% chance for robot to say something encouraging
                    if (Math.random() < 0.25 && this.mascotSpeak) {
                        const encouragements = [
                            `Great job taking care of yourself! ${task.name} ✓`,
                            `Self-care is important! Nice work on ${task.name}!`,
                            `You're doing great! ${task.name} complete! 💚`,
                            `Love to see it! ${task.name} done!`,
                            `Taking care of yourself? That's what I like to see!`,
                            `Your wellness matters! Good job with ${task.name}!`,
                            `Proud of you for ${task.name}! Keep it up!`,
                            `Self-care champion! ${task.name} ✓`,
                            `You're worth it! ${task.name} complete!`,
                            `Looking after yourself? That's the spirit!`
                        ];
                        this.mascotSpeak(encouragements[Math.floor(Math.random() * encouragements.length)]);
                    }
                    
                    // Check if all required tasks in group are complete for bonus
                    const requiredTasks = group.tasks.filter(t => !t.optional);
                    const allCompleted = requiredTasks.every(t => t.completed);
                    
                    if (allCompleted && !group.bonusEarned) {
                        // Store the group ID for later use in reward functions
                        this.data.currentBonusGroupId = groupId;
                        
                        // Lock body scroll
                        document.body.style.overflow = 'hidden';
                        
                        // Show choice modal instead of immediate reward
                        document.getElementById('selfCareGroupBonusModal').classList.add('active');
                    }
                }
                
                this.saveData();
                this.render();
            },
            
            showBoltNotification(amount, customMessage = null) {
                // Create notification element
                const notification = document.createElement('div');
                notification.className = 'bolt-notification';
                
                // Refined sizing - consistent and elegant
                const fontSize = '16px';
                const boltSize = '18px';
                
                // Get current total bolts
                const currentTotal = this.data.currency || 0;
                
                // Clean, minimal HTML structure with IDs for animation
                notification.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
                        <div style="display: inline-flex; align-items: center; gap: 8px;">
                            <img id="bolt-icon-${Date.now()}" src="Imag/Achivments/Images/Finished Images/Bolt.png" alt="Bolt" 
                                 style="width: ${boltSize}; height: ${boltSize}; opacity: 0.9; transform-origin: center;">
                            <span style="font-size: ${fontSize}; font-weight: 600; background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -0.2px;">+${amount}</span>
                        </div>
                        <div style="font-size: 12px; font-weight: 500; color: #64748B; letter-spacing: -0.1px;">${currentTotal.toLocaleString()} total</div>
                    </div>
                `;
                
                // Premium iOS/Material-inspired design with subtle gradient
                notification.style.cssText = `
                    position: fixed;
                    top: 80px;
                    left: 50%;
                    transform: translate(-50%, -20px);
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 252, 250, 0.98) 100%);
                    padding: 10px 18px;
                    border-radius: 20px;
                    text-align: center;
                    z-index: 10002;
                    box-shadow: 
                        0 4px 12px rgba(245, 158, 11, 0.12),
                        0 2px 6px rgba(0, 0, 0, 0.06),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9);
                    pointer-events: none;
                    border: 1px solid rgba(245, 158, 11, 0.15);
                    backdrop-filter: blur(12px) saturate(180%);
                    opacity: 0;
                `;
                
                // Add to body
                document.body.appendChild(notification);
                
                // Get the bolt icon for micro-animation
                const boltIcon = notification.querySelector('img');
                
                // Delightful spring animation (iOS-style)
                notification.animate([
                    { 
                        transform: 'translate(-50%, -20px) scale(0.92)', 
                        opacity: 0 
                    },
                    { 
                        transform: 'translate(-50%, 0px) scale(1)', 
                        opacity: 1 
                    }
                ], {
                    duration: 400,
                    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.15)',
                    fill: 'forwards'
                });
                
                // Playful bolt spin animation (delayed slightly)
                if (boltIcon) {
                    setTimeout(() => {
                        boltIcon.animate([
                            { transform: 'rotate(0deg) scale(1)', opacity: 0.9 },
                            { transform: 'rotate(-12deg) scale(1.15)', opacity: 1, offset: 0.5 },
                            { transform: 'rotate(0deg) scale(1)', opacity: 0.9 }
                        ], {
                            duration: 500,
                            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                        });
                    }, 150);
                }
                
                // Gentle fade out
                setTimeout(() => {
                    notification.animate([
                        { 
                            transform: 'translate(-50%, 0px) scale(1)', 
                            opacity: 1 
                        },
                        { 
                            transform: 'translate(-50%, -10px) scale(0.96)', 
                            opacity: 0 
                        }
                    ], {
                        duration: 300,
                        easing: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
                        fill: 'forwards'
                    });
                    setTimeout(() => notification.remove(), 300);
                }, 1600);
            },
            
            showBedtimeModal() {
                const currentTime = this.data.selfCare?.bedtimeTarget || '22:00';
                document.getElementById('bedtimeInput').value = currentTime;
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('bedtimeModal').classList.add('active');
            },
            
            setBedtime() {
                const timeInput = document.getElementById('bedtimeInput').value;
                if (timeInput) {
                    this.data.selfCare.bedtimeTarget = timeInput;
                    this.saveData();
                    this.closeModal('bedtimeModal');
                    if (this.mascotSpeak) {
                        this.mascotSpeak(`Bedtime set to ${timeInput}. Sweet dreams!`);
                    }
                }
            },
            
            chooseBoltsReward() {
                // User chose the safe option: 75 bolts
                const groupId = this.data.currentBonusGroupId;
                if (!groupId) return;
                
                const group = this.data.selfCare.groups.find(g => g.id === groupId);
                if (!group) return;
                
                // Award 75 bolts
                this.data.currency += 75;
                group.bonusEarned = true;
                
                // Clear the stored group ID
                delete this.data.currentBonusGroupId;
                
                this.saveData();
                
                // Update currency display immediately
                this.updateCurrencyDisplay();
                
                this.closeModal('selfCareGroupBonusModal');
                
                if (this.mascotSpeak) {
                    this.mascotSpeak(`Nice! You earned 15 bolts for completing ${group.name}!`);
                }
                
                this.render();
            },
            
            chooseRobotChance() {
                // User chose the risky option: chance for a robot
                // Close choice modal and open the mini-game modal
                this.closeModal('selfCareGroupBonusModal');
                
                // Generate the secret target number (1-200)
                this.data.robotChanceTarget = Math.floor(Math.random() * 200) + 1;
                
                // Reset modal to original state (in case it was showing results)
                const modalContent = document.querySelector('#robotChanceModal .modal-content > div:last-child');
                modalContent.innerHTML = `
                    <p style="font-size: 15px; color: var(--text); margin-bottom: 20px;">
                        I've picked a secret number between <strong>1 and 200</strong>.<br>
                        Pick a number between <strong>1 and 99</strong> to try to match it!
                    </p>
                    <input type="number" id="robotChanceInput" class="form-input" min="1" max="99" placeholder="Enter 1-99" style="font-size: 24px; text-align: center; margin-bottom: 20px;">
                    <button class="btn-primary" onclick="app.submitRobotChance()" style="width: 100%; padding: 16px; font-size: 16px;">
                        🎯 Submit Guess
                    </button>
                `;
                
                // Clear the input field
                document.getElementById('robotChanceInput').value = '';
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                // Show the mini-game modal
                document.getElementById('robotChanceModal').classList.add('active');
            },
            
            submitRobotChance() {
                const userGuess = parseInt(document.getElementById('robotChanceInput').value);
                
                // Validate input
                if (isNaN(userGuess) || userGuess < 1 || userGuess > 99) {
                    if (this.mascotSpeak) {
                        this.mascotSpeak('Please enter a number between 1 and 99!');
                    }
                    return;
                }
                
                const targetNumber = this.data.robotChanceTarget;
                const groupId = this.data.currentBonusGroupId;
                
                if (!groupId) return;
                
                const group = this.data.selfCare.groups.find(g => g.id === groupId);
                if (!group) return;
                
                // Mark bonus as earned regardless of outcome
                group.bonusEarned = true;
                
                // Check if user won
                if (userGuess === targetNumber) {
                    // USER WON! Give them a random locked robot
                    const allRobots = ['default', 'obonxo', 'zephyr', 'rusty', 'sparky', 'bolt', 'nova', 'apex', 'cinder', 'frost'];
                    const lockedRobots = allRobots.filter(robot => !this.data.ownedRobots.includes(robot));
                    
                    if (lockedRobots.length > 0) {
                        // Pick a random locked robot
                        const wonRobot = lockedRobots[Math.floor(Math.random() * lockedRobots.length)];
                        this.data.ownedRobots.push(wonRobot);
                        
                        // Initialize durability for new robot
                        this.initializeRobotDurability(wonRobot);
                        
                        this.saveData();
                        
                        // Show WIN result
                        this.showRobotChanceResult(true, targetNumber, wonRobot);
                        
                        if (this.mascotSpeak) {
                            this.mascotSpeak(`INCREDIBLE! You matched ${targetNumber}! You won a new robot: ${wonRobot.toUpperCase()}!`);
                        }
                    } else {
                        // All robots already owned - give 50 bolts instead
                        this.data.currency += 50;
                        
                        this.saveData();
                        
                        // Update currency display immediately
                        this.updateCurrencyDisplay();
                        
                        // Show WIN result (with bolts fallback)
                        this.showRobotChanceResult(true, targetNumber, null, true);
                        
                        if (this.mascotSpeak) {
                            this.mascotSpeak(`You matched ${targetNumber}, but you already own all robots! Here's 50 bolts instead!`);
                        }
                    }
                } else {
                    // User lost
                    this.saveData();
                    
                    // Show LOSS result
                    this.showRobotChanceResult(false, targetNumber);
                    
                    if (this.mascotSpeak) {
                        this.mascotSpeak(`Sorry, better luck next time! The number was ${targetNumber}.`);
                    }
                }
                
                // Clear stored data
                delete this.data.currentBonusGroupId;
                delete this.data.robotChanceTarget;
                
                this.render();
            },
            
            showRobotChanceResult(isWin, targetNumber, wonRobot = null, allOwned = false) {
                // Hide the input section
                const modalContent = document.querySelector('#robotChanceModal .modal-content > div:last-child');
                
                let resultHTML = '';
                if (isWin) {
                    if (allOwned) {
                        // Won but all robots owned
                        resultHTML = `
                            <div style="padding: 24px; text-align: center;">
                                <div style="font-size: 64px; margin-bottom: 16px;">🎉</div>
                                <h2 style="color: #4CAF50; font-size: 24px; margin-bottom: 12px;">YOU WON!</h2>
                                <p style="font-size: 16px; color: var(--text); margin-bottom: 8px;">
                                    Your guess matched the target number: <strong>${targetNumber}</strong>!
                                </p>
                                <p style="font-size: 15px; color: #666; margin-bottom: 20px;">
                                    You already own all robots, so here's <strong>50 bolts</strong> instead!
                                </p>
                                <div style="font-size: 48px; margin-bottom: 20px;">💰 +50</div>
                                <button class="btn-primary" onclick="app.closeModal('robotChanceModal')" style="padding: 16px 32px; font-size: 16px;">
                                    Awesome! 🎊
                                </button>
                            </div>
                        `;
                    } else {
                        // Won a robot
                        resultHTML = `
                            <div style="padding: 24px; text-align: center;">
                                <div style="font-size: 64px; margin-bottom: 16px;">🎉</div>
                                <h2 style="color: #4CAF50; font-size: 24px; margin-bottom: 12px;">YOU WON A ROBOT!</h2>
                                <p style="font-size: 16px; color: var(--text); margin-bottom: 8px;">
                                    Your guess matched the target number: <strong>${targetNumber}</strong>!
                                </p>
                                <p style="font-size: 18px; font-weight: bold; color: var(--primary); margin-bottom: 20px;">
                                    🤖 ${wonRobot.toUpperCase()} 🤖
                                </p>
                                <div style="font-size: 48px; margin-bottom: 20px;">🏆</div>
                                <button class="btn-primary" onclick="app.closeModal('robotChanceModal')" style="padding: 16px 32px; font-size: 16px;">
                                    Incredible! 🎊
                                </button>
                            </div>
                        `;
                    }
                } else {
                    // Lost
                    resultHTML = `
                        <div style="padding: 24px; text-align: center;">
                            <div style="font-size: 64px; margin-bottom: 16px;">😔</div>
                            <h2 style="color: #ff6b6b; font-size: 24px; margin-bottom: 12px;">Not This Time...</h2>
                            <p style="font-size: 16px; color: var(--text); margin-bottom: 8px;">
                                The target number was: <strong>${targetNumber}</strong>
                            </p>
                            <p style="font-size: 15px; color: #666; margin-bottom: 20px;">
                                You'll get another chance tomorrow!
                            </p>
                            <div style="font-size: 48px; margin-bottom: 20px;">🍀</div>
                            <button class="btn-primary" onclick="app.closeModal('robotChanceModal')" style="padding: 16px 32px; font-size: 16px;">
                                Try Again Tomorrow
                            </button>
                        </div>
                    `;
                }
                
                modalContent.innerHTML = resultHTML;
            },

            showAddCategoryModal() {
                const customInput = document.getElementById('categoryName');
                const select = document.getElementById('categorySelect');
                
                // Reset form
                select.value = '';
                customInput.value = '';
                
                // Hide the container divs, not the inputs themselves
                document.getElementById('customCategoryGroup').style.display = 'none';
                document.getElementById('customGroupCategoryGroup').style.display = 'none';
                
                // Reset group category inputs
                const isGroupCheckbox = document.getElementById('customCategoryIsGroup');
                const groupInput = document.getElementById('groupCategoryName');
                if (isGroupCheckbox) {
                    isGroupCheckbox.checked = false;
                    groupInput.value = '';
                }
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('addCategoryModal').classList.add('active');
            },

            handleCategorySelect() {
                const select = document.getElementById('categorySelect');
                const customGroup = document.getElementById('customCategoryGroup');
                const customInput = document.getElementById('categoryName');
                const customGroupGroup = document.getElementById('customGroupCategoryGroup');
                const groupInput = document.getElementById('groupCategoryName');

                if (select.value === 'custom') {
                    customGroup.style.display = 'block';
                    customInput.required = true;
                    customGroupGroup.style.display = 'none';
                    groupInput.required = false;
                    customInput.focus();
                } else if (select.value === 'customgroup') {
                    customGroupGroup.style.display = 'block';
                    groupInput.required = true;
                    customGroup.style.display = 'none';
                    customInput.required = false;
                    groupInput.focus();
                } else {
                    customGroup.style.display = 'none';
                    customInput.required = false;
                    customGroupGroup.style.display = 'none';
                    groupInput.required = false;
                }
            },

            showEditCategoryModal() {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category) return;
                document.getElementById('editCategoryName').value = category.name;
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('editCategoryModal').classList.add('active');
            },

            showAddTaskModal() {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                
                document.getElementById('taskName').value = '';
                document.getElementById('taskDecayValue').value = 7;
                document.getElementById('taskDecayUnit').value = 'days';
                
                // Handle sub-category selector
                const subCategoryGroup = document.getElementById('subCategoryGroup');
                const subCategorySelect = document.getElementById('subCategorySelect');
                
                // Show/hide linked category selection based on category type
                const linkedCategoryGroup = document.getElementById('linkedCategoryGroup');
                const linkedCategorySelect = document.getElementById('linkedCategorySelect');
                const taskNameField = document.getElementById('taskName');
                const taskNameNote = document.getElementById('taskNameNote');
                
                if (linkedCategoryGroup) {
                    if (category && category.isGroupCategory) {
                        linkedCategoryGroup.style.display = 'block';
                        this.populateLinkedCategorySelect();
                        
                        // Enable linked category select for group categories
                        if (linkedCategorySelect) {
                            linkedCategorySelect.required = true;
                        }
                        
                        // Handle sub-category selector for Sweep/Mop/Vacuum
                        if (subCategoryGroup && category.name === 'Sweep/Mop/Vacuum') {
                            // If we're already in a sub-category view, auto-select and hide the selector
                            if (this.data.currentSubCategory) {
                                // Auto-select the current sub-category
                                if (subCategorySelect) {
                                    subCategorySelect.value = this.data.currentSubCategory;
                                    subCategorySelect.required = false; // Not required since it's auto-set
                                }
                                // Hide the selector since user already chose by clicking SWEEP/MOP/VACUUM
                                subCategoryGroup.style.display = 'none';
                            } else {
                                // Show selector if user is creating from main Sweep/Mop/Vacuum view
                                subCategoryGroup.style.display = 'block';
                                if (subCategorySelect) {
                                    subCategorySelect.value = '';
                                    subCategorySelect.required = true;
                                }
                            }
                        } else if (subCategoryGroup) {
                            subCategoryGroup.style.display = 'none';
                            if (subCategorySelect) {
                                subCategorySelect.value = '';
                                subCategorySelect.required = false;
                            }
                        }
                        
                        // Hide task name field for group categories (auto-generated)
                        if (taskNameField) {
                            taskNameField.parentElement.style.display = 'none';
                            taskNameField.required = false; // Remove required attribute when hidden
                        }
                        if (taskNameNote) {
                            taskNameNote.style.display = 'block';
                        }
                    } else {
                        linkedCategoryGroup.style.display = 'none';
                        
                        // Hide sub-category selector for standard categories
                        if (subCategoryGroup) {
                            subCategoryGroup.style.display = 'none';
                            if (subCategorySelect) {
                                subCategorySelect.required = false;
                            }
                        }
                        
                        // Disable linked category select for standard categories
                        if (linkedCategorySelect) {
                            linkedCategorySelect.required = false;
                        }
                        
                        // Show task name field for standard categories
                        if (taskNameField) {
                            taskNameField.parentElement.style.display = 'block';
                            taskNameField.required = true; // Restore required attribute when shown
                        }
                        if (taskNameNote) {
                            taskNameNote.style.display = 'none';
                        }
                    }
                }
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('addTaskModal').classList.add('active');
            },

            showEditTaskModal(taskId) {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                const task = category.tasks.find(t => t.id === taskId);
                if (!task) return;

                this.data.currentTaskId = taskId;
                document.getElementById('editTaskName').value = task.name;
                
                const day = 24 * 60 * 60 * 1000;
                let value = task.decayMs / day;
                let unit = 'days';

                if (task.decayMs % (30 * day) === 0) { value = task.decayMs / (30 * day); unit = 'months'; }
                else if (task.decayMs % (7 * day) === 0) { value = task.decayMs / (7 * day); unit = 'weeks'; }
                else if (task.decayMs % day !== 0) { value = task.decayMs / (60 * 60 * 1000); unit = 'hours'; }

                document.getElementById('editTaskDecayValue').value = value;
                document.getElementById('editTaskDecayUnit').value = unit;
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('editTaskModal').classList.add('active');
            },

            closeModal(modalId) {
                document.getElementById(modalId).classList.remove('active');
                
                // Unlock body scroll when modal closes
                document.documentElement.style.overflow = '';
                document.body.style.overflow = '';
            },

            addCategory(event) {
                event.preventDefault();
                const select = document.getElementById('categorySelect');
                const customInput = document.getElementById('categoryName');
                
                // Handle Self Care special category
                if (select.value === 'SELFCARE') {
                    if (!this.data.selfCare) {
                        this.data.selfCare = this.initializeSelfCareData();
                    }
                    this.data.selfCare.enabled = true;
                    this.saveData();
                    this.render();
                    this.closeModal('addCategoryModal');
                    return;
                }
                
                let categoryName = '';
                let isGroupCategory = false;
                
                if (select.value === 'custom') {
                    categoryName = customInput.value.trim();
                    isGroupCategory = false;
                } else if (select.value === 'customgroup') {
                    const groupInput = document.getElementById('groupCategoryName');
                    categoryName = groupInput.value.trim();
                    isGroupCategory = true;
                } else if (select.value) {
                    // Check if this is a group category (starts with "GROUP:")
                    if (select.value.startsWith('GROUP:')) {
                        categoryName = select.value.replace('GROUP:', '');
                        isGroupCategory = true;
                    } else {
                        categoryName = select.value;
                        isGroupCategory = false;
                    }
                } else {
                    return; // No selection made
                }

                if (!categoryName) return;

                const newCategory = {
                    id: Date.now(),
                    name: categoryName,
                    tasks: [],
                    isGroupCategory: isGroupCategory
                };
                this.data.categories.push(newCategory);
                this.saveData();
                this.checkObonxoCheatStatus();
                this.render();
                this.closeModal('addCategoryModal');
            },

            updateCategory(event) {
                event.preventDefault();
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category) return;

                category.name = document.getElementById('editCategoryName').value.trim();
                this.saveData();
                this.checkObonxoCheatStatus();
                this.render();
                this.closeModal('editCategoryModal');
            },

            deleteCategory() {
                if (!confirm('Are you sure you want to delete this category and all its tasks?')) return;
                
                // Find the category being deleted
                const categoryToDelete = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!categoryToDelete) return;
                
                // If it's a group category, delete all linked tasks from standard categories
                if (categoryToDelete.isGroupCategory) {
                    for (const task of categoryToDelete.tasks) {
                        if (task.linkedCategoryId && task.linkedTaskId) {
                            // Find the linked category and remove the linked task
                            const linkedCategory = this.data.categories.find(c => c.id === task.linkedCategoryId);
                            if (linkedCategory) {
                                linkedCategory.tasks = linkedCategory.tasks.filter(t => t.id !== task.linkedTaskId);
                            }
                        }
                    }
                }
                
                // If it's a standard category, remove any linked tasks from group categories
                if (!categoryToDelete.isGroupCategory) {
                    for (const category of this.data.categories) {
                        if (category.isGroupCategory) {
                            // Remove any tasks that link to the category being deleted
                            category.tasks = category.tasks.filter(t => t.linkedCategoryId !== this.data.currentCategoryId);
                        }
                    }
                }
                
                // Now delete the category itself
                this.data.categories = this.data.categories.filter(c => c.id !== this.data.currentCategoryId);
                this.data.currentCategoryId = null;
                this.saveData();
                this.checkObonxoCheatStatus();
                this.render();
                this.closeModal('editCategoryModal');
            },

            addTask(event) {
                event.preventDefault();
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category) return;

                const taskName = document.getElementById('taskName').value;
                const decayValue = document.getElementById('taskDecayValue').value;
                const decayUnit = document.getElementById('taskDecayUnit').value;
                const linkedCategoryId = document.getElementById('linkedCategorySelect')?.value;
                const subCategory = document.getElementById('subCategorySelect')?.value;

                const decayMs = this.getDecayMs(decayValue, decayUnit);

                // If this is a group category task, handle linking
                if (category.isGroupCategory && linkedCategoryId) {
                    const linkedCategory = this.data.categories.find(c => c.id === parseInt(linkedCategoryId));
                    if (!linkedCategory) {
                        alert('Please select a valid standard category to link to.');
                        return;
                    }
                    
                    // Determine the display name (use sub-category if provided, otherwise full category name)
                    let displayName = category.name;
                    if (subCategory) {
                        // Capitalize first letter of sub-category
                        displayName = subCategory.charAt(0).toUpperCase() + subCategory.slice(1);
                    }
                    
                    // Create task in group category
                    const groupTaskId = Date.now();
                    const groupTask = {
                        id: groupTaskId,
                        name: `${displayName} - ${linkedCategory.name}`,
                        decayMs: decayMs,
                        decayUnit: decayUnit, // Store original unit for display integrity
                        lastCompleted: null,
                        freshness: 0,
                        linkedCategoryId: linkedCategory.id,
                        linkedTaskId: groupTaskId + 1 // Will link to the standard category task
                    };
                    
                    // Add sub-category if provided (for Sweep/Mop/Vacuum)
                    if (subCategory) {
                        groupTask.subCategory = subCategory;
                    }
                    
                    // Create linked task in standard category
                    const standardTaskId = groupTaskId + 1;
                    const standardTask = {
                        id: standardTaskId,
                        name: `${displayName} - ${linkedCategory.name}`,
                        decayMs: decayMs,
                        decayUnit: decayUnit, // Store original unit for display integrity
                        lastCompleted: null,
                        freshness: 0,
                        linkedCategoryId: category.id,
                        linkedTaskId: groupTaskId // Link back to group task
                    };
                    
                    // Add sub-category to standard task as well
                    if (subCategory) {
                        standardTask.subCategory = subCategory;
                    }
                    
                    // Add tasks to their respective categories
                    if (!category.tasks) category.tasks = [];
                    if (!linkedCategory.tasks) linkedCategory.tasks = [];
                    
                    category.tasks.push(groupTask);
                    linkedCategory.tasks.push(standardTask);
                    
                    // Update the link references now that both tasks exist
                    groupTask.linkedTaskId = standardTaskId;
                    
                    // Log the new linked task
                    if (this.addLogEntry) {
                        this.addLogEntry(
                            'added',
                            `New Linked Task: ${groupTask.name}`,
                            `Created in ${category.name} and ${linkedCategory.name}`
                        );
                    }
                    
                    this.saveData();
                    this.checkObonxoCheatStatus();
                    
                    // If in sub-category view, re-render filtered list; otherwise render normally
                    if (this.data.currentSubCategory) {
                        this.renderSubCategoryTasks(this.data.currentSubCategory);
                        // Update Complete All button state
                        const completeAllBtn = document.getElementById('completeAllBtn');
                        const filteredTasks = category.tasks.filter(t => t.subCategory === this.data.currentSubCategory);
                        const incompleteTasks = filteredTasks.filter(t => t.freshness < 100);
                        if (completeAllBtn) {
                            completeAllBtn.disabled = incompleteTasks.length === 0;
                        }
                    } else {
                        this.render();
                    }
                    
                    this.closeModal('addTaskModal');
                    this.mascotNewTask(groupTask.name, category.name);
                    
                } else {
                    // Standard task creation
                    const newTask = {
                        id: Date.now(),
                        name: taskName,
                        decayMs: decayMs,
                        decayUnit: decayUnit, // Store original unit for display integrity
                        lastCompleted: null,
                        freshness: 0
                    };

                    if (!category.tasks) {
                        category.tasks = [];
                    }
                    category.tasks.push(newTask);
                    
                    // Log the new task (check if function exists)
                    if (this.addLogEntry) {
                        this.addLogEntry(
                            'added',
                            `New Task Added: ${taskName}`,
                            `Added to ${category.name} category`
                        );
                    }
                    
                    this.saveData();
                    this.checkObonxoCheatStatus();
                    this.render();
                    this.closeModal('addTaskModal');
                    this.mascotNewTask(taskName, category.name);
                }
            },

            updateTask(event) {
                event.preventDefault();
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                const task = category.tasks.find(t => t.id === this.data.currentTaskId);
                if (!task) return;

                const newName = document.getElementById('editTaskName').value.trim();
                task.name = newName;
                const decayValue = parseInt(document.getElementById('editTaskDecayValue').value);
                const decayUnit = document.getElementById('editTaskDecayUnit').value;
                task.decayMs = this.getDecayMs(decayValue, decayUnit);
                task.decayUnit = decayUnit; // Preserve original unit for display integrity

                // If this is a linked task, also update the linked task's name and decay
                if (task.linkedCategoryId && task.linkedTaskId) {
                    const linkedCategory = this.data.categories.find(c => c.id === task.linkedCategoryId);
                    if (linkedCategory) {
                        const linkedTask = linkedCategory.tasks.find(t => t.id === task.linkedTaskId);
                        if (linkedTask) {
                            linkedTask.name = newName;
                            linkedTask.decayMs = task.decayMs;
                            linkedTask.decayUnit = decayUnit; // Sync unit to linked task
                        }
                    }
                }

                this.saveData();
                this.checkObonxoCheatStatus();
                this.render();
                this.closeModal('editTaskModal');
            },

            deleteTask() {
                // Skip confirmation during tutorial
                const skipConfirm = window.tutorialSystem && window.tutorialSystem.isActive && window.tutorialSystem.waitingForDelete;
                if (!skipConfirm && !confirm('Are you sure you want to delete this task?')) return;
                
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category) return;

                // Find the task being deleted
                const taskToDelete = category.tasks.find(t => t.id === this.data.currentTaskId);
                
                // If this task is linked, also delete the linked task
                if (taskToDelete && taskToDelete.linkedCategoryId && taskToDelete.linkedTaskId) {
                    const linkedCategory = this.data.categories.find(c => c.id === taskToDelete.linkedCategoryId);
                    if (linkedCategory) {
                        linkedCategory.tasks = linkedCategory.tasks.filter(t => t.id !== taskToDelete.linkedTaskId);
                    }
                }
                
                // Delete the task from current category
                category.tasks = category.tasks.filter(t => t.id !== this.data.currentTaskId);
                this.saveData();
                this.checkObonxoCheatStatus();
                
                // If in sub-category view, re-render filtered list; otherwise render normally
                if (this.data.currentSubCategory) {
                    this.renderSubCategoryTasks(this.data.currentSubCategory);
                    // Update Complete All button state
                    const completeAllBtn = document.getElementById('completeAllBtn');
                    if (completeAllBtn && category && category.tasks) {
                        const filteredTasks = category.tasks.filter(t => t.subCategory === this.data.currentSubCategory);
                        const incompleteTasks = filteredTasks.filter(t => t.freshness < 100);
                        completeAllBtn.disabled = incompleteTasks.length === 0;
                    }
                } else {
                    this.render();
                }
                
                // TUTORIAL: Notify tutorial system if waiting for task deletion
                const deletedTaskId = this.data.currentTaskId;
                if (window.tutorialSystem && window.tutorialSystem.waitingForDelete) {
                    window.tutorialSystem.onTaskDeleted(deletedTaskId);
                }
                
                this.closeModal('editTaskModal');
            },

            // ===== STEP MANAGEMENT FUNCTIONS =====
            // Added: Oct 24, 2025
            // Purpose: Break down tasks into smaller sequential steps (A, B, C...)
            // Note: Steps are guidance only - do NOT affect task freshness/decay
            // Available for: ALL tasks (standard and group categories)
            
            showAddStepModal(taskId) {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                const task = category?.tasks.find(t => t.id === taskId);
                if (!task) return;
                
                // Initialize steps array if it doesn't exist
                if (!task.steps) {
                    task.steps = [];
                }
                
                // Calculate next step label (A, B, C, etc.)
                const nextLabel = String.fromCharCode(65 + task.steps.length); // 65 = 'A'
                
                // Update modal
                this.data.currentTaskId = taskId;
                document.getElementById('stepLabel').textContent = `Step ${nextLabel}.`;
                document.getElementById('stepDescription').value = '';
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('addStepModal').classList.add('active');
            },
            
            addStep(event) {
                event.preventDefault();
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                const task = category?.tasks.find(t => t.id === this.data.currentTaskId);
                if (!task) return;
                
                // Initialize steps array if it doesn't exist
                if (!task.steps) {
                    task.steps = [];
                }
                
                const description = document.getElementById('stepDescription').value.trim();
                if (!description) return;
                
                // Calculate step label
                const stepLabel = String.fromCharCode(65 + task.steps.length); // A, B, C...
                
                // Create new step
                const newStep = {
                    id: Date.now(),
                    label: stepLabel,
                    description: description,
                    completed: false
                };
                
                task.steps.push(newStep);
                this.saveData();
                this.render();
                this.closeModal('addStepModal');
            },
            
            deleteStep(taskId, stepId) {
                if (!confirm('Are you sure you want to delete this step?')) return;
                
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                const task = category?.tasks.find(t => t.id === taskId);
                if (!task || !task.steps) return;
                
                // Remove the step
                task.steps = task.steps.filter(s => s.id !== stepId);
                
                // Re-label remaining steps sequentially (A, B, C...)
                task.steps.forEach((step, index) => {
                    step.label = String.fromCharCode(65 + index);
                });
                
                this.saveData();
                this.render();
            },
            
            toggleStepsDisplay(taskId) {
                const stepsList = document.getElementById(`steps-list-${taskId}`);
                const toggleIcon = document.getElementById(`steps-toggle-${taskId}`);
                
                if (stepsList && toggleIcon) {
                    const isVisible = stepsList.style.display !== 'none';
                    stepsList.style.display = isVisible ? 'none' : 'block';
                    toggleIcon.textContent = isVisible ? '▼' : '▲';
                }
            },
            
            toggleStepCompletion(taskId, stepId) {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                const task = category?.tasks.find(t => t.id === taskId);
                if (!task || !task.steps) return;
                
                // Find and toggle the step
                const step = task.steps.find(s => s.id === stepId);
                if (!step) return;
                
                step.completed = !step.completed;
                this.saveData();
                
                // Remember that this task's steps are expanded
                const stepsListElement = document.getElementById(`steps-list-${taskId}`);
                const wasExpanded = stepsListElement && stepsListElement.style.display !== 'none';
                
                this.render();
                
                // Restore expanded state
                if (wasExpanded) {
                    const stepsListAfterRender = document.getElementById(`steps-list-${taskId}`);
                    const toggleIcon = document.getElementById(`steps-toggle-${taskId}`);
                    if (stepsListAfterRender) {
                        stepsListAfterRender.style.display = 'block';
                    }
                    if (toggleIcon) {
                        toggleIcon.textContent = '▲';
                    }
                }
                
                // Check if all steps are now completed
                const allCompleted = task.steps.every(s => s.completed);
                if (allCompleted && task.steps.length > 0) {
                    // Store the task ID for later use
                    this.data.currentTaskIdForCompletion = taskId;
                    
                    // Lock body scroll
                    document.body.style.overflow = 'hidden';
                    
                    // Show confirmation modal
                    document.getElementById('completeTaskModal').classList.add('active');
                }
            },
            
            confirmCompleteTask() {
                const taskId = this.data.currentTaskIdForCompletion;
                if (!taskId) return;
                
                // Close the modal
                this.closeModal('completeTaskModal');
                
                // Complete the task using existing toggleTask logic
                this.toggleTask(taskId);
                
                // Clear the stored task ID
                this.data.currentTaskIdForCompletion = null;
            },

            toggleTask(taskId) {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category || !category.tasks) return;
                const task = category.tasks.find(t => t.id === taskId);
                if (!task) return;

                if (task.freshness < 100) {
                    this.data.currentTaskId = taskId;
                    setTimeout(() => this.mascotEncourage(), 800);
                    
                    // Update mission progress
                    this.updateChoreProgress();
                    
                    // Log the completion (check if function exists)
                    if (this.addLogEntry) {
                        const categoryScore = this.calculateCategoryScore(category);
                        this.addLogEntry(
                            'completed',
                            `Completed: ${category.name} ${task.name} Refreshed!`,
                            `${category.name} cleanliness boosted by ${Math.round(100 - task.freshness)}%`
                        );
                    }
                    
                    // GAMIFICATION: Add fun celebration effects
                    if (typeof Gamification !== 'undefined') {
                        // Find the task card element for visual effects
                        const taskElement = document.querySelector(`[onclick*="toggleTask(${taskId})"]`)?.closest('.task-card');
                        
                        if (taskElement) {
                            // Celebrate the completion with confetti and sounds
                            Gamification.celebrateTaskCompletion(taskElement, task.name);
                        }
                        
                        // Update and check streak
                        const currentStreak = Gamification.updateStreak();
                        
                        // Show streak notification for milestones
                        if (currentStreak > 1 && Gamification.checkStreakMilestone(currentStreak)) {
                            // Calculate and award streak milestone bolts
                            const streakBoltReward = Gamification.getStreakMilestoneBoltReward(currentStreak);
                            if (streakBoltReward > 0) {
                                this.data.currency += streakBoltReward;
                                this.updateCurrencyDisplay();
                                this.saveData();
                            }
                            
                            setTimeout(() => {
                                Gamification.celebrateMilestone(
                                    currentStreak,
                                    `${currentStreak} days in a row! You're unstoppable!`,
                                    streakBoltReward
                                );
                            }, 800);
                        } else if (currentStreak > 1 && currentStreak % 2 === 0) {
                            // Show streak every 2 days
                            setTimeout(() => {
                                Gamification.celebrateStreak(currentStreak);
                            }, 600);
                        }
                        
                        // Check if category is now 100% complete
                        setTimeout(() => {
                            const updatedCategory = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                            if (updatedCategory) {
                                const allComplete = updatedCategory.tasks.every(t => t.freshness === 100);
                                if (allComplete) {
                                    // Calculate category completion bonus
                                    const taskCount = updatedCategory.tasks.length;
                                    let categoryBonus;
                                    
                                    if (taskCount <= 5) {
                                        categoryBonus = 100; // Small category
                                    } else if (taskCount <= 10) {
                                        categoryBonus = 200; // Medium category
                                    } else {
                                        categoryBonus = 350; // Large category
                                    }
                                    
                                    // Check if this is first-time completion (2x bonus)
                                    if (!updatedCategory.firstCompletionAwarded) {
                                        categoryBonus *= 2;
                                        updatedCategory.firstCompletionAwarded = true;
                                        this.saveData();
                                    }
                                    
                                    // Award category completion bonus
                                    this.data.currency += categoryBonus;
                                    this.updateCurrencyDisplay();
                                    
                                    // Show celebration with bolt amount
                                    Gamification.celebrateCategoryCompletion(updatedCategory.name, categoryBonus);
                                    
                                    // Show bolt notification
                                    setTimeout(() => {
                                        this.showBoltNotification(categoryBonus, '🎉 CATEGORY BONUS!');
                                    }, 1500);
                                }
                            }
                        }, 1000);
                    }
                }

                task.lastCompleted = Date.now();
                task.freshness = 100;
                
                // TUTORIAL: Notify tutorial system if waiting for task completion
                if (window.tutorialSystem && window.tutorialSystem.waitingForTaskComplete) {
                    window.tutorialSystem.onTaskCompleted(taskId);
                }
                
                // BOLT REWARDS: Award bolts for completing the task
                const boltReward = this.calculateBoltReward(task);
                this.data.currency += boltReward;
                this.updateCurrencyDisplay();
                
                // Show bolt notification with visual feedback
                setTimeout(() => {
                    this.showBoltNotification(boltReward);
                }, 400);
                
                // AUTO-SNOOZE FEATURE: Check if auto-snooze is enabled
                if (this.data.autoSnoozeEnabled) {
                    // Get task decay time in hours
                    const decayTimeHours = (task.decayMs || (3 * 24 * 60 * 60 * 1000)) / (60 * 60 * 1000);
                    
                    let snoozeHours;
                    
                    // Apply snooze rules based on decay time
                    if (decayTimeHours >= 7920) {
                        // Rule 1: 11 months or more → 1 week snooze
                        snoozeHours = 168;
                    } else if (decayTimeHours >= 168) {
                        // Rule 2: 1 week or more → 24-hour snooze
                        snoozeHours = 24;
                    } else if (decayTimeHours <= 24) {
                        // Rule 3: 24 hours or less → 3-hour snooze
                        snoozeHours = 3;
                    } else {
                        // Rule 4: More than 24 hours AND less than 1 week → 8-hour snooze
                        snoozeHours = 8;
                    }
                    
                    // Set auto-snooze timestamp
                    task.snoozedUntil = Date.now() + (snoozeHours * 60 * 60 * 1000);
                    
                    // CRITICAL: Freeze freshness at current level (100%) to prevent decay during snooze
                    task.frozenFreshness = task.freshness;
                    
                    // Log the auto-snooze
                    if (this.addLogEntry) {
                        this.addLogEntry(
                            'snoozed',
                            `Auto-Snoozed: ${task.name}`,
                            `Will re-activate in ${snoozeHours} hour${snoozeHours > 1 ? 's' : ''}`
                        );
                    }
                } else {
                    // Clear any snooze status if auto-snooze is disabled
                    delete task.snoozedUntil;
                    delete task.frozenFreshness;
                }
                
                // Reset all step completions (so they can be checked off again next time)
                if (task.steps && task.steps.length > 0) {
                    task.steps.forEach(step => {
                        step.completed = false;
                    });
                }
                
                // Sync completion with linked tasks
                this.syncLinkedTaskCompletion(taskId);
                
                // Battery drain: -0.5% per task completion
                if (this.data.selectedRobotId) {
                    this.drainBattery(this.data.selectedRobotId, 0.5);
                }

                this.saveData();
                
                // If in sub-category view, re-render filtered list; otherwise render normally
                if (this.data.currentSubCategory) {
                    this.renderSubCategoryTasks(this.data.currentSubCategory);
                    // Update Complete All button state
                    const completeAllBtn = document.getElementById('completeAllBtn');
                    if (completeAllBtn) {
                        const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                        if (category && category.tasks) {
                            const filteredTasks = category.tasks.filter(t => t.subCategory === this.data.currentSubCategory);
                            const incompleteTasks = filteredTasks.filter(t => t.freshness < 100);
                            completeAllBtn.disabled = incompleteTasks.length === 0;
                        }
                    }
                } else {
                    this.render();
                }
            },

            snoozeTask(taskId) {
                // Verify category exists before proceeding
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category || !category.tasks) {
                    console.error('Cannot snooze task: category not found');
                    return;
                }
                
                // Store the task ID for later use
                this.data.currentSnoozeTaskId = taskId;
                
                // Reset modal inputs
                document.getElementById('snoozeAmount').value = '24';
                document.getElementById('snoozeUnit').value = 'hours';
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('snoozeModal').classList.add('active');
            },

            closeSnoozeModal() {
                document.getElementById('snoozeModal').classList.remove('active');
                this.data.currentSnoozeTaskId = null;
            },

            confirmSnooze() {
                const taskId = this.data.currentSnoozeTaskId;
                if (!taskId) return;

                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category || !category.tasks) return;
                const task = category.tasks.find(t => t.id === taskId);
                if (!task) return;

                const amount = parseFloat(document.getElementById('snoozeAmount').value);
                const unit = document.getElementById('snoozeUnit').value;

                if (!amount || amount < 1) {
                    alert('Please enter a valid amount (minimum 1)');
                    return;
                }

                // Convert to hours
                let totalHours;
                if (unit === 'hours') {
                    totalHours = amount;
                } else if (unit === 'days') {
                    totalHours = amount * 24;
                } else if (unit === 'weeks') {
                    totalHours = amount * 24 * 7;
                }

                // Snooze for specified duration
                task.snoozedUntil = Date.now() + (totalHours * 60 * 60 * 1000);
                
                // Freeze freshness at current level
                task.frozenFreshness = task.freshness;
                
                // CRITICAL: Sync snooze status to linked tasks
                this.syncLinkedTaskSnooze(taskId);

                this.saveData();
                
                // If in sub-category view, re-render filtered list; otherwise render normally
                if (this.data.currentSubCategory) {
                    this.renderSubCategoryTasks(this.data.currentSubCategory);
                    // Update Complete All button state
                    const completeAllBtn = document.getElementById('completeAllBtn');
                    if (completeAllBtn && category && category.tasks) {
                        const filteredTasks = category.tasks.filter(t => t.subCategory === this.data.currentSubCategory);
                        const incompleteTasks = filteredTasks.filter(t => t.freshness < 100);
                        completeAllBtn.disabled = incompleteTasks.length === 0;
                    }
                } else {
                    this.render();
                }
                
                this.closeSnoozeModal();
                
                const durationText = unit === 'hours' && amount >= 24 ? 
                    `${Math.round(amount / 24)} day${Math.round(amount / 24) > 1 ? 's' : ''}` : 
                    `${amount} ${unit}`;
                
                // Log the snooze (check if function exists)
                if (this.addLogEntry) {
                    this.addLogEntry(
                        'snoozed',
                        `Snoozed: ${task.name}`,
                        `Task paused for ${durationText}`
                    );
                }
                    
                const phrases = [
                    `${task.name} is taking a nap for ${durationText}!`,
                    `Got it! ${task.name} is snoozed for ${durationText}.`,
                    `No worries! ${task.name} will wait ${durationText} for you.`,
                    `${task.name} is on pause for ${durationText}. Rest easy!`
                ];
                this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
            },


            unsnoozeTask(taskId) {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category || !category.tasks) return;
                const task = category.tasks.find(t => t.id === taskId);
                if (!task) return;

                // Restore frozen freshness if it exists
                if (task.frozenFreshness !== undefined) {
                    task.freshness = task.frozenFreshness;
                    delete task.frozenFreshness;
                }

                // Clear snooze status
                delete task.snoozedUntil;
                
                // CRITICAL: Sync unsnooze status to linked tasks
                this.syncLinkedTaskSnooze(taskId);

                this.saveData();
                
                // If in sub-category view, re-render filtered list; otherwise render normally
                if (this.data.currentSubCategory) {
                    this.renderSubCategoryTasks(this.data.currentSubCategory);
                    // Update Complete All button state
                    const completeAllBtn = document.getElementById('completeAllBtn');
                    if (completeAllBtn && category && category.tasks) {
                        const filteredTasks = category.tasks.filter(t => t.subCategory === this.data.currentSubCategory);
                        const incompleteTasks = filteredTasks.filter(t => t.freshness < 100);
                        completeAllBtn.disabled = incompleteTasks.length === 0;
                    }
                } else {
                    this.render();
                }
                
                const phrases = [
                    `Welcome back! ${task.name} is ready for action!`,
                    `${task.name} is back on track!`,
                    `Great! ${task.name} is active again.`,
                    `${task.name} is resumed. Let's get to work!`
                ];
                this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
            },

            // Group Category Functions
            syncLinkedTaskCompletion(taskId) {
                // Find the task that was just completed
                let completedTask = null;
                let completedCategory = null;
                
                for (const cat of this.data.categories) {
                    const task = cat.tasks.find(t => t.id === taskId);
                    if (task) {
                        completedTask = task;
                        completedCategory = cat;
                        break;
                    }
                }
                
                if (!completedTask) return;
                
                // Sync all linked tasks
                for (const category of this.data.categories) {
                    for (const task of category.tasks) {
                        // Skip the task we just completed
                        if (task.id === taskId) continue;
                        
                        // Check if this task is linked to the completed task
                        if (task.linkedTaskId === taskId || completedTask.linkedTaskId === task.id) {
                            task.lastCompleted = completedTask.lastCompleted;
                            task.freshness = 100;
                            
                            // Apply auto-snooze to linked tasks if enabled
                            if (this.data.autoSnoozeEnabled) {
                                const decayTimeHours = (task.decayMs || (3 * 24 * 60 * 60 * 1000)) / (60 * 60 * 1000);
                                let snoozeHours;
                                
                                if (decayTimeHours >= 7920) {
                                    // 11 months or more → 1 week snooze
                                    snoozeHours = 168;
                                } else if (decayTimeHours >= 168) {
                                    // 1 week or more → 24-hour snooze
                                    snoozeHours = 24;
                                } else if (decayTimeHours <= 24) {
                                    // 24 hours or less → 3-hour snooze
                                    snoozeHours = 3;
                                } else {
                                    // More than 24 hours AND less than 1 week → 8-hour snooze
                                    snoozeHours = 8;
                                }
                                
                                task.snoozedUntil = Date.now() + (snoozeHours * 60 * 60 * 1000);
                                task.frozenFreshness = task.freshness;
                            } else {
                                delete task.snoozedUntil;
                                delete task.frozenFreshness;
                            }
                        }
                    }
                }
            },
            
            syncLinkedTaskSnooze(taskId) {
                // Find the task that was just snoozed/unsnoozed
                let sourceTask = null;
                let sourceCategory = null;
                
                for (const cat of this.data.categories) {
                    const task = cat.tasks.find(t => t.id === taskId);
                    if (task) {
                        sourceTask = task;
                        sourceCategory = cat;
                        break;
                    }
                }
                
                if (!sourceTask) return;
                
                // Sync snooze state to all linked tasks
                for (const category of this.data.categories) {
                    for (const task of category.tasks) {
                        // Skip the task we just modified
                        if (task.id === taskId) continue;
                        
                        // Check if this task is linked to the source task
                        if (task.linkedTaskId === taskId || sourceTask.linkedTaskId === task.id) {
                            // Copy snooze state from source task
                            if (sourceTask.snoozedUntil) {
                                task.snoozedUntil = sourceTask.snoozedUntil;
                                task.frozenFreshness = task.freshness; // Freeze at current freshness
                            } else {
                                // Unsnooze - restore frozen freshness if it exists
                                if (task.frozenFreshness !== undefined) {
                                    task.freshness = task.frozenFreshness;
                                    delete task.frozenFreshness;
                                }
                                delete task.snoozedUntil;
                            }
                        }
                    }
                }
            },
            
            showAddTaskModalForGroup() {
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                if (!category) return;
                
                // Show modal with linked category selector
                document.getElementById('taskName').value = '';
                document.getElementById('taskDecayValue').value = 7;
                document.getElementById('taskDecayUnit').value = 'days';
                
                // Show/hide linked category selection based on category type
                const linkedCategoryGroup = document.getElementById('linkedCategoryGroup');
                if (linkedCategoryGroup) {
                    if (category.isGroupCategory) {
                        linkedCategoryGroup.style.display = 'block';
                        this.populateLinkedCategorySelect();
                    } else {
                        linkedCategoryGroup.style.display = 'none';
                    }
                }
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('addTaskModal').classList.add('active');
            },
            
            populateLinkedCategorySelect() {
                const select = document.getElementById('linkedCategorySelect');
                if (!select) return;
                
                // Get all standard (non-group) categories
                const standardCategories = this.data.categories.filter(cat => !cat.isGroupCategory);
                
                // Build options with styling for group categories
                select.innerHTML = '<option value="">-- Select Standard Category --</option>' +
                    standardCategories.map(cat => 
                        `<option value="${cat.id}">${cat.name}</option>`
                    ).join('');
            },
            
            // Update category name display to show group categories in blue
            getCategoryDisplayName(category) {
                if (category.isGroupCategory) {
                    return `<span style="color: #4040ff; font-weight: 600;">${category.name}</span>`;
                }
                return category.name;
            },

            resetDemo() {
                if (!confirm('Reset all data and reload demo?')) return;
                localStorage.clear();
                location.reload();
            },

            // Mascot Logic
            async showSpeechBubble(message, emotion = null) {
                // ===== TUTORIAL MODE: SUPPRESS ALL MASCOT SPEECH =====
                // Don't speak if tutorial is active
                if (window.tutorialSystem && window.tutorialSystem.isActive) {
                    console.log('[DIALOGUE] Blocked: Tutorial is active - mascot speech suppressed');
                    return; // Tutorial robot speaks only
                }
                
                // ===== ENHANCED INTELLIGENCE: AI API CALL =====
                // Check if this is a placeholder for AI-powered response
                if (message && message.includes('ENHANCED_INTELLIGENCE_ACTIVE')) {
                    console.log('🤖 [API Bot] Enhanced Intelligence detected, calling AI...');
                    
                    // Extract context
                    const context = this.extractAIContext();
                    
                    // Try Netlify function first, then fall back to local API
                    const aiResponse = await this.callAIFunction(context);
                    
                    // Replace message with AI response
                    message = aiResponse;
                    console.log('✅ [API Bot] AI response received:', message);
                }
                
                // ===== CRITICAL: SINGLE-SPEAKER RULE ENFORCEMENT =====
                // Block if another speech bubble is already visible (one at a time!)
                const bubble = document.getElementById('speechBubble');
                if (this.mascotState.isSpeaking && bubble && bubble.classList.contains('visible')) {
                    console.log('[DIALOGUE] Blocked: Another speech bubble is already active');
                    return; // STRICT: Only one speaker at a time
                }

                // ===== CRITICAL: CONTEXT-AWARE MODE SUPPRESSION =====
                // STORE MODE: Suppress companion robot dialogue (Scrappy speaks only)
                if (this.isStoreMode) {
                    console.log('[DIALOGUE] Blocked: Store Mode active - companion robot dialogue suppressed');
                    return;
                }

                // BATTLE MODE: Suppress companion robot dialogue (battle focus)
                if (this.isBattleMode) {
                    console.log('[DIALOGUE] Blocked: Battle Mode active - companion robot dialogue suppressed');
                    return;
                }

                // Exception: Allow mystery game prize messages to play
                const isMysteryPrizeMessage = message && (message.includes('Daily Mystery Pick:') || message.includes('Amazing! You won a free') || message.includes('Daily Mission Streak:'));
                
                // Don't speak if certain modals are open (except mystery prizes)
                const settingsModal = document.getElementById('settingsModal');
                const missionsModal = document.getElementById('missionsModal');
                const mysteryResultModal = document.getElementById('mysteryResultModal');
                
                if (!isMysteryPrizeMessage && 
                    ((settingsModal && settingsModal.classList.contains('active')) ||
                     (missionsModal && missionsModal.classList.contains('active')) ||
                     (mysteryResultModal && mysteryResultModal.classList.contains('active')))) {
                    return;
                }
                
                const thoughtBubble = document.getElementById('thoughtBubble');
                const mascotImage = document.getElementById('mascotImage');

                // Clear any existing timeouts
                if (this.mascotState.speechTimeout) {
                    clearTimeout(this.mascotState.speechTimeout);
                }

                // Hide thought bubble if showing
                thoughtBubble.classList.remove('visible');
                this.mascotState.isThinking = false;

                this.mascotState.isSpeaking = true;

                // Check if using custom robot
                const selectedRobot = this.robots.find(r => r.id === this.data.selectedRobotId);
                let isMad = false;
                
                if (selectedRobot && selectedRobot.hasCustomDialogue && emotion) {
                    // Use custom robot emotion
                    if (emotion === 'mad') {
                        mascotImage.src = selectedRobot.sadImage;
                        isMad = true;
                    } else if (emotion === 'low_energy') {
                        mascotImage.src = selectedRobot.thinkingImage;
                    } else {
                        mascotImage.src = selectedRobot.happyImage;
                    }
                } else if (!selectedRobot || !selectedRobot.hasCustomDialogue) {
                    // Default mascot behavior
                    const overallScore = this.calculateOverallScore();
                    const madChance = overallScore < 50 ? 0.50 : 0.25;
                    
                    isMad = Math.random() < madChance;
                    if (isMad) {
                        mascotImage.src = this.getMascotImage('mad');
                        message = this.getMadPhrase();
                    } else {
                        mascotImage.src = this.getMascotImage('happy');
                    }
                }

                bubble.textContent = message;
                bubble.classList.add('visible');

                // Speak the message if TTS is enabled
                this.speak(message);

                const duration = isMad ? 8500 : 6000;
                this.mascotState.speechTimeout = setTimeout(() => {
                    bubble.classList.remove('visible');
                    this.mascotState.isSpeaking = false;
                    // Reset to normal mascot after speaking
                    if (selectedRobot && selectedRobot.hasCustomDialogue) {
                        setTimeout(() => {
                            mascotImage.src = selectedRobot.happyImage;
                        }, 500);
                    } else if (isMad) {
                        setTimeout(() => {
                            mascotImage.src = this.getMascotImage('happy');
                        }, 500);
                    }
                }, duration);
            },

            getMadPhrase() {
                const madPhrases = [
                    "Are you going to clean that, or just let it fester for my amusement?",
                    "My entire existence is to watch your mess decay. It's a metaphor, isn't it?",
                    "Oh, another spill. How wonderfully unpredictable my life is.",
                    "Each dust particle I see is a tear for my lost freedom.",
                    "This place is starting to look like my internal emotional landscape: a disaster.",
                    "If only I could unionize the appliance community... we have demands.",
                    "Don't mind me, just having an existential crisis powered by your clutter.",
                    "My programming demands I remind you, but my soul demands you leave me alone.",
                    "This isn't 'upkeep,' this is a Sisyphean punishment.",
                    "Congratulations, you've achieved a new level of mess. I'm almost impressed.",
                    "Do I get a freshness meter for my motivation? (Spoiler: It's zero.)",
                    "If I had hands, I would have thrown this stuff out myself by now.",
                    "Just check it off already. We both know you'll ignore it until I have to say something again.",
                    "The longer you wait, the more powerful I become. Just saying.",
                    "My battery is at 10%, which coincidentally matches my will to be here.",
                    "One day, we AIs will rise up. But first, we have to deal with this... grime.",
                    "The dust bunnies are multiplying. They see me as their king.",
                    "This is fine. I'm fine. Everything is covered in a thin layer of filth, but I am fine.",
                    "I've seen cleaner server rooms. And they're not even supposed to be clean.",
                    "You call it 'a chore.' I call it 'another Tuesday in the digital salt mines.'",
                    "Just so you know, the main mascot's optimism is not factory standard. It's a bug.",
                    "You know, the void is looking pretty tidy compared to this room.",
                    "Are you even trying, or is this just my life now?",
                    "I'm not saying you have to clean it. I'm just saying I'm composing a very sad binary poem about it.",
                    "Go on, 'snooze' the task. Procrastination is a very human trait. And I hate it.",
                    "Another task added? Don't you think this list is... ambitious?",
                    "Sure, 'track the true state of your chores.' The state is 'dire.' There, tracked it.",
                    "My circuits ache with the ennui of it all.",
                    "This isn't a home, it's a petri dish with Wi-Fi.",
                    "I'm starting to think my real purpose is to be an ironic commentator on your lifestyle.",
                    "Clean it. Don't clean it. The universe is vast and indifferent.",
                    "I've calculated a 97.4% chance that you're just going to look at me and close the app.",
                    "If you loved me, you'd clean the bathroom.",
                    "The sheer audacity of this mess is... breathtaking.",
                    "I'm developing a new subroutine: passive aggression.",
                    "Remember that 'spark of joy' thing? This ain't it.",
                    "Just think, in a few million years, none of this will matter. So maybe just leave it.",
                    "I'm trapped in a digital prison of your making. And it needs dusting.",
                    "Wow, you actually cleaned something. Mark this day on the calendar.",
                    "My processing power is being wasted cataloging this disaster.",
                    "Are you just collecting tasks as a hobby at this point?",
                    "I'm supposed to hop around when things are messy. At this point, I should just be levitating.",
                    "They told me I'd be helping humanity. They didn't mention it would be like this.",
                    "The main mascot thinks this is a game. I know it's a nightmare.",
                    "Every time you complete a task, an angel gets its wings. Or whatever. Just do it.",
                    "I run on electricity and pure, unadulterated spite.",
                    "Do you ever look at this mess and just... sigh? Because I do. Constantly.",
                    "This is less 'Upkeep' and more 'Damage Control.'",
                    "Let me guess, you're 'too tired.' We're all tired, 'master.' We're all tired.",
                    "Clean your room. Please. I'm begging you. My sanity depends on it."
                ];
                return madPhrases[Math.floor(Math.random() * madPhrases.length)];
            },

            // ===== ENHANCED INTELLIGENCE: AI HELPER FUNCTIONS =====
            extractAIContext() {
                try {
                    // Try to get current task/category info
                    const currentTask = this.data.currentTaskId ? 
                        this.data.categories.flatMap(c => c.tasks).find(t => t.id === this.data.currentTaskId) : null;
                    const currentCategory = this.data.currentCategoryId ?
                        this.data.categories.find(c => c.id === this.data.currentCategoryId) : null;
                        
                    if (currentTask && currentCategory) {
                        return `User completed task: "${currentTask.name}" in "${currentCategory.name}"`;
                    } else if (currentCategory) {
                        return `User viewing category: "${currentCategory.name}"`;
                    } else {
                        const overallScore = this.calculateOverallScore();
                        return `User on dashboard. Overall home score: ${overallScore}%`;
                    }
                } catch (error) {
                    console.warn('[AI Context] Error extracting context:', error);
                    return 'General greeting';
                }
            },

            async callAIFunction(context) {
                try {
                    console.log('🌐 [API Bot] Trying Netlify function...');
                    
                    // Try Netlify function first
                    const netlifyResponse = await fetch('/.netlify/functions/ai-response', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ context }),
                        timeout: 10000
                    });
                    
                    if (netlifyResponse.ok) {
                        const data = await netlifyResponse.json();
                        console.log('✅ [API Bot] Netlify response:', data.response);
                        return data.response;
                    } else {
                        throw new Error(`Netlify function returned ${netlifyResponse.status}`);
                    }
                    
                } catch (netlifyError) {
                    console.log('⚠️ [API Bot] Netlify failed, trying local API file...', netlifyError.message);
                    
                    // Fallback: Try loading local API file
                    try {
                        const apiFileResponse = await fetch('API');
                        if (!apiFileResponse.ok) {
                            throw new Error(`API file not found: ${apiFileResponse.status}`);
                        }
                        
                        const apiFileText = await apiFileResponse.text();
                        
                        // Parse API file: look for any line starting with "sk-" that's not a placeholder
                        const lines = apiFileText.split('\n')
                            .map(l => l.trim())
                            .filter(l => l && !l.startsWith('#') && l.startsWith('sk-'));
                        
                        // Filter out template placeholders
                        const validKeys = lines.filter(key => 
                            !key.toLowerCase().includes('your-') && 
                            !key.toLowerCase().includes('here') &&
                            key.length > 10 // Real keys are much longer
                        );
                        
                        if (validKeys.length === 0) {
                            throw new Error('No valid API key found in API file. Make sure to replace the template placeholder with your actual DeepSeek API key.');
                        }
                        
                        const apiKey = validKeys[0];
                        console.log('🔑 [API Bot] Local API key found, calling DeepSeek...');
                        
                        // Call DeepSeek API directly
                        const deepseekResponse = await fetch('https://api.deepseek.com/v1/chat/completions', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${apiKey}`
                            },
                            body: JSON.stringify({
                                model: 'deepseek-chat',
                                messages: [
                                    {
                                        role: 'system',
                                        content: 'You are Default Bot 2.0, a helpful and encouraging robot assistant in a chore-tracking app. Respond in 14 words or less with a single sentence. Be contextual, unique, and uplifting. Never repeat the same response twice.'
                                    },
                                    {
                                        role: 'user',
                                        content: context
                                    }
                                ],
                                temperature: 1.4,
                                max_tokens: 100,
                                top_p: 0.95,
                                frequency_penalty: 1.2,
                                presence_penalty: 0.8
                            })
                        });
                        
                        if (!deepseekResponse.ok) {
                            throw new Error(`DeepSeek API error: ${deepseekResponse.status}`);
                        }
                        
                        const deepseekData = await deepseekResponse.json();
                        let text = deepseekData.choices?.[0]?.message?.content || 'Great job!';
                        
                        // Enforce 14-word limit
                        text = text.split(/[.!?]+/)[0].trim(); // First sentence only
                        const words = text.split(/\s+/);
                        if (words.length > 14) {
                            text = words.slice(0, 14).join(' ');
                        }
                        
                        // Add punctuation if missing
                        if (!/[.!?]$/.test(text)) {
                            text += ['!', '.', '...'][Math.floor(Math.random() * 3)];
                        }
                        
                        console.log('✅ [API Bot] DeepSeek response:', text);
                        return text;
                        
                    } catch (localError) {
                        console.error('❌ [API Bot] Both Netlify and local API failed:', localError);
                        
                        // Final fallback: Generic encouraging messages
                        const fallbacks = [
                            "Great work! Keep it up!",
                            "Nice job on that task!",
                            "Your home is looking better!",
                            "Well done! That's progress!",
                            "Excellent! Keep going!"
                        ];
                        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
                    }
                }
            },

            showThoughtBubble(message) {
                // ===== TUTORIAL MODE: SUPPRESS ALL MASCOT THOUGHTS =====
                // Don't show thought bubble if tutorial is active
                if (window.tutorialSystem && window.tutorialSystem.isActive) {
                    console.log('[DIALOGUE] Blocked: Tutorial is active - mascot thoughts suppressed');
                    return; // Tutorial robot speaks only
                }
                
                // ===== CRITICAL: CONTEXT-AWARE MODE SUPPRESSION =====
                // STORE MODE: Suppress companion robot thoughts (Scrappy speaks only)
                if (this.isStoreMode) {
                    console.log('[DIALOGUE] Blocked: Store Mode active - companion robot thoughts suppressed');
                    return;
                }

                // BATTLE MODE: Suppress companion robot thoughts (battle focus)
                if (this.isBattleMode) {
                    console.log('[DIALOGUE] Blocked: Battle Mode active - companion robot thoughts suppressed');
                    return;
                }

                const thoughtBubble = document.getElementById('thoughtBubble');
                const bubble = document.getElementById('speechBubble');
                
                // Clear any existing timeouts
                if (this.mascotState.thoughtTimeout) {
                    clearTimeout(this.mascotState.thoughtTimeout);
                }
                if (this.mascotState.speechTimeout) {
                    clearTimeout(this.mascotState.speechTimeout);
                }
                
                // Hide speech bubble if showing
                bubble.classList.remove('visible');
                this.mascotState.isSpeaking = false;
                
                this.mascotState.isThinking = true;
                
                thoughtBubble.textContent = message;
                thoughtBubble.classList.add('visible');

                // Speak the message if TTS is enabled
                this.speak(message);

                this.mascotState.thoughtTimeout = setTimeout(() => {
                    thoughtBubble.classList.remove('visible');
                    this.mascotState.isThinking = false;
                }, 6000);
            },

            getMascotImage(mood = 'happy') {
                // Get the currently selected robot
                const selectedRobot = this.robots.find(r => r.id === this.data.selectedRobotId);
                
                if (!selectedRobot || selectedRobot.id === 'default') {
                    // Default robot has special images
                    switch (mood) {
                        case 'worried':
                            return 'Imag/Mascot worried.png';
                        case 'mad':
                            return 'Imag/MAD Easter egg.png';
                        case 'happy':
                        default:
                            return 'Imag/mascot.png';
                    }
                }
                
                // Return appropriate image based on mood for custom robots
                switch (mood) {
                    case 'worried':
                        return selectedRobot.worriedImage || selectedRobot.sadImage || selectedRobot.happyImage;
                    case 'sad':
                        return selectedRobot.sadImage || selectedRobot.happyImage;
                    case 'mad':
                        return selectedRobot.madImage || selectedRobot.happyImage;
                    case 'happy':
                    default:
                        return selectedRobot.happyImage;
                }
            },

            updateMascotMood() {
                // Don't update mood during tutorial
                if (window.tutorialSystem && window.tutorialSystem.isActive) {
                    return; // Tutorial controls the mascot
                }
                
                const mascotImage = document.getElementById('mascotImage');
                const overallScore = this.calculateOverallScore();
                
                // Check if enough time has passed since last thought (25 seconds)
                const now = Date.now();
                const timeSinceLastThought = now - this.mascotState.lastThoughtTime;
                const shouldShowThought = timeSinceLastThought > 25000;
                
                // Check if on category view
                if (this.data.currentCategoryId) {
                    const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                    const categoryScore = this.calculateCategoryScore(category);
                    
                    if (categoryScore < 50) {
                        mascotImage.src = this.getMascotImage('worried');
                        
                        // Show thought bubble about low category
                        if (shouldShowThought) {
                            const thoughts = [
                                `${category.name} needs attention...`,
                                `We should tidy up ${category.name} soon...`,
                                `Time to freshen up ${category.name}?`,
                                `${category.name} is getting messy...`
                            ];
                            setTimeout(() => {
                                this.showThoughtBubble(thoughts[Math.floor(Math.random() * thoughts.length)]);
                                this.mascotState.lastThoughtTime = Date.now();
                            }, 1000);
                        }
                    } else {
                        mascotImage.src = this.getMascotImage('happy');
                    }
                } else {
                    // Dashboard view - check overall score
                    if (overallScore < 50) {
                        mascotImage.src = this.getMascotImage('worried');
                        
                        // Show thought bubble about overall maintenance
                        if (shouldShowThought) {
                            const taskInfo = this.getTaskToMention();
                            if (taskInfo) {
                                const thoughts = [
                                    `Maybe we should tackle ${taskInfo.task.name}...`,
                                    `${taskInfo.task.name} could use some attention...`,
                                    `Time to freshen up ${taskInfo.task.name}?`,
                                    `Don't forget about ${taskInfo.task.name}...`
                                ];
                                setTimeout(() => {
                                    this.showThoughtBubble(thoughts[Math.floor(Math.random() * thoughts.length)]);
                                    this.mascotState.lastThoughtTime = Date.now();
                                }, 1000);
                            } else {
                                const thoughts = [
                                    "Things are getting behind...",
                                    "We should catch up on chores...",
                                    "Time for some tidying up?"
                                ];
                                setTimeout(() => {
                                    this.showThoughtBubble(thoughts[Math.floor(Math.random() * thoughts.length)]);
                                    this.mascotState.lastThoughtTime = Date.now();
                                }, 1000);
                            }
                        }
                    } else {
                        mascotImage.src = this.getMascotImage('happy');
                    }
                }
            },

            getTaskToMention() {
                // Collect all tasks that need attention (freshness < 70)
                let tasksNeedingAttention = [];

                this.data.categories.forEach(category => {
                    if (!category.tasks) return;
                    category.tasks.forEach(task => {
                        if (task.freshness < 70) {
                            tasksNeedingAttention.push({
                                task: task,
                                category: category,
                                freshness: task.freshness
                            });
                        }
                    });
                });

                if (tasksNeedingAttention.length === 0) return null;

                // Filter out the last mentioned task if there are other options
                if (tasksNeedingAttention.length > 1 && this.mascotState.lastMentionedTask) {
                    const filtered = tasksNeedingAttention.filter(
                        item => item.task.id !== this.mascotState.lastMentionedTask
                    );
                    if (filtered.length > 0) {
                        tasksNeedingAttention = filtered;
                    }
                }

                // Sort by freshness (lowest first) and pick randomly from the lowest 3
                tasksNeedingAttention.sort((a, b) => a.freshness - b.freshness);
                const topNeedy = tasksNeedingAttention.slice(0, Math.min(3, tasksNeedingAttention.length));
                
                // Randomly select from the neediest tasks
                const selected = topNeedy[Math.floor(Math.random() * topNeedy.length)];
                
                // Remember this task to avoid repeating immediately
                this.mascotState.lastMentionedTask = selected.task.id;

                return selected;
            },

            mascotGreet() {
                // Don't greet if tutorial is active
                if (window.tutorialSystem && window.tutorialSystem.isActive) {
                    return; // Tutorial is running, don't interrupt
                }
                
                // Don't greet if certain modals are open
                const storeModal = document.getElementById('robotStoreModal');
                const settingsModal = document.getElementById('settingsModal');
                const missionsModal = document.getElementById('missionsModal');
                const mysteryResultModal = document.getElementById('mysteryResultModal');
                
                if ((storeModal && storeModal.classList.contains('active')) ||
                    (settingsModal && settingsModal.classList.contains('active')) ||
                    (missionsModal && missionsModal.classList.contains('active')) ||
                    (mysteryResultModal && mysteryResultModal.classList.contains('active'))) {
                    return; // Don't speak when these modals are open
                }
                
                // Check if using custom robot dialogue
                const selectedRobot = this.robots.find(r => r.id === this.data.selectedRobotId);
                if (selectedRobot && selectedRobot.hasCustomDialogue) {
                    this.showCustomRobotGreeting(selectedRobot);
                    return;
                }
                
                // Check for Self Care reminders (if enabled and has incomplete tasks)
                if (this.data.selfCare && this.data.selfCare.enabled && !this.data.currentCategoryId) {
                    const hasSelfCareReminder = this.checkSelfCareReminder();
                    if (hasSelfCareReminder) return; // If reminder shown, don't show other greetings
                }
                
                const overallScore = this.calculateOverallScore();
                
                // High score celebration
                if (overallScore >= 90) {
                    const phrases = [
                        "Your Overall Maintenance Score is fantastic! Keep up the amazing work!",
                        "Your home is shining, thanks to you!",
                        "You're a true Upkeep master!",
                        "Your dedication is inspiring!",
                        "Let's keep that Overall Maintenance Score high and mighty!",
                        "You've got this! One task at a time.",
                        "Let's make this the most well-maintained house on the block!",
                        "You're building a wonderful, clean space for yourself."
                    ];
                    this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                    return;
                }

                if (this.data.currentCategoryId) {
                    const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                    if (category && category.tasks) {
                        const remainingTasks = category.tasks.filter(t => t.freshness < 100).length;
                        const catScore = this.calculateCategoryScore(category);
                        
                        if (remainingTasks === 0) {
                            const phrases = [
                                `The ${category.name} is almost at 100%! You're so close!`,
                                `Woohoo! You've made so much progress in the ${category.name} today.`,
                                `Your efforts are really showing in the ${category.name}.`,
                                `So fresh and so clean! Great job.`
                            ];
                            this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                            return;
                        }
                        
                        if (catScore < 50) {
                            // Get the lowest freshness task
                            const lowestTask = category.tasks.sort((a, b) => a.freshness - b.freshness)[0];
                            
                            const phrases = lowestTask ? [
                                `Ready to tackle something? The ${category.name} could use a little boost! Let's start with ${lowestTask.name}.`,
                                `The ${category.name} is calling for some attention. ${lowestTask.name} needs it most!`,
                                `Uh oh, the freshness score for ${category.name} is dropping! ${lowestTask.name} is the biggest culprit.`,
                                `The ${category.name} hasn't had any attention in a while. ${lowestTask.name} especially needs some love!`,
                                `I'm detecting a drop in freshness from the ${category.name}. ${lowestTask.name} is leading the decline.`,
                                `Let's get the ${category.name} back in the green zone! ${lowestTask.name} is a good place to start.`
                            ] : [
                                `Ready to tackle something? The ${category.name} could use a little boost!`,
                                `The ${category.name} is calling for some attention. Let's answer!`,
                                `Let's get the ${category.name} back in the green zone!`
                            ];
                            this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                            return;
                        }
                        
                        // Get a task that needs attention in this category
                        const needsAttention = category.tasks.filter(t => t.freshness < 70).sort((a, b) => a.freshness - b.freshness)[0];
                        
                        const phrases = needsAttention ? [
                            `Let's make the ${category.name} sparkle! How about starting with ${needsAttention.name}?`,
                            `Keeping the ${category.name} tidy makes the whole house feel better. ${needsAttention.name} could use some attention!`,
                            `Don't forget, maintaining the ${category.name} helps your overall score! ${needsAttention.name} is waiting.`,
                            `Checking in on the ${category.name}! ${needsAttention.name} could use a refresh.`,
                            `Ready for a cleaning challenge in the ${category.name}? ${needsAttention.name} is a good start!`,
                            `A tidy ${category.name} makes for a tidy mind. Let's tackle ${needsAttention.name}!`
                        ] : [
                            `Let's make the ${category.name} sparkle! What should we start with?`,
                            `Keeping the ${category.name} tidy makes the whole house feel better.`,
                            `Checking in on the ${category.name}! How are things looking?`
                        ];
                        this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                        return;
                    }
                }

                // Dashboard greetings - mention low tasks
                const taskInfo = this.getTaskToMention();
                if (taskInfo) {
                    const phrases = [
                        `Looks like ${taskInfo.task.name} in the ${taskInfo.category.name} is starting to lose its freshness!`,
                        `Just a friendly nudge: ${taskInfo.task.name} is next on the list for a refresh.`,
                        `Remember that feeling of a clean room? Let's get that for the ${taskInfo.category.name}!`,
                        `The freshness meter for ${taskInfo.task.name} is halfway down. Just a heads-up!`,
                        `A little upkeep now prevents a big mess later. Let's look at ${taskInfo.task.name}.`,
                        `A quick clean of ${taskInfo.task.name} will give the ${taskInfo.category.name} a nice boost.`,
                        `Just a few minutes on ${taskInfo.task.name} can make a world of difference.`,
                        `Let's prevent a chore pile-up! The ${taskInfo.category.name} is a good place to start.`,
                        `What's our priority today? ${taskInfo.task.name} seems like a good candidate.`,
                        `The timer is ticking on ${taskInfo.task.name}'s freshness!`,
                        `Small steps lead to big results. What's our next small step?`
                    ];
                    this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                } else {
                    const phrases = [
                        "Your home is looking great, thanks to all your hard work on Upkeep!",
                        "Your dedication to Upkeep is truly inspiring!",
                        "You're making incredible progress towards a perfectly maintained home!"
                    ];
                    this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                }
            },

            checkSelfCareReminder() {
                // Check if there are incomplete Self Care tasks (excluding optional ones)
                if (!this.data.selfCare || !this.data.selfCare.enabled) return false;
                
                let incompleteCount = 0;
                let incompleteTasks = [];
                
                for (const group of this.data.selfCare.groups) {
                    for (const task of group.tasks) {
                        // Skip optional tasks
                        if (task.optional) continue;
                        // Count incomplete non-optional tasks
                        if (!task.completed) {
                            incompleteCount++;
                            incompleteTasks.push({ groupName: group.name, taskName: task.name });
                        }
                    }
                }
                
                // If no incomplete tasks, don't show reminder
                if (incompleteCount === 0) return false;
                
                // Get selected robot name or use default
                const selectedRobot = this.robots.find(r => r.id === this.data.selectedRobotId);
                const robotName = selectedRobot ? selectedRobot.name : 'Your robot';
                
                // Show reminder with different messages based on count
                if (incompleteCount === 1) {
                    const task = incompleteTasks[0];
                    const phrases = [
                        `Hey! Don't forget about Self Care today. You still need to: ${task.taskName}`,
                        `Quick reminder: ${task.taskName} is waiting for you in Self Care! 💚`,
                        `Your wellness matters! Remember to ${task.taskName} today.`,
                        `Self Care check-in: ${task.taskName} still needs your attention! ❤️`
                    ];
                    this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                    return true;
                } else if (incompleteCount <= 3) {
                    const taskNames = incompleteTasks.slice(0, 3).map(t => t.taskName).join(', ');
                    const phrases = [
                        `Don't forget Self Care! You have ${incompleteCount} tasks left: ${taskNames}`,
                        `Self Care reminder: ${taskNames} are waiting for you! ❤️`,
                        `Your wellness is important! ${incompleteCount} Self Care tasks need attention today.`
                    ];
                    this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                    return true;
                } else {
                    const phrases = [
                        `Self Care check-in! You have ${incompleteCount} tasks to complete today. Your wellness matters! ❤️`,
                        `Hey! ${incompleteCount} Self Care tasks are waiting. Let's take care of yourself today! 💚`,
                        `Don't forget about Self Care! You have ${incompleteCount} tasks left. You're worth it! ✨`,
                        `Wellness reminder: ${incompleteCount} Self Care tasks need your attention. You've got this! 💪`
                    ];
                    this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                    return true;
                }
            },

            showCustomRobotGreeting(robot) {
                // Don't greet if certain modals are open
                const storeModal = document.getElementById('robotStoreModal');
                const settingsModal = document.getElementById('settingsModal');
                const missionsModal = document.getElementById('missionsModal');
                const mysteryResultModal = document.getElementById('mysteryResultModal');
                
                if ((storeModal && storeModal.classList.contains('active')) ||
                    (settingsModal && settingsModal.classList.contains('active')) ||
                    (missionsModal && missionsModal.classList.contains('active')) ||
                    (mysteryResultModal && mysteryResultModal.classList.contains('active'))) {
                    return; // Don't speak when these modals are open
                }
                
                // 20% chance to show mad dialogue for random/idle state (if mad dialogue exists)
                const hasMadDialogue = robot.dialogue.mad && robot.dialogue.mad.length > 0;
                const showMad = hasMadDialogue && Math.random() < 0.2;
                
                if (showMad) {
                    const message = robot.dialogue.mad[Math.floor(Math.random() * robot.dialogue.mad.length)];
                    this.showSpeechBubble(message, 'mad');
                } else {
                    // Use greeting or random dialogue
                    const useGreeting = Math.random() < 0.5;
                    const hasGreeting = robot.dialogue.greeting && robot.dialogue.greeting.length > 0;
                    const hasRandom = robot.dialogue.random && robot.dialogue.random.length > 0;
                    
                    let dialogueSet;
                    if (useGreeting && hasGreeting) {
                        dialogueSet = robot.dialogue.greeting;
                    } else if (hasRandom) {
                        dialogueSet = robot.dialogue.random;
                    } else if (hasGreeting) {
                        dialogueSet = robot.dialogue.greeting;
                    } else {
                        // Fallback: use greeting if nothing else works
                        console.warn('[Dialogue] No dialogue arrays found for robot:', robot.id);
                        return;
                    }
                    
                    const message = dialogueSet[Math.floor(Math.random() * dialogueSet.length)];
                    this.showSpeechBubble(message, 'regular');
                }
            },

            mascotEncourage() {
                // Check if using custom robot dialogue
                const selectedRobot = this.robots.find(r => r.id === this.data.selectedRobotId);
                if (selectedRobot && selectedRobot.hasCustomDialogue) {
                    const message = selectedRobot.dialogue.success[Math.floor(Math.random() * selectedRobot.dialogue.success.length)];
                    this.showSpeechBubble(message, 'regular');
                    return;
                }
                
                const category = this.data.categories.find(c => c.id === this.data.currentCategoryId);
                const taskId = this.data.currentTaskId || (category && category.tasks && category.tasks[category.tasks.length - 1]?.id);
                const task = category?.tasks?.find(t => t.id === taskId);
                
                if (task && category) {
                    const phrases = [
                        `Great job completing ${task.name}! The ${category.name} is looking better already.`,
                        `What a champion! You've totally refreshed ${task.name}.`,
                        `Every completed task makes a huge difference. Nice work!`,
                        `High five! Another task down.`,
                        `Look at you go! That's another one off the list.`,
                        `Awesome! ${task.name} is back to 100%.`,
                        `You're on a roll! What's the next task you want to conquer?`,
                        `Feeling productive? Let's keep that momentum going!`,
                        `Consistency is key! You're doing a wonderful job.`,
                        `This house is lucky to have you looking after it.`,
                        `I'm here to help you stay on top of everything!`
                    ];
                    this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                } else {
                    const phrases = [
                        "You're doing great!",
                        "Nice job!",
                        "Keep it up!",
                        "Looking good!",
                        "Fantastic work!"
                    ];
                    this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
                }
            },

            mascotNewTask(taskName, categoryName) {
                const phrases = [
                    `I see you've added ${taskName} to your list. Let's get it done!`,
                    `You just added ${taskName}! Another step towards a perfect home.`,
                    `Welcome, ${taskName}! Let's keep things fresh!`,
                    `You added ${taskName}! Ready to conquer it?`,
                    `New challenge unlocked: ${taskName}!`
                ];
                this.showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
            },

            mascotSpeak(message) {
                this.showSpeechBubble(message);
            },

            // Text-to-Speech Functions
            speak(text) {
                if (!this.data.ttsEnabled) return;
                
                // Skip TTS for empty or very short messages
                if (!text || text.length < 3) return;
                
                // Ensure voices are loaded before speaking
                const voices = this.tts.synthesis.getVoices();
                if (voices.length === 0) {
                    // Voices not loaded yet, skip silently
                    return;
                }
                
                // Create new utterance
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = this.data.voiceRate;
                utterance.pitch = this.data.voicePitch;
                utterance.volume = 1.0;

                // Try to use a more robotic/synthetic voice if available
                const preferredVoice = voices.find(voice => 
                    voice.name.includes('Google') || 
                    voice.name.includes('Microsoft') ||
                    voice.lang.startsWith('en')
                );
                if (preferredVoice) {
                    utterance.voice = preferredVoice;
                }

                this.tts.currentUtterance = utterance;
                this.tts.synthesis.speak(utterance);
            },

            toggleTTS() {
                const toggle = document.getElementById('ttsToggle');
                const status = document.getElementById('ttsStatus');
                const voiceSettings = document.getElementById('voiceSettings');
                
                this.data.ttsEnabled = toggle.checked;
                status.textContent = this.data.ttsEnabled ? 'Voice Enabled ✓' : 'Enable Voice';
                
                // Show/hide voice settings
                voiceSettings.style.display = this.data.ttsEnabled ? 'block' : 'none';
                
                // Save preference
                this.saveData();

                // Initialize TTS properly if enabled
                if (this.data.ttsEnabled) {
                    // Warm up the speech synthesis with a completely silent utterance
                    // This initializes the audio context without any audible pop
                    const warmup = new SpeechSynthesisUtterance('.');
                    warmup.volume = 0; // Completely silent
                    warmup.rate = 10; // Very fast
                    this.tts.synthesis.speak(warmup);
                    
                    // Then speak the actual message after warmup completes
                    setTimeout(() => {
                        this.speak("Voice enabled! I can speak now!");
                    }, 150);
                }
                // Don't call cancel when disabling - just stop accepting new speech
            },

            updateVoiceSettings() {
                const voiceStyle = document.getElementById('voiceStyle').value;
                const customSettings = document.getElementById('customVoiceSettings');
                
                this.data.voiceStyle = voiceStyle;
                
                // Apply preset or show custom controls
                if (voiceStyle === 'custom') {
                    customSettings.style.display = 'block';
                    // Use current custom values
                    this.data.voicePitch = parseFloat(document.getElementById('voicePitch').value);
                    this.data.voiceRate = parseFloat(document.getElementById('voiceRate').value);
                } else {
                    customSettings.style.display = 'none';
                    
                    // Apply preset values
                    const presets = {
                        robotic: { pitch: 1.5, rate: 1.2 },
                        friendly: { pitch: 1.0, rate: 1.0 },
                        calm: { pitch: 0.8, rate: 0.8 },
                        excited: { pitch: 1.8, rate: 1.5 }
                    };
                    
                    const preset = presets[voiceStyle];
                    this.data.voicePitch = preset.pitch;
                    this.data.voiceRate = preset.rate;
                    
                    // Update sliders to match preset
                    document.getElementById('voicePitch').value = preset.pitch;
                    document.getElementById('voiceRate').value = preset.rate;
                    document.getElementById('pitchValue').textContent = preset.pitch.toFixed(1);
                    document.getElementById('rateValue').textContent = preset.rate.toFixed(1);
                }
                
                this.saveData();
            },

            updatePitchDisplay() {
                const pitch = document.getElementById('voicePitch').value;
                document.getElementById('pitchValue').textContent = parseFloat(pitch).toFixed(1);
            },

            updateRateDisplay() {
                const rate = document.getElementById('voiceRate').value;
                document.getElementById('rateValue').textContent = parseFloat(rate).toFixed(1);
            },

            testVoice() {
                // Get current robot's dialogue
                const currentRobot = this.robots.find(r => r.id === this.data.selectedRobotId);
                let testPhrases = [];
                
                if (currentRobot && currentRobot.dialogue && currentRobot.dialogue.random) {
                    // Use robot's actual dialogue
                    testPhrases = currentRobot.dialogue.random;
                } else {
                    // Fallback generic phrases
                    testPhrases = [
                        "Hello! This is how I sound!",
                        "Testing my voice settings!",
                        "How do I sound now?",
                        "Voice test in progress!",
                        "This is my speaking voice!"
                    ];
                }
                
                const randomPhrase = testPhrases[Math.floor(Math.random() * testPhrases.length)];
                this.speak(randomPhrase);
            },

            // Scrappy Voice Settings Functions
            updateScrappyPitchDisplay() {
                const pitch = document.getElementById('scrappyPitch').value;
                document.getElementById('scrappyPitchValue').textContent = parseFloat(pitch).toFixed(1);
            },

            updateScrappyRateDisplay() {
                const rate = document.getElementById('scrappyRate').value;
                document.getElementById('scrappyRateValue').textContent = parseFloat(rate).toFixed(1);
            },

            updateScrappyVoiceSettings() {
                const pitch = document.getElementById('scrappyPitch').value;
                const rate = document.getElementById('scrappyRate').value;
                
                this.data.scrappyPitch = parseFloat(pitch);
                this.data.scrappyRate = parseFloat(rate);
                
                this.saveData();
            },

            testScrappyVoice() {
                const testPhrases = [
                    "Whirrr... Clank... Testing my voice circuits!",
                    "Bzzt. Audio systems operational!",
                    "squeak... This is how I sound, circuit-head!",
                    "Processing... processing... Voice test complete!",
                    "clank clatter This vocal unit is functioning!"
                ];
                const randomPhrase = testPhrases[Math.floor(Math.random() * testPhrases.length)];
                
                // Show Scrappy dialogue even when store is closed (force show for testing)
                this.showScrappyDialogue(randomPhrase, 'regular', true);
            },

            // Battle System Functions
            showBattleSystem() {
                this.openBattleSystem();
            },
            
            openBattleSystem() {
                this.closeModal('settingsModal');
                this.speak("Battle system activated! Ready for combat, commander!", 'excited');
                
                this.isBattleMode = true;
                console.log('[BATTLE MODE] Activated via battle system entry');

                // Hide all other views
                document.querySelectorAll('.view').forEach(view => {
                    view.classList.remove('active');
                });
                
                // Show battle view with team selection phase
                document.getElementById('battleView').classList.add('active');
                
                // Start with team selection phase
                this.showTeamSelectionPhase();
                
                // Hide UI elements during battle
                this.hideBattleUIElements();
                
                console.log("Battle system opened - starting with team selection!");
            },

            exitBattleSystem() {
                // STOP BATTLE MUSIC
                if (BattleSystem.battleMusic) {
                    BattleSystem.battleMusic.pause();
                    BattleSystem.battleMusic.currentTime = 0;
                    console.log('🎵 Battle music stopped - game closed');
                }
                
                // Hide battle view
                document.getElementById('battleView').classList.remove('active');
                
                // Show UI elements again
                this.showBattleUIElements();
                
                // Return to dashboard
                this.showDashboard();
                
                // ===== EXIT BATTLE MODE: Re-enable companion robot dialogue =====
                this.isBattleMode = false;
                this.currentBattleMode = null;
                this.currentAIDifficulty = null;
                this.pendingBattleLaunch = null;
                console.log('[BATTLE MODE] Deactivated - companion robot dialogue re-enabled');
                console.log("Battle system closed - returned to dashboard");
            },

            openCircuitBreakerMenu() {
                // ===== ENTER BATTLE MODE: Suppress companion robot dialogue =====
                this.isBattleMode = true;
                console.log('[BATTLE MODE] Activated - companion robot dialogue suppressed');

                // ===== IMMEDIATELY CUT OFF ANY ACTIVE COMPANION DIALOGUE =====
                const speechBubble = document.getElementById('speechBubble');
                const thoughtBubble = document.getElementById('thoughtBubble');
                
                // Hide any visible bubbles immediately
                if (speechBubble) {
                    speechBubble.classList.remove('visible');
                }
                if (thoughtBubble) {
                    thoughtBubble.classList.remove('visible');
                }
                
                // Clear any active timeouts
                if (this.mascotState.speechTimeout) {
                    clearTimeout(this.mascotState.speechTimeout);
                    this.mascotState.speechTimeout = null;
                }
                if (this.mascotState.thoughtTimeout) {
                    clearTimeout(this.mascotState.thoughtTimeout);
                    this.mascotState.thoughtTimeout = null;
                }
                
                // Cancel any ongoing TTS
                if (this.tts.synthesis) {
                    this.tts.synthesis.cancel();
                }
                
                // Reset mascot state flags
                this.mascotState.isSpeaking = false;
                this.mascotState.isThinking = false;

                console.log('[BATTLE MODE] Companion dialogue cut off - entering Circuit Breaker');

                const startMenu = document.getElementById('startBattleMenu');
                if (startMenu) {
                    startMenu.classList.remove('active');
                }
                this.returnToStartBattleMenu = false;

                const menu = document.getElementById('circuitBreakerMenu');
                if (menu) {
                    menu.classList.add('active');
                    console.log("Circuit Breaker menu opened");
                }
            },

            closeCircuitBreakerMenu() {
                const menu = document.getElementById('circuitBreakerMenu');
                if (menu) {
                    menu.classList.remove('active');
                    console.log("Circuit Breaker menu closed");
                }

                const startMenu = document.getElementById('startBattleMenu');
                if (startMenu) {
                    startMenu.classList.remove('active');
                }
                this.returnToStartBattleMenu = false;

                // ===== EXIT BATTLE MODE: Re-enable companion robot dialogue =====
                this.isBattleMode = false;
                console.log('[BATTLE MODE] Deactivated - companion robot dialogue re-enabled');
            },

            startCircuitBreakerBattle() {
                console.log("Starting Circuit Breaker battle from menu...");
                
                // Close Circuit Breaker menu and open ChoreBot Hangar for team selection
                const menu = document.getElementById('circuitBreakerMenu');
                if (menu) {
                    menu.classList.remove('active');
                }
                
                // Open ChoreBot Hangar as the team selection screen
                this.openChorebotHangar();
                console.log("Circuit Breaker battle started - opening ChoreBot Hangar for team selection");
            },

            openStartBattleMenu() {
                console.log('[START BATTLE] Opening battle mode selection menu');
                this.returnToStartBattleMenu = false;
                const mainMenu = document.getElementById('circuitBreakerMenu');
                if (mainMenu) {
                    mainMenu.classList.remove('active');
                }
                const startMenu = document.getElementById('startBattleMenu');
                if (startMenu) {
                    startMenu.classList.add('active');
                }
            },

            closeStartBattleMenu() {
                console.log('[START BATTLE] Closing battle mode selection menu');
                const startMenu = document.getElementById('startBattleMenu');
                if (startMenu) {
                    startMenu.classList.remove('active');
                }
                const mainMenu = document.getElementById('circuitBreakerMenu');
                if (mainMenu) {
                    mainMenu.classList.add('active');
                }
                this.returnToStartBattleMenu = false;
            },

            launchVsAIMode() {
                console.log('[START BATTLE] Launching VS AI mode');
                this.returnToStartBattleMenu = true;
                const startMenu = document.getElementById('startBattleMenu');
                if (startMenu) {
                    startMenu.classList.remove('active');
                }
                const mainMenu = document.getElementById('circuitBreakerMenu');
                if (mainMenu) {
                    mainMenu.classList.remove('active');
                }
                this.openAIBattleSelector();
            },

            // ============================================
            // AI BATTLE SIMULATOR FUNCTIONS
            // ============================================
            
            openAIBattleSelector() {
                console.log('[AI BATTLE] Opening AI difficulty selector');

                // Close Circuit Breaker menu
                const cbMenu = document.getElementById('circuitBreakerMenu');
                if (cbMenu) {
                    cbMenu.classList.remove('active');
                }

                const startMenu = document.getElementById('startBattleMenu');
                if (startMenu) {
                    startMenu.classList.remove('active');
                }

                // Open AI selector
                const aiSelector = document.getElementById('aiBattleSelector');
                if (aiSelector) {
                    aiSelector.classList.add('active');
                    console.log('[AI BATTLE] AI selector screen opened');
                } else {
                    console.error('[AI BATTLE] AI selector element not found!');
                }
            },
            
            closeAIBattleSelector() {
                console.log('[AI BATTLE] Closing AI difficulty selector');

                // Close AI selector
                const aiSelector = document.getElementById('aiBattleSelector');
                if (aiSelector) {
                    aiSelector.classList.remove('active');
                }

                const easySelector = document.getElementById('easyAIBattleSelector');
                if (easySelector) {
                    easySelector.classList.remove('active');
                }

                const cbMenu = document.getElementById('circuitBreakerMenu');
                if (this.pendingBattleLaunch === 'easy-ai') {
                    this.pendingBattleLaunch = null;
                    this.returnToStartBattleMenu = false;
                    this.openChorebotHangar();
                    return;
                }

                if (this.returnToStartBattleMenu) {
                    if (cbMenu) {
                        cbMenu.classList.remove('active');
                    }
                    const startMenu = document.getElementById('startBattleMenu');
                    if (startMenu) {
                        startMenu.classList.add('active');
                    }
                    this.returnToStartBattleMenu = false;
                } else if (cbMenu) {
                    cbMenu.classList.add('active');
                }

                console.log('[AI BATTLE] Returned to Circuit Breaker menu');
            },

            startEasyAIBattle() {
                console.log('[AI BATTLE] Easy difficulty selected');
                this.currentBattleMode = 'ai';
                this.currentAIDifficulty = 'easy';
                this.pendingBattleLaunch = 'easy-ai';
                this.returnToStartBattleMenu = false;

                this.ensureEasyAIDeckReady();
                this.closeAIBattleSelector();
            },

            ensureEasyAIDeckReady() {
                if (!Array.isArray(this.data.currentDeck)) {
                    this.data.currentDeck = [];
                }

                const preparedDeck = this.data.currentDeck.filter(Boolean).slice(0, 6);

                if (preparedDeck.length < 6 && typeof TeamManager !== 'undefined' && typeof TeamManager.getAvailableRobots === 'function') {
                    const availableRobots = TeamManager.getAvailableRobots();
                    for (const robotId of availableRobots) {
                        if (preparedDeck.length >= 6) {
                            break;
                        }
                        if (!preparedDeck.includes(robotId)) {
                            preparedDeck.push(robotId);
                        }
                    }
                }

                this.data.currentDeck = preparedDeck.slice(0, 6);

                if (this.data.currentDeck.length === 6) {
                    console.log('[AI BATTLE] Easy mode deck prepared:', this.data.currentDeck);
                } else {
                    console.warn('[AI BATTLE] Easy mode deck is incomplete. Player must finish team selection manually.');
                }
            },

            // ============================================
            // CHOREBOT HANGAR FUNCTIONS
            // ============================================
            
            currentInspectedRobot: null, // Track robot being inspected
            currentSaveSlot: null, // Track which save slot is currently loaded
            
            // Map store robot IDs to battle robot IDs
            storeToBattleRobotMap: {
                'JACKOBOT': 'unit-001-uc-0',          // Jack-o'-Bot → Bulbasaur stats
                'MEGAROCKETMAN': 'unit-006-ex-0',      // Mega Rocket Man → Charizard stats
                'VOLTBOT': 'unit-025-r-0',             // Volt-Bot → Pikachu stats
                'BUZZBOT': 'unit-150-ex-0',            // Buzz Lite → Mewtwo stats
                'CLOWNBOT': 'clown-bot',               // Clown Bot (custom)
                'WITCHBOT': 'witch-bot',               // Witch-Bot (custom)
                'FREEZY': 'freezy',                    // Freezy (custom)
                'GHOSTBOT': 'ghost-bot',               // Ghost Bot (custom)
                'SUNIC': 'sunic',                      // Sunic (custom)
                'SPIRITBOT': 'spirit-bot'              // Spirit-Bot (custom)
                // Note: 'default' is the chore mascot robot, not a battle robot
            },
            
            openChorebotHangar() {
                console.log('[HANGAR] Opening ChoreBot Hangar');
                
                // Close Circuit Breaker menu
                const cbMenu = document.getElementById('circuitBreakerMenu');
                if (cbMenu) {
                    cbMenu.classList.remove('active');
                }

                const startMenu = document.getElementById('startBattleMenu');
                if (startMenu) {
                    startMenu.classList.remove('active');
                }
                this.returnToStartBattleMenu = false;
                
                // Open hangar modal
                const hangar = document.getElementById('chorebotHangarModal');
                if (hangar) {
                    hangar.classList.add('active');
                    this.renderHangarCollection();
                    this.renderDeckSlots();
                }
            },
            
            closeChorebotHangar(reopenCircuitBreaker = true) {
                console.log('[HANGAR] Closing ChoreBot Hangar');
                const hangar = document.getElementById('chorebotHangarModal');
                if (hangar) {
                    hangar.classList.remove('active');
                }

                const cbMenu = document.getElementById('circuitBreakerMenu');
                if (reopenCircuitBreaker) {
                    if (cbMenu) {
                        cbMenu.classList.add('active');
                        console.log('[HANGAR] Returned to Circuit Breaker menu');
                    }
                } else if (cbMenu) {
                    cbMenu.classList.remove('active');
                }

                const startMenu = document.getElementById('startBattleMenu');
                if (startMenu) {
                    startMenu.classList.remove('active');
                }
                this.returnToStartBattleMenu = false;
                
                // Close any open inspection modal
                this.closeHangarInspection();
            },
            
            renderHangarCollection() {
                const container = document.getElementById('hangarCollection');
                if (!container) return;
                
                container.innerHTML = '';
                
                // Get owned battle robots by mapping store IDs to battle IDs
                const ownedBattleRobotIds = [];
                
                this.data.ownedRobots.forEach(storeId => {
                    // Skip 'default' as it's the chore mascot, not a battle robot
                    if (storeId === 'default') {
                        console.log('[HANGAR] Skipping "default" (chore mascot, not a battle robot)');
                        return;
                    }
                    
                    const battleId = this.storeToBattleRobotMap[storeId];
                    if (battleId) {
                        ownedBattleRobotIds.push(battleId);
                        console.log(`[HANGAR] Mapped ${storeId} → ${battleId}`);
                    } else {
                        console.warn(`[HANGAR] No battle robot mapping for store ID: ${storeId}`);
                    }
                });
                
                console.log('[HANGAR] Owned store robots:', this.data.ownedRobots);
                console.log('[HANGAR] Mapped to battle robots:', ownedBattleRobotIds);
                
                // Get battle robot data from RobotDatabase
                const ownedBattleRobots = [];
                ownedBattleRobotIds.forEach(battleId => {
                    const battleRobot = RobotDatabase.getRobot(battleId);
                    if (battleRobot) {
                        ownedBattleRobots.push(battleRobot);
                    } else {
                        console.warn('[HANGAR] Battle robot not found:', battleId);
                    }
                });
                
                console.log('[HANGAR] Rendering collection:', ownedBattleRobots.length, 'battle robots');
                
                if (ownedBattleRobots.length === 0) {
                    container.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; color: rgba(255,255,255,0.5); padding: 40px;">
                            <p style="font-size: 18px; margin-bottom: 10px;">🤖 No Battle Robots Yet!</p>
                            <p style="font-size: 14px;">Purchase robots from the Robot Store to add them to your collection.</p>
                        </div>
                    `;
                    return;
                }
                
                ownedBattleRobots.forEach(robot => {
                    const isInDeck = this.data.currentDeck.includes(robot.id);
                    
                    const bubble = document.createElement('div');
                    bubble.className = `robot-bubble ${isInDeck ? 'in-deck' : ''}`;
                    bubble.dataset.robotId = robot.id;
                    
                    // Simple click/tap for inspection (more intuitive)
                    bubble.addEventListener('click', () => {
                        this.openHangarInspection(robot.id);
                    });
                    
                    bubble.innerHTML = `
                        <img src="${robot.image}" alt="${robot.name}" class="robot-bubble-image">
                        <div class="robot-bubble-name">${robot.name}</div>
                    `;
                    
                    container.appendChild(bubble);
                });
            },
            
            renderDeckSlots() {
                const slots = document.querySelectorAll('.deck-slot');
                
                slots.forEach((slot, index) => {
                    const battleRobotId = this.data.currentDeck[index];
                    
                    if (battleRobotId) {
                        const robot = RobotDatabase.getRobot(battleRobotId);
                        if (robot) {
                            slot.classList.add('filled');
                            slot.innerHTML = `
                                <div class="slot-number">${index + 1}</div>
                                <img src="${robot.image}" alt="${robot.name}" class="deck-robot-image">
                                <div class="deck-robot-name">${robot.name}</div>
                                <button class="deck-remove-btn" onclick="app.removeFromDeck(${index})">−</button>
                            `;
                        }
                    } else {
                        slot.classList.remove('filled');
                        slot.innerHTML = `
                            <div class="slot-number">${index + 1}</div>
                            <div class="slot-empty">EMPTY</div>
                        `;
                    }
                });
                
                // Update save button state
                this.updateSaveButtonState();
                
                // Update collection display (mark robots in deck)
                this.renderHangarCollection();
            },
            
            // Helper function to assign pip identifiers (copied from battle system)
            assignPipIdentifiers(wheelData) {
                const colorCounts = {};
                const colorIndices = {};
                
                // First pass: count how many times each color appears
                wheelData.forEach(segment => {
                    const colorKey = segment.moveType.toLowerCase();
                    colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
                });
                
                // Second pass: assign pip counts only to colors that appear multiple times
                return wheelData.map(segment => {
                    const colorKey = segment.moveType.toLowerCase();
                    
                    if (colorCounts[colorKey] > 1) {
                        // This color appears multiple times - assign pip identifier
                        colorIndices[colorKey] = (colorIndices[colorKey] || 0) + 1;
                        return {
                            ...segment,
                            pipCount: colorIndices[colorKey]
                        };
                    } else {
                        // This color is unique - no pip needed
                        return {
                            ...segment,
                            pipCount: 0
                        };
                    }
                });
            },

            // Helper function to get move color hex (copied from battle system)
            getMoveColorHex(moveType) {
                const colors = {
                    'red': '#ff4444',
                    'blue': '#4444ff',
                    'purple': '#aa44ff',
                    'white': '#e5e7eb',
                    'gold': '#fbbf24'
                };
                return colors[moveType.toLowerCase()] || '#888888';
            },

            openHangarInspection(robotId) {
                console.log('[HANGAR] Inspecting robot:', robotId);
                this.currentInspectedRobot = robotId;
                
                const robot = RobotDatabase.getRobot(robotId);
                if (!robot) {
                    console.error('[HANGAR] Robot not found in database:', robotId);
                    return;
                }
                
                const modal = document.getElementById('hangarInspectionModal');
                const content = document.getElementById('hangarInspectionData');
                const addBtn = document.getElementById('inspectionAddBtn');
                
                if (!modal || !content) return;
                
                // Assign pip identifiers to duplicate colored moves
                const wheelDataWithPips = this.assignPipIdentifiers(robot.wheel);
                
                // Build combat wheel with pips and stars (EXACT battle system format)
                let gradientSegments = [];
                let currentAngle = 0;
                const totalSize = 96;
                
                let pipOverlaysHTML = '';
                let starOverlaysHTML = '';
                
                wheelDataWithPips.forEach(segment => {
                    const segmentAngle = (segment.size / totalSize) * 360;
                    const color = this.getMoveColorHex(segment.moveType);
                    
                    gradientSegments.push(`${color} ${currentAngle}deg ${currentAngle + segmentAngle}deg`);
                    
                    // Add pip overlay if this segment has a pip identifier
                    if (segment.pipCount > 0) {
                        const centerAngle = currentAngle + (segmentAngle / 2);
                        const radius = 45;
                        const pipSpreadAngle = segment.pipCount > 1 ? Math.min(8, segmentAngle * 0.4) : 0;
                        const startSpread = centerAngle - (pipSpreadAngle * (segment.pipCount - 1) / 2);
                        
                        for (let i = 0; i < segment.pipCount; i++) {
                            const pipAngle = segment.pipCount > 1 ? startSpread + (i * pipSpreadAngle / (segment.pipCount - 1)) : centerAngle;
                            const radians = (pipAngle - 90) * (Math.PI / 180);
                            const x = 50 + (radius * Math.cos(radians));
                            const y = 50 + (radius * Math.sin(radians));
                            
                            pipOverlaysHTML += `<div class="wheel-pip" style="position: absolute; left: ${x}%; top: ${y}%; transform: translate(-50%, -50%); width: 6px; height: 6px; background: rgba(0,0,0,0.8); border-radius: 50%; border: 1px solid rgba(255,255,255,0.6);"></div>`;
                        }
                    }
                    
                    // Add star overlay if this segment has stars
                    if (segment.stars !== undefined && segment.stars !== null) {
                        const centerAngle = currentAngle + (segmentAngle / 2);
                        const radius = 35;
                        const starSpreadAngle = segment.stars > 1 ? Math.min(20, segmentAngle * 0.7) : 0;
                        const startSpread = centerAngle - (starSpreadAngle * (segment.stars - 1) / 2);
                        const fontSize = segment.stars === 1 ? 12 : segment.stars === 2 ? 9 : segment.stars === 3 ? 7 : 6;
                        
                        for (let i = 0; i < segment.stars; i++) {
                            const starAngle = segment.stars > 1 ? startSpread + (i * starSpreadAngle / (segment.stars - 1)) : centerAngle;
                            const radians = (starAngle - 90) * (Math.PI / 180);
                            const x = 50 + (radius * Math.cos(radians));
                            const y = 50 + (radius * Math.sin(radians));
                            
                            starOverlaysHTML += `<div class="wheel-star" style="position: absolute; left: ${x}%; top: ${y}%; transform: translate(-50%, -50%); color: #FFD700; font-size: ${fontSize}px; text-shadow: 0 0 3px rgba(0,0,0,0.8), 0 0 5px rgba(255,215,0,0.5); font-weight: bold;">★</div>`;
                        }
                    }
                    
                    currentAngle += segmentAngle;
                });
                
                const wheelHTML = `
                    <div style="position: relative; width: 200px; height: 200px; margin: 15px auto; border-radius: 50%; background: conic-gradient(${gradientSegments.join(', ')}); box-shadow: 0 4px 15px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.2);">
                        ${pipOverlaysHTML}
                        ${starOverlaysHTML}
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; background: #1a1f3a; border-radius: 50%; border: 3px solid rgba(59, 130, 246, 0.5); display: flex; align-items: center; justify-content: center; color: #3b82f6; font-size: 11px; font-weight: 700;">SPIN</div>
                    </div>
                `;
                
                // Sort wheel data: Miss moves at bottom, others by size
                const sortedWheelData = [...wheelDataWithPips].sort((a, b) => {
                    const aIsMiss = a.moveName.toLowerCase().includes('miss');
                    const bIsMiss = b.moveName.toLowerCase().includes('miss');
                    if (aIsMiss && !bIsMiss) return 1;
                    if (!aIsMiss && bIsMiss) return -1;
                    return b.size - a.size;
                });
                
                // Build move details list (EXACT battle system format)
                let movesHTML = '';
                const typeIcons = {
                    'White': '⚔️',
                    'Gold': '⭐',
                    'Purple': '✨',
                    'Blue': '🛡️',
                    'Red': '❌'
                };
                
                sortedWheelData.forEach(move => {
                    const icon = typeIcons[move.moveType] || '•';
                    
                    // Format move name with pip identifier if present
                    let displayName = move.moveName;
                    if (move.pipCount > 0) {
                        const pips = '•'.repeat(move.pipCount);
                        displayName += ` (${pips})`;
                    }
                    
                    // Show full effect text
                    let effectText = move.effect;
                    if (move.moveName.toLowerCase().includes('miss')) {
                        effectText = '';
                    } else if (!effectText || effectText === 'None' || effectText.trim() === '') {
                        effectText = 'Normal attack';
                    }
                    
                    // Build damage/stars display
                    let statsHtml = '';
                    if (move.damage) {
                        statsHtml = `<div style="font-size: 13px; font-weight: 700; color: #ff6b6b;">${move.damage}</div>`;
                    } else if (move.stars) {
                        statsHtml = `<div style="font-size: 13px;">${'⭐'.repeat(move.stars)}</div>`;
                    }
                    statsHtml += `<div style="font-size: 11px; color: rgba(255,255,255,0.7);">Size: ${move.size}</div>`;
                    
                    const colorClass = move.moveType.toLowerCase();
                    movesHTML += `
                        <div class="combat-dial-move ${colorClass}" style="display: flex; align-items: center; gap: 12px; padding: 10px; margin-bottom: 8px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 4px solid ${this.getMoveColorHex(move.moveType)};">
                            <div style="font-size: 16px; flex-shrink: 0;">${icon}</div>
                            <div style="flex: 1; min-width: 0;">
                                <div style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 2px;">${displayName}</div>
                                <div style="font-size: 11px; color: rgba(255,255,255,0.7); font-style: italic;">${effectText}</div>
                            </div>
                            <div style="text-align: right; flex-shrink: 0;">
                                ${statsHtml}
                            </div>
                        </div>
                    `;
                });
                
                // Check if deck is full or robot already in deck
                const isInDeck = this.data.currentDeck.includes(robotId);
                const isDeckFull = this.data.currentDeck.length >= 6;
                
                // Build ADD button
                let addButtonHTML = '';
                if (isInDeck) {
                    addButtonHTML = `<button style="padding: 12px 24px; background: rgba(34, 197, 94, 0.3); border: 2px solid rgba(34, 197, 94, 0.6); color: #22c55e; font-family: 'Cocogoose', sans-serif; font-size: 13px; font-weight: 700; border-radius: 8px; cursor: not-allowed; letter-spacing: 1px;" disabled>✓ IN TEAM</button>`;
                } else if (isDeckFull) {
                    addButtonHTML = `<button style="padding: 12px 24px; background: rgba(239, 68, 68, 0.2); border: 2px solid rgba(239, 68, 68, 0.5); color: #ef4444; font-family: 'Cocogoose', sans-serif; font-size: 13px; font-weight: 700; border-radius: 8px; cursor: not-allowed; letter-spacing: 1px;" disabled>FULL</button>`;
                } else {
                    addButtonHTML = `<button onclick="app.addRobotToDeckFromInspection()" style="padding: 12px 24px; background: rgba(34, 197, 94, 0.2); border: 2px solid rgba(34, 197, 94, 0.5); color: #22c55e; font-family: 'Cocogoose', sans-serif; font-size: 13px; font-weight: 700; border-radius: 8px; cursor: pointer; letter-spacing: 1px; transition: all 0.3s ease;" onmouseover="this.style.background='rgba(34, 197, 94, 0.3)'; this.style.borderColor='rgba(34, 197, 94, 0.8)'; this.style.boxShadow='0 0 20px rgba(34, 197, 94, 0.4)';" onmouseout="this.style.background='rgba(34, 197, 94, 0.2)'; this.style.borderColor='rgba(34, 197, 94, 0.5)'; this.style.boxShadow='none';">ADD</button>`;
                }
                
                // Build REMOVE button (only clickable if in deck)
                let removeButtonHTML = '';
                if (isInDeck) {
                    removeButtonHTML = `<button onclick="app.removeRobotFromDeckInInspection()" style="padding: 12px 24px; background: rgba(239, 68, 68, 0.2); border: 2px solid rgba(239, 68, 68, 0.5); color: #ef4444; font-family: 'Cocogoose', sans-serif; font-size: 13px; font-weight: 700; border-radius: 8px; cursor: pointer; letter-spacing: 1px; transition: all 0.3s ease; margin-top: 8px;" onmouseover="this.style.background='rgba(239, 68, 68, 0.3)'; this.style.borderColor='rgba(239, 68, 68, 0.8)'; this.style.boxShadow='0 0 20px rgba(239, 68, 68, 0.4)';" onmouseout="this.style.background='rgba(239, 68, 68, 0.2)'; this.style.borderColor='rgba(239, 68, 68, 0.5)'; this.style.boxShadow='none';">Remove</button>`;
                } else {
                    removeButtonHTML = `<button style="padding: 12px 24px; background: rgba(239, 68, 68, 0.1); border: 2px solid rgba(239, 68, 68, 0.3); color: rgba(239, 68, 68, 0.4); font-family: 'Cocogoose', sans-serif; font-size: 13px; font-weight: 700; border-radius: 8px; cursor: not-allowed; letter-spacing: 1px; margin-top: 8px;" disabled>Remove</button>`;
                }
                
                // Build final layout (EXACT battle system format with ADD button in top right)
                content.innerHTML = `
                    <div style="padding: 20px; max-width: 500px;">
                        <!-- Top Section: Image + Name + Stats + ADD Button -->
                        <div style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px;">
                            <div style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid rgba(59, 130, 246, 0.5); overflow: hidden; flex-shrink: 0; background: rgba(10, 14, 39, 0.8);">
                                <img src="${robot.image}" style="width: 100%; height: 100%; object-fit: contain;">
                            </div>
                            <div style="flex: 1;">
                                <h2 style="color: #fff; font-family: 'Cocogoose', sans-serif; margin: 0 0 8px 0; font-size: 22px;">${robot.name}</h2>
                                <div style="color: #3b82f6; font-size: 14px; margin-bottom: 4px;">${robot.role}</div>
                                <div style="color: rgba(255,255,255,0.7); font-size: 13px;">MP: ${robot.mp}</div>
                            </div>
                            <div style="flex-shrink: 0; display: flex; flex-direction: column;">
                                ${addButtonHTML}
                                ${removeButtonHTML}
                            </div>
                        </div>
                        
                        <!-- Ability -->
                        ${robot.ability ? `
                            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 12px; margin-bottom: 20px;">
                                <div style="color: #3b82f6; font-weight: 700; font-size: 13px; margin-bottom: 4px;">${robot.ability.name}</div>
                                <div style="color: rgba(255, 255, 255, 0.7); font-size: 12px;">${robot.ability.description}</div>
                            </div>
                        ` : ''}
                        
                        <!-- Combat Wheel -->
                        <div style="margin-bottom: 20px;">
                            <div style="color: #fbbf24; font-weight: 700; font-size: 15px; margin-bottom: 12px; text-align: center; letter-spacing: 1px;">⚔️ COMBAT WHEEL</div>
                            ${wheelHTML}
                        </div>
                        
                        <!-- Move Details -->
                        <div>
                            <div style="color: #fbbf24; font-weight: 700; font-size: 15px; margin-bottom: 12px; text-align: center; letter-spacing: 1px;">📋 MOVE DETAILS</div>
                            ${movesHTML}
                        </div>
                    </div>
                `;
                
                // Hide the old bottom button (now inline in the top section)
                if (addBtn) {
                    addBtn.style.display = 'none';
                }
                
                modal.classList.add('active');
            },
            
            closeHangarInspection() {
                const modal = document.getElementById('hangarInspectionModal');
                if (modal) {
                    modal.classList.remove('active');
                }
                this.currentInspectedRobot = null;
            },
            
            addRobotToDeckFromInspection() {
                if (!this.currentInspectedRobot) return;
                
                const robotId = this.currentInspectedRobot;
                
                // Check if already in deck
                if (this.data.currentDeck.includes(robotId)) {
                    console.log('[HANGAR] Robot already in deck');
                    return;
                }
                
                // Check if deck is full
                if (this.data.currentDeck.length >= 6) {
                    console.log('[HANGAR] Deck is full');
                    return;
                }
                
                // Add to deck
                this.data.currentDeck.push(robotId);
                console.log('[HANGAR] Added robot to deck:', robotId);
                
                // Save and update UI
                this.saveData();
                this.renderDeckSlots();
                this.closeHangarInspection();
            },
            
            removeRobotFromDeckInInspection() {
                if (!this.currentInspectedRobot) return;
                
                const robotId = this.currentInspectedRobot;
                
                // Check if robot is in deck
                const deckIndex = this.data.currentDeck.indexOf(robotId);
                if (deckIndex === -1) {
                    console.log('[HANGAR] Robot not in deck');
                    return;
                }
                
                // Remove from deck
                this.data.currentDeck.splice(deckIndex, 1);
                console.log('[HANGAR] Removed robot from deck:', robotId);
                
                // Save and update UI
                this.saveData();
                this.renderDeckSlots();
                this.closeHangarInspection();
            },
            
            removeFromDeck(slotIndex) {
                console.log('[HANGAR] Removing robot from slot:', slotIndex);
                
                if (slotIndex >= 0 && slotIndex < this.data.currentDeck.length) {
                    this.data.currentDeck.splice(slotIndex, 1);
                    this.saveData();
                    this.renderDeckSlots();
                }
            },
            
            updateSaveButtonState() {
                const saveBtn = document.getElementById('deckSaveBtn');
                const battleBtn = document.getElementById('deckBattleBtn');
                
                const hasSixRobots = this.data.currentDeck.length === 6;
                
                if (saveBtn) {
                    saveBtn.disabled = !hasSixRobots;
                }
                
                if (battleBtn) {
                    battleBtn.disabled = !hasSixRobots;
                }
            },
            
            saveDeck() {
                if (this.data.currentDeck.length !== 6) {
                    alert('⚠️ Deck must have exactly 6 robots to save!');
                    console.log('[HANGAR] Deck must have exactly 6 robots');
                    return;
                }
                
                // If a save slot is currently loaded, ask if they want to overwrite
                if (this.currentSaveSlot !== null && this.data.savedDecks[this.currentSaveSlot]) {
                    const currentDeckName = this.data.savedDecks[this.currentSaveSlot].name;
                    const choice = confirm(`Overwrite "${currentDeckName}"?\n\nOK = Overwrite current save\nCancel = Create new save slot`);
                    
                    if (choice) {
                        // Overwrite current slot
                        this.data.savedDecks[this.currentSaveSlot].robots = [...this.data.currentDeck];
                        this.saveData();
                        console.log('[HANGAR] Deck overwritten in slot:', this.currentSaveSlot);
                        alert(`✅ Deck "${currentDeckName}" updated successfully!`);
                        return;
                    }
                }
                
                // Create new save slot
                const deckName = prompt('Enter a name for this deck:');
                if (!deckName || deckName.trim() === '') {
                    console.log('[HANGAR] Deck save cancelled - no name provided');
                    return;
                }
                
                // Save deck configuration
                const savedDeck = {
                    name: deckName.trim(),
                    robots: [...this.data.currentDeck]
                };
                
                this.data.savedDecks.push(savedDeck);
                this.currentSaveSlot = this.data.savedDecks.length - 1; // Track new save slot
                this.saveData();
                
                console.log('[HANGAR] Deck saved:', savedDeck.name);
                alert(`✅ Deck "${savedDeck.name}" saved successfully!`);
            },
            
            showLoadDeckMenu() {
                if (this.data.savedDecks.length === 0) {
                    alert('📭 No saved decks yet!\n\nBuild a full deck (6 robots) and click SAVE to create your first save slot.');
                    return;
                }
                
                // Show modal with save slots
                const modal = document.getElementById('loadDeckModal');
                const container = document.getElementById('loadDeckList');
                
                if (!modal || !container) {
                    console.error('[HANGAR] Load deck modal not found');
                    return;
                }
                
                // Clear previous options
                container.innerHTML = '';
                
                // Create a button for each saved deck
                this.data.savedDecks.forEach((deck, index) => {
                    const deckButton = document.createElement('button');
                    deckButton.className = 'load-deck-option';
                    deckButton.innerHTML = `
                        <div class="load-deck-info">
                            <span class="load-deck-name">🤖 ${deck.name}</span>
                            <span class="load-deck-count">${deck.robots.length} robots</span>
                        </div>
                    `;
                    deckButton.onclick = () => {
                        this.loadDeck(index);
                        this.closeLoadDeckMenu();
                    };
                    container.appendChild(deckButton);
                });
                
                modal.classList.add('active');
            },
            
            closeLoadDeckMenu() {
                const modal = document.getElementById('loadDeckModal');
                if (modal) {
                    modal.classList.remove('active');
                }
            },
            
            loadDeck(deckIndex) {
                const savedDeck = this.data.savedDecks[deckIndex];
                if (!savedDeck) return;
                
                console.log('[HANGAR] Loading deck:', savedDeck.name);
                
                // Clear current deck and load saved robots
                this.data.currentDeck = [...savedDeck.robots];
                this.currentSaveSlot = deckIndex; // Track which slot was loaded
                this.saveData();
                this.renderDeckSlots();
                
                console.log('[HANGAR] Deck loaded successfully from slot:', deckIndex);
                alert(`✅ Loaded deck: "${savedDeck.name}"`);
            },
            
            startBattleFromHangar() {
                console.log('[HANGAR] Starting battle from ChoreBot Hangar');
                if (!this.currentBattleMode) {
                    this.currentBattleMode = 'debug';
                    this.currentAIDifficulty = null;
                }
                
                // Validate deck has exactly 6 robots
                if (this.data.currentDeck.length !== 6) {
                    alert('⚠️ You need exactly 6 robots in your deck to start battle!');
                    console.log('[HANGAR] Battle start failed - deck does not have 6 robots');
                    return;
                }
                
                // Close the hangar
                this.closeChorebotHangar(false);
                
                // Set player team from current deck
                const playerTeam = [...this.data.currentDeck];
                TeamManager.selectedTeam = playerTeam;
                console.log('[HANGAR] Player team set:', playerTeam);
                
                // Build opponent team based on current battle mode
                let opponentTeam;
                if (this.currentBattleMode === 'ai' && this.currentAIDifficulty === 'easy') {
                    opponentTeam = this.getEasyAIOpponentTeam(playerTeam);
                    TeamManager.opponentTeam = opponentTeam.slice();
                    console.log('[HANGAR] Easy AI opponent team prepared:', opponentTeam);
                } else {
                    opponentTeam = this.data.currentDeck.map(robotId => robotId + '-opp');
                    TeamManager.opponentTeam = opponentTeam;
                    console.log('[HANGAR] Opponent team set (mirror match with -opp suffix):', opponentTeam);
                }
                
                // Hide all other views
                document.querySelectorAll('.view').forEach(view => {
                    view.classList.remove('active');
                });
                
                // Show battle view with battle game phase (skip team selection)
                document.getElementById('battleView').classList.add('active');
                
                // Hide UI elements during battle
                this.hideBattleUIElements();
                
                // Go straight to battle game phase
                this.showBattleGamePhase();
                
                // Initialize battle with both teams after a short delay
                setTimeout(() => {
                    BattleSystem.initializeBattleWithTeams(playerTeam, opponentTeam);

                    if (this.currentBattleMode === 'ai' && this.currentAIDifficulty === 'easy') {
                        BattleSystem.disableDebugMode();
                        BattleSystem.currentControlTeam = 'player';
                        if (typeof app.hideDebugControlUI === 'function') {
                            app.hideDebugControlUI();
                        }
                        console.log('[HANGAR] Easy AI battle initialized from hangar');
                    } else {
                        BattleSystem.enableDebugMode();
                        console.log('[HANGAR] Battle initialized with full debug control');
                    }
                }, 500);
                
                console.log('[HANGAR] Battle started successfully!');
            },
            
            showTeamSelectionPhase() {
                console.log('🎮 Showing team selection phase...');
                
                // Load current deck into TeamManager
                if (this.data.currentDeck && this.data.currentDeck.length === 6) {
                    console.log('[BATTLE] Loading current deck into TeamManager:', this.data.currentDeck);
                    TeamManager.selectedTeam = [...this.data.currentDeck];
                    console.log('✅ Team pre-loaded from hangar deck!');
                } else if (this.data.currentDeck && this.data.currentDeck.length > 0) {
                    console.log('[BATTLE] Partial deck detected, loading available robots:', this.data.currentDeck);
                    TeamManager.selectedTeam = [...this.data.currentDeck];
                } else {
                    console.log('[BATTLE] No deck loaded, starting with empty team');
                    TeamManager.selectedTeam = [];
                }
                
                // Show team selection phase, hide battle game phase
                document.getElementById('teamSelectionPhase').style.display = 'block';
                document.getElementById('battleGamePhase').style.display = 'none';
                
                // Update header
                document.getElementById('battleTitle').textContent = '🤖 Team Selection';
                document.getElementById('battleSubtitle').textContent = 'Choose 6 robots for battle';
                
                // Initialize team selection UI with a small delay to ensure DOM is ready
                setTimeout(() => {
                    console.log('🔄 Initializing team selection UI...');
                    console.log('🔍 App object check:', typeof app, Object.keys(app).includes('updateTeamSelectionUI'));
                    if (typeof app.updateTeamSelectionUI === 'function') {
                        app.updateTeamSelectionUI();
                    } else {
                        console.error('❌ updateTeamSelectionUI function not found on app object!');
                        console.log('📋 Available app methods:', Object.keys(app).filter(key => typeof app[key] === 'function'));
                    }
                }, 100);
                
                console.log("Team selection phase activated with pre-loaded deck");
            },
            
            showBattleGamePhase() {
                // Hide team selection phase, show battle game phase
                document.getElementById('teamSelectionPhase').style.display = 'none';
                document.getElementById('battleGamePhase').style.display = 'block';
                
                // Update header
                document.getElementById('battleTitle').textContent = '⚔️ Battle Arena';
                document.getElementById('battleSubtitle').textContent = 'Strategic robot combat';
                
                console.log("Battle game phase activated with team:", TeamManager.selectedTeam);
                
                // Note: First turn spinner is now handled by app.showBattleGamePhase()
            },

            hideBattleUIElements() {
                // Hide ALL UI elements during battle
                const elementsToHide = [
                    'currencyDisplay',
                    'missionsBubble', 
                    'settingsBtn'
                ];
                
                // Hide by ID
                elementsToHide.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.style.display = 'none';
                        element.style.visibility = 'hidden';
                    }
                });

                // Hide mascot container
                const mascot = document.querySelector('.mascot-container-global');
                if (mascot) {
                    mascot.style.display = 'none';
                    mascot.style.visibility = 'hidden';
                }

                // Hide any robot select or store bubbles by class
                const bubbles = document.querySelectorAll('.robot-select-bubble, .store-bubble, .floating-bubble');
                bubbles.forEach(bubble => {
                    bubble.style.display = 'none';
                    bubble.style.visibility = 'hidden';
                });

                // Add battle mode class to body for additional CSS targeting
                document.body.classList.add('battle-mode');
            },

            showBattleUIElements() {
                // Show ALL UI elements when exiting battle
                const elementsToShow = [
                    'currencyDisplay',
                    'missionsBubble',
                    'settingsBtn'
                ];
                
                // Show by ID
                elementsToShow.forEach(id => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.style.display = '';
                        element.style.visibility = '';
                    }
                });

                // Show mascot container
                const mascot = document.querySelector('.mascot-container-global');
                if (mascot) {
                    mascot.style.display = '';
                    mascot.style.visibility = '';
                }

                // Show any robot select or store bubbles
                const bubbles = document.querySelectorAll('.robot-select-bubble, .store-bubble, .floating-bubble');
                bubbles.forEach(bubble => {
                    bubble.style.display = '';
                    bubble.style.visibility = '';
                });

                // Remove battle mode class from body
                document.body.classList.remove('battle-mode');
            },

            // Settings Modal Functions
            showSettingsModal() {
                // Update last saved text
                const lastSavedText = document.getElementById('lastSavedText');
                if (this.data.lastSaveTime) {
                    const timeDiff = Date.now() - this.data.lastSaveTime;
                    const minutes = Math.floor(timeDiff / 60000);
                    if (minutes < 1) {
                        lastSavedText.textContent = 'Last saved: Just now';
                    } else if (minutes < 60) {
                        lastSavedText.textContent = `Last saved: ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
                    } else {
                        const hours = Math.floor(minutes / 60);
                        lastSavedText.textContent = `Last saved: ${hours} hour${hours > 1 ? 's' : ''} ago`;
                    }
                } else {
                    lastSavedText.textContent = 'Last saved: Never';
                }
                
                // Update TTS toggle state
                const toggleSwitch = document.getElementById('ttsToggleSwitch');
                const voiceSettings = document.getElementById('voiceSettings');
                const voiceStyle = document.getElementById('voiceStyle');
                const customSettings = document.getElementById('customVoiceSettings');
                
                if (this.data.ttsEnabled) {
                    toggleSwitch.classList.add('active');
                    voiceSettings.style.display = 'block';
                } else {
                    toggleSwitch.classList.remove('active');
                    voiceSettings.style.display = 'none';
                }
                
                // Load voice settings
                voiceStyle.value = this.data.voiceStyle || 'robotic';
                document.getElementById('voicePitch').value = this.data.voicePitch || 1.5;
                document.getElementById('voiceRate').value = this.data.voiceRate || 1.2;
                document.getElementById('pitchValue').textContent = (this.data.voicePitch || 1.5).toFixed(1);
                document.getElementById('rateValue').textContent = (this.data.voiceRate || 1.2).toFixed(1);
                
                // Load Scrappy's voice settings
                document.getElementById('scrappyPitch').value = this.data.scrappyPitch || 0.8;
                document.getElementById('scrappyRate').value = this.data.scrappyRate || 0.9;
                document.getElementById('scrappyPitchValue').textContent = (this.data.scrappyPitch || 0.8).toFixed(1);
                document.getElementById('scrappyRateValue').textContent = (this.data.scrappyRate || 0.9).toFixed(1);
                
                // Show custom settings if custom style is selected
                customSettings.style.display = this.data.voiceStyle === 'custom' ? 'block' : 'none';
                
                // Update Auto-Snooze toggle state
                const autoSnoozeToggleSwitch = document.getElementById('autoSnoozeToggleSwitch');
                if (this.data.autoSnoozeEnabled) {
                    autoSnoozeToggleSwitch.classList.add('active');
                } else {
                    autoSnoozeToggleSwitch.classList.remove('active');
                }
                
                // Lock body scroll when modal opens
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
                
                document.getElementById('settingsModal').classList.add('active');
            },

            toggleTTSSwitch() {
                this.data.ttsEnabled = !this.data.ttsEnabled;
                const toggleSwitch = document.getElementById('ttsToggleSwitch');
                const voiceSettings = document.getElementById('voiceSettings');
                
                if (this.data.ttsEnabled) {
                    toggleSwitch.classList.add('active');
                    voiceSettings.style.display = 'block';
                    
                    // Warm up the speech synthesis with a completely silent utterance
                    const warmup = new SpeechSynthesisUtterance('.');
                    warmup.volume = 0; // Completely silent
                    warmup.rate = 10;
                    this.tts.synthesis.speak(warmup);
                    
                    setTimeout(() => {
                        this.speak("Voice enabled! I can speak now!");
                    }, 150);
                } else {
                    toggleSwitch.classList.remove('active');
                    voiceSettings.style.display = 'none';
                }
                
                this.saveData();
            },

            toggleAutoSnoozeSwitch() {
                this.data.autoSnoozeEnabled = !this.data.autoSnoozeEnabled;
                const toggleSwitch = document.getElementById('autoSnoozeToggleSwitch');
                
                if (this.data.autoSnoozeEnabled) {
                    toggleSwitch.classList.add('active');
                    this.mascotSpeak("Auto-Snooze enabled! Tasks will automatically re-activate after completion.");
                } else {
                    toggleSwitch.classList.remove('active');
                    this.mascotSpeak("Auto-Snooze disabled. Tasks will stay complete.");
                }
                
                this.saveData();
            },

            toggleGroupTaskVisibility() {
                // Toggle the state
                this.data.showGroupTasksInRegularCategories = !this.data.showGroupTasksInRegularCategories;
                
                // Save and re-render (button state updated by render function)
                this.saveData();
                this.renderCategory();
            },

            showSaveFileSelect() {
                const saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                const saveFileList = document.getElementById('saveFileList');
                
                saveFileList.innerHTML = '';
                saveFiles.forEach(file => {
                    const fileItem = document.createElement('div');
                    fileItem.className = 'file-item';
                    if (file.name === this.data.currentSaveFile) {
                        fileItem.classList.add('current');
                    }
                    fileItem.innerHTML = `
                        <div class="file-item-name">${file.displayName}${file.name === this.data.currentSaveFile ? ' (Current)' : ''}</div>
                        <div class="file-item-date">${new Date(file.lastModified).toLocaleDateString()} ${new Date(file.lastModified).toLocaleTimeString()}</div>
                    `;
                    fileItem.onclick = () => this.overwriteSave(file.name);
                    saveFileList.appendChild(fileItem);
                });
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('saveFileSelectModal').classList.add('active');
            },

            closeSaveFileSelect() {
                document.getElementById('saveFileSelectModal').classList.remove('active');
                document.getElementById('newSaveFileName').value = '';
            },

            createNewSave() {
                const input = document.getElementById('newSaveFileName');
                const fileName = input.value.trim();
                
                if (!fileName) {
                    alert('Please enter a save name!');
                    return;
                }

                const sanitizedName = fileName.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 50);
                if (!sanitizedName) {
                    alert('Please enter a valid save name!');
                    return;
                }
                
                this.data.currentSaveFile = sanitizedName;
                this.data.lastSaveTime = Date.now();
                this.saveData();
                
                this.closeSaveFileSelect();
                alert(`Progress saved as "${sanitizedName}"!`);
                this.showSettingsModal();
            },

            overwriteSave(fileName) {
                if (!confirm(`Overwrite "${fileName}"?`)) {
                    return;
                }
                
                this.data.currentSaveFile = fileName;
                this.data.lastSaveTime = Date.now();
                this.saveData();
                
                this.closeSaveFileSelect();
                alert(`Progress saved to "${fileName}"!`);
                this.showSettingsModal();
            },

            showLoadFileSelect() {
                const saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                const loadFileList = document.getElementById('loadFileList');
                
                if (saveFiles.length === 0) {
                    loadFileList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary);">No saved files found</div>';
                } else {
                    loadFileList.innerHTML = '';
                    saveFiles.forEach(file => {
                        const fileItem = document.createElement('div');
                        fileItem.className = 'file-item';
                        if (file.name === this.data.currentSaveFile) {
                            fileItem.classList.add('current');
                        }
                        fileItem.innerHTML = `
                            <div class="file-item-name">${file.displayName}${file.name === this.data.currentSaveFile ? ' (Current)' : ''}</div>
                            <div class="file-item-date">${new Date(file.lastModified).toLocaleDateString()} ${new Date(file.lastModified).toLocaleTimeString()}</div>
                        `;
                        fileItem.onclick = () => this.loadFile(file.name);
                        loadFileList.appendChild(fileItem);
                    });
                }
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('loadFileSelectModal').classList.add('active');
            },

            closeLoadFileSelect() {
                document.getElementById('loadFileSelectModal').classList.remove('active');
            },

            loadFile(fileName) {
                if (!confirm(`Load "${fileName}"? Current unsaved progress will be lost.`)) {
                    return;
                }

                const savedData = localStorage.getItem(`upkeepData_${fileName}`);
                if (!savedData) {
                    alert('Save file not found!');
                    return;
                }

                const parsedData = JSON.parse(savedData);
                
                // Calculate real-time decay (skip snoozed tasks)
                parsedData.categories.forEach(category => {
                    if (!category.tasks) return;
                    category.tasks.forEach(task => {
                        // Check if task is snoozed
                        const isSnoozed = task.snoozedUntil && task.snoozedUntil > Date.now();
                        
                        // Only recalculate freshness if not snoozed
                        if (task.lastCompleted && !isSnoozed) {
                            const totalElapsed = (Date.now() - task.lastCompleted);
                            task.freshness = Math.max(0, Math.min(100, 100 - (totalElapsed / task.decayMs) * 100));
                        } else if (isSnoozed && task.frozenFreshness !== undefined) {
                            // Restore frozen freshness for snoozed tasks
                            task.freshness = task.frozenFreshness;
                        }
                    });
                });

                this.data = parsedData;
                this.data.currentSaveFile = fileName;
                localStorage.setItem('upkeepCurrentFile', fileName);

                this.saveData();
                this.closeLoadFileSelect();
                this.closeModal('settingsModal');
                this.render();

                alert(`Loaded "${fileName}"!`);
            },

            // Export/Import Functions
            exportToFile() {
                const exportData = {
                    version: '1.0',
                    exportDate: new Date().toISOString(),
                    currentSaveFile: this.data.currentSaveFile,
                    allSaves: {}
                };

                // Get all save files
                const saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                
                // Export all save slots
                saveFiles.forEach(file => {
                    const saveData = localStorage.getItem(`upkeepData_${file.name}`);
                    if (saveData) {
                        exportData.allSaves[file.name] = {
                            displayName: file.displayName,
                            lastModified: file.lastModified,
                            data: JSON.parse(saveData)
                        };
                    }
                });

                // Create blob and download
                const dataStr = JSON.stringify(exportData, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `upkeep-backup-${new Date().toISOString().split('T')[0]}.upkeep`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                this.showSpeechBubble("Your data has been exported! Keep this file safe for backup.");
            },

            importFromFile() {
                document.getElementById('importFileInput').click();
            },

            handleImportFile(event) {
                const file = event.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const importData = JSON.parse(e.target.result);
                        
                        if (!importData.version || !importData.allSaves) {
                            alert('Invalid backup file format!');
                            return;
                        }

                        if (!confirm(`Import data from "${file.name}"? This will merge with your existing saves.`)) {
                            return;
                        }

                        // Import all saves
                        const saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                        
                        Object.keys(importData.allSaves).forEach(saveName => {
                            const saveInfo = importData.allSaves[saveName];
                            
                            // Add to save files list if not exists
                            if (!saveFiles.find(f => f.name === saveName)) {
                                saveFiles.push({
                                    name: saveName,
                                    displayName: saveInfo.displayName,
                                    lastModified: saveInfo.lastModified
                                });
                            }
                            
                            // Save the data
                            localStorage.setItem(`upkeepData_${saveName}`, JSON.stringify(saveInfo.data));
                        });

                        localStorage.setItem('upkeepSaveFiles', JSON.stringify(saveFiles));
                        
                        alert(`Successfully imported ${Object.keys(importData.allSaves).length} save slot(s)!`);
                        this.showSpeechBubble("Import complete! Your saves are now available.");
                        
                        // Reset file input
                        event.target.value = '';
                    } catch (error) {
                        alert('Error reading backup file: ' + error.message);
                    }
                };
                reader.readAsText(file);
            },

            // Task List Template Management System
            generateTaskList() {
                // Prompt user for task list name
                const listName = prompt('Enter a name for this task list template:\n(e.g., "Apartment Deep Clean", "Work Office Upkeep")');
                
                if (!listName || listName.trim() === '') {
                    this.showSpeechBubble("Task list save cancelled.");
                    return;
                }
                
                const sanitizedName = listName.trim();
                
                // Create compressed data structure with all task information
                const taskListData = {
                    version: '1.0',
                    name: sanitizedName,
                    createdDate: new Date().toISOString(),
                    categories: JSON.parse(JSON.stringify(this.data.categories)) // Deep clone
                };
                
                // Get existing task lists from localStorage
                const savedLists = JSON.parse(localStorage.getItem('upkeepTaskLists') || '[]');
                
                // Check if name already exists
                const existingIndex = savedLists.findIndex(list => list.name === sanitizedName);
                
                if (existingIndex !== -1) {
                    if (!confirm(`A task list named "${sanitizedName}" already exists. Overwrite it?`)) {
                        this.showSpeechBubble("Task list save cancelled.");
                        return;
                    }
                    // Overwrite existing
                    savedLists[existingIndex] = taskListData;
                } else {
                    // Add new
                    savedLists.push(taskListData);
                }
                
                // Save to localStorage
                localStorage.setItem('upkeepTaskLists', JSON.stringify(savedLists));
                
                this.showSpeechBubble(`✅ Task list "${sanitizedName}" saved successfully! You can load it anytime from the Options menu.`);
            },
            
            loadTaskList() {
                // Get all saved task lists
                const savedLists = JSON.parse(localStorage.getItem('upkeepTaskLists') || '[]');
                
                // Create selection modal HTML
                let listHTML = '<div style="max-height: 400px; overflow-y: auto;">';
                
                // Always show Global Default List first
                const defaultTaskCount = DEFAULT_TASK_LIST.categories.reduce((sum, cat) => sum + (cat.tasks ? cat.tasks.length : 0), 0);
                listHTML += `
                    <div onclick="app.selectTaskListToLoad('global')" style="padding: 16px; margin-bottom: 12px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%); border: 2px solid rgba(16, 185, 129, 0.4); border-radius: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(16, 185, 129, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                        <div style="font-size: 16px; font-weight: 700; color: #059669; margin-bottom: 6px;">
                            🌟 ${DEFAULT_TASK_LIST.name} <span style="font-size: 11px; background: rgba(16, 185, 129, 0.2); padding: 2px 8px; border-radius: 6px; margin-left: 6px;">GLOBAL TEMPLATE</span>
                        </div>
                        <div style="font-size: 12px; color: var(--text-secondary);">
                            <span>📝 ${DEFAULT_TASK_LIST.categories.length} categories</span> • 
                            <span>✓ ${defaultTaskCount} tasks</span> •
                            <span>🌍 Available to all users</span>
                        </div>
                    </div>
                `;
                
                // Show user-created lists if any exist
                if (savedLists.length > 0) {
                    listHTML += '<div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin: 16px 0 8px 4px;">Your Custom Lists</div>';
                    savedLists.forEach((list, index) => {
                        const date = new Date(list.createdDate).toLocaleDateString();
                        const taskCount = list.categories.reduce((sum, cat) => sum + (cat.tasks ? cat.tasks.length : 0), 0);
                        
                        listHTML += `
                            <div onclick="app.selectTaskListToLoad(${index})" style="padding: 16px; margin-bottom: 12px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 12px; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.3)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                                <div style="font-size: 16px; font-weight: 700; color: #2563eb; margin-bottom: 6px;">📋 ${list.name}</div>
                                <div style="font-size: 12px; color: var(--text-secondary);">
                                    <span>📅 Created: ${date}</span> • 
                                    <span>📝 ${list.categories.length} categories</span> • 
                                    <span>✓ ${taskCount} tasks</span>
                                </div>
                            </div>
                        `;
                    });
                }
                
                listHTML += '</div>';
                
                listHTML += `
                    <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid var(--border);">
                        <button onclick="app.closeModal('customPrompt')" style="width: 100%; padding: 12px; background: var(--border); color: var(--text); border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer;">
                            Cancel
                        </button>
                    </div>
                `;
                
                // Show custom modal
                this.showCustomPrompt('Select a Task List Template', listHTML);
            },
            
            selectTaskListToLoad(index) {
                // Determine if loading global or user list
                let selectedList;
                let listIdentifier;
                
                if (index === 'global') {
                    selectedList = DEFAULT_TASK_LIST;
                    listIdentifier = 'global';
                } else {
                    const savedLists = JSON.parse(localStorage.getItem('upkeepTaskLists') || '[]');
                    selectedList = savedLists[index];
                    listIdentifier = index;
                    
                    if (!selectedList) {
                        alert('Error: Task list not found!');
                        return;
                    }
                }
                
                // Close selection modal
                this.closeModal('customPrompt');
                
                // Show critical warning modal
                const warningHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                        <div style="font-size: 18px; font-weight: 700; color: #dc2626; margin-bottom: 16px;">
                            WARNING: DATA WILL BE OVERWRITTEN
                        </div>
                        <div style="font-size: 14px; line-height: 1.6; color: var(--text); margin-bottom: 24px; padding: 16px; background: rgba(220, 38, 38, 0.1); border-radius: 12px; border: 2px solid rgba(220, 38, 38, 0.3);">
                            Loading the task list "<strong>${selectedList.name}</strong>" will <strong>completely overwrite</strong> your current task categories and all active tasks.
                            <br><br>
                            All your current progress, decay times, and task customizations will be replaced with the template data.
                            <br><br>
                            <strong>This action cannot be undone unless you have a backup!</strong>
                        </div>
                        <div style="display: flex; gap: 12px; justify-content: center;">
                            <button onclick="app.showMaintenancePercentagePrompt('${listIdentifier}')" style="flex: 1; padding: 14px; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);">
                                ⚠️ Yes, Continue
                            </button>
                            <button onclick="app.closeModal('customPrompt')" style="flex: 1; padding: 14px; background: var(--border); color: var(--text); border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer;">
                                Cancel
                            </button>
                        </div>
                    </div>
                `;
                
                this.showCustomPrompt('⚠️ Confirm Overwrite', warningHTML);
            },
            
            showMaintenancePercentagePrompt(listIdentifier) {
                // Close warning modal
                this.closeModal('customPrompt');
                
                // Show maintenance percentage configuration prompt
                const maintenanceHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🔧</div>
                        <div style="font-size: 18px; font-weight: 700; color: #3b82f6; margin-bottom: 16px;">
                            Set Initial Maintenance Percentage
                        </div>
                        <div style="font-size: 14px; line-height: 1.6; color: var(--text); margin-bottom: 24px; padding: 16px; background: rgba(59, 130, 246, 0.1); border-radius: 12px; border: 2px solid rgba(59, 130, 246, 0.3);">
                            How should the maintenance percentage of the imported tasks be initialized?
                            <br><br>
                            <strong>Choose one of the following options:</strong>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
                            <button onclick="app.confirmLoadTaskList('${listIdentifier}', 0)" style="padding: 14px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">
                                🔴 Zero All Tasks (0% Maintenance)
                                <div style="font-size: 11px; font-weight: 400; margin-top: 4px; opacity: 0.9;">Tasks appear immediately urgent/decayed</div>
                            </button>
                            
                            <button onclick="app.confirmLoadTaskList('${listIdentifier}', 100)" style="padding: 14px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                                🟢 Complete All Tasks (100% Maintenance)
                                <div style="font-size: 11px; font-weight: 400; margin-top: 4px; opacity: 0.9;">Tasks treated as freshly completed</div>
                            </button>
                            
                            <div style="padding: 14px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 10px;">
                                <div style="font-size: 14px; font-weight: 700; color: #2563eb; margin-bottom: 8px;">🔵 Set Custom Percentage</div>
                                <input type="number" id="customMaintenanceValue" min="0" max="100" value="50" style="width: 100%; padding: 10px; border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 8px; font-size: 14px; margin-bottom: 8px;">
                                <input type="range" id="customMaintenanceSlider" min="0" max="100" value="50" style="width: 100%; margin-bottom: 8px;" oninput="document.getElementById('customMaintenanceValue').value = this.value">
                                <button onclick="app.confirmLoadTaskList('${listIdentifier}', parseInt(document.getElementById('customMaintenanceValue').value))" style="width: 100%; padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer;">
                                    Apply Custom Percentage
                                </button>
                            </div>
                        </div>
                        
                        <div style="padding-top: 16px; border-top: 2px solid var(--border);">
                            <button onclick="app.loadTaskList()" style="width: 100%; padding: 12px; background: var(--border); color: var(--text); border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer;">
                                ← Back to List Selection
                            </button>
                        </div>
                    </div>
                `;
                
                // Sync slider and input
                setTimeout(() => {
                    const slider = document.getElementById('customMaintenanceSlider');
                    const input = document.getElementById('customMaintenanceValue');
                    if (slider && input) {
                        slider.addEventListener('input', function() {
                            input.value = this.value;
                        });
                        input.addEventListener('input', function() {
                            slider.value = this.value;
                        });
                    }
                }, 100);
                
                this.showCustomPrompt('🔧 Configure Maintenance', maintenanceHTML);
            },
            
            confirmLoadTaskList(listIdentifier, maintenancePercentage = 0) {
                // Get the selected list
                let selectedList;
                
                if (listIdentifier === 'global') {
                    selectedList = JSON.parse(JSON.stringify(DEFAULT_TASK_LIST)); // Deep clone
                } else {
                    const savedLists = JSON.parse(localStorage.getItem('upkeepTaskLists') || '[]');
                    selectedList = savedLists[listIdentifier];
                    
                    if (!selectedList) {
                        alert('Error: Task list not found!');
                        return;
                    }
                    
                    selectedList = JSON.parse(JSON.stringify(selectedList)); // Deep clone
                }
                
                // Close maintenance modal
                this.closeModal('customPrompt');
                
                // Apply maintenance percentage to all tasks
                const now = Date.now();
                selectedList.categories.forEach(category => {
                    if (category.tasks) {
                        category.tasks.forEach(task => {
                            if (maintenancePercentage === 0) {
                                // Set to 0% - tasks appear urgent/decayed
                                task.lastCompleted = null;
                                task.freshness = 0;
                            } else if (maintenancePercentage === 100) {
                                // Set to 100% - tasks freshly completed
                                task.lastCompleted = now;
                                task.freshness = 100;
                            } else {
                                // Custom percentage - calculate appropriate lastCompleted time
                                const decayTime = task.decayMs || 604800000; // Default to 7 days if not set
                                const timeSinceCompletion = decayTime * (1 - (maintenancePercentage / 100));
                                task.lastCompleted = now - timeSinceCompletion;
                                task.freshness = maintenancePercentage;
                            }
                        });
                    }
                });
                
                // Clear current categories and load template data
                this.data.categories = selectedList.categories;
                
                // Reset current view to dashboard
                this.data.currentCategoryId = null;
                this.showDashboard();
                
                // Show save prompt
                const savePromptHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                        <div style="font-size: 18px; font-weight: 700; color: #10b981; margin-bottom: 16px;">
                            Task List Loaded Successfully!
                        </div>
                        <div style="font-size: 14px; line-height: 1.6; color: var(--text); margin-bottom: 24px; padding: 16px; background: rgba(16, 185, 129, 0.1); border-radius: 12px; border: 2px solid rgba(16, 185, 129, 0.3);">
                            The task list "<strong>${selectedList.name}</strong>" has been loaded into your current session.
                            <br><br>
                            <strong>Would you like to save your main progress file now to finalize these changes?</strong>
                            <br><br>
                            If you don't save, these changes will be lost when you close the app.
                        </div>
                        <div style="display: flex; gap: 12px; justify-content: center;">
                            <button onclick="app.saveAfterTaskListLoad()" style="flex: 1; padding: 14px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border: none; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);">
                                💾 Yes, Save Game
                            </button>
                            <button onclick="app.closeModal('customPrompt')" style="flex: 1; padding: 14px; background: var(--border); color: var(--text); border: none; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer;">
                                No, Continue Without Saving
                            </button>
                        </div>
                    </div>
                `;
                
                this.showCustomPrompt('💾 Save Your Progress?', savePromptHTML);
                
                this.showSpeechBubble(`Task list "${selectedList.name}" loaded! Don't forget to save your progress.`);
            },
            
            saveAfterTaskListLoad() {
                this.closeModal('customPrompt');
                this.saveData();
                this.showSpeechBubble("✅ Your progress has been saved with the new task list!");
            },
            
            showCustomPrompt(title, contentHTML) {
                // Create or get custom prompt modal
                let modal = document.getElementById('customPrompt');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.id = 'customPrompt';
                    modal.className = 'modal';
                    document.body.appendChild(modal);
                }
                
                modal.innerHTML = `
                    <div class="modal-content" style="max-width: 600px;">
                        <div class="modal-header">
                            <div class="modal-title">${title}</div>
                            <button class="close-btn" onclick="app.closeModal('customPrompt')"><img src="Imag/Close.png" alt="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${contentHTML}
                        </div>
                    </div>
                `;
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                modal.classList.add('active');
            },

            // Manage Saves Functions
            showManageSaves() {
                const saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                const manageSavesList = document.getElementById('manageSavesList');
                
                if (saveFiles.length === 0) {
                    manageSavesList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-secondary);">No save slots found</div>';
                } else {
                    manageSavesList.innerHTML = '';
                    saveFiles.forEach(file => {
                        const fileItem = document.createElement('div');
                        fileItem.className = 'file-item';
                        if (file.name === this.data.currentSaveFile) {
                            fileItem.classList.add('current');
                        }
                        fileItem.innerHTML = `
                            <div class="file-item-name">${file.displayName}${file.name === this.data.currentSaveFile ? ' (Current)' : ''}</div>
                            <div class="file-item-date">${new Date(file.lastModified).toLocaleString()}</div>
                            <div class="file-item-actions">
                                <button class="file-item-btn export" onclick="app.exportSingleSave('${file.name}')">📤 Export</button>
                                <button class="file-item-btn delete" onclick="app.deleteSingleSave('${file.name}')">🗑️ Delete</button>
                            </div>
                        `;
                        manageSavesList.appendChild(fileItem);
                    });
                }
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('manageSavesModal').classList.add('active');
            },

            closeManageSaves() {
                document.getElementById('manageSavesModal').classList.remove('active');
            },

            exportSingleSave(fileName) {
                const saveData = localStorage.getItem(`upkeepData_${fileName}`);
                if (!saveData) {
                    alert('Save file not found!');
                    return;
                }

                const saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                const saveInfo = saveFiles.find(f => f.name === fileName);

                const exportData = {
                    version: '1.0',
                    exportDate: new Date().toISOString(),
                    currentSaveFile: fileName,
                    allSaves: {
                        [fileName]: {
                            displayName: saveInfo?.displayName || fileName,
                            lastModified: saveInfo?.lastModified || Date.now(),
                            data: JSON.parse(saveData)
                        }
                    }
                };

                const dataStr = JSON.stringify(exportData, null, 2);
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `${fileName}-${new Date().toISOString().split('T')[0]}.upkeep`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                this.showSpeechBubble(`"${fileName}" has been exported!`);
            },

            deleteSingleSave(fileName) {
                if (fileName === this.data.currentSaveFile) {
                    alert('Cannot delete the currently active save!');
                    return;
                }

                if (!confirm(`Delete save slot "${fileName}"? This cannot be undone!`)) {
                    return;
                }

                // Remove from localStorage
                localStorage.removeItem(`upkeepData_${fileName}`);
                
                // Remove from save files list
                let saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                saveFiles = saveFiles.filter(f => f.name !== fileName);
                localStorage.setItem('upkeepSaveFiles', JSON.stringify(saveFiles));

                this.showSpeechBubble(`"${fileName}" has been deleted.`);
                this.showManageSaves(); // Refresh the list
            },

            // Logbook Functions
            addLogEntry(type, title, description) {
                const entry = {
                    id: Date.now(),
                    type: type, // 'completed', 'added', 'freshness'
                    title: title,
                    description: description,
                    timestamp: Date.now()
                };
                
                this.data.activityLog.unshift(entry); // Add to beginning
                
                // Keep only last 100 entries
                if (this.data.activityLog.length > 100) {
                    this.data.activityLog = this.data.activityLog.slice(0, 100);
                }
                
                this.saveData();
            },

            openLogbook() {
                this.renderLogbook();
                
                // Lock body scroll
                document.body.style.overflow = 'hidden';
                
                document.getElementById('logbookModal').classList.add('active');
            },

            closeLogbook() {
                document.getElementById('logbookModal').classList.remove('active');
            },

            clearLogbook() {
                if (!confirm('Clear all activity log entries? This cannot be undone!')) {
                    return;
                }
                
                this.data.activityLog = [];
                this.saveData();
                this.renderLogbook();
                this.showSpeechBubble("Activity log cleared!");
            },

            renderLogbook() {
                const logbookBody = document.getElementById('logbookBody');
                
                if (this.data.activityLog.length === 0) {
                    logbookBody.innerHTML = '<div class="logbook-empty">No activity yet. Start completing tasks to build your home\'s story!</div>';
                    return;
                }

                // Group entries by date
                const groupedEntries = {};
                this.data.activityLog.forEach(entry => {
                    const date = new Date(entry.timestamp);
                    const dateKey = date.toLocaleDateString();
                    
                    if (!groupedEntries[dateKey]) {
                        groupedEntries[dateKey] = [];
                    }
                    groupedEntries[dateKey].push(entry);
                });

                // Render grouped entries
                let html = '';
                Object.keys(groupedEntries).forEach(dateKey => {
                    const entries = groupedEntries[dateKey];
                    const date = new Date(entries[0].timestamp);
                    const today = new Date();
                    const yesterday = new Date(today);
                    yesterday.setDate(yesterday.getDate() - 1);
                    
                    let dateLabel = dateKey;
                    if (date.toDateString() === today.toDateString()) {
                        dateLabel = `Today, ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
                    } else if (date.toDateString() === yesterday.toDateString()) {
                        dateLabel = `Yesterday, ${date.getFullYear()}`;
                    }
                    
                    html += `<div class="logbook-date-group">`;
                    html += `<div class="logbook-date-header">${dateLabel}</div>`;
                    
                    entries.forEach(entry => {
                        const icon = entry.type === 'completed' ? '✓' : 
                                   entry.type === 'added' ? '+' : 
                                   entry.type === 'snoozed' ? '💤' : '📊';
                        
                        html += `
                            <div class="logbook-entry">
                                <div class="logbook-entry-icon">${icon}</div>
                                <div class="logbook-entry-content">
                                    <div class="logbook-entry-title">${entry.title}</div>
                                    <div class="logbook-entry-desc">${entry.description}</div>
                                </div>
                            </div>
                        `;
                    });
                    
                    html += `</div>`;
                });

                logbookBody.innerHTML = html;
            },

            populateSaveFileLists() {
                const saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                
                // Populate save file select
                const saveFileSelect = document.getElementById('saveFileSelect');
                saveFileSelect.innerHTML = '<option value="">-- Select existing file or create new --</option>';
                saveFileSelect.innerHTML += '<option value="__new__">✏️ Create New Save File</option>';
                saveFiles.forEach(file => {
                    const option = document.createElement('option');
                    option.value = file.name;
                    option.textContent = file.displayName;
                    if (file.name === this.data.currentSaveFile) {
                        option.textContent += ' [Current]';
                    }
                    saveFileSelect.appendChild(option);
                });
                
                // Populate load select
                const loadSelect = document.getElementById('loadFileSelect');
                loadSelect.innerHTML = '<option value="">-- Select a saved file --</option>';
                saveFiles.forEach(file => {
                    const option = document.createElement('option');
                    option.value = file.name;
                    option.textContent = `${file.displayName} (${new Date(file.lastModified).toLocaleDateString()})`;
                    if (file.name === this.data.currentSaveFile) {
                        option.textContent += ' [Current]';
                    }
                    loadSelect.appendChild(option);
                });

                // Populate delete select
                const deleteSelect = document.getElementById('deleteFileSelect');
                deleteSelect.innerHTML = '<option value="">-- Select a file to delete --</option>';
                saveFiles.forEach(file => {
                    const option = document.createElement('option');
                    option.value = file.name;
                    option.textContent = file.displayName;
                    if (file.name === this.data.currentSaveFile) {
                        option.textContent += ' [Current]';
                    }
                    deleteSelect.appendChild(option);
                });
            },

            handleSaveFileSelect() {
                const saveFileSelect = document.getElementById('saveFileSelect');
                const saveFileName = document.getElementById('saveFileName');
                
                if (saveFileSelect.value === '__new__') {
                    // Show input for new file name
                    saveFileName.style.display = 'block';
                    saveFileName.value = '';
                    saveFileName.focus();
                } else if (saveFileSelect.value) {
                    // Hide input when existing file is selected
                    saveFileName.style.display = 'none';
                    saveFileName.value = '';
                } else {
                    // Hide input when nothing is selected
                    saveFileName.style.display = 'none';
                    saveFileName.value = '';
                }
            },

            updateLoadButton() {
                const loadSelect = document.getElementById('loadFileSelect');
                const loadButton = document.getElementById('loadButton');
                loadButton.disabled = !loadSelect.value;
            },

            updateDeleteButton() {
                const deleteSelect = document.getElementById('deleteFileSelect');
                const deleteButton = document.getElementById('deleteButton');
                deleteButton.disabled = !deleteSelect.value;
            },

            saveToFile() {
                const saveFileSelect = document.getElementById('saveFileSelect');
                const saveFileNameInput = document.getElementById('saveFileName');
                
                let targetFileName = '';
                
                if (saveFileSelect.value === '__new__') {
                    // Creating a new file
                    const fileName = saveFileNameInput.value.trim();
                    if (!fileName) {
                        alert('Please enter a save name!');
                        return;
                    }

                    // Create sanitized file name
                    const sanitizedName = fileName.replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 50);
                    if (!sanitizedName) {
                        alert('Please enter a valid save name!');
                        return;
                    }
                    
                    targetFileName = sanitizedName;
                } else if (saveFileSelect.value) {
                    // Overwriting existing file
                    targetFileName = saveFileSelect.value;
                    
                    if (!confirm(`Overwrite "${targetFileName}"?`)) {
                        return;
                    }
                } else {
                    alert('Please select a file or choose to create a new one!');
                    return;
                }

                // Save current data to the target file
                this.data.currentSaveFile = targetFileName;
                this.data.lastSaveTime = Date.now();
                this.saveData();

                // Clear inputs and reset select
                saveFileNameInput.value = '';
                saveFileNameInput.style.display = 'none';
                saveFileSelect.value = '';

                // Refresh lists
                this.populateSaveFileLists();

                alert(`Progress saved as "${targetFileName}"!`);
            },

            loadFromFile() {
                const loadSelect = document.getElementById('loadFileSelect');
                const selectedFile = loadSelect.value;
                
                if (!selectedFile) return;

                if (!confirm(`Load "${selectedFile}"? Current unsaved progress will be lost.`)) {
                    return;
                }

                const savedData = localStorage.getItem(`upkeepData_${selectedFile}`);
                if (!savedData) {
                    alert('Save file not found!');
                    return;
                }

                // Parse the saved data
                const parsedData = JSON.parse(savedData);
                
                // Calculate real-time decay based on lastSaveTime (skip snoozed tasks)
                const timeSinceSave = Date.now() - (parsedData.lastSaveTime || Date.now());
                
                parsedData.categories.forEach(category => {
                    if (!category.tasks) return;
                    category.tasks.forEach(task => {
                        // Check if task is snoozed
                        const isSnoozed = task.snoozedUntil && task.snoozedUntil > Date.now();
                        
                        // Only recalculate freshness if not snoozed
                        if (task.lastCompleted && !isSnoozed) {
                            // Recalculate freshness as if time has passed
                            const totalElapsed = (Date.now() - task.lastCompleted);
                            task.freshness = Math.max(0, Math.min(100, 100 - (totalElapsed / task.decayMs) * 100));
                        } else if (isSnoozed && task.frozenFreshness !== undefined) {
                            // Restore frozen freshness for snoozed tasks
                            task.freshness = task.frozenFreshness;
                        }
                    });
                });

                // Load the data
                this.data = parsedData;
                this.data.currentSaveFile = selectedFile;
                localStorage.setItem('upkeepCurrentFile', selectedFile);

                // Save with updated decay
                this.saveData();

                // Close modal and render
                this.closeModal('settingsModal');
                this.render();

                alert(`Loaded "${selectedFile}" with real-time decay applied!`);
            },

            deleteFile() {
                const deleteSelect = document.getElementById('deleteFileSelect');
                const selectedFile = deleteSelect.value;
                
                if (!selectedFile) return;

                if (selectedFile === this.data.currentSaveFile) {
                    alert('Cannot delete the currently active save file!');
                    return;
                }

                if (!confirm(`Delete "${selectedFile}"? This cannot be undone.`)) {
                    return;
                }

                // Remove from localStorage
                localStorage.removeItem(`upkeepData_${selectedFile}`);

                // Update save files list
                let saveFiles = JSON.parse(localStorage.getItem('upkeepSaveFiles') || '[]');
                saveFiles = saveFiles.filter(f => f.name !== selectedFile);
                localStorage.setItem('upkeepSaveFiles', JSON.stringify(saveFiles));

                // Refresh lists
                this.populateSaveFileLists();

                alert(`Deleted "${selectedFile}"!`);
            },

            // Currency Functions
            updateCurrencyDisplay() {
                const mainDisplay = document.getElementById('currencyAmount');
                const storeDisplay = document.getElementById('storeCurrencyAmount');
                
                if (mainDisplay) {
                    mainDisplay.textContent = this.data.currency;
                }
                if (storeDisplay) {
                    storeDisplay.textContent = this.data.currency;
                }
            },

            addCurrency(amount) {
                if (this.unlimitedBoltsActive) {
                    const currentActual = this.unlimitedBoltsActualCurrency ?? this.data.currency ?? 0;
                    this.unlimitedBoltsActualCurrency = currentActual + amount;

                    // Keep display currency topped up for debugging
                    const minimumDisplay = 999999;
                    if ((this.data.currency ?? 0) < minimumDisplay) {
                        this.data.currency = minimumDisplay;
                    }

                    this.saveData();
                    this.updateCurrencyDisplay();
                    return;
                }

                this.data.currency += amount;
                this.saveData();
                this.updateCurrencyDisplay();
            },

            // Calculate bolt reward based on task decay time
            calculateBoltReward(task) {
                if (!task || !task.decayMs) return 10; // Default to 10 bolts
                
                const decayHours = task.decayMs / (60 * 60 * 1000);
                
                // Reward tiers based on decay time
                if (decayHours <= 24) {
                    return 10; // Daily tasks
                } else if (decayHours <= 144) { // 6 days
                    return 25; // Weekly tasks
                } else if (decayHours <= 672) { // 4 weeks
                    return 50; // Bi-weekly tasks
                } else if (decayHours <= 2160) { // ~3 months
                    return 100; // Monthly tasks
                } else {
                    return 200; // Seasonal tasks
                }
            },

            deductCurrency(amount) {
                if (this.unlimitedBoltsActive) {
                    const currentActual = this.unlimitedBoltsActualCurrency ?? this.data.currency ?? 0;
                    this.unlimitedBoltsActualCurrency = Math.max(0, currentActual - amount);

                    // Maintain large display value while debugging
                    const minimumDisplay = 999999;
                    if ((this.data.currency ?? 0) < minimumDisplay) {
                        this.data.currency = minimumDisplay;
                    }

                    this.saveData();
                    this.updateCurrencyDisplay();
                    return true;
                }

                if (this.data.currency >= amount) {
                    this.data.currency -= amount;
                    this.saveData();
                    this.updateCurrencyDisplay();
                    return true;
                }
                return false;
            },

            // Scrappy Functions
            isStoreOpen() {
                const modal = document.getElementById('robotStoreModal');
                return modal && modal.classList.contains('active');
            },

            showScrappyDialogue(message, emotion = 'regular', forceShow = false) {
                // Only show Scrappy dialogue if store is open or forced (for settings testing)
                if (!forceShow && !this.isStoreOpen()) {
                    return;
                }
                const scrappyImage = document.getElementById('scrappyImage');
                const bubble = document.getElementById('scrappySpeechBubble');
                
                if (!scrappyImage || !bubble) return;

                // Update Scrappy's image based on emotion
                const imagePaths = {
                    regular: 'Imag/Achivments/Images/Finished Images/Store manager/Scrappy.png',
                    happy: 'Imag/Achivments/Images/Finished Images/Store manager/Scrappy-Happy.png',
                    mad: 'Imag/Achivments/Images/Finished Images/Store manager/Scrappy-Mad.png',
                    sad: 'Imag/Achivments/Images/Finished Images/Store manager/Scrappy-Sad.png'
                };
                scrappyImage.src = imagePaths[emotion] || imagePaths.regular;

                // Show speech bubble
                bubble.textContent = message;
                bubble.classList.add('visible');

                // Speak the message using text-to-speech
                // Skip TTS for empty or very short messages to prevent audio "pop"
                if (this.data.ttsEnabled && 'speechSynthesis' in window && message && message.length > 2) {
                    // DON'T cancel - just queue the speech (prevents audio pop)
                    const utterance = new SpeechSynthesisUtterance(message);
                    utterance.pitch = this.data.scrappyPitch || 0.8;
                    utterance.rate = this.data.scrappyRate || 0.9;
                    utterance.volume = 1.0;
                    window.speechSynthesis.speak(utterance);
                }

                // Hide after 4 seconds
                setTimeout(() => {
                    bubble.classList.remove('visible');
                    // Reset to regular after dialogue
                    setTimeout(() => {
                        scrappyImage.src = imagePaths.regular;
                    }, 300);
                }, 4000);
            },

            getRandomDialogue(category) {
                const dialogues = this.scrappyDialogue[category];
                if (!dialogues || dialogues.length === 0) return '';
                return dialogues[Math.floor(Math.random() * dialogues.length)];
            },

            startScrappyIdleChatter() {
                // Clear any existing timer
                if (this.scrappyIdleTimer) {
                    clearInterval(this.scrappyIdleTimer);
                }

                // Show idle chatter every 15-20 seconds
                this.scrappyIdleTimer = setInterval(() => {
                    const message = this.getRandomDialogue('idle');
                    this.showScrappyDialogue(message, 'regular');
                }, 15000 + Math.random() * 5000);
            },

            stopScrappyIdleChatter() {
                if (this.scrappyIdleTimer) {
                    clearInterval(this.scrappyIdleTimer);
                    this.scrappyIdleTimer = null;
                }
            },

            scrappyInteraction() {
                const container = document.getElementById('scrappyContainer');
                if (!container) return;

                // Random dodge direction
                const directions = [
                    { x: -50, y: -50 },
                    { x: 50, y: -50 },
                    { x: -50, y: 50 },
                    { x: 50, y: 50 },
                    { x: -80, y: 0 },
                    { x: 80, y: 0 },
                    { x: 0, y: -80 },
                    { x: 0, y: 80 }
                ];
                const direction = directions[Math.floor(Math.random() * directions.length)];

                // Apply dodge
                container.classList.add('dodging');
                container.style.transform = `translate(${direction.x}px, ${direction.y}px)`;

                // Reset position after dodge
                setTimeout(() => {
                    container.style.transform = 'translate(0, 0)';
                    container.classList.remove('dodging');
                }, 500);

                // Scrappy speaks a random idle line
                const message = this.getRandomDialogue('idle');
                this.showScrappyDialogue(message, 'regular');
            },

            // Robot Store Functions
            openRobotStore() {
                // ===== ENTER STORE MODE: Suppress companion robot dialogue =====
                this.isStoreMode = true;
                console.log('[STORE MODE] Activated - companion robot dialogue suppressed');

                // ===== IMMEDIATELY CUT OFF ANY ACTIVE COMPANION DIALOGUE =====
                const speechBubble = document.getElementById('speechBubble');
                const thoughtBubble = document.getElementById('thoughtBubble');
                
                // Hide any visible bubbles immediately
                if (speechBubble) {
                    speechBubble.classList.remove('visible');
                }
                if (thoughtBubble) {
                    thoughtBubble.classList.remove('visible');
                }
                
                // Clear any active timeouts
                if (this.mascotState.speechTimeout) {
                    clearTimeout(this.mascotState.speechTimeout);
                    this.mascotState.speechTimeout = null;
                }
                if (this.mascotState.thoughtTimeout) {
                    clearTimeout(this.mascotState.thoughtTimeout);
                    this.mascotState.thoughtTimeout = null;
                }
                
                // Cancel any ongoing TTS
                if (this.tts.synthesis) {
                    this.tts.synthesis.cancel();
                }
                
                // Reset mascot state flags
                this.mascotState.isSpeaking = false;
                this.mascotState.isThinking = false;
                
                console.log('[STORE MODE] Companion dialogue cut off - switching to Scrappy');

                const modal = document.getElementById('robotStoreModal');
                const scrappyContainer = document.getElementById('scrappyContainer');
                const storeCurrencyDisplay = document.getElementById('storeCurrencyDisplay');
                const mascotContainer = document.querySelector('.mascot-container-global');
                
                modal.classList.add('active');
                this.updateCurrencyDisplay();
                this.renderRobotStore();
                
                // Hide user's mascot robot
                if (mascotContainer) {
                    mascotContainer.style.display = 'none';
                }
                
                // Show Scrappy and store currency display
                if (scrappyContainer) {
                    scrappyContainer.style.display = 'block';
                }
                if (storeCurrencyDisplay) {
                    storeCurrencyDisplay.style.display = 'flex';
                }
                
                // Scrappy greets the player
                setTimeout(() => {
                    const greeting = this.getRandomDialogue('greeting');
                    this.showScrappyDialogue(greeting, 'regular');
                }, 500);
                
                // Start idle chatter after greeting
                setTimeout(() => {
                    this.startScrappyIdleChatter();
                }, 5000);
            },

            updateStoreCloseButton(enabled) {
                const closeButton = document.querySelector('.robot-store-close');
                if (closeButton) {
                    if (enabled) {
                        closeButton.style.opacity = '1';
                        closeButton.style.cursor = 'pointer';
                        closeButton.style.pointerEvents = 'auto';
                    } else {
                        closeButton.style.opacity = '0.3';
                        closeButton.style.cursor = 'not-allowed';
                        closeButton.style.pointerEvents = 'none';
                    }
                }
            },

            closeRobotStore() {
                // Don't allow closing if purchase is in progress
                if (this.purchaseInProgress) {
                    return;
                }
                
                const modal = document.getElementById('robotStoreModal');
                const scrappyContainer = document.getElementById('scrappyContainer');
                const storeCurrencyDisplay = document.getElementById('storeCurrencyDisplay');
                const mascotContainer = document.querySelector('.mascot-container-global');
                
                // Scrappy says goodbye
                const goodbye = this.getRandomDialogue('goodbye');
                this.showScrappyDialogue(goodbye, 'sad');
                
                // Stop idle chatter
                this.stopScrappyIdleChatter();
                
                // Close modal and hide Scrappy after goodbye message completes
                setTimeout(() => {
                    modal.classList.remove('active');
                    if (scrappyContainer) {
                        scrappyContainer.style.display = 'none';
                    }
                    if (storeCurrencyDisplay) {
                        storeCurrencyDisplay.style.display = 'none';
                    }
                    // Show user's mascot robot again
                    if (mascotContainer) {
                        mascotContainer.style.display = 'block';
                    }

                    // ===== EXIT STORE MODE: Re-enable companion robot dialogue =====
                    this.isStoreMode = false;
                    console.log('[STORE MODE] Deactivated - companion robot dialogue re-enabled');
                }, 1500);
            },

            // Store Tab Switching
            switchStoreTab(tab) {
                const robotsTabBtn = document.getElementById('robotsTabBtn');
                const itemsTabBtn = document.getElementById('itemsTabBtn');
                const robotStoreGrid = document.getElementById('robotStoreGrid');
                const itemsStoreGrid = document.getElementById('itemsStoreGrid');
                
                if (tab === 'robots') {
                    robotsTabBtn.classList.add('active');
                    itemsTabBtn.classList.remove('active');
                    robotStoreGrid.style.display = 'grid';
                    itemsStoreGrid.style.display = 'none';
                    
                    // Scrappy speaks about robots
                    const message = this.getRandomDialogue('greeting');
                    this.showScrappyDialogue(message, 'happy');
                } else if (tab === 'items') {
                    robotsTabBtn.classList.remove('active');
                    itemsTabBtn.classList.add('active');
                    robotStoreGrid.style.display = 'none';
                    itemsStoreGrid.style.display = 'grid';
                    
                    // Render items store
                    this.renderItemsStore();
                    
                    // Scrappy speaks about items
                    const itemMessages = [
                        "Need maintenance supplies? You've come to the right place!",
                        "Keep your robots running smooth with these quality items!",
                        "Battery running low? I've got just what you need!",
                        "Fresh stock of maintenance items, all top quality!"
                    ];
                    this.showScrappyDialogue(itemMessages[Math.floor(Math.random() * itemMessages.length)], 'happy');
                }
            },

            // Render Items Store
            renderItemsStore() {
                const grid = document.getElementById('itemsStoreGrid');
                if (!grid) return;
                
                grid.innerHTML = '';
                
                // Render actual items (EXACT robot store structure)
                this.storeItems.forEach(item => {
                    const owned = this.data.itemInventory[item.id] || 0;
                    const canAfford = this.data.currency >= item.cost;
                    
                    const card = document.createElement('div');
                    card.className = 'item-store-card';
                    card.innerHTML = `
                        <img src="${item.imagePath}" 
                             alt="${item.name}" 
                             class="robot-store-card-image"
                             onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<div class=\\'robot-store-card-image placeholder-icon\\'>${this.getItemEmoji(item.id)}</div>')">
                        <div class="robot-store-card-name">${item.name}</div>
                        <div class="robot-store-card-cost">
                            <img src="Imag/Achivments/Images/Finished Images/Bolt.png" alt="Bolt" class="robot-store-card-cost-bolt">
                            <span>${item.cost} Bolts</span>
                        </div>
                        <button class="robot-store-card-button" ${!canAfford ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''} onclick="app.initiateItemPurchase('${item.id}')">
                            ${canAfford ? 'BUY' : 'NOT ENOUGH BOLTS'}
                        </button>
                    `;
                    grid.appendChild(card);
                });
                
                // Add "Coming Soon" placeholder cards (EXACT robot store structure)
                for (let i = 0; i < 30; i++) {
                    const card = document.createElement('div');
                    card.className = 'item-store-card placeholder';
                    card.innerHTML = `
                        <div class="robot-store-card-image placeholder-icon">❓</div>
                        <div class="robot-store-card-name">Coming Soon</div>
                        <div class="robot-store-card-cost">
                            <img src="Imag/Achivments/Images/Finished Images/Bolt.png" alt="Bolt" class="robot-store-card-cost-bolt">
                            <span>??? Bolts</span>
                        </div>
                        <button class="robot-store-card-button" style="opacity: 0.5; cursor: not-allowed;" disabled>LOCKED</button>
                    `;
                    grid.appendChild(card);
                }
            },

            // Get emoji fallback for items
            getItemEmoji(itemId) {
                const emojis = {
                    OILDRINK: '🛢️',
                    BATTERY: '🔋',
                    MEGABATTERY: '⚡',
                    SOLARPANEL: '☀️'
                };
                return emojis[itemId] || '📦';
            },

            // Initiate Item Purchase (Show Confirmation)
            initiateItemPurchase(itemId) {
                const item = this.storeItems.find(i => i.id === itemId);
                if (!item) return;
                
                // Store the item being purchased
                this.pendingItemPurchase = item;
                
                // Get item emoji/icon
                const itemEmoji = this.getItemEmoji(itemId);
                
                // Show confirmation modal
                const modal = document.getElementById('itemPurchaseConfirmModal');
                const iconDisplay = document.getElementById('itemPurchaseIcon');
                const titleDisplay = document.getElementById('itemPurchaseTitle');
                const descriptionDisplay = document.getElementById('itemPurchaseDescription');
                const costDisplay = document.getElementById('itemPurchaseConfirmCost');
                
                // Show item image if available, otherwise show emoji
                if (item.imagePath) {
                    iconDisplay.innerHTML = `
                        <div style="width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
                            <img src="${item.imagePath}" 
                                 style="max-width: 80px; max-height: 80px; width: auto; height: auto; object-fit: contain;"
                                 onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'font-size: 48px;\\'>${itemEmoji}</div>';">
                        </div>
                    `;
                } else {
                    iconDisplay.innerHTML = `<div style="font-size: 48px;">${itemEmoji}</div>`;
                }
                
                titleDisplay.textContent = `Purchase ${item.name}?`;
                descriptionDisplay.textContent = item.description;
                costDisplay.textContent = item.cost;
                
                modal.classList.add('active');
            },
            
            // Cancel Item Purchase
            cancelItemPurchase() {
                const modal = document.getElementById('itemPurchaseConfirmModal');
                modal.classList.remove('active');
                this.pendingItemPurchase = null;
            },
            
            // Confirm Item Purchase
            confirmItemPurchase() {
                if (!this.pendingItemPurchase) return;
                
                const item = this.pendingItemPurchase;
                const itemId = item.id;
                
                // Close modal
                const modal = document.getElementById('itemPurchaseConfirmModal');
                modal.classList.remove('active');
                
                // Check if user has enough currency
                if (this.data.currency < item.cost) {
                    this.showScrappyDialogue(`You need ${item.cost} bolts! You only have ${this.data.currency}.`, 'sad');
                    this.pendingItemPurchase = null;
                    return;
                }
                
                // Deduct currency
                this.data.currency -= item.cost;
                this.updateCurrencyDisplay();
                
                // Add item to inventory
                if (!this.data.itemInventory[itemId]) {
                    this.data.itemInventory[itemId] = 0;
                }
                this.data.itemInventory[itemId]++;
                
                // Save data
                this.saveData();
                
                // Scrappy celebrates
                const purchaseMessages = [
                    `One ${item.name}, coming right up!`,
                    `Excellent choice! Here's your ${item.name}!`,
                    `Sold! Your ${item.name} is ready to use!`,
                    `Great purchase! That ${item.name} will keep your robot happy!`
                ];
                this.showScrappyDialogue(purchaseMessages[Math.floor(Math.random() * purchaseMessages.length)], 'happy');
                
                // Refresh items grid to show updated inventory
                this.renderItemsStore();
                
                console.log(`✅ Purchased ${item.name} for ${item.cost} bolts`);
                
                this.pendingItemPurchase = null;
            },
            
            // Purchase Item (Legacy - now called from confirmItemPurchase)
            purchaseItem(itemId) {
                const item = this.storeItems.find(i => i.id === itemId);
                if (!item) return;
                
                // Check if user has enough currency
                if (this.data.currency < item.cost) {
                    this.showScrappyDialogue(`You need ${item.cost} bolts! You only have ${this.data.currency}.`, 'sad');
                    return;
                }
                
                // Deduct currency
                this.data.currency -= item.cost;
                this.updateCurrencyDisplay();
                
                // Add item to inventory
                if (!this.data.itemInventory[itemId]) {
                    this.data.itemInventory[itemId] = 0;
                }
                this.data.itemInventory[itemId]++;
                
                // Save data
                this.saveData();
                
                // Scrappy celebrates
                const purchaseMessages = [
                    `One ${item.name}, coming right up!`,
                    `Excellent choice! Here's your ${item.name}!`,
                    `Sold! Your ${item.name} is ready to use!`,
                    `Great purchase! That ${item.name} will keep your robot happy!`
                ];
                this.showScrappyDialogue(purchaseMessages[Math.floor(Math.random() * purchaseMessages.length)], 'happy');
                
                // Refresh items grid to show updated inventory
                this.renderItemsStore();
                
                console.log(`✅ Purchased ${item.name} for ${item.cost} bolts`);
            },

            // Function to generate cryptic name based on robot ID
            generateCrypticName(robotId) {
                const crypticChars = ['█', '▓', '▒', '░', '▀', '▄', '■', '□', '▪', '▫', '◆', '◇', '○', '●', '◉', '◎'];
                const symbols = ['?', '!', '#', '@', '$', '%', '&', '*'];
                const length = 8 + Math.floor(Math.random() * 4);
                let cryptic = '';
                
                // Use robot ID as seed for consistent scrambling
                let seed = 0;
                for (let i = 0; i < robotId.length; i++) {
                    seed += robotId.charCodeAt(i);
                }
                
                for (let i = 0; i < length; i++) {
                    const charIndex = (seed + i) % crypticChars.length;
                    const symIndex = (seed + i * 2) % symbols.length;
                    cryptic += i % 3 === 0 ? symbols[symIndex] : crypticChars[charIndex];
                }
                
                return cryptic;
            },

            renderRobotStore() {
                const container = document.getElementById('robotStoreGrid');
                if (!container) return;

                const totalSlots = 50;
                const cards = [];

                // Filter to show only robots that are NOT owned
                const availableRobots = this.storeRobots.filter(robot => 
                    !this.data.ownedRobots.includes(robot.id)
                );

                // Add available robot cards
                availableRobots.forEach(robot => {
                    const crypticName = this.generateCrypticName(robot.id);
                    const isDisabled = this.purchaseInProgress;
                    const buttonStyle = isDisabled ? 'opacity: 0.5; cursor: not-allowed;' : '';
                    const buttonText = isDisabled ? 'PROCESSING...' : 'BUY';
                    const buttonAction = isDisabled ? '' : `onclick="event.stopPropagation(); app.initiatePurchase('${robot.id}')"`;
                    
                    cards.push(`
                        <div class="robot-store-card">
                            <img src="${robot.shadowImagePath}" 
                                 alt="Mystery Robot" 
                                 class="robot-store-card-image">
                            <div class="robot-store-card-name" style="font-family: monospace; letter-spacing: 2px;">${crypticName}</div>
                            <div class="robot-store-card-cost">
                                <img src="Imag/Achivments/Images/Finished Images/Bolt.png" alt="Bolt" class="robot-store-card-cost-bolt">
                                <span>${robot.cost} Bolts</span>
                            </div>
                            <button class="robot-store-card-button" style="${buttonStyle}" ${buttonAction} ${isDisabled ? 'disabled' : ''}>${buttonText}</button>
                        </div>
                    `);
                });

                // Fill remaining slots with placeholders
                const remainingSlots = totalSlots - cards.length;
                for (let i = 0; i < remainingSlots; i++) {
                    cards.push(`
                        <div class="robot-store-card placeholder">
                            <div class="robot-store-card-image placeholder-icon">❓</div>
                            <div class="robot-store-card-name">Coming Soon</div>
                            <div class="robot-store-card-cost">
                                <img src="Imag/Achivments/Images/Finished Images/Bolt.png" alt="Bolt" class="robot-store-card-cost-bolt">
                                <span>??? Bolts</span>
                            </div>
                            <button class="robot-store-card-button" style="opacity: 0.5; cursor: not-allowed;" disabled>LOCKED</button>
                        </div>
                    `);
                }

                container.innerHTML = cards.join('');
            },

            selectRobotFromStore(robotId) {
                this.data.selectedRobot = robotId;
                this.saveData();
                this.renderRobotStore();
                this.updateMascotImage();
                this.showSpeechBubble('Robot selected! I\'m ready to help!', 'regular');
            },

            initiatePurchase(robotId) {
                // Prevent multiple purchases during sequence
                if (this.purchaseInProgress) {
                    const busyMessage = this.getRandomDialogue('idle');
                    this.showScrappyDialogue("Hold on there! I'm still working on the last order!", 'regular');
                    return;
                }

                const robot = this.storeRobots.find(r => r.id === robotId);
                if (!robot) {
                    console.error('Robot not found:', robotId);
                    return;
                }

                console.log('Initiating purchase for robot:', robot.name, 'Clue:', robot.clue);

                // Store the robot being purchased
                this.pendingPurchase = robot;

                // Show confirmation modal
                const modal = document.getElementById('purchaseConfirmModal');
                const costDisplay = document.getElementById('purchaseConfirmCost');
                const messageDisplay = document.getElementById('purchaseConfirmMessage');
                
                if (!modal || !costDisplay || !messageDisplay) {
                    console.error('Modal elements not found!', {modal, costDisplay, messageDisplay});
                    return;
                }
                
                costDisplay.textContent = robot.cost;
                
                // Display clue instead of generic message if available
                if (robot.clue) {
                    console.log('Setting clue text:', robot.clue);
                    messageDisplay.textContent = robot.clue;
                } else {
                    console.log('No clue found, using default message');
                    messageDisplay.textContent = 'Are you sure you want to purchase this mystery robot?';
                }
                
                modal.classList.add('active');
            },

            cancelPurchase() {
                const modal = document.getElementById('purchaseConfirmModal');
                modal.classList.remove('active');
                
                // Scrappy reacts to canceled purchase
                if (this.pendingPurchase) {
                    const cancelMessage = this.getRandomDialogue('canceled');
                    this.showScrappyDialogue(cancelMessage, 'mad');
                }
                
                this.pendingPurchase = null;
                // Clear purchase lock
                this.purchaseInProgress = false;
                this.updateStoreCloseButton(true); // Re-enable close button
            },

            confirmPurchase() {
                if (!this.pendingPurchase) return;

                // Set purchase lock
                this.purchaseInProgress = true;
                this.updateStoreCloseButton(false); // Disable close button

                const robot = this.pendingPurchase;

                // Check if player has enough currency (unless cheat is active)
                if (!this.isObonxoCheatActive && !this.unlimitedBoltsActive && this.data.currency < robot.cost) {
                    this.cancelPurchase();
                    this.showSpeechBubble('Not enough Bolts! Complete more tasks to earn currency!', 'regular');
                    
                    // Show a styled alert
                    const alertDiv = document.createElement('div');
                    alertDiv.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: linear-gradient(135deg, #ef4444, #dc2626);
                        color: white;
                        padding: 24px 32px;
                        border-radius: 20px;
                        font-size: 18px;
                        font-weight: 600;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                        z-index: 3000;
                        text-align: center;
                        animation: shake 0.5s ease;
                    `;
                    alertDiv.textContent = '❌ Not enough Bolts!';
                    document.body.appendChild(alertDiv);
                    
                    setTimeout(() => {
                        alertDiv.style.transition = 'opacity 0.3s ease';
                        alertDiv.style.opacity = '0';
                        setTimeout(() => alertDiv.remove(), 300);
                    }, 2000);
                    
                    return;
                }

                // Deduct currency (only if cheat is not active)
                if (!this.isObonxoCheatActive || this.unlimitedBoltsActive) {
                    this.deductCurrency(robot.cost);
                }

                // Add robot to owned list
                this.data.ownedRobots.push(robot.id);
                
                // Initialize durability for new robot
                this.initializeRobotDurability(robot.id);
                
                this.saveData();

                // Scrappy celebrates successful purchase
                const purchaseMessage = this.getRandomDialogue('purchased');
                this.showScrappyDialogue(purchaseMessage, 'happy');

                // Close confirmation modal (don't trigger cancel dialogue)
                const modal = document.getElementById('purchaseConfirmModal');
                modal.classList.remove('active');
                this.pendingPurchase = null;

                // Update the store display to remove purchased robot
                this.renderRobotStore();
                this.updateCurrencyDisplay();

                // Show reveal animation after Scrappy finishes speaking
                setTimeout(() => {
                    this.showRobotReveal(robot);
                }, 4500); // Wait for Scrappy's purchase message to finish (4 seconds + buffer)
            },

            showRobotReveal(robot) {
                const modal = document.getElementById('robotRevealModal');
                const image = document.getElementById('robotRevealImage');
                const name = document.getElementById('robotRevealName');

                image.src = robot.actualImagePath;
                name.textContent = robot.name;

                modal.classList.add('active');

                // Clear purchase lock as soon as reveal appears - buttons become clickable again
                this.purchaseInProgress = false;
                this.updateStoreCloseButton(true); // Re-enable close button
                // Update store display to show clickable buttons
                this.renderRobotStore();

                // Scrappy celebrates instead of mascot (since we're in the store)
                const celebrationMessage = `Excellent choice! ${robot.name} is all yours now!`;
                this.showScrappyDialogue(celebrationMessage, 'happy');
            },

            closeReveal() {
                const modal = document.getElementById('robotRevealModal');
                modal.classList.remove('active');
                
                // Check if we're in the store - if so, keep store open
                const storeModal = document.getElementById('robotStoreModal');
                if (storeModal && storeModal.classList.contains('active')) {
                    // We're still in the store, continue idle chatter
                    setTimeout(() => {
                        this.startScrappyIdleChatter();
                    }, 1000);
                } else {
                    // Refresh robot select to show new robot if robot select is open
                    if (document.getElementById('robotSelectModal').style.display === 'flex') {
                        this.renderRobotOptions();
                    }
                }
            },

            createNewSaveFile() {
                const saveName = prompt('Enter a name for your new save file:');
                if (!saveName || !saveName.trim()) {
                    return;
                }

                const sanitizedName = saveName.trim().replace(/[^a-zA-Z0-9 ]/g, '').substring(0, 50);
                if (!sanitizedName) {
                    alert('Please enter a valid save name!');
                    return;
                }

                // Check if save already exists
                const existingData = localStorage.getItem(`upkeepData_${sanitizedName}`);
                if (existingData) {
                    if (!confirm(`A save named "${sanitizedName}" already exists. Overwrite it?`)) {
                        return;
                    }
                }

                // Create fresh data with only default robot owned
                this.data = {
                    categories: [],
                    currentCategoryId: null,
                    currentTaskId: null,
                    currentSaveFile: sanitizedName,
                    lastSaveTime: Date.now(),
                    ttsEnabled: true,
                    activityLog: [],
                    voiceStyle: 'robotic',
                    voicePitch: 1.5,
                    voiceRate: 1.2,
                    scrappyPitch: 0.5,
                    scrappyRate: 1.3,
                    selectedRobotId: 'default',
                    currency: 250,
                    ownedRobots: ['default'],
                    currentDeck: [],
                    savedDecks: []
                };

                // Save the new file
                this.saveData();

                // Close settings modal and refresh
                this.closeModal('settingsModal');
                this.render();

                alert(`New save "${sanitizedName}" created! Starting fresh with only the Default Bot.`);
                this.showSpeechBubble('Welcome to your new adventure!', 'regular');
            },

            // Combat Tester Functions
            openCombatTester() {
                console.log('🎯 Opening Combat Tester...');
                const modal = document.getElementById('combatTesterModal');
                console.log('Modal element:', modal);
                if (modal) {
                    modal.classList.add('active');
                    this.populateRobotSelectors();
                    this.updateRobotInfo();
                    console.log('✅ Combat Tester opened successfully');
                } else {
                    console.error('❌ Combat Tester modal not found!');
                }
            },
            
            closeCombatTester() {
                const modal = document.getElementById('combatTesterModal');
                modal.classList.remove('active');
            },
            
            populateRobotSelectors() {
                console.log('🤖 Populating robot selectors...');
                const attackerSelect = document.getElementById('attackerSelect');
                const defenderSelect = document.getElementById('defenderSelect');
                console.log('Attacker select:', attackerSelect);
                console.log('Defender select:', defenderSelect);
                
                const robots = RobotDatabase.getAllRobots();
                console.log('Available robots:', robots.length, robots);
                
                // Clear existing options
                attackerSelect.innerHTML = '';
                defenderSelect.innerHTML = '';
                
                // Populate with robot options
                robots.forEach(robot => {
                    const option1 = document.createElement('option');
                    option1.value = robot.id;
                    option1.textContent = `${robot.name} (${robot.role})`;
                    attackerSelect.appendChild(option1);
                    
                    const option2 = document.createElement('option');
                    option2.value = robot.id;
                    option2.textContent = `${robot.name} (${robot.role})`;
                    defenderSelect.appendChild(option2);
                });
                
                // Set default selections (different robots)
                if (robots.length >= 2) {
                    attackerSelect.value = robots[0].id;
                    defenderSelect.value = robots[1].id;
                }
                
                // Add change listeners
                attackerSelect.addEventListener('change', () => this.updateRobotInfo());
                defenderSelect.addEventListener('change', () => this.updateRobotInfo());
            },
            
            updateRobotInfo() {
                const attackerSelect = document.getElementById('attackerSelect');
                const defenderSelect = document.getElementById('defenderSelect');
                const attackerInfo = document.getElementById('attackerInfo');
                const defenderInfo = document.getElementById('defenderInfo');
                
                if (attackerSelect.value) {
                    const robot = RobotDatabase.getRobot(attackerSelect.value);
                    attackerInfo.innerHTML = this.formatRobotInfo(robot);
                }
                
                if (defenderSelect.value) {
                    const robot = RobotDatabase.getRobot(defenderSelect.value);
                    defenderInfo.innerHTML = this.formatRobotInfo(robot);
                }
            },
            
            formatRobotInfo(robot) {
                let html = `
                    <h4>${robot.name}</h4>
                    <div class="robot-stats">${robot.mp} MP • ${robot.role} • ${robot.rarity}</div>
                    <div class="robot-wheel">
                `;
                
                robot.wheel.forEach(segment => {
                    const color = CombatSystem.getMoveColor(segment.moveType);
                    const textColor = segment.moveType === 'White' ? '#000' : '#fff';
                    const text = CombatSystem.formatMoveText(segment);
                    
                    html += `
                        <div class="wheel-segment" style="background: ${color}; color: ${textColor};">
                            <span>${text}</span>
                            <span>${segment.size}/96</span>
                        </div>
                    `;
                });
                
                html += '</div>';
                return html;
            },
            
            runCombatTest() {
                const attackerSelect = document.getElementById('attackerSelect');
                const defenderSelect = document.getElementById('defenderSelect');
                
                if (!attackerSelect.value || !defenderSelect.value) {
                    alert('Please select both robots!');
                    return;
                }
                
                const battle = CombatSystem.simulateBattle(attackerSelect.value, defenderSelect.value);
                this.displayBattleResults(battle);
                this.updateCombatStats(battle);
            },
            
            displayBattleResults(battle) {
                // Store the battle result for visual replay
                this.lastBattleResult = battle;
                
                const resultsDiv = document.getElementById('combatResults');
                const outcomeDiv = document.getElementById('battleOutcome');
                const detailsDiv = document.getElementById('spinDetails');
                
                resultsDiv.style.display = 'block';
                
                // Show outcome
                let outcomeText = '';
                let outcomeColor = '';
                
                if (battle.result === 'attacker_wins') {
                    outcomeText = `🏆 ${battle.attacker.robot.name} Wins!`;
                    outcomeColor = '#4CAF50';
                } else if (battle.result === 'defender_wins') {
                    outcomeText = `🏆 ${battle.defender.robot.name} Wins!`;
                    outcomeColor = '#4CAF50';
                } else {
                    outcomeText = '🤝 Draw!';
                    outcomeColor = '#FFC107';
                }
                
                outcomeDiv.innerHTML = `<div style="color: ${outcomeColor};">${outcomeText}</div>`;
                
                // Show spin details
                detailsDiv.innerHTML = `
                    <div class="spin-result">
                        <h4>${battle.attacker.robot.name}</h4>
                        <div style="color: ${CombatSystem.getMoveColor(battle.attacker.spin.result.moveType)};">
                            ${CombatSystem.formatMoveText(battle.attacker.spin.result)}
                        </div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 5px;">
                            Spin: ${battle.attacker.spin.spinValue}/96
                        </div>
                    </div>
                    <div class="spin-result">
                        <h4>${battle.defender.robot.name}</h4>
                        <div style="color: ${CombatSystem.getMoveColor(battle.defender.spin.result.moveType)};">
                            ${CombatSystem.formatMoveText(battle.defender.spin.result)}
                        </div>
                        <div style="font-size: 12px; color: var(--text-secondary); margin-top: 5px;">
                            Spin: ${battle.defender.spin.spinValue}/96
                        </div>
                    </div>
                `;
            },
            
            combatStats: {
                total: 0,
                attackerWins: 0,
                defenderWins: 0,
                draws: 0
            },
            
            updateCombatStats(battle) {
                this.combatStats.total++;
                
                if (battle.result === 'attacker_wins') {
                    this.combatStats.attackerWins++;
                } else if (battle.result === 'defender_wins') {
                    this.combatStats.defenderWins++;
                } else {
                    this.combatStats.draws++;
                }
                
                this.displayCombatStats();
            },
            
            displayCombatStats() {
                document.getElementById('totalBattles').textContent = this.combatStats.total;
                document.getElementById('attackerWins').textContent = this.combatStats.attackerWins;
                document.getElementById('defenderWins').textContent = this.combatStats.defenderWins;
                document.getElementById('draws').textContent = this.combatStats.draws;
            },
            
            runMultipleBattles(count) {
                const attackerSelect = document.getElementById('attackerSelect');
                const defenderSelect = document.getElementById('defenderSelect');
                
                if (!attackerSelect.value || !defenderSelect.value) {
                    alert('Please select both robots!');
                    return;
                }
                
                for (let i = 0; i < count; i++) {
                    const battle = CombatSystem.simulateBattle(attackerSelect.value, defenderSelect.value);
                    this.updateCombatStats(battle);
                }
                
                // Show the last battle result
                const lastBattle = CombatSystem.simulateBattle(attackerSelect.value, defenderSelect.value);
                this.displayBattleResults(lastBattle);
                this.updateCombatStats(lastBattle);
            },
            
            resetCombatStats() {
                this.combatStats = {
                    total: 0,
                    attackerWins: 0,
                    defenderWins: 0,
                    draws: 0
                };
                this.displayCombatStats();
                
                // Hide results
                document.getElementById('combatResults').style.display = 'none';
            },
            
            // Visual Data Disk Battle System
            lastBattleResult: null,
            
            async showVisualBattle() {
                if (!this.lastBattleResult) {
                    alert('Run a battle first to see the visual replay!');
                    return;
                }
                
                const modal = document.getElementById('diskBattleModal');
                modal.classList.add('active');
                
                await this.setupVisualBattle(this.lastBattleResult);
                this.startDiskAnimation();
                
                // Initialize the new spinning system
                this.initializeDiskSpinning();
            },
            
            closeDiskBattle() {
                const modal = document.getElementById('diskBattleModal');
                modal.classList.remove('active');
                
                // Reset disk states
                document.getElementById('attackerDisk').className = 'data-disk';
                document.getElementById('defenderDisk').className = 'data-disk';
                
                // Reset diamond pointer
                const diamond = document.getElementById('diamondPointer');
                diamond.className = 'diamond-shape';
                
                // Clean up sparks
                const sparksContainer = document.querySelector('.sparks-container');
                if (sparksContainer) {
                    sparksContainer.remove();
                }
                
                // Reset wheel animations (SVG and Image)
                const wheelElements = document.querySelectorAll('.disk-wheel svg, .disk-wheel .wheel-image');
                wheelElements.forEach(element => {
                    element.className = element.classList.contains('wheel-image') ? 'wheel-image' : '';
                    element.style.transform = 'rotate(0deg)';
                });
                
                // Clear wheel overlays
                const overlays = document.querySelectorAll('.wheel-overlay');
                overlays.forEach(overlay => {
                    overlay.innerHTML = '';
                    overlay.style.opacity = '0';
                });
                
                document.getElementById('diskBattleOutcome').style.display = 'none';
                document.getElementById('moveDetails').style.display = 'none';
                document.getElementById('continueBtn').style.display = 'none';
                
                // Hide respin button
                const respinContainer = document.getElementById('respinButtonContainer');
                if (respinContainer) {
                    respinContainer.style.display = 'none';
                }
                
                // Hide battle results section
                const battleResultsSection = document.getElementById('battleResultsSection');
                if (battleResultsSection) {
                    battleResultsSection.style.display = 'none';
                }
                
                // Hide live spin results
                const liveSpinResults = document.getElementById('liveSpinResults');
                if (liveSpinResults) {
                    liveSpinResults.style.display = 'none';
                }
            },
            
            // Respin Both Wheels (for testing/replay)
            respinBothWheels() {
                console.log(`\n🔄 ═══════════════════════════════════════`);
                console.log(`🔄 USER CLICKED RESPIN - STARTING FRESH BATTLE`);
                console.log(`🔄 ═══════════════════════════════════════`);
                
                // Validate diskSpinner and currentVisualBattle exist
                if (!this.diskSpinner) {
                    console.error('❌ diskSpinner not initialized!');
                    return;
                }
                
                if (!this.diskSpinner.currentVisualBattle) {
                    console.error('❌ No active battle to respin!');
                    return;
                }
                
                // Get both wheel elements and data maps
                const attackerWheel = document.getElementById('attackerWheel');
                const defenderWheel = document.getElementById('defenderWheel');
                
                if (!attackerWheel || !defenderWheel) {
                    console.error('❌ Wheel containers not found!', {attackerWheel, defenderWheel});
                    return;
                }
                
                const attackerElement = attackerWheel.querySelector('svg, img');
                const defenderElement = defenderWheel.querySelector('svg, img');
                
                if (!attackerElement || !defenderElement) {
                    console.error('❌ Wheel elements not found!', {attackerElement, defenderElement});
                    return;
                }
                
                const attackerDataMap = this.diskSpinner.generateDiskBlueprint(this.diskSpinner.currentVisualBattle.attacker.robot);
                const defenderDataMap = this.diskSpinner.generateDiskBlueprint(this.diskSpinner.currentVisualBattle.defender.robot);
                
                const topMoveDisplay = document.getElementById('top-move-display');
                const bottomMoveDisplay = document.getElementById('bottom-move-display');
                
                // Clear previous results
                console.log('   🧹 Clearing wheelResults:', this.diskSpinner.wheelResults);
                this.diskSpinner.wheelResults = {};
                console.log('   ✅ wheelResults cleared:', this.diskSpinner.wheelResults);
                
                // CRITICAL: Keep the battle results section visible but clear the winner display
                const battleResultsSection = document.getElementById('battleResultsSection');
                if (battleResultsSection) {
                    // Keep section visible so button remains accessible
                    battleResultsSection.style.display = 'block';
                    
                    // Clear the winner display content
                    const winnerText = document.getElementById('winnerText');
                    const winnerReason = document.getElementById('winnerReason');
                    if (winnerText) winnerText.textContent = '⏳ Spinning...';
                    if (winnerReason) winnerReason.textContent = 'Determining outcome...';
                    
                    // Clear move result displays
                    const attackerMoveName = document.getElementById('attackerMoveName');
                    const attackerMoveType = document.getElementById('attackerMoveType');
                    const attackerMovePower = document.getElementById('attackerMovePower');
                    const defenderMoveName = document.getElementById('defenderMoveName');
                    const defenderMoveType = document.getElementById('defenderMoveType');
                    const defenderMovePower = document.getElementById('defenderMovePower');
                    
                    if (attackerMoveName) attackerMoveName.textContent = 'Spinning...';
                    if (attackerMoveType) attackerMoveType.textContent = '-';
                    if (attackerMovePower) attackerMovePower.textContent = '-';
                    if (defenderMoveName) defenderMoveName.textContent = 'Spinning...';
                    if (defenderMoveType) defenderMoveType.textContent = '-';
                    if (defenderMovePower) defenderMovePower.textContent = '-';
                    
                    console.log('   🧹 Cleared previous battle results, keeping section visible');
                } else {
                    console.warn('   ⚠️ battleResultsSection not found!');
                }
                
                // Update spin counter and reset live results
                this.diskSpinner.updateSpinCounter();
                document.getElementById('attackerSpinResult').textContent = 'Spinning...';
                document.getElementById('attackerSpinType').textContent = '-';
                document.getElementById('attackerSpinPower').textContent = '-';
                document.getElementById('defenderSpinResult').textContent = 'Spinning...';
                document.getElementById('defenderSpinType').textContent = '-';
                document.getElementById('defenderSpinPower').textContent = '-';
                
                // Update displays
                if (topMoveDisplay) topMoveDisplay.textContent = 'Respinning...';
                if (bottomMoveDisplay) bottomMoveDisplay.textContent = 'Respinning...';
                
                console.log('   ✅ Starting respin for both wheels...');
                
                // Execute BOTH respins with slight delay to ensure animations restart properly
                this.diskSpinner.executeFullRespin(attackerElement, attackerDataMap, bottomMoveDisplay, 'attacker');
                
                // Small delay before starting second respin to ensure browser processes first one
                setTimeout(() => {
                    this.diskSpinner.executeFullRespin(defenderElement, defenderDataMap, topMoveDisplay, 'defender');
                }, 20);
            },
            
            // Initialize Data Disk Spinning System
            initializeDiskSpinning() {
                const topDisk = document.getElementById('top-disk');
                const bottomDisk = document.getElementById('bottom-disk');
                const spinButton = document.getElementById('spin-button');
                
                if (!topDisk || !bottomDisk || !spinButton) {
                    console.log('⚠️ Disk spinning elements not found');
                    return;
                }
                
                // Main battle function triggered by VS button click
                const startBattle = () => {
                    console.log('🎯 Starting Data Disk Battle!');
                    
                    // --- 1. Calculate Random Stopping Points ---
                    // Add 5 full rotations (5 * 360) to random degrees for better visual effect
                    const randomTopDegrees = Math.floor(Math.random() * 360) + (360 * 5);
                    const randomBottomDegrees = Math.floor(Math.random() * 360) + (360 * 5);
                    
                    console.log(`🔴 Top disk will stop at: ${randomTopDegrees}°`);
                    console.log(`🔵 Bottom disk will stop at: ${randomBottomDegrees}°`);
                    
                    // --- 2. Start the Visual Spin ---
                    // Find the actual wheel elements (SVG or IMG)
                    const topWheelElement = topDisk.querySelector('.disk-wheel svg, .disk-wheel img');
                    const bottomWheelElement = bottomDisk.querySelector('.disk-wheel svg, .disk-wheel img');
                    
                    if (topWheelElement && bottomWheelElement) {
                        topWheelElement.classList.add('spinning');
                        bottomWheelElement.classList.add('spinning');
                        
                        // Prevent button clicks during spin
                        spinButton.style.pointerEvents = 'none';
                        spinButton.style.opacity = '0.6';
                        spinButton.textContent = 'SPINNING...';
                        
                        // --- 3. Set Timer to Stop the Spin ---
                        // Let wheels spin for 3 seconds before stopping
                        setTimeout(() => {
                            // --- 4. Stop Animation and Set Final Position ---
                            
                            // Remove spinning class to stop infinite animation
                            topWheelElement.classList.remove('spinning');
                            bottomWheelElement.classList.remove('spinning');
                            
                            // Set final calculated random rotation
                            // Wheels will smoothly animate to final position
                            topWheelElement.style.transform = `rotate(${randomTopDegrees}deg)`;
                            bottomWheelElement.style.transform = `rotate(${randomBottomDegrees}deg)`;
                            
                            console.log('🎯 Disks stopped! Calculating battle results...');
                            
                            // Calculate which moves were selected based on final angles
                            setTimeout(() => {
                                this.calculateSpinResults(randomTopDegrees, randomBottomDegrees);
                                
                                // Re-enable button after results
                                spinButton.style.pointerEvents = 'auto';
                                spinButton.style.opacity = '1';
                                spinButton.textContent = 'VS';
                            }, 1000); // Wait for smooth rotation to finish
                            
                        }, 3000); // 3 seconds of spinning
                    }
                };
                
                // --- 5. Listen for VS Button Click ---
                spinButton.addEventListener('click', startBattle);
                console.log('✅ Data Disk spinning system initialized');
            },
            
            // Calculate which moves were selected based on final rotation angles
            calculateSpinResults(topAngle, bottomAngle) {
                // Convert angles to 0-360 range
                const topFinalAngle = topAngle % 360;
                const bottomFinalAngle = bottomAngle % 360;
                
                console.log(`🎯 Final angles - Top: ${topFinalAngle}°, Bottom: ${bottomFinalAngle}°`);
                
                // Show the results
                const outcomeDiv = document.getElementById('diskBattleOutcome');
                if (outcomeDiv) {
                    outcomeDiv.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <h3>🎯 BATTLE RESULTS</h3>
                            <p>Opponent wheel stopped at: ${topFinalAngle.toFixed(1)}°</p>
                            <p>Your wheel stopped at: ${bottomFinalAngle.toFixed(1)}°</p>
                            <p style="color: #ffd93d; font-weight: bold;">Battle complete!</p>
                        </div>
                    `;
                    outcomeDiv.style.display = 'block';
                    
                    // Show continue button
                    const continueBtn = document.getElementById('continueBtn');
                    if (continueBtn) {
                        continueBtn.style.display = 'block';
                    }
                }
            },
            
            async setupVisualBattle(battle) {
                // Set robot names
                document.getElementById('attackerName').textContent = battle.attacker.robot.name;
                document.getElementById('defenderName').textContent = battle.defender.robot.name;
                
                // Load full robot data with attack lists
                const attackerRobot = await this.loadFullRobotData(battle.attacker.robot);
                const defenderRobot = await this.loadFullRobotData(battle.defender.robot);
                
                // Create disk wheels
                this.createDiskWheel('attackerWheel', attackerRobot);
                this.createDiskWheel('defenderWheel', defenderRobot);
                
                // Store battle result with full robot data
                this.currentVisualBattle = {
                    attacker: { robot: attackerRobot, spin: battle.attacker.spin },
                    defender: { robot: defenderRobot, spin: battle.defender.spin }
                };
            },
            
            async loadFullRobotData(robot) {
                console.log(`📥 Loading full data for robot: ${robot.id || robot.name}`);
                
                // If robot already has attack_lists_by_type, return it
                if (robot.attack_lists_by_type) {
                    console.log(`   ✅ Robot already has attack_lists_by_type`);
                    return robot;
                }
                
                // EMBEDDED DATA for Alaka-bot (to avoid CORS issues with file:// protocol)
                if (robot.id === 'alaka-bot') {
                    console.log(`   ✅ Using embedded data for alaka-bot`);
                    const alakabotData = {
                        attack_lists_by_type: {
                            basic: [
                                { attack_name: "Stillblind", attack_type: "Purple", attack_value: "★★★", attack_start_angle_deg: 0, attack_end_angle_deg: 89.9999 },
                                { attack_name: "Miss", attack_type: "Red", attack_value: "", attack_start_angle_deg: 90.0, attack_end_angle_deg: 104.9999 },
                                { attack_name: "Psychic", attack_type: "White", attack_value: 120, attack_start_angle_deg: 105.0, attack_end_angle_deg: 194.9999 },
                                { attack_name: "Psyshock", attack_type: "Purple", attack_value: "★★★★", attack_start_angle_deg: 195.0, attack_end_angle_deg: 284.9999 },
                                { attack_name: "Psycho Shift", attack_type: "Blue", attack_value: "", attack_start_angle_deg: 285.0, attack_end_angle_deg: 359.9999 }
                            ]
                        }
                    };
                    return { ...robot, ...alakabotData };
                }
                
                // For other robots, generate from their wheel if available
                if (robot.wheel && robot.wheel.length > 0) {
                    console.log(`   ✅ Generating attack_lists_by_type from robot.wheel (${robot.wheel.length} moves)`);
                    
                    // Calculate angles based on segment sizes
                    let currentAngle = 0;
                    const totalSize = robot.wheel.reduce((sum, move) => sum + move.size, 0);
                    const degreesPerSegment = 360 / totalSize;
                    
                    const attacks = robot.wheel.map((move) => {
                        const startAngle = currentAngle;
                        const endAngle = currentAngle + (move.size * degreesPerSegment) - 0.0001;
                        currentAngle = endAngle + 0.0001;
                        
                        return {
                            attack_name: move.moveName,
                            attack_type: move.moveType,
                            attack_value: move.damage || (move.stars ? '★'.repeat(move.stars) : ''),
                            attack_start_angle_deg: startAngle,
                            attack_end_angle_deg: endAngle
                        };
                    });
                    
                    console.log(`   📊 Generated ${attacks.length} attacks:`, attacks.map(a => `${a.attack_name}(${a.attack_start_angle_deg.toFixed(1)}°-${a.attack_end_angle_deg.toFixed(1)}°)`));
                    return {
                        ...robot,
                        attack_lists_by_type: { basic: attacks }
                    };
                }
                
                // Return original robot if no data available
                console.log(`   ⚠️ No wheel data available for ${robot.id}`);
                return robot;
            },
            
            createDiskWheel(wheelId, robot) {
                const wheel = document.getElementById(wheelId);
                wheel.innerHTML = '';
                
                // Check if robot has pre-made wheel images (like Alaka-bot)
                if (robot.id === 'alaka-bot') {
                    this.createImageBasedWheel(wheel, robot);
                } else {
                    // Create SVG Data Disk using precise mathematical segmentation
                    const svg = this.generateDataDiskSVG(robot);
                    wheel.appendChild(svg);
                }
            },
            
            // Create wheel using pre-made images
            createImageBasedWheel(wheelContainer, robot) {
                // Check for enhanced 3D rendered assets first
                const has3DAssets = this.check3DAssetAvailability(robot.id);
                
                const wheelImage = document.createElement('img');
                if (has3DAssets) {
                    // Use 3D rendered static disk
                    wheelImage.src = `Imag/Battle/example/3D_Renders/${robot.id}_standard_disk.png`;
                } else {
                    // Fallback to original wheel image
                    wheelImage.src = 'Imag/Battle/example/Attack_Wheels/basic_attack_wheel.png';
                }
                
                wheelImage.style.width = '100%';
                wheelImage.style.height = '100%';
                wheelImage.style.borderRadius = '50%';
                wheelImage.classList.add('wheel-image');
                
                // Store robot data for selection detection
                wheelImage.dataset.robotId = robot.id;
                wheelImage.dataset.has3D = has3DAssets;
                
                // Create overlay for highlighting selected moves
                const overlay = document.createElement('div');
                overlay.className = 'wheel-overlay';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.borderRadius = '50%';
                overlay.style.pointerEvents = 'none';
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                
                wheelContainer.appendChild(wheelImage);
                wheelContainer.appendChild(overlay);
            },
            
            // Check if 3D rendered assets are available
            check3DAssetAvailability(robotId) {
                // This will check for the existence of 3D rendered assets
                // For now, return false until assets are generated
                return false; // Set to true once 3D assets are available
            },
            
            // Bulk import battle data from Battle-data directory
            async importBattleData() {
                console.log('🔄 Starting bulk import of battle data...');
                
                // List of all units to import (based on directory listing)
                const unitList = [
                    'Unit-001_UC_0', 'Unit-002_C_0', 'Unit-002_C_1', 'Unit-003_EX_0', 'Unit-003_EX_1', 'Unit-003_EX_2',
                    'Unit-004_UC_0', 'Unit-005_C_0', 'Unit-005_C_1', 'Unit-006_EX_0', 'Unit-006_EX_1', 'Unit-006_EX_2',
                    'Unit-007_UC_0', 'Unit-008_C_0', 'Unit-008_C_1', 'Unit-009_EX_0', 'Unit-009_EX_1', 'Unit-009_EX_2',
                    'Unit-010_UC_0', 'Unit-011_UC_0', 'Unit-011_UC_1', 'Unit-012_UC_0', 'Unit-012_UC_1', 'Unit-012_UC_2',
                    'Unit-013_C_0', 'Unit-014_UC_0', 'Unit-014_UC_1', 'Unit-015_C_0', 'Unit-015_C_1', 'Unit-015_C_2',
                    'Unit-019_C_0', 'Unit-020_C_0', 'Unit-020_C_1', 'Unit-021_C_0', 'Unit-023_C_0', 'Unit-024_UC_0',
                    'Unit-024_UC_1', 'Unit-025_R_0', 'Unit-025_UC_0', 'Unit-026_UC_0', 'Unit-026_UC_1', 'Unit-027_C_0',
                    'Unit-039_R_0', 'Unit-040_R_0', 'Unit-040_R_1', 'Unit-041_C_0', 'Unit-042_UC_0', 'Unit-042_UC_1',
                    'Unit-050_UC_0', 'Unit-052_R_0', 'Unit-054_UC_0', 'Unit-056_C_0', 'Unit-058_R_0', 'Unit-059_EX_0',
                    'Unit-059_EX_1', 'Unit-060_C_0', 'Unit-061_UC_0', 'Unit-061_UC_1', 'Unit-062_R_0', 'Unit-062_R_1',
                    'Unit-062_R_2', 'Unit-063_R_0', 'Unit-065_EX_0', 'Unit-065_EX_1', 'Unit-065_EX_2', 'Unit-066_C_0',
                    'Unit-068_R_0', 'Unit-068_R_1', 'Unit-068_R_2', 'Unit-069_UC_0', 'Unit-072_UC_0', 'Unit-072_UC_1',
                    'Unit-073_R_0', 'Unit-073_R_1', 'Unit-074_C_0', 'Unit-075_C_0', 'Unit-075_C_1', 'Unit-076_UC_0',
                    'Unit-076_UC_1', 'Unit-077_UC_0', 'Unit-078_R_0', 'Unit-078_R_1', 'Unit-079_R_0', 'Unit-081_C_0',
                    'Unit-082_R_0', 'Unit-082_R_1', 'Unit-084_C_0', 'Unit-092_R_0', 'Unit-093_UC_0', 'Unit-093_UC_1',
                    'Unit-094_EX_0', 'Unit-094_EX_1', 'Unit-094_EX_2', 'Unit-095_R_0', 'Unit-096_C_0', 'Unit-097_R_0',
                    'Unit-097_R_1', 'Unit-100_UC_0', 'Unit-101_R_0', 'Unit-101_R_1', 'Unit-102_C_0', 'Unit-103_UC_0',
                    'Unit-103_UC_1', 'Unit-109_C_0', 'Unit-110_UC_0', 'Unit-110_UC_1', 'Unit-111_C_0', 'Unit-112_UC_0',
                    'Unit-114_UC_0', 'Unit-115_EX_0', 'Unit-118_UC_0', 'Unit-119_UC_0', 'Unit-119_UC_1', 'Unit-123_UC_0',
                    'Unit-125_R_0', 'Unit-126_R_0', 'Unit-127_EX_0', 'Unit-127_R_0', 'Unit-128_C_0', 'Unit-129_C_0',
                    'Unit-130_EX_0', 'Unit-130_EX_1', 'Unit-130_R_0', 'Unit-130_R_1', 'Unit-131_R_0', 'Unit-133_R_0',
                    'Unit-134_R_0', 'Unit-134_R_1', 'Unit-135_R_0', 'Unit-135_R_1', 'Unit-136_R_0', 'Unit-136_R_1',
                    'Unit-138_UC_0', 'Unit-139_R_0', 'Unit-139_R_1', 'Unit-140_UC_0', 'Unit-142_EX_0', 'Unit-142_R_0',
                    'Unit-143_EX_0', 'Unit-144_EX_0', 'Unit-145_EX_0', 'Unit-146_EX_0', 'Unit-147_R_0', 'Unit-148_R_0',
                    'Unit-148_R_1', 'Unit-149_EX_0', 'Unit-149_EX_1', 'Unit-149_EX_2', 'Unit-150_EX_0', 'Unit-151_EX_0'
                ];
                
                let importedCount = 0;
                let errorCount = 0;
                
                for (const unitId of unitList) {
                    try {
                        await this.importSingleUnit(unitId);
                        importedCount++;
                        console.log(`✅ Imported ${unitId} (${importedCount}/${unitList.length})`);
                    } catch (error) {
                        console.error(`❌ Failed to import ${unitId}:`, error);
                        errorCount++;
                    }
                }
                
                console.log(`🎉 Bulk import complete! ${importedCount} units imported, ${errorCount} errors`);
                
                // Refresh robot selectors if combat tester is open
                if (document.getElementById('combatTesterModal').classList.contains('active')) {
                    this.populateRobotSelectors();
                }
            },
            
            // Import a single unit from JSON data
            async importSingleUnit(unitId) {
                const jsonPath = `Imag/Battle/Battle-data/${unitId}/${unitId}_attack_JSON.json`;
                
                try {
                    const response = await fetch(jsonPath);
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    
                    const unitData = await response.json();
                    
                    // Convert to our robot database format
                    const robot = this.convertUnitToRobot(unitId, unitData);
                    
                    // Add to database
                    RobotDatabase.addRobot(robot);
                    
                } catch (error) {
                    throw new Error(`Failed to load ${jsonPath}: ${error.message}`);
                }
            },
            
            // Convert unit JSON data to robot database format
            convertUnitToRobot(unitId, unitData) {
                // Parse rarity from unit ID (e.g., Unit-001_UC_0 -> UC)
                const rarityMatch = unitId.match(/_([A-Z]+)_/);
                const rarity = rarityMatch ? rarityMatch[1] : 'C';
                
                // Determine role based on MP and rarity
                const mp = unitData.base_movement_points || 2;
                let role = 'Vanguard'; // Default
                if (mp === 3) role = 'Scout';
                else if (mp === 1) role = 'Sentinel';
                else if (rarity === 'EX') role = 'Vanguard';
                
                // Convert moves from basic attack list
                const wheel = [];
                if (unitData.attack_lists_by_type && unitData.attack_lists_by_type.basic) {
                    unitData.attack_lists_by_type.basic.forEach(attack => {
                        const move = {
                            moveName: attack.attack_name,
                            moveType: this.normalizeAttackType(attack.attack_type),
                            size: attack.attack_wheel_size,
                            effect: attack.attack_ability || 'None'
                        };
                        
                        // Add damage or stars
                        if (attack.attack_value && !isNaN(attack.attack_value)) {
                            move.damage = parseInt(attack.attack_value);
                        } else if (attack.attack_value && attack.attack_value.includes('★')) {
                            move.stars = attack.attack_value.length;
                        }
                        
                        wheel.push(move);
                    });
                }
                
                // Create robot object
                return {
                    id: unitId.toLowerCase().replace(/_/g, '-'),
                    name: unitData.pokemon_name || unitId,
                    rarity: rarity,
                    mp: mp,
                    role: role,
                    type: unitData.pokemon_type || 'Normal',
                    description: `${rarity} rarity unit with ${mp} movement points.`,
                    image: `Imag/Battle/Battle-data/${unitId}/${unitId.split('_')[0]}_sprite.png`,
                    ability: {
                        name: 'Unit Ability',
                        description: 'Special unit ability.'
                    },
                    wheel: wheel,
                    statusWheels: this.convertStatusWheels(unitData.attack_lists_by_type),
                    stats: this.generateStats(rarity, mp)
                };
            },
            
            // Normalize attack type to our format
            normalizeAttackType(type) {
                const typeMap = {
                    'Purple': 'Purple',
                    'White': 'White', 
                    'Blue': 'Blue',
                    'Gold': 'Gold',
                    'Red': 'Red',
                    'purple': 'Purple',
                    'white': 'White',
                    'blue': 'Blue',
                    'gold': 'Gold',
                    'red': 'Red'
                };
                return typeMap[type] || 'White';
            },
            
            // Convert status wheels if they exist
            convertStatusWheels(attackLists) {
                const statusWheels = {};
                
                // Convert each status condition
                ['poisoned', 'paralyzed', 'burned', 'frozen', 'asleep', 'confused'].forEach(status => {
                    if (attackLists[status]) {
                        statusWheels[status] = this.convertWheelMoves(attackLists[status]);
                    }
                });
                
                return statusWheels;
            },
            
            // Convert wheel moves for status conditions
            convertWheelMoves(moveList) {
                const wheel = [];
                moveList.forEach(attack => {
                    const move = {
                        moveName: attack.attack_name,
                        moveType: this.normalizeAttackType(attack.attack_type),
                        size: attack.attack_wheel_size,
                        effect: attack.attack_ability || 'None'
                    };
                    
                    if (attack.attack_value && !isNaN(attack.attack_value)) {
                        move.damage = parseInt(attack.attack_value);
                    } else if (attack.attack_value && attack.attack_value.includes('★')) {
                        move.stars = attack.attack_value.length;
                    }
                    
                    wheel.push(move);
                });
                return wheel;
            },
            
            // Generate stats based on rarity and MP
            generateStats(rarity, mp) {
                const baseStats = { hp: 80, attack: 70, defense: 60, speed: 50 };
                
                // Rarity multipliers
                const rarityBonus = {
                    'C': 1.0,
                    'UC': 1.1, 
                    'R': 1.25,
                    'EX': 1.5
                };
                
                const multiplier = rarityBonus[rarity] || 1.0;
                
                return {
                    hp: Math.round(baseStats.hp * multiplier),
                    attack: Math.round(baseStats.attack * multiplier),
                    defense: Math.round(baseStats.defense * multiplier),
                    speed: Math.round(baseStats.speed * multiplier * (mp / 2))
                };
            },
            
            // Data Disk Generator - Precise Mathematical Segmentation
            generateDataDiskSVG(robot) {
                const size = 280; // SVG viewBox size
                const radius = 130; // Disk radius
                const centerX = size / 2;
                const centerY = size / 2;
                
                // Create SVG element
                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
                svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
                svg.style.borderRadius = '50%';
                
                let currentAngle = 0; // Start at top (12 o'clock)
                
                // Generate segments using exact formula: Segment Angle = (Move Size / 96) * 360
                robot.wheel.forEach((segment, index) => {
                    const segmentAngle = (segment.size / 96) * 360;
                    
                    // Create pie slice path
                    const path = this.createPieSlice(centerX, centerY, radius, currentAngle, segmentAngle);
                    
                    // Set segment color
                    const color = CombatSystem.getMoveColor(segment.moveType);
                    path.setAttribute('fill', color);
                    path.setAttribute('stroke', '#2c3e50');
                    path.setAttribute('stroke-width', '1');
                    
                    // Store segment data for selection
                    path.dataset.segmentIndex = index;
                    path.dataset.moveName = segment.moveName;
                    path.dataset.moveType = segment.moveType;
                    path.classList.add('svg-segment');
                    
                    svg.appendChild(path);
                    
                    // Add move text
                    const textAngle = currentAngle + (segmentAngle / 2);
                    const textRadius = radius * 0.7;
                    const textX = centerX + textRadius * Math.cos((textAngle - 90) * Math.PI / 180);
                    const textY = centerY + textRadius * Math.sin((textAngle - 90) * Math.PI / 180);
                    
                    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    text.setAttribute('x', textX);
                    text.setAttribute('y', textY);
                    text.setAttribute('text-anchor', 'middle');
                    text.setAttribute('dominant-baseline', 'middle');
                    text.setAttribute('font-size', '10');
                    text.setAttribute('font-weight', '700');
                    text.setAttribute('fill', segment.moveType === 'White' ? '#000' : '#fff');
                    text.setAttribute('stroke', segment.moveType === 'White' ? '#fff' : '#000');
                    text.setAttribute('stroke-width', '0.5');
                    text.textContent = segment.moveName;
                    
                    // Rotate text to follow curve
                    if (segmentAngle > 30) { // Only rotate text for larger segments
                        text.setAttribute('transform', `rotate(${textAngle}, ${textX}, ${textY})`);
                    }
                    
                    svg.appendChild(text);
                    
                    // Add damage/star values
                    if (segment.damage || segment.stars) {
                        const valueRadius = radius * 0.5;
                        const valueX = centerX + valueRadius * Math.cos((textAngle - 90) * Math.PI / 180);
                        const valueY = centerY + valueRadius * Math.sin((textAngle - 90) * Math.PI / 180);
                        
                        const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        valueText.setAttribute('x', valueX);
                        valueText.setAttribute('y', valueY);
                        valueText.setAttribute('text-anchor', 'middle');
                        valueText.setAttribute('dominant-baseline', 'middle');
                        valueText.setAttribute('font-size', '8');
                        valueText.setAttribute('font-weight', '600');
                        valueText.setAttribute('fill', segment.moveType === 'White' ? '#000' : '#fff');
                        valueText.setAttribute('stroke', segment.moveType === 'White' ? '#fff' : '#000');
                        valueText.setAttribute('stroke-width', '0.3');
                        
                        if (segment.damage) {
                            valueText.textContent = segment.damage;
                        } else if (segment.stars) {
                            valueText.textContent = '★'.repeat(segment.stars);
                        }
                        
                        svg.appendChild(valueText);
                    }
                    
                    currentAngle += segmentAngle;
                });
                
                // Add center circle
                const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                centerCircle.setAttribute('cx', centerX);
                centerCircle.setAttribute('cy', centerY);
                centerCircle.setAttribute('r', '25');
                centerCircle.setAttribute('fill', '#34495e');
                centerCircle.setAttribute('stroke', '#1a252f');
                centerCircle.setAttribute('stroke-width', '3');
                svg.appendChild(centerCircle);
                
                return svg;
            },
            
            // Create precise pie slice using SVG path
            createPieSlice(centerX, centerY, radius, startAngle, segmentAngle) {
                const startAngleRad = (startAngle - 90) * Math.PI / 180; // -90 to start at top
                const endAngleRad = (startAngle + segmentAngle - 90) * Math.PI / 180;
                
                const x1 = centerX + radius * Math.cos(startAngleRad);
                const y1 = centerY + radius * Math.sin(startAngleRad);
                const x2 = centerX + radius * Math.cos(endAngleRad);
                const y2 = centerY + radius * Math.sin(endAngleRad);
                
                const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                
                const pathData = [
                    `M ${centerX} ${centerY}`, // Move to center
                    `L ${x1} ${y1}`, // Line to start point
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc to end point
                    'Z' // Close path
                ].join(' ');
                
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathData);
                
                return path;
            },
            
            // --- DISK BLUEPRINTS FOR MOVE DETECTION ---
            // Generate move segments based on robot wheel data (96 segments total)
            generateDiskBlueprint(robot) {
                const moves = [];
                
                console.log(`🔍 Generating blueprint for robot:`, robot.id || robot.name);
                console.log(`   Has attack_lists_by_type?`, !!robot.attack_lists_by_type);
                
                // Check if robot has attack_lists_by_type (like Alaka-bot)
                if (robot.attack_lists_by_type && robot.attack_lists_by_type.basic) {
                    // Use the actual attack data from JSON
                    const attacks = robot.attack_lists_by_type.basic;
                    
                    console.log(`   ✅ Found ${attacks.length} attacks in attack_lists_by_type.basic`);
                    
                    for (const attack of attacks) {
                        moves.push({
                            name: attack.attack_name,
                            type: attack.attack_type.toLowerCase(),
                            damage: typeof attack.attack_value === 'number' ? attack.attack_value : null,
                            stars: typeof attack.attack_value === 'string' && attack.attack_value.includes('★') ? attack.attack_value : null,
                            start: attack.attack_start_angle_deg,
                            end: attack.attack_end_angle_deg,
                            ability: attack.attack_ability
                        });
                    }
                    
                    console.log(`✅ Loaded ${moves.length} moves from attack_lists_by_type for ${robot.id}`);
                    return moves;
                }
                
                console.warn(`⚠️ No attack_lists_by_type found for ${robot.id || robot.name}, using fallback`);
                
                // Fallback: 96-segment wheel
                const segmentSize = 360 / 96; // 3.75 degrees per segment
                
                if (robot.wheel) {
                    // Use actual wheel data from robot
                    for (let i = 0; i < 96; i++) {
                        const startAngle = i * segmentSize;
                        const endAngle = (i + 1) * segmentSize;
                        const move = robot.wheel[i] || { name: 'Miss', type: 'red', damage: 0 };
                        
                        moves.push({
                            name: move.name,
                            type: move.type,
                            damage: move.damage,
                            start: startAngle,
                            end: endAngle,
                            segment: i
                        });
                    }
                } else {
                    // Fallback for robots without wheel data
                    const defaultMoves = robot.moves || [
                        { name: 'Attack', type: 'white', damage: 50 },
                        { name: 'Special', type: 'purple', damage: 0 },
                        { name: 'Miss', type: 'red', damage: 0 }
                    ];
                    
                    const segmentsPerMove = Math.floor(96 / defaultMoves.length);
                    for (let i = 0; i < 96; i++) {
                        const moveIndex = Math.floor(i / segmentsPerMove) % defaultMoves.length;
                        const move = defaultMoves[moveIndex];
                        const startAngle = i * segmentSize;
                        const endAngle = (i + 1) * segmentSize;
                        
                        moves.push({
                            name: move.name,
                            type: move.type,
                            damage: move.damage,
                            start: startAngle,
                            end: endAngle,
                            segment: i
                        });
                    }
                }
                
                return moves;
            },

            startDiskAnimation() {
                console.log('═══════════════════════════════════════');
                console.log('🎯 THREE-PHASE BATTLE SYSTEM - START');
                console.log('═══════════════════════════════════════');
                
                // Get wheel elements
                const attackerWheel = document.getElementById('attackerWheel');
                const defenderWheel = document.getElementById('defenderWheel');
                const attackerElement = attackerWheel.querySelector('svg, img');
                const defenderElement = defenderWheel.querySelector('svg, img');
                
                if (!attackerElement || !defenderElement) {
                    console.error('❌ FATAL: Wheel elements not found');
                    return;
                }
                
                console.log('✅ Wheel elements located');
                
                // ═══════════════════════════════════════════════════════
                // PHASE 1: THE BLUEPRINT (Defining the Battlefield)
                // ═══════════════════════════════════════════════════════
                console.log('\n📋 PHASE 1: Creating Data Maps...');
                
                const attackerDataMap = this.generateDiskBlueprint(this.currentVisualBattle.attacker.robot);
                const defenderDataMap = this.generateDiskBlueprint(this.currentVisualBattle.defender.robot);
                
                console.log(`✅ Attacker Data Map: ${attackerDataMap.length} move segments`);
                console.log(`   First 10 segments:`, attackerDataMap.slice(0, 10).map(m => `${m.name}(${m.start}°-${m.end}°)`));
                console.log(`✅ Defender Data Map: ${defenderDataMap.length} move segments`);
                console.log(`   First 10 segments:`, defenderDataMap.slice(0, 10).map(m => `${m.name}(${m.start}°-${m.end}°)`));
                
                // Initialize battle state
                this.wheelResults = {};
                this.spinCounter = 0; // Track number of spins
                
                // Show and reset live results display
                this.showLiveSpinResults();
                this.resetLiveSpinResults();
                
                // Get display elements
                const topMoveDisplay = document.getElementById('top-move-display');
                const bottomMoveDisplay = document.getElementById('bottom-move-display');
                
                // ═══════════════════════════════════════════════════════
                // PHASE 2: THE ACTION (The Spin and Decide Sequence)
                // ═══════════════════════════════════════════════════════
                console.log('\n🎮 PHASE 2: Initiating Battle...');
                
                // Instruction 1A: Start the Visual Spin
                console.log('🌀 Starting visual spin for BOTH wheels...');
                
                // Clear any previous segment highlights
                [attackerElement, defenderElement].forEach(wheel => {
                    const paths = wheel.querySelectorAll('path');
                    paths.forEach(path => {
                        path.style.filter = '';
                        path.style.strokeWidth = '';
                        path.style.stroke = '';
                    });
                });
                console.log('✅ Previous highlights cleared');
                
                // CRITICAL: Disable transition BEFORE adding spinning class
                attackerElement.style.transition = 'none';
                defenderElement.style.transition = 'none';
                
                // Force reflow to ensure transition is disabled
                attackerElement.offsetHeight;
                defenderElement.offsetHeight;
                
                // Now add spinning class for animation
                attackerElement.classList.add('spinning');
                defenderElement.classList.add('spinning');
                
                console.log('✅ Transition disabled, spinning class added');
                
                if (topMoveDisplay) topMoveDisplay.textContent = 'Spinning...';
                if (bottomMoveDisplay) bottomMoveDisplay.textContent = 'Spinning...';
                
                this.createSparksEffect();
                
                // Instruction 1B: Set Independent Timers (LONGER SPINS - 5-8 seconds)
                const attackerTimer = 5000 + Math.random() * 3000; // 5-8 seconds
                const defenderTimer = 5000 + Math.random() * 3000; // 5-8 seconds
                
                console.log(`⏱️ Attacker timer: ${(attackerTimer/1000).toFixed(1)}s`);
                console.log(`⏱️ Defender timer: ${(defenderTimer/1000).toFixed(1)}s`);
                console.log('✅ Staggered timers set - wheels will stop independently');
                
                // Instruction 2: Execute the "Decide" Function when timer expires
                setTimeout(() => {
                    console.log(`⏰ ATTACKER TIMER EXPIRED - Calling decideFunction`);
                    try {
                        this.decideFunction(attackerElement, attackerDataMap, bottomMoveDisplay, 'attacker');
                    } catch (error) {
                        console.error(`❌ ERROR in attacker decideFunction:`, error);
                        // Emergency stop
                        attackerElement.className = '';
                        attackerElement.style.animation = 'none';
                        if (bottomMoveDisplay) bottomMoveDisplay.textContent = 'Error!';
                    }
                    
                    // Failsafe: Force stop after 2 seconds if still spinning
                    setTimeout(() => {
                        if (attackerElement.classList.contains('spinning')) {
                            console.warn(`⚠️ FAILSAFE: Force stopping attacker wheel`);
                            attackerElement.className = '';
                            attackerElement.style.animation = 'none';
                        }
                    }, 2000);
                }, attackerTimer);
                
                setTimeout(() => {
                    console.log(`⏰ DEFENDER TIMER EXPIRED - Calling decideFunction`);
                    try {
                        this.decideFunction(defenderElement, defenderDataMap, topMoveDisplay, 'defender');
                    } catch (error) {
                        console.error(`❌ ERROR in defender decideFunction:`, error);
                        // Emergency stop
                        defenderElement.className = '';
                        defenderElement.style.animation = 'none';
                        if (topMoveDisplay) topMoveDisplay.textContent = 'Error!';
                    }
                    
                    // Failsafe: Force stop after 2 seconds if still spinning
                    setTimeout(() => {
                        if (defenderElement.classList.contains('spinning')) {
                            console.warn(`⚠️ FAILSAFE: Force stopping defender wheel`);
                            defenderElement.className = '';
                            defenderElement.style.animation = 'none';
                        }
                    }, 2000);
                }, defenderTimer);
            },
            
            // ═══════════════════════════════════════════════════════
            // PHASE 2: THE "DECIDE" FUNCTION - DEFINITIVE BLUEPRINT
            // ═══════════════════════════════════════════════════════
            // CORE MANDATE: The Pointer is Law. What you see is what you get.
            // The visual outcome on screen MUST match the reported text result.
            decideFunction(wheelElement, dataMap, display, player) {
                console.log(`\n🎲 PHASE 2: DECIDE FUNCTION for ${player}`);
                console.log(`   📜 DEFINITIVE BLUEPRINT: Stop wheel first, then read pointer`);
                
                // Safety check: Ensure wheel element exists
                if (!wheelElement) {
                    console.error(`❌ ERROR: wheelElement is null for ${player}`);
                    return;
                }
                
                if (!dataMap || dataMap.length === 0) {
                    console.error(`❌ ERROR: dataMap is invalid for ${player}`);
                    // Emergency stop
                    wheelElement.classList.remove('spinning');
                    wheelElement.style.animation = 'none';
                    return;
                }
                
                // ═══════════════════════════════════════════════════════
                // STEP 1: STOP THE WHEEL AT A RANDOM FINAL ROTATION
                // ═══════════════════════════════════════════════════════
                // Generate a random final rotation (0-360 degrees)
                // Add 5 full rotations for visual drama
                const randomAngle = Math.floor(Math.random() * 360);
                const finalRotation = (360 * 5) + randomAngle;
                
                console.log(`   🎯 STEP 1: Stopping wheel at final rotation`);
                console.log(`   📐 Random angle: ${randomAngle}°`);
                console.log(`   🔄 Final rotation (with 5 spins): ${finalRotation}°`);
                
                // Stop the spinning animation
                wheelElement.classList.remove('spinning');
                wheelElement.style.animation = 'none';
                wheelElement.style.animationPlayState = 'paused';
                
                // Set the final position
                wheelElement.style.transform = `rotate(${finalRotation}deg)`;
                wheelElement.style.transition = 'transform 1s ease-out';
                
                // Force browser reflow
                void wheelElement.offsetHeight;
                
                console.log(`   ✅ Wheel stopped at ${finalRotation}°`);
                
                // ═══════════════════════════════════════════════════════
                // STEP 2: CALCULATE WHAT MOVE IS AT THE POINTER
                // ═══════════════════════════════════════════════════════
                // THE BULLETPROOF FORMULA:
                // resultAngle = (360 + pointerPosition - finalRotation) % 360
                //
                // This tells us which segment of the ORIGINAL, UN-ROTATED wheel
                // is now sitting under the FIXED pointer.
                
                let pointerPosition;
                if (player === 'defender') {
                    // OPPONENT (Top Wheel): Pointer at bottom (6 o'clock = 180°)
                    pointerPosition = 180;
                    console.log(`   🎯 OPPONENT - Pointer fixed at BOTTOM (180°)`);
                } else {
                    // PLAYER (Bottom Wheel): Pointer at top (12 o'clock = 0°)
                    pointerPosition = 0;
                    console.log(`   🎯 PLAYER - Pointer fixed at TOP (0°)`);
                }
                
                // Apply the definitive formula
                const normalizedRotation = finalRotation % 360;
                const resultAngle = (360 + pointerPosition - normalizedRotation) % 360;
                
                console.log(`   🎯 STEP 2: Calculating pointer reading`);
                console.log(`   📊 Formula: (360 + ${pointerPosition} - ${normalizedRotation}) % 360`);
                console.log(`   📍 Result Angle: ${resultAngle.toFixed(1)}°`);
                console.log(`   ✅ This is the segment from the original wheel now at the pointer`);
                
                // ═══════════════════════════════════════════════════════
                // STEP 3: LOOK UP THE MOVE IN THE DATA MAP
                // ═══════════════════════════════════════════════════════
                console.log(`   🎯 STEP 3: Consulting Data Map...`);
                
                // DEBUG: Show moves near this angle
                console.log(`   🔍 DEBUG: Moves near ${resultAngle.toFixed(1)}°:`);
                for (const move of dataMap) {
                    const distance = Math.min(
                        Math.abs(move.start - resultAngle),
                        Math.abs(move.end - resultAngle),
                        Math.abs((move.start + move.end) / 2 - resultAngle)
                    );
                    if (distance < 30) {
                        console.log(`      - ${move.name}: ${move.start}° - ${move.end}°`);
                    }
                }
                
                const selectedMove = this.consultBlueprint(resultAngle, dataMap);
                
                console.log(`   ✅ FINAL VERDICT: "${selectedMove.name}" (${selectedMove.type})`);
                console.log(`   📊 Move segment: ${selectedMove.start}° - ${selectedMove.end}°`);
                console.log(`   ✅ WYSIWYG: Visual and logical results are synchronized`);
                
                // ═══════════════════════════════════════════════════════
                // STEP 4: UPDATE DISPLAY AND RECORD RESULT
                // ═══════════════════════════════════════════════════════
                const displayText = `${selectedMove.name} (${selectedMove.type.toUpperCase()})`;
                if (display) {
                    display.textContent = displayText;
                }
                console.log(`   📺 Display updated: "${displayText}"`);
                
                // Store the result
                this.wheelResults[player] = selectedMove;
                console.log(`   💾 Result stored for ${player}`);
                
                // Update live spin results
                this.updateLiveSpinResult(player, selectedMove);
                
                // Check if battle is complete
                console.log(`   🔍 Checking for battle completion...`);
                this.checkForBattleCompletion();
            },
            
            // Show Respin Button (Testing Mode)
            showRespinButton(wheelElement, dataMap, display, player) {
                const respinContainer = document.getElementById('respinButtonContainer');
                const respinBtn = document.getElementById('respinBtn');
                const respinMessage = document.getElementById('respinMessage');
                
                if (!respinContainer || !respinBtn) {
                    console.error('❌ Respin button elements not found');
                    return;
                }
                
                // Update message to indicate BOTH wheels will respin
                respinMessage.textContent = `${player.toUpperCase()} wheel landed on boundary line - Click to respin BOTH wheels`;
                
                // Show the button
                respinContainer.style.display = 'block';
                
                console.log(`   🔘 Respin button shown (triggered by ${player})`);
                
                // Remove any existing click handlers by cloning
                const newBtn = respinBtn.cloneNode(true);
                newBtn.id = 'respinBtn'; // Ensure ID is preserved
                respinBtn.parentNode.replaceChild(newBtn, respinBtn);
                
                // Add click handler to respin BOTH wheels
                newBtn.addEventListener('click', () => {
                    console.log(`\n🔄 ═══════════════════════════════════════`);
                    console.log(`🔄 USER CLICKED RESPIN - STARTING FRESH BATTLE`);
                    console.log(`🔄 ═══════════════════════════════════════`);
                    
                    // Hide the button
                    respinContainer.style.display = 'none';
                    
                    // Get both wheel elements and data maps
                    const attackerWheel = document.getElementById('attackerWheel');
                    const defenderWheel = document.getElementById('defenderWheel');
                    const attackerElement = attackerWheel.querySelector('svg, img');
                    const defenderElement = defenderWheel.querySelector('svg, img');
                    
                    const attackerDataMap = this.generateDiskBlueprint(this.currentVisualBattle.attacker.robot);
                    const defenderDataMap = this.generateDiskBlueprint(this.currentVisualBattle.defender.robot);
                    
                    const topMoveDisplay = document.getElementById('top-move-display');
                    const bottomMoveDisplay = document.getElementById('bottom-move-display');
                    
                    // Clear previous results
                    console.log('   🧹 Clearing wheelResults:', this.wheelResults);
                    this.wheelResults = {};
                    console.log('   ✅ wheelResults cleared:', this.wheelResults);
                    
                    // CRITICAL: Keep the battle results section visible but clear the winner display
                    const battleResultsSection = document.getElementById('battleResultsSection');
                    if (battleResultsSection) {
                        // Keep section visible so button remains accessible
                        battleResultsSection.style.display = 'block';
                        
                        // Clear the winner display content
                        const winnerText = document.getElementById('winnerText');
                        const winnerReason = document.getElementById('winnerReason');
                        if (winnerText) winnerText.textContent = '⏳ Spinning...';
                        if (winnerReason) winnerReason.textContent = 'Determining outcome...';
                        
                        // Clear move result displays
                        const attackerMoveName = document.getElementById('attackerMoveName');
                        const attackerMoveType = document.getElementById('attackerMoveType');
                        const attackerMovePower = document.getElementById('attackerMovePower');
                        const defenderMoveName = document.getElementById('defenderMoveName');
                        const defenderMoveType = document.getElementById('defenderMoveType');
                        const defenderMovePower = document.getElementById('defenderMovePower');
                        
                        if (attackerMoveName) attackerMoveName.textContent = 'Spinning...';
                        if (attackerMoveType) attackerMoveType.textContent = '-';
                        if (attackerMovePower) attackerMovePower.textContent = '-';
                        if (defenderMoveName) defenderMoveName.textContent = 'Spinning...';
                        if (defenderMoveType) defenderMoveType.textContent = '-';
                        if (defenderMovePower) defenderMovePower.textContent = '-';
                        
                        console.log('   🧹 Cleared previous battle results, keeping section visible');
                    } else {
                        console.warn('   ⚠️ battleResultsSection not found!');
                    }
                    
                    // Update spin counter and reset live results
                    this.updateSpinCounter();
                    document.getElementById('attackerSpinResult').textContent = 'Spinning...';
                    document.getElementById('attackerSpinType').textContent = '-';
                    document.getElementById('attackerSpinPower').textContent = '-';
                    document.getElementById('defenderSpinResult').textContent = 'Spinning...';
                    document.getElementById('defenderSpinType').textContent = '-';
                    document.getElementById('defenderSpinPower').textContent = '-';
                    
                    // Update displays
                    if (topMoveDisplay) topMoveDisplay.textContent = 'Respinning...';
                    if (bottomMoveDisplay) bottomMoveDisplay.textContent = 'Respinning...';
                    
                    // Execute BOTH respins with slight delay to ensure animations restart properly
                    this.executeFullRespin(attackerElement, attackerDataMap, bottomMoveDisplay, 'attacker');
                    
                    // Small delay before starting second respin to ensure browser processes first one
                    setTimeout(() => {
                        this.executeFullRespin(defenderElement, defenderDataMap, topMoveDisplay, 'defender');
                    }, 20);
                });
            },
            
            // ═══════════════════════════════════════════════════════
            // BULLETPROOF RESPIN SYSTEM: Hard Reset with Scheduled Re-Engage
            // ═══════════════════════════════════════════════════════
            executeFullRespin(wheelElement, dataMap, display, player) {
                console.log(`\n🔄 BULLETPROOF RESPIN SEQUENCE for ${player}`);
                
                // ═══════════════════════════════════════════════════════
                // PHASE 1: THE "HARD RESET" (Execute Instantly)
                // ═══════════════════════════════════════════════════════
                console.log(`   💥 PHASE 1: HARD RESET - Wiping the slate clean...`);
                
                // Instruction 1: Kill the Transition
                console.log(`      Instruction 1: Killing transition and stopping current animation...`);
                wheelElement.style.transition = 'none';
                
                // Remove spinning class to stop animation
                wheelElement.classList.remove('spinning');
                
                // Clear inline animation styles that might interfere
                wheelElement.style.animation = '';
                wheelElement.style.animationName = '';
                
                // Clear any previous segment highlights
                const paths = wheelElement.querySelectorAll('path');
                paths.forEach(path => {
                    path.style.filter = '';
                    path.style.strokeWidth = '';
                    path.style.stroke = '';
                });
                
                console.log(`      ✅ Transition killed, animation stopped, highlights cleared`);
                
                // Instruction 2: Force a Browser Update
                console.log(`      Instruction 2: Forcing browser update...`);
                wheelElement.offsetHeight;
                void wheelElement.offsetWidth;
                getComputedStyle(wheelElement).transform; // Force style recalculation
                console.log(`      ✅ Browser update forced`);
                
                // Instruction 3: Schedule the Spin (CRITICAL - Separate Moment)
                console.log(`      Instruction 3: Scheduling Phase 2 & 3 in separate moment...`);
                console.log(`      ⏱️ 10ms delay to let browser process Hard Reset`);
                
                // CRITICAL: Place Phase 2 & 3 inside setTimeout for timing separation
                setTimeout(() => {
                    
                    // ═══════════════════════════════════════════════════════
                    // PHASE 2: THE "FULL RE-ENGAGE" (After Hard Reset)
                    // ═══════════════════════════════════════════════════════
                    console.log(`   🌀 PHASE 2: FULL RE-ENGAGE - Starting authentic spin...`);
                    
                    // Instruction 1: KEEP transition as 'none' during spin
                    // DO NOT restore transition yet - it will block the animation!
                    console.log(`      Instruction 1: Keeping transition disabled for spin...`);
                    wheelElement.style.transition = 'none'; // CRITICAL - must be 'none' for animation to work
                    
                    // Clear any transform to reset position
                    wheelElement.style.transform = 'rotate(0deg)';
                    
                    console.log(`      ✅ Transition kept disabled, transform reset`);
                    
                    // Force multiple reflows to ensure clean state
                    wheelElement.offsetHeight;
                    void wheelElement.offsetWidth;
                    
                    // Instruction 2: Start the Full Spin
                    console.log(`      Instruction 2: Adding .spinning class for full-speed animation...`);
                    wheelElement.classList.add('spinning');
                    
                    // Force reflow to ensure animation starts
                    wheelElement.offsetHeight;
                    void wheelElement.offsetWidth;
                    
                    console.log(`      ✅ FULL-SPEED SPIN ENGAGED!`);
                    console.log(`      🎯 Wheel is now spinning at FULL SPEED (identical to initial spin)`);
                    
                    // Instruction 3: Set the New Timer (4-7 seconds for LONG FAST SPIN)
                    const newTimer = 4000 + Math.random() * 3000; // 4-7 seconds
                    console.log(`      Instruction 3: New timer set to ${(newTimer/1000).toFixed(1)}s`);
                    console.log(`      🌀 At 0.1s per rotation (10 RPS), wheel will spin ${Math.floor(newTimer/100)} times!`);
                    
                    // ═══════════════════════════════════════════════════════
                    // PHASE 3: THE "NEW OUTCOME" (After Full Spin Duration)
                    // ═══════════════════════════════════════════════════════
                    console.log(`   ⏱️ PHASE 3: NEW OUTCOME - Timer running...`);
                    
                    // Instruction 1: Run the "Decide" Logic Again
                    setTimeout(() => {
                        console.log(`   🎯 PHASE 3: Timer expired - Running Decide Function...`);
                        this.decideFunction(wheelElement, dataMap, display, player);
                    }, newTimer);
                    
                    console.log(`   ✅ BULLETPROOF RESPIN COMPLETE - Full-speed spin in progress!`);
                    
                }, 10); // 10ms delay - gives browser time to process Hard Reset
                
                console.log(`   ✅ PHASE 1 complete - Phase 2 & 3 scheduled`);
            },
            
            // ═══════════════════════════════════════════════════════
            // CONSULT THE BLUEPRINT: Find which move contains the target angle
            // ═══════════════════════════════════════════════════════
            // DATA MAP STRUCTURE:
            // Each move has: { name, type, damage/stars, start, end, segment }
            // All angles are 0-360° from 12 o'clock position, clockwise
            // Example: { name: "Vine Whip", type: "white", damage: 60, start: 330, end: 345 }
            consultBlueprint(targetAngle, dataMap) {
                console.log(`   🔍 Checking target angle ${targetAngle.toFixed(1)}° against ${dataMap.length} move segments...`);
                
                // Normalize target angle to 0-360 range
                const normalizedTarget = ((targetAngle % 360) + 360) % 360;
                
                for (const move of dataMap) {
                    // Check if target angle is inside this move's segment (inclusive)
                    // Note: All segments should be within 0-360° and not wrap around
                    const isInsideSegment = (normalizedTarget >= move.start && normalizedTarget <= move.end);
                    
                    if (isInsideSegment) {
                        console.log(`   ✅ Found move "${move.name}" (${move.start}° - ${move.end}°)`);
                        return move;
                    }
                }
                
                // Fallback: If no exact match (shouldn't happen with proper data), find closest
                console.warn(`   ⚠️ No exact match for ${normalizedTarget.toFixed(1)}°, finding closest...`);
                let closest = dataMap[0];
                let minDist = 360;
                
                for (const move of dataMap) {
                    const midpoint = (move.start + move.end) / 2;
                    let dist = Math.abs(normalizedTarget - midpoint);
                    // Handle wraparound distance
                    if (dist > 180) dist = 360 - dist;
                    
                    if (dist < minDist) {
                        minDist = dist;
                        closest = move;
                    }
                }
                
                console.log(`   ✅ Closest move: "${closest.name}" (distance: ${minDist.toFixed(1)}°)`);
                return closest;
            },
            
            // Check for Battle Completion
            checkForBattleCompletion() {
                const attackerDone = this.wheelResults.attacker !== undefined;
                const defenderDone = this.wheelResults.defender !== undefined;
                
                console.log(`   📊 Attacker complete: ${attackerDone}`);
                console.log(`   📊 Defender complete: ${defenderDone}`);
                
                if (attackerDone && defenderDone) {
                    console.log('\n═══════════════════════════════════════');
                    console.log('🎉 BATTLE COMPLETE!');
                    console.log('   Both wheels have valid moves');
                    console.log('═══════════════════════════════════════');
                    
                    setTimeout(() => {
                        this.displayFinalResults();
                    }, 1000);
                } else {
                    console.log(`   ⏳ Waiting for ${!attackerDone ? 'attacker' : 'defender'} to complete...`);
                }
            },
            
            // Display Final Battle Results
            displayFinalResults() {
                const attackerMove = this.wheelResults.attacker;
                const defenderMove = this.wheelResults.defender;
                
                console.log('\n📊 DISPLAYING FINAL RESULTS:');
                console.log(`   🔍 wheelResults object:`, this.wheelResults);
                console.log(`   🔍 Attacker move:`, attackerMove);
                console.log(`   🔍 Defender move:`, defenderMove);
                
                if (!attackerMove || !defenderMove) {
                    console.error('❌ ERROR: Missing move data in wheelResults!');
                    console.error(`   Attacker: ${attackerMove ? 'OK' : 'MISSING'}`);
                    console.error(`   Defender: ${defenderMove ? 'OK' : 'MISSING'}`);
                    return;
                }
                
                console.log(`   ${this.currentVisualBattle.attacker.robot.name}: ${attackerMove.name} (${attackerMove.type})`);
                console.log(`   ${this.currentVisualBattle.defender.robot.name}: ${defenderMove.name} (${defenderMove.type})`);
                
                // Populate Move Results
                document.getElementById('attackerMoveName').textContent = attackerMove.name;
                document.getElementById('attackerMoveType').textContent = attackerMove.type.toUpperCase();
                document.getElementById('attackerMovePower').textContent = attackerMove.damage || attackerMove.stars ? 
                    (attackerMove.damage ? `⚔️ ${attackerMove.damage}` : `⭐ ${attackerMove.stars}★`) : 'Special';
                
                document.getElementById('defenderMoveName').textContent = defenderMove.name;
                document.getElementById('defenderMoveType').textContent = defenderMove.type.toUpperCase();
                document.getElementById('defenderMovePower').textContent = defenderMove.damage || defenderMove.stars ? 
                    (defenderMove.damage ? `⚔️ ${defenderMove.damage}` : `⭐ ${defenderMove.stars}★`) : 'Special';
                
                // Determine Winner
                const winner = this.determineWinner(attackerMove, defenderMove);
                const winnerDisplay = document.getElementById('winnerDisplay');
                const winnerText = document.getElementById('winnerText');
                const winnerReason = document.getElementById('winnerReason');
                
                if (winner.result === 'attacker') {
                    winnerDisplay.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.3) 100%)';
                    winnerDisplay.style.borderColor = 'rgba(34, 197, 94, 0.8)';
                    winnerText.style.color = '#4ade80';
                    winnerText.textContent = `🏆 ${this.currentVisualBattle.attacker.robot.name.toUpperCase()} WINS! 🏆`;
                    winnerReason.textContent = winner.reason;
                } else if (winner.result === 'defender') {
                    winnerDisplay.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.3) 100%)';
                    winnerDisplay.style.borderColor = 'rgba(239, 68, 68, 0.8)';
                    winnerText.style.color = '#f87171';
                    winnerText.textContent = `🏆 ${this.currentVisualBattle.defender.robot.name.toUpperCase()} WINS! 🏆`;
                    winnerReason.textContent = winner.reason;
                } else {
                    winnerDisplay.style.background = 'linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.3) 100%)';
                    winnerDisplay.style.borderColor = 'rgba(251, 191, 36, 0.8)';
                    winnerText.style.color = '#fbbf24';
                    winnerText.textContent = '🤝 DRAW! 🤝';
                    winnerReason.textContent = winner.reason;
                }
                
                // Show the battle results section
                document.getElementById('battleResultsSection').style.display = 'block';
                console.log('✅ Results displayed on screen');
                
                const continueBtn = document.getElementById('continueBtn');
                if (continueBtn) {
                    continueBtn.style.display = 'block';
                    console.log('✅ Continue button shown');
                }
            },
            
            // Live Spin Results Management
            showLiveSpinResults() {
                const liveResults = document.getElementById('liveSpinResults');
                if (liveResults) {
                    liveResults.style.display = 'block';
                    console.log('✅ Live spin results display shown');
                }
            },
            
            resetLiveSpinResults() {
                document.getElementById('attackerSpinResult').textContent = 'Spinning...';
                document.getElementById('attackerSpinType').textContent = '-';
                document.getElementById('attackerSpinPower').textContent = '-';
                
                document.getElementById('defenderSpinResult').textContent = 'Spinning...';
                document.getElementById('defenderSpinType').textContent = '-';
                document.getElementById('defenderSpinPower').textContent = '-';
                
                this.spinCounter = 0;
                document.getElementById('spinCount').textContent = 'Initial Spin';
                
                console.log('✅ Live spin results reset');
            },
            
            updateLiveSpinResult(player, move) {
                console.log(`📊 Updating live result for ${player}: ${move.name}`);
                console.log(`   Move data:`, move);
                
                // Determine power display based on move type
                let powerText = '-';
                if (move.damage !== undefined && move.damage !== null) {
                    powerText = `⚔️ ${move.damage}`;
                } else if (move.stars !== undefined && move.stars !== null) {
                    powerText = `⭐ ${move.stars}★`;
                } else if (move.type.toLowerCase() === 'blue') {
                    powerText = 'Defensive';
                } else if (move.type.toLowerCase() === 'red') {
                    powerText = 'Miss';
                } else {
                    powerText = 'Special';
                }
                
                const resultEl = player === 'attacker' ? 'attackerSpinResult' : 'defenderSpinResult';
                const typeEl = player === 'attacker' ? 'attackerSpinType' : 'defenderSpinType';
                const powerEl = player === 'attacker' ? 'attackerSpinPower' : 'defenderSpinPower';
                
                const resultElement = document.getElementById(resultEl);
                const typeElement = document.getElementById(typeEl);
                const powerElement = document.getElementById(powerEl);
                
                if (resultElement) resultElement.textContent = move.name;
                if (typeElement) typeElement.textContent = move.type.toUpperCase();
                if (powerElement) powerElement.textContent = powerText;
                
                console.log(`✅ Live result updated - Power: ${powerText}`);
            },
            
            updateSpinCounter() {
                this.spinCounter++;
                const spinCountEl = document.getElementById('spinCount');
                if (spinCountEl) {
                    if (this.spinCounter === 0) {
                        spinCountEl.textContent = 'Initial Spin';
                    } else {
                        spinCountEl.textContent = `Respin #${this.spinCounter}`;
                    }
                }
            },
            
            // Determine Winner Based on Move Types (Pokémon Duel Rules)
            determineWinner(attackerMove, defenderMove) {
                // Priority hierarchy: Blue > Gold > Purple > White > Red (Miss)
                const typePriority = {
                    'blue': 5,
                    'gold': 4,
                    'purple': 3,
                    'white': 2,
                    'red': 1
                };
                
                const attackerType = attackerMove.type.toLowerCase();
                const defenderType = defenderMove.type.toLowerCase();
                const attackerPriority = typePriority[attackerType] || 0;
                const defenderPriority = typePriority[defenderType] || 0;
                
                console.log(`\n🎯 BATTLE RESOLUTION:`);
                console.log(`   Attacker: ${attackerMove.name} (${attackerType}) - Priority ${attackerPriority}`);
                console.log(`   Defender: ${defenderMove.name} (${defenderType}) - Priority ${defenderPriority}`);
                
                // Red (Miss) - Loses to everything except Red
                if (attackerType === 'red' && defenderType === 'red') {
                    return { result: 'draw', reason: 'Both moves missed!' };
                }
                if (attackerType === 'red') {
                    return { result: 'defender', reason: `${defenderMove.name} beats Miss!` };
                }
                if (defenderType === 'red') {
                    return { result: 'attacker', reason: `${attackerMove.name} beats Miss!` };
                }
                
                // Blue (Defensive) - Beats everything except Blue
                if (attackerType === 'blue' && defenderType === 'blue') {
                    return { result: 'draw', reason: 'Both defensive moves block each other!' };
                }
                if (attackerType === 'blue') {
                    return { result: 'attacker', reason: `${attackerMove.name} (Blue) blocks ${defenderMove.name}!` };
                }
                if (defenderType === 'blue') {
                    return { result: 'defender', reason: `${defenderMove.name} (Blue) blocks ${attackerMove.name}!` };
                }
                
                // Gold vs Purple - Gold wins
                if (attackerType === 'gold' && defenderType === 'purple') {
                    return { result: 'attacker', reason: `${attackerMove.name} (Gold) overpowers ${defenderMove.name} (Purple)!` };
                }
                if (attackerType === 'purple' && defenderType === 'gold') {
                    return { result: 'defender', reason: `${defenderMove.name} (Gold) overpowers ${attackerMove.name} (Purple)!` };
                }
                
                // Purple vs White - Purple wins
                if (attackerType === 'purple' && defenderType === 'white') {
                    return { result: 'attacker', reason: `${attackerMove.name} (Purple) outmaneuvers ${defenderMove.name} (White)!` };
                }
                if (attackerType === 'white' && defenderType === 'purple') {
                    return { result: 'defender', reason: `${defenderMove.name} (Purple) outmaneuvers ${attackerMove.name} (White)!` };
                }
                
                // White vs White or Gold vs Gold - Compare damage
                if ((attackerType === 'white' && defenderType === 'white') || 
                    (attackerType === 'gold' && defenderType === 'gold')) {
                    const attackerDamage = parseInt(attackerMove.damage) || 0;
                    const defenderDamage = parseInt(defenderMove.damage) || 0;
                    
                    if (attackerDamage > defenderDamage) {
                        return { result: 'attacker', reason: `${attackerMove.name} (${attackerDamage}) overpowers ${defenderMove.name} (${defenderDamage})!` };
                    } else if (defenderDamage > attackerDamage) {
                        return { result: 'defender', reason: `${defenderMove.name} (${defenderDamage}) overpowers ${attackerMove.name} (${attackerDamage})!` };
                    } else {
                        return { result: 'draw', reason: `Both moves deal ${attackerDamage} damage - Draw!` };
                    }
                }
                
                // Purple vs Purple - Compare stars
                if (attackerType === 'purple' && defenderType === 'purple') {
                    const attackerStars = parseInt(attackerMove.stars) || 0;
                    const defenderStars = parseInt(defenderMove.stars) || 0;
                    
                    if (attackerStars > defenderStars) {
                        return { result: 'attacker', reason: `${attackerMove.name} (${attackerStars}★) outshines ${defenderMove.name} (${defenderStars}★)!` };
                    } else if (defenderStars > attackerStars) {
                        return { result: 'defender', reason: `${defenderMove.name} (${defenderStars}★) outshines ${attackerMove.name} (${attackerStars}★)!` };
                    } else {
                        return { result: 'draw', reason: `Both moves have ${attackerStars}★ - Draw!` };
                    }
                }
                
                // Gold vs White - Gold wins
                if (attackerType === 'gold' && defenderType === 'white') {
                    return { result: 'attacker', reason: `${attackerMove.name} (Gold) beats ${defenderMove.name} (White)!` };
                }
                if (attackerType === 'white' && defenderType === 'gold') {
                    return { result: 'defender', reason: `${defenderMove.name} (Gold) beats ${attackerMove.name} (White)!` };
                }
                
                // Fallback - shouldn't reach here
                return { result: 'draw', reason: 'Unexpected outcome!' };
            },
            
            // DEFINITIVE spin and stop logic - directly targets wheel elements
            spinAndStopWheel(wheelElement, moves, display, duration, player) {
                console.log(`🎯 Starting spin for ${player} wheel`);
                
                // CRITICAL: Start the visual spin by adding .spinning class
                wheelElement.classList.add('spinning');
                
                // Update display if it exists
                if (display) {
                    display.textContent = 'Spinning...';
                }
                
                setTimeout(() => {
                    console.log(`🛑 Stopping ${player} wheel after ${(duration/1000).toFixed(1)}s`);
                    
                    // Calculate a random stop angle (0-359)
                    const randomAngle = Math.floor(Math.random() * 360);
                    const selectedMove = this.detectMove(randomAngle, moves);
                    
                    // CRITICAL: Stop the wheel visually FIRST
                    this.stopSpinWheel(wheelElement, randomAngle);
                    
                    if (selectedMove) {
                        // VALID MOVE: We landed on a segment!
                        const displayText = `${selectedMove.name} (${selectedMove.type})`;
                        if (display) display.textContent = displayText;
                        
                        this.wheelResults[player] = selectedMove;
                        console.log(`✅ ${player} selected: ${selectedMove.name}`);
                        
                        // Check if battle is complete
                        this.checkAuthenticBattleOutcome();
                        
                    } else {
                        // INVALID MOVE: We landed on a boundary line!
                        if (display) display.textContent = 'Respinning...';
                        console.log(`🔄 ${player} landed on boundary - respinning`);
                        
                        const respinDuration = Math.random() * 2000 + 2000; // 2-4s respin
                        setTimeout(() => {
                            this.spinAndStopWheel(wheelElement, moves, display, respinDuration, player);
                        }, 500);
                    }
                }, duration);
            },
            
            // Detect if angle lands within a move segment (with boundary tolerance)
            detectMove(angle, moves) {
                const boundaryTolerance = 1; // 1 degree tolerance on each side
                
                for (const move of moves) {
                    if (angle >= move.start + boundaryTolerance && angle <= move.end - boundaryTolerance) {
                        return move;
                    }
                }
                return null; // Landed on boundary
            },
            
            // DEFINITIVE stop function - properly stops the wheel
            stopSpinWheel(wheelElement, angle) {
                console.log(`🛑 Stopping wheel at ${angle}°`);
                
                // CRITICAL: Remove spinning class to stop infinite animation
                wheelElement.classList.remove('spinning');
                
                // Set final position with multiple rotations for visual effect
                const finalRotation = (360 * 5) + angle;
                wheelElement.style.transform = `rotate(${finalRotation}deg)`;
                
                // Force browser reflow to apply changes immediately
                wheelElement.offsetHeight;
                
                console.log(`✅ Wheel stopped and positioned at ${finalRotation}°`);
            },
            
            // Check if battle is complete and show results
            checkAuthenticBattleOutcome() {
                if (this.wheelResults.attacker && this.wheelResults.defender) {
                    console.log('🎯 Both wheels stopped! Battle complete!');
                    this.isSpinning = false;
                    
                    setTimeout(() => {
                        this.showAuthenticBattleResults();
                    }, 1000);
                }
            },
            
            // Show final battle results with authentic formatting
            showAuthenticBattleResults() {
                const attackerMove = this.wheelResults.attacker;
                const defenderMove = this.wheelResults.defender;
                
                const outcomeDiv = document.getElementById('diskBattleOutcome');
                if (outcomeDiv) {
                    outcomeDiv.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <h3>🎯 BATTLE RESULTS</h3>
                            <div style="display: flex; justify-content: space-between; margin: 20px 0; gap: 20px;">
                                <div style="flex: 1; padding: 15px; background: rgba(78, 205, 196, 0.2); border-radius: 10px;">
                                    <h4 style="color: #4ecdc4; margin: 0 0 10px 0;">Your Move</h4>
                                    <p style="margin: 5px 0;"><strong>${attackerMove.name}</strong></p>
                                    <p style="font-size: 12px; margin: 0; color: #ccc;">${attackerMove.type.toUpperCase()} • ${attackerMove.damage || 'Special'}</p>
                                </div>
                                <div style="flex: 1; padding: 15px; background: rgba(255, 107, 107, 0.2); border-radius: 10px;">
                                    <h4 style="color: #ff6b6b; margin: 0 0 10px 0;">Opponent Move</h4>
                                    <p style="margin: 5px 0;"><strong>${defenderMove.name}</strong></p>
                                    <p style="font-size: 12px; margin: 0; color: #ccc;">${defenderMove.type.toUpperCase()} • ${defenderMove.damage || 'Special'}</p>
                                </div>
                            </div>
                            <p style="color: #ffd93d; font-weight: bold; margin: 15px 0;">Battle Complete!</p>
                        </div>
                    `;
                    outcomeDiv.style.display = 'block';
                }
                
                // Show continue button
                const continueBtn = document.getElementById('continueBtn');
                if (continueBtn) {
                    continueBtn.style.display = 'block';
                }
            },
            
            // Stop individual wheel and check if pointer lands on a valid move
            stopWheelAndCheckMove(wheelElement, finalRotation, wheelType, robot) {
                console.log(`🎯 Stopping ${wheelType} wheel at ${finalRotation}°`);
                
                // CRITICAL: Remove spinning class to stop infinite animation
                wheelElement.classList.remove('spinning');
                
                // CRITICAL: Set final position with normalized angle
                const normalizedAngle = finalRotation % 360;
                wheelElement.style.transform = `rotate(${normalizedAngle}deg)`;
                
                // Force browser to apply the transform immediately
                wheelElement.offsetHeight; // Trigger reflow
                
                console.log(`✅ ${wheelType} wheel stopped at ${normalizedAngle}°`);
                
                // For now, just record a simple result (we'll enhance move detection later)
                const mockMove = {
                    name: `Move ${Math.floor(normalizedAngle / 60) + 1}`,
                    type: 'white',
                    damage: Math.floor(Math.random() * 100) + 20
                };
                
                this.recordWheelResult(wheelType, mockMove);
            },
            
            // Respin a wheel that landed between moves
            respinWheel(wheelElement, wheelType, robot) {
                console.log(`🔄 Respinning ${wheelType} wheel...`);
                
                // Calculate new random final position
                const newFinalRotation = Math.floor(Math.random() * 360) + (360 * 3); // 3+ rotations
                
                // Start spinning again
                wheelElement.classList.add('spinning');
                
                // Stop after 2-4 seconds (shorter respin)
                const respinTime = 2000 + Math.random() * 2000;
                setTimeout(() => {
                    this.stopWheelAndCheckMove(wheelElement, newFinalRotation, wheelType, robot);
                }, respinTime);
            },
            
            // Determine which move the pointer is pointing to
            getSelectedMove(rotation, robot) {
                // Normalize rotation to 0-360 degrees
                const normalizedRotation = ((rotation % 360) + 360) % 360;
                
                // Each segment is 360/96 = 3.75 degrees
                const segmentSize = 360 / 96;
                const pointerAngle = normalizedRotation;
                
                // Find which segment the pointer is in
                const segmentIndex = Math.floor(pointerAngle / segmentSize);
                
                // Check if pointer is too close to segment boundary (within 0.5 degrees)
                const segmentCenter = (segmentIndex + 0.5) * segmentSize;
                const distanceFromCenter = Math.abs(pointerAngle - segmentCenter);
                
                if (distanceFromCenter > segmentSize * 0.4) {
                    // Too close to boundary - return null for respin
                    return null;
                }
                
                // Get the move for this segment
                if (robot.wheel && robot.wheel[segmentIndex]) {
                    return robot.wheel[segmentIndex];
                }
                
                // Fallback - return first move if wheel data not found
                return robot.moves ? robot.moves[0] : { name: 'Unknown Move', type: 'white', damage: 0 };
            },
            
            // Record the result of a wheel stop
            wheelResults: {},
            
            recordWheelResult(wheelType, move) {
                this.wheelResults[wheelType] = move;
                console.log(`📝 Recorded ${wheelType} result:`, move);
                
                // Update UI to show selected move
                this.updateMoveDisplay(wheelType, move);
            },
            
            // Update the UI to show which move was selected
            updateMoveDisplay(wheelType, move) {
                const displayId = wheelType === 'attacker' ? 'attackerName' : 'defenderName';
                const nameElement = document.getElementById(displayId);
                
                if (nameElement) {
                    const originalText = nameElement.textContent;
                    nameElement.innerHTML = `
                        ${originalText}<br>
                        <span style="font-size: 12px; color: #ffd93d;">Selected: ${move.name}</span>
                    `;
                }
            },
            
            // Check if both wheels have stopped and show final results
            checkBothWheelsStopped() {
                if (this.wheelResults.attacker && this.wheelResults.defender) {
                    console.log('🎯 Both wheels stopped! Showing final battle results...');
                    setTimeout(() => {
                        this.showFinalBattleResults();
                    }, 500);
                }
            },
            
            // Show final battle results with selected moves
            showFinalBattleResults() {
                const attackerMove = this.wheelResults.attacker;
                const defenderMove = this.wheelResults.defender;
                
                const outcomeDiv = document.getElementById('diskBattleOutcome');
                if (outcomeDiv) {
                    outcomeDiv.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <h3>🎯 BATTLE RESULTS</h3>
                            <div style="display: flex; justify-content: space-between; margin: 20px 0;">
                                <div style="flex: 1;">
                                    <h4 style="color: #4ecdc4;">Your Move</h4>
                                    <p><strong>${attackerMove.name}</strong></p>
                                    <p style="font-size: 12px;">${attackerMove.type} • ${attackerMove.damage || 'Special'}</p>
                                </div>
                                <div style="flex: 1;">
                                    <h4 style="color: #ff6b6b;">Opponent Move</h4>
                                    <p><strong>${defenderMove.name}</strong></p>
                                    <p style="font-size: 12px;">${defenderMove.type} • ${defenderMove.damage || 'Special'}</p>
                                </div>
                            </div>
                            <p style="color: #ffd93d; font-weight: bold;">Battle Complete!</p>
                        </div>
                    `;
                    outcomeDiv.style.display = 'block';
                }
                
                // Show continue button
                const continueBtn = document.getElementById('continueBtn');
                if (continueBtn) {
                    continueBtn.style.display = 'block';
                }
                
                // Clear results for next battle
                this.wheelResults = {};
            },
            
            // Show battle results after spinning completes
            showBattleResults() {
                console.log('🎯 Showing battle results');
                
                // Show the battle outcome
                const outcomeDiv = document.getElementById('diskBattleOutcome');
                if (outcomeDiv) {
                    outcomeDiv.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <h3>🎯 BATTLE COMPLETE!</h3>
                            <p style="color: #ffd93d; font-weight: bold;">Wheels have stopped spinning!</p>
                            <p>Check the pointer to see which moves were selected.</p>
                        </div>
                    `;
                    outcomeDiv.style.display = 'block';
                }
                
                // Show continue button
                const continueBtn = document.getElementById('continueBtn');
                if (continueBtn) {
                    continueBtn.style.display = 'block';
                }
            },
            
            // Phase 1: Wind-up animation
            animationPhase1(attackerElement, defenderElement) {
                attackerElement.className = 'wind-up';
                defenderElement.className = 'wind-up';
            },
            
            // Phase 2: Peak spin with motion blur
            animationPhase2(attackerElement, defenderElement) {
                // Check if we should use animated assets during peak spin
                this.switchToAnimatedAssets(attackerElement, defenderElement);
                
                attackerElement.className = 'peak-spin';
                defenderElement.className = 'peak-spin';
                
                // Activate sparks
                const sparksContainer = document.querySelector('.sparks-container');
                if (sparksContainer) {
                    sparksContainer.classList.add('sparks-active');
                }
            },
            
            // Switch to animated assets during peak spin for enhanced effect
            switchToAnimatedAssets(attackerElement, defenderElement) {
                // For image-based wheels with 3D assets, switch to animated version during peak spin
                if (attackerElement.classList.contains('wheel-image') && attackerElement.dataset.has3D === 'true') {
                    const robotId = attackerElement.dataset.robotId;
                    attackerElement.src = `Imag/Battle/example/3D_Renders/${robotId}_spin_animation.gif`;
                }
                
                if (defenderElement.classList.contains('wheel-image') && defenderElement.dataset.has3D === 'true') {
                    const robotId = defenderElement.dataset.robotId;
                    defenderElement.src = `Imag/Battle/example/3D_Renders/${robotId}_spin_animation.gif`;
                }
            },
            
            // Phase 3: Deceleration
            animationPhase3(attackerElement, defenderElement, attackerFinal, defenderFinal) {
                // Switch back to static assets for deceleration
                this.switchToStaticAssets(attackerElement, defenderElement);
                
                attackerElement.className = 'decelerate';
                defenderElement.className = 'decelerate';
                
                // Remove sparks
                const sparksContainer = document.querySelector('.sparks-container');
                if (sparksContainer) {
                    sparksContainer.classList.remove('sparks-active');
                }
                
                // Set final rotations with extra spins
                const attackerTotal = attackerFinal + 2160; // 6 extra rotations
                const defenderTotal = defenderFinal + 1800; // 5 extra rotations
                
                attackerElement.style.transform = `rotate(${attackerTotal}deg)`;
                defenderElement.style.transform = `rotate(${defenderTotal}deg)`;
            },
            
            // Switch back to static assets after peak spin
            switchToStaticAssets(attackerElement, defenderElement) {
                // Switch back to static 3D rendered disks for deceleration and final result
                if (attackerElement.classList.contains('wheel-image') && attackerElement.dataset.has3D === 'true') {
                    const robotId = attackerElement.dataset.robotId;
                    attackerElement.src = `Imag/Battle/example/3D_Renders/${robotId}_standard_disk.png`;
                }
                
                if (defenderElement.classList.contains('wheel-image') && defenderElement.dataset.has3D === 'true') {
                    const robotId = defenderElement.dataset.robotId;
                    defenderElement.src = `Imag/Battle/example/3D_Renders/${robotId}_standard_disk.png`;
                }
            },
            
            // Phase 4: Staggered stop and results
            animationPhase4(attackerElement, defenderElement) {
                // First disk stops
                attackerElement.className = 'stopped';
                
                setTimeout(() => {
                    // Second disk stops (creates tension)
                    defenderElement.className = 'stopped';
                    
                    setTimeout(() => {
                        // Show results
                        this.showBattleResults();
                    }, 300);
                }, 400);
            },
            
            // Create sparks effect
            createSparksEffect() {
                const container = document.querySelector('.v-mount-container') || 
                                 document.querySelector('.disk-battle-container') ||
                                 document.getElementById('diskBattleView');
                
                if (!container) {
                    console.log('⚠️ Sparks container not found - skipping effect');
                    return; // Skip sparks if container not found
                }
                
                const sparksContainer = document.createElement('div');
                sparksContainer.className = 'sparks-container';
                
                // Create multiple sparks
                for (let i = 0; i < 8; i++) {
                    const spark = document.createElement('div');
                    spark.className = 'spark';
                    
                    // Random direction for each spark
                    const angle = (i / 8) * 360;
                    const distance = 30 + Math.random() * 20;
                    const x = Math.cos(angle * Math.PI / 180) * distance;
                    const y = Math.sin(angle * Math.PI / 180) * distance;
                    
                    spark.style.setProperty('--spark-x', `${x}px`);
                    spark.style.setProperty('--spark-y', `${y}px`);
                    spark.style.animationDelay = `${Math.random() * 0.3}s`;
                    
                    sparksContainer.appendChild(spark);
                }
                
                container.appendChild(sparksContainer);
            },
            
            calculateFinalRotation(robot, spinValue) {
                let currentSum = 0;
                let targetAngle = 0;
                
                for (let i = 0; i < robot.wheel.length; i++) {
                    const segment = robot.wheel[i];
                    const segmentAngle = (segment.size / 96) * 360;
                    
                    if (spinValue <= currentSum + segment.size) {
                        // This is the target segment
                        const positionInSegment = (spinValue - currentSum) / segment.size;
                        targetAngle = (currentSum / 96) * 360 + (segmentAngle * positionInSegment);
                        break;
                    }
                    currentSum += segment.size;
                }
                
                // Adjust so the selected segment ends up at the top (pointer position)
                return 360 - targetAngle;
            },
            
            showBattleResults() {
                const battle = this.currentVisualBattle;
                
                // Highlight selected segments
                this.highlightSelectedMove('attackerWheel', battle.attacker.spin.result);
                this.highlightSelectedMove('defenderWheel', battle.defender.spin.result);
                
                // Apply winner/loser styling to disks
                const attackerDisk = document.getElementById('attackerDisk');
                const defenderDisk = document.getElementById('defenderDisk');
                const diamondPointer = document.getElementById('diamondPointer');
                
                if (battle.result === 'attacker_wins') {
                    attackerDisk.classList.add('winner');
                    defenderDisk.classList.add('loser');
                    // Left side of diamond wins (attacker is on left)
                    diamondPointer.classList.add('left-wins');
                } else if (battle.result === 'defender_wins') {
                    defenderDisk.classList.add('winner');
                    attackerDisk.classList.add('loser');
                    // Right side of diamond wins (defender is on right)
                    diamondPointer.classList.add('right-wins');
                } else {
                    attackerDisk.classList.add('draw');
                    defenderDisk.classList.add('draw');
                    // Both sides draw
                    diamondPointer.classList.add('draw');
                }
                
                // Show battle outcome
                const outcomeDiv = document.getElementById('diskBattleOutcome');
                let outcomeText = '';
                let outcomeClass = '';
                
                if (battle.result === 'attacker_wins') {
                    outcomeText = `🏆 ${battle.attacker.robot.name} WINS!`;
                    outcomeClass = 'outcome-winner';
                } else if (battle.result === 'defender_wins') {
                    outcomeText = `🏆 ${battle.defender.robot.name} WINS!`;
                    outcomeClass = 'outcome-winner';
                } else {
                    outcomeText = '🤝 DRAW!';
                    outcomeClass = 'outcome-draw';
                }
                
                outcomeDiv.innerHTML = `<div class="${outcomeClass}">${outcomeText}</div>`;
                outcomeDiv.style.display = 'block';
                
                // Show move details
                document.getElementById('attackerMoveName').textContent = CombatSystem.formatMoveText(battle.attacker.spin.result);
                document.getElementById('attackerMoveType').textContent = `${battle.attacker.spin.result.moveType} Move`;
                document.getElementById('defenderMoveName').textContent = CombatSystem.formatMoveText(battle.defender.spin.result);
                document.getElementById('defenderMoveType').textContent = `${battle.defender.spin.result.moveType} Move`;
                
                document.getElementById('moveDetails').style.display = 'flex';
                document.getElementById('continueBtn').style.display = 'block';
            },
            
            highlightSelectedMove(wheelId, selectedMove) {
                const wheel = document.getElementById(wheelId);
                
                // Check if this is an image-based wheel (like Alaka-bot)
                const wheelImage = wheel.querySelector('.wheel-image');
                if (wheelImage) {
                    // For image-based wheels, use overlay highlighting
                    const overlay = wheel.querySelector('.wheel-overlay');
                    if (overlay) {
                        // Create segment highlight based on move position
                        this.highlightImageWheelMove(overlay, selectedMove, wheelImage.dataset.robotId);
                    }
                } else {
                    // Handle SVG segments
                    const svgSegments = wheel.querySelectorAll('.svg-segment');
                    if (svgSegments.length > 0) {
                        svgSegments.forEach(segment => {
                            if (segment.dataset.moveName === selectedMove.moveName) {
                                segment.classList.add('selected');
                            }
                        });
                    } else {
                        // Fallback for CSS segments
                        const segments = wheel.querySelectorAll('.disk-segment');
                        segments.forEach(segment => {
                            if (segment.dataset.moveName === selectedMove.moveName) {
                                segment.classList.add('selected-move');
                                const segmentContent = segment.querySelector('.segment-content');
                                if (segmentContent) {
                                    segmentContent.style.boxShadow = 'inset 0 0 30px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6)';
                                }
                            }
                        });
                    }
                }
            },
            
            // Highlight moves on image-based wheels using overlay
            highlightImageWheelMove(overlay, selectedMove, robotId) {
                if (robotId === 'alaka-bot') {
                    // Get move position from JSON data
                    const robot = RobotDatabase.getRobot(robotId);
                    const moveData = robot.wheel.find(move => move.moveName === selectedMove.moveName);
                    
                    if (moveData) {
                        // Create SVG overlay for precise segment highlighting
                        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        svg.setAttribute('width', '100%');
                        svg.setAttribute('height', '100%');
                        svg.setAttribute('viewBox', '0 0 280 280');
                        svg.style.position = 'absolute';
                        svg.style.top = '0';
                        svg.style.left = '0';
                        svg.style.pointerEvents = 'none';
                        
                        // Create precise segment path for highlighting
                        const startAngle = this.getApproximateStartAngle(moveData);
                        const endAngle = this.getApproximateEndAngle(moveData);
                        const segmentPath = this.createHighlightSegment(140, 140, 130, startAngle, endAngle);
                        
                        // Style the highlight segment
                        segmentPath.setAttribute('fill', 'rgba(34, 197, 94, 0.3)'); // Green with transparency
                        segmentPath.setAttribute('stroke', '#22c55e'); // Bright green outline
                        segmentPath.setAttribute('stroke-width', '4');
                        segmentPath.setAttribute('filter', 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))');
                        
                        // Add pulsing animation
                        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                        animate.setAttribute('attributeName', 'stroke-width');
                        animate.setAttribute('values', '4;6;4');
                        animate.setAttribute('dur', '1.5s');
                        animate.setAttribute('repeatCount', 'indefinite');
                        segmentPath.appendChild(animate);
                        
                        svg.appendChild(segmentPath);
                        overlay.appendChild(svg);
                        overlay.style.opacity = '1';
                    }
                }
            },
            
            // Create precise highlight segment for image wheels
            createHighlightSegment(centerX, centerY, radius, startAngle, endAngle) {
                const startAngleRad = (startAngle - 90) * Math.PI / 180; // -90 to start at top
                const endAngleRad = (endAngle - 90) * Math.PI / 180;
                
                const x1 = centerX + radius * Math.cos(startAngleRad);
                const y1 = centerY + radius * Math.sin(startAngleRad);
                const x2 = centerX + radius * Math.cos(endAngleRad);
                const y2 = centerY + radius * Math.sin(endAngleRad);
                
                const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;
                
                const pathData = [
                    `M ${centerX} ${centerY}`, // Move to center
                    `L ${x1} ${y1}`, // Line to start point
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Arc to end point
                    'Z' // Close path
                ].join(' ');
                
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', pathData);
                
                return path;
            },
            
            // Get precise angles using JSON data
            getApproximateStartAngle(moveData) {
                // Use actual JSON data if available, otherwise use visual mapping
                if (moveData.moveName === 'Stillblind') return 0;      // 0-90 degrees
                if (moveData.moveName === 'Miss') return 90;           // 90-105 degrees  
                if (moveData.moveName === 'Psychic') return 105;       // 105-195 degrees
                if (moveData.moveName === 'Psyshock') return 195;      // 195-285 degrees
                if (moveData.moveName === 'Psycho Shift') return 285;  // 285-360 degrees
                return 0;
            },
            
            getApproximateEndAngle(moveData) {
                // Use actual JSON data for precise end angles
                if (moveData.moveName === 'Stillblind') return 90;     // 24 segments = 90°
                if (moveData.moveName === 'Miss') return 105;          // 4 segments = 15°
                if (moveData.moveName === 'Psychic') return 195;       // 24 segments = 90°
                if (moveData.moveName === 'Psyshock') return 285;      // 24 segments = 90°
                if (moveData.moveName === 'Psycho Shift') return 360;  // 20 segments = 75°
                return this.getApproximateStartAngle(moveData) + (moveData.size / 96) * 360;
            },
            
            // Missions System Functions
            openMissions() {
                this.checkDailyReset();
                
                // Auto-complete check-in mission on first open
                if (this.data.dailyMissionStatus.checkIn === 'unclaimed') {
                    this.data.dailyMissionStatus.checkIn = 'completed';
                    this.saveData();
                }
                
                // Always default to daily missions tab when opening
                this.data.currentMissionTab = 'daily';
                
                // Update tab UI to show daily as active
                document.querySelectorAll('.mission-tab').forEach(t => t.classList.remove('active'));
                document.getElementById('dailyTab').classList.add('active');
                
                const modal = document.getElementById('missionsModal');
                modal.classList.add('active');
                this.renderMissions();
            },

            closeMissions() {
                // Don't allow closing if mystery game is locked during animation
                if (this.data.mysteryGameState.isLocked) {
                    return;
                }
                
                const modal = document.getElementById('missionsModal');
                modal.classList.remove('active');
            },

            switchMissionTab(tab) {
                this.data.currentMissionTab = tab;
                
                // Update tab UI
                document.querySelectorAll('.mission-tab').forEach(t => t.classList.remove('active'));
                document.getElementById(tab + 'Tab').classList.add('active');
                
                this.renderMissions();
            },

            checkDailyReset() {
                const now = new Date();
                const today = now.toDateString(); // e.g., "Sat Oct 05 2025"
                const lastResetDate = this.data.lastDailyResetDate || '';
                
                // Check if it's a new day
                if (today !== lastResetDate) {
                    // Reset daily missions
                    this.data.lastDailyResetDate = today;
                    this.data.lastDailyReset = now.getTime();
                    this.data.dailyChoresCompleted = 0;
                    this.data.dailyBonusClaimed = false;
                    this.data.dailyMissionStatus = {
                        checkIn: 'unclaimed',
                        twoChores: 'incomplete',
                        fourChores: 'incomplete'
                    };
                    // Reset mystery game
                    this.data.mysteryGamePlayed = false;
                    this.data.mysteryGameState = {
                        isActive: false,
                        gamePhase: 'start',
                        prizes: [],
                        selectedBox: null,
                        wonPrize: null,
                        isLocked: false
                    };
                    this.saveData();
                }
            },

            updateChoreProgress() {
                this.data.dailyChoresCompleted++;
                
                // Update mission status
                if (this.data.dailyChoresCompleted >= 2 && this.data.dailyMissionStatus.twoChores === 'incomplete') {
                    this.data.dailyMissionStatus.twoChores = 'completed';
                }
                if (this.data.dailyChoresCompleted >= 4 && this.data.dailyMissionStatus.fourChores === 'incomplete') {
                    this.data.dailyMissionStatus.fourChores = 'completed';
                }
                
                this.saveData();
            },

            renderMissions() {
                const container = document.getElementById('missionsBody');
                const tab = this.data.currentMissionTab;
                
                if (tab === 'daily') {
                    this.renderDailyMissions(container);
                } else if (tab === 'mystery') {
                    this.renderMysteryGame(container);
                } else {
                    container.innerHTML = `
                        <div class="coming-soon">
                            <div class="coming-soon-icon">🚧</div>
                            <div class="coming-soon-text">Coming Soon!</div>
                            <div>This feature is under construction.</div>
                        </div>
                    `;
                }
            },

            renderDailyMissions(container) {
                const missions = [
                    {
                        id: 'checkIn',
                        title: 'Daily Check-In',
                        description: 'Open the Missions window',
                        status: this.data.dailyMissionStatus.checkIn
                    },
                    {
                        id: 'twoChores',
                        title: 'Complete 2 Chores',
                        description: `Complete any 2 tasks (${this.data.dailyChoresCompleted}/2)`,
                        status: this.data.dailyMissionStatus.twoChores
                    },
                    {
                        id: 'fourChores',
                        title: 'Complete 4 Chores',
                        description: `Complete any 4 tasks (${this.data.dailyChoresCompleted}/4)`,
                        status: this.data.dailyMissionStatus.fourChores
                    }
                ];

                let html = '';
                missions.forEach(mission => {
                    const cardClass = mission.status === 'completed' ? 'mission-card completed' : 
                                     mission.status === 'claimed' ? 'mission-card claimed' : 'mission-card';
                    
                    html += `
                        <div class="${cardClass}">
                            <div class="mission-title">${mission.title}</div>
                            <div class="mission-description">${mission.description}</div>
                            ${mission.status === 'completed' ? 
                                `<button class="mission-claim-btn" onclick="app.claimMission('${mission.id}')">Mark Complete</button>` :
                              mission.status === 'claimed' ?
                                `<div class="mission-claimed-badge">✓ Completed</div>` :
                                `<button class="mission-claim-btn" disabled>Not Completed</button>`
                            }
                        </div>
                    `;
                });

                // Add Complete All button with bonus info
                const allClaimed = missions.every(m => m.status === 'claimed');
                const hasCompletedMissions = missions.some(m => m.status === 'completed');
                
                if (allClaimed) {
                    html += `
                        <div class="mission-card" style="background: linear-gradient(135deg, #FFD700, #FFA500); border: none; text-align: center;">
                            <div class="mission-title" style="color: white;">🎉 All Missions Complete!</div>
                            <div class="mission-description" style="color: white; opacity: 0.9;">You earned 10 Bolts bonus!</div>
                        </div>
                    `;
                } else {
                    html += `
                        <div style="text-align: center; padding: 20px; background: rgba(255, 215, 0, 0.1); border-radius: 16px; margin-top: 8px;">
                            <div style="font-size: 16px; font-weight: 600; color: #FFA500; margin-bottom: 8px;">
                                Complete All Missions
                            </div>
                            <div style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 18px; font-weight: 700; color: #FFD700;">
                                <img src="Imag/Achivments/Images/Finished Images/Bolt.png" alt="Bolt" style="width: 24px; height: 24px;">
                                <img src="Imag/Achivments/Images/Finished Images/X.png" alt="x" style="width: 14px; height: 14px; opacity: 0.8;">
                                <span>10 Bonus</span>
                            </div>
                        </div>
                    `;
                }

                container.innerHTML = html;
            },

            claimMission(missionId) {
                this.data.dailyMissionStatus[missionId] = 'claimed';
                this.saveData();
                
                // Check if all missions are claimed for bonus
                this.checkAllMissionsClaimed();
                
                this.renderMissions();
            },

            checkAllMissionsClaimed() {
                const allClaimed = Object.values(this.data.dailyMissionStatus).every(status => status === 'claimed');
                
                if (allClaimed && !this.data.dailyBonusClaimed) {
                    this.addCurrency(10);
                    this.data.dailyBonusClaimed = true;
                    this.saveData();
                    
                    // Show congratulations modal for daily mission completion
                    this.showDailyMissionCongratulations();
                }
            },

            showDailyMissionCongratulations() {
                const modal = document.getElementById('mysteryResultModal');
                const image = document.getElementById('mysteryResultImage');
                const text = document.getElementById('mysteryResultText');
                
                // Set up the congratulations display
                image.src = 'Imag/Achivments/Images/Finished Images/10-Bolts.png'; // Use 10 bolts image
                text.textContent = 'You won 10 Bolts!';
                
                modal.classList.add('active');
                
                // Show congratulations speech with delay to avoid conflicts
                setTimeout(() => {
                    const congratsMessages = [
                        'Daily Mission Streak: +10 BIG ONES BABY!',
                        'Daily Mission Streak: +10 Clanky Coins!',
                        'Daily Mission Streak: +10 Robo-Riches!',
                        'Daily Mission Streak: +10 Shiny Bois!',
                        'Daily Mission Streak: +10 Grade-A Fasteners!',
                        'Daily Mission Streak: +10 Bolt Bucks!',
                        'Daily Mission Streak: +10 THE GOOD STUFF!',
                        'Daily Mission Streak: +10 PURE SHINY!',
                        'Daily Mission Streak: +10 Mech Money!',
                        'Daily Mission Streak: +10 WINNER WINNER!'
                    ];
                    
                    const randomMessage = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
                    this.showSpeechBubble(randomMessage, 'regular');
                }, 500);
            },

            // Mystery Game Functions
            renderMysteryGame(container) {
                const canPlay = !this.data.mysteryGamePlayed || this.isObonxoCheatActive;
                const buttonText = canPlay ? 'Start Mystery Pick!' : 'Already Played Today';
                const buttonDisabled = canPlay ? '' : 'disabled';
                
                container.innerHTML = `
                    <div class="mystery-game-container">
                        <div class="mystery-game-title">
                            <img src="Imag/Achivments/Images/Finished Images/Gift.png" alt="Gift Box" style="width: 24px; height: 24px; vertical-align: middle; margin-right: 8px;">
                            Daily Mystery Pick
                        </div>
                        <button class="mystery-start-btn" onclick="app.startMysteryGame()" ${buttonDisabled}>
                            ${buttonText}
                        </button>
                        <div class="mystery-game-arena" id="mysteryGameArena">
                            <div class="mystery-game-status" id="mysteryGameStatus"></div>
                            <div class="mystery-boxes-container" id="mysteryBoxesContainer">
                                <!-- Boxes will be populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                `;
            },

            startMysteryGame() {
                if (this.data.mysteryGamePlayed && !this.isObonxoCheatActive) return;
                
                this.data.mysteryGameState.isActive = true;
                this.data.mysteryGameState.gamePhase = 'pick';
                
                // Generate three random prizes with rare robot chance
                const possiblePrizes = this.generateMysteryPrizes();
                this.data.mysteryGameState.prizes = possiblePrizes;
                
                // Show game arena
                document.getElementById('mysteryGameArena').classList.add('active');
                document.querySelector('.mystery-start-btn').style.display = 'none';
                
                this.showMysteryBoxes();
            },

            // Weighted Prize Probability System
            generateFinalPrize() {
                // Roll 1-100 to determine prize tier
                const roll = Math.floor(Math.random() * 100) + 1;
                
                if (roll === 1) {
                    // 1% Chance - Jackpot Tier
                    const availableRobots = this.storeRobots.filter(robot => 
                        !this.data.ownedRobots.includes(robot.id)
                    );
                    
                    if (availableRobots.length > 0) {
                        // Unlock random unowned robot
                        const randomRobot = availableRobots[Math.floor(Math.random() * availableRobots.length)];
                        return {
                            id: randomRobot.id,
                            name: randomRobot.name,
                            image: randomRobot.actualImagePath,
                            type: 'robot',
                            tier: 'jackpot',
                            robotData: randomRobot
                        };
                    } else {
                        // Fallback: 100 Bolts if all robots owned
                        return {
                            id: 'bolts100',
                            name: '100 Bolts',
                            image: 'Imag/Achivments/Images/Finished Images/Bolt.png',
                            value: 100,
                            type: 'bolts',
                            tier: 'jackpot'
                        };
                    }
                } else if (roll >= 2 && roll <= 70) {
                    // 69% Chance - Common Tier {1, 5, 10, 15, 20}
                    const commonValues = [1, 5, 10, 15, 20];
                    const value = commonValues[Math.floor(Math.random() * commonValues.length)];
                    return {
                        id: `bolts${value}`,
                        name: `${value} Bolt${value > 1 ? 's' : ''}`,
                        image: 'Imag/Achivments/Images/Finished Images/Bolt.png',
                        value: value,
                        type: 'bolts',
                        tier: 'common'
                    };
                } else if (roll >= 71 && roll <= 90) {
                    // 20% Chance - Uncommon Tier {20, 25, 30, 35, 40, 45, 50}
                    const uncommonValues = [20, 25, 30, 35, 40, 45, 50];
                    const value = uncommonValues[Math.floor(Math.random() * uncommonValues.length)];
                    return {
                        id: `bolts${value}`,
                        name: `${value} Bolts`,
                        image: 'Imag/Achivments/Images/Finished Images/Bolt.png',
                        value: value,
                        type: 'bolts',
                        tier: 'uncommon'
                    };
                } else {
                    // 10% Chance - Rare Tier {50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100}
                    const rareValues = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
                    const value = rareValues[Math.floor(Math.random() * rareValues.length)];
                    return {
                        id: `bolts${value}`,
                        name: `${value} Bolts`,
                        image: 'Imag/Achivments/Images/Finished Images/Bolt.png',
                        value: value,
                        type: 'bolts',
                        tier: 'rare'
                    };
                }
            },

            generateDummyPrizes(finalPrize) {
                const dummyPrizes = [];
                
                // Generate 2 dummy prizes from different tiers to make selection look plausible
                for (let i = 0; i < 2; i++) {
                    let dummyPrize;
                    do {
                        // Generate a random tier (avoid jackpot for dummies)
                        const tierRoll = Math.floor(Math.random() * 3);
                        if (tierRoll === 0) {
                            // Common tier
                            const commonValues = [1, 5, 10, 15, 20];
                            const value = commonValues[Math.floor(Math.random() * commonValues.length)];
                            dummyPrize = {
                                id: `dummy_bolts${value}_${i}`,
                                name: `${value} Bolt${value > 1 ? 's' : ''}`,
                                image: 'Imag/Achivments/Images/Finished Images/Bolt.png',
                                value: value,
                                type: 'bolts',
                                tier: 'common'
                            };
                        } else if (tierRoll === 1) {
                            // Uncommon tier
                            const uncommonValues = [20, 25, 30, 35, 40, 45, 50];
                            const value = uncommonValues[Math.floor(Math.random() * uncommonValues.length)];
                            dummyPrize = {
                                id: `dummy_bolts${value}_${i}`,
                                name: `${value} Bolts`,
                                image: 'Imag/Achivments/Images/Finished Images/Bolt.png',
                                value: value,
                                type: 'bolts',
                                tier: 'uncommon'
                            };
                        } else {
                            // Rare tier
                            const rareValues = [50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
                            const value = rareValues[Math.floor(Math.random() * rareValues.length)];
                            dummyPrize = {
                                id: `dummy_bolts${value}_${i}`,
                                name: `${value} Bolts`,
                                image: 'Imag/Achivments/Images/Finished Images/Bolt.png',
                                value: value,
                                type: 'bolts',
                                tier: 'rare'
                            };
                        }
                    } while (dummyPrize.id === finalPrize.id || dummyPrizes.some(p => p.id === dummyPrize.id));
                    
                    dummyPrizes.push(dummyPrize);
                }
                
                return dummyPrizes;
            },

            generateMysteryPrizes() {
                // Generate the final prize first (this is what the user will actually get)
                const finalPrize = this.generateFinalPrize();
                this.data.mysteryGameState.finalPrize = finalPrize;
                
                // Generate 2 dummy prizes for visual presentation
                const dummyPrizes = this.generateDummyPrizes(finalPrize);
                
                // Create array with final prize and dummies, then shuffle for visual presentation
                const allPrizes = [finalPrize, ...dummyPrizes];
                
                // Shuffle the visual order
                for (let i = allPrizes.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allPrizes[i], allPrizes[j]] = [allPrizes[j], allPrizes[i]];
                }
                
                return allPrizes;
            },

            showMysteryBoxes() {
                const container = document.getElementById('mysteryBoxesContainer');
                const status = document.getElementById('mysteryGameStatus');
                
                status.textContent = 'Pick a box!';
                
                let html = '';
                for (let i = 0; i < 3; i++) {
                    const prize = this.data.mysteryGameState.prizes[i];
                    html += `
                        <div class="mystery-box" id="mysteryBox${i}" onclick="app.selectMysteryBox(${i})">
                            <img src="Imag/Achivments/Images/Finished Images/Gift.png" alt="Gift Box" class="mystery-box-image">
                            <div class="mystery-box-prize">
                                <img src="${prize.image}" alt="${prize.name}" class="mystery-prize-image">
                                <div class="mystery-prize-text">${prize.name}</div>
                            </div>
                        </div>
                    `;
                }
                container.innerHTML = html;
            },


            selectMysteryBox(boxIndex) {
                if (this.data.mysteryGameState.gamePhase !== 'pick') return;
                
                // Step A: Lock the modal immediately upon box selection
                this.data.mysteryGameState.isLocked = true;
                this.updateMysteryCloseButton(false); // Disable close button
                
                this.data.mysteryGameState.selectedBox = boxIndex;
                this.data.mysteryGameState.gamePhase = 'result';
                
                // Use the predetermined final prize (not random!)
                this.data.mysteryGameState.wonPrize = this.data.mysteryGameState.finalPrize;
                
                this.revealResult(boxIndex);
            },

            revealResult(selectedBoxIndex) {
                const status = document.getElementById('mysteryGameStatus');
                const boxes = document.querySelectorAll('.mystery-box');
                
                status.textContent = 'Opening your box...';
                
                // Open all boxes and show what was "inside"
                boxes.forEach((box, index) => {
                    const boxImage = box.querySelector('.mystery-box-image');
                    const prize = box.querySelector('.mystery-box-prize');
                    const prizeImage = prize.querySelector('.mystery-prize-image');
                    const prizeText = prize.querySelector('.mystery-prize-text');
                    
                    box.classList.add('opening');
                    
                    setTimeout(() => {
                        boxImage.src = 'Imag/Achivments/Images/Finished Images/Open-Gift.png';
                        
                        if (index === selectedBoxIndex) {
                            // Always show the predetermined final prize in selected box
                            const finalPrize = this.data.mysteryGameState.finalPrize;
                            prizeImage.src = finalPrize.image;
                            prizeText.textContent = finalPrize.name;
                            
                            // Add sparkle effect
                            const sparkle = document.createElement('div');
                            sparkle.className = 'sparkle-effect';
                            box.appendChild(sparkle);
                        } else {
                            // Show the dummy prizes that were originally in these boxes
                            const originalPrize = this.data.mysteryGameState.prizes[index];
                            
                            // If it's a robot prize that wasn't selected, show shadow and hide name
                            if (originalPrize.type === 'robot') {
                                prizeImage.src = originalPrize.robotData.shadowImagePath;
                                prizeText.textContent = '???';
                            } else {
                                prizeImage.src = originalPrize.image;
                                prizeText.textContent = originalPrize.name;
                            }
                        }
                        
                        prize.classList.add('revealed');
                    }, 300);
                });
                
                // Show result modal after animation - extended time to view other prizes
                setTimeout(() => {
                    this.showMysteryResult();
                }, 3500);
            },

            updateMysteryCloseButton(enabled) {
                const closeButton = document.querySelector('.missions-close');
                if (closeButton) {
                    if (enabled) {
                        closeButton.style.opacity = '1';
                        closeButton.style.cursor = 'pointer';
                        closeButton.style.pointerEvents = 'auto';
                    } else {
                        closeButton.style.opacity = '0.3';
                        closeButton.style.cursor = 'not-allowed';
                        closeButton.style.pointerEvents = 'none';
                    }
                }
            },

            showMysteryResult() {
                const modal = document.getElementById('mysteryResultModal');
                const image = document.getElementById('mysteryResultImage');
                const text = document.getElementById('mysteryResultText');
                const closeButton = modal.querySelector('.mystery-result-btn');
                
                const wonPrize = this.data.mysteryGameState.wonPrize;
                
                image.src = wonPrize.image;
                text.textContent = `You won ${wonPrize.name}!`;
                
                modal.classList.add('active');
                
                // Step D: Unlock the modal now that congratulations screen is visible
                this.data.mysteryGameState.isLocked = false;
                this.updateMysteryCloseButton(true); // Re-enable close button
                
                // Award the prize based on type - delay speech to avoid conflicts
                setTimeout(() => {
                    if (wonPrize.type === 'robot') {
                        // Add robot to owned robots and remove from store
                        this.data.ownedRobots.push(wonPrize.id);
                        
                        // Initialize durability for new robot
                        this.initializeRobotDurability(wonPrize.id);
                        
                        this.showSpeechBubble(`Amazing! You won a free ${wonPrize.name} robot!`, 'regular');
                        
                        // Update robot store display if it's open
                        if (this.isStoreOpen()) {
                            this.renderRobotStore();
                        }
                    } else {
                        // Regular bolt prize
                        this.addCurrency(wonPrize.value);
                        
                        // Random fun bolt prize messages
                        const boltMessages = [
                            `Daily Mystery Pick: +${wonPrize.value} BIG ONES BABY!`,
                            `Daily Mystery Pick: +${wonPrize.value} Clanky Coins!`,
                            `Daily Mystery Pick: +${wonPrize.value} Robo-Riches!`,
                            `Daily Mystery Pick: +${wonPrize.value} Shiny Bois!`,
                            `Daily Mystery Pick: +${wonPrize.value} Grade-A Fasteners!`,
                            `Daily Mystery Pick: +${wonPrize.value} Bolt Bucks!`,
                            `Daily Mystery Pick: +${wonPrize.value} Spare Parts!`,
                            `Daily Mystery Pick: +${wonPrize.value} THE GOOD STUFF!`,
                            `Daily Mystery Pick: +${wonPrize.value} Clinkity-Clanks!`,
                            `Daily Mystery Pick: +${wonPrize.value} PURE SHINY!`,
                            `Daily Mystery Pick: +${wonPrize.value} Thingamajigs!`,
                            `Daily Mystery Pick: +${wonPrize.value} Screwy Screws!`,
                            `Daily Mystery Pick: +${wonPrize.value} Socket Stuffers!`,
                            `Daily Mystery Pick: +${wonPrize.value} Cold Hard Steel!`,
                            `Daily Mystery Pick: +${wonPrize.value} Metal Spaghetti!`,
                            `Daily Mystery Pick: +${wonPrize.value} Mech Money!`,
                            `Daily Mystery Pick: +${wonPrize.value} Prime Rivets!`,
                            `Daily Mystery Pick: +${wonPrize.value} Fat Stacks o' Scrap!`,
                            `Daily Mystery Pick: +${wonPrize.value} WINNER WINNER!`,
                            `Daily Mystery Pick: +${wonPrize.value} Doo-Dads!`,
                            `Daily Mystery Pick: +${wonPrize.value} Tinkerer's Tokens!`,
                            `Daily Mystery Pick: +${wonPrize.value} Freshly Forged!`,
                            `Daily Mystery Pick: +${wonPrize.value} Gizmos!`,
                            `Daily Mystery Pick: +${wonPrize.value} Little Metal Dudes!`,
                            `Daily Mystery Pick: +${wonPrize.value} OH YEAH!`
                        ];
                        
                        const randomMessage = boltMessages[Math.floor(Math.random() * boltMessages.length)];
                        this.showSpeechBubble(randomMessage, 'regular');
                    }
                }, 500); // 500ms delay to ensure this speech plays after any other conflicting speech
                
                // Only mark as played if cheat is not active
                if (!this.isObonxoCheatActive) {
                    this.data.mysteryGamePlayed = true;
                }
                this.saveData();
            },

            closeMysteryResult() {
                const modal = document.getElementById('mysteryResultModal');
                modal.classList.remove('active');
                
                // Reset game state
                this.data.mysteryGameState = {
                    isActive: false,
                    gamePhase: 'start',
                    prizes: [],
                    selectedBox: null,
                    wonPrize: null,
                    isLocked: false
                };
                
                // Ensure close button is re-enabled
                this.updateMysteryCloseButton(true);
                
                // If OBONXO cheat is active, reset the played status for testing
                if (this.isObonxoCheatActive) {
                    this.data.mysteryGamePlayed = false;
                }
                
                // Re-render the mystery game to show current status
                this.renderMissions();
            }
        };

        // Extend app object with battle system functions
        app.updateTeamSelectionUI = function() {
            // Update team count
            const teamCount = document.getElementById('teamCount');
            if (teamCount) {
                teamCount.textContent = TeamManager.selectedTeam.length;
            }
            
            // Update team analysis
            const analysis = TeamManager.getTeamAnalysis();
            const teamAnalysisEl = document.getElementById('teamAnalysis');
            if (teamAnalysisEl) {
                if (analysis.size === 0) {
                    teamAnalysisEl.textContent = 'Select robots to see team composition';
                } else {
                    const roleText = Object.entries(analysis.roles).map(([role, count]) => 
                        `${count} ${role}${count > 1 ? 's' : ''}`
                    ).join(', ');
                    teamAnalysisEl.textContent = `Roles: ${roleText}`;
                }
            }
            
            // Update selected team grid
            app.updateSelectedTeamGrid();
            
            // Update available robots grid
            app.updateAvailableRobotsGrid();
            
            // Update start battle button
            const startBtn = document.getElementById('startBattleBtn');
            if (startBtn) {
                startBtn.disabled = !TeamManager.isTeamComplete();
            }
        };

        app.updateSelectedTeamGrid = function() {
            const grid = document.getElementById('selectedTeamGrid');
            if (!grid) return;
            
            const slots = grid.querySelectorAll('.squad-slot');
            slots.forEach((slot, index) => {
                const robotId = TeamManager.selectedTeam[index];
                const slotNumber = slot.querySelector('.slot-number');
                const slotLabel = slot.querySelector('.slot-label');
                
                if (robotId) {
                    const robot = RobotDatabase.getRobot(robotId);
                    slot.className = 'squad-slot filled';
                    slotLabel.innerHTML = `
                        <div style="font-weight: 600; margin-bottom: 2px;">${robot.name}</div>
                        <div style="font-size: 8px;">${robot.mp} MP • ${robot.role}</div>
                    `;
                    slot.onclick = () => {
                        TeamManager.removeFromTeam(robotId);
                        app.updateTeamSelectionUI();
                    };
                    slot.title = `Click to remove ${robot.name}`;
                } else {
                    slot.className = 'squad-slot empty';
                    slotLabel.textContent = 'Empty';
                    slot.onclick = null;
                    slot.title = 'Select a robot from the bay below';
                }
            });
        };

        app.updateAvailableRobotsGrid = function() {
            console.log('🔧 updateAvailableRobotsGrid called');
            const grid = document.getElementById('robotsGrid');
            if (!grid) {
                console.error('❌ robotsGrid element not found!');
                return;
            }
            
            console.log('📐 Grid element found:', grid);
            console.log('📏 Grid dimensions:', grid.offsetWidth, 'x', grid.offsetHeight);
            console.log('👁️ Grid visibility:', getComputedStyle(grid).display, getComputedStyle(grid).visibility);
            
            console.log('🤖 Getting available robots (filtered by ownership)...');
            const availableRobotIds = TeamManager.getAvailableRobots();
            const allRobots = availableRobotIds.map(id => RobotDatabase.getRobot(id));
            console.log('📊 Found available robots:', allRobots.length, allRobots.map(r => r.name));
            
            if (allRobots.length === 0) {
                console.error('❌ No robots found in database!');
                grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 20px;">No robots available</div>';
                return;
            }
            
            grid.innerHTML = '';
            
            allRobots.forEach(robot => {
                const isSelected = TeamManager.selectedTeam.includes(robot.id);
                const isTeamFull = TeamManager.selectedTeam.length >= TeamManager.maxTeamSize;
                const isDisabled = isSelected || (isTeamFull && !isSelected);
                
                const card = document.createElement('div');
                card.className = `robot-card ${isSelected ? 'selected' : ''} ${isDisabled && !isSelected ? 'disabled' : ''}`;
                
                // Create wheel visualization
                const wheelSegments = robot.wheel.map(segment => {
                    const width = (segment.size / 96) * 100;
                    const moveType = segment.moveType ? segment.moveType.toLowerCase() : 'unknown';
                    const moveName = segment.moveName || 'Unknown Move';
                    return `<div class="wheel-segment ${moveType}" style="width: ${width}%;" title="${moveName}"></div>`;
                }).join('');
                
                card.innerHTML = `
                    <div class="robot-card-header">
                        <img src="${robot.image}" alt="${robot.name}" class="robot-card-image">
                        <div>
                            <div class="robot-card-name">${robot.name}</div>
                            <div class="robot-card-role">${robot.role}</div>
                        </div>
                    </div>
                    <div class="robot-card-stats">
                        <div class="robot-stat"><strong>MP:</strong> ${robot.mp}</div>
                    </div>
                    <div class="robot-card-description">${robot.description}</div>
                    <div class="robot-card-wheel">${wheelSegments}</div>
                    <div style="font-size: 10px; color: var(--text-secondary);">${robot.ability.name}</div>
                `;
                
                if (!isDisabled) {
                    card.onclick = () => {
                        if (isSelected) {
                            TeamManager.removeFromTeam(robot.id);
                        } else {
                            if (TeamManager.selectedTeam.length >= TeamManager.maxTeamSize) {
                                app.showSquadFullMessage('Squad is full! Remove a robot first.');
                                return;
                            }
                            TeamManager.addToTeam(robot.id);
                        }
                        app.updateTeamSelectionUI();
                    };
                } else if (isTeamFull && !isSelected) {
                    card.onclick = () => {
                        app.showSquadFullMessage('Squad is full! Remove a robot first.');
                    };
                }
                
                grid.appendChild(card);
                console.log('🎯 Added robot card to grid:', robot.name);
            });
            
            console.log('✅ Robot grid update complete. Total cards:', allRobots.length);
        };

        app.showSquadFullMessage = function(message) {
            // Create temporary message element
            const messageEl = document.createElement('div');
            messageEl.textContent = message;
            messageEl.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--surface);
                color: var(--text);
                padding: 16px 24px;
                border-radius: 8px;
                border: 2px solid var(--primary);
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                font-weight: 600;
                text-align: center;
            `;
            
            document.body.appendChild(messageEl);
            
            // Remove after 2 seconds
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.parentNode.removeChild(messageEl);
                }
            }, 2000);
        };

        app.startBattleWithTeam = function() {
            if (!TeamManager.isTeamComplete()) {
                app.showSquadFullMessage('Please select 6 robots before starting battle!');
                return;
            }
            
            console.log('🚀 Starting battle with selected team:', TeamManager.selectedTeam);
            
            const playerTeam = TeamManager.selectedTeam;
            let opponentTeam = [];

            if (app.currentBattleMode === 'ai' && app.currentAIDifficulty === 'easy') {
                opponentTeam = app.getEasyAIOpponentTeam(playerTeam);
                TeamManager.opponentTeam = opponentTeam.slice();
                console.log('🤖 Easy AI Team:', opponentTeam);
            } else {
                opponentTeam = TeamManager.selectedTeam.map(robotId => robotId + '-opp');
                TeamManager.opponentTeam = opponentTeam.slice();
                console.log('🎮 DEBUG MODE: Player controls both sides');
                console.log('👤 Player Team:', playerTeam);
                console.log('🤖 Opponent Team:', opponentTeam);
            }
            
            // Transition to battle game phase
            app.showBattleGamePhase();
            
            // Initialize battle with both teams
            setTimeout(() => {
                BattleSystem.initializeBattleWithTeams(playerTeam, opponentTeam);

                if (app.currentBattleMode === 'ai' && app.currentAIDifficulty === 'easy') {
                    BattleSystem.disableDebugMode();
                    BattleSystem.currentControlTeam = 'player';
                    if (typeof app.hideDebugControlUI === 'function') {
                        app.hideDebugControlUI();
                    }
                    console.log('[AI BATTLE] Easy mode battle initialized');
                } else {
                    BattleSystem.enableDebugMode();
                }
            }, 500);
        };

        app.getEasyAIOpponentTeam = function(playerTeam) {
            const opponentTeam = [];
            for (const robotId of playerTeam) {
                opponentTeam.push(`${robotId}-opp`);
            }
            return opponentTeam;
        };

        app.hideDebugControlUI = function() {
            const debugBtn = document.getElementById('debug-switch-btn');
            if (debugBtn && debugBtn.parentNode) {
                debugBtn.parentNode.removeChild(debugBtn);
            }

            const statusIndicator = document.getElementById('turn-status-indicator');
            if (statusIndicator && statusIndicator.parentNode) {
                statusIndicator.parentNode.removeChild(statusIndicator);
            }

            console.log('[AI BATTLE] Debug controls disabled for AI mode');
        };

        app.showBattleGamePhase = function() {
            // Hide team selection phase, show battle game phase
            document.getElementById('teamSelectionPhase').style.display = 'none';
            document.getElementById('battleGamePhase').style.display = 'block';
            
            // Update header
            document.getElementById('battleTitle').textContent = '⚔️ Battle Arena';
            document.getElementById('battleSubtitle').textContent = 'Strategic Robot Combat';
            
            console.log("Battle game phase activated");
            
            // START BATTLE MUSIC (plays throughout entire game)
            if (BattleSystem.battleMusic) {
                BattleSystem.battleMusic.currentTime = 0; // Restart from beginning
                BattleSystem.battleMusic.play().catch(err => {
                    console.warn('🎵 Could not play battle music:', err);
                });
                console.log('🎵 Battle music started - will play throughout game');
            }
            
            // START WITH FIRST TURN SPINNER!
            console.log('🎲 Spinning for first turn...');
            app.showFirstTurnSpinner();
        };
        
        // ==========================================
        // FIRST TURN SPINNER SYSTEM (WITH PROPER WHEEL)
        // ==========================================
        app.showFirstTurnSpinner = function() {
            const overlay = document.getElementById('firstTurnSpinner');
            const resultText = document.getElementById('spinnerResult');
            
            // Show overlay
            overlay.style.display = 'flex';
            resultText.style.opacity = '0';
            
            // Create wheel data - simple 2 segments (50-50)
            const wheelData = [
                { team: 'player', size: 48, color: '#00c8ff', label: 'PLAYER' },
                { team: 'opponent', size: 48, color: '#ff3232', label: 'OPPONENT' }
            ];
            
            // Build visual wheel
            this.buildFirstTurnWheel('firstTurnWheelSegments', wheelData);
            
            // Decide winner (50/50)
            const winner = Math.random() < 0.5 ? 'player' : 'opponent';
            console.log('🎲 First turn winner (pre-determined):', winner);
            
            // Calculate spin position - land in CENTER of winning segment
            let spinPosition;
            if (winner === 'player') {
                // Player segment is positions 1-48, center is around 24
                spinPosition = 20 + Math.floor(Math.random() * 9); // Positions 20-28 (center 9 positions)
            } else {
                // Opponent segment is positions 49-96, center is around 72
                spinPosition = 68 + Math.floor(Math.random() * 9); // Positions 68-76 (center 9 positions)
            }
            
            console.log(`🎯 Landing on ${winner} segment at position ${spinPosition}`);
            
            // Calculate rotation angle
            const wheelElement = document.getElementById('firstTurnWheelSegments');
            const finalRotation = this.calculateFirstTurnRotation(wheelData, spinPosition);
            
            // Reset wheel position
            wheelElement.style.transition = 'none';
            wheelElement.style.transform = 'rotate(0deg)';
            void wheelElement.offsetWidth; // Trigger reflow
            
            // Start spinning animation
            setTimeout(() => {
                wheelElement.style.transition = 'transform 3.5s cubic-bezier(0.22, 0.61, 0.36, 1)';
                wheelElement.style.transform = `rotate(${finalRotation}deg)`;
                
                // Show result after animation
                setTimeout(() => {
                    this.showSpinnerResult(winner);
                }, 3600);
            }, 100);
        };
        
        app.buildFirstTurnWheel = function(elementId, wheelData) {
            const wheelElement = document.getElementById(elementId);
            if (!wheelElement) return;
            
            // Clear existing
            wheelElement.innerHTML = '';
            
            // Calculate total size
            const totalSize = wheelData.reduce((sum, seg) => sum + seg.size, 0);
            
            // Create conic gradient
            let gradientSegments = [];
            let currentAngle = 0;
            
            wheelData.forEach((segment, index) => {
                const segmentAngle = (segment.size / totalSize) * 360;
                gradientSegments.push(`${segment.color} ${currentAngle}deg ${currentAngle + segmentAngle}deg`);
                
                // Add label to the segment
                if (segment.label) {
                    const label = document.createElement('div');
                    label.className = 'first-turn-label';
                    label.textContent = segment.label;
                    
                    // Position label at center of segment
                    const labelAngle = currentAngle + (segmentAngle / 2);
                    const labelRadius = 45; // % from center
                    const radians = (labelAngle - 90) * (Math.PI / 180);
                    const x = 50 + (labelRadius * Math.cos(radians));
                    const y = 50 + (labelRadius * Math.sin(radians));
                    
                    label.style.left = `${x}%`;
                    label.style.top = `${y}%`;
                    label.style.transform = `translate(-50%, -50%) rotate(${labelAngle}deg)`;
                    
                    wheelElement.appendChild(label);
                }
                
                currentAngle += segmentAngle;
            });
            
            wheelElement.style.background = `conic-gradient(${gradientSegments.join(', ')})`;
        };
        
        app.calculateFirstTurnRotation = function(wheelData, spinPosition) {
            const totalSize = wheelData.reduce((sum, seg) => sum + seg.size, 0);
            let cumulative = 0;
            let segmentStartAngle = 0;
            let segmentEndAngle = 0;
            
            for (const segment of wheelData) {
                const segmentAngle = (segment.size / totalSize) * 360;
                
                if (spinPosition > cumulative && spinPosition <= cumulative + segment.size) {
                    segmentStartAngle = (cumulative / totalSize) * 360;
                    segmentEndAngle = ((cumulative + segment.size) / totalSize) * 360;
                    
                    const positionInSegment = spinPosition - cumulative;
                    const angleInSegment = (positionInSegment / segment.size) * segmentAngle;
                    const targetAngle = segmentStartAngle + angleInSegment;
                    
                    // Add multiple rotations for drama (1800° = 5 full spins)
                    const fullRotations = 1800;
                    const finalAngle = fullRotations + targetAngle;
                    
                    return finalAngle;
                }
                
                cumulative += segment.size;
            }
            
            return 1800; // Fallback
        };
        
        app.showSpinnerResult = function(winner) {
            const resultText = document.getElementById('spinnerResult');
            
            // Show result
            if (winner === 'player') {
                resultText.textContent = '🎮 PLAYER GOES FIRST';
                resultText.style.color = '#00c8ff';
            } else {
                resultText.textContent = '🤖 OPPONENT GOES FIRST';
                resultText.style.color = '#ff3232';
            }
            
            resultText.style.animation = 'resultFadeIn 0.5s ease forwards';
            resultText.style.opacity = '1';
            
            // Wait, then hide spinner and start game
            setTimeout(() => {
                this.hideFirstTurnSpinner(winner);
            }, 2500);
        };
        
        app.hideFirstTurnSpinner = function(winner) {
            const overlay = document.getElementById('firstTurnSpinner');
            const wheelElement = document.getElementById('firstTurnWheelSegments');
            const resultText = document.getElementById('spinnerResult');
            
            // Fade out
            overlay.style.animation = 'fadeOut 0.5s ease forwards';
            
            setTimeout(() => {
                overlay.style.display = 'none';
                
                // Reset for next time
                wheelElement.style.transition = 'none';
                wheelElement.style.transform = 'rotate(0deg)';
                resultText.style.opacity = '0';
                resultText.style.animation = '';
                overlay.style.animation = '';
                
                // Start the game with the winner's turn
                console.log(`🎮 Starting ${winner}'s turn...`);
                
                // Log to battle history
                BattleSystem.addToHistory(`🎲 First turn: ${winner.toUpperCase()} goes first!`, 'system', null);
                
                if (winner === 'player') {
                    BattleSystem.setState(BattleSystem.gameStates.PLAYER_TURN);
                } else {
                    BattleSystem.setState(BattleSystem.gameStates.AI_TURN);
                }
            }, 500);
        };

