const router = require('express').Router()
const Client = require('./../models/clientModel.js')

router.get('/' , (req , res)=>{
    Client.find().then(result=>{
        res.json(result)
    }).catch(err=>console.log(err))
})



router.post('/add' , (req , res)=>{
   
    const user = new Client({
        name:req.body.name,
        address:req.body.address,
        phone:req.body.phone
    })

    user.save().then((result)=>{
        res.send("ok")
    }).catch(err=>console.log(err))
    
})

router.post("/delete/:id",(req,res)=>{
   
    Client.findByIdAndDelete(req.params.id).then(result=>{
        res.send("ok")
    }).catch(err=>console.log(err))
})

router.post("/update/:id",(req,res)=>{
   
    Client.findByIdAndUpdate({_id:req.params.id},{name:req.body.name,phone:req.body.phone,address:req.body.address}).then(result=>{
        res.send("ok")
    }).catch(err=>console.log(err))
})





module.exports = router