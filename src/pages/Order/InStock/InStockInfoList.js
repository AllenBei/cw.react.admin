
import React, { Component } from 'react';
import { Table, Input, Form, Button, } from 'antd';
import { InStockStores } from '@/store/store.js';
import { withRouter } from 'react-router-dom';
import { dataFormat } from '@/util/util.js'
const FormItem = Form.Item;
let formData = new FormData();

@withRouter
class InStockInfoList extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            orderID:"空",
            consumeCents:"0",
            OrderDate:"",
            mobile:"",
            Name:"",
            Country:"" ,
            Province:"",
            City:"" ,
            Area:"",
            Street:"",
            Remark:""
            
        };
    }
    componentWillMount() {
        if(InStockStores.InStockDListStates!==null){
            InStockStores.getInstockDInfoState(InStockStores.InStockDListStates.orderID)
        }else{
            this.props.history.push('/admin/Order/InStock/InStockTable');
        }
    //    console.log(InStockStores.InstockInfoStates);
        // console.log(InStockStores.getInstockDInfoState(InStockStores.InStockDListStates.orderID));
    }
    componentDidMount(){
        this.timerChange = setInterval(
            () => this.tick(),
            2000
        )
    }
    componentWillUnmount(){
        clearInterval(this.timerChange)
    }
    tick(){
        let {orderID,consumeCents,orderDate,mobile,name,country
            ,province,city ,area,street,remark}
         = InStockStores.InstockInfoStates
        this.setState({
            orderID,consumeCents,orderDate,mobile,name,country
            ,province,city ,area,street,remark
        })
    }

    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(InStockStores.InstockInfoStates.orderID)
                // ToBeConfirmedStores.setToBeConfirmedInfoState(values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;

       
        return (

            <Form className='ToBeConfirmedInfo' onSubmit={this.handleSubmit}>
                <FormItem label="订单号:">
                    {getFieldDecorator('orderID', {
                        initialValue:this.state.orderID,
                    })(
                        <Input size="small" width="20px" />
                    )}
                </FormItem>
                 {/* <FormItem label="订单状态:">
                     {getFieldDecorator('x', {
                        initialValue: '',
                    })(
                        <Input size="small" width="20px" />
                    )}
                </FormItem> */}
                <FormItem label="订单金额" >
                    {getFieldDecorator('ConsumeCents', {
                        initialValue: this.state.consumeCents,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                {/* <FormItem label="是否拆单" >
                    {getFieldDecorator('IsSplit', {
                        initialValue: this.state.isSplit,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem> */}
                <FormItem label="下单时间" >
                    {getFieldDecorator('OrderDate', {
                        initialValue: dataFormat(this.state.orderDate, 'yyyy-MM-dd hh:mm:ss'),
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="手机" >
                    {getFieldDecorator('Mobile', {
                        initialValue: this.state.mobile,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="收货人" >
                    {getFieldDecorator('Name', {
                        initialValue: this.state.name,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                {/* <FormItem label="邮编" >
                    {getFieldDecorator('postCode', {
                        initialValue: this.state.postCode,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="第三方订单号" >
                    {getFieldDecorator('ThirdOrderID', {
                        initialValue: this.state.ThirdOrderID,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem> */}
                <div className="addressInput">
                    <FormItem label="发货地址" >
                        {getFieldDecorator('Country', {
                            initialValue: this.state.country,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                    <FormItem label="" >
                        {getFieldDecorator('Province', {
                            initialValue: this.state.provinc,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                    <FormItem label="" >
                        {getFieldDecorator('City', {
                            initialValue: this.state.city,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                    <FormItem label="" >
                        {getFieldDecorator('Area', {
                            initialValue: this.state.area,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                    <FormItem label="" >
                        {getFieldDecorator('street', {
                            initialValue: this.state.street,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                </div>
                <div className="remarksInput">
                    <FormItem label="备注" >
                        {getFieldDecorator('Remark', {
                            initialValue: this.state.remark,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                </div>
            </Form>
        )
    }

};
const WrappedNormalInStockInfoList = Form.create()(InStockInfoList);

export default WrappedNormalInStockInfoList;