const fs = require("fs");
const Health = require("./../models/healthcareModel");

// const healthcare = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/clinics.json`)
// );

exports.getAllHealthCares = async (req, res) => {
  //BUILD QUERY
  // 1) Filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 2) Advanced Filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log(JSON.parse(queryStr));

  let query = Health.find(JSON.parse(queryStr));

  // 3) SORTING
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // EXECUTE QUERY
  const health = await query;

  res.status(200).json({
    status: "success",
    results: health.length,
    data: {
      health,
    },
  });
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
