# Railway & Vercel Deployment Guide - Step by Step

Your project is now ready for deployment! Follow these exact steps.

---

## 🚀 STEP 1: Deploy Backend to Railway (15 minutes)

### 1.1 Create Railway Account
```
1. Go to https://railway.app
2. Click "Sign in with GitHub"
3. Authorize Railway to access your GitHub
4. You'll be redirected to dashboard
```

### 1.2 Create New Project
```
1. On Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Search for your repository: "GenAI-Fullstack-project"
4. Click on it to select
```

### 1.3 Railway Auto-Detection
```
Railway will automatically:
- Detect it's a Node.js project
- Read package.json from backend folder
- Start building your project

Wait for build to complete (2-3 minutes)
```

### 1.4 Add Environment Variables
```
1. Click on your deployment in Railway dashboard
2. Go to "Variables" tab on the left
3. Click "Raw Editor" button
4. Copy and paste ALL these variables:

---BEGIN COPY---

PORT=5000
NODE_ENV=production
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING_HERE
JWT_SECRET=YOUR_JWT_SECRET_KEY_HERE
JWT_EXPIRE=7d
GOOGLE_GENAI_API_KEY=YOUR_GOOGLE_GENAI_API_KEY_HERE
CLIENT_URL=https://genai-frontend.vercel.app

---END COPY---

5. Click "Save" button
6. Railway will auto-redeploy (1 minute)
```

### 1.5 Get Your Railway Backend URL
```
1. On Railway dashboard, look for "SERVICE" section
2. Find your deployment showing "Deployments" tab
3. Copy the public URL (looks like):
   https://genai-backend-production.up.railway.app
   
4. SAVE THIS URL - You need it for frontend deployment!
```

### 1.6 Verify Backend is Working
```
1. Open your Railway URL in browser:
   https://your-railway-url.up.railway.app

2. You should see your backend response (might be a page or JSON)

3. Open browser console (F12) - no errors should appear

4. Check Railway logs for any issues:
   - Click "Logs" tab
   - Scroll through for error messages
```

---

## 🎨 STEP 2: Deploy Frontend to Vercel (10 minutes)

### 2.1 Create Vercel Account
```
1. Go to https://vercel.com
2. Click "Sign Up"
3. Click "Continue with GitHub"
4. Authorize and login
5. You'll be redirected to dashboard
```

### 2.2 Import Your Repository
```
1. On Vercel dashboard, click "Add New"
2. Select "Project"
3. Click "Import Git Repository"
4. Search for your repository
5. Click "Import"
```

### 2.3 Configure Project Settings
```
1. Project Name: genai-frontend
2. Framework: Select "React"
3. Root Directory: 
   - Click "Edit"
   - Select "frontend" folder
   - Click "Continue"
4. Build and Output Settings (usually auto-filled):
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install
```

### 2.4 Add Environment Variables
```
1. Scroll down to "Environment Variables"
2. Add these variables one by one:

KEY: VITE_API_BASE_URL
VALUE: https://your-railway-url.up.railway.app/api
(Replace with your actual Railway URL from Step 1.5)

KEY: VITE_API_TIMEOUT
VALUE: 10000

KEY: VITE_APP_NAME
VALUE: GenAI Interview Platform

KEY: VITE_APP_VERSION
VALUE: 1.0.0

KEY: VITE_ENABLE_ANALYTICS
VALUE: false

3. Click "Deploy" button
4. Wait for deployment (2-3 minutes)
```

### 2.5 Get Your Vercel Frontend URL
```
1. After deployment completes, you'll see:
   "Congratulations! Your project has been deployed"
   
2. Copy the URL (looks like):
   https://genai-frontend.vercel.app
   
3. SAVE THIS URL
```

### 2.6 Verify Frontend is Working
```
1. Open your Vercel URL in browser
2. You should see your login page
3. Open browser console (F12)
4. Look at Network tab
5. Check for any error messages
```

---

## 🔄 STEP 3: Link Backend and Frontend (2 minutes)

Now that both are deployed, you need to tell the backend about your frontend URL.

### 3.1 Update Backend CLIENT_URL
```
1. Go back to Railway dashboard
2. Click your deployment
3. Go to "Variables" tab
4. Find: CLIENT_URL=https://genai-frontend.vercel.app
5. Click the value and edit it to your actual Vercel URL
6. Example:
   OLD: https://genai-frontend.vercel.app
   NEW: https://your-actual-vercel-url.vercel.app
7. Click "Save"
8. Railway will auto-redeploy
```

---

## ✅ STEP 4: Test Everything Works (5 minutes)

### 4.1 Test Frontend Connection to Backend
```
1. Open your Vercel frontend URL
2. Go to Register page
3. Try to create new account with:
   - Email: test@example.com
   - Password: Test123!
   - Name: Test User
4. Click Register button
5. Open browser console (F12)
6. Go to Network tab
7. Look for request to your Railway URL
8. Should see 200 or 201 response (success)
```

