import React,{Component} from 'react';
import AdminHeader from '../AdminHeader/AdminHeader.js';
import AdminNavLeft from '../AdminNavLeft/AdminNavLeft.js';
import AdminContent from '../AdminContent/AdminContent.js';
import '../../assets/style/scss/components/Layout.scss';
//引入antd组件
import { Layout} from 'antd';
//引入store
import {observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'
@withRouter
@observer
class AdminLayout extends Component {

    render(){
        return (
            <Layout className = "AdminLayout" >
                <AdminNavLeft/>
                <Layout className="AdminMain">
                    <AdminHeader/>
                    <AdminContent routes={this.props.children}/>
                </Layout>
            </Layout>
        );
    }
    
}

export default AdminLayout;