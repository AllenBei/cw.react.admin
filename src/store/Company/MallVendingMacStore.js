import { observable, action ,computed} from 'mobx';
import request from '@/util/request.js';
import { message } from 'antd'

export default class MallVendingStore {
    @observable MallState =[] ;
    @observable MallMacState =[] ;
    @observable AllMallState =[] ;
    

    @computed get getMallState() {
        return this.MallState;
    }
    @computed get getMallMacState() {
        return this.MallMacState;
    }
    @computed get getAllMallState() {
        return this.AllMallState;
    }
   


    //获取公司商城信息
    @action.bound getMallComState = async() => {

        const result = () => request.post('ThridAdminVendingMachine','GetVMachineInfoByCompanyID',{
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TFV001",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
              },
        });
        let resultData = await result();
        if(resultData.isSuccess){
            let dataArr = resultData.value
            let list = dataArr.map((item,index)=>{
                let {companyID,mallID,mallName} = item
                return{
                    key:index,
                    companyID,
                    mallID,
                    mallName
                }
            })
            this.MallState.replace(list);
            // console.log(this.MallState);
            
        }else{
            if(resultData.msg)
            message.error(resultData.msg);
        }
        
    }
    //获取公司商城零售机信息
    @action.bound getMallMacInfoState = async(value) => {

        const result = () => request.post('ThridAdminVendingMachine','GetVendingMachineByMallID',{
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TFV002",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
              },
              body: {
                mallID:value
              }
        });
        let resultData = await result();
        if(resultData.isSuccess){
            let dataArr = resultData.value
            let list = dataArr.map((item,index)=>{
                let {machineCode,mallName,companyName,address,
                    height,length,weight,width,isUse} = item
                let use = isUse?"正在使用":"未使用"
                return{
                    key:index,
                    machineCode,
                    mallName,
                    companyName,
                    height,
                    length,
                    weight,
                    width,
                    address,
                    isUse:use
                }
                
            })
            this.MallMacState.replace(list);
            // console.log(this.MallMacState);
            
        }else{
            if(resultData.msg)
            message.error(resultData.msg);
        }
        
    }
    //获取公司全部商城
    @action.bound getAllMallStates = async() => {
        const result = () => request.post('ThridAdminVendingMachine','GetShoppingMallbyIsuser',{
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TFV003",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
              }
        });
        let resultData = await result();
        let dataArr = resultData.value
        this.AllMallState.replace(dataArr)
        // console.log(this.AllMallState);  
        
    }
    //新增售卖机
    @action.bound AddMallStates = async(values) => {
        const result = () => request.post('ThridAdminVendingMachine','AddVendingMachine',values);
        let resultData = await result();
        if(resultData.isSuccess){
            message.success(resultData.msg);
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
        }else{
            message.error(resultData.msg);
        }
    }
    //导出售卖机
    @action.bound ExportMallStates = async(values) => {
        const result = () => request.post('ThridAdminVendingMachine','ExportVendingMachine',values);
        let resultData = await result();
        if(resultData.isSuccess){
            message.success("正在跳转"+resultData.msg);
            // setTimeout(() => {
            //     window.location.reload(); 
            // }, 1000);
        }else{
            message.error(resultData.msg);
        }
    }
 }

