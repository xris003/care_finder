const express = require("express");
const userController = require("./../controllers/userController");
const authUserController = require("./../controllers/authUserController");

const router = express.Router();

router.param("id", (req, res, next, val) => {
  console.log(`HC id is: ${val}`);
  next();
});

router.post("/signup", authUserController.signup);
router.post("/login", authUserController.login);
router.patch(
  "/updatePassword",
  authUserController.protect,
  authUserController.updatePassword
);

router.route("/").get(authUserController.protect, userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
