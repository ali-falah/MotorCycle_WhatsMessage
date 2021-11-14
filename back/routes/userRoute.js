const router = require('express').Router()
const User = require('./../models/userModel.js')

router.get('/' , (req , res)=>{
    User.find().then(result=>{
        res.json(result)
    }).catch(err=>console.log(err))
})



router.post('/add' , (req , res)=>{
   
    const user = new User({
        username:req.body.username,
        password:req.body.password,
    })

    user.save().then((result)=>{
        res.send("ok")
    }).catch(err=>console.log(err))
    
})

router.post("/delete/:id",(req,res)=>{
    User.findByIdAndDelete(req.params.id).then(result=>{
        res.send("ok")
    }).catch(err=>console.log(err))
})

router.post("/update/:id",(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},{username:req.body.username,password:req.body.password}).then(result=>{
        res.send("ok")
    }).catch(err=>console.log(err))
})





module.exports = router