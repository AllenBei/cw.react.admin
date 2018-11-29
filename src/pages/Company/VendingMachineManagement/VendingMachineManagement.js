import React, { Component } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { observer } from 'mobx-react'
import '@/assets/style/scss/modules/MallVending/MallVending.scss';
import MallList from './MallVendingMac.js'
import VendingMallList from './VeningMallMacInfo'

@observer
class VendingMachineMan extends Component {
    render (){
        return(
            <div className="VendingMachineForm">
                 <AdminBreadcrumb bcRoute={[{ title: '公司管理', path: '' }, { title: '售卖机管理', path: 'admin/Company/VendingMachineManagement' }]} />
                 <div className="VendingMachineFormWrap">
                    <div className="VendingMachineFormLeft">
                        <MallList />
                    </div>
                    <div className="VendingMachineFormRight">
                        <VendingMallList />
                    </div>
                 </div>
            </div>
        )
    }
}


export default VendingMachineMan;