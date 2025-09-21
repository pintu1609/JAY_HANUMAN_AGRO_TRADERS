const service = require("../../service/client/clientdetails");
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { useErrorHandler } = require("../../middleware/error-handler");
const e = require("express");

exports.addClient= async (req, res, next)=>{
    try {
        const body=req.body
        const userId = req.user.id;
        console.log("🚀 ~ userId:", userId)
        
        body.userId=userId;
        console.log("🚀 ~ body:", body)
        
    const clientdetail= await service.createClient(body)

   if (clientdetail.status === 400) {
      return clientHandler({}, res, clientdetail.message, clientdetail.status);
    }
    responseHandler(clientdetail.data, res, clientdetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};


exports.geAllclientdetails= async (req, res, next)=>{
    try {
       
    const clientdetail= await service.getAllClient()

   if (clientdetail.status === 400) {
      return clientHandler({}, res, clientdetail.message, clientdetail.status);
    }
    responseHandler(clientdetail.data, res, clientdetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.updateClient= async (req, res, next)=>{
    try {
        const body=req.body
        const userId=req.user.id;
        body.userId=userId;
        const id=req.params.id;
    const clientdetail= await service.updateClientDetails(id,body)

   if (clientdetail.status != 200) {
      return clientHandler({}, res, clientdetail.message, 400);
    }
    responseHandler(clientdetail.data, res, clientdetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.getClientById= async (req, res, next)=>{
    try {
        const id=req.params.id;
    const clientdetail= await service.getClientById(id)

   if (clientdetail.status != 200) {
      return clientHandler({}, res, clientdetail.message, 400);
    }
    responseHandler(clientdetail.data, res, clientdetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
   }

exports.deleteClient= async (req, res, next)=>{
    try {
        const id=req.params.id;
    const clientdetail= await service.deleteClient(id)

   if (clientdetail.status != 200) {
      return clientHandler(clientdetail?.data, res, clientdetail.message, 400);
    }
    responseHandler(clientdetail.data, res, clientdetail.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};
