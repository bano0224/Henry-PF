const Order = require("../../models/Order");


const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
    }
}

const createOrder = async(req, res) => {
    console.log(req.body);
    try {
        await Order.insertMany(req.body);
        
        res.status(200).send("orden creada");

    } catch (err) {
        console.log(err)
    }
}

const getOrderByUser = async (req, res) => {
    const {id} = req.params

    const orders = await Order.find({ user: id})

    res.status(200).json(orders)
}

module.exports = {
    createOrder,
    getOrderByUser,
    getOrders
}