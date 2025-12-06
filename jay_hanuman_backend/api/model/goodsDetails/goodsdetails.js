 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 
 const goodsScema = new Schema(
   {
       
   })
 
 module.exports = mongoose.model("GoodsDetails", goodsScema);
//  clientDetails: [
//           {
//             clientId: {
//               type: Schema.Types.ObjectId,
//               ref: "ClientDetails",
              
//             },
//             soldPackages:{
//                 type: String,
                
//             }
//           },
//         ],
//         leftPackages:{
//             type: String,
//             required: true
//         }