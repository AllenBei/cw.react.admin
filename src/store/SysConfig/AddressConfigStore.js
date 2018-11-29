import { observable, action, computed } from 'mobx';
import request from '@/util/request.js';
import { message } from 'antd';

export default class AddressConfigStore {
    //当前分类ID
    @observable nowCataid = null;

    //列表数据
    @observable AddressUrlTypeList = [];
    @observable AddressUrlList = [];
    //弹框显示
    @observable AddressUrlTypeModalShow = false;
    @observable AddressUrlModalShow = false;
    //弹框数据
    @observable AddressUrlTypeModalInfo = {};
    @observable AddressUrlModalInfo = {};

    
    @computed get getNowCataid() {
        return this.nowCataid;
    }
    @computed get getAddressUrlTypeList() {
        return this.AddressUrlTypeList;
    }
    @computed get getAddressUrlList() {
        return this.AddressUrlList;
    }
    @computed get getAddressUrlTypeModalShow() {
        return this.AddressUrlTypeModalShow;
    }
    @computed get getAddressUrlModalShow() {
        return this.AddressUrlModalShow;
    }
    @computed get getAddressUrlTypeModalInfo() {
        return this.AddressUrlTypeModalInfo;
    }
    @computed get getAddressUrlModalInfo() {
        return this.AddressUrlModalInfo;
    }

    //操作分类弹窗
    @action.bound setAddressUrlTypeModalShow = (opt) => {
        this.AddressUrlTypeModalShow = opt.flag;
    }
    //操作分类Url弹窗
    @action.bound setAddressUrlModalShow = (opt) => {
        this.AddressUrlModalShow = opt.flag;
    }
    //操作分类弹窗数据
    @action.bound setAddressUrlTypeModalInfo = (opt) => {
        this.AddressUrlTypeModalInfo = opt;
    }
    //操作分类Url弹窗数据
    @action.bound setAddressUrlModalInfo = (opt) => {
        this.AddressUrlModalInfo = opt;
    }

    //请求分类
    @action.bound setAddressUrlTypeList = async (opt) => {
        const result = () => request.post('AdminURL', 'GetPaggingURLCata', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU002",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "pageIndex": 1,
                "pageSize": 999,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            let list = resultData.value.map((item, index) => {
                return {
                    key: index,
                    urlCataID: item.urlCataID,
                    urlCataName: item.urlCataName,
                }
            })
            this.AddressUrlTypeList.replace(list);
            this.nowCataid = null;
        }
    }

    //请求分类Url
    @action.bound setAddressUrlList = async (opt) => {
        const result = () => request.post('AdminURL', 'GetPaggingURLByCataID', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU008",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "cataid": opt.cataid,
                "pageIndex": 1,
                "pageSize": 999,
            }
        })
        let resultData = await result();

        if (resultData.code > 0) {
            let list = resultData.value.map((item, index) => {
                return {
                    key: index,
                    action: item.action,
                    controller: item.controller,
                    urlCataID: item.urlCataID,
                    urlContent: item.urlContent,
                    urlTitle: item.urlTitle,
                    urlType: item.urlType,
                    urlid: item.urlid,
                }
            })
            this.AddressUrlList.replace(list);
            this.nowCataid = opt.cataid;
        }
    }

    //添加分类
    @action.bound addAddressType = async (opt) => {
        const result = () => request.post('AdminURL', 'AddURLCata', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU005",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "urlCataName": opt.urlCataName
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setAddressUrlTypeList();
            this.AddressUrlTypeModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }
    //添加分类Url
    @action.bound addAddressUrl = async (opt) => {
        const result = () => request.post('AdminURL', 'AddURL', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU011",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "controller": opt.controller,
                "urlContent": opt.urlContent,
                "urlTitle": opt.urlTitle,
                "urlType": opt.urlType,
                "action": opt.action,
                "urlCataID": opt.urlCataID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setAddressUrlList({cataid:opt.urlCataID});
            this.AddressUrlModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }

    //修改分类
    @action.bound modifyAddressType = async (opt) => {
        const result = () => request.post('AdminURL', 'EditURLCata', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU006",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "urlCataID":opt.urlCataID,
                "urlCataName": opt.urlCataName
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setAddressUrlTypeList();
            this.AddressUrlTypeModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }

    //修改分类Url
    @action.bound modifyAddressUrl = async (opt) => {
        console.log(opt);
        
        const result = () => request.post('AdminURL', 'EditURL', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU012",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "controller": opt.controller,
                "urlContent": opt.urlContent,
                "urlTitle": opt.urlTitle,
                "urlType": opt.urlType,
                "action": opt.action,
                "urlID": opt.urlID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setAddressUrlList({cataid:opt.urlCataID});
            this.AddressUrlModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }
    
    //删除分类
    @action.bound deleteAddressType = async (opt) => {
        const result = () => request.post('AdminURL', 'DeleteURLCata', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU004",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "urlCataID":opt.urlCataID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.nowCataid = null;
            this.AddressUrlList = [];
            this.setAddressUrlTypeList();
        } else {
            message.error(resultData.msg);
        }
    }  
    
    //删除分类Url
    @action.bound deleteAddressUrl = async (opt) => {
        const result = () => request.post('AdminURL', 'DeleteURL', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU010",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "urlID":opt.urlID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setAddressUrlList({cataid:opt.cataid});
        } else {
            message.error(resultData.msg);
        }
    }

}