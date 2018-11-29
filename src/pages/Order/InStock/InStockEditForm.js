
import React, { Component } from 'react';
import { Table, Input, Form, Button, Icon, Popconfirm, Card } from 'antd';
import { InStockStores } from '@/store/store.js';
import { withRouter } from 'react-router-dom';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import InStockInfoList from './InStockInfoList.js'
import { observer } from 'mobx-react'

const columns = [
    { title: 'itemID', dataIndex: 'itemID', key: 'itemID',width: 200, },
    { title: '商品ID', dataIndex: 'productID', key: '0', width: 100, },
    { title: '商品名', dataIndex: 'productName', key: '1',width: 200, },
    { title: '积分价值', dataIndex: 'consumeCents', key: '2', width: 100, },
    { title: '数量', dataIndex: 'productNum', key: '3', width: 100, },
    { title: '消费金额', dataIndex: 'consumeUnit', key: '5', width: 100, },
    { title: '是否已拆单', dataIndex: 'isSplit', key: '6', width: 100 },
];

@withRouter
@observer
class InStockEditForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {
        if(InStockStores.InStockDListStates!==null){
            InStockStores.getInstockDInfoState(InStockStores.InStockDListStates.orderID);
            InStockStores.getInstockOrderState(InStockStores.InStockDListStates.orderID);
        }else{
            this.props.history.push('/admin/Order/InStock/InStockTable');
        };
    }
    //取消订单
    orderCancel() {
       
    }
    //确认订单
    gocConfirmOrder() {
       
    }

    handleCancel = () => {
        this.props.history.push('/admin/Order/InStock/InStockTable');
    }


    render() {


        const props = {

        };
        return (
            <div className="Home Modules">
                <AdminBreadcrumb bcRoute={[{ title: '订单管理', path: '' }, { title: '备货中', path: '/admin//Order/InStock/InStockTable' }, { title: '编辑', path: '' }]} />
                <div className="ToBeConfirmedForms">
                    <Card
                        type="inner"
                        title={
                            <div className="ToBeConfirmedForm">
                                <div className="table-operations">
                                    <Button disabled type="primary" icon="edit">拆单</Button>
                                    <Popconfirm title="是否确认订单?" onConfirm={() => { this.gocConfirmOrder() }}>
                                        <Button disabled type="primary" icon="check">确认订单</Button>
                                    </Popconfirm>
                                    <Button  disabled type="primary" icon="edit">填写物流回执</Button>
                                    <Button disabled type="primary" icon="edit">打印快递单</Button>
                                    <Popconfirm title="确认取消订单?" onConfirm={() => { this.orderCancel() }}>
                                        <Button disabled type="danger" icon="close">取消订单</Button>
                                    </Popconfirm>
                                    <Button disabled type="primary" icon="edit">编辑订单</Button>
                                    <Button disabled type="primary" icon="save">保存订单</Button>
                                    {/* <Button type="primary" icon="reload">返回上一页</Button> */}
                                </div>
                            </div >
                        }
                    >
                        <div className='ToBeConfirmedForm'>
                            <InStockInfoList />
                        </div>
                    </Card>
                </div>

                {/* 表头按钮 */}
                {/* <div className="ToBeConfirmedForm">
                    <div className="table-operations">
                        <Button type="primary" icon="edit">拆单</Button>
                        <Popconfirm title="是否确认订单?" onConfirm={() => { this.gocConfirmOrder() }}>
                            <Button type="primary" icon="check">确认订单</Button>
                        </Popconfirm>
                        <Button type="primary" icon="edit">填写物流回执</Button>
                        <Button type="primary" icon="edit">打印快递单</Button>
                        <Popconfirm title="确认取消订单?" onConfirm={() => { this.orderCancel() }}>
                            <Button type="danger" icon="close">取消订单</Button>
                        </Popconfirm>
                        <Button type="primary" icon="edit">编辑订单</Button>
                        <Button type="primary" icon="save">保存订单</Button>
                        <Button type="primary" icon="reload">返回上一页</Button>
                    </div>
                </div > */}

                {/* 表单*/}
                {/* <div className='ToBeConfirmedForm'>
                    <ToBeConfirmedFormList />
                </div> */}

                {/* 表格 */}
                <div className="ToBeConfirmedForms">
                    <Card type="inner">
                        <div className="ToBeConfirmedForm">
                            <div className="porderTable">
                                <Table className="tableList"
                                    bordered
                                    columns={columns}
                                    dataSource={InStockStores.InstockOrderStates.length>0?InStockStores.InstockOrderStates:null}
                                    scroll={{ x: 1700, y: (document.body.offsetHeight - 285) }}
                                    pagination={
                                        {
                                            defaultPageSize: 30
                                        }
                                    } />
                            </div>
                        </div>
                    </Card>
                </div>

            </div >
        )
    }
    // componentDidUpdate(){
    //     if(ComManStores.getCompanyEditInfoState==null){
    //         console.log('获取不到值');
    //     }else{

    //     }
    // }
};


export default InStockEditForm;