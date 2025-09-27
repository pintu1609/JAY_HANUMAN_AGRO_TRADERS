const dal = require("../../helper/dal");
const model = require("../../model/ClientBuyerGoods/clientgoodspayment");
const clientModel = require("../../model/client/clientdetails");
exports.create = async (body) => {
  const clientDetails = await dal.findByID(clientModel, body.clientId);

  if (!clientDetails) {
    return {
      status: 400,
      message: "Client Details not Found",
    };
  }

  const clientGoodsGoodsPayment = await dal.create(model, body);
  return {
    message: "Client Goods Payment created successfully",
    status: 200,
    data: clientGoodsGoodsPayment,
  };
};

exports.update = async (id, body) => {
  const existingClientGoodsPayment = await dal.findByID(model, id);
  if (!existingClientGoodsPayment) {
    return {
      message: "Client Goods Payment not found",
      status: 400,
    };
  }

  const clientDetails = await dal.findByID(clientModel, body.clientId);

  if (!clientDetails) {
    return {
      status: 400,
      message: "Client Details not Found",
    };
  }

  const updateClientGoods = await dal.findOneAndReplace(
    model,
    { _id: id },
    body,
    {
      new: true,
    }
  );
  return {
    message: "Client Goods Payment updated successfully",
    status: 200,
    data: updateClientGoods,
  };
};

exports.delete = async (id) => {
  const deleteClientGoodsPayment = await dal.findOneAndDelete(model, {
    _id: id,
  });
  if (!deleteClientGoodsPayment) {
    return {
      message: "Client Buyer Goods not found",
      status: 400,
    };
  }
  return {
    message: "Client Buyer Goods deleted successfully",
    status: 200,
  };
};

exports.getClientGoodsPaymentDetails = async (quries) => {
  const getClientGoodsPayment = await dal.aggregate(model, quries);
  return {
    message: "Client Goods Payment fetched successfully",
    status: 200,
    data: getClientGoodsPayment,
  };
};
