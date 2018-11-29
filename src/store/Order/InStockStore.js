import { observable, action, computed } from 'mobx';
import request from '@/util/request.js';
import { message } from 'antd';
import { dataFormat } from '@/util/util.js'

export default class ToBeConfirmedStore {
    @observable InstockListState = [];
    @observable InStockDListState = null;
    @observable InstockInfoState = null;
    @observable InstockOrderState = [];
    @observable InstockSearchState = false;


    @computed get InstockListStates() {
        return this.InstockListState;
    }
    @computed get InStockDListStates() {
        return this.InStockDListState;
    }
    @computed get InstockInfoStates() {
        return this.InstockInfoState;
    }
    @computed get InstockOrderStates() {
        return this.InstockOrderState;
    }
    @computed get InstockSearchStates() {
        return this.InstockSearchState;
    }



    //获取总订单列表
    @action.bound getInstockListState = async (opt) => {

        const result = () => request.post('AdminOrder', 'GetPaggingWaittingDeliverConfirmOrderHeader', {
            header: {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AMO002",
                "seqNo": "string",
                "datetime": "string",
                "channel": "AD_001",
                "ext": "string"
            },
            body: {
                "name": "",
                "mobile": "",
                "orderID": 0,
                "thirdOrderID": "",
                "pageIndex": 1,
                "pageSize": 20,
                "dir": "",
                "sort": ""
            }
        });
        let resultData = await result();
        if (resultData.isSuccess) {
            let dataArr = resultData.value
            // console.log(resultData.value);
            let list = dataArr.map((item, index) => {
                let { orderID, pOrderID, mallName, mobile, name,
                    consumeCents, processState, deliverMode, payDate } = item
                return {
                    key: index,
                    orderID, pOrderID, mallName, mobile, name,
                    consumeCents, processState, deliverMode,
                    payDate: dataFormat(payDate, 'yyyy-MM-dd hh:mm:ss'),
                }
            })
            this.InstockListState.replace(list)
            message.success(resultData.msg);
        } else {
            message.error(resultData.msg);
        }
    }
    //截取订单信息
    @action.bound getInStockDListState = (val) => {
        this.InStockDListState = val
    }
    //获取订单详细个人信息
    @action.bound getInstockDInfoState = async (opt) => {

        const result = () => request.post('AdminOrder', 'GetOrderHeader', {
            header: {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AMO006",
                "seqNo": "string",
                "datetime": "string",
                "channel": "AD_001",
                "ext": "string"
            },
            body: {
                "orderid": opt
            }
        });
        let resultData = await result();
        if (resultData.isSuccess) {
            let dataArr = resultData.value
            this.InstockInfoState = dataArr
            // console.log(this.InstockInfoState.consumeCents);
        } else {
            message.error(resultData.msg);
        }
    }
    //获取订单详细个人购物信息
    @action.bound getInstockOrderState = async (opt) => {

        const result = () => request.post('AdminOrder', 'GetPaggingOrderItem', {
            header: {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AMO007",
                "seqNo": "string",
                "datetime": "string",
                "channel": "AD_001",
                "ext": "string"
            },
            body: {
                "orderid": opt,
                "pageIndex": 1,
                "pageSize": 10,
                "dir": "",
                "sort": ""
            }
        });
        let resultData = await result();
        if (resultData.isSuccess) {
            let dataArr = resultData.value
            let list = dataArr.map((item, index) => {
                let {consumeCents,consumeUnit,isSplit,itemID,unitPrice,
                    listPicURL,productID,productName,productNum } = item
                return{
                    key:index,isSplit:isSplit?"是":"否",
                    consumeCents,consumeUnit,itemID,unitPrice,
                    listPicURL,productID,productName,productNum 
                }
            })
            this.InstockOrderState.replace(list)
            // console.log(this.InstockOrderState);
            
            // message.success(resultData.msg);
        } else {
            message.error(resultData.msg);
        }
    }
    //搜索框弹出
    @action.bound setInstockSearchState = (opt) => {
        this.InstockSearchState = opt.flag;
    }
}