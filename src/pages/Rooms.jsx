import Layout from '../components/Layout'
import { formatINR } from '../utils/currency'

const sampleRooms = [
  { number: 101, type: 'Deluxe King', status: 'Occupied', rate: 160 },
  { number: 102, type: 'Standard Queen', status: 'Available', rate: 120 },
  { number: 215, type: 'Suite', status: 'Cleaning', rate: 240 },
  { number: 402, type: 'Deluxe Twin', status: 'Reserved', rate: 150 },
]

export default function Rooms() {
  return (
    <Layout title="Rooms">
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Type</th>
              <th>Status</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {sampleRooms.map(r => (
              <tr key={r.number}>
                <td>{r.number}</td>
                <td>{r.type}</td>
                <td>{r.status}</td>
                <td>{formatINR(r.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}


