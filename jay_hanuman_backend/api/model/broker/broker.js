const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brokerSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "Register", // reference to User collection
        required: true,
    },
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        unique: true,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
    },
    paymentCalculation: {
        type: String,
        required: true,
        num: ["percentage", "fixed"],
    },
    paymentValue: {
        type: Number,
        required: true, 
        min: 0,         
    },
    },{timestamps: true});

module.exports = mongoose.model("Broker", brokerSchema);