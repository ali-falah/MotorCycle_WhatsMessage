import React, { Component } from 'react'


export default class HomePaidModify extends Component {

    constructor(props){
        super(props)
        
    }

    state={
        checked:false
    }

    componentDidMount=()=>{
        // this.handleChange = this.handleChange.bind(this);
    }

    

    render() {
        return (
            <div id='piad-modify-slide' className='text-white-50'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <i class="fa fa-times fa-2x" style={{cursor:"pointer"}}  aria-hidden="true" onClick={this.props.closeModifyPaid}></i>
            </div>


            <table class="table table-borderless table-responsive text-center text-white-50" dir='rtl'>
                <thead>
                    <tr className='text-white'>
                        <th>اسم العميل</th>
                        <th>السعر الكلي</th>
                        <th>التاريخ ووقت الفاتورة</th>
                        <th>الحالة</th>
                    </tr>
                </thead>
                <tbody>
                   {this.props.items.map(e=>{
                       return (
                        <tr>
                            <td scope="row">{e.clientName}</td>
                            <td scope="row">{e.total}</td>
                            <td scope="row">{e.Date}</td>
                            <td scope="row">

                                غير مدفوع


                            </td>
                        </tr>
                       )
                   })}
                </tbody>
            </table>

        </div>
        )
    }

   

}
