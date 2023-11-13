const fs = require("fs");
const Health = require("./../models/healthcareModel");
const APIFeatures = require("./../utils/apiFeatures");
// const healthcare = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/clinics.json`)
// );
exports.getAllHealthCares = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getHealthCare = async (req, res) => {
  const health = await Health.findById(req.params.id);

  res.status(200).json({
    status: "success",
    results: health.length,
    data: {
      health,
    },
  });
};

exports.createHealthCare = async (req, res) => {
  try {
    const newHealth = await Health.create(req.body);

    res.status(201).json({
      status: "success",
      health: newHealth,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateHealthCare = async (req, res) => {
  const newHealth = await Health.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    data: {
      newHealth,
    },
  });
};

exports.deleteHealthCare = async (req, res) => {
  await Health.findByIdAndDelete(req.params.id);
  console.log(req.body);
  res.status(204).json({
    status: "success",
    data: null,
  });
};
