import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button, Select, Divider } from 'antd';
import { MenuConfigStores } from '@/store/store.js';
const Option = Select.Option;
const FormItem = Form.Item;
@observer
class MenuItemForm extends Component {

    componentDidMount() {
        this.selectInit();
    }

    //下拉框初始化操作
    selectInit = () => {
        const obj = MenuConfigStores.getMenuItemModalInfo;
        MenuConfigStores.setMenuItemTypeOptions();
        if (obj.type === 'edit') {
            MenuConfigStores.setMenuItemSelectInit({
                "urlID": obj.info.urlid ? obj.info.urlid : 0,
                "secondUrlID": obj.info.secondURLID ? obj.info.secondURLID : 0,
            })
        }
    }

    //前端类型发生改变
    FrontSelect = (id) => {
        MenuConfigStores.setMenuItemUrlOptionsByCataId({ type: 'Front', cataid: id, flag: true });
    }
    //后端类型发生改变
    BackSelect = (id) => {
        MenuConfigStores.setMenuItemUrlOptionsByCataId({ type: 'Back', cataid: id, flag: true });
    }

    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const obj = MenuConfigStores.getMenuItemModalInfo;
            if (!err) {
                if (obj.type === 'add') {
                    let params = {
                        type: obj.type,
                        menuItemText: values.menuItemText,
                        urlid: values.urlid,
                        secondURLID: values.secondURLID,
                    }
                    MenuConfigStores.addMenuItem(params)
                } else {
                    let params = {
                        type: obj.type,
                        menuItemText: values.menuItemText,
                        urlid: values.urlid,
                        secondURLID: values.secondURLID,
                        menuItemID: obj.info.menuItemID ? obj.info.menuItemID : 0,

                    }
                    MenuConfigStores.modifyMenuItem(params)
                }
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //布局设置
        const fromlayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 }, }
        const btnlayout = { wrapperCol: { span: 4, offset: 20 }, }
        const obj = MenuConfigStores.getMenuItemModalInfo;
        const select_obj = MenuConfigStores.getMenuItemSelectInit;

        return (
            <Form className="MenuItemForm" layout={'horizontal'} onSubmit={this.handleSubmit}>
                <FormItem label="标题" {...fromlayout}>
                    {getFieldDecorator('menuItemText', {
                        initialValue: obj.type === 'add' ? null : obj.info.text,
                        rules: [{ required: true, message: '请输入标题!' }],
                    })(
                        <Input placeholder="请输入标题" />
                    )}
                </FormItem>
                <FormItem label="前端类型" {...fromlayout}>
                    {getFieldDecorator('secondURLCataID', {
                        initialValue: obj.type === 'add' ? null : select_obj.secondURLCataID,
                        rules: [{ required: true, message: '请选择前端类型!' }],
                    })(
                        <Select onSelect={(obj) => { this.FrontSelect(obj) }} placeholder="请选择前端类型">
                            {
                                MenuConfigStores.getMenuItemTypeOptions.map((item, index) => {
                                    return (
                                        <Option key={item.key} value={item.urlCataID}>{item.urlCataName + '-' + item.urlCataID}</Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem label="前端Url" {...fromlayout}>
                    {getFieldDecorator('secondURLID', {
                        initialValue: select_obj.secondUrlID,
                        rules: [{ required: true, message: '请选择前端Url!' }],
                    })(
                        <Select placeholder="请选择前端Url">
                            {
                                MenuConfigStores.getMenuItemFrontUrlOptions.map((item, index) => {
                                    return (
                                        <Option key={item.key} value={item.urlid}>{item.urlTitle + '-' + item.urlContent}</Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <Divider />
                <FormItem label="后端类型" {...fromlayout}>
                    {getFieldDecorator('urlCataID', {
                        initialValue: obj.type === 'add' ? '' : select_obj.urlCataID,
                        rules: [{ required: true, message: '请选择后端类型!' }],
                    })(
                        <Select onSelect={(obj) => { this.BackSelect(obj) }} placeholder="请选择后端类型">
                            {
                                MenuConfigStores.getMenuItemTypeOptions.map((item, index) => {
                                    return (
                                        <Option key={item.key} value={item.urlCataID}>{item.urlCataName + '-' + item.urlCataID}</Option>
                                    )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem label="后端Url" {...fromlayout}>
                    {getFieldDecorator('urlid', {
                        initialValue: select_obj.urlid,
                        rules: [{ required: true, message: '请选择后端Url!' }],
                    })(
                        <Select placeholder="请选择后端Url">
                            {
                                MenuConfigStores.getMenuItemBackUrlOptions.map((item, index) => {
                                    return (
                                        <Option key={item.key} value={item.urlid}>{item.urlTitle + '-' + item.urlContent}</Option>
                                    )
                                })
                            }
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
const WrappedNormalTypeAdressForm = Form.create()(MenuItemForm);
export default WrappedNormalTypeAdressForm;