import { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { getAvailableRooms, reserveRoom } from '../data/rooms'
import { addBooking, cancelBooking, getBookings } from '../data/bookings'
import { getRole, getUser } from '../auth'

export default function Bookings() {
  const role = getRole()
  const user = getUser()
  const [bookings, setBookings] = useState(getBookings())
  const [guestName, setGuestName] = useState(user?.name || '')
  const [roomNumber, setRoomNumber] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [nights, setNights] = useState(1)
  const [error, setError] = useState('')

  const availableRooms = useMemo(() => getAvailableRooms(), [bookings])

  const visibleBookings = useMemo(() => {
    if (role === 'user') {
      return bookings.filter(b => b.createdByEmail === user?.email)
    }
    return bookings
  }, [bookings, role, user])

  function handleCreate(e) {
    e.preventDefault()
    setError('')
    if (!guestName || !roomNumber || !checkIn || !nights) {
      setError('Please fill all fields')
      return
    }
    const reserved = reserveRoom(roomNumber)
    if (!reserved) {
      setError('Selected room is no longer available')
      return
    }
    const created = addBooking({ guestName, roomNumber, checkIn, nights, createdByEmail: user?.email })
    setBookings([created, ...bookings])
    setRoomNumber('')
    setNights(1)
  }

  function handleCancel(id, room) {
    const updated = cancelBooking(id)
    if (updated) {
      setBookings(getBookings())
    }
  }

  return (
    <Layout title="Bookings">
      {role === 'user' && (
        <div className="card" style={{ marginBottom: 16 }}>
          <h3>Create Booking</h3>
          <form onSubmit={handleCreate}>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
              <div className="field">
                <label>Guest name</label>
                <input value={guestName} onChange={e => setGuestName(e.target.value)} required />
              </div>
              <div className="field">
                <label>Room</label>
                <select value={roomNumber} onChange={e => setRoomNumber(e.target.value)} required style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }}>
                  <option value="">Select room</option>
                  {availableRooms.map(r => (
                    <option key={r.number} value={r.number}>{r.number} · {r.type}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Check-in</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
              </div>
              <div className="field">
                <label>Nights</label>
                <input type="number" min="1" value={nights} onChange={e => setNights(e.target.value)} required />
              </div>
            </div>
            {error ? <div className="error">{error}</div> : null}
            <div style={{ marginTop: 12 }}>
              <button className="btn primary" type="submit">Create booking</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Nights</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleBookings.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ color: '#93a1b6' }}>No bookings found.</td>
              </tr>
            ) : visibleBookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.guest}</td>
                <td>{b.room}</td>
                <td>{b.checkIn}</td>
                <td>{b.nights}</td>
                <td>{b.status}</td>
                <td>
                  {(role !== 'user') && b.status !== 'Cancelled' && (
                    <button className="btn" onClick={() => handleCancel(b.id, b.room)}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}


