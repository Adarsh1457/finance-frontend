# Finance App Frontend

React and Vite frontend for the finance data processing system. It provides the login and registration flow, dashboard, record management screens, import/export pages, and the admin user management UI.

## What This Frontend Does

- Authenticates users with JWT tokens from the backend.
- Stores the token and user profile in localStorage.
- Routes users based on role and login state.
- Displays shared finance data for all authenticated users.
- Allows admins to manage users, records, and imports.
- Allows normal users to view data and export records when permitted.

## User Roles and Access

The frontend supports two main roles in the current project flow:

- Admin: full access to dashboard, records, imports, exports, and user management.
- User: read access to shared dashboard and records, plus export access where allowed.

The UI hides or disables admin-only actions when the signed-in user does not have the right role.

## Default User Process

The project uses seeded default accounts for local development and testing.

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

## Project Process Behind the Frontend

The frontend is built around a simple data flow:

1. The app loads the API base URL from Vite environment variables.
2. Axios attaches the JWT token automatically on each request.
3. Protected routes redirect unauthenticated users to the login page.
4. Role-based routes prevent access to admin-only screens.
5. Pages fetch records, user lists, dashboard data, and import logs from the backend API.
6. UI components render charts, tables, filters, forms, and upload/download controls.

## Main Screens

- Login: sign in with email and password.
- Register: create a new user account.
- Dashboard: summary cards and charts for income, expenses, trends, and categories.
- Records: view, filter, sort, edit, and delete records.
- Import: upload CSV or Excel files and review import logs.
- Export: download filtered records as CSV or Excel.
- Users: admin-only user management screen.

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
- Add VITE_API_BASE_URL in Vercel if you want to override the fallback.

## Backend Dependency

The frontend depends on the backend API being available at the configured base URL. If the backend is down or the URL is wrong, requests will fail with network errors or CORS errors.

## Project Summary

This frontend is designed to stay thin and reusable:

- Authentication is handled by the backend.
- Data is fetched from live API endpoints.
- Access control is enforced by route guards and UI state.
- Charts and tables are rendered from shared finance data.
