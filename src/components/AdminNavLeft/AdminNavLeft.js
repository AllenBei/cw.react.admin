import React, { Component } from 'react';
//引入antd组件
import { Layout, Menu, Icon } from 'antd';
//引入store
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Common } from '@/store/store.js';
import { AuthStores } from '@/store/store.js'
//引入菜单数据
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
@withRouter
@observer
class AdminNavLeft extends Component {

    render() {
        return (
            <Sider className="AdminNavLeft" collapsed={Common.getLeftNavCollapsedState}>
                <div className="logo">{Common.getLeftNavCollapsedState ? '福' : '福利平台'}</div>
                <Menu theme="dark" mode="vertical" defaultSelectedKeys={[this.props.history.location.pathname]}>
                    {AuthStores.getMenusState.length > 0 ? this.renderMenu(AuthStores.getMenusState) : this.renderMenu([])}
                </Menu>
            </Sider>
        );
    }

    //渲染菜单
    renderMenu = (data) => {
        return data.map((item, index) => {
            if (item.children) {
                return (
                    <SubMenu key={item.key+Math.random()} title={<span><Icon type="profile" /> <span>{item.title}</span></span>}>
                        {
                            item.children.map((subItem, subIndex) => {
                                return (
                                    <Menu.Item key={subItem.key+Math.random()} onClick={() => { this.gotoPage(subItem.key) }}>
                                        <Icon type="profile" />
                                        <span>{subItem.title}</span>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.key} onClick={() => { this.gotoPage(item.key) }}>
                        <Icon type="profile" />
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }
        })
    }

    gotoPage = (path) => {
        if (this.props.history.location.pathname === path) return;
        this.props.history.push(path)
    }
}

export default AdminNavLeft;