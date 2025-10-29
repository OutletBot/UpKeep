# 🔐 API Key Setup Guide

## 🚨 IMPORTANT: API Key Security

Your API keys are **NEVER** committed to Git. The `API` file is protected by `.gitignore`.

---

## 📋 Quick Setup (Local Development)

### Step 1: Get Your DeepSeek API Key
1. Go to [DeepSeek Platform](https://platform.deepseek.com/)
2. Create an account or log in
3. Navigate to API Keys section
4. Generate a new API key (starts with `sk-`)
5. **Copy the key immediately** - you won't be able to see it again!

### Step 2: Create Your API File
1. Copy the `API.TEMPLATE` file in the root directory
2. Rename the copy to `API` (no file extension)
3. Open `API` in a text editor
4. **Replace line 3** with your actual DeepSeek API key

**File Format:**
```
# API Configuration Template
# Copy this file to "API" (no extension) and add your actual API keys
sk-1234567890abcdef1234567890abcdef1234567890abcdef
```

### Step 3: Verify
- ✅ File is named `API` (no `.txt`, no `.key`, just `API`)
- ✅ Line 3 contains your API key starting with `sk-`
- ✅ No extra blank lines or spaces
- ✅ Save the file

### Step 4: Test
1. Open `index.html` in your browser
2. Select "Default Bot 2.0" as your robot companion
3. Complete a task or click the robot
4. Check browser console (F12) for:
   ```
   🔑 [API Bot 2.0] DeepSeek API key loaded successfully
   🚀 [API Bot 2.0] Calling DeepSeek intelligence service...
   ✅ [API Bot 2.0] DeepSeek final response (12 words): ...
   ```

---

## 🌐 Production Deployment (GitHub Pages, Netlify, etc.)

### Option 1: Environment Variables (Recommended)
For static hosting services that support build-time environment variables:

1. **Add to your hosting platform:**
   - Netlify: Site Settings → Environment Variables
   - Vercel: Project Settings → Environment Variables
   - GitHub Pages: Repository Settings → Secrets

2. **Variable Name:** `DEEPSEEK_API_KEY`
3. **Value:** Your `sk-...` API key

4. **Update code** (future enhancement):
   ```javascript
   // Modify fetchEnhancedResponse() to check for env var first
   const apiKey = process.env.DEEPSEEK_API_KEY || loadFromFile();
   ```

### Option 2: Serverless Function (Most Secure)
For production apps, **never expose API keys** in client-side code:

1. **Create a backend API endpoint** (e.g., Netlify Functions, Vercel Functions)
2. **Store API key** on the server
3. **Client calls your endpoint**, which calls DeepSeek
4. **Your endpoint returns** the AI response

**Example Flow:**
```
User → Your Web App → Your Serverless Function → DeepSeek API
                       (API key stored here)
```

### Option 3: Proxy Service
Use a proxy service like:
- Netlify Edge Functions
- Cloudflare Workers
- AWS Lambda

---

## 🛡️ Security Best Practices

### ✅ DO:
- ✅ Keep `API` file in `.gitignore`
- ✅ Use environment variables in production
- ✅ Rotate API keys regularly (every 90 days)
- ✅ Set API key usage limits on DeepSeek dashboard
- ✅ Monitor API usage for suspicious activity
- ✅ Use serverless functions for production deployments

### ❌ DON'T:
- ❌ NEVER commit `API` file to Git
- ❌ NEVER hardcode API keys in source code
- ❌ NEVER share API keys in screenshots or videos
- ❌ NEVER expose API keys in client-side JavaScript (production)
- ❌ NEVER post API keys in Discord, Slack, or forums

---

## 🔍 Checking for Leaked Keys

### Before Pushing to GitHub:
```bash
# Check if API file would be committed
git status

# If "API" appears, it's NOT in .gitignore! Fix immediately.
```

### Scan Your Repository:
```bash
# Search for potential API keys
git log --all --full-history --source -S "sk-"
```

### If You Accidentally Committed Your Key:
1. **IMMEDIATELY revoke** the key on DeepSeek dashboard
2. Generate a new API key
3. Remove from Git history:
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch API" \
   --prune-empty --tag-name-filter cat -- --all
   ```
4. Force push: `git push origin --force --all`

---

## 📱 Mobile App (Future: Google Play, App Store)

For mobile deployment:
- **iOS:** Use Keychain Services for secure storage
- **Android:** Use EncryptedSharedPreferences
- **React Native:** Use react-native-keychain
- **Flutter:** Use flutter_secure_storage

**Best Practice:** API keys should be:
1. Encrypted at rest
2. Retrieved from secure backend
3. Never stored in app bundle
4. Fetched on-demand with authentication

---

## 💰 Cost Management

**DeepSeek Pricing (as of Oct 2025):**
- Input: ~$0.14 per 1M tokens
- Output: ~$0.28 per 1M tokens
- Very affordable for personal use!

**Estimate:**
- 100 bot responses/day = ~$0.05/day = ~$1.50/month
- Set billing alerts on DeepSeek dashboard

---

## 🆘 Troubleshooting

### Error: "API key file not found"
- ✅ Check file is named `API` (not `API.txt` or `API.TEMPLATE`)
- ✅ File should be in root directory
- ✅ Check browser console for exact error path

### Error: "API key file format invalid"
- ✅ Ensure line 3 has your API key starting with `sk-`
- ✅ No extra spaces or blank lines
- ✅ Use UTF-8 encoding (no BOM)

### Error: "API error: 401"
- ✅ API key is invalid or expired
- ✅ Generate new key on DeepSeek dashboard
- ✅ Update `API` file with new key

### Error: "API error: 429"
- ✅ Rate limit exceeded
- ✅ Wait a few minutes before trying again
- ✅ Check DeepSeek dashboard for usage limits

---

## 📚 Additional Resources

- [DeepSeek Documentation](https://platform.deepseek.com/docs)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)

---

## ✅ Quick Checklist Before Going Public

- [ ] `API` file is in `.gitignore`
- [ ] `API.TEMPLATE` is committed (safe template file)
- [ ] No API keys in source code
- [ ] API-SETUP.md documentation is included
- [ ] Test with `git status` - `API` should NOT appear
- [ ] Consider serverless functions for production
- [ ] Set up API usage alerts on DeepSeek dashboard

**You're ready to share your project safely! 🎉**
