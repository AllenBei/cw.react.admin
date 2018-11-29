import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
//引入store
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react'
@observer
class AdminBreadcrumb extends Component {

    componentWillMount() {
        const breadcrumbItemNode = this.renderItem(this.props.bcRoute);
        this.setState({
            breadcrumbItemNode: breadcrumbItemNode
        })
    }

    renderItem = (data) => {
        return data.map((item) => {
            if (item.path !== '') {
                return (<Breadcrumb.Item key={item.path}>
                    <NavLink to={item.path}>{item.title}</NavLink>
                </Breadcrumb.Item>)

            } else {
                return (<Breadcrumb.Item key={item.path}>{item.title}</Breadcrumb.Item>)
            }

        })
    }

    render() {
        return (
            <div className="AdminBreadcrumb" >
                <Breadcrumb>{this.state.breadcrumbItemNode}</Breadcrumb>
            </div>
        );
    }
}

export default AdminBreadcrumb;