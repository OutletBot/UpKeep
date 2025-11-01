# Clear Netlify Browser Cache - Fix API Bot

## The Problem
Your browser cached the old `robots/api-bot-2/dialogue.json` file, so the bot displays the old text instead of triggering the AI API.

## The Solution - Hard Refresh

### On Netlify Site:
1. **Open your Netlify site** in the browser
2. **Press one of these key combinations:**
   - **Chrome/Edge**: `Ctrl + Shift + R` or `Ctrl + F5`
   - **Firefox**: `Ctrl + Shift + R` or `Ctrl + F5`
   - **Safari**: `Cmd + Shift + R`

3. **Alternative method:**
   - Open DevTools (`F12`)
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

### What This Does:
- Clears ALL cached files (dialogue.json, images, scripts)
- Forces browser to download fresh versions from Netlify
- The bot will now see `ENHANCED_INTELLIGENCE_ACTIVE` and trigger the AI

## Verify It Worked:
After hard refresh, check the console (F12) for these messages when the bot speaks:
```
🤖 [API Bot] Enhanced Intelligence detected, calling AI...
🌐 [API Bot] Trying Netlify function...
✅ [API Bot] Netlify response: [unique AI message]
```

## If Still Not Working:
1. Clear browser data completely (Settings → Privacy → Clear browsing data)
2. Try in an Incognito/Private window
3. Try a different browser
4. Check Netlify deployment logs to confirm latest version is deployed
