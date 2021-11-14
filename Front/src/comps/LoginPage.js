import Cookies from 'universal-cookie';
import React, { Component } from 'react'
import axios from 'axios';
export default class LoginPage extends Component {
    
    state={
        username:'',
        password:'',
        admins:[]
    }

    componentDidMount=()=>{
        axios.get('http://localhost:5000/users').then(res=>{
            this.setState({admins:res.data})
        })
    }

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className='container p-4 text-center w-50' style={{marginTop:"7%"}} >
                <h2 className='text-center'>تسجيل الدخول</h2>

                <div className='text-center mt-5 d-flex flex-column  align-items-center'>
                    <input className='login-input' onChange={(e)=>{
                        this.setState({
                            username:e.target.value
                        })
                    }}  type='text' placeholder='اكتب اسم المستخدم'></input>


                    <input className='login-input my-3'  type='password' onChange={(e)=>{
                        this.setState({password:e.target.value})
                    }} placeholder='كلمة السر' />

                    <button  onClick={this.VerifyLogin} className='btn btn-sm btn-outline-dark w-25 mt-4 py-3 px-5' style={{
                        letterSpacing:"0.1ch",fontSize:"18px",borderRadius:"0"
                    }}>الدخول</button>

                </div>
            </div>
        )
    }


    VerifyLogin=()=>{
      if(this.state.password!="" || this.state.username!=''){
          this.state.admins.forEach(ele=>{
              if(ele.username==this.state.username){
                  if(ele.password==this.state.password){
                    const cookies = new Cookies();
                    cookies.set('adminLogin', 'yes')
                    window.location='/'
                  }
              }else{    
                  console.log('username not found');
              }
          })
      }
    }
}
