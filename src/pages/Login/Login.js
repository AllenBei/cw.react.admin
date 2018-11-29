import React, { Component } from 'react';
import '@/assets/style/scss/modules/Auth/Login.scss';
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import { LoginStores } from '@/store/store.js'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { getLocal } from '@/util/localStorage.js'
const FormItem = Form.Item;

@withRouter
@observer
class Login extends Component {

    componentWillMount() {
        if (LoginStores.getIsLoginState) {
            this.props.history.push('/admin/home');
        }
    }

    //提交登录
    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                LoginStores.loginIn(values, this.props.history)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="Login">
                <div className="login-warp">
                    <div className="login-box">
                        <header>登录</header>
                        <div className="box-body">
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        initialValue: getLocal('loginUserName'),
                                        rules: [{ required: true, message: '请输入用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入登录账号" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        initialValue: getLocal('loginPassword'),
                                        rules: [{ required: true, message: '请输入密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                                    )}
                                </FormItem>
                                <FormItem className="btns">
                                    <div className="row01">
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>记住密码</Checkbox>
                                        )}
                                        <span className="login-form-forgot" >忘记密码</span>
                                    </div>
                                    <Button loading={LoginStores.getOnLoginState} type="primary" htmlType="submit" className="login-form-button">
                                        {LoginStores.getOnLoginState ? '登录中...' : '登录'}
                                    </Button>
                                    <span >马上注册</span>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default WrappedNormalLoginForm;