import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button } from 'antd';
import { AddressConfigStores } from '@/store/store.js';
const FormItem = Form.Item;
@observer
class TypeAdressForm extends Component {
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const obj = AddressConfigStores.getAddressUrlModalInfo;
                let params = {
                    type: obj.type,
                    controller: values.controller,
                    urlContent: values.urlContent,
                    urlTitle: values.urlTitle,
                    urlType: values.urlType,
                    action: values.action,
                    urlCataID: AddressConfigStores.getNowCataid,
                    urlID: 'add' === obj.type ?0:obj.info.urlid,
                }
                'add' === obj.type? 
                AddressConfigStores.addAddressUrl(params) : 
                AddressConfigStores.modifyAddressUrl(params)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //布局设置
        const fromlayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        }
        const btnlayout = {
            wrapperCol: { span: 4, offset: 20 },
        }
        const obj = AddressConfigStores.getAddressUrlModalInfo;
        return (
            <Form className="SubMenuItemFrom" layout={'horizontal'} onSubmit={this.handleSubmit}>
                <FormItem label="Url标题" {...fromlayout}>
                    {getFieldDecorator('urlTitle', {
                        initialValue: obj.type === 'add' ? '' : obj.info.urlTitle,
                        rules: [{ required: true, message: '请输入Url标题!' }],
                    })(
                        <Input placeholder="请输入Url标题" />
                    )}
                </FormItem>
                <FormItem label="地址" {...fromlayout}>
                    {getFieldDecorator('urlContent', {
                        initialValue: obj.type === 'add' ? '' : obj.info.urlContent,
                        rules: [{ required: true, message: '请输入地址!' }],
                    })(
                        <Input placeholder="请输入地址" />
                    )}
                </FormItem>
                <FormItem label="类型" {...fromlayout}>
                    {getFieldDecorator('urlType', {
                        initialValue: obj.type === 'add' ? 0 : obj.info.urlType,
                        rules: [{ required: true, message: '请输入类型!' }],
                    })(
                        <Input type="number" placeholder="请输入类型" />
                    )}
                </FormItem>
                <FormItem label="action" {...fromlayout}>
                    {getFieldDecorator('action', {
                        initialValue: obj.type === 'add' ? '' : obj.info.action,
                    })(
                        <Input  placeholder="请输入action" />
                    )}
                </FormItem>
                <FormItem label="controller" {...fromlayout}>
                    {getFieldDecorator('controller', {
                        initialValue: obj.type === 'add' ? '' : obj.info.controller,
                    })(
                        <Input placeholder="请输入controller" />
                    )}
                </FormItem>
                <FormItem className="btns" {...btnlayout}>
                    <Button type="primary" htmlType="submit">{obj.type === 'add' ? '添加' : '保存'}</Button>
                </FormItem>
            </Form>
        );
    }
}
const WrappedNormalTypeAdressForm = Form.create()(TypeAdressForm);
export default WrappedNormalTypeAdressForm;