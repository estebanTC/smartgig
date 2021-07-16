const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({

    texto:{
        type: String,
        required: true,
        trim: true
    },
    numero:{
        type: Number,
        required: true,
        unique: true
     },
     userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'users'
     }
    

});

module.exports = mongoose.model('message', MessageSchema);