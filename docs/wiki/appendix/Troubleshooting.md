# Troubleshooting

## Dev server not starting
- Close all running servers (Ctrl+C) and retry:
```bash
npm start
# or
npx --yes pnpm@9 dev
```

## Port in use
- Try a different port:
```bash
vite --port 5174
```

## npm error on PowerShell
- Use pnpm as a workaround:
```bash
npx --yes pnpm@9 install
npx --yes pnpm@9 dev
```

## Login fails after registration
- Clear localStorage keys: `hostel_auth_user`, `hostel_auth_users`, then refresh.

