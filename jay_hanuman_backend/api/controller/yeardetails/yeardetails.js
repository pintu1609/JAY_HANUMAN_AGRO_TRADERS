const service = require("../../service/yeardetails/yeardetails");
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { useErrorHandler } = require("../../middleware/error-handler");

exports.addYear = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const year = await service.createYear(userId);

    if (year.status === 400) {
      return clientHandler({}, res, year.message, year.status);
    }
    responseHandler(year.data, res, year.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.deleteYear = async (req, res, next) => {
  try {
    const id = req.params.id;
    const year = await service.deleteYear(id);

    if (year.status != 200) {
      return clientHandler({}, res, year.message, 400);
    }
    responseHandler(year.data, res, year.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.getAllYear = async (req, res, next) => {
  try {
    const year = await service.getAllYear();

    if (year.status === 400) {
      return clientHandler({}, res, year.message, year.status);
    }
    responseHandler(year.data, res, year.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};
