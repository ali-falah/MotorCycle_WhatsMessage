import axios from 'axios'
import React, { Component } from 'react'
import './sendmessage.css'
import $ from 'jquery'
import ProgressBar from "@ramonak/react-progress-bar";


export default class SendMessage extends Component {
    state={
        clients:[],
        selectedClients:[],
        message:undefined,
        progressTotal:0,
        progressCurrent:0,
        progressShow:false
        
    }

    getClients=()=>{
        var url = "http://localhost:5000/clients/"
        axios.get(url).then(res=>{
          this.setState({
            clients:res.data
          })
        }).catch(err=>{
          console.log(err);
        })
    }

    componentDidMount=()=>{
      this.getClients()
      var self = this
      $('#toggle-btn').on("click", function () { 
      
        var $checkbox = $(this).find(':checkbox');
        var checkBoxes = $("input[type='checkbox']");
        if(checkBoxes.prop("checked")==true)
         { 
          checkBoxes.prop("checked", false); 
          
          self.setState({selectedClients:[]})
         
        }
        else
         { checkBoxes.prop("checked", true)
          self.setState({selectedClients:[...self.state.clients]})}
     });
    }
   
    sleep=(ms)=> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    

      SendToSelected=async ()=>{
    
      var PhoneNumbers = []
      this.state.selectedClients.map(item=>{
      PhoneNumbers.push(item.phone)
     })

     this.setState({
       progressTotal:PhoneNumbers.length
     })
     
     if(this.state.message!=""&&this.state.message!=undefined){
     
      
     

       if(PhoneNumbers.length>1){
        $('#send-msg-btn').prop('disabled', true);
         
          
         for(var i =0 ;i<PhoneNumbers.length;i++){
             this.setState({
               progressCurrent:i+1,
               progressShow:true
             })
         
              var number = PhoneNumbers[i]
              if(number[0]==0){
                number = number.substr(1)
              }
              number = "964"+number
              //write simple algorithm to avoid any suspecion with sleep and random
              
              if(i==35||i==70||i==130||i==160||i==200||i==240||i==280||i==400||i==320||i==360){
                await this.sleep(15000)
              }
              var randSec = Math.floor(Math.random() * (11 - 6 + 1) + 6)
              await this.sleep(randSec*1000)
              console.log(PhoneNumbers.length + " / "+i);
              this.sendSingleMessage(number,this.state.message)   
              if(i+1==PhoneNumbers.length){
                
                await this.sleep(1000)
                this.setState({
                  progressTotal:0,
                  progressShow:false
                })
               $('#send-msg-btn').prop('disabled', false);
               $('textarea').val("");
               $("input[type='checkbox']").prop("checked", false); 
               this.setState({
                 selectedClients:[]
               })
              }
         }  
      }else{  
                 //remove first 0 and append 964
                var number = PhoneNumbers[0]
                if(number[0]==0){
                  number = number.substr(1)
                }
                number = "964"+number

                this.sendSingleMessage(number,this.state.message)
      }
      
     
      }

      
    }


    sendSingleMessage=(number,message)=>{
       //code to send message
       axios.post('http://localhost:5000/chat/sendmessage/'+number, {
        message:message,
      })
        .then(function (response) {
         $('input').val("");
        })
        .catch(function (error) {
          //show alert error has occured
          console.log(error);
        });
    }
   
    searchClients=(e)=>{

      var self = this
      
     

     if(e.length>=3){
      var temp = []
      this.state.clients.map(item=>{
         temp = this.state.clients.filter(item=>item.name.includes(e))
      })
      this.setState({clients:temp})    
      
     }else{
      self.getClients()
      
     }

        //match selection on change
        $("input[type='checkbox']").prop("checked", false); 
        self.state.selectedClients.map(i=>{
       $('#'+i._id).prop("checked", true); 
     })

    }
    
    render() {
        return (
            <div className='container-fluid mt-4 ' style={{}}  style={{letterSpacing:"0.08ch"}}>
              {/* search & message Section */}
               

                {
                  this.state.progressShow && <ProgressBar labelColor='#49525C'	 baseBgColor='#49525C' bgColor='#25BCDA'  className='position-absolute bottom-0  w-75 mb-2 mr-4'  borderRadius={50} height={35}   completed={this.state.progressCurrent} maxCompleted={this.state.progressTotal} />
                }

               
                {
                    this.topTools()
                  }

                <div className="mt-3 bg-secondary" style={{
                  width:"98%"
                  ,height:"2.5px"
                }}>
                  {/* DIVIDER */}
                </div>

             
                  
                  
                  <div class="row">
                    <div class="col-10" >
                      {
                      this.ClientsInBottomDiv()
                      }
                    </div>

                    <div class="col-2 " style={{transform:"TranslateX(-7.5%)"}} >
                       {/* To Section */}
                        {
                          this.sendMessageTopSection()
                        }
                    </div>

                  </div>

               

            </div>
        )
    }


