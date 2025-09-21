const router = require("express").Router();
const {createSellerPayment,updateSellerPayment,deleteSellerPayment} = require("../../controller/seller/sellerPayment")

const SellerPaymentValidation=require("../../validation/seller/sellerPayment"); // Validation Schema
const  validate  = require("../../middleware/validate");
const { verifyToken, authorizeRole } = require("../../middleware/authroization")

router
    .route("/")
    .post(verifyToken, authorizeRole("Admin","User"), validate(SellerPaymentValidation.sellerPaymentValidation), createSellerPayment);
 
 
router
    .route("/:id")
    .put(verifyToken, authorizeRole("Admin","User"), validate(SellerPaymentValidation.sellerPaymentValidation), updateSellerPayment);

router
    .route("/:id")
    .delete(verifyToken, authorizeRole("Admin"), deleteSellerPayment);

module.exports = router