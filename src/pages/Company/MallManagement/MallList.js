import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '@/assets/style/scss/modules/ComManagement.scss';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import { Table, Button,Popconfirm,Modal} from 'antd';
import {MallManagementStores} from '@/store/store.js'
import {observer} from 'mobx-react'
const confirm = Modal.confirm;

@withRouter
@observer
class MallList extends Component {
   
    state = {
        modalVisible: false,
        isEdit: false,
        editInfo:null,
        columns : [
            { title: '商城ID',  dataIndex: 'mallID', key: '1',width: 120, },
            { title: '商城名称',  dataIndex: 'mallName', key: '2' },
            { title: '公司名称', dataIndex: 'companyName', key: '3',width: 120,  },
            { title: '所属仓储公司', dataIndex: 'warehouseCompanyName', key: '4', width: 150,},
            { title: '商城类型', dataIndex: 'mallType', key: '5', width: 120, },
            { title: '状态', dataIndex: 'isUse', key: '6', width: 120,},
            { title: 'CSSDIR', dataIndex: 'cssdir', key: '7', width: 120,},
            { title: '用户认证名称', dataIndex: 'certifiedRemark', key: '8', width: 120,},
            { title: '创建时间', dataIndex: 'createTime', key: '9', width: 120,},
            { title: '功能', key: 'edit',width: 150,
            render: ( record) => {
                return(
                    MallManagementStores.getMallInfoState.length > 1
                    ? (
                      <div className='edit'>
                        <Button type="primary" icon="edit"  onClick={this.handleEdit.bind(this,record)} ></Button>
                        {/* {this.enterIconLoading.bind(this,record)} */}
                        <Button type="primary" icon="poweroff" onClick={this.showConfirm.bind(this,record)} ></Button>
                        <Popconfirm title="确认删除此信息?" onConfirm={this.handleDelete.bind(this,record)}>
                            <Button type="danger" icon="delete"></Button>
                        </Popconfirm>
                      </div> 
                    ) : null
                )
             }
            }
        ]
    }
    handleEdit = async(info) => {
        MallManagementStores.takeMallisAddState(false)
        await MallManagementStores.takeMallDetailState(info.mallID)
        
        
        this.props.history.push('/admin/company/MallManagement/MallForm');
    }
    handleAdd = () => {
        // MallManagementStores.takeMallDetailState(value)
        MallManagementStores.takeMallisAddState(true)
        this.props.history.push('/admin/company/MallManagement/MallForm');
    }
    handleDelete = (info) => {
        // console.log(info.mallID);
        let dataArr = {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode":"TFM002",
                "seqNo": "string",
                "datetime": "string",
                "channel": "JG_001",
                "ext": "string"
              },
              "body":{
                  "mallID":info.mallID
              }
        }
        MallManagementStores.delMallisInfoState(dataArr)    
    }
    showConfirm = async(info) => {
        await MallManagementStores.takeMallDetailState(info.mallID)
        let isUse = MallManagementStores.getMallDetailState.shoppingmall.isUse
        let dataArr = {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode":"TFM007",
                "seqNo": "string",
                "datetime": "string",
                "channel": "JG_001",
                "ext": "string"
              },
              "body":{
                  "mallID":info.mallID,
                  "isUse": isUse
              }
            }
        confirm({
            title: isUse == 1?"冻结":"解冻",
            content: isUse == 1?'该商场状态为正在使用，是否确定冻结？':"该商场状态为未使用，是否确定解冻？",
            okText: '确定',
            cancelText: '取消',
            onOk() {
                MallManagementStores.freezeMallState(dataArr)
            },
            // onCancel() {
            //   console.log('Cancel');
            // },
          });
    }

   
    componentWillMount(){
        MallManagementStores.takeMallInfoState()
        // console.log(MallManagementStores.getMallInfoState);
        
    }
    render(){
        return (
        <div className='productPage'>
        {/* <Spin size="large" tip="Loading..." /> */}
            <AdminBreadcrumb bcRoute={[{ title: '公司', path: '' }, { title: '商城列表', path: 'admin/company/MallManagement' }]} />
            <div className="mainContentWarp">
                    <div className="mainContent">
                        <Table className="tableList"
                            size={'small'}
                            columns={this.state.columns}
                            bordered
                            dataSource={MallManagementStores.getMallInfoState.length>0?MallManagementStores.getMallInfoState:null}
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
        </div>
        )
    }
}

export default MallList;
