const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: String,
        quantity: Number,
        name: String,
        price: Number,
        total:Number
      }
  ]

  })
);


module.exports = Cart;