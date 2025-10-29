/**
 * UPKEEP LOADING SCREEN CONTROLLER
 * Manages the professional loading screen for dashboard initialization
 * Ultra-lightweight, modular, and performance-optimized
 */

const UpkeepLoadingScreen = {
    screen: null,
    subtextElement: null,
    isActive: false,
    
    /**
     * Initialize the loading screen (call once on page load)
     */
    init() {
        this.screen = document.getElementById('upkeepLoadingScreen');
        this.subtextElement = document.getElementById('loadingSubtext');
        
        if (!this.screen) {
            console.error('❌ [Loading Screen] Element not found in DOM');
            return false;
        }
        
        console.log('✅ [Loading Screen] Initialized');
        return true;
    },
    
    /**
     * Show the loading screen
     * @param {string} message - Optional custom loading message
     */
    show(message = 'Calculating upkeep priority...') {
        if (!this.screen) {
            console.warn('⚠️ [Loading Screen] Not initialized, calling init()');
            this.init();
        }
        
        // Set custom message
        if (this.subtextElement && message) {
            this.subtextElement.textContent = message;
        }
        
        // Show with fade-in animation
        this.screen.classList.remove('fade-out');
        this.screen.classList.add('active');
        this.isActive = true;
        
        console.log('🔄 [Loading Screen] Shown:', message);
    },
    
    /**
     * Update the loading message dynamically
     * @param {string} message - New loading message
     */
    updateMessage(message) {
        if (this.subtextElement && this.isActive) {
            this.subtextElement.textContent = message;
            console.log('📝 [Loading Screen] Message updated:', message);
        }
    },
    
    /**
     * Hide the loading screen with fade-out animation
     * @param {number} delay - Optional delay in ms before hiding (default: 0)
     */
    hide(delay = 0) {
        if (!this.isActive) {
            console.warn('⚠️ [Loading Screen] Already hidden');
            return;
        }
        
        setTimeout(() => {
            // Start fade-out animation
            this.screen.classList.add('fade-out');
            
            // Remove from DOM after animation completes
            setTimeout(() => {
                this.screen.classList.remove('active');
                this.isActive = false;
                console.log('✅ [Loading Screen] Hidden');
            }, 300); // Match CSS transition duration
            
        }, delay);
    },
    
    /**
     * Show loading screen with automatic hide after duration
     * @param {number} duration - Duration in ms to show loading screen
     * @param {string} message - Optional custom loading message
     */
    showWithDuration(duration = 5000, message = 'Calculating upkeep priority...') {
        this.show(message);
        this.hide(duration);
    },
    
    /**
     * Force immediate hide (no animation)
     */
    forceHide() {
        if (this.screen) {
            this.screen.classList.remove('active', 'fade-out');
            this.isActive = false;
            console.log('⚡ [Loading Screen] Force hidden');
        }
    }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => UpkeepLoadingScreen.init());
} else {
    UpkeepLoadingScreen.init();
}

// Make globally accessible
window.UpkeepLoadingScreen = UpkeepLoadingScreen;

console.log('📦 [Loading Screen] Module loaded');
