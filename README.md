# 🏠 UP-KEEP - Smart Home Maintenance Tracker

**Version 2.6** - An intelligent, gamified home maintenance app with AI-powered robot companions!

---

## ✨ Features

- 🤖 **AI Robot Companions** - Choose from multiple personalities including Default Bot 2.0 with DeepSeek AI
- 📊 **Smart Task Tracking** - Monitor freshness and maintenance schedules
- 🎮 **Battle System** - Turn chores into strategic battles!
- 🎯 **Daily Missions** - Earn rewards and level up
- 💰 **Currency & Store** - Unlock robot companions and power-ups
- 📱 **Self-Care Integration** - Track personal wellness alongside home tasks
- 🎨 **Beautiful UI** - Modern, responsive design with custom themes

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/upkeep.git
cd upkeep
```

### 2. Set Up API Keys (Optional - for Default Bot 2.0)
Default Bot 2.0 uses DeepSeek AI for intelligent, contextual responses. **This is optional** - other robot companions work without API keys!

📖 **[See Full API Setup Guide](docs/API-SETUP.md)**

**Quick Setup:**
1. Copy `API.TEMPLATE` to `API` (no file extension)
2. Get your DeepSeek API key from [platform.deepseek.com](https://platform.deepseek.com/)
3. Replace line 3 in `API` file with your key (starts with `sk-`)
4. Save and test!

### 3. Open the App
Simply open `index.html` in your browser - no build process needed!

```bash
# Option 1: Double-click index.html

# Option 2: Use a local server (recommended)
python -m http.server 8000
# Then open: http://localhost:8000
```

---

## 📖 Documentation

- **[Project Master Guide](docs/how-tos/PROJECT-MASTER-GUIDE.md)** - Complete architecture and features
- **[API Setup Guide](docs/API-SETUP.md)** - Secure API key configuration
- **[Dialogue System](robots/DIALOGUE-SYSTEM-README.md)** - Robot personality system
- **[Robot Registry](robots/README.md)** - Available robot companions

---

## 🔐 Security

⚠️ **CRITICAL:** This project uses API keys that should NEVER be committed to Git!

### Quick Security Check:
```powershell
# Run before EVERY push:
git status

# These should NOT appear:
# ❌ API
# ❌ g api (deleted - old Google key)
# ❌ *api-key*
```

### 📋 Security Resources:
- **[SECURITY-CHECK.md](SECURITY-CHECK.md)** - ⚠️ **READ THIS FIRST!** Complete security checklist
- **[API-SETUP.md](docs/API-SETUP.md)** - API key setup guide
- **`API.TEMPLATE`** - Safe template for API configuration

### 🚨 Important Notes:
- ✅ `API` file is protected by `.gitignore`
- ✅ Old Google API key (`g api`) has been deleted
- ⚠️ **If you had the Google key exposed, revoke it immediately!**
- ✅ See [SECURITY-CHECK.md](SECURITY-CHECK.md) for how to revoke

---

## 🏗️ Project Structure

```
upkeep/
├── index.html              # Main app (use this one!)
├── index-monolithic.html   # Single-file version
├── API                     # Your API keys (gitignored)
├── API.TEMPLATE            # Template for API setup
├── js/
│   ├── chore-system.js     # Core app logic + AI integration
│   ├── battle-system.js    # Battle game engine
│   ├── dialogue-loader.js  # Robot personality loader
│   └── robot-registry.js   # Robot companion registry
├── robots/
│   ├── registry.json       # Robot definitions
│   ├── scrappy-dialogue.json
│   └── [robot-folders]/    # Individual robot data
├── css/
│   └── styles.css          # App styling
├── Imag/                   # Images and assets
└── docs/
    ├── API-SETUP.md        # API security guide
    └── how-tos/
        └── PROJECT-MASTER-GUIDE.md
