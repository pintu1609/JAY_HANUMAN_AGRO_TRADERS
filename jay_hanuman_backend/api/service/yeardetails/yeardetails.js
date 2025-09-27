const dal = require("../../helper/dal");
const model = require("../../model/yeardetails/yeardetails");

exports.createYear = async (userId) => {
  if (!userId) {
    return {
      status: 400,
      message: "userId not found",
    };
  }

  const startYear = 2020;
  const years = await dal.find(model);

  let newYear;
  if (years.length === 0) {
    newYear = startYear;
  } else {
    // Find the maximum year
    const maxYear = Math.max(...years.map((y) => y.year));
    newYear = maxYear + 1;
  }
  const data = {
    userId,
    year: newYear,
  };

  const year = await dal.create(model, data);

  return {
    status: 200,
    message: "Year created Sucessfully",
    data: year,
  };
};

exports.deleteYear = async (id) => {
  const deleteYearData = await dal.findOneAndDelete(model, { _id: id });

  if (!deleteYearData) {
    return {
      status: 400,
      message: "year not found",
    };
  }
  return {
    status: 200,
    message: "Year Deleted Successsfully",
  };
};

exports.getAllYear = async () => {
  const yearData = await dal.find(model);

  return {
    status: 200,
    message: "Year Fetched Successfully",
    data: yearData || [],
  };
};
