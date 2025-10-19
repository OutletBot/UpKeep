# Robot Dialogue System - Refactored Architecture

## Overview
The dialogue system has been refactored to load dialogues from individual robot files instead of embedding them in the chore-system.js file. This makes the system scalable for 150+ robots.

## Architecture

### File Structure
```
robots/
├── [robot-folder-name]/
│   ├── dialogue.json          # Robot's custom dialogue (NEW)
│   ├── chore-data.json        # Robot's chore configuration
│   ├── robot.json             # Robot metadata
│   └── images/                # Robot images
├── unified-registry.json      # Registry of all robots
└── scrappy-dialogue.json      # Scrappy's shop dialogue
```

### Key Components

#### 1. **ChoreRobotLoader** (`js/chore-robot-loader.js`)
- Loads the unified registry to discover available robots
- Fetches `dialogue.json` from each robot's folder
- Combines robot data with dialogue data
- Caches loaded robots for performance

#### 2. **ChoreSystem** (`js/chore-system.js`)
- Contains minimal fallback robot array (just default bot)
- Uses `ChoreRobotLoader` to populate robots array on initialization
- No longer contains hardcoded dialogues (reduced from 378KB to manageable size)

#### 3. **Individual Robot Dialogue Files** (`robots/[robot-name]/dialogue.json`)
Each robot now has its own dialogue.json file with the following structure:

```json
{
  "hasCustomDialogue": true,
  "greeting": [
    "Line 1",
    "Line 2",
    ...
  ],
  "success": [
    "Line 1",
    "Line 2",
    ...
  ],
  "achievement": [
    "Line 1",
    "Line 2",
    ...
  ],
  "broken": [
    "Line 1",
    "Line 2",
    ...
  ],
  "random": [
    "Line 1",
    "Line 2",
    ...
  ],
  "mad": [
    "Line 1",
    "Line 2",
    ...
  ]
}
```

## Loading Flow

1. **Application Initialization**
   ```
   chore-system.js init() → loadExternalData()
   ```

2. **ChoreRobotLoader Initialization**
   ```
   ChoreRobotLoader.initialize()
   ├─ Load unified-registry.json
   ├─ Load scrappy-dialogue.json
   └─ Build robot registry
   ```

3. **Robot Loading**
   ```
   ChoreRobotLoader.loadAllRobots()
   └─ For each robot in registry:
      ├─ Load chore-data.json
      ├─ Load dialogue.json (parallel)
      └─ Combine into full robot object
   ```

4. **Fallback Mechanism**
   - If ChoreRobotLoader fails → Use minimal hardcoded array
   - If individual dialogue.json missing → Robot has no custom dialogue
   - System continues to function with available data

## Benefits

✅ **Scalability**: Can support 150+ robots without bloating main JS file
✅ **Maintainability**: Each robot's dialogue is in its own file
✅ **Performance**: Parallel loading of robot data and dialogue
✅ **Organization**: Clear separation of concerns
✅ **Flexibility**: Easy to add/edit/remove robot dialogues

## Migration Status

### Completed
- ✅ ChoreRobotLoader updated to load dialogue.json files
- ✅ Removed **all hardcoded robot dialogues** from chore-system.js (~380 lines)
- ✅ Removed **all Scrappy's hardcoded dialogue** from chore-system.js (~140 lines)
- ✅ Fixed Scrappy dialogue path: `robots/scrappy-dialogue.json` (was incorrectly `data/`)
- ✅ Total reduction: **~520 lines** of hardcoded dialogue removed
- ✅ Updated existing dialogue files:
  - `jack-o-bot/dialogue.json`
  - `mega-rocket-man/dialogue.json`
  - `pika-bot/dialogue.json`
  - `buzz-lite-point-0/dialogue.json`
  - `clown-bot/dialogue.json`
  - `witch-bot/dialogue.json`
  - `freezy/dialogue.json`
  - `scrappy-dialogue.json` (shop keeper)

### Robot Dialogue Files Present
- ✅ buzz-lite-point-0
- ✅ clown-bot
- ✅ default-bot
- ✅ freezy
- ✅ jack-o-bot
- ✅ mega-rocket-man
- ✅ pika-bot
- ✅ witch-bot

## Adding a New Robot

To add a new robot with custom dialogue:

1. **Create robot folder** in `robots/`
   ```
   robots/new-robot-name/
   ```

2. **Add dialogue.json**
   ```json
   {
     "hasCustomDialogue": true,
     "greeting": ["Hello!", "Hi there!"],
     "success": ["Task done!", "Complete!"],
     "achievement": ["Achievement unlocked!"],
     "broken": ["Need repairs!"],
     "random": ["Random thought..."],
     "mad": ["This is frustrating!"]
   }
   ```

3. **Add to unified-registry.json**
   ```json
   {
     "id": "NEWROBOT",
     "name": "New Robot",
     "folder": "new-robot-name",
     "purchasable": true,
     "cost": 100
   }
   ```

4. **Add chore-data.json** (if needed)

5. **Test**: The robot will be automatically loaded on next app initialization

## Debugging

Enable detailed logging by checking the browser console:
- `📦 Loading external data files...` - Start of loading process
- `✅ Loaded chore robot: [Name] (with custom dialogue)` - Robot loaded successfully
- `ℹ️ No custom dialogue found for [folder]` - Robot has no dialogue.json
- `❌ Failed to load chore robot [ID]` - Robot loading error

## Performance Notes

- Dialogues are loaded in parallel with robot data
- Loaded robots are cached in `ChoreRobotLoader.loadedRobots`
- Clear cache with `ChoreRobotLoader.clearCache()` if needed
- Stats available via `ChoreRobotLoader.getStats()`

## File Size Impact

**Before**: chore-system.js = 378KB (too large to read)
- Included ~380 lines of robot dialogues
- Included ~140 lines of Scrappy's dialogue

**After**: chore-system.js = ~6,800 lines (manageable & readable)
- Removed all hardcoded robot dialogues
- Removed all hardcoded Scrappy dialogue
- Both now load from external JSON files

**Individual dialogue.json files**: ~1-2KB each
**scrappy-dialogue.json**: ~8KB

For 150 robots:
- Total dialogue data: ~150-300KB (distributed across files)
- Scrappy dialogue: ~8KB (in separate file)
- Main JS file: Stays manageable
- Parallel loading improves perceived performance
