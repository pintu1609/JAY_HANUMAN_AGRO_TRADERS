const dal = require("../../helper/dal");
const model = require("../../model/seller/seller");

exports.getWareHouse = async (quries) => {
  const warehouseDetails = await dal.aggregate(model, quries);

  return {
    status: 200,
    message: "wareHouse Goods Details fetched Successfully",
    data: warehouseDetails,
  };
};
