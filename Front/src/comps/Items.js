import React, { Component } from 'react'
import $ from 'jquery'
import Item from './item'
import axios from 'axios'

export default class Items extends Component {
    state ={
        items:[],
        itemName:undefined,
        brand:undefined,
        price:Number,
        desc:undefined,
        img:null,
        backupItems:[],
        UpdateImage:null,
        updateOldImageName:"",
        updateId:""
        }

       componentDidMount= ()=>{
        this.getAllItems()
        this.getBrands()

       }    

       getAllItems=()=>{
           //get All items
           axios.get("http://localhost:5000/items").then(res=>{
               
                   this.setState({items:res.data,backupItems:res.data})
           
           }).catch(err=>console.log(err))
       }

    render() {
        return (
            <div className='container-fluid items-conatiner text-capitalize d-flex flex-column mt-4' >
                

               
            <div class="row">
                

                <div class="col-9">
                {
                    this.topFilterSearchTools()
                }
                  
                        {/* items in Here */}
                        <div class="row mt-4 w-100">
                    {
                        this.state.items.map(item=>{
                            return (
                                 
                                <Item item={item} deleteItem={this.deleteItem} updateItem={this.updateRequest} />
                            )
                        })
                    }
                   </div>
                </div>


                <div class="col-3" style={{position:"relative"}}>
                    {
                        this.createItemForm()
                    }


                    <div className="bg-secondary my-3" style={{width:"100%",height:"3px"}}></div>

                    {
                        this.updateForm()
                    }

                    <div className='alert alert-info alert-items-page' style={{position:"absolute",top:"100%"}} >
                        Please fill defualt
                    </div>
                </div>



            </div>

            </div>
        )
    }

    searchWord=(word)=>{
 

        if(word.length>=3){
            var temp = []
            temp = this.state.items.filter(item=>item.ItemName.includes(word))
            this.setState({
                items:temp
            })
        }else{
           this.getAllItems()
        }

    }

    filterBrand=(word)=>{
      
    
        if(word=='all'){
           this.setState({
             items:this.state.backupItems
           })
           
        }else{
          var temp = this.state.backupItems.filter(item=>item.brand.includes(word))
         this.setState({
             items:temp
         })
        }
    }

    topFilterSearchTools=()=>{
        return (
            <div className='d-flex align-items-center justify-content-between'>
                <input onChange={(e)=>this.searchWord(e.target.value)} className="form-control w-50" placeholder='بحث بالاسم' />

               <div className='d-flex align-self-center'>
                        <select className='m-brands' onChange={(e)=>{
                            this.filterBrand(e.target.value)
                        }}  name="m-brands-filter" id="m-brands-filter" style={{marginRight:"20px"}}>
                      <option value='all' >All</option>
                      </select>

                    <label for="m-brands-filter" >  :  فلتر النوعية</label>

                
               </div>

            </div>
        )
    }


    getBrands=()=>{
        $('#m-brands-filter').empty()
        $('#m-brands-filter').append(" <option value='all' >All</option>")
        

        axios.get('http://localhost:5000/items/brands').then(res=>{
          res.data.map(item=>{
            $('#m-brands-filter').append('<option value="'+item.brand+'">'+item.brand+'</option> ');
          })
        }).catch(err=>{
            console.log('====================================');
            console.log(err);
            console.log('====================================');
        })
    }

    createItemForm=()=>{
        return (
            <div >
                <input type='text'  className='input-create-item form-control mt-2' placeholder='الاسم' onChange={(e)=>{
                    this.setState({itemName:e.target.value})
                }}/>
                
                <textarea rows='2' type='text' className=' form-control my-3' placeholder='ملاحظات' onChange={(e)=>{
                    this.setState({
                        desc:e.target.value
                    })
                }} />
                <input type="file" id="file-input" onChange={(e)=>{
                     this.setState({img:e.target.files[0]})
                }} className=' input-create-item form-control' placeholder='اختيار صورة ' />
                <input onChange={(e)=>{
                    if(e.target.value<=0){
                        e.target.value = 1
                    }
                    this.setState({
                                 price:e.target.value               
                    })
                }}  type="number" className='input-create-item form-control my-3' placeholder='السعر' />
               
               <div className='d-flex justify-content-lg-between align-items-center'>
                
                

               <button style={{width:"45%"}}  className="btn btn-sm btn-info text-dark" onClick={this.addItemToDb} >اضافة المادة</button>

                
               
                        <input type="text" onChange={(e)=>{
                            this.setState({
                                brand:e.target.value
                            })
                        }}  style={{width:"45%"}} placeholder="البراند او الموديل" name="m-brands-add" className="ml-3 form-control" id="m-brands-add" >
                      
                      </input>

                

                
            
               </div>
            </div>
        )
    }


