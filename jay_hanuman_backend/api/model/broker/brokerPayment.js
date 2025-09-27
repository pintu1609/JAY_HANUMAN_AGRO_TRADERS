const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { paymentBaseFields } = require("../common/common");

const brokerPaymentSchema = new Schema({
  ...paymentBaseFields,

  brokerId: {
    type: Schema.Types.ObjectId,
    ref: "Broker",
    required: true,
  },
});

module.exports = mongoose.model("BrokerPayment", brokerPaymentSchema);
