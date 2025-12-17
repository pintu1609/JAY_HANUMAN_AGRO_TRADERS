const router = require("express").Router();
const {
  register,
  login,
  allUser,
  UserById,
  updateUser,
  deleteUser,
} = require("../../controller/user/user");

const userValidator = require("../../validation/user/user"); // Validation Schema
const validate = require("../../middleware/validate");
const {
  verifyToken,
  authorizeRole,
} = require("../../middleware/authroization");

router
  .route("/")
  .post(
    verifyToken,
    authorizeRole("User", "Admin"),
    validate(userValidator.registerSchema),
    register
  );
router.route("/login").post(validate(userValidator.loginSchema), login);
router.route("/getAllUser").get(verifyToken, allUser);

router.route("/getUserById/:id").get(verifyToken, UserById);

router
  .route("/:id")
  .put(
    verifyToken,
    authorizeRole("Admin"),
    validate(userValidator.updateUserSchema),
    updateUser
  );

router.route("/:id").delete(verifyToken, authorizeRole("Admin"), deleteUser);

module.exports = router;
