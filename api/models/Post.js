const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let product = new Schema(
    {
        title:{
            type:String,
        },
        price:{
            type: Number,
        },
        info:{
            type: String,
        },
        image: {
            type: String,
        }
    },
    { timestamps:true}
);

product.pre('save', function () {      
    if (this.isNew) {
      this._doc.id = this._id;      
    } 
  }
) 

// Create a collection of a particular database
// mongoose.model(<Collectionname>, <CollectionSchema>) 
let Product = mongoose.model("test",product)

module.exports = Product;