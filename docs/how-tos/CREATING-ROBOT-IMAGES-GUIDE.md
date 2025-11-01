# Creating Robot Images - Complete Guide 🎨

**Last Updated:** October 31, 2025  
**Purpose:** Step-by-step guide for creating robot companion images using Google AI + Adobe

---

## 📋 Overview

This guide shows you how to create custom robot images that match the Default Bot's style using:
1. **Google AI Image Generator** - For creating the base images
2. **Adobe AI Background Remover** - For removing backgrounds and creating transparency

**Time Required:** 30-60 minutes for 6 images  
**Cost:** Free (using Google AI + Adobe free tools)

---

## 🎯 What You'll Create

For each robot, you need **6 PNG images** with transparent backgrounds:

1. **happy.png** - Relieved/happy expression
2. **sad.png** - Worried/default expression
3. **thinking.png** - Calculating/analyzing expression
4. **shadow.png** - Black silhouette (for store)
5. **broken.png** - Powered down/depleted expression
6. **mad.png** - Frustrated/angry expression

**All images MUST match Default Bot's style exactly!**

---

## 🛠️ Tools You'll Need

### Required:
- **Google AI Image Generator** (Gemini, ImageFX, or similar)
- **Adobe Background Remover** (Photoshop, Express, or online tool)
- **Default Bot reference images** (from your project)

### Optional:
- Image editing software (for fine-tuning)
- File manager (for organizing)

---

## 📂 Step 0: Locate Default Bot Images

**Before starting, find these reference images in your project:**

```
robots/default-bot/images/
├── happy.png      ← Use as reference for happy expressions
├── sad.png        ← Use as reference for sad/worried expressions
├── thinking.png   ← Use as reference for thinking expressions
└── shadow.png     ← Use as reference for silhouette style
```

**Path:**
```
c:\Users\Figue\OneDrive\Desktop\windsurf-project-Up-Keep -  Befor Tutorial\robots\default-bot\images\
```

**⚠️ CRITICAL:** You'll upload these to Google AI as style references!

---

## 🎨 Step 1: Generate Images with Google AI

### For Each Image (Repeat 6 Times):

#### 1.1 Open Google AI Image Generator
- Go to Google's AI image tool (Gemini, ImageFX, etc.)
- Start a new image generation session

#### 1.2 Upload Reference Image
- Click "Upload Image" or "Add Reference"
- Upload the corresponding Default Bot image:
  - For happy.png → Upload default-bot/happy.png
  - For sad.png → Upload default-bot/sad.png
  - For thinking.png → Upload default-bot/thinking.png
  - For shadow.png → Upload default-bot/shadow.png
  - For broken.png → Upload default-bot/sad.png (as reference)
  - For mad.png → Upload default-bot/happy.png or sad.png

#### 1.3 Enter Prompt
Copy the appropriate prompt from below and paste into Google AI.

---

### Image Prompts (Copy & Paste These)

#### **Prompt 1: happy.png**
```
Create a robot character EXACTLY matching this reference style.

Robot name: Dusty - an anxious cleaning bot with a relieved/happy expression.

Physical features:
- Round chrome body with dents and tarnish marks
- Wide LED eyes showing relief (happy ^_^ expression)
- Left arm: small mop permanently attached
- Right arm: small feather duster permanently attached
- Chest: cracked sticker reading "CLEAN OR DIE" in red text
- One antenna bent on right side
- Stress cracks visible in chrome casing
- Posture: slightly relaxed, relieved stance

Colors:
- Body: Tarnished silver/chrome (#C0C0C0 with darker shading)
- Eyes: Blue LEDs (#4A90E2) showing happiness
- Sticker: Red text on cracked white background
- Mop: Brown handle, white mop head
- Duster: Brown handle, colorful feathers

Style requirements:
- EXACTLY match the reference robot's art style
- Same proportions, same line weight, same shading
- Same level of detail and rendering
- Cartoon mascot style, cute and friendly
- Front-facing view, full body visible
- Clean, simple design

Expression: "Finally, some peace!"
```

#### **Prompt 2: sad.png**
```
Create a robot character EXACTLY matching this reference style.

Robot name: Dusty - an anxious cleaning bot with a worried/sad expression.

Physical features:
- Round chrome body with dents and tarnish marks
- Wide worried LED eyes (⊙_⊙ anxious expression)
- Left arm: small mop permanently attached
- Right arm: small feather duster permanently attached
- Chest: cracked sticker reading "CLEAN OR DIE" in red text
- One antenna bent on right side
- Stress cracks visible in chrome casing
- Posture: hunched, nervous, anxious stance

Colors:
- Body: Tarnished silver/chrome (#C0C0C0 with darker shading)
- Eyes: Blue LEDs (#4A90E2) showing worry
- Sticker: Red text on cracked white background
- Mop: Brown handle, white mop head
- Duster: Brown handle, colorful feathers

Style requirements:
- EXACTLY match the reference robot's art style
- Same proportions, same line weight, same shading
- Same level of detail and rendering
- Cartoon mascot style, endearing but stressed
- Front-facing view, full body visible
- Clean, simple design

Expression: "Everything is NOT fine!"
```

