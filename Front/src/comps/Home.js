import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import HomePaidModify from './HomePaidModify'
export default class Home extends Component {

    state={
        invoicesTotal:0,
        clientsTotal:0,
        UnPAidInvoices:[],
        itemsTotal:0,
        admins:[],
        username:"",
        password:"",
        userIdToUpdate:''
    }



    componentDidMount=()=>{
        this.getStatisticsInfo()
        this.getAdminsFromDb()
    }

    render() {
       

        return (
            <div className='container'>

            {this.TopStattistics()}


            <div className='w-100 dropdown-divider my-3' style={{height:"8px"}}></div>

            {/* dividre */}

            {this.AdminData()}

            </div>
        )
    }


    TopStattistics=()=>{
        return (
            <div className='d-flex justify-content-between mt-4  ' dir='rtl'>

                <HomePaidModify closeModifyPaid={this.closeModifyPaid} items={this.state.UnPAidInvoices}/>
                {/* slide */}

                <div className='top-static-card p-5 main-back text-white-50  '>
                            عدد العملاء الكلي : {this.state.clientsTotal}
                </div>

                
                <div className='top-static-card mx-2 p-5 main-back text-white-50 '>
                             عدد المواد الكلي : {this.state.itemsTotal}
                </div>
                
                <div className='top-static-card p-5 main-back text-white-50 '>
                             عدد الفواتير الكلي : {this.state.invoicesTotal}
                </div>
                
               {
                   this.state.UnPAidInvoices.length>0 ? 
                    <div onClick={this.showModifyPaid} className='top-static-card ml-2 p-5  text-white-50 ' style={{backgroundColor:"#8D2E2E",cursor:"pointer"}}>
                   عدد الفواتير الغير مدفوعة : {this.state.UnPAidInvoices.length}
                   </div> 
                   
                   :

                   <div className='top-static-card ml-2 p-5 bg-success text-black '>
                   عدد الفواتير الغير مدفوعة : {this.state.UnPAidInvoices.length}
                   </div>
                  
               }


            </div>
        )
    }


    getStatisticsInfo=()=>{
        axios.get('http://localhost:5000/items').then(res=>{
            this.setState({
                itemsTotal:res.data.length
            })
        })

        axios.get('http://localhost:5000/clients').then(res=>{
            this.setState({
                clientsTotal:res.data.length
            })
        })


        axios.get('http://localhost:5000/invoices').then(res=>{
            this.setState({
                invoicesTotal:res.data.length
            })
        })

        var temp = []
        axios.get('http://localhost:5000/invoices/getPaidRecordsOnly').then(res=>{
            res.data.forEach(element => {
                if(element.Paid=="yes" || element=='مدفوع'){
                    
                }else{
                    temp.push(element)
                }
            });

            this.setState({
                UnPAidInvoices:temp
            })
        })

    }

    showModifyPaid=()=>{
        $('#piad-modify-slide').css('right', '0%');
    }

    closeModifyPaid=()=>{
        $('#piad-modify-slide').css('right', '-50%');
    }


    AdminData=()=>{
        return (
            <div className='' dir='rtl'>

               <div class="row justify-content-lg-between">
                   <div class="col-5">
                       
                        <input id='username-input' onChange={(e)=>{
                            this.setState({username:e.target.value})
                        }} type='text' className='form-control' placeholder='اليوزر نيم'  />
                        <input id='passwprd-input'  onChange={(e)=>{
                            this.setState({
                                password:e.target.value
                            })
                        }} type='password' className='form-control mt-2' placeholder='كلمة السر'  />
                        <button id='button-add'  onClick={this.addUSer}  className='btn btn-sm btn-info py-2 mt-3 px-5 w-100' >أضافة المستخدم</button>


                        <a  className='text-dark' href='http://localhost:5000/auth/getqr' style={{
                            position:"absolute",bottom:"10%",right:"26%",
                            fontSize:"30px"
                        }}> اربط جهازك</a>  
                   </div>


                    <div class="col-6 ml-3">
                        
                                    <table class="table table-responsive table-borderless text-center">
                                    <thead>
                                        <tr>
                                            <th>اسم المستخدم</th>
                                            <th>كلمة السر</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.admins.map(item=>{
                                            
                                            return (
                                                <tr className='text-black-50'>
                                                    <td>{item.username}</td>
                                                    <td>*********</td>

                                                    <td className='d-flex align-items-center'>

                                                       {
                                                           item._id=='618f9f3c2bc3b7552741294c' ?   <p >None</p>
                                                         
                                                           :

                                                           <i onClick={(e)=>{
                                                            this.deleteUser(item._id)
                                                             }} class="fa fa-trash fa-lg bg-light" style={{marginLeft:"20px",cursor:"pointer"}} aria-hidden="true"></i>
                                                       }
                                                       {
                                                           item._id!='618f9f3c2bc3b7552741294c' &&  <i onClick={(e)=>{
                                                                this.updateUser(item._id)
                                                            }}  class="fa fa-pencil fa-lg text bg-light" style={{cursor:"pointer"}}  aria-hidden="true"></i>
                                                       }
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                    
                                    </tbody>
                                </table>



                    </div>

               </div>
            </div>
        )
    }


    addUSer=()=>{
       if(!$('#button-add').html().includes('تعديل')){
        if(this.state.password!='' && this.state.username!=''){
            var user = {
                username:this.state.username,
                password:this.state.password
            }
            axios.post('http://localhost:5000/users/add',user).then(res=>{
              if(res.data=='ok'){
                this.getAdminsFromDb()
                $('input').val('');
              }
            })
        }
       }else{
        var user = {
            username:this.state.username,
            password:this.state.password
        }
        axios.post('http://localhost:5000/users/update/'+this.state.userIdToUpdate,user).then(res=>{
          if(res.data=='ok'){
            this.getAdminsFromDb()
            $('input').val('');
            $('#button-add').html("اضافة المستخدم");
          }
        })
       }
    }


    deleteUser=(id)=>{
        axios.post('http://localhost:5000/users/delete/'+id).then(res=>{
            this.getAdminsFromDb()
        }).catch(err=>console.log(err))
    }


    updateUser=(id)=>{
        //write code to show user
        var temp  = this.state.admins.filter(item=>item._id==id)
        $('#username-input').val(temp[0].username);
        $('#passwprd-input').val(temp[0].password);
        $('#button-add').html("تعديل المستخدم");
        this.setState({userIdToUpdate:id})
       
    }


    getAdminsFromDb=()=>{
        axios.get('http://localhost:5000/users/').then(res=>{
            this.setState({
                admins:res.data
            })
        })
    }

}
