# Save File Management 📁

**Robot Speech (TTS):** *"Save Files let you manage multiple homes or experiment with different setups! You can have separate task lists for different houses, or test configurations!"*

---

## What are Save Files?

**Save Files** store all your app data:
- Categories and tasks
- Freshness percentages
- Completion history
- Robot selection
- Currency (bolts)
- Settings

**Think of them as:**
- Different "profiles" or "accounts"
- Separate instances of the app
- Independent task lists

---

## Use Cases

**Multiple Homes:**
- Main house save
- Vacation home save
- Office space save

**Experimentation:**
- Test different task lists
- Try new organization systems
- Keep original safe

**Fresh Start:**
- Start over without losing progress
- Compare old vs new approaches

---

## Current Save Display

**Top of dashboard:**
```
📁 Current Save: Default Save
```

**Click it** → Opens save file management modal

---

## Save File Operations

### View All Saves
- Lists all your save files
- Shows last modified date
- Indicates active save

### Switch Save
- Click different save to switch
- All data switches instantly
- Previous save preserved

### Create New Save
- Button: "Create New Save"
- Name your save
- Starts fresh (default template)

### Export Save
- Exports to JSON file
- Download to device
- Backup or share

### Import Save
- Upload JSON file
- Restores from backup
- Can share between devices

### Delete Save
- **Permanent deletion!**
- Cannot be undone
- Confirmation required

---

## Export/Import Process

**Export:**
1. Settings → Save Files
2. Select save to export
3. Click "Export"
4. JSON file downloads
5. Save file backed up!

**Import:**
1. Settings → Save Files
2. Click "Import Save"
3. Select JSON file
4. Save loads into app
5. Can switch to it immediately

**File Format:** JSON (human-readable)

---

## Default Save

**"Default Save"** comes with the app

**Contains:**
- Pre-made categories (Kitchen, Bathroom, etc.)
- 70+ common household tasks
- Reasonable decay times
- Ready to use immediately

**Can't delete:** Default Save is protected

---

## Best Practices

**Naming Saves:**
- Descriptive: "Main House", "Mom's House"
- Date stamps: "Experimental 2025-01"
- Purpose: "Minimalist Setup"

**Backup Strategy:**
- Export main save monthly
- Before major changes
- Keep recent backups

**Organization:**
- Delete unused saves
- Keep it simple (2-3 saves max)
- Label clearly

---

## Technical Notes

**Storage:** LocalStorage (browser-based)

**Data Structure:**
```javascript
{
    categories: [...],
    currentSaveFile: 'default',
    currency: 250,
    selectedRobotId: 'default',
    // ... all app data
}
```

**Switching saves:**
- Saves current data
- Loads selected save
- Updates entire UI

---

**Tutorial Progress:** Step 18 of 24  
**Previous:** Self-Care Usage | **Next:** Settings
