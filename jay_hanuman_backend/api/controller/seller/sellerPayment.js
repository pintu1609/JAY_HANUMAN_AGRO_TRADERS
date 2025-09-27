const { useErrorHandler } = require("../../middleware/error-handler");
const {
  clientHandler,
  responseHandler,
} = require("../../middleware/response-handler");
const service = require("../../service/seller/sellerPayment");

exports.createSellerPayment = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const result = await service.createPayment(body);
    if (result.status !== 200) {
      return clientHandler({}, res, result.message, result.status);
    }
    return responseHandler(result.data, res, result.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);

    next(err);
  }
};

exports.updateSellerPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;

    const result = await service.updatePayment(body, id);
    if (result.status !== 200) {
      return clientHandler({}, res, result.message, result.status);
    }
    return responseHandler(result.data, res, result.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.deleteSellerPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.deletePayment(id);
    if (result.status !== 200) {
      return clientHandler({}, res, result.message, result.status);
    }
    return responseHandler(result.data, res, result.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};
