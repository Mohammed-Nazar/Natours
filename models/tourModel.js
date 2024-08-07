const mongoose = require('mongoose');

// Define a schema for location points
// const locationSchema = new mongoose.Schema({
//   description: String,
//   type: {
//     type: String,
//     enum: ['Point'], // Only 'Point' type is supported
//     required: true,
//   },
//   coordinates: {
//     type: [Number], // [longitude, latitude]
//     required: true,
//   },
//   day: Number,
// });

// Define the main schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a Group Size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: ['easy', 'medium', 'difficult'],
  },
  ratingsAverage: {
    type: Number,
    required: [true, 'A tour must have a rating'],
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'The tour must have an cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
