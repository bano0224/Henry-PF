require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const morgan = require("morgan");
const routes = require('./routes/index')

connectDB(); 
const app = express();

app.use("/", routes);
app.use(express.json({ limit: '50mb' }))
app.use(morgan("dev"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
