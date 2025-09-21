const router = require("express").Router();
const {createSellerGood,getAllSellerGood,getSellerGoodById,updateSellerGood,deleteSellerGood, sellerDetailsByBrokerId} = require("../../controller/seller/seller")

const SellerValidation=require("../../validation/seller/seller"); 
const  validate  = require("../../middleware/validate");
const { verifyToken, authorizeRole } = require("../../middleware/authroization")

router
    .route("/")
    .post(verifyToken, authorizeRole("Admin","User"), validate(SellerValidation.sellerSchema), createSellerGood);
router
    .route("/getAllSellerGood")
    .get(verifyToken, authorizeRole("Admin","User"), getAllSellerGood);

router
    .route("/getSellerGoodById/:id")
    .get(verifyToken, authorizeRole("Admin","User"), getSellerGoodById); 
 
router
    .route("/:id")
    .put(verifyToken, authorizeRole("Admin"), validate(SellerValidation.sellerSchema), updateSellerGood);

router
    .route("/:id")
    .delete(verifyToken, authorizeRole("Admin"), deleteSellerGood);

router
    .route("/getSellerDetailsByBrokerId/:id")
    .get(verifyToken, authorizeRole("Admin","User"), sellerDetailsByBrokerId);



module.exports = router

