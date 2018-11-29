import React, { Component } from 'react';
import { MallVendingMacStores } from '@/store/store.js'
import '@/assets/style/scss/modules/ComManagement.scss';
import { Table,Button,Modal,Select,Form } from 'antd';
import { observer } from 'mobx-react'
import AddMacForm from './addMacForm'
const Option = Select.Option;
const FormItem = Form.Item;
// let formData = new FormData();


@observer
class VendingMallList extends Component {
    
    state = {
        visible: false,
        ExportVsible:false,
        columns: [
            { title: '机器码', dataIndex: 'machineCode', key: '1', width: 120 },
            { title: '所属商城', dataIndex: 'mallName', key: '2', width: 110 },
            { title: '所属公司', dataIndex: 'companyName', key: '3', width: 150 },
            { title: '地址', dataIndex: 'address', key: '4' },
            { title: '状态', dataIndex: 'isUse', key: '5', width: 100 },
            { title: '重量', dataIndex: 'weight', key: '6', width: 100 },
            { title: '宽度', dataIndex: 'width', key: '7', width: 100 },
            { title: '高度', dataIndex: 'height', key: '8', width: 100 },
        ]
    }

    visChange(mode){
        this.setState({
          visible:mode
        })
        MallVendingMacStores.getAllMallStates() 
    }  
    ExportCancel(mode){
        this.setState({
            ExportVsible:mode
        })
        if(mode){
            MallVendingMacStores.getAllMallStates() 
        }
    }  
    ExportOK(mode){
        this.setState({
            ExportVsible:mode
        })
        this.props.form.validateFields((err, values) => {
            if(!err){
                let val
                 for(let item in values){
                     val = values[item]
                }
                // console.log(val);
                let dataArr = {
                    "header": {
                        "passwd": "123456",
                        "version": "string",
                        "serviceCode": "TFV009",
                        "seqNo": "string",
                        "datetime": "string",
                        "channel": "JG_001",
                        "ext": "string"
                      },
                      "body": {
                        "mallID": val
                      }
                }
                MallVendingMacStores.ExportMallStates(dataArr)
                
            }
        })
    }  
    // chooseMall(val){
    //     MallVendingMacStores.takeExportMallIDState(val)
    //     console.log(MallVendingMacStores.getExportMallIDState);
        
    // }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="mainContentWarp">
                <div className="mainContent">
                    <Table className="tableList"
                        size={'small'}
                        columns={this.state.columns}
                        bordered
                        dataSource={MallVendingMacStores.getMallMacState.length > 0 ? MallVendingMacStores.getMallMacState : null}
                        scroll={{ y: (document.body.offsetHeight - 230) }}
                        pagination={false}
                        title={() => {
                            return (
                                <div>
                                    <Button type="primary" icon="plus"
                                        onClick={() => this.visChange(true)}>新增</Button>
                                    <Button type="primary" 
                                        onClick={() => this.ExportCancel(true)}>导出</Button>
                                </div>
                            );
                        }} />
                    <AddMacForm 
                    visible={this.state.visible}
                    visChange={mode=>this.visChange(mode)} /> 
                    </div>
                    <Modal
                        title="新增信息框"
                        visible={this.state.ExportVsible}
                        onOk={()=>{this.ExportOK(false)}}
                        onCancel={()=>{this.ExportCancel(false)}}
                    >
                    <Form className='companyInfo'>
                    <FormItem label="商城" className='companyInputMessage'>
                         
                         {getFieldDecorator('mallID', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                            <Select  size="default" placeholder="必填" style={{ width: 155 }} >
                                {
                                    MallVendingMacStores.getAllMallState.map((item,index) => {
                                    return(
                                    <Option key={index} value={item.mallID}  >{item.mallName}</Option>
                                    )
                                })
                                }
                            </Select>
                        )}
                                
                    </FormItem>
                    </Form>    
                    </Modal>
            </div>
        )
    }
}
const VendingMallLists = Form.create()(VendingMallList)
export default VendingMallLists;