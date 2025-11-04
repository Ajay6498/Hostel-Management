import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated, registerUser } from '../auth'

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')

  // Extended fields (for role === 'user')
  const [userId, setUserId] = useState('')
  const [currentAddress, setCurrentAddress] = useState('')
  const [permanentAddress, setPermanentAddress] = useState('')
  const [dob, setDob] = useState('')
  const [mobile, setMobile] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const [qualification, setQualification] = useState('')
  const [parentName, setParentName] = useState('')
  const [parentMobile, setParentMobile] = useState('')
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [profession, setProfession] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    function updateCompact() {
      const w = window.innerWidth
      const h = window.innerHeight
      setIsCompact(w < 900 || h < 700)
    }
    updateCompact()
    window.addEventListener('resize', updateCompact)
    return () => window.removeEventListener('resize', updateCompact)
  }, [])

  useEffect(() => {
    // Reset to step 1 when role changes
    setStep(1)
  }, [role])

  const totalSteps = useMemo(() => (role === 'user' && isCompact ? 5 : 1), [role, isCompact])

  function validateCurrentStep() {
    if (role !== 'user' || !isCompact) return true
    const checks = {
      1: () => !!userId && !!name && !!dob,
      2: () => !!currentAddress && !!permanentAddress,
      3: () => !!mobile && !!aadhaar && !!qualification && !!profession,
      4: () => !!parentName && !!parentMobile && !!gender && !!maritalStatus,
      5: () => !!email && !!password,
    }
    return checks[step]()
  }

  if (isAuthenticated()) {
    return <Navigate to={location.state?.from?.pathname || '/'} replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    let profile = null
    if (role === 'user') {
      // Basic required validation for user profile fields
      const required = [userId, currentAddress, permanentAddress, dob, email, mobile, aadhaar, qualification, parentName, parentMobile, gender, maritalStatus, profession]
      if (required.some(v => !String(v || '').trim())) {
        setLoading(false)
        setError('Please fill all required user fields')
        return
      }
      profile = {
        userId: userId.trim(),
        currentAddress: currentAddress.trim(),
        permanentAddress: permanentAddress.trim(),
        dob,
        mobile: mobile.trim(),
        aadhaar: aadhaar.trim(),
        qualification: qualification.trim(),
        parentName: parentName.trim(),
        parentMobile: parentMobile.trim(),
        gender,
        maritalStatus,
        profession: profession.trim(),
      }
    }
    const res = registerUser({ name: name.trim(), email: email.trim(), password, role, profile })
    setLoading(false)
    if (!res.ok) { setError(res.message); return }
    navigate('/', { replace: true })
  }

  return (
    <div className="auth-wrapper">
      <div className={`auth-card ${role === 'user' ? 'wide' : ''}`}>
        <h1>Create account</h1>
        <p className="muted" style={{ marginTop: 0 }}>Register as user or manager</p>
        {role === 'user' && isCompact && (
          <div className="progress" style={{ margin: '8px 0 14px 0' }}>
            <div className="bar" style={{ width: `${Math.round((step / totalSteps) * 100)}%` }} />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Name <span className="req">*</span></label>
            <input value={name} onChange={e => setName(e.target.value)} required placeholder="Full name" />
          </div>
          <div className="field">
            <label>Email <span className="req">*</span></label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@example.com" />
          </div>
          <div className="field">
            <label>Password <span className="req">*</span></label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Minimum 6 characters" />
          </div>
          <div className="field">
            <label>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }}>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {role === 'user' && !isCompact && (
            <div className="form-grid-2">
              <div className="section-title" style={{ gridColumn: '1 / -1' }}>User details</div>
              <div className="field">
                <label>User ID <span className="req">*</span></label>
                <input value={userId} onChange={e => setUserId(e.target.value)} required placeholder="Unique ID" />
              </div>
              <div className="field">
                <label>Date of Birth <span className="req">*</span></label>
                <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
              </div>
              <div className="section-title" style={{ gridColumn: '1 / -1' }}>Addresses</div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Current Address <span className="req">*</span></label>
                <textarea value={currentAddress} onChange={e => setCurrentAddress(e.target.value)} rows={2} style={{ resize: 'vertical', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }} required />
              </div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Permanent Address <span className="req">*</span></label>
                <textarea value={permanentAddress} onChange={e => setPermanentAddress(e.target.value)} rows={2} style={{ resize: 'vertical', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }} required />
              </div>
              <div className="section-title" style={{ gridColumn: '1 / -1' }}>Contacts & IDs</div>
              <div className="field">
                <label>Mobile No <span className="req">*</span></label>
                <input value={mobile} onChange={e => setMobile(e.target.value)} placeholder="10-digit" required />
              </div>
              <div className="field">
                <label>Aadhaar No <span className="req">*</span></label>
                <input value={aadhaar} onChange={e => setAadhaar(e.target.value)} placeholder="12-digit" required />
              </div>
              <div className="section-title" style={{ gridColumn: '1 / -1' }}>Background</div>
              <div className="field">
                <label>Qualification <span className="req">*</span></label>
                <input value={qualification} onChange={e => setQualification(e.target.value)} required />
              </div>
              <div className="field">
                <label>Profession <span className="req">*</span></label>
                <input value={profession} onChange={e => setProfession(e.target.value)} required />
              </div>
              <div className="section-title" style={{ gridColumn: '1 / -1' }}>Parent/Guardian</div>
              <div className="field">
                <label>Parent Name <span className="req">*</span></label>
                <input value={parentName} onChange={e => setParentName(e.target.value)} required />
              </div>
              <div className="field">
                <label>Parent Mobile No <span className="req">*</span></label>
                <input value={parentMobile} onChange={e => setParentMobile(e.target.value)} required />
              </div>
              <div className="field">
                <label>Gender <span className="req">*</span></label>
                <select value={gender} onChange={e => setGender(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="field">
                <label>Marital Status <span className="req">*</span></label>
                <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }} required>
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
            </div>
          )}

          {role === 'user' && isCompact && (
            <div>
              <div className="progress" style={{ margin: '8px 0 8px 0' }}>
                <div className="bar" style={{ width: `${Math.round((step / totalSteps) * 100)}%` }} />
              </div>
              <div className="muted" style={{ marginBottom: 8 }}>Step {step} of {totalSteps}</div>
              {step === 1 && (
                <div className="grid" style={{ gap: 12 }}>
                  <div className="field">
                    <label>User ID <span className="req">*</span></label>
                    <input value={userId} onChange={e => setUserId(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Name <span className="req">*</span></label>
                    <input value={name} onChange={e => setName(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Date of Birth <span className="req">*</span></label>
                    <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="grid" style={{ gap: 12 }}>
                  <div className="field">
                    <label>Current Address</label>
                    <textarea value={currentAddress} onChange={e => setCurrentAddress(e.target.value)} rows={3} style={{ resize: 'vertical', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }} required />
                  </div>
                  <div className="field">
                    <label>Permanent Address</label>
                    <textarea value={permanentAddress} onChange={e => setPermanentAddress(e.target.value)} rows={3} style={{ resize: 'vertical', padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }} required />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="grid" style={{ gap: 12 }}>
                  <div className="field">
                    <label>Mobile No</label>
                    <input value={mobile} onChange={e => setMobile(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Aadhaar No</label>
                    <input value={aadhaar} onChange={e => setAadhaar(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Qualification</label>
                    <input value={qualification} onChange={e => setQualification(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Profession</label>
                    <input value={profession} onChange={e => setProfession(e.target.value)} required />
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="grid" style={{ gap: 12 }}>
                  <div className="field">
                    <label>Parent Name</label>
                    <input value={parentName} onChange={e => setParentName(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Parent Mobile No</label>
                    <input value={parentMobile} onChange={e => setParentMobile(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Gender</label>
                    <select value={gender} onChange={e => setGender(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }} required>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Marital Status</label>
                    <select value={maritalStatus} onChange={e => setMaritalStatus(e.target.value)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid var(--border)', background: '#0c1424', color: 'var(--text)' }} required>
                      <option value="">Select</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                    </select>
                  </div>
                </div>
              )}
              {step === 5 && (
                <div className="grid" style={{ gap: 12 }}>
                  <div className="field">
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                </div>
              )}
              <div className="step-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                <button className="btn" type="button" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Back</button>
                {step < totalSteps ? (
                  <button className="btn primary" type="button" onClick={() => {
                    if (!validateCurrentStep()) { setError('Please complete required fields'); return }
                    setError(''); setStep(step + 1)
                  }}>Next</button>
                ) : (
                  <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
                )}
              </div>
            </div>
          )}
          {error ? <div className="error">{error}</div> : null}
          {!(role === 'user' && isCompact) && (
            <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
              <button className="btn primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
            </div>
          )}
          <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>Already have an account? <a href="/login">Sign in</a></div>
        </form>
      </div>
    </div>
  )
}


