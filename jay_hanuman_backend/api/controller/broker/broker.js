const { useErrorHandler } = require("../../middleware/error-handler");
const {
  clientHandler,
  responseHandler,
} = require("../../middleware/response-handler");
const service = require("../../service/broker/broker");
exports.createBroker = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const user = await service.createBroker(body);
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

exports.updateBroker = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const user = await service.updateBroker(body, req.params.id);
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

exports.getAllBroker = async (req, res, next) => {
  try {
    const user = await service.getAllBroker();
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

exports.getBrokerById = async (req, res, next) => {
  try {
    const user = await service.getBrokerById(req.params.id);
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

exports.deleteBroker = async (req, res, next) => {
  try {
    const user = await service.deleteBroker(req.params.id);
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
