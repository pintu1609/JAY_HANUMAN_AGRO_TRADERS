const router = require("express").Router();
const {register, login,allUser,UserById,updateUser,deleteUser } = require("../../controller/auth/register");


const userValidator = require("../../validation/auth/register"); // Validation Schema
const  validate  = require("../../middleware/validate");
const { verifyToken, authorizeRole } = require("../../middleware/authroization");

// router
//   .route("/register")
//   .post(verifyAccessToken, authorize(['Admin']) ,validate(userValidator.addEmployee), onBoarding);

router
  .route("/")
  .post(verifyToken, authorizeRole("Admin"), validate(userValidator.registerSchema), register);
router
  .route("/login")
  .post( validate(userValidator.loginSchema), login);
router
  .route("/getAllUser")
  .get(verifyToken, allUser);   

  router
  .route("/getUserById/:id")
  .get( verifyToken, UserById);   
  
  router
  .route("/:id")
  .put( verifyToken, authorizeRole("Admin"), validate(userValidator.updateUserSchema), updateUser);   
  
  router
  .route("/:id")
  .delete(verifyToken,authorizeRole("Admin"), deleteUser);

  module.exports = router;
