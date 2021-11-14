const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    ClientId :{
        type:String,
        require:true,
        trim: true,
    },
    clientName:String
    ,
    total:Number,
    Paid:String,
    Date:String,
    items:[{
        itemId: String,
        ItemName:String,
        brand:String,
        price:Number, 
        quantity:Number,
        priceQun:Number,
        RecordId:String
    }]
   ,
   desc:String
   
   
},{
    timestamps:true
},{
    fields:mongoose.Schema.Type
   }, { collection: 'Invoices'})

const Invoice = mongoose.model('Invoice', userSchema);

module.exports = Invoice;