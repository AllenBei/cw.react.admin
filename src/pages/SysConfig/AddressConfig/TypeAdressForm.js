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
                console.log(values);
                console.log(AddressConfigStores.getAddressUrlTypeModalInfo);
                const obj = AddressConfigStores.getAddressUrlTypeModalInfo;
                let params = {
                    type: obj.type,
                    urlCataName:values.urlCataName,
                    urlCataID:obj.type === 'add'?0:obj.info.urlCataID,
                }
                obj.type === 'add' ? 
                AddressConfigStores.addAddressType(params) : 
                AddressConfigStores.modifyAddressType(params)
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
        const obj = AddressConfigStores.getAddressUrlTypeModalInfo;
        return (
            <Form className="SubMenuItemFrom" layout={'horizontal'} onSubmit={this.handleSubmit}>
                <FormItem label="分类名" {...fromlayout}>
                    {getFieldDecorator('urlCataName', {
                        initialValue: obj.type === 'add' ? '' : obj.info.urlCataName,
                        rules: [{ required: true, message: '请输入分类名!' }],
                    })(
                        <Input placeholder="请输入分类名" />
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