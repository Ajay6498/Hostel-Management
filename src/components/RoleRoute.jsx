import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated, getRole } from '../auth'

export default function RoleRoute({ children, allowed = [] }) {
  const location = useLocation()
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  const role = getRole()
  if (allowed.length > 0 && !allowed.includes(role)) {
    return <Navigate to="/" replace />
  }
  return children
}


