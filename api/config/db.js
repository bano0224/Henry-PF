const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();

const { MONGO_URI } = process.env

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log("MongoDB connection SUCCESS!");
    } catch (error) {
        console.log(error)
    }
}



module.exports = connectDB;