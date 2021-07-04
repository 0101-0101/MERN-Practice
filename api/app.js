const express = require('express')
const app = express()
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose")
// const port = 3000
const bodyParser = require('body-parser')

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const config =  require("./config")
const prodRouter = require("./routes/posts")

app.use(logger("dev"));
app.use(cors())
const dbUrl = config.dbUrl 

const path = require("path");

app.use(express.static(path.join(__dirname, 'public')))

const Product = require("./models/Post")

const upload = require('multer')({ dest: path.join(__dirname, 'public/photos') })
app.post('/upload', upload.single('photo'), async function(req, res){
  console.log(req.body,req.file.path);
    const requestBody = {
        title: req.body.name,
        price : req.body.price,
        info: req.body.description,
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

app.use( express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/image.png", (req, res) => {
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