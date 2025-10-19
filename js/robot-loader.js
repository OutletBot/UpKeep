        // ==========================================
        // ROBOT LOADER SYSTEM - Component-Based Architecture
        // Handles loading of 150+ robots from individual components
        // ==========================================
        
        const RobotLoader = {
            // Registry of all available robots (loaded from robots/registry.json)
            robotRegistry: [],
            
            // Cache of loaded robot data
            loadedRobots: {},
            
            // Base paths
            registryPath: 'robots/registry.json',
            assetBasePath: '',  // Will use paths from registry
            
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
                    console.log('ℹ️ RobotLoader already initialized');
                    return true;
                }
                
                console.log('📦 Initializing Robot Loader System...');
                
                try {
                    // Load robot registry
                    const registry = await this.loadRegistry();
                    
                    if (!registry || registry.length === 0) {
                        console.warn('⚠️ Robot registry is empty, using fallback');
                        return false;
                    }
                    
                    this.robotRegistry = registry;
                    this.stats.totalRobots = registry.length;
                    this.initialized = true;
                    
                    console.log(`✅ Robot Loader initialized: ${registry.length} robots available`);
                    console.log(`   - Unique robots: ${this.getUniqueRobotCount()}`);
                    console.log(`   - Rarities: ${this.getRarityCounts()}`);
                    
                    return true;
                    
                } catch (error) {
                    console.error('❌ Failed to initialize RobotLoader:', error);
                    return false;
                }
            },
            
            // ==========================================
            // REGISTRY LOADING
            // ==========================================
            
            async loadRegistry() {
                try {
                    const response = await fetch(this.registryPath);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    const registry = await response.json();
                    this.stats.loaded = true;
                    
                    // WHITELIST: Only allow these robots in battle
                    const allowedRobots = [
                        'unit-001-uc-0',    // Jack-o'-Bot (Bulbasaur stats)
                        'unit-003-ex-0',    // Venusaur (default)
                        'unit-006-ex-0',    // Mega Rocket Man (Charizard stats)
                        'unit-025-r-0',     // Pika-Bot (Pikachu stats)
                        'unit-150-ex-0',    // Buzz Lite-Point-0 (Mewtwo stats)
                        'clown-bot',        // Clown Bot (store)
                        'witch-bot',        // Witch-Bot (store)
                        'freezy',           // Freezy (store)
                        'ghost-bot',        // Ghost Bot (store)
                        'sunic',            // Sunic (store)
                        'ouija-bot'         // Ouija-Bot (store)
                    ];
                    
                    // Filter to only include whitelisted robots
                    const filteredRegistry = registry.filter(robot => 
                        allowedRobots.includes(robot.id)
                    );
                    
                    console.log(`🔒 Filtered robots: ${registry.length} → ${filteredRegistry.length} allowed`);
                    
                    return filteredRegistry;
                    
                } catch (error) {
                    console.error('❌ Failed to load robot registry:', error);
                    this.stats.loaded = false;
                    return [];
                }
            },
            
            // ==========================================
            // ROBOT DATA LOADING
            // ==========================================
            
            async loadRobotData(robotId) {
                // Check cache first
                if (this.loadedRobots[robotId]) {
                    return this.loadedRobots[robotId];
                }
                
                // Find robot in registry
                const robotInfo = this.robotRegistry.find(r => r.id === robotId);
                
                if (!robotInfo) {
                    console.warn(`⚠️ Robot ${robotId} not found in registry`);
                    this.stats.failedLoads++;
                    return null;
                }
                
                try {
                    // Load attack JSON from asset path
                    const dataPath = `${robotInfo.assetPath}/${robotInfo.dataFile}`;
                    const response = await fetch(dataPath);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}`);
                    }
                    
                    const attackData = await response.json();
                    
                    // Convert to our format
                    const robotData = this.convertToRobotFormat(robotInfo, attackData);
                    
                    // Cache the robot
                    this.loadedRobots[robotId] = robotData;
                    this.stats.loadedRobots++;
                    
                    console.log(`✅ Loaded robot: ${robotData.name} (#${robotInfo.number})${robotData.requiresPurchase ? ' 🔒' : ''}`);
                    
                    return robotData;
                    
                } catch (error) {
                    console.error(`❌ Failed to load robot ${robotId}:`, error);
                    this.stats.failedLoads++;
                    return null;
                }
            },
            
            // ==========================================
            // DATA FORMAT CONVERSION
            // ==========================================
            
            convertToRobotFormat(robotInfo, attackData) {
                // Convert attack JSON format to our wheel format
                const wheel = [];
                const statusWheels = {};
                
                // Check if this is NEW format (custom robots) or OLD format (Pokemon)
                const isNewFormat = attackData.attacks && attackData.attacks.basic;
                
                if (isNewFormat) {
                    // NEW FORMAT: Custom robots (clown-bot, witch-bot, freezy)
                    attackData.attacks.basic.forEach(attack => {
                        wheel.push({
                            moveName: attack.moveName,
                            moveType: attack.moveType,
                            size: attack.size,
                            damage: attack.damage || null,
                            stars: attack.stars || null,
                            effect: attack.effect || 'None'
                        });
                    });
                    
                    // Process status wheels for new format
                    Object.keys(attackData.attacks).forEach(status => {
                        if (status !== 'basic') {
                            statusWheels[status] = attackData.attacks[status];
                        }
                    });
                } else {
                    // OLD FORMAT: Pokemon battle data
                    if (attackData.attack_lists_by_type && attackData.attack_lists_by_type.basic) {
                        attackData.attack_lists_by_type.basic.forEach(attack => {
                            wheel.push({
                                moveName: attack.attack_name,
                                moveType: attack.attack_type,
                                size: attack.attack_wheel_size,
                                damage: attack.attack_value && !isNaN(attack.attack_value) ? parseInt(attack.attack_value) : null,
                                stars: attack.attack_value === '☆' ? 1 : (attack.attack_value === '☆☆' ? 2 : (attack.attack_value === '☆☆☆' ? 3 : null)),
                                effect: attack.attack_ability || 'None'
                            });
                        });
                    }
                    
                    // Process status wheels for old format
                    if (attackData.attack_lists_by_type) {
                        Object.keys(attackData.attack_lists_by_type).forEach(status => {
                            if (status !== 'basic') {
                                statusWheels[status] = attackData.attack_lists_by_type[status].map(attack => ({
                                    moveName: attack.attack_name,
                                    moveType: attack.attack_type,
                                    size: attack.attack_wheel_size,
                                    damage: attack.attack_value && !isNaN(attack.attack_value) ? parseInt(attack.attack_value) : null,
                                    stars: attack.attack_value === '☆' ? 1 : (attack.attack_value === '☆☆' ? 2 : (attack.attack_value === '☆☆☆' ? 3 : null)),
                                    effect: attack.attack_ability || 'None'
                                }));
                            }
                        });
                    }
                }
                
                // Build complete robot data
                const mp = attackData.mp || attackData.base_movement_points || robotInfo.mp;
                const name = attackData.name || attackData.pokemon_name || robotInfo.name;
                const type = attackData.type || attackData.pokemon_type || robotInfo.type;
                const abilityData = attackData.ability || { name: `${name} Power`, description: `Special ability for ${name}` };
                const statsData = attackData.stats || this.generateStats(robotInfo.rarity, mp);
                const imageData = attackData.image || `${robotInfo.assetPath}/${robotInfo.spriteFile}`;
                
                const robotData = {
                    id: robotInfo.id,
                    name: name,
                    number: robotInfo.number,
                    rarity: robotInfo.rarity,
                    variation: robotInfo.variation,
                    mp: mp,
                    role: attackData.role || this.guessRole(mp),
                    type: type,
                    description: `${robotInfo.rarity} rarity unit with ${mp} movement points.`,
                    image: imageData,
                    
                    ability: abilityData,
                    
                    wheel: wheel,
                    statusWheels: Object.keys(statusWheels).length > 0 ? statusWheels : undefined,
                    
                    stats: statsData,
                    
                    // Ownership & Purchase
                    requiresPurchase: robotInfo.requiresPurchase || false,
                    
                    // Metadata
                    evolution: attackData.evolution || '',
                    evolvedFrom: attackData.evolved_from || '',
                    evolutionNum: attackData.evolution_num || 0
                };
                
                return robotData;
            },
            
            // ==========================================
            // HELPER FUNCTIONS
            // ==========================================
            
            guessRole(mp) {
                // Guess role based on movement points
                if (mp === 3) return 'Scout';
                if (mp === 2) return 'All-Rounder';
                if (mp === 1) return 'Goalie';
                return 'All-Rounder';
            },
            
            generateStats(rarity, mp) {
                // Generate balanced stats based on rarity
                const baseStats = {
                    'C': { hp: 80, attack: 70, defense: 60, speed: 70 },
                    'UC': { hp: 90, attack: 75, defense: 65, speed: 75 },
                    'R': { hp: 100, attack: 85, defense: 75, speed: 80 },
                    'EX': { hp: 120, attack: 100, defense: 90, speed: 90 }
                };
                
                const stats = baseStats[rarity] || baseStats['C'];
                
                // Adjust for movement
                if (mp === 3) {
                    stats.speed += 10;
                    stats.hp -= 10;
                } else if (mp === 1) {
                    stats.hp += 20;
                    stats.speed -= 15;
                }
                
                return stats;
            },
            
            getUniqueRobotCount() {
                const uniqueNumbers = new Set(this.robotRegistry.map(r => r.number));
                return uniqueNumbers.size;
            },
            
            getRarityCounts() {
                const counts = {};
                this.robotRegistry.forEach(r => {
                    counts[r.rarity] = (counts[r.rarity] || 0) + 1;
                });
                return Object.entries(counts).map(([k, v]) => `${k}:${v}`).join(', ');
            },
            
            // ==========================================
            // BATCH LOADING
            // ==========================================
            
            async loadRobots(robotIds) {
                const promises = robotIds.map(id => this.loadRobotData(id));
                const results = await Promise.all(promises);
                return results.filter(r => r !== null);
            },
            
            async loadAllRobots() {
                console.log('📦 Loading all 150 robots...');
                const robotIds = this.robotRegistry.map(r => r.id);
                const robots = await this.loadRobots(robotIds);
                console.log(`✅ Loaded ${robots.length} / ${robotIds.length} robots`);
                return robots;
            },
            
            // ==========================================
            // QUERY & FILTER
            // ==========================================
            
            getAvailableRobots(filter = {}) {
                let robots = [...this.robotRegistry];
                
                if (filter.rarity) {
                    robots = robots.filter(r => r.rarity === filter.rarity);
                }
                
                if (filter.type) {
                    robots = robots.filter(r => r.type && r.type.includes(filter.type));
                }
                
                if (filter.number) {
                    robots = robots.filter(r => r.number === filter.number);
                }
                
                if (filter.enabled !== undefined) {
                    robots = robots.filter(r => r.enabled === filter.enabled);
                }
                
                return robots;
            },
            
            getRobotById(robotId) {
                return this.robotRegistry.find(r => r.id === robotId);
            },
            
            getRobotsByNumber(number) {
                return this.robotRegistry.filter(r => r.number === number);
            },
            
            // ==========================================
            // STATISTICS
            // ==========================================
            
            getStats() {
                return {
                    ...this.stats,
                    cacheSize: Object.keys(this.loadedRobots).length,
                    registrySize: this.robotRegistry.length,
                    loadSuccessRate: this.stats.loadedRobots > 0 
                        ? ((this.stats.loadedRobots / (this.stats.loadedRobots + this.stats.failedLoads)) * 100).toFixed(1) + '%'
                        : 'N/A'
                };
            },
            
            clearCache() {
                const count = Object.keys(this.loadedRobots).length;
                this.loadedRobots = {};
                console.log(`🗑️ Cleared ${count} robots from cache`);
            }
        };
