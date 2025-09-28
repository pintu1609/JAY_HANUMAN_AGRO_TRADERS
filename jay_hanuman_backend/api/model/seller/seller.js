const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Register", // reference to User collection
      required: true,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    totalAmount: { type: Number, required: true },
    commisionAmount: { type: Number },
    weightCost: { type: Number },
    packages: [
      {
        package: { type: String, required: true },
        weight: { type: Number, required: true },
        rate: { type: Number, required: true },
        date: { type: Date, required: true },
        broker: { type: Schema.Types.ObjectId, required: true, ref: "Broker" },
        commision: { type: Number, required: true },
        amount: { type: Number, required: true },
        wareHouse: { type: Boolean, required: true },
        clientDetails: [
          {
            clientId: {
              type: Schema.Types.ObjectId,
              ref: "ClientDetails",
              
            },
            soldPackages:{
                type: String,
                
            }
          },
        ],
        leftPackages:{
            type: String,
            required: true
        }
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Seller", sellerSchema);
