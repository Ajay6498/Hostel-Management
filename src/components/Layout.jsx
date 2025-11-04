import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getUser, getRole, logout } from '../auth'

export default function Layout({ title, children }) {
  const navigate = useNavigate()
  const user = getUser()
  const role = getRole()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-layout">
      <main className="main">
        <div className="topbar">
          <div className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="logo">HS</div>
            <div>
              <div>HostelManage</div>
              <small style={{ color: '#93a1b6' }}>Dashboard</small>
            </div>
          </div>
          <nav className="topnav">
            <NavLink to="/" end>🏠 Overview</NavLink>
            {['owner','admin','manager'].includes(role) && (
              <NavLink to="/rooms">🛏️ Rooms</NavLink>
            )}
            <NavLink to="/bookings">🗓️ Bookings</NavLink>
            <NavLink to="/guests">👤 Guests</NavLink>
            {['owner','admin','manager'].includes(role) && (
              <NavLink to="/staff">🧑‍🍳 Staff</NavLink>
            )}
            {['owner','admin','manager'].includes(role) && (
              <NavLink to="/reports">📊 Reports</NavLink>
            )}
            {['owner','admin'].includes(role) && (
              <NavLink to="/settings">⚙️ Settings</NavLink>
            )}
          </nav>
          <button className="hamburger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div className="search">
            <span>🔎</span>
            <input placeholder="Search beds, residents, bookings..." />
          </div>
          <div className="user">
            <div className="avatar" />
            <div>
              <div style={{ fontWeight: 600 }}>{user?.name ?? 'User'}</div>
              <small style={{ color: '#93a1b6' }}>{user?.role ?? 'Member'}</small>
            </div>
            <button className="btn ghost" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
            <nav className="topnav">
              <NavLink to="/" end>🏠 Overview</NavLink>
              {['owner','admin','manager'].includes(role) && (
                <NavLink to="/rooms">🛏️ Rooms</NavLink>
              )}
              <NavLink to="/bookings">🗓️ Bookings</NavLink>
              <NavLink to="/guests">👤 Guests</NavLink>
              {['owner','admin','manager'].includes(role) && (
                <NavLink to="/staff">🧑‍🍳 Staff</NavLink>
              )}
              {['owner','admin','manager'].includes(role) && (
                <NavLink to="/reports">📊 Reports</NavLink>
              )}
              {['owner','admin'].includes(role) && (
                <NavLink to="/settings">⚙️ Settings</NavLink>
              )}
            </nav>
          </div>
        )}

        <section style={{ padding: 18 }}>
          {title ? (
            <h2 style={{ marginTop: 0 }}>{title}</h2>
          ) : null}
          {children}
        </section>
      </main>
    </div>
  )
}


