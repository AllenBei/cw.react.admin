import { observable, action, computed } from 'mobx';
import request from '@/util/request.js';
import { message } from 'antd';
import { Promise } from 'core-js';

export default class MemberGroupConfigStore {

    @observable transferLoading = true;
    @observable MemberGroupList = [];
    @observable MemberGroupModalShow = false;
    @observable MemberGroupModalInfo = {};
    @observable UnSelectMenu = [];
    @observable SelectMenu = [];
    @observable MemberGroupTransferData = [];
    @observable MemberGroupTransferTargetKey = [];

    @computed get getTransferLoading() {
        return this.transferLoading;
    }
    @computed get getMemberGroupTransferData() {
        return this.MemberGroupTransferData;
    }
    @computed get getMemberGroupTransferTargetKey() {
        return this.MemberGroupTransferTargetKey;
    }
    @computed get getMemberGroupList() {
        return this.MemberGroupList;
    }
    @computed get getMemberGroupModalShow() {
        return this.MemberGroupModalShow;
    }
    @computed get getMemberGroupModalInfo() {
        return this.MemberGroupModalInfo;
    }
    @computed get getUnSelectMenu() {
        return this.UnSelectMenu;
    }
    @computed get getSelectMenu() {
        return this.SelectMenu;
    }

    //获取穿梭框的数据
    @action.bound setMemberGroupTransferData = async (opt) => {
        this.transferLoading = true;
        const UnSelectMenu = await this.setUnSelectMenu({ memgroupid: opt.memgroupid });
        const SelectMenu = await this.setSelectMenu({ memgroupid: opt.memgroupid });
        const transferDataArr = [...UnSelectMenu, ...SelectMenu];
        this.MemberGroupTransferData.replace(transferDataArr);
        let list = [];
        for (let item of this.MemberGroupTransferData) {
            if (item.chosen) list.push(item.key);
        }
        this.MemberGroupTransferTargetKey.replace(list);
        this.transferLoading = false;
    }

    //修改会员组菜单
    @action.bound modifyMemberGroupTransfer = async (opt) => {
        this.transferLoading = true;
        let newArr = opt.newKey;
        let multi2 = [];
        for (let transferItem of this.MemberGroupTransferData) {
            for (let item of newArr) {
                if (transferItem.key === item) {
                    let obj = {
                        MenuID: transferItem.key,
                        MenuName: transferItem.title
                    }
                    multi2.push(obj);
                    break;
                }
            }
        }
        let formData = new FormData();
        formData.append("header.passwd", "123456");
        formData.append("header.version", "string");
        formData.append("header.serviceCode", "AFG007");
        formData.append("header.seqNo", "1");
        formData.append("header.datetime", "1");
        formData.append("header.channel", "AD_001");
        formData.append("header.ext", "213");
        formData.append("body.memgroupid", opt.memgroupid);
        formData.append("body.multi2", JSON.stringify(multi2));
        const result = () => request.post('AdminMemberGroup', 'SetGroupMenu', formData)
        let resultData = await result();
        if (resultData.code >= 0) {
            message.success(resultData.msg);
            this.setMemberGroupTransferData({memgroupid:opt.memgroupid})
        }else{
            message.error(resultData.msg);
        }
        this.transferLoading = false;
    }

    //获取没有选中的菜单
    @action.bound setUnSelectMenu = async (opt) => {
        const result = () => request.post('AdminMemberGroup', 'GetUnSelectedMenu', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFG005",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "memgroupid": opt.memgroupid,
            }
        })
        let resultData = await result();

        return new Promise((resolve, reject) => {
            if (resultData.code >= 0) {
                let list = resultData.value.map((item, index) => {
                    return {
                        key: item.menuID,
                        title: item.menuName,
                        description: item.menuName,
                        chosen: false,
                    }
                })
                this.UnSelectMenu.replace(list);
                resolve(list)
            } else {
                reject([]);
            }
        })
    }
    //获取选中的菜单
    @action.bound setSelectMenu = async (opt) => {
        const result = () => request.post('AdminMemberGroup', 'GetSelectedMenu', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFG006",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "memgroupid": opt.memgroupid,
            }
        })
        let resultData = await result();


        return new Promise((resolve, reject) => {
            if (resultData.code >= 0) {
                let list = resultData.value.map((item, index) => {
                    return {
                        key: item.menuID,
                        title: item.menuName,
                        description: item.menuName,
                        chosen: true,
                    }
                })
                this.SelectMenu.replace(list);
                resolve(list)
            } else {
                reject([]);
            }
        })
    }
    @action.bound setMemberGroupModalShow = (opt) => {
        this.MemberGroupModalShow = opt.flag;
    }
    @action.bound setMemberGroupModalInfo = (opt) => {
        this.MemberGroupModalInfo = opt;
    }
    //获取会员用户组数据
    @action.bound setMemberGroupList = async (opt) => {
        const result = () => request.post('AdminMemberGroup', 'GetPaggingMemberGroup', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFG001",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "pageIndex": 1,
                "pageSize": 9999,
                "dir": "ASC"
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            let list = resultData.value.map((item, index) => {
                return {
                    key: index,
                    memGroupID: item.memGroupID,
                    memGroupName: item.memGroupName,
                    memGroupDes: item.memGroupDes,
                    companyID: item.companyID,
                    isDelete: item.isDelete,
                }
            })
            this.MemberGroupList.replace(list);
        }
    }
    //添加会员组
    @action.bound addMemberGroup = async (opt) => {
        const result = () => request.post('AdminMemberGroup', 'SaveMemberGroup', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFG002",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "memGroupName": opt.memGroupName,
                "memGroupDes": opt.memGroupDes,
                "memGroupID": opt.memGroupID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setMemberGroupList();
            this.MemberGroupModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }
    //修改会员组
    @action.bound modifyMemberGroup = async (opt) => {
        const result = () => request.post('AdminMemberGroup', 'SaveMemberGroup', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFG002",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "upMemGroupId": opt.upMemGroupId,
                "memGroupName": opt.memGroupName,
                "memGroupDes": opt.memGroupDes,
                "memGroupID": opt.memGroupID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setMemberGroupList();
            this.MemberGroupModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }
    //删除会员用户组
    @action.bound deleteMemberGroup = async (opt) => {
        const result = () => request.post('AdminMemberGroup', 'DeleteMemberGroup', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFG004",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "memgroupid": opt.memgroupid,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setMemberGroupList();
        } else {
            message.error(resultData.msg);
        }
    }

}