const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  product: [
    {
      type: Schema.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = model("Category", categorySchema);
