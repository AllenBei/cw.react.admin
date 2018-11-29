
import React, { Component } from 'react';
import { Table, Input, Form, Button, } from 'antd';
import { ToBeConfirmedStores } from '@/store/store.js';
import { withRouter } from 'react-router-dom';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
const FormItem = Form.Item;
let formData = new FormData();

@withRouter
class ToBeConfirmedFormList extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {
        console.log(ToBeConfirmedStores.getToBeConfirmedEditInfoState);
    }

    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                ToBeConfirmedStores.setToBeConfirmedInfoState(values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        const props = {

        };
        return (

            <Form className='ToBeConfirmedInfo' onSubmit={this.handleSubmit}>
                <FormItem label="订单号:">
                    {getFieldDecorator('OrderID', {
                        initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.OrderID,
                    })(
                        <Input size="small" width="20px" />
                    )}
                </FormItem>
                <FormItem label="订单状态:">
                    {getFieldDecorator('x', {
                        initialValue: '',
                    })(
                        <Input size="small" width="20px" />
                    )}
                </FormItem>
                <FormItem label="订单金额" >
                    {getFieldDecorator('ConsumeCents', {
                        initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.consumeCents,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="是否拆单" >
                    {getFieldDecorator('IsSplit', {
                        initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.IsSplit,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="下单时间" >
                    {getFieldDecorator('OrderDate', {
                        initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.OrderDate,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="手机" >
                    {getFieldDecorator('Mobile', {
                        initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.Mobile,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="收货人" >
                    {getFieldDecorator('Name', {
                        initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.Name,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="邮编" >
                    {getFieldDecorator('postCode', {
                        initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.postCode,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <FormItem label="第三方订单号" >
                    {getFieldDecorator('ThirdOrderID', {
                        initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.ThirdOrderID,
                    })(
                        <Input placeholder="" />
                    )}
                </FormItem>
                <div className="addressInput">
                    <FormItem label="发货地址" >
                        {getFieldDecorator('country', {
                            initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.country,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                    <FormItem label="" >
                        {getFieldDecorator('province', {
                            initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.provinc,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                    <FormItem label="" >
                        {getFieldDecorator('city', {
                            initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.city,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                    <FormItem label="" >
                        {getFieldDecorator('area', {
                            initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.area,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                    <FormItem label="" >
                        {getFieldDecorator('street', {
                            initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.street,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                </div>
                <div className="remarksInput">
                    <FormItem label="备注" >
                        {getFieldDecorator('remark', {
                            initialValue: ToBeConfirmedStores.getToBeConfirmedEditInfoState.remark,
                        })(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                </div>

                <FormItem className="btns">
                    <Button type="primary" htmlType="submit">确认修改</Button>
                </FormItem>
            </Form>

        )
    }

};
const WrappedNormalToBeConfirmedFormList = Form.create()(ToBeConfirmedFormList);

export default WrappedNormalToBeConfirmedFormList;