import Layout from '../components/Layout'

export default function Reports() {
  return (
    <Layout title="Reports">
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="card">
          <h3>Revenue (Monthly)</h3>
          <div style={{ height: 180, display: 'grid', placeItems: 'center', color: '#93a1b6' }}>
            [Chart placeholder]
          </div>
        </div>
        <div className="card">
          <h3>Occupancy (Weekly)</h3>
          <div style={{ height: 180, display: 'grid', placeItems: 'center', color: '#93a1b6' }}>
            [Chart placeholder]
          </div>
        </div>
      </div>
    </Layout>
  )
}


