# 📤 How to Deploy Up-Keep to GitHub Pages

**Last Updated:** October 18, 2025  
**Maintained by:** Up-Keep Dev Team

---

## 🔐 Prerequisites

- GitHub account (`username` email `emailhere`)
- Project folder: `C:/Users/Figue/Desktop/windsurf/windsurf-project-Up-Keep/`
- Git installed (Windows installer puts it in PATH)
- Browser for GitHub authentication (Edge/Chrome)

---

## 📦 One-Time Setup (Create Repo + First Deploy)

1. **Sign in to GitHub**
   - https://github.com/login

2. **Create new repository**
   - Click “+” → “New repository”
   - Name: `UpKeep`
   - Visibility: Public
   - Do NOT initialize with README
   - Click "Create repository"

3. **Open PowerShell in project folder**
   ```powershell
   cd "C:/Users/Figue/Desktop/windsurf/windsurf-project-Up-Keep"
   ```

4. **Initialize Git & set remote**
   ```powershell
git init
git remote add origin https://github.com/OutletBot/UpKeep.git
   ```

5. **Set identity (only once per machine)**
   ```powershell
git config --global user.name "OutletBot"
git config --global user.email "alexanderfigueroalaptop@gmail.com"
   ```

6. **Stage everything**
   ```powershell
git add .
   ```

7. **Commit initial snapshot**
   ```powershell
git commit -m "Initial commit"
   ```

8. **Rename branch to main**
   ```powershell
git branch -M main
   ```

9. **Push to GitHub**
   ```powershell
git push -u origin main
   ```
   - Browser opens → authorize GitHub
   - Wait for push to finish (can take a minute)

10. **Enable GitHub Pages**
    - On GitHub repo: Settings → Pages
    - Source: `main` branch, `/ (root)`
    - Click Save
    - Wait for green success banner with URL: `https://outletbot.github.io/UpKeep/`

11. **Test on phone**
    - Open `https://outletbot.github.io/UpKeep/`
    - If cached, hard refresh (Chrome menu → Refresh symbol ↻)

---

## 🔄 Routine Updates (After First Deploy)

Whenever you make local changes:

1. **Run local server & test**
   - Use `START-SERVER.bat` or `python -m http.server 8000`
   - Verify everything works locally

2. **Stage modified files**
   ```powershell
git status      # optional preview
git add .
   ```

3. **Commit changes**
   ```powershell
git commit -m "Describe what changed"
   ```

4. **Push to GitHub**
   ```powershell
git push
   ```
   - (No need for `-u origin main` after the first push)

5. **Wait for GitHub Pages**
   - Usually updates within 1-2 minutes
   - Hard refresh browser (`Ctrl+Shift+R` on desktop, or pull-to-refresh on phone)

---

## 📲 Testing on Android Phone

1. Connect to Wi-Fi (same network as PC if using local server)
2. For GitHub Pages deployment: open `https://outletbot.github.io/UpKeep/`
3. For local testing via PC server:
   - Keep PowerShell server running on PC (`python -m http.server 8000`)
   - On Android browser, type your PC’s IP: `http://192.168.x.x:8000`
   - IP: `ipconfig` on PC → look for "IPv4 Address"

---

## 🛠️ Troubleshooting

- **Push fails (400 error)** → Remote URL still placeholder. Set with:  
  `git remote set-url origin https://github.com/OutletBot/UpKeep.git`

- **"Author identity unknown"** → Set name/email (Step 5).

- **Authentication failed** → Use browser prompt or generate a personal access token (PAT) from GitHub → use as password.

- **Changes not live** → Hard refresh browser, wait up to 2 minutes; check GitHub Pages deploy logs (Settings → Pages → Check last build).

---

## ✅ Quick Reference Cheatsheet

- **Initial deploy** (one-time):
  ```powershell
git init
git remote add origin https://github.com/OutletBot/UpKeep.git
git config --global user.name "OutletBot"
git config --global user.email "alexanderfigueroalaptop@gmail.com"
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
  ```

- **Daily update**:
  ```powershell
git add .
git commit -m "Update"
git push
  ```

- **Enable Pages**: Settings → Pages → Source `main` / `/ (root)`
- **Live URL**: `https://outletbot.github.io/UpKeep/`
- **Force refresh**: Desktop `Ctrl+Shift+R`; Android pull-to-refresh or reopen tab

---

## 🗂️ Related Docs

- `docs/how-tos/PROJECT-MASTER-GUIDE.md`
- `docs/how-tos/QUICK-START-WEBAPP.md`
- `docs/2025-10-18/AI-BATTLE-SIMULATOR-IMPLEMENTATION.md`

---

Happy deploying! 🚀
