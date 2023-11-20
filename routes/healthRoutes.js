const express = require("express");
const healthcareController = require("../controllers/healthController");
const authController = require("../controllers/authController");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  console.log(`HC id is: ${val}`);
  next();
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);

router
  .route("/")
  .get(authController.protect, healthcareController.getAllHealthCares)
  .post(healthcareController.createHealthCare);

router
  .route("/:id")
  .get(healthcareController.getHealthCare)
  .patch(healthcareController.updateHealthCare)
  .delete(healthcareController.deleteHealthCare);

module.exports = router;