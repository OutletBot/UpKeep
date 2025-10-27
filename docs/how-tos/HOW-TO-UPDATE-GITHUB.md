# How to Publish Up-Keep Changes to GitHub

_Last updated: October 19, 2025_

This guide walks through the exact Git commands to keep the `main` branch in sync with your local work. Follow every step in order—especially the safety checks—so nothing gets lost.

---

## 1. Prep: Verify Repo Status

```powershell
git status
```

- **If the working tree is clean** → skip to Step 3.
- **If files are listed under "Changes not staged for commit" or "Untracked files":** continue with Step 2 to stage them.

---

## 2. Stage Files

Stage everything you want to include in the next commit. Use whichever pattern fits your workflow:

### Option A: Stage everything (new + modified + deletions)
```powershell
git add .
```

### Option B: Stage specific paths (safer when you only want certain files)
```powershell
git add path/to/file path/to/other-file
```

> ✅ Tip: Run `git status` again to confirm the "Changes to be committed" list only contains what you expect.

---

## 3. Pull Latest Changes (Prevents Push Rejection)

Always integrate remote changes before committing your work:
```powershell
git pull origin main
```

- **If Git reports a merge conflict:** resolve the files, then continue with `git add` on the resolved files.
- After a successful pull, run `git status` to ensure the staging area is still correct.

---

## 4. Commit with a Descriptive Message

Once staging looks good, create your commit:
```powershell
git commit -m "<summary of what changed>"
```

Example:
```powershell
git commit -m "Add Ouija-Bot battle mechanics and update docs"
```

---

## 5. Push to GitHub

Send the committed work to the remote `main` branch:
```powershell
git push origin main
```

- Wait for the success message that ends with `main -> main`.
- If Git says you need to pull first, go back to Step 3, pull, resolve any issues, commit, and push again.

---

## 6. Confirm on GitHub (Optional but Recommended)

1. Open your repo: `https://github.com/OutletBot/UpKeep`
2. Verify the most recent commit matches your message
3. Click **Code → main** to confirm new files and doc updates are present

---

## 7. Shortcut Script (Optional)

If you want a one-line helper after reviewing changes:
```powershell
# Run ONLY when you're confident everything should be staged
./quick-push.ps1
```

Where `quick-push.ps1` contains:
```powershell
param(
    [string]$Message = "Quick sync"
)

git add .
git pull origin main
git commit -m $Message
git push origin main
```

> ⚠️ Only use automation when you are certain the working tree is ready. Always review `git status` before running helper scripts.

---

## 8. Troubleshooting

- **Push rejected (non-fast-forward):**
  - Run `git pull origin main`
  - Resolve any merge conflicts
  - Re-run `git push origin main`

- **Staged something by mistake:**
  - Undo staging without losing edits: `git restore --staged path/to/file`

- **Need to drop local changes entirely:**
  - WARNING: This discards work → `git checkout -- path/to/file`

- **Line-ending warnings:**
  - Informational on Windows. No action needed unless you require LF endings for tooling.

---

## 9. Quick Reference Flow

```powershell
git status
# (optional selective staging)
git add .
git status
git pull origin main
git commit -m "<message>"
git push origin main
git status
```

Keep this checklist handy each time you publish changes to ensure a smooth GitHub update every time.
