# How to Check If Your Project is Deployed & Accessible

Follow these steps to verify your deployment and ensure anyone can access your application.

---

## ✅ STEP 1: Check Backend Deployment (Railway)

### 1.1 Go to Railway Dashboard
```
1. Open https://railway.app
2. Login with your GitHub account
3. Click on your project/deployment
4. You should see a green checkmark ✅ next to "Deployments"
```

### 1.2 Check Deployment Status
```
Look for:
- Status: "Success" or "Active"
- Deployment shows recent timestamp (not old)
- No red error indicators

If you see RED ❌:
- Click "Logs" tab
- Scroll to bottom for error messages
- Check if MongoDB URI is correct
```

### 1.3 Get Your Backend URL
```
1. In Railway dashboard, look for the URL section
2. You should see a public URL like:
   https://genai-backend-production.up.railway.app
   
3. Copy this URL
4. IMPORTANT: Keep this for testing
```

### 1.4 Test Backend is Running
```
Method 1: Browser Test
1. Paste your Railway URL in browser address bar
2. Press Enter
3. You should see either:
   - A page with your backend information
   - JSON response
   - Or any error page (that's okay)
4. If you see timeout → Backend is NOT running

Method 2: Check Response
1. In browser, go to your backend URL
2. Open Developer Tools (F12)
3. Go to "Network" tab
4. Refresh page (F5)
5. Look for request to your Railway URL
6. Should show 200 response (not 504 or timeout)
```

### 1.5 Test API Endpoint
```
Open this URL in your browser:
https://your-railway-url/api/auth/profile

You should see:
- 401 Unauthorized error (this is GOOD - means backend is working)
- JSON response saying you need a token

If you see 404:
- Backend route not found
- Check backend code

If you see timeout:
- Backend is not running
- Check Railway logs
```

---

## ✅ STEP 2: Check Frontend Deployment (Vercel)

### 2.1 Go to Vercel Dashboard
```
1. Open https://vercel.com
2. Login with your GitHub account
3. Click on your project
4. You should see latest deployment
```

### 2.2 Check Deployment Status
```
Look for:
- Status badge showing "Ready" or ✅
- Green checkmark on latest deployment
- Build completed successfully

If you see FAILED ❌:
- Click on failed deployment
- Go to "Logs" tab
- Look for build errors
- Common issues:
  - Wrong root directory
  - Missing environment variables
  - Syntax errors in code
```

### 2.3 Get Your Frontend URL
```
1. In Vercel dashboard
2. Look for "Domains" section
3. Should show something like:
   https://genai-frontend.vercel.app
   
4. This is your PUBLIC URL that anyone can access
5. Copy and save this
```

### 2.4 Test Frontend is Loading
```
Method 1: Direct Browser Test
1. Copy your Vercel URL
2. Paste in browser address bar
3. Press Enter
4. You should see:
   - Your login page loading
   - Page takes 2-5 seconds to load first time
   - No blank white page

Method 2: Check Network & Console
1. Open browser (F12)
2. Go to "Network" tab
3. Refresh page (F5)
4. Watch files loading
5. Go to "Console" tab
6. Should NOT see any red error messages
7. If errors appear:
   - Check VITE_API_BASE_URL variable
   - Make sure it points to your Railway URL
```

### 2.5 Test Frontend Functionality
```
1. You should see Login page
2. Click "Register" - should go to Register page
3. Click back - should go to Login page
4. Try entering email/password - form should work
5. Try clicking buttons - should respond

If form doesn't work:
- Check browser console (F12)
- Look for JavaScript errors
- Verify API URL is correct
```

---

## ✅ STEP 3: Verify Frontend ↔ Backend Connection

This is the MOST IMPORTANT test!

### 3.1 Test API Connection
```
1. Open your Vercel frontend URL
2. Go to Register page
3. Try to register with:
   - Email: test@example.com
   - Password: Test123!
   - Name: Test User
4. Click "Register" button
5. DO NOT wait - immediately open browser console (F12)
```

