// mongoose bank model
const mongoose = require('mongoose');


// extra schema constructtor from mongoose
const Schema = mongoose.Schema;


// define bank schema
const BankSchema = new mongoose.Schema({
    //Bank fields (eg: Fidelity Bank)
    name:{type: String, require : true},
    //Bank fields (eg: 123 Street, City, Country)
    address:{type: String, require : true},
    //Bank branch (eg: Main Branch)
    branch:{type: String, require : true},
    //Bank location (eg: Achimota)
    location:{type: String, require : true},
    //Bank account number (eg: 0123456789)
    accountNumber:{type: String, require : true},
    //Bank contact number (eg: +233 123 456 789)
    phoneNumber:{type: String, require : true},
})


// create bank model for the collection "Banks" using the BankSchema
const BankModel = mongoose.model('Banks', BankSchema);

//export the bank model
module.exports = BankModel;