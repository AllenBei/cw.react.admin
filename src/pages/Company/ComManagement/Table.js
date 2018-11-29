import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '@/assets/style/scss/modules/ComManagement.scss';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { Table, Button,Popconfirm } from 'antd';
import {ComManStores} from '@/store/store.js'
import {observer} from 'mobx-react'

@withRouter
@observer
class ProductList extends Component {
   
    state = {
        modalVisible: false,
        isEdit: false,
        editInfo:null,
        columns : [
            { title: '公司名称',  dataIndex: 'company', key: '1' },
            { title: '联系人',  dataIndex: 'contactUser', key: '2',width: 150, },
            { title: '联系人称谓', dataIndex: 'contactMember', key: '3',width: 150,  },
            { title: '联系人手机', dataIndex: 'phone', key: '4', width: 150,},
            { title: '积分单位', dataIndex: 'centName', key: '5', width: 150, },
            { title: '转换比例', dataIndex: 'rateToRMB', key: '6', width: 150,},
            { title: '功能', key: 'edit',width: 140,
            render: ( record) => {
                return(
                    ComManStores.getComInfoStatetate.length > 1
                    ? (
                      <div className='edit'>
                        <Button type="primary" icon="edit"  onClick={this.handleEdit.bind(this,record)} ></Button>
                        <Popconfirm title="确认删除此公司信息?" onConfirm={this.handleDelete.bind(this,record,record.ID)}>
                            <Button type="danger" icon="delete"></Button>
                        </Popconfirm>
                      </div> 
                    ) : null
                )
             }
            }
        ]
    }
    handleEdit = (info) => {
        ComManStores.getCompanyEditInfo(info)
        ComManStores.getCompanyisAdd(false)
        this.props.history.push('/admin/company/comManagement/Add');
    }
    handleAdd = (value) => {
        ComManStores.getCompanyisAdd(value)
        this.props.history.push('/admin/company/comManagement/Add');
    }
    handleDelete = (info,id) => {
        // console.log(id);
        ComManStores.delCompanyInfoState(id)
    }

    delCompanyInfo(item,index){
        console.log(item,index);
    }
    componentWillMount(){
        ComManStores.changeCompanyInfoState()
        console.log(ComManStores.getComInfoStatetate);
        
    }
    onShowSizeChange(pageNum){
        console.log(pageNum);
    }
    // setModalVisible=(modalVisible,isEdit)=>{
    //     this.setState({ modalVisible });
    //     this.setState({ isEdit });
    //     // console.log(this.state);
        
    // }
    setIsEditSend = (isEdit)=>{
        this.setState({isEdit})
        console.log(this.State.isEdit);
        
    }
    setGetComData = (editInfo)=>{
        this.setState({editInfo})
        // console.log(this.state);
    }

    onintegralChange(val){
        console.log(val,document.body.offsetHeight-270);
        
    }
    render(){
        return (
        <div className='productPage'>
        {/* <Spin size="large" tip="Loading..." /> */}
            <AdminBreadcrumb bcRoute={[{ title: '公司', path: '' }, { title: '公司列表', path: 'admin/company/comManagement/Table' }]} />
            <div className="mainContentWarp">
                    <div className="mainContent">
                        <Table className="tableList"
                            size={'small'}
                            columns={this.state.columns}
                            bordered
                            dataSource={ComManStores.getComInfoStatetate.length>0?ComManStores.getComInfoStatetate:null}
                            scroll={{ x: 1200,y:(document.body.offsetHeight-285)}}
                            pagination={
                                {
                                    "defaultPageSize":99,
                                    onChange:function(page){
                                        console.log(page);
                                    }
                                }
                            }
                            title={() => {
                                return (
                                    <Button type="primary" icon="plus" 
                                    onClick={() => this.handleAdd(true,false)}>新增</Button>
                                );
                            }} />
                    </div>
            </div>
            {/* 新增功能
               <Addcominfo
            //    modalVisible={this.state.modalVisible}
               setModalVisible={this.setModalVisible}
               isEdit={this.state.isEdit}
               editInfo={this.state.editInfo}
               />  */}
            
        </div>
        )
    }
}

export default ProductList;
