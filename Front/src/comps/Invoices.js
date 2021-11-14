import React, { Component } from 'react'
import axios from 'axios'
import AddInvoice from './AddInvoice'
import $ from 'jquery'
import SingleInvoice from './SingleInvoice'

export default class Invoices extends Component {
    state={
        invoices:[],
        IdToDelete:""
        ,backupInv:[]
    }

    render() {
        return (
            <div className='container-fluid d-flex flex-column  text-capitalize px-4 mt-4 '>
                {/* items dots on hover */}
            {
                <div id='dots-list-onhover' className='p-3'  >
                  

                  <div className='d-flex justify-content-between align-items-center'>

              
                {/* quantity */}
                 <p id='itemQunHoverList' className='text-white'></p>

                  <i onClick={(e)=>{
                        $('#dots-list-onhover').css('right', '-100%');
                    }}  className=" text-white-50  fa fa-times fa-2x"    aria-hidden="true"></i>

                  </div>
               
                    {/* header */}

                    <p className='mt-4 text-white-50 p-2' style={{fontSize:"20px"}} id='notes-invoice-hover'></p>

                  
                    {/* side table  */}
                  <table className="table text-white-50 table-responsive table-borderless mt-5   text-center w-100" style={{overflowY:"auto"}}  dir="rtl">
                        <thead>
                            <tr className='text-white'>
                                <th><p style={{fontSize:"21px"}}>اسم المادة</p></th>
                                <th><p style={{fontSize:"21px"}}>الكمية</p></th>
                                <th><p style={{fontSize:"21px"}}>البراند</p></th>
                                <th><p style={{fontSize:"21px"}}>المبلغ</p></th>                
                            </tr>
                        </thead>
                        <tbody id='div-to-be-inserted' className='w-100' >
                        
                        </tbody>
                    </table>

                  

                   

                </div>
                
            }

              {
                  this.topTools()
              }

                {/* open and close in css */}
                <AddInvoice getAllInvoices={this.getAllInvoices} CloseSideMenu={this.CloseSideMenu} />
               
                
                {/* all invoices */}
                <div className='w-100 list-group-item-secondary my-3' style={{height:"3px"}}  />



                   <table  class="table table-striped table-responsive text-center  table-borderless" dir='rtl'>
                       <thead>
                           <tr className=' '  style={{fontStyle:"normal"}}>
                               <th scope="col">اسم العميل</th>
                               <th scope="col">المادة</th>
                               <th scope="col">الكمية</th>
                               <th scope="col">الحالة</th>
                               <th scope="col">الكلي</th>
                               <th scope="col">تاريخ ووقت الفاتورة</th>
                               <th scope="col">#</th>
                           </tr>
                       </thead>
                       <tbody>
                          

                           {
                            this.state.invoices.map(inv=>{
                                return (
                                    <SingleInvoice deleteInvoice={this.deleteInvoice} item={inv} />
                                )
                            })
                          }

                       </tbody>
                   </table>
                        <div className='delete-confirmation w-100 main-back justify-content-evenly p-5 align-items-center' dir='rtl' >
                        <i style={{cursor:"pointer"}}  onClick={this.deleteConfirmationHideDiv} className="fa fa-times fa-2x text-white-50" aria-hidden="true"></i>
                            <p style={{fontSize:"30px"}} className='text-white-50' dir="rtl">تأكيد حذف الفاتورة</p>
                            <button className='btn btn-danger btn-sm py-2 px-5' onClick={(e)=>{
                                this.deleteInvoiceRequest()
                            }}>تأكيد</button>

                          
                        </div>  
            </div>
        )
    }

   
    
    componentDidMount=()=>{
         this.getAllInvoices()
        

        
         
    }

    getAllInvoices=()=>{
        axios.get('http://localhost:5000/invoices').then(res=>{
            this.setState({
                invoices:res.data  ,
                backupInv:res.data
            })
        })
    }