```

---

## 🎮 Robot Companions

Choose from multiple personalities:

- **Scrappy** - Cheerful default companion
- **Default Bot 2.0** - AI-powered with DeepSeek (contextual responses!)
- **Dusty** - Dust bunny expert
- **Mopsy** - Floor cleaning specialist
- **[More robots]** - Unlock in the store!

---

## 🌐 Deployment

### 🤔 Will Default Bot 2.0 Work on GitHub/Mobile?

**Short Answer:** 
- ❌ **No** - Not by default (API file is gitignored for security)
- ✅ **Yes** - With serverless functions OR by using Scrappy instead

See **[PRODUCTION-DEPLOYMENT.md](docs/PRODUCTION-DEPLOYMENT.md)** for complete guide!

---

### **Option 1: GitHub Pages (Easy - Use Scrappy)** ⭐ RECOMMENDED
```bash
# Just push to GitHub
git push origin main

# Enable GitHub Pages in repo settings
# Users select "Scrappy" robot (no API needed)
```

**Works for:** ✅ Scrappy and other non-AI robots  
**Doesn't work for:** ❌ Default Bot 2.0 (no API key access)

---

### **Option 2: Netlify with Serverless Functions (Secure AI Bot)** ⭐ BEST FOR AI
```bash
# 1. Push to GitHub
git push origin main

# 2. Deploy to Netlify
# - Connect repo at netlify.com
# - Add environment variable: DEEPSEEK_API_KEY
# - Uses netlify/functions/ai-response.js
```

**Works for:** ✅ All robots including Default Bot 2.0 with AI  
**API key:** ✅ Secure on server, never exposed  
**Cost:** ~$1-2/month for DeepSeek API calls

See **[PRODUCTION-DEPLOYMENT.md](docs/PRODUCTION-DEPLOYMENT.md)** for step-by-step setup!

---

### **Mobile App (Future)**
- Build with Cordova/Capacitor
- Use Netlify serverless function
- Or use Scrappy (no API needed)
- See [PRODUCTION-DEPLOYMENT.md](docs/PRODUCTION-DEPLOYMENT.md) for mobile guide

---

## 💡 Usage Tips

1. **Start Simple** - Add a few tasks to get familiar
2. **Use Task Lists** - Create templates for recurring task sets
3. **Group Categories** - Organize related tasks together
4. **Daily Missions** - Complete for bonus rewards
5. **Battle Mode** - Make chores competitive and fun!
6. **Self-Care** - Enable to track personal wellness

---

## 🛠️ Development

### Technology Stack
- **Frontend:** Pure JavaScript (no frameworks!)
- **Storage:** LocalStorage (no database needed)
- **AI:** DeepSeek API (optional)
- **Styling:** Custom CSS with modern design

### Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

**Important:** Never commit the `API` file!

---

## 📊 API Usage & Costs

**DeepSeek Pricing (Oct 2025):**
- ~$0.14 per 1M input tokens
- ~$0.28 per 1M output tokens
- **Estimate:** ~$1.50/month for regular personal use

**Free Alternatives:**
- Use Scrappy or other non-AI robot companions
- No API key needed!

---

## 🆘 Troubleshooting

### Bot Not Responding
- Check browser console (F12) for errors
- Verify `API` file exists and is formatted correctly
- See [API-SETUP.md](docs/API-SETUP.md) for detailed troubleshooting

### Tasks Not Saving
- Check browser LocalStorage quota
- Try clearing old data: Settings → Export → Clear

### Battle System Issues
- Ensure JavaScript is enabled
- Check for console errors
- Refresh the page

---

## 📝 License

[Your License Here - e.g., MIT, GPL, etc.]

---

## 🙏 Acknowledgments

- DeepSeek AI for API integration
- Modern CSS inspiration from various open-source projects
- Community feedback and contributions

---

## 📮 Contact

- **Issues:** [GitHub Issues](https://github.com/yourusername/upkeep/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/upkeep/discussions)

---

## 🔒 Security Notice

⚠️ **Never commit API keys!** Always use:
- `.gitignore` for local development
- Environment variables for production
- Serverless functions for mobile apps

See [API-SETUP.md](docs/API-SETUP.md) for complete security guidelines.

---

**Made with ❤️ and lots of cleaning motivation!**
