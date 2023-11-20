const { promisify } = require("util");
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
  const token = signToken(healthcare._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get the token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Login to have access", 401)
    );
  }
  // 2) Verification token
  console.log("Received token:", token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3) Check if healthcare stil exists
  const freshHealthcare = await Healthcare.findById(decoded.id);
  if (!freshHealthcare) {
    return next(new AppError("The healthcare no longer exists", 401));
  }

  // 4) Check if healthcare changed password after the token was isssued
  if (freshHealthcare.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "Healthcare recently changed password! Please log in again.",
        401
      )
    );
  }

  // Grants Access to proctected route
  next();
});
