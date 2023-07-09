const express = require('express');
const router = express.Router();

const HotelControllers = require('../controllers/Hotel');
const {verifyAdmin} = require('../middleware/auth');

router.post('/createhotel', verifyAdmin,HotelControllers.createHotel);
router.patch('/updatehotel/:id', verifyAdmin, HotelControllers.updateHotel);
router.delete('/deletehotel/:id', verifyAdmin, HotelControllers.deleteHotel);
router.get('/gethoteldetails/:id', HotelControllers.getHotelDetails);
router.get('/hotels', HotelControllers.getAllHotel);
router.get('/typebycount', HotelControllers.typeByCount);
router.get('/typebycity', HotelControllers.typeByCity);

module.exports = router;