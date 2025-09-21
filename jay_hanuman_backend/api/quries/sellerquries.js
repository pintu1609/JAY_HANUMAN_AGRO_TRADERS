exports.search = (filter, pagination) => {
  const { page = 1, limit = 10 } = pagination; // default pagination values
  const skip = (page - 1) * limit;
  const baseQuery = [
    {
      $match: {
        ...filter,
      },
    },
  ];

  const dataQuery = [
    ...baseQuery,
    {
      $lookup: {
        from: "sellerpayments", // The target collection
        localField: "_id", // The field from the current collection
        foreignField: "sellerId", // The field from the target collection
        pipeline: [
          {
            $sort: {
              createdAt: -1, // Sort based on createdAt field
            },
          },
          {
            $project: {
              _id: 1,
              sellerId: 1,
              amount: 1,
              date: 1,
              paymentType: 1,
              chequeNumber:1,
              fromAccount: 1,
              toAccount: 1,
            },
          },
        ],
        as: "payments", // array of payments
      },
    },
    // for broker details
    { $unwind: { path: "$packages", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "brokers", // broker collection
        localField: "packages.broker",
        foreignField: "_id",
         pipeline: [
          {
            $project: {
              _id: 1,
              name: 1,
            },
          },
        ],
        as: "brokerDetails",
      },
    },
    { $unwind: { path: "$brokerDetails", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        "packages.broker": "$brokerDetails",
      },
    },

    // 🔹 Group back to keep packages array intact
    {
      $group: {
        _id: "$_id",
        // name: { $first: "$name" },
        // address: { $first: "$address" },
        name: { $first: { $ifNull: ["$name", "-"] } },
address: { $first: { $ifNull: ["$address", "-"] } },
        totalAmount: { $first: "$totalAmount" },
        commisionAmount: { $first: "$commisionAmount" },
        weightCost: { $first: "$weightCost" },
        payments: { $first: "$payments" },
        packages: { $push: "$packages" },
        createdAt: { $first: "$createdAt" },
      },
    },

    {
      $project: {
        name: 1,
        address: 1,
        totalAmount: 1,
        commisionAmount: 1, // Corrected field name
        weightCost: 1,
        packages: 1,
        payments: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ];
  const paginatedQuery = [
    {
      $facet: {
        data: [...dataQuery, { $skip: skip }, { $limit: limit }],
        totalCount: [{ $count: "count" }],
      },
    },
  ];

  return paginatedQuery;
};
