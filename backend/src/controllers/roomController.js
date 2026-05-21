const roomService = require('../services/roomService');
const roomModel = require('../models/roomModel');

exports.getRooms = (req, res) => {
  try {
    const rooms = roomModel.getAllRooms();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.bookRooms = (req, res) => {
  try {
    const { count } = req.body;
    if (!count || count < 1 || count > 5) {
      return res.status(400).json({ error: 'Please specify a count between 1 and 5.' });
    }
    const result = roomService.bookRooms(count);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.randomizeRooms = (req, res) => {
  try {
    roomModel.randomizeOccupancy();
    res.json({ message: 'Rooms randomized successfully.', rooms: roomModel.getAllRooms() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetRooms = (req, res) => {
  try {
    roomModel.resetAllRooms();
    res.json({ message: 'All rooms have been reset.', rooms: roomModel.getAllRooms() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