#### **Prompt 3: thinking.png**
```
Create a robot character EXACTLY matching this reference style.

Robot name: Dusty - an anxious cleaning bot in thinking/calculating pose.

Physical features:
- Round chrome body with dents and tarnish marks
- LED eyes looking upward in thought, slightly squinted
- Left arm: small mop permanently attached
- Right arm: small feather duster permanently attached (raised to "chin" in thinking gesture)
- Chest: cracked sticker reading "CLEAN OR DIE" in red text
- One antenna bent, slightly twitching
- Stress cracks visible in chrome casing
- Posture: head tilted, one arm raised in thinking pose

Colors:
- Body: Tarnished silver/chrome (#C0C0C0 with darker shading)
- Eyes: Blue LEDs (#4A90E2) in analytical expression
- Sticker: Red text on cracked white background
- Mop: Brown handle, white mop head
- Duster: Brown handle, colorful feathers

Style requirements:
- EXACTLY match the reference robot's art style
- Same proportions, same line weight, same shading
- Same level of detail and rendering
- Cartoon mascot style, analytical but anxious
- Front-facing view, full body visible
- Clean, simple design

Expression: "Let me calculate the mess levels..."
```

#### **Prompt 4: shadow.png**
```
Create a solid black silhouette EXACTLY matching this reference style.

Silhouette of Dusty robot:
- Round robot body shape
- Left arm: mop visible in outline
- Right arm: feather duster visible in outline
- One bent antenna visible in silhouette
- Completely solid black (#000000)
- No internal details, just the outline shape
- No gradients, no shading, pure black

Style requirements:
- EXACTLY match the reference silhouette style
- Same proportions and shape as reference
- Clean, simple outline
- Front-facing view, full body visible
- Used for store display before purchase

Note: This is a mystery silhouette - no details visible, just shape.
```

#### **Prompt 5: broken.png**
```
Create a robot character EXACTLY matching this reference style.

Robot name: Dusty - an anxious cleaning bot in powered-down/broken state.

Physical features:
- Round chrome body, heavily tarnished and worn
- LED eyes dimmed/off or showing X_X expression (powered down)
- Left arm: mop drooping down limp
- Right arm: feather duster hanging limp
- Chest: cracked sticker reading "CLEAN OR DIE" in red text (faded)
- One antenna bent and drooping downward
- Stress cracks visible in chrome casing
- Posture: slumped, defeated, exhausted stance
- Optional: small "low battery" icon above head

Colors:
- Body: Darker tarnished silver/chrome (dimmed, no shine)
- Eyes: Dimmed/off blue LEDs or X_X
- Sticker: Faded red text on cracked white background
- Mop: Brown handle, white mop head (drooping)
- Duster: Brown handle, colorful feathers (limp)

Style requirements:
- EXACTLY match the reference robot's art style
- Same proportions, same line weight, same shading
- Same level of detail and rendering
- Cartoon mascot style, sad and depleted
- Front-facing view, full body visible
- Clean, simple design

Expression: "I can't go on... need power..."
```

#### **Prompt 6: mad.png**
```
Create a robot character EXACTLY matching this reference style.

Robot name: Dusty - an anxious cleaning bot in angry/frustrated state.

Physical features:
- Round chrome body with dents and tarnish marks
- LED eyes intense and angry (>_< or ಠ_ಠ expression, eyebrows furrowed)
- Left arm: mop raised up aggressively
- Right arm: feather duster raised up aggressively
- Chest: cracked sticker reading "CLEAN OR DIE" in red text
- Antenna fully upright and rigid (stress position, not bent)
- Stress cracks visible in chrome casing
- Posture: tense, aggressive, stressed stance
- Optional: small anger symbols (!) or steam coming from head

Colors:
- Body: Tarnished silver/chrome (#C0C0C0 with darker shading)
- Eyes: Intense blue LEDs (#4A90E2) showing anger
- Sticker: Red text on cracked white background (emphasized)
- Mop: Brown handle, white mop head (raised)
- Duster: Brown handle, colorful feathers (raised)

Style requirements:
- EXACTLY match the reference robot's art style
- Same proportions, same line weight, same shading
- Same level of detail and rendering
- Cartoon mascot style, frustrated but still endearing
- Front-facing view, full body visible
- Clean, simple design

Expression: "DUSTY! DUSTY! DUSTY! JUST DUST IT!"
Vibe: Frustrated but not scary, still cute
```

