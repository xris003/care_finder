const fs = require("fs");
const Health = require("./../models/healthcareModel");

const healthcare = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/clinics.json`)
);

exports.getAllHealthCares = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: healthcare.length,
    data: {
      healthcare,
    },
  });
};

exports.getHealthCare = (req, res) => {
  res.status(200).json({
    status: "success",
    results: healthcare.length,
    data: {
      healthcare,
    },
  });
};

exports.createHealthCare = (req, res) => {
  console.log(req.body);
  res.send("Done");
};

exports.updateHealthCare = (req, res) => {
  res.status(200).json({
    data: {
      healthcare,
    },
  });
};

exports.deleteHealthCare = (req, res) => {
  console.log(req.body);
  res.status(200).json({
    status: "success",
    data: {
      healthcare: "<deleted healthcare here...>",
    },
  });
};
