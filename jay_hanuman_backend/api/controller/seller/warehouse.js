const { useErrorHandler } = require("../../middleware/error-handler");
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { searchWareHouseGoods } = require("../../quries/warehousequries");
const service = require("../../service/seller/warehouse");

exports.wareHouse = async (req, res, next) => {
  try {
    const year = req.query.year;
    const filter = {};
    if (year) {
      const start = new Date(`${year}-01-01`);
      const end = new Date(`${year}-12-31T23:59:59`);
      filter["packages.date"] = { $gte: start, $lte: end };
      // ✅ FIXED
    }
    const pagination = {};

    const quries = await searchWareHouseGoods(filter, pagination);
    const wareHouse = await service.getWareHouse(quries);
    if (wareHouse.status === 400) {
      return clientHandler({}, res, wareHouse.message, user.status);
    }
    responseHandler(wareHouse.data, res, wareHouse.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};
