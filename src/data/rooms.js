const ROOMS_KEY = 'hostel_rooms'

function seedRooms() {
  return [
    { number: 101, type: 'Deluxe King', status: 'Occupied', rate: 160 },
    { number: 102, type: 'Standard Queen', status: 'Available', rate: 120 },
    { number: 118, type: 'Standard Twin', status: 'Available', rate: 110 },
    { number: 215, type: 'Suite', status: 'Cleaning', rate: 240 },
    { number: 402, type: 'Deluxe Twin', status: 'Reserved', rate: 150 },
    { number: 406, type: 'Standard Queen', status: 'Available', rate: 120 },
  ]
}

function readRooms() {
  const raw = localStorage.getItem(ROOMS_KEY)
  if (!raw) {
    const seeded = seedRooms()
    localStorage.setItem(ROOMS_KEY, JSON.stringify(seeded))
    return seeded
  }
  try {
    return JSON.parse(raw)
  } catch {
    const seeded = seedRooms()
    localStorage.setItem(ROOMS_KEY, JSON.stringify(seeded))
    return seeded
  }
}

function writeRooms(rooms) {
  localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms))
}

export function getRooms() {
  return readRooms()
}

export function getAvailableRooms() {
  return readRooms().filter(r => r.status === 'Available')
}

export function reserveRoom(roomNumber) {
  const rooms = readRooms()
  const idx = rooms.findIndex(r => r.number === Number(roomNumber))
  if (idx >= 0 && rooms[idx].status === 'Available') {
    rooms[idx] = { ...rooms[idx], status: 'Reserved' }
    writeRooms(rooms)
    return true
  }
  return false
}

export function releaseRoom(roomNumber) {
  const rooms = readRooms()
  const idx = rooms.findIndex(r => r.number === Number(roomNumber))
  if (idx >= 0 && rooms[idx].status !== 'Available') {
    rooms[idx] = { ...rooms[idx], status: 'Available' }
    writeRooms(rooms)
    return true
  }
  return false
}


