exports.searchClientPayment = (filter = {}, pagination = {}) => {
  const page = parseInt(pagination.page) || 1;
  const limit = parseInt(pagination.limit) || 10;
  const skip = (page - 1) * limit;

  const matchStage =
    filter && Object.keys(filter).length > 0 ? [{ $match: filter }] : [];

  const paginatedQuery = [
    ...matchStage,

    {
      $facet: {
        data: [
          {
            $lookup: {
              from: "clientdetails",
              localField: "clientId",
              foreignField: "_id",
              as: "client",
            },
          },
          { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },
          {
            $project: {
              clientId: 0,
            },
          },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],

        totalCount: [
          ...matchStage,
          { $count: "count" },
        ],

        grandTotals: [
          ...matchStage,
          {
            $group: {
              _id: null,
              grandTotalClientPayment: { $sum: "$amount" },
            },
          },
          {
            $project: {
              _id: 0,
              grandTotalClientPayment: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
      // flatten grandTotals[0] → grandTotalSeller & grandTotalSellerPayment
      grandTotalClientPayment: { $arrayElemAt: ["$grandTotals.grandTotalClientPayment", 0] },
      
      totalCount: { $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0] },
    },
  },
    {
      $project: {
        data: 1,
        grandTotalClientPayment: 1,
        totalCount: 1,
      },
    },
  ];

  return paginatedQuery;
};
