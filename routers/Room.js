const express = require('express');
const router = express.Router();

const roomControllers = require('../controllers/Room');
const {verifyAdmin} = require('../middleware/auth');

router.post('/createroom/:hotelid',verifyAdmin, roomControllers.createRoom);
router.patch('/updateroom/:roomid', verifyAdmin,roomControllers.updateRoom);
router.delete('/deleteroom/:roomid',verifyAdmin, roomControllers.deleteRoom);
router.get('/detailroom/:roomid', roomControllers.getDetailRoom);
router.get('/rooms', roomControllers.getAllRooms);


module.exports = router;