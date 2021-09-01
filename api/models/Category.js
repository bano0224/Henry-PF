const { Schema } = require('mongoose')

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
    }
})

module.exports = categorySchema;