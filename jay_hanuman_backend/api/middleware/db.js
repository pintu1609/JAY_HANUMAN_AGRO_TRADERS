

// // const uri = process.env.ATLAS_URI;
// // mongoose.connect(uri, {
// //     useNewUrlParser: true,
// //     useCreateIndex: true,
// //     useUnifiedTopology: true,
// // });
// // const connection = mongoose.connection;
// // connection.once("open", () => {
// //     console.log("MongoDB database connection established successfully");
// // });

// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const uri = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/onion_export_db";
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB database connection established successfully");
//   } catch (err) {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;


require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let dbConnection;

// const options = {
//   //NEW CONFIGURATION
//   //   keepAlive: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   connectTimeoutMS: 200000,
//   socketTimeoutMS: 2000000,
//   keepAlive: true,
//   useNewUrlParser: true,
//   dbName: process.env.DB_NAME || "onion_export_db",
// };

const options = {
  dbName: process.env.DB_NAME || "onion_export_db",
};

exports.connectToDatabase = async (req, res, next) => {
  const mongoURI =
    process.env.DB_STRING ||
    "mongodb+srv://pintukumar808284:ZyLWuB7bdBrOebml@cluster0.kqbqscz.mongodb.net/?retryWrites=true&w=majority";
  if (dbConnection) {
    console.log("----DB----PREVIOUS-CONNECTION----------------");
    next();
  } else {
    console.log("process.env.DB_STRING, options ", mongoURI);
    mongoose.connect(mongoURI, options).then(
      (db) => {
        console.log("----DB----NEW-CONNECTION----------------");
        dbConnection = db.connections[0].readyState;
        console.log("----DB----NEW-CONNECTION-INIT----------------");
        next();
      },
      (err) => {
        console.log("----DB----ERROR-CONNECTION----------------");
        console.log(err);
        return res.send({
          status_code: 409,
          success: false,
          message: "DB connection failure",
        });
      }
    );
  }
};
