import React, { Component } from 'react'
import './clients.css'
import axios from 'axios'
import $ from 'jquery'
import ClientCard from './ClientCard'
export default class Clients extends Component {

    state={
        clientName:undefined,
        ClientPhone:Number,
        ClientAddress:undefined,
        AllClientsPhones:[],
        SelectClientsPhones:[],
        BottomNotVisableNot:false,
        clients:[]
     
    }

    

    componentDidMount=()=>{
        this.getClients()
    }

    getClients=()=>{
        axios.get("http://localhost:5000/clients").then(res=>{
            this.setState({
                clients:res.data
            })
        }).catch(err=>console.log(err))
    }

  

    render() {
        return (
            <div className='container-fluid mt-4 ' style={{overflowY:"auto",letterSpacing:"0.08ch"}}>
                <div class="row" style={{overflowX:"hidden"}}>
                    <div class="col-8">
                        <div class="row ">
                             {
                                this.topSearchHtml()
                            }
                        </div>
                        <div class="row mt-3" style={{transform:"translateX(5px)"}} >
                          
                           {
                               this.state.clients.map(item=>{
                                   return (
                                       <ClientCard   deleteClient={this.deleteClient}  phones={this.state.AllClientsPhones} item={item} />
                                   )
                               })
                           }
                        </div>

                    </div>

                    <div class="col-4 ">
                        {
                            this.CreateClientForm()
                        }

                        

                        {   
                            this.UpdateClientForm() 
                        
                        }

                        {
                            this.state.BottomNotVisableNot && 
                              
                                     <span   id="side-not" class="alert  alert-info alert-not mt-5" >
                                        Fill All Fields Defualt Html
                                     </span>
                               
                        }
                    </div>



                </div>

               
            </div>
        )
    }





    CreateClientForm=()=>{
        return(
            <div >
                <input type="text" className="input-create form-control" name="name" placeholder="Client Name" onChange={(e)=>{
                    this.setState({clientName:e.target.value})
                }} />
                <input type="number" className="input-create form-control my-3"  onChange={(e)=>{
                    this.setState({ClientPhone:e.target.value})
                }}  name="Phone" placeholder="Client What's App Phone Number" />
                <input type="text"  className="input-create form-control mb-3" onChange={(e)=>{
                    this.setState({
                        ClientAddress:e.target.value
                    })
                }} name="address" placeholder="Client Address" />
                <button className='btn btn-create  btn-sm btn-outline-primary w-100 mx-auto' onClick={this.CreateClient}>Add</button>
            </div>
        )
    }

    CreateClient=()=>{
        var self = this
        
        let isEmpty = 0 ;
        $(".input-create").each(function(){
            if($(this).val()==""){
              
               isEmpty= 1
            }
        })

        if(isEmpty==0){
            if(self.state.ClientPhone.length<=9 || self.state.ClientPhone.length>11){
                
                
            $(document).ready(function(){
                $('#side-not').text(' يجب ان يكون الرقم 10 ارقام او 11');
              });
                self.setState({
                    BottomNotVisableNot:true
                })

                setTimeout(() => {
               
                    $('#side-not').css("transform",'translateX(120%)');
                }, 5000);

                setTimeout(() => {
                    self.setState({
                        BottomNotVisableNot:false
                    })
                }, 6000);
               
            }else{
                var list =  {
                    name:self.state.clientName,
                    phone:self.state.ClientPhone,
                    address:self.state.ClientAddress
               }
                
                axios.post("http://localhost:5000/clients/add",list).then(result=>{
                 
                    if(result.data=="ok"){
                        self.getClients()
                        $('input').val("");
                        self.setState({
                            BottomNotVisableNot:true
                        })
    
                        $(document).ready(function(){
                            $('#side-not').text('تمت اضافة العميل');
                        });
    
                        setTimeout(() => {
                       
                            $('#side-not').css("transform",'translateX(120%)');
                        }, 5000);
                        
    
    
                        setTimeout(() => {
                        
                        self.setState({
                            BottomNotVisableNot:false
                        })
                        }, 7300);
    
                    }
                }).catch(err=>console.log(err))
            }
          
        }else{
            
               $(document).ready(function(){
            $('#side-not').text('يرجا ملآ الحقول');
        });

            self.setState({
                BottomNotVisableNot:true
            })
            
            

            setTimeout(() => {
                   
                $('#side-not').css("transform",'translateX(120%)');
                }, 5000);

            setTimeout(() => {
           
            self.setState({
                BottomNotVisableNot:false
            })
            }, 7300);

        }
            self.setState({
                    BottomNotVisableNot:true
                })
             
           

           
       
       
      
    }

    deleteClient=(id)=> {
        
       
        axios.post("http://localhost:5000/clients/delete/"+id).then(res=>{
            if(res.data=="ok"){
                $('.alert-not').html('Client Has been deleted'); 

                var temp = []

                temp = this.state.clients.filter(item=>item._id!=id)

                this.setState({
                    clients:temp
                })

                this.setState({
                    BottomNotVisableNot:true
                })

                $('.alert-not').html("Client Has Been Deleted")

                setTimeout(() => {
               
                    $('.alert-not').css("transform",'translateX(120%)');
                }, 5000);

                setTimeout(() => {
                    this.setState({
                        BottomNotVisableNot:false
                    })
                }, 6000);
            }
        }).catch(err=>console.log(err))
    }

    UpdateClientForm=()=>{
        return(


            <div className="mt-5 update-comp" >
            <input id="update-client-name" type="text" className="form-control" name="name" placeholder="اسم العميل" onChange={(e)=>{
            
            }} />

            <input type="hidden" id="cust-hidden-value" name="custId" value="3487"/>

            <input id="update-client-phone" type="number" className="form-control my-3"  onChange={(e)=>{
               
            }}  name="Phone" placeholder="رقم العميل" />
            <input type="text"  className="form-control mb-3" onChange={(e)=>{
              
            }} name="address" id="update-client-address"  placeholder="العنوان" />
            <button className='btn btn-create  btn-sm btn-outline-primary w-100 mx-auto' onClick={()=>{
                // console.log($('#cust-hidden-value').val());
                this.updateClientRequest($('#cust-hidden-value').val())
            }}>Update</button>
        </div>
        )
    }

    updateClientRequest=(id)=>{
        var form = {
           name : $('#update-client-name').val(),
           phone :  $('#update-client-phone').val(),
           address : $('#update-client-address').val()
        }
        axios.post("http://localhost:5000/clients/update/"+id,form).then(res=>{
            if(res.data=='ok'){
                $('.update-comp').css("transform","TranslateX(180%)");
                this.getClients()
                $(document).ready(function(){
                    $('#side-not').text('تم تعديل العميل');
                });
                
                $('input').val("")
                this.setState({
                    BottomNotVisableNot:true
                })

                setTimeout(() => {
               
                    $('.alert-not').css("transform",'translateX(120%)');
                }, 5000);

                setTimeout(() => {
                    this.setState({
                        BottomNotVisableNot:false
                    })
                }, 6000);
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    

    topSearchHtml=()=>{
            return (
                <div className="d-flex  w-75">
                    <input type='text' dir="rtl" className='form-control' placeholder="بحث بأسم العميل" onChange={(e)=>{
                        this.searchFunction(e.target.value)
                    }} />
                </div>
            )
    }


    searchFunction=(word)=>{
           if(word.length>=3){
            var temp = this.state.clients.filter(item=>item.name.includes(word))
            this.setState({
                clients:temp
            })
           }else{
               this.getClients()
           }
        
    }
}
