import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
// import { ToBeConfirmedStores } from '@/store/store.js'
import { observer } from 'mobx-react'
const FormItem = Form.Item;
const Option = Select.Option;

@observer
class SearchForm extends Component {

    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // ToBeConfirmedStores.findToBeConfirmedState(values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //布局设置
        const fromlayout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } }
        const btnlayout = { wrapperCol: { span: 4, offset: 20 } }
        return (
            <Form className="MenuFrom" layout={'horizontal'} onSubmit={this.handleSubmit}>
                <FormItem label="收货人" {...fromlayout}>
                    {getFieldDecorator('name', {
                        initialValue: '',
                    })(
                        <Input placeholder="请输入收货人" />
                    )}
                </FormItem>
                <FormItem label="手机" {...fromlayout}>
                    {getFieldDecorator('mobile', {
                        initialValue: '',
                    })(
                        <Input placeholder="请输入手机" />
                    )}
                </FormItem>
                <FormItem label="订单ID" {...fromlayout}>
                    {getFieldDecorator('orderID', {
                        initialValue: '',
                    })(
                        <Input placeholder="请输入订单ID" />
                    )}
                </FormItem>
                <FormItem label="第三方订单号" {...fromlayout}>
                    {getFieldDecorator('thirdOrderID', {
                        initialValue: '',
                    })(
                        <Input placeholder="请输入第三方订单号" />
                    )}
                </FormItem>
                <FormItem className="btns" {...btnlayout}>
                    <Button type="primary" htmlType="submit">查找</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalSearchForm = Form.create()(SearchForm);
export default WrappedNormalSearchForm;