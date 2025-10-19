        const TeamManager = {
            selectedTeam: [], // Array of 6 robot IDs
            maxTeamSize: 6,
            
            // Add robot to team
            addToTeam(robotId) {
                if (this.selectedTeam.length >= this.maxTeamSize) {
                    console.log('❌ Team is full! Remove a robot first.');
                    return false;
                }
                
                if (this.selectedTeam.includes(robotId)) {
                    console.log('❌ Robot already in team!');
                    return false;
                }
                
                this.selectedTeam.push(robotId);
                console.log(`✅ Added ${RobotDatabase.getRobot(robotId).name} to team`);
                this.updateTeamDisplay();
                return true;
            },
            
            // Remove robot from team
            removeFromTeam(robotId) {
                const index = this.selectedTeam.indexOf(robotId);
                if (index === -1) {
                    console.log('❌ Robot not in team!');
                    return false;
                }
                
                this.selectedTeam.splice(index, 1);
                console.log(`🗑️ Removed ${RobotDatabase.getRobot(robotId).name} from team`);
                this.updateTeamDisplay();
                return true;
            },
            
            // Clear entire team
            clearTeam() {
                this.selectedTeam = [];
                console.log('🧹 Team cleared');
                this.updateTeamDisplay();
            },
            
            // Check if team is complete
            isTeamComplete() {
                return this.selectedTeam.length === this.maxTeamSize;
            },
            
            // Get team composition analysis
            getTeamAnalysis() {
                const roles = {};
                const rarities = {};
                
                this.selectedTeam.forEach(robotId => {
                    const robot = RobotDatabase.getRobot(robotId);
                    roles[robot.role] = (roles[robot.role] || 0) + 1;
                    rarities[robot.rarity] = (rarities[robot.rarity] || 0) + 1;
                });
                
                return { roles, rarities, size: this.selectedTeam.length };
            },
            
            // Get available robots (filtered by ownership)
            getAvailableRobots() {
                const allRobots = Object.keys(RobotDatabase.robots);
                const ownedRobots = (typeof app !== 'undefined' && app.data && app.data.ownedRobots) ? app.data.ownedRobots : ['default'];
                
                // Debug mode: Show all robots regardless of ownership
                if (window.debugShowAllRobots) {
                    return allRobots;
                }
                
                return allRobots.filter(robotId => {
                    const robot = RobotDatabase.getRobot(robotId);
                    
                    // If robot requires purchase, check if owned
                    if (robot.requiresPurchase) {
                        // Match various ID formats (CLOWNBOT, clown-bot, unit-001-uc-0)
                        const robotNameUpper = robot.name.toUpperCase().replace(/[^A-Z0-9]/g, '');
                        return ownedRobots.some(owned => {
                            const ownedUpper = owned.toUpperCase().replace(/[^A-Z0-9]/g, '');
                            return ownedUpper === robotNameUpper || owned === robot.id;
                        });
                    }
                    
                    // Default unlocked robots (no requiresPurchase flag)
                    return true;
                });
            },
            
            // Auto-fill team with balanced composition
            autoFillTeam() {
                this.clearTeam();
                const availableRobots = this.getAvailableRobots();
                
                // Add first 6 available robots (in real game, would be more strategic)
                availableRobots.slice(0, 6).forEach(robotId => {
                    this.addToTeam(robotId);
                });
                
                console.log('🤖 Auto-filled team with', availableRobots.length, 'available robots');
                console.log('🔓 Unlocked robots:', availableRobots.map(id => RobotDatabase.getRobot(id).name));
            },
            
            // UI Integration
            updateTeamDisplay() {
                console.log('👥 Current Team:', this.selectedTeam.map(id => 
                    RobotDatabase.getRobot(id).name
                ));
                console.log('📊 Team Analysis:', this.getTeamAnalysis());
                
                // Update UI if team selection view is active
                if (typeof app !== 'undefined' && app.updateTeamSelectionUI) {
                    app.updateTeamSelectionUI();
                }
            }
        };

        // Initialize app and load external data