import { getStore } from '@netlify/blobs'

function initializeRooms() {
  const rooms = []
  for (let floor = 1; floor <= 9; floor++) {
    for (let i = 1; i <= 10; i++) {
      rooms.push({ id: floor * 100 + i, floor, index: i - 1, isBooked: false })
    }
  }
  for (let i = 1; i <= 7; i++) {
    rooms.push({ id: 1000 + i, floor: 10, index: i - 1, isBooked: false })
  }
  return rooms
}

function calculateTravelTime(rooms) {
  if (!rooms || rooms.length <= 1) return 0
  const sorted = [...rooms].sort((a, b) =>
    a.floor === b.floor ? a.index - b.index : a.floor - b.floor
  )
  let totalTime = 0
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = sorted[i], b = sorted[i + 1]
    if (a.floor === b.floor) {
      totalTime += Math.abs(a.index - b.index)
    } else {
      totalTime += a.index + b.index + Math.abs(a.floor - b.floor) * 2
    }
  }
  return totalTime
}

function findBestRooms(available, count) {
  // Priority 1: same floor (sliding window)
  let best = null
  let bestTime = Infinity

  for (let floor = 1; floor <= 10; floor++) {
    const floorRooms = available.filter(r => r.floor === floor).sort((a, b) => a.index - b.index)
    if (floorRooms.length >= count) {
      for (let i = 0; i <= floorRooms.length - count; i++) {
        const window = floorRooms.slice(i, i + count)
        const time = calculateTravelTime(window)
        if (time < bestTime) { bestTime = time; best = window }
      }
    }
  }

  if (best) return { rooms: best, travelTime: bestTime, message: 'Booked on the same floor.' }

  // Priority 2: across floors (brute-force combinations with pruning)
  let bestMulti = null
  let bestMultiTime = Infinity

  const combine = (start, combo) => {
    if (combo.length === count) {
      const time = calculateTravelTime(combo)
      if (time < bestMultiTime) { bestMultiTime = time; bestMulti = [...combo] }
      return
    }
    for (let i = start; i < available.length; i++) {
      if (combo.length > 0 && calculateTravelTime(combo) >= bestMultiTime) continue
      combo.push(available[i])
      combine(i + 1, combo)
      combo.pop()
    }
  }

  combine(0, [])

  if (bestMulti) return { rooms: bestMulti, travelTime: bestMultiTime, message: 'Booked across multiple floors.' }
  return null
}

export default async (req) => {
  const { count } = await req.json()

  if (!count || count < 1 || count > 5) {
    return Response.json({ error: 'Please specify a count between 1 and 5.' }, { status: 400 })
  }

  const store = getStore({ name: 'hotel-rooms', consistency: 'strong' })
  let rooms = await store.get('rooms', { type: 'json' })
  if (!rooms) rooms = initializeRooms()

  const available = rooms.filter(r => !r.isBooked)

  if (available.length < count) {
    return Response.json({ error: `Only ${available.length} rooms available.` }, { status: 400 })
  }

  const result = findBestRooms(available, count)
  if (!result) {
    return Response.json({ error: 'Could not find suitable rooms.' }, { status: 400 })
  }

  const bookedIds = new Set(result.rooms.map(r => r.id))
  const updatedRooms = rooms.map(r => bookedIds.has(r.id) ? { ...r, isBooked: true } : r)
  await store.setJSON('rooms', updatedRooms)

  return Response.json({
    bookedRooms: result.rooms,
    travelTime: result.travelTime,
    message: result.message,
  })
}

export const config = {
  path: '/api/book',
  method: 'POST',
}
