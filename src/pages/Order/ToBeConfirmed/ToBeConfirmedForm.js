
import React, { Component } from 'react';
import { Table, Input, Form, Button, Icon, Popconfirm, Card } from 'antd';
import { ToBeConfirmedStores } from '@/store/store.js';
import { withRouter } from 'react-router-dom';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import ToBeConfirmedFormList from './ToBeConfirmedFormList.js'
const FormItem = Form.Item;
let formData = new FormData();

const columns = [
    { title: 'itemID', dataIndex: 'ItemID ', key: 'itemID', width: 100 },
    { title: '商品ID', dataIndex: 'ProductID ', key: '0', width: 100, },
    { title: '商品名', dataIndex: 'ProductName', key: '1' },
    { title: '积分价值', dataIndex: 'ConsumeCents ', key: '2', width: 100, },
    { title: '数量', dataIndex: 'ProductNum ', key: '3', width: 100, },
    { title: '消费金额', dataIndex: 'ConsumeUnit ', key: '5', width: 100, },
    { title: '是否已拆单', dataIndex: 'IsSplit ', key: '6',fixed: 'right', width: 100 },
];

@withRouter
class ToBeConfirmedForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {
        //console.log(ToBeConfirmedStores.getToBeConfirmedEditInfoState.OrderID);GetPaggingOrderItem
        ToBeConfirmedStores.GetPaggingOrderItemState({
            orderID: ToBeConfirmedStores.getToBeConfirmedEditInfoState.OrderID,
        })

    }
    //取消订单
    orderCancel() {
        ToBeConfirmedStores.changeOrderCancel({
            orderID: ToBeConfirmedStores.getToBeConfirmedEditInfoState.OrderID,
        })
    }
    //确认订单
    gocConfirmOrder() {
        ToBeConfirmedStores.changeGocConfirmOrder({
            orderID: ToBeConfirmedStores.getToBeConfirmedEditInfoState.OrderID,
        })
    }

    handleCancel = () => {
        //this.props.history.push('/admin/company/comManagement/Table');
    }


    render() {


        const props = {

        };
        return (
            <div className="Home Modules">
                <AdminBreadcrumb bcRoute={[{ title: '订单管理', path: '' }, { title: '订单待确认', path: '/admin/Order/ToBeConfirmed/ToBeConfirmedTable' }, { title: '编辑', path: '' }]} />
                <div className="ToBeConfirmedForms">
                    <Card
                        type="inner"
                        title={
                            <div className="ToBeConfirmedForm">
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
                                    {/* <Button type="primary" icon="edit">编辑订单</Button>
                                    <Button type="primary" icon="save">保存订单</Button>
                                    <Button type="primary" icon="reload">返回上一页</Button> */}
                                </div>
                            </div >
                        }
                    >
                        <div className='ToBeConfirmedForm'>
                            <ToBeConfirmedFormList />
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
                                    dataSource={ToBeConfirmedStores.PaggingOrderItemState.length>0?ToBeConfirmedStores.PaggingOrderItemState:null}
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


export default ToBeConfirmedForm;