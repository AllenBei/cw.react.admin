import React, { Component } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
// import { withRouter } from 'react-router-dom'
import { Table, Button, } from 'antd';
import { InStockStores } from '@/store/store.js';
import InStockSearchModal from './InStockSearchModal.js';
import { observer } from 'mobx-react'


@observer
class InStockTable extends Component {

    componentWillMount() {	
                InStockStores.getInstockListState({	
                    mobile: '',	
                    name: '',	
                    thirdOrderID: '',	
                    orderID: '',	
                    isSplit: true,	
                })
                // console.log(module);
                	
            }	
        	
            state = {	
                inputValue: [],	
                columns: [	
                    { title: '订单号', dataIndex: 'orderID', key: 'OrderID', width: 200 },	
                    { title: '父订单号', dataIndex: 'pOrderID', key: 'MallName', width: 200 },	
                    { title: '所属商城', dataIndex: 'mallName', key: '1' },	
                    { title: '手机', dataIndex: 'mobile', key: '2', width: 120, },	
                    { title: '收货人', dataIndex: 'name', key: '3', width: 100, },	
                    { title: '金额', dataIndex: 'consumeCents', key: '5', width: 100, },	
                    { title: '订单状态', dataIndex: 'processState', key: '6', width: 100 },	
                    { title: '配送方式', dataIndex: 'deliverMode', key: '7', width: 100 },	
                    { title: '结算时间', dataIndex: 'payDate', key: '8', width: 150 },	
                    { title: '第三方订单号', dataIndex: 'thirdOrderID', key: '9', width: 150 },	
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
                // console.log(info.);
                InStockStores.getInStockDListState(info)	
                this.props.history.push('/admin/Order/InStock/InStockEditForm');	
            }	
            handleSearchModal = () => {	
                InStockStores.setInstockSearchState({ flag: true })	
            }	
        	
        	
        	
                render() {
                 return (	         
                    <div className="Home Modules">	          
                        <AdminBreadcrumb bcRoute={[{ title: '订单管理', path: '' }, { title: '备货中', path: '' }]} />
                        <div className="orderContent">	
                            {/* 表格 */}	
                            <div className="orderTable">	
                                <Table className="tableList"	
                                    bordered	
                                   columns={this.state.columns}	
                                   dataSource={InStockStores.InstockListStates.length > 0 ? InStockStores.InstockListStates : null}	
                                    scroll={{ x: 1700, y: (document.body.offsetHeight  -285) }}	
                                    pagination={	
                                        {	
                                            defaultPageSize: 30	
                                        }	
                                    }	
                                    title={() => {	
                                        return (	
                                            <Button type="primary" icon="search" onClick={() => { this.handleSearchModal() }}>查找</Button>	
                                        );	
                                    }} />	
                            </div>	
                            <InStockSearchModal />	
                        </div>	
        
            </div>
        );
    }
}
export default InStockTable;