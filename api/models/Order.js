const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  status: {
    type: String,
    enum: ["Aprobada", "Cancelada", "Pendiente", "Finalizada"],
    default: 'Pendiente',
    required: true
  },
  products: {
    type: [{
      _id: String,
      name: String,
      price: Number,
      qty: Number,
      imageUrl: String
    }]
  },
  user: {
    ref: 'User',
    type: Schema.ObjectId
  },
  address1: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postCode: {
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
