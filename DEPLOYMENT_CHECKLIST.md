# Deployment Checklist - Railway + Vercel + MongoDB Atlas

## Step 1: Setup MongoDB Atlas Database ✅

### 1.1 Create MongoDB Cluster
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Sign in to your account
- [ ] Click "Create" → Choose "Build a Database"
- [ ] Select **Free Tier**
- [ ] Choose region closest to you
- [ ] Name cluster: `genai-cluster`
- [ ] Click "Create"

### 1.2 Create Database User
- [ ] Go to "Database Access" (left menu)
- [ ] Click "Add New Database User"
- [ ] Username: `genai_user`
- [ ] Password: Create a strong password (save it!)
- [ ] Built-in Role: `Atlas admin`
- [ ] Click "Add User"

### 1.3 Configure Network Access
- [ ] Go to "Network Access" (left menu)
- [ ] Click "Add IP Address"
- [ ] Select "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"

### 1.4 Get Connection String
- [ ] Go back to "Clusters"
- [ ] Click "Connect" on your cluster
- [ ] Click "Connect your application"
- [ ] Copy the connection string
- [ ] Replace `<password>` with your database user password
- [ ] Replace `myFirstDatabase` with `genai_db`

**Example Connection String:**
```
mongodb+srv://genai_user:YOUR_PASSWORD@genai-cluster.xxxxx.mongodb.net/genai_db?retryWrites=true&w=majority
```

---

## Step 2: Deploy Backend on Railway ✅

### 2.1 Connect GitHub to Railway
- [ ] Go to https://railway.app
- [ ] Sign in with GitHub
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Authorize and select your repository

### 2.2 Configure Railway Project
- [ ] Select your repository
- [ ] Railway will auto-detect it's a Node.js project
- [ ] Wait for automatic deployment to start

### 2.3 Add Environment Variables
- [ ] In Railway dashboard, click on your deployment
- [ ] Go to "Variables" tab
- [ ] Click "RAW Editor"
- [ ] Add these variables:

```
MONGODB_URI=mongodb+srv://genai_user:YOUR_PASSWORD@genai-cluster.xxxxx.mongodb.net/genai_db?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-12345
JWT_EXPIRE=7d
AI_API_KEY=your-ai-api-key-if-you-have-one
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-vercel-frontend-url.vercel.app
```

- [ ] Click "Deploy"

### 2.4 Get Backend URL
- [ ] Go to "Deployments" tab
- [ ] Copy the URL shown under "Railway Deployment"
- [ ] It will look like: `https://genai-backend-production.up.railway.app`
- [ ] **Save this URL** - you'll need it for frontend

### 2.5 Verify Backend is Running
- [ ] Open the Railway URL in browser
- [ ] You should see an Express.js response or JSON
- [ ] Check logs for any errors: "Logs" tab in Railway

---

## Step 3: Deploy Frontend on Vercel ✅

### 3.1 Import Repository to Vercel
- [ ] Go to https://vercel.com
- [ ] Click "Add New..."
- [ ] Select "Project"
- [ ] Click "Import Git Repository"
- [ ] Paste your GitHub repository URL
- [ ] Click "Import"

### 3.2 Configure Project Settings
- [ ] **Project Name**: `genai-frontend`
- [ ] **Framework Preset**: React
- [ ] **Root Directory**: Click "Edit" → Select `frontend` folder
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`
- [ ] **Install Command**: `npm install`

### 3.3 Add Environment Variables
- [ ] In Vercel, go to "Environment Variables"
- [ ] Add these variables:

```
VITE_API_BASE_URL=https://your-railway-backend-url/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=GenAI Interview Platform
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
```

**Example:**
```
VITE_API_BASE_URL=https://genai-backend-production.up.railway.app/api
```

- [ ] Click "Deploy"

### 3.4 Get Frontend URL
- [ ] Wait for deployment to complete
- [ ] Copy the Frontend URL (looks like `https://genai-frontend.vercel.app`)
- [ ] **Save this URL** - update backend CLIENT_URL if needed

### 3.5 Verify Frontend is Running
- [ ] Open the Vercel URL in browser
- [ ] You should see the login page
- [ ] Open browser console (F12) - check for any errors
- [ ] Try to login to test API connection

---

## Step 4: Update Backend CLIENT_URL ✅

After getting your Vercel frontend URL:

- [ ] Go back to Railway dashboard
- [ ] Go to "Variables"
- [ ] Update `CLIENT_URL` with your Vercel URL
- [ ] Click "Deploy"

**Updated CLIENT_URL:**
```
CLIENT_URL=https://genai-frontend.vercel.app
```

---

## Step 5: Test the Full Application ✅

### 5.1 Test Backend API
- [ ] Open Railway backend URL in browser
- [ ] Try to access `/api/auth/profile` (should return unauthorized)
- [ ] Check logs for any errors

