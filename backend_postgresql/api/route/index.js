const express = require("express");
const app = express();


const registerUser = require("./user/user");
const broker=require("./broker/broker")

app.use("/register", registerUser);
app.use("/broker",broker)


module.exports = app;