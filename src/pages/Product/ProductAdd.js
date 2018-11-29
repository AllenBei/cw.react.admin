import React, { Component } from 'react';
import { Input, Form, Upload, Button, Icon, message, Select, Card } from 'antd';
import ProductEditor from './ProductComponents/productEditor';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import '@/assets/style/scss/modules/Company/ComManagement.scss';
import { ProductListStores } from '@/store/store.js';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router-dom'

const FormItem = Form.Item;
let formData = new FormData();
const Option = Select.Option;

@withRouter
@observer
class productInfoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorContent: null,
        };
    }
    // componentWillMount(){
    //     console.log(ProductListStores.getIsEdit);

    // }


    //提交信息
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                ProductListStores.getIsEdit ? formData.append("header.serviceCode", "TMP004")
                    : formData.append("header.serviceCode", "TMP005")
                formData.append("header.passwd", "123456")
                formData.append("header.version", "string")
                formData.append("header.seqNo", "string")
                formData.append("header.datetime", "123456")
                formData.append("header.channel", "JG_001")
                formData.append("header.ext", "string")
                for (let item in values) {
                    formData.append(`body.${item}`, values[item])
                }
                //ProductListStores.updateProductInfoState(formData)
                ProductListStores.getIsEdit ? ProductListStores.updateProductInfoState(formData) :
                    ProductListStores.addProductInfoState(formData)
            } else {
                message.error('有些必填的没有填噢');
            }
            this.props.history.push('/admin/Product/ProductInfo/Table')
        })
    }
    handleCancel = () => {
        this.props.history.push('/admin/Product/ProductInfo/Table')
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const props = {
            name: 'file',
            action: '',
            beforeUpload(file) {
                formData.append("file", file, file.name);
            },
            onChange(info) {
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 图片放置成功`);
                } else if (info.file.status === 'error') {
                    message.success(`${info.file.name} 图片放置成功`);
                }
            },
        };

        return (
            <div className='addNewCom'>
                <AdminBreadcrumb bcRoute={[{ title: '商品', path: '' }, { title: '商品列表', path: 'admin/Product/ProductInfo' }, { title: '详情内容', path: '' }]} />
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
                            <FormItem label="商品ID：" className='companyInputMessage'>
                                {getFieldDecorator('productID', {
                                    initialValue: !ProductListStores.getIsEdit ? "" : ProductListStores.getProductEditInfo.productID,
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="30px" />
                                )}
                            </FormItem>
                            <FormItem label="列表图片：" className='companyInputMessage'>
                                {getFieldDecorator('Sort', {
                                    initialValue: !ProductListStores.getIsEdit ? "" : ProductListStores.getProductEditInfo.Sort,
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
                            <FormItem label="商品名称：" className='companyInputMessage'>
                                {getFieldDecorator('ProductName', {
                                    initialValue: !ProductListStores.getIsEdit ? " " : ProductListStores.getProductEditInfo.productName,
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>

                            <FormItem label="是否显示:" className='companyInputMessage'>
                                {getFieldDecorator('IsShow', {
                                    initialValue: "true",
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Select size="default" placeholder="必填" style={{ width: 155 }} >
                                        <Option value="true">是</Option>
                                        <Option value="false">否</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="重量(g):" className='companyInputMessage'>
                                {getFieldDecorator('Weight', {
                                    initialValue: !ProductListStores.getIsEdit ? " " : ProductListStores.getProductEditInfo.weight,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="商品来源:" className='companyInputMessage'>
                                {getFieldDecorator('productSourceTypeID', {
                                    initialValue: !ProductListStores.getIsEdit ? "0" : ProductListStores.getProductEditInfo.productSourceType === "京东" ? "1" : "0",
                                    rules: [{
                                        required: true, message: '必填',
                                    }],
                                })(
                                    <Select size="default" placeholder="必填" style={{ width: 155 }} >
                                        <Option value="0">自营</Option>
                                        <Option value="1">京东商城</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="长(cm):" className='companyInputMessage'>

                                {getFieldDecorator('Length', {
                                    initialValue: !ProductListStores.getIsEdit ? "" : "",
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="排序:" className='companyInputMessage'>
                                {getFieldDecorator('Sort', {
                                    initialValue: " ",
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="宽(cm):" className='companyInputMessage'>

                                {getFieldDecorator('Width', {
                                    initialValue: !ProductListStores.getIsEdit ? "" : "",
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="高(cm):" className='companyInputMessage'>

                                {getFieldDecorator('Height', {
                                    initialValue: !ProductListStores.getIsEdit ? "" : "",
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <Input size="default" width="20px" />
                                )}
                            </FormItem>
                            <FormItem label="短描述:" className='companyEditor'>

                                {getFieldDecorator('ProductShortDes', {
                                    initialValue: ProductListStores.getShortDescriptionState,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <ProductEditor key={Math.random()} shortOrNo={true} editContent={!ProductListStores.getIsEdit ? "" : ProductListStores.getProductEditInfo} />
                                )}
                            </FormItem>
                            <FormItem label="商品详情:" className='companyEditor'>

                                {getFieldDecorator('ProductDescription', {
                                    initialValue: ProductListStores.getProductDescriptionState,
                                    rules: [{
                                        required: false, message: '必填',
                                    }],
                                })(
                                    <ProductEditor key={Math.random()} shortOrNo={false} editContent={!ProductListStores.getIsEdit ? "" : ProductListStores.getProductEditInfo} />
                                )}
                            </FormItem>
                        </Form>

                    </Card>
                </div>
                {/* <div className='FormButton'>
                        <Button type="primary" onClick={this.handleSubmit} >提交</Button>
                        <Button onClick={this.handleCancel} >取消</Button>
                     </div>        */}
            </div>
        )
    }
    // componentDidUpdate(){
    //     if(ProductListStores.getProductEditInfo==null){
    //         console.log('获取不到值');
    //     }else{

    //     }
    // }
}
const productForm = Form.create()(productInfoForm)

export default productForm;