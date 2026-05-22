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

export default async () => {
  const store = getStore({ name: 'hotel-rooms', consistency: 'strong' })
  let rooms = await store.get('rooms', { type: 'json' })
  if (!rooms) rooms = initializeRooms()
  rooms = rooms.map(r => ({ ...r, isBooked: Math.random() > 0.5 }))
  await store.setJSON('rooms', rooms)
  return Response.json({ message: 'Rooms randomized successfully.', rooms })
}

export const config = {
  path: '/api/randomize',
  method: 'POST',
}
