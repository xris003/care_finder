const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  healthEmail: {
    type: String,
    required: [true, "A health care must have an email"],
    unique: true,
    validate: [validator.isEmail, "Please enter an email"],
  },
  healthName: {
    type: String,
    required: [true, "A healthcare should have a name"],
    unique: true,
  },
  healthType: {
    type: String,
    required: [true, "There must be a type"],
    enum: {
      values: ["Hospital", "Clinic", "Maternity", "Pharmacy"],
      message:
        "Healthcare type is either: hospital, clinic, maternity, pharmacy",
    },
  },
  password: {
    type: String,
    required: [true, "Enter a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
