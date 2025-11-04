import { useState } from 'react'
import Layout from '../components/Layout'

export default function Settings() {
  const [hotelName, setHotelName] = useState('Sunrise Hostel')
  const [currency, setCurrency] = useState('INR')
  const [timezone, setTimezone] = useState('UTC')

  return (
    <Layout title="Settings">
      <div className="card">
        <h3>General</h3>
        <div className="field">
          <label>Hostel Name</label>
          <input value={hotelName} onChange={e => setHotelName(e.target.value)} />
        </div>
        <div className="field">
          <label>Currency</label>
          <input value={currency} onChange={e => setCurrency(e.target.value)} />
        </div>
        <div className="field">
          <label>Timezone</label>
          <input value={timezone} onChange={e => setTimezone(e.target.value)} />
        </div>
        <div style={{ marginTop: 16 }}>
          <button className="btn primary" onClick={() => alert('Settings saved!')}>Save changes</button>
        </div>
      </div>
    </Layout>
  )
}


