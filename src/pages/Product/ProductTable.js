import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '@/assets/style/scss/modules/Product/productList.scss';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import {ProductListStores} from '@/store/store.js'
import { Table, Button,Popconfirm } from 'antd';
import {observer} from 'mobx-react'


@withRouter
@observer
class ProductInfo extends Component {
    state = {
        isEdit: false,
        editInfo:null,
        columns : [
            { title: '商品ID',  dataIndex: 'productID', key: '1' ,width:220 },
            { title: '商品名称',  dataIndex: 'productName', key: '2', },
            { title: '商品来源', dataIndex: 'productSourceType', key: '3',width: 150,  },
            { title: '是否显示', dataIndex: 'isShow', key: '4', width: 150,},
            { title: '浏览量', dataIndex: 'viewNum', key: '5', width: 150, },
            { title: '销售量', dataIndex: 'sellNum', key: '6', width: 150,},
            { title: '功能', key: 'edit',width: 140,
            render: ( record) => {
                return(
                    (
                      <div className='edit'>
                        <Button type="primary" icon="edit" onClick={this.handleEdit.bind(this,record)} ></Button>
                        <Popconfirm title="确认删除此信息?" onConfirm={this.handleDelete.bind(this,record)}>
                            <Button type="danger" icon="delete" ></Button>
                        </Popconfirm>
                      </div> 
                    ) 
                )
             }
            }
        ],
        
    }
    componentWillMount(){
        ProductListStores.changeProductInfoState(1);
    }
    handleAdd = () => {
        this.props.history.push('/admin/Product/ProductInfo/Add');
        ProductListStores.getIsEditState(false);
    }
    handleEdit = (info) => {
        this.props.history.push('/admin/Product/ProductInfo/Add');
        ProductListStores.getProductEditInfoState(info) ;
        ProductListStores.getIsEditState(true);
    }

    handleDelete = (info) => {
        ProductListStores.delProductInfoState(info.productID);
    }
   
    
    

    render() {
        return (
        <div className="ProductInfo">
            <AdminBreadcrumb bcRoute={[{ title: '商品', path: '' }, { title: '商品列表', path: 'admin/Product/ProductInfo' }]} />
            <div className="mainContentWarp">
                    <div className="mainContent">
                        <Table className="tableList"
                            columns={this.state.columns}
                            size={'small'}
                            bordered
                            dataSource={ProductListStores.getProductInfoState.length>0?ProductListStores.getProductInfoState:null}
                            scroll={{ x: 1200,y:(document.body.offsetHeight-285)}}
                            pagination={
                                {
                                    "defaultPageSize":30,
                                    "total":ProductListStores.getTotalPageState,
                                    onChange:function(page){
                                        ProductListStores.changeProductInfoState(page);
                                    }
                                }
                            }
                            title={() => {
                                return (
                                    <Button type="primary" icon="plus" 
                                    onClick={() => this.handleAdd()}>新增</Button>
                                );
                            }} />
                    </div>
            </div>
           
        </div>
        );
    }
}

export default ProductInfo;
