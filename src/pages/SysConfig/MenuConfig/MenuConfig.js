import React, { Component } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import MenuTable from './MenuTable'
import MenuItemTable from './MenuItemTable'
import '@/assets/style/scss/modules/SysConfig/MenuConfig.scss';
import { observer } from 'mobx-react'
@observer
class MenuConfig extends Component {

    render() {
        return (
            <div className="MenuConfig Modules">
                <AdminBreadcrumb bcRoute={[{ title: '系统设置', path: '' }, { title: '菜单管理', path: '' }]} />
                <div className="mainContentWarp">
                    <div className="mainContent">
                        <MenuTable/>
                        <MenuItemTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MenuConfig;