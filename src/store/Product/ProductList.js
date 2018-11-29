import { observable, action ,computed} from 'mobx';
import request from '@/util/request.js';
import { message } from 'antd'
// import { withRouter } from 'react-router-dom'

export default class ProductListStore {
    @observable ShortDescriptionState = '';
    @observable ProductDescriptionState = '';
    @observable ProductInfoState = [];
    @observable TotalPageState = 1;
    @observable isEditState = true;
    @observable ProductEditInfoState = [];

    @computed get getProductInfoState() {
        return this.ProductInfoState;
    }
    @computed get getTotalPageState() {
        return this.TotalPageState;
    }
    @computed get getShortDescriptionState() {
        return this.ShortDescriptionState;
    }
    @computed get getProductDescriptionState() {
        return this.ProductDescriptionState;
    }
    @computed get getIsEdit() {
        return this.isEditState;
    }
    @computed get getProductEditInfo() {
        return this.ProductEditInfoState;
    }

    //获取商品信息
    @action.bound changeProductInfoState = async (page) => {
        const result = () => request.post('ThridAdminProduct','GetPaggingProductInCompanySourceType',{
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TMP001",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
              },
            body: {
                pageIndex: page,
                pageSize: 30,
                dir: "",
                sort: ""
              }
        });
        let resultData = await result();
        // console.log(resultData);
        if(resultData.isSuccess){
            //页数显示
            let totalPage = resultData.total
            this.TotalPageState= totalPage
            //数据处理
            let dataArr = resultData.value
            let list = dataArr.map((item,index)=>{
                let {productID,productName,productSourceType,isShow,viewNum,sellNum,
                    weight,productShortDes,productDescription} = item
                let show = isShow?"是":"否"
                let type = productSourceType==='0'?"自营":"京东"
                return{
                    key:index,
                    productID,
                    productName,
                    productSourceType:type,
                    isShow:show,
                    viewNum,
                    sellNum,
                    weight,
                    productShortDes,
                    productDescription
                }
            })
            this.ProductInfoState.replace(list)
        }else{
            if(resultData.msg)
            message.error(resultData.msg);
        }
    }
    //获取短描述内容
    @action.bound changeShortDescriptionState =  (value) => {
        this.ShortDescriptionState = value
        // console.log( this.ShortDescriptionState);
    }
    //获取商品详情内容
    @action.bound changeProductDescriptionState =  (value) => {
        this.ProductDescriptionState = value
    }
    //删除商品信息
    @action.bound delProductInfoState = async (proId) => {
        const result = () => request.post('ThridAdminProduct','DeleteProduct',{
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TMP006",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
              },
            body: {
                productID: proId
              }
        });
        let resultData = await result();
        if(resultData.isSuccess){
            message.success(resultData.msg);
            // setTimeout(() => {
            //     window.location.reload(); 
            // }, 1000);
        }else{
            message.error(resultData.msg);
        };
        
    }
    //新增商品信息
    @action.bound addProductInfoState = async (values) => {
        const result = () => request.post('ThridAdminProduct','AddProductBaseInfo',values);
        let resultMessage = await result();
        if(resultMessage.isSuccess){
            message.success(resultMessage.msg);
            // setTimeout(() => {
            //     window.location.reload(); 
            // }, 1000);
        }else{
            console.log(resultMessage.msg);
        }
    }
    //修改商品信息
    @action.bound updateProductInfoState = async (values) => {
        const result = () => request.post('ThridAdminProduct','UpdateProductBaseInfo',values);
        let resultMessage = await result();
        if(resultMessage.isSuccess){
            message.success(resultMessage.msg);
            // this.props.history.push('/admin/company/comManagement/Table');
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
        }else{
            console.log(resultMessage.msg);
        }
    }
    //是否编辑模式
    @action.bound getIsEditState = (value)=> {
        this.isEditState = value
    }
    //获取编辑商品内容
    @action.bound getProductEditInfoState = (value)=> {
        this.ProductEditInfoState = value
    }
}