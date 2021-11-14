import React from 'react'
import $ from 'jquery'

export default function ClientCard(props) {

  
    return (
        <div className="text-capitalize text-white-50  d-flex flex-wrap flex-column justify-content-evenly client-card m-2  p-3  col-6  align-items-start" style={{fontSize:"20px"}}>
            
            <p className="text-white" style={{fontSize:"24px"}}>{props.item.name}</p>


           <div className="d-flex mt-3   align-items-center justify-content-between align-content-around"> 
                <i style={{fontSize:"21px"}}  className="fa fa-phone" ></i>
           <p  className="" style={{fontSize:"21px",marginLeft:"20px"}}>{props.item.phone}</p></div>


           <div className="d-flex my-2 align-items-center"> 
                <i style={{fontSize:"21px"}}  className="fas fa-map-marker-alt"></i>
           <p style={{fontSize:"21px",marginLeft:"25px"}}>{props.item.address}</p></div>


            {/* actions */}

            <div className='align-self-end'>

                    <i class="fas fa-user-edit fa-lg text-info tarsh-icon-btn" onClick={()=>{
                        $('#cust-hidden-value').val(props.item._id);
                        $('.update-comp').css("transform","TranslateX(0%)");
                        setUpdateFormValues(props.item)
                    }}>

                    </i>

                    <i style={{
                        color:"#Ff4742",
                        marginLeft:"15px"
                    }} 
                    onClick={()=>{
                        props.deleteClient(props.item._id)
                    }}  class="tarsh-icon-btn fa fa-trash fa-lg  " aria-hidden="true"></i>

            </div>

        </div>
    )
}


function setUpdateFormValues(item) {
    $('#update-client-name').val(item.name);
    $('#update-client-phone').val(item.phone);
    $('#update-client-address').val(item.address);
}
