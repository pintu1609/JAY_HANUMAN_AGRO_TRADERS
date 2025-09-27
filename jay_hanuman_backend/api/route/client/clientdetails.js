const router = require("express").Router();
const {
  addClient,
  getClientById,
  geAllclientdetails,
  updateClient,
  deleteClient,
} = require("../../controller/client/clientdetails");

const clientValidation = require("../../validation/client/clientDetails");
const validate = require("../../middleware/validate");
const {
  verifyToken,
  authorizeRole,
} = require("../../middleware/authroization");

router
  .route("/")
  .post(
    verifyToken,
    authorizeRole("Admin", "User"),
    validate(clientValidation.clientSchema),
    addClient
  );

router
  .route("/getClient")
  .get(verifyToken, authorizeRole("Admin", "User"), geAllclientdetails);

router
  .route("/getClientById/:id")
  .get(verifyToken, authorizeRole("Admin", "User"), getClientById);

router
  .route("/:id")
  .put(
    verifyToken,
    authorizeRole("Admin"),
    validate(clientValidation.clientSchema),
    updateClient
  );

router.route("/:id").delete(verifyToken, authorizeRole("Admin"), deleteClient);

module.exports = router;
