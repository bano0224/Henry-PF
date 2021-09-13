const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/supermarketdb", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      /* useFindAndModify: true,
      useCreateIndex: true */
    });
    mongoose.set("debug", true);
    console.log("MongoDB connection SUCCESS!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