### 4.2 Test Login
```
1. After registration, you should see login page
2. Enter email and password
3. Click Login
4. Check Network tab - should show successful API call
5. Should redirect to Dashboard
```

### 4.3 Check Browser Console
```
1. Press F12 to open console
2. Look for errors (red text)
3. Common errors and fixes:
   - CORS error → Check CLIENT_URL in Railway
   - Cannot reach API → Check VITE_API_BASE_URL
   - Blank page → Check build logs in Vercel
```

### 4.4 Monitor Logs
```
Railway Backend Logs:
1. Go to Railway dashboard
2. Click your deployment
3. Go to "Logs" tab
4. Watch for error messages when you test
5. Common issues:
   - MongoDB connection error → Check MONGODB_URI
   - JWT error → Check JWT_SECRET
   - CORS error → Check CLIENT_URL

Vercel Frontend Logs:
1. Go to Vercel dashboard
2. Click your project
3. Go to "Deployments" tab
4. Click latest deployment
5. Go to "Logs" tab
6. Watch for build or runtime errors
```

---

## 📝 Summary of URLs

After successful deployment, you'll have:

```
Backend (Railway):
https://your-railway-url.up.railway.app
API Endpoint: https://your-railway-url.up.railway.app/api

Frontend (Vercel):
https://your-vercel-url.vercel.app

Database (MongoDB):
mongodb://Backend:password@ac-fmudsgw-shard-00-00.9cey9qk.mongodb.net:27017...
```

---

## 🔧 Troubleshooting

### Problem: Frontend shows blank page
```
Solution:
1. Open browser console (F12)
2. Check for JavaScript errors
3. Go to Vercel dashboard
4. Check "Deployments" tab for build errors
5. Verify VITE_API_BASE_URL is correct
6. Redeploy: git push origin main
```

### Problem: Cannot login/register
```
Solution:
1. Check Network tab (F12) for API response
2. Look for 404 or 500 error
3. Check Railway logs for backend errors
4. Verify MONGODB_URI is correct in Railway
5. Verify backend is running: Check Railway dashboard
```

### Problem: CORS error when calling API
```
Solution:
1. Go to Railway dashboard
2. Update CLIENT_URL to exact Vercel URL
3. Make sure protocol is https (not http)
4. Redeploy backend
5. Clear browser cache and reload
```

### Problem: MongoDB connection error
```
Solution:
1. Go to Railway Variables
2. Check MONGODB_URI is exactly correct
3. Verify username and password
4. Check MongoDB Atlas IP whitelist
5. Test connection in MongoDB Compass app
```

### Problem: API returning 500 error
```
Solution:
1. Check Railway logs for error details
2. Look for missing environment variables
3. Check JWT_SECRET is set
4. Verify GOOGLE_GENAI_API_KEY is valid
5. Check database is accessible
```

---

## 📋 Deployment Checklist

### Before You Start
- [ ] You have MongoDB URI from MongoDB Atlas
- [ ] You have GitHub account with repository
- [ ] You have Vercel account (or ready to create)
- [ ] You have Railway account (or ready to create)

### Step 1: Railway Backend
- [ ] Created Railway account
- [ ] Imported GitHub repository
- [ ] Added all environment variables
- [ ] Backend is running (check dashboard)
- [ ] Got Railway URL

### Step 2: Vercel Frontend
- [ ] Created Vercel account
- [ ] Imported GitHub repository
- [ ] Selected "frontend" as root directory
- [ ] Added all VITE_ environment variables
- [ ] Added VITE_API_BASE_URL with Railway URL
- [ ] Frontend is deployed (check dashboard)
- [ ] Got Vercel URL

### Step 3: Link Them
- [ ] Updated CLIENT_URL in Railway with Vercel URL
- [ ] Both apps are redeployed

### Step 4: Testing
- [ ] Frontend loads without errors
- [ ] Can access login page
- [ ] Can register new account
- [ ] Can login with account
- [ ] Dashboard loads
- [ ] No console errors
- [ ] API calls show 200 responses

---

## ✨ You're Done!

Your GenAI Interview Platform is now live! 🎉

**Frontend (Live)**: https://your-vercel-url.vercel.app
**Backend (Running)**: https://your-railway-url.up.railway.app
**Database (Connected)**: MongoDB Atlas

Share your frontend URL with users to access the app!

---

## Next Steps (Optional)

1. **Add Custom Domain** - Point your own domain instead of vercel.app
2. **Setup Analytics** - Track user activity
3. **Enable Monitoring** - Get alerts for errors
4. **Setup Backups** - Automatic MongoDB backups
5. **Performance Optimization** - Reduce load times

---

**Last Updated**: June 2026
**Status**: Deployment Guide Ready
**Contact**: GitHub Issues for support
