import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'
import { Fragment } from 'react'
import nextId from "react-id-generator";
export default class AddInvoice extends Component {
    state={
        itemsInDb:[],
        total:0,
        desc:"",
        brand:"",
        PaidOrNot:"غير مدفوع",
        ClientsInDB:[],
        InvoiceItems:[],
        clientId:""
        ,records:[]
    }

    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className='p-2 px-3 add-invoice-side text-white-50 position-fixed' style={{overflowY:"auto"}} >
               <div className='d-flex justify-content-between align-items-center'>
                    <h6 style={{transform:"translateY(20px)"}}>أضافة فاتورة</h6>

                            <div style={{width:"22%"}}  className='d-flex text-white  justify-content-between align-items-center ' >
                                <p id='total-price'  style={{fontSize:"20px"}}>0</p>
                                
                                <p style={{fontSize:"20px"}}>: الكلي</p>
                            </div>

                    <i style={{cursor:"pointer",fontSize:"40px"}}  class="fa fa-times fa-lg align-self-end" aria-hidden="true" onClick={this.props.CloseSideMenu}></i>
               </div>


                <div className='mt-5'>

                    <div className='d-flex justify-content-between align-items-center'>

                        <select onChange={(e)=>{
                           
                            this.setState({
                                clientId:e.target.value
                            })
                        }}  id='select-client-invoice' style={{outline:"none"}} className='p-2 px-2 main-back text-white-50 border-white-50 border-1'>
                                {
                                    this.state.ClientsInDB.map(item=>{
                                        
                                        return (
                                                <option className='main-back' value={item._id} selected>{item.name}</option>
                                               )
                                    })
                                }
                                
                        </select>

                        <select onClick={(e)=>{
                            this.setState({
                                PaidOrNot:e.target.value
                            })
                        }}  style={{outline:"none"}} className='py-2 border-white-50 border-1  px-2 main-back text-white-50 ' >
                                       
                                        <option value='yes'>
                                            مدفوع
                                        </option>

                                        <option value='no' selected>
                                            غير مدفوع 
                                        </option>

                                       

                        </select>


                       

                        <textarea id='addinvoiceteaxtarea'  maxLength="150px"   onChange={(e)=>{
                            this.setState({
                                desc:e.target.value
                            })
                        }} rows='1' style={{width:"40%"}}  className='input-add-invoice text-white-50 border-white-50 ' placeholder='ملاحظات' />
                       
                        

                       <button onClick={this.saveInvoice} className='btn  btn-info py-2 px-5'>حفظ</button>   

                    </div>

                         {/* divider */}

                         <div className='main-back my-2 w-100' style={{height:"3px"}} ></div>
                     {/* records */}

                     <div className='d-flex mt-2 align-items-center justify-content-between'>

                     <select id='select-items-invoice' style={{outline:"none",width:"45%"}} className='p-1  px-3  text-white-50 border-white-50 border-1 main-back'>
                                {
                                    this.state.itemsInDb.map(item=>{
                                        return (
                                            <option className='main-back' value={item._id}  selected>{item.ItemName}  </option>
                                        )
                                    })
                                }
                                
                        </select>

                                    <input onChange={(e)=>{
                                        if(e.target.value<=0){
                                            e.target.value = 1
                                        }
                                    }} id='quantity-input'  type='number' className='input-add-invoice text-white-50 border-white border-1' placeholder='الكمية' />
                                        
                                   
                                    <button onClick={this.addrecord} style={{borderRadius:"0"}}  className='border-white border-1 py-2  main-back px-3 btn btn-sm btn-dark d-flex align-items-center justify-content-between'>
                                        <p style={{marginRight:"15px"}}> اضافة حقل</p><i class="fa fa-plus fa-lg" aria-hidden="true"></i>
                                    </button>
                                    
                    </div>

                         {/* divider */}

                         <div className='main-back my-2 w-100' style={{height:"3px"}} ></div>
                                
                          
                              <table class="table table-borderless text-center table-striped"  >
                                  <thead>
                                
