exports.searchClient = (filter = {}, pagination = {}) => {
  const page = parseInt(pagination.page) || 1;
  const limit = parseInt(pagination.limit) || 10;
  const skip = (page - 1) * limit;

  // Base match stage (optional)
  const matchStage = (filter && Object.keys(filter).length > 0) ? [{ $match: filter }] : [];

  // Faceted aggregation for data + totalCount
  const paginatedQuery = [
    {
      $facet: {
        data: [
          ...matchStage,
          { $skip: skip },
          { $limit: limit }
        ],
        totalCount: [
          ...matchStage,
          { $count: "count" } // count **after filtering**
        ]
      }
    }
  ];

  return paginatedQuery;
};
