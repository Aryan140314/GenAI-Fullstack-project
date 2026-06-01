# Frontend - GenAI Interview Platform

## Overview
This is the frontend application for the GenAI Interview Platform. It provides an intuitive user interface for conducting AI-powered interviews, viewing reports, and managing user profiles.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router
- **State Management**: Zustand
- **CSS Processing**: PostCSS

## Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn
- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the frontend root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000

# Application Configuration
VITE_APP_NAME=GenAI Interview Platform
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
```

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx                         # Main application component
│   ├── index.css                       # Global styles
│   ├── main.jsx                        # Application entry point
│   ├── api/
│   │   └── axios.js                    # Axios configuration and interceptors
│   ├── components/
│   │   ├── InterviewCard.jsx           # Interview list item component
│   │   ├── Loading.jsx                 # Loading spinner component
│   │   ├── Navbar.jsx                  # Navigation bar component
│   │   └── Sidebar.jsx                 # Sidebar navigation component
│   ├── layouts/
│   │   └── ProtectedLayout.jsx         # Protected route layout
│   ├── pages/
│   │   ├── Dashboard.jsx               # Main dashboard page
│   │   ├── InterviewDetails.jsx        # Interview details and report page
│   │   ├── Login.jsx                   # Login page
│   │   └── Register.jsx                # Registration page
│   ├── routes/
│   │   └── AppRoutes.jsx               # Route configuration
│   └── store/
│       └── authStore.js                # Authentication state management
├── index.html                          # HTML entry point
├── package.json                        # Project dependencies
├── vite.config.js                      # Vite configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
└── README.md                           # This file
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will start on `http://localhost:5173`

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `dist` folder

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

## Pages and Components

### Pages

#### Login (`/login`)
- User email and password input
- Remember me functionality
- Link to registration page
- Form validation

#### Register (`/register`)
- User registration form
- Email, password, and name input
- Password confirmation
- Link to login page
- Form validation

#### Dashboard (`/dashboard`)
- List of user interviews
- Interview cards with key information
- Create new interview button
- Filter and search functionality
- Navigation to interview details

#### Interview Details (`/interview/:id`)
- Interview questions and answers
- AI-generated analysis report
- Performance metrics and scoring
- Feedback and recommendations
- Option to retake interview

### Components

#### Navbar (`Navbar.jsx`)
- Application logo/title
- User profile menu
- Logout functionality
- Navigation links

#### Sidebar (`Sidebar.jsx`)
- Navigation menu
- Dashboard link
- Settings link
- Active route highlighting
- Collapsible on mobile

#### InterviewCard (`InterviewCard.jsx`)
- Interview title and description
- Interview date and duration
- Performance score (if completed)
- Quick actions (view, edit, delete)

#### Loading (`Loading.jsx`)
- Loading spinner animation
- Used during data fetching
- Improves user experience

### Layouts

#### ProtectedLayout (`ProtectedLayout.jsx`)
- Wraps authenticated pages
- Redirects unauthenticated users to login
- Maintains Navbar and Sidebar
- Manages layout structure

## State Management

### Auth Store (`store/authStore.js`)
Using Zustand for global authentication state:

```javascript
- user: Current user object
- token: JWT authentication token
- isAuthenticated: Boolean authentication status
- login: Login action
- register: Register action
- logout: Logout action
- setUser: Set user data
- setToken: Set JWT token
```

Usage example:
```javascript
import { useAuthStore } from '../store/authStore';

const { user, logout } = useAuthStore();
```

## API Integration

### Axios Configuration (`api/axios.js`)

The axios client is configured with:
- Base URL from environment variables
- Automatic JWT token attachment to requests
- Request/response interceptors
- Error handling
- Timeout configuration

### API Endpoints Used

**Authentication**
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `GET /auth/profile` - Get user profile

**Interviews**
- `GET /interviews` - Fetch all interviews
- `POST /interviews` - Create new interview
- `GET /interviews/:id` - Get interview details
- `PUT /interviews/:id` - Update interview
- `DELETE /interviews/:id` - Delete interview
- `POST /interviews/:id/submit` - Submit for analysis

## Styling

### Tailwind CSS
- Utility-first CSS framework
- Configured in `tailwind.config.js`
- PostCSS processing via `postcss.config.js`
- Responsive design support

### Global Styles (`index.css`)
- Base styles and resets
- Typography settings
- Color schemes
- Custom utility classes

## Routing

### Route Configuration (`routes/AppRoutes.jsx`)

```
/login                    - Login page (public)
/register                 - Register page (public)
/dashboard                - Dashboard (protected)
/interview/:id            - Interview details (protected)
/settings                 - Settings page (protected)
```

Protected routes require valid JWT token and redirect unauthenticated users to login.

## Build Configuration

### Vite (`vite.config.js`)
- Optimized for fast development
- Fast HMR (Hot Module Replacement)
- Production build optimization
- Plugin configuration

### Tailwind (`tailwind.config.js`)
- Theme customization
- Color palette
- Spacing and sizing
- Breakpoints for responsive design

### PostCSS (`postcss.config.js`)
- Tailwind CSS plugin integration
- CSS optimization

## Authentication Flow

1. User enters credentials on login/register page
2. Credentials sent to backend API
3. Backend validates and returns JWT token
4. Token stored in auth store
5. Token automatically included in API requests
6. Protected routes check authentication status
7. Logout clears token and redirects to login

## Error Handling

- API errors are caught and displayed to users
- Form validation on input
- Network error handling
- Token expiration handling with re-authentication prompt

## Performance Optimization

- Code splitting with Vite
- Lazy loading of routes
- Image optimization
- CSS/JS minification in production
- Caching strategies

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint

# Format code (if configured)
npm run format
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

Key packages:
- `react`: UI framework
- `react-router-dom`: Client-side routing
- `axios`: HTTP client
- `zustand`: State management
- `tailwindcss`: CSS framework
- `vite`: Build tool

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api` |
| `VITE_API_TIMEOUT` | Request timeout in milliseconds | `10000` |
| `VITE_APP_NAME` | Application name | `GenAI Interview Platform` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_ENABLE_ANALYTICS` | Enable analytics tracking | `false` |

## Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- --port 3000
```

### Vite Not Starting
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### API Connection Issues
- Verify backend is running on the correct port
- Check `VITE_API_BASE_URL` in `.env`
- Review browser console for errors

### Styling Issues
- Ensure Tailwind configuration is correct
- Clear browser cache
- Rebuild the project

## Contributing

1. Create a new branch for features: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Create a Pull Request

## Code Style

- Use ES6+ syntax
- Component-based architecture
- Functional components with hooks
- Meaningful variable and function names
- Consistent indentation (2 spaces)

## License

This project is part of the GenAI Interview Platform. All rights reserved.

## Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Last Updated**: June 2026
**Version**: 1.0.0
