const router = require('express').Router()
const Item = require('./../models/itemModel.js')
const multer = require('multer')
const path = require('path');
const { unlink } = require('fs');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images');

    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage })

router.get('/' , (req , res)=>{
    Item.find().then(result=>{
        res.json(result)
    }).catch(err=>console.log(err))
})




router.post('/add' ,upload.single('img'), (req , res)=>{
    
    const new1 = new Item({
        ItemName: req.body.itemName,
        price: req.body.price,
        img: req.file.filename,
        brand: req.body.brand,
        desc:req.body.desc
    })

    new1.save().then((result) => res.json("ok"))
        .catch(err => console.log(err))
    
})

router.get('/brands',(req,res)=>{
    Item.find({},{brand:true}).then(result=>{
        res.json(result)
    })
})

router.post("/delete/:id",(req,res)=>{
    var imgUrl = './images/'+req.body.img
    unlink(imgUrl,(err)=>{
        console.log(err);
    })
  
    Item.findByIdAndDelete({_id:req.params.id}).then(result=>{
        res.json("ok")
    }).catch(err=>console.log(err))
})

router.post("/update/:id",upload.single('img'),(req,res)=>{
    if(req.file==undefined){
         Item.findByIdAndUpdate({_id:req.params.id},{ItemName:req.body.name,price:req.body.price,brand:req.body.brand
        
        }).then(result=>{
            res.send("ok")
        }).catch(err=>console.log(err))
    }else{
        var imgUrl = './images/'+req.body.oldImageName
        unlink(imgUrl,(err)=>{
            console.log(err);
        })
        Item.findByIdAndUpdate({_id:req.params.id},{ItemName:req.body.name,price:req.body.price,brand:req.body.brand
            , img: req.file.filename,
            }).then(result=>{
                res.send("ok")
            }).catch(err=>console.log(err))
    }
   
})


router.post('/getOnlyName/:id',(req,res)=>{
  
    Item.findById(req.params.id).then(result=>{
      
        res.json(result)
    }).catch(err=>console.log(err))
})

module.exports  = router