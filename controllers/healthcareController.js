const fs = require("fs");
const Health = require("./../models/healthcareModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
// const healthcare = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/clinics.json`)
// );
exports.getAllHealthCares = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Health.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const health = await features.query;

  res.status(200).json({
    status: "success",
    results: health.length,
    data: {
      health,
    },
  });
});

exports.getHealthCare = catchAsync(async (req, res, next) => {
  const health = await Health.findById(req.params.id);

  res.status(200).json({
    status: "success",
    results: health.length,
    data: {
      health,
    },
  });
});

exports.createHealthCare = catchAsync(async (req, res, next) => {
  const newHealth = await Health.create(req.body);

  res.status(201).json({
    status: "success",
    health: newHealth,
  });
});

exports.updateHealthCare = catchAsync(async (req, res, next) => {
  const newHealth = await Health.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    data: {
      newHealth,
    },
  });
});

exports.deleteHealthCare = catchAsync(async (req, res, next) => {
  await Health.findByIdAndDelete(req.params.id);
  console.log(req.body);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