### 3.2 Check Network Tab
```
1. Keep browser console open (F12)
2. Go to "Network" tab
3. Clear the list
4. Try Register again
5. Look for requests like:
   - /api/auth/register
   - Should show 201 or 200 response
   - Should show your Railway URL
   
If you see:
- 201/200: ✅ SUCCESS - API connected!
- 404: ❌ Backend route not found
- 500: ❌ Backend error - check Railway logs
- No request shown: ❌ Frontend not sending request
- Request to localhost: ❌ Wrong API URL
```

### 3.3 Check Browser Console
```
1. Open browser console (F12)
2. Go to "Console" tab
3. Look for messages:
   - Red errors: ❌ Problem
   - Yellow warnings: ⚠️ Usually okay
   - Blue info: ℹ️ Informational

Common errors:
- "CORS error": CLIENT_URL wrong in Railway
- "Cannot reach API": VITE_API_BASE_URL wrong in Vercel
- "Network error": Backend not running
```

---

## ✅ STEP 4: Share With Others

Once everything is working, you can share your app!

### 4.1 Share Frontend URL
```
Give people this URL:
https://your-vercel-url.vercel.app

They can:
1. Open the URL in any browser
2. Register for an account
3. Login and use the app
4. No installation needed!
```

### 4.2 Things They Can Do
```
✅ Access from any device
✅ Register new account
✅ Login with their credentials
✅ Use all features
✅ No server setup needed
✅ Works on mobile too
```

### 4.3 Share on Social Media
```
Example message:
"Check out my new AI Interview Platform! 🚀
Visit: https://genai-frontend.vercel.app
Register for free and practice interviews with AI feedback!"
```

---

## 🔍 STEP 5: Troubleshooting Checklist

### Frontend Shows Blank Page
```
❌ Problem: White/blank page

✅ Solutions:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Reload page (Ctrl+F5)
3. Open console (F12) - check for errors
4. Check Vercel deployment status
5. Verify root directory is set to "frontend"
6. Look at Vercel logs for build errors
```

### Backend URL Not Accessible
```
❌ Problem: Cannot access Railway URL

✅ Solutions:
1. Check Railway dashboard - is it "Active"?
2. Check Railway logs for errors
3. Verify MONGODB_URI is correct
4. Verify JWT_SECRET is set
5. Wait 2-3 minutes for deployment to complete
6. Try different browser
7. Check internet connection
```

### Login/Register Not Working
```
❌ Problem: Cannot register or login

✅ Solutions:
1. Check Network tab (F12) - API request?
2. Look for error response from backend
3. Check console for CORS errors
4. Verify VITE_API_BASE_URL is correct
5. Verify CLIENT_URL in Railway is correct
6. Check Railway logs for backend errors
7. Verify MONGODB_URI works
```

### CORS Error (Most Common)
```
❌ Error: "Access to XMLHttpRequest blocked by CORS policy"

✅ Solution:
1. Go to Railway dashboard
2. Click "Variables"
3. Find: CLIENT_URL
4. Make sure it's exactly: https://your-vercel-url.vercel.app
5. Make sure there's no trailing slash
6. Redeploy backend
7. Wait 2 minutes
8. Reload frontend
```

### Database Connection Error
```
❌ Error: "MongooseError: Cannot connect to MongoDB"

✅ Solutions:
1. Check MONGODB_URI in Railway variables
2. Copy exact URI from MongoDB Atlas
3. Verify username/password is correct
4. Check MongoDB Atlas IP whitelist
5. Verify database name exists
6. Test connection in MongoDB Compass
```

---

## 📊 STEP 6: Monitor Your Deployment

### 6.1 Check Railway Logs Daily
```
1. Open Railway dashboard
2. Click your deployment
3. Go to "Logs" tab
4. Scroll to bottom
5. Look for any error messages (red text)
6. If you see errors:
   - Note the error message
   - Check what caused it
   - Fix and redeploy
```

### 6.2 Check Vercel Analytics
```
1. Open Vercel dashboard
2. Click your project
3. Go to "Analytics" tab
4. You can see:
   - How many people visited
   - Which pages they viewed
   - Performance metrics
   - Error rates
```

