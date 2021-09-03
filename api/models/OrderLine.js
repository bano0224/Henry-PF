const { Schema, model } = require("mongoose");

const orderLineSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = model("OrderLine", orderLineSchema);
