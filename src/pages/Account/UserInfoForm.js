import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button, Radio, Row, Col, message } from 'antd';
import AddMemberGroupMenuForm from './AddMemberGroupMenuForm.js';
import { UserConfigStores } from '@/store/store.js';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
@observer
class UserInfoForm extends Component {

    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const multi2 = UserConfigStores.getAddForMulti2;
            if (!err) {
                if (multi2.length <= 0) {
                    message.error('请选择会员组');
                    return;
                }
                let params = {
                    Mobile: values.mobile,
                    Email: values.email,
                    CompanyID: values.companyID,
                    RealName: values.realName,
                    Sex: values.sex,
                    selected: multi2
                }
                UserConfigStores.addUser(params)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //布局设置
        const fromlayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 17 },
        }
        const btnlayout = {
            wrapperCol: { span: 4, offset: 20 },
        }
        const obj = UserConfigStores.getUserModalInfo;
        return (
            <Form className="UserInfoForm" layout={'horizontal'} onSubmit={this.handleSubmit}>
                <Row gutter={0}>
                    <Col span={12}>
                        <FormItem label="手机号" {...fromlayout}>
                            {getFieldDecorator('mobile', {
                                initialValue: '',
                                rules: [{ required: true, message: '请输入手机号!' }],
                            })(
                                <Input disabled={obj.type === 'edit'} placeholder="请输入手机号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="公司" {...fromlayout}>
                            {getFieldDecorator('companyID', {
                                initialValue: '',
                                rules: [{ required: true, message: '请输入邮箱!' }],
                            })(
                                <Input disabled={obj.type === 'edit'} placeholder="请输入邮箱" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="真实姓名" {...fromlayout}>
                            {getFieldDecorator('realName', {
                                initialValue: '',
                                rules: [{ required: true, message: '请输入真实姓名!' }],
                            })(
                                <Input disabled={obj.type === 'edit'} placeholder="请输入真实姓名" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="邮箱" {...fromlayout}>
                            {getFieldDecorator('email', {
                                initialValue: '',
                                rules: [{ required: true, message: '请输入邮箱!' }],
                            })(
                                <Input disabled={obj.type === 'edit'} placeholder="请输入邮箱" />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={0}>
                    <Col span={12}>
                        <FormItem label="性别" {...fromlayout}>
                            {getFieldDecorator('sex', {
                                initialValue: obj.type === 'add' ? 1 : obj.info.sex,
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={0}>
                    <AddMemberGroupMenuForm />
                </Row>
                <FormItem className="btns" {...btnlayout}>
                    <Button type="primary" htmlType="submit">{obj.type === 'add' ? '添加' : '保存'}</Button>
                </FormItem>
            </Form>

        );
    }
}
const WrappedNormalUserInfoForm = Form.create()(UserInfoForm);
export default WrappedNormalUserInfoForm;