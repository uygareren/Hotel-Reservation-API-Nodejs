const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  maxPeople: {
    type: Number,
    required: true
  },
  roomNumbers: [
    {
      number: {
        type: Number,
        required: true
      },
      unavailableDates: {
        type: [Date]
      }
    }
  ]
});

module.exports = mongoose.model('Roomm', roomSchema);
