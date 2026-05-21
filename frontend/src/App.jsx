import React, { useState, useEffect, useCallback } from 'react';
import HotelGrid from './components/HotelGrid';
import ControlPanel from './components/ControlPanel';
import { getRooms, bookRooms, randomizeRooms, resetRooms } from './services/api';

function App() {
  const [rooms, setRooms] = useState([]);
  const [lastBookedIds, setLastBookedIds] = useState([]);
  const [bookingResult, setBookingResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ total: 97, available: 97, booked: 0 });

  const fetchRooms = useCallback(async () => {
    try {
      const data = await getRooms();
      setRooms(data);
      const booked = data.filter(r => r.isBooked).length;
      setStats({ total: data.length, available: data.length - booked, booked });
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleBook = async (count) => {
    setLoading(true);
    setError(null);
    setBookingResult(null);
    setLastBookedIds([]);
    try {
      const result = await bookRooms(count);
      setBookingResult(result);
      setLastBookedIds(result.bookedRooms.map(r => r.id));
      await fetchRooms();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomize = async () => {
    setLoading(true);
    setError(null);
    setBookingResult(null);
    setLastBookedIds([]);
    try {
      await randomizeRooms();
      await fetchRooms();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setError(null);
    setBookingResult(null);
    setLastBookedIds([]);
    try {
      await resetRooms();
      await fetchRooms();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a0e1a 0%, #0f1629 50%, #0a0e1a 100%)' }}>
      {/* Top Bar */}
      <header className="border-b border-slate-800/60 backdrop-blur-md" style={{ background: 'rgba(10,14,26,0.8)' }}>
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <span className="text-white text-sm font-black">H</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">Hotel Reservation System</h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Optimal Room Allocation</p>
            </div>
          </div>

          {/* Stats pills */}
          <div className="hidden md:flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-300">{stats.available} Available</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              <span className="text-red-300">{stats.booked} Booked</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span className="text-indigo-300">{stats.total} Total</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Controls */}
          <aside className="w-full lg:w-[320px] flex-shrink-0">
            <div className="lg:sticky lg:top-8">
              <ControlPanel
                onBook={handleBook}
                onRandomize={handleRandomize}
                onReset={handleReset}
                bookingResult={bookingResult}
                error={error}
                loading={loading}
              />
            </div>
          </aside>

          {/* Right: Hotel Visualization */}
          <section className="flex-1 min-w-0">
            {rooms.length > 0 ? (
              <HotelGrid rooms={rooms} lastBookedIds={lastBookedIds} />
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-slate-500 gap-3">
                <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span className="text-sm font-medium">Loading hotel data...</span>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
