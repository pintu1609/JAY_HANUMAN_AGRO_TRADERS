const mongoose = require("mongoose");
exports.searchSeller = (filter, pagination, brokerId) => {
  const { page = 1, limit = 10 } = pagination; // default pagination values
  const skip = (page - 1) * limit;

  const objectBrokerId = new mongoose.Types.ObjectId(brokerId);

  const pipeline = [
    { $unwind: "$packages" },
    {
      $match: {
        ...filter,
        "packages.broker": objectBrokerId,
      },
    },
    {
      $group: {
        _id: "$_id",
        sellerName: { $first: "$name" },
        sellerAddress: { $first: "$address" },
        packages: {
          $push: {
            package: "$packages.package",
            weight: "$packages.weight",
            rate: "$packages.rate",
            amount: "$packages.amount",
            commision: "$packages.commision",
            date: "$packages.date",
          },
        },
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
        totalCount: [
          ...pipeline,
          { $count: "count" }, // count **after grouping**
        ],
      },
    },
  ];

  return paginatedQuery;
};
