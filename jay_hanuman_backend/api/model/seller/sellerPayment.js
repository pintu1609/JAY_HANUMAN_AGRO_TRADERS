const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { paymentBaseFields } = require("../common/common");

const paymentSchema = new Schema(
  {
    ...paymentBaseFields,

    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SellerPayment", paymentSchema);
