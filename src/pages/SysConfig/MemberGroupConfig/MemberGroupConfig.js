import React, { Component } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import '@/assets/style/scss/modules/SysConfig/MemberGroupConfig.scss';
import MemberGroupTable from './MemberGroupTable';
import { observer } from 'mobx-react'
@observer
class MenuConfig extends Component {

    render() {
        return (
            <div className="MemberGroupConfig Modules">
                <AdminBreadcrumb bcRoute={[{ title: '系统设置', path: '' }, { title: '会员组管理', path: '' }]} />
                <div className="mainContentWarp">
                    <div className="mainContent">
                        <MemberGroupTable />
                    </div>
                </div>
            </div>
        );
    }

}

export default MenuConfig;