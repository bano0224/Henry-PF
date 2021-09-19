const Order = require("../../models/Order");


const createOrder = async(req, res) => {
    try {
        console.log("BOOODY",req.body);
        await Order.insertMany(req.body);
        
        res.status(200).send("orden creada");

    } catch (err) {
        console.log(err)
    }
}

module.exports = {createOrder}