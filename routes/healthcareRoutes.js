const express = require("express");
const healthcareController = require("./../controllers/healthcareController");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  console.log(`HC id is: ${val}`);
  next();
});

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