---

### 1.4 Generate & Refine

1. **Click Generate** in Google AI
2. **Review the result:**
   - Does it match Default Bot's style?
   - Are proportions correct?
   - Is the expression clear?
3. **If not perfect:**
   - Click "Regenerate" or "Try Again"
   - Emphasize "EXACTLY match reference style" in prompt
   - Try multiple times until satisfied
4. **Download the best version**

**Pro Tip:** Generate 2-3 variations and pick the best one!

---

## 🖼️ Step 2: Remove Background with Adobe

### For Each Downloaded Image:

#### 2.1 Open in Adobe Tool
**Options:**
- **Adobe Photoshop** - If you have it
- **Adobe Express** - Free online tool
- **Adobe Firefly** - Free AI background remover
- **Remove.bg** - Alternative free tool

#### 2.2 Remove Background
1. Upload the image to Adobe tool
2. Click **"Remove Background"** or **"Background Remover"**
3. Wait for AI to process (usually 5-10 seconds)
4. **Verify transparency:**
   - Check edges are clean
   - No white halos or artifacts
   - Robot is fully separated from background

#### 2.3 Fine-Tune (If Needed)
- Use **Eraser tool** to clean up any remaining background
- Use **Refine Edge** to smooth transitions
- Ensure all edges are crisp and clean

#### 2.4 Export as PNG
**Settings:**
- **Format:** PNG
- **Quality:** High or Maximum
- **Transparency:** Enabled/Yes
- **Color Mode:** RGB
- **Bit Depth:** 32-bit (if available)

**File Naming:**
- Save with exact filename (lowercase)
- Examples: `happy.png`, `sad.png`, `thinking.png`

---

## 📁 Step 3: Save to Project

### 3.1 Navigate to Dusty Images Folder

**Path:**
```
c:\Users\Figue\OneDrive\Desktop\windsurf-project-Up-Keep -  Befor Tutorial\robots\dusty\images\
```

### 3.2 Save Each File with Exact Names

**⚠️ CRITICAL - Filenames must be EXACT (lowercase, .png):**

```
happy.png
sad.png
thinking.png
shadow.png
broken.png
mad.png
```

**NOT:**
- ❌ Happy.png (capital H)
- ❌ happy.PNG (capital PNG)
- ❌ happy (no extension)
- ❌ happy-dusty.png (extra text)

### 3.3 Verify Files

**Check that all 6 files exist:**
```
robots/dusty/images/
├── happy.png      ✅
├── sad.png        ✅
├── thinking.png   ✅
├── shadow.png     ✅
├── broken.png     ✅
└── mad.png        ✅
```

---

## 🧪 Step 4: Test In-Game

### 4.1 Start the App
1. Open terminal in project folder
2. Run: `python -m http.server 8000`
3. Open browser to `http://localhost:8000`

### 4.2 Test Robot Store
1. Click **Robot Factory** bubble (bottom left)
2. **Look for Dusty:**
   - Should show shadow.png silhouette
   - Price: 150 bolts
   - Name: "Dusty"
3. **Purchase Dusty** (if you have 150 bolts)

### 4.3 Test Robot Selection
1. Click **Robot Select** bubble (bottom right)
2. **Find Dusty** in the list
3. **Select Dusty** as active robot
4. **Verify happy.png** displays correctly

### 4.4 Test All Expressions
1. **Happy:** Complete a task → Should show happy.png
2. **Sad:** Default state → Should show sad.png
3. **Thinking:** Random idle → Should show thinking.png
4. **Mad:** Let tasks go red → Should show mad.png
5. **Broken:** Let battery drain to <10% → Should show broken.png

### 4.5 Test Dialogue
- Verify Dusty's anxious dialogue appears
- Check for "DUSTY! DUSTY! DUSTY! JUST DUST IT!" when mad
- Confirm 44+ unique dialogue lines work

---

## ✅ Quality Checklist

Before finalizing, verify:

### Visual Quality:
- [ ] All 6 images match Default Bot's style
- [ ] Same proportions and dimensions
- [ ] Consistent art style across all images
- [ ] Clean, crisp edges (no blur or artifacts)
- [ ] Transparent backgrounds (no white halos)
- [ ] Colors match specifications
- [ ] All unique features visible (mop, duster, sticker, bent antenna)

### Technical Quality:
- [ ] All files are PNG format
- [ ] All files have transparency
- [ ] Filenames are exact (lowercase, .png)
- [ ] Files are in correct folder
- [ ] File sizes reasonable (<100KB each)
- [ ] No corruption or errors

