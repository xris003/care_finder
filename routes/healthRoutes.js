const express = require("express");
const healthController = require("../controllers/healthController");
const authController = require("../controllers/authController");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  console.log(`HC id is: ${val}`);
  next();
});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

router
  .route("/")
  .get(healthController.getAllHealthCares)
  .post(healthController.createHealthCare);

router
  .route("/:id")
  .get(healthController.getHealthCare)
  .patch(healthController.updateHealthCare)
  .delete(healthController.deleteHealthCare);

module.exports = router;
