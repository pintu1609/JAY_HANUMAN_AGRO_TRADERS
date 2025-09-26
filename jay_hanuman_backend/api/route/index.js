const express = require("express");
const app = express();


const registerUser = require("./auth/register");
const broker=require("./broker/broker")
const seller=require("./seller/seller")
const sellerPayment=require("./seller/sellerPayment")
const brokerPayment=require("./broker/brokerPayment")
const year=require("./yeardetails/yeardetails")
const CompanyDetails = require("./companydetail/companydetails");
const client = require("./client/clientdetails");
const wareHouse=require("./seller/warehouse")
const clientGood=require("./ClientBuyerGoods/ClientBuyerGoods")
const clientGoodPayment=require('./ClientBuyerGoods/clientgoodspayment')


app.use("/register", registerUser);
app.use("/broker",broker)
app.use("/seller",seller)
app.use("/sellerPayment",sellerPayment)
app.use("/brokerPayment",brokerPayment)
app.use("/year", year)
app.use("/companydetails", CompanyDetails);
app.use("/clientdetails",client)
app.use("/wareHouseDetails",wareHouse)
app.use("/clientGood",clientGood)
app.use("/clientGoodsPayment",clientGoodPayment)

module.exports = app;