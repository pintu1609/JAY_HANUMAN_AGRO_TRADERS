const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companyDetailsSchema = new Schema(
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
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },

    phone: [
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
    gst: {
      type: String,
      sparse: true,
    },
    pan: {
      type: String,
      sparse: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CompanyDetails", companyDetailsSchema);
