const axios = require("axios");
const Health = require("../models/healthModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./dev-data/pdfUploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.getAllHealthCares = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  //   const features = new APIFeatures(Health.find(), req.query)
  //     .filter()
  //     .sort()
  //     .limitFields()
  //     .paginate();
  //   const health = await features.query;

  //   res.status(200).json({
  //     status: "success",
  //     results: health.length,
  //     data: {
  //       health,
  //     },
  //   });
  // }
  const apiUrl =
    "https://www.communitybenefitinsight.org/api/get_hospitals.php";
  const response = await axios.get(apiUrl);

  // Assuming the data you want to send is in response.data
  const hospitalsData = response.data;

  // Process the data if needed

  // Send the data as the response
  res.status(200).json(hospitalsData);
});

exports.getHealthCare = catchAsync(async (req, res, next) => {
  const health = await Health.findById(req.params.id);

  if (!health) {
    return next(new AppError("No healthcare with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    results: health.length,
    data: {
      health,
    },
  });
});

// Updating create function to be able to accept files
exports.createHealthCare =
  // upload.single(file),
  catchAsync(async (req, res, next) => {
    const newHealth = await Health.create(req.body);
    // const documents = req.file.documents;

    res.status(201).json({
      status: "success",
      health: newHealth,
    });
  });

exports.updateHealthCare = catchAsync(async (req, res, next) => {
  const health = await Health.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!health) {
    return next(new AppError("No healthcare with that ID", 404));
  }

  res.status(200).json({
    data: {
      health,
    },
  });
});

exports.deleteHealthCare = catchAsync(async (req, res, next) => {
  const health = await Health.findByIdAndDelete(req.params.id);

  if (!health) {
    return next(new AppError("No healthcare with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
