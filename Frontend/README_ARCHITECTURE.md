# Gym Management System - Architecture Documentation

## Project Structure

This project follows a modern, clean React architecture with proper separation of concerns.

### Folder Structure

```
src/
├── api/                    # API layer
│   ├── axiosConfig.js      # Axios instance with interceptors
│   └── services/           # API service modules
│       ├── authService.js
│       ├── gymService.js
│       ├── customerService.js
│       ├── trainerService.js
│       └── subscriptionService.js
│
├── constants/              # Application constants
│   ├── routes.js          # Route definitions
│   ├── apiEndpoints.js     # API endpoint constants
│   └── storageKeys.js     # LocalStorage key constants
│
├── hooks/                  # Custom React hooks
│   ├── useAuth.js         # Authentication hook
│   └── useApi.js          # API call hook with loading/error states
│
├── utils/                  # Utility functions
│   ├── validation.js      # Form validation utilities
│   └── errorHandler.js    # Error handling utilities
│
├── features/              # Feature-based components
│   ├── auth/              # Authentication feature
│   │   ├── components/
│   │   │   └── LoginForm/
│   │   └── pages/
│   │       └── LandingPage/
│   │
│   ├── superAdmin/        # Super Admin feature
│   │   └── pages/
│   │       └── SuperAdminDashboardPage/
│   │
│   ├── admin/             # Admin feature
│   │   └── pages/
│   │       └── AdminDashboard/
│   │
│   ├── gym/               # Gym management feature
│   │   └── components/
│   │       ├── AddGymForm/
│   │       └── UpdateGymForm/
│   │
│   ├── customer/          # Customer management feature
│   │   ├── components/
│   │   │   ├── RegistrationForm/
│   │   │   └── UpdateCustomerForm/
│   │   └── pages/
│   │       ├── CustomerDashboard/
│   │       └── CustomerHistory/
│   │
│   ├── trainer/           # Trainer management feature
│   │   └── pages/
│   │       └── TrainerPage/
│   │
│   ├── subscription/      # Subscription management feature
│   │   └── pages/
│   │       ├── SubscriptionSettings/
│   │       └── ViewSubscription/
│   │
│   ├── billing/           # Billing feature
│   │   └── pages/
│   │       └── BillingPage/
│   │
│   └── common/            # Common/shared features
│       └── pages/
│           └── AboutUs/
│
├── shared/                # Shared/reusable components
│   ├── components/        # Reusable UI components
│   │   ├── Button/
│   │   ├── Input/
│   │   └── LoadingSpinner/
│   └── layout/            # Layout components
│       ├── Navbar/
│       └── Footer/
│
├── layouts/               # Page layouts
│   └── MainLayout/        # Main application layout
│
└── routes/                # Route configuration
    └── AppRoutes.js       # Centralized route definitions
```

## Architecture Principles

### 1. Separation of Concerns
- **API Layer**: All API calls are centralized in the `api/services` directory
- **Business Logic**: Custom hooks handle business logic (authentication, data fetching)
- **Presentation**: Components focus solely on UI rendering
- **Configuration**: Constants and configuration are centralized

### 2. Feature-Based Organization
Components are organized by feature/domain rather than by type. This makes it easier to:
- Find related code
- Understand feature boundaries
- Scale the application
- Maintain and refactor

### 3. Reusability
- Shared components in `shared/components`
- Custom hooks for common patterns
- Utility functions for reusable logic

### 4. Clean Code Practices
- **Naming Conventions**:
  - Components: PascalCase (e.g., `LoginForm.js`)
  - Functions: camelCase (e.g., `handleSubmit`)
  - Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)
  - Files: Match component/function names

- **File Organization**:
  - One component per file
  - Co-located CSS files
  - Index files for barrel exports

### 5. Error Handling
- Centralized error handling in `utils/errorHandler.js`
- API error handling in axios interceptors
- User-friendly error messages

### 6. State Management
- Local state with `useState` for component-specific state
- Custom hooks for shared state logic
- Context API can be added for global state if needed

## Key Features

### API Layer
- Centralized axios instance with interceptors
- Automatic token injection
- Consistent error handling
- Service-based organization

### Custom Hooks
- `useAuth`: Handles authentication logic
- `useApi`: Manages API calls with loading and error states

### Validation
- Centralized validation rules
- Reusable validation functions
- Consistent error messages

### Routing
- Centralized route definitions
- Clean route configuration
- Layout wrapping for consistent UI

## Best Practices Followed

1. **Single Responsibility Principle**: Each module/component has one clear purpose
2. **DRY (Don't Repeat Yourself)**: Reusable components and utilities
3. **Consistent Naming**: Clear, descriptive names throughout
4. **Documentation**: JSDoc comments for functions and components
5. **Type Safety**: Consistent data structures and validation
6. **Error Handling**: Comprehensive error handling at all levels
7. **Loading States**: Proper loading indicators for async operations
8. **User Feedback**: Success and error messages for user actions

## Migration Notes

The old `ApiEndpoints.js` file has been replaced with:
- `constants/apiEndpoints.js` - Centralized endpoint definitions
- `api/services/*.js` - Service modules for each domain

All components have been refactored to:
- Use the new API service layer
- Use custom hooks for data fetching
- Use shared components
- Follow consistent naming conventions
- Use centralized constants

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_BASE_URL=http://localhost:4000/api/v1/
```

If not set, defaults to `http://localhost:4000/api/v1/`
