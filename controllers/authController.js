const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const Healthcare = require("../models/healthcareModel");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newHealthcare = await Healthcare.create(req.body);

  const token = signToken(newHealthcare._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      newHealthcare,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { healthEmail, password } = req.body;

  // 1) If email and password exists
  if (!healthEmail || !password) {
    next(new AppError("Please provide email and password", 400));
  }

  // 2) if Healthcare and password is correct
  const healthcare = await Healthcare.findOne({ healthEmail }).select(
    "+password"
  );
  //   const correct = user.correctPassword(password, Healthcare.password);

  if (
    !healthcare ||
    !(await healthcare.correctPassword(password, healthcare.password))
  ) {
    return next(new AppError("Incorrect email or password"));
  }

  // 3) if ok send token to client
  const token = signToken(Healthcare._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
