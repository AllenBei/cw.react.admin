import { observable, action, computed } from 'mobx';
import request from '@/util/request.js';
import { dataFormat } from '@/util/util.js';
import { message } from 'antd';

export default class ToBeConfirmedStore {
    @observable ToBeConfirmedState = [];
    @observable PaggingOrderItemState = [];
    @observable ToBeConfirmedSearchModalShow = false;
    @observable ToBeConfirmedEditInfoState = []

    @computed get getToBeConfirmedState() {
        return this.ToBeConfirmedState;
    }
    @computed get getToBeConfirmedEditInfoState() {
        return this.ToBeConfirmedEditInfoState;
    }
    @computed get getToBeConfirmedSearchModalShow() {
        return this.ToBeConfirmedSearchModalShow;
    }

    @action.bound setToBeConfirmedSearchModalShow = (opt) => {
        this.ToBeConfirmedSearchModalShow = opt.flag;
    }

    @action.bound findToBeConfirmedState = async (opt) => {
        this.changeToBeConfirmedState(opt);
    }

    @action.bound setToBeConfirmedInfoState = async (opt) => {
        this.ToBeConfirmedInfoState(opt);
    }

    //获取总订单列表
    @action.bound changeToBeConfirmedState = async (opt) => {

        const result = () => request.post('ThirdAdminOrder', 'GetPaggingWaittingConfirmOrderHeader', {
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TMO001",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
            },
            body: {
                mobile: opt.mobile,
                name: opt.name,
                thirdOrderID: opt.thirdOrderID,
                orderID: opt.orderID,
                isSplit: opt.isSplit,
                mallID: "",
                pageIndex: 1,
                pageSize: 20,
                sort: "mallID",
                dir: "DESC "
            }
        });
        let resultData = await result();
        if (resultData.isSuccess) {
            let dataArr = resultData.value
            // console.log(resultData.value);
            let list = dataArr.map((item, index) => {
                let isSplitCHN = item.isSplit?"是":"否"
                let thirdOrderIdCHN = item.thirdOrderID==null?"暂无":item.thirdOrderID
                let orderDateCHN = dataFormat(item.orderDate,'yyyy-MM-dd')
                return {
                    key: index,
                    OrderID: item.orderID,
                    MallName: item.mallName,
                    Mobile: item.mobile,
                    Name: item.name,
                    ConsumeCents: item.consumeCents,
                    ProcessState: item.processState,
                    DeliverMode: item.deliverMode,
                    IsSplit: isSplitCHN,
                    OrderDate: orderDateCHN,
                    ThirdOrderID: thirdOrderIdCHN,
                    consumeCents: item.consumeCents,
                    postCode: item.postCode,
                    country:item.country,
                    province:item.province,
                    city:item.city,
                    area:item.area,
                    street:item.street,
                    remark:item.remark,
                }

            })
            this.ToBeConfirmedState.replace(list)
            this.setToBeConfirmedSearchModalShow({ flag: false });
            message.success(resultData.msg);


        } else {
            message.error(resultData.msg);
        }
    }
    //获取列表内商品详情
    @action.bound GetPaggingOrderItemState = async (opt) => {

        const result = () => request.post('ThirdAdminOrder', 'GetPaggingOrderItem', {
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TMO004",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
            },
            body: {
                orderID: opt.orderID,
                mallID: "",
                pageIndex: 1,
                pageSize: 20,
                sort: "mallID",
                dir: "DESC "
            }
        });
        let resultData = await result();
        if (resultData.isSuccess) {
            let dataArr = resultData.value
            // console.log(resultData.value);

            let list = dataArr.map((item, index) => {
                return {
                    key: index,
                    ItemID: item.ItemID,
                    ProductID: item.ProductID,
                    ProductName: item.ProductName,
                    ConsumeCents: item.ConsumeCents,
                    ProductNum: item.ProductNum,
                    ConsumeUnit: item.ConsumeUnit,
                    IsSplit: item.IsSplit,

                }

            })
            this.PaggingOrderItemState.replace(list)
        } else {
            message.error(resultData.msg);
        }
    }
            //修改订单
            @action.bound ToBeConfirmedInfoState = async (opt) => {

                const result = () => request.post('ThirdAdminOrder', 'SaveOrderHeader', {
                    header: {
                        passwd: "123456",
                        version: "string",
                        serviceCode: "TMO008",
                        seqNo: "string",
                        datetime: "string",
                        channel: "JG_001",
                        ext: "string"
                    },
                    body: {
                        mobile: opt.mobile,
                        name: opt.name,
                        thirdOrderID: opt.thirdOrderID,
                        orderID: opt.orderID,
                        isSplit: opt.isSplit,
                        mallID: "",
                        pageIndex: 1,
                        pageSize: 20,
                        sort: "mallID",
                        dir: "DESC "
                    }
                });
                let resultData = await result();
                if (resultData.isSuccess) {
                    let dataArr = resultData.value
                    // console.log(resultData.value);
        
                    let list = dataArr.map((item, index) => {
                        return {
                            key: index,
                            OrderID: item.orderID,
                            MallName: item.mallName,
                            Mobile: item.mobile,
                            Name: item.name,
                            ConsumeCents: item.consumeCents,
                            ProcessState: item.processState,
                            DeliverMode: item.deliverMode,
                            IsSplit: item.isSplit,
                            OrderDate: item.orderDate,
                            ThirdOrderID: item.thirdOrderID,
                            consumeCents: item.consumeCents,
                            postCode: item.postCode,
                            country:item.country,
                            province:item.province,
                            city:item.city,
                            area:item.area,
                            street:item.street,
                            remark:item.remark,
                        }
        
                    })
                    this.ToBeConfirmedState.replace(list)
                    this.setToBeConfirmedSearchModalShow({ flag: false });
                    message.success(resultData.msg);
        
        
                } else {
                    message.error(resultData.msg);
                }
            }

    //取消订单
    @action.bound changeOrderCancel = async (opt) => {

        const result = () => request.post('ThirdAdminOrder', 'OrderCancel', {
            header: {
                passwd: "123456",
                version: "string",
                serviceCode: "TMO006",
                seqNo: "string",
                datetime: "string",
                channel: "JG_001",
                ext: "string"
            },
            body: {
                orderID: opt.orderID,
            }
        });
        let resultData = await result();
        if (resultData.isSuccess) {
            // let dataArr = resultData.value
            // console.log(resultData.value);

            // let list = dataArr.map((item, index) => {
            //     return {
            //         key: index,
            //         OrderID: item.orderID,
            //         MallName: item.mallName,
            //         Mobile: item.mobile,
            //         Name: item.name,
            //         ConsumeCents: item.consumeCents,
            //         ProcessState: item.processState,
            //         DeliverMode: item.deliverMode,
            //         IsSplit: item.isSplit,
            //         OrderDate: item.orderDate,
            //         ThirdOrderID: item.thirdOrderID,
            //         consumeCents: item.consumeCents,
            //         postCode: item.postCode,
            //     }

            // })
            // this.ToBeConfirmedState.replace(list)
             message.success(resultData.msg);
        } else {
            message.error(resultData.msg);
        }
    }
        //确认订单
        @action.bound changeGocConfirmOrder = async (opt) => {

            const result = () => request.post('ThirdAdminOrder', 'OrderConfirm', {
                header: {
                    passwd: "123456",
                    version: "string",
                    serviceCode: "TMO005",
                    seqNo: "string",
                    datetime: "string",
                    channel: "JG_001",
                    ext: "string"
                },
                body: {
                    orderID: opt.orderID,
                }
            });
            let resultData = await result();
            if (resultData.isSuccess) {
                 message.success(resultData.msg);
            } else {
                message.error(resultData.msg);
            }
        }
    //获取订单详细信息
    @action.bound getToBeConfirmedEditInfo = (value) => {
        this.ToBeConfirmedEditInfoState = value

    }
}