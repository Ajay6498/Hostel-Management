# Installation & Run

This app is built with React 18 + Vite and React Router.

## Prerequisites
- Node.js 18+
- A modern browser (Chrome/Edge/Firefox)

## Install
```bash
npm install
```

If you face npm issues on Windows PowerShell, use pnpm:
```bash
npx --yes pnpm@9 install
```

## Run (Development)
```bash
npm start
# or
npm run dev
# or
npx --yes pnpm@9 dev
```

Open in browser: http://localhost:5173

## Build (Production)
```bash
npm run build
npm run preview
```

## Folder Structure (Key)
- `src/App.jsx`: routes and guards
- `src/components/Layout.jsx`: top navigation and layout
- `src/pages/*`: feature pages
- `src/auth.js`: auth, roles, registration
- `src/data/*`: localStorage data stores (rooms, bookings)
- `src/styles.css`: global styles

