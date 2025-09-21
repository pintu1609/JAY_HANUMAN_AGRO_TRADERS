const mongoose = require("mongoose");

exports.searchBrokerPayment = (filter, pagination, brokerId) => {
  console.log("🚀 ~ filter:", filter)
  console.log("🚀 ~ brokerId:", brokerId)
  const { page = 1, limit = 10 } = pagination; // default pagination values
  const skip = (page - 1) * limit;

  const objectBrokerId = new mongoose.Types.ObjectId(brokerId);

  const pipeline = [
    {
      $match: {
        ...filter,
        brokerId: objectBrokerId,
      },
    },
    {
      $project: {
        _id: 1,
        brokerId: 1,
        amount: 1,
        date: 1,
        paymentType: 1,
        chequeNumber: 1,
        fromAccount: 1,
        toAccount: 1,
      },
    },
    {
      $sort: { date: -1 }, // sort newest first
    },
  ];

  const paginatedQuery = [
    {
      $facet: {
        data: [...pipeline, { $skip: skip }, { $limit: limit }],
        totalCount: [...pipeline, { $count: "count" }],
      },
    },
  ];

  return paginatedQuery;
};
