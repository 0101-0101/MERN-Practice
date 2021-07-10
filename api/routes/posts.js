const express = require("express")
const Product = require("../models/Product")
const router = express.Router();

router.get("/list",async (req,res) =>{
    try{
        let prod = await Product.find()
        // console.log("Product",prod);
        res.status(200).json({
            status: 200,
            data: prod
        });
    }catch(err){
        res.status(400).json({
            status:400,
            message:err.message,
        })
}
}
);

router.post("/", async (req, res) => {
    try {
      let post = new Product(req.body);
    //   console.log(post,req.body);
      post = await post.save();
    //   console.log("Save",post);
      res.status(200).json({
        status: 200,
        data: post,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message,
      });
    }
  });

module.exports = router;