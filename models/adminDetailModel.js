// const mongoose = require("mongoose");

// const adminSchema = new mongoose.Schema({
//   photo: [String],
//   firstName: {
//     type: String,
//     required: [true, "An admin needs a first name"],
//   },
//   lastName: {
//     type: String,
//     required: [true, "An admin needs a last name"],
//   },
//   phoneNo: {
//     type: Number,
//     required: [true, "A contact number is needed"],
//   },
//   email: {
//     type: String,
//     required: [true, "An email is needed"],
//     unique: [true, "Email already exists"],
//     lowercase: true,
//     validate: [validator.isEmail, "Please enter a valid email"],
//   },
//   position: {
//     type: String,
//     // enum: {
//     //     values: ["Chief Executive Officer", "Clinic", "Maternity", "Pharmacy"],
//     //     message:
//     //       "Healthcare type is either: hospital, clinic, maternity, pharmacy",
//     //   },
//   },
// });

// const Admin = mongoose.model("Admin", adminSchema);

// module.exports = Admin;
