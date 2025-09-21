const mongoose = require("mongoose");
exports.searchSeller = (filter, pagination,brokerId) => {
  const { page = 1, limit = 10 } = pagination; // default pagination values
  const skip = (page - 1) * limit;
  
    const objectBrokerId = new mongoose.Types.ObjectId(brokerId);

// const year = 2025;

const pipeline = [
  { $unwind: "$packages" },
  {
    $match: {
      ...filter,
      "packages.broker": objectBrokerId
      // "packages.date": {
      //   $gte: new Date(`${year}-01-01T00:00:00Z`),
      //   $lte: new Date(`${year}-12-31T23:59:59Z`)
      // }
    }
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
          date: "$packages.date"
        }
      }
    }
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
        { $count: "count" } // count **after grouping**
      ],
      },
    },
  ];

  return paginatedQuery;
};
