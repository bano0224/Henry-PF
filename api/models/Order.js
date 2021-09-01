const { Schema } = require('mongoose')

const orderSchema = new Schema({
    status: {
        enum: ['approved', 'canceled', 'pending', 'cart', 'created'],
        default: 'cart',
        required: true
    }
})

module.exports = orderSchema;