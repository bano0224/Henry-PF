const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  status: {
    enum: ["approved", "canceled", "pending", "cart", "created"],
    default: "cart",
    required: true,
  },
  products: {
    type: [{
      _id: Schema.Types.ObjectId, //o String
      name: String,
      price: Number,
      qty: Number,
    }]
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
      type: String,
      required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  dateOrdered: {
      type: Date,
      default: Date.now,
  },
});

module.exports = model("Order", orderSchema);
