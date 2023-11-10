const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A healthcare must have a type"],
    unique: true,
    trim: true,
  },
  healthType: {
    type: String,
    required: [true, "There must be a type"],
  },
  services: {
    type: String,
    default: "Treatment",
    trim: true,
  },
  aboutHealthcare: {
    type: String,
    max: 260,
    trim: true,
  },
  reg: {
    type: String,
    // required: [true, "Only registered healthcares are allowed to register"],
  },
  country: {
    type: String,
    // required: [true, "Add the country of the healthcare"],
  },
  city: {
    type: String,
    // required: [true, "Add the City/Town of the healthcare"],
  },
  zip: {
    type: Number,
    // required: [true, "A healthcare must have posta code"],
  },
  address: {
    type: String,
    // required: [true, "A healthcare should have an address"],
  },
  documents: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ratingsAverage: {
    type: Number,
    default: 3,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

const Health = mongoose.model("Health", healthSchema);

module.exports = Health;
