# Hostel Management Dashboard (React + Vite)

A simple hostel management dashboard with login, protected routes, and core pages (Rooms, Bookings, Guests, Staff, Reports, Settings). Built with React 18, React Router v6, and Vite.

## Features
- Login with mock authentication (localStorage)
- Protected routes for dashboard pages
- Responsive sidebar layout and topbar
- Overview dashboard with KPIs and tables
- Core pages with sample data

## Getting Started

Prerequisites: Node.js 18+

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Default Credentials (Roles)
- Owner: `owner@example.com` / `owner123`
- Admin: `admin@example.com` / `admin123`
- Manager: `manager@example.com` / `manager123`
- User: `user@example.com` / `user123`

## Notes
- Authentication is mocked in `src/auth.js`. Replace with real API calls as needed.
- Routing is defined in `src/App.jsx` with a `ProtectedRoute` component.
- Role-based access uses `src/components/RoleRoute.jsx` and conditional nav in `src/components/Layout.jsx`.
- Layout is in `src/components/Layout.jsx` and styles in `src/styles.css`.


