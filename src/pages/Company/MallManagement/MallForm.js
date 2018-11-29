import React, { Component } from 'react';
import { Input, Form, message, Button, Card,Select,Upload,Icon } from 'antd';
import { MallManagementStores } from '@/store/store.js'
import { withRouter } from 'react-router-dom'
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import '@/assets/style/scss/modules/Company/ComManagement.scss';
const FormItem = Form.Item;
const Option = Select.Option;
let formData = new FormData();
// let mallTypeDefaults = mallTypeDefault()

@withRouter
class AddComInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount(){
        console.log(MallManagementStores.getMallDetailState);
    }
    //提交信息
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {

                    MallManagementStores.getMallisAddState ? formData.append("header.serviceCode", "TFM003")
                    : formData.append("header.serviceCode", "TFM004")
                    formData.append("header.passwd", "123456")
                    formData.append("header.version", "string")
                    formData.append("header.seqNo", "string")
                    formData.append("header.datetime", "123456")
                    formData.append("header.channel", "JG_001")
                    formData.append("header.ext", "string")
                    for (let item in values) {
                        formData.append(`body.${item}`, values[item])
                    }
                   console.log(values);
                   
                    MallManagementStores.getMallisAddState ? MallManagementStores.takeMallAddState(formData) :
                    MallManagementStores.takeMallisUpdateState(formData)
                } else {
                    message.error('有些必填的没有填噢');
                }
                this.props.history.push('/admin/Product/ProductInfo/Table')
            })
    }
    handleCancel = () => {
        this.props.history.push('/admin/company/MallManagement/MallList');
    }

    //数据处理
    mallTypeDefault= () => {
        if(MallManagementStores.getMallDetailState.shoppingmall.mallType=='0'){
            return '自营'
        }else if(MallManagementStores.getMallDetailState.shoppingmall.mallType=='1'){
            return '京东'
        }else{
            return '售卖机'
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const props = {
            name: 'file',
            action: '',
            beforeUpload(file) {
                formData.append("file", file, file.name);
            }
        };

        return (
            <div className='addNewCom'>
                <AdminBreadcrumb bcRoute={[{ title: '公司', path: '' }, { title: '商城列表', path: '/admin/company/MallManagement' }, { title: '详情内容', path: '/admin/company/MallManagement/MallForm' }]} />
                <div className='cardEdit'>
                    <Card
                        type="inner"
                        extra={
                            <div>
                                <Button type="primary" onClick={this.handleSubmit} >提交</Button>
                                <Button onClick={this.handleCancel} >取消</Button>
                            </div>
                        }
                    >
                        <Form className='companyInfo'>
                            <FormItem label="商城名称" className='companyInputMessage'>
                                {getFieldDecorator('mallName', {
                                    initialValue: MallManagementStores.getMallisAddState ? "" : MallManagementStores.getMallDetailState.shoppingmall.mallName,
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="30px" />
                                )}
                            </FormItem>
                            <FormItem label="商城logo" className='companyInputMessage'>
                                {getFieldDecorator('mallLogo', {
                                    initialValue: MallManagementStores.getMallisAddState ? "" : MallManagementStores.getMallDetailState.shoppingmall.mallLogo,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload" /> 点击此上传图片
                                        </Button>
                                    </Upload>,
                                )}
                            </FormItem>
                            <FormItem label="商城类型" className='companyInputMessage'>
                                {getFieldDecorator('mallType', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : this.mallTypeDefault(),
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Select  size="default" placeholder="必填" style={{ width: 155 }} >
                                        <Option value="0">自营</Option>
                                        <Option value="1">京东</Option>
                                        <Option value="2">售卖机</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="是否使用:" className='companyInputMessage'>
                                {getFieldDecorator('isUse', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.shoppingmall.isUse=="0"?"是":"否",
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
                            <FormItem label="是否使用小数位:" className='companyInputMessage'>
                                {getFieldDecorator('IsDecimal', {
                                    initialValue: MallManagementStores.getMallisAddState ? true : MallManagementStores.getMallDetailState.shoppingmall.IsDecimal=="0"?"是":"否",
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
                            <FormItem label="小数位位数:" className='companyInputMessage'>
                                {getFieldDecorator('DecimalPlaces', {
                                    initialValue: MallManagementStores.getMallisAddState ? "0" : MallManagementStores.getMallDetailState.shoppingmall.decimalPlaces,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Select  size="default" placeholder="必填" style={{ width: 155 }} >
                                        <Option value="0">0</Option>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="CSSDIR:" className='companyInputMessage'>
                                {getFieldDecorator('cssdir', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.shoppingmall.cssdir,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="用户认证名称:" className='companyInputMessage'>
                                {getFieldDecorator('certifiedRemark', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.shoppingmall.certifiedRemark,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="始发地:" className='companyInputMessage'>
                                {getFieldDecorator('origin', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.origin,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="初始公司利润率:" className='companyInputMessage'>

                                {getFieldDecorator('initialCompanyProfitRatio', {
                                    initialValue: MallManagementStores.getMallisAddState ? "" : MallManagementStores.getMallDetailState.shoppingmall.initialCompanyProfitRatio,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="初始用户利润率:" className='companyInputMessage'>
                                {getFieldDecorator('initialEmployeeProfitRatio', {
                                    initialValue: MallManagementStores.getMallisAddState ? "" : MallManagementStores.getMallDetailState.shoppingmall.initialEmployeeProfitRatio,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="收费模式:" className='companyInputMessage'>
                                {getFieldDecorator('chargeMode', {
                                    initialValue: MallManagementStores.getMallisAddState ? "" : MallManagementStores.getMallDetailState.ftemplete.chargeMode=='Weight'?"计重(g)":"计体积(cm3)",
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Select  size="default" placeholder="必填" style={{ width: 155 }} >
                                        <Option value="Weight">计重(g)</Option>
                                        <Option value="Volume">计体积(cm3)</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="发货时间:" className='companyInputMessage'>
                                {getFieldDecorator('deliverSpeed', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.deliverSpeed,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Select  size="default" placeholder="必填" style={{ width: 155 }} >
                                        <Option value="24h">24h</Option>
                                        <Option value="48h">48h</Option>
                                        <Option value="3d">3d</Option>
                                        <Option value="5d">5d</Option>
                                        <Option value="10d">10d</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="首重收费" className='companyInputMessage'>
                                {getFieldDecorator('firstCharge', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.firstCharge,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="首重:" className='companyInputMessage'>
                                {getFieldDecorator('firstCount', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.firstCount,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="模板ID:" className='companyInputMessage'>
                                {getFieldDecorator('fTempleteID', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.fTempleteID,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="模板名称:" className='companyInputMessage'>
                                {getFieldDecorator('fTempleteName', {
                                    initialValue:  MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.fTempleteName,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="续(重)收费:" className='companyInputMessage'>
                                {getFieldDecorator('nextCharge', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.nextCharge,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="续(重):" className='companyInputMessage'>
                                {getFieldDecorator('nextCount', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.nextCount,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="来源:" className='companyInputMessage'>
                                {getFieldDecorator('origin', {
                                    initialValue: MallManagementStores.getMallisAddState ? " " : MallManagementStores.getMallDetailState.ftemplete.origin,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                        </Form>
                    </Card>
                </div>

            </div>
        )
    }
    // componentDidUpdate(){
    //     if(MallManagementStores.getMallDetailState==null){
    //         console.log('获取不到值');
    //     }else{

    //     }
    // }
}
const addComInfo = Form.create()(AddComInfo)

export default addComInfo;