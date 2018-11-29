import React, { Component } from 'react';
import { Modal,Form, Input,Select} from 'antd';
import { MallVendingMacStores } from '@/store/store.js'
import '@/assets/style/scss/modules/ComManagement.scss';
import { observer } from 'mobx-react'
const FormItem = Form.Item;
const Option = Select.Option;
// let formData = new FormData();

@observer
class MacAddForm extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentWillMount(){
        // console.log(MallVendingMacStores.getAllMallState);<Option value="false">是</Option>
        
    }
    handleSumbit(){
        this.props.form.validateFields((err, values) => {
            // console.log(values);
            
            if(!err){
                // console.log(values);
                let dataArr = {
                    "header": {
                        "passwd": "123456",
                        "version": "string",
                        "serviceCode": "TFV006",
                        "seqNo": "string",
                        "datetime": "string",
                        "channel": "JG_001",
                        "ext": "string"
                      },
                      "body":values
                    }
                // console.log(values);
                
                MallVendingMacStores.AddMallStates(dataArr)
                
            }else{
                message.error('有些必填的没有填噢');
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="新增信息框"
                width={880}
                visible={this.props.visible}
                onOk={()=>{this.handleSumbit()}}
                onCancel={()=>{this.props.visChange(false)}}
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
                                        <Option key={index} value={item.mallID}>{item.mallName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="售卖机编号" className='companyInputMessage'>
                        {getFieldDecorator('machineCode', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="WarehouseID" className='companyInputMessage'>
                        {getFieldDecorator('warehouseID', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="重量" className='companyInputMessage'>
                        {getFieldDecorator('weight', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="宽度" className='companyInputMessage'>
                        {getFieldDecorator('width', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="高度" className='companyInputMessage'>
                        {getFieldDecorator('height', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="长度" className='companyInputMessage'>
                        {getFieldDecorator('length', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="厂商" className='companyInputMessage'>
                        {getFieldDecorator('vMachineVender', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="类型" className='companyInputMessage'>
                        {getFieldDecorator('vMachineKind', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="地址" className='companyInputMessage'>
                        {getFieldDecorator('address', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                                <Input size="default" width="30px" />
                        )}
                    </FormItem>
                    <FormItem label="是否正在使用" className='companyInputMessage'>
                        {getFieldDecorator('isUse', {
                            initialValue:"",
                            rules: [{
                                required: false, message: '必填',
                            }],
                        })(
                            <Select  size="default" placeholder="必填" style={{ width: 155 }} >
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                            
                        )}
                    </FormItem>
                </Form>     
            </Modal>
        )
    }
}
const MacAddForms = Form.create()(MacAddForm)
export default MacAddForms;