import React from 'react'
import ReactTooltip from 'react-tooltip'



export default function item(props) {
 
    var img = 'http://localhost:5000/images/'+props.item.img
    return (
        <div className='col-3 m-3 p-0  item-card d-flex flex-column align-items-start justify-content-between '>
        <img className="item-img img-fluid w-100  mb-2"  alt={props.item.itemName} src={img} ></img>

         

              
                <div className='d-flex w-100 justify-content-between align-items-center p-2' >
                            <p style={{fontSize:"20px"}}>{props.item.ItemName}</p>
                            <p style={{opacity:"0.8"}}>{props.item.brand}</p>
                    </div>

                    
                    <div style={{opacity:"0.8"}}   className='d-flex w-100 justify-content-between align-items-center mt-1 p-2' >
                            


                            <div className='d-flex justify-content-between align-items-center'>
                               <i className="fas fa-sticky-note text-info"></i>
                                <p data-tip={props.item.desc} data-for='registerTip' style={{marginLeft:"13px"}} >{
                                    props.item.desc.length>20 ? <h1 
                                    style={{cursor:"pointer",fontSize:"40px",transform:"translate(0,-23px)"}} 
                                    >...</h1> : props.item.desc
                                }</p>
                            </div>


                            
                            <div className='d-flex justify-content-between align-items-center'><i className="fa fa-dollar-sign text-info "></i> 
                                <p style={{marginLeft:"10px",letterSpacing:"0.16ch"}}>{props.item.price}</p>
                            </div>
                            
                    </div>

                  

                    <div className='d-flex w-100 justify-content-between align-items-center p-2' >
                            <i  onClick={()=>{
                                props.updateItem(props.item._id,props.item.img)
                            }}  className="fas fa-edit  text-info items-actions-icons"></i>
                            <i onClick={()=>{
                               props.deleteItem(props.item._id,props.item.img)
                            }}  style={{color:"#993232"}}  className="fa fa-trash items-actions-icons " aria-hidden="true"></i>
                           
                    </div>



                    {/* <a data-tip="React-tooltip"> {this.props.item.desc} </a> */}
                     <ReactTooltip width="100px"  place="right"  id="registerTip" type="dark" effect="float"/>
                    
                    
        </div>
    )
}

