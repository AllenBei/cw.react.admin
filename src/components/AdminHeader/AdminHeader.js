import React, { Component } from 'react';
//引入antd组件
import { Layout, Menu, Dropdown, Icon, Avatar } from 'antd';
//引入store
import { observer } from 'mobx-react'
import { Common, LoginStores, AuthStores } from '@/store/store.js';
import { withRouter } from 'react-router-dom'
const { Header } = Layout;
@withRouter
@observer
class AdminHeader extends Component {
    state = {
        sayHi: this.sayHiFunc()
    }

    render() {
        return (
            <Header className="AdminHeader">
                <Icon className="trigger"
                    type={Common.getLeftNavCollapsedState ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle} />
                <div className="RightMenu">
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item onClick={this.loginOut} key="1">
                                <span>退出登录</span>
                            </Menu.Item>
                        </Menu>
                    } trigger={['click']}>
                        <div className="ant-dropdown-link" href="#">
                            <Avatar>
                                <Icon type={AuthStores.getUserInfoState.sex === 1 ? 'man' : 'woman'} />
                            </Avatar> {AuthStores.getUserInfoState.realName} {this.state.sayHi} <Icon type="down" />
                        </div>
                    </Dropdown>
                </div>

            </Header>
        );
    }

    loginOut = () => {
        LoginStores.loginOut(this.props.history)
    }

    sayHiFunc() {
        let now = new Date();
        let hour = now.getHours()
        if (hour < 6) {
            return "凌晨好！";
        } else if (hour < 9) {
            return "早上好！";
        } else if (hour < 12) {
            return "上午好！";
        } else if (hour < 14) {
            return "中午好！";
        } else if (hour < 17) {
            return "下午好！";
        } else if (hour < 19) {
            return "傍晚好！";
        } else if (hour < 22) {
            return "晚上好！";
        } else {
            return "深夜好！";
        }
    }

    toggle() {
        Common.changeLeftNavCollapsedState()
    }
}

export default AdminHeader;