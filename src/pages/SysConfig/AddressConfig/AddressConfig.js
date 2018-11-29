import React, { Component } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import TypeAdressTable from './TypeAdressTable'
import UrlAdressTable from './UrlAdressTable'
import '@/assets/style/scss/modules/SysConfig/AddressConfig.scss';
import { observer } from 'mobx-react'
@observer
class AddressConfig extends Component {

    render() {
        return (
            <div className="AddressConfig Modules">
                <AdminBreadcrumb bcRoute={[{ title: '系统设置', path: '' }, { title: '地址管理', path: '' }]} />
                <div className="mainContentWarp">
                    <div className="mainContent">
                        <TypeAdressTable/>
                        <UrlAdressTable/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddressConfig;