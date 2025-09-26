const service = require("../../service/ClientBuyerGoods/clientgoodspayment");
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { useErrorHandler } = require("../../middleware/error-handler");  
const { searchClientPayment } = require("../../quries/clientGoodPaymentquries");
const { default: mongoose } = require("mongoose");
// const { searchClient } = require("../../quries/clientgoodsquries");
// Create Payment


exports.createClientPayment = async (req, res,next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const clientPayment = await service.create(body);
    if (clientPayment.status === 400) {
      return clientHandler({}, res, clientPayment.message, clientPayment.status);
    }
    responseHandler(clientPayment.data, res, clientPayment.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.getClientGoodsPayment = async (req, res, next) => {
  try {
    const {year}=req.query
    const clientId = req.params.id
    const filter={}
    if (year) {
        
        const start = new Date(`${year}-01-01`);
        const end = new Date(`${year}-12-31T23:59:59`);
        filter["date"] = { $gte: start, $lte: end }; 
        // ✅ FIXED
    }
    if (clientId) {
        filter.clientId = new mongoose.Types.ObjectId(clientId);
    }
    
    const quries= await searchClientPayment(filter,req.query)
    const clientGoodsPayment = await service.getClientGoodsPaymentDetails(quries);
    responseHandler(clientGoodsPayment.data, res, clientGoodsPayment.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.updateClientGoodsPayment= async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const clientPayment = await service.update(req.params.id, body);
    if (clientPayment.status === 400) {
      return clientHandler({}, res, clientPayment.message, clientPayment.status);
    }
    responseHandler(clientPayment.data, res, clientPayment.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.deleteClientGoodsPayment = async (req, res, next) => {
  try {
    const clientPayment = await service.delete(req.params.id);
    if (clientPayment.status === 400) {
      return clientHandler({}, res, clientPayment.message, clientPayment.status);
    }
    responseHandler(clientPayment.data, res, clientPayment.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};  