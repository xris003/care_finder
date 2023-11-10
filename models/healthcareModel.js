const mongoose = require("mongoose");

const healthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A healthcare must have a type"],
    unique: true,
  },
  healthType: {
    type: String,
    required: [true, "There must be a type"],
  },
  services: {
    type: String,
    default: ["medical assistance"],
  },
  about: {
    type: String,
    max: 260,
  },
  reg: {
    type: String,
    required: [true, "Only registered healthcares are allowed to register"],
  },
  country: {
    type: String,
    required: [true, "Add the country of the healthcare"],
  },
  city: {
    type: String,
    required: [true, "Add the City/Town of the healthcare"],
  },
  zip: {
    type: Number,
    required: [true, "A healthcare must have posta code"],
  },
  address: {
    type: String,
    required: [true, "A healthcare should have an address"],
  },
  documents: String,
});

const Health = mongoose.model("Health", healthSchema);

module.exports = Health;
