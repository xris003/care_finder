const mongoose = require("mongoose");
const slugify = require("slugify");

const healthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A healthcare must have a type"],
    unique: true,
    trim: true,
  },
  slug: String,
  type: {
    type: String,
    required: [true, "There must be a type"],
    enum: {
      values: ["Hospital", "Clinic", "Maternity", "Pharmacy"],
      message:
        "Healthcare type is either: hospital, clinic, maternity, pharmacy",
    },
  },
  services: {
    type: String,
    default: "Treatment",
    trim: true,
  },
  aboutHealthcare: {
    type: String,
    minlength: [
      100,
      "A heathcare about section must have at least one hundred characters",
    ],
    maxlength: [
      260,
      "A healthcare about section cannot have above 260 characters",
    ],
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

// DOCUMENT MIDDLEWARE
healthSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Health = mongoose.model("Health", healthSchema);

module.exports = Health;
