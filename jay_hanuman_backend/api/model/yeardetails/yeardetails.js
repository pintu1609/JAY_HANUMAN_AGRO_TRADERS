const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const yearDetailsSchema=new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "Register", // reference to User collection
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    
},{timestamps: true})

module.exports=mongoose.model("YearDetails", yearDetailsSchema);