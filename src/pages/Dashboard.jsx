import Layout from '../components/Layout'
import { formatINR } from '../utils/currency'
import { getRole } from '../auth'
import { useNavigate } from 'react-router-dom'

function Kpi({ title, value, delta, trend = 'up' }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="value">{value}</div>
      <div className={`delta ${trend}`}>{trend === 'up' ? '▲' : '▼'} {delta}</div>
    </div>
  )
}

export default function Dashboard() {
  const role = getRole()
  const navigate = useNavigate()

  // Minimal sample data for available rooms in overview
  const sampleRooms = [
    { number: 101, type: 'Deluxe King', status: 'Occupied', rate: 160 },
    { number: 102, type: 'Standard Queen', status: 'Available', rate: 120 },
    { number: 215, type: 'Suite', status: 'Cleaning', rate: 240 },
    { number: 402, type: 'Deluxe Twin', status: 'Available', rate: 150 },
  ]
  const availableRooms = sampleRooms.filter(r => r.status === 'Available')

  if (role === 'user') {
    return (
      <Layout title="Overview">
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>Available Rooms</h3>
            <button className="btn primary" onClick={() => navigate('/bookings')}>Book room</button>
          </div>
          <table style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>Room</th>
                <th>Type</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {availableRooms.map(r => (
                <tr key={r.number}>
                  <td>{r.number}</td>
                  <td>{r.type}</td>
                  <td>{formatINR(r.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Overview">
      <div className="grid kpis">
        <Kpi title="Occupancy" value="82%" delta="+5.2% WoW" trend="up" />
        <Kpi title="Revenue" value={formatINR(48930)} delta="+3.1% WoW" trend="up" />
        <Kpi title="Avg. Daily Rate" value="$142" delta="-1.4% WoW" trend="down" />
        <Kpi title="Bookings" value="126" delta="+8.0% WoW" trend="up" />
      </div>

      <div className="grid" style={{ marginTop: 16, gridTemplateColumns: '2fr 1fr' }}>
        <div className="card">
          <h3>Upcoming Check-ins</h3>
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Arrival</th>
                <th>Nights</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>John Carter</td><td>402</td><td>Today</td><td>3</td></tr>
              <tr><td>Priya Singh</td><td>215</td><td>Today</td><td>2</td></tr>
              <tr><td>Wei Zhang</td><td>118</td><td>Tomorrow</td><td>1</td></tr>
            </tbody>
          </table>
        </div>
        <div className="card">
          <h3>Alerts</h3>
          <ul>
            <li>Low inventory: Towels (12 left)</li>
            <li>Maintenance scheduled: Elevator B (Thu)</li>
            <li>Payment pending for 2 bookings</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}