### 5.2 Test Frontend
- [ ] Open Vercel frontend URL
- [ ] Navigate to Register page
- [ ] Create a new account
- [ ] Try to login
- [ ] Check browser console (F12) for errors
- [ ] Check Network tab to see API calls

### 5.3 Test API Connection
- [ ] Open browser console (F12)
- [ ] Network tab
- [ ] Try login
- [ ] Look for API call to `https://your-railway-url/api/auth/login`
- [ ] Should return 200 response

---

## Environment Variables Quick Reference

### Backend (.env on Railway)
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://genai_user:PASSWORD@cluster.mongodb.net/genai_db?retryWrites=true&w=majority
JWT_SECRET=any-random-secret-key-here
JWT_EXPIRE=7d
AI_API_KEY=your-api-key (optional)
AI_API_ENDPOINT=your-api-endpoint (optional)
CLIENT_URL=https://your-vercel-url.vercel.app
```

### Frontend (.env on Vercel)
```
VITE_API_BASE_URL=https://your-railway-backend.up.railway.app/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=GenAI Interview Platform
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
```

---

## Troubleshooting

### 1. Frontend Can't Connect to Backend
**Issue**: Network error when trying to login/register

**Solution**:
- [ ] Check `VITE_API_BASE_URL` is correct in Vercel
- [ ] Check `CLIENT_URL` is correct in Railway
- [ ] Verify both URLs are accessible
- [ ] Check browser console for CORS errors
- [ ] Redeploy both apps after changing variables

### 2. MongoDB Connection Error
**Issue**: `MongooseError: Could not connect to MongoDB`

**Solution**:
- [ ] Verify MongoDB URI in Railway variables
- [ ] Check username/password is correct
- [ ] Verify IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
- [ ] Check database name exists (genai_db)
- [ ] Test connection string in MongoDB Compass

### 3. Login/Register Not Working
**Issue**: 400 or 500 error when submitting form

**Solution**:
- [ ] Check backend logs in Railway → Logs tab
- [ ] Verify MONGODB_URI is correct
- [ ] Verify JWT_SECRET is set
- [ ] Check frontend is sending correct data format
- [ ] Look for validation errors in backend logs

### 4. Page Blank or Won't Load
**Issue**: Frontend shows blank page

**Solution**:
- [ ] Check browser console (F12) for JavaScript errors
- [ ] Verify `root` element exists in index.html
- [ ] Check build succeeded in Vercel → Deployments tab
- [ ] Clear browser cache and reload
- [ ] Check that frontend root directory is set to `frontend` in Vercel

### 5. CORS Errors
**Issue**: `Access to XMLHttpRequest... CORS policy`

**Solution**:
- [ ] Make sure backend CLIENT_URL matches frontend URL exactly
- [ ] Check CORS middleware is enabled in backend app.js
- [ ] Verify protocol is https (not http)
- [ ] Redeploy backend after changing CLIENT_URL

---

## Deployment Timeline

| Step | Platform | Time |
|------|----------|------|
| 1. MongoDB Setup | Atlas | 5 min |
| 2. Backend Deploy | Railway | 5 min |
| 3. Frontend Deploy | Vercel | 3 min |
| 4. Configuration | Both | 5 min |
| 5. Testing | Browser | 5 min |
| **Total** | - | **~23 minutes** |

---

## Final Verification Checklist

After deployment, verify everything works:

- [ ] Backend URL is accessible and returns JSON
- [ ] Frontend URL loads without errors
- [ ] Can navigate to login/register pages
- [ ] Can register a new account
- [ ] Can login with new account
- [ ] Dashboard loads after login
- [ ] Browser console shows no errors
- [ ] Network tab shows 200/201 responses from API calls
- [ ] MongoDB data appears in Atlas dashboard

---

## Important Notes

1. **Keep Passwords Safe**
   - Never commit .env files to GitHub
   - Use environment variables on deployment platforms
   - Rotate JWT_SECRET every month

2. **Production Security**
   - Change JWT_SECRET from default
   - Use strong MongoDB password
   - Enable rate limiting (add later)
   - Monitor logs regularly

3. **Costs**
   - MongoDB Atlas: Free (up to 512MB)
   - Railway: Free tier + pay-as-you-go (~$5/month)
   - Vercel: Free for frontend

4. **Auto-Deployment**
   - Push to GitHub main branch
   - Both Railway and Vercel auto-deploy
   - Deployments typically take 2-3 minutes

---

## Next Steps After Deployment

1. **Monitor** - Check logs regularly in Railway/Vercel dashboards
2. **Backup** - Enable automatic backups in MongoDB Atlas
3. **Custom Domain** - Add your custom domain (optional)
4. **SSL/TLS** - Both platforms include free SSL certificates
5. **Analytics** - Setup error tracking and monitoring

---

**Created**: June 2026
**For**: GenAI Interview Platform
**Status**: Ready for Deployment
