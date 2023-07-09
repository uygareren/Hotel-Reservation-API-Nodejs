const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

exports.createRoom = async (req,res,next) => {
    const hotelId = req.params.hotelid
    try {

        const room = await Room.create(req.body)
        const hotel = await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: room._id}, new: true})
        res.status(201).json(hotel)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.updateRoom = async (req,res,next) => {
    const roomid = req.params.roomid
    const updateRoom = req.body
    try {
        const room = await Room.findByIdAndUpdate(roomid, updateRoom, {new: true})

        res.status(201).json(room)
    } catch (error) {
        res.status(500).json({message: error})
    }
}


exports.deleteRoom = async (req,res,next) => {
    const hotelId = req.params.hotelid
    const roomid = req.params.roomid
    try {
        await Room.findByIdAndDelete(roomid)
        await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: roomid}, new: true})

        res.status(201).json({message: 'Deleting is Succesfull!'})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.getDetailRoom = async (req,res,next) => {
    const roomid = req.params.roomid
    try {
        const room = await Room.findById(roomid)

        res.status(201).json(room)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.getAllRooms = async (req,res,next) => {
    try {
        const room = await Room.find()

        res.status(201).json(room)
    } catch (error) {
        res.status(500).json({message: error})
    }
}