### 6.3 Monitor User Activity
```
In MongoDB Atlas:
1. Go to https://www.mongodb.com/cloud/atlas
2. Click your cluster
3. Go to "Collections"
4. You can see:
   - Users that registered
   - Interviews created
   - Data being stored
5. Verify data is being saved correctly
```

---

## ✨ COMPLETE DEPLOYMENT VERIFICATION CHECKLIST

### Backend (Railway)
- [ ] Dashboard shows "Active" deployment
- [ ] No red error indicators
- [ ] Logs show successful startup
- [ ] Backend URL accessible in browser
- [ ] API endpoint returns response (401 is OK)
- [ ] MongoDB connection successful in logs
- [ ] JWT_SECRET is set
- [ ] Google API Key is set

### Frontend (Vercel)
- [ ] Dashboard shows "Ready" status
- [ ] Build completed successfully
- [ ] Latest deployment shows green checkmark
- [ ] Frontend URL accessible in browser
- [ ] Login page loads
- [ ] Navigation works (Register, Login links)
- [ ] No red errors in console
- [ ] Environment variables are set

### Connection
- [ ] VITE_API_BASE_URL points to Railway URL
- [ ] CLIENT_URL points to Vercel URL
- [ ] Registration request shows in Network tab
- [ ] API response is 201/200 (not 404 or 500)
- [ ] No CORS errors in console
- [ ] Data appears in MongoDB after registration

### Real User Test
- [ ] Can navigate frontend
- [ ] Can go to Register page
- [ ] Can fill register form
- [ ] Can submit register (API call succeeds)
- [ ] Can see success message
- [ ] Can login with new account
- [ ] Dashboard loads after login
- [ ] Can perform interviews (if implemented)

---

## 🎉 Success Indicators

Your project is FULLY DEPLOYED when you see:

✅ **Backend**
```
https://your-railway-url.up.railway.app/api/auth/profile
→ Returns 401 Unauthorized (means it's working!)
```

✅ **Frontend**
```
https://your-vercel-url.vercel.app
→ Shows login page
→ Can navigate pages
→ No console errors
```

✅ **Connection**
```
Register → Shows success → Data in MongoDB
Login → Shows success → Redirects to dashboard
No CORS errors in console
```

✅ **Public Access**
```
Anyone can open your frontend URL
They can register and use the app
No installation or setup needed
```

---

## 📱 Test on Different Devices

Make sure it works everywhere:

```
✅ Desktop Browser (Chrome, Firefox, Safari, Edge)
✅ Mobile Browser (Phone, Tablet)
✅ Different Networks (WiFi, Mobile Data)
✅ Incognito/Private Mode (Cache issues)
```

---

## 🔐 Security Note

After deployment, make sure:

```
✅ Secrets are in environment variables (not in code)
✅ .env files are in .gitignore (not pushed to GitHub)
✅ JWT_SECRET is strong and random
✅ MongoDB credentials are kept safe
✅ API keys are hidden in environment variables
✅ CORS is configured correctly
```

---

## 📞 If Something Doesn't Work

```
1. Take a screenshot of the error
2. Check browser console (F12) for exact error message
3. Check Railway logs for backend errors
4. Check Vercel deployment logs
5. Try these steps:
   - Clear browser cache
   - Reload page
   - Try different browser
   - Check internet connection
   - Wait 2-3 minutes for deployment
6. Redeploy if you changed code
```

---

## Summary

| Component | Check | Status |
|-----------|-------|--------|
| **Backend** | Railway dashboard | ✅ Active |
| **Frontend** | Vercel dashboard | ✅ Ready |
| **Database** | MongoDB Atlas | ✅ Connected |
| **Frontend URL** | Accessible in browser | ✅ Working |
| **Backend URL** | Returns API response | ✅ Working |
| **Connection** | Register test successful | ✅ Connected |
| **Public Access** | Others can use app | ✅ Yes |

---

**Your project is LIVE and PUBLIC when all checks are ✅**

**Share your frontend URL with anyone to let them use your app!**

**Created**: June 2026
**Purpose**: Verify Deployment Status
**Status**: Complete Guide Ready
