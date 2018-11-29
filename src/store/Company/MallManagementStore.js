import { observable, action ,computed} from 'mobx';
import request from '@/util/request.js';
import { message } from 'antd'
import {dataFormat} from '@/util/util.js'


export default class MallManagementStore {
    @observable MallInfoState = [];
    @observable MallDetailState = [];
    @observable MallisAddState = [];

    @computed get getMallInfoState() {
        return this.MallInfoState;
    }
    @computed get getMallDetailState() {
        return this.MallDetailState;
    }
    @computed get getMallisAddState() {
        return this.MallisAddState;
    }
    //获取商城信息
    @action.bound takeMallInfoState = async () => {
        const result = () => request.post('ThridAdminShoppingmall', 'GetShoppingMall', {
            "header": {
            passwd: "123456",
            version: "string",
            serviceCode: "TFM001",
            seqNo: "string",
            datetime: "string",
            channel: "JG_001",
            ext: "string"
            }
          })
          let resultData = await result();
          if(resultData.isSuccess){
            let dataArr = resultData.value
            // console.log(dataArr);
            
            let list = dataArr.map((item,index)=>{
                let {mallID,mallName,companyName,warehouseCompanyName,mallType,isUse,
                    cssdir,certifiedRemark,createTime} = item
                let mallTypes = mallType=='0'?"自营":"京东商城"
                let use = isUse?"正在使用":"未使用"
                let time = dataFormat(createTime,"yyyy-MM-dd")
                return{
                    key:index,
                    mallID,
                    mallName,
                    companyName,
                    warehouseCompanyName,
                    mallType:mallTypes,
                    isUse:use,
                    cssdir,
                    certifiedRemark,
                    createTime:time
                }
                
            })
            this.MallInfoState.replace(list);
          }else{
            message.error(resultData.msg);
          }
          
    }
    //截取商城详情信息
    @action.bound takeMallDetailState = async (id) => {
        const result = () => request.post('ThridAdminShoppingmall', 'GetShoppingmallbyMallId', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode":"TFM006",
                "seqNo": "string",
                "datetime": "string",
                "channel": "JG_001",
                "ext": "string"
              },
              "body":{
                  "mallID":id
              }
        })
          let resultData = await result();
          let dataArr = resultData.value
          this.MallDetailState= await dataArr

        //   console.log(this.MallDetailState)
          
        //   if(resultData.isSuccess){
        //     this.MallDetailState .replace(resultData)
        //   }else{
        //     message.error(resultData.msg)
        //   }
        
    }
    //判断是否新增
    @action.bound takeMallisAddState = async (val) => {
        this.MallisAddState = val
        // console.log( this.MallisAddState);
        
    }
    //新增商城和运费模板
    @action.bound takeMallAddState = async (val) => {
        const result = () => request.post('ThridAdminShoppingmall', 'AddShoppingMall', val)
          let resultData = await result();
          if(resultData.isSuccess){
            message.success(resultData.msg);
          }else{
            message.error(resultData.msg)
          }
    }
    //修改商城和运费模板
    @action.bound takeMallisUpdateState = async (val) => {
        const result = () => request.post('ThridAdminShoppingmall', 'UpdataShoppingMall' , val)
          let resultData = await result();
          if(resultData.isSuccess){
            message.success(resultData.msg);
          }else{
            message.error(resultData.msg)
          }
    }
    //删除商城和运费模板
    @action.bound delMallisInfoState = async (val) => {
        const result = () => request.post('ThridAdminShoppingmall', 'DeleteShoppingMallbyMallID' , val)
            let resultData = await result();
            if(resultData.isSuccess){
            message.success(resultData.msg);
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            }else{
            message.error(resultData.msg)
            }
    }
    //冻结/解冻商城
    @action.bound freezeMallState = async(val) => {
        const result = () => request.post('ThridAdminShoppingmall', 'UpdataShoppingMallIsuse' , val)
            let resultData = await result();
            if(resultData.isSuccess){
            message.success(resultData.msg);
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
            }else{
            message.error(resultData.msg)
            }
    }
}