const express = require('express')
const app = express()
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose")
app.use(logger("dev"));
app.use(cors())
app.use( express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const config =  require("./config")
const prodRouter = require("./routes/posts")


const dbUrl = config.dbUrl 

const path = require("path");

app.use(express.static(path.join(__dirname, '/public/')))

const Product = require("./models/Post")

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req,file,cb){
      cb(null, 'public/photos')
  },
  // Upload image with Extension
  filename: function (req, file, cb) {
    cb(null, 'upload_at_' + Date.now() + path.extname(file.originalname))
  }

// const upload = require('multer')({ dest: 'public/photos' })
});

var upload = multer({storage: storage}); 

// app.post('/upload',(req,res) => {
//   console.log(req.body);
// })


app.post('/upload', upload.single('photo'), async function(req, res){
  console.log(req.body,req.file);
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


app.get("/image", (req, res) => {
  res.sendFile(path.join(__dirname, "/uploads/images/image.png"));
});

require('./routes/auth.routes')(app);

// Authorization
// require('./routes/user.routes')(app);



var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl ,options,(err) => {
  if(err){
    console.log(err);
  }
})




app.use("/product",prodRouter)

module.exports = app