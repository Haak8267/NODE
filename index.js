const express = require("express")
const path = require("path")

//Intialization
const server = express()

// Body Parser Middleware (converts the data)
server.use(express.urlencoded({extended:true}))
server.use(express.json());

//Middleware (the system checkpoint)
const logger = (req,res,next)=>{
    console.log("this middleware is working perfectly")
    next();
}

const logger1 = (req,res,next)=>{
    console.log("This is the product middleware and it's working perfectly")
    next();
}

//Serving Files
const serving = (req,res)=>{
    //Finding the file
    const homepath = path.join(__dirname, "public", "index.html")
    //Serving the file
    res.sendFile(homepath)
}

const delivering = (req,res)=>{
    //Finding the file
    const productPath = path.join(__dirname, "public", "product.html")
    //Serving the file
    res.sendFile(productPath)
}

//Serving all the pages
server.use(express.static('public'))


//Controller
const Homepage = (req,res)=>{
    res.send("This is the home Page")
}

const Products = (req,res)=>{
    res.send("This is my Product Page")
}

const Gallery = (req,res)=>{
    res.send("Pictures from the Gallery")
}

const About = (req,res)=>{
    res.send("This is my About Page")
}

const Contact = (req,res) =>{
    res.send("This is my Contact Page")
}

const loginPage =(req,res)=>{
    console.log(req.body)
    res.send('Thank you')
}

const signUp =(req,res)=>{
    console.log(req.body)
    res.send('Thank you for submitting')
}


//routes
// server.use(logger)
server.use('/Products',logger1, Products)
server.post('/login',loginPage)
server.use('/Signup',signUp)
server.use('/Gallery', Gallery)
server.patch('/About', About)
server.get('/Contact', delivering)
server.use('/',serving,)


// starting server
server.listen(3000, ()=> console.log("server is working on port 3000"))