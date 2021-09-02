const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    products:[{
        type: Schema.ObjectId, 
        ref: "Product"
    }]
})

module.exports = model('Category', categorySchema);