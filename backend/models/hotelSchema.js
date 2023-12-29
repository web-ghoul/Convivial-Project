const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the hotels
const hotelSchema = new Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  star_rating: {
    type: Number,
    default: 0,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
  },
  Activities: {
    type: [String],
    default: [],
  },
  General: {
    type: [String],
    default: [],
  },
  Parking: {
    type: [String],
    default: [],
  },
  Internet: {
    type: [String],
    default: [],
  },
  Services: {
    type: [String],
    default: [],
  },
},{timestamps : true});


module.exports = mongoose.model("Hotel" , hotelSchema)