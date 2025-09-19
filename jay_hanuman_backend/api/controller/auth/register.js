const service = require("../../service/auth/register");
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { useErrorHandler } = require("../../middleware/error-handler");
exports.register = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await service.registerUser(body);
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

exports.login = async (req, res, next) => {
  try {
    const body = req.body;
    console.log("🚀 ~ body:", body)
    const user = await service.loginUser(body);

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

exports.allUser = async (req, res, next) => {
  try {
    const user = await service.getAllUser();
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.UserById = async (req, res, next) => {
  try {
    const user = await service.getUserById(req.params.id);
    if (user.status !== 200) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
}
exports.updateUser = async (req, res, next) => {
  try {
    const body = req.body;
    console.log("🚀 ~ body:", body)
    const user = await service.updateUser(req.params.id,body);
    if (user.status !== 200) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await service.deleteUser(req.params.id);
    if (user.status !== 200) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};