const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const Healthcare = require("../models/healthcareModel");
const AppError = require("../utils/appError");
const sendEmail = require("./../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (healthcare, statusCode, res) => {
  const token = signToken(healthcare._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      healthcare,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newHealthcare = await Healthcare.create(req.body);

  createSendToken(newHealthcare, 201, res);
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
  createSendToken(healthcare, 200, res);
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
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  // 3) Check if healthcare stil exists
  const currentHealthcare = await Healthcare.findById(decoded.id);
  if (!currentHealthcare) {
    return next(new AppError("The healthcare no longer exists", 401));
  }

  // 4) Check if healthcare changed password after the token was isssued
  if (currentHealthcare.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "Healthcare recently changed password! Please log in again.",
        401
      )
    );
  }

  // Set currentUser in both req.user and res.locals.user
  req.healthcare = currentHealthcare;

  // Grants Access to proctected route
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get healtcare on POSTed email
  const healthcare = await Healthcare.findOne({
    healthEmail: req.body.healthEmail,
  });
  if (!healthcare) {
    return next(
      new AppError("There is no healthcare with that email address", 404)
    );
  }

  // 2) Generate random reset token
  const resetToken = healthcare.createPasswordResetToken();
  await healthcare.save({ validateBeforeSave: false });

  // 3) Send to Healthcare's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/healthcares/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new passsword and passwordConfirm to: ${resetURL}.\n If you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: healthcare.healthEmail,
      subject: "Your password reset token (valid for 20mins)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    healthcare.passwordResetToken = undefined;
    healthcare.passwordResetExpires = undefined;
    await healthcare.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get healthcare based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const healthcare = await Healthcare.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is healthcare, set the new password
  if (!healthcare) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  healthcare.password = req.body.password;
  healthcare.passwordConfirm = req.body.passwordConfirm;
  healthcare.passwordResetToken = undefined;
  healthcare.passwordResetExpires = undefined;
  await healthcare.save();

  // 3) Update changedPasswordAt property for the user

  // 4) Log the healthcare in, send JWT
  createSendToken(healthcare, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get Healthcare from Collection
  const healthcare = await Healthcare.findById(req.healthcare.id).select(
    "+password"
  );
  // 2) Check if POSTed current password is correct
  if (
    !(await healthcare.correctPassword(
      req.body.passwordCurrent,
      healthcare.password
    ))
  ) {
    return next(new AppError("Your current password is wrong", 401));
  }

  // 3) If so update password
  healthcare.password = req.body.password;
  healthcare.passwordConfirm = req.body.passwordConfirm;
  await healthcare.save();

  // 4) Log User in, send JWT
  createSendToken(healthcare, 200, res);
});
