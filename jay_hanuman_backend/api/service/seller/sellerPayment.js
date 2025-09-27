const model = require("../../model/seller/sellerPayment");
const dal = require("../../helper/dal");
const sellerModel = require("../../model/seller/seller");

exports.createPayment = async (body) => {
  const sellerDetails = await dal.findByID(sellerModel, body.sellerId);

  if (!sellerDetails) {
    return {
      status: 400,
      message: "Seller Details not Found",
    };
  }
  const sellerPayment = await dal.find(model, { sellerId: body.sellerId });

  const totalPaid = sellerPayment.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  const sellerTotalAmount = Number(sellerDetails.totalAmount);
  const newTotal = totalPaid + Number(body.amount);

  if (newTotal > sellerTotalAmount) {
    return {
      status: 400,
      message: "Payment exceeds seller's total amount.",
    };
  }

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
  const sellerDetails = await dal.findByID(sellerModel, body.sellerId);

  if (!sellerDetails) {
    return {
      status: 400,
      message: "Seller Details not Found",
    };
  }
  const sellerPayment = await dal.find(model, {
    sellerId: body.sellerId,
    _id: { $ne: id },
  });

  const totalPaid = sellerPayment.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  const sellerTotalAmount = Number(sellerDetails.totalAmount);
  const newTotal = totalPaid + Number(body.amount);

  if (newTotal > sellerTotalAmount) {
    return {
      status: 400,
      message: "Payment exceeds seller's total amount.",
    };
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
