const express = require("express");
const app = express();


const registerUser = require("./auth/register");
const broker=require("./broker/broker")

app.use("/register", registerUser);
app.use("/broker",broker)

module.exports = app;