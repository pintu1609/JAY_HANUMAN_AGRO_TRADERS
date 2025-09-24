const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientDetailsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Register", // reference to User collection
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true 
    },

    phone:  [
      {
        type: String,
        required: true,
        unique: true,
      },
    ],

    address: {
      type: String,
      required: true,
    },
    companyName: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "CompanyDetails",
    },
    
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClientDetails", clientDetailsSchema);
