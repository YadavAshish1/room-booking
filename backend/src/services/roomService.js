const roomModel = require('../models/roomModel');

class RoomService {
  calculateTravelTime(rooms) {
    if (!rooms || rooms.length <= 1) return 0;
    
    // Sort rooms by floor then index to simulate a logical path
    const sorted = [...rooms].sort((a, b) => {
      if (a.floor === b.floor) return a.index - b.index;
      return a.floor - b.floor;
    });

    let totalTime = 0;
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = sorted[i];
      const b = sorted[i + 1];
      
      if (a.floor === b.floor) {
        totalTime += Math.abs(a.index - b.index);
      } else {
        totalTime += (a.index + b.index + Math.abs(a.floor - b.floor) * 2);
      }
    }
    return totalTime;
  }

  bookRooms(count) {
    const availableRooms = roomModel.getAvailableRooms();
    
    if (availableRooms.length < count) {
      throw new Error(`Only ${availableRooms.length} rooms available.`);
    }

    // Priority 1: Same Floor
    let bestSameFloorRooms = null;
    let minSameFloorTime = Infinity;

    for (let floor = 1; floor <= 10; floor++) {
      const floorRooms = availableRooms.filter(r => r.floor === floor).sort((a, b) => a.index - b.index);
      if (floorRooms.length >= count) {
        // Sliding window on this floor
        for (let i = 0; i <= floorRooms.length - count; i++) {
          const window = floorRooms.slice(i, i + count);
          const time = this.calculateTravelTime(window);
          if (time < minSameFloorTime) {
            minSameFloorTime = time;
            bestSameFloorRooms = window;
          }
        }
      }
    }

    if (bestSameFloorRooms) {
      roomModel.bookRooms(bestSameFloorRooms.map(r => r.id));
      return {
        bookedRooms: bestSameFloorRooms,
        travelTime: minSameFloorTime,
        message: 'Booked on the same floor.'
      };
    }

    // Priority 2: Across Floors
    // We use exact combinations since max available rooms per floor is count - 1 (e.g., 4 if count is 5).
    // So max total available rooms to consider is (count - 1) * 10, which is max 40.
    // 40 Choose 5 is ~658,000, fast enough for brute force.
    let bestMultiFloorRooms = null;
    let minMultiFloorTime = Infinity;

    const generateCombinations = (start, combo) => {
      if (combo.length === count) {
        const time = this.calculateTravelTime(combo);
        if (time < minMultiFloorTime) {
          minMultiFloorTime = time;
          bestMultiFloorRooms = [...combo];
        }
        return;
      }

      for (let i = start; i < availableRooms.length; i++) {
        // Pruning: if current time already exceeds minMultiFloorTime, skip
        if (combo.length > 0) {
          const currentTime = this.calculateTravelTime(combo);
          if (currentTime >= minMultiFloorTime) continue; // heuristic pruning
        }
        combo.push(availableRooms[i]);
        generateCombinations(i + 1, combo);
        combo.pop();
      }
    };

    generateCombinations(0, []);

    if (bestMultiFloorRooms) {
      roomModel.bookRooms(bestMultiFloorRooms.map(r => r.id));
      return {
        bookedRooms: bestMultiFloorRooms,
        travelTime: minMultiFloorTime,
        message: 'Booked across multiple floors.'
      };
    }

    throw new Error('Could not find suitable rooms.');
  }
}

module.exports = new RoomService();