    openAddInvoiceSideMenu=()=>{
        $('.add-invoice-side').css('transform','translateX(0%)' );
    }

    CloseSideMenu=()=>{
        $('.add-invoice-side').css('transform','translateX(130%)' );
    }


    topTools=()=>{
       return(
         <div  className='d-flex justify-content-lg-between align-items-center'>

             <h6>عدد الفواتير : {this.state.invoices.length}</h6>


             <button  className='btn btn-sm btn-dark  main-back px-5 py-2 ' style={{borderRadius:"0"}}  onClick={this.openAddInvoiceSideMenu}>اضافة فاتورة</button>

             <input type='text' onChange={(e)=>{
                 this.searchFunc(e.target.value)
             }}  className='invoice-input-search main-back w-25  p-2 px-4 text-white border-0 ' placeholder='بحث اسم العميل' />


             <div className='d-flex align-items-center'>

                <select onChange={(e)=>{
                    this.searchPaidData(e.target.value)
                }}  className='px-4 py-2 border-0 main-back text-white ' style={{borderRadius:"0",outline:"none",marginRight:"17px"}}>
                      <option value='all'>الكل</option>
                    <option value='yes'>المدفوعة</option>
                    <option value='no'>الغير مدفوعة</option>
                </select>

                <h6 style={{transform:"translate(0,3px)"}}> :  فلترة الفواتير </h6>

             </div>

             <input type='date' onChange={(e)=>{
                 this.searchDate(e.target.value)
             }}  className='invoice-input-search main-back p-2 px-4 text-white border-0' />

         </div>  
       )
    }


    searchFunc=(word)=>{
        if(word.length>=3){
           // console.log(word);
            var temp=this.state.invoices.filter(item=>item.clientName.includes(word))
            this.setState({invoices:temp})
        }else{
            this.setState({invoices:this.state.backupInv})
        }
    }

    searchDate=(date)=>{
        if(date==''){
            this.setState({invoices:this.state.backupInv})
        }else{
            var custD=date.split('-')[1]+"/"+date.split('-')[2]+"/"+date.split('-')[0]
            var SearchDate = new Date(custD).toLocaleString()
            var now = new Date().toLocaleString()
            var temp = this.state.backupInv.filter(item=>custD== item.Date.split(",")[0] )
            this.setState({invoices:temp})
        }
    }


    deleteInvoice=(id)=>{
        this.setState({IdToDelete:id})
      
        $('.delete-confirmation').css('display',"flex");

        setTimeout(() => {
            $('.delete-confirmation').css('bottom',"0%");
        }, 100);
    }


    deleteConfirmationHideDiv=()=>{
        $('.delete-confirmation').css('bottom',"-50%");
                setTimeout(() => {
                     $('.delete-confirmation').css('display',"none");
                }, 300);
    }


    deleteInvoiceRequest=()=>{
        console.log(this.state.IdToDelete);
         axios.post('http://localhost:5000/invoices/delete/'+this.state.IdToDelete).then(res=>{
            if(res.data=='ok'){
               
                $('.delete-confirmation').css('bottom',"-50%");
                setTimeout(() => {
                     $('.delete-confirmation').css('display',"none");
                }, 300);
                var temp = this.state.invoices.filter(item=>item._id!=this.state.IdToDelete)
                this.setState({invoices:temp})
            }
        }).catch(err=>console.log(err))
    }


    searchPaidData=(ddd)=>{
        console.log(ddd);
     if(ddd=='no'){
        var temp = this.state.backupInv.filter(item=>item.Paid=='no')
        this.setState({
            invoices:temp
        })
     }
      else  if(ddd=='all'){
        this.setState({invoices:this.state.backupInv})
     }
     else{
        var temp = this.state.backupInv.filter(item=>item.Paid=='yes')
        this.setState({
            invoices:temp
        })
     }

    



    }

}
