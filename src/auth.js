const TOKEN_KEY = 'hostel_auth_token'
const USER_KEY = 'hostel_auth_user'
const USERS_KEY = 'hostel_auth_users'

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) : null
}

function seedUsers() {
  return [
    { email: 'owner@example.com', password: 'owner123', name: 'Hostel Owner', role: 'owner' },
    { email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
    { email: 'manager@example.com', password: 'manager123', name: 'Hostel Manager', role: 'manager' },
    { email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user' },
  ]
}

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  if (!raw) {
    const seeded = seedUsers()
    localStorage.setItem(USERS_KEY, JSON.stringify(seeded))
    return seeded
  }
  try { return JSON.parse(raw) } catch {
    const seeded = seedUsers()
    localStorage.setItem(USERS_KEY, JSON.stringify(seeded))
    return seeded
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function loginWithEmailPassword(email, password) {
  const users = readUsers()
  const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
  if (!found) {
    return { ok: false, message: 'Invalid email or password' }
  }
  localStorage.setItem(TOKEN_KEY, 'mock-token')
  localStorage.setItem(USER_KEY, JSON.stringify({ email: found.email, name: found.name, role: found.role }))
  return { ok: true }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getRole() {
  return getUser()?.role || null
}

export function registerUser({ name, email, password, role, profile }) {
  const allowed = ['user', 'manager']
  if (!allowed.includes(role)) {
    return { ok: false, message: 'Only user or manager can register' }
  }
  const users = readUsers()
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    return { ok: false, message: 'Email already registered' }
  }
  const user = { name, email, password, role, profile: profile || null }
  users.push(user)
  writeUsers(users)
  // Auto-sign in
  localStorage.setItem(TOKEN_KEY, 'mock-token')
  localStorage.setItem(USER_KEY, JSON.stringify({ email: user.email, name: user.name, role: user.role }))
  return { ok: true }
}


