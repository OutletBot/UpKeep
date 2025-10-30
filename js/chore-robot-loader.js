        // ==========================================
        // CHORE ROBOT LOADER SYSTEM - Component-Based Architecture
        // Handles loading of chore robots from individual components
        // ==========================================
        
        const ChoreRobotLoader = {
            // Registry of all chore robots
            robotRegistry: [],
            
            // Shopkeeper dialogue
            scrappyDialogue: null,
            
            // Loaded robot data cache
            loadedRobots: {},
            
            // Paths
            registryPath: 'robots/unified-registry.json',
            scrappyDialoguePath: 'robots/scrappy-dialogue.json',
            robotBasePath: 'robots/',
            
            // Initialization flag
            initialized: false,
            
            // Statistics
            stats: {
                totalRobots: 0,
                loadedRobots: 0,
                failedLoads: 0
            },
            
            // ==========================================
            // INITIALIZATION
            // ==========================================
            
            async initialize() {
                if (this.initialized) {
                    console.log('ℹ️ ChoreRobotLoader already initialized');
                    return true;
                }
                
                console.log('📦 Initializing Chore Robot Loader...');
                
                try {
                    // Load registry and scrappy dialogue in parallel
                    const [registry, dialogue] = await Promise.all([
                        this.loadRegistry(),
                        this.loadScrappyDialogue()
                    ]);
                    
                    if (!registry || registry.length === 0) {
                        console.warn('⚠️ Chore robot registry is empty, using fallback');
                        return false;
                    }
                    
                    this.robotRegistry = registry;
                    this.scrappyDialogue = dialogue;
                    this.stats.totalRobots = registry.length;
                    this.initialized = true;
                    
                    console.log(`✅ Chore Robot Loader initialized: ${registry.length} robots available`);
                    if (this.scrappyDialogue) {
                        console.log('✅ Scrappy dialogue loaded');
                    }
                    
                    return true;
                    
                } catch (error) {
                    console.error('❌ Failed to initialize ChoreRobotLoader:', error);
                    return false;
                }
            },
            
            // ==========================================
            // REGISTRY & DIALOGUE LOADING
            // ==========================================
            
            async loadRegistry() {
                try {
                    const response = await fetch(this.registryPath);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    const registry = await response.json();
                    return registry;
                    
                } catch (error) {
                    console.error('❌ Failed to load chore robot registry:', error);
                    return null;
                }
            },
            
            async loadScrappyDialogue() {
                try {
                    console.log(`🔍 Attempting to load Scrappy dialogue from: ${this.scrappyDialoguePath}`);
                    const response = await fetch(this.scrappyDialoguePath);
                    
                    if (!response.ok) {
                        console.error(`❌ Scrappy dialogue fetch failed with HTTP ${response.status}`);
                        console.error(`   URL: ${response.url}`);
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    const dialogue = await response.json();
                    console.log(`✅ Scrappy dialogue JSON parsed successfully`);
                    console.log(`   - Categories: ${Object.keys(dialogue).join(', ')}`);
                    console.log(`   - Purchased lines: ${dialogue.purchased?.length || 0}`);
                    return dialogue;
                    
                } catch (error) {
                    console.error('❌ Failed to load scrappy dialogue:', error);
                    console.error('   Path attempted:', this.scrappyDialoguePath);
                    console.error('   Error type:', error.name);
                    console.error('   Error message:', error.message);
                    return null;
                }
            },
            
            // ==========================================
            // ROBOT DATA LOADING
            // ==========================================
            
            async loadDialogue(robotFolder, retries = 3) {
                const dialoguePath = `${this.robotBasePath}${robotFolder}/dialogue.json`;
                
                for (let attempt = 1; attempt <= retries; attempt++) {
                    try {
                        const response = await fetch(dialoguePath, {
                            cache: 'no-cache' // Force fresh load
                        });
                        
                        if (!response.ok) {
                            if (attempt === retries) {
                                console.log(`ℹ️ No custom dialogue found for ${robotFolder} after ${retries} attempts`);
                                return null;
                            }
                            // Retry after delay
                            await new Promise(resolve => setTimeout(resolve, 100 * attempt));
                            continue;
                        }
                        
                        const dialogue = await response.json();
                        
                        // Validate dialogue structure
                        if (!dialogue || typeof dialogue !== 'object') {
                            throw new Error('Invalid dialogue structure');
                        }
                        
                        console.log(`✅ Loaded dialogue for ${robotFolder} (attempt ${attempt}/${retries})`);
                        return dialogue;
                        
                    } catch (error) {
                        if (attempt === retries) {
                            console.warn(`⚠️ Failed to load dialogue for ${robotFolder} after ${retries} attempts:`, error.message);
                            return null;
                        }
                        // Retry after delay
                        console.log(`🔄 Retrying dialogue load for ${robotFolder} (attempt ${attempt}/${retries})`);
                        await new Promise(resolve => setTimeout(resolve, 100 * attempt));
                    }
                }
                
                return null;
            },
            
            async loadRobot(robotId) {
                // Check cache first
                if (this.loadedRobots[robotId]) {
                    return this.loadedRobots[robotId];
                }
                
                // Find robot in registry
                const robotInfo = this.robotRegistry.find(r => r.id === robotId);
                
                if (!robotInfo) {
                    console.warn(`⚠️ Chore robot ${robotId} not found in registry`);
                    this.stats.failedLoads++;
                    return null;
                }
                
                try {
                    // Load robot data and dialogue in parallel
                    const dataPath = `${this.robotBasePath}${robotInfo.folder}/chore-data.json`;
                    const [dataResponse, dialogueData] = await Promise.all([
                        fetch(dataPath),
                        this.loadDialogue(robotInfo.folder)
                    ]);
                    
                    if (!dataResponse.ok) {
                        throw new Error(`HTTP ${dataResponse.status}`);
                    }
                    
                    const robotData = await dataResponse.json();
                    
                    // Validate dialogue for robots that require it (like APIBOT2)
                    const requiresDialogue = robotData.id === 'APIBOT2' || robotData.specialFeatures?.enhancedIntelligence;
                    if (requiresDialogue && !dialogueData) {
                        console.error(`❌ CRITICAL: ${robotData.id} requires dialogue but it failed to load!`);
                        // Try one more time synchronously
                        console.log(`🔄 Final attempt to load dialogue for ${robotData.id}...`);
                        dialogueData = await this.loadDialogue(robotInfo.folder, 1);
                        if (!dialogueData) {
                            throw new Error(`Failed to load required dialogue for ${robotData.id}`);
                        }
                    }
                    
                    // Build full robot object with resolved paths from new structure
                    const fullRobot = {
                        id: robotData.id,
                        name: robotInfo.name, // Use name from registry
                        cost: robotData.cost,
                        purchasable: robotData.purchasable,
                        folder: robotInfo.folder,
                        
                        // Resolve asset paths from new imagePaths structure
                        happyImage: robotData.imagePaths?.happy || `${this.robotBasePath}${robotInfo.folder}/images/happy.png`,
                        sadImage: robotData.imagePaths?.sad || `${this.robotBasePath}${robotInfo.folder}/images/sad.png`,
                        thinkingImage: robotData.imagePaths?.thinking || `${this.robotBasePath}${robotInfo.folder}/images/thinking.png`,
                        shadowImagePath: robotData.imagePaths?.shadow || `${this.robotBasePath}${robotInfo.folder}/images/shadow.png`,
                        actualImagePath: robotData.imagePaths?.happy || `${this.robotBasePath}${robotInfo.folder}/images/happy.png`, // Store uses happy image
                        
                        // Dialogue loaded from separate dialogue.json file
                        hasCustomDialogue: dialogueData !== null && dialogueData.hasCustomDialogue !== false,
                        dialogue: dialogueData,
                        
                        // Store complete choreData for battery system
                        choreData: robotData
                    };
                    
                    // Cache the robot
                    this.loadedRobots[robotId] = fullRobot;
                    this.stats.loadedRobots++;
                    
                    console.log(`✅ Loaded chore robot: ${fullRobot.name} ${fullRobot.hasCustomDialogue ? '(with custom dialogue)' : ''}`);
                    
                    return fullRobot;
                    
                } catch (error) {
                    console.error(`❌ Failed to load chore robot ${robotId}:`, error);
                    this.stats.failedLoads++;
                    return null;
                }
            },
            
            // ==========================================
            // BATCH LOADING
            // ==========================================
            
            async loadAllRobots() {
                console.log('📦 Loading all chore robots...');
                const robotIds = this.robotRegistry.map(r => r.id);
                const promises = robotIds.map(id => this.loadRobot(id));
                const results = await Promise.all(promises);
                const robots = results.filter(r => r !== null);
                console.log(`✅ Loaded ${robots.length} / ${robotIds.length} chore robots`);
                return robots;
            },
            
            // ==========================================
            // QUERY & FILTER
            // ==========================================
            
            getPurchasableRobots() {
                return this.robotRegistry.filter(r => r.purchasable);
            },
            
            getRobotById(robotId) {
                return this.robotRegistry.find(r => r.id === robotId);
            },
            
            // Build storeRobots array format for compatibility
            buildStoreRobotsArray() {
                return this.getPurchasableRobots().map(r => {
                    // Get the loaded robot data which has the actual image paths
                    const loadedRobot = this.loadedRobots[r.id];
                    
                    return {
                        id: r.id,
                        cost: r.cost,
                        shadowImagePath: loadedRobot?.shadowImagePath || `${this.robotBasePath}${r.folder}/images/shadow.png`,
                        actualImagePath: loadedRobot?.actualImagePath || `${this.robotBasePath}${r.folder}/images/happy.png`,
                        name: r.name,
                        clue: r.clue || null  // Include clue from registry for purchase confirmation hints
                    };
                });
            },
            
            // ==========================================
            // STATISTICS
            // ==========================================
            
            getStats() {
                return {
                    ...this.stats,
                    cacheSize: Object.keys(this.loadedRobots).length,
                    registrySize: this.robotRegistry.length,
                    hasScrappyDialogue: this.scrappyDialogue !== null,
                    loadSuccessRate: this.stats.loadedRobots > 0 
                        ? ((this.stats.loadedRobots / (this.stats.loadedRobots + this.stats.failedLoads)) * 100).toFixed(1) + '%'
                        : 'N/A'
                };
            },
            
            clearCache() {
                const count = Object.keys(this.loadedRobots).length;
                this.loadedRobots = {};
                console.log(`🗑️ Cleared ${count} chore robots from cache`);
            }
        };
