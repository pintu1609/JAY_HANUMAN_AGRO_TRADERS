const router = require("express").Router();
const {addClientBuyerGoods,deleteClientBuyerGoods,getClientBuyerGoods,updateClientBuyerGoods} = require("../../controller/ClientBuyerGoods/ClientBuyerGoods")

const ClientBuyerGoodValidation=require("../../validation/ClientBuyerGoods/ClientBuyerGoods"); // Validation Schema
const  validate  = require("../../middleware/validate");
const { verifyToken, authorizeRole } = require("../../middleware/authroization")

router
  .route("/")
  .post(verifyToken, authorizeRole("Admin","User"), validate(ClientBuyerGoodValidation.ClientBuyerGoodsSchema), addClientBuyerGoods);
router
  .route("/getAllClientBuyerGood")
  .get(verifyToken,authorizeRole("Admin","User"), getClientBuyerGoods );   
  
router
  .route("/:id")
  .put(verifyToken, authorizeRole("Admin"), validate(ClientBuyerGoodValidation.ClientBuyerGoodsSchema), updateClientBuyerGoods);   
  
router
  .route("/:id")
  .delete(verifyToken, authorizeRole("Admin"), deleteClientBuyerGoods);

  module.exports = router