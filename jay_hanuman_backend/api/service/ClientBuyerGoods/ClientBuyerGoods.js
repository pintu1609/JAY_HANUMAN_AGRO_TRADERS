const dal = require("../../helper/dal");
const model = require("../../model/ClientBuyerGoods/ClientBuyerGoods");

exports.create = async (body) => {
    const subtotalamount = body.packages.reduce((total, pkg) => {
          let multiplier = pkg.calculation === "Quantal" ? 100 : 40;

        return total + (Number(pkg.package) * pkg.weight / multiplier) * pkg.rate
    },0)

    const amount=subtotalamount+body.misleniousCharge
    const goodsData={
        ...body,
        amount
    }
    console.log("🚀 ~ goodsData:", goodsData)
  const createClientGoods= await dal.create(model, goodsData);
  return {
    message: "Client Buyer Goods created successfully",
    status: 200,
    data: createClientGoods
  }
};

exports.update= async (id, body) => {
  const existingClientGoods= await dal.findByID(model, id);
  if (!existingClientGoods) {
    return {
      message: "Client Buyer Goods not found",
      status: 400,
    };
  }

  const subtotalamount = body.packages.reduce((total, pkg) => {
          let multiplier = pkg.calculation === "Quantal" ? 100 : 40;

        return total + (Number(pkg.package) * pkg.weight / multiplier) * pkg.rate
    },0)

    const amount=subtotalamount+body.misleniousCharge
    const goodsData={
        ...body,
        amount
    }
    console.log("🚀 ~ goodsData:", goodsData)

  
  const updateClientGoods= await dal.findOneAndUpdate(model, { _id: id }, goodsData, {
    new: true,
  });
  return {
    message: "Client Buyer Goods updated successfully",
    status: 200,
    data: updateClientGoods
  }
};

exports.delete= async (id) => {
  const deleteClientGoods= await dal.findOneAndDelete(model, { _id: id });
  if (!deleteClientGoods) {
    return {
      message: "Client Buyer Goods not found",
      status: 400,
    };
  }
  return {
    message: "Client Buyer Goods deleted successfully",
    status: 200,
  }
};


exports.getClientGoodsDetails= async (quries) => {
  const getClientGoods= await dal.aggregate(model, quries);
  return {
    message: "Client Buyer Goods fetched successfully",
    status: 200,
    data: getClientGoods
  }
};