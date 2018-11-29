import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button, Select } from 'antd';
import { MenuConfigStores } from '@/store/store.js';
const Option = Select.Option;
const FormItem = Form.Item;
@observer
class MenuForm extends Component {
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const obj = MenuConfigStores.getMenuModalInfo;
                let params = {
                    type: obj.type,
                    menuName:values.menuName,
                    menuType:values.menuType,
                    menuID:obj.type === 'add'?0:obj.info.menuID
                }
                obj.type === 'add' ? 
                MenuConfigStores.addMenu(params) : 
                MenuConfigStores.modifyMenu(params)
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
        const obj = MenuConfigStores.getMenuModalInfo;
        return (
            <Form className="MenuFrom" layout={'horizontal'} onSubmit={this.handleSubmit}>
                <FormItem label="菜单标题" {...fromlayout}>
                    {getFieldDecorator('menuName', {
                        initialValue: obj.type === 'add' ? '' : obj.info.menuName,
                        rules: [{ required: true, message: '请输入菜单标题!' }],
                    })(
                        <Input placeholder="请输入菜单标题" />
                    )}
                </FormItem>
                <FormItem label="菜单类型" {...fromlayout}>
                    {getFieldDecorator('menuType', {
                        initialValue: obj.type === 'add' ? 'Back' : obj.info.menuType,
                        rules: [{ required: true, message: '请选择菜单类型!' }],
                    })(
                        <Select placeholder="请选择菜单类型">
                            <Option value="Back">后台</Option>
                            <Option value="Front">前台</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem className="btns" {...btnlayout}>
                    <Button type="primary" htmlType="submit">{obj.type === 'add' ? '添加' : '保存'}</Button>
                </FormItem>
            </Form>
        );
    }
}
const WrappedNormalTypeAdressForm = Form.create()(MenuForm);
export default WrappedNormalTypeAdressForm;