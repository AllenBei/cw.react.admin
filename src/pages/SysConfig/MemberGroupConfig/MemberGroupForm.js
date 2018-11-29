import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button } from 'antd';
import { MemberGroupConfigStores } from '@/store/store.js';
const FormItem = Form.Item;
const { TextArea } = Input;
@observer
class MemberGroupForm extends Component {
    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const obj = MemberGroupConfigStores.getMemberGroupModalInfo;
            if (!err) {
                if (obj.type === 'add') {
                    let params = {
                        memGroupName: values.memGroupName,
                        memGroupDes: values.memGroupDes,
                        memGroupID: values.memGroupID,
                    }
                    MemberGroupConfigStores.addMemberGroup(params)
                } else {
                    let params = {
                        upMemGroupId: values.memGroupID,
                        memGroupName: values.memGroupName,
                        memGroupDes: values.memGroupDes,
                        memGroupID: values.memGroupID,
                    }
                    MemberGroupConfigStores.modifyMemberGroup(params)
                }
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
        const obj = MemberGroupConfigStores.getMemberGroupModalInfo;
        return (
            <Form className="MenuFrom" layout={'horizontal'} onSubmit={this.handleSubmit}>
                <FormItem label="会员组ID" {...fromlayout}>
                    {getFieldDecorator('memGroupID', {
                        initialValue: obj.type === 'add' ? '' : obj.info.memGroupID,
                        rules: [{ required: true, message: '请输入会员组ID!' }],
                    })(
                        <Input disabled={obj.type === 'edit'} placeholder="请输入会员组ID" />
                    )}
                </FormItem>
                <FormItem label="会员组名" {...fromlayout}>
                    {getFieldDecorator('memGroupName', {
                        initialValue: obj.type === 'add' ? '' : obj.info.memGroupName,
                        rules: [{ required: true, message: '请输入会员组名!' }],
                    })(
                        <Input placeholder="请输入会员组名" />
                    )}
                </FormItem>
                <FormItem label="描述" {...fromlayout}>
                    {getFieldDecorator('memGroupDes', {
                        initialValue: obj.type === 'add' ? '' : obj.info.memGroupDes,
                    })(
                        <TextArea rows={4} placeholder="请输入描述" />
                    )}
                </FormItem>

                <FormItem className="btns" {...btnlayout}>
                    <Button type="primary" htmlType="submit">{obj === 'add' ? '添加' : '保存'}</Button>
                </FormItem>
            </Form>
        );
    }
}
const WrappedNormalTypeAdressForm = Form.create()(MemberGroupForm);
export default WrappedNormalTypeAdressForm;