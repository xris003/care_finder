const mongoose = require("mongoose");
const validator = require("validator");

const usersSchema = new mongoose.Schema({
  photo: [String],
  firstName: {
    type: String,
    required: [true, "An admin needs a first name"],
  },
  lastName: {
    type: String,
    required: [true, "An admin needs a last name"],
  },
  phoneNo: {
    type: String,
    required: [true, "A contact number is needed"],
  },
  email: {
    type: String,
    required: [true, "An email is needed"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
