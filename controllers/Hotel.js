const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

exports.createHotel = async (req,res,next) => {
    try {
        const hotel = await Hotel.create(req.body)
        res.status(201).json(hotel)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

exports.updateHotel = async (req,res,next) => {
    try {
        const id = req.params.id
        const updateHotel = req.body;

        const hotel = await Hotel.findByIdAndUpdate(id, updateHotel, {new: true})

        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        res.status(201).json(hotel)
    } catch (error) {
        res.status(500).json({message: error})

    }
}

exports.deleteHotel = async (req,res,next) => {
    try {
        const id = req.params.id

        const hotel = await Hotel.findByIdAndDelete(id)

        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        res.status(201).json({message: 'Deleting is succesfull!'})
    } catch (error) {
        res.status(500).json({message: error})

    }
}

exports.getHotelDetails = async (req,res,next) => {
    try {
        const id = req.params.id
        const hotel = await Hotel.findById(id)

        if (!hotel) {
            return res.status(404).json({ message: 'Otel bulunamadı' });
        }

        res.status(201).json(hotel)
    } catch (error) {
        res.status(500).json({message: error})

    }
}

// controllers/Hotel.js

exports.getAllHotel = async (req, res, next) => {
    try {
      const { min, max} = req.query;
  
      const hotels = await Hotel.find({
        cheapestPrice: {
          $gt: parseInt(min) || 1,  // min değeri sayıya dönüştür ve uygun bir değer sağla
          $lt: parseInt(max) || 999, // max değeri sayıya dönüştür ve uygun bir değer sağla
        },
      }).limit(parseInt(req.query.limit) || 0); // limit değerini sayıya dönüştür ve uygun bir değer sağla
  
      if (hotels.length === 0) {
        return res.status(404).json({ message: 'Otel bulunamadı' });
      }
  
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.typeByCount = async (req, res, next) => {
try {
    
    const hotel = await Hotel.countDocuments({type: 'Hotel'})
    const villa = await Hotel.countDocuments({type: 'Villa'})

    
    res.status(200).json([
        {type: 'Hotel', count: hotel},
        {type: 'Villa', count: villa}
    ]);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};
 
  
exports.typeByCity = async (req, res, next) => {
    try {
      const cities = req.query.cities.split(',');
  
      const hotels = await Promise.all(
        cities.map(async (city) => {
          const count = await Hotel.countDocuments({ city: city });
          return { city, count };
        })
      );
  
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

