# Backend - GenAI Interview Platform

## Overview
This is the backend server for the GenAI Interview Platform. It provides RESTful APIs for user authentication, interview management, and AI-powered interview analysis services.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **AI Service**: Integration with AI models for interview analysis

## Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Git

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/genai_interviews
MONGODB_USER=<your-mongodb-user>
MONGODB_PASSWORD=<your-mongodb-password>

# JWT Configuration
JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRE=7d

# AI Service Configuration
AI_API_KEY=<your-ai-api-key>
AI_API_ENDPOINT=<your-ai-service-endpoint>

# CORS Configuration
CLIENT_URL=http://localhost:5173
```

## Project Structure

```
backend/
├── src/
│   ├── app.js                          # Express app configuration
│   ├── config/
│   │   └── database.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── auth.controller.js          # Authentication logic
│   │   └── interview.controller.js     # Interview management logic
│   ├── middlewares/
│   │   ├── auth.middleware.js          # JWT verification middleware
│   │   └── file.middleware.js          # File upload handling middleware
│   ├── models/
│   │   ├── user.model.js               # User schema
│   │   ├── interviewReport.model.js    # Interview report schema
│   │   └── blacklist.model.js          # Token blacklist schema
│   ├── routes/
│   │   ├── auth.routes.js              # Authentication routes
│   │   └── interview.routes.js         # Interview routes
│   ├── services/
│   │   └── ai.service.js               # AI integration service
│   └── server.js                       # Entry point
├── package.json                        # Project dependencies
└── README.md                           # This file
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:5000`

### Production Mode
```bash
npm start
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- **POST** `/register` - Register a new user
  - Body: `{ email, password, name }`
  - Returns: User data with JWT token

- **POST** `/login` - Login user
  - Body: `{ email, password }`
  - Returns: User data with JWT token

- **POST** `/logout` - Logout user
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

- **GET** `/profile` - Get user profile
  - Headers: `Authorization: Bearer <token>`
  - Returns: User profile data

### Interview Routes (`/api/interviews`)
- **GET** `/` - Get all interviews
  - Headers: `Authorization: Bearer <token>`
  - Returns: List of user interviews

- **POST** `/` - Create new interview
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, description, type }`
  - Returns: Created interview data

- **GET** `/:id` - Get interview details
  - Headers: `Authorization: Bearer <token>`
  - Returns: Interview details with report

- **PUT** `/:id` - Update interview
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ title, description }`
  - Returns: Updated interview data

- **DELETE** `/:id` - Delete interview
  - Headers: `Authorization: Bearer <token>`
  - Returns: Success message

- **POST** `/:id/submit` - Submit interview for analysis
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ answers, duration }`
  - Returns: Generated interview report

## Key Features

### Authentication
- User registration and login
- JWT-based authentication
- Token blacklist for logout functionality
- Secure password handling

### Interview Management
- Create and manage interviews
- Store interview responses
- Generate AI-powered analysis reports
- Track interview history

### AI Integration
- Interview analysis and scoring
- Performance feedback generation
- Skill assessment

## Middleware

### Authentication Middleware (`auth.middleware.js`)
- Validates JWT tokens
- Protects routes
- Extracts user information

### File Middleware (`file.middleware.js`)
- Handles file uploads
- Validates file types and sizes
- Stores files securely

## Models

### User Model
- Email (unique)
- Password (hashed)
- Name
- Profile information
- Created/Updated timestamps

### Interview Report Model
- User reference
- Interview questions and answers
- AI-generated analysis
- Score and feedback
- Timestamps

### Blacklist Model
- Tokenized JWT tokens (for logout)
- Expiration tracking

## Database Schema

MongoDB is used as the primary database. Ensure your MongoDB instance is running and accessible via the connection string in `.env`.

## Error Handling

The API returns standardized error responses:
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400
}
```

## Security Considerations

- All passwords are hashed using bcrypt
- JWT tokens expire after the specified duration
- CORS is configured for frontend communication
- Input validation on all endpoints
- Token blacklisting for logout

## Development Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (if configured)
npm test

# Lint code
npm run lint
```

## Troubleshooting

### Database Connection Issues
- Verify MongoDB is running
- Check `MONGODB_URI` in `.env`
- Ensure proper network connectivity

### Authentication Errors
- Verify JWT_SECRET is set correctly
- Check token expiration time
- Ensure token format in Authorization header: `Bearer <token>`

### AI Service Issues
- Verify `AI_API_KEY` and endpoint configuration
- Check network connectivity to AI service
- Review API rate limits

## Contributing

1. Create a new branch for features: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Create a Pull Request

## License

This project is part of the GenAI Interview Platform. All rights reserved.

## Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Last Updated**: June 2026
**Version**: 1.0.0
