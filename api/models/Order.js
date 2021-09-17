const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  status: {
    type: String,
    enum: ["Aprobada", "Cancelada", "pendiente", "Finalizada"],
    default: 'pendiente',
    required: true
  },
  products: {
    type: [{
      _id: String,
      name: String,
      price: Number,
      qty: Number,
      image: String
    }]
  },
  user: {
      type: Schema.ObjectId,
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
  totalPrice: {
    type: Number,
    required: true
  },
  dateOrdered: {
      type: Date,
      default: Date.now,
  },
});

module.exports = model("Order", orderSchema);
