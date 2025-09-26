const mongoose = require("mongoose");
exports.searchWareHouseGoods = (filter, pagination) => {
  const { page = 1, limit = 10 } = pagination; // default pagination values
  const skip = (page - 1) * limit;
  
    // const objectBrokerId = new mongoose.Types.ObjectId(brokerId);

// const year = 2025;

const pipeline = [
  { $unwind: "$packages" },
  {
    $match: {
      ...filter,
      "packages.wareHouse": true
    //   "packages.date": {
    //     $gte: new Date(`${year}-01-01T00:00:00Z`),
    //     $lte: new Date(`${year}-12-31T23:59:59Z`)
    //   }
    }
  },
  {
    $group: {
      _id: "$_id",
     sellerName: { $first: { $ifNull: ["$name", "-"] } }, // default to "-"
      sellerAddress: { $first: { $ifNull: ["$address", "-"] } }, // default to "-"
      packages: {
        $push: {
            _id:"$packages._id",
          package: "$packages.package",
          weight: "$packages.weight",
          rate: "$packages.rate",
          amount: "$packages.amount",
          commision: "$packages.commision",
          date: "$packages.date",
          wareHouse:"$packages.wareHouse"
        }
      }
    }
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
        { $count: "count" } // count **after grouping**
      ],
      },
    },
  ];

  return paginatedQuery;
};