    addItemToDb=()=>{

        let isEmpty = 0 ;
        $(".input-create-item").each(function(){
            if($(this).val()==""){
               isEmpty= 1
               console.log($(this));
            }
        })

        if(isEmpty==0){
                
        const url = 'http://localhost:5000/items/add';
        var formData = new FormData();

        formData.append('img',this.state.img)
        formData.append("itemName",this.state.itemName)
        formData.append("price",this.state.price)
        formData.append("desc",this.state.desc)
        formData.append("brand",this.state.brand)
        const config = {
            headers: {
                'Content-Type': `multipart/form-data; `,
            }
           
        }
        
        
          axios.post(url, formData,config).then((result) => {
            if(result.data=="ok"){
                $(".input-create-item").val("")
                $(document).ready(function () {
                    $('.alert-items-page').css('right','0%' );
                    $('.alert-items-page').html("تمت اضافة المادة ")
                });

                setTimeout(() => {
                    $('.alert-items-page').css('right','-180%' );
                }, 3000);

                this.getAllItems()
                this.getBrands()
            }
           
          }).catch((err) => {
              
          });

       
        }else{
            //write code to notify is empty
            $(document).ready(function () {
                $('.alert-items-page').css('right','0%' );
                $('.alert-items-page').html("يرجى ملآ الحقول اولا")
            });

            setTimeout(() => {
                $('.alert-items-page').css('right','-180%' );
            }, 3000);
           
        }

    }

    deleteItem=(id,imgName)=>{
        var data = {
            img:imgName
        }
       
        axios.post("http://localhost:5000/items/delete/"+id,data).then(res=>{
            if(res.data=='ok'){
                $(document).ready(function () {
                    $('.alert-items-page').css('right','0%' );
                    $('.alert-items-page').html("تم حذف  المادة ")
                });

                setTimeout(() => {
                    $('.alert-items-page').css('right','-180%' );
                }, 3000);
                this.getAllItems()
                this.getBrands()
            }
        })
    }

    updateForm=()=>{
        return (
            <div id='update-items-form'  className="mt-3 d-flex flex-column justify-content-md-between align-items-center">

                <input type='text' id='update-input-name' className='update-input form-control' placeholder='اسم المادة' />
                <textarea rows='2' id='update-input-desc' className='update-input form-control my-3' placeholder='ملاحظات' />
                <input onChange={(e)=>{
                     if(e.target.value<=0){
                        e.target.value = 1
                    }
                }}  type='number' id='update-input-price' className='update-input form-control' placeholder='السعر' />
                <input onChange={(e)=>{
                     this.setState({UpdateImage:e.target.files[0]})
                }}  type='file' id='update-input-file' className='update-input form-control my-3' placeholder='اختيار ملف' />
                  
               <div class="d-flex w-100 justify-content-between">
                <button className='btn btn-info btn-sm px-5' onClick={this.upDateItemInDb} >تعديل</button>
                <input type='text' id='update-input-brand' className=' w-50 update-input form-control' placeholder='البراند الو المودل' />
               </div>



            </div>
        )
    }

    updateRequest=(id,oldImageName)=>{
       
        var item = this.state.backupItems.filter(item => item._id==id)
        item = item[0]
        $('#update-input-name').val(item.ItemName);
        $('#update-input-desc').val(item.desc);
        $('#update-input-brand').val(item.brand);
        $('#update-input-price').val(item.price);
        this.setState({updateId:id,updateOldImageName:oldImageName})
        $('#update-items-form').css('transform', 'translateX(0%');
    }

    upDateItemInDb=()=>{
        

            const url = 'http://localhost:5000/items/update/'+this.state.updateId;
            var formData = new FormData();
            
            formData.append('img',this.state.UpdateImage)
            formData.append('name',$('#update-input-name').val())
            formData.append('price',$('#update-input-price').val())
            formData.append('brand',$('#update-input-brand').val())
            formData.append('desc',$('#update-input-desc').val())
            formData.append('oldImageName',this.state.updateOldImageName)
            const config = {
                headers: {
                    'Content-Type': `multipart/form-data; `,
                }
               
            }
            
            
              axios.post(url, formData,config).then((result) => {
                if(result.data=="ok"){
                    $('#update-items-form').css('transform', 'translateX(180%)');
                    $(document).ready(function () {
                        $('.alert-items-page').css('right','0%' );
                        $('.alert-items-page').html("تم تعديل المادة ")
                    });
    
                    setTimeout(() => {
                        $('.alert-items-page').css('right','-180%' );
                    }, 3000);
                    this.getAllItems()
                    this.getBrands()
                }
                
              }).catch((err) => {
                 console.log(err);
              });

    }
}



