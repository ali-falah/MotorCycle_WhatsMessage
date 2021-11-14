const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name :{
        type:String,
        require:true,
        trim: true,
        minlength: 3
    },
    phone : {
        type:String,
        require:true,
        trim: true,
    },
    address:String
},{
    timestamps:true
},{
    fields:mongoose.Schema.Type
   }, { collection: 'Clients'})

const Client = mongoose.model('Client', userSchema);

module.exports = Client;