import { observable, action ,computed} from 'mobx';
import request from '@/util/request.js';
import { message } from 'antd'

export default class ComManagementStore {
    @observable CompanyInfoState = [];
    @observable CompanyEditInfo = [];
    @observable CompanyisAdd = true;

    @computed get getComInfoStatetate() {
        return this.CompanyInfoState;
    }
    @computed get getCompanyEditInfoState() {
        return this.CompanyEditInfo;
    }
    @computed get getCompanyisAddState() {
        return this.CompanyisAdd;
    }

    //获取公司信息
    @action.bound changeCompanyInfoState = async (values,routerPush) => {
      
        const result = () => request.post('ThridAdminCompany', 'GetAllCompany', {
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TFC001",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
              },
              body: {
                dir: "",
                sort: ""
              }
        });
        let resultData = await result();
        if(resultData.isSuccess){
            let dataArr = resultData.value
            // console.log(resultData.value);
            
            let list = dataArr.map((item,index)=>{
                return{
                    key:index,
                    company:item.companyName,
                    contactUser:item.contactUser,
                    ID:item.companyID,
                    contactMember:item.contactMember,
                    phone:item.contactPhone,
                    centName:item.centName,
                    rateToRMB:item.rateToRMB,
                    passWord:item.passWord,
                    Email:item.contactEmail,
                    SAPClientCode:item.sapClientCode,
                    sapTacticCode:item.sapTacticCode,
                    comState:item.comState,
                    cssdir:item.cssdir,
                    transformGene:item.transformGene
                }
                
            })
            this.CompanyInfoState.replace(list)
            
            
            // console.log(this.CompanyInfoState);
        }
    }
    //新增公司信息
    @action.bound addCompanyInfoState = async (values) => {
        const result = () => request.post('ThridAdminCompany', 'AddCompany', values)
        let resultMessage = await result();
      
        if(resultMessage.isSuccess){
            message.success(resultMessage.msg);
            // setTimeout(() => {
            //     window.location.reload(); 
            // }, 1000);
        }else{
            message.error(resultMessage.msg);
        }
        
    }
    //修改公司信息
    @action.bound reviseCompanyInfoState = async (values) => {
        const result = () => request.post('ThridAdminCompany', 'UpdateCompany', values)
        let resultMessage = await result();
        if(resultMessage.isSuccess){
            message.success(resultMessage.msg);
            // setTimeout(() => {
            //     window.location.reload(); 
            // }, 1000);
        }else{
            message.error(resultMessage.msg);
        }
        
    }
    //删除公司信息
    @action.bound delCompanyInfoState = async (values) => {
        const result = () => request.post('ThridAdminCompany', 'DeleteCompany', {
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TFC004",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
              },
              body: {
                companyID: values
              }
        })
        let resultMessage = await result();
      
        if(resultMessage.isSuccess){
            message.error(resultMessage.msg);
            setTimeout(() => {
                window.location.reload(); 
            }, 1000);
        }else{
            console.log(resultMessage.msg);
        }
    }
    //获取公司详细信息
    @action.bound getCompanyEditInfo = (value) => {
        this.CompanyEditInfo = value
        // console.log(this.CompanyEditInfo );
        
    }
   //判断是否编辑公司信息
    @action.bound getCompanyisAdd = (value) => {
        this.CompanyisAdd = value
    }
}