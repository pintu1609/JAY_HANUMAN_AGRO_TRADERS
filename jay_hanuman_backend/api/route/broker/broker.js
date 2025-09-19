const router = require("express").Router();
const {createBroker,updateBroker,getAllBroker,getBrokerById,deleteBroker} = require("../../controller/broker/broker")

const BrokerValidation=require("../../validation/broker/broker"); // Validation Schema
const  validate  = require("../../middleware/validate");
const { verifyToken, authorizeRole } = require("../../middleware/authroization")

router
  .route("/")
  .post(verifyToken, authorizeRole("Admin"), validate(BrokerValidation.brokerSchema), createBroker);
router

router.route("/getAllBroker")
  .get(verifyToken,authorizeRole("Admin"), getAllBroker);   
  
router
  .route("/getBrokerById/:id")
  .get(verifyToken, authorizeRole("Admin"), getBrokerById);   
  
router
  .route("/:id")
  .put(verifyToken, authorizeRole("Admin"), validate(BrokerValidation.brokerSchema), updateBroker);   
  
router
  .route("/:id")
  .delete(verifyToken, authorizeRole("Admin"), deleteBroker);

module.exports = router