const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/rooms', roomController.getRooms);
router.post('/book', roomController.bookRooms);
router.post('/randomize', roomController.randomizeRooms);
router.post('/reset', roomController.resetRooms);

module.exports = router;
