const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://user123:user123@cluster0.2jcim.mongodb.net/Cluster0?retryWrites=true&w=majority", {
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
