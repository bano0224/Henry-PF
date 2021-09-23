const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema({
    name: {
      type: String,
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
      },
    ],
  });
  
  module.exports = model("WishList", wishlistSchema);