const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: [
    {
      type: Schema.ObjectId,
      ref: "User",
    }
  ],
  product: [
    {
      type: Schema.ObjectId,
      ref: "Product",
    }
  ]
});

module.exports = model("Review", reviewSchema);