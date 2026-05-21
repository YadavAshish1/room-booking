class RoomModel {
  constructor() {
    this.rooms = [];
    this.initializeRooms();
  }

  initializeRooms() {
    this.rooms = [];
    // Floors 1-9: 10 rooms each
    for (let floor = 1; floor <= 9; floor++) {
      for (let i = 1; i <= 10; i++) {
        this.rooms.push({
          id: floor * 100 + i,
          floor: floor,
          index: i - 1, // Distance from stairs: 0 for 1st room, 1 for 2nd...
          isBooked: false
        });
      }
    }
    // Floor 10: 7 rooms
    for (let i = 1; i <= 7; i++) {
      this.rooms.push({
        id: 1000 + i,
        floor: 10,
        index: i - 1,
        isBooked: false
      });
    }
  }

  getAllRooms() {
    return this.rooms;
  }

  getAvailableRooms() {
    return this.rooms.filter(r => !r.isBooked);
  }

  bookRooms(roomIds) {
    this.rooms.forEach(room => {
      if (roomIds.includes(room.id)) {
        room.isBooked = true;
      }
    });
  }

  resetAllRooms() {
    this.rooms.forEach(room => {
      room.isBooked = false;
    });
  }

  randomizeOccupancy() {
    this.rooms.forEach(room => {
      // 50% chance to be booked
      room.isBooked = Math.random() > 0.5;
    });
  }
}

// Singleton pattern
const roomModel = new RoomModel();
module.exports = roomModel;
