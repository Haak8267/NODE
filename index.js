// import express moudule
const express = require("express")
const { createBankController, retrieveBankController} = require("./controllers/bankController")
const mongoose = require("mongoose")



//load environment variables from .env file
require('dotenv').config();

//import bank routes
const BankRoutes = require("./routes/bankRoutes");


// create an express server
const server = express();




// middleware to parse JSON requests
server.use(express.json());



//Port configuration
const PORT = process.env.PORT || 5000;


// connect to MongoDb
mongoose.connect(
    process.env.MONGO_URI,
)



// start a server
server.listen(PORT, ()=>{console.log("server is runing on port 3000")})

