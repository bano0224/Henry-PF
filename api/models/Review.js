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
  value: {
    type: String
  }
});

module.exports = model("Review", reviewSchema);
