import Layout from '../components/Layout'

const sampleGuests = [
  { name: 'John Carter', phone: '+1 555 123 4567', email: 'john@example.com', lastStay: '2025-10-18' },
  { name: 'Priya Singh', phone: '+91 98765 43210', email: 'priya@example.com', lastStay: '2025-09-22' },
  { name: 'Wei Zhang', phone: '+86 138 0013 8000', email: 'wei@example.com', lastStay: '2025-07-12' },
]

export default function Guests() {
  return (
    <Layout title="Guests">
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Last Stay</th>
            </tr>
          </thead>
          <tbody>
            {sampleGuests.map(g => (
              <tr key={g.email}>
                <td>{g.name}</td>
                <td>{g.phone}</td>
                <td>{g.email}</td>
                <td>{g.lastStay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}