    topTools=()=>{
      return(
        <div className='container-fluid d-flex align-items-center align-content-center justify-content-between  ' style={{width:"97%"}}>

          <textarea rows="1" className="p-2 border-secondary" placeholder="اكتب الرسالة  " style={{
            width:"45%",
            border:"none",
            borderBottom:"3px solid ",
            letterSpacing:"0.1ch",
            borderRadius:"0%",
            outline:"none",
            fontSize:"18px"
           
          }} onChange={(e)=>{this.setState({message:e.target.value})}} dir="rtl" />

         
            <input onChange={(e)=>{this.searchClients(e.target.value)}} className='form-control' style={{width:"32%"}} placeholder="ابحث بواسطة الاسم او الرقم" />
            <button id='toggle-btn' className='btn px-2 btn-sm btn-outline-dark ml-3' style={{
              fontSize:"18px",
              borderRadius:"2px",
            }}>اختيار الكل</button>

            <button id='send-msg-btn'  onClick={this.SendToSelected} className='btn px-5 py-1  btn btn-info text-dark ' style={{
              fontSize:"18px",
              borderRadius:"2px",
              letterSpacing:"0.15ch"
            }}>ارسال</button>
         
        </div>
      )
    }

    sendMessageTopSection=()=>{
      return (
        <div className="my-3" style={{transition:"1.2s linear"}} >
         
            <div className=' p-2 text-white d-flex flex-column flex-wrap align-items-center ' style={
              {
                borderRadius:"2px",width:"95.6%",
                backgroundColor:"rgb(73, 82, 92)",
                
              }
            }>ارسال الى 
            
            <div className=" text-center my-2 bg-info" style={{
                  width:"50%"
                  ,height:"2.5px",
                 
                }}>
                  {/* DIVIDER */}
                </div>

            {/* add to Phones */}
            <div className="d-flex flex-column align-items-start " dir='rtl' >
            { 
            
              this.state.selectedClients.map(item=>{
                return (
                  <span className="my-2 bg-info text-black   myBadge" style={{transition:"1.2s linear"}}>{item.name}</span>
                )
              })
            }

            </div>
            </div>


                    
          
        </div>
      )
    }


    ClientsInBottomDiv=()=>{
      var check = false
      return (
        <div  className='mt-2 row ' >


        {
          this.state.clients.map(item=>{
           
             return (
              <div  id="clients-cards-send" dir='rtl'  className="text-white-50 d-flex flex-column align-items-start client-card col-3 text-white  py-2 px-4  my-2" style={{
                marginLeft:"15px",
                marginRight:"15px",
                width:"30%"}}>
                    <p style={{fontSize:"24px"}} className="text-white"> {item.name}</p>
                    <p className='mt-3 '> <i style={{marginLeft:"10px"}} class="fa fa-phone" aria-hidden="true"></i>  {item.phone}</p>
                    <p className=''> <i style={{marginLeft:"15px"}}  className="fas fa-map-marker-alt my-2"></i> {item.address}</p> 
        
                    <div className="form-check d-flex align-items-center justify-content-around w-50 mt-3" style={{transform:"translate(28px,0)"}}>
                      <input  id={item._id} style={{borderRadius:"4px"}}  className="form-check-input bg-dark align-self-start " style={{
                        padding:"10px 10px"
                        ,borderRadius:"6px"}}  type="checkbox" 
                          onChange={(e)=>{
                              
                              if(e.target.checked===true){
                                var temp = [...this.state.selectedClients]
                                temp.push(item)
                                this.setState({
                                  selectedClients:temp
                                })
                              }

                              if(e.target.checked===false){
                              var temp = [...this.state.selectedClients]
                              temp = temp.filter(i=>i._id!=item._id)
                              this.setState({
                                selectedClients:temp
                              })
                            }
                                  

                            }}

                            

                            />
                      <label style={{fontSize:"18px"}} className="form-check-label " for="flexCheckChecked">
                          اختيار
                      </label>
                    </div>
        
            </div>
             )
            
          })
        }

        </div>
      )
    }
    
    

 
}
