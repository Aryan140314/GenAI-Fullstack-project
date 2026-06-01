# Interview AI Fullstack Project

A fullstack AI Interview Preparation platform with a React frontend and an Express/MongoDB backend. Users can register, login, upload a resume PDF, generate AI-powered interview reports, view preparation plans, and download an optimized resume PDF.

## Project Structure

```txt
genAI/
  backend/
    src/
      app.js
      config/
      controllers/
      middlewares/
      models/
      routes/
      services/
    server.js
    package.json
    .env

  frontend/
    src/
      api/
      components/
      layouts/
      pages/
      routes/
      store/
    index.html
    package.json
```

## Tech Stack

Backend:

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication with cookies
- bcryptjs
- multer
- pdf-parse
- Google Gemini API via `@google/genai`
- Puppeteer for PDF generation

Frontend:

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Hook Form
- React Hot Toast
- Zustand
- Lucide React Icons

## Prerequisites

Install these before running the project:

- Node.js
- npm
- MongoDB Atlas account or local MongoDB
- Google Gemini API key

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:3000
```

## Frontend Setup

Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Running The Full Project

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Open:

```txt
http://localhost:5173
```

## Environment Variables

Only the backend needs environment variables.

```env
MONGO_URI=MongoDB connection URI
JWT_SECRET=Secret used to sign JWT tokens
GOOGLE_GENAI_API_KEY=Google Gemini API key
```

Do not push `.env` to GitHub.

## Authentication

Authentication is cookie-based JWT.

Login and register APIs create a JWT token and send it as a cookie:

```txt
token
```

The frontend sends cookies automatically using Axios:

```js
withCredentials: true
```

Private backend routes use `authUser` middleware to:

1. Read the token from cookies.
2. Check whether the token is blacklisted.
3. Verify the JWT token.
4. Attach the decoded user to `req.user`.

## Backend APIs

Base URL:

```txt
http://localhost:3000
```

### Auth APIs

Register user:

```txt
POST /api/auth/register
```

Body:

```json
{
  "username": "aryan",
  "email": "aryan@example.com",
  "password": "123456"
}
```

Login user:

```txt
POST /api/auth/login
```

Body:

```json
{
  "email": "aryan@example.com",
  "password": "123456"
}
```

Get current logged-in user:

```txt
GET /api/auth/get-me
```

Logout user:

```txt
GET /api/auth/logout
```

### Interview APIs

Generate interview report:

```txt
POST /api/interview/
```

Body type:

```txt
multipart/form-data
```

Fields:

```txt
resume: PDF file
selfDescription: text
jobDescription: text
```

Get all reports:

```txt
GET /api/interview/
```

Get report by ID:

```txt
GET /api/interview/report/:interviewId
```

Generate optimized resume PDF:

```txt
POST /api/interview/resume/pdf/:interviewReportId
```

## Frontend Routes

```txt
/login              Login page
/register           Register page
/                   Protected dashboard
/interview/:id      Interview report details page
```

## Frontend Features

- Modern dark GenAI SaaS UI
- Protected routes
- Cookie-based auth state
- Login and register forms
- Dashboard layout with sidebar and navbar
- Resume PDF upload
- AI interview report generation
- Search reports by title
- Sort reports by newest or oldest
- Match score color indicators
- Interview details page
- Technical and behavioral question accordions
- Skill gap tags
- Preparation timeline
- Optimized resume PDF download
- Toast notifications
- Loading states
- Responsive mobile sidebar

## Database Collections

MongoDB collections used by the backend:

```txt
users
blacklisttokens
interviewreports
```

`users` stores registered users.

`blacklisttokens` stores logged-out JWT tokens.

`interviewreports` stores AI-generated interview reports.

## Important Notes

- Backend CORS allows frontend origin `http://localhost:5173`.
- Frontend Axios base URL is `http://localhost:3000`.
- Resume upload must be a PDF.
- Resume file size limit is 3MB.
- Private APIs require a valid login cookie.
- After logout, the token is blacklisted and cannot be reused.

## Common Issues

If `get-me` returns `Token not provided`, login first and make sure cookies are enabled in the browser or Postman.

If MongoDB data saves in the wrong database, make sure `MONGO_URI` includes the database name before the query string:

```txt
mongodb://.../InterView-AI?...
```

If the AI report API fails, check that `GOOGLE_GENAI_API_KEY` exists in `backend/.env`.

If frontend cannot call backend, make sure both servers are running:

```txt
Backend:  http://localhost:3000
Frontend: http://localhost:5173
```

## Build Commands

Backend:

```bash
cd backend
npm run dev
```

Frontend development:

```bash
cd frontend
npm run dev
```

Frontend production build:

```bash
cd frontend
npm run build
```
