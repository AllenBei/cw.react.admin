import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Form, Input, Button, Radio, Row, Col, Modal } from 'antd';
import { dataFormat } from '@/util/util.js'
import { UserConfigStores } from '@/store/store.js';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
@observer
class EditUserInfoForm extends Component {

    //提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const obj = UserConfigStores.getUserModalInfo;
            if (!err) {
                let params = {
                    gid: obj.info.gid,
                    companyID: values.companyID,
                    mobile: values.mobile,
                    sex: values.sex,
                    realName: values.realName,
                    email: values.email,
                    memberID: values.memberID,
                }
                UserConfigStores.modifyUser(params);
            }
        });
    }

    //重置密码
    handleResetPwd = (opt) => {
        confirm({
            title: '重置密码?',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                UserConfigStores.resetPwd({ gid: opt.gid })
            },
        });
    }

    //冻结账号
    handleIsFreeze = (opt) => {
        confirm({
            title: '锁定/冻结账号?',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                UserConfigStores.IsFreeze({ gid: opt.gid })
            },
        });
    }

    //解冻账号
    handleUnIsFreeze = (opt) => {
        confirm({
            title: '确定取消/解冻账号?',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                UserConfigStores.UnIsFreeze({ gid: opt.gid })
            },
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        //布局设置
        const fromlayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        }
        const obj = UserConfigStores.getUserModalInfo;
        console.log(obj.info);
        return (
            <Form className="EditUserInfoForm" layout={'horizontal'} onSubmit={this.handleSubmit}>
                <Row gutter={0}>
                    <Col span={12}>
                        <FormItem label="MemberID" {...fromlayout}>
                            {getFieldDecorator('memberID', {
                                initialValue: obj.info.memberID,
                                rules: [{ required: true, message: '请输入MemberID!' }],
                            })(
                                <Input placeholder="请输入MemberID" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="手机号" {...fromlayout}>
                            {getFieldDecorator('mobile', {
                                initialValue: obj.info.mobile,
                                rules: [{ required: true, message: '请输入手机号!' }],
                            })(
                                <Input placeholder="请输入手机号" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="真实姓名" {...fromlayout}>
                            {getFieldDecorator('realName', {
                                initialValue: obj.info.realName,
                                rules: [{ required: true, message: '请输入真实姓名!' }],
                            })(
                                <Input placeholder="请输入真实姓名" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="邮箱" {...fromlayout}>
                            {getFieldDecorator('email', {
                                initialValue: obj.info.email,
                                rules: [{ required: true, message: '请输入邮箱!' }],
                            })(
                                <Input placeholder="请输入邮箱" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="公司" {...fromlayout}>
                            {getFieldDecorator('companyID', {
                                initialValue: obj.info.companyID,
                                rules: [{ required: true, message: '请输入公司!' }],
                            })(
                                <Input placeholder="请输入公司" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="性别" {...fromlayout}>
                            {getFieldDecorator('sex', {
                                initialValue: obj.info.sex,
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={0}>女</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="上次登录" {...fromlayout}>
                            {getFieldDecorator('lastLogon', {
                                initialValue: dataFormat(obj.info.lastLogon, 'yyyy/MM/dd hh:mm:ss'),
                            })(
                                <Input disabled={true} placeholder="上次登录" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="注册时间" {...fromlayout}>
                            {getFieldDecorator('registerTime', {
                                initialValue: dataFormat(obj.info.registerTime, 'yyyy/MM/dd hh:mm:ss'),
                            })(
                                <Input disabled={true} placeholder="注册时间" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="上次IP" {...fromlayout}>
                            {getFieldDecorator('lastLogonIP', {
                                initialValue: obj.info.lastLogonIP,
                            })(
                                <Input disabled={true} placeholder="上次IP" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="手机状态" {...fromlayout}>
                            {getFieldDecorator('isMobileBind', {
                                initialValue: obj.info.isMobileBind === true ? '已绑定' : '未绑定',
                            })(
                                <Input disabled={true} placeholder="手机状态" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="激活状态" {...fromlayout}>
                            {getFieldDecorator('isActivate', {
                                initialValue: obj.info.isActivate === true ? '已激活' : '未激活',
                            })(
                                <Input disabled={true} placeholder="激活状态" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="冻结状态" {...fromlayout}>
                            {getFieldDecorator('isFreeze', {
                                initialValue: obj.info.isFreeze ? '已冻结' : '未冻结',
                            })(
                                <Input disabled={true} placeholder="冻结状态" />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <FormItem className="btns" >
                    <Button type="primary" htmlType="submit">保存用户信息</Button>
                    <Button type="primary" onClick={() => { this.handleResetPwd({ gid: obj.info.gid }) }}>重置密码</Button>
                    <Button type="primary" onClick={() => { this.handleIsFreeze({ gid: obj.info.gid }) }}>锁定/冻结账号</Button>
                    <Button type="danger" onClick={() => { this.handleUnIsFreeze({ gid: obj.info.gid }) }}>取消/解冻账号</Button>
                </FormItem>
            </Form>

        );
    }
}
const WrappedNormalEditUserInfoForm = Form.create()(EditUserInfoForm);
export default WrappedNormalEditUserInfoForm;