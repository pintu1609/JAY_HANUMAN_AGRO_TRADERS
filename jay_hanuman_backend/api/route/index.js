const express = require("express");
const app = express();


const registerUser = require("./auth/register");

app.use("/register", registerUser);

module.exports = app;