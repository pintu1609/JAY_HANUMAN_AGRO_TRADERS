const service = require("../../service/seller/seller");
const {
  responseHandler,
  clientHandler,
} = require("../../middleware/response-handler");
const { useErrorHandler } = require("../../middleware/error-handler");
const { search } = require("../../quries/sellerquries");
const { searchSeller } = require("../../quries/brokerquries");
const { searchBrokerPayment } = require("../../quries/quriespayment");

exports.createSellerGood = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const user = await service.createSeller(body);
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

exports.getAllSellerGood = async (req, res, next) => {
  try {
    // const filter=req.query;
    // const pagination=req.query
    const { page = 1, limit = 10,year } = req.query;

    const filter = {}; // Add any filters from req.query if needed
    const pagination = { page: parseInt(page), limit: parseInt(limit) };

    if (year) {
      const start = new Date(`${year}-01-01`);
      const end = new Date(`${year}-12-31T23:59:59`);
      filter["packages.date"] = { $gte: start, $lte: end }; 
      // ✅ FIXED
    }

    // Get aggregation pipeline
    const pipeline = search(filter, pagination);

    const user = await service.getAllSeller(pipeline);
    if (user.status === 400) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler({ data: user.data }, res, user.message, 200);
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.getSellerGoodById = async (req, res, next) => {
  try {
    const user = await service.getSellerById(req.params.id);
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

exports.updateSellerGood = async (req, res, next) => {
  try {
    const body = req.body;
    const userId = req.user.id;
    body.userId = userId;
    const user = await service.updateSeller(body, req.params.id);
    if (user.status === 400) {
      return clientHandler({}, res, user.message, user.status);
    }
    responseHandler(user.data, res, user.message, 200);
  } catch (error) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};

exports.deleteSellerGood = async (req, res, next) => {
  try {
    const user = await service.deleteSeller(req.params.id);
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

exports.sellerDetailsByBrokerId = async (req, res, next) => {
  try {
    const brockerId = req.params.id;

    const { year } = req.query;

    const filter = {};
    if (year) {
      // restrict to year range
      filter["packages.date"] = {
        $gte: new Date(`${year}-01-01T00:00:00Z`),
        $lte: new Date(`${year}-12-31T23:59:59Z`),
      };
    }

    const filterPayment = {};
    if (year) {
      // restrict to year range
      filterPayment["date"] = {
        $gte: new Date(`${year}-01-01T00:00:00Z`),
        $lte: new Date(`${year}-12-31T23:59:59Z`),
      };
    }


    const pagination = {};
    const quries = await searchSeller(filter, pagination, brockerId);
    const quriespayment = await searchBrokerPayment(filterPayment, pagination, brockerId);

    const sellerDetails = await service.sellerDetailsByBrokerId(
      quries,
      quriespayment,
      brockerId
    );
    if (sellerDetails.status != 200) {
      return clientHandler(
        {},
        res,
        sellerDetails.message,
        sellerDetails.status
      );
    }
    responseHandler(
      { data: sellerDetails.data, payment:sellerDetails.brokerPayments ,totalCount: sellerDetails.totalCount, },
      res,
      sellerDetails.message,
      200
    );
  } catch (err) {
    console.error(err);
    useErrorHandler(err, req, res, next);
    next(err);
  }
};
