const router = require("express").Router();
const { wareHouse } = require("../../controller/seller/warehouse");

const {
  verifyToken,
  authorizeRole,
} = require("../../middleware/authroization");

router
  .route("/wareHouseDetails")
  .get(verifyToken, authorizeRole("Admin", "User"), wareHouse);

module.exports = router;
