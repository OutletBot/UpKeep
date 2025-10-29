// ============================================
// GAMIFICATION SYSTEM
// Particle Effects, Streaks, Achievements, and Fun Feedback
// ============================================

const Gamification = {
    // Streak tracking
    streaks: {
        current: 0,
        best: 0,
        lastCompletionDate: null,
        milestones: [3, 5, 7, 10, 15, 20, 30, 50, 100]
    },
    
    // Sound effects (Web Audio API)
    sounds: {
        enabled: true,
        context: null,
        
        init() {
            try {
                this.context = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.warn('Web Audio API not supported');
                this.enabled = false;
            }
        },
        
        playTone(frequency, duration, type = 'sine') {
            if (!this.enabled || !this.context) return;
            
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
            
            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration);
        },
        
        playSuccess() {
            // Happy ascending chord
            this.playTone(523.25, 0.15); // C5
            setTimeout(() => this.playTone(659.25, 0.15), 100); // E5
            setTimeout(() => this.playTone(783.99, 0.2), 200); // G5
        },
        
        playStreak() {
            // Exciting streak sound
            this.playTone(659.25, 0.1, 'square'); // E5
            setTimeout(() => this.playTone(783.99, 0.1, 'square'), 80); // G5
            setTimeout(() => this.playTone(1046.50, 0.15, 'square'), 160); // C6
        },
        
        playMilestone() {
            // Epic milestone fanfare
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    this.playTone(523.25 + (i * 100), 0.1, 'sawtooth');
                }, i * 80);
            }
        },
        
        playClick() {
            this.playTone(800, 0.05);
        },
        
        playHover() {
            this.playTone(600, 0.03);
        }
    },
    
    // Particle system for confetti and celebrations
    particles: {
        createConfetti(x, y, count = 30) {
            const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'confetti-particle';
                particle.style.cssText = `
                    position: fixed;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    pointer-events: none;
                    z-index: 10000;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    transform: rotate(${Math.random() * 360}deg);
                `;
                
                document.body.appendChild(particle);
                
                const angle = (Math.random() * Math.PI * 2);
                const velocity = Math.random() * 8 + 4;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity - 5;
                const rotation = Math.random() * 720 - 360;
                
                particle.animate([
                    { 
                        transform: `translate(0, 0) rotate(0deg) scale(1)`,
                        opacity: 1
                    },
                    { 
                        transform: `translate(${vx * 30}px, ${vy * 30 + 200}px) rotate(${rotation}deg) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 1000 + Math.random() * 500,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                setTimeout(() => particle.remove(), 1500);
            }
        },
        
        createSparkles(element) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 8; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle-particle';
                sparkle.innerHTML = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    font-size: ${Math.random() * 20 + 15}px;
                    pointer-events: none;
                    z-index: 10000;
                `;
                
                document.body.appendChild(sparkle);
                
                const angle = (i / 8) * Math.PI * 2;
                const distance = 100;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                sparkle.animate([
                    { 
                        transform: `translate(-50%, -50%) scale(0)`,
                        opacity: 1
                    },
                    { 
                        transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1)`,
                        opacity: 0
                    }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                });
                
                setTimeout(() => sparkle.remove(), 800);
            }
        },
        
        createBurstEffect(element, emoji = '💥') {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 12; i++) {
                const burst = document.createElement('div');
                burst.textContent = emoji;
                burst.style.cssText = `
                    position: fixed;
                    left: ${centerX}px;
                    top: ${centerY}px;
                    font-size: 30px;
                    pointer-events: none;
                    z-index: 10000;
                `;
                
                document.body.appendChild(burst);
                
                const angle = (i / 12) * Math.PI * 2;
                const distance = Math.random() * 80 + 40;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                burst.animate([
                    { 
                        transform: `translate(-50%, -50%) scale(0) rotate(0deg)`,
                        opacity: 1
                    },
                    { 
                        transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5) rotate(360deg)`,
                        opacity: 0
                    }
                ], {
                    duration: 600,
                    easing: 'ease-out'
                });
                
                setTimeout(() => burst.remove(), 600);
            }
        }
    },
    
    // Streak management
    updateStreak() {
        const today = new Date().toDateString();
        const lastDate = this.streaks.lastCompletionDate;
        
        if (lastDate === today) {
            // Already counted today
            return this.streaks.current;
        }
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastDate === yesterdayStr) {
            // Continue streak
            this.streaks.current++;
        } else if (lastDate === null) {
            // First completion ever
            this.streaks.current = 1;
        } else {
            // Streak broken
            this.streaks.current = 1;
        }
        
        this.streaks.lastCompletionDate = today;
        
        if (this.streaks.current > this.streaks.best) {
            this.streaks.best = this.streaks.current;
        }
        
        return this.streaks.current;
    },
    
    checkStreakMilestone(streak) {
        return this.streaks.milestones.includes(streak);
    },
    
    // Task completion celebration
    celebrateTaskCompletion(element, taskName) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Play success sound
        this.sounds.playSuccess();
        
        // Create confetti
        this.particles.createConfetti(centerX, centerY, 20);
        
        // Create sparkles
        setTimeout(() => {
            this.particles.createSparkles(element);
        }, 100);
        
        // Pulse animation on the element (50% reduced intensity)
        element.animate([
            { transform: 'scale(1)', filter: 'brightness(1)' },
            { transform: 'scale(1.025)', filter: 'brightness(1.1)' },
            { transform: 'scale(1)', filter: 'brightness(1)' }
        ], {
            duration: 400,
            easing: 'ease-out'
        });
    },
    
    // Streak celebration
    celebrateStreak(streak) {
        this.sounds.playStreak();
        
        const message = document.createElement('div');
        message.className = 'streak-notification';
        message.innerHTML = `
            <div class="streak-number">🔥 ${streak} DAY STREAK! 🔥</div>
            <div class="streak-message">You're on fire! Keep it up!</div>
        `;
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%);
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            font-weight: bold;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            pointer-events: none;
        `;
        
        document.body.appendChild(message);
        
        // Animate in
        message.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(-10deg)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.1) rotate(5deg)', opacity: 1, offset: 0.5 },
            { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });
        
        // Create confetti burst
        setTimeout(() => {
            this.particles.createConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
        }, 200);
        
        // Animate out
        setTimeout(() => {
            message.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
            ], {
                duration: 300
            });
            setTimeout(() => message.remove(), 300);
        }, 2500);
    },
    
    // Milestone celebration
    celebrateMilestone(milestone, message) {
        this.sounds.playMilestone();
        
        const notification = document.createElement('div');
        notification.className = 'milestone-notification';
        notification.innerHTML = `
            <div class="milestone-icon">🏆</div>
            <div class="milestone-title">MILESTONE ACHIEVED!</div>
            <div class="milestone-message">${message}</div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 25px;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            pointer-events: none;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Epic entrance
        notification.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0) rotate(180deg)',
                opacity: 0,
                filter: 'blur(10px)'
            },
            { 
                transform: 'translate(-50%, -50%) scale(1.15) rotate(-10deg)',
                opacity: 1,
                filter: 'blur(0px)',
                offset: 0.6
            },
            { 
                transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                opacity: 1,
                filter: 'blur(0px)'
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });
        
        // Massive confetti explosion
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    this.particles.createConfetti(window.innerWidth / 2, window.innerHeight / 2, 40);
                }, i * 100);
            }
        }, 300);
        
        // Exit
        setTimeout(() => {
            notification.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: 'translate(-50%, -100%) scale(0)', opacity: 0 }
            ], {
                duration: 400
            });
            setTimeout(() => notification.remove(), 400);
        }, 4000);
    },
    
    // Category completion celebration
    celebrateCategoryCompletion(categoryName) {
        this.sounds.playMilestone();
        
        const notification = document.createElement('div');
        notification.className = 'category-complete-notification';
        notification.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 10px;">🎉</div>
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">AMAZING!</div>
            <div style="font-size: 16px;">${categoryName} is 100% Complete!</div>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: white;
            padding: 40px;
            border-radius: 25px;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
            pointer-events: none;
        `;
        
        document.body.appendChild(notification);
        
        // Rainbow confetti
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.particles.createConfetti(window.innerWidth / 2, window.innerHeight / 2, 30);
            }, i * 150);
        }
        
        setTimeout(() => {
            notification.style.transition = 'all 0.3s ease';
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -60%) scale(0.8)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    // Initialize the system
    init() {
        this.sounds.init();
        console.log('🎮 Gamification system initialized!');
    },
    
    // Save/load streak data
    saveData() {
        return {
            streaks: this.streaks
        };
    },
    
    loadData(data) {
        if (data && data.streaks) {
            this.streaks = { ...this.streaks, ...data.streaks };
        }
    }
};

// Initialize on load
if (typeof window !== 'undefined') {
    window.Gamification = Gamification;
    Gamification.init();
}
