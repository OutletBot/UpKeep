# 🧪 Phase 4 Testing Checklist

## ✅ **What Was Implemented**

- Added `loadExternalData()` method that loads JSON files
- Made `app.init()` async to wait for data loading
- JSON loads from `data/store-robots.json` and `data/scrappy-dialogue.json`
- **Hardcoded fallbacks remain** - if JSON fails, app uses original data
- Comprehensive console logging for debugging

---

## 🔍 **Critical Tests to Run**

### **Test 1: Verify JSON Loads Successfully**

1. Open `index-modular.html` in browser
2. Open Console (F12)
3. Look for these messages:

**Expected:**
```
📦 Loading external data files...
✅ Store robots loaded from JSON: 4 robots
✅ Scrappy dialogue loaded from JSON
```

**Status:** ☐ PASS  ☐ FAIL

---

### **Test 2: Test Robot Store**

1. Click on settings (top right gear icon)
2. Scroll to "Robot Store" section
3. Click "Open Robot Factory"
4. Verify:
   - [ ] 4 robots appear (Jack-o'-Bot, Mega Rocket Man, Pika-Bot, Buzz)
   - [ ] Correct prices show (100, 150, 120, 180 Bolts)
   - [ ] Images load correctly
   - [ ] Scrappy says random greeting
   
**Status:** ☐ PASS  ☐ FAIL

---

### **Test 3: Test Scrappy Dialogue**

1. Open Robot Factory
2. Click on a robot to preview
3. Verify Scrappy speaks
4. Try different actions:
   - [ ] Purchase a robot → Scrappy says "purchased" line
   - [ ] Cancel purchase → Scrappy says "canceled" line
   - [ ] Just browse → Scrappy says "idle" line
   - [ ] Close modal → Scrappy says "goodbye" line

**Status:** ☐ PASS  ☐ FAIL

---

### **Test 4: Test Fallback (Simulate JSON Failure)**

1. Rename `data/store-robots.json` to `store-robots.json.disabled`
2. Refresh page
3. Look for console message:

**Expected:**
```
⚠️ Failed to fetch store-robots.json, using hardcoded fallback
ℹ️ Using hardcoded store robots (4 robots)
```

4. Open Robot Store
5. Verify it still works with hardcoded data

**Status:** ☐ PASS  ☐ FAIL

6. **Important:** Rename file back to `store-robots.json` when done!

---

### **Test 5: Test All Existing Features**

Verify NOTHING broke:
- [ ] Create new chore
- [ ] Complete chore
- [ ] Snooze chore
- [ ] Open battle system
- [ ] Move robots on board
- [ ] Spin battle wheel
- [ ] Check status effects
- [ ] Save/load works
- [ ] Settings work
- [ ] Mascot interactions work

**Status:** ☐ PASS  ☐ FAIL

---

## 🎯 **Success Criteria**

✅ All 5 tests pass  
✅ No console errors  
✅ JSON loads successfully  
✅ Fallback works if JSON missing  
✅ All existing features work

---

## 🔴 **If Any Test Fails:**

1. **STOP IMMEDIATELY**
2. Take screenshot of console errors
3. Note which test failed
4. Report back - I will fix it

---

## 📊 **Final Verification Commands**

Run these in browser console after page loads:

```javascript
// Check if JSON data was loaded
console.log('Store Robots:', app.storeRobots);
console.log('Scrappy Dialogue:', app.scrappyDialogue);

// Verify data structure
console.log('Robot count:', app.storeRobots.length);
console.log('Dialogue categories:', Object.keys(app.scrappyDialogue));
```

**Expected:**
- 4 robots
- 5 dialogue categories (greeting, idle, purchased, canceled, goodbye)

---

**Date:** October 16, 2025  
**Phase:** 4 - Data Extraction  
**Risk Level:** LOW (fallbacks ensure zero breakage)
