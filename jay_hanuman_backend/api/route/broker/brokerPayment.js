const router = require("express").Router();
const {createBrokerPayment,updateBrokerPayment,deleteBrokerPayment} = require("../../controller/broker/brokerPayment")

const BrokerPaymentValidation=require("../../validation/broker/brokerPayment"); // Validation Schema
const  validate  = require("../../middleware/validate");
const { verifyToken, authorizeRole } = require("../../middleware/authroization")

router
    .route("/")
    .post(verifyToken, authorizeRole("Admin","User"), validate(BrokerPaymentValidation.brokerPaymentValidation), createBrokerPayment);
 
 
router
    .route("/:id")
    .put(verifyToken, authorizeRole("Admin","User"), validate(BrokerPaymentValidation.brokerPaymentValidation), updateBrokerPayment);

router
    .route("/:id")
    .delete(verifyToken, authorizeRole("Admin"), deleteBrokerPayment);

module.exports = router