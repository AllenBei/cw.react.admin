import React, { Component } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import UserTable from './UserTable'
import '@/assets/style/scss/modules/Account/UserConfig.scss';
import { observer } from 'mobx-react'
@observer
class AddressConfig extends Component {

    render() {
        return (
            <div className="UserConfig Modules">
                <AdminBreadcrumb bcRoute={[{ title: '管理员账户管理', path: '' }, { title: '后台用户管理', path: '' }]} />
                <div className="mainContentWarp">
                    <div className="mainContent">
                        <UserTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddressConfig;