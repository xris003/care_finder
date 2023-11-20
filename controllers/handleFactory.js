// const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/appError");
// const { populate } = require("../models/reviewModel");

// exports.deleteOne = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndDelete(req.params.id);

//     if (!doc) {
//       return next(new AppError("No document with that number", 404));
//     }

//     res.status(204).json({
//       status: "success",
//       data: null,
//     });
//   });

// exports.updateOne = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!doc) {
//       return next(new AppError("No document with that number", 404));
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         data: doc,
//       },
//     });
//   });

// exports.createOne = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.create(req.body);
//     //console.log(newRoom);
//     res.status(201).json({
//       status: "success",
//       data: {
//         data: doc,
//       },
//     });
//   });

// exports.getOne = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const doc = await Model.findById(req.params.id);

//     if (!doc) {
//       return next(new AppError("No document with that number", 404));
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         data: doc,
//       },
//     });
//   });

// exports.getAll = (Model) =>
//   catchAsync(async (req, res, next) => {
//     let filter = {};
//     if (req.params.roomId) filter = { room: req.params.roomId };

//     const doc = await Model.find(filter);

//     res.status(200).json({
//       // status: "success",
//       results: doc.length,
//       data: {
//         data: doc,
//       },
//     });
//   });
