const Admins = require("../models/adminsModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await Admins.find();

  res.status(200).json({
    status: "success",
    results: admins.length,
    data: {
      admins,
    },
  });
});

exports.createAdmin = catchAsync(async (req, res, next) => {
  const newAdmin = await Admins.create(req.body);

  res.status(201).json({
    status: "success",
    health: newAdmin,
  });
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
  const admin = await Admins.findByIdAndUpdate(req.params.id, req.body, {});

  if (!admin) {
    return next(new AppError("No Admin with that ID", 404));
  }

  res.status(200).json({
    data: {
      admin,
    },
  });
});
