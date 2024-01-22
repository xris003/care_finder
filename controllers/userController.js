const Healthcare = require("../models/healthcareModel");
const Users = require("../models/usersModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// exports.getAllHealthcare = catchAsync(async (req, res) => {
//   const Healthcares = await Healthcare.find();

// });

exports.getAllUsers = catchAsync(async (req, res) => {
  const user = await Users.find();

  if (!user) {
    return next(new AppError("No document with that number", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return next(new AppError("No document with that number", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await Users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("No document with that number", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};
