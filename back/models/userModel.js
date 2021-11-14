const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    username :{
        type:String,
        require:true,
        trim: true,
        minlength: 3
    },
   password:String   
    
},{
    timestamps:true
},{
    fields:mongoose.Schema.Type
   }, { collection: 'users'})

const User = mongoose.model('User', userSchema);

module.exports = User;