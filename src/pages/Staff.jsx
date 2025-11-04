import Layout from '../components/Layout'

const sampleStaff = [
  { name: 'Alice Johnson', role: 'Front Desk', shift: 'Morning' },
  { name: 'Michael Brown', role: 'Housekeeping', shift: 'Evening' },
  { name: 'Sara Lee', role: 'Chef', shift: 'Morning' },
]

export default function Staff() {
  return (
    <Layout title="Staff">
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Shift</th>
            </tr>
          </thead>
          <tbody>
            {sampleStaff.map(s => (
              <tr key={s.name}>
                <td>{s.name}</td>
                <td>{s.role}</td>
                <td>{s.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}


