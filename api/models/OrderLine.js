const { Schema } = require('mongoose')

const orderLineSchema = new Schema({
    price:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

module.exports = orderLineSchema;