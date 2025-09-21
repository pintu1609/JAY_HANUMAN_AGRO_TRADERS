const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {paymentBaseFields} = require("../common/common");

// Reusable schema for account details
// const accountDetailsSchema = new Schema(
//   {
//     accountHolderName: { type: String, required: true },
//     accountNumber: { type: String, required: true },
//     ifscCode: { type: String } // optional, only required in some cases
//   },
//   { _id: false }
// );

// const paymentBaseFields = {
//   userId: {
//       type: Schema.Types.ObjectId,
//       ref: "Register",
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//       default: Date.now,
//     },
//     paymentType: {
//       type: String,
//       enum: ["Cash", "Cheque", "BankTransfer", "PhonePe"],
//       required: true,
//     },

//     // Only for cheque
//     chequeNumber: {
//       type: String,
//       required: function () {
//         return this.paymentType === "Cheque" || this.paymentType === "BankTransfer";
//       },
//     },

//     fromAccount: {
//       type: accountDetailsSchema,
//       required: function () {
//         return this.paymentType !== "Cash";
//       },
//     },
//     toAccount: {
//       type: accountDetailsSchema,
//       required: function () {
//         return this.paymentType !== "Cash";
//       },
//     },
//   }


const paymentSchema = new Schema(
  {
        ...paymentBaseFields,

    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("SellerPayment", paymentSchema);


