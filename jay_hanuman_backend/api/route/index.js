const express = require("express");
const app = express();


const registerUser = require("./auth/register");
const broker=require("./broker/broker")
const seller=require("./seller/seller")
const sellerPayment=require("./seller/sellerPayment")
const brokerPayment=require("./broker/brokerPayment")


app.use("/register", registerUser);
app.use("/broker",broker)
app.use("/seller",seller)
app.use("/sellerPayment",sellerPayment)
app.use("/brokerPayment",brokerPayment)

module.exports = app;