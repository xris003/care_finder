const Healthcare = require("../models/healthcareModel");
const Users = require("../models/usersModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsync(async (req, res) => {
  const Healthcares = await Healthcare.find();
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
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

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined",
  });
};
