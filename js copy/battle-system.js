        const BattleSystem = {
            // ==========================================
            // BATTLE SCENARIO DEBUGGER
            // ==========================================
            debugger: {
                enabled: false,
                panelOpen: false,
                bonusSpinEnabled: false,
                unlimitedBoltsEnabled: false,
                originalCurrency: null,
                selectedPlayerMove: null,
                selectedOpponentMove: null,
                selectedPlayerBonusMove: null,
                selectedOpponentBonusMove: null
            },
            
            // Psycho Cut Statistics Tracking
            psychoCutStats: {
                totalTriggers: 0,
                totalSuccesses: 0,
                totalFailures: 0,
                damageDealt: [],
                bonusSpinResults: []
            },
            
            // Toggle debugger panel visibility
            toggleDebugger() {
                this.debugger.panelOpen = !this.debugger.panelOpen;
                const panel = document.getElementById('battleDebuggerPanel');
                if (this.debugger.panelOpen) {
                    panel.classList.add('active');
                    panel.classList.remove('minimized'); // Ensure it's not minimized when opening
                    this.updateStatusEffectManagerVisibility(); // Show status manager if battle is active
                } else {
                    panel.classList.remove('active');
                }
                console.log(`🛠️ Debugger panel ${this.debugger.panelOpen ? 'opened' : 'closed'}`);
            },
            
            // Minimize/maximize debugger panel
            minimizeDebugger() {
                const panel = document.getElementById('battleDebuggerPanel');
                panel.classList.toggle('minimized');
                const isMinimized = panel.classList.contains('minimized');
                console.log(`🛠️ Debugger panel ${isMinimized ? 'minimized' : 'maximized'}`);
            },
            
            // Toggle debugger mode (force outcome on/off)
            toggleDebuggerMode() {
                this.debugger.enabled = !this.debugger.enabled;
                const toggle = document.getElementById('debuggerToggle');
                if (this.debugger.enabled) {
                    toggle.classList.add('active');
                    console.log('🛠️ Debugger mode ENABLED - Battle outcomes will be forced');
                    this.updateDebuggerStatus();
                } else {
                    toggle.classList.remove('active');
                    console.log('🛠️ Debugger mode DISABLED - Battles will be random');
                    this.updateDebuggerStatus();
                }
            },
            
            // Toggle free movement mode (instant teleportation for scenario setup)
            toggleFreeMovementMode() {
                this.freeMovementMode = !this.freeMovementMode;
                const toggle = document.getElementById('freeMovementToggle');
                if (this.freeMovementMode) {
                    toggle.classList.add('active');
                    console.log('🚀 FREE MOVEMENT MODE ENABLED - Click any robot, then click any empty space to teleport!');
                    this.addToHistory('🚀 Free Movement Mode: ON - Instant teleportation enabled', 'info', this.currentControlTeam);
                } else {
                    toggle.classList.remove('active');
                    console.log('🚶 FREE MOVEMENT MODE DISABLED - Normal movement rules apply');
                    this.addToHistory('🚶 Free Movement Mode: OFF - Normal movement restored', 'info', this.currentControlTeam);
                }
            },
            
            // Toggle bonus spin forcing
            toggleBonusSpinMode() {
                this.debugger.bonusSpinEnabled = !this.debugger.bonusSpinEnabled;
                const toggle = document.getElementById('bonusSpinToggle');
                if (this.debugger.bonusSpinEnabled) {
                    toggle.classList.add('active');
                    console.log('🌀 BONUS SPIN FORCING ENABLED - Respin outcomes will be forced');
                } else {
                    toggle.classList.remove('active');
                    console.log('🌀 BONUS SPIN FORCING DISABLED - Respins will be random');
                }
            },

            toggleUnlimitedBoltsMode() {
                const appInstance = window.app;
                if (!appInstance || !appInstance.data) {
                    console.warn('⚠️ Unlimited Bolts toggle ignored - app object not initialized');
                    return;
                }

                this.debugger.unlimitedBoltsEnabled = !this.debugger.unlimitedBoltsEnabled;
                const toggle = document.getElementById('unlimitedBoltsToggle');

                if (this.debugger.unlimitedBoltsEnabled) {
                    toggle?.classList.add('active');

                    const currentCurrency = appInstance.data.currency ?? 0;
                    this.debugger.originalCurrency = currentCurrency;
                    appInstance.unlimitedBoltsActive = true;
                    appInstance.unlimitedBoltsActualCurrency = currentCurrency;

                    const targetAmount = 999999;
                    if ((appInstance.data.currency ?? 0) < targetAmount) {
                        appInstance.data.currency = targetAmount;
                    }
                    appInstance.updateCurrencyDisplay?.();
                    appInstance.saveData?.();

                    console.log('💰 Unlimited Bolts ENABLED - currency set for testing');
                } else {
                    toggle?.classList.remove('active');

                    const restoreAmount = appInstance.unlimitedBoltsActualCurrency ?? this.debugger.originalCurrency;
                    if (typeof restoreAmount === 'number' && !Number.isNaN(restoreAmount)) {
                        appInstance.data.currency = restoreAmount;
                        appInstance.updateCurrencyDisplay?.();
                        appInstance.saveData?.();
                    }

                    appInstance.unlimitedBoltsActive = false;
                    appInstance.unlimitedBoltsActualCurrency = null;
                    this.debugger.originalCurrency = null;

                    console.log('💰 Unlimited Bolts DISABLED - currency restored to saved amount');
                }

                this.updateDebuggerStatus();
            },
            
            // Populate debugger with battle moves
            populateDebugger(attackerRobot, defenderRobot, attackerTeam, defenderTeam) {
                if (!this.currentBattle) return;
                
                console.log('🛠️ Populating debugger with battle moves');
                
                // Update column headers
                const playerIsAttacker = attackerTeam === 'player';
                const playerRobot = playerIsAttacker ? attackerRobot : defenderRobot;
                const opponentRobot = playerIsAttacker ? defenderRobot : attackerRobot;
                
                document.getElementById('playerColumnHeader').textContent = `${playerRobot.name} (Player)`;
                document.getElementById('opponentColumnHeader').textContent = `${opponentRobot.name} (Opponent)`;
                
                // Update status effect manager headers
                const playerStatusHeader = document.getElementById('playerStatusHeader');
                const opponentStatusHeader = document.getElementById('opponentStatusHeader');
                if (playerStatusHeader) playerStatusHeader.textContent = `${playerRobot.name} (Player)`;
                if (opponentStatusHeader) opponentStatusHeader.textContent = `${opponentRobot.name} (Opponent)`;
                
                // Populate player moves
                this.populateMovesList('playerMovesList', playerRobot.wheel, 'player');
                
                // Populate opponent moves
                this.populateMovesList('opponentMovesList', opponentRobot.wheel, 'opponent');
                
                // Populate bonus spin lists (for Psycho Cut)
                this.populateMovesList('playerBonusMovesList', playerRobot.wheel, 'player', true);
                this.populateMovesList('opponentBonusMovesList', opponentRobot.wheel, 'opponent', true);
                
                // Show bonus spin section
                const bonusSpinSection = document.getElementById('debuggerBonusSpinSection');
                if (bonusSpinSection) {
                    bonusSpinSection.style.display = 'block';
                }
                
                // Update status effect manager visibility and content
                this.updateStatusEffectManagerVisibility();
                
                this.updateDebuggerStatus();
            },
            
            // Populate a moves list
            populateMovesList(containerId, wheel, side, isBonus = false) {
                const container = document.getElementById(containerId);
                container.innerHTML = '';
                
                // Get robot instance ID for status effects
                const robotInstanceId = side === 'player' ? 
                    this.currentBattle?.attackerRobotInstanceId : 
                    this.currentBattle?.defenderRobotInstanceId;
                
                wheel.forEach((move, index) => {
                    const moveOption = document.createElement('div');
                    moveOption.className = 'move-option';
                    moveOption.dataset.side = side;
                    moveOption.dataset.index = index;
                    moveOption.dataset.isBonus = isBonus;
                    
                    // Radio button
                    const radio = document.createElement('div');
                    radio.className = 'move-radio';
                    
                    // Move text with color
                    const moveText = document.createElement('div');
                    moveText.className = 'move-text';
                    moveText.textContent = move.moveName;
                    moveText.style.color = this.getMoveColorHex(move.moveType);
                    
                    // Damage/stars info with status effect modifications
                    const moveInfo = document.createElement('div');
                    moveInfo.className = 'move-damage';
                    
                    if (move.damage !== undefined && move.damage !== null) {
                        let displayDamage = move.damage;
                        let hasStatusEffect = false;
                        
                        // Calculate status effect damage reduction
                        const moveTypeLower = move.moveType ? move.moveType.toLowerCase() : '';
                        if (robotInstanceId && (moveTypeLower === 'white' || moveTypeLower === 'gold')) {
                            let damageReduction = 0;
                            
                            if (this.hasStatusEffect(robotInstanceId, 'poison')) {
                                damageReduction += 20;
                                hasStatusEffect = true;
                            }
                            if (this.hasStatusEffect(robotInstanceId, 'noxious')) {
                                damageReduction += 40;
                                hasStatusEffect = true;
                            }
                            if (this.hasStatusEffect(robotInstanceId, 'burn')) {
                                damageReduction += 10;
                                hasStatusEffect = true;
                            }
                            
                            displayDamage = Math.max(0, move.damage - damageReduction);
                        }
                        
                        if (hasStatusEffect && displayDamage !== move.damage) {
                            moveInfo.innerHTML = `<span style="text-decoration: line-through; opacity: 0.5;">${move.damage}</span> <span style="color: #ff6b6b; font-weight: 700;">${displayDamage}</span> dmg`;
                        } else {
                            moveInfo.textContent = `${move.damage} dmg`;
                        }
                    } else if (move.stars !== undefined && move.stars !== null) {
                        moveInfo.textContent = `${'⭐'.repeat(move.stars)}`;
                    } else {
                        moveInfo.textContent = move.moveType;
                    }
                    
                    moveOption.appendChild(radio);
                    moveOption.appendChild(moveText);
                    moveOption.appendChild(moveInfo);
                    
                    // Click handler - different for bonus spins
                    if (isBonus) {
                        moveOption.onclick = () => this.selectDebuggerBonusMove(side, index, moveOption);
                    } else {
                        moveOption.onclick = () => this.selectDebuggerMove(side, index, moveOption);
                    }
                    
                    container.appendChild(moveOption);
                });
            },
            
            // Select a move in the debugger
            selectDebuggerMove(side, index, element) {
                // Deselect all moves in this column
                const container = element.parentElement;
                container.querySelectorAll('.move-option').forEach(opt => opt.classList.remove('selected'));
                
                // Select this move
                element.classList.add('selected');
                
                // Store selection
                if (side === 'player') {
                    this.debugger.selectedPlayerMove = index;
                    console.log(`🛠️ Player move selected: index ${index}`);
                } else {
                    this.debugger.selectedOpponentMove = index;
                    console.log(`🛠️ Opponent move selected: index ${index}`);
                }
                
                this.updateDebuggerStatus();
            },
            
            // Select a bonus spin move in the debugger
            selectDebuggerBonusMove(side, index, element) {
                // Deselect all moves in this column
                const container = element.parentElement;
                container.querySelectorAll('.move-option').forEach(opt => opt.classList.remove('selected'));
                
                // Select this move
                element.classList.add('selected');
                
                // Store selection
                if (side === 'player') {
                    this.debugger.selectedPlayerBonusMove = index;
                    console.log(`🌀 Player BONUS move selected: index ${index}`);
                } else {
                    this.debugger.selectedOpponentBonusMove = index;
                    console.log(`🌀 Opponent BONUS move selected: index ${index}`);
                }
            },
            
            // Update debugger status message
            updateDebuggerStatus() {
                const statusDiv = document.getElementById('debuggerStatus');
                
                if (!this.debugger.enabled) {
                    statusDiv.className = 'debugger-status';
                    statusDiv.textContent = 'Debugger disabled - battles will be random';
                    return;
                }
                
                if (!this.currentBattle) {
                    statusDiv.className = 'debugger-status waiting';
                    statusDiv.textContent = 'Awaiting battle initiation...';
                    return;
                }
                
                if (this.debugger.selectedPlayerMove !== null && this.debugger.selectedOpponentMove !== null) {
                    statusDiv.className = 'debugger-status ready';
                    const unlimitedText = this.debugger.unlimitedBoltsEnabled ? ' 💰 Unlimited Bolts active.' : '';
                    statusDiv.textContent = `✅ Ready! Battle outcome will be forced to selected moves.${unlimitedText}`;
                } else {
                    statusDiv.className = 'debugger-status waiting';
                    const missing = [];
                    if (this.debugger.selectedPlayerMove === null) missing.push('Player');
                    if (this.debugger.selectedOpponentMove === null) missing.push('Opponent');
                    statusDiv.textContent = `⚠️ Select moves for: ${missing.join(', ')}`;
                }
            },
            
            // Clear debugger selections
            clearDebuggerSelections() {
                this.debugger.selectedPlayerMove = null;
                this.debugger.selectedOpponentMove = null;
                document.querySelectorAll('.move-option').forEach(opt => opt.classList.remove('selected'));
                this.updateDebuggerStatus();
            },
            
            // ==========================================
            // STATUS EFFECT MANAGER (DEBUGGER)
            // ==========================================
            
            // Initialize status effect manager UI
            initializeStatusEffectManager() {
                const playerSelect = document.getElementById('playerStatusSelect');
                const opponentSelect = document.getElementById('opponentStatusSelect');
                
                if (playerSelect) {
                    playerSelect.addEventListener('change', (e) => {
                        if (e.target.value) {
                            this.addStatusEffectFromDebugger('player', e.target.value);
                            e.target.value = ''; // Reset select
                        }
                    });
                }
                
                if (opponentSelect) {
                    opponentSelect.addEventListener('change', (e) => {
                        if (e.target.value) {
                            this.addStatusEffectFromDebugger('opponent', e.target.value);
                            e.target.value = ''; // Reset select
                        }
                    });
                }
                
                console.log('🧪 Status Effect Manager initialized');
            },
            
            // Show/hide status effect manager based on battle state
            updateStatusEffectManagerVisibility() {
                const statusManager = document.getElementById('debuggerStatusManager');
                if (this.currentBattle && this.debugger.panelOpen) {
                    statusManager.style.display = 'block';
                    this.refreshStatusEffectDisplay();
                } else {
                    statusManager.style.display = 'none';
                }
            },
            
            // Add status effect from debugger
            addStatusEffectFromDebugger(side, statusName) {
                if (!this.currentBattle) {
                    console.error('❌ No active battle');
                    return;
                }
                
                const robotInstanceId = side === 'player' ? 
                    this.currentBattle.attackerRobotInstanceId : 
                    this.currentBattle.defenderRobotInstanceId;
                
                if (!robotInstanceId) {
                    console.error('❌ Robot instance ID not found');
                    return;
                }
                
                // Add status effect to the robot
                const wasAdded = this.addStatusEffect(robotInstanceId, statusName);
                
                // Only modify opponent's move if status was successfully added
                if (wasAdded) {
                    // Also modify the OPPONENT's currently selected move to inflict this status
                    // This allows testing: add frozen to opponent, and YOUR move will freeze them
                    const opposingSide = side === 'player' ? 'opponent' : 'player';
                    const opposingMoveIndex = opposingSide === 'player' ? 
                        this.debugger.selectedPlayerMove : 
                        this.debugger.selectedOpponentMove;
                    
                    if (opposingMoveIndex !== null) {
                        const opposingRobot = opposingSide === 'player' ? 
                            this.currentBattle.attackerRobot : 
                            this.currentBattle.defenderRobot;
                        
                        if (opposingRobot && opposingRobot.wheel && opposingRobot.wheel[opposingMoveIndex]) {
                            const move = opposingRobot.wheel[opposingMoveIndex];
                            
                            // Map status names to effect descriptions
                            const statusEffects = {
                                'poison': 'The battle opponent becomes poisoned',
                                'noxious': 'The battle opponent becomes noxious',
                                'burn': 'The battle opponent becomes burned',
                                'sleep': 'The battle opponent falls asleep',
                                'frozen': 'The battle opponent becomes frozen',
                                'paralysis': 'The battle opponent becomes paralyzed',
                                'confusion': 'The battle opponent becomes confused'
                            };
                            
                            // Add the status effect to the move
                            move.effect = statusEffects[statusName] || move.effect;
                            console.log(`🧪 Modified ${opposingSide}'s move "${move.moveName}" to inflict ${statusName}`);
                        }
                    }
                }
                
                const robotData = RobotDatabase.getRobot(robotInstanceId.replace(/-opp$/, '').replace(/-c-\d+$/, '').replace(/-uc-\d+$/, '').replace(/-r-\d+$/, '').replace(/-ex-\d+$/, ''));
                if (wasAdded) {
                    console.log(`🧪 Successfully added ${statusName} to ${robotData?.name || robotInstanceId} (${side})`);
                } else {
                    console.log(`⚠️ Could not add ${statusName} to ${robotData?.name || robotInstanceId} (${side}) - see above for reason`);
                }
                
                // Refresh displays
                this.refreshStatusEffectDisplay();
                this.populateDebugger(
                    this.currentBattle.attackerRobot,
                    this.currentBattle.defenderRobot,
                    this.currentBattle.attackerTeam,
                    this.currentBattle.defenderTeam
                );
                
                // Update visual indicators on field
                const pointId = side === 'player' ? 
                    this.currentBattle.attackerPointId : 
                    this.currentBattle.defenderPointId;
                this.updateRobotStatusIndicators(pointId, robotInstanceId);
            },
            
            // Remove status effect from debugger
            removeStatusEffectFromDebugger(side, statusName) {
                if (!this.currentBattle) return;
                
                const robotInstanceId = side === 'player' ? 
                    this.currentBattle.attackerRobotInstanceId : 
                    this.currentBattle.defenderRobotInstanceId;
                
                if (!robotInstanceId) return;
                
                // Remove status effect
                this.removeStatusEffect(robotInstanceId, statusName);
                
                const robotData = RobotDatabase.getRobot(robotInstanceId.replace(/-opp$/, '').replace(/-c-\d+$/, '').replace(/-uc-\d+$/, '').replace(/-r-\d+$/, '').replace(/-ex-\d+$/, ''));
                console.log(`🧪 Removed ${statusName} from ${robotData?.name || robotInstanceId} (${side})`);
                
                // Refresh displays
                this.refreshStatusEffectDisplay();
                this.populateDebugger(
                    this.currentBattle.attackerRobot,
                    this.currentBattle.defenderRobot,
                    this.currentBattle.attackerTeam,
                    this.currentBattle.defenderTeam
                );
                
                // Update visual indicators on field
                const pointId = side === 'player' ? 
                    this.currentBattle.attackerPointId : 
                    this.currentBattle.defenderPointId;
                this.updateRobotStatusIndicators(pointId, robotInstanceId);
            },
            
            // Refresh status effect display in debugger
            refreshStatusEffectDisplay() {
                if (!this.currentBattle) return;
                
                const playerRobotId = this.currentBattle.attackerRobotInstanceId;
                const opponentRobotId = this.currentBattle.defenderRobotInstanceId;
                
                this.updateStatusEffectList('player', playerRobotId);
                this.updateStatusEffectList('opponent', opponentRobotId);
            },
            
            // Update status effect list for a side
            updateStatusEffectList(side, robotInstanceId) {
                const listId = side === 'player' ? 'playerStatusEffects' : 'opponentStatusEffects';
                const listElement = document.getElementById(listId);
                
                if (!listElement || !robotInstanceId) return;
                
                // Get active status effects for this robot
                const activeEffects = [];
                if (this.robotStatusEffects[robotInstanceId]) {
                    // Iterate through conditions Set
                    if (this.robotStatusEffects[robotInstanceId].conditions) {
                        this.robotStatusEffects[robotInstanceId].conditions.forEach(statusName => {
                            activeEffects.push(statusName);
                        });
                    }
                    // Iterate through markers Set
                    if (this.robotStatusEffects[robotInstanceId].markers) {
                        this.robotStatusEffects[robotInstanceId].markers.forEach(statusName => {
                            activeEffects.push(statusName);
                        });
                    }
                }
                
                // Clear and rebuild list
                listElement.innerHTML = '';
                
                if (activeEffects.length === 0) {
                    const noStatusMsg = document.createElement('div');
                    noStatusMsg.className = 'no-status-message';
                    noStatusMsg.textContent = 'No active status effects';
                    listElement.appendChild(noStatusMsg);
                } else {
                    activeEffects.forEach(statusName => {
                        const statusDef = this.statusEffectDefinitions[statusName];
                        if (!statusDef) return;
                        
                        const statusItem = document.createElement('div');
                        statusItem.className = 'status-effect-item';
                        
                        const statusNameDiv = document.createElement('div');
                        statusNameDiv.className = 'status-effect-name';
                        statusNameDiv.textContent = `${statusDef.icon} ${statusDef.name}`;
                        
                        const removeBtn = document.createElement('button');
                        removeBtn.className = 'status-effect-remove';
                        removeBtn.textContent = '×';
                        removeBtn.title = `Remove ${statusDef.name}`;
                        removeBtn.onclick = () => this.removeStatusEffectFromDebugger(side, statusName);
                        
                        statusItem.appendChild(statusNameDiv);
                        statusItem.appendChild(removeBtn);
                        listElement.appendChild(statusItem);
                    });
                }
            },
            
            // ==========================================
            // AUDIO SYSTEM
            // ==========================================
            battleMusic: null, // Audio element for battle music
            
            // ==========================================
            // PRECISE GRID-BASED GAME BOARD MAPPING
            // Based on 7x5 grid with proper connections
            // ==========================================
            gameBoard: {
                // ROW 1: Top row (Opponent's side)
                // (OE1A) (O1B) (O1C) (O1D-GOAL) (O1E) (O1F) (OE1G)
                routePoints: {
                    // O1B - Outer Square space
                    'point-top-1': { 
                        x: 166, y: 100, 
                        type: 'route', 
                        grid: 'O1B',
                        position: 'top-1', 
                        connections: ['entry-top-left', 'point-top-2'] 
                    },
                    // O1C - Outer Square space
                    'point-top-2': { 
                        x: 266, y: 100, 
                        type: 'route', 
                        grid: 'O1C',
                        position: 'top-2', 
                        connections: ['point-top-1', 'goal-opponent', 'point-inner-top'] 
                    },
                    // O1E - Outer Square space
                    'point-top-3': { 
                        x: 399, y: 100, 
                        type: 'route', 
                        grid: 'O1E',
                        position: 'top-3', 
                        connections: ['goal-opponent', 'point-top-4'] 
                    },
                    // O1F - Outer Square space
                    'point-top-4': { 
                        x: 499, y: 100, 
                        type: 'route', 
                        grid: 'O1F',
                        position: 'top-4', 
                        connections: ['point-top-3', 'entry-top-right'] 
                    },
                    
                    // ROW 2: O2A, I2B, I2D, I2F, O2G
                    // O2A - Outer Square space
                    'point-left-1': { 
                        x: 67, y: 224, 
                        type: 'route', 
                        grid: 'O2A',
                        position: 'left-1', 
                        connections: ['entry-top-left', 'point-left-2'] 
                    },
                    
                    // ROW 3: O3A, I3B, I3F, O3G
                    // O3A - Outer Square space
                    'point-left-2': { 
                        x: 67, y: 350, 
                        type: 'route', 
                        grid: 'O3A',
                        position: 'left-2', 
                        connections: ['point-left-1', 'point-left-3'] 
                    },
                    
                    // ROW 4: O4A, I4B, I4D, I4F, O4G
                    // O4A - Outer Square space
                    'point-left-3': { 
                        x: 67, y: 476, 
                        type: 'route', 
                        grid: 'O4A',
                        position: 'left-3', 
                        connections: ['point-left-2', 'entry-bottom-left'] 
                    },
                    
                    // O2G - Outer Square space (right side row 2)
                    'point-right-1': { 
                        x: 599, y: 224, 
                        type: 'route', 
                        grid: 'O2G',
                        position: 'right-1', 
                        connections: ['entry-top-right', 'point-right-2'] 
                    },
                    // O3G - Outer Square space (right side row 3)
                    'point-right-2': { 
                        x: 599, y: 350, 
                        type: 'route', 
                        grid: 'O3G',
                        position: 'right-2', 
                        connections: ['point-right-1', 'point-right-3'] 
                    },
                    // O4G - Outer Square space (right side row 4)
                    'point-right-3': { 
                        x: 599, y: 476, 
                        type: 'route', 
                        grid: 'O4G',
                        position: 'right-3', 
                        connections: ['point-right-2', 'entry-bottom-right'] 
                    },
                    
                    // ROW 5: Bottom row (Player's side)
                    // (OE5A) (O5B) (O5C) (O5D-GOAL) (O5E) (O5F) (OE5G)
                    // O5B - Outer Square space
                    'point-bottom-1': { 
                        x: 166, y: 600, 
                        type: 'route', 
                        grid: 'O5B',
                        position: 'bottom-1', 
                        connections: ['entry-bottom-left', 'point-bottom-2'] 
                    },
                    // O5C - Outer Square space
                    'point-bottom-2': { 
                        x: 266, y: 600, 
                        type: 'route', 
                        grid: 'O5C',
                        position: 'bottom-2', 
                        connections: ['point-bottom-1', 'goal-player'] 
                    },
                    // O5E - Outer Square space
                    'point-bottom-3': { 
                        x: 399, y: 600, 
                        type: 'route', 
                        grid: 'O5E',
                        position: 'bottom-3', 
                        connections: ['goal-player', 'point-bottom-4', 'point-inner-bottom'] 
                    },
                    // O5F - Outer Square space
                    'point-bottom-4': { 
                        x: 499, y: 600, 
                        type: 'route', 
                        grid: 'O5F',
                        position: 'bottom-4', 
                        connections: ['point-bottom-3', 'entry-bottom-right'] 
                    }
                },
                
                // INNER SQUARE POINTS (8 total)
                innerPoints: {
                    // I2B - Inner Square Space (Row 2, Col B)
                    'point-inner-tl': { 
                        x: 200, y: 250, 
                        type: 'inner', 
                        grid: 'I2B',
                        position: 'inner-top-left', 
                        connections: ['entry-top-left', 'point-inner-top', 'point-inner-left'] 
                    },
                    // I2F - Inner Square Space (Row 2, Col F)
                    'point-inner-tr': { 
                        x: 466, y: 250, 
                        type: 'inner', 
                        grid: 'I2F',
                        position: 'inner-top-right', 
                        connections: ['entry-top-right', 'point-inner-top', 'point-inner-right'] 
                    },
                    // I4B - Inner Square Space (Row 4, Col B)
                    'point-inner-bl': { 
                        x: 200, y: 450, 
                        type: 'inner', 
                        grid: 'I4B',
                        position: 'inner-bottom-left', 
                        connections: ['entry-bottom-left', 'point-inner-left', 'point-inner-bottom'] 
                    },
                    // I4F - Inner Square Space (Row 4, Col F)
                    'point-inner-br': { 
                        x: 466, y: 450, 
                        type: 'inner', 
                        grid: 'I4F',
                        position: 'inner-bottom-right', 
                        connections: ['entry-bottom-right', 'point-inner-right', 'point-inner-bottom'] 
                    },
                    // I2D - Inner Square Space (Row 2, Col D - top middle)
                    'point-inner-top': { 
                        x: 333, y: 250, 
                        type: 'inner', 
                        grid: 'I2D',
                        position: 'inner-top-mid', 
                        connections: ['point-inner-tl', 'point-top-2', 'point-inner-tr'] 
                    },
                    // I4D - Inner Square Space (Row 4, Col D - bottom middle)
                    'point-inner-bottom': { 
                        x: 333, y: 450, 
                        type: 'inner', 
                        grid: 'I4D',
                        position: 'inner-bottom-mid', 
                        connections: ['point-inner-bl', 'point-inner-br', 'point-bottom-3'] 
                    },
                    // I3B - Inner Square Space (Row 3, Col B - left middle)
                    'point-inner-left': { 
                        x: 200, y: 350, 
                        type: 'inner', 
                        grid: 'I3B',
                        position: 'inner-left-mid', 
                        connections: ['point-inner-tl', 'point-inner-bl'] 
                    },
                    // I3F - Inner Square Space (Row 3, Col F - right middle)
                    'point-inner-right': { 
                        x: 466, y: 350, 
                        type: 'inner', 
                        grid: 'I3F',
                        position: 'inner-right-mid', 
                        connections: ['point-inner-tr', 'point-inner-br'] 
                    }
                },
                
                // GOAL POINTS (2 total) - WIN CONDITIONS
                goalPoints: {
                    // O1D - Opponent's Goal (Player wins if they reach this)
                    'goal-opponent': { 
                        x: 333, y: 100, 
                        type: 'goal', 
                        team: 'opponent',
                        grid: 'O1D',
                        position: 'top-goal', 
                        connections: ['point-top-2', 'point-top-3'] 
                    },
                    // O5D - Player's Goal (Opponent wins if they reach this)
                    'goal-player': { 
                        x: 333, y: 600, 
                        type: 'goal', 
                        team: 'player',
                        grid: 'O5D',
                        position: 'bottom-goal', 
                        connections: ['point-bottom-2', 'point-bottom-3'] 
                    }
                },
                
                // ENTRY POINTS (4 total) - SPAWN LOCATIONS
                entryPoints: {
                    // OE1A - Opponent's Entry (top-left)
                    'entry-top-left': { 
                        x: 67, y: 100, 
                        type: 'entry', 
                        grid: 'OE1A',
                        position: 'top-left', 
                        spawnPoint: true, 
                        team: 'opponent', 
                        connections: ['point-top-1', 'point-left-1', 'point-inner-tl'] 
                    },
                    // OE1G - Opponent's Entry (top-right)
                    'entry-top-right': { 
                        x: 599, y: 100, 
                        type: 'entry', 
                        grid: 'OE1G',
                        position: 'top-right', 
                        spawnPoint: true, 
                        team: 'opponent', 
                        connections: ['point-top-4', 'point-right-1', 'point-inner-tr'] 
                    },
                    // OE5A - Player's Entry (bottom-left)
                    'entry-bottom-left': { 
                        x: 67, y: 600, 
                        type: 'entry', 
                        grid: 'OE5A',
                        position: 'bottom-left', 
                        spawnPoint: true, 
                        team: 'player', 
                        connections: ['point-bottom-1', 'point-left-3', 'point-inner-bl'] 
                    },
                    // OE5G - Player's Entry (bottom-right)
                    'entry-bottom-right': { 
                        x: 599, y: 600, 
                        type: 'entry', 
                        grid: 'OE5G',
                        position: 'bottom-right', 
                        spawnPoint: true, 
                        team: 'player', 
                        connections: ['point-bottom-4', 'point-right-3', 'point-inner-br'] 
                    }
                }
            },
            
            // Player Zones Mapping
            playerZones: {
                player: {
                    benchSlots: {
                        'bench-slot-1': { position: 'secondary-left', capacity: 1, robotId: null },
                        'bench-slot-2': { position: 'secondary-right', capacity: 1, robotId: null },
                        'bench-slot-3': { position: 'primary-1', capacity: 1, robotId: null },
                        'bench-slot-4': { position: 'primary-2', capacity: 1, robotId: null },
                        'bench-slot-5': { position: 'primary-3', capacity: 1, robotId: null },
                        'bench-slot-6': { position: 'primary-4', capacity: 1, robotId: null }
                    },
                    repairBay: [] // FIFO queue: max 2 robots, [{robotId, timestamp}, ...]
                },
                opponent: {
                    benchSlots: {
                        'opponent-bench-slot-1': { position: 'secondary-left', capacity: 1, robotId: null },
                        'opponent-bench-slot-2': { position: 'secondary-right', capacity: 1, robotId: null },
                        'opponent-bench-slot-3': { position: 'primary-1', capacity: 1, robotId: null },
                        'opponent-bench-slot-4': { position: 'primary-2', capacity: 1, robotId: null },
                        'opponent-bench-slot-5': { position: 'primary-3', capacity: 1, robotId: null },
                        'opponent-bench-slot-6': { position: 'primary-4', capacity: 1, robotId: null }
                    },
                    repairBay: [] // FIFO queue: max 2 robots, [{robotId, timestamp}, ...]
                }
            },
            
            // Robot Management
            robots: {
                active: new Map(), // robotId -> { position, stats, abilities }
                bench: new Map(),  // slotId -> robotId
                pc: new Map()      // slotId -> robotId
            },
            
            // Battle State
            battleState: {
                isActive: false,
                currentTurn: 'player', // 'player' or 'opponent'
                turnCount: 0,
                phase: 'setup', // 'setup', 'battle', 'ended'
                winner: null
            },
            
            // Turn Action Tracking (ONE action per turn)
            turnActions: {
                hasMovedRobot: false,      // Has deployed OR moved a robot this turn
                hasBattled: false,          // Has initiated a battle this turn
                actionTakenThisTurn: false, // Any action taken (for UI feedback)
                lastMovedRobotPoint: null   // Track which robot moved (for "lock-in")
            },
            
            // Repair Bay Status Tracking
            rebootingRobots: {}, // { robotId: waitCount } - robots with "Rebooting: X" status
            
            // ==========================================
            // STATUS EFFECT SYSTEM
            // ==========================================
            // Comprehensive status tracking for all robots
            // Format: { robotId: { statuses: Set, markers: Set } }
            robotStatusEffects: {},
            
            // Track when Wait was applied to prevent same-turn expiration
            // Format: { robotId: { team: 'player'|'opponent', ownerTurnCountAtApplication: number, appliedDuringOwnTurn: boolean } }
            // appliedDuringOwnTurn: true = applied during owner's turn (needs to last until NEXT turn ends)
            // appliedDuringOwnTurn: false = applied during opponent's turn (expires at end of CURRENT turn)
            waitStatusTurnTracker: {},
            
            // Team-specific turn counters (increments each time team's turn ENDS)
            playerTurnCount: 0,
            opponentTurnCount: 0,
            
            // Status effect definitions with mechanical effects
            statusEffectDefinitions: {
                // Battle-Inflicted Status Conditions
                'poison': {
                    name: 'Poison',
                    description: 'Damage reduced by 20',
                    type: 'condition',
                    damageReduction: 20,
                    affectedMoveTypes: ['white', 'gold'],
                    icon: '🧪',
                    color: '#9C27B0'
                },
                'noxious': {
                    name: 'Noxious',
                    description: 'Damage reduced by 40',
                    type: 'condition',
                    damageReduction: 40,
                    affectedMoveTypes: ['white', 'gold'],
                    icon: '☠️',
                    color: '#7B1FA2'
                },
                'paralysis': {
                    name: 'Paralysis',
                    description: 'Smallest Attack becomes Miss',
                    type: 'condition',
                    convertsSmallestToMiss: true,
                    icon: '⚡',
                    color: '#FFC107'
                },
                'burn': {
                    name: 'Burn',
                    description: 'Damage reduced by 10 AND smallest Attack becomes Miss',
                    type: 'condition',
                    damageReduction: 10,
                    affectedMoveTypes: ['white', 'gold'],
                    convertsSmallestToMiss: true,
                    icon: '🔥',
                    color: '#FF5722'
                },
                'confusion': {
                    name: 'Confusion',
                    description: 'Combat Dial result shifts one segment clockwise',
                    type: 'condition',
                    shiftsResult: 'clockwise',
                    icon: '😵',
                    color: '#E91E63'
                },
                'sleep': {
                    name: 'Sleep',
                    description: 'Cannot initiate battle or take actions, but can still move',
                    type: 'condition',
                    preventsActions: true,
                    preventsMovement: false,
                    wokenByAttack: true,
                    icon: '💤',
                    color: '#2196F3'
                },
                'frozen': {
                    name: 'Frozen',
                    description: 'Cannot initiate battle, all Attacks become Misses if attacked',
                    type: 'condition',
                    preventsActions: true,
                    preventsMovement: false,
                    allAttacksBecomeMiss: true,
                    thawedByAttack: true,
                    icon: '🧊',
                    color: '#00BCD4'
                },
                
                // Special Markers & Game States
                'waiting': {
                    name: 'Wait',
                    description: 'Cannot be selected for any action for 1 turn. Cannot move, battle, or be deployed from Bench. Expires automatically after 1 turn.',
                    type: 'marker',
                    preventsActions: true,
                    preventsMovement: true,
                    preventsDeployment: true,
                    turnsRemaining: 1,
                    autoExpires: true,
                    icon: '⏸️',
                    color: '#9E9E9E'
                },
                'curse': {
                    name: 'Curse',
                    description: 'Removed from duel permanently when knocked out',
                    type: 'marker',
                    permanentRemovalOnKO: true,
                    icon: '💀',
                    color: '#424242'
                },
                'mp-1': {
                    name: 'MP -1',
                    description: 'Movement Points reduced by 1',
                    type: 'marker',
                    mpReduction: 1,
                    icon: '🐌',
                    color: '#795548'
                }
            },
            
            // ==========================================
            // STATUS EFFECT MANAGEMENT FUNCTIONS
            // ==========================================
            
            // Initialize status tracking for a robot
            initializeRobotStatus(robotId) {
                if (!this.robotStatusEffects[robotId]) {
                    this.robotStatusEffects[robotId] = {
                        conditions: new Set(),  // poison, noxious, paralysis, burn, confusion, sleep, frozen
                        markers: new Set()      // waiting, curse, mp-1
                    };
                }
            },
            
            // Add a status effect to a robot
            addStatusEffect(robotId, statusName) {
                this.initializeRobotStatus(robotId);
                
                const statusDef = this.statusEffectDefinitions[statusName];
                if (!statusDef) {
                    console.error(`❌ Unknown status effect: ${statusName}`);
                    return false;
                }
                
                // POISON/NOXIOUS MUTUAL EXCLUSIVITY RULES:
                // 1. Only one can be applied at once
                // 2. Noxious overrides Poison (if poisoned, noxious replaces it)
                // 3. Poison cannot override Noxious (if noxious, poison is blocked)
                if (statusName === 'poison' || statusName === 'noxious') {
                    const hasPoison = this.hasStatusEffect(robotId, 'poison');
                    const hasNoxious = this.hasStatusEffect(robotId, 'noxious');
                    
                    if (statusName === 'noxious' && hasPoison) {
                        // Noxious overrides Poison - remove poison first
                        this.robotStatusEffects[robotId].conditions.delete('poison');
                        console.log(`☠️ Noxious is overriding existing Poison on ${robotId}`);
                    } else if (statusName === 'poison' && hasNoxious) {
                        // Poison cannot override Noxious - block the application
                        console.log(`🧪 Poison blocked - ${robotId} is already Noxious (stronger effect)`);
                        return false;
                    }
                }
                
                if (statusDef.type === 'condition') {
                    this.robotStatusEffects[robotId].conditions.add(statusName);
                } else if (statusDef.type === 'marker') {
                    this.robotStatusEffects[robotId].markers.add(statusName);
                    
                    // CRITICAL: Track when Wait is applied to prevent same-turn expiration
                    if (statusName === 'waiting') {
                        const robotTeam = this.getRobotTeamById(robotId);
                        const currentTeamTurnCount = robotTeam === 'player' ? this.playerTurnCount : this.opponentTurnCount;
                        const appliedDuringOwnTurn = (this.currentControlTeam === robotTeam);
                        this.waitStatusTurnTracker[robotId] = {
                            team: robotTeam,
                            ownerTurnCountAtApplication: currentTeamTurnCount,
                            appliedDuringOwnTurn: appliedDuringOwnTurn
                        };
                        console.log(`⏸️ Wait tracker set: ${robotId} (${robotTeam} team) at team turn ${currentTeamTurnCount}, appliedDuringOwnTurn=${appliedDuringOwnTurn}`);
                    }
                }
                
                console.log(`${statusDef.icon} Applied ${statusDef.name} to ${robotId}`);
                return true;
            },
            
            // Remove a status effect from a robot
            removeStatusEffect(robotId, statusName) {
                if (!this.robotStatusEffects[robotId]) return false;
                
                const statusDef = this.statusEffectDefinitions[statusName];
                if (!statusDef) return false;
                
                let removed = false;
                
                if (statusDef.type === 'condition') {
                    removed = this.robotStatusEffects[robotId].conditions.delete(statusName);
                } else if (statusDef.type === 'marker') {
                    removed = this.robotStatusEffects[robotId].markers.delete(statusName);
                }
                
                if (removed) {
                    console.log(`✅ Removed ${statusName} from ${robotId}`);
                    // Update visual if robot is on field
                    const pointId = this.findRobotOnField(robotId);
                    if (pointId) {
                        this.updateRobotStatusIndicators(pointId, robotId);
                    }
                }
                
                return removed;
            },
            
            // Check if robot has a specific status
            hasStatusEffect(robotId, statusName) {
                if (!this.robotStatusEffects[robotId]) return false;
                
                const statusDef = this.statusEffectDefinitions[statusName];
                if (!statusDef) return false;
                
                if (statusDef.type === 'condition') {
                    return this.robotStatusEffects[robotId].conditions.has(statusName);
                } else if (statusDef.type === 'marker') {
                    return this.robotStatusEffects[robotId].markers.has(statusName);
                }
                return false;
            },
            
            // Get all status effects for a robot
            getRobotStatuses(robotId) {
                if (!this.robotStatusEffects[robotId]) {
                    return { conditions: [], markers: [] };
                }
                
                return {
                    conditions: Array.from(this.robotStatusEffects[robotId].conditions),
                    markers: Array.from(this.robotStatusEffects[robotId].markers)
                };
            },
            
            // Clear ALL status effects from a robot (used when sent to Repair Bay)
            clearAllStatusEffects(robotId) {
                if (!this.robotStatusEffects[robotId]) return;
                
                const statuses = this.getRobotStatuses(robotId);
                const totalCleared = statuses.conditions.length + statuses.markers.length;
                
                if (totalCleared > 0) {
                    console.log(`🧹 Clearing ${totalCleared} status effect(s) from ${robotId}`);
                    this.robotStatusEffects[robotId].conditions.clear();
                    this.robotStatusEffects[robotId].markers.clear();
                    
                    // Update visual indicators on the field
                    const pointId = this.findRobotOnField(robotId);
                    if (pointId) {
                        this.updateRobotStatusIndicators(pointId, robotId);
                        console.log(`🎯 Cleared status indicators for ${robotId} at ${pointId}`);
                    }
                }
            },
            
            // Expire Wait status for all robots of a team at end of turn
            expireWaitStatusForTeam(team) {
                // Get CURRENT team turn count BEFORE incrementing
                const currentTeamTurnCount = team === 'player' ? this.playerTurnCount : this.opponentTurnCount;
                console.log(`⏸️ Expiring Wait status for ${team} team (team turn: ${currentTeamTurnCount}, checking before increment)...`);
                
                let expiredCount = 0;
                let stillWaitingCount = 0;
                
                // Check all robots with status effects
                for (const robotId in this.robotStatusEffects) {
                    const statuses = this.robotStatusEffects[robotId];
                    
                    // Only process robots with 'waiting' status
                    if (!statuses.markers.has('waiting')) continue;
                    
                    // Find the robot's team by checking all board points
                    const robotTeam = this.getRobotTeamById(robotId);
                    
                    // Only check robots on the team whose turn is ending
                    if (robotTeam === team) {
                        // Check turn tracker
                        const tracker = this.waitStatusTurnTracker[robotId];
                        if (tracker && tracker.ownerTurnCountAtApplication !== undefined) {
                            console.log(`   ${robotId}: Applied at team turn ${tracker.ownerTurnCountAtApplication}, current team turn ${currentTeamTurnCount}, appliedDuringOwnTurn=${tracker.appliedDuringOwnTurn}`);
                            
                            // Expiration logic depends on WHEN Wait was applied:
                            // - If applied during OWNER'S turn: Must complete NEXT full turn (currentTurn > applicationTurn)
                            // - If applied during OPPONENT'S turn: Expires at end of CURRENT turn (currentTurn >= applicationTurn)
                            
                            let shouldExpire = false;
                            if (tracker.appliedDuringOwnTurn) {
                                // Applied during owner's turn - needs to survive until NEXT turn ends
                                shouldExpire = (currentTeamTurnCount > tracker.ownerTurnCountAtApplication);
                                console.log(`   → Applied during own turn: expire if ${currentTeamTurnCount} > ${tracker.ownerTurnCountAtApplication} = ${shouldExpire}`);
                            } else {
                                // Applied during opponent's turn - expires at end of current turn
                                shouldExpire = (currentTeamTurnCount >= tracker.ownerTurnCountAtApplication);
                                console.log(`   → Applied during opponent's turn: expire if ${currentTeamTurnCount} >= ${tracker.ownerTurnCountAtApplication} = ${shouldExpire}`);
                            }
                            
                            if (shouldExpire) {
                                // Expire Wait
                                this.removeStatusEffect(robotId, 'waiting');
                                delete this.waitStatusTurnTracker[robotId];
                                expiredCount++;
                                
                                const robotData = RobotDatabase.getRobot(robotId);
                                console.log(`⏸️ Wait expired for ${robotData?.name || robotId}`);
                                this.addToHistory(`⏸️ ${robotData?.name || robotId} can act again`, 'info', team);
                            } else {
                                // Keep Wait active
                                stillWaitingCount++;
                                console.log(`   ${robotId}: Still waiting`);
                            }
                        } else {
                            // No tracker found - expire immediately (safety fallback)
                            console.warn(`⚠️ ${robotId} has Wait but no tracker - expiring now`);
                            this.removeStatusEffect(robotId, 'waiting');
                            expiredCount++;
                        }
                    }
                }
                
                // NOW increment the turn counter AFTER checking expiration
                if (team === 'player') {
                    this.playerTurnCount++;
                } else {
                    this.opponentTurnCount++;
                }
                console.log(`🔢 Incremented ${team} turn count to ${team === 'player' ? this.playerTurnCount : this.opponentTurnCount}`);
                
                if (expiredCount > 0) {
                    console.log(`✅ Expired Wait status for ${expiredCount} robot(s)`);
                }
                if (stillWaitingCount > 0) {
                    console.log(`⏳ ${stillWaitingCount} robot(s) still waiting`);
                }
                if (expiredCount === 0 && stillWaitingCount === 0) {
                    console.log(`✅ No robots with Wait status on ${team} team`);
                }
            },
            
            // Get robot's team by checking all board points
            getRobotTeamById(robotId) {
                // Check all point types
                const allPoints = [
                    ...Object.values(this.gameBoard.entryPoints),
                    ...Object.values(this.gameBoard.routePoints),
                    ...Object.values(this.gameBoard.innerPoints),
                    ...Object.values(this.gameBoard.goalPoints)
                ];
                
                for (const point of allPoints) {
                    if (point.robot && point.robot.id === robotId) {
                        return point.robot.team;
                    }
                }
                
                // Check bench
                for (const benchRobot of this.bench) {
                    if (benchRobot.id === robotId) {
                        return benchRobot.team;
                    }
                }
                
                // Check repair bay
                for (const repairRobot of this.repairBay) {
                    if (repairRobot.id === robotId) {
                        return repairRobot.team;
                    }
                }
                
                return null;
            },
            
            // Cure standard conditions (Tagging heal)
            cureStandardConditions(robotId) {
                if (!this.robotStatusEffects[robotId]) return;
                
                // Curable via Tagging: poison, noxious, paralysis, burn, confusion, sleep, frozen, mp-1
                const curableConditions = ['poison', 'noxious', 'paralysis', 'burn', 'confusion', 'sleep', 'frozen'];
                const curableMarkers = ['mp-1'];
                
                let curedCount = 0;
                
                curableConditions.forEach(condition => {
                    if (this.robotStatusEffects[robotId].conditions.has(condition)) {
                        this.removeStatusEffect(robotId, condition);
                        curedCount++;
                    }
                });
                
                curableMarkers.forEach(marker => {
                    if (this.robotStatusEffects[robotId].markers.has(marker)) {
                        this.removeStatusEffect(robotId, marker);
                        curedCount++;
                    }
                });
                
                if (curedCount > 0) {
                    console.log(`💚 Healed ${curedCount} condition(s) from ${robotId} via Tagging`);
                }
                
                return curedCount > 0;
            },
            
            // Check if robot has any curable conditions (for Tagging decision)
            hasCurableConditions(robotId) {
                if (!this.robotStatusEffects[robotId]) return false;
                
                const curableConditions = ['poison', 'noxious', 'paralysis', 'burn', 'confusion', 'sleep', 'frozen'];
                const curableMarkers = ['mp-1'];
                
                const hasCondition = curableConditions.some(c => 
                    this.robotStatusEffects[robotId].conditions.has(c)
                );
                const hasMarker = curableMarkers.some(m => 
                    this.robotStatusEffects[robotId].markers.has(m)
                );
                
                return hasCondition || hasMarker;
            },
            
            // Check if robot is disabled (Sleep or Frozen)
            isRobotDisabled(robotId) {
                if (!this.robotStatusEffects[robotId]) return false;
                
                return this.hasStatusEffect(robotId, 'sleep') || 
                       this.hasStatusEffect(robotId, 'frozen');
            },
            
            // Check if robot can be moved
            canRobotMove(robotId) {
                if (!this.robotStatusEffects[robotId]) return true;
                
                // Check for statuses that prevent movement
                const preventingStatuses = ['sleep', 'frozen', 'waiting'];
                return !preventingStatuses.some(status => this.hasStatusEffect(robotId, status));
            },
            
            // Get effective MP for a robot (accounts for MP-1 marker)
            getEffectiveMP(robotId, baseMP) {
                if (!this.robotStatusEffects[robotId]) return baseMP;
                
                let effectiveMP = baseMP;
                
                if (this.hasStatusEffect(robotId, 'mp-1')) {
                    effectiveMP -= 1;
                }
                
                return Math.max(0, effectiveMP);
            },
            
            // ==========================================
            // TAGGING CURE MECHANIC
            // ==========================================
            
            // Get adjacent friendly robots that have curable conditions
            getAdjacentCurableAllies(pointId, team) {
                const point = this.getPointById(pointId);
                if (!point || !point.connections) return [];
                
                const curableAllies = [];
                
                point.connections.forEach(connectedPointId => {
                    const connectedPoint = this.getPointById(connectedPointId);
                    
                    // Check if point has a robot on same team with curable conditions
                    if (connectedPoint && connectedPoint.robot && connectedPoint.robot.team === team) {
                        const allyRobotId = connectedPoint.robot.id;
                        if (this.hasCurableConditions(allyRobotId)) {
                            curableAllies.push({
                                pointId: connectedPointId,
                                robotId: allyRobotId
                            });
                        }
                    }
                });
                
                return curableAllies;
            },
            
            // Check and handle Tagging cure after movement
            // Returns TRUE if turn should end, FALSE if turn should continue
            checkTaggingCure(movedToPointId, team) {
                console.log(`💊 Checking Tagging cure opportunities at ${movedToPointId}...`);
                
                const curableAllies = this.getAdjacentCurableAllies(movedToPointId, team);
                const adjacentEnemies = this.getAdjacentEnemies(movedToPointId, team);
                
                console.log(`   Found ${curableAllies.length} curable allies, ${adjacentEnemies.length} enemies`);
                
                // PRIORITY 1: Adjacent to BOTH enemy AND disabled ally
                if (curableAllies.length > 0 && adjacentEnemies.length > 0) {
                    console.log(`🎯 TAGGING PRIORITY 1: Both enemy and curable ally present - showing choice`);
                    this.showTaggingChoice(movedToPointId, team, curableAllies, adjacentEnemies);
                    return true; // Turn handling delegated to player choice
                }
                
                // PRIORITY 2: Adjacent to ONLY disabled ally (no enemies)
                if (curableAllies.length > 0 && adjacentEnemies.length === 0) {
                    console.log(`💚 TAGGING PRIORITY 2: Only curable ally present - auto-healing`);
                    this.performAutoTaggingHeal(curableAllies, team);
                    return true; // Turn ends automatically after heal
                }
                
                // No curable allies found
                return false; // Continue normal turn flow
            },
            
            // Show UI for player to choose between Battle or Heal
            showTaggingChoice(movedToPointId, team, curableAllies, adjacentEnemies) {
                // Highlight the options
                this.highlightAdjacentEnemies(movedToPointId, team);
                
                // Create choice modal
                const modal = document.createElement('div');
                modal.id = 'taggingChoiceModal';
                modal.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    border: 3px solid #4CAF50;
                    border-radius: 15px;
                    padding: 30px;
                    z-index: 10000;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                    color: white;
                    min-width: 400px;
                    text-align: center;
                `;
                
                const allyNames = curableAllies.map(ally => {
                    const robot = RobotDatabase.getRobot(ally.robotId);
                    const statuses = this.getRobotStatuses(ally.robotId);
                    const statusList = [...statuses.conditions, ...statuses.markers].join(', ');
                    return `${robot.name} (${statusList})`;
                }).join('<br>');
                
                modal.innerHTML = `
                    <h2 style="margin: 0 0 20px 0; color: #4CAF50;">⚔️ Tactical Decision</h2>
                    <p style="font-size: 16px; margin-bottom: 20px;">
                        Your robot is adjacent to both an <strong style="color: #f44336;">ENEMY</strong> 
                        and an <strong style="color: #4CAF50;">ALLY</strong> who needs healing!
                    </p>
                    <div style="background: rgba(76, 175, 80, 0.1); padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <strong style="color: #4CAF50;">Allies to Heal:</strong><br>
                        ${allyNames}
                    </div>
                    <p style="font-size: 14px; color: #aaa; margin-bottom: 25px;">
                        You can only choose ONE action:
                    </p>
                    <div style="display: flex; gap: 15px; justify-content: center;">
                        <button onclick="GameBoard.chooseTaggingBattle()" 
                                style="padding: 15px 30px; font-size: 18px; background: #f44336; 
                                       color: white; border: none; border-radius: 10px; cursor: pointer;
                                       box-shadow: 0 4px 6px rgba(0,0,0,0.3); transition: all 0.3s;">
                            ⚔️ Battle Enemy
                        </button>
                        <button onclick="GameBoard.chooseTaggingHeal(${JSON.stringify(curableAllies)}, '${team}')" 
                                style="padding: 15px 30px; font-size: 18px; background: #4CAF50; 
                                       color: white; border: none; border-radius: 10px; cursor: pointer;
                                       box-shadow: 0 4px 6px rgba(0,0,0,0.3); transition: all 0.3s;">
                            💚 Heal Ally
                        </button>
                    </div>
                `;
                
                document.body.appendChild(modal);
                
                // Store choice context
                this.taggingChoiceContext = {
                    movedToPointId,
                    team,
                    curableAllies,
                    adjacentEnemies
                };
            },
            
            // Player chose to battle
            chooseTaggingBattle() {
                const modal = document.getElementById('taggingChoiceModal');
                if (modal) modal.remove();
                
                console.log(`⚔️ Player chose BATTLE over healing`);
                this.addToHistory('Chose to battle instead of healing ally', 'info', this.taggingChoiceContext.team);
                
                // Enemies are already highlighted, player can click to battle
                // Turn does NOT end automatically
                this.taggingChoiceContext = null;
            },
            
            // Player chose to heal
            chooseTaggingHeal(curableAllies, team) {
                const modal = document.getElementById('taggingChoiceModal');
                if (modal) modal.remove();
                
                console.log(`💚 Player chose HEAL over battling`);
                
                // Heal all adjacent allies
                curableAllies.forEach(ally => {
                    this.cureStandardConditions(ally.robotId);
                    const robot = RobotDatabase.getRobot(ally.robotId);
                    this.addToHistory(`💚 ${robot.name} healed via Tagging!`, 'heal', team);
                });
                
                // Clear enemy highlights
                this.clearAttackableEnemies();
                
                // End turn immediately
                console.log(`⏹️ Turn ending after healing`);
                this.taggingChoiceContext = null;
                setTimeout(() => this.endPlayerTurn(), 500);
            },
            
            // Auto-heal when only allies are adjacent (no choice needed)
            performAutoTaggingHeal(curableAllies, team) {
                console.log(`💚 AUTO-HEALING ${curableAllies.length} adjacent ${curableAllies.length === 1 ? 'ally' : 'allies'}...`);
                
                curableAllies.forEach(ally => {
                    this.cureStandardConditions(ally.robotId);
                    const robot = RobotDatabase.getRobot(ally.robotId);
                    this.addToHistory(`💚 ${robot.name} healed via Tagging!`, 'heal', team);
                    console.log(`   Healed ${robot.name} at ${ally.pointId}`);
                });
                
                // End turn immediately
                console.log(`⏹️ Turn auto-ending after healing (no enemies to battle)`);
                setTimeout(() => this.endPlayerTurn(), 1000);
            },
            
            // ==========================================
            // STATUS EFFECT VISUAL INDICATORS
            // ==========================================
            
            // Add status effect icons to a robot visual
            addStatusEffectIndicators(robotGroup, robotId, centerX, centerY) {
                if (!this.robotStatusEffects[robotId]) return;
                
                const statuses = this.getRobotStatuses(robotId);
                const allStatuses = [...statuses.conditions, ...statuses.markers];
                
                if (allStatuses.length === 0) return;
                
                // Create container for status icons
                const svgNS = "http://www.w3.org/2000/svg";
                const statusContainer = document.createElementNS(svgNS, 'g');
                statusContainer.setAttribute('class', 'status-indicators');
                statusContainer.style.pointerEvents = 'none'; // Don't interfere with robot clicks
                
                // Position icons in a circle around the robot
                const radius = 65; // Distance from robot center
                const iconSize = 24;
                const angleStep = (2 * Math.PI) / Math.max(allStatuses.length, 4); // At least 4 positions
                
                allStatuses.forEach((statusName, index) => {
                    const statusDef = this.statusEffectDefinitions[statusName];
                    if (!statusDef) return;
                    
                    // Calculate position in circle
                    const angle = index * angleStep - (Math.PI / 2); // Start at top
                    const iconX = centerX + radius * Math.cos(angle);
                    const iconY = centerY + radius * Math.sin(angle);
                    
                    // Create circular background
                    const bg = document.createElementNS(svgNS, 'circle');
                    bg.setAttribute('cx', iconX);
                    bg.setAttribute('cy', iconY);
                    bg.setAttribute('r', iconSize / 2);
                    bg.setAttribute('fill', statusDef.color || '#666');
                    bg.setAttribute('stroke', '#fff');
                    bg.setAttribute('stroke-width', '2');
                    bg.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))';
                    
                    // Create text icon
                    const icon = document.createElementNS(svgNS, 'text');
                    icon.setAttribute('x', iconX);
                    icon.setAttribute('y', iconY);
                    icon.setAttribute('text-anchor', 'middle');
                    icon.setAttribute('dominant-baseline', 'central');
                    icon.setAttribute('font-size', '16');
                    icon.textContent = statusDef.icon || '?';
                    icon.style.pointerEvents = 'none';
                    
                    // Add tooltip (title element)
                    const title = document.createElementNS(svgNS, 'title');
                    title.textContent = `${statusDef.name}: ${statusDef.description}`;
                    
                    statusContainer.appendChild(bg);
                    statusContainer.appendChild(icon);
                    statusContainer.appendChild(title);
                });
                
                robotGroup.appendChild(statusContainer);
            },
            
            // Update status indicators for a robot (call after status changes)
            updateRobotStatusIndicators(pointId, robotId) {
                const robotGroup = document.getElementById(`robot-${pointId}`);
                if (!robotGroup) return;
                
                // Remove old status indicators
                const oldIndicators = robotGroup.querySelector('.status-indicators');
                if (oldIndicators) {
                    oldIndicators.remove();
                }
                
                // Get point data for positioning
                const pointData = this.getPointById(pointId);
                if (!pointData) return;
                
                // Add new indicators
                this.addStatusEffectIndicators(robotGroup, robotId, pointData.x, pointData.y);
            },
            
            // Utility Functions
            getAllPoints() {
                return {
                    ...this.gameBoard.routePoints,
                    ...this.gameBoard.innerPoints,
                    ...this.gameBoard.entryPoints,
                    ...this.gameBoard.goalPoints
                };
            },
            
            // Find which point a robot is on (returns pointId or null)
            findRobotOnField(robotId) {
                const allPoints = this.getAllPoints();
                for (const [pointId, pointData] of Object.entries(allPoints)) {
                    if (pointData.robot && pointData.robot.id === robotId) {
                        return pointId;
                    }
                }
                return null;
            },
            
            getPointById(pointId) {
                // CRITICAL FIX: Return reference to actual point object, not a copy
                // Check each category directly to maintain reference
                if (this.gameBoard.routePoints[pointId]) {
                    return this.gameBoard.routePoints[pointId];
                }
                if (this.gameBoard.innerPoints[pointId]) {
                    return this.gameBoard.innerPoints[pointId];
                }
                if (this.gameBoard.entryPoints[pointId]) {
                    return this.gameBoard.entryPoints[pointId];
                }
                if (this.gameBoard.goalPoints[pointId]) {
                    return this.gameBoard.goalPoints[pointId];
                }
                return null;
            },
            
            isPointOccupied(pointId) {
                const element = document.getElementById(pointId);
                return element ? element.getAttribute('data-occupied') === 'true' : false;
            },
            
            occupyPoint(pointId, robotId, team = 'neutral') {
                const element = document.getElementById(pointId);
                if (element) {
                    element.setAttribute('data-occupied', 'true');
                    element.setAttribute('data-robot-id', robotId);
                    element.setAttribute('data-team', team);
                    
                    // Add visual robot image
                    this.addRobotVisual(pointId, robotId, team);
                    return true;
                }
                return false;
            },
            
            clearPoint(pointId) {
                const element = document.getElementById(pointId);
                if (element) {
                    element.setAttribute('data-occupied', 'false');
                    element.setAttribute('data-robot-id', '');
                    element.setAttribute('data-team', 'neutral');
                    
                    // Remove visual robot image
                    this.removeRobotVisual(pointId);
                    return true;
                }
                return false;
            },
            
            getValidMoves(fromPointId) {
                const point = this.getPointById(fromPointId);
                if (!point || !point.connections) return [];
                
                return point.connections.filter(pointId => !this.isPointOccupied(pointId));
            },
            
            // Robot Slot Management
            placeRobotInSlot(slotId, robotId, team = 'player') {
                const element = document.getElementById(slotId);
                if (element && element.getAttribute('data-occupied') === 'false') {
                    element.setAttribute('data-occupied', 'true');
                    element.setAttribute('data-robot-id', robotId);
                    
                    // Update internal mapping (bench slots only - Repair Bay uses separate system)
                    if (team === 'player') {
                        if (slotId.includes('bench') && this.playerZones.player.benchSlots[slotId]) {
                            this.playerZones.player.benchSlots[slotId].robotId = robotId;
                        }
                    } else {
                        if (slotId.includes('bench') && this.playerZones.opponent.benchSlots[slotId]) {
                            this.playerZones.opponent.benchSlots[slotId].robotId = robotId;
                        }
                    }
                    return true;
                }
                return false;
            },
            
            removeRobotFromSlot(slotId, team = 'player') {
                const element = document.getElementById(slotId);
                if (element) {
                    const robotId = element.getAttribute('data-robot-id');
                    element.setAttribute('data-occupied', 'false');
                    element.setAttribute('data-robot-id', '');
                    
                    // Update internal mapping (bench slots only - Repair Bay uses separate system)
                    if (team === 'player') {
                        if (slotId.includes('bench') && this.playerZones.player.benchSlots[slotId]) {
                            this.playerZones.player.benchSlots[slotId].robotId = null;
                        }
                    } else {
                        if (slotId.includes('bench') && this.playerZones.opponent.benchSlots[slotId]) {
                            this.playerZones.opponent.benchSlots[slotId].robotId = null;
                        }
                    }
                    return robotId;
                }
                return null;
            },
            
            // Future Integration Points
            initializeBattle() {
                console.log('🤖 Battle System Initialized!');
                console.log('📍 Game Board Points:', Object.keys(this.getAllPoints()).length);
                console.log('🎯 Player Slots:', Object.keys(this.playerZones.player.benchSlots).length);
                console.log('🔧 Repair Bay Capacity: 2 slots per player');
                console.log('\n✨ STATUS EFFECT SYSTEM LOADED!');
                console.log('📋 Available status effects:');
                console.log('   - Conditions: Confusion, Poison, Burn, Noxious, Paralysis, Frozen, Sleep, Wait');
                console.log('   - Markers: MP-1, Rebooting');
                console.log('🧪 Debug Commands:');
                console.log('   GameBoard.debugApplyStatus("robotId", "statusName") - Apply status');
                console.log('   GameBoard.debugShowAllStatuses() - View all active statuses');
                console.log('   GameBoard.debugApplyConfusion("robotId") - Quick shortcuts available');
                console.log('   GameBoard.debugTestStatusBattle("attacker", "defender") - Simulate battle');
                console.log('🤖 Ready for Robot Integration!');
                
                // Initialize movement lock flag
                this.isMovementInProgress = false;
                
                // Initialize Repair Bay displays (empty at start)
                this.updateRepairBayDisplay('player');
                this.updateRepairBayDisplay('opponent');
                console.log('✅ Repair Bay displays initialized (empty)');
                
                // Initialize battle music
                this.battleMusic = new Audio('Audio/Duel1.mp3');
                this.battleMusic.loop = true; // Loop during battle
                this.battleMusic.volume = 0.5; // Set volume to 50%
                console.log('🎵 Battle music initialized');
            },
            
            // Debug Functions
            debugShowAllPoints() {
                const allPoints = this.getAllPoints();
                console.table(allPoints);
            },
            
            debugShowPlayerZones() {
                console.log('Player Zones:', this.playerZones);
            },
            
            // ==========================================
            // STATUS EFFECT DEBUG FUNCTIONS
            // ==========================================
            
            // Apply a status effect to a robot (for testing)
            debugApplyStatus(robotId, statusName) {
                if (!this.statusEffectDefinitions[statusName]) {
                    console.error(`❌ Unknown status: ${statusName}`);
                    console.log('Available statuses:', Object.keys(this.statusEffectDefinitions));
                    return;
                }
                
                this.addStatusEffect(robotId, statusName);
                console.log(`✅ Applied ${statusName} to ${robotId}`);
                
                // Update visual if robot is on field
                const pointId = this.findRobotOnField(robotId);
                if (pointId) {
                    this.updateRobotStatusIndicators(pointId, robotId);
                }
            },
            
            // Remove a status effect from a robot (for testing)
            debugRemoveStatus(robotId, statusName) {
                this.removeStatusEffect(robotId, statusName);
                console.log(`✅ Removed ${statusName} from ${robotId}`);
                
                // Update visual if robot is on field
                const pointId = this.findRobotOnField(robotId);
                if (pointId) {
                    this.updateRobotStatusIndicators(pointId, robotId);
                }
            },
            
            // Clear all status effects from a robot (for testing)
            debugClearAllStatus(robotId) {
                this.clearAllStatusEffects(robotId);
                console.log(`✅ Cleared all status effects from ${robotId}`);
                
                // Update visual if robot is on field
                const pointId = this.findRobotOnField(robotId);
                if (pointId) {
                    this.updateRobotStatusIndicators(pointId, robotId);
                }
            },
            
            // Show all robots with status effects
            debugShowAllStatuses() {
                console.log('📊 STATUS EFFECTS REPORT');
                console.log('═══════════════════════════════════════');
                
                if (!this.robotStatusEffects || Object.keys(this.robotStatusEffects).length === 0) {
                    console.log('No robots have status effects');
                    return;
                }
                
                for (const [robotId, effects] of Object.entries(this.robotStatusEffects)) {
                    const robot = RobotDatabase.getRobot(robotId);
                    const robotName = robot ? robot.name : robotId;
                    console.log(`\n🤖 ${robotName} (${robotId})`);
                    
                    const statuses = this.getRobotStatuses(robotId);
                    
                    if (statuses.conditions.length > 0) {
                        console.log('  Conditions:', statuses.conditions.join(', '));
                    }
                    if (statuses.markers.length > 0) {
                        console.log('  Markers:', statuses.markers.join(', '));
                    }
                }
                
                console.log('═══════════════════════════════════════');
            },
            
            // Test battle with status effects
            debugTestStatusBattle(attackerRobotId, defenderRobotId) {
                const attacker = RobotDatabase.getRobot(attackerRobotId);
                const defender = RobotDatabase.getRobot(defenderRobotId);
                
                if (!attacker || !defender) {
                    console.error('❌ Invalid robot IDs');
                    return;
                }
                
                console.log('🎲 SIMULATING BATTLE WITH STATUS EFFECTS');
                console.log('═══════════════════════════════════════');
                console.log(`⚔️ ${attacker.name} vs ${defender.name}`);
                
                // Show current statuses
                console.log(`\n${attacker.name} statuses:`, this.getRobotStatuses(attackerRobotId));
                console.log(`${defender.name} statuses:`, this.getRobotStatuses(defenderRobotId));
                
                // Simulate spins
                const attackerSpin = this.spinWheel(attacker.wheel);
                const defenderSpin = this.spinWheel(defender.wheel);
                
                console.log(`\n🎲 Original Spins:`);
                console.log(`  ${attacker.name}: ${attackerSpin.moveName} (${attackerSpin.moveType}) - ${attackerSpin.damage || 0} dmg`);
                console.log(`  ${defender.name}: ${defenderSpin.moveName} (${defenderSpin.moveType}) - ${defenderSpin.damage || 0} dmg`);
                
                // Apply status effects
                const modifiedAttackerSpin = this.applyStatusEffectsToBattleSpin(attackerRobotId, attackerSpin, 'attacker', defenderRobotId);
                const modifiedDefenderSpin = this.applyStatusEffectsToBattleSpin(defenderRobotId, defenderSpin, 'defender', attackerRobotId);
                
                console.log(`\n✨ Modified Spins (after status effects):`);
                console.log(`  ${attacker.name}: ${modifiedAttackerSpin.moveName} (${modifiedAttackerSpin.moveType}) - ${modifiedAttackerSpin.damage || 0} dmg`);
                console.log(`  ${defender.name}: ${modifiedDefenderSpin.moveName} (${modifiedDefenderSpin.moveType}) - ${modifiedDefenderSpin.damage || 0} dmg`);
                
                console.log('═══════════════════════════════════════');
            },
            
            // Quick status presets for testing
            debugApplyConfusion(robotId) { this.debugApplyStatus(robotId, 'confusion'); },
            debugApplyPoison(robotId) { this.debugApplyStatus(robotId, 'poison'); },
            debugApplyBurn(robotId) { this.debugApplyStatus(robotId, 'burn'); },
            debugApplyNoxious(robotId) { this.debugApplyStatus(robotId, 'noxious'); },
            debugApplyParalysis(robotId) { this.debugApplyStatus(robotId, 'paralysis'); },
            debugApplyFrozen(robotId) { this.debugApplyStatus(robotId, 'frozen'); },
            debugApplySleep(robotId) { this.debugApplyStatus(robotId, 'sleep'); },
            debugApplyWait(robotId) { this.debugApplyStatus(robotId, 'wait'); },
            debugApplyMPMinus1(robotId) { this.debugApplyStatus(robotId, 'mp-1'); },
            
            // NEW: Verify Grid Connections
            debugVerifyGrid() {
                console.log('🔍 GRID VERIFICATION REPORT');
                console.log('═══════════════════════════════════════');
                
                const allPoints = this.getAllPoints();
                const totalPoints = Object.keys(allPoints).length;
                console.log(`📊 Total Points: ${totalPoints} (Expected: 26)`);
                
                // Verify each point's connections
                let validConnections = 0;
                let invalidConnections = 0;
                
                for (const [pointId, pointData] of Object.entries(allPoints)) {
                    const gridLabel = pointData.grid || 'N/A';
                    console.log(`\n📍 ${pointId} (${gridLabel})`);
                    console.log(`   Type: ${pointData.type}`);
                    console.log(`   Connections: ${pointData.connections.length}`);
                    
                    // Verify each connection exists
                    pointData.connections.forEach(connId => {
                        if (allPoints[connId]) {
                            console.log(`   ✅ ${connId} (${allPoints[connId].grid || 'N/A'})`);
                            validConnections++;
                        } else {
                            console.log(`   ❌ ${connId} - NOT FOUND!`);
                            invalidConnections++;
                        }
                    });
                }
                
                console.log('\n═══════════════════════════════════════');
                console.log(`✅ Valid Connections: ${validConnections}`);
                console.log(`❌ Invalid Connections: ${invalidConnections}`);
                
                // Special spaces verification
                console.log('\n🎯 SPECIAL SPACES:');
                console.log('Entry Points (Player):');
                console.log('  - OE5A (entry-bottom-left)');
                console.log('  - OE5G (entry-bottom-right)');
                console.log('Entry Points (Opponent):');
                console.log('  - OE1A (entry-top-left)');
                console.log('  - OE1G (entry-top-right)');
                console.log('Goal Points:');
                console.log('  - O1D (goal-opponent) - Player wins here');
                console.log('  - O5D (goal-player) - Opponent wins here');
                
                return {
                    totalPoints,
                    validConnections,
                    invalidConnections,
                    isValid: invalidConnections === 0 && totalPoints === 26
                };
            },
            
            // ==========================================
            // PHASE 2: TURN MANAGEMENT & MOVEMENT LOGIC
            // ==========================================
            
            // Game State Machine
            gameStates: {
                SETUP: 'setup',
                PLAYER_TURN: 'player_turn',
                AI_TURN: 'ai_turn',
                PLAYER_WINS: 'player_wins',
                AI_WINS: 'ai_wins',
                DRAW: 'draw'
            },
            
            currentState: 'setup',
            selectedFigure: null,
            validMoves: [],
            validMovePaths: new Map(), // Store paths for each valid move destination
            turnCount: 0,
            isFirstMoveOfGame: true, // First move has -1 MP penalty
            battleHistory: [], // Array to store battle events
            developerLogMode: false, // Toggle between player-friendly and verbose developer logs
            lastTurnStatusLog: '', // Track last status to avoid spam in battle log
            winType: null, // Track win type: 'goal', 'waitwin', 'timeout'
            
            // State Management
            setState(newState) {
                const oldState = this.currentState;
                this.currentState = newState;
                console.log(`🎮 State Change: ${oldState} → ${newState}`);
                this.onStateChange(newState, oldState);
            },
            
            onStateChange(newState, oldState) {
                switch(newState) {
                    case this.gameStates.SETUP:
                        this.onSetupPhase();
                        break;
                    case this.gameStates.PLAYER_TURN:
                        this.onPlayerTurnStart();
                        break;
                    case this.gameStates.AI_TURN:
                        this.onAITurnStart();
                        break;
                    case this.gameStates.PLAYER_WINS:
                    case this.gameStates.AI_WINS:
                    case this.gameStates.DRAW:
                        this.onGameEnd(newState);
                        break;
                }
            },
            
            // Phase Handlers
            onSetupPhase() {
                console.log('🔧 Setup Phase: Preparing battle...');
                this.turnCount = 0;
                this.selectedFigure = null;
                this.validMoves = [];
                
                // No auto-placement - users must deploy their selected robots manually
                console.log('✅ Setup complete. Deploy robots from bench to entry points.');
                
                // Don't auto-start player turn - wait for manual deployment
                // this.setState(this.gameStates.PLAYER_TURN);
            },
            
            onPlayerTurnStart() {
                console.log('👤 Player Turn Started');
                
                // Clean up any ghost robots before turn starts
                this.cleanupGhostRobots();
                
                // REPAIR BAY: Process rebooting status
                this.processRebootingStatus('player');
                
                this.turnCount++;
                this.showEndTurnButton();
                this.highlightPlayerFigures();
                
                // In debug mode, set control to player
                if (this.debugMode) {
                    this.enableDebugMode();
                }
                
                // Check for win conditions
                if (this.checkWinConditions('player')) return;
                
                // Check for WaitWin (System Lock Victory)
                if (this.checkWaitWin('player')) return;
                
                // CRITICAL: TRIGGER 1 - Highlight all adjacent enemies at turn start
                // Small delay to ensure DOM is fully ready
                setTimeout(() => {
                    this.scanAndHighlightAdjacentEnemies('player');
                }, 100);
            },
            
            onAITurnStart() {
                console.log('🤖 AI Turn Started');
                
                // Clean up any ghost robots before turn starts
                this.cleanupGhostRobots();
                
                // REPAIR BAY: Process rebooting status
                this.processRebootingStatus('opponent');
                
                // In debug mode, treat AI turn as opponent turn (manual control)
                if (this.debugMode) {
                    console.log('🐛 DEBUG MODE: AI turn converted to manual opponent control');
                    this.currentControlTeam = 'opponent';
                    this.showEndTurnButton();
                    this.showDebugControls();
                    this.showTurnActionMessage('OPPONENT\'S TURN - You control opponent in debug mode');
                    
                    // CRITICAL: Check for win conditions at start of opponent's turn
                    if (this.checkWinConditions('opponent')) return;
                    
                    // Check for WaitWin in debug mode
                    if (this.checkWaitWin('opponent')) return;
                    
                    // CRITICAL: TRIGGER 1 - Highlight all adjacent enemies at turn start (debug mode)
                    // Small delay to ensure DOM is fully ready
                    setTimeout(() => {
                        this.highlightAllAdjacentEnemies('opponent');
                    }, 100);
                    
                    return; // Don't execute AI logic
                }
                
                // CRITICAL: Check for win conditions before AI executes
                if (this.checkWinConditions('opponent')) return;
                
                // Check for WaitWin before AI executes
                if (this.checkWaitWin('opponent')) return;
                
                // Normal AI mode
                this.disablePlayerInput();
                this.clearHighlights();
                // TODO: Implement AI decision making
                setTimeout(() => {
                    this.executeAITurn();
                }, 1000); // 1 second delay for dramatic effect
            },
            
            onGameEnd(endState) {
                console.log(`🏁 Game Ended: ${endState}`);
                this.disablePlayerInput();
                this.clearHighlights();
                this.showEndGameUI(endState);
            },
            
            // ==========================================
            // PHASE 2: ENHANCED INPUT MANAGEMENT
            // ==========================================
            
            enablePlayerInput() {
                // Add click listeners to player robot images
                const playerRobots = document.querySelectorAll('.player-robot');
                playerRobots.forEach(robot => {
                    robot.style.cursor = 'pointer';
                    robot.style.pointerEvents = 'auto'; // Enable clicks on robot images
                    robot.addEventListener('click', this.onRobotClick.bind(this));
                });
                
                // Also add click listeners to the points themselves as backup
                const playerPoints = document.querySelectorAll('[data-team="player"][data-occupied="true"]');
                playerPoints.forEach(point => {
                    point.style.cursor = 'pointer';
                    point.addEventListener('click', this.onFigureClick.bind(this));
                });
                
                // Add click-outside deselection
                this.setupClickOutsideDeselection();
            },
            
            disablePlayerInput() {
                // Remove click listeners from robot images
                const allRobots = document.querySelectorAll('.battle-robot');
                allRobots.forEach(robot => {
                    robot.style.cursor = 'default';
                    robot.style.pointerEvents = 'none';
                    robot.removeEventListener('click', this.onRobotClick.bind(this));
                });
                
                // Remove click listeners from points
                const allPoints = document.querySelectorAll('[data-occupied="true"]');
                allPoints.forEach(point => {
                    point.style.cursor = 'default';
                    point.removeEventListener('click', this.onFigureClick.bind(this));
                });
                
                // Remove click-outside listener
                this.removeClickOutsideDeselection();
            },
            
            // Click-outside deselection handler
            setupClickOutsideDeselection() {
                // Remove existing listener if any
                this.removeClickOutsideDeselection();
                
                // Create bound function for removal later
                this.clickOutsideHandler = (event) => {
                    // Only handle if we have a selection
                    if (!this.selectedFigure) return;
                    
                    // Check if click is on a valid move
                    if (event.target.classList.contains('valid-move')) return;
                    
                    // Check if click is on the selected robot or point
                    const clickedId = event.target.id || event.target.closest('[id]')?.id;
                    if (clickedId === this.selectedFigure || clickedId === `robot-${this.selectedFigure}`) return;
                    
                    // Check if click is on another player robot (will trigger reselection)
                    if (event.target.classList.contains('player-robot') || 
                        event.target.closest('.player-robot')) return;
                    
                    // Check if click is on a player-occupied point
                    const clickedPoint = event.target.closest('.point');
                    if (clickedPoint && clickedPoint.getAttribute('data-team') === 'player' && 
                        clickedPoint.getAttribute('data-occupied') === 'true') return;
                    
                    // Otherwise, deselect
                    console.log('🖱️ Click outside detected - deselecting');
                    this.deselectFigure();
                };
                
                // Add listener to the game field
                const gameField = document.querySelector('.game-field');
                if (gameField) {
                    gameField.addEventListener('click', this.clickOutsideHandler);
                }
            },
            
            removeClickOutsideDeselection() {
                if (this.clickOutsideHandler) {
                    const gameField = document.querySelector('.game-field');
                    if (gameField) {
                        gameField.removeEventListener('click', this.clickOutsideHandler);
                    }
                    this.clickOutsideHandler = null;
                }
            },
            
            // Robot Click Handler (for visual robot images)
            onRobotClick(event) {
                if (this.currentState !== this.gameStates.PLAYER_TURN) return;
                
                const robotImg = event.currentTarget;
                const pointId = robotImg.id.replace('robot-', ''); // Extract point ID from robot ID
                
                console.log(`🎯 Robot clicked at point: ${pointId}`);
                this.selectFigure(pointId);
            },
            
            // Figure Selection and Movement
            onFigureClick(event) {
                if (this.currentState !== this.gameStates.PLAYER_TURN) return;
                
                const clickedElement = event.currentTarget;
                const figureId = clickedElement.id;
                
                console.log(`🎯 Figure clicked: ${figureId}`);
                
                // If clicking the same figure, deselect
                if (this.selectedFigure === figureId) {
                    this.deselectFigure();
                    return;
                }
                
                // If clicking a different player figure, select it
                if (clickedElement.getAttribute('data-team') === 'player') {
                    this.selectFigure(figureId);
                    return;
                }
                
                // If clicking an opponent figure while having a selection, try to attack
                if (this.selectedFigure && clickedElement.getAttribute('data-team') === 'opponent') {
                    this.tryAttack(this.selectedFigure, figureId);
                    return;
                }
            },
            
            selectFigure(figureId) {
                this.deselectFigure(); // Clear previous selection
                this.selectedFigure = figureId;
                
                // Highlight selected robot image
                const robotImg = document.getElementById(`robot-${figureId}`);
                if (robotImg) {
                    robotImg.classList.add('selected');
                }
                
                // Also highlight the point for backup
                const figureElement = document.getElementById(figureId);
                if (figureElement) {
                    figureElement.classList.add('selected');
                }
                
                // Calculate and show valid moves
                this.calculateValidMoves(figureId);
                this.highlightValidMoves();
                
                console.log(`✅ Selected figure: ${figureId}`);
            },
            
            deselectFigure() {
                if (this.selectedFigure) {
                    // Remove selection from robot image
                    const robotImg = document.getElementById(`robot-${this.selectedFigure}`);
                    if (robotImg) {
                        robotImg.classList.remove('selected');
                    }
                    
                    // Remove selection from point
                    const figureElement = document.getElementById(this.selectedFigure);
                    if (figureElement) {
                        figureElement.classList.remove('selected');
                    }
                }
                this.selectedFigure = null;
                this.validMoves = [];
                this.clearMoveHighlights();
            },
            
            // ==========================================
            // PHASE 2: CHESS-LIKE MOVEMENT CALCULATION
            // ==========================================
            
            // Calculate valid moves with BLOCKING RULE enforcement
            calculateValidMoves(figureId) {
                const point = this.getPointById(figureId);
                if (!point) return;
                
                // Get MP from robot data
                const pointElement = document.getElementById(figureId);
                const robotId = pointElement ? pointElement.getAttribute('data-robot-id') : null;
                const robot = robotId ? RobotDatabase.getRobot(robotId) : null;
                const movementPoints = robot ? robot.mp : 2; // Default to 2 if no robot data
                
                // Use enhanced BFS with blocking rule
                const result = this.breadthFirstSearchWithBlocking(figureId, movementPoints);
                this.validMoves = result.validMoves;
                this.movePaths = result.paths; // Store paths for animation
                
                console.log(`📍 Valid moves for ${figureId} (${robot ? robot.name : 'Unknown'} - ${movementPoints} MP):`, this.validMoves);
                console.log(`🛤️ Paths calculated:`, this.movePaths);
            },
            
            // Enhanced BFS with BLOCKING RULE: occupied spaces block paths
            breadthFirstSearchWithBlocking(startPointId, maxDistance) {
                const visited = new Set();
                const queue = [{ pointId: startPointId, distance: 0, path: [startPointId] }];
                const validMoves = [];
                const paths = {}; // Store the path to each valid destination
                
                while (queue.length > 0) {
                    const { pointId, distance, path } = queue.shift();
                    
                    if (visited.has(pointId)) continue;
                    visited.add(pointId);
                    
                    // If this isn't the starting point and it's within range
                    if (pointId !== startPointId && distance <= maxDistance) {
                        // Only add if the destination is not occupied
                        if (!this.isPointOccupied(pointId)) {
                            validMoves.push(pointId);
                            paths[pointId] = path; // Store the path to this destination
                        }
                    }
                    
                    // BLOCKING RULE: Don't explore beyond occupied spaces (except starting point)
                    const isBlocked = pointId !== startPointId && this.isPointOccupied(pointId);
                    
                    // Add neighbors to queue if we haven't reached max distance and path isn't blocked
                    if (distance < maxDistance && !isBlocked) {
                        const point = this.getPointById(pointId);
                        if (point && point.connections) {
                            point.connections.forEach(neighborId => {
                                if (!visited.has(neighborId)) {
                                    queue.push({ 
                                        pointId: neighborId, 
                                        distance: distance + 1,
                                        path: [...path, neighborId] // Build the path
                                    });
                                }
                            });
                        }
                    }
                }
                
                return { validMoves, paths };
            },
            
            // Legacy BFS (kept for backward compatibility)
            breadthFirstSearch(startPointId, maxDistance) {
                const result = this.breadthFirstSearchWithBlocking(startPointId, maxDistance);
                return result.validMoves;
            },
            
            // Visual Feedback
            highlightPlayerFigures() {
                const playerRobots = document.querySelectorAll('.player-robot');
                playerRobots.forEach(robot => {
                    robot.classList.add('player-turn-highlight');
                });
            },
            
            highlightValidMoves() {
                this.validMoves.forEach(pointId => {
                    const element = document.getElementById(pointId);
                    if (element) {
                        element.classList.add('valid-move');
                        element.style.cursor = 'pointer';
                        element.addEventListener('click', this.onValidMoveClick.bind(this));
                        
                        // Show movable space image for standard points only
                        if (element.classList.contains('standard-point')) {
                            const movableImage = document.querySelector(`.movable-space-image[data-point="${pointId}"]`);
                            if (movableImage) {
                                movableImage.classList.add('active');
                            }
                        }
                        
                        // Highlight goal space image for goal points
                        if (element.classList.contains('goal-point')) {
                            const goalImage = document.querySelector(`.goal-space-image[data-goal="${pointId}"]`);
                            if (goalImage) {
                                goalImage.classList.add('valid-goal');
                            }
                        }
                    }
                });
            },
            
            clearHighlights() {
                // Clear robot highlights
                document.querySelectorAll('.battle-robot').forEach(robot => {
                    robot.classList.remove('player-turn-highlight', 'selected');
                });
                
                // Clear point highlights
                document.querySelectorAll('.point').forEach(point => {
                    point.classList.remove('player-turn-highlight', 'selected', 'valid-move');
                    point.style.cursor = '';
                });
                
                // Clear movable space images
                document.querySelectorAll('.movable-space-image').forEach(img => {
                    img.classList.remove('active');
                });
            },
            
            clearMoveHighlights() {
                document.querySelectorAll('.valid-move').forEach(element => {
                    element.classList.remove('valid-move');
                    element.style.cursor = '';
                    element.removeEventListener('click', this.onValidMoveClick.bind(this));
                });
                
                // Clear movable space images
                document.querySelectorAll('.movable-space-image').forEach(img => {
                    img.classList.remove('active');
                });
            },
            
            // Move Execution
            onValidMoveClick(event) {
                const targetPointId = event.currentTarget.id;
                if (this.selectedFigure && this.validMoves.includes(targetPointId)) {
                    this.executeMove(this.selectedFigure, targetPointId);
                }
            },
            
            executeMove(fromPointId, toPointId) {
                // ⚠️ DEPRECATED: This old movement system is disabled
                // Use the new moveRobotToPoint() system instead
                console.warn(`⚠️ OLD executeMove() called - this should not happen! Use moveRobotToPoint() instead.`);
                console.warn(`   Attempted move: ${fromPointId} → ${toPointId}`);
                return;
                
                /* OLD CODE DISABLED
                console.log(`🚀 Moving from ${fromPointId} to ${toPointId}`);
                
                // Get robot data from source
                const sourceElement = document.getElementById(fromPointId);
                const robotId = sourceElement.getAttribute('data-robot-id');
                const team = sourceElement.getAttribute('data-team');
                
                // Animate the visual movement first
                this.moveRobotVisual(fromPointId, toPointId);
                
                // Wait for animation to complete, then update data
                setTimeout(() => {
                    // Clear source point (this will remove the old visual)
                    this.clearPoint(fromPointId);
                    
                    // Occupy target point (this will add new visual)
                    this.occupyPoint(toPointId, robotId, team);
                    
                    // Clear selection and highlights
                    this.deselectFigure();
                    
                    // Check for surrounded enemies (instant KO!)
                    GameBoard.checkForSurrounds(team);
                    
                    // Check for adjacent enemies (highlight them, don't auto-battle or end turn)
                    const adjacentEnemies = this.getAdjacentEnemies(toPointId, team);
                    if (adjacentEnemies.length > 0) {
                        this.highlightAdjacentEnemies(toPointId, team);
                    }
                    
                    // Clear first move flag after first move completes
                    if (GameBoard.isFirstMoveOfGame) {
                        GameBoard.isFirstMoveOfGame = false;
                        console.log('✅ First move completed - future moves will use full MP');
                    }
                    
                    // DON'T auto-end turn - let player move other robots or click "End Turn"
                
                // Scan all points on the board
                const allPoints = [
                    ...Object.entries(this.gameBoard.entryPoints),
                    ...Object.entries(this.gameBoard.routePoints),
                    ...Object.entries(this.gameBoard.innerPoints),
                    ...Object.entries(this.gameBoard.goalPoints)
                ];
                
                let totalEnemiesHighlighted = 0;
                
                // Check each robot belonging to the current team
                for (const [pointId, pointData] of allPoints) {
                    if (pointData.robot && pointData.robot.team === team) {
                        console.log(`  🤖 Checking ${pointData.robot.id} at ${pointId}...`);
                        
                        // Check if this robot can initiate battle (not affected by action-blocking status)
                        const robotStatuses = this.getRobotStatuses(pointData.robot.id);
                        const actionBlockers = ['sleep', 'frozen', 'waiting'];
                        const hasBlockingStatus = actionBlockers.some(s => 
                            robotStatuses.conditions.includes(s) || robotStatuses.markers.includes(s)
                        );
                        
                        if (hasBlockingStatus) {
                            console.log(`    ⏸️ Robot is affected by action-blocking status - cannot attack`);
                            continue; // Skip this robot, don't highlight enemies
                        }
                        
                        // Check for adjacent enemies
                        const adjacentEnemies = this.getAdjacentEnemies(pointId, team);
                        if (adjacentEnemies.length > 0) {
                            console.log(`    ⚡ Found ${adjacentEnemies.length} adjacent enemies!`);
                            
                            // Highlight each adjacent enemy
                            adjacentEnemies.forEach(enemyPointId => {
                                const enemyRobotGroup = document.getElementById(`robot-${enemyPointId}`);
                                if (enemyRobotGroup) {
                                    // Skip if already highlighted (avoid duplicates)
                                    if (!enemyRobotGroup.classList.contains('attackable-enemy')) {
                                        enemyRobotGroup.classList.add('attackable-enemy');
                                        
                                        // Apply RED GLOW effect
                                        const circle = enemyRobotGroup.querySelector('circle');
                                        if (circle) {
                                            circle.setAttribute('r', '60');
                                            circle.style.filter = 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.9))';
                                            circle.setAttribute('stroke', '#ff0000');
                                            circle.setAttribute('stroke-width', '8');
                                            console.log(`      🔴 Highlighted enemy at ${enemyPointId}`);
                                            totalEnemiesHighlighted++;
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
                
                if (totalEnemiesHighlighted > 0) {
                    console.log(`✅ TURN START: Highlighted ${totalEnemiesHighlighted} attackable ${totalEnemiesHighlighted === 1 ? 'enemy' : 'enemies'}`);
                    this.addToHistory(`⚔️ ${totalEnemiesHighlighted} attackable ${totalEnemiesHighlighted === 1 ? 'enemy' : 'enemies'} on the board!`, 'info', team);
                } else {
                    console.log(`✅ TURN START: No adjacent enemies found`);
                }
                */
            },
            
            // TRIGGER 1: Scan and highlight all adjacent enemies at turn start
            scanAndHighlightAdjacentEnemies(team) {
                // Scan all points on the board
                const allPoints = [
                    ...Object.entries(this.gameBoard.entryPoints),
                    ...Object.entries(this.gameBoard.routePoints),
                    ...Object.entries(this.gameBoard.innerPoints),
                    ...Object.entries(this.gameBoard.goalPoints)
                ];
                
                let totalEnemiesHighlighted = 0;
                
                // Check each robot belonging to the current team
                for (const [pointId, pointData] of allPoints) {
                    if (pointData.robot && pointData.robot.team === team) {
                        console.log(`  🤖 Checking ${pointData.robot.id} at ${pointId}...`);
                        
                        // Check if this robot can initiate battle (not affected by action-blocking status)
                        const robotStatuses = this.getRobotStatuses(pointData.robot.id);
                        const actionBlockers = ['sleep', 'frozen', 'waiting'];
                        const hasBlockingStatus = actionBlockers.some(s => 
                            robotStatuses.conditions.includes(s) || robotStatuses.markers.includes(s)
                        );
                        
                        if (hasBlockingStatus) {
                            console.log(`    ⏸️ Robot is affected by action-blocking status - cannot attack`);
                            continue; // Skip this robot, don't highlight enemies
                        }
                        
                        // Check for adjacent enemies
                        const adjacentEnemies = this.getAdjacentEnemies(pointId, team);
                        if (adjacentEnemies.length > 0) {
                            console.log(`    ⚡ Found ${adjacentEnemies.length} adjacent enemies!`);
                            
                            // Highlight each adjacent enemy
                            adjacentEnemies.forEach(enemyPointId => {
                                const enemyRobotGroup = document.getElementById(`robot-${enemyPointId}`);
                                if (enemyRobotGroup) {
                                    // Skip if already highlighted (avoid duplicates)
                                    if (!enemyRobotGroup.classList.contains('attackable-enemy')) {
                                        enemyRobotGroup.classList.add('attackable-enemy');
                                        
                                        // Apply RED GLOW effect
                                        const circle = enemyRobotGroup.querySelector('circle');
                                        if (circle) {
                                            circle.setAttribute('r', '60');
                                            circle.style.filter = 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.9))';
                                            circle.setAttribute('stroke', '#ff0000');
                                            circle.setAttribute('stroke-width', '8');
                                            console.log(`      🔴 Highlighted enemy at ${enemyPointId}`);
                                            totalEnemiesHighlighted++;
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
                
                if (totalEnemiesHighlighted > 0) {
                    console.log(`✅ TURN START: Highlighted ${totalEnemiesHighlighted} attackable ${totalEnemiesHighlighted === 1 ? 'enemy' : 'enemies'}`);
                    this.addToHistory(`⚔️ ${totalEnemiesHighlighted} attackable ${totalEnemiesHighlighted === 1 ? 'enemy' : 'enemies'} on the board!`, 'info', team);
                } else {
                    console.log(`✅ TURN START: No adjacent enemies found`);
                }
            },
            
            // Highlight adjacent enemies and return count
            highlightAdjacentEnemies(pointId, team) {
                // Check if the robot at this point can initiate battle
                const point = this.getPointById(pointId);
                if (point && point.robot) {
                    const robotStatuses = this.getRobotStatuses(point.robot.id);
                    const actionBlockers = ['sleep', 'frozen', 'waiting'];
                    const hasBlockingStatus = actionBlockers.some(s => 
                        robotStatuses.conditions.includes(s) || robotStatuses.markers.includes(s)
                    );
                    
                    if (hasBlockingStatus) {
                        console.log(`⏸️ Robot at ${pointId} is affected by action-blocking status - cannot attack`);
                        return 0; // Don't highlight any enemies
                    }
                }
                
                const adjacentEnemies = this.getAdjacentEnemies(pointId, team);
                
                if (adjacentEnemies.length > 0) {
                    console.log(`⚡ ${adjacentEnemies.length} adjacent ${adjacentEnemies.length === 1 ? 'enemy' : 'enemies'} found - highlighting for battle`);
                    
                    // Highlight enemy robots with RED GLOW
                    adjacentEnemies.forEach(enemyPointId => {
                        const enemyRobotGroup = document.getElementById(`robot-${enemyPointId}`);
                        if (enemyRobotGroup) {
                            enemyRobotGroup.classList.add('attackable-enemy');
                            
                            // Apply RED GLOW effect
                            const circle = enemyRobotGroup.querySelector('circle');
                            if (circle) {
                                // Pulsing red glow for attackable enemies
                                circle.setAttribute('r', '60'); // Bigger (DOUBLED from normal 30)
                                circle.style.filter = 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.9))'; // RED glow
                                circle.setAttribute('stroke', '#ff0000'); // Red border
                                circle.setAttribute('stroke-width', '8'); // Thicker border
                                console.log(`🔴 Applied RED GLOW to enemy at ${enemyPointId}`);
                            }
                        }
                    });
                    
                    console.log(`⚔️ Click on a glowing red enemy to initiate battle!`);
                    this.addToHistory(`⚔️ ${adjacentEnemies.length} adjacent ${adjacentEnemies.length === 1 ? 'enemy' : 'enemies'} available for battle!`, 'info', team);
                } else {
                    console.log(`✅ No adjacent enemies`);
                }
                
                return adjacentEnemies.length; // Return count for auto-end turn logic
            },
            
            // Find ally robot adjacent to this enemy (for battle initiation)
            findAdjacentAlly(enemyPointId, enemyTeam) {
                console.log(`🔍 Finding ally adjacent to enemy at ${enemyPointId} (enemy team: ${enemyTeam})`);
                const point = this.getPointById(enemyPointId);
                if (!point || !point.connections) {
                    console.log(`❌ Point not found or no connections`);
                    return null;
                }
                
                const allyTeam = enemyTeam === 'player' ? 'opponent' : 'player';
                console.log(`🔍 Looking for ally team: ${allyTeam}`);
                
                // Find first adjacent ally
                for (const connectedPointId of point.connections) {
                    const connectedPoint = this.getPointById(connectedPointId);
                    console.log(`  Checking ${connectedPointId}: robot=${!!connectedPoint?.robot}, team=${connectedPoint?.robot?.team}`);
                    
                    // CRITICAL DEBUG: Check gameBoard directly
                    let directCheck = null;
                    if (this.gameBoard.entryPoints[connectedPointId]) {
                        directCheck = this.gameBoard.entryPoints[connectedPointId].robot;
                    } else if (this.gameBoard.routePoints[connectedPointId]) {
                        directCheck = this.gameBoard.routePoints[connectedPointId].robot;
                    } else if (this.gameBoard.innerPoints[connectedPointId]) {
                        directCheck = this.gameBoard.innerPoints[connectedPointId].robot;
                    } else if (this.gameBoard.goalPoints[connectedPointId]) {
                        directCheck = this.gameBoard.goalPoints[connectedPointId].robot;
                    }
                    console.log(`  Direct gameBoard check for ${connectedPointId}: robot=${!!directCheck}, team=${directCheck?.team}`);
                    
                    if (connectedPoint && connectedPoint.robot && connectedPoint.robot.team === allyTeam) {
                        console.log(`✅ Found ally at ${connectedPointId}`);
                        return connectedPointId;
                    }
                }
                
                console.log(`❌ No ally found adjacent to ${enemyPointId}`);
                return null;
            },
            
            showBattleOptions(attackerPointId, enemyPoints) {
                console.log(`⚤️ Battle options available from ${attackerPointId}:`, enemyPoints);
                // Highlight adjacent enemies for click-to-battle
                const pointData = this.getPointById(attackerPointId);
                if (pointData && pointData.robot) {
                    this.highlightAdjacentEnemies(attackerPointId, pointData.robot.team);
                }
                // DON'T auto-end turn - let player decide when to end
            },
            
            // Turn Management
            setupEndTurnButton() {
                const endTurnBtn = document.getElementById('end-turn-btn');
                if (endTurnBtn) {
                    endTurnBtn.onclick = () => this.endPlayerTurn();
                    console.log('✅ End Turn button initialized');
                }
            },
            
            showEndTurnButton() {
                const endTurnBtn = document.getElementById('end-turn-btn');
                if (endTurnBtn) {
                    endTurnBtn.style.display = 'block';
                    console.log('👁️ End Turn button shown');
                }
            },
            
            hideEndTurnButton() {
                const endTurnBtn = document.getElementById('end-turn-btn');
                if (endTurnBtn) {
                    endTurnBtn.style.display = 'none';
                }
            },
            
            // Check if any robot on the current team has adjacent enemies
            hasAnyBattleOpportunities(team) {
                // Check all points for robots of this team
                const allPoints = [
                    ...Object.entries(this.gameBoard.entryPoints),
                    ...Object.entries(this.gameBoard.routePoints),
                    ...Object.entries(this.gameBoard.innerPoints),
                    ...Object.entries(this.gameBoard.goalPoints)
                ];
                
                for (const [pointId, pointData] of allPoints) {
                    if (pointData.robot && pointData.robot.team === team) {
                        // This robot belongs to the current team, check for adjacent enemies
                        const adjacentEnemies = this.getAdjacentEnemies(pointId, team);
                        if (adjacentEnemies.length > 0) {
                            console.log(`⚔️ Battle opportunity found: ${pointData.robot.id} at ${pointId} has ${adjacentEnemies.length} adjacent enemies`);
                            return true; // Found at least one battle opportunity
                        }
                    }
                }
                
                console.log(`✅ No battle opportunities available for ${team}`);
                return false; // No battle opportunities
            },
            
            endPlayerTurn() {
                const currentTeam = this.debugMode ? this.currentControlTeam : 'player';
                console.log(`🔄 Attempting to end ${currentTeam} turn...`);
                
                // CONFIRMATION SYSTEM: TWO-TIER CHECK
                // Check A: Has any action been taken (move OR battle)?
                if (!this.turnActions.hasMovedRobot && !this.turnActions.hasBattled) {
                    console.log('⚠️ CHECK A: No action taken this turn - showing confirmation');
                    const confirmed = confirm('You have not moved or battled this turn. Are you sure you want to end your turn?');
                    if (!confirmed) {
                        console.log('❌ Turn end cancelled by user (Check A)');
                        return; // User chose not to end turn
                    }
                }
                
                // Check B: If a robot was moved, does it have adjacent enemies to battle?
                if (this.turnActions.hasMovedRobot && this.turnActions.lastMovedRobotPoint && !this.turnActions.hasBattled) {
                    console.log('⚠️ CHECK B: Move made, checking for battle opportunities...');
                    const adjacentEnemies = this.getAdjacentEnemies(this.turnActions.lastMovedRobotPoint, currentTeam);
                    
                    if (adjacentEnemies.length > 0) {
                        console.log(`⚠️ CHECK B: ${adjacentEnemies.length} adjacent ${adjacentEnemies.length === 1 ? 'enemy' : 'enemies'} available to attack!`);
                        const confirmed = confirm(`You can still attack ${adjacentEnemies.length} adjacent ${adjacentEnemies.length === 1 ? 'enemy' : 'enemies'}! Are you sure you want to end your turn?`);
                        if (!confirmed) {
                            console.log('❌ Turn end cancelled by user (Check B - battle available)');
                            return; // User chose not to end turn
                        }
                        console.log('✅ User confirmed - ending turn despite battle opportunity');
                    } else {
                        console.log('✅ CHECK B: No adjacent enemies - proceeding to end turn');
                    }
                }
                
                console.log(`✅ ${currentTeam} turn ending...`);
                
                // Add to battle history
                this.addToHistory(`Turn ended`, 'info', currentTeam);
                
                // CRITICAL: Expire Wait status at END of owner's turn
                // Wait blocks the robot for the owner's NEXT FULL turn
                // It expires AFTER that turn completes
                this.expireWaitStatusForTeam(currentTeam);
                
                this.hideEndTurnButton();
                this.clearSelection();
                this.clearAttackableEnemies();
                
                // Reset turn action counters
                this.turnActions.hasMovedRobot = false;
                this.turnActions.hasBattled = false;
                this.turnActions.actionTakenThisTurn = false;
                this.turnActions.lastMovedRobotPoint = null; // Clear lock-in
                console.log('✅ Turn actions reset for next turn:', this.turnActions);
                
                // Update bench display to refresh first-turn handicap visuals
                this.updateBenchDisplay();
                console.log('✅ Bench display refreshed (first-turn handicap visuals updated)');
                
                // In debug mode, just switch control team
                if (this.debugMode) {
                    const nextTeam = currentTeam === 'player' ? 'opponent' : 'player';
                    console.log(`🔄 DEBUG MODE: Switching control from ${currentTeam} to ${nextTeam}`);
                    this.switchControlTeam();
                    
                    // Set appropriate game state for the next team
                    if (nextTeam === 'player') {
                        this.setState(this.gameStates.PLAYER_TURN);
                    } else {
                        // Set to AI_TURN but it will be intercepted by onAITurnStart in debug mode
                        this.setState(this.gameStates.AI_TURN);
                    }
                    
                    // Update status display to show reset counters
                    this.showDebugControls();
                    
                    // Show visual notification of turn switch
                    this.showTurnActionMessage(`Turn switched to ${this.currentControlTeam.toUpperCase()}!`);
                } else {
                    console.log(`🔄 NORMAL MODE: Switching to AI turn`);
                    this.setState(this.gameStates.AI_TURN);
                }
            },
            
            async executeAITurn() {
                console.log('🤖 AI executing turn...');

                let aiFigures = this.getTeamFigures('opponent');
                if (aiFigures.length === 0) {
                    const deployed = this.autoDeployOpponentRobot();
                    if (!deployed) {
                        console.warn('🤖 AI could not deploy any robots. Ending turn.');
                        this.finishAITurn();
                        return;
                    }

                    // Rebuild figure list after deployment so AI can act immediately
                    aiFigures = this.getTeamFigures('opponent');
                    if (aiFigures.length === 0) {
                        console.warn('🤖 Deployment succeeded but figure list still empty. Ending turn.');
                        this.finishAITurn();
                        return;
                    }
                }

                // 1. Goal defense: block player threats
                const defensiveAction = this.findGoalDefenseAction(aiFigures);
                if (defensiveAction) {
                    await this.performAIMove(defensiveAction);
                    return;
                }

                // 2. Goal offense: seize player goal if reachable
                const offensiveAction = this.findGoalOffenseAction(aiFigures);
                if (offensiveAction) {
                    await this.performAIMove(offensiveAction);
                    return;
                }

                // 3. Capture favorable targets
                const captureAction = this.findCaptureAction(aiFigures);
                if (captureAction) {
                    await this.performAIMove(captureAction);
                    return;
                }

                // 4. Advance toward strategic points
                const advanceAction = this.findAdvanceAction(aiFigures);
                if (advanceAction) {
                    await this.performAIMove(advanceAction);
                    return;
                }

                console.log('🤖 AI found no viable actions. Ending turn.');
                this.finishAITurn();
            },

            autoDeployOpponentRobot() {
                if (!Array.isArray(this.opponentBench) || this.opponentBench.length === 0) {
                    console.warn('🤖 AI bench is empty, cannot deploy.');
                    return false;
                }

                const benchIndex = this.opponentBench.findIndex(robotId => robotId);
                if (benchIndex === -1) {
                    console.warn('🤖 No available robots in opponent bench.');
                    return false;
                }

                const entryPoints = ['entry-top-left', 'entry-top-right'];
                let chosenEntry = null;
                for (const entryId of entryPoints) {
                    const entryData = this.getPointById(entryId);
                    if (entryData && !entryData.robot) {
                        chosenEntry = entryId;
                        break;
                    }
                }

                if (!chosenEntry) {
                    console.warn('🤖 No available entry points for AI deployment.');
                    return false;
                }

                const robotId = this.opponentBench[benchIndex];
                if (!robotId) {
                    console.warn('🤖 Bench index resolved to empty slot during deployment.');
                    return false;
                }

                const robotState = this.createRobotState(robotId, 'opponent');
                
                // CRITICAL: Deployment costs 1 MP - reduce remaining MP for this turn
                const definition = this.getRobotDefinition(robotId);
                const baseMp = definition?.mp ?? 0;
                robotState.mp = Math.max(0, baseMp - 1);  // Subtract deployment cost
                console.log(`🤖 ${robotId} deployed with ${baseMp} base MP → ${robotState.mp} remaining MP after deployment`);

                // Set robot data directly on the board
                if (this.gameBoard.entryPoints[chosenEntry]) {
                    this.gameBoard.entryPoints[chosenEntry].robot = robotState;
                } else if (this.gameBoard.routePoints[chosenEntry]) {
                    this.gameBoard.routePoints[chosenEntry].robot = robotState;
                }

                this.addRobotVisual(chosenEntry, robotId, 'opponent');
                this.updateRobotStatusIndicators(chosenEntry, robotId);

                // Update DOM occupancy attributes
                const entryElement = document.getElementById(chosenEntry);
                if (entryElement) {
                    entryElement.setAttribute('data-occupied', 'true');
                    entryElement.setAttribute('data-team', 'opponent');
                    entryElement.setAttribute('data-robot-id', robotId);
                }

                // Remove from bench arrays/structures
                this.opponentBench[benchIndex] = null;
                const benchSlots = this.playerZones.opponent.benchSlots;
                const slotIds = Object.keys(benchSlots).sort();
                if (benchIndex < slotIds.length) {
                    benchSlots[slotIds[benchIndex]].robotId = null;
                }
                this.updateBenchDisplay('opponent');

                const robotInfo = this.getRobotDefinition(robotId);
                const robotName = robotInfo ? robotInfo.name : robotState.baseId || robotId;
                this.addToHistory(`${robotName} deployed to ${chosenEntry}`, 'deploy', 'opponent');

                console.log(`🤖 AI deployed ${robotName} to ${chosenEntry}`);

                // AI deployment does not consume its action for this turn
                this.turnActions.hasMovedRobot = false;
                this.turnActions.actionTakenThisTurn = false;
                this.turnActions.lastMovedRobotPoint = null;

                return true;
            },

            getBaseRobotId(robotId) {
                if (!robotId) return null;
                return robotId.endsWith('-opp') ? robotId.slice(0, -4) : robotId;
            },

            getRobotDefinition(robotId) {
                const baseId = this.getBaseRobotId(robotId);
                if (!baseId) return null;
                return RobotDatabase.getRobot(baseId);
            },

            createRobotState(robotId, team) {
                const definition = this.getRobotDefinition(robotId);
                const baseId = this.getBaseRobotId(robotId);
                return {
                    id: robotId,
                    team,
                    baseId,
                    name: definition?.name || baseId || robotId,
                    mp: definition?.mp ?? 0,
                    rarity: definition?.rarity ?? null
                };
            },

            getTeamFigures(team) {
                const figures = [];
                const categories = [
                    this.gameBoard.entryPoints,
                    this.gameBoard.routePoints,
                    this.gameBoard.innerPoints,
                    this.gameBoard.goalPoints
                ];

                categories.forEach(category => {
                    Object.entries(category).forEach(([pointId, pointData]) => {
                        if (pointData.robot && pointData.robot.team === team) {
                            figures.push({ pointId, robot: pointData.robot });
                        }
                    });
                });

                return figures;
            },

            async performAIMove(action) {
                const { type, from, to, battleTarget } = action;
                console.log('[AI ACTION]', action);

                switch (type) {
                    case 'move':
                        const moved = await this.moveRobotForAI(from, to);
                        const finishAITurn = this.finishAITurn ? this.finishAITurn.bind(this) : null;
                        if (finishAITurn) {
                            finishAITurn();
                        }
                        if (!moved) {
                            console.warn('🤖 AI move failed, ending turn.');
                        }
                        break;
                    case 'battle':
                        // AI battles: Set up battle data then auto-execute
                        this.initiateBattle(from, battleTarget);
                        
                        // Auto-execute battle after modal is shown (small delay for visual feedback)
                        setTimeout(async () => {
                            if (this.currentBattle) {
                                console.log('🤖 AI auto-executing battle...');
                                await this.executeBattle();
                            }
                            // End turn after battle completes
                            setTimeout(() => this.finishAITurn(), 1600);
                        }, 500);
                        break;
                    default:
                        console.warn('Unknown AI action type:', type);
                        this.finishAITurn();
                        break;
                }
            },

            findGoalDefenseAction(aiFigures) {
                const playerThreats = this.getTeamFigures('player');
                const aiGoalId = 'goal-player';

                for (const threat of playerThreats) {
                    const threatMoves = this.calculateValidMovesWithinMP(threat.pointId, threat.robot.mp);
                    if (threatMoves.includes(aiGoalId)) {
                        // Try to move an AI figure onto goal or adjacent to capture threat
                        for (const { pointId, robot } of aiFigures) {
                            const moves = this.calculateValidMovesWithinMP(pointId, robot.mp);
                            if (moves.includes(aiGoalId)) {
                                return { type: 'move', from: pointId, to: aiGoalId };
                            }
                            if (this.arePointsAdjacent(pointId, threat.pointId)) {
                                const risk = this.evaluateBattleRisk(robot.id, threat.robot.id);
                                if (risk >= 0) {
                                    return { type: 'battle', from: pointId, battleTarget: threat.pointId };
                                }
                            }
                        }
                    }
                }

                return null;
            },

            findGoalOffenseAction(aiFigures) {
                const playerGoalId = 'goal-opponent';

                for (const { pointId, robot } of aiFigures) {
                    const moves = this.calculateValidMovesWithinMP(pointId, robot.mp);
                    if (moves.includes(playerGoalId)) {
                        console.log('🤖 AI can reach goal! Moving to win.');
                        return { type: 'move', from: pointId, to: playerGoalId };
                    }
                }

                return null;
            },

            findCaptureAction(aiFigures) {
                let bestAction = null;
                let bestScore = -Infinity;

                for (const { pointId, robot } of aiFigures) {
                    const adjacentEnemies = this.getAdjacentEnemies(pointId, 'opponent');
                    adjacentEnemies.forEach(enemyPointId => {
                        const enemyPoint = this.getPointById(enemyPointId);
                        if (!enemyPoint || !enemyPoint.robot) return;

                        const score = this.evaluateBattleRisk(robot.id, enemyPoint.robot.id);
                        if (score > bestScore) {
                            bestScore = score;
                            bestAction = {
                                type: 'battle',
                                from: pointId,
                                battleTarget: enemyPointId,
                                score
                            };
                        }
                    });
                }

                if (bestAction && bestAction.score >= -10) {
                    return bestAction;
                }

                return null;
            },

            findAdvanceAction(aiFigures) {
                const playerGoalId = 'goal-opponent';
                let bestOption = null;
                let bestDistance = Infinity;

                for (const { pointId, robot } of aiFigures) {
                    const moves = this.calculateValidMovesWithinMP(pointId, robot.mp);
                    moves.forEach(destination => {
                        const distance = this.estimateDistance(destination, playerGoalId);
                        if (distance < bestDistance) {
                            bestDistance = distance;
                            bestOption = {
                                type: 'move',
                                from: pointId,
                                to: destination,
                                distance
                            };
                        }
                    });
                }

                return bestOption;
            },

            estimateDistance(fromPointId, toPointId) {
                const start = this.getPointById(fromPointId);
                const target = this.getPointById(toPointId);
                if (!start || !target) return Infinity;

                if (start.position && target.position) {
                    return Math.abs(start.x - target.x) + Math.abs(start.y - target.y);
                }

                return Math.random() * 100; // fallback to avoid infinite loops
            },

            evaluateBattleRisk(attackerId, defenderId) {
                const attacker = RobotDatabase.getRobot(attackerId);
                const defender = RobotDatabase.getRobot(defenderId);
                if (!attacker || !defender) return 0;

                const attackerDamage = (attacker.stats?.attack || 50) + (attacker.mp || 0) * 2;
                const defenderDamage = (defender.stats?.defense || 50) + (defender.mp || 0) * 2;

                const rarityScore = (rarity) => {
                    switch (rarity) {
                        case 'EX': return 4;
                        case 'R': return 3;
                        case 'UC': return 2;
                        case 'C': return 1;
                        default: return 0;
                    }
                };

                const attackerScore = attackerDamage + rarityScore(attacker.rarity) * 10;
                const defenderScore = defenderDamage + rarityScore(defender.rarity) * 10;

                return attackerScore - defenderScore;
            },
            
            // Win Condition Checking
            checkWinConditions(team) {
                // Check goal capture
                const goalId = team === 'player' ? 'goal-opponent' : 'goal-player';
                const goalElement = document.getElementById(goalId);
                
                console.log(`🏁 Checking win conditions for ${team}:`);
                console.log(`   Goal ID: ${goalId}`);
                console.log(`   Goal element found: ${!!goalElement}`);
                if (goalElement) {
                    console.log(`   data-occupied: ${goalElement.getAttribute('data-occupied')}`);
                    console.log(`   data-team: ${goalElement.getAttribute('data-team')}`);
                }
                
                if (goalElement && goalElement.getAttribute('data-occupied') === 'true' && 
                    goalElement.getAttribute('data-team') === team) {
                    
                    // CRITICAL: Check if the robot on the goal has Wait status
                    // A robot with Wait cannot win until Wait expires
                    const goalPoint = this.gameBoard.goalPoints[goalId];
                    if (goalPoint && goalPoint.robot) {
                        const robotStatuses = this.getRobotStatuses(goalPoint.robot.id);
                        const hasWait = robotStatuses.conditions.includes('waiting') || robotStatuses.markers.includes('waiting');
                        
                        if (hasWait) {
                            console.log(`⏸️ Robot on goal has Wait status - win condition BLOCKED!`);
                            console.log(`   ${team} must survive until Wait expires to secure the win`);
                            this.addToHistory(`⚠️ Robot on goal has Wait - win delayed!`, 'info', team);
                            return false; // No win yet - Wait blocks the win
                        }
                    }
                    
                    console.log(`🎉 WIN CONDITION MET! ${team} captured the goal!`);
                    this.winType = 'goal';
                    this.setState(team === 'player' ? this.gameStates.PLAYER_WINS : this.gameStates.AI_WINS);
                    return true;
                }
                
                // Check turn limit
                if (this.turnCount >= 300) {
                    this.winType = 'timeout';
                    this.setState(this.gameStates.DRAW);
                    return true;
                }
                
                console.log(`   No win condition met yet.`);
                return false;
            },
            
            // Check if a team has any legal moves (for System Lock Victory detection)
            // SYSTEM LOCK occurs when BOTH conditions are true:
            // Condition A: Player has ZERO robots on the field
            // Condition B: Both entry points are blocked by enemy robots
            hasLegalMoves(team) {
                console.log(`🔍 Checking if ${team} has legal moves...`);
                
                const entryPoints = team === 'player' ? 
                    ['entry-bottom-left', 'entry-bottom-right'] : ['entry-top-left', 'entry-top-right'];
                
                // CONDITION A: Count robots on field for this team
                // Use Object.entries to get both ID and point data
                const allPointEntries = [
                    ...Object.entries(this.gameBoard.entryPoints),
                    ...Object.entries(this.gameBoard.routePoints),
                    ...Object.entries(this.gameBoard.innerPoints),
                    ...Object.entries(this.gameBoard.goalPoints)
                ];
                
                let robotsOnField = 0;
                let canAnyRobotMove = false;
                
                for (const [pointId, point] of allPointEntries) {
                    if (!point.robot || point.robot.team !== team) continue;
                    
                    robotsOnField++;
                    
                    const robot = RobotDatabase.getRobot(point.robot.id);
                    if (!robot) continue;
                    
                    // Check if this robot can move anywhere
                    const validMoves = this.calculateValidMovesWithinMP(pointId, robot.mp);
                    if (validMoves.length > 0) {
                        canAnyRobotMove = true;
                        console.log(`   ✅ ${team} can move ${robot.name} from ${pointId}`);
                    }
                }
                
                console.log(`   📊 ${team} has ${robotsOnField} robots on field`);
                
                // If team has robots on field that can move, they have legal moves
                if (robotsOnField > 0 && canAnyRobotMove) {
                    console.log(`   ✅ ${team} HAS legal moves (robots can move)`);
                    return true;
                }
                
                // If team has robots on field but none can move, they still have legal moves
                // (they're just blocked, not in System Lock)
                if (robotsOnField > 0 && !canAnyRobotMove) {
                    console.log(`   ⚠️ ${team} has robots but they're all blocked - NOT System Lock`);
                    return true; // Still has legal moves (robots exist, just can't move this turn)
                }
                
                // CONDITION B: Check if both entry points are blocked
                let blockedEntryPoints = 0;
                const enemyTeam = team === 'player' ? 'opponent' : 'player';
                
                for (const entryId of entryPoints) {
                    const entryPoint = this.getPointById(entryId);
                    if (entryPoint && entryPoint.robot && entryPoint.robot.team === enemyTeam) {
                        blockedEntryPoints++;
                        console.log(`   🚫 Entry point ${entryId} blocked by ${enemyTeam}`);
                    }
                }
                
                // SYSTEM LOCK: No robots on field AND both entry points blocked
                if (robotsOnField === 0 && blockedEntryPoints === 2) {
                    console.log(`   ❌ SYSTEM LOCK! ${team} has NO robots on field AND both entry points blocked!`);
                    return false; // No legal moves - System Lock!
                }
                
                // If no robots on field but at least one entry point is free, check if can deploy
                if (robotsOnField === 0 && blockedEntryPoints < 2) {
                    // Check if team has any robots in bench to deploy
                    const bench = team === 'player' ? this.playerBench : this.opponentBench;
                    const hasRobotsInBench = bench.some(robotId => robotId !== null);
                    
                    if (hasRobotsInBench) {
                        console.log(`   ✅ ${team} can deploy from bench (entry points available)`);
                        return true;
                    } else {
                        console.log(`   ❌ SYSTEM LOCK! ${team} has NO robots on field AND bench is EMPTY!`);
                        return false; // No legal moves - no robots to deploy!
                    }
                }
                
                console.log(`   ✅ ${team} HAS legal moves`);
                return true;
            },
            
            // Check for WaitWin (System Lock Victory)
            checkWaitWin(team) {
                console.log(`🔒 Checking WaitWin for ${team}...`);
                
                // Determine opponent
                const opponent = team === 'player' ? 'opponent' : 'player';
                
                // Check if opponent has no legal moves
                if (!this.hasLegalMoves(opponent)) {
                    console.log(`🎉 WAITWIN! ${opponent} has no legal moves - ${team} wins by System Lock!`);
                    this.addToHistory(`🔒 ${opponent.toUpperCase()} has no legal moves!`, 'win', null);
                    this.addToHistory(`🏆 ${team.toUpperCase()} WINS by System Lock Victory!`, 'win', team);
                    this.winType = 'waitwin';
                    this.setState(team === 'player' ? this.gameStates.PLAYER_WINS : this.gameStates.AI_WINS);
                    return true;
                }
                
                return false;
            },
            
            showEndGameUI(endState) {
                let message = '';
                let title = '';
                switch(endState) {
                    case this.gameStates.PLAYER_WINS:
                        title = '🎉 VICTORY!';
                        if (this.winType === 'waitwin') {
                            message = 'System Lock Victory! Opponent has no legal moves!';
                        } else {
                            message = 'You captured the opponent\'s goal!';
                        }
                        break;
                    case this.gameStates.AI_WINS:
                        title = '💀 DEFEAT';
                        if (this.winType === 'waitwin') {
                            message = 'System Lock Defeat! You have no legal moves!';
                        } else {
                            message = 'The opponent captured your goal!';
                        }
                        break;
                    case this.gameStates.DRAW:
                        title = '🤝 DRAW';
                        message = 'Turn limit reached (300 turns).';
                        break;
                }
                
                console.log(`🏁 GAME OVER: ${title} - ${message}`);
                
                // Show modal with game result
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.85);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease-in-out;
                `;
                
                modal.innerHTML = `
                    <div style="
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 40px;
                        border-radius: 20px;
                        text-align: center;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                        max-width: 500px;
                        animation: slideUp 0.4s ease-out;
                    ">
                        <h1 style="
                            font-size: 48px;
                            margin: 0 0 20px 0;
                            color: white;
                            text-shadow: 0 4px 8px rgba(0,0,0,0.3);
                        ">${title}</h1>
                        <p style="
                            font-size: 24px;
                            margin: 0 0 30px 0;
                            color: rgba(255,255,255,0.9);
                        ">${message}</p>
                        <button onclick="BattleSystem.returnToTeamSelection()" style="
                            background: white;
                            color: #667eea;
                            border: none;
                            padding: 15px 40px;
                            font-size: 18px;
                            font-weight: bold;
                            border-radius: 10px;
                            cursor: pointer;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                            transition: all 0.2s;
                        " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                            Return to Team Selection
                        </button>
                    </div>
                `;
                
                document.body.appendChild(modal);
            },
            
            // REMOVED: Test robot auto-placement
            // Users now manually deploy their selected robots from bench
            // This ensures only user-selected robots appear on the field
            
            // REMOVED: Debug random robot placement
            // All robots must be manually deployed by user from bench
            
            debugClearAllRobots() {
                const allPoints = Object.keys(this.getAllPoints());
                allPoints.forEach(pointId => {
                    this.clearPoint(pointId);
                });
                console.log('🧹 All robots cleared from board');
            },
            
            returnToTeamSelection() {
                console.log('🔄 Returning to team selection...');
                
                // Remove end game modal
                const modal = document.querySelector('div[style*="z-index: 10000"]');
                if (modal) {
                    modal.remove();
                }
                
                // Clear the battle board
                this.debugClearAllRobots();
                
                // Reset game state
                this.setState(this.gameStates.SETUP);
                this.turnCount = 0;
                this.turnActions = {
                    hasMovedRobot: false,
                    hasBattled: false,
                    actionTakenThisTurn: false,
                    lastMovedRobotPoint: null // Track which robot just moved (for "lock-in")
                };
                
                // Hide battle game phase and show team selection phase
                const battleGamePhase = document.getElementById('battleGamePhase');
                const teamSelectionPhase = document.getElementById('teamSelectionPhase');
                
                if (battleGamePhase) {
                    battleGamePhase.style.display = 'none';
                    console.log('✅ Battle game phase hidden');
                }
                if (teamSelectionPhase) {
                    teamSelectionPhase.style.display = 'block';
                    console.log('✅ Team selection phase shown');
                }
                
                // Update header
                const battleTitle = document.getElementById('battleTitle');
                const battleSubtitle = document.getElementById('battleSubtitle');
                if (battleTitle) battleTitle.textContent = '🤖 Team Selection';
                if (battleSubtitle) battleSubtitle.textContent = 'Choose 6 robots for battle';
                
                console.log('✅ Returned to team selection');
            },
            
            // Visual Robot Management
            addRobotVisual(pointId, robotId, team) {
                const point = document.getElementById(pointId);
                if (!point) {
                    console.error(`❌ Point element not found: ${pointId}`);
                    return;
                }
                
                // Remove any existing robot visual
                this.removeRobotVisual(pointId);
                
                // Get point coordinates for positioning
                const pointData = this.getPointById(pointId);
                if (!pointData) {
                    console.error(`❌ Point data not found: ${pointId}`);
                    return;
                }
                
                // Get robot data for proper image
                const robot = RobotDatabase.getRobot(robotId);
                const robotImage = robot ? robot.image : 'Imag/mascot.png';
                const robotName = robot ? robot.name : robotId;
                
                console.log(`🎨 Creating robot visual at (${pointData.x}, ${pointData.y})`);
                
                // Create SVG group for the robot
                const svgNS = "http://www.w3.org/2000/svg";
                const robotGroup = document.createElementNS(svgNS, 'g');
                robotGroup.id = `robot-${pointId}`;
                robotGroup.setAttribute('class', `battle-robot ${team}-robot`);
                robotGroup.style.cursor = 'pointer';
                // Store pointId as data attribute for reliable click detection
                robotGroup.setAttribute('data-point-id', pointId);
                robotGroup.setAttribute('data-team', team);
                robotGroup.setAttribute('data-robot-id', robotId); // For Combat Dial handler
                
                // Create circle background - TWICE AS BIG!
                const circle = document.createElementNS(svgNS, 'circle');
                circle.setAttribute('cx', pointData.x);
                circle.setAttribute('cy', pointData.y);
                circle.setAttribute('r', '50'); // DOUBLED! (was 25)
                circle.setAttribute('fill', team === 'player' ? '#28a745' : '#dc3545');
                circle.setAttribute('stroke', '#fff');
                circle.setAttribute('stroke-width', '6'); // Thicker border
                circle.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))';
                // Make circle non-interactive for pointer events (let group handle it)
                circle.style.pointerEvents = 'none';
                
                // Create image element (SVG image) - TWICE AS BIG!
                const image = document.createElementNS(svgNS, 'image');
                image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', robotImage);
                image.setAttribute('x', pointData.x - 44); // DOUBLED offset
                image.setAttribute('y', pointData.y - 44);
                image.setAttribute('width', '88'); // DOUBLED! (was 44)
                image.setAttribute('height', '88');
                image.setAttribute('clip-path', 'circle(44px at 44px 44px)');
                // Make image non-interactive for pointer events (let group handle it)
                image.style.pointerEvents = 'none';
                
                // Create invisible clickable circle (covers entire robot image with generous margin)
                const clickCircle = document.createElementNS(svgNS, 'circle');
                clickCircle.setAttribute('cx', pointData.x);
                clickCircle.setAttribute('cy', pointData.y);
                clickCircle.setAttribute('r', '70'); // INCREASED: 88x88px robot (44px) + 26px margin for easy clicking
                clickCircle.setAttribute('fill', 'transparent');
                clickCircle.setAttribute('stroke', 'none');
                clickCircle.setAttribute('data-robot-id', robotId); // For Combat Dial handler
                clickCircle.style.cursor = 'pointer';
                // This circle handles all pointer events and must be on top
                clickCircle.style.pointerEvents = 'all';
                clickCircle.style.zIndex = '1000'; // Ensure it's on top
                
                // Add elements to group (clickCircle LAST so it's on top)
                robotGroup.appendChild(circle);
                robotGroup.appendChild(image);
                robotGroup.appendChild(clickCircle);
                
                // Add status effect indicators
                this.addStatusEffectIndicators(robotGroup, robotId, pointData.x, pointData.y);
                
                // NOTE: Click handling is now done via global SVG click handler (setupSVGClickHandler)
                // This prevents overlapping robot click issues
                
                // NOTE: Hover effects are now handled by CSS (.battle-robot:hover)
                // This ensures consistent hover feedback across all robot positions
                // JavaScript hover handlers were causing issues with event propagation
                
                // Add to the SVG
                const svg = document.querySelector('.battle-board-svg');
                if (svg) {
                    svg.appendChild(robotGroup);
                    console.log(`✅ Robot visual added to SVG at (${pointData.x}, ${pointData.y})`);
                    
                    // Add Combat Dial tap-and-hold handler ONLY to group (not circle - avoid bubbling)
                    this.addCombatDialHandlerToElement(robotGroup, robotId);
                } else {
                    console.error('❌ SVG element not found!');
                }
                
                console.log(`🤖 Added visual robot ${robotName} (${team}) at ${pointId} (${pointData.x}, ${pointData.y})`);
            },
            
            removeRobotVisual(pointId) {
                const existingRobot = document.getElementById(`robot-${pointId}`);
                if (existingRobot) {
                    existingRobot.remove();
                    console.log(`🗑️ Removed visual robot from ${pointId}`);
                }
            },
            
            // Clean up any ghost robots (visuals without data)
            cleanupGhostRobots() {
                console.log('🧹 Checking for ghost robots (visuals without data)...');
                let ghostCount = 0;
                
                // Get all robot visuals on the board
                const allRobotVisuals = document.querySelectorAll('[id^="robot-"]');
                
                allRobotVisuals.forEach(visual => {
                    const visualId = visual.id;
                    const pointId = visualId.replace('robot-', '');
                    
                    // Check if this point has robot data
                    const pointData = this.getPointById(pointId);
                    if (!pointData || !pointData.robot) {
                        console.warn(`⚠️ GHOST ROBOT found at ${pointId}! Removing...`);
                        visual.remove();
                        ghostCount++;
                    }
                });
                
                if (ghostCount > 0) {
                    console.log(`✅ Removed ${ghostCount} ghost robot(s)`);
                } else {
                    console.log(`✅ No ghost robots found - board is clean`);
                }
            },
            
            // ==========================================
            // PHASE 3: SMOOTH PATH-FOLLOWING ANIMATION
            // ==========================================
            
            // Animate robot along the calculated path (returns promise)
            async moveRobotVisual(fromPointId, toPointId) {
                const robotGroup = document.getElementById(`robot-${fromPointId}`);
                if (!robotGroup) {
                    console.warn(`⚠️ Robot visual not found at ${fromPointId}`);
                    return;
                }
                
                // Get the stored path from BFS calculation
                const path = this.validMovePaths.get(toPointId);
                
                if (!path || path.length === 0) {
                    console.warn(`⚠️ No path found for ${toPointId}, using direct move`);
                    // Fallback to direct move
                    await this.animateAlongPath(robotGroup, [fromPointId, toPointId], fromPointId, toPointId);
                    return;
                }
                
                console.log(`🛤️ Following path (${path.length} steps):`, path);
                
                // Animate along the path
                await this.animateAlongPath(robotGroup, path, fromPointId, toPointId);
            },
            
            // Smooth animation that follows the route path
            animateAlongPath(robotGroup, path, fromPointId, toPointId) {
                return new Promise((resolve) => {
                    const circle = robotGroup.querySelector('circle');
                    const image = robotGroup.querySelector('image');
                    
                    if (!circle || !image) {
                        console.error('❌ Robot visual elements not found');
                        resolve();
                        return;
                    }
                    
                    // Calculate total animation time based on path length
                    const stepDuration = 300; // ms per step
                    const totalDuration = (path.length - 1) * stepDuration;
                    
                    // Build keyframe animation
                    let currentStep = 0;
                    const animateStep = () => {
                        if (currentStep >= path.length - 1) {
                            // Animation complete - update ALL attributes to maintain interactivity
                            robotGroup.id = `robot-${toPointId}`;
                            robotGroup.setAttribute('data-point-id', toPointId);
                            robotGroup.style.cursor = 'pointer';
                            
                            // Get robotId from element for Combat Dial handler re-attachment
                            const robotId = robotGroup.getAttribute('data-robot-id');
                            
                            // Ensure the clickCircle maintains its properties
                            const clickCircle = robotGroup.querySelector('circle:last-of-type');
                            if (clickCircle) {
                                clickCircle.style.cursor = 'pointer';
                                clickCircle.style.pointerEvents = 'all';
                            }
                            
                            // Re-attach Combat Dial handler ONLY to robotGroup (not circle - avoid bubbling)
                            if (robotId) {
                                // Handler will be attached to new element instance (no need to remove old marker)
                                this.addCombatDialHandlerToElement(robotGroup, robotId);
                            }
                            
                            // Verify class is preserved for CSS hover
                            console.log(`✅ Animation complete: ${fromPointId} → ${toPointId}`);
                            console.log(`🔍 Robot classes after move: ${robotGroup.getAttribute('class')}`);
                            resolve();
                            return;
                        }
                        
                        currentStep++;
                        const nextPointId = path[currentStep];
                        const nextPointData = this.getPointById(nextPointId);
                        
                        if (nextPointData) {
                            // Smooth transition to next point
                            circle.style.transition = `all ${stepDuration}ms ease-in-out`;
                            image.style.transition = `all ${stepDuration}ms ease-in-out`;
                            
                            circle.setAttribute('cx', nextPointData.x);
                            circle.setAttribute('cy', nextPointData.y);
                            image.setAttribute('x', nextPointData.x - 44);
                            image.setAttribute('y', nextPointData.y - 44);
                            
                            // Continue to next step
                            setTimeout(animateStep, stepDuration);
                        } else {
                            resolve();
                        }
                    };
                    
                    // Start animation
                    animateStep();
                });
            },
            
            // Phase 2 Initialization
            initializePhase2() {
                console.log('🎮 Phase 2: Turn Management & Movement - INITIALIZED!');
                this.setupEndTurnButton();
                this.setupMovableSpaceImageHandlers();
                this.setState(this.gameStates.SETUP);
                
                // Show end turn button immediately in debug mode
                if (this.debugMode) {
                    this.showEndTurnButton();
                }
            },
            
            // Setup click handlers for movable space images (event delegation)
            setupMovableSpaceImageHandlers() {
                document.querySelectorAll('.movable-space-image').forEach(img => {
                    img.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        const pointId = img.getAttribute('data-point');
                        if (pointId && img.classList.contains('active')) {
                            console.log(`🖱️ Movable image clicked for ${pointId}`);
                            const pointEl = document.getElementById(pointId);
                            if (pointEl) {
                                // Directly call the handler instead of using .click()
                                this.handlePointClick(pointEl);
                            } else {
                                console.error(`❌ Point element not found: ${pointId}`);
                            }
                        } else {
                            console.log(`⚠️ Image clicked but not active or no point ID`);
                        }
                    });
                });

                console.log('✅ Movable space image click handlers initialized');
            },
            
            // DEBUG MODE: Enable manual control of both sides
            debugMode: false,
            currentControlTeam: 'player',

            enableDebugMode() {
                this.debugMode = true;
                this.currentControlTeam = 'player'; // Always start with player control
                console.log('🐛 DEBUG MODE ENABLED - You control both sides! Starting with PLAYER control.');
                this.showDebugControls();
                this.showTurnActionMessage('DEBUG MODE: PLAYER CONTROL ACTIVE');
            },

            disableDebugMode() {
                if (!this.debugMode) {
                    return;
                }

                console.log('🧰 DEBUG MODE DISABLED - Restoring AI control');
                this.debugMode = false;
                this.currentControlTeam = 'player';
                this.hideDebugControls();
            },

            showDebugControls() {
                let debugBtn = document.getElementById('debug-switch-btn');
                if (!debugBtn) {
                    debugBtn = document.createElement('button');
                    debugBtn.id = 'debug-switch-btn';
                    debugBtn.style.position = 'fixed';
                    debugBtn.style.top = '10px';
                    debugBtn.style.right = '10px';
                    debugBtn.style.padding = '6px 12px';
                    debugBtn.style.fontSize = '12px';
                    debugBtn.style.borderRadius = '6px';
                    debugBtn.style.border = '2px solid #666';
                    debugBtn.style.background = 'rgba(30, 30, 30, 0.9)';
                    debugBtn.style.color = '#fff';
                    debugBtn.style.cursor = 'pointer';
                    debugBtn.style.zIndex = '9999';
                    debugBtn.style.fontWeight = '600';
                    debugBtn.style.transition = 'all 0.2s ease';
                    debugBtn.onclick = () => this.switchControlTeam();
                    document.body.appendChild(debugBtn);
                }

                const team = this.currentControlTeam === 'player' ? '👤 Player' : '🤖 Opponent';
                debugBtn.innerHTML = `🐛 ${team}`;
                debugBtn.style.borderColor = this.currentControlTeam === 'player' ? '#28a745' : '#dc3545';

                debugBtn.onmouseenter = () => {
                    debugBtn.style.background = 'rgba(50, 50, 50, 0.95)';
                    debugBtn.style.transform = 'scale(1.05)';
                };
                debugBtn.onmouseleave = () => {
                    debugBtn.style.background = 'rgba(30, 30, 30, 0.9)';
                    debugBtn.style.transform = 'scale(1)';
                };

                let statusDiv = document.getElementById('turn-status-indicator');
                if (!statusDiv) {
                    statusDiv = document.createElement('div');
                    statusDiv.id = 'turn-status-indicator';
                    statusDiv.style.display = 'none';
                    document.body.appendChild(statusDiv);
                }

                const moved = this.turnActions.hasMovedRobot ? '✅' : '❌';
                const battled = this.turnActions.hasBattled ? '✅' : '❌';
                const statusKey = `${moved}${battled}`;
                if (this.lastTurnStatusLog !== statusKey) {
                    this.addToHistory(`Turn Status - Moved: ${moved}, Battled: ${battled}`, 'system');
                    this.lastTurnStatusLog = statusKey;
                }

                this.showBattleHistory();
            },

            hideDebugControls() {
                const debugBtn = document.getElementById('debug-switch-btn');
                if (debugBtn && debugBtn.parentNode) {
                    debugBtn.parentNode.removeChild(debugBtn);
                }

                const statusDiv = document.getElementById('turn-status-indicator');
                if (statusDiv && statusDiv.parentNode) {
                    statusDiv.parentNode.removeChild(statusDiv);
                }
            },

            switchControlTeam() {
                this.currentControlTeam = this.currentControlTeam === 'player' ? 'opponent' : 'player';
                console.log(`🔄 Switched control to: ${this.currentControlTeam}`);
                this.showDebugControls();
                
                // Clear any selections when switching
                this.clearSelection();
            },
            
            // Battle History Log
            // team: 'player', 'opponent', or null for neutral events
            addToHistory(message, type = 'info', team = null) {
                const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
                
                // Team-based colors: player = green, opponent = red
                let color;
                if (team === 'player') {
                    color = '#00ff88'; // Green for player
                } else if (team === 'opponent') {
                    color = '#ff4444'; // Red for opponent
                } else {
                    // Type-based colors for neutral events
                    const colors = {
                        info: '#aaa',
                        battle: '#ff6b6b',
                        win: '#ffd700',
                        system: '#4dabf7'
                    };
                    color = colors[type] || colors.info;
                }
                
                this.battleHistory.push({
                    time: timestamp,
                    message: message,
                    type: type,
                    team: team,
                    color: color
                });
                
                // Keep only last 100 entries (increased for detailed logging)
                if (this.battleHistory.length > 100) {
                    this.battleHistory.shift();
                }
                
                // Update display if it exists
                this.showBattleHistory();
            },
            
            showBattleHistory() {
                let historyDiv = document.getElementById('battle-history-log');
                if (!historyDiv) {
                    historyDiv = document.createElement('div');
                    historyDiv.id = 'battle-history-log';
                    historyDiv.style.position = 'fixed';
                    historyDiv.style.top = '130px';
                    historyDiv.style.right = '10px';
                    historyDiv.style.width = '250px';
                    historyDiv.style.padding = '0';
                    historyDiv.style.fontSize = '10px';
                    historyDiv.style.borderRadius = '6px';
                    historyDiv.style.background = 'rgba(20, 20, 20, 0.95)';
                    historyDiv.style.color = '#fff';
                    historyDiv.style.zIndex = '9999';
                    historyDiv.style.fontFamily = 'monospace';
                    historyDiv.style.border = '1px solid #666';
                    historyDiv.style.display = 'flex';
                    historyDiv.style.flexDirection = 'column';
                    document.body.appendChild(historyDiv);
                }
                
                // Check if log is collapsed
                const isCollapsed = historyDiv.dataset.collapsed === 'true';
                
                // Build history HTML with collapsible header
                const logMode = this.developerLogMode ? 'Developer Log' : 'Battle Log';
                const logIcon = this.developerLogMode ? '🔧' : '📜';
                let html = `<div style="font-weight: bold; color: #ffd700; padding: 8px; background: rgba(20, 20, 20, 0.95); border-bottom: 1px solid #666; display: flex; justify-content: space-between; align-items: center;">
                    <span style="cursor: pointer; flex: 1;" onclick="BattleSystem.toggleBattleLog()">${logIcon} ${logMode}</span>
                    <button style="font-size: 10px; padding: 2px 6px; background: ${this.developerLogMode ? '#4CAF50' : '#666'}; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 8px;" onclick="event.stopPropagation(); BattleSystem.toggleDeveloperLogMode()">DEV</button>
                    <span style="font-size: 16px; user-select: none; cursor: pointer;" onclick="BattleSystem.toggleBattleLog()">${isCollapsed ? '+' : '−'}</span>
                </div>`;
                
                // Add content area (hidden if collapsed)
                if (!isCollapsed) {
                    html += '<div id="battle-log-content" style="padding: 8px; overflow-y: auto; overflow-x: hidden; max-height: 300px; display: flex; flex-direction: column-reverse;">';
                    
                    // Filter history based on mode
                    let filteredHistory = [...this.battleHistory];
                    if (this.developerLogMode) {
                        // Show only developer logs
                        filteredHistory = filteredHistory.filter(entry => entry.isDeveloperLog);
                    } else {
                        // Show only regular logs
                        filteredHistory = filteredHistory.filter(entry => !entry.isDeveloperLog);
                    }
                    
                    // Reverse to show newest at top
                    const reversedHistory = filteredHistory.reverse();
                    reversedHistory.forEach(entry => {
                        if (entry.isDeveloperLog) {
                            // Developer log format - monospace, multi-line support
                            html += `<div style="margin-bottom: 5px; padding: 5px; border-left: 3px solid ${entry.color}; padding-left: 8px; background: rgba(0,0,0,0.5); font-family: 'Courier New', monospace; font-size: 9px;">`;
                            html += `<span style="color: #888; font-size: 8px;">[${entry.time}]</span><br>`;
                            html += `<span style="color: ${entry.color}; white-space: pre-wrap; word-break: break-word;">${entry.message}</span>`;
                            html += `</div>`;
                        } else {
                            // Regular log format
                            let teamIcon = '';
                            if (entry.team === 'player') {
                                teamIcon = '👤 '; // Player icon
                            } else if (entry.team === 'opponent') {
                                teamIcon = '🤖 '; // Robot icon
                            }
                            
                            html += `<div style="margin-bottom: 3px; padding: 3px; border-left: 3px solid ${entry.color}; padding-left: 6px; background: rgba(0,0,0,0.3);">`;
                            html += `<span style="color: #666; font-size: 9px;">[${entry.time}]</span> `;
                            html += `<span style="color: ${entry.color}; font-weight: ${entry.team ? 'bold' : 'normal'};">${teamIcon}${entry.message}</span>`;
                            html += `</div>`;
                        }
                    });
                    
                    html += '</div>'; // Close content div
                }
                
                historyDiv.innerHTML = html;
            },
            
            // Toggle battle log collapse/expand
            toggleBattleLog() {
                const historyDiv = document.getElementById('battle-history-log');
                if (!historyDiv) return;
                
                // Toggle collapsed state
                const isCollapsed = historyDiv.dataset.collapsed === 'true';
                historyDiv.dataset.collapsed = !isCollapsed;
                
                // Refresh display
                this.showBattleHistory();
            },
            
            // Toggle Developer Log Mode
            toggleDeveloperLogMode() {
                this.developerLogMode = !this.developerLogMode;
                console.log(`🔧 Developer Log Mode: ${this.developerLogMode ? 'ENABLED' : 'DISABLED'}`);
                this.showBattleHistory(); // Refresh display
            },
            
            // Add verbose developer log entry
            addDeveloperLog(category, data) {
                if (!this.developerLogMode) return; // Only log if dev mode is on
                
                const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, fractionalSecondDigits: 3 });
                
                // Format data as JSON string for readability
                const dataStr = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
                
                // Category colors
                const categoryColors = {
                    'SPIN_RESULT': '#ff6b6b',
                    'BATTLE_OUTCOME': '#ffd700',
                    'DAMAGE_CALC': '#ff9f43',
                    'STATUS_EFFECT': '#a29bfe',
                    'MOVEMENT': '#00d2d3',
                    'DEPLOYMENT': '#00b894',
                    'KNOCKOUT': '#d63031',
                    'REPAIR': '#74b9ff',
                    'SYSTEM': '#636e72',
                    'ERROR': '#ff0000'
                };
                
                const color = categoryColors[category] || '#aaa';
                
                this.battleHistory.push({
                    time: timestamp,
                    message: `[${category}] ${dataStr}`,
                    type: 'developer',
                    team: null,
                    color: color,
                    isDeveloperLog: true
                });
                
                // Keep only last 100 entries
                if (this.battleHistory.length > 100) {
                    this.battleHistory.shift();
                }
                
                // Update display
                this.showBattleHistory();
            },

            // Initialize battle with selected teams
            initializeBattleWithTeams(playerTeam, opponentTeam) {
                console.log('🎮 Initializing battle with teams...');
                console.log('👤 Player Team:', playerTeam);
                console.log('🤖 Opponent Team:', opponentTeam);
                
                // CRITICAL: Clear ALL status effects from ALL robots (fresh start for new battle)
                console.log('🧹 Clearing all status effects from all robots...');
                if (this.robotStatusEffects) {
                    const allRobotIds = Object.keys(this.robotStatusEffects);
                    allRobotIds.forEach(robotId => {
                        this.clearAllStatusEffects(robotId);
                    });
                    console.log(`✅ Cleared status effects from ${allRobotIds.length} robots`);
                }
                
                // Clear Rebooting status tracking
                if (this.rebootingRobots) {
                    this.rebootingRobots = {};
                    console.log('✅ Cleared Rebooting status tracking');
                }
                
                // Reset turn counters
                this.turnCounters = {
                    player: 0,
                    opponent: 0
                };
                console.log('✅ Reset turn counters');
                
                // Clear any existing robots
                this.clearAllRobots();
                
                // Deploy player team to bench initially
                this.deployTeamToBench(playerTeam, 'player');
                this.deployTeamToBench(opponentTeam, 'opponent');
                
                // Set up initial game state
                this.setState(this.gameStates.SETUP);
                
                // Enable interactive robot deployment
                this.enableRobotInteraction();
                
                // Set up global SVG click handler for better robot detection
                this.setupSVGClickHandler();
                
                // Initialize Combat Dial tap-and-hold handlers
                this.initializeCombatDialHandlers();
                
                console.log('✅ Battle initialized! Players can now deploy robots from bench.');
            },
            
            // Set up global SVG click handler to properly detect robot clicks
            setupSVGClickHandler() {
                const svg = document.querySelector('.battle-board-svg');
                if (!svg) return;
                
                // Remove any existing handler
                if (this.svgClickHandler) {
                    svg.removeEventListener('click', this.svgClickHandler);
                }
                
                // Create new handler
                this.svgClickHandler = (e) => {
                    // Get click coordinates relative to SVG
                    const pt = svg.createSVGPoint();
                    pt.x = e.clientX;
                    pt.y = e.clientY;
                    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
                    
                    console.log(`🖱️ SVG clicked at (${svgP.x.toFixed(1)}, ${svgP.y.toFixed(1)})`);
                    
                    // Find all robots and calculate distances
                    const robots = [];
                    const allPoints = {
                        ...this.gameBoard.routePoints, 
                        ...this.gameBoard.innerPoints,  // ADDED: Inner square points!
                        ...this.gameBoard.entryPoints, 
                        ...this.gameBoard.goalPoints
                    };
                    
                    // DEBUG: Log all points with robots
                    const pointsWithRobots = Object.entries(allPoints).filter(([id, data]) => data.robot);
                    console.log(`🤖 Points with robots:`, pointsWithRobots.map(([id, data]) => `${id} (${data.robot.team})`));
                    
                    // CRITICAL DEBUG: Check gameBoard directly for all point types
                    console.log(`🔍 DIRECT gameBoard CHECK:`);
                    console.log(`  entryPoints with robots:`, Object.keys(this.gameBoard.entryPoints).filter(id => this.gameBoard.entryPoints[id].robot));
                    console.log(`  routePoints with robots:`, Object.keys(this.gameBoard.routePoints).filter(id => this.gameBoard.routePoints[id].robot));
                    console.log(`  innerPoints with robots:`, Object.keys(this.gameBoard.innerPoints).filter(id => this.gameBoard.innerPoints[id].robot));
                    console.log(`  goalPoints with robots:`, Object.keys(this.gameBoard.goalPoints).filter(id => this.gameBoard.goalPoints[id].robot));
                    
                    Object.entries(allPoints).forEach(([pointId, pointData]) => {
                        if (pointData.robot) {
                            const dx = svgP.x - pointData.x;
                            const dy = svgP.y - pointData.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            console.log(`  Checking robot at ${pointId}: distance=${distance.toFixed(1)}px (threshold=70px)`);
                            
                            // INCREASED click radius for easier robot selection
                            // Robot image is 88x88px (44px from center to edge)
                            // Using 70px to give generous clickable area around entire robot
                            if (distance <= 70) {
                                robots.push({
                                    pointId,
                                    distance,
                                    team: pointData.robot.team,
                                    robotGroup: document.getElementById(`robot-${pointId}`)
                                });
                            }
                        }
                    });
                    
                    // If we found robots, click the closest one
                    if (robots.length > 0) {
                        robots.sort((a, b) => a.distance - b.distance);
                        const closest = robots[0];
                        
                        console.log(`🎯 Closest robot: ${closest.pointId} at distance ${closest.distance.toFixed(1)}px, team: ${closest.team}`);
                        console.log(`   Robot group exists: ${!!closest.robotGroup}`);
                        console.log(`   Is attackable enemy: ${closest.robotGroup?.classList.contains('attackable-enemy')}`);
                        
                        // Check if this is an attackable enemy
                        if (closest.robotGroup && closest.robotGroup.classList.contains('attackable-enemy')) {
                            // CRITICAL: Only allow battles during PLAYER's turn
                            if (this.currentState !== this.gameStates.PLAYER_TURN) {
                                console.warn(`⚠️ Cannot battle during ${this.currentState} - battles only allowed during player turn`);
                                return;
                            }
                            
                            // CRITICAL: Validate that the clicked robot is actually an ENEMY
                            const currentTeam = 'player'; // Player's team during player turn
                            const enemyTeam = 'opponent';
                            
                            if (closest.team !== enemyTeam) {
                                console.warn(`⚠️ Cannot battle your own team! Clicked: ${closest.team}, Expected enemy: ${enemyTeam}`);
                                return;
                            }
                            
                            console.log(`⚔️ Initiating battle with enemy at ${closest.pointId}!`);
                            const attackerPointId = this.findAdjacentAlly(closest.pointId, closest.team);
                            if (attackerPointId) {
                                this.initiateBattle(attackerPointId, closest.pointId);
                            } else {
                                console.error('❌ No adjacent ally found to initiate battle!');
                            }
                        } else {
                            // Normal robot selection for movement
                            console.log(`📍 Attempting to select robot at ${closest.pointId} for movement`);
                            this.selectRobotForMovement(closest.pointId);
                        }
                    } else {
                        // No robot clicked - check if we clicked on a point (for deployment or movement destination)
                        console.log(`🔍 No robot found - checking for point clicks`);
                        
                        // Find closest point to click (INCREASED radius for easier clicking)
                        const points = [];
                        Object.entries(allPoints).forEach(([pointId, pointData]) => {
                            const dx = svgP.x - pointData.x;
                            const dy = svgP.y - pointData.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            // INCREASED: 50px radius to cover space images (70x70px = 35px from center)
                            // This ensures clicks on space images are detected
                            if (distance <= 50) {
                                points.push({ pointId, distance });
                            }
                        });
                        
                        // If we found a point, trigger point click handler
                        if (points.length > 0) {
                            console.log(`📍 Found ${points.length} points within range:`, points.map(p => `${p.pointId} (${p.distance.toFixed(1)}px)`));
                            points.sort((a, b) => a.distance - b.distance);
                            const closestPoint = points[0];
                            console.log(`✅ Selecting closest point: ${closestPoint.pointId} at distance ${closestPoint.distance.toFixed(1)}px`);
                            
                            // Trigger point click handler
                            const pointElement = document.getElementById(closestPoint.pointId);
                            if (pointElement) {
                                this.handlePointClick(pointElement);
                            }
                        } else {
                            console.log(`❌ No point or robot found near click location`);
                        }
                    }
                };
                
                svg.addEventListener('click', this.svgClickHandler);
                console.log('✅ Global SVG click handler installed');
            },

            // Clear all robots from the field
            clearAllRobots() {
                // Remove all visual robots
                const existingRobots = document.querySelectorAll('[id^="robot-"]');
                existingRobots.forEach(robot => robot.remove());
                
                // Clear robot data from all points
                Object.keys(this.gameBoard.routePoints).forEach(pointId => {
                    if (this.gameBoard.routePoints[pointId].robot) {
                        delete this.gameBoard.routePoints[pointId].robot;
                    }
                });
                Object.keys(this.gameBoard.entryPoints).forEach(pointId => {
                    if (this.gameBoard.entryPoints[pointId].robot) {
                        delete this.gameBoard.entryPoints[pointId].robot;
                    }
                });
                Object.keys(this.gameBoard.goalPoints).forEach(pointId => {
                    if (this.gameBoard.goalPoints[pointId].robot) {
                        delete this.gameBoard.goalPoints[pointId].robot;
                    }
                });
                
                console.log('🧹 Cleared all robots from field');
            },

            // Deploy team to bench (off-field storage)
            deployTeamToBench(teamRobots, teamType) {
                console.log(`📋 Deploying ${teamType} team to bench:`, teamRobots);
                
                // Store team data for later deployment (legacy arrays)
                if (teamType === 'player') {
                    this.playerBench = teamRobots.slice(); // Copy array
                } else {
                    this.opponentBench = teamRobots.slice(); // Copy array
                }
                
                // ALSO populate benchSlots structure for Repair Bay system
                const benchSlots = this.playerZones[teamType].benchSlots;
                const slotIds = Object.keys(benchSlots).sort(); // Get slot IDs in order
                teamRobots.forEach((robotId, index) => {
                    if (index < slotIds.length) {
                        benchSlots[slotIds[index]].robotId = robotId;
                        console.log(`📍 Placed ${robotId} in ${slotIds[index]}`);
                    }
                });
                
                // Show bench status
                this.updateBenchDisplay();
            },

            // Update bench display (show available robots)
            updateBenchDisplay(team = null) {
                const playerBenchEl = document.getElementById('bench-section');
                const opponentBenchEl = document.getElementById('opponent-bench-section');
                
                // Update player bench
                if ((team === null || team === 'player') && playerBenchEl) {
                    // Convert benchSlots object to array format for rendering
                    const benchArray = [];
                    const benchSlots = this.playerZones.player.benchSlots;
                    Object.keys(benchSlots).forEach(slotId => {
                        benchArray.push(benchSlots[slotId].robotId);
                    });
                    this.renderBenchRobots(playerBenchEl, benchArray, 'player');
                }
                
                // Update opponent bench
                if ((team === null || team === 'opponent') && opponentBenchEl) {
                    // Convert benchSlots object to array format for rendering
                    const benchArray = [];
                    const benchSlots = this.playerZones.opponent.benchSlots;
                    Object.keys(benchSlots).forEach(slotId => {
                        benchArray.push(benchSlots[slotId].robotId);
                    });
                    this.renderBenchRobots(opponentBenchEl, benchArray, 'opponent');
                }
            },

            // Render robots in bench area
            renderBenchRobots(benchElement, robots, teamType) {
                // Create or get container
                let container = benchElement.querySelector('.bench-robots-container');
                if (!container) {
                    container = document.createElement('div');
                    container.className = 'bench-robots-container';
                    benchElement.appendChild(container);
                }
                container.innerHTML = '';
                
                let renderedCount = 0;
                robots.forEach((robotId, index) => {
                    if (!robotId) {
                        console.log(`📋 Bench slot ${index} is empty (robot deployed)`);
                        return; // Skip empty slots (deployed robots)
                    }
                    
                    const robot = RobotDatabase.getRobot(robotId);
                    if (!robot) {
                        console.warn(`⚠️ Robot ${robotId} not found in database`);
                        return;
                    }
                    
                    // FIRST-TURN HANDICAP: Check if robot is unplayable
                    let isUnplayable = false;
                    let effectiveMP = robot.mp;
                    if (this.isFirstMoveOfGame && robot.mp === 1) {
                        isUnplayable = true;
                        effectiveMP = 0;
                        console.log(`⚠️ ${robot.name} is unplayable on first turn (1 MP - 1 handicap = 0 MP)`);
                    }
                    
                    const robotEl = document.createElement('div');
                    robotEl.className = `bench-robot ${teamType}`;
                    robotEl.id = `bench-${teamType}-${index}`;
                    robotEl.setAttribute('data-robot-id', robotId); // For Combat Dial handler
                    
                    // REPAIR BAY: Check if robot is rebooting
                    const isRebooting = this.isRobotRebooting(robotId, teamType);
                    
                    // Add unplayable class for visual feedback (first turn or rebooting)
                    if (isUnplayable || isRebooting) {
                        robotEl.classList.add('unplayable-first-turn');
                        robotEl.style.opacity = '0.4';
                        robotEl.style.filter = 'grayscale(80%)';
                        robotEl.style.cursor = 'not-allowed';
                    }
                    
                    // Determine badge text
                    let badgeText = '';
                    if (isRebooting) {
                        badgeText = '<div class="unplayable-badge" style="background: rgba(255, 100, 0, 0.8);">⏳ Rebooting</div>';
                    } else if (isUnplayable) {
                        badgeText = '<div class="unplayable-badge">1st Turn</div>';
                    }
                    
                    robotEl.innerHTML = `
                        <img src="${robot.image}" alt="${robot.name}" class="bench-robot-image">
                        <div class="bench-robot-name">${robot.name.split(' ')[0]}</div>
                        <div class="bench-robot-mp">${robot.mp}MP${isUnplayable || isRebooting ? ' ⚠️' : ''}</div>
                        ${badgeText}
                    `;
                    
                    // Make clickable for deployment (will be blocked in selectRobotForDeployment)
                    robotEl.onclick = () => this.selectRobotForDeployment(robotId, teamType, index);
                    
                    container.appendChild(robotEl);
                    renderedCount++;
                });
                
                console.log(`📋 Rendered ${renderedCount} robots in ${teamType} bench (${robots.length - renderedCount} deployed)`);
                
                // Re-attach Combat Dial handlers to newly rendered bench robots
                setTimeout(() => {
                    this.addCombatDialHandlersToAllRobots();
                }, 50);
            },

            // Select robot for deployment from bench
            selectRobotForDeployment(robotId, teamType, benchIndex) {
                // CLEAR FIRST PRINCIPLE: Always clear previous selection before showing new highlights
                console.log('🧹 CLEAR FIRST: Clearing all previous highlights and selections');
                this.clearSelection();
                this.clearAttackableEnemies();
                
                // REPAIR BAY: Check if robot is rebooting
                if (this.isRobotRebooting(robotId, teamType)) {
                    console.log(`⏳ Cannot deploy ${robotId} - robot is rebooting (Wait 1)`);
                    const robotData = RobotDatabase.getRobot(robotId);
                    this.addToHistory(`⏳ ${robotData?.name || robotId} is rebooting - cannot deploy this turn`, 'info', teamType);
                    return;
                }
                
                // Check if robot has already been moved this turn
                if (this.turnActions.hasMovedRobot) {
                    console.log('⚠️ Cannot deploy - already moved/deployed a robot this turn!');
                    this.showTurnActionMessage('You can only move ONE robot per turn! End your turn to continue.');
                    return;
                }
                
                // In debug mode, only allow deploying for current control team
                if (this.debugMode && teamType !== this.currentControlTeam) {
                    console.log(`❌ Currently controlling ${this.currentControlTeam} team. Switch teams to deploy this robot.`);
                    return;
                }
                
                // CRITICAL: In normal mode, only allow player to deploy their own robots
                if (!this.debugMode) {
                    // Check if it's player's turn
                    if (this.currentState !== this.gameStates.PLAYER_TURN && this.currentState !== this.gameStates.SETUP) {
                        console.log(`❌ Cannot deploy - not player's turn (current state: ${this.currentState})`);
                        return;
                    }
                    
                    // Check if trying to deploy opponent's robot
                    if (teamType !== 'player') {
                        console.log(`❌ Cannot deploy opponent's robot! You can only deploy your own robots.`);
                        this.showTurnActionMessage('You cannot deploy opponent robots!');
                        return;
                    }
                }
                
                // Get robot data to check MP
                const robot = RobotDatabase.getRobot(robotId);
                if (!robot) {
                    console.log('❌ Robot data not found');
                    return;
                }
                
                // FIRST-TURN HANDICAP CHECK
                let effectiveMP = robot.mp;
                if (this.isFirstMoveOfGame) {
                    effectiveMP = robot.mp - 1;
                    console.log(`⚠️ FIRST-TURN HANDICAP: ${robot.name} MP reduced from ${robot.mp} to ${effectiveMP}`);
                }
                
                // Check if robot has enough MP to deploy (needs at least 1 MP after handicap)
                if (effectiveMP < 1) {
                    console.log(`❌ Cannot deploy ${robot.name} - insufficient MP after first-turn handicap (${effectiveMP} MP)`);
                    this.showTurnActionMessage(`${robot.name} cannot be deployed on first turn (1 MP robots need 2 MP after -1 handicap)`);
                    return;
                }
                
                console.log(`🎯 Selected ${robotId} for deployment from ${teamType} bench`);
                
                this.selectedRobotForDeployment = {
                    robotId: robotId,
                    teamType: teamType,
                    benchIndex: benchIndex
                };
                
                // Visual feedback for bench robot selection
                const benchEl = document.getElementById(`bench-${teamType}-${benchIndex}`);
                if (benchEl) {
                    benchEl.classList.add('selected');
                }
                
                // SMART DEPLOYMENT: Calculate and highlight ALL possible final destinations
                this.highlightSmartDeploymentDestinations(robotId, teamType, effectiveMP);
            },

            // Enable robot interaction and movement
            enableRobotInteraction() {
                console.log('🎮 Enabling robot interaction...');
                
                // Add click handlers to all game board points (circles and groups)
                const allPointCircles = document.querySelectorAll('.point');
                const allPointGroups = document.querySelectorAll('[id^="point-"], [id^="entry-"], [id^="goal-"]');
                
                // Add handlers to both circles and groups to catch all clicks
                [...allPointCircles, ...allPointGroups].forEach(point => {
                    point.addEventListener('click', (e) => this.handlePointClick(e.target));
                    point.style.cursor = 'pointer'; // Make it clear they're clickable
                });
                
                // Add visual feedback
                document.body.classList.add('battle-system-active');
                
                console.log(`✅ Added click handlers to ${allPointCircles.length + allPointGroups.length} elements`);
            },

            // Handle clicks on game board points
            handlePointClick(pointElement) {
                // Handle SVG nested elements - find the parent with ID
                let element = pointElement;
                let pointId = element.id;
                
                // If clicked on inner SVG element (circle, line, etc), find parent group
                if (!pointId || pointId === '') {
                    element = pointElement.closest('[id^="point-"], [id^="entry-"], [id^="goal-"]');
                    if (element) {
                        pointId = element.id;
                    }
                }
                
                if (!pointId) {
                    console.log('❌ No valid point ID found');
                    return;
                }
                
                console.log(`🎯 Clicked point: ${pointId}`);
                
                // PRIORITY 1: Check if we have a robot selected for deployment from bench
                if (this.selectedRobotForDeployment) {
                    console.log(`📍 Deploying robot to ${pointId}`);
                    this.deployRobotToPoint(this.selectedRobotForDeployment, pointId);
                    return;
                }
                
                // PRIORITY 2: Check if we have a robot selected for movement and this is a valid destination
                if (this.selectedRobotForMovement) {
                    const pointData = this.getPointById(pointId);
                    
                    // If clicking on the same robot that's already selected, do nothing
                    if (pointData && pointData.robot && pointId === this.selectedRobotForMovement.pointId) {
                        console.log('⏭️ Already selected - ignoring click');
                        return;
                    }
                    
                    // If clicking on an empty space, try to move there
                    if (!pointData || !pointData.robot) {
                        // CRITICAL: Validate destination is in validMoves array
                        if (!this.validMoves || this.validMoves.length === 0) {
                            console.error(`❌ No valid moves available - this.validMoves is ${this.validMoves ? 'empty' : 'undefined'}`);
                            return;
                        }
                        
                        if (!this.validMoves.includes(pointId)) {
                            console.warn(`❌ Invalid move: ${pointId} is not in validMoves array`);
                            console.warn(`   Valid destinations:`, this.validMoves);
                            return;
                        }
                        
                        // Valid move - execute it!
                        this.moveRobotToPoint(this.selectedRobotForMovement, pointId);
                        return;
                    }
                    
                    // If clicking on a different robot, select that one instead
                    if (pointData && pointData.robot) {
                        console.log(`🔄 Switching selection to ${pointId}`);
                        this.selectRobotForMovement(pointId);
                        return;
                    }
                }
                
                // PRIORITY 3: No robot selected - check if clicking on a robot to select it
                const pointData = this.getPointById(pointId);
                if (pointData && pointData.robot) {
                    this.selectRobotForMovement(pointId);
                }
            },

            // SMART DEPLOYMENT: Calculate all possible final destinations from bench
            highlightSmartDeploymentDestinations(robotId, teamType, effectiveMP) {
                console.log(`🎯 SMART DEPLOYMENT: Calculating destinations for ${robotId} with ${effectiveMP} effective MP`);
                
                // NOTE: Clearing is already done in selectRobotForDeployment via clearSelection()
                // No need to clear again here - follows "Clear First" principle
                
                // Get entry points for this team
                const entryPoints = teamType === 'player' 
                    ? ['entry-bottom-left', 'entry-bottom-right']
                    : ['entry-top-left', 'entry-top-right'];
                
                // Store all valid destinations
                const allValidDestinations = new Set();
                
                // FREE MOVEMENT MODE: Show ALL empty spaces!
                if (this.freeMovementMode) {
                    console.log(`🚀 FREE MOVEMENT MODE: Showing ALL empty spaces for deployment!`);
                    
                    // Get all points from all categories
                    const allPoints = {
                        ...this.gameBoard.entryPoints,
                        ...this.gameBoard.routePoints,
                        ...this.gameBoard.innerPoints,
                        ...this.gameBoard.goalPoints
                    };
                    
                    // Add all empty points
                    Object.keys(allPoints).forEach(pointId => {
                        const point = allPoints[pointId];
                        if (!point.robot) {
                            allValidDestinations.add(pointId);
                        }
                    });
                } else {
                    // Normal mode: MP-based deployment
                    // Deployment costs 1 MP, so remaining MP for movement is effectiveMP - 1
                    const remainingMP = effectiveMP - 1;
                    console.log(`💰 Deployment cost: 1 MP, Remaining MP for movement: ${remainingMP}`);
                    
                    // For each available entry point
                    entryPoints.forEach(entryPointId => {
                        const entryPointData = this.getPointById(entryPointId);
                        
                        console.log(`📍 Checking entry point: ${entryPointId}`, entryPointData);
                        
                        // Skip if entry point is occupied
                        if (entryPointData.robot) {
                            console.log(`⏭️ Skipping ${entryPointId} - occupied by ${entryPointData.robot.id}`);
                            return;
                        }
                        
                        // Entry point itself is always a valid destination
                        allValidDestinations.add(entryPointId);
                        console.log(`✅ ${entryPointId} is valid (entry point itself)`);
                        
                        // If there's remaining MP, calculate reachable points from this entry
                        if (remainingMP > 0) {
                            console.log(`🔍 Calculating reachable points from ${entryPointId} with ${remainingMP} MP...`);
                            const reachableFromEntry = this.calculateValidMovesWithinMP(entryPointId, remainingMP);
                            console.log(`📊 Found ${reachableFromEntry.length} reachable points:`, reachableFromEntry);
                            reachableFromEntry.forEach(destId => {
                                allValidDestinations.add(destId);
                                console.log(`  ✅ ${destId} is valid (${remainingMP} MP from ${entryPointId})`);
                            });
                        } else {
                            console.log(`⚠️ No remaining MP (${remainingMP}), only entry point itself is valid`);
                        }
                    });
                }
                
                console.log(`🎯 Total valid destinations: ${allValidDestinations.size}`, Array.from(allValidDestinations));
                
                // Highlight all valid destinations
                let highlightedCount = 0;
                allValidDestinations.forEach(pointId => {
                    const pointEl = document.getElementById(pointId);
                    if (pointEl) {
                        console.log(`🎨 Adding 'valid-move' class to ${pointId}`);
                        pointEl.classList.add('valid-move');
                        highlightedCount++;
                        
                        // Also highlight entry space images
                        if (entryPoints.includes(pointId)) {
                            const entryImage = document.querySelector(`.entry-space-image[data-entry="${pointId}"]`);
                            if (entryImage) {
                                entryImage.classList.add('valid-deployment');
                                console.log(`🎨 Added 'valid-deployment' class to entry image for ${pointId}`);
                            }
                        }
                        
                        // CRITICAL: Show movable space image for standard points
                        if (pointEl.classList.contains('standard-point')) {
                            const movableImage = document.querySelector(`.movable-space-image[data-point="${pointId}"]`);
                            if (movableImage) {
                                movableImage.classList.add('active');
                                console.log(`🎨 Activated movable space image for ${pointId}`);
                            }
                        }
                    } else {
                        console.warn(`⚠️ Could not find element for ${pointId}`);
                    }
                });
                
                console.log(`✅ Highlighted ${highlightedCount} out of ${allValidDestinations.size} destinations`);
                
                // Store the valid destinations for click handling
                this.smartDeploymentDestinations = allValidDestinations;
            },

            // Deploy robot to a point (SMART DEPLOYMENT: can deploy to any valid destination)
            async deployRobotToPoint(deploymentData, pointId) {
                console.log(`🚀 Attempting to SMART DEPLOY ${deploymentData.robotId} to ${pointId}...`);
                
                const pointData = this.getPointById(pointId);
                if (!pointData) {
                    console.log('❌ Invalid deployment point');
                    return;
                }
                
                // Check if destination is in the valid smart deployment destinations
                if (this.smartDeploymentDestinations && !this.smartDeploymentDestinations.has(pointId)) {
                    console.log('❌ Not a valid smart deployment destination');
                    this.showDeploymentError('Invalid destination! Click on a highlighted space.');
                    return;
                }
                
                // FREE MOVEMENT MODE: Direct instant deployment to ANY empty space!
                if (this.freeMovementMode) {
                    console.log(`🚀 FREE MOVEMENT MODE: Direct deployment to ${pointId}!`);
                    
                    // Check if destination is occupied
                    if (pointData.robot) {
                        console.log('❌ Destination occupied - cannot deploy!');
                        this.showDeploymentError('Destination is occupied!');
                        return;
                    }
                    
                    // Deploy directly to the point (skip entry point routing)
                    const robotDataObj = {
                        id: deploymentData.robotId,
                        team: deploymentData.teamType
                    };
                    
                    // Set robot data directly in gameBoard
                    if (this.gameBoard.entryPoints[pointId]) {
                        this.gameBoard.entryPoints[pointId].robot = robotDataObj;
                    } else if (this.gameBoard.routePoints[pointId]) {
                        this.gameBoard.routePoints[pointId].robot = robotDataObj;
                    } else if (this.gameBoard.innerPoints[pointId]) {
                        this.gameBoard.innerPoints[pointId].robot = robotDataObj;
                    } else if (this.gameBoard.goalPoints[pointId]) {
                        this.gameBoard.goalPoints[pointId].robot = robotDataObj;
                    }
                    
                    // Add visual robot
                    this.addRobotVisual(pointId, deploymentData.robotId, deploymentData.teamType);
                    
                    // Update status indicators
                    this.updateRobotStatusIndicators(pointId, deploymentData.robotId);
                    
                    // Remove from bench
                    if (deploymentData.teamType === 'player') {
                        this.playerBench[deploymentData.benchIndex] = null;
                    } else {
                        this.opponentBench[deploymentData.benchIndex] = null;
                    }
                    
                    const benchSlots = this.playerZones[deploymentData.teamType].benchSlots;
                    const slotIds = Object.keys(benchSlots).sort();
                    if (deploymentData.benchIndex < slotIds.length) {
                        const slotId = slotIds[deploymentData.benchIndex];
                        benchSlots[slotId].robotId = null;
                    }
                    
                    // Update bench display
                    this.updateBenchDisplay();
                    
                    // Clear selection
                    this.selectedRobotForDeployment = null;
                    this.smartDeploymentDestinations = null;
                    document.querySelectorAll('.bench-robot').forEach(el => el.classList.remove('selected'));
                    document.querySelectorAll('.point').forEach(el => {
                        el.classList.remove('valid-deployment', 'valid-move', 'selected');
                    });
                    
                    // Add to history
                    const robot = RobotDatabase.getRobot(deploymentData.robotId);
                    this.addToHistory(`🚀 ${robot.name} deployed instantly to ${pointId} (Free Movement)`, 'deploy', deploymentData.teamType);
                    
                    console.log(`🚀 FREE MOVEMENT: Instant deployment complete!`);
                    return;
                }
                
                // Normal mode: Entry point routing
                // Get entry points for this team
                const validEntryPoints = deploymentData.teamType === 'player' 
                    ? ['entry-bottom-left', 'entry-bottom-right']
                    : ['entry-top-left', 'entry-top-right'];
                
                // Determine if clicking on entry point directly or a further destination
                const isEntryPoint = validEntryPoints.includes(pointId);
                
                if (isEntryPoint) {
                    // Direct deployment to entry point
                    if (pointData.robot) {
                        console.log('❌ Entry Point occupied - cannot deploy!');
                        this.showDeploymentError('Entry Point is occupied! Move the robot away first.');
                        return;
                    }
                    
                    // GHOST ROBOT FIX: Check if entry point has a visual robot without data
                    const ghostVisual = document.getElementById(`robot-${pointId}`);
                    if (ghostVisual) {
                        console.warn(`⚠️ GHOST ROBOT DETECTED at ${pointId}! Visual exists but no data. Removing ghost...`);
                        this.removeRobotVisual(pointId);
                        console.log(`✅ Ghost robot visual removed from ${pointId}`);
                    }
                    
                    console.log(`📍 Direct deployment to entry point ${pointId}`);
                } else {
                    // Smart deployment to a further destination
                    console.log(`🎯 Smart deployment to ${pointId} (will route through entry point)`);
                    
                    // Find which entry point to use (choose closest unoccupied one)
                    let selectedEntryPoint = null;
                    for (const entryId of validEntryPoints) {
                        const entryData = this.getPointById(entryId);
                        console.log(`🔍 Checking entry ${entryId}:`, entryData.robot ? `OCCUPIED by ${entryData.robot.team}` : 'AVAILABLE');
                        
                        if (!entryData.robot) {
                            // Check if destination is reachable from this entry
                            const robot = RobotDatabase.getRobot(deploymentData.robotId);
                            let effectiveMP = robot.mp;
                            if (this.isFirstMoveOfGame) {
                                effectiveMP = robot.mp - 1;
                            }
                            const remainingMP = effectiveMP - 1; // -1 for deployment cost
                            
                            const reachable = this.calculateValidMovesWithinMP(entryId, remainingMP);
                            if (reachable.includes(pointId)) {
                                selectedEntryPoint = entryId;
                                console.log(`✅ Will deploy via ${entryId} (unoccupied and can reach destination)`);
                                break;
                            } else {
                                console.log(`⏭️ ${entryId} available but cannot reach ${pointId} with ${remainingMP} MP`);
                            }
                        } else {
                            console.log(`⏭️ ${entryId} is BLOCKED by ${entryData.robot.team} - skipping`);
                        }
                    }
                    
                    if (!selectedEntryPoint) {
                        console.log('❌ No valid entry point available for this destination');
                        this.showDeploymentError('Cannot reach this destination!');
                        return;
                    }
                    
                    // First deploy to entry point, then move to final destination
                    await this.executeSmartDeployment(deploymentData, selectedEntryPoint, pointId);
                    return;
                }
                
                console.log(`📍 Deploying to valid entry point for ${deploymentData.teamType} team`);
                console.log(`📊 Before deployment - pointData:`, pointData);
                console.log(`📊 Before deployment - pointData.robot:`, pointData.robot);
                
                // Deploy the robot - add to point data DIRECTLY to gameBoard
                // Don't trust the reference - set it directly
                const robotDataObj = {
                    id: deploymentData.robotId,
                    team: deploymentData.teamType
                };
                
                console.log(`🔍 Checking which point category ${pointId} belongs to:`);
                console.log(`  - entryPoints? ${!!this.gameBoard.entryPoints[pointId]}`);
                console.log(`  - routePoints? ${!!this.gameBoard.routePoints[pointId]}`);
                console.log(`  - innerPoints? ${!!this.gameBoard.innerPoints[pointId]}`);
                console.log(`  - goalPoints? ${!!this.gameBoard.goalPoints[pointId]}`);
                
                if (this.gameBoard.entryPoints[pointId]) {
                    this.gameBoard.entryPoints[pointId].robot = robotDataObj;
                    console.log(`✅ Set robot data directly in gameBoard.entryPoints[${pointId}]`);
                    console.log(`📊 Immediate check: gameBoard.entryPoints[${pointId}].robot =`, this.gameBoard.entryPoints[pointId].robot);
                } else if (this.gameBoard.routePoints[pointId]) {
                    this.gameBoard.routePoints[pointId].robot = robotDataObj;
                    console.log(`✅ Set robot data directly in gameBoard.routePoints[${pointId}]`);
                    console.log(`📊 Immediate check: gameBoard.routePoints[${pointId}].robot =`, this.gameBoard.routePoints[pointId].robot);
                } else if (this.gameBoard.innerPoints[pointId]) {
                    this.gameBoard.innerPoints[pointId].robot = robotDataObj;
                    console.log(`✅ Set robot data directly in gameBoard.innerPoints[${pointId}]`);
                    console.log(`📊 Immediate check: gameBoard.innerPoints[${pointId}].robot =`, this.gameBoard.innerPoints[pointId].robot);
                } else if (this.gameBoard.goalPoints[pointId]) {
                    this.gameBoard.goalPoints[pointId].robot = robotDataObj;
                    console.log(`✅ Set robot data directly in gameBoard.goalPoints[${pointId}]`);
                    console.log(`📊 Immediate check: gameBoard.goalPoints[${pointId}].robot =`, this.gameBoard.goalPoints[pointId].robot);
                }
                
                // Verify it persists via getPointById
                const verifyPoint = this.getPointById(pointId);
                console.log(`✅ Verification via getPointById - ${pointId}.robot:`, verifyPoint?.robot);
                console.log(`✅ Robot data added to point`);
                
                // Add visual robot to game field
                this.addRobotVisual(pointId, deploymentData.robotId, deploymentData.teamType);
                console.log(`✅ Visual robot added to field`);
                
                // Update status indicators for newly deployed robot
                this.updateRobotStatusIndicators(pointId, deploymentData.robotId);
                console.log(`🎯 Updated status indicators for deployed robot at ${pointId}`);
                
                // Remove from bench array
                const benchArray = deploymentData.teamType === 'player' ? this.playerBench : this.opponentBench;
                console.log(`📋 Before removal - Bench:`, benchArray);
                
                if (deploymentData.teamType === 'player') {
                    this.playerBench[deploymentData.benchIndex] = null;
                } else {
                    this.opponentBench[deploymentData.benchIndex] = null;
                }
                
                // ALSO remove from benchSlots structure
                const benchSlots = this.playerZones[deploymentData.teamType].benchSlots;
                const slotIds = Object.keys(benchSlots).sort();
                if (deploymentData.benchIndex < slotIds.length) {
                    const slotId = slotIds[deploymentData.benchIndex];
                    benchSlots[slotId].robotId = null;
                    console.log(`📍 Cleared ${slotId} (robot deployed)`);
                }
                
                console.log(`📋 After removal - Bench:`, benchArray);
                console.log(`✅ Robot removed from bench slot ${deploymentData.benchIndex}`);
                
                // Update bench display (this will re-render without the deployed robot)
                this.updateBenchDisplay();
                console.log(`✅ Bench display updated`);
                
                // Clear deployment selection
                this.selectedRobotForDeployment = null;
                document.querySelectorAll('.bench-robot').forEach(el => el.classList.remove('selected'));
                document.querySelectorAll('.point').forEach(el => {
                    el.classList.remove('valid-deployment', 'selected');
                });
                
                console.log(`✅ Successfully deployed ${deploymentData.robotId} to ${pointId}!`);
                
                // Add to battle history
                const robotData = RobotDatabase.getRobot(deploymentData.robotId);
                const robotName = robotData ? robotData.name : deploymentData.robotId;
                this.addToHistory(`${robotName} deployed to ${pointId}`, 'deploy', deploymentData.teamType);
                
                // Developer Log: Deployment
                this.addDeveloperLog('DEPLOYMENT', {
                    robotId: deploymentData.robotId,
                    robotName: robotName,
                    team: deploymentData.teamType,
                    location: pointId,
                    benchIndex: deploymentData.benchIndex,
                    isEntryPoint: isEntryPoint,
                    turnLocked: true,
                    firstMove: this.isFirstMoveOfGame
                });
                
                // Mark that robot has been deployed this turn - LOCK-IN to this robot only
                this.turnActions.hasMovedRobot = true;
                this.turnActions.actionTakenThisTurn = true;
                this.turnActions.lastMovedRobotPoint = pointId; // LOCK-IN: Only this robot can battle
                console.log(`✅ Turn action recorded: Robot deployed (movement action used)`);
                console.log(`🔒 LOCK-IN: Only robot at ${pointId} can battle this turn`);
                
                // Clear first move flag after first deployment
                if (this.isFirstMoveOfGame) {
                    this.isFirstMoveOfGame = false;
                    console.log(`✅ First move completed - future moves will use full MP`);
                }
                
                // Clear smart deployment destinations
                this.smartDeploymentDestinations = null;
                
                // Update debug status display
                if (this.debugMode) {
                    this.showDebugControls();
                }
                
                // DEPLOYMENT ENDS TURN (costs 1 MP - your entire move)
                console.log(`⏹️ Deployment complete - turn ended (deployment = 1 MP)`);
                
                // FINAL VERIFICATION: Check robot data one more time before ending
                console.log(`🔍 FINAL CHECK - Robot data at ${pointId}:`);
                if (this.gameBoard.entryPoints[pointId]) {
                    console.log(`  gameBoard.entryPoints[${pointId}].robot =`, this.gameBoard.entryPoints[pointId].robot);
                } else if (this.gameBoard.routePoints[pointId]) {
                    console.log(`  gameBoard.routePoints[${pointId}].robot =`, this.gameBoard.routePoints[pointId].robot);
                }
                const finalCheck = this.getPointById(pointId);
                console.log(`  getPointById(${pointId}).robot =`, finalCheck?.robot);
                
                // Clear selection - do NOT auto-select for movement
                this.clearSelection();
                
                // Check for surrounded enemies (instant KO!)
                this.checkForSurrounds(deploymentData.teamType);
                
                // LOCK-IN: Clear ALL battle highlights first (important!)
                this.clearAttackableEnemies();
                
                // TAGGING CURE CHECK: Check if adjacent allies need healing
                const taggingHandled = this.checkTaggingCure(pointId, deploymentData.teamType);
                if (taggingHandled) {
                    // Tagging cure handled the turn ending or showed choice modal
                    return;
                }
                
                // Check for adjacent enemies ONLY for PLAYER deployments (not AI)
                let adjacentEnemies = 0;
                if (deploymentData.teamType === 'player' && this.currentState === this.gameStates.PLAYER_TURN) {
                    adjacentEnemies = this.highlightAdjacentEnemies(pointId, deploymentData.teamType);
                } else {
                    // For AI deployments, just count but don't highlight
                    const enemies = this.getAdjacentEnemies(pointId, deploymentData.teamType);
                    adjacentEnemies = enemies.length;
                }
                
                // AUTO-END TURN: If no adjacent enemies to battle, end turn automatically
                if (adjacentEnemies === 0) {
                    console.log('⏩ No adjacent enemies after deployment - auto-ending turn');
                    this.addToHistory('Turn auto-ended (no battles available)', 'info', deploymentData.teamType);
                    setTimeout(() => {
                        this.endPlayerTurn();
                    }, 500); // Small delay for better UX
                } else {
                    // Show message about battle options
                    this.showTurnActionMessage(`Robot deployed! You can battle ${adjacentEnemies} adjacent ${adjacentEnemies === 1 ? 'enemy' : 'enemies'} or end your turn.`);
                }
            },
            
            // Execute smart deployment (deploy to entry, then move to final destination)
            async executeSmartDeployment(deploymentData, entryPointId, finalDestinationId) {
                console.log(`🎯 EXECUTING SMART DEPLOYMENT: ${deploymentData.robotId}`);
                console.log(`   Entry: ${entryPointId} → Final: ${finalDestinationId}`);
                
                // CRITICAL: Check if entry point is occupied by enemy robot
                const entryPointData = this.getPointById(entryPointId);
                if (entryPointData && entryPointData.robot) {
                    console.error(`❌ BLOCKED! Entry point ${entryPointId} is occupied by ${entryPointData.robot.team} robot!`);
                    this.showDeploymentError(`Entry point blocked! Cannot deploy through ${entryPointId}.`);
                    return;
                }
                
                // Check for ghost robots at entry point
                const ghostVisual = document.getElementById(`robot-${entryPointId}`);
                if (ghostVisual) {
                    console.warn(`⚠️ GHOST ROBOT at entry ${entryPointId}! Removing...`);
                    this.removeRobotVisual(entryPointId);
                }
                
                // Step 1: Deploy to entry point (add robot data)
                const robotDataObj = {
                    id: deploymentData.robotId,
                    team: deploymentData.teamType
                };
                
                // Set robot data directly in gameBoard
                if (this.gameBoard.entryPoints[entryPointId]) {
                    this.gameBoard.entryPoints[entryPointId].robot = robotDataObj;
                    console.log(`✅ Robot data set in gameBoard.entryPoints[${entryPointId}]`);
                } else if (this.gameBoard.routePoints[entryPointId]) {
                    this.gameBoard.routePoints[entryPointId].robot = robotDataObj;
                    console.log(`✅ Robot data set in gameBoard.routePoints[${entryPointId}]`);
                }
                
                // Add visual robot at entry point
                this.addRobotVisual(entryPointId, deploymentData.robotId, deploymentData.teamType);
                console.log(`✅ Visual robot added to ${entryPointId}`);
                
                // Wait a moment for visual feedback
                await new Promise(resolve => setTimeout(resolve, 300));
                
                // Step 2: Move from entry to final destination
                console.log(`🚀 Moving from ${entryPointId} to ${finalDestinationId}...`);
                
                // Animate the movement
                await this.moveRobotVisual(entryPointId, finalDestinationId);
                console.log(`✅ Visual moved to ${finalDestinationId}`);
                
                // Update robot data (clear source, set destination)
                if (this.gameBoard.entryPoints[entryPointId]) {
                    this.gameBoard.entryPoints[entryPointId].robot = null;
                } else if (this.gameBoard.routePoints[entryPointId]) {
                    this.gameBoard.routePoints[entryPointId].robot = null;
                }
                
                if (this.gameBoard.entryPoints[finalDestinationId]) {
                    this.gameBoard.entryPoints[finalDestinationId].robot = robotDataObj;
                } else if (this.gameBoard.routePoints[finalDestinationId]) {
                    this.gameBoard.routePoints[finalDestinationId].robot = robotDataObj;
                } else if (this.gameBoard.innerPoints[finalDestinationId]) {
                    this.gameBoard.innerPoints[finalDestinationId].robot = robotDataObj;
                } else if (this.gameBoard.goalPoints[finalDestinationId]) {
                    this.gameBoard.goalPoints[finalDestinationId].robot = robotDataObj;
                }
                
                console.log(`✅ Robot data moved to ${finalDestinationId}`);
                
                // Update status indicators for smart deployed robot at final position
                this.updateRobotStatusIndicators(finalDestinationId, deploymentData.robotId);
                console.log(`🎯 Updated status indicators for smart deployed robot at ${finalDestinationId}`);
                
                // Remove from bench
                if (deploymentData.teamType === 'player') {
                    this.playerBench[deploymentData.benchIndex] = null;
                } else {
                    this.opponentBench[deploymentData.benchIndex] = null;
                }
                
                // ALSO remove from benchSlots structure
                const benchSlots = this.playerZones[deploymentData.teamType].benchSlots;
                const slotIds = Object.keys(benchSlots).sort();
                if (deploymentData.benchIndex < slotIds.length) {
                    const slotId = slotIds[deploymentData.benchIndex];
                    benchSlots[slotId].robotId = null;
                    console.log(`📍 Cleared ${slotId} (smart deployment complete)`);
                }
                
                // Update bench display
                this.updateBenchDisplay();
                
                // Clear deployment selection
                this.selectedRobotForDeployment = null;
                this.smartDeploymentDestinations = null;
                document.querySelectorAll('.bench-robot').forEach(el => el.classList.remove('selected'));
                document.querySelectorAll('.point').forEach(el => {
                    el.classList.remove('valid-deployment', 'valid-move', 'selected');
                });
                
                // Add to history
                const robotData = RobotDatabase.getRobot(deploymentData.robotId);
                const robotName = robotData ? robotData.name : deploymentData.robotId;
                this.addToHistory(`${robotName} deployed to ${finalDestinationId}`, 'deploy', deploymentData.teamType);
                
                // Mark turn action - LOCK-IN to this robot only
                this.turnActions.hasMovedRobot = true;
                this.turnActions.actionTakenThisTurn = true;
                this.turnActions.lastMovedRobotPoint = finalDestinationId; // LOCK-IN: Only this robot can battle
                console.log(`✅ Smart deployment complete!`);
                console.log(`🔒 LOCK-IN: Only robot at ${finalDestinationId} can battle this turn`);
                
                // Clear first move flag after first deployment
                if (this.isFirstMoveOfGame) {
                    this.isFirstMoveOfGame = false;
                    console.log(`✅ First move completed - future moves will use full MP`);
                }
                
                // Check for surrounded enemies (instant KO!)
                this.checkForSurrounds(deploymentData.teamType);
                
                // CRITICAL: Check for win conditions immediately after deployment
                if (this.checkWinConditions(deploymentData.teamType)) {
                    console.log(`🏆 Win condition met after deployment!`);
                    return; // Stop processing, game is over
                }
                
                // LOCK-IN: Clear ALL battle highlights first (important!)
                this.clearAttackableEnemies();
                
                // TAGGING CURE CHECK: Check if adjacent allies need healing
                const taggingHandled = this.checkTaggingCure(finalDestinationId, deploymentData.teamType);
                if (taggingHandled) {
                    // Tagging cure handled the turn ending or showed choice modal
                    return;
                }
                
                // Check for adjacent enemies ONLY for PLAYER deployments (not AI)
                let adjacentEnemies = 0;
                if (deploymentData.teamType === 'player' && this.currentState === this.gameStates.PLAYER_TURN) {
                    adjacentEnemies = this.highlightAdjacentEnemies(finalDestinationId, deploymentData.teamType);
                } else {
                    // For AI deployments, just count but don't highlight
                    const enemies = this.getAdjacentEnemies(finalDestinationId, deploymentData.teamType);
                    adjacentEnemies = enemies.length;
                }
                
                // AUTO-END TURN: If no adjacent enemies to battle, end turn automatically
                if (adjacentEnemies === 0) {
                    console.log('⏩ No adjacent enemies after smart deployment - auto-ending turn');
                    if (!this.freeMovementMode) {
                        this.addToHistory('Turn auto-ended (no battles available)', 'info', deploymentData.teamType);
                        setTimeout(() => {
                            this.endPlayerTurn();
                        }, 500);
                    }
                } else {
                    this.showTurnActionMessage(`Robot deployed! You can battle ${adjacentEnemies} adjacent ${adjacentEnemies === 1 ? 'enemy' : 'enemies'} or end your turn.`);
                }
            },
            
            // Show deployment error message
            showDeploymentError(message) {
                // Create error overlay
                const errorDiv = document.createElement('div');
                errorDiv.style.position = 'fixed';
                errorDiv.style.top = '50%';
                errorDiv.style.left = '50%';
                errorDiv.style.transform = 'translate(-50%, -50%)';
                errorDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.95)';
                errorDiv.style.color = 'white';
                errorDiv.style.padding = '20px 40px';
                errorDiv.style.borderRadius = '10px';
                errorDiv.style.fontSize = '18px';
                errorDiv.style.fontWeight = 'bold';
                errorDiv.style.zIndex = '10000';
                errorDiv.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.8)';
                errorDiv.textContent = `⚠️ ${message}`;
                
                document.body.appendChild(errorDiv);
                
                // Remove after 2 seconds
                setTimeout(() => {
                    errorDiv.remove();
                }, 2000);
            },
            
            // Show turn action message (info/warning)
            showTurnActionMessage(message) {
                // Add to battle log instead of showing pop-up
                this.addToHistory(`ℹ️ ${message}`, 'info');
            },

            // Clear current selection
            // Clear attackable enemy highlights
            clearAttackableEnemies() {
                document.querySelectorAll('.attackable-enemy').forEach(robotGroup => {
                    const circle = robotGroup.querySelector('circle');
                    if (circle) {
                        // Get the team to restore correct color
                        const team = robotGroup.classList.contains('player-robot') ? 'player' : 'opponent';
                        const teamColor = team === 'player' ? '#28a745' : '#dc3545';
                        
                        // Reset to normal appearance
                        circle.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))';
                        circle.setAttribute('stroke', '#fff');
                        circle.setAttribute('stroke-width', '6');
                    }
                    robotGroup.classList.remove('attackable-enemy');
                });
                console.log('🧹 Cleared attackable enemy highlights');
            },
            
            clearSelection() {
                this.selectedRobotForDeployment = null;
                this.selectedRobotForMovement = null;
                
                // Clear visual feedback
                document.querySelectorAll('.bench-robot').forEach(el => el.classList.remove('selected'));
                document.querySelectorAll('.point').forEach(el => {
                    el.classList.remove('valid-deployment', 'selected', 'valid-move');
                    el.style.cursor = ''; // Clear cursor
                });
                
                // Clear movable space images
                document.querySelectorAll('.movable-space-image').forEach(img => {
                    img.classList.remove('active');
                });
                
                // Clear entry space image highlights
                document.querySelectorAll('.entry-space-image').forEach(img => {
                    img.classList.remove('valid-deployment');
                });
                
                // Clear goal space image highlights
                document.querySelectorAll('.goal-space-image').forEach(img => {
                    img.classList.remove('valid-goal');
                });
                
                // Clear robot selection highlights (but NOT attackable-enemy highlights!)
                document.querySelectorAll('.battle-robot').forEach(robotGroup => {
                    // Skip if this is an attackable enemy - don't clear its highlight!
                    if (robotGroup.classList.contains('attackable-enemy')) {
                        return; // Keep the red glow on attackable enemies
                    }
                    
                    const circle = robotGroup.querySelector('circle');
                    if (circle) {
                        // Reset to normal size and shadow (DOUBLED SIZE)
                        circle.setAttribute('r', '50'); // DOUBLED from 25
                        circle.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))';
                        circle.setAttribute('stroke', '#fff'); // White border
                        circle.setAttribute('stroke-width', '6');
                    }
                });
                
                console.log('🧹 Selection cleared (kept attackable enemy highlights)');
            },

            // Select robot for movement
            selectRobotForMovement(pointId) {
                console.log(`🔍 Attempting to select robot at ${pointId}`);
                console.log(`📊 Turn Actions State:`, this.turnActions);
                
                // FREE MOVEMENT MODE: Skip all restrictions!
                if (!this.freeMovementMode) {
                    // Check if robot has already been moved this turn
                    if (this.turnActions.hasMovedRobot) {
                        console.log('⚠️ Cannot select robot - already moved/deployed a robot this turn!');
                        this.showTurnActionMessage('You can only move ONE robot per turn! End your turn to continue.');
                        return;
                    }
                }
                
                const pointData = this.getPointById(pointId);
                if (!pointData || !pointData.robot) {
                    console.log('❌ No robot at this point');
                    return;
                }
                
                const robotId = pointData.robot.id;
                const robotData = RobotDatabase.getRobot(robotId);
                
                // FREE MOVEMENT MODE: Skip status checks
                if (!this.freeMovementMode) {
                    // STATUS EFFECT CHECK: Only 'waiting' blocks movement (Repair Bay cooldown)
                    const statuses = this.getRobotStatuses(robotId);
                    if (statuses.markers.includes('waiting')) {
                        console.log(`⏳ Cannot move ${robotData?.name || robotId} - Waiting status (Repair Bay cooldown)!`);
                        this.showTurnActionMessage(`${robotData?.name || robotId} cannot move due to Waiting status (Repair Bay cooldown)!`);
                        this.addToHistory(`⏳ ${robotData?.name || robotId} cannot move (Waiting)`, 'info', pointData.robot.team);
                        return;
                    }
                }

                // FREE MOVEMENT MODE: Allow selecting ANY robot regardless of team
                if (!this.freeMovementMode) {
                    // In debug mode, allow controlling current team
                    if (this.debugMode) {
                        if (pointData.robot.team !== this.currentControlTeam) {
                            console.log(`❌ Currently controlling ${this.currentControlTeam} team. Switch teams to move this robot.`);
                            return;
                        }
                    } else {
                        // Normal mode: only allow player to move their own robots
                        if (pointData.robot.team !== 'player') {
                            console.log('❌ Can only move your own robots');
                            return;
                        }
                    }
                }

                console.log(`🎯 Selected robot ${pointData.robot.id} for movement from ${pointId}`);
                
                // Clear previous selection AND attackable enemies
                this.clearSelection();
                this.clearAttackableEnemies();
                
                // Set new selection
                this.selectedRobotForMovement = {
                    pointId: pointId,
                    robotId: pointData.robot.id,
                    team: pointData.robot.team
                };
                
                // Visual feedback for selected robot - make it glow!
                const robotGroup = document.getElementById(`robot-${pointId}`);
                if (robotGroup) {
                    const circle = robotGroup.querySelector('circle');
                    if (circle) {
                        // Make it bigger and add golden glow (DOUBLED SIZE)
                        circle.setAttribute('r', '60'); // DOUBLED from 30
                        circle.style.filter = 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.9))';
                        circle.setAttribute('stroke', '#ffd700'); // Gold border
                        circle.setAttribute('stroke-width', '8'); // Thicker
                    }
                }
                
                // Highlight valid movement points
                this.highlightValidMovementPoints(pointId);
                
                // TRIGGER 2: Highlight adjacent enemies when robot is selected
                const adjacentEnemies = this.highlightAdjacentEnemies(pointId, pointData.robot.team);
                if (adjacentEnemies > 0) {
                    console.log(`⚔️ ${adjacentEnemies} adjacent ${adjacentEnemies === 1 ? 'enemy' : 'enemies'} available for battle!`);
                }
            },

            // Highlight valid movement points based on MP
            highlightValidMovementPoints(fromPointId) {
                // Clear previous highlights
                document.querySelectorAll('.point').forEach(el => el.classList.remove('valid-move'));
                document.querySelectorAll('.movable-space-image').forEach(img => img.classList.remove('active'));
                
                const pointData = this.getPointById(fromPointId);
                if (!pointData || !pointData.robot) return;
                
                let validMoves = [];
                
                // FREE MOVEMENT MODE: Highlight ALL empty spaces!
                if (this.freeMovementMode) {
                    console.log(`🚀 FREE MOVEMENT MODE: Showing ALL empty spaces!`);
                    
                    // Get all points from all categories
                    const allPoints = {
                        ...this.gameBoard.routePoints,
                        ...this.gameBoard.innerPoints,
                        ...this.gameBoard.entryPoints,
                        ...this.gameBoard.goalPoints
                    };
                    
                    // Add all empty points (not occupied and not the current position)
                    Object.keys(allPoints).forEach(pointId => {
                        const point = allPoints[pointId];
                        if (!point.robot && pointId !== fromPointId) {
                            validMoves.push(pointId);
                        }
                    });
                } else {
                    // Normal mode: Use MP-based movement
                    const robot = RobotDatabase.getRobot(pointData.robot.id);
                    if (!robot) return;
                    
                    let maxMP = robot.mp || 1;
                    
                    // FIRST MOVE PENALTY: First move of game has -1 MP
                    if (this.isFirstMoveOfGame) {
                        maxMP = Math.max(0, maxMP - 1);
                        console.log(`⚠️ FIRST MOVE PENALTY: ${robot.name} MP reduced from ${robot.mp} to ${maxMP}`);
                    }
                    
                    console.log(`🎯 Robot ${robot.name} has ${maxMP} MP - calculating valid moves...`);
                    
                    // Use BFS to find all points within MP range
                    validMoves = this.calculateValidMovesWithinMP(fromPointId, maxMP);
                }
                
                // CRITICAL: Store validMoves for validation in handlePointClick
                this.validMoves = validMoves;
                
                // Highlight all valid destination points
                validMoves.forEach(pointId => {
                    const pointEl = document.getElementById(pointId);
                    if (pointEl) {
                        pointEl.classList.add('valid-move');
                        
                        // Show movable space image for standard points only
                        if (pointEl.classList.contains('standard-point')) {
                            const movableImage = document.querySelector(`.movable-space-image[data-point="${pointId}"]`);
                            if (movableImage) {
                                movableImage.classList.add('active');
                            }
                        }
                    }
                });
                
                console.log(`🎯 Highlighted ${validMoves.length} valid moves from ${fromPointId}`);
            },
            
            // Calculate all valid moves within MP range using PROPER STEP COUNTING
            // Rule: MP = number of steps along routes. Cannot move through occupied points.
            // Starting point (where robot is) = distance 0
            // Adjacent points = distance 1 (costs 1 MP to reach)
            // Points 2 steps away = distance 2 (costs 2 MP to reach)
            calculateValidMovesWithinMP(startPointId, maxMP) {
                const validMoves = [];
                const visited = new Map(); // pointId -> {distance, path}
                const queue = [{ pointId: startPointId, distance: 0, path: [startPointId] }];
                
                visited.set(startPointId, { distance: 0, path: [startPointId] });
                this.validMovePaths.clear(); // Clear previous paths
                
                console.log(`🔍 BFS starting from ${startPointId} with ${maxMP} MP`);
                
                while (queue.length > 0) {
                    const { pointId, distance, path } = queue.shift();
                    
                    // Don't explore beyond MP range
                    if (distance >= maxMP) {
                        console.log(`⏹️ Stopping at ${pointId} (distance ${distance} >= maxMP ${maxMP})`);
                        continue;
                    }
                    
                    const pointData = this.getPointById(pointId);
                    if (!pointData || !pointData.connections) continue;
                    
                    console.log(`🔎 Exploring from ${pointId} (distance ${distance}), connections:`, pointData.connections);
                    
                    // Check all connected points
                    pointData.connections.forEach(connectedPointId => {
                        const connectedPoint = this.getPointById(connectedPointId);
                        if (!connectedPoint) return;
                        
                        const newDistance = distance + 1;
                        const newPath = [...path, connectedPointId];
                        
                        // Skip if we've already visited this point with a shorter path
                        if (visited.has(connectedPointId) && visited.get(connectedPointId).distance <= newDistance) {
                            console.log(`⏭️ Skipping ${connectedPointId} (already visited at distance ${visited.get(connectedPointId).distance})`);
                            return;
                        }
                        
                        // BLOCKING RULE: Cannot move through occupied points
                        if (connectedPoint.robot) {
                            console.log(`🚫 ${connectedPointId} is occupied by ${connectedPoint.robot.id}`);
                            return;
                        }
                        
                        // Point is empty and reachable
                        visited.set(connectedPointId, { distance: newDistance, path: newPath });
                        validMoves.push(connectedPointId);
                        
                        // Store the path to this destination
                        this.validMovePaths.set(connectedPointId, newPath);
                        
                        console.log(`✅ ${connectedPointId} is reachable at distance ${newDistance}, path:`, newPath);
                        
                        // Continue searching from this point (if we have MP left)
                        if (newDistance < maxMP) {
                            queue.push({ 
                                pointId: connectedPointId, 
                                distance: newDistance,
                                path: newPath
                            });
                        }
                    });
                }
                
                console.log(`🎯 Found ${validMoves.length} valid moves within ${maxMP} steps from ${startPointId}`);
                
                return validMoves;
            },

            // Move robot to a point (async to wait for animation)
            async moveRobotToPoint(movementData, toPointId) {
                // CRITICAL: Prevent multiple simultaneous movements
                if (this.isMovementInProgress) {
                    console.warn('⚠️ Movement already in progress - ignoring duplicate call');
                    return;
                }
                this.isMovementInProgress = true;
                
                const fromPointId = movementData.pointId;
                const fromPointData = this.getPointById(fromPointId);
                
                if (!fromPointData || !fromPointData.robot) {
                    console.error('❌ No robot at source point');
                    this.isMovementInProgress = false;
                    return;
                }
                
                const toPointData = this.getPointById(toPointId);
                if (!toPointData) {
                    console.error('❌ Invalid destination point');
                    this.isMovementInProgress = false;
                    return;
                }
                
                // CRITICAL: Validate destination is in validMoves array (prevents invalid movement)
                if (!this.validMoves || !this.validMoves.includes(toPointId)) {
                    console.error(`❌ Invalid move: ${toPointId} is not in validMoves array`);
                    console.error(`   Valid destinations:`, this.validMoves);
                    console.error(`   Attempted destination: ${toPointId}`);
                    this.isMovementInProgress = false;
                    return;
                }
                
                // Wrap everything in try-finally to ensure flag is always cleared
                try {
                    console.log(`🚀 Moving robot from ${fromPointId} to ${toPointId}`);
                    
                    // Animate movement
                    await this.moveRobotVisual(fromPointId, toPointId);
                    
                    // Update data structures
                    const robotState = fromPointData.robot;
                    fromPointData.robot = null;
                    toPointData.robot = robotState;
                    
                    // Update DOM
                    this.clearPoint(fromPointId);
                    this.occupyPoint(toPointId, robotState.id, robotState.team);
                    this.updateRobotStatusIndicators(toPointId, robotState.id);
                    
                    // Mark that robot has moved this turn
                    this.turnActions.hasMovedRobot = true;
                    this.turnActions.actionTakenThisTurn = true;
                    this.turnActions.lastMovedRobotPoint = toPointId;
                    
                    // Check for surrounds
                    this.checkForSurrounds(movementData.team);
                    
                    // CRITICAL: Check for win conditions immediately after movement
                    if (this.checkWinConditions(movementData.team)) {
                        console.log(`🏆 Win condition met after movement!`);
                        return; // Stop processing, game is over
                    }
                    
                    // Clear selection
                    this.clearSelection();
                    
                    // Check for Tagging cure opportunities
                    this.checkTaggingCure(toPointId, movementData.team);
                    
                    // Highlight adjacent enemies
                    const adjacentEnemies = this.highlightAdjacentEnemies(toPointId, movementData.team);

                    // AUTO-END TURN: If no adjacent enemies to battle, end turn automatically
                    if (adjacentEnemies === 0) {
                        console.log('⏩ No adjacent enemies after movement - auto-ending turn');
                        if (!this.freeMovementMode) {
                            this.addToHistory('Turn auto-ended (no battles available)', 'info', movementData.team);
                            setTimeout(() => {
                                this.endPlayerTurn();
                            }, 500);
                        }
                    } else {
                        this.showTurnActionMessage(`Robot moved! You can battle ${adjacentEnemies} adjacent ${adjacentEnemies === 1 ? 'enemy' : 'enemies'} or end your turn.`);
                    }
                } finally {
                    // ALWAYS clear the movement lock, even if an error occurred
                    this.isMovementInProgress = false;
                }
            },

            async moveRobotForAI(fromPointId, toPointId) {
                if (this.isMovementInProgress) {
                    console.warn('🤖 AI attempted to move while another movement is in progress.');
                    return false;
                }

                const fromPointData = this.getPointById(fromPointId);
                const toPointData = this.getPointById(toPointId);

                if (!fromPointData || !fromPointData.robot) {
                    console.warn(`🤖 AI move cancelled - no robot at ${fromPointId}`);
                    return false;
                }

                if (!toPointData) {
                    console.warn(`🤖 AI move cancelled - destination ${toPointId} not found.`);
                    return false;
                }

                if (toPointData.robot) {
                    console.warn(`🤖 AI move cancelled - destination ${toPointId} already occupied.`);
                    return false;
                }

                const robotState = fromPointData.robot;
                const definition = this.getRobotDefinition(robotState.id);
                const mp = robotState.mp ?? definition?.mp ?? 0;

                const reachable = this.calculateValidMovesWithinMP(fromPointId, mp);
                if (!reachable.includes(toPointId)) {
                    console.warn(`🤖 AI move cancelled - ${toPointId} not within ${mp} MP of ${fromPointId}.`);
                    return false;
                }

                this.isMovementInProgress = true;

                await this.moveRobotVisual(fromPointId, toPointId);

                // Clear source point data
                if (this.gameBoard.entryPoints[fromPointId]) {
                    this.gameBoard.entryPoints[fromPointId].robot = null;
                } else if (this.gameBoard.routePoints[fromPointId]) {
                    this.gameBoard.routePoints[fromPointId].robot = null;
                } else if (this.gameBoard.innerPoints[fromPointId]) {
                    this.gameBoard.innerPoints[fromPointId].robot = null;
                } else if (this.gameBoard.goalPoints[fromPointId]) {
                    this.gameBoard.goalPoints[fromPointId].robot = null;
                }

                // Assign robot to destination
                if (this.gameBoard.entryPoints[toPointId]) {
                    this.gameBoard.entryPoints[toPointId].robot = robotState;
                } else if (this.gameBoard.routePoints[toPointId]) {
                    this.gameBoard.routePoints[toPointId].robot = robotState;
                } else if (this.gameBoard.innerPoints[toPointId]) {
                    this.gameBoard.innerPoints[toPointId].robot = robotState;
                } else if (this.gameBoard.goalPoints[toPointId]) {
                    this.gameBoard.goalPoints[toPointId].robot = robotState;
                }

                // Update DOM attributes
                this.clearPoint(fromPointId);
                this.occupyPoint(toPointId, robotState.id, robotState.team);

                this.updateRobotStatusIndicators(toPointId, robotState.id);

                this.isMovementInProgress = false;
                return true;
            },

            finishAITurn() {
                console.log('✅ AI turn complete');
                this.setState(this.gameStates.PLAYER_TURN);
            },
            
            // ==========================================
            // SURROUNDING MECHANIC
            // ==========================================
            
            // Check if any enemy robots are surrounded and knock them out
            checkForSurrounds(attackerTeam) {
                const enemyTeam = attackerTeam === 'player' ? 'opponent' : 'player';
                const surroundedEnemies = [];
                
                console.log(`\n🔍 === CHECKING FOR SURROUNDS (after ${attackerTeam} move) ===`);
                
                // Get all points on the board
                const allPoints = {
                    ...this.gameBoard.routePoints,
                    ...this.gameBoard.innerPoints,
                    ...this.gameBoard.entryPoints,
                    ...this.gameBoard.goalPoints
                };
                
                // Check each enemy robot
                Object.entries(allPoints).forEach(([pointId, pointData]) => {
                    if (pointData.robot && pointData.robot.team === enemyTeam) {
                        // Get all connections for this point
                        const connections = pointData.connections || [];
                        
                        // Check if ALL adjacent spaces are occupied by attacker's team
                        const allAdjacentOccupied = connections.length > 0 && connections.every(connectedId => {
                            const connectedPoint = this.getPointById(connectedId);
                            return connectedPoint?.robot && connectedPoint.robot.team === attackerTeam;
                        });
                        
                        if (allAdjacentOccupied) {
                            surroundedEnemies.push({ pointId, robot: pointData.robot });
                        }
                    }
                });
                
                // Remove surrounded enemies
                if (surroundedEnemies.length > 0) {
                    console.log(`💥 SURROUNDED! Removing ${surroundedEnemies.length} enemy robot(s):`);
                    surroundedEnemies.forEach(({ pointId, robot }) => {
                        const robotData = RobotDatabase.getRobot(robot.id);
                        console.log(`   - ${robotData?.name || robot.id} at ${pointId}`);
                        this.addToHistory(`${robotData?.name || robot.id} SURROUNDED at ${pointId}! Instant KO!`, 'battle', enemyTeam);
                        this.knockOutRobot(pointId);  // Fixed: was removeRobotFromPoint
                    });
                } else {
                    console.log(`✅ No enemies surrounded this turn`);
                }
            },
            
            // Initiate battle between two robots
            initiateBattle(attackerPointId, defenderPointId) {
                // Check if battle has already been initiated this turn
                if (this.turnActions.hasBattled) {
                    console.log('⚠️ Cannot battle - already battled this turn!');
                    this.showTurnActionMessage('You can only initiate ONE battle per turn!');
                    return;
                }
                
                // LOCK-IN CHECK: If a robot has moved, only that robot can battle
                if (this.turnActions.lastMovedRobotPoint && this.turnActions.lastMovedRobotPoint !== attackerPointId) {
                    console.log(`🔒 LOCK-IN ENFORCED: Cannot battle with robot at ${attackerPointId}`);
                    console.log(`   Only robot at ${this.turnActions.lastMovedRobotPoint} (the one that moved) can battle this turn`);
                    this.showTurnActionMessage(`You can only battle with the robot you just moved! (at ${this.turnActions.lastMovedRobotPoint})`);
                    return;
                }
                
                const attackerPoint = this.getPointById(attackerPointId);
                const defenderPoint = this.getPointById(defenderPointId);
                
                if (!attackerPoint?.robot || !defenderPoint?.robot) {
                    console.error('❌ Invalid battle participants');
                    return;
                }
                
                // STATUS EFFECT CHECK: Prevent battle initiation if attacker has action-blocking status
                const attackerStatuses = this.getRobotStatuses(attackerPoint.robot.id);
                const actionBlockers = ['sleep', 'frozen', 'waiting'];
                const blockingStatus = actionBlockers.find(s => 
                    attackerStatuses.conditions.includes(s) || attackerStatuses.markers.includes(s)
                );
                
                if (blockingStatus) {
                    const attackerRobotTemp = RobotDatabase.getRobot(attackerPoint.robot.id);
                    const statusNames = {
                        'sleep': '💤 Sleep',
                        'frozen': '🧊 Frozen',
                        'waiting': '⏳ Waiting'
                    };
                    const displayName = statusNames[blockingStatus] || blockingStatus;
                    console.log(`❌ Cannot initiate battle - ${attackerRobotTemp?.name} is affected by ${displayName}!`);
                    this.showTurnActionMessage(`${attackerRobotTemp?.name} cannot initiate battle due to ${displayName} status!`);
                    this.addToHistory(`❌ ${attackerRobotTemp?.name} cannot battle (${displayName})`, 'info', attackerPoint.robot.team);
                    return;
                }
                
                const attackerRobot = RobotDatabase.getRobot(attackerPoint.robot.id);
                const defenderRobot = RobotDatabase.getRobot(defenderPoint.robot.id);
                
                if (!attackerRobot || !defenderRobot) {
                    console.error('❌ Robot data not found');
                    return;
                }
                
                console.log(`⚔️ Initiating battle: ${attackerRobot.name} vs ${defenderRobot.name}`);
                
                // Add to battle history with positions
                const attackerTeam = attackerPoint.robot.team;
                this.addToHistory(`⚔️ ${attackerRobot.name} (${attackerPointId}) attacks ${defenderRobot.name} (${defenderPointId})`, 'battle', attackerTeam);
                
                // Mark that battle has been initiated this turn
                this.turnActions.hasBattled = true;
                this.turnActions.actionTakenThisTurn = true;
                console.log(`✅ Turn action recorded: Battle initiated (battle action used)`);
                
                // Update debug status display
                if (this.debugMode) {
                    this.showDebugControls();
                }
                
                // Store battle data
                this.currentBattle = {
                    attackerPointId: attackerPointId,
                    defenderPointId: defenderPointId,
                    attackerRobot: attackerRobot,
                    defenderRobot: defenderRobot,
                    attackerRobotInstanceId: attackerPoint.robot.id, // Instance ID for status effects
                    defenderRobotInstanceId: defenderPoint.robot.id, // Instance ID for status effects
                    attackerTeam: attackerPoint.robot.team,
                    defenderTeam: defenderPoint.robot.team
                };
                
                // Show battle modal
                this.showBattleModal();
            },
            
            // Show battle modal with robot info
            showBattleModal() {
                if (!this.currentBattle) return;
                
                const { attackerRobot, defenderRobot, attackerTeam, defenderTeam, attackerPointId, defenderPointId } = this.currentBattle;
                
                // Get status effects for both robots
                const attackerStatuses = this.getRobotStatuses(this.getPointById(attackerPointId)?.robot?.id);
                const defenderStatuses = this.getRobotStatuses(this.getPointById(defenderPointId)?.robot?.id);
                
                // Build status effect HTML helper function
                const buildStatusHTML = (statuses) => {
                    if (statuses.conditions.length === 0 && statuses.markers.length === 0) {
                        return '';
                    }
                    const allStatuses = [...statuses.conditions, ...statuses.markers];
                    return allStatuses.map(s => {
                        const def = this.statusEffectDefinitions[s];
                        return def ? `<span style="font-size: 10px; padding: 2px 4px; background: ${def.color}; border-radius: 3px; margin-left: 4px;">${def.icon}</span>` : '';
                    }).join('');
                };
                
                // Update modal content
                document.getElementById('battlePlayerImage').src = attackerRobot.image;
                document.getElementById('battlePlayerName').innerHTML = `${attackerRobot.name}${buildStatusHTML(attackerStatuses)}`;
                document.getElementById('battlePlayerRole').textContent = `${attackerRobot.role} • ${attackerRobot.mp} MP`;
                
                document.getElementById('battleOpponentImage').src = defenderRobot.image;
                document.getElementById('battleOpponentName').innerHTML = `${defenderRobot.name}${buildStatusHTML(defenderStatuses)}`;
                document.getElementById('battleOpponentRole').textContent = `${defenderRobot.role} • ${defenderRobot.mp} MP`;
                
                // Hide combatants, show wheels with move lists immediately
                document.querySelector('.battle-combatants').style.display = 'none';
                document.getElementById('battleWheels').style.display = 'flex';
                document.getElementById('battleResult').classList.remove('active');
                
                // Set wheel labels
                const attackerLabel = attackerTeam === 'player' ? 'PLAYER' : 'OPPONENT';
                const defenderLabel = defenderTeam === 'player' ? 'PLAYER' : 'OPPONENT';
                
                document.getElementById('attackerWheelLabel').textContent = `${attackerLabel} - ${attackerRobot.name}`;
                document.getElementById('defenderWheelLabel').textContent = `${defenderLabel} - ${defenderRobot.name}`;
                
                // Build wheels and detailed move lists with status effects
                const attackerRobotId = this.getPointById(attackerPointId)?.robot?.id;
                const defenderRobotId = this.getPointById(defenderPointId)?.robot?.id;
                
                this.buildWheelVisual('attackerWheelSegments', attackerRobot.wheel);
                this.buildWheelVisual('defenderWheelSegments', defenderRobot.wheel);
                this.buildBattleMovesList('attackerMovesList', attackerRobot.wheel, attackerRobotId);
                this.buildBattleMovesList('defenderMovesList', defenderRobot.wheel, defenderRobotId);
                
                // Restore action buttons (without Info button)
                const buttonsContainer = document.querySelector('.battle-action-buttons');
                buttonsContainer.innerHTML = `
                    <button class="battle-action-btn attack" onclick="GameBoard.executeBattle()">
                        ⚔️ Attack!
                    </button>
                    <button class="battle-action-btn cancel" onclick="GameBoard.cancelBattle()">
                        ↩️ Cancel
                    </button>
                `;
                buttonsContainer.style.display = 'flex';
                
                // Reset wheel results (hide them since we show move lists instead)
                const attackerResult = document.getElementById('attackerWheelResult');
                const defenderResult = document.getElementById('defenderWheelResult');
                
                attackerResult.style.display = 'none';
                defenderResult.style.display = 'none';
                
                attackerResult.querySelector('.move-name').textContent = 'Spinning...';
                attackerResult.querySelector('.move-power').textContent = '';
                attackerResult.classList.remove('revealed');
                attackerResult.style.color = '#fff';
                
                defenderResult.querySelector('.move-name').textContent = 'Spinning...';
                defenderResult.querySelector('.move-power').textContent = '';
                defenderResult.classList.remove('revealed');
                defenderResult.style.color = '#fff';
                
                // Reset wheel rotations
                const attackerWheelSegments = document.getElementById('attackerWheelSegments');
                const defenderWheelSegments = document.getElementById('defenderWheelSegments');
                if (attackerWheelSegments) {
                    attackerWheelSegments.style.transform = 'rotate(0deg)';
                    attackerWheelSegments.style.transition = 'none';
                }
                if (defenderWheelSegments) {
                    defenderWheelSegments.style.transform = 'rotate(0deg)';
                    defenderWheelSegments.style.transition = 'none';
                }
                
                // Show overlay
                document.getElementById('battleOverlay').classList.add('active');
                
                // Populate debugger with battle data
                this.populateDebugger(attackerRobot, defenderRobot, attackerTeam, defenderTeam);
                
                console.log('🎮 Battle modal displayed with move lists');
            },
            
            // ==========================================
            // STATUS EFFECT BATTLE INTEGRATION
            // ==========================================
            
            // Apply status effects to a wheel spin result
            applyStatusEffectsToBattleSpin(robotId, spinResult, role = 'attacker', opponentRobotId = null) {
                if (!spinResult) return spinResult;
                
                let modifiedSpin = { ...spinResult };
                
                // Strip instance ID suffixes to get base robot ID for database lookup
                const baseRobotId = robotId.replace(/-opp$/, '').replace(/-c-\d+$/, '').replace(/-uc-\d+$/, '').replace(/-r-\d+$/, '').replace(/-ex-\d+$/, '');
                const robotData = RobotDatabase.getRobot(baseRobotId);
                const originalDamage = spinResult.damage || 0;
                
                console.log(`\n🔧 Applying status effects to ${robotData?.name || robotId} (${role}):`);
                console.log(`   Instance ID: ${robotId}`);
                console.log(`   Status effects:`, this.robotStatusEffects[robotId]);
                console.log(`   Has poison?`, this.hasStatusEffect(robotId, 'poison'));
                console.log(`   Original: ${spinResult.moveName} (${spinResult.moveType}) - ${originalDamage} damage`);
                
                // 1. CONFUSION: Shift result one segment clockwise
                if (this.hasStatusEffect(robotId, 'confusion')) {
                    console.log(`😵 ${robotData?.name || robotId} is Confused - shifting result clockwise`);
                    modifiedSpin = this.shiftSpinResultClockwise(robotId, modifiedSpin);
                }
                
                // 2. FROZEN: All attacks become Miss (cannot take actions)
                if (this.hasStatusEffect(robotId, 'frozen')) {
                    const frozenMoveType = modifiedSpin.moveType ? modifiedSpin.moveType.toLowerCase() : '';
                    if (frozenMoveType === 'white' || frozenMoveType === 'gold') {
                        console.log(`🧊 ${robotData?.name || robotId} is Frozen - attack becomes Miss!`);
                        modifiedSpin = {
                            ...modifiedSpin,
                            moveType: 'blue',
                            moveName: 'Miss (Frozen)',
                            damage: 0
                        };
                    }
                    // Thaw after battle (only when defending/being attacked)
                    if (role === 'defender') {
                        this.removeStatusEffect(robotId, 'frozen');
                        console.log(`🌊 ${robotData?.name || robotId} thawed from Frozen!`);
                    }
                }
                
                // 3. SLEEP: Wake up when attacked (but doesn't affect current battle outcome)
                if (role === 'defender' && this.hasStatusEffect(robotId, 'sleep')) {
                    this.removeStatusEffect(robotId, 'sleep');
                    console.log(`💤 ${robotData?.name || robotId} woke up from Sleep!`);
                }
                
                // 4. PARALYSIS & BURN: Convert smallest attack to Miss
                if (this.hasStatusEffect(robotId, 'paralysis') || this.hasStatusEffect(robotId, 'burn')) {
                    const statusName = this.hasStatusEffect(robotId, 'paralysis') ? 'Paralysis' : 'Burn';
                    const icon = this.hasStatusEffect(robotId, 'paralysis') ? '⚡' : '🔥';
                    
                    if (this.isSmallestAttackSegment(robotId, modifiedSpin)) {
                        console.log(`${icon} ${robotData?.name || robotId} has ${statusName} - smallest attack becomes Miss!`);
                        modifiedSpin = {
                            ...modifiedSpin,
                            moveType: 'blue',
                            moveName: `Miss (${statusName})`,
                            damage: 0
                        };
                    }
                }
                
                // 5. POISON, NOXIOUS, BURN: Reduce damage on White/Gold attacks
                console.log(`   🔍 Checking damage reduction: moveType=${modifiedSpin.moveType}, damage=${modifiedSpin.damage}`);
                const moveTypeLower = modifiedSpin.moveType ? modifiedSpin.moveType.toLowerCase() : '';
                if (moveTypeLower === 'white' || moveTypeLower === 'gold') {
                    let damageReduction = 0;
                    const reductions = [];
                    
                    console.log(`   🔍 White/Gold attack detected, checking status effects...`);
                    if (this.hasStatusEffect(robotId, 'poison')) {
                        damageReduction += 20;
                        reductions.push('Poison -20');
                        console.log(`   🧪 Poison detected! damageReduction now: ${damageReduction}`);
                    }
                    if (this.hasStatusEffect(robotId, 'noxious')) {
                        damageReduction += 40;
                        reductions.push('Noxious -40');
                        console.log(`   ☠️ Noxious detected! damageReduction now: ${damageReduction}`);
                    }
                    if (this.hasStatusEffect(robotId, 'burn')) {
                        damageReduction += 10;
                        reductions.push('Burn -10');
                        console.log(`   🔥 Burn detected! damageReduction now: ${damageReduction}`);
                    }
                    
                    console.log(`   📊 Final damageReduction: ${damageReduction}, modifiedSpin.damage: ${modifiedSpin.damage}`);
                    console.log(`   📊 Condition check: damageReduction > 0? ${damageReduction > 0}, modifiedSpin.damage > 0? ${modifiedSpin.damage > 0}`);
                    
                    if (damageReduction > 0 && modifiedSpin.damage > 0) {
                        const originalDamage = modifiedSpin.damage;
                        modifiedSpin.damage = Math.max(0, modifiedSpin.damage - damageReduction);
                        console.log(`🧪 ${robotData?.name || robotId} damage reduced: ${originalDamage} → ${modifiedSpin.damage} (${reductions.join(', ')})`);
                    } else {
                        console.log(`   ⚠️ Damage reduction NOT applied: damageReduction=${damageReduction}, damage=${modifiedSpin.damage}`);
                    }
                }
                
                const finalDamage = modifiedSpin.damage || 0;
                if (finalDamage !== originalDamage) {
                    console.log(`   ✅ MODIFIED: ${modifiedSpin.moveName} (${modifiedSpin.moveType}) - ${finalDamage} damage (was ${originalDamage})`);
                } else {
                    console.log(`   ✅ NO CHANGE: ${modifiedSpin.moveName} (${modifiedSpin.moveType}) - ${finalDamage} damage`);
                }
                
                return modifiedSpin;
            },
            
            // Shift a spin result one segment clockwise (for Confusion)
            shiftSpinResultClockwise(robotId, spinResult) {
                // Strip instance ID suffixes to get base robot ID
                const baseRobotId = robotId.replace(/-opp$/, '').replace(/-c-\d+$/, '').replace(/-uc-\d+$/, '').replace(/-r-\d+$/, '').replace(/-ex-\d+$/, '');
                const robotData = RobotDatabase.getRobot(baseRobotId);
                const wheel = robotData.wheel;
                
                // Find current segment index
                let currentIndex = -1;
                for (let i = 0; i < wheel.length; i++) {
                    if (wheel[i].moveName === spinResult.moveName && 
                        wheel[i].moveType === spinResult.moveType) {
                        currentIndex = i;
                        break;
                    }
                }
                
                if (currentIndex === -1) return spinResult;
                
                // Get next segment (clockwise)
                const nextIndex = (currentIndex + 1) % wheel.length;
                const nextSegment = wheel[nextIndex];
                
                console.log(`   Shifted from ${spinResult.moveName} → ${nextSegment.moveName}`);
                return { ...nextSegment };
            },
            
            // Check if a spin result is the smallest attack segment on the wheel
            isSmallestAttackSegment(robotId, spinResult) {
                // Strip instance ID suffixes to get base robot ID
                const baseRobotId = robotId.replace(/-opp$/, '').replace(/-c-\d+$/, '').replace(/-uc-\d+$/, '').replace(/-r-\d+$/, '').replace(/-ex-\d+$/, '');
                const robotData = RobotDatabase.getRobot(baseRobotId);
                const wheel = robotData.wheel;
                
                // Only check if it's an attack (white or gold)
                const spinMoveType = spinResult.moveType ? spinResult.moveType.toLowerCase() : '';
                if (spinMoveType !== 'white' && spinMoveType !== 'gold') {
                    return false;
                }
                
                // Find all attack segments
                const attackSegments = wheel.filter(seg => {
                    const segMoveType = seg.moveType ? seg.moveType.toLowerCase() : '';
                    return segMoveType === 'white' || segMoveType === 'gold';
                });
                
                if (attackSegments.length === 0) return false;
                
                // Find smallest damage value
                const smallestDamage = Math.min(...attackSegments.map(seg => seg.damage || 0));
                
                // Check if this spin matches the smallest
                return spinResult.damage === smallestDamage;
            },
            
            // Execute the battle using Data Disk system
            async executeBattle() {
                if (!this.currentBattle) return;
                
                const { attackerRobot, defenderRobot, attackerPointId, defenderPointId, attackerTeam, defenderTeam } = this.currentBattle;
                
                console.log(`⚔️ Executing battle: ${attackerRobot.name} vs ${defenderRobot.name}`);
                
                // Hide action buttons and combatants
                document.querySelector('.battle-action-buttons').style.display = 'none';
                document.querySelector('.battle-combatants').style.display = 'none';
                
                // Show spinning wheels
                const wheelsContainer = document.getElementById('battleWheels');
                wheelsContainer.style.display = 'flex';
                
                // Set wheel labels based on team
                // Note: attacker is typically opponent, defender is typically player
                const attackerLabel = attackerTeam === 'player' ? 'PLAYER' : 'OPPONENT';
                const defenderLabel = defenderTeam === 'player' ? 'PLAYER' : 'OPPONENT';
                
                document.getElementById('attackerWheelLabel').textContent = `${attackerLabel} - ${attackerRobot.name}`;
                document.getElementById('defenderWheelLabel').textContent = `${defenderLabel} - ${defenderRobot.name}`;
                
                // Use the existing Data Disk combat system
                const result = await this.simulateDataDiskBattleWithAnimation(attackerRobot, defenderRobot);
                
                console.log('📊 Battle result:', result);
                
                // Show result after animation completes
                setTimeout(() => {
                    wheelsContainer.style.display = 'none';
                    this.removeMoveFlashes(); // Clean up overlays
                    this.displayBattleResult(result);
                }, 500);
            },
            
            // Simulate Data Disk battle WITH animation
            async simulateDataDiskBattleWithAnimation(attacker, defender) {
                // Check if debugger mode is enabled and moves are selected
                let attackerSpinData, defenderSpinData;
                
                if (this.debugger.enabled && 
                    this.debugger.selectedPlayerMove !== null && 
                    this.debugger.selectedOpponentMove !== null) {
                    
                    console.log('🛠️ DEBUGGER MODE: Forcing battle outcome');
                    
                    // Determine which robot is player and which is opponent
                    const { attackerTeam, defenderTeam } = this.currentBattle;
                    const playerIsAttacker = attackerTeam === 'player';
                    
                    // Get forced move indices
                    const attackerMoveIndex = playerIsAttacker ? this.debugger.selectedPlayerMove : this.debugger.selectedOpponentMove;
                    const defenderMoveIndex = playerIsAttacker ? this.debugger.selectedOpponentMove : this.debugger.selectedPlayerMove;
                    
                    // Force specific moves
                    attackerSpinData = this.forceWheelPosition(attacker.wheel, attackerMoveIndex);
                    defenderSpinData = this.forceWheelPosition(defender.wheel, defenderMoveIndex);
                    
                    console.log(`🛠️ Forced ${attacker.name} to spin: ${attackerSpinData.segment.moveName}`);
                    console.log(`🛠️ Forced ${defender.name} to spin: ${defenderSpinData.segment.moveName}`);
                } else {
                    // Normal random spin
                    attackerSpinData = this.spinWheelWithPosition(attacker.wheel);
                    defenderSpinData = this.spinWheelWithPosition(defender.wheel);
                }
                
                let attackerSpin = attackerSpinData.segment;
                let defenderSpin = defenderSpinData.segment;
                
                console.log(`🎲 ${attacker.name} spun: ${attackerSpin.moveName} (${attackerSpin.moveType}) at position ${attackerSpinData.spinPosition}`);
                console.log(`🎲 ${defender.name} spun: ${defenderSpin.moveName} (${defenderSpin.moveType}) at position ${defenderSpinData.spinPosition}`);
                
                // Developer Log: Spin Results
                this.addDeveloperLog('SPIN_RESULT', {
                    attacker: {
                        robot: attacker.name,
                        robotId: attacker.id,
                        move: attackerSpin.moveName,
                        moveType: attackerSpin.moveType,
                        damage: attackerSpin.damage,
                        stars: attackerSpin.stars,
                        spinPosition: attackerSpinData.spinPosition,
                        forced: this.debugger.enabled
                    },
                    defender: {
                        robot: defender.name,
                        robotId: defender.id,
                        move: defenderSpin.moveName,
                        moveType: defenderSpin.moveType,
                        damage: defenderSpin.damage,
                        stars: defenderSpin.stars,
                        spinPosition: defenderSpinData.spinPosition,
                        forced: this.debugger.enabled
                    }
                });
                
                // ==========================================
                // NOTE: Psycho Cut bonus spins happen AFTER initial wheel animations
                // This is handled further down in the code flow
                // ==========================================
                
                // APPLY STATUS EFFECTS to battle spins
                // Use instance IDs (e.g., "unit-002-c-0") not database IDs (e.g., "unit-002")
                const attackerRobotId = this.currentBattle.attackerRobotInstanceId;
                const defenderRobotId = this.currentBattle.defenderRobotInstanceId;
                
                console.log(`🔍 Using instance IDs for status effects: attacker=${attackerRobotId}, defender=${defenderRobotId}`);
                
                attackerSpin = this.applyStatusEffectsToBattleSpin(attackerRobotId, attackerSpin, 'attacker', defenderRobotId);
                defenderSpin = this.applyStatusEffectsToBattleSpin(defenderRobotId, defenderSpin, 'defender', attackerRobotId);
                
                console.log(`\n📊 FINAL BATTLE SPINS (after status effects):`);
                console.log(`  Attacker (${attacker.name}): ${attackerSpin.moveName} - ${attackerSpin.damage || 0} damage`);
                console.log(`  Defender (${defender.name}): ${defenderSpin.moveName} - ${defenderSpin.damage || 0} damage`);
                
                // Build wheel visuals with actual wheel data
                this.buildWheelVisual('attackerWheelSegments', attacker.wheel);
                this.buildWheelVisual('defenderWheelSegments', defender.wheel);
                
                // Build wheel legends
                this.buildWheelLegend('attackerWheelLegend', attacker.wheel);
                this.buildWheelLegend('defenderWheelLegend', defender.wheel);
                
                // Calculate exact rotation angles to land on the correct segment
                const attackerRotation = this.calculateWheelRotation(attacker.wheel, attackerSpinData.spinPosition);
                const defenderRotation = this.calculateWheelRotation(defender.wheel, defenderSpinData.spinPosition);
                
                console.log(`🎯 Attacker wheel will rotate to: ${attackerRotation}deg`);
                console.log(`🎯 Defender wheel will rotate to: ${defenderRotation}deg`);
                
                // Start spinning animation with EXACT target rotation
                const attackerWheel = document.getElementById('attackerWheelSegments');
                const defenderWheel = document.getElementById('defenderWheelSegments');
                
                attackerWheel.style.animation = 'none';
                defenderWheel.style.animation = 'none';
                
                // Trigger reflow
                void attackerWheel.offsetWidth;
                void defenderWheel.offsetWidth;
                
                // Apply exact rotation using inline styles
                attackerWheel.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                defenderWheel.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                attackerWheel.style.transform = `rotate(${attackerRotation}deg)`;
                defenderWheel.style.transform = `rotate(${defenderRotation}deg)`;
                
                // Wait for spin animation
                await this.delay(2000);
                
                // Show move names over the wheels (they'll stay until results screen)
                this.showMoveFlash('attackerWheelContainer', attackerSpin.moveName, attackerSpin.moveType);
                this.showMoveFlash('defenderWheelContainer', defenderSpin.moveName, defenderSpin.moveType);
                
                // Wait for overlay animation to complete
                await this.delay(400);
                
                // ==========================================
                // PSYCHO CUT BONUS SPIN MECHANIC
                // ==========================================
                // "Spin again - if Psycho Cut is spun, it deals +50 damage"
                // Execute AFTER initial wheel animations complete
                
                // Check if attacker spun Psycho Cut
                if (attackerSpin.moveName === 'Psycho Cut' || attackerSpin.moveName === 'Séance Slash') {
                    console.log(`\n🌀 ═══════════════════════════════════════`);
                    console.log(`🌀 PSYCHO CUT TRIGGERED: ${attacker.name}`);
                    console.log(`🌀 Executing bonus spin mechanic...`);
                    console.log(`🌀 ═══════════════════════════════════════\n`);
                    
                    // Get team info from currentBattle
                    const attackerTeamForLog = this.currentBattle.attackerTeam;
                    
                    // Show "BONUS SPIN!" flash over attacker wheel
                    this.removeMoveFlashes(); // Clear previous flashes
                    this.showMoveFlash('attackerWheelContainer', '🌀 BONUS SPIN!', 'Special');
                    await this.delay(800); // Let player see the announcement
                    
                    // Execute bonus spin
                    let bonusSpinData;
                    if (this.debugger.bonusSpinEnabled) {
                        console.log(`🛠️ DEBUGGER MODE: Check for forced bonus spin`);
                        // Determine if attacker is player or opponent
                        const attackerIsPlayer = attackerTeamForLog === 'player';
                        const bonusMoveIndex = attackerIsPlayer ? 
                            this.debugger.selectedPlayerBonusMove : 
                            this.debugger.selectedOpponentBonusMove;
                        
                        if (bonusMoveIndex !== null) {
                            bonusSpinData = this.forceWheelPosition(attacker.wheel, bonusMoveIndex);
                            console.log(`🛠️ Forced bonus spin: ${bonusSpinData.segment.moveName}`);
                        } else {
                            bonusSpinData = this.spinWheelWithPosition(attacker.wheel);
                            console.log(`🛠️ Bonus spin (no selection, random): ${bonusSpinData.segment.moveName}`);
                        }
                    } else {
                        bonusSpinData = this.spinWheelWithPosition(attacker.wheel);
                    }
                    
                    const bonusSpin = bonusSpinData.segment;
                    console.log(`🎲 BONUS ROLL: ${attacker.name} spun ${bonusSpin.moveName} (${bonusSpin.moveType}) at position ${bonusSpinData.spinPosition}`);
                    
                    // Calculate rotation for bonus spin (add more rotations for visual effect)
                    const bonusRotation = this.calculateWheelRotation(attacker.wheel, bonusSpinData.spinPosition) + 1440; // Extra 4 spins
                    console.log(`🎯 Bonus spin - attacker wheel will rotate to: ${bonusRotation}deg`);
                    
                    // Animate bonus spin
                    const attackerWheel = document.getElementById('attackerWheelSegments');
                    this.removeMoveFlashes(); // Clear bonus spin announcement
                    
                    attackerWheel.style.transition = 'none'; // Reset
                    void attackerWheel.offsetWidth; // Force reflow
                    attackerWheel.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    attackerWheel.style.transform = `rotate(${bonusRotation}deg)`;
                    
                    await this.delay(2000); // Wait for bonus spin animation
                    
                    // Check result and apply bonus
                    if (bonusSpin.moveName === attackerSpin.moveName) {
                        // JACKPOT! Double spin = +50 damage bonus
                        console.log(`✨ JACKPOT! Bonus spin landed on ${attackerSpin.moveName} again!`);
                        console.log(`💥 Applying +50 damage bonus (70 → 120)`);
                        
                        // Modify the original spin object's damage
                        attackerSpin.damage = 120; // 70 base + 50 bonus
                        
                        // Show "+50 DAMAGE!" flash
                        this.showMoveFlash('attackerWheelContainer', '⚡ +50 DAMAGE!', 'Boost');
                        await this.delay(1200); // Let player see the bonus
                        
                        // Log to history
                        this.addToHistory(`${attacker.name}'s Psycho Cut hits TWICE! +50 damage bonus!`, 'battle', attackerTeamForLog);
                        
                        // Developer log
                        this.addDeveloperLog('PSYCHO_CUT_BONUS', {
                            robot: attacker.name,
                            result: 'SUCCESS',
                            bonusSpin: bonusSpin.moveName,
                            finalDamage: 120,
                            message: 'Bonus roll landed on Psycho Cut - damage increased from 70 to 120'
                        });
                    } else {
                        // Bonus spin failed - use original Psycho Cut
                        console.log(`❌ Bonus spin was ${bonusSpin.moveName}, not Psycho Cut`);
                        console.log(`✅ Using original Psycho Cut (70 damage)`);
                        
                        // Show original move flash
                        this.showMoveFlash('attackerWheelContainer', attackerSpin.moveName, attackerSpin.moveType);
                        await this.delay(800);
                        
                        // Log to history
                        this.addToHistory(`${attacker.name}'s bonus spin: ${bonusSpin.moveName}. Using original Psycho Cut.`, 'battle', attackerTeamForLog);
                        
                        // Developer log
                        this.addDeveloperLog('PSYCHO_CUT_BONUS', {
                            robot: attacker.name,
                            result: 'FAILED',
                            bonusSpin: bonusSpin.moveName,
                            finalDamage: 70,
                            message: 'Bonus roll did not land on Psycho Cut - using base damage'
                        });
                    }
                    
                    console.log(`🌀 Psycho Cut bonus spin complete for ${attacker.name}\n`);
                }
                
                // Check if defender spun Psycho Cut
                if (defenderSpin.moveName === 'Psycho Cut' || defenderSpin.moveName === 'Séance Slash') {
                    console.log(`\n🌀 ═══════════════════════════════════════`);
                    console.log(`🌀 PSYCHO CUT TRIGGERED: ${defender.name}`);
                    console.log(`🌀 Executing bonus spin mechanic...`);
                    console.log(`🌀 ═══════════════════════════════════════\n`);
                    
                    // Get team info from currentBattle
                    const defenderTeamForLog = this.currentBattle.defenderTeam;
                    
                    // Show "BONUS SPIN!" flash over defender wheel
                    this.removeMoveFlashes(); // Clear previous flashes
                    this.showMoveFlash('defenderWheelContainer', '🌀 BONUS SPIN!', 'Special');
                    await this.delay(800); // Let player see the announcement
                    
                    // Execute bonus spin
                    let bonusSpinData;
                    if (this.debugger.bonusSpinEnabled) {
                        console.log(`🛠️ DEBUGGER MODE: Check for forced bonus spin`);
                        // Determine if defender is player or opponent
                        const defenderIsPlayer = defenderTeamForLog === 'player';
                        const bonusMoveIndex = defenderIsPlayer ? 
                            this.debugger.selectedPlayerBonusMove : 
                            this.debugger.selectedOpponentBonusMove;
                        
                        if (bonusMoveIndex !== null) {
                            bonusSpinData = this.forceWheelPosition(defender.wheel, bonusMoveIndex);
                            console.log(`🛠️ Forced bonus spin: ${bonusSpinData.segment.moveName}`);
                        } else {
                            bonusSpinData = this.spinWheelWithPosition(defender.wheel);
                            console.log(`🛠️ Bonus spin (no selection, random): ${bonusSpinData.segment.moveName}`);
                        }
                    } else {
                        bonusSpinData = this.spinWheelWithPosition(defender.wheel);
                    }
                    
                    const bonusSpin = bonusSpinData.segment;
                    console.log(`🎲 BONUS ROLL: ${defender.name} spun ${bonusSpin.moveName} (${bonusSpin.moveType}) at position ${bonusSpinData.spinPosition}`);
                    
                    // Calculate rotation for bonus spin (add more rotations for visual effect)
                    const bonusRotation = this.calculateWheelRotation(defender.wheel, bonusSpinData.spinPosition) + 1440; // Extra 4 spins
                    console.log(`🎯 Bonus spin - defender wheel will rotate to: ${bonusRotation}deg`);
                    
                    // Animate bonus spin
                    const defenderWheel = document.getElementById('defenderWheelSegments');
                    this.removeMoveFlashes(); // Clear bonus spin announcement
                    
                    defenderWheel.style.transition = 'none'; // Reset
                    void defenderWheel.offsetWidth; // Force reflow
                    defenderWheel.style.transition = 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    defenderWheel.style.transform = `rotate(${bonusRotation}deg)`;
                    
                    await this.delay(2000); // Wait for bonus spin animation
                    
                    // Check result and apply bonus
                    if (bonusSpin.moveName === defenderSpin.moveName) {
                        // JACKPOT! Double spin = +50 damage bonus
                        console.log(`✨ JACKPOT! Bonus spin landed on ${defenderSpin.moveName} again!`);
                        console.log(`💥 Applying +50 damage bonus (70 → 120)`);
                        
                        // Modify the original spin object's damage
                        defenderSpin.damage = 120; // 70 base + 50 bonus
                        
                        // Show "+50 DAMAGE!" flash
                        this.showMoveFlash('defenderWheelContainer', '⚡ +50 DAMAGE!', 'Boost');
                        await this.delay(1200); // Let player see the bonus
                        
                        // Log to history
                        this.addToHistory(`${defender.name}'s Psycho Cut hits TWICE! +50 damage bonus!`, 'battle', defenderTeamForLog);
                        
                        // Developer log
                        this.addDeveloperLog('PSYCHO_CUT_BONUS', {
                            robot: defender.name,
                            result: 'SUCCESS',
                            bonusSpin: bonusSpin.moveName,
                            finalDamage: 120,
                            message: 'Bonus roll landed on Psycho Cut - damage increased from 70 to 120'
                        });
                    } else {
                        // Bonus spin failed - use original Psycho Cut
                        console.log(`❌ Bonus spin was ${bonusSpin.moveName}, not Psycho Cut`);
                        console.log(`✅ Using original Psycho Cut (70 damage)`);
                        
                        // Show original move flash
                        this.showMoveFlash('defenderWheelContainer', defenderSpin.moveName, defenderSpin.moveType);
                        await this.delay(800);
                        
                        // Log to history
                        this.addToHistory(`${defender.name}'s bonus spin: ${bonusSpin.moveName}. Using original Psycho Cut.`, 'battle', defenderTeamForLog);
                        
                        // Developer log
                        this.addDeveloperLog('PSYCHO_CUT_BONUS', {
                            robot: defender.name,
                            result: 'FAILED',
                            bonusSpin: bonusSpin.moveName,
                            finalDamage: 70,
                            message: 'Bonus roll did not land on Psycho Cut - using base damage'
                        });
                    }
                    
                    console.log(`🌀 Psycho Cut bonus spin complete for ${defender.name}\n`);
                }
                
                // Clear all flashes before continuing to normal flow
                this.removeMoveFlashes();
                
                // Reveal results with color-coded text
                const attackerResult = document.getElementById('attackerWheelResult');
                const defenderResult = document.getElementById('defenderWheelResult');
                
                const attackerColor = this.getMoveColor(attackerSpin.moveType);
                const defenderColor = this.getMoveColor(defenderSpin.moveType);
                
                // Format move name with pip identifier if present
                const attackerMoveName = attackerSpin.pipCount > 0 
                    ? `${attackerSpin.moveName} (${'•'.repeat(attackerSpin.pipCount)})`
                    : attackerSpin.moveName;
                const defenderMoveName = defenderSpin.pipCount > 0 
                    ? `${defenderSpin.moveName} (${'•'.repeat(defenderSpin.pipCount)})`
                    : defenderSpin.moveName;
                
                // Update attacker result
                attackerResult.querySelector('.move-name').textContent = attackerMoveName;
                attackerResult.querySelector('.move-power').textContent = this.getMovePowerDisplay(attackerSpin);
                attackerResult.style.color = attackerColor;
                attackerResult.classList.add('revealed');
                
                // Update defender result
                defenderResult.querySelector('.move-name').textContent = defenderMoveName;
                defenderResult.querySelector('.move-power').textContent = this.getMovePowerDisplay(defenderSpin);
                defenderResult.style.color = defenderColor;
                defenderResult.classList.add('revealed');
                
                // Log spins to battle history
                const attackerTeam = this.currentBattle.attackerTeam;
                const defenderTeam = this.currentBattle.defenderTeam;
                this.addToHistory(`${attacker.name} spun: ${attackerSpin.moveName} (${attackerSpin.moveType})`, 'battle', attackerTeam);
                this.addToHistory(`${defender.name} spun: ${defenderSpin.moveName} (${defenderSpin.moveType})`, 'battle', defenderTeam);
                
                // Wait a moment to show results
                await this.delay(1500);
                
                // Determine winner based on move priority
                const winner = this.determineBattleWinner(attackerSpin, defenderSpin);
                
                // Developer Log: Battle Outcome
                this.addDeveloperLog('BATTLE_OUTCOME', {
                    winner: winner,
                    attacker: {
                        robot: attacker.name,
                        move: attackerSpin.moveName,
                        moveType: attackerSpin.moveType,
                        power: attackerSpin.damage || attackerSpin.stars
                    },
                    defender: {
                        robot: defender.name,
                        move: defenderSpin.moveName,
                        moveType: defenderSpin.moveType,
                        power: defenderSpin.damage || defenderSpin.stars
                    },
                    battleLogic: this.getBattleLogicExplanation(attackerSpin, defenderSpin, winner)
                });
                
                return {
                    winner: winner, // 'attacker', 'defender', or 'draw'
                    attackerMove: attackerSpin,
                    defenderMove: defenderSpin,
                    attacker: attacker,
                    defender: defender
                };
            },
            
            // Simulate Data Disk battle (simplified version - no animation)
            async simulateDataDiskBattle(attacker, defender) {
                // Spin both wheels
                let attackerSpin = this.spinWheel(attacker.wheel);
                let defenderSpin = this.spinWheel(defender.wheel);
                
                console.log(`🎲 ${attacker.name} spun: ${attackerSpin.moveName} (${attackerSpin.moveType})`);
                console.log(`🎲 ${defender.name} spun: ${defenderSpin.moveName} (${defenderSpin.moveType})`);
                
                // APPLY STATUS EFFECTS to battle spins
                // Use instance IDs (e.g., "unit-002-c-0") not database IDs (e.g., "unit-002")
                const attackerRobotId = this.currentBattle.attackerRobotInstanceId;
                const defenderRobotId = this.currentBattle.defenderRobotInstanceId;
                
                console.log(`🔍 Using instance IDs for status effects: attacker=${attackerRobotId}, defender=${defenderRobotId}`);
                
                attackerSpin = this.applyStatusEffectsToBattleSpin(attackerRobotId, attackerSpin, 'attacker', defenderRobotId);
                defenderSpin = this.applyStatusEffectsToBattleSpin(defenderRobotId, defenderSpin, 'defender', attackerRobotId);
                
                console.log(`\n📊 FINAL BATTLE SPINS (after status effects):`);
                console.log(`  Attacker (${attacker.name}): ${attackerSpin.moveName} - ${attackerSpin.damage || 0} damage`);
                console.log(`  Defender (${defender.name}): ${defenderSpin.moveName} - ${defenderSpin.damage || 0} damage`);
                
                // Log spins to battle history
                const attackerTeam = this.currentBattle.attackerTeam;
                const defenderTeam = this.currentBattle.defenderTeam;
                this.addToHistory(`${attacker.name} spun: ${attackerSpin.moveName} (${attackerSpin.moveType})`, 'battle', attackerTeam);
                this.addToHistory(`${defender.name} spun: ${defenderSpin.moveName} (${defenderSpin.moveType})`, 'battle', defenderTeam);
                
                // Developer Log: Spin Results (Simulated Battle)
                this.addDeveloperLog('SPIN_RESULT', {
                    battleType: 'simulated',
                    attacker: {
                        robot: attacker.name,
                        robotId: attacker.id,
                        move: attackerSpin.moveName,
                        moveType: attackerSpin.moveType,
                        damage: attackerSpin.damage,
                        stars: attackerSpin.stars
                    },
                    defender: {
                        robot: defender.name,
                        robotId: defender.id,
                        move: defenderSpin.moveName,
                        moveType: defenderSpin.moveType,
                        damage: defenderSpin.damage,
                        stars: defenderSpin.stars
                    }
                });
                
                // Determine winner based on move priority
                const winner = this.determineBattleWinner(attackerSpin, defenderSpin);
                
                // Developer Log: Battle Outcome (Simulated Battle)
                this.addDeveloperLog('BATTLE_OUTCOME', {
                    battleType: 'simulated',
                    winner: winner,
                    attacker: {
                        robot: attacker.name,
                        move: attackerSpin.moveName,
                        moveType: attackerSpin.moveType,
                        power: attackerSpin.damage || attackerSpin.stars
                    },
                    defender: {
                        robot: defender.name,
                        move: defenderSpin.moveName,
                        moveType: defenderSpin.moveType,
                        power: defenderSpin.damage || defenderSpin.stars
                    },
                    battleLogic: this.getBattleLogicExplanation(attackerSpin, defenderSpin, winner)
                });
                
                return {
                    winner: winner, // 'attacker', 'defender', or 'draw'
                    attackerMove: attackerSpin,
                    defenderMove: defenderSpin,
                    attacker: attacker,
                    defender: defender
                };
            },
            
            // Assign pip identifiers to duplicate colored moves
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
            
            // Build visual wheel with actual segments
            buildWheelVisual(elementId, wheelData) {
                const wheelElement = document.getElementById(elementId);
                if (!wheelElement) return;
                
                // Clear any existing pip overlays from previous battles
                const existingPips = wheelElement.querySelectorAll('.wheel-pip-container');
                existingPips.forEach(pip => pip.remove());
                
                // Clear any existing star overlays from previous battles
                const existingStars = wheelElement.querySelectorAll('.wheel-star-container');
                existingStars.forEach(star => star.remove());
                
                // Assign pip identifiers
                const wheelDataWithPips = this.assignPipIdentifiers(wheelData);
                
                // Store pip data for later use
                wheelElement.dataset.pipData = JSON.stringify(wheelDataWithPips);
                
                // Create conic gradient based on actual wheel segments
                let gradientSegments = [];
                let currentAngle = 0;
                
                wheelDataWithPips.forEach((segment, index) => {
                    const segmentAngle = (segment.size / 96) * 360;
                    const color = this.getMoveColorHex(segment.moveType);
                    
                    // Check if next segment has same color (for separator line)
                    const nextSegment = wheelDataWithPips[(index + 1) % wheelDataWithPips.length];
                    const nextColor = nextSegment ? this.getMoveColorHex(nextSegment.moveType) : null;
                    const needsSeparator = (nextColor === color);
                    
                    // Debug logging for separator detection
                    if (needsSeparator) {
                        console.log(`🔲 SEPARATOR NEEDED: ${segment.moveName} (${segment.moveType}) → ${nextSegment.moveName} (${nextSegment.moveType})`);
                        console.log(`   Color: ${color}, Angle: ${currentAngle}° to ${currentAngle + segmentAngle}°`);
                    }
                    
                    if (needsSeparator) {
                        // Add visible black separator line (3deg) between same-color segments
                        const lineWidth = 3; // degrees - highly visible separator
                        gradientSegments.push(`${color} ${currentAngle}deg ${currentAngle + segmentAngle - lineWidth}deg`);
                        gradientSegments.push(`#222222 ${currentAngle + segmentAngle - lineWidth}deg ${currentAngle + segmentAngle}deg`);
                        console.log(`   ✅ Added separator: ${color} ends at ${currentAngle + segmentAngle - lineWidth}°, black line ${currentAngle + segmentAngle - lineWidth}° to ${currentAngle + segmentAngle}°`);
                    } else {
                        // Normal segment without separator
                        gradientSegments.push(`${color} ${currentAngle}deg ${currentAngle + segmentAngle}deg`);
                    }
                    
                    // Add pip overlay if this segment has a pip identifier
                    if (segment.pipCount > 0) {
                        this.addPipOverlay(wheelElement, currentAngle, segmentAngle, segment.pipCount);
                    }
                    
                    // Add star overlay if this segment has stars
                    if (segment.stars !== undefined && segment.stars !== null) {
                        this.addStarOverlay(wheelElement, currentAngle, segmentAngle, segment.stars);
                    }
                    
                    currentAngle += segmentAngle;
                });
                
                const gradientString = `conic-gradient(${gradientSegments.join(', ')})`;
                console.log(`🎨 Final gradient (${gradientSegments.length} segments):`, gradientString.substring(0, 200) + '...');
                wheelElement.style.background = gradientString;
            },
            
            // Add pip overlay to wheel segment
            addPipOverlay(wheelElement, startAngle, segmentAngle, pipCount) {
                const centerAngle = startAngle + (segmentAngle / 2);
                const radius = 45; // Distance from center (wheel radius is ~80px, place at ~55% radius)
                
                // Create pip container (full wheel overlay)
                const pipContainer = document.createElement('div');
                pipContainer.className = 'wheel-pip-container';
                
                // Calculate angular spacing for multiple pips (spread them along an arc)
                const pipSpreadAngle = pipCount > 1 ? Math.min(8, segmentAngle * 0.4) : 0; // Max 8 degrees spread
                const startSpread = centerAngle - (pipSpreadAngle * (pipCount - 1) / 2);
                
                // Add pips in an arc formation
                for (let i = 0; i < pipCount; i++) {
                    const pipAngle = pipCount > 1 ? startSpread + (i * pipSpreadAngle / (pipCount - 1)) : centerAngle;
                    const radians = (pipAngle - 90) * (Math.PI / 180); // -90 to align with top
                    const x = 50 + (radius * Math.cos(radians)); // 50% = center
                    const y = 50 + (radius * Math.sin(radians));
                    
                    const pip = document.createElement('div');
                    pip.className = 'wheel-pip';
                    pip.style.left = `${x}%`;
                    pip.style.top = `${y}%`;
                    pip.style.transform = 'translate(-50%, -50%)';
                    pipContainer.appendChild(pip);
                }
                
                // Append to wheel element so pips rotate WITH the wheel
                wheelElement.appendChild(pipContainer);
            },
            
            // Add star overlay to wheel segment
            addStarOverlay(wheelElement, startAngle, segmentAngle, starCount) {
                const centerAngle = startAngle + (segmentAngle / 2);
                const radius = 35; // Closer to center than pips
                
                // Create star container
                const starContainer = document.createElement('div');
                starContainer.className = 'wheel-star-container';
                
                // Calculate angular spacing for multiple stars (spread them along an arc)
                const starSpreadAngle = starCount > 1 ? Math.min(20, segmentAngle * 0.7) : 0; // Max 20 degrees spread
                const startSpread = centerAngle - (starSpreadAngle * (starCount - 1) / 2);
                
                // Dynamic font size based on star count (more stars = smaller size)
                let fontSize;
                if (starCount === 1) {
                    fontSize = 12; // Normal size for single star
                } else if (starCount === 2) {
                    fontSize = 9; // Smaller for 2 stars
                } else if (starCount === 3) {
                    fontSize = 7; // Even smaller for 3 stars
                } else {
                    fontSize = 6; // Smallest for 4+ stars
                }
                
                // Add stars in an arc formation
                for (let i = 0; i < starCount; i++) {
                    const starAngle = starCount > 1 ? startSpread + (i * starSpreadAngle / (starCount - 1)) : centerAngle;
                    const radians = (starAngle - 90) * (Math.PI / 180); // -90 to align with top
                    const x = 50 + (radius * Math.cos(radians)); // 50% = center
                    const y = 50 + (radius * Math.sin(radians));
                    
                    const starDisplay = document.createElement('div');
                    starDisplay.className = 'wheel-star-display';
                    starDisplay.style.left = `${x}%`;
                    starDisplay.style.top = `${y}%`;
                    starDisplay.style.fontSize = `${fontSize}px`; // Apply dynamic size
                    starDisplay.style.transform = 'translate(-50%, -50%)';
                    starDisplay.textContent = '⭐'; // Single star emoji
                    
                    starContainer.appendChild(starDisplay);
                }
                
                // Append to wheel element so stars rotate WITH the wheel
                wheelElement.appendChild(starContainer);
            },
            
            // Build wheel legend showing all possible outcomes
            buildWheelLegend(legendId, wheelData) {
                const legendElement = document.getElementById(legendId);
                if (!legendElement) return;
                
                // Clear existing legend
                legendElement.innerHTML = '';
                
                // Assign pip identifiers to duplicate colors
                const wheelDataWithPips = this.assignPipIdentifiers(wheelData);
                
                // Group segments by move name AND pip count to show duplicates separately
                const moveMap = new Map();
                wheelDataWithPips.forEach(segment => {
                    const uniqueKey = `${segment.moveName}_${segment.pipCount}`;
                    
                    if (!moveMap.has(uniqueKey)) {
                        moveMap.set(uniqueKey, {
                            moveName: segment.moveName,
                            moveType: segment.moveType,
                            damage: segment.damage,
                            stars: segment.stars,
                            pipCount: segment.pipCount,
                            totalSize: segment.size
                        });
                    } else {
                        const existing = moveMap.get(uniqueKey);
                        existing.totalSize += segment.size;
                    }
                });
                
                // Create legend items sorted by size (most likely first)
                const sortedMoves = Array.from(moveMap.values()).sort((a, b) => b.totalSize - a.totalSize);
                
                sortedMoves.forEach(move => {
                    const legendItem = document.createElement('div');
                    legendItem.className = 'legend-item';
                    
                    const colorBox = document.createElement('div');
                    colorBox.className = 'legend-color';
                    colorBox.style.backgroundColor = this.getMoveColorHex(move.moveType);
                    
                    const textSpan = document.createElement('span');
                    textSpan.className = 'legend-text';
                    
                    // Format text with pip identifier if present
                    let displayText = move.moveName;
                    if (move.pipCount > 0) {
                        const pips = '•'.repeat(move.pipCount);
                        displayText += ` (${pips})`;
                    }
                    if (move.damage !== undefined && move.damage !== null && move.damage > 0) {
                        displayText += ` - ⚔️ ${move.damage}`;
                    } else if (move.stars !== undefined && move.stars !== null) {
                        displayText += ` - ⭐ ${move.stars}`;
                    } else if (move.moveType.toLowerCase() === 'blue') {
                        displayText += ` - Defensive`;
                    } else if (move.moveType.toLowerCase() === 'red') {
                        displayText += ` - Miss`;
                    }
                    textSpan.textContent = displayText;
                    legendItem.appendChild(colorBox);
                    legendItem.appendChild(textSpan);
                    legendElement.appendChild(legendItem);
                });
            },
            
            // Build detailed battle moves list (similar to Combat Dial)
            buildBattleMovesList(listId, wheelData, robotId = null) {
                const listElement = document.getElementById(listId);
                if (!listElement) return;
                
                // Get status effects if robotId provided
                const statuses = robotId ? this.getRobotStatuses(robotId) : { conditions: [], markers: [] };
                
                // Clear existing list
                listElement.innerHTML = '';
                
                // Assign pip identifiers to handle duplicate colors
                const wheelDataWithPips = this.assignPipIdentifiers(wheelData);
                
                // Sort wheel data: Miss moves at bottom, others by size (most common first)
                const sortedWheel = [...wheelDataWithPips].sort((a, b) => {
                    const aIsMiss = a.moveName.toLowerCase().includes('miss');
                    const bIsMiss = b.moveName.toLowerCase().includes('miss');
                    
                    // If one is Miss and the other isn't, Miss goes to bottom
                    if (aIsMiss && !bIsMiss) return 1;
                    if (!aIsMiss && bIsMiss) return -1;
                    
                    // Otherwise sort by size (largest first)
                    return b.size - a.size;
                });
                
                sortedWheel.forEach(move => {
                    const moveEl = document.createElement('div');
                    moveEl.className = `battle-wheel-move ${move.moveType}`;
                    
                    // Icon for move type
                    const typeIcons = {
                        'White': '⚔️',
                        'Gold': '⭐',
                        'Purple': '✨',
                        'Blue': '🛡️',
                        'Red': '❌'
                    };
                    const icon = typeIcons[move.moveType] || '•';
                    
                    // Build damage/stars display with status effect modifications
                    let statsHtml = '';
                    if (move.damage !== undefined && move.damage !== null) {
                        // Check for damage reductions from status effects (Poison, Noxious, Burn)
                        let modifiedDamage = move.damage;
                        let damageReduction = 0;
                        const moveTypeLower = move.moveType ? move.moveType.toLowerCase() : '';
                        
                        // Only apply damage reduction to White/Gold attacks
                        if (robotId && (moveTypeLower === 'white' || moveTypeLower === 'gold')) {
                            if (this.hasStatusEffect(robotId, 'poison')) {
                                damageReduction += 20;
                            }
                            if (this.hasStatusEffect(robotId, 'noxious')) {
                                damageReduction += 40;
                            }
                            if (this.hasStatusEffect(robotId, 'burn')) {
                                damageReduction += 10;
                            }
                        }
                        
                        modifiedDamage = Math.max(0, move.damage - damageReduction);
                        
                        if (damageReduction > 0) {
                            statsHtml = `<div class="battle-wheel-move-damage">
                                <span style="text-decoration: line-through; color: #999; font-size: 7px;">${move.damage}</span>
                                <span style="color: #ff6b6b; font-weight: bold;"> ${modifiedDamage}💥</span>
                            </div>`;
                        } else {
                            statsHtml = `<div class="battle-wheel-move-damage">${move.damage}💥</div>`;
                        }
                    } else if (move.stars) {
                        statsHtml = `<div class="battle-wheel-move-damage">${'⭐'.repeat(move.stars)}</div>`;
                    }
                    statsHtml += `<div class="battle-wheel-move-size">${move.size}/96</div>`;
                    
                    // Format move name with pip identifier if present
                    let displayName = move.moveName;
                    if (move.pipCount > 0) {
                        const pips = '•'.repeat(move.pipCount);
                        displayName += ` (${pips})`;
                    }
                    
                    // Show full effect text - handle "None" case for normal attacks
                    let effectText = move.effect;
                    
                    // Miss moves should have no description
                    if (move.moveName.toLowerCase().includes('miss')) {
                        effectText = '';
                    } else if (!effectText || effectText === 'None' || effectText.trim() === '') {
                        // Normal attacks without special effects
                        effectText = 'Normal attack';
                    }
                    
                    moveEl.innerHTML = `
                        <div class="battle-wheel-move-icon">${icon}</div>
                        <div class="battle-wheel-move-info">
                            <div class="battle-wheel-move-name">${displayName}</div>
                            <div class="battle-wheel-move-effect">${effectText}</div>
                        </div>
                        <div class="battle-wheel-move-stats">
                            ${statsHtml}
                        </div>
                    `;
                    
                    listElement.appendChild(moveEl);
                });
            },
            
            // Get move type color (for text)
            getMoveColor(moveType) {
                const colors = {
                    'red': '#ff4444',
                    'blue': '#4444ff',
                    'gold': '#ffaa00',
                    'purple': '#aa44ff',
                    'white': '#ffffff'
                };
                return colors[moveType.toLowerCase()] || '#ffffff';
            },
            
            // Get move type color (hex for gradients)
            getMoveColorHex(moveType) {
                const colors = {
                    'red': '#ff4444',
                    'blue': '#4444ff',
                    'gold': '#ffaa00',
                    'purple': '#aa44ff',
                    'white': '#ffffff'
                };
                return colors[moveType.toLowerCase()] || '#ffffff';
            },
            
            // Get move power display text
            getMovePowerDisplay(moveSegment) {
                // If it's a miss, show the effect or "Miss"
                if (moveSegment.moveName.toLowerCase().includes('miss')) {
                    return moveSegment.effect || 'Miss';
                }
                
                // Always show the effect if available
                if (moveSegment.effect && moveSegment.effect !== 'None') {
                    return moveSegment.effect;
                }
                
                // For attacks with power, show power value
                if (moveSegment.power && moveSegment.power > 0) {
                    return `Power: ${moveSegment.power}`;
                }
                
                // For special moves without effect, show type
                const typeLabels = {
                    'red': 'Red Attack',
                    'blue': 'Blue Defense',
                    'gold': 'Gold Attack',
                    'purple': 'Purple Special',
                    'white': 'White Attack'
                };
                return typeLabels[moveSegment.moveType.toLowerCase()] || moveSegment.moveType;
            },
            
            // Delay helper
            delay(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },
            
            // Spin a robot's wheel WITH position tracking (for accurate visual)
            spinWheelWithPosition(wheel) {
                // Assign pip identifiers to duplicate colors
                const wheelWithPips = this.assignPipIdentifiers(wheel);
                
                const random = Math.floor(Math.random() * 96) + 1;
                let cumulative = 0;
                
                for (const segment of wheelWithPips) {
                    cumulative += segment.size;
                    if (random <= cumulative) {
                        return {
                            segment: segment,
                            spinPosition: random  // Exact position (1-96)
                        };
                    }
                }
                
                // Fallback (shouldn't happen)
                return {
                    segment: wheelWithPips[0],
                    spinPosition: 1
                };
            },
            
            // Force wheel to land on a specific move (for debugger)
            forceWheelPosition(wheel, moveIndex) {
                // Assign pip identifiers to duplicate colors
                const wheelWithPips = this.assignPipIdentifiers(wheel);
                
                // Get the target segment
                const targetSegment = wheelWithPips[moveIndex];
                
                // Calculate cumulative position up to this segment
                let cumulative = 0;
                for (let i = 0; i < moveIndex; i++) {
                    cumulative += wheelWithPips[i].size;
                }
                
                // Pick a random position within this segment (for visual variety)
                const segmentMidpoint = cumulative + Math.floor(targetSegment.size / 2);
                
                return {
                    segment: targetSegment,
                    spinPosition: segmentMidpoint
                };
            },
            
            // Calculate exact rotation angle to land on a specific position
            calculateWheelRotation(wheel, spinPosition) {
                // Find the segment and its position in the wheel
                let cumulative = 0;
                let segmentStartAngle = 0;
                let segmentEndAngle = 0;
                
                for (const segment of wheel) {
                    cumulative += segment.size;
                    
                    if (spinPosition <= cumulative) {
                        // This is the segment we landed on
                        segmentStartAngle = ((cumulative - segment.size) / 96) * 360;
                        segmentEndAngle = (cumulative / 96) * 360;
                        
                        // Calculate position within this segment
                        const positionInSegment = spinPosition - (cumulative - segment.size);
                        const segmentAngle = segmentEndAngle - segmentStartAngle;
                        const exactAngle = segmentStartAngle + (positionInSegment / segment.size) * segmentAngle;
                        
                        // Add multiple full rotations (4 spins = 1440deg) plus the exact angle
                        // We need to rotate COUNTER-CLOCKWISE to position, so we subtract the angle
                        // Pointer is at top (0deg), so we rotate to bring the landed position to the top
                        const finalRotation = 1440 - exactAngle;
                        
                        return finalRotation;
                    }
                }
                
                // Fallback
                return 1440;
            },
            
            // Spin a robot's wheel (simple version for non-animated battles)
            spinWheel(wheel) {
                const random = Math.floor(Math.random() * 96) + 1;
                let cumulative = 0;
                
                for (const segment of wheel) {
                    cumulative += segment.size;
                    if (random <= cumulative) {
                        return segment;
                    }
                }
                
                // Fallback (shouldn't happen)
                return wheel[0];
            },
            
            // Determine battle winner based on CORRECT COMBAT RULES from design document
            determineBattleWinner(attackerMove, defenderMove) {
                const atkType = attackerMove.moveType.toLowerCase();
                const defType = defenderMove.moveType.toLowerCase();
                
                console.log(`⚔️ Combat: ${atkType} vs ${defType}`);
                
                // Priority: Blue (5) > Gold (4) > Purple (3) > White (2) > Red (1)
                const priority = {
                    'blue': 5,
                    'gold': 4,
                    'purple': 3,
                    'white': 2,
                    'red': 1
                };
                
                const atkPriority = priority[atkType] || 0;
                const defPriority = priority[defType] || 0;
                
                // === SPECIAL DRAW CONDITIONS ===
                // Red vs Red = Draw
                if (atkType === 'red' && defType === 'red') {
                    console.log('🤝 Red vs Red = Draw');
                    return 'draw';
                }
                
                // === BLUE PROTECTION ===
                // Blue is DEFENSIVE - it protects from being knocked out but doesn't knock out opponent
                // If either side uses Blue, result is DRAW (both robots stay on board)
                if (atkType === 'blue' || defType === 'blue') {
                    console.log('🔵 Blue = Protection! Draw (no knockout)');
                    return 'draw';
                }
                
                // === GOLD BEATS PURPLE ===
                if (atkType === 'gold' && defType === 'purple') {
                    console.log('🟡 Gold beats Purple!');
                    return 'attacker';
                }
                if (defType === 'gold' && atkType === 'purple') {
                    console.log('🟡 Gold beats Purple!');
                    return 'defender';
                }
                
                // === PURPLE BEATS WHITE ===
                if (atkType === 'purple' && defType === 'white') {
                    console.log('🟣 Purple beats White!');
                    return 'attacker';
                }
                if (defType === 'purple' && atkType === 'white') {
                    console.log('🟣 Purple beats White!');
                    return 'defender';
                }
                
                // === WHITE VS WHITE - COMPARE DAMAGE ===
                if (atkType === 'white' && defType === 'white') {
                    const atkDamage = attackerMove.damage || 0;
                    const defDamage = defenderMove.damage || 0;
                    console.log(`⚪ White vs White: ${atkDamage} vs ${defDamage} (AFTER status effects)`);
                    if (atkDamage > defDamage) {
                        console.log(`✅ Attacker wins: ${atkDamage} > ${defDamage}`);
                        return 'attacker';
                    }
                    if (defDamage > atkDamage) {
                        console.log(`✅ Defender wins: ${defDamage} > ${atkDamage}`);
                        return 'defender';
                    }
                    console.log(`🤝 Draw: ${atkDamage} = ${defDamage}`);
                    return 'draw';
                }
                
                // === GOLD VS GOLD - COMPARE DAMAGE ===
                if (atkType === 'gold' && defType === 'gold') {
                    const atkDamage = attackerMove.damage || 0;
                    const defDamage = defenderMove.damage || 0;
                    console.log(`🟡 Gold vs Gold: ${atkDamage} vs ${defDamage} (AFTER status effects)`);
                    if (atkDamage > defDamage) {
                        console.log(`✅ Attacker wins: ${atkDamage} > ${defDamage}`);
                        return 'attacker';
                    }
                    if (defDamage > atkDamage) {
                        console.log(`✅ Defender wins: ${defDamage} > ${atkDamage}`);
                        return 'defender';
                    }
                    console.log(`🤝 Draw: ${atkDamage} = ${defDamage}`);
                    return 'draw';
                }
                
                // === WHITE VS GOLD - COMPARE DAMAGE ===
                if ((atkType === 'white' && defType === 'gold') || (atkType === 'gold' && defType === 'white')) {
                    const atkDamage = attackerMove.damage || 0;
                    const defDamage = defenderMove.damage || 0;
                    console.log(`⚪🟡 White vs Gold: ${atkDamage} vs ${defDamage} (AFTER status effects)`);
                    if (atkDamage > defDamage) {
                        console.log(`✅ Attacker wins: ${atkDamage} > ${defDamage}`);
                        return 'attacker';
                    }
                    if (defDamage > atkDamage) {
                        console.log(`✅ Defender wins: ${defDamage} > ${atkDamage}`);
                        return 'defender';
                    }
                    console.log(`🤝 Draw: ${atkDamage} = ${defDamage}`);
                    return 'draw';
                }
                
                // === PURPLE VS PURPLE - COMPARE STAR RATING ===
                if (atkType === 'purple' && defType === 'purple') {
                    const atkStars = attackerMove.stars || 0;
                    const defStars = defenderMove.stars || 0;
                    console.log(`🟣 Purple vs Purple: ${atkStars}⭐ vs ${defStars}⭐`);
                    if (atkStars > defStars) return 'attacker';
                    if (defStars > atkStars) return 'defender';
                    return 'draw';
                }
                
                // === DEFAULT PRIORITY COMPARISON ===
                if (atkPriority > defPriority) {
                    console.log(`✅ Attacker wins by priority (${atkPriority} > ${defPriority})`);
                    return 'attacker';
                }
                if (defPriority > atkPriority) {
                    console.log(`✅ Defender wins by priority (${defPriority} > ${atkPriority})`);
                    return 'defender';
                }
                
                console.log('🤝 Draw by default');
                return 'draw';
            },
            
            // Get battle logic explanation for developer log
            getBattleLogicExplanation(attackerMove, defenderMove, winner) {
                const atkType = attackerMove.moveType.toLowerCase();
                const defType = defenderMove.moveType.toLowerCase();
                
                // Red vs Red
                if (atkType === 'red' && defType === 'red') {
                    return 'Red vs Red = Draw (both miss)';
                }
                
                // Blue protection
                if (atkType === 'blue' || defType === 'blue') {
                    return 'Blue protection active = Draw (no knockout)';
                }
                
                // Gold beats Purple
                if ((atkType === 'gold' && defType === 'purple') || (defType === 'gold' && atkType === 'purple')) {
                    return 'Gold beats Purple (special rule)';
                }
                
                // Purple beats White
                if ((atkType === 'purple' && defType === 'white') || (defType === 'purple' && atkType === 'white')) {
                    return 'Purple beats White (special rule)';
                }
                
                // White vs White
                if (atkType === 'white' && defType === 'white') {
                    const atkDmg = attackerMove.damage || 0;
                    const defDmg = defenderMove.damage || 0;
                    return `White vs White: Compare damage (${atkDmg} vs ${defDmg})`;
                }
                
                // Gold vs Gold
                if (atkType === 'gold' && defType === 'gold') {
                    const atkDmg = attackerMove.damage || 0;
                    const defDmg = defenderMove.damage || 0;
                    return `Gold vs Gold: Compare damage (${atkDmg} vs ${defDmg})`;
                }
                
                // White vs Gold
                if ((atkType === 'white' && defType === 'gold') || (atkType === 'gold' && defType === 'white')) {
                    const atkDmg = attackerMove.damage || 0;
                    const defDmg = defenderMove.damage || 0;
                    return `White vs Gold: Compare damage (${atkDmg} vs ${defDmg})`;
                }
                
                // Purple vs Purple
                if (atkType === 'purple' && defType === 'purple') {
                    const atkStars = attackerMove.stars || 0;
                    const defStars = defenderMove.stars || 0;
                    return `Purple vs Purple: Compare stars (${atkStars}⭐ vs ${defStars}⭐)`;
                }
                
                // Priority comparison
                const priority = { 'blue': 5, 'gold': 4, 'purple': 3, 'white': 2, 'red': 1 };
                const atkPri = priority[atkType] || 0;
                const defPri = priority[defType] || 0;
                return `Priority comparison: ${atkType}(${atkPri}) vs ${defType}(${defPri})`;
            },
            
            // Display floating move name overlay over a wheel
            showMoveFlash(wheelContainerId, moveName, moveType) {
                const wheelContainer = document.getElementById(wheelContainerId);
                if (!wheelContainer) return;
                
                // Get the spinning wheel element
                const spinningWheel = wheelContainer.querySelector('.spinning-wheel');
                if (!spinningWheel) return;
                
                // Get move color
                const moveColor = this.getMoveTypeColor(moveType);
                
                // Create overlay element
                const overlay = document.createElement('div');
                overlay.className = 'move-flash-overlay';
                overlay.dataset.wheelContainer = wheelContainerId;
                
                const textElement = document.createElement('div');
                textElement.className = 'move-flash-text';
                textElement.textContent = moveName;
                textElement.style.color = moveColor;
                textElement.style.borderColor = moveColor;
                
                overlay.appendChild(textElement);
                spinningWheel.appendChild(overlay);
                
                // Store reference for later removal
                return overlay;
            },
            
            // Remove move name overlays
            removeMoveFlashes() {
                const overlays = document.querySelectorAll('.move-flash-overlay');
                overlays.forEach(overlay => {
                    if (overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                });
            },
            
            // ==========================================
            // SPECIAL EFFECT MOVES SYSTEM
            // ==========================================
            
            // Check if a move has a special effect
            hasSpecialEffect(result) {
                const winningMove = result.winner === 'attacker' ? result.attackerMove : result.defenderMove;
                if (!winningMove) return false;
                
                const moveName = winningMove.moveName;
                
                // List of moves with special effects
                const specialEffectMoves = [
                    'Psychic Shove',
                    'Planchette Push',
                    'Annihilate',
                    // Add more special effect moves here as needed
                ];
                
                return specialEffectMoves.includes(moveName);
            },
            
            // Handle special effect moves
            async handleSpecialEffect(move, winnerPointId, loserPointId, result) {
                const moveName = move.moveName;
                
                console.log(`🌟 Handling special effect: ${moveName}`);
                
                switch (moveName) {
                    case 'Psychic Shove':
                    case 'Planchette Push':
                        await this.handlePsychicShove(winnerPointId, loserPointId, result);
                        break;
                    case 'Annihilate':
                        await this.handleAnnihilate(winnerPointId, loserPointId, result);
                        break;
                    default:
                        console.warn(`⚠️ Unknown special effect: ${moveName}`);
                }
            },
            
            // Handle Psychic Shove: Knock opponent back in straight line, chain knockback, apply Wait
            // NOTE: Parameters are already winner/loser (not attacker/defender)
            async handlePsychicShove(winnerPointId, loserPointId, result) {
                // Get loser's name for logging
                const loserName = result.winner === 'attacker' ? result.defender.name : result.attacker.name;
                
                console.log(`🧠 Psychic Shove: ${loserName} at ${loserPointId} knocked back by winner at ${winnerPointId}`);
                
                // Calculate knockback direction (straight line away from winner)
                const knockbackPath = this.calculateKnockbackPath(winnerPointId, loserPointId);
                
                if (knockbackPath.length === 0) {
                    console.log(`⚠️ No valid knockback path - ${loserName} stays in place`);
                    const loserTeam = result.winner === 'attacker' ? result.defender.team : result.attacker.team;
                    this.addToHistory(`${loserName} cannot be knocked back!`, 'battle', loserTeam);
                    return;
                }
                
                // Collect all affected Pokémon (including chain collisions)
                const affectedRobots = await this.executeKnockback(loserPointId, knockbackPath);
                
                // Check if any robots were actually moved
                if (affectedRobots.length === 0) {
                    console.log(`🛑 Psychic Shove FAILED: Path completely blocked - no robots moved`);
                    console.log(`   "As far back as possible" = ZERO distance`);
                    console.log(`   No robots affected → No Wait status applied`);
                    const loserTeam = result.winner === 'attacker' ? result.defender.team : result.attacker.team;
                    this.addToHistory(`${loserName} cannot be knocked back - path blocked!`, 'battle', loserTeam);
                    return;
                }
                
                // Apply Wait status to all affected Pokémon (BOTH TEAMS)
                console.log(`📋 Applying Wait status to ${affectedRobots.length} affected Pokémon:`);
                for (const robotInfo of affectedRobots) {
                    console.log(`  - ${robotInfo.robotName} (${robotInfo.team} team) at ${robotInfo.newPointId}`);
                    this.applyStatusEffect(robotInfo.newPointId, 'waiting');
                    console.log(`⏸️ ${robotInfo.robotName} (${robotInfo.team}) gained Wait status at ${robotInfo.newPointId}`);
                    this.addToHistory(`⏸️ ${robotInfo.robotName} gained Wait status`, 'battle', robotInfo.team);
                }
                
                console.log(`✅ Psychic Shove complete - ${affectedRobots.length} Pokémon affected (including friendly fire!)`);
            },
            
            // Calculate knockback path in straight line away from attacker
            calculateKnockbackPath(fromPointId, targetPointId) {
                const fromPoint = this.getPointById(fromPointId);
                const targetPoint = this.getPointById(targetPointId);
                
                if (!fromPoint || !targetPoint) return [];
                
                // Calculate direction vector (from attacker to target)
                const dx = targetPoint.x - fromPoint.x;
                const dy = targetPoint.y - fromPoint.y;
                
                // Normalize direction
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance === 0) return [];
                
                const dirX = dx / distance;
                const dirY = dy / distance;
                
                console.log(`📐 Knockback direction from ${fromPointId} to ${targetPointId}: (${dirX.toFixed(2)}, ${dirY.toFixed(2)})`);
                
                // Build path by following connections that continue in the knockback direction
                const path = [];
                let currentPointId = targetPointId;
                const visited = new Set([targetPointId]);
                
                // Follow connections up to 10 steps
                for (let step = 0; step < 10; step++) {
                    const currentPoint = this.getPointById(currentPointId);
                    if (!currentPoint || !currentPoint.connections) break;
                    
                    // Find the best connected point that continues in the knockback direction
                    let bestNextPoint = null;
                    let bestScore = -Infinity;
                    
                    for (const connectedId of currentPoint.connections) {
                        if (visited.has(connectedId)) continue;
                        
                        const connectedPoint = this.getPointById(connectedId);
                        if (!connectedPoint) {
                            console.log(`  ⚠️ Could not find point: ${connectedId}`);
                            continue;
                        }
                        
                        // Calculate vector from current to connected point
                        const toConnectedX = connectedPoint.x - currentPoint.x;
                        const toConnectedY = connectedPoint.y - currentPoint.y;
                        
                        // Dot product: how well does this connection align with knockback direction?
                        const dotProduct = toConnectedX * dirX + toConnectedY * dirY;
                        
                        console.log(`    Checking ${connectedId}: dot=${dotProduct.toFixed(2)}`);
                        
                        // Only consider points that continue in the knockback direction
                        if (dotProduct > 0 && dotProduct > bestScore) {
                            bestScore = dotProduct;
                            bestNextPoint = { id: connectedId, x: connectedPoint.x, y: connectedPoint.y };
                        }
                    }
                    
                    if (bestNextPoint) {
                        path.push(bestNextPoint);
                        visited.add(bestNextPoint.id);
                        currentPointId = bestNextPoint.id;
                        console.log(`  ➡️ Step ${step + 1}: ${bestNextPoint.id} (score: ${bestScore.toFixed(2)})`);
                    } else {
                        console.log(`  🛑 No more points in knockback direction`);
                        break;
                    }
                }
                
                console.log(`📍 Knockback path from ${targetPointId}:`, path.map(p => p.id));
                return path;
            },
            
            // Execute knockback with chain collisions
            async executeKnockback(startPointId, knockbackPath) {
                const affectedRobots = [];
                
                // Get the initial target robot
                const initialRobotData = this.getPointById(startPointId)?.robot;
                if (!initialRobotData) {
                    console.log(`⚠️ No robot at ${startPointId} to knock back`);
                    return affectedRobots;
                }
                
                // Build a list of ALL robots that need to move (including the initial target)
                // Format: [{pointId, robot, pathIndex}] where pathIndex is position in knockbackPath
                const robotChain = [{
                    pointId: startPointId,
                    robot: initialRobotData,
                    pathIndex: -1  // Initial robot is BEFORE the path
                }];
                
                // Scan the knockback path for robots in the way
                for (let i = 0; i < knockbackPath.length; i++) {
                    const pathPoint = this.getPointById(knockbackPath[i].id);
                    if (pathPoint.robot) {
                        robotChain.push({
                            pointId: knockbackPath[i].id,
                            robot: pathPoint.robot,
                            pathIndex: i
                        });
                    }
                }
                
                console.log(`🔗 Chain of ${robotChain.length} robots to move`);
                
                // CRITICAL: Check if there's ANY empty space in the path
                // If the entire path is blocked, NO robots can move (Immovable Object scenario)
                let hasEmptySpace = false;
                for (let i = 0; i < knockbackPath.length; i++) {
                    const pathPoint = this.getPointById(knockbackPath[i].id);
                    if (!pathPoint.robot) {
                        hasEmptySpace = true;
                        break;
                    }
                }
                
                if (!hasEmptySpace) {
                    console.log(`🛑 IMMOVABLE OBJECT: Entire knockback path is blocked - no robots can move`);
                    console.log(`   Path checked: ${knockbackPath.map(p => p.id).join(' → ')}`);
                    console.log(`   All spaces occupied - "as far back as possible" = ZERO distance`);
                    console.log(`   ❌ Psychic Shove effect FAILS - no robots affected, no Wait applied`);
                    return affectedRobots; // Return empty array
                }
                
                // Move robots from BACK TO FRONT (farthest first)
                // Each robot moves as far as possible along the path
                for (let i = robotChain.length - 1; i >= 0; i--) {
                    const robotInfo = robotChain[i];
                    const robotData = RobotDatabase.getRobot(robotInfo.robot.id);
                    const robotName = robotData?.name || robotInfo.robot.id;
                    
                    // Find the farthest available space for this robot
                    // Search from the robot's current position in the path
                    let targetPointId = null;
                    let searchStartIndex = robotInfo.pathIndex + 1;
                    
                    // Scan the path to find the farthest empty space
                    for (let j = searchStartIndex; j < knockbackPath.length; j++) {
                        const checkPoint = this.getPointById(knockbackPath[j].id);
                        if (!checkPoint.robot) {
                            // Found an empty space - keep searching for farther ones
                            targetPointId = knockbackPath[j].id;
                        } else {
                            // Hit an occupied space - stop searching
                            break;
                        }
                    }
                    
                    if (!targetPointId) {
                        console.log(`⚠️ No space for ${robotName} - staying at ${robotInfo.pointId}`);
                        continue;
                    }
                    
                    // Move the robot
                    const success = await this.moveRobotForKnockback(robotInfo.pointId, targetPointId);
                    if (success) {
                        affectedRobots.push({
                            robotId: robotInfo.robot.id,
                            robotName: robotName,
                            team: robotInfo.robot.team,
                            oldPointId: robotInfo.pointId,
                            newPointId: targetPointId
                        });
                        console.log(`💨 ${robotName} (${robotInfo.robot.team}) knocked back from ${robotInfo.pointId} to ${targetPointId}`);
                    }
                }
                
                return affectedRobots;
            },
            
            // Handle Annihilate: Move robot 2 steps away (self-displacement)
            // Can trigger on win OR draw (Annihilate is Blue, so always draws)
            async handleAnnihilate(robotPointId, opponentPointId, result) {
                // Determine which robot spun Annihilate
                // If called from draw handler, we need to check which robot is at robotPointId
                const robotAtPoint = this.getPointById(robotPointId)?.robot;
                if (!robotAtPoint) {
                    console.error(`❌ No robot at ${robotPointId} for Annihilate effect`);
                    // End turn even if effect failed
                    this.endPlayerTurn();
                    return;
                }
                
                const robotName = robotAtPoint.name;
                const robotTeam = robotAtPoint.team;
                
                console.log(`🌀 Annihilate: ${robotName} at ${robotPointId} repositioning 2 steps away`);
                
                // Phase 2: Find all valid 2-step destinations
                const validDestinations = this.findTwoStepPaths(robotPointId);
                
                // Phase 3: Handle different cases
                if (validDestinations.length === 0) {
                    // Case A: No valid moves
                    console.log(`⚠️ Annihilate FAILED: No valid 2-step paths found`);
                    this.addToHistory(`${robotName} cannot reposition - no clear paths!`, 'battle', robotTeam);
                    // End turn after failed effect
                    this.endPlayerTurn();
                    return;
                } else if (validDestinations.length === 1) {
                    // Case B: One valid move - auto-execute
                    const destination = validDestinations[0];
                    console.log(`✅ Annihilate: Auto-moving to ${destination.pointId} (only valid path)`);
                    await this.executeAnnihilateMovement(robotPointId, destination, robotName, robotTeam);
                    // End turn after repositioning
                    this.endPlayerTurn();
                } else {
                    // Case C: Multiple valid moves - player choice required
                    console.log(`🎯 Annihilate: ${validDestinations.length} valid destinations - awaiting player choice`);
                    await this.promptAnnihilateDestination(robotPointId, validDestinations, robotName, robotTeam);
                    // End turn after player choice and repositioning
                    this.endPlayerTurn();
                }
            },
            
            // Find all valid 2-step paths from a starting point
            // Returns array of {pointId, path: [start, intermediate, destination]}
            findTwoStepPaths(startPointId) {
                console.log(`🔍 Searching for valid 2-step paths from ${startPointId}...`);
                
                const validDestinations = [];
                const startPoint = this.getPointById(startPointId);
                
                if (!startPoint || !startPoint.connections) {
                    console.log(`⚠️ Start point ${startPointId} has no connections`);
                    return validDestinations;
                }
                
                // Step 1: Check all adjacent points (intermediate points)
                for (const intermediateId of startPoint.connections) {
                    const intermediatePoint = this.getPointById(intermediateId);
                    
                    if (!intermediatePoint) continue;
                    
                    // Intermediate point must be EMPTY
                    if (intermediatePoint.robot) {
                        console.log(`  ❌ ${intermediateId} is occupied (intermediate) - path blocked`);
                        continue;
                    }
                    
                    // Step 2: From intermediate, check all connections (final destinations)
                    if (!intermediatePoint.connections) continue;
                    
                    for (const destinationId of intermediatePoint.connections) {
                        // Don't go back to start
                        if (destinationId === startPointId) continue;
                        
                        const destinationPoint = this.getPointById(destinationId);
                        
                        if (!destinationPoint) continue;
                        
                        // Destination must be EMPTY
                        if (destinationPoint.robot) {
                            console.log(`  ❌ ${destinationId} is occupied (destination) - path blocked`);
                            continue;
                        }
                        
                        // Valid 2-step path found!
                        const path = [startPointId, intermediateId, destinationId];
                        validDestinations.push({
                            pointId: destinationId,
                            path: path
                        });
                        console.log(`  ✅ Valid path: ${path.join(' → ')}`);
                    }
                }
                
                console.log(`📊 Found ${validDestinations.length} valid 2-step destinations`);
                return validDestinations;
            },
            
            // Execute Annihilate movement (single destination, no choice needed)
            async executeAnnihilateMovement(fromPointId, destination, robotName, robotTeam) {
                console.log(`🎬 Executing Annihilate movement: ${fromPointId} → ${destination.pointId}`);
                console.log(`   Path: ${destination.path.join(' → ')}`);
                
                // Get robot data
                const fromPoint = this.getPointById(fromPointId);
                const robotData = fromPoint.robot;
                
                if (!robotData) {
                    console.error(`❌ No robot at ${fromPointId}`);
                    return;
                }
                
                // Get robot visual element
                const robotGroup = document.querySelector(`[data-robot-id="${robotData.id}"]`);
                if (!robotGroup) {
                    console.error(`❌ Robot visual not found for ${robotData.id}`);
                    return;
                }
                
                // Phase 4: Animate movement along the path
                await this.animateAlongPath(robotGroup, destination.path, fromPointId, destination.pointId);
                
                // Move robot data
                const toPoint = this.getPointById(destination.pointId);
                toPoint.robot = robotData;
                fromPoint.robot = null;
                
                console.log(`✅ Annihilate complete: ${robotName} repositioned to ${destination.pointId}`);
                this.addToHistory(`🌀 ${robotName} repositioned 2 steps away`, 'battle', robotTeam);
            },
            
            // Prompt player to choose Annihilate destination (multiple valid paths)
            async promptAnnihilateDestination(fromPointId, validDestinations, robotName, robotTeam) {
                console.log(`🎯 Prompting player to choose Annihilate destination...`);
                
                // Highlight all valid destinations (same as normal movement)
                validDestinations.forEach(dest => {
                    const pointEl = document.getElementById(dest.pointId);
                    if (pointEl) {
                        pointEl.classList.add('valid-move', 'annihilate-destination');
                        
                        // Activate movable space image for standard points (same as normal movement)
                        if (pointEl.classList.contains('standard-point')) {
                            const movableImage = document.querySelector(`.movable-space-image[data-point="${dest.pointId}"]`);
                            if (movableImage) {
                                movableImage.classList.add('active');
                                console.log(`  🎨 Highlighted ${dest.pointId} with movable image`);
                            }
                        } else {
                            console.log(`  🎨 Highlighted ${dest.pointId}`);
                        }
                    }
                });
                
                // Show instruction
                this.addToHistory(`🌀 Choose where ${robotName} repositions (2 steps)`, 'battle', robotTeam);
                
                // Wait for player to click a valid destination
                return new Promise((resolve) => {
                    let isProcessing = false; // Prevent multiple triggers
                    
                    const clickHandler = async (event) => {
                        // Prevent multiple executions
                        if (isProcessing) return;
                        
                        // Find which point was clicked - handle both direct point clicks AND movable image clicks
                        let clickedPointId = null;
                        
                        // Check if clicked on a movable space image
                        const movableImage = event.target.closest('.movable-space-image');
                        if (movableImage) {
                            clickedPointId = movableImage.dataset.point;
                            console.log(`🌀 Annihilate: Clicked movable image for ${clickedPointId}`);
                        } else {
                            // Check if clicked on a point directly
                            const pointElement = event.target.closest('.point');
                            if (pointElement) {
                                clickedPointId = pointElement.id;
                                console.log(`🌀 Annihilate: Clicked point element ${clickedPointId}`);
                            }
                        }
                        
                        if (!clickedPointId) {
                            console.log(`🌀 Annihilate: Click not on a point, ignoring`);
                            return;
                        }
                        
                        // Check if clicked point is a valid destination
                        const selectedDestination = validDestinations.find(d => d.pointId === clickedPointId);
                        
                        if (selectedDestination) {
                            // STOP PROPAGATION to prevent other handlers from interfering
                            event.stopPropagation();
                            event.preventDefault();
                            
                            isProcessing = true; // Lock to prevent re-entry
                            console.log(`✅ Annihilate: Player selected ${clickedPointId} - stopping propagation`);
                            
                            // Remove click listener FIRST to prevent duplicate calls (use capture phase)
                            document.removeEventListener('click', clickHandler, true);
                            
                            // Remove highlights (same as normal movement)
                            validDestinations.forEach(dest => {
                                const pointEl = document.getElementById(dest.pointId);
                                if (pointEl) {
                                    pointEl.classList.remove('valid-move', 'annihilate-destination');
                                    
                                    // Deactivate movable space image
                                    if (pointEl.classList.contains('standard-point')) {
                                        const movableImage = document.querySelector(`.movable-space-image[data-point="${dest.pointId}"]`);
                                        if (movableImage) {
                                            movableImage.classList.remove('active');
                                        }
                                    }
                                }
                            });
                            
                            // Execute movement
                            await this.executeAnnihilateMovement(fromPointId, selectedDestination, robotName, robotTeam);
                            resolve();
                        } else {
                            console.log(`🌀 Annihilate: ${clickedPointId} not a valid destination, ignoring`);
                        }
                    };
                    
                    // Add click listener to document with CAPTURE PHASE (runs before other handlers)
                    console.log(`🌀 Annihilate: Installing capture-phase click handler`);
                    document.addEventListener('click', clickHandler, true);
                });
            },
            
            // Get all board points with coordinates
            getAllBoardPoints() {
                const points = [];
                
                // Helper to add points with coordinates
                const addPoints = (pointsObj) => {
                    for (const [id, data] of Object.entries(pointsObj)) {
                        const element = document.getElementById(id);
                        if (element) {
                            const rect = element.getBoundingClientRect();
                            points.push({
                                id: id,
                                x: rect.left + rect.width / 2,
                                y: rect.top + rect.height / 2,
                                data: data
                            });
                        }
                    }
                };
                
                addPoints(this.gameBoard.entryPoints);
                addPoints(this.gameBoard.routePoints);
                addPoints(this.gameBoard.innerPoints);
                addPoints(this.gameBoard.goalPoints);
                
                return points;
            },
            
            // Move robot for knockback (simpler version for special effects)
            async moveRobotForKnockback(fromPointId, toPointId) {
                const fromPoint = this.getPointById(fromPointId);
                const toPoint = this.getPointById(toPointId);
                
                if (!fromPoint || !toPoint || !fromPoint.robot) {
                    console.error(`❌ Invalid knockback move: ${fromPointId} → ${toPointId}`);
                    return false;
                }
                
                if (toPoint.robot) {
                    console.error(`❌ Destination occupied: ${toPointId}`);
                    return false;
                }
                
                const robotData = fromPoint.robot;
                const robotId = robotData.id;
                
                console.log(`💨 Knockback: Moving ${robotData.name} from ${fromPointId} to ${toPointId}`);
                
                // Animate the visual robot
                await this.moveRobotVisual(fromPointId, toPointId);
                
                // Update data in gameBoard
                if (this.gameBoard.entryPoints[fromPointId]) {
                    this.gameBoard.entryPoints[fromPointId].robot = null;
                } else if (this.gameBoard.routePoints[fromPointId]) {
                    this.gameBoard.routePoints[fromPointId].robot = null;
                } else if (this.gameBoard.innerPoints[fromPointId]) {
                    this.gameBoard.innerPoints[fromPointId].robot = null;
                } else if (this.gameBoard.goalPoints[fromPointId]) {
                    this.gameBoard.goalPoints[fromPointId].robot = null;
                }
                
                if (this.gameBoard.entryPoints[toPointId]) {
                    this.gameBoard.entryPoints[toPointId].robot = robotData;
                } else if (this.gameBoard.routePoints[toPointId]) {
                    this.gameBoard.routePoints[toPointId].robot = robotData;
                } else if (this.gameBoard.innerPoints[toPointId]) {
                    this.gameBoard.innerPoints[toPointId].robot = robotData;
                } else if (this.gameBoard.goalPoints[toPointId]) {
                    this.gameBoard.goalPoints[toPointId].robot = robotData;
                }
                
                // Update DOM attributes
                const fromElement = document.getElementById(fromPointId);
                if (fromElement) {
                    fromElement.setAttribute('data-occupied', 'false');
                    fromElement.setAttribute('data-team', 'neutral');
                }
                
                const toElement = document.getElementById(toPointId);
                if (toElement) {
                    toElement.setAttribute('data-occupied', 'true');
                    toElement.setAttribute('data-team', robotData.team);
                }
                
                console.log(`✅ Knockback complete: ${robotData.name} moved to ${toPointId}`);
                return true;
            },
            
            // Get move type color for styling text
            getMoveTypeColor(moveType) {
                const colors = {
                    'white': '#ffffff',
                    'gold': '#ffd700',
                    'purple': '#b19cd9',
                    'blue': '#4a9eff',
                    'red': '#ff6b6b',
                    'special': '#ff00ff',  // Magenta for special effects like "BONUS SPIN!"
                    'boost': '#00ff00'     // Bright green for damage boosts like "+50 DAMAGE!"
                };
                return colors[moveType.toLowerCase()] || '#ffffff';
            },
            
            // Format move name with color styling
            formatColoredMoveName(moveName, moveType) {
                const color = this.getMoveTypeColor(moveType);
                return `<span style="color: ${color}; font-weight: bold;">${moveName}</span>`;
            },
            
            // Get user-friendly battle explanation for result screen
            getUserFriendlyBattleExplanation(winnerMove, loserMove, winner) {
                const winType = winnerMove.moveType.toLowerCase();
                const loseType = loserMove.moveType.toLowerCase();
                
                // Gold beats Purple (special rule)
                if (winType === 'gold' && loseType === 'purple') {
                    return 'due to Gold moves beating Purple moves';
                }
                
                // Purple beats White (special rule)
                if (winType === 'purple' && loseType === 'white') {
                    return 'due to Purple moves beating White moves';
                }
                
                // White vs White - higher damage wins
                if (winType === 'white' && loseType === 'white') {
                    const winDmg = winnerMove.damage || 0;
                    const loseDmg = loserMove.damage || 0;
                    if (winDmg > loseDmg) {
                        return 'due to higher damage';
                    }
                }
                
                // Gold vs Gold - higher damage wins
                if (winType === 'gold' && loseType === 'gold') {
                    const winDmg = winnerMove.damage || 0;
                    const loseDmg = loserMove.damage || 0;
                    if (winDmg > loseDmg) {
                        return 'due to higher damage';
                    }
                }
                
                // White vs Gold - higher damage wins
                if ((winType === 'white' && loseType === 'gold') || (winType === 'gold' && loseType === 'white')) {
                    const winDmg = winnerMove.damage || 0;
                    const loseDmg = loserMove.damage || 0;
                    if (winDmg > loseDmg) {
                        return 'due to higher damage';
                    }
                }
                
                // Purple vs Purple - higher stars wins
                if (winType === 'purple' && loseType === 'purple') {
                    const winStars = winnerMove.stars || 0;
                    const loseStars = loserMove.stars || 0;
                    if (winStars > loseStars) {
                        return 'due to more stars';
                    }
                }
                
                // White vs Purple - Purple wins by type advantage
                if (winType === 'purple' && loseType === 'white') {
                    return 'due to Purple moves beating White moves';
                }
                
                // Gold vs Purple - Gold wins by type advantage
                if (winType === 'gold' && loseType === 'purple') {
                    return 'due to Gold moves beating Purple moves';
                }
                
                // White vs Red - White wins by priority
                if (winType === 'white' && loseType === 'red') {
                    return 'due to White moves beating Miss';
                }
                
                // Gold vs Red - Gold wins by priority
                if (winType === 'gold' && loseType === 'red') {
                    return 'due to Gold moves beating Miss';
                }
                
                // Gold vs White - if same damage, no explanation needed
                // Purple vs White - Purple wins by type
                // Any other case - return empty (no explanation needed)
                return '';
            },
            
            // Check if a winning move is a status effect (Purple move)
            isStatusEffectMove(result) {
                if (result.winner === 'attacker') {
                    return result.attackerMove.moveType.toLowerCase() === 'purple';
                } else if (result.winner === 'defender') {
                    return result.defenderMove.moveType.toLowerCase() === 'purple';
                }
                return false;
            },
            
            // Extract status type from move name or effect
            getStatusFromMove(move) {
                const moveName = move.moveName.toLowerCase();
                const effect = (move.effect || '').toLowerCase();
                
                // Check move name first (return standardized status names)
                if (moveName.includes('poison powder') || moveName.includes('toxic')) {
                    return 'poison';
                }
                if (moveName.includes('sleep powder') || moveName.includes('hypnosis') || moveName.includes('sleep')) {
                    return 'sleep';
                }
                if (moveName.includes('paralyze') || moveName.includes('stun') || moveName.includes('thunder wave')) {
                    return 'paralysis';
                }
                if (moveName.includes('burn') || moveName.includes('flame') || moveName.includes('scorch')) {
                    return 'burn';
                }
                if (moveName.includes('confuse') || moveName.includes('confusion')) {
                    return 'confusion';
                }
                if (moveName.includes('freeze') || moveName.includes('frozen')) {
                    return 'frozen';
                }
                if (moveName.includes('noxious')) {
                    return 'noxious';
                }
                
                // Check effect description (return standardized status names)
                if (effect.includes('noxious')) return 'noxious';
                if (effect.includes('poison')) return 'poison';
                if (effect.includes('sleep') || effect.includes('asleep')) return 'sleep';
                if (effect.includes('paralyz')) return 'paralysis';
                if (effect.includes('burn')) return 'burn';
                if (effect.includes('confus')) return 'confusion';
                if (effect.includes('freeze') || effect.includes('frozen')) return 'frozen';
                if (effect.includes('wait')) return 'waiting';
                
                // Generic status if we can't determine (fallback, shouldn't be used)
                return null;
            },
            
            // Apply status effect to a robot (battle system wrapper)
            applyStatusEffect(pointId, status) {
                const pointData = this.getPointById(pointId);
                if (!pointData || !pointData.robot) return false;
                
                const robotId = pointData.robot.id;
                
                // Use centralized status effect system
                const wasApplied = this.addStatusEffect(robotId, status);
                
                const robotData = RobotDatabase.getRobot(robotId);
                if (wasApplied) {
                    console.log(`✨ Applied ${status} to ${robotData?.name || robotId} at ${pointId}`);
                } else {
                    console.log(`⚠️ Failed to apply ${status} to ${robotData?.name || robotId} at ${pointId}`);
                }
                
                // Developer Log: Status Effect
                const statusDef = this.statusEffectDefinitions[status];
                this.addDeveloperLog('STATUS_EFFECT', {
                    robotId: robotId,
                    robotName: robotData?.name || robotId,
                    team: pointData.robot.team,
                    location: pointId,
                    status: status,
                    statusName: statusDef?.name || status,
                    effect: statusDef?.effect || 'Unknown',
                    wasApplied: wasApplied,
                    currentStatuses: this.getRobotStatuses(robotId)
                });
                
                // Update visual indicators
                this.updateRobotStatusIndicators(pointId, robotId);
                this.updateRobotStatusDisplay(pointId);
                
                return wasApplied;
            },
            
            // Update visual display of robot status
            updateRobotStatusDisplay(pointId) {
                const pointData = this.getPointById(pointId);
                if (!pointData || !pointData.robot) return;
                
                const element = document.querySelector(`[data-point-id="${pointId}"]`);
                if (!element) return;
                
                // Remove existing status indicator
                const existingStatus = element.querySelector('.status-indicator-svg');
                if (existingStatus) {
                    existingStatus.remove();
                }
                
                // Display all active statuses
                if (pointData.robot.statusConditions && pointData.robot.statusConditions.length > 0) {
                    const statusIcons = {
                        'poisoned': '🟣',
                        'asleep': '💤',
                        'paralyzed': '⚡',
                        'burned': '🔥',
                        'confused': '😵',
                        'frozen': '❄️'
                    };
                    
                    const statusText = pointData.robot.statusConditions
                        .map(s => statusIcons[s] || '✨')
                        .join('');
                    
                    // Create SVG text element for status
                    const svgNS = "http://www.w3.org/2000/svg";
                    const statusGroup = document.createElementNS(svgNS, 'g');
                    statusGroup.setAttribute('class', 'status-indicator-svg');
                    
                    // Background circle
                    const bgCircle = document.createElementNS(svgNS, 'circle');
                    bgCircle.setAttribute('cx', '40');
                    bgCircle.setAttribute('cy', '10');
                    bgCircle.setAttribute('r', '12');
                    bgCircle.setAttribute('fill', 'rgba(0, 0, 0, 0.8)');
                    bgCircle.setAttribute('stroke', 'rgba(255, 255, 255, 0.5)');
                    bgCircle.setAttribute('stroke-width', '1');
                    statusGroup.appendChild(bgCircle);
                    
                    // Status text
                    const textEl = document.createElementNS(svgNS, 'text');
                    textEl.setAttribute('x', '40');
                    textEl.setAttribute('y', '10');
                    textEl.setAttribute('text-anchor', 'middle');
                    textEl.setAttribute('dominant-baseline', 'central');
                    textEl.setAttribute('font-size', '16');
                    textEl.textContent = statusText;
                    statusGroup.appendChild(textEl);
                    
                    element.appendChild(statusGroup);
                }
            },
            
            // Display battle result
            displayBattleResult(result) {
                const resultDiv = document.getElementById('battleResult');
                const titleDiv = document.getElementById('battleResultTitle');
                const detailsDiv = document.getElementById('battleResultDetails');
                
                let title = '';
                let details = '';
                let titleClass = '';
                
                const attackerTeam = this.currentBattle.attackerTeam;
                const defenderTeam = this.currentBattle.defenderTeam;
                const attackerPointId = this.currentBattle.attackerPointId;
                const defenderPointId = this.currentBattle.defenderPointId;
                
                // Determine if this is a status effect or knockout
                const isStatusEffect = this.isStatusEffectMove(result);
                
                if (result.winner === 'attacker') {
                    if (isStatusEffect) {
                        const status = this.getStatusFromMove(result.attackerMove);
                        const statusDisplay = this.statusEffectDefinitions[status]?.name || status;
                        const statusDef = this.statusEffectDefinitions[status];
                        
                        // Check if status can be applied (for poison/noxious interaction)
                        const defenderRobotId = this.getPointById(defenderPointId)?.robot?.id;
                        let canApply = true;
                        
                        if (defenderRobotId && status === 'poison' && this.hasStatusEffect(defenderRobotId, 'noxious')) {
                            canApply = false;
                        }
                        
                        if (canApply) {
                            title = '✨ Status Effect!';
                            titleClass = 'status';
                            
                            // Build detailed message with effect description
                            let effectDesc = '';
                            if (statusDef?.damageReduction) {
                                effectDesc = `<br><em style="color: #ff9999; font-size: 0.9em;">→ Attacks will deal -${statusDef.damageReduction} damage</em>`;
                            } else if (statusDef?.description) {
                                effectDesc = `<br><em style="color: #ff9999; font-size: 0.9em;">→ ${statusDef.description}</em>`;
                            }
                            
                            // Format move names with colors
                            const attackerColoredMove = this.formatColoredMoveName(result.attackerMove.moveName, result.attackerMove.moveType);
                            const defenderColoredMove = this.formatColoredMoveName(result.defenderMove.moveName, result.defenderMove.moveType);
                            
                            details = `${result.attacker.name}'s ${attackerColoredMove} vs ${result.defender.name}'s ${defenderColoredMove}<br><strong style="color: #ffd93d;">${result.defender.name} is now ${statusDisplay}!</strong>${effectDesc}`;
                            this.addToHistory(`✨ ${result.defender.name} is now ${statusDisplay}!`, 'battle', defenderTeam);
                        } else {
                            title = '⚠️ Ineffective!';
                            titleClass = 'status';
                            
                            // Format move names with colors
                            const attackerColoredMove = this.formatColoredMoveName(result.attackerMove.moveName, result.attackerMove.moveType);
                            const defenderColoredMove = this.formatColoredMoveName(result.defenderMove.moveName, result.defenderMove.moveType);
                            
                            details = `${result.attacker.name}'s ${attackerColoredMove} vs ${result.defender.name}'s ${defenderColoredMove}<br><strong style="color: #ff9999;">Status effect blocked!</strong><br><em style="color: #ffcc99; font-size: 0.9em;">→ ${result.defender.name} is already Noxious (stronger effect)</em>`;
                            this.addToHistory(`⚠️ ${result.defender.name} resisted ${statusDisplay} (already Noxious)`, 'battle', defenderTeam);
                        }
                    } else {
                        title = '🎉 Victory!';
                        titleClass = 'victory';
                        
                        // Build detailed message with damage values
                        const attackerDamage = result.attackerMove.damage || 0;
                        const defenderDamage = result.defenderMove.damage || 0;
                        const defenderMoveName = result.defenderMove.moveName;
                        
                        // Get explanation for why the battle was won
                        const explanation = this.getUserFriendlyBattleExplanation(result.attackerMove, result.defenderMove, 'attacker');
                        const explanationText = explanation ? ` ${explanation}` : '';
                        
                        // Format move names with colors
                        const attackerColoredMove = this.formatColoredMoveName(result.attackerMove.moveName, result.attackerMove.moveType);
                        const defenderColoredMove = this.formatColoredMoveName(defenderMoveName, result.defenderMove.moveType);
                        
                        details = `${result.attacker.name}'s ${attackerColoredMove} (${attackerDamage}) defeated ${result.defender.name}'s ${defenderColoredMove} (${defenderDamage})!${explanationText}`;
                        this.addToHistory(`🎉 ${result.attacker.name} wins the battle!`, 'battle', attackerTeam);
                    }
                } else if (result.winner === 'defender') {
                    if (isStatusEffect) {
                        const status = this.getStatusFromMove(result.defenderMove);
                        const statusDisplay = this.statusEffectDefinitions[status]?.name || status;
                        const statusDef = this.statusEffectDefinitions[status];
                        
                        // Check if status can be applied (for poison/noxious interaction)
                        const attackerRobotId = this.getPointById(attackerPointId)?.robot?.id;
                        let canApply = true;
                        
                        if (attackerRobotId && status === 'poison' && this.hasStatusEffect(attackerRobotId, 'noxious')) {
                            canApply = false;
                        }
                        
                        if (canApply) {
                            title = '✨ Status Effect!';
                            titleClass = 'status';
                            
                            // Build detailed message with effect description
                            let effectDesc = '';
                            if (statusDef?.damageReduction) {
                                effectDesc = `<br><em style="color: #ff9999; font-size: 0.9em;">→ Attacks will deal -${statusDef.damageReduction} damage</em>`;
                            } else if (statusDef?.description) {
                                effectDesc = `<br><em style="color: #ff9999; font-size: 0.9em;">→ ${statusDef.description}</em>`;
                            }
                            
                            // Format move names with colors
                            const attackerColoredMove = this.formatColoredMoveName(result.attackerMove.moveName, result.attackerMove.moveType);
                            const defenderColoredMove = this.formatColoredMoveName(result.defenderMove.moveName, result.defenderMove.moveType);
                            
                            details = `${result.attacker.name}'s ${attackerColoredMove} vs ${result.defender.name}'s ${defenderColoredMove}<br><strong style="color: #ffd93d;">${result.attacker.name} is now ${statusDisplay}!</strong>${effectDesc}`;
                            this.addToHistory(`✨ ${result.attacker.name} is now ${statusDisplay}!`, 'battle', attackerTeam);
                        } else {
                            title = '⚠️ Ineffective!';
                            titleClass = 'status';
                            
                            // Format move names with colors
                            const attackerColoredMove = this.formatColoredMoveName(result.attackerMove.moveName, result.attackerMove.moveType);
                            const defenderColoredMove = this.formatColoredMoveName(result.defenderMove.moveName, result.defenderMove.moveType);
                            
                            details = `${result.attacker.name}'s ${attackerColoredMove} vs ${result.defender.name}'s ${defenderColoredMove}<br><strong style="color: #ff9999;">Status effect blocked!</strong><br><em style="color: #ffcc99; font-size: 0.9em;">→ ${result.attacker.name} is already Noxious (stronger effect)</em>`;
                            this.addToHistory(`⚠️ ${result.attacker.name} resisted ${statusDisplay} (already Noxious)`, 'battle', attackerTeam);
                        }
                    } else {
                        title = '💥 Defeated!';
                        titleClass = 'defeat';
                        
                        // Build detailed message with damage values
                        const defenderDamage = result.defenderMove.damage || 0;
                        const attackerDamage = result.attackerMove.damage || 0;
                        const attackerMoveName = result.attackerMove.moveName;
                        
                        // Get explanation for why the battle was won
                        const explanation = this.getUserFriendlyBattleExplanation(result.defenderMove, result.attackerMove, 'defender');
                        const explanationText = explanation ? ` ${explanation}` : '';
                        
                        // Format move names with colors
                        const defenderColoredMove = this.formatColoredMoveName(result.defenderMove.moveName, result.defenderMove.moveType);
                        const attackerColoredMove = this.formatColoredMoveName(attackerMoveName, result.attackerMove.moveType);
                        
                        details = `${result.defender.name}'s ${defenderColoredMove} (${defenderDamage}) defeated ${result.attacker.name}'s ${attackerColoredMove} (${attackerDamage})!${explanationText}`;
                        this.addToHistory(`🎉 ${result.defender.name} wins the battle!`, 'battle', defenderTeam);
                    }
                } else {
                    title = '🤝 Draw!';
                    titleClass = 'draw';
                    
                    // Format move names with colors
                    const attackerColoredMove = this.formatColoredMoveName(result.attackerMove.moveName, result.attackerMove.moveType);
                    const defenderColoredMove = this.formatColoredMoveName(result.defenderMove.moveName, result.defenderMove.moveType);
                    
                    details = `Both robots spun ${attackerColoredMove} vs ${defenderColoredMove} - No winner!`;
                    this.addToHistory(`🤝 Battle ended in a draw!`, 'battle', null);
                }
                
                titleDiv.textContent = title;
                titleDiv.className = `battle-result-title ${titleClass}`;
                detailsDiv.innerHTML = details;
                
                resultDiv.classList.add('active');
                
                // Store result for processing
                this.currentBattle.result = result;
            },
            
            // Close battle result and apply consequences
            async closeBattleResult() {
                if (!this.currentBattle || !this.currentBattle.result) return;
                
                const { result, attackerPointId, defenderPointId, attackerTeam, defenderTeam } = this.currentBattle;
                
                // Check if this is a status effect move
                const isStatusEffect = this.isStatusEffectMove(result);
                
                // Check if this is a special effect move (like Psychic Shove)
                const hasSpecialEffect = this.hasSpecialEffect(result);
                
                // Apply battle consequences
                if (result.winner === 'attacker') {
                    if (hasSpecialEffect) {
                        // Handle special effect moves
                        await this.handleSpecialEffect(result.attackerMove, attackerPointId, defenderPointId, result);
                    } else if (isStatusEffect) {
                        // Apply status effect to defender
                        const status = this.getStatusFromMove(result.attackerMove);
                        const statusDisplay = this.statusEffectDefinitions[status]?.name || status;
                        const wasApplied = this.applyStatusEffect(defenderPointId, status);
                        
                        if (wasApplied) {
                            console.log(`✨ ${result.defender.name} was inflicted with ${statusDisplay}!`);
                            this.addToHistory(`✨ ${result.defender.name} is now ${statusDisplay}`, 'battle', defenderTeam);
                        } else {
                            console.log(`⚠️ ${result.defender.name} resisted ${statusDisplay}!`);
                            this.addToHistory(`⚠️ ${result.defender.name} resisted ${statusDisplay}`, 'battle', defenderTeam);
                        }
                    } else {
                        // Defender is knocked out
                        this.knockOutRobot(defenderPointId);
                        console.log(`💀 ${result.defender.name} was knocked out!`);
                        this.addToHistory(`💀 ${result.defender.name} knocked out at ${defenderPointId}`, 'battle', defenderTeam);
                    }
                } else if (result.winner === 'defender') {
                    if (hasSpecialEffect) {
                        // Handle special effect moves
                        await this.handleSpecialEffect(result.defenderMove, defenderPointId, attackerPointId, result);
                    } else if (isStatusEffect) {
                        // Apply status effect to attacker
                        const status = this.getStatusFromMove(result.defenderMove);
                        const statusDisplay = this.statusEffectDefinitions[status]?.name || status;
                        const wasApplied = this.applyStatusEffect(attackerPointId, status);
                        
                        if (wasApplied) {
                            console.log(`✨ ${result.attacker.name} was inflicted with ${statusDisplay}!`);
                            this.addToHistory(`✨ ${result.attacker.name} is now ${statusDisplay}`, 'battle', attackerTeam);
                        } else {
                            console.log(`⚠️ ${result.attacker.name} resisted ${statusDisplay}!`);
                            this.addToHistory(`⚠️ ${result.attacker.name} resisted ${statusDisplay}`, 'battle', attackerTeam);
                        }
                    } else {
                        // Attacker is knocked out
                        this.knockOutRobot(attackerPointId);
                        console.log(`💀 ${result.attacker.name} was knocked out!`);
                        this.addToHistory(`💀 ${result.attacker.name} knocked out at ${attackerPointId}`, 'battle', attackerTeam);
                    }
                } else {
                    // Draw - check for special effects that trigger even on draws (like Annihilate)
                    // Store info to handle AFTER modal closes
                    this.pendingAnnihilate = null;
                    
                    // Check attacker's move
                    if (result.attackerMove.moveName === 'Annihilate') {
                        console.log(`🌀 Draw, but attacker spun Annihilate - will trigger after modal closes`);
                        this.pendingAnnihilate = {
                            robotPointId: attackerPointId,
                            opponentPointId: defenderPointId,
                            result: result
                        };
                    }
                    
                    // Check defender's move
                    if (result.defenderMove.moveName === 'Annihilate') {
                        console.log(`🌀 Draw, but defender spun Annihilate - will trigger after modal closes`);
                        this.pendingAnnihilate = {
                            robotPointId: defenderPointId,
                            opponentPointId: attackerPointId,
                            result: result
                        };
                    }
                    
                    this.addToHistory(`Both robots remain on the board`, 'info', null);
                }
                // If draw, both robots stay
                
                // Close modal
                document.getElementById('battleOverlay').classList.remove('active');
                document.querySelector('.battle-action-buttons').style.display = 'flex';
                
                // Clear battle data (but keep pendingAnnihilate)
                this.currentBattle = null;
                
                // Clear debugger selections for next battle
                this.clearDebuggerSelections();
                
                console.log('✅ Battle resolved');
                
                // Handle pending Annihilate effect (after modal is closed)
                if (this.pendingAnnihilate) {
                    console.log(`🌀 Processing pending Annihilate effect...`);
                    const annihilateInfo = this.pendingAnnihilate;
                    this.pendingAnnihilate = null; // Clear it immediately to prevent re-triggering
                    
                    // Now trigger the effect AFTER modal is closed
                    await this.handleAnnihilate(
                        annihilateInfo.robotPointId,
                        annihilateInfo.opponentPointId,
                        annihilateInfo.result
                    );
                    
                    // Return early - handleAnnihilate will handle turn ending if needed
                    return;
                }
                
                // CRITICAL: Check for win conditions after battle
                if (this.checkWinConditions(attackerTeam)) {
                    console.log(`🏆 Win condition met after battle!`);
                    return; // Stop processing, game is over
                }
                
                // CHECK FOR WAITWIN: Did this battle eliminate the opponent?
                if (this.checkWaitWin(attackerTeam)) {
                    console.log(`🏆 ${attackerTeam} wins by System Lock after battle!`);
                    return; // Game over - don't end turn
                }
                
                // IMPORTANT: Don't auto-end turn here - let the normal flow handle it
                // For AI: finishAITurn() will be called by performAIMove
                // For Player: Player must click "End Turn" button
                console.log(`✅ Battle resolved - turn will end via normal flow`);
                console.log(`📊 Current state: debugMode=${this.debugMode}, currentControlTeam=${this.currentControlTeam}, gameState=${this.currentState}`);
            },
            
            // ==========================================
            // REPAIR BAY SYSTEM
            // ==========================================
            
            // Knock out a robot (send to Repair Bay)
            knockOutRobot(pointId) {
                const pointData = this.getPointById(pointId);
                if (!pointData || !pointData.robot) return;
                
                const robotId = pointData.robot.id;
                const team = pointData.robot.team;
                
                console.log(`💀 Robot ${robotId} defeated - sending to Repair Bay`);
                
                // Developer Log: Knockout
                const robotData = RobotDatabase.getRobot(robotId);
                this.addDeveloperLog('KNOCKOUT', {
                    robotId: robotId,
                    robotName: robotData?.name || robotId,
                    team: team,
                    location: pointId,
                    action: 'Knocked out - sending to Repair Bay'
                });
                
                // Remove visual robot from board
                this.removeRobotVisual(pointId);
                
                // Remove robot data from point - DIRECTLY in gameBoard
                if (this.gameBoard.entryPoints[pointId]) {
                    delete this.gameBoard.entryPoints[pointId].robot;
                } else if (this.gameBoard.routePoints[pointId]) {
                    delete this.gameBoard.routePoints[pointId].robot;
                } else if (this.gameBoard.innerPoints[pointId]) {
                    delete this.gameBoard.innerPoints[pointId].robot;
                } else if (this.gameBoard.goalPoints[pointId]) {
                    delete this.gameBoard.goalPoints[pointId].robot;
                }
                
                // Send to Repair Bay (handles FIFO queue logic)
                this.sendToRepairBay(robotId, team);
            },
            
            // Send robot to Repair Bay (FIFO queue with 2-slot capacity)
            sendToRepairBay(robotId, team) {
                const repairBay = this.playerZones[team].repairBay;
                
                console.log(`🔧 Sending ${robotId} to ${team} Repair Bay`);
                console.log(`   Current bay status: ${repairBay.length}/2 slots occupied`);
                
                // Add robot to repair bay queue
                const repairEntry = {
                    robotId: robotId,
                    timestamp: Date.now()
                };
                repairBay.push(repairEntry);
                
                // Check if bay is over capacity (3rd robot)
                let overflowOccurred = false;
                let pushedRobotId = null;
                if (repairBay.length > 2) {
                    console.log(`⚠️ Repair Bay overflow! Pushing oldest robot back to bench...`);
                    
                    // Remove oldest robot (first in queue)
                    const pushedRobot = repairBay.shift();
                    pushedRobotId = pushedRobot.robotId;
                    overflowOccurred = true;
                    
                    // Return to bench with "Rebooting: 1" status
                    this.returnToBench(pushedRobot.robotId, team, true);
                }
                
                // Developer Log: Repair Bay
                const robotData = RobotDatabase.getRobot(robotId);
                this.addDeveloperLog('REPAIR', {
                    action: 'Sent to Repair Bay',
                    robotId: robotId,
                    robotName: robotData?.name || robotId,
                    team: team,
                    bayCapacity: `${repairBay.length}/2`,
                    overflow: overflowOccurred,
                    pushedRobotId: pushedRobotId
                });
                
                // Update visual display
                this.updateRepairBayDisplay(team);
                
                // Log history
                this.addToHistory(`🔧 ${robotData?.name || robotId} sent to Repair Bay`, 'info', team);
            },
            
            // Return robot from Repair Bay to Bench
            returnToBench(robotId, team, addRebootingStatus = false) {
                console.log(`♻️ Returning ${robotId} to ${team} bench`);
                
                // UNIVERSAL CURE: Clear ALL status effects (Repair Bay cures everything)
                this.clearAllStatusEffects(robotId);
                
                // Find an empty bench slot
                const benchSlots = this.playerZones[team].benchSlots;
                let targetSlot = null;
                
                for (const [slotId, slotData] of Object.entries(benchSlots)) {
                    if (slotData.robotId === null) {
                        targetSlot = slotId;
                        break;
                    }
                }
                
                if (!targetSlot) {
                    console.error(`❌ No empty bench slot available for ${robotId}!`);
                    this.addToHistory(`⚠️ Bench full - ${robotId} could not return!`, 'error', team);
                    return;
                }
                
                // Place robot on bench
                benchSlots[targetSlot].robotId = robotId;
                
                // Add "Rebooting: 2" status if needed (decrements at turn start, so 2 ensures 1 full turn wait)
                if (addRebootingStatus) {
                    if (!this.rebootingRobots) {
                        this.rebootingRobots = {}; // Initialize if doesn't exist
                    }
                    // Store with team prefix to avoid conflicts when both teams have same robot IDs
                    const rebootKey = `${team}:${robotId}`;
                    this.rebootingRobots[rebootKey] = 2; // Wait 1 full turn (2 because it decrements immediately on next turn start)
                    console.log(`⏳ ${robotId} (${team}) has "Rebooting: 2" status - cannot deploy for 1 full turn`);
                }
                
                // Update visual display
                this.updateBenchDisplay(team);
                
                // Log history
                const robotData = RobotDatabase.getRobot(robotId);
                const rebootMsg = addRebootingStatus ? ' (Rebooting: 1)' : '';
                this.addToHistory(`♻️ ${robotData?.name || robotId} returned to bench${rebootMsg}`, 'info', team);
            },
            
            // Update Repair Bay visual display
            updateRepairBayDisplay(team) {
                const repairBay = this.playerZones[team].repairBay;
                const prefix = team === 'player' ? 'player' : 'opponent';
                
                console.log(`🎨 Updating ${team} Repair Bay display`);
                
                // Update both slots
                for (let i = 1; i <= 2; i++) {
                    const slotElement = document.getElementById(`${prefix}-repair-slot-${i}`);
                    if (!slotElement) continue;
                    
                    // Clear slot first
                    const existingRobot = slotElement.querySelector('.bench-robot');
                    if (existingRobot) {
                        existingRobot.remove();
                    }
                    
                    // Check if robot exists in this slot position (index i-1)
                    if (repairBay[i - 1]) {
                        const robotId = repairBay[i - 1].robotId;
                        const robotData = RobotDatabase.getRobot(robotId);
                        
                        slotElement.setAttribute('data-occupied', 'true');
                        slotElement.setAttribute('data-robot-id', robotId);
                        
                        // Create deactivated robot visual
                        const robotDiv = document.createElement('div');
                        robotDiv.className = 'bench-robot repair-bay-robot';
                        robotDiv.setAttribute('data-robot-id', robotId); // For Combat Dial handler
                        robotDiv.style.width = '40px';
                        robotDiv.style.height = '40px';
                        robotDiv.style.backgroundImage = `url('${robotData.image}')`;
                        robotDiv.style.backgroundSize = 'contain';
                        robotDiv.style.backgroundRepeat = 'no-repeat';
                        robotDiv.style.backgroundPosition = 'center';
                        robotDiv.style.position = 'absolute';
                        // Grayscale and opacity applied via CSS
                        
                        slotElement.appendChild(robotDiv);
                        
                        console.log(`  Slot ${i}: ${robotData?.name || robotId} (deactivated)`);
                    } else {
                        slotElement.setAttribute('data-occupied', 'false');
                        slotElement.setAttribute('data-robot-id', '');
                        console.log(`  Slot ${i}: Empty`);
                    }
                }
                
                // Re-attach Combat Dial handlers to repair bay robots
                setTimeout(() => {
                    this.addCombatDialHandlersToAllRobots();
                }, 50);
            },
            
            // Process rebooting status at turn start
            processRebootingStatus(team) {
                if (!this.rebootingRobots) return;
                
                console.log(`⏳ Processing Rebooting status for ${team}...`);
                
                const benchSlots = this.playerZones[team].benchSlots;
                const toRemove = [];
                let processedAny = false;
                
                // Only process robots that belong to this team (check key prefix)
                for (const [rebootKey, waitCount] of Object.entries(this.rebootingRobots)) {
                    // Extract team from key (format: "team:robotId")
                    const [keyTeam, robotId] = rebootKey.split(':');
                    
                    // Only process if this robot belongs to current team
                    if (keyTeam === team) {
                        processedAny = true;
                        
                        // Decrement wait count first
                        this.rebootingRobots[rebootKey]--;
                        console.log(`⏳ ${robotId} (${team}) rebooting countdown: ${waitCount} → ${this.rebootingRobots[rebootKey]}`);
                        
                        // If countdown reaches 0, remove rebooting status
                        if (this.rebootingRobots[rebootKey] <= 0) {
                            toRemove.push(rebootKey);
                            console.log(`✅ ${robotId} (${team}) rebooting complete - can now deploy`);
                            const robotData = RobotDatabase.getRobot(robotId);
                            this.addToHistory(`✅ ${robotData?.name || robotId} ready for deployment`, 'info', team);
                        }
                    }
                }
                
                // Remove completed reboots
                toRemove.forEach(rebootKey => {
                    delete this.rebootingRobots[rebootKey];
                });
                
                // Update bench display ONLY if we processed any robots for this team
                if (processedAny) {
                    this.updateBenchDisplay(team);
                    console.log(`🎨 Bench display refreshed after rebooting status update`);
                }
            },
            
            // Check if robot has rebooting status
            isRobotRebooting(robotId, team) {
                if (!this.rebootingRobots) return false;
                
                // Check for team-specific rebooting key
                const rebootKey = `${team}:${robotId}`;
                return this.rebootingRobots[rebootKey] !== undefined;
            },
            
            // ==========================================
            // REPAIR BAY UTILITY FUNCTIONS
            // ==========================================
            
            // Manually return oldest robot from Repair Bay to Bench (for testing/manual repair)
            manualRepairFromBay(team) {
                const repairBay = this.playerZones[team].repairBay;
                
                if (repairBay.length === 0) {
                    console.log(`⚠️ ${team} Repair Bay is empty - nothing to repair`);
                    return false;
                }
                
                // Get oldest robot (first in queue)
                const repairEntry = repairBay.shift();
                console.log(`🔧 Manually repairing ${repairEntry.robotId} from ${team} Repair Bay`);
                
                // Return to bench WITHOUT rebooting status (manual repair = instant)
                this.returnToBench(repairEntry.robotId, team, false);
                
                // Update Repair Bay display
                this.updateRepairBayDisplay(team);
                
                return true;
            },
            
            // Clear all Repair Bay state (for game reset/debugging)
            clearRepairBayState() {
                console.log('🧹 Clearing all Repair Bay state...');
                
                // Clear repair bay queues
                this.playerZones.player.repairBay = [];
                this.playerZones.opponent.repairBay = [];
                
                // Clear rebooting status
                this.rebootingRobots = {};
                
                // Update displays
                this.updateRepairBayDisplay('player');
                this.updateRepairBayDisplay('opponent');
                
                console.log('✅ Repair Bay state cleared');
            },
            
            // Debug: Show Repair Bay status
            debugShowRepairBay() {
                console.log('🔧 REPAIR BAY STATUS REPORT');
                console.log('═══════════════════════════════════════');
                
                // Player bay
                const playerBay = this.playerZones.player.repairBay;
                console.log(`\n👤 Player Repair Bay (${playerBay.length}/2):`);
                playerBay.forEach((entry, index) => {
                    const robot = RobotDatabase.getRobot(entry.robotId);
                    console.log(`  [${index + 1}] ${robot?.name || entry.robotId} - waiting since ${new Date(entry.timestamp).toLocaleTimeString()}`);
                });
                
                // Opponent bay
                const opponentBay = this.playerZones.opponent.repairBay;
                console.log(`\n🤖 Opponent Repair Bay (${opponentBay.length}/2):`);
                opponentBay.forEach((entry, index) => {
                    const robot = RobotDatabase.getRobot(entry.robotId);
                    console.log(`  [${index + 1}] ${robot?.name || entry.robotId} - waiting since ${new Date(entry.timestamp).toLocaleTimeString()}`);
                });
                
                // Rebooting robots
                console.log(`\n⏳ Rebooting Robots:`);
                if (Object.keys(this.rebootingRobots).length === 0) {
                    console.log('  (none)');
                } else {
                    for (const [robotId, waitCount] of Object.entries(this.rebootingRobots)) {
                        const robot = RobotDatabase.getRobot(robotId);
                        console.log(`  ${robot?.name || robotId}: ${waitCount} turn(s) remaining`);
                    }
                }
                
                console.log('\n═══════════════════════════════════════');
            },
            
            // Cancel battle (don't attack)
            cancelBattle() {
                console.log('↩️ Battle cancelled');
                
                // Store battle data before clearing
                const attackerPointId = this.currentBattle?.attackerPointId;
                const attackerTeam = this.currentBattle?.attackerTeam;
                
                // Reset battle flag since battle was cancelled
                this.turnActions.hasBattled = false;
                this.turnActions.actionTakenThisTurn = this.turnActions.hasMovedRobot; // Keep movement flag if robot moved
                console.log('✅ Battle action reset - player can still act this turn');
                
                // Close modal
                document.getElementById('battleOverlay').classList.remove('active');
                document.querySelector('.battle-action-buttons').style.display = 'flex';
                
                // Clear battle data
                this.currentBattle = null;
                
                // Clear debugger selections
                this.clearDebuggerSelections();
                
                // Re-highlight adjacent enemies so player can attack again
                if (attackerPointId && attackerTeam) {
                    console.log(`🔄 Re-highlighting adjacent enemies for ${attackerPointId}`);
                    this.highlightAdjacentEnemies(attackerPointId, attackerTeam);
                }
            },
            
            // Combat Dial Info System - Tap and Hold to View
            holdTimer: null,
            holdDuration: 250, // milliseconds to trigger (0.25 seconds = easier to trigger!)
            
            // Initialize Combat Dial tap-and-hold handlers
            initializeCombatDialHandlers() {
                console.log('🎯 Initializing Combat Dial tap-and-hold handlers...');
                
                // We'll add handlers dynamically to robots as they appear
                // This includes: board robots, bench robots, and repair bay robots
                this.addCombatDialHandlersToAllRobots();
                
                console.log('✅ Combat Dial handlers initialized');
            },
            
            // Add handlers to all current robots on screen
            addCombatDialHandlersToAllRobots() {
                let handlerCount = 0;
                
                // Board robots (SVG elements) - attach ONLY to group, not circle (avoid event bubbling duplicates)
                const boardRobots = document.querySelectorAll('.battle-robot');
                boardRobots.forEach(robotEl => {
                    const robotId = this.getRobotIdFromElement(robotEl);
                    if (robotId) {
                        // Attach handler (will skip if already attached to this element instance)
                        this.addCombatDialHandlerToElement(robotEl, robotId);
                        handlerCount++;
                        
                        // DON'T attach to clickCircle - causes event bubbling that resets timer!
                        // The group element is sufficient for capturing clicks
                    }
                });
                
                // Bench robots (HTML elements)
                const benchRobots = document.querySelectorAll('.bench-robot:not(.repair-bay-robot)');
                benchRobots.forEach(robotEl => {
                    const robotId = this.getRobotIdFromElement(robotEl);
                    if (robotId) {
                        // Attach handler (will skip if already attached to this element instance)
                        this.addCombatDialHandlerToElement(robotEl, robotId);
                        handlerCount++;
                    }
                });
                
                // Repair bay robots (HTML elements)
                const repairRobots = document.querySelectorAll('.repair-bay-robot');
                repairRobots.forEach(robotEl => {
                    const robotId = this.getRobotIdFromElement(robotEl);
                    if (robotId) {
                        // Attach handler (will skip if already attached to this element instance)
                        this.addCombatDialHandlerToElement(robotEl, robotId);
                        handlerCount++;
                    }
                });
                
                console.log(`🎯 Added Combat Dial handlers to ${handlerCount} robots (board: ${boardRobots.length}, bench: ${benchRobots.length}, repair: ${repairRobots.length})`);
            },
            
            // Get robot ID from element (works for board, bench, and repair bay)
            getRobotIdFromElement(element) {
                // Check for data-robot-id attribute
                if (element.hasAttribute('data-robot-id')) {
                    const robotId = element.getAttribute('data-robot-id');
                    if (robotId) return robotId;
                }
                
                // Check parent for data-robot-id (repair bay robots)
                if (element.parentElement && element.parentElement.hasAttribute('data-robot-id')) {
                    const robotId = element.parentElement.getAttribute('data-robot-id');
                    if (robotId) return robotId;
                }
                
                // For board robots, check the ID pattern
                const elId = element.id;
                if (elId && elId.startsWith('robot-')) {
                    const pointId = elId.replace('robot-', '');
                    const point = this.getPointById(pointId);
                    return point?.robot?.id;
                }
                
                // Check onclick attribute (bench robots)
                const onclick = element.getAttribute('onclick');
                if (onclick) {
                    const match = onclick.match(/'([^']+)'/);
                    if (match) return match[1];
                }
                
                return null;
            },
            
            // Add tap-and-hold handler to a specific element
            addCombatDialHandlerToElement(element, robotId) {
                // Check if handler already attached to THIS SPECIFIC element instance
                if (element._combatDialHandlers) {
                    // Already has handler on this exact element, skip to avoid duplicates
                    console.log(`⏭️ Skipping duplicate handler for ${robotId} (already attached to this element)`);
                    return;
                }
                
                // Mark as having handlers (using property instead of attribute for element-specific tracking)
                element._hasCombatDialHandler = true;
                
                // Store coordinates in element's dataset so all handlers can access them
                element.dataset.holdStartX = '0';
                element.dataset.holdStartY = '0';
                const moveThreshold = 30; // pixels - increased tolerance
                
                // Create bound handlers that we can remove later
                const handlers = {
                    mousedown: (e) => {
                        console.log(`🖱️ Mouse down on robot ${robotId} at (${e.clientX}, ${e.clientY})`);
                        element.dataset.holdStartX = e.clientX.toString();
                        element.dataset.holdStartY = e.clientY.toString();
                        this.startCombatDialHold(robotId, e);
                    },
                    mouseup: (e) => {
                        console.log(`🖱️ Mouse up on robot ${robotId}`);
                        this.cancelCombatDialHold();
                    },
                    mousemove: (e) => {
                        // Only check if we have a hold timer active
                        if (!this.holdTimer) return;
                        
                        const startX = parseFloat(element.dataset.holdStartX || '0');
                        const startY = parseFloat(element.dataset.holdStartY || '0');
                        const dx = e.clientX - startX;
                        const dy = e.clientY - startY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance > moveThreshold) {
                            console.log(`🖱️ Mouse moved ${distance.toFixed(1)}px - cancelling hold`);
                            this.cancelCombatDialHold();
                        }
                    },
                    touchstart: (e) => {
                        console.log(`👆 Touch start on robot ${robotId}`);
                        if (e.touches[0]) {
                            element.dataset.holdStartX = e.touches[0].clientX.toString();
                            element.dataset.holdStartY = e.touches[0].clientY.toString();
                        }
                        this.startCombatDialHold(robotId, e);
                    },
                    touchmove: (e) => {
                        // Only check if we have a hold timer active
                        if (!this.holdTimer) return;
                        
                        if (e.touches[0]) {
                            const startX = parseFloat(element.dataset.holdStartX || '0');
                            const startY = parseFloat(element.dataset.holdStartY || '0');
                            const dx = e.touches[0].clientX - startX;
                            const dy = e.touches[0].clientY - startY;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance > moveThreshold) {
                                console.log(`👆 Touch moved ${distance.toFixed(1)}px - cancelling hold`);
                                this.cancelCombatDialHold();
                            }
                        }
                    },
                    touchend: () => {
                        console.log(`👆 Touch end on robot ${robotId}`);
                        this.cancelCombatDialHold();
                    },
                    touchcancel: () => {
                        console.log(`👆 Touch cancel on robot ${robotId}`);
                        this.cancelCombatDialHold();
                    }
                };
                
                // Add all handlers
                element.addEventListener('mousedown', handlers.mousedown, false);
                element.addEventListener('mouseup', handlers.mouseup, false);
                element.addEventListener('mousemove', handlers.mousemove, false);
                element.addEventListener('touchstart', handlers.touchstart, { passive: true });
                element.addEventListener('touchmove', handlers.touchmove, { passive: true });
                element.addEventListener('touchend', handlers.touchend, false);
                element.addEventListener('touchcancel', handlers.touchcancel, false);
                
                // Store handlers for potential cleanup
                element._combatDialHandlers = handlers;
                
                console.log(`✅ Combat Dial handler attached to robot ${robotId}`);
            },
            
            // Start the hold timer
            startCombatDialHold(robotId, event) {
                // Only block during active animation, not during selection
                if (this.isMovementInProgress) {
                    return;
                }
                
                // Clear any existing timer
                this.cancelCombatDialHold();
                
                console.log(`⏱️ Started hold timer for ${robotId} (${this.holdDuration}ms = ${this.holdDuration/1000}s)`);
                console.log(`📍 Hold started at coordinates: (${Math.round(event.clientX)}, ${Math.round(event.clientY)})`);
                
                // Start new timer
                this.holdTimer = setTimeout(() => {
                    console.log(`✅ 🎉 HOLD COMPLETE - Opening Combat Dial for ${robotId}!`);
                    this.showCombatDialInfo(robotId);
                }, this.holdDuration);
            },
            
            // Cancel the hold timer
            cancelCombatDialHold() {
                if (this.holdTimer) {
                    console.log(`❌ Hold timer cancelled (released too early or moved)`);
                    clearTimeout(this.holdTimer);
                    this.holdTimer = null;
                }
            },
            
            // Show Combat Dial info overlay
            showCombatDialInfo(robotId) {
                console.log(`📊 Showing Combat Dial info for ${robotId}`);
                
                const robot = RobotDatabase.getRobot(robotId);
                if (!robot) {
                    console.error(`❌ Robot ${robotId} not found in database`);
                    return;
                }
                
                // Get active status effects for this robot
                const statuses = this.getRobotStatuses(robotId);
                const hasStatusEffects = statuses.conditions.length > 0 || statuses.markers.length > 0;
                
                // Update modal content
                document.getElementById('combatDialRobotImage').src = robot.image;
                document.getElementById('combatDialRobotName').textContent = robot.name;
                document.getElementById('combatDialRobotRole').textContent = robot.role;
                
                // Build stats display with status effect modifications
                let statsHtml = `MP: ${robot.mp}`;
                if (statuses.markers.includes('mp-1')) {
                    statsHtml = `MP: <span style="color: #ff6b6b; text-decoration: line-through;">${robot.mp}</span> <span style="color: #ff6b6b; font-weight: bold;">${robot.mp - 1}</span> (MP-1)`;
                }
                document.getElementById('combatDialRobotStats').innerHTML = statsHtml;
                
                // Add status effects display
                if (hasStatusEffects) {
                    const statusDisplay = `
                        <div style="margin-top: 10px; padding: 8px; background: rgba(255,107,107,0.1); border-radius: 6px; border-left: 3px solid #ff6b6b;">
                            <div style="font-weight: bold; color: #ff6b6b; margin-bottom: 5px;">⚠️ ACTIVE STATUS EFFECTS</div>
                            ${statuses.conditions.map(s => {
                                const def = this.statusEffectDefinitions[s];
                                return `<div style="margin: 3px 0; font-size: 12px;">
                                    ${def?.icon || '⚠️'} <strong>${def?.name || s}</strong>: ${def?.description || 'Unknown effect'}
                                </div>`;
                            }).join('')}
                            ${statuses.markers.map(s => {
                                const def = this.statusEffectDefinitions[s];
                                return `<div style="margin: 3px 0; font-size: 12px;">
                                    ${def?.icon || '🔖'} <strong>${def?.name || s}</strong>: ${def?.description || 'Unknown effect'}
                                </div>`;
                            }).join('')}
                        </div>
                    `;
                    document.getElementById('combatDialRobotStats').innerHTML += statusDisplay;
                }
                
                // Update ability
                const abilitySection = document.getElementById('combatDialAbility');
                abilitySection.querySelector('.combat-dial-ability-name').textContent = robot.ability.name;
                abilitySection.querySelector('.combat-dial-ability-desc').textContent = robot.ability.description;
                
                // Generate circular wheel visualization using conic-gradient (same as attack wheels)
                const wheelContainer = document.getElementById('combatDialWheelContainer');
                wheelContainer.innerHTML = '';
                
                // Clear any existing pip overlays
                const existingPips = wheelContainer.querySelectorAll('.wheel-pip-container');
                existingPips.forEach(pip => pip.remove());
                
                // Clear any existing star overlays
                const existingStars = wheelContainer.querySelectorAll('.wheel-star-container');
                existingStars.forEach(star => star.remove());
                
                // Assign pip identifiers
                const wheelDataWithPips = this.assignPipIdentifiers(robot.wheel);
                
                let gradientSegments = [];
                let currentAngle = 0;
                const totalSize = 96;
                
                wheelDataWithPips.forEach(segment => {
                    const segmentAngle = (segment.size / totalSize) * 360;
                    const color = this.getMoveColorHex(segment.moveType);
                    
                    gradientSegments.push(`${color} ${currentAngle}deg ${currentAngle + segmentAngle}deg`);
                    
                    // Add pip overlay if this segment has a pip identifier
                    if (segment.pipCount > 0) {
                        this.addPipOverlay(wheelContainer, currentAngle, segmentAngle, segment.pipCount);
                    }
                    
                    // Add star overlay if this segment has stars
                    if (segment.stars !== undefined && segment.stars !== null) {
                        this.addStarOverlay(wheelContainer, currentAngle, segmentAngle, segment.stars);
                    }
                    
                    currentAngle += segmentAngle;
                });
                
                wheelContainer.style.background = `conic-gradient(${gradientSegments.join(', ')})`;
                
                // Reset and add spinning animation
                wheelContainer.style.animation = 'none';
                setTimeout(() => {
                    wheelContainer.style.animation = 'combatDialWheelSpin 3s cubic-bezier(0.17, 0.67, 0.12, 0.99) forwards';
                }, 10);
                
                // Populate wheel display with pip identifiers (same format as attack screen)
                const wheelDisplay = document.getElementById('combatDialWheelDisplay');
                wheelDisplay.innerHTML = '';
                
                // Sort wheel data: Miss moves at bottom, others by size (most common first)
                const sortedWheelData = [...wheelDataWithPips].sort((a, b) => {
                    const aIsMiss = a.moveName.toLowerCase().includes('miss');
                    const bIsMiss = b.moveName.toLowerCase().includes('miss');
                    
                    // If one is Miss and the other isn't, Miss goes to bottom
                    if (aIsMiss && !bIsMiss) return 1;
                    if (!aIsMiss && bIsMiss) return -1;
                    
                    // Otherwise sort by size (largest first)
                    return b.size - a.size;
                });
                
                sortedWheelData.forEach(move => {
                    const moveEl = document.createElement('div');
                    moveEl.className = `combat-dial-move ${move.moveType}`;
                    
                    // Icon for move type
                    const typeIcons = {
                        'White': '⚔️',
                        'Gold': '⭐',
                        'Purple': '✨',
                        'Blue': '🛡️',
                        'Red': '❌'
                    };
                    const icon = typeIcons[move.moveType] || '•';
                    
                    // Format move name with pip identifier if present
                    let displayName = move.moveName;
                    if (move.pipCount > 0) {
                        const pips = '•'.repeat(move.pipCount);
                        displayName += ` (${pips})`;
                    }
                    
                    // Show full effect text - handle "None" case for normal attacks
                    let effectText = move.effect;
                    
                    // Miss moves should have no description
                    if (move.moveName.toLowerCase().includes('miss')) {
                        effectText = '';
                    } else if (!effectText || effectText === 'None' || effectText.trim() === '') {
                        // Normal attacks without special effects
                        effectText = 'Normal attack';
                    }
                    
                    // Build damage/stars display with status effect modifications
                    let statsHtml = '';
                    if (move.damage) {
                        // Check if status effects reduce damage for this move type
                        let modifiedDamage = move.damage;
                        let damageReduction = 0;
                        const moveType = move.moveType.toLowerCase();
                        
                        // Check each status effect for damage reductions
                        [...statuses.conditions, ...statuses.markers].forEach(statusName => {
                            const statusDef = this.statusEffectDefinitions[statusName];
                            if (statusDef && statusDef.damageReduction) {
                                if (statusDef.affectedMoveTypes && statusDef.affectedMoveTypes.includes(moveType)) {
                                    damageReduction += statusDef.damageReduction;
                                }
                            }
                        });
                        
                        modifiedDamage = Math.max(0, move.damage - damageReduction);
                        
                        if (damageReduction > 0) {
                            statsHtml = `<div class="combat-dial-move-damage">
                                <span style="text-decoration: line-through; color: #999;">${move.damage}</span> 
                                <span style="color: #ff6b6b; font-weight: bold;">${modifiedDamage}</span>
                                <span style="font-size: 10px; color: #ff6b6b;"> (-${damageReduction})</span>
                            </div>`;
                        } else {
                            statsHtml = `<div class="combat-dial-move-damage">${move.damage}</div>`;
                        }
                    } else if (move.stars) {
                        statsHtml = `<div class="combat-dial-move-damage">${'⭐'.repeat(move.stars)}</div>`;
                    }
                    statsHtml += `<div class="combat-dial-move-size">Size: ${move.size}</div>`;
                    
                    moveEl.innerHTML = `
                        <div class="combat-dial-move-color">${icon}</div>
                        <div class="combat-dial-move-info">
                            <div class="combat-dial-move-name">${displayName}</div>
                            <div class="combat-dial-move-effect">${effectText}</div>
                        </div>
                        <div class="combat-dial-move-stats">
                            ${statsHtml}
                        </div>
                    `;
                    
                    wheelDisplay.appendChild(moveEl);
                });
                
                // Show overlay
                document.getElementById('combatDialOverlay').classList.add('active');
            },
            
            // Close Combat Dial info overlay
            closeCombatDialInfo() {
                document.getElementById('combatDialOverlay').classList.remove('active');
                console.log('📊 Combat Dial info closed');
            },
            
            // Show turn indicator
            showTurnIndicator(team) {
                const indicator = document.getElementById('turnIndicator');
                indicator.className = 'turn-indicator active';
                
                if (team === 'player') {
                    indicator.classList.add('player-turn');
                    indicator.textContent = '🎮 Your Turn';
                } else {
                    indicator.classList.add('opponent-turn');
                    indicator.textContent = '🤖 Opponent Turn';
                }
                
                // Auto-hide after 2 seconds
                setTimeout(() => {
                    indicator.classList.remove('active');
                }, 2000);
            },
            
            // Team Selection Functions
            showTeamSelection() {
                this.hideAllViews();
                document.getElementById('teamSelectionView').style.display = 'block';
                this.updateTeamSelectionUI();
                console.log('🤖 Team Selection screen opened');
            },
            
            updateTeamSelectionUI() {
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
                this.updateSelectedTeamGrid();
                
                // Update available robots grid
                this.updateAvailableRobotsGrid();
                
                // Update start battle button
                const startBtn = document.getElementById('startBattleBtn');
                if (startBtn) {
                    startBtn.disabled = !TeamManager.isTeamComplete();
                }
            },
            
            updateSelectedTeamGrid() {
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
            },
            
            updateAvailableRobotsGrid() {
                console.log('🔧 updateAvailableRobotsGrid called');
                const grid = document.getElementById('robotsGrid');
                if (!grid) {
                    console.error('❌ robotsGrid element not found!');
                    return;
                }
                
                console.log('📐 Grid element found:', grid);
                console.log('📏 Grid dimensions:', grid.offsetWidth, 'x', grid.offsetHeight);
                console.log('👁️ Grid visibility:', getComputedStyle(grid).display, getComputedStyle(grid).visibility);
                
                console.log('🤖 Getting robots from database...');
                const allRobots = RobotDatabase.getAllRobots();
                console.log('📊 Found robots:', allRobots.length, allRobots);
                
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
                        return `<div class="wheel-segment ${segment.moveType.toLowerCase()}" style="width: ${width}%;" title="${segment.moveName}"></div>`;
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
            },
            
            startBattleWithTeam() {
                if (!TeamManager.isTeamComplete()) {
                    app.showSquadFullMessage('Please select 6 robots before starting battle!');
                    return;
                }
                
                console.log('🚀 Starting battle with selected team:', TeamManager.selectedTeam);
                
                // Transition from team selection to battle game phase
                app.showBattleGamePhase();
                
                // TODO: Use selected team for battle instead of test robots
                // For now, just show the battle game phase
            },
            
            showSquadFullMessage(message) {
                // Create temporary message element
                const messageEl = document.createElement('div');
                messageEl.textContent = message;
                messageEl.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: var(--danger);
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    z-index: 1000;
                    animation: shake 0.5s ease-in-out;
                `;
                
                document.body.appendChild(messageEl);
                
                // Remove after 2 seconds
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.parentNode.removeChild(messageEl);
                    }
                }, 2000);
            },
            
            // Helper: Check if two points are adjacent
            arePointsAdjacent(pointId1, pointId2) {
                const point1 = this.getPointById(pointId1);
                if (!point1 || !point1.connections) return false;
                return point1.connections.includes(pointId2);
            },
            
            // Helper: Get adjacent enemy points
            getAdjacentEnemies(pointId, team) {
                const point = this.getPointById(pointId);
                if (!point || !point.connections) return [];
                
                const enemyTeam = team === 'player' ? 'opponent' : 'player';
                const adjacentEnemies = [];
                
                point.connections.forEach(connectedPointId => {
                    const connectedPoint = this.getPointById(connectedPointId);
                    if (connectedPoint && connectedPoint.robot && connectedPoint.robot.team === enemyTeam) {
                        adjacentEnemies.push(connectedPointId);
                    }
                });
                
                return adjacentEnemies;
            }
        };

        // ==========================================
        // ROBOT DATA SYSTEM - PLACEHOLDER ROBOTS
        // ==========================================