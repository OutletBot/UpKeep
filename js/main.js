        (async function initializeApp() {
            // Load app data (store robots, scrappy dialogue)
            await app.init();
            
            // Load battle robots from JSON (with hardcoded fallback)
            await RobotDatabase.loadExternalRobots();
            
            // Initialize Battle System
            BattleSystem.initializeBattle();
            BattleSystem.initializePhase2();
        })();
        
        // Make systems globally accessible for future development
        window.BattleSystem = BattleSystem;
        window.GameBoard = BattleSystem; // Alias for backward compatibility
        window.RobotDatabase = RobotDatabase;
        window.TeamManager = TeamManager;
        window.CombatSystem = CombatSystem;
        window.app = app;

        // Initialize Status Effect Manager when page loads
        window.addEventListener('load', () => {
            BattleSystem.initializeStatusEffectManager();
            console.log('✅ Game systems initialized');
        });

        // Register Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => console.log('Service Worker registered:', registration))
                    .catch(error => console.log('Service Worker registration failed:', error));
            });
        }