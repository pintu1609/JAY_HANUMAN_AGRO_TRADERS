const router = require("express").Router();
const {addCompany,updateCompany,getCompany,deleteCompany,getCompanyById} = require("../../controller/companydetail/companydetails")

const CompanyValidation=require("../../validation/companydetail/companydetails"); 
const  validate  = require("../../middleware/validate");
const { verifyToken, authorizeRole } = require("../../middleware/authroization")

router
    .route("/")
    .post(verifyToken, authorizeRole("Admin","User"),validate(CompanyValidation.companyDetailsValidation), addCompany);

    router
    .route("/getCompany")
    .get(verifyToken,authorizeRole("Admin","User"), getCompany);   

    router
    .route("/getCompanyById/:id")
    .get(verifyToken, authorizeRole("Admin","User"), getCompanyById);
  
    router
    .route("/:id")
    .put(verifyToken, authorizeRole("Admin"), validate(CompanyValidation.companyDetailsValidation), updateCompany);   
  
    router
    .route("/:id")
    .delete(verifyToken, authorizeRole("Admin"), deleteCompany);


    module.exports =router