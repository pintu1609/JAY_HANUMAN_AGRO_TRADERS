exports.searchClient = (filter = {}, pagination = {}) => {
  const page = parseInt(pagination.page) || 1;
  const limit = parseInt(pagination.limit) || 10;
  const skip = (page - 1) * limit;

  // Base match stage (optional)
  const matchStage =
    filter && Object.keys(filter).length > 0 ? [{ $match: filter }] : [];

  // Faceted aggregation for data + totalCount
  const paginatedQuery = [
    {
      $facet: {
        data: [
          ...matchStage,

          // add client name and comapny name based on clientId and companyId

          // Populate client details
          {
            $lookup: {
              from: "clientdetails", // collection name of clients
              localField: "clientId",
              foreignField: "_id",
              as: "client",
            },
          },
          { $unwind: { path: "$client", preserveNullAndEmptyArrays: true } },

          // Populate company details
          {
            $lookup: {
              from: "companydetails", // collection name of companies
              localField: "companyId",
              foreignField: "_id",
              as: "company",
            },
          },
          { $unwind: { path: "$company", preserveNullAndEmptyArrays: true } },
          // Remove clientId and companyId
          {
            $project: {
              clientId: 0,
              companyId: 0,
            },
          },

          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalCount: [
          ...matchStage,
          { $count: "count" }, // count **after filtering**
        ],
      },
    },
  ];

  return paginatedQuery;
};
