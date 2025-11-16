const usersModel = require("../model/usersModel")
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")


const signupController = async (req, res) => {
try {
    // validate input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    //Hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);

const user = new usersModel({
    name, 
    email, 
    password: hashedPassword
});

//save user to the database
const result = await user.save();

//respond with success message
return res.json({message: "User signed up successfully", data: result});


} catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error signing up user"});
}



}




module.exports = {
    signupController
}