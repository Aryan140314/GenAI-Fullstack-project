# Deployment Guide - GenAI Interview Platform

This guide provides step-by-step instructions for deploying the GenAI Interview Platform to production environments.

## Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Post-Deployment](#post-deployment)

---

## Backend Deployment

### Option 1: Deploy on Heroku

#### Prerequisites
- Heroku account (free or paid)
- Heroku CLI installed
- Git repository

#### Steps

1. **Login to Heroku**
```bash
heroku login
```

2. **Create a Heroku App**
```bash
cd backend
heroku create your-app-name
```

3. **Add Environment Variables**
```bash
heroku config:set MONGODB_URI=<your-mongodb-connection-string>
heroku config:set JWT_SECRET=<your-jwt-secret>
heroku config:set AI_API_KEY=<your-ai-api-key>
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=<your-frontend-url>
```

4. **Deploy to Heroku**
```bash
git push heroku main
```

5. **View Logs**
```bash
heroku logs --tail
```

**Heroku App URL**: `https://your-app-name.herokuapp.com`

---

### Option 2: Deploy on Railway

#### Prerequisites
- Railway account
- GitHub repository connected to Railway

#### Steps

1. **Connect GitHub Repository**
   - Go to [Railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize and select your repository

2. **Configure Environment Variables**
   - In Railway dashboard, go to "Variables"
   - Add the following variables:
     ```
     MONGODB_URI=<your-connection-string>
     JWT_SECRET=<your-secret>
     AI_API_KEY=<your-api-key>
     NODE_ENV=production
     CLIENT_URL=<your-frontend-url>
     PORT=8080
     ```

3. **Deploy**
   - Railway automatically deploys on push to main
   - Monitor deployment in dashboard

**Railway App URL**: Available in Railway dashboard

---

### Option 3: Deploy on AWS (EC2)

#### Prerequisites
- AWS account
- EC2 instance running Node.js
- SSH access to instance

#### Steps

1. **Create EC2 Instance**
   - Launch Ubuntu 22.04 LTS instance
   - Configure security groups (allow ports 22, 80, 443)
   - Create/use key pair for SSH access

2. **Connect to Instance**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

3. **Install Dependencies**
```bash
sudo apt update
sudo apt install -y nodejs npm git nginx
```

4. **Clone Repository**
```bash
cd /var/www
sudo git clone <your-repo-url>
cd backend
```

5. **Install Node Packages**
```bash
npm install --production
```

6. **Setup Environment Variables**
```bash
sudo nano .env
# Add your configuration
```

7. **Start Application with PM2**
```bash
sudo npm install -g pm2
pm2 start server.js --name "genai-backend"
pm2 startup
pm2 save
```

8. **Configure Nginx as Reverse Proxy**
```bash
sudo nano /etc/nginx/sites-available/default
```

Add this configuration:
```nginx
server {
    listen 80 default_server;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. **Enable Nginx**
```bash
sudo systemctl restart nginx
```

---

### Option 4: Deploy on DigitalOcean App Platform

#### Steps

1. **Connect GitHub Repository**
   - Go to DigitalOcean App Platform
   - Create "New App"
   - Connect GitHub account and select repository

2. **Configure App Settings**
   - Set build command: `npm install`
   - Set run command: `npm start`
   - Specify working directory: `./backend`

3. **Add Environment Variables**
   - In the App Platform dashboard, add environment variables
   - Add all required .env variables

4. **Deploy**
   - DigitalOcean will automatically deploy
   - Monitor in the dashboard

---

### Option 5: Deploy with Docker

#### Prerequisites
- Docker installed
- Docker Hub account (optional, for image hosting)

#### Steps

1. **Create Dockerfile in backend/**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

2. **Create .dockerignore**
```
node_modules
npm-debug.log
.env
.git
```

3. **Build Docker Image**
```bash
docker build -t genai-backend:latest .
```

4. **Run Locally**
```bash
docker run -d \
  -e MONGODB_URI="mongodb://..." \
  -e JWT_SECRET="your-secret" \
  -e AI_API_KEY="your-key" \
  -p 5000:5000 \
  genai-backend:latest
```

5. **Push to Docker Hub**
```bash
docker tag genai-backend:latest your-username/genai-backend:latest
docker push your-username/genai-backend:latest
```

6. **Deploy with Docker Compose**
```bash
docker-compose up -d
```

---

## Frontend Deployment

### Option 1: Deploy on Vercel

#### Prerequisites
- Vercel account
- GitHub repository

#### Steps

1. **Import Repository to Vercel**
   - Go to [Vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from Git → Select your repository

2. **Configure Project**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-backend-url/api
   VITE_API_TIMEOUT=10000
   ```

4. **Deploy**
   - Vercel automatically deploys on push to main
   - Monitor in dashboard

**Vercel URL**: `https://your-project-name.vercel.app`

---

### Option 2: Deploy on Netlify

#### Prerequisites
- Netlify account
- GitHub repository

#### Steps

1. **Connect GitHub to Netlify**
   - Go to [Netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Authorize GitHub and select repository

2. **Configure Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add Environment Variables**
   - In Site Settings → Build & Deploy → Environment
   - Add `VITE_API_BASE_URL` and other variables

4. **Deploy**
   - Netlify automatically builds and deploys

**Netlify URL**: `https://your-project-name.netlify.app`

---

### Option 3: Deploy on GitHub Pages

#### Steps

1. **Update vite.config.js**
```javascript
export default {
  // ... other config
  base: '/GenAI-Fullstack-project/' // your repo name
}
```

2. **Create Deploy Script**
   - Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

4. **Deploy**
```bash
npm run deploy
```

---

### Option 4: Deploy on AWS S3 + CloudFront

#### Steps

1. **Create S3 Bucket**
   - AWS Console → S3
   - Create bucket with public access
   - Enable static website hosting

2. **Build and Upload**
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

3. **Set Bucket Policy**
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::your-bucket-name/*"
  }]
}
```

4. **Setup CloudFront**
   - Create CloudFront distribution pointing to S3
   - Configure SSL/TLS certificate
   - Point custom domain to CloudFront

---

### Option 5: Deploy on DigitalOcean Spaces

#### Steps

1. **Create Space in DigitalOcean**
   - Control Panel → Spaces
   - Create new space
   - Generate access keys

2. **Configure AWS CLI**
```bash
aws configure --profile digitalocean
```

3. **Build and Upload**
```bash
npm run build
aws s3 sync dist/ s3://your-space-name --profile digitalocean
```

4. **Enable Static Website Hosting**
   - In Space settings, enable CDN
   - Configure custom domain (optional)

---

## Database Setup

### Option 1: MongoDB Atlas (Cloud)

**Recommended for beginners**

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Create" → Build a Cluster
   - Choose free tier
   - Select region closest to your users

3. **Configure Network Access**
   - Click "Network Access"
   - Add IP Address (0.0.0.0/0 for development, specific IPs for production)

4. **Create Database User**
   - Click "Database Access"
   - Add new database user with strong password
   - Grant permissions

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Copy connection string
   - Replace `<password>` with your user password

**Connection String Format**:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

---

### Option 2: MongoDB Self-Hosted on AWS EC2

1. **SSH to EC2 Instance**
```bash
ssh -i your-key.pem ubuntu@your-ip
```

2. **Install MongoDB**
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

3. **Configure MongoDB**
```bash
sudo nano /etc/mongod.conf
```
   - Change `bindIp: 127.0.0.1` to `bindIp: 0.0.0.0` for remote access
   - Configure authentication

---

### Option 3: MongoDB on DigitalOcean

1. **Create Managed Database**
   - DigitalOcean → Manage → Databases
   - Create new database cluster
   - Choose MongoDB
   - Select region and node configuration

2. **Get Connection String**
   - In database dashboard
   - Copy connection string

---

## Environment Configuration

### Backend Environment Variables

Create `.env` file in backend directory:

```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRE=7d

# AI Service
AI_API_KEY=your-ai-service-api-key
AI_API_ENDPOINT=https://api.ai-service.com

# Frontend
CLIENT_URL=https://your-frontend-domain.com

# Optional: Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Frontend Environment Variables

Create `.env` file in frontend directory:

```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_API_TIMEOUT=10000
VITE_APP_NAME=GenAI Interview Platform
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
```

---

## Post-Deployment

### 1. **Verify Deployment**
- Test backend API endpoints
- Test frontend functionality
- Check error logs
- Verify database connectivity

### 2. **Setup SSL/TLS Certificate**
- Use Let's Encrypt (free)
- For Heroku/Vercel/Netlify: Automatic
- For AWS/DigitalOcean:
```bash
# Using Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

### 3. **Configure Custom Domain**
- Point DNS records to your deployment platform
- Update `CLIENT_URL` in backend environment

### 4. **Setup Monitoring**
- Enable error tracking (Sentry, LogRocket)
- Setup uptime monitoring
- Configure log aggregation

### 5. **Setup CI/CD Pipeline**
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Backend
        run: # Your deployment command
      - name: Deploy to Frontend
        run: # Your deployment command
```

### 6. **Database Backup**
- Enable automated backups
- Test restore procedures
- Keep backup copies

### 7. **Performance Optimization**
- Enable caching
- Compress assets
- Optimize database queries
- Use CDN for static files

---

## Deployment Comparison

| Platform | Backend | Frontend | Cost | Setup Time | Scalability |
|----------|---------|----------|------|-----------|-------------|
| **Heroku** | ✅ | ✅ | Free-$250/mo | 5 min | Good |
| **Railway** | ✅ | ✅ | Free-$200/mo | 5 min | Good |
| **Vercel** | ❌ | ✅ | Free-$150/mo | 2 min | Excellent |
| **Netlify** | ❌ | ✅ | Free-$150/mo | 2 min | Good |
| **AWS** | ✅ | ✅ | Free tier-$500+/mo | 30 min | Excellent |
| **DigitalOcean** | ✅ | ✅ | $4-$250/mo | 15 min | Good |
| **GitHub Pages** | ❌ | ✅ | Free | 5 min | Limited |

---

## Troubleshooting

### Backend Issues

**Connection Timeout**
```
Error: Cannot connect to MongoDB
→ Check MONGODB_URI is correct
→ Verify MongoDB server is running
→ Check firewall/network rules
```

**CORS Errors**
```
→ Verify CLIENT_URL in backend .env
→ Check CORS middleware configuration
→ Ensure frontend URL is whitelisted
```

**500 Internal Server Error**
```
→ Check backend logs: heroku logs --tail
→ Verify all environment variables are set
→ Check API key validity
```

### Frontend Issues

**Blank Page**
```
→ Check browser console for errors
→ Verify API endpoint is correct
→ Check network tab for failed requests
```

**API Not Connecting**
```
→ Verify VITE_API_BASE_URL is correct
→ Check backend is deployed and running
→ Ensure CORS is properly configured
```

**Build Failures**
```
→ Check build logs in deployment platform
→ Verify all dependencies are installed
→ Check for missing environment variables
```

---

## Quick Start Deployment Summary

### Fastest Option (Frontend Only)
**Platform**: Vercel
**Time**: ~2 minutes
```bash
# Just push to main, Vercel auto-deploys
git push origin main
```

### Recommended Option (Full Stack)
**Backend**: Railway
**Frontend**: Vercel
**Database**: MongoDB Atlas
**Time**: ~15 minutes

### Enterprise Option
**Backend**: AWS ECS
**Frontend**: CloudFront + S3
**Database**: AWS RDS MongoDB
**Time**: ~1 hour

---

## Security Checklist

- [ ] All sensitive data in environment variables
- [ ] SSL/TLS certificate installed
- [ ] Database has strong password
- [ ] API keys rotated regularly
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] Error messages don't expose sensitive data
- [ ] Database backups automated
- [ ] Monitoring and alerting setup

---

## Support

For deployment issues, refer to:
- Backend README: [backend/README.md](backend/README.md)
- Frontend README: [frontend/README.md](frontend/README.md)
- Platform-specific documentation links in guide above

---

**Last Updated**: June 2026
**Version**: 1.0.0
