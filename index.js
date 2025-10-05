const express = require("express")

//Intialization
const server = express()

//controller
const Homepage = (req,res)=>{
    res.send("This is the home page")
}

const Products = (req,res)=>{
    res.send("This is my Product page")
}

const Gallery = (req,res)=>
    res.send("Pictures from the Gallery")

const About = (req,res)=>{
    res.send("This is my About Page")
}

const Contact = (req,res) =>{
    res.send("This is my Contact page")
}


//routes
server.post('/Products',Products)
server.get('/Gallery', Gallery)
server.use('/About', About)
server.patch('/Contact', Contact)
server.use('/',Homepage)


// starting server
server.listen(3000, ()=> console.log("server is working on port 3000"))