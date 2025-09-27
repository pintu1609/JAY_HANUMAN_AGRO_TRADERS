exports.searchsellergoods = (filter, pagination) => {
  const { page, limit } = pagination || {}; // don’t default here
  const skip = page && limit ? (page - 1) * limit : 0;

  const baseQuery = [
    {
      $match: {
        ...filter,
      },
    },
  ];

  const dataQuery = [
    ...baseQuery,

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
      },
    },
    { $sort: { createdAt: -1 } },
  ];
  //   const paginatedQuery = [
  //     {
  //       $facet: {
  //         data: [...dataQuery, { $skip: skip }, { $limit: limit }],
  //         totalCount: [{ $count: "count" }],
  //       },
  //     },
  //   ];

  if (page && limit) {
    return [
      {
        $facet: {
          data: [...dataQuery, { $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ];
  }

  return dataQuery;
};
