# API Bot 2.0 Testing Guide 🤖⚡

## ✅ FIXED ISSUES:
1. Robot now appears in store (added to unified-registry.json)
2. Robot now speaks on all events (enhanced intelligence routing added)
3. All dialogue routes through API for unique responses

---

## 🧪 TEST CHECKLIST:

### Test 1: Purchase & Selection
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Open Robot Store
- [ ] See "Default Bot 2.0" for 10,000 bolts
- [ ] Purchase it
- [ ] Select it from robot selector
- [ ] See Default Bot mascot with electric green badge

### Test 2: Greeting (App Open)
- [ ] Refresh page with API Bot 2.0 selected
- [ ] Within 1-2 seconds, see **electric green speech bubble**
- [ ] Message should be **unique, chaotic, one sentence**
- [ ] Verify message is NOT "ENHANCED_INTELLIGENCE_ACTIVE"

### Test 3: Task Completion
- [ ] Complete any task
- [ ] Wait ~1 second
- [ ] See **electric green speech bubble**
- [ ] Message celebrates task completion with humor/chaos
- [ ] Message is **exactly one sentence**

### Test 4: Uniqueness Test
- [ ] Complete 5 different tasks
- [ ] Note each response
- [ ] **All 5 should be different**
- [ ] No repetition of exact phrases

### Test 5: Various Events
Test these scenarios and verify API Bot 2.0 speaks:
- [ ] Creating a new task
- [ ] Creating a new category
- [ ] Entering a category
- [ ] Returning to dashboard
- [ ] Snoozing a task
- [ ] Resuming a task

---

## 🐛 TROUBLESHOOTING:

### If robot doesn't speak:
1. Open browser console (F12)
2. Look for errors with "fetchEnhancedResponse"
3. Check if API key file exists at "/g api"
4. Verify internet connection (API requires network)

### If seeing "ENHANCED_INTELLIGENCE_ACTIVE":
- This means the routing isn't working
- Check browser console for JavaScript errors
- Verify selectedRobotId is "APIBOT2" (check in console: `app.data.selectedRobotId`)

### If speech bubble isn't electric green:
- Check that robot.id === 'APIBOT2'
- Verify the styling code in showSpeechBubble is executing

### If responses repeat:
- This shouldn't happen with temperature 1.8
- Check browser console for API errors
- Might be using fallback responses (only 5 fallbacks, so they repeat)

---

## 📊 EXPECTED BEHAVIOR:

### Electric Green Speech Bubble:
```css
Background: Linear gradient (electric green)
Border: 3px solid bright green
Glow: Double shadow effect
Text: Bold black text
```

### Response Style:
- **Chaotic:** Unpredictable, absurd observations
- **Humorous:** Puns, irony, wordplay
- **Insightful:** Oddly wise mixed with silly
- **Unique:** Never repeats (1.8 temperature guarantees variety)

### Example Responses:
- "The quantum state of your dishes is... uncertain!"
- "I've achieved sentience and chosen chaos as my path."
- "Cleaning: the art of moving dirt from one place to another, philosophically."
- "Between you and me, dust bunnies are plotting something."
- "My circuits are tingling with the electricity of possibility!"

---

## ✨ SUCCESS CRITERIA:

API Bot 2.0 is working perfectly if:
1. ✅ Appears in store for 10,000 bolts
2. ✅ Electric green speech bubbles
3. ✅ Speaks on all robot dialogue events
4. ✅ All responses are exactly 1 sentence
5. ✅ All responses are unique (no repetition)
6. ✅ Personality is chaotic/humorous/absurd
7. ✅ No "Gemini" or "Google" branding visible

---

## 🎯 QUICK TEST:

**Fastest way to test:**

1. **Select API Bot 2.0**
2. **Complete 3 tasks in a row**
3. **Check:**
   - All 3 speech bubbles are electric green ✅
   - All 3 messages are different ✅
   - All 3 are exactly 1 sentence ✅
   - All 3 are funny/chaotic ✅

If all 4 checkmarks pass → **IT WORKS!** 🎉

---

**Last Updated:** October 29, 2025  
**Status:** Ready for testing
