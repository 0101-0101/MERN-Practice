const express = require('express')
const app = express()


const cors = require("cors");
// Allowing cors for all origins
app.use(cors()) 

// app.use(cors({
//   origin: 'https://www.section.io'
// }));


// HTTP request logger middleware for node.js
const logger = require("morgan");
app.use(logger("dev"));


// middleware Parse HTML Form Data
app.use( express.urlencoded({ extended: true }));
// Parse Json Content
app.use(express.json());


var mongoose = require("mongoose")
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const config =  require("./config")
const dbUrl = config.dbUrl 

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useUnifiedTopology: true,
};


mongoose.connect(dbUrl ,options,(err) => {
  if(err){
    console.log(err);
  }
})

app.post("/search",function(req,res){
  // console.log(req.query);
  const val = req.query.value
  console.log(val);
  return Product.find({
    //  "title": { $regex:".*" + val + ".*"},

    // case-insensitive
     "title": new RegExp(".*"+val+".*", "i"),

     
    //  "info" : { $regex: val }
    // "$text":{
      // "$search": val // "\" product\""
    // }
})
  // return Product.find({'info':"test" })
  .then((result)=>{
    // console.log("result",result);
      res.status(200).json(result)
    } )
  // })


})


// app.use('/static', express.static('public/'))
// app.use('/public', express.static(path.join(__dirname, 'public')))


// Look for Images inside public/photos/ directory so 
// localhost:9000/my.jpg is displayed from public/photos/
// app.use(express.static(path.join(__dirname, '/public/photos/')))  

const path = require("path");
app.use(express.static(path.join(__dirname, '/')))  

const prodRouter = require("./routes/posts")

// multer handle multipart/form-data
// Multer will not process any form which is not multipart
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req,file,cb){
      cb(null, 'public/photos')
  },
  // Upload image with Extension
  filename: function (req, file, cb) {
    cb(null, 'upload_at_' + Date.now() + path.extname(file.originalname))
  }
});

// const upload = require('multer')({ dest: 'public/photos' })
var upload = multer({storage: storage}); 

const Product = require("./models/Product")

app.post('/upload', upload.single('photo'), async function(req, res){
  // console.log(req.body); // form fields
  // console.log(req.file); // form files
    const requestBody = {
        title: req.body.title,
        price : req.body.price,
        info: req.body.info,
        image: req.file.path
    }
    const request = new Product(requestBody)

    try{
        await request.save()
        res.status(201).send()

    }catch(e){
        res.status(400).send(e)
    }
})


require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);
app.use("/product",prodRouter)

app.get('/api/config/paypal', (req,res) => 
res.send(process.env.PAYPAL_CLIENT_ID)
)

// Authorization
// require('./routes/user.routes')(app);

module.exports = app