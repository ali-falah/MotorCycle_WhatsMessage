import React, { Component, useState,useEffect }  from 'react';
import './App.css';
import Home from './comps/Home'
import { Route} from 'react-router';
import Navbar from './comps/Navbar';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Clients from './comps/Clients';
import Invoices from './comps/Invoices';
import SendMessage from './comps/SendMessage';
import Items from './comps/Items';
import LoginPage from './comps/LoginPage';
import Cookies from 'universal-cookie';


 class App extends Component {
   state={
    PhoneStatus:""
   }

   componentDidMount=()=>{
   

    this.getPhoneStatus()
     
   }


    getPhoneStatus =()=>{
    
    axios.get("http://localhost:5000/auth/checkauth").then(result=>{
  
      
      this.setState({
        PhoneStatus:result.data
      })
        
     }).catch(err=>console.log(err))

  
  }


  
   

  render() {
    const cookies = new Cookies();
    console.log(cookies.get('adminLogin'));
    return (
    <BrowserRouter >
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        {
          cookies.get('adminLogin')=='yes' ?  
          <React.Fragment>
              <Navbar PhoneStatus={this.state.PhoneStatus}/>
      
              <Route path='/clients' exact component={Clients} />
              <Route path='/' exact component={Home} />
              <Route path='/invoices' exact component={Invoices} />
              <Route path='/sendmessage' exact component={SendMessage} />
              <Route path='/items' exact component={Items} />
           </React.Fragment>
          :   
          
          <Route path='/' component={LoginPage} />
         
          
        }
      
  </BrowserRouter>
    )
  }
}

 


export default App;
