const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    //User full name
    name:{
        type: String, 
        require : true,
        trim: true
    },

    //User email address
    email:{
        type: String, 
        require : true,
        unique: true,
        lowercase: true,
        trim: true
    },

    //User password (will be hashed before saving)
    password:{
        type: String, 
        require : true,
    },

    //Reference to the user's bank account
    account:{
        type: Schema.Types.ObjectId,
        ref: 'Accounts',
    },

    //Timestamp fields for user creation and updates
}, {timestamps: true

});

module.exports = mongoose.model('Users', UserSchema);