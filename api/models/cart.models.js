const mongoose = require("mongoose");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    user_id: String,
    email: String,
    password: String

  })
);

Cart.pre('save', function () {      
    if (this.isNew) {
      this._doc.id = this._id;      
    } 
  }
) 

module.exports = User;