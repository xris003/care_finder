const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const Admin = require("./../models/adminModel");
const AppError = require("../utils/appError");

exports.signup = catchAsync(async (req, res, next) => {
  const newAdmin = await Admin.create(req.body);

  const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      admin: newAdmin,
    },
  });
});

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // 1) If email and password exists
  if (!email || !password) {
    next(new AppError("Please provide email and password", 400));
  }

  // 2) if admin and password is correct

  // 3) if ok send token to client
  const token = "";
  res.status(200).json({
    status: "success",
    token,
  });
};
