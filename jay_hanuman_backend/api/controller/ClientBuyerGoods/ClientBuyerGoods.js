const service = require("../../service/ClientBuyerGoods/ClientBuyerGoods");
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { useErrorHandler } = require("../../middleware/error-handler");  
const { searchClient } = require("../../quries/clientgoodsquries");

exports.addClientBuyerGoods = async (req, res,next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const user = await service.create(body);
    if (user.status === 400) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.getClientBuyerGoods = async (req, res, next) => {
  try {
    const {year}=req.query
    console.log("🚀 ~ year:", year)
    const filter={}
     if (year) {
      
      const start = new Date(`${year}-01-01`);
      const end = new Date(`${year}-12-31T23:59:59`);
      filter["date"] = { $gte: start, $lte: end }; 
      // ✅ FIXED
    }
    const quries= await searchClient(filter)
    const user = await service.getClientGoodsDetails(quries);
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.updateClientBuyerGoods = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const user = await service.update(req.params.id, body);
    if (user.status === 400) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.deleteClientBuyerGoods = async (req, res, next) => {
  try {
    const user = await service.delete(req.params.id);
    if (user.status === 400) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};  