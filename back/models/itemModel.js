const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    ItemName :{
        type:String,
        require:true,
        trim: true,
        minlength: 3
    },
    img: String,
   
    brand : String,
    price:Number,
    desc:String 
   
    
},{
    timestamps:true
},{
    fields:mongoose.Schema.Type
   }, { collection: 'items'})

const Item = mongoose.model('Item', userSchema);

module.exports = Item;