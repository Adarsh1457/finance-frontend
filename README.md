# Finance App Frontend

React and Vite frontend for the finance data processing system.

Live demo: [https://finance-frontend-alpha-ten.vercel.app/](https://finance-frontend-alpha-ten.vercel.app/)

This app provides the login and registration flow, dashboard analytics, record management, import/export pages, and the admin user management UI.

## What This Frontend Does

- Authenticates users with JWT tokens from the backend.
- Stores the token and user profile in localStorage.
- Routes users based on login state and role.
- Displays shared finance data for all authenticated users.
- Allows admins to manage users, records, and imports.
- Allows normal users to view data and export records when permitted.
- Loads all data from the backend API instead of using local mock data.

## Architecture Highlights

- React 19 with Vite for fast builds and a simple SPA setup.
- React Router for page routing and protected access.
- Axios interceptors for attaching the JWT token automatically.
- Role-based route guards for Admin and User access control.
- Recharts for dashboard visualizations.
- Plain CSS for layout, responsive design, and component styling.
- Environment-driven API configuration for local and deployed builds.

## Backend and Data Flow

The frontend is built around a simple flow:

1. The app reads the API base URL from Vite environment variables.
2. Axios adds the JWT token on each request.
3. Protected routes redirect unauthenticated users to the login page.
4. Role-based routes block admin-only screens when needed.
5. Pages fetch records, dashboard metrics, users, and import logs from the backend API.
6. UI components render charts, tables, filters, forms, and upload/download controls.

## Main Screens

- Login: sign in with email and password.
- Register: create a new user account.
- Dashboard: summary cards and charts for income, expenses, trends, and categories.
- Records: view, filter, sort, edit, and delete records.
- Import: upload CSV or Excel files and review import logs.
- Export: download filtered records as CSV or Excel.
- Users: admin-only user management screen.

## User Roles and Access

The current project flow uses two effective roles in the UI:

- Admin: full access to dashboard, records, imports, exports, and user management.
- User: read access to shared dashboard and records, plus export access where allowed.

The UI hides or disables admin-only actions when the signed-in user does not have the right role.

## Default User Process

The backend seed script creates default accounts for local development and testing.

Default users:

- Admin: admin@finance.dev / admin123
- User: analyst@finance.dev / Test@1234
- Viewer: viewer@finance.dev / Test@1234

Typical flow:

1. Seed the backend database.
2. Start the backend API.
3. Start this frontend.
4. Log in with one of the default accounts.
5. Admin users can create users, edit users, import data, and manage records.
6. Viewer and normal user accounts can browse shared data and export when allowed.

## Environment Variables

Create a local environment file named .env.local for development:

```env
VITE_API_BASE_URL=https://finance-backend-q292.onrender.com/api
```

For local backend development, you can use:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

If VITE_API_BASE_URL is missing, the frontend falls back to the deployed Render backend URL.

## Local Development

Install dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

The app runs at:

- http://localhost:5173

## Deployment Notes

This frontend is ready for Vercel.

- Build command: npm run build
- Output directory: dist
- Production fallback API: https://finance-backend-q292.onrender.com/api
- Vercel deployment URL: https://finance-frontend-alpha-ten.vercel.app/

## Important Features Included

- JWT login and logout.
- Registration flow.
- Protected routes.
- Role-based access control.
- Dashboard with summary cards and charts.
- Records table with filtering, sorting, editing, and deletion.
- CSV and Excel import.
- CSV and Excel export.
- Admin user management.
- Shared data visibility across authenticated users.
- Responsive layout for desktop and mobile.

## Backend Dependency

The frontend depends on the backend API being available at the configured base URL. If the backend is down or the URL is wrong, requests will fail with network errors or CORS errors.

## Project Summary

This frontend is designed to stay thin and reusable:

- Authentication is handled by the backend.
- Data is fetched from live API endpoints.
- Access control is enforced by route guards and UI state.
- Charts and tables are rendered from shared finance data.
