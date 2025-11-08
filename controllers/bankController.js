const BankModel = require('../model/bankModel');
const{validationResult} = require('express-validator');

// bank controllers
const  createBankController = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        
        return res.status(400).json({errors: errors.array()});
    }
    try {

        const {name, location, branch, address, accountNumber, phoneNumber} = req.body;
     if(!name || !location || !branch || !address || !accountNumber || !phoneNumber) {
            return  res.status(400).json({message: "All fields are required"});
        }
        
        const bank = new BankModel({
            name, location, branch, address, accountNumber, phoneNumber
        });

        const results = await bank.save();
        res.json({message: "Bank Created Successfully",bank: results})
    } catch (error) {
      console.log(error);
        res.status(500).json({message: "Internal Server Error"})
        
    }

}

const retrieveBankController = async (req,res)=>{
   try {
     const {id, name} = req.query;

     let bank;

     if (id) {
        // retrieve bank by id
        banks = await BankModel.findById(id);
        }

     else if (name){
        // retrieve bank by name
        bank = await BankModel.findOne({name});
     } else{
        // retrieve all banks
        bank = await BankModel.find();
     }

     res.json({banks: bank});
   } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal Server Error"})
    
   }
}

const updateBankController = async (req,res)=>{
    
    try {
      const {id, name, location, branch, address, accountNumber, phoneNumber} = req.body;
        if(!id) {
            return res.status(400).json({message: "Bank id is required"});
        }
        const bank = await BankModel.findById(id);
        if (!bank) {
            return res.status(404).json({message: "Bank not found"});
        }

        // update bank fields
        bank.name = name || bank.name;
        bank.location = location || bank.location;
        bank.branch = branch || bank.branch;
        bank.address = address || bank.address;
        bank.accountNumber = accountNumber || bank.accountNumber;
        bank.phoneNumber = phoneNumber || bank.phoneNumber;

        const results = await bank.save();
        res.json({message: "Bank Updated Successfully", bank: results})
    } catch (error) {
      console.log(error);
        res.status(500).json({message: "Error updating bank"})
        
    }


}

const deleteBankController = async (req,res)=>{
    try {
        const {id} = req.body;
            if(!id) {
                return res.status(400).json({message: "Bank id is required"});
            }
            const bank = await BankModel.findById(id);
            if (!bank) {
                return res.status(404).json({message: "Bank not found"});
            }
    
            await BankModel.findByIdAndDelete(id);
            res.json({message: "Bank Deleted Successfully"})  
    } catch (error) {
      console.log(error);
        res.status(500).json({message: "Error deleting bank"})   
    }
    }

module.exports = {
    createBankController, 
    retrieveBankController,
    updateBankController,
    deleteBankController
    
}