                                      <tr>
                                          <th className='text-white' style={{fontSize:"21px"}}>البراند</th>
                                          <th className='text-white' style={{fontSize:"21px"}}>السعر</th>
                                          <th className='text-white' style={{fontSize:"21px"}}>الكمية</th>
                                          <th className='text-white' style={{fontSize:"21px"}}>اسم المادة</th>
                                          <th className='text-white' style={{fontSize:"21px"}}>حذف</th>
                                          
                                      </tr>
                                  </thead>
                                  <tbody style={{height:"200px !important",overflowY:"auto"}}>
                                     
                                  {
                                        this.state.records.map(item=>{

                                            return (
                                                 <Fragment >

                                                     <tr >
                                                        <td className='text-white-50' style={{fontSize:"18px"}}  scope="row">{item.brand}</td>
                                                        <td className='text-white-50' style={{fontSize:"18px"}} >{item.priceQun}</td>
                                                        <td className='text-white-50' style={{fontSize:"18px"}} >{item.quantity}</td>
                                                        <td className='text-white-50' style={{fontSize:"18px"}} >{item.ItemName}</td>
                                                        <td className='text-white-50' style={{fontSize:"18px"}} > <p onClick={()=>{
                                                                        this.removeRecord(item.RecordId)
                                                                    }} className='text-white-50' style={{fontSize:"18px" ,cursor:"pointer"}}><i class="fa fa-minus fa-2x text-danger" aria-hidden="true"></i></p></td>
                                                    </tr>                                           
                                      
                                                                    

                                                   
                                                 </Fragment>
                                              
                                            )

                                            
                                        })
                                    }

                                  </tbody>
                              </table>
                                
                          
                                {/*invoices  */}
                        
                       
                        

                                  
                        


                        
                </div>
            </div>
        )
    }

    componentDidMount=()=>{
        this.getAllClients()
        this.getAllItems()
       
    }


    getAllClients=()=>{
        axios.get('http://localhost:5000/clients').then(res=>{
            this.setState({ClientsInDB:res.data})
        })
    }

    getAllItems=()=>{
        axios.get('http://localhost:5000/items').then(res=>{
            this.setState({itemsInDb:res.data})
        })


        
    }

    addrecord=()=>{ 
        var item1 = this.state.itemsInDb.filter(item=>item._id==$('#select-items-invoice').val())
        var item = [{
            _id:item1[0]._id
            ,
            RecordId:nextId(),
            ItemName:item1[0].ItemName,
            price:item1[0].price,
            brand:item1[0].brand,
            quantity:$('#quantity-input').val(),
            priceQun:item1[0].price*$('#quantity-input').val()
        }]
        this.setState({
            records:[...this.state.records,item[0]]
        })
        var ppp
        setTimeout(() => {
           
              ppp = 0

            for(var i=0;i<this.state.records.length;i++){
                ppp = ppp+this.state.records[i].priceQun
               
                     }
                     $('#total-price').html('$ '+ ppp );
                    this.setState({
                        total:ppp
                    })
        }, 100);
      
        
    }


    removeRecord=(id)=>{
        
        var temp = this.state.records.filter(item=>item.RecordId!=id)
        this.setState({
                records:temp
        })
        setTimeout(() => {
           
            var  ppp = 0

            for(var i=0;i<this.state.records.length;i++){
                ppp = ppp+this.state.records[i].priceQun
                
                     }
                     $('#total-price').html('$ '+ ppp );
        }, 100);
    }

    saveInvoice=()=>{
       
        var isss = {
            
            clientId:this.state.clientId,
            desc:this.state.desc
            ,paid:this.state.PaidOrNot,
            total:this.state.total,
            items:[...this.state.records]
        }

        axios.post('http://localhost:5000/invoices/add',isss).then(res=>{
           if(res.data=='ok'){
            this.props.CloseSideMenu()
            $('input').val('');
            this.setState({
                records:[],total:0
            })
            $('#total-price').html('$ 0');
            this.props.getAllInvoices()

           }
        }).catch(err=>console.log(err))

    }
    
}
