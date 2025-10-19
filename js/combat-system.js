        const CombatSystem = {
            // Combat Priority Matrix based on DUEL PROTOCOL
            // Blue > Gold > Purple > White > Red
            resolveCombat(attackerMove, defenderMove) {
                console.log('⚔️ Combat Resolution:', attackerMove.moveName, 'vs', defenderMove.moveName);
                
                const attacker = attackerMove.moveType;
                const defender = defenderMove.moveType;
                
                // Handle Miss (Red) cases first
                if (attacker === 'Red' && defender === 'Red') return 'draw';
                if (attacker === 'Red') return 'defender_wins';
                if (defender === 'Red') return 'attacker_wins';
                
                // Handle Blue (Defensive) cases
                if (attacker === 'Blue' && defender === 'Blue') return 'draw';
                if (attacker === 'Blue') return 'attacker_wins';
                if (defender === 'Blue') return 'defender_wins';
                
                // Handle Gold vs Purple (Gold beats Purple)
                if (attacker === 'Gold' && defender === 'Purple') return 'attacker_wins';
                if (attacker === 'Purple' && defender === 'Gold') return 'defender_wins';
                
                // Handle Purple vs White (Purple beats White)
                if (attacker === 'Purple' && defender === 'White') return 'attacker_wins';
                if (attacker === 'White' && defender === 'Purple') return 'defender_wins';
                
                // Handle same-type matchups
                if (attacker === defender) {
                    if (attacker === 'White' || attacker === 'Gold') {
                        // Compare damage values
                        if (attackerMove.damage > defenderMove.damage) return 'attacker_wins';
                        if (attackerMove.damage < defenderMove.damage) return 'defender_wins';
                        return 'draw'; // Equal damage
                    } else if (attacker === 'Purple') {
                        // Compare star ratings
                        if (attackerMove.stars > defenderMove.stars) return 'attacker_wins';
                        if (attackerMove.stars < defenderMove.stars) return 'defender_wins';
                        return 'draw'; // Equal stars
                    }
                }
                
                // Handle White vs Gold (compare damage)
                if ((attacker === 'White' && defender === 'Gold') || (attacker === 'Gold' && defender === 'White')) {
                    if (attackerMove.damage > defenderMove.damage) return 'attacker_wins';
                    if (attackerMove.damage < defenderMove.damage) return 'defender_wins';
                    return 'draw';
                }
                
                console.warn('❓ Unhandled combat case:', attacker, 'vs', defender);
                return 'draw';
            },
            
            // Simulate a battle between two robots
            simulateBattle(attackerRobotId, defenderRobotId) {
                const attackerSpin = RobotDatabase.spinWheel(attackerRobotId);
                const defenderSpin = RobotDatabase.spinWheel(defenderRobotId);
                
                const result = this.resolveCombat(attackerSpin.result, defenderSpin.result);
                
                return {
                    attacker: {
                        robotId: attackerRobotId,
                        robot: RobotDatabase.getRobot(attackerRobotId),
                        spin: attackerSpin
                    },
                    defender: {
                        robotId: defenderRobotId,
                        robot: RobotDatabase.getRobot(defenderRobotId),
                        spin: defenderSpin
                    },
                    result: result,
                    winner: result === 'attacker_wins' ? 'attacker' : result === 'defender_wins' ? 'defender' : null
                };
            },
            
            // Get move type color for UI
            getMoveColor(moveType) {
                const colors = {
                    'Red': '#ff4444',
                    'White': '#ffffff',
                    'Purple': '#8844ff',
                    'Gold': '#ffaa00',
                    'Blue': '#4488ff'
                };
                return colors[moveType] || '#cccccc';
            },
            
            // Format move display text
            formatMoveText(move) {
                let text = move.moveName;
                if (move.damage) text += ` (${move.damage})`;
                if (move.stars) text += ` (${'★'.repeat(move.stars)})`;
                return text;
            }
        };
        
        // ==========================================
        // TEAM SELECTION SYSTEM
        // ==========================================
        