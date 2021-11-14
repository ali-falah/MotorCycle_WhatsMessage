import React, { Component } from 'react'
import $ from 'jquery'
export default class SingleInvoice extends Component {
    constructor(props){
        super(props)
    }
    state={
        names:[],
       q:0
   
    }
    componentDidMount=()=>{
        this.GetItemName(this.props.item.items)
        this.GetQuantity(this.props.item.items)
       
      
    }
    render() {
        
        

        return (
            <tr className='text-center'>
                <td scope="row">{this.props.item.clientName}</td>
                <td>{this.state.names.length>1 ?
                <p   onClick={(e)=>{
                    this.insertNameIntoSideMen()
                    $('#dots-list-onhover').css('opacity', '1');
                    $('#dots-list-onhover').css('right', '0%');
                }}  id='dots-items-muliple' style={{cursor:"pointer",fontWeight:"bolder"}}>...</p> 
                :
                this.state.names
                }</td>
                <td>{this.state.q}</td>
                <td>{this.props.item.Paid=='yes' ?
                 "مدفوع" 
                 : 
                 "غير مدفوع "}</td>
                <td>{this.props.item.total}</td>
                <td dir='ltr'>{this.props.item.Date}</td>
                <td><i  style={{cursor:"pointer"}}  className=" fa fa-trash fa-lg text-danger" onClick={(e)=>this.props.deleteInvoice(this.props.item._id)}  aria-hidden="true"></i></td>
                
             </tr>
        )
    }


    GetItemName=(items)=>{
        
          var temp = []
          items.forEach(i=>{
              temp.push(i.ItemName)
          })
             this.setState({
                  names:temp
              }) 
    }
    
    GetQuantity= (items)=>{
       
        var q1 = 0

        items.forEach(element => {
            q1=q1+element.quantity
        });
       this.setState({q:q1})
    }


    insertNameIntoSideMen=()=>{
       $('#div-to-be-inserted').empty();
       $('#itemQunHoverList').html('المبلغ الكلي : '+this.props.item.total+' ||  الكمية الكلية : '+this.state.q);
       $('#notes-invoice-hover').html(this.props.item.desc);
      
                    var i =0
                     this.props.item.items.map(item=>{
                         
                        $('#div-to-be-inserted').append(this.returnItemString(item.ItemName,item.priceQun,item.brand,item.quantity))
                        i++
                     })
    }

   returnItemString=(name,price,brand,qun)=>{
    var ele = `
            <tr class='text-white-50   justify-content-between align-items-center mt-2' dir="rtl" >
                <td scope="row"> <p style={{fontSize:"20px"}}>`+name+`</p></td>
                <td><p style={{fontSize:"22px"}}>`+qun+`</p></td>
                <td><p style={{fontSize:"22px"}}>`+brand+`</p></td>
                <td><p style={{fontSize:"22px"}}>`+price+`</p></td>
            </tr>
            
             `

            return ele
   }


}







