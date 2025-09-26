const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientGoodsPaymnet = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref:'ClientDetails'
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["Cash", "Cheque", "BankTransfer", "PhonePe"],
    required: true,
  },

  // Only for cheque
  chequeNumber: {
    type: String,
    required: function () {
      return this.paymentType === "Cheque";
    },
  },

  accountNumber: {
    type: String,
    required: function () {
      return (
        this.paymentType === "Cheque" ||
        this.paymentType === "BankTransfer" ||
        this.paymentType === "PhonePe"
      );
    },
  },
});

module.exports=mongoose.model("clientGoodPayment",clientGoodsPaymnet)