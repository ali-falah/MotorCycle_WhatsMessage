const router = require('express').Router()
const Invoice = require('./../models/invoiceModel.js')
const Client = require('./../models/clientModel.js')
router.get('/' , (req , res)=>{
    Invoice.find().then(result=>{
        res.json(result)
    }).catch(err=>console.log(err))
})



router.post('/add' , (req , res)=>{
    
    Client.findById(req.body.clientId).then(result=>{
        
        const new1 = new Invoice({
            Date:  new Date().toLocaleString(),
            ClientId: req.body.clientId,
            clientName:result.name ,
            desc: req.body.desc,
            total: req.body.total,
            brand: req.body.brand,
            Paid:req.body.paid,
            items:req.body.items
        })
      
        new1.save().then((result) => res.json("ok"))
            .catch(err => console.log(err))
    }).catch(err=>console.log(err))

   
  
})


router.post('/delete/:id',(req,res)=>{
    
    Invoice.findByIdAndDelete(req.params.id).then(result=>{
        res.send('ok')
    }).catch(err=>console.log(err))
})

router.get('/getPaidRecordsOnly',(req,res)=>{
    Invoice.find({},{Paid:true,_id:true,Date:true,clientName:true,total:true}).then(result=>{
        res.json(result)
    })
})



module.exports = router