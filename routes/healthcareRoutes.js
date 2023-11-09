const express = require("express");
const healthcareController = require("./../controllers/healthcareController");

const router = express.Router();

router
  .route("/")
  .get(healthcareController.getAllHealthCares)
  .post(healthcareController.createHealthCare);

router
  .route("/:id")
  .get(healthcareController.getHealthCare)
  .patch(healthcareController.updateHealthCare)
  .delete(healthcareController.deleteHealthCare);

module.exports = router;
