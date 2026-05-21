import React, { useState } from 'react';

const ControlPanel = ({ onBook, onRandomize, onReset, bookingResult, error, loading }) => {
  const [count, setCount] = useState(1);

  const handleBook = () => {
    if (count >= 1 && count <= 5) onBook(count);
  };

  const roomCounts = [1, 2, 3, 4, 5];

  return (
    <div className="animate-fade-in-up flex flex-col gap-6">
      {/* Header Card */}
      <div
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
          border: '1px solid rgba(99,102,241,0.3)',
          boxShadow: '0 0 40px rgba(99,102,241,0.1)',
        }}
      >
        {/* Decorative blob */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }}></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">Room Reservation</h1>
              <p className="text-indigo-300 text-xs font-medium">Smart Allocation Engine</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Card */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: 'linear-gradient(180deg, #1a2035, #151c2e)',
          border: '1px solid #2a3455',
        }}
      >
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
          Select number of rooms
        </label>

        {/* Room count selector - pill buttons */}
        <div className="flex gap-2 mb-4">
          {roomCounts.map(n => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                count === n
                  ? 'text-white shadow-lg scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
              style={count === n ? {
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
                border: '1px solid rgba(129,140,248,0.5)',
              } : {
                background: 'rgba(30,41,59,0.5)',
                border: '1px solid #2a3455',
              }}
            >
              {n}
            </button>
          ))}
        </div>

        <button
          onClick={handleBook}
          disabled={loading}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: loading ? '#374151' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            boxShadow: loading ? 'none' : '0 4px 20px rgba(79,70,229,0.4)',
            border: '1px solid rgba(129,140,248,0.3)',
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Finding optimal rooms...
            </span>
          ) : (
            `Book ${count} Room${count > 1 ? 's' : ''}`
          )}
        </button>
      </div>

      {/* Actions Card */}
      <div
        className="rounded-2xl p-5 flex flex-col gap-3"
        style={{
          background: 'linear-gradient(180deg, #1a2035, #151c2e)',
          border: '1px solid #2a3455',
        }}
      >
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
          Simulation Tools
        </label>
        <button
          onClick={onRandomize}
          disabled={loading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-slate-300 transition-all duration-200 cursor-pointer disabled:opacity-40 hover:bg-slate-700/60 active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid #2a3455' }}
        >
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
          Random Occupancy
        </button>
        <button
          onClick={onReset}
          disabled={loading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-red-400 transition-all duration-200 cursor-pointer disabled:opacity-40 hover:bg-red-900/20 active:scale-[0.98] flex items-center justify-center gap-2"
          style={{ background: 'rgba(30,41,59,0.3)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
          </svg>
          Reset All Bookings
        </button>
      </div>

      {/* Error */}
      {error && (
        <div
          className="rounded-2xl p-4 animate-slide-down"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
        >
          <div className="flex items-start gap-3">
            <span className="text-red-400 text-lg mt-0.5">⚠️</span>
            <div>
              <p className="text-sm font-semibold text-red-300">Booking Failed</p>
              <p className="text-xs text-red-400/80 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Result */}
      {bookingResult && (
        <div
          className="rounded-2xl p-5 animate-slide-down relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(245,158,11,0.05))',
            border: '1px solid rgba(16,185,129,0.3)',
          }}
        >
          <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #10b981, transparent)' }}></div>
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">✅</span>
              <h3 className="font-bold text-emerald-300 text-sm">Booking Confirmed</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Rooms</span>
                <span className="text-sm font-bold text-white">{bookingResult.bookedRooms.map(r => r.id).join(', ')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Travel Time</span>
                <span className="text-sm font-bold text-amber-300">{bookingResult.travelTime} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Strategy</span>
                <span className="text-xs font-medium text-indigo-300">{bookingResult.message}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
