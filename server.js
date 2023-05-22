
const express = require('express')
const mongoose =require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require("cors");
require('dotenv').config()
//import routes
const authRoute = require('./routes/auth')
const fs = require('fs')


// app scaffolding
const app = express()


// db connection
mongoose.connect(process.env.DATABASE,
        { 
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
       
        }
        ).then(()=> console.log('db connect')).catch((err)=>console.log('db connection errror',err))


// middleware
app.use(morgan('dev'));
app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.json({limit: "30mb", extended: true }))
//app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



fs.readdirSync('./routes').map((rt)=> app.use('/api',require('./routes/' + rt)))


// use port

const port = process.env.PORT || 7676

app.listen(port, ()=> console.log(`server is running on port ${port}`))