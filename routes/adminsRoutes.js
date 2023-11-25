const express = require("express");
const adminsController = require("../controllers/adminsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, adminsController.getAllAdmins)
  .post(adminsController.createAdmin);

router.route("/:id").patch(adminsController.updateAdmin);

module.exports = router;
