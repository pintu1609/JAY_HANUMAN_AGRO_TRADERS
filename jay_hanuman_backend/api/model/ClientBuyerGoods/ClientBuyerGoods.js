const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
  package: { type: String, required: true },       // e.g., "Quantal"
  weight: { type: Number, required: true },     // e.g., 40
  rate: { type: Number, required: true },       // e.g., rate per unit
  calculation: { type: String, required: true } // e.g., "Quantal"
});

const ClientGoodsSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Register", required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId,ref:"CompanyDetails", required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "CompanyDetails", required: true },
  vehicleNumber: { type: String, required: true },
  packages: [PackageSchema],   // array of packages
  misleniousCharge: { type: Number, required: true },
  misleniousChargeDescription: { type: String },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true }, 
  billNumber: { type: String, required: true  }
}, { timestamps: true });

module.exports = mongoose.model("ClientBuyerGoods", ClientGoodsSchema);
