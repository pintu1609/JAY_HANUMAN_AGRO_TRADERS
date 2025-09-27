const mongoose = require("mongoose");
exports.searchWareHouseGoods = (filter, pagination) => {
  const { page = 1, limit = 10 } = pagination; // default pagination values
  const skip = (page - 1) * limit;
  const pipeline = [
    { $unwind: "$packages" },
    {
      $match: {
        ...filter,
        "packages.wareHouse": true,
      },
    },
    {
      $group: {
        _id: "$_id",
        sellerName: { $first: { $ifNull: ["$name", "-"] } }, // default to "-"
        sellerAddress: { $first: { $ifNull: ["$address", "-"] } }, // default to "-"
        packages: {
          $push: {
            _id: "$packages._id",
            package: "$packages.package",
            weight: "$packages.weight",
            rate: "$packages.rate",
            amount: "$packages.amount",
            commision: "$packages.commision",
            date: "$packages.date",
            wareHouse: "$packages.wareHouse",
          },
        },
      },
    },
    {
      $sort: { "packages.date": -1 },
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
