# 🔐 SECURITY CHECK - Before Pushing to GitHub

## ⚠️ CRITICAL: Run This Before Every Push!

---

## 🚨 IMMEDIATE ACTION REQUIRED

### **Google API Key Was Exposed**
The old Google Gemini API key from file "g api" was accidentally displayed. **You MUST revoke it immediately:**

**Exposed Key (first 10 chars):** `AIzaSyAS0a...`

### **How to Revoke:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services → Credentials**
3. Find the API key: `AIzaSyAS0aVjc1oDK06UavaTK80t4gGXsDKOEI8`
4. Click **Delete** or **Regenerate**
5. Confirm deletion

**Status:** ✅ File deleted locally, but key may have been exposed in chat/logs

---

## ✅ Pre-Push Security Checklist

### 1. Check for API Key Files
```powershell
# Run this command in the project root:
git status

# These files should NOT appear:
# ❌ API
# ❌ g api
# ❌ google-api*
# ❌ *api-key*
# ❌ secrets.txt
```

### 2. Verify .gitignore is Working
```powershell
# These should return paths (meaning they're ignored):
git check-ignore API
git check-ignore "g api"
```

### 3. Search for Hardcoded Keys
```powershell
# Search for potential API keys in code:
git grep "AIza"              # Google API keys
git grep "sk-"               # OpenAI/DeepSeek keys
git grep "api_key"
git grep "apiKey"
```

### 4. Check Git History
```powershell
# Check if API files were ever committed:
git log --all --name-only | Select-String "API"
```

### 5. Scan Repository
```powershell
# Search for sensitive strings:
git log --all -S "AIza" --oneline
git log --all -S "sk-" --oneline
```

---

## 🛡️ Files That Are Safe to Commit

✅ **Safe Files:**
- `API.TEMPLATE` - Template file with instructions
- `API-SETUP.md` - Documentation
- `.gitignore` - Ignore rules
- `README.md` - Project documentation
- All source code files (`*.js`, `*.css`, `*.html`)
- Robot data files (`robots/*.json`)

❌ **NEVER Commit:**
- `API` - Your actual DeepSeek API key
- `g api` - Old Google API key (DELETED)
- Any file containing `sk-...` keys
- Any file containing `AIza...` keys
- `.env` files with secrets

---

## 🔍 Quick Security Scan

Run these commands before pushing:

```powershell
# 1. Check for untracked sensitive files
git status | Select-String "API"

# 2. Verify .gitignore is working
git ls-files | Select-String "API"
# Should only show: API.TEMPLATE, API-SETUP.md (safe files)

# 3. Double-check staged files
git diff --cached --name-only
# Make sure no API files are listed
```

---

## 📊 Current Security Status

### ✅ Protected Files (in .gitignore):
- `API` - DeepSeek key
- `g api` - Google key (DELETED)
- `*.key` - Any .key files
- `api-keys.txt` - Key storage
- `secrets.txt` - Secrets
- `*api-key*` - Any file with "api-key"
- `*apikey*` - Any file with "apikey"
- `google-api*` - Google API files

### ✅ Safe Template Files (can be committed):
- `API.TEMPLATE` - Setup instructions
- `docs/API-SETUP.md` - Security guide

---

## 🚀 Before Deploying to Production

### Option 1: Static Hosting (GitHub Pages, Netlify)
**Problem:** Client-side API keys are visible in browser network tab

**Solution:**
1. Don't use Default Bot 2.0 in production (use Scrappy instead)
2. OR implement serverless function (see below)

### Option 2: Serverless Function (Recommended)
**Benefit:** API keys stay on server, never exposed to client

**Steps:**
1. Create Netlify/Vercel function
2. Store API key as environment variable
3. Client calls your function, function calls DeepSeek
4. See `docs/API-SETUP.md` for implementation guide

---

## 🔔 Set Up Monitoring

### DeepSeek Dashboard:
1. Go to [DeepSeek Platform](https://platform.deepseek.com/)
2. Set up usage alerts
3. Monitor for unusual activity
4. Set spending limits

### Google Cloud Console:
1. Revoke old Gemini API key (if not done)
2. Remove unused APIs
3. Set up billing alerts

---

## ⚡ Emergency: Key Was Leaked!

### If API Key Appears in Git Commit:

**Step 1: Revoke Key Immediately**
- DeepSeek: [platform.deepseek.com](https://platform.deepseek.com/) → API Keys → Delete
- Google: [console.cloud.google.com](https://console.cloud.google.com/) → Credentials → Delete

**Step 2: Generate New Key**
- Create new API key
- Update local `API` file

**Step 3: Remove from Git History**
```powershell
# WARNING: This rewrites history!
git filter-branch --force --index-filter `
  "git rm --cached --ignore-unmatch API" `
  --prune-empty --tag-name-filter cat -- --all

# Force push (DANGEROUS - only if key was leaked!)
git push origin --force --all
```

**Step 4: Notify GitHub**
- GitHub automatically scans for leaked keys
- They may email you - respond promptly
- Confirm key is revoked

---

## 📝 Regular Security Maintenance

### Weekly:
- [ ] Check DeepSeek usage dashboard
- [ ] Review git logs for sensitive files

### Monthly:
- [ ] Rotate API keys
- [ ] Review .gitignore rules
- [ ] Scan repository for secrets

### Before Each Release:
- [ ] Run security scan
- [ ] Verify no hardcoded keys
- [ ] Check environment variables
- [ ] Test with fresh clone

---

## ✅ Final Pre-Push Command

```powershell
# Run this before EVERY git push:
git status; Write-Host "`n🔍 Checking for API files..."; `
if (git ls-files | Select-String "^API$") { `
    Write-Host "⚠️ WARNING: API file is tracked!" -ForegroundColor Red `
} else { `
    Write-Host "✅ API file is not tracked (good!)" -ForegroundColor Green `
}
```

---

## 🎯 Summary

**Current Status:**
- ✅ `API` file protected by .gitignore
- ✅ `g api` file deleted (old Google key)
- ✅ `.gitignore` updated with comprehensive patterns
- ⚠️ **URGENT:** Revoke exposed Google API key
- ✅ Security documentation created
- ✅ Template file available for setup

**You're Ready to Push When:**
- [ ] Old Google API key revoked
- [ ] `git status` shows NO API files
- [ ] Security scan passes
- [ ] All keys are in .gitignore
- [ ] API.TEMPLATE and docs committed

---

**Stay safe! 🔐**
