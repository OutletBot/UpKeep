        const RobotDatabase = {
            // 6 Unique Placeholder Robots for Team Selection
            robots: {
                'unit-001-uc-0': {
                    id: 'unit-001-uc-0',
                    name: 'Jack-o\'-Bot',
                    requiresPurchase: true,
                    rarity: 'UC',
                    mp: 3,
                    role: 'Scout',
                    type: 'Grass / Poison',
                    description: 'UC rarity unit with 3 movement points. A spooky Halloween bot with haunting powder attacks.',
                    image: 'Imag/Achivments/Images/Jack-0-Bot/Jack-0-Bot.png',
                    ability: {
                        name: 'Spooky Powers',
                        description: 'Can inflict poison and sleep with haunted dust attacks.'
                    },
                    wheel: [
                        {
                            moveName: 'Spooky Poison Dust',
                            moveType: 'Purple',
                            size: 24,
                            stars: 1,
                            effect: 'The battle opponent becomes poisoned'
                        },
                        {
                            moveName: 'Pumpkin Bomb',
                            moveType: 'White',
                            size: 20,
                            damage: 50,
                            effect: 'None'
                        },
                        {
                            moveName: 'Haunted Sleep Dust',
                            moveType: 'Purple',
                            size: 24,
                            stars: 1,
                            effect: 'The battle opponent falls asleep'
                        },
                        {
                            moveName: 'Miss',
                            moveType: 'Red',
                            size: 28,
                            effect: 'None'
                        }
                    ],
                    statusWheels: {
                        poisoned: [
                            {
                                moveName: 'Spooky Poison Dust',
                                moveType: 'Purple',
                                size: 24,
                                stars: 1,
                                effect: 'The battle opponent becomes poisoned'
                            },
                            {
                                moveName: 'Pumpkin Bomb',
                                moveType: 'White',
                                size: 20,
                                damage: 50,
                                effect: 'None'
                            },
                            {
                                moveName: 'Haunted Sleep Dust',
                                moveType: 'Purple',
                                size: 24,
                                stars: 1,
                                effect: 'The battle opponent falls asleep'
                            },
                            {
                                moveName: 'Miss',
                                moveType: 'Red',
                                size: 28,
                                effect: 'None'
                            }
                        ]
                    },
                    stats: {
                        hp: 88,
                        attack: 77,
                        defense: 66,
                        speed: 83
                    }
                },
                'unit-002-c-0': {
                    id: 'unit-002-c-0',
                    name: 'Ivysaur',
                    rarity: 'C',
                    mp: 2,
                    role: 'Vanguard',
                    type: 'Grass / Poison',
                    description: 'C rarity unit with 2 movement points. Evolution of Bulbasaur with stronger attacks.',
                    image: 'robots/Battle-data/Unit-002_C_0/Unit-002_sprite.png',
                    ability: {
                        name: 'Evolved Power',
                        description: 'Stronger attacks than its pre-evolution.'
                    },
                    wheel: [
                        {
                            moveName: 'Vine Whip',
                            moveType: 'White',
                            size: 28,
                            damage: 40,
                            effect: 'None'
                        },
                        {
                            moveName: 'Razor Leaf',
                            moveType: 'White',
                            size: 24,
                            damage: 60,
                            effect: 'None'
                        },
                        {
                            moveName: 'Haunted Sleep Dust',
                            moveType: 'Purple',
                            size: 28,
                            stars: 1,
                            effect: 'The battle opponent falls asleep'
                        },
                        {
                            moveName: 'Miss',
                            moveType: 'Red',
                            size: 16,
                            effect: 'None'
                        }
                    ],
                    statusWheels: {
                        poisoned: [
                            {
                                moveName: 'Vine Whip',
                                moveType: 'White',
                                size: 28,
                                damage: 40,
                                effect: 'None'
                            },
                            {
                                moveName: 'Razor Leaf',
                                moveType: 'White',
                                size: 24,
                                damage: 60,
                                effect: 'None'
                            },
                            {
                                moveName: 'Haunted Sleep Dust',
                                moveType: 'Purple',
                                size: 28,
                                stars: 1,
                                effect: 'The battle opponent falls asleep'
                            },
                            {
                                moveName: 'Miss',
                                moveType: 'Red',
                                size: 16,
                                effect: 'None'
                            }
                        ]
                    },
                    stats: {
                        hp: 80,
                        attack: 70,
                        defense: 60,
                        speed: 50
                    }
                },
                'unit-003-ex-0': {
                    id: 'unit-003-ex-0',
                    name: 'Venusaur',
                    rarity: 'EX',
                    mp: 1,
                    role: 'Sentinel',
                    type: 'Grass / Poison',
                    description: 'EX rarity unit with 1 movement point. Final evolution with devastating Solar Beam attack.',
                    image: 'robots/Battle-data/Unit-003_EX_0/Unit-003_sprite.png',
                    ability: {
                        name: 'Solar Power',
                        description: 'Devastating Solar Beam attack with 150 damage.'
                    },
                    wheel: [
                        {
                            moveName: 'Protect',
                            moveType: 'Blue',
                            size: 20,
                            effect: 'Defensive move'
                        },
                        {
                            moveName: 'Solar Beam',
                            moveType: 'White',
                            size: 36,
                            damage: 150,
                            effect: 'Massive damage attack'
                        },
                        {
                            moveName: 'Haunted Sleep Dust',
                            moveType: 'Purple',
                            size: 32,
                            stars: 1,
                            effect: 'The battle opponent falls asleep'
                        },
                        {
                            moveName: 'Miss',
                            moveType: 'Red',
                            size: 8,
                            effect: 'None'
                        }
                    ],
                    statusWheels: {
                        poisoned: [
                            {
                                moveName: 'Protect',
                                moveType: 'Blue',
                                size: 20,
                                effect: 'Defensive move'
                            },
                            {
                                moveName: 'Solar Beam',
                                moveType: 'White',
                                size: 36,
                                damage: 150,
                                effect: 'Massive damage attack'
                            },
                            {
                                moveName: 'Haunted Sleep Dust',
                                moveType: 'Purple',
                                size: 32,
                                stars: 1,
                                effect: 'The battle opponent falls asleep'
                            },
                            {
                                moveName: 'Miss',
                                moveType: 'Red',
                                size: 8,
                                effect: 'None'
                            }
                        ]
                    },
                    stats: {
                        hp: 120,
                        attack: 105,
                        defense: 90,
                        speed: 38
                    }
                },
                'unit-025-r-0': {
                    id: 'unit-025-r-0',
                    name: 'Pikachu',
                    rarity: 'R',
                    mp: 2,
                    role: 'Vanguard',
                    type: 'Electric',
                    description: 'R rarity unit with 2 movement points. The iconic Electric-type with powerful Thunder attacks.',
                    image: 'robots/Battle-data/Unit-025_R_0/Unit-025_sprite.png',
                    ability: {
                        name: 'Static',
                        description: 'Can paralyze opponents with Thunder Wave.'
                    },
                    wheel: [
                        {
                            moveName: 'Quick Attack',
                            moveType: 'Gold',
                            size: 20,
                            damage: 50,
                            effect: 'Priority attack'
                        },
                        {
                            moveName: 'Thunder',
                            moveType: 'White',
                            size: 12,
                            damage: 100,
                            effect: 'High damage electric attack'
                        },
                        {
                            moveName: 'Thunder Wave',
                            moveType: 'Purple',
                            size: 20,
                            stars: 2,
                            effect: 'The battle opponent becomes paralyzed'
                        },
                        {
                            moveName: 'Thunder Shock',
                            moveType: 'White',
                            size: 40,
                            damage: 30,
                            effect: 'Basic electric attack'
                        },
                        {
                            moveName: 'Miss',
                            moveType: 'Red',
                            size: 4,
                            effect: 'None'
                        }
                    ],
                    statusWheels: {
                        paralyzed: [
                            {
                                moveName: 'Quick Attack',
                                moveType: 'Gold',
                                size: 20,
                                damage: 50,
                                effect: 'Priority attack'
                            },
                            {
                                moveName: 'Thunder',
                                moveType: 'White',
                                size: 12,
                                damage: 100,
                                effect: 'High damage electric attack'
                            },
                            {
                                moveName: 'Miss',
                                moveType: 'Red',
                                size: 20,
                                effect: 'Paralyzed - Thunder Wave becomes Miss'
                            },
                            {
                                moveName: 'Thunder Shock',
                                moveType: 'White',
                                size: 40,
                                damage: 30,
                                effect: 'Basic electric attack'
                            },
                            {
                                moveName: 'Miss',
                                moveType: 'Red',
                                size: 4,
                                effect: 'None'
                            }
                        ]
                    },
                    stats: {
                        hp: 100,
                        attack: 88,
                        defense: 75,
                        speed: 63
                    }
                },
                'unit-150-ex-0': {
                    id: 'unit-150-ex-0',
                    name: 'Mewtwo',
                    rarity: 'EX',
                    mp: 2,
                    role: 'Vanguard',
                    type: 'Psychic',
                    description: 'EX rarity unit with 2 movement points. The legendary Psychic-type with devastating abilities.',
                    image: 'robots/Battle-data/Unit-150_EX_0/Unit-150_sprite.png',
                    ability: {
                        name: 'Legendary Power',
                        description: 'Psychic Shove can knock back multiple opponents and Psycho Cut can deal massive damage.'
                    },
                    wheel: [
                        {
                            moveName: 'Psychic Shove',
                            moveType: 'Purple',
                            size: 32,
                            stars: 2,
                            effect: 'The battle opponent is knocked as far back as possible in a straight line. Any robots it collides with are also knocked back. All affected robots gain Wait.'
                        },
                        {
                            moveName: 'Annihilate',
                            moveType: 'Blue',
                            size: 16,
                            effect: 'This robot moves 2 steps away'
                        },
                        {
                            moveName: 'Psycho Cut',
                            moveType: 'White',
                            size: 40,
                            damage: 70,
                            effect: 'Spin again - if Psycho Cut is spun, it deals +50 damage'
                        },
                        {
                            moveName: 'Miss',
                            moveType: 'Red',
                            size: 8,
                            effect: 'None'
                        }
                    ],
                    statusWheels: {
                        poisoned: [
                            {
                                moveName: 'Psychic Shove',
                                moveType: 'Purple',
                                size: 32,
                                stars: 2,
                                effect: 'The battle opponent is knocked as far back as possible in a straight line. Any robots it collides with are also knocked back. All affected robots gain Wait.'
                            },
                            {
                                moveName: 'Annihilate',
                                moveType: 'Blue',
                                size: 16,
                                effect: 'This robot moves 2 steps away'
                            },
                            {
                                moveName: 'Psycho Cut',
                                moveType: 'White',
                                size: 40,
                                damage: 70,
                                effect: 'Spin again - if Psycho Cut is spun, it deals +50 damage'
                            },
                            {
                                moveName: 'Miss',
                                moveType: 'Red',
                                size: 8,
                                effect: 'None'
                            }
                        ]
                    },
                    stats: {
                        hp: 130,
                        attack: 110,
                        defense: 90,
                        speed: 75
                    }
                },
                'speed-scout': {
                    id: 'speed-scout',
                    name: 'Speed Scout',
                    rarity: 'Common',
                    mp: 3, // High movement - Runner role
                    role: 'Runner',
                    description: 'Fast reconnaissance robot. Excels at reaching key positions quickly.',
                    image: 'Imag/mascot.png',
                    ability: {
                        name: 'Quick Deploy',
                        description: 'Can move immediately after being deployed from bench.'
                    },
                    wheel: [
                        { moveName: 'Dash', moveType: 'White', damage: 20, size: 24, effect: 'None' },
                        { moveName: 'Dodge', moveType: 'Blue', damage: null, size: 32, effect: 'Avoid all attacks' },
                        { moveName: 'Scout', moveType: 'Purple', damage: null, stars: 1, size: 16, effect: 'Move opponent 1 step' },
                        { moveName: 'Miss', moveType: 'Red', damage: null, size: 24, effect: 'Attack fails' }
                    ],
                    stats: { hp: 70, attack: 60, defense: 40, speed: 95 }
                },
                'clown-bot': {
                    id: 'clown-bot',
                    name: 'Clown Bot',
                    requiresPurchase: true,
                    rarity: 'EX',
                    mp: 2,
                    role: 'Vanguard',
                    type: 'Ghost / Poison',
                    description: 'EX rarity unit with 2 movement points. A mischievous clown robot with terrifying spectral abilities.',
                    image: 'robots/clown-bot/images/happy.png',
                    ability: {
                        name: 'Circus Terror',
                        description: 'Spreads chaos and fear across the battlefield, affecting multiple robots in succession.'
                    },
                    wheel: [
                        { moveName: 'Circus Chaos', moveType: 'Purple', size: 32, stars: 4, effect: 'The battle opponent, and a succession of opposing robots adjacent to it, gain Wait 3' },
                        { moveName: 'Balloon Animal Shield', moveType: 'Blue', size: 16, effect: 'Defensive move' },
                        { moveName: 'Pie in the Face', moveType: 'White', size: 40, damage: 120, effect: 'High damage cream pie attack' },
                        { moveName: 'Miss', moveType: 'Red', size: 8, effect: 'None' }
                    ],
                    statusWheels: {
                        poisoned: [
                            { moveName: 'Circus Chaos', moveType: 'Purple', size: 32, stars: 4, effect: 'The battle opponent, and a succession of opposing robots adjacent to it, gain Wait 3' },
                            { moveName: 'Balloon Animal Shield', moveType: 'Blue', size: 16, effect: 'Defensive move' },
                            { moveName: 'Pie in the Face', moveType: 'White', size: 40, damage: 120, effect: 'High damage cream pie attack' },
                            { moveName: 'Miss', moveType: 'Red', size: 8, effect: 'None' }
                        ],
                        paralyzed: [
                            { moveName: 'Circus Chaos', moveType: 'Purple', size: 32, stars: 4, effect: 'The battle opponent, and a succession of opposing robots adjacent to it, gain Wait 3' },
                            { moveName: 'Balloon Animal Shield', moveType: 'Blue', size: 16, effect: 'Defensive move' },
                            { moveName: 'Miss', moveType: 'Red', size: 40, effect: 'Paralyzed - cannot attack' },
                            { moveName: 'Miss', moveType: 'Red', size: 8, effect: 'None' }
                        ],
                        burned: [
                            { moveName: 'Circus Chaos', moveType: 'Purple', size: 32, stars: 4, effect: 'The battle opponent, and a succession of opposing robots adjacent to it, gain Wait 3' },
                            { moveName: 'Balloon Animal Shield', moveType: 'Blue', size: 16, effect: 'Defensive move' },
                            { moveName: 'Miss', moveType: 'Red', size: 40, effect: 'Burned - cannot attack' },
                            { moveName: 'Miss', moveType: 'Red', size: 8, effect: 'None' }
                        ],
                        frozen: [
                            { moveName: 'Miss', moveType: 'Red', size: 32, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 16, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 40, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 8, effect: 'Frozen - all moves disabled' }
                        ]
                    },
                    stats: { hp: 130, attack: 120, defense: 85, speed: 90 }
                },
                'witch-bot': {
                    id: 'witch-bot',
                    name: 'Witch-Bot',
                    requiresPurchase: true,
                    rarity: 'R',
                    mp: 2,
                    role: 'Scout',
                    type: 'Psychic',
                    description: 'A mystical witch robot who casts spells of cleanliness and flies through battles on her magical broomstick.',
                    image: 'robots/witch-bot/images/happy.png',
                    ability: {
                        name: 'Magical Escape',
                        description: 'Can quickly teleport away from danger using witch magic.'
                    },
                    wheel: [
                        { moveName: 'Broom Flight', moveType: 'Purple', size: 28, stars: 3, effect: 'This robot moves 2 steps away' },
                        { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'None' },
                        { moveName: 'Hex Strike', moveType: 'White', size: 16, damage: 20, effect: 'The battle opponent gains Wait 3' },
                        { moveName: 'Broom Flight', moveType: 'Purple', size: 28, stars: 3, effect: 'This robot moves 2 steps away' },
                        { moveName: 'Crystal Ball Vision', moveType: 'Blue', size: 20, effect: 'This robot switches places with its battle opponent' }
                    ],
                    statusWheels: {
                        poisoned: [
                            { moveName: 'Broom Flight', moveType: 'Purple', size: 28, stars: 3, effect: 'This robot moves 2 steps away' },
                            { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'None' },
                            { moveName: 'Hex Strike', moveType: 'White', size: 16, damage: 20, effect: 'The battle opponent gains Wait 3' },
                            { moveName: 'Broom Flight', moveType: 'Purple', size: 28, stars: 3, effect: 'This robot moves 2 steps away' },
                            { moveName: 'Crystal Ball Vision', moveType: 'Blue', size: 20, effect: 'This robot switches places with its battle opponent' }
                        ],
                        paralyzed: [
                            { moveName: 'Broom Flight', moveType: 'Purple', size: 28, stars: 3, effect: 'This robot moves 2 steps away' },
                            { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'None' },
                            { moveName: 'Miss', moveType: 'Red', size: 16, effect: 'Paralyzed - cannot attack' },
                            { moveName: 'Broom Flight', moveType: 'Purple', size: 28, stars: 3, effect: 'This robot moves 2 steps away' },
                            { moveName: 'Crystal Ball Vision', moveType: 'Blue', size: 20, effect: 'This robot switches places with its battle opponent' }
                        ],
                        burned: [
                            { moveName: 'Broom Flight', moveType: 'Purple', size: 28, stars: 3, effect: 'This robot moves 2 steps away' },
                            { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'None' },
                            { moveName: 'Miss', moveType: 'Red', size: 16, effect: 'Burned - cannot attack' },
                            { moveName: 'Broom Flight', moveType: 'Purple', size: 28, stars: 3, effect: 'This robot moves 2 steps away' },
                            { moveName: 'Crystal Ball Vision', moveType: 'Blue', size: 20, effect: 'This robot switches places with its battle opponent' }
                        ],
                        frozen: [
                            { moveName: 'Miss', moveType: 'Red', size: 28, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 16, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 28, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 20, effect: 'Frozen - all moves disabled' }
                        ]
                    },
                    stats: { hp: 90, attack: 55, defense: 50, speed: 70 }
                },
                'freezy': {
                    id: 'freezy',
                    name: 'Freezy',
                    requiresPurchase: true,
                    rarity: 'R',
                    mp: 2,
                    role: 'Vanguard',
                    type: 'Water / Ice',
                    description: 'An arrogant ice robot with a superiority complex. Lord Freezy believes cleanliness is universal domination.',
                    image: 'robots/freezy/images/happy.png',
                    ability: {
                        name: 'Frozen Superiority',
                        description: 'Ice attacks have increased chance to freeze opponents.'
                    },
                    wheel: [
                        { moveName: 'Frost Beam', moveType: 'White', size: 12, damage: 50, effect: 'The battle opponent is now frozen' },
                        { moveName: 'Tidal Wave', moveType: 'White', size: 36, damage: 100, effect: 'Powerful water attack' },
                        { moveName: 'Lullaby Protocol', moveType: 'Purple', size: 32, stars: 1, effect: 'The battle opponent falls asleep' },
                        { moveName: 'Dodge', moveType: 'Blue', size: 12, effect: 'Defensive move' },
                        { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'None' }
                    ],
                    statusWheels: {
                        poisoned: [
                            { moveName: 'Frost Beam', moveType: 'White', size: 12, damage: 50, effect: 'The battle opponent is now frozen' },
                            { moveName: 'Tidal Wave', moveType: 'White', size: 36, damage: 100, effect: 'Powerful water attack' },
                            { moveName: 'Lullaby Protocol', moveType: 'Purple', size: 32, stars: 1, effect: 'The battle opponent falls asleep' },
                            { moveName: 'Dodge', moveType: 'Blue', size: 12, effect: 'Defensive move' },
                            { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'None' }
                        ],
                        paralyzed: [
                            { moveName: 'Miss', moveType: 'Red', size: 12, effect: 'Paralyzed - cannot attack' },
                            { moveName: 'Tidal Wave', moveType: 'White', size: 36, damage: 100, effect: 'Powerful water attack' },
                            { moveName: 'Lullaby Protocol', moveType: 'Purple', size: 32, stars: 1, effect: 'The battle opponent falls asleep' },
                            { moveName: 'Dodge', moveType: 'Blue', size: 12, effect: 'Defensive move' },
                            { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'None' }
                        ],
                        burned: [
                            { moveName: 'Miss', moveType: 'Red', size: 12, effect: 'Burned - cannot attack' },
                            { moveName: 'Tidal Wave', moveType: 'White', size: 36, damage: 100, effect: 'Powerful water attack' },
                            { moveName: 'Lullaby Protocol', moveType: 'Purple', size: 32, stars: 1, effect: 'The battle opponent falls asleep' },
                            { moveName: 'Dodge', moveType: 'Blue', size: 12, effect: 'Defensive move' },
                            { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'None' }
                        ],
                        frozen: [
                            { moveName: 'Miss', moveType: 'Red', size: 12, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 36, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 32, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 12, effect: 'Frozen - all moves disabled' },
                            { moveName: 'Miss', moveType: 'Red', size: 4, effect: 'Frozen - all moves disabled' }
                        ]
                    },
                    stats: { hp: 130, attack: 85, defense: 80, speed: 60 }
                }
            },
            
            
            // Load robot data from external sources
            async loadExternalRobots() {
                console.log('📦 Loading battle robots...');
                
                // STEP 1: Load battle data from component-based robots (NEW SYSTEM)
                await this.loadComponentBattleData();
                
                // OPTION 1: Try component-based RobotLoader (NEW - 150 robots)
                if (typeof RobotLoader !== 'undefined') {
                    console.log('🔍 Attempting component-based loading (RobotLoader)...');
                    
                    try {
                        const initialized = await RobotLoader.initialize();
                        
                        if (initialized && RobotLoader.robotRegistry.length > 0) {
                            console.log(`✅ RobotLoader initialized: ${RobotLoader.robotRegistry.length} robots available`);
                            
                            // Load first 12 robots for now (can load more on demand)
                            const firstTwelve = RobotLoader.robotRegistry.slice(0, 12);
                            const robotPromises = firstTwelve.map(r => RobotLoader.loadRobotData(r.id));
                            const loadedRobots = await Promise.all(robotPromises);
                            
                            // Convert to object format
                            const robotsObj = {};
                            loadedRobots.forEach(robot => {
                                if (robot) {
                                    robotsObj[robot.id] = robot;
                                }
                            });
                            
                            if (Object.keys(robotsObj).length > 0) {
                                this.robots = robotsObj;
                                console.log(`✅ Loaded ${Object.keys(robotsObj).length} robots via RobotLoader`);
                                return; // Success! Exit early
                            }
                        }
                    } catch (error) {
                        console.warn('⚠️ RobotLoader failed:', error);
                        console.log('⬇️ Falling back to JSON method...');
                    }
                }
            },
            
            // Load battle data from component-based robots
            async loadComponentBattleData() {
                console.log('🎮 Loading battle data from robot components...');
                
                try {
                    // Load unified registry
                    const response = await fetch('robots/unified-registry.json');
                    if (!response.ok) {
                        console.warn('⚠️ Could not load unified-registry.json');
                        return;
                    }
                    
                    const registry = await response.json();
                    let loadedCount = 0;
                    
                    // Load battle data for each robot that has it
                    for (const entry of registry) {
                        if (entry.hasBattleData && entry.dataFiles && entry.dataFiles.battle) {
                            try {
                                const battleResponse = await fetch(entry.dataFiles.battle);
                                if (battleResponse.ok) {
                                    const battleData = await battleResponse.json();
                                    
                                    // Convert to RobotDatabase format
                                    const robot = this.convertComponentBattleData(entry, battleData);
                                    
                                    // Add to database
                                    this.robots[robot.id] = robot;
                                    loadedCount++;
                                    console.log(`✅ Loaded battle data: ${robot.name} (${robot.id})`);
                                }
                            } catch (error) {
                                console.warn(`⚠️ Failed to load battle data for ${entry.id}:`, error);
                            }
                        }
                    }
                    
                    console.log(`✅ Loaded ${loadedCount} battle robots from components`);
                } catch (error) {
                    console.warn('⚠️ Error loading component battle data:', error);
                }
            },
            
            // Convert component battle data to RobotDatabase format
            convertComponentBattleData(registryEntry, battleData) {
                // Convert attacks to wheel format
                const wheel = battleData.attacks.basic.map(attack => {
                    const move = {
                        moveName: attack.moveName,
                        moveType: attack.moveType,
                        size: attack.size,
                        effect: attack.effect || 'None'
                    };
                    
                    if (attack.damage !== undefined) {
                        move.damage = attack.damage;
                    }
                    if (attack.stars !== undefined) {
                        move.stars = attack.stars;
                    }
                    
                    return move;
                });
                
                // Convert status wheels
                const statusWheels = {};
                if (battleData.attacks.poisoned) {
                    statusWheels.poisoned = battleData.attacks.poisoned.map(a => ({
                        moveName: a.moveName,
                        moveType: a.moveType,
                        size: a.size,
                        damage: a.damage,
                        stars: a.stars,
                        effect: a.effect || 'None'
                    }));
                }
                if (battleData.attacks.paralyzed_list) {
                    statusWheels.paralyzed = battleData.attacks.paralyzed_list[0].paralyzed_0.map(a => ({
                        moveName: a.moveName,
                        moveType: a.moveType,
                        size: a.size,
                        damage: a.damage,
                        stars: a.stars,
                        effect: a.effect || 'None'
                    }));
                }
                if (battleData.attacks.burned_list) {
                    statusWheels.burned = battleData.attacks.burned_list[0].burned_0.map(a => ({
                        moveName: a.moveName,
                        moveType: a.moveType,
                        size: a.size,
                        damage: a.damage,
                        stars: a.stars,
                        effect: a.effect || 'None'
                    }));
                }
                if (battleData.attacks.frozen) {
                    statusWheels.frozen = battleData.attacks.frozen.map(a => ({
                        moveName: a.moveName,
                        moveType: a.moveType,
                        size: a.size,
                        damage: a.damage,
                        stars: a.stars,
                        effect: a.effect || 'None'
                    }));
                }
                
                return {
                    id: registryEntry.folder,
                    name: registryEntry.name,
                    requiresPurchase: registryEntry.purchasable,
                    rarity: this.determineRarity(battleData.mp),
                    mp: battleData.mp,
                    role: battleData.role,
                    type: 'Robot',
                    description: `${registryEntry.name} - ${battleData.role} robot with ${battleData.mp} movement points.`,
                    image: battleData.image,
                    ability: {
                        name: battleData.ability.name,
                        description: battleData.ability.description
                    },
                    wheel: wheel,
                    statusWheels: statusWheels,
                    stats: battleData.stats
                };
            },
            
            // Determine rarity based on MP (simple heuristic)
            determineRarity(mp) {
                if (mp === 1) return 'EX';
                if (mp === 2) return 'R';
                if (mp === 3) return 'UC';
                return 'C';
            },
            
            // Get robot by ID
            getRobot(robotId) {
                // Strip '-opp' suffix for opponent robots in debug mode
                const baseId = robotId ? robotId.replace(/-opp$/, '') : robotId;
                return this.robots[baseId] || null;
            },
            
            // Get all robots as array
            getAllRobots() {
                return Object.values(this.robots);
            },
            
            // Add a robot to the database
            addRobot(robot) {
                this.robots[robot.id] = robot;
                console.log(`✅ Added robot: ${robot.name} (${robot.id})`);
            },
            
            // Get robots by role
            getRobotsByRole(role) {
                return this.getAllRobots().filter(robot => robot.role === role);
            },
            
            // Get robots by rarity
            getRobotsByRarity(rarity) {
                return this.getAllRobots().filter(robot => robot.rarity === rarity);
            },
            
            // Calculate total wheel size (should be 96)
            validateWheel(robotId) {
                const robot = this.getRobot(robotId);
                if (!robot) return false;
                
                const totalSize = robot.wheel.reduce((sum, segment) => sum + segment.size, 0);
                return totalSize === 96;
            },
            
            // Get wheel segment by spin result (1-96)
            getWheelResult(robotId, spinValue) {
                const robot = this.getRobot(robotId);
                if (!robot || spinValue < 1 || spinValue > 96) return null;
                
                let currentSum = 0;
                for (const segment of robot.wheel) {
                    currentSum += segment.size;
                    if (spinValue <= currentSum) {
                        return segment;
                    }
                }
                return null; // Should never reach here if wheel is valid
            },
            
            // Simulate a wheel spin
            spinWheel(robotId) {
                const spinValue = Math.floor(Math.random() * 96) + 1;
                const result = this.getWheelResult(robotId, spinValue);
                return {
                    spinValue: spinValue,
                    result: result
                };
            }
        };

        // ==========================================
        // DATA DISK COMBAT SYSTEM
        // ==========================================
        