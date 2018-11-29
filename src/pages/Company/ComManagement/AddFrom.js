import React, { Component } from 'react';
import { Input, Form, message, Upload, Button, Icon, Card } from 'antd';
import { ComManStores } from '@/store/store.js'
import { withRouter } from 'react-router-dom'
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import '@/assets/style/scss/modules/Company/ComManagement.scss';
const FormItem = Form.Item;
let formData = new FormData();

@withRouter
class AddComInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    // componentWillMount(){
    //     console.log(ComManStores.getCompanyEditInfoState,ComManStores.getCompanyisAddState);
    // }
    //提交公司信息
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ComManStores.getCompanyisAddState ? formData.append("header.serviceCode", "TFC005")
                    : formData.append("header.serviceCode", "TFC006")
                formData.append("header.passwd", "123456")
                formData.append("header.version", "string")
                formData.append("header.seqNo", "string")
                formData.append("header.datetime", "123456")
                formData.append("header.channel", "JG_001")
                ComManStores.getCompanyisAddState ?
                    formData.append("header.ext", "string") :
                    formData.append("body.companyID", ComManStores.getCompanyEditInfoState.ID)
                for (let item in values) {
                    formData.append(`body.${item}`, values[item])
                }
                // if(ComManStores.getCompanyisAddState){
                //     console.log(123);
                // }else{
                //     ComManStores.addCompanyInfoState(formData)
                // }
                ComManStores.getCompanyisAddState ? ComManStores.addCompanyInfoState(formData) : ComManStores.reviseCompanyInfoState(formData)
                this.props.history.push('/admin/company/comManagement/Table');
                // 查看formdata数据
                // formData.forEach((element,i) => {
                //     console.log(i，element);
                // });
            } else {
                message.error('该填的都填了，是你的逃不掉');
            }

        });
    }
    handleCancel = () => {
        this.props.history.push('/admin/company/comManagement/Table');
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const props = {
            name: 'file',
            action: '',
            beforeUpload(file) {
                // console.log(file);
                formData.append("file", file, file.name);
            },
            onChange(info) {
                //   if (info.file.status !== 'uploading') {
                //     console.log(info.file, info.fileList);
                //   }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 图片放置成功`);
                } else if (info.file.status === 'error') {
                    message.success(`${info.file.name} 图片放置成功`);
                }
            },
        };

        return (
            <div className='addNewCom'>
                <AdminBreadcrumb bcRoute={[{ title: '公司', path: '' }, { title: '公司列表', path: 'admin/company/comManagement/Table' }, { title: '详情内容', path: 'admin/company/comManagement/Add' }]} />
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
                            <FormItem label="公司名称" className='companyInputMessage'>
                                {getFieldDecorator('CompanyName', {
                                    initialValue: ComManStores.getCompanyisAddState ? "" : ComManStores.getCompanyEditInfoState.company,
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="30px" />
                                )}
                            </FormItem>
                            <FormItem label="密码：" className='companyInputMessage'>
                                {getFieldDecorator('PassWord', {
                                    initialValue: ComManStores.getCompanyisAddState ? "" : ComManStores.getCompanyEditInfoState.passWord,
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="联系人：" className='companyInputMessage'>
                                {getFieldDecorator('ContactUser', {
                                    initialValue: ComManStores.getCompanyisAddState ? " " : ComManStores.getCompanyEditInfoState.contactUser,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="公司Logo:" className='companyInputMessage'>
                                {getFieldDecorator('comLogo', {
                                    initialValue: " ",
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload" /> 点击上传图片
                                </Button>
                                    </Upload>,
                                )}
                            </FormItem>
                            <FormItem label="联系人邮箱:" className='companyInputMessage'>
                                {getFieldDecorator('ContactEmail', {
                                    initialValue: ComManStores.getCompanyisAddState ? " " : ComManStores.getCompanyEditInfoState.Email,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="联系人称谓:" className='companyInputMessage'>
                                {getFieldDecorator('ContactMember', {
                                    initialValue: ComManStores.getCompanyisAddState ? " " : ComManStores.getCompanyEditInfoState.contactMember,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="联系人手机:" className='companyInputMessage'>
                                {getFieldDecorator('ContactPhone', {
                                    initialValue: ComManStores.getCompanyisAddState ? " " : ComManStores.getCompanyEditInfoState.phone,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="客户编号:" className='companyInputMessage'>

                                {getFieldDecorator('SAPClientCode', {
                                    initialValue: ComManStores.getCompanyisAddState ? "" : ComManStores.getCompanyEditInfoState.SAPClientCode,
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(  
                                    ComManStores.getCompanyisAddState
                                    ? <Input size="default" width="20px" />
                                    : <Input size="default" width="20px" disabled="true" />
                                  
                                )}
                            </FormItem>
                            <FormItem label="积分单位（英文）:" className='companyInputMessage'>
                                {getFieldDecorator('CentUnit', {
                                    initialValue: " ",
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="积分单位名称（中文）:" className='companyInputMessage'>
                                {getFieldDecorator('CentName', {
                                    initialValue: ComManStores.getCompanyisAddState ? "" : ComManStores.getCompanyEditInfoState.CentName,
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="公司标识(样式):" className='companyInputMessage'>
                                {getFieldDecorator('CSSDIR', {
                                    initialValue: ComManStores.getCompanyisAddState ? " " : ComManStores.getCompanyEditInfoState.cssdir,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="ComState:" className='companyInputMessage'>
                                {getFieldDecorator('ComState', {
                                    initialValue: ComManStores.getCompanyisAddState ? " " : ComManStores.getCompanyEditInfoState.comState,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="TransformGene:" className='companyInputMessage'>
                                {getFieldDecorator('TransformGene', {
                                    initialValue: ComManStores.getCompanyisAddState ? " " : ComManStores.getCompanyEditInfoState.transformGene,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="SAPTacticCode:" className='companyInputMessage'>
                                {getFieldDecorator('SAPTacticCode', {
                                    initialValue: ComManStores.getCompanyisAddState ? " " : ComManStores.getCompanyEditInfoState.sapTacticCode,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="SAPClientType:" className='companyInputMessage'>
                                {getFieldDecorator('SAPClientType', {
                                    initialValue: " ",
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
    //     if(ComManStores.getCompanyEditInfoState==null){
    //         console.log('获取不到值');
    //     }else{

    //     }
    // }
}
const addComInfo = Form.create()(AddComInfo)

export default addComInfo;