const router = require("express").Router();

const {
  createBroker,
  updateBroker,
  getAllBroker,
  getBrokerById,
  deleteBroker,
} = require("../../controller/broker/broker");

const { brokerSchema } = require("../../validation/broker/broker");
const validate = require("../../middleware/validate");
const {
  verifyToken,
  authorizeRole,
} = require("../../middleware/authroization");

router.post(
  "/",
  verifyToken,
  authorizeRole("Admin"),
  validate(brokerSchema),
  createBroker
);

router.get(
  "/getAllBroker",
  verifyToken,
  authorizeRole("Admin"),
  getAllBroker
);

router.get(
  "/getBrokerById/:id",
  verifyToken,
  authorizeRole("Admin"),
  getBrokerById
);

router.put(
  "/:id",
  verifyToken,
  authorizeRole("Admin"),
  validate(brokerSchema),
  updateBroker
);

router.delete(
  "/:id",
  verifyToken,
  authorizeRole("Admin"),
  deleteBroker
);

module.exports = router;
