/**
 * AI Dialogue Interceptor
 * Intercepts ENHANCED_INTELLIGENCE_ACTIVE messages and calls Netlify AI function
 */

// Store original dialogue function
let originalShowDialogue = null;

// Initialize interceptor
function initAIDialogueInterceptor() {
    console.log('🤖 [AI Interceptor] Initializing...');
    
    // Wait for ChoreSystem to be ready
    const checkInterval = setInterval(() => {
        if (window.ChoreSystem && window.ChoreSystem.showSpeechBubble) {
            clearInterval(checkInterval);
            setupInterceptor();
        }
    }, 100);
}

// Setup the interceptor
function setupInterceptor() {
    console.log('✅ [AI Interceptor] ChoreSystem found, setting up interceptor');
    
    // Store original function
    originalShowDialogue = window.ChoreSystem.showSpeechBubble.bind(window.ChoreSystem);
    
    // Override with AI-enhanced version
    window.ChoreSystem.showSpeechBubble = async function(message, emotion = 'happy', bypassCooldown = false) {
        // Check if this is an AI request
        if (message && message.includes('ENHANCED_INTELLIGENCE_ACTIVE')) {
            console.log('🤖 [AI Interceptor] AI request detected, calling Netlify function...');
            
            // Extract context (if available)
            const context = extractContext();
            
            // Call AI function
            const aiResponse = await callAIFunction(context);
            
            // Replace message with AI response
            message = aiResponse;
        }
        
        // Call original function with (possibly modified) message
        return originalShowDialogue(message, emotion, bypassCooldown);
    };
    
    console.log('✅ [AI Interceptor] Ready! AI responses enabled.');
}

// Extract context from current game state
function extractContext() {
    try {
        const cs = window.ChoreSystem;
        if (!cs || !cs.data) return 'General greeting';
        
        // Try to get current task/category info
        const currentTask = cs.data.currentTaskId ? 
            cs.data.categories.flatMap(c => c.tasks).find(t => t.id === cs.data.currentTaskId) : null;
        const currentCategory = cs.data.currentCategoryId ?
            cs.data.categories.find(c => c.id === cs.data.currentCategoryId) : null;
            
        if (currentTask && currentCategory) {
            return `User completed task: "${currentTask.name}" in "${currentCategory.name}"`;
        } else if (currentCategory) {
            return `User viewing category: "${currentCategory.name}"`;
        } else {
            const overallScore = Math.round((cs.data.categories.reduce((sum, cat) => 
                sum + cs.calculateCategoryScore(cat), 0) / cs.data.categories.length) || 0);
            return `User on dashboard. Overall home score: ${overallScore}%`;
        }
    } catch (error) {
        console.warn('[AI Interceptor] Error extracting context:', error);
        return 'General greeting';
    }
}

// Call the AI function (Netlify or local fallback)
async function callAIFunction(context) {
    try {
        console.log('🌐 [AI Interceptor] Trying Netlify function...');
        
        // Try Netlify function first
        const response = await fetch('/.netlify/functions/ai-response', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ context })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ [AI Interceptor] Got AI response:', data.response);
            return data.response;
        }
        
        throw new Error(`Netlify function returned ${response.status}`);
        
    } catch (error) {
        console.error('❌ [AI Interceptor] AI call failed:', error);
        
        // Fallback messages
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

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAIDialogueInterceptor);
} else {
    initAIDialogueInterceptor();
}

console.log('📦 [AI Interceptor] Script loaded');
