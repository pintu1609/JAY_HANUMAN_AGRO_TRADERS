const router = require("express").Router();
const {
  addYear,
  deleteYear,
  getAllYear,
} = require("../../controller/yeardetails/yeardetails");

const {
  verifyToken,
  authorizeRole,
} = require("../../middleware/authroization");

router.route("/").post(verifyToken, authorizeRole("Admin"), addYear);
router.route("/:id").delete(verifyToken, authorizeRole("Admin"), deleteYear);

router
  .route("/getAllYear")
  .get(verifyToken, authorizeRole("Admin", "User"), getAllYear);

module.exports = router;
