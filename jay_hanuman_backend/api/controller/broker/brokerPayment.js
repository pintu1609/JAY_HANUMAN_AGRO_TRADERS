const { useErrorHandler } = require("../../middleware/error-handler");
const { clientHandler, responseHandler } = require("../../middleware/response-handler");
const service = require("../../service/broker/brokerPayment");

exports.createBrokerPayment = async (req, res, next) => {
  try {
   const body=req.body;
        const userId=req.user.id;
        body.userId=userId;
    const result = await service.createPayment(body);
        console.log("🚀 ~ result:", result)

    if(result.status!==200){
    return clientHandler({},res,result.message,result.status);
    }
    return responseHandler(result.data,res,result.message,200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    
    next(err);
  }
};

exports.updateBrokerPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body=req.body;
    const userId=req.user.id;
    body.userId=userId;

    const result = await service.updatePayment(body,id);
    if(result.status!==200){
    return clientHandler({},res,result.message,result.status);
    }
    return responseHandler(result.data,res,result.message,200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};
    
exports.deleteBrokerPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.deletePayment(id);
    if(result.status!==200){
    return clientHandler({},res,result.message,result.status);
    }
    return responseHandler(result.data,res,result.message,200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};
