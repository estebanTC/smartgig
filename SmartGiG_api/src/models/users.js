const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({

    userName:{
        type: String,
        required: true,
        trim: true
    },
    Password:{
        type: String,
        required: true,
        trim: true,
        unique: true
     }

});

module.exports = mongoose.model('users', UsersSchema);
