var express = require("express")
var router = express.Router()

const verifyToken = require("../middlewares/authJwt");
const Cart = require("../models/Cart")




// router.post("/cart", [verifyToken],async (req, res) => {
//     const { productId, quantity, name, price } = req.body;
  
//     // const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
//     const userId = req.userId
  
//     try {
//       let cart = await Cart.findOne({ userId });
  
//       if (cart) {
//         //cart exists for user
//         let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
//         if (itemIndex > -1) {
//           //product exists in the cart, update the quantity
//           let productItem = cart.products[itemIndex];
//           productItem.quantity = quantity;
//           cart.products[itemIndex] = productItem;
//         } else {
//           //product does not exists in cart, add new item
//           cart.products.push({ productId, quantity, name, price });
//         }
//         cart = await cart.save();
//         return res.status(201).send(cart);
//       } else {
//         //no cart for user, create new cart
//         const newCart = await Cart.create({
//           userId,
//           products: [{ productId, quantity, name, price }]
//         });
  
//         return res.status(201).send(newCart);
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Something went wrong");
//     }
//   });

// router.get('/', function(req, res, next) {
// res.send('respond with a resource');
// });

// module.exports = router


module.exports =   function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post("/cart/", [verifyToken], async (req, res) => {
    const cart_product =  req.body
    // console.log(req.body);
    // cart_product.forEach( elem =>{
    //     console.log("elem",elem);
    // }
    // )
    for (let i=0 ; i< cart_product.length ; i++){

    // }
    // cart_product.every( elem => {
    const { productId, quantity, name, price } = cart_product[i]

    
    console.log("cart_product[i]",cart_product[i]);
  
    // const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id
    const userId = req.userId
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
        console.log("itemIndex",itemIndex);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          console.log("productItem",productItem);
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity, name, price });
        }
        cart = await cart.save();
        // return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity, name, price }]
        });
  
        // return res.status(201).send(newCart);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  }
  });
  };
