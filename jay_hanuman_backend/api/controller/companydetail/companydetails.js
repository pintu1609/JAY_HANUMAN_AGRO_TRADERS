const service = require("../../service/companydetail/companydetails")
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { useErrorHandler } = require("../../middleware/error-handler");
const e = require("express");

exports.addCompany= async (req, res, next)=>{
    try {
        const body=req.body
        const userId=req.user.id;
        body.userId=userId;
    const companydetail= await service.createCompany(body)

   if (companydetail.status === 400) {
      return clientHandler({}, res, companydetail.message, companydetail.status);
    }
    responseHandler(companydetail.data, res, companydetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};


exports.getCompany= async (req, res, next)=>{
    try {
       
    const companydetail= await service.getCompany()

   if (companydetail.status === 400) {
      return clientHandler({}, res, companydetail.message, companydetail.status);
    }
    responseHandler(companydetail.data, res, companydetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.updateCompany= async (req, res, next)=>{
    try {
        const body=req.body
        const userId=req.user.id;
        body.userId=userId;
        const id=req.params.id;
    const companydetail= await service.updateCompanyDetails(id,body)

   if (companydetail.status != 200) {
      return clientHandler({}, res, companydetail.message, 400);
    }
    responseHandler(companydetail.data, res, companydetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.getCompanyById= async (req, res, next)=>{
    try {
        const id=req.params.id;
    const companydetail= await service.getCompanyById(id)

   if (companydetail.status != 200) {
      return clientHandler({}, res, companydetail.message, 400);
    }
    responseHandler(companydetail.data, res, companydetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
   }

exports.deleteCompany= async (req, res, next)=>{
    try {
        const id=req.params.id;
    const companydetail= await service.deleteCompany(id)

   if (companydetail.status != 200) {
      return clientHandler({}, res, companydetail.message, 400);
    }
    responseHandler(companydetail.data, res, companydetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};