### Functional Quality:
- [ ] Dusty appears in Robot Factory store
- [ ] Shadow displays correctly in store
- [ ] Can purchase Dusty for 150 bolts
- [ ] Dusty appears in robot selection
- [ ] Can select Dusty as active robot
- [ ] All 6 expressions display correctly
- [ ] Dialogue system works
- [ ] No visual glitches or errors

---

## 🐛 Troubleshooting

### Problem: Images don't match Default Bot style
**Solution:**
- Regenerate in Google AI with stronger emphasis on "EXACTLY match reference"
- Upload Default Bot image as reference again
- Try multiple generations and pick best
- Consider manual editing in Photoshop to match style

### Problem: Background not fully transparent
**Solution:**
- Re-process in Adobe background remover
- Use Photoshop's "Select and Mask" for fine-tuning
- Manually erase remaining background pixels
- Check for white halos and remove

### Problem: Images too large/small
**Solution:**
- Resize in Photoshop/GIMP to match Default Bot dimensions
- Maintain aspect ratio when resizing
- Use "Nearest Neighbor" or "Bicubic" interpolation
- Re-export as PNG

### Problem: Dusty doesn't appear in store
**Solution:**
- Verify `store-robots.json` has Dusty entry
- Check image paths are correct
- Ensure filenames are exact (lowercase)
- Clear browser cache and reload
- Check browser console for errors

### Problem: Wrong expression showing
**Solution:**
- Verify filenames are exact (happy.png, sad.png, etc.)
- Check files are in correct folder
- Clear browser cache
- Restart server

### Problem: "CLEAN OR DIE" sticker not visible
**Solution:**
- Regenerate image with emphasis on sticker
- Manually add text in Photoshop after generation
- Use red text on white/light background
- Add crack effect for authenticity

---

## 💡 Pro Tips

### For Better Results:
1. **Generate multiple variations** - Pick the best one
2. **Use Default Bot as reference** - Upload every time
3. **Be specific in prompts** - More detail = better results
4. **Iterate if needed** - Don't settle for first attempt
5. **Keep source files** - Save originals before removing background
6. **Batch process** - Do all 6 at once for consistency

### Time-Saving Tricks:
1. **Start with sad.png** - Use as base for other expressions
2. **Shadow is easiest** - Do this first to build confidence
3. **Test early** - Don't wait for all 6, test as you go
4. **Use templates** - Save your prompts for future robots
5. **Organize files** - Keep originals separate from finals

### Style Matching:
1. **Study Default Bot carefully** - Note every detail
2. **Match proportions exactly** - Use overlay comparison
3. **Same line weight** - Edges should be similar thickness
4. **Same shading style** - Observe how Default Bot uses shadows
5. **Consistent colors** - Use color picker on Default Bot

---

## 📊 Expected Timeline

**Per Robot (6 images):**
- Image generation: 30-45 minutes
- Background removal: 15-20 minutes
- Testing & refinement: 15-30 minutes
- **Total: 60-95 minutes**

**For Dusty (first robot):**
- Learning process: +30 minutes
- **Total: 90-125 minutes**

**For subsequent robots:**
- Faster with experience: 45-60 minutes

---

## 🎯 Success Criteria

**You're done when:**
- ✅ All 6 PNG images created
- ✅ All images match Default Bot style
- ✅ All backgrounds transparent
- ✅ All files in correct folder with exact names
- ✅ Dusty appears in Robot Factory store
- ✅ Can purchase and select Dusty
- ✅ All 6 expressions display correctly in-game
- ✅ Dialogue system works perfectly
- ✅ No visual glitches or errors

---

## 📚 Additional Resources

### Reference Files:
- `robots/dusty/images/AI-IMAGE-PROMPTS.md` - Detailed prompts
- `robots/dusty/images/IMAGE-REQUIREMENTS.md` - Technical specs
- `robots/dusty/README.md` - Character guide
- `robots/dusty/dialogue.json` - All dialogue lines

### Default Bot Reference:
- `robots/default-bot/images/` - Style reference images
- Study these carefully before starting!

### Tools:
- **Google AI:** Gemini, ImageFX, or similar
- **Adobe:** Photoshop, Express, Firefly
- **Alternative:** Remove.bg, Canva, GIMP

---

## 🔄 Creating Additional Robots

**Once you've created Dusty, you can use this same process for any new robot!**

**Steps:**
1. Create robot folder: `robots/[robot-name]/`
2. Create `robot.json` and `dialogue.json`
3. Follow this guide to create 6 images
4. Add to `store-robots.json`
5. Test in-game

**Each robot gets easier as you learn the workflow!**

---

**Created:** October 31, 2025  
**For:** UpKeep Robot Companion System  
**Next:** Create more robots or move to tutorial implementation!

---

**Questions?** Refer to troubleshooting section or check reference files in `robots/dusty/` folder.

**Good luck creating amazing robot companions!** 🤖✨
