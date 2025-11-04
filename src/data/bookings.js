const BOOKINGS_KEY = 'hostel_bookings'

function readBookings() {
  const raw = localStorage.getItem(BOOKINGS_KEY)
  if (!raw) {
    const seeded = []
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(seeded))
    return seeded
  }
  try {
    return JSON.parse(raw)
  } catch {
    const seeded = []
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(seeded))
    return seeded
  }
}

function writeBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

function generateId() {
  const date = new Date()
  return `BKG-${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}-${Math.random().toString(36).slice(2,7).toUpperCase()}`
}

export function getBookings() {
  return readBookings()
}

export function addBooking({ guestName, roomNumber, checkIn, nights, createdByEmail }) {
  const bookings = readBookings()
  const newBooking = {
    id: generateId(),
    guest: guestName,
    room: Number(roomNumber),
    checkIn,
    nights: Number(nights),
    status: 'Confirmed',
    createdByEmail: createdByEmail || null,
    createdAt: new Date().toISOString(),
  }
  bookings.unshift(newBooking)
  writeBookings(bookings)
  return newBooking
}

export function cancelBooking(bookingId) {
  const bookings = readBookings()
  const idx = bookings.findIndex(b => b.id === bookingId)
  if (idx >= 0) {
    bookings[idx] = { ...bookings[idx], status: 'Cancelled' }
    writeBookings(bookings)
    return bookings[idx]
  }
  return null
}


