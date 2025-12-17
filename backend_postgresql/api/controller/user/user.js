const service = require('../../service/user/user');
const { responseHandler, clientHandler } = require('../../middleware/response-handler');

exports.register = async (req, res) => {
  const result = await service.registerUser(req.body);
  if (result.status !== 200)
    return clientHandler({}, res, result.message, result.status);
  responseHandler(result.data, res, result.message, 200);
};

exports.login = async (req, res) => {
  const result = await service.loginUser(req.body);
  if (result.status !== 200)
    return clientHandler({}, res, result.message, result.status);
  responseHandler(result.data, res, result.message, 200);
};

exports.allUser = async (_, res) => {
  const result = await service.getAllUser();
  responseHandler(result.data, res, result.message, 200);
};

exports.UserById = async (req, res) => {
  const result = await service.getUserById(req.params.id);
  responseHandler(result.data, res, result.message, result.status);
};

exports.updateUser = async (req, res) => {
  const result = await service.updateUser(req.params.id, req.body);
  responseHandler(result.data, res, result.message, result.status);
};

exports.deleteUser = async (req, res) => {
  const result = await service.deleteUser(req.params.id);
  responseHandler(result.data, res, result.message, result.status);
};
