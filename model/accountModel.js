const bankModel = require('../model/bankModel');

//ACCOUNT CONTROLLER


// create a new account linked to a specific bank
const createBankController = async (req, res) => {
    try {
       const { name, location, branch, address, accountNumber, phoneNumber } = req.body;

       // validate required fields
       if (!name || !number || !bankId) {
           return res.status(400).json({ message: "Missing required fields" });
       }

       //optional: check if the bank exists creating the account
         const bank = await bankModel.findById(bankId);
            if (!bank) {
                return res.status(404).json({ message: "Bank not found" });
            }
         const newAccount = new bankModel({name, number, accountType, bankId});
         const results = await newAccount.save();
            res.status(201).json({ message: "Account created successfully", data: results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating account" });
        
    }
};

module.exports = {createAccountController};