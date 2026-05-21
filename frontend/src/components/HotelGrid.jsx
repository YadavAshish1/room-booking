import React from 'react';

const HotelGrid = ({ rooms, lastBookedIds }) => {
  const floors = [];
  for (let i = 10; i >= 1; i--) {
    floors.push({
      floor: i,
      rooms: rooms.filter(r => r.floor === i).sort((a, b) => a.index - b.index)
    });
  }

  const getRoomStyle = (room) => {
    const isJustBooked = lastBookedIds.includes(room.id);
    if (isJustBooked) return 'just-booked';
    if (room.isBooked) return 'booked';
    return 'available';
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Hotel Layout</h2>
          <p className="text-sm text-slate-400 mt-1">97 rooms across 10 floors</p>
        </div>
        <div className="flex items-center gap-5 text-xs font-medium">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block shadow-[0_0_6px_rgba(16,185,129,0.5)]"></span>
            <span className="text-slate-400">Available</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-red-500 inline-block shadow-[0_0_6px_rgba(239,68,68,0.5)]"></span>
            <span className="text-slate-400">Booked</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-amber-400 inline-block shadow-[0_0_6px_rgba(245,158,11,0.5)]"></span>
            <span className="text-slate-400">Just Booked</span>
          </span>
        </div>
      </div>

      {/* Building */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #111827 0%, #0f172a 100%)',
          border: '1px solid #1e293b',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.05)'
        }}
      >
        {/* Roof */}
        <div
          className="h-3 w-full"
          style={{ background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #4f46e5)' }}
        ></div>

        <div className="stagger-children">
          {floors.map(({ floor, rooms: floorRooms }) => (
            <div
              key={floor}
              className="flex items-stretch border-b border-slate-800/60 last:border-b-0 hover:bg-slate-800/30 transition-colors duration-200"
            >
              {/* Stairs/Lift Column */}
              <div className="w-20 flex-shrink-0 flex flex-col items-center justify-center py-3 border-r border-slate-700/50 relative"
                style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.08), rgba(99,102,241,0.03))' }}
              >
                <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-widest">F{floor}</span>
                <div className="mt-1 flex flex-col items-center gap-0.5">
                  {/* Elevator icon */}
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-6L16.5 15m0 0L12 10.5m4.5 4.5V1.5" />
                  </svg>
                </div>
              </div>

              {/* Room cells */}
              <div className="flex-1 flex items-center gap-2 px-4 py-3">
                {floorRooms.map(room => {
                  const status = getRoomStyle(room);
                  
                  let cellClasses = "relative w-14 h-11 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 cursor-default select-none ";
                  let cellStyle = {};

                  if (status === 'just-booked') {
                    cellClasses += "animate-pulse-glow text-amber-900 ";
                    cellStyle = {
                      background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                      border: '1px solid #fcd34d',
                    };
                  } else if (status === 'booked') {
                    cellClasses += "text-red-300/80 ";
                    cellStyle = {
                      background: 'rgba(239,68,68,0.15)',
                      border: '1px solid rgba(239,68,68,0.25)',
                    };
                  } else {
                    cellClasses += "text-emerald-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 ";
                    cellStyle = {
                      background: 'rgba(16,185,129,0.12)',
                      border: '1px solid rgba(16,185,129,0.25)',
                    };
                  }

                  return (
                    <div
                      key={room.id}
                      className={cellClasses}
                      style={cellStyle}
                      title={`Room ${room.id} — ${status === 'just-booked' ? 'Just Booked!' : status === 'booked' ? 'Occupied' : 'Available'}`}
                    >
                      {room.id}
                      {status === 'just-booked' && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-amber-300"></span>
                      )}
                      {status === 'booked' && (
                        <span className="absolute -top-0.5 -right-0.5 text-[8px]">🔒</span>
                      )}
                    </div>
                  );
                })}

                {/* Fill empty slots on floor 10 */}
                {floor === 10 && Array.from({ length: 3 }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-14 h-11 rounded-lg border border-dashed border-slate-700/40 flex items-center justify-center text-slate-700 text-[10px]">
                    —
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ground / Foundation */}
        <div className="px-4 py-2 flex items-center gap-3" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.1), transparent)' }}>
          <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Z" />
          </svg>
          <span className="text-[10px] font-medium text-indigo-400 uppercase tracking-widest">Main Entrance & Lobby</span>
        </div>
      </div>
    </div>
  );
};

export default HotelGrid;
