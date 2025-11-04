import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import Bookings from './pages/Bookings'
import Guests from './pages/Guests'
import Staff from './pages/Staff'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import RoleRoute from './components/RoleRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/rooms"
        element={
          <RoleRoute allowed={['owner', 'admin', 'manager']}>
            <Rooms />
          </RoleRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <RoleRoute allowed={['owner', 'admin', 'manager', 'user']}>
            <Bookings />
          </RoleRoute>
        }
      />
      <Route
        path="/guests"
        element={
          <RoleRoute allowed={['owner', 'admin', 'manager', 'user']}>
            <Guests />
          </RoleRoute>
        }
      />
      <Route
        path="/staff"
        element={
          <RoleRoute allowed={['owner', 'admin', 'manager']}>
            <Staff />
          </RoleRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <RoleRoute allowed={['owner', 'admin', 'manager']}>
            <Reports />
          </RoleRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <RoleRoute allowed={['owner', 'admin']}>
            <Settings />
          </RoleRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}


