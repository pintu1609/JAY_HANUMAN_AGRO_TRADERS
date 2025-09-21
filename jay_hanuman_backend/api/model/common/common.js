const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Reusable schema for account details
const accountDetailsSchema = new Schema(
  {
    accountHolderName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String }, // optional
  },
  { _id: false }
);

// Common fields for both seller & broker payments
const paymentBaseFields = {
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  paymentType: {
    type: String,
    enum: ["Cash", "Cheque", "BankTransfer", "PhonePe"],
    required: true,
  },
  chequeNumber: {
    type: String,
    required: function () {
      return this.paymentType === "Cheque" || this.paymentType === "BankTransfer";
    },
  },
  fromAccount: {
    type: accountDetailsSchema,
    required: function () {
      return this.paymentType !== "Cash";
    },
  },
  toAccount: {
    type: accountDetailsSchema,
    required: function () {
      return this.paymentType !== "Cash";
    },
  },
};

module.exports = { paymentBaseFields };
