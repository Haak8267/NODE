

const usersModel = require('../model/usersModel')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")



const signupController = async (req,res)=> {
try {
    // Validate input fields
const error =  validationResult(req);
      if(!error.isEmpty()){
        console.log(error.array());
        return res.status(400).json({errors: error.array()});
      }
const {name, password,email} = req.body
    // Hashed the password
const hashedPassword = await bcrypt.hash(password, 10)
const user = new usersModel({
    name,
    email,
    password: hashedPassword
});
// save the user to the database
const results = await user.save()
// response
return res.json({message: 'User signed up successfully', data: results })
} catch (error) {
    console.error(err);
    return res.status(500).json({ message: 'Error signing up user' });
}
}



const signinController = async (req,res)=> {
     // Validate input fields
const error =  validationResult(req);
      if(!error.isEmpty()){
        console.log(error.array());
        return res.status(400).json({errors: error.array()});
      }
    try {
        const {email, password} = req.body
        // find user with email
        const user = await usersModel.findOne({email: email});
        if (!user) {
            return res.status(400).json({message: 'invalid email'})
        }
        // compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({message:'invalid password'})
        }
        const token = jwt.sign(
         {userId: user._id, email: user.email}, "yourjwtsecretkey",
         {expiresIn: '1h'}


        )

        // response
        return res.json({message: 'User Signed in succesfully',data: {name: user.name, email: user.email}, token: token})
    } catch (error) {
        console.log(error);
       return res.status(500).json({message:'Error signing in user'})
    }
}
module.exports = {
    signupController,
    signinController
}