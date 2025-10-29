# Creating Your First Category 📁

## What is a Category?

A **Category** represents a room or area in your home. Think of it as a container for related tasks.

**Examples of Categories:**
- 🍽️ Kitchen
- 🛁 Bathroom
- 🛏️ Bedroom
- 🧺 Laundry Room
- 🚗 Garage
- 🏡 Living Room

---

## Let's Create Your First Category!

### Step 1: Open the Add Category Modal

Look for the **"+"** button or **"Add Category"** button on your dashboard.

```
┌─────────────────────────┐
│   ➕ Add Category       │
└─────────────────────────┘
```

**Where to find it:**
- Usually at the top of the dashboard
- Or floating at the bottom corner
- Click it to open the category creation form

---

### Step 2: Enter Category Details

You'll see a simple form:

```
┌──────────────────────────────────┐
│  Create New Category             │
├──────────────────────────────────┤
│  Category Name:                  │
│  [________________]              │
│                                  │
│  [ Cancel ]  [ Create ]          │
└──────────────────────────────────┘
```

**Category Name Tips:**
- ✅ Keep it short and clear: "Kitchen", "Bathroom"
- ✅ Use emojis if you want: "🍽️ Kitchen", "🛁 Bathroom"
- ❌ Avoid super long names - they look better short!
- ❌ Don't duplicate existing category names

**Example Names:**
- Simple: "Kitchen", "Bedroom", "Garage"
- With Emojis: "🍽️ Kitchen", "🛏️ Master Bedroom", "🧺 Laundry"
- Descriptive: "Kids Bathroom", "Guest Room", "Front Yard"

---

### Step 3: Click "Create"

Once you're happy with the name, click the **Create** button!

**What happens next:**
- ✅ Your new category card appears on the dashboard
- 📋 It starts with 0% (no tasks yet - that's normal!)
- 🎉 Your robot celebrates your first category!
- 🔄 You're ready to add tasks to it

---

## Your First Category Created! 🎊

You should now see your new category card on the dashboard:

```
┌─────────────────────────┐
│  Kitchen          0%    │
│  ░░░░░░░░░░░░░░░░       │
│  No tasks yet!          │
└─────────────────────────┘
```

**Why is it 0%?**
- Categories without tasks show 0%
- Once you add tasks, the score will update automatically
- Don't worry - we'll add tasks in the next step!

---

## Category Types

### Regular Categories
These are the standard room/area categories you just created.
- Track tasks for specific locations
- Contribute to your overall home score
- Can have any name you choose

### Group Categories (Advanced)
Special categories that collect tasks from multiple places:
- 🧹 **SWEEP** - All sweep tasks across home
- 🧽 **MOP** - All mop tasks across home  
- 🗑️ **TRASH** - All trash tasks across home

**Note:** We'll cover these in a later tutorial. For now, stick with regular categories!

---

## Best Practices

### Organizing Your Home

**Start Small:**
1. Create 2-3 categories for your most-used rooms
2. Add tasks to those
3. Get comfortable with the system
4. Then expand to other rooms

**Common Setup:**
```
🏠 Home Dashboard
  ├─ 🍽️ Kitchen
  ├─ 🛁 Bathroom
  ├─ 🛏️ Bedroom
  ├─ 🧺 Laundry
  └─ 🏡 Living Room
```

**Pro Tips:**
- Don't create too many categories at once
- Keep category names short (displays better)
- You can always add more later!
- Edit or delete categories from the edit menu (pencil icon)

---

## Editing or Deleting Categories

**To Edit:**
1. Click the category card to enter it
2. Look for the edit/pencil icon
3. Change the name
4. Save changes

**To Delete:**
1. Enter the category
2. Open edit menu
3. Select "Delete Category"
4. Confirm deletion
5. ⚠️ Warning: This deletes all tasks in the category!

---

## What's Next?

Now that you have a category, let's add some tasks to it! In the next tutorial step, you'll learn how to create your first task with automatic freshness tracking.

---

**Tutorial Progress:** Step 3 of 24

**Previous:** Dashboard Overview  
**Next:** Adding Your First Task

---

## Technical Details (For Implementation)

### UI Elements to Highlight
- Add Category button
- Category name input field
- Create button
- New category card after creation

### Code References
- `showAddCategoryModal()` - Opens the modal
- `addCategory()` - Creates the category
- `renderDashboard()` - Updates to show new category

### Tutorial Overlay Steps
1. Highlight "Add Category" button with pulsing effect
2. Wait for user click
3. Highlight category name input
4. Wait for user to type something
5. Highlight "Create" button
6. Wait for category creation
7. Celebrate and highlight the new category card
8. Show "Next" button to continue tutorial

### Validation
- Ensure category name is not empty
- Check for duplicate names (warn but allow)
- Trim whitespace from input

### Demo Mode (Optional)
- Pre-fill "Kitchen" as suggested name
- Or let user type their own
- Provide examples if they seem stuck
