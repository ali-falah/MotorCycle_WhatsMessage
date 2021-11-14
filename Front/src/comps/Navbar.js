import React from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom'
export default function Navbar(props) {
    
    return (
        <div>
            
            <nav className="nav-cust px-2 d-flex flex-row  ">
                <a className="navbar-brand text-white" ><i class="fa fa-motorcycle fa-2x" aria-hidden="true"></i></a>
               
                
                    <ul className="nav-ul mx-auto ">
                        <li className="nav-item active">
                          
                            <Link to='/'>
                             <button className="nav-link" >الرئيسية</button>
                             </Link>
                        </li>
                        <li className="nav-item">
                            <Link to='invoices' >
                            <button className="nav-link" >الفواتير</button> </Link>
                        </li>


                        <li className="nav-item ">
                        <Link to='Items'> <button className="nav-link">المواد</button></Link>
                        </li>


                        <li className="nav-item ">
                        <Link to='clients'> <button className="nav-link">العملاء</button></Link>
                        </li>

                        <li className="">
                        <Link to='sendmessage'> <button className="nav-link">ارسال رسالة</button></Link>
                        </li>
                       

                        

                    </ul>
                   
                      
                   
                    {
                            
                            PhoneStatusLogic(props.PhoneStatus)
                    }


                     <h6 onClick={logout}  className='nav-link py-2 px-2   text-white' style={{transform:"translate(0,2px)"}}>تسجيل الخروج</h6>

                
            </nav>

        </div>
    )
  

 

    
}

function refreshAuthentication(){
    
    axios.get("http://localhost:5000/auth/clearauth").then(result=>{
        if(result.data=="ok"){
            window.location = "http://localhost:5000/auth/getqr"
        }
    })
}
    
  

function PhoneStatusLogic(status){
   

      if(status=="CONNECTED"){
        return (
           
               <i class="fas fa-mobile-alt fa-2x text-info " style={{transform:"translate(-20px,0px)"}} ></i>
            )
      }else{
          
            return (
                <div className="d-flex flex-column align-items-center mt-2" style={{transform:"translate(-20px,0px)"}}>
                <i class="fa fa-exclamation-circle fa-2x text-warning " aria-hidden="true"></i>
                <p style={{fontSize:"15px"}} className="mt-1 text-warning">Device Not Connected</p>
            </div>
            )
          
         
      }

     
}

function logout() {
    const cookies = new Cookies();
    cookies.remove('adminLogin')
    window.location='/'
}
