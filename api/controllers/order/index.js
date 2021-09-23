const Order = require("../../models/Order");


const getOrders = async(req, res) => {
    try {
        const orders = await Order.find({}).populate('user')
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

const getOrderById = async (req, res) => {
    const { id } = req.params

    const order = await Order.find({_id: id}).populate('user')

    res.status(200).json(order)
}

const modifyStatus = async (req, res) => {
    const {status, id} = req.body

    const order = await Order.findByIdAndUpdate(id, {status: status})

    res.status(200).json('estado modificado')

}

module.exports = {
    createOrder,
    getOrderByUser,
    getOrders,
    getOrderById,
    modifyStatus
}