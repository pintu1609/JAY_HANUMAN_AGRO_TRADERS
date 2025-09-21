const model = require("../../model/seller/sellerPayment");
const dal = require("../../helper/dal");

exports.createPayment = async (body) => {
  const payment = await dal.create(model, body);
  return {
    message: "Payment created successfully",
    status: 200,
    data: payment,
  };
};

exports.updatePayment = async (body, id) => {
  const updated = await dal.findOneAndReplace(model, { _id: id }, body);
  if (!updated) {
    return { message: "Payment not found", status: 400 };
  }
  return {
    message: "Payment updated successfully",
    status: 200,
    data: updated,
  };
};

exports.deletePayment = async (id) => {
  const deleted = await dal.findOneAndDelete(model, { _id: id });
  if (!deleted) {
    return { message: "Payment not found", status: 400 };
  }

  return {
    message: "Payment deleted successfully",
    status: 200,
  };
};
