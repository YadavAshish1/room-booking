const API_BASE_URL = 'http://localhost:3001/api';

export const getRooms = async () => {
  const res = await fetch(`${API_BASE_URL}/rooms`);
  return res.json();
};

export const bookRooms = async (count) => {
  const res = await fetch(`${API_BASE_URL}/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Booking failed');
  }
  return res.json();
};

export const randomizeRooms = async () => {
  const res = await fetch(`${API_BASE_URL}/randomize`, { method: 'POST' });
  return res.json();
};

export const resetRooms = async () => {
  const res = await fetch(`${API_BASE_URL}/reset`, { method: 'POST' });
  return res.json();
};
