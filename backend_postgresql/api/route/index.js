const express = require("express");
const app = express();


const registerUser = require("./user/user");

app.use("/register", registerUser);

module.exports = app;