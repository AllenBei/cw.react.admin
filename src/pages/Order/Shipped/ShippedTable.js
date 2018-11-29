import React, { Component } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { withRouter } from 'react-router-dom'
// import { Table, Modal, Button, Input } from 'antd';
// import { ToBeConfirmedStores } from '@/store/store.js'
import { observer } from 'mobx-react'

@withRouter
@observer
class Shipped extends Component {

  state = {
    inputValue: [],
    columns: [
        { title: '订单号', dataIndex: 'OrderID', key: 'OrderID', width: 200 },
        { title: '所属商城', dataIndex: 'MallName', key: 'MallName' },
        { title: '手机', dataIndex: 'Mobile', key: '1', width: 150, },
        { title: '收货人', dataIndex: 'Name', key: '2', width: 100, },
        { title: '金额', dataIndex: 'ConsumeCents', key: '3', width: 100, },
        { title: '配送方式', dataIndex: 'DeliverMode', key: '5', width: 100, },
        { title: '拆单状态', dataIndex: 'IsSplit', key: '6', width: 100 },
        { title: '结算时间', dataIndex: 'OrderDate', key: '7', width: 200 },
        { title: '第三方订单号', dataIndex: 'ThirdOrderID', key: '8', width: 150 },
        {
            title: '功能', key: 'edit', fixed: 'right', width: 80,
            render: (record) => {
                return (
                    (
                        <div className='edit'>
                            <Button type="primary" icon="edit" onClick={this.handleEdit.bind(this, record)}></Button>
                        </div>
                    )
                )
            }
        }
    ]

}
handleEdit = (info) => {
  //ToBeConfirmedStores.getToBeConfirmedEditInfo(info)
  console.log(info);
  
}

  render() {
    return (
        <div className="Home Modules">
            <AdminBreadcrumb bcRoute={[{ title: '订单管理', path: '' }, { title: '订单已发货', path: '' }]} /> 
            <div>hello world</div>
        </div>
    );
  }
}

export default Shipped;