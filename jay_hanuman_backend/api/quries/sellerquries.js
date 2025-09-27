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
        localField: "_id",
        foreignField: "sellerId",
        pipeline: [
          { $sort: { createdAt: -1 } },
          {
            $project: {
              _id: 1,
              sellerId: 1,
              amount: 1,
              date: 1,
              paymentType: 1,
              chequeNumber: 1,
              fromAccount: 1,
              toAccount: 1,
            },
          },
        ],
        as: "payments",
      },
    },

    // For broker details
    { $unwind: { path: "$packages", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "brokers",
        localField: "packages.broker",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 1, name: 1 } }],
        as: "brokerDetails",
      },
    },
    { $unwind: { path: "$brokerDetails", preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        "packages.broker": "$brokerDetails",
      },
    },

    // 🔹 Group back
    {
      $group: {
        _id: "$_id",
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
        commisionAmount: 1,
        weightCost: 1,
        packages: 1,
        payments: 1,
        createdAt: 1,
      },
    },
    { $sort: { createdAt: -1 } },
  ];

  // const paginatedQuery = [
  //   {
  //     $facet: {
  //       data: [...dataQuery, { $skip: skip }, { $limit: limit }],
  //      totalCount: [
  //       ...baseQuery,
  //       { $count: "count" }
  //     ],
  //       grandTotals: [
  //         ...dataQuery,
  //         {
  //           $group: {
  //             _id: null,
  //             grandTotalSeller: { $sum: "$totalAmount" },
  //             grandTotalSellerPayment: {
  //               $sum: {
  //                 $sum: {
  //                   $map: {
  //                     input: "$payments",
  //                     as: "p",
  //                     in: "$$p.amount",
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //   $project: {
  //     grandTotalSeller: 1,
  //     grandTotalSellerPayment: 1,
  //   },
  // },
  // ];

  const paginatedQuery = [
  {
    $facet: {
      data: [...dataQuery, { $skip: skip }, { $limit: limit }],
      totalCount: [...baseQuery, { $count: "count" }],
      grandTotals: [
        ...dataQuery,
        {
          $group: {
            _id: null,
            grandTotalSeller: { $sum: "$totalAmount" },
            grandTotalSellerPayment: {
              $sum: {
                $sum: {
                  $map: {
                    input: "$payments",
                    as: "p",
                    in: "$$p.amount",
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            grandTotalSeller: 1,
            grandTotalSellerPayment: 1,
          },
        },
      ],
    },
  },
  {
    $addFields: {
      // flatten grandTotals[0] → grandTotalSeller & grandTotalSellerPayment
      grandTotalSeller: { $arrayElemAt: ["$grandTotals.grandTotalSeller", 0] },
      grandTotalSellerPayment: {
        $arrayElemAt: ["$grandTotals.grandTotalSellerPayment", 0],
      },
      totalCount: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] },
    },
  },
  {
    $project: {
      data: 1,
      totalCount: 1,
      grandTotalSeller: 1,
      grandTotalSellerPayment: 1,
    },
  },
];


  return paginatedQuery;
};
