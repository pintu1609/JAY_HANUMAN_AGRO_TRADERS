const router = require('express').Router()

const {createClientPayment,updateClientGoodsPayment,getClientGoodsPayment,deleteClientGoodsPayment}= require('../../controller/ClientBuyerGoods/clientgoodspayment')

const ClientGoodPaymentValidation=require("../../validation/ClientBuyerGoods/clientgoodspayment"); // Validation Schema
const  validate  = require("../../middleware/validate");
const { verifyToken, authorizeRole } = require("../../middleware/authroization");
const clientGoodsPaymentValidation = require('../../validation/ClientBuyerGoods/clientgoodspayment');

router
  .route("/")
  .post(verifyToken, authorizeRole("Admin","User"), validate(clientGoodsPaymentValidation.clientGoodsPaymentSchema), createClientPayment);
router
  .route("/getAllClientGoodsPayment/:id")
  .get(verifyToken,authorizeRole("Admin","User"), getClientGoodsPayment);   
  
router
  .route("/:id")
  .put(verifyToken, authorizeRole("Admin"), validate(ClientGoodPaymentValidation.clientGoodsPaymentSchema), updateClientGoodsPayment);   
  
router
  .route("/:id")
  .delete(verifyToken, authorizeRole("Admin"), deleteClientGoodsPayment);

  module.exports = router