import { observable, action, computed } from 'mobx';
import request from '@/util/request.js';
import {
    message
} from 'antd';

export default class UserConfigStore {

    @observable transferLoading = true;
    @observable UserMemberList = [];
    @observable UserModalShow = false;
    @observable UserModalInfo = {};
    @observable UnSelectMenu = [];
    @observable SelectMenu = [];
    @observable MemberGroupTransferData = [];
    @observable MemberGroupTransferTargetKey = [];
    @observable AddForMulti2 = [];


    @computed get getAddForMulti2() {
        return this.AddForMulti2;
    }
    @computed get getTransferLoading() {
        return this.transferLoading;
    }
    @computed get getMemberGroupTransferData() {
        return this.MemberGroupTransferData;
    }
    @computed get getMemberGroupTransferTargetKey() {
        return this.MemberGroupTransferTargetKey;
    }
    @computed get getUserMemberList() {
        return this.UserMemberList;
    }
    @computed get getUserModalShow() {
        return this.UserModalShow;
    }
    @computed get getUserModalInfo() {
        return this.UserModalInfo;
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
        if ('add' === opt.type) {
            const UnSelectMenu = await this.setUnSelectMenu({ gid: opt.memgroupid });
            this.MemberGroupTransferData.replace([...UnSelectMenu]);
        } else {
            const UnSelectMenu = await this.setUnSelectMenu({ gid: opt.gid });
            const SelectMenu = await this.setSelectMenu({ gid: opt.gid });
            this.MemberGroupTransferData.replace([...UnSelectMenu, ...SelectMenu]);
        }
        let list = [];
        for (let item of this.MemberGroupTransferData) {
            if (item.chosen) list.push(item.key);
        }
        this.MemberGroupTransferTargetKey.replace(list);
        this.transferLoading = false;
    }

    //新增会员时候会员组发生改变
    @action.bound setAddForMulti2 = async (opt) => {
        let newArr = opt.newKey;
        let multi2 = [];
        for (let transferItem of this.MemberGroupTransferData) {
            for (let item of newArr) {
                if (transferItem.key === item) {
                    let obj = {
                        MemGroupID: transferItem.key,
                        MemGroupName: transferItem.title
                    }
                    multi2.push(obj);
                    break;
                }
            }
        }
        this.AddForMulti2.replace(multi2);
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
                        MemGroupID: transferItem.key,
                        MemGroupName: transferItem.title
                    }
                    multi2.push(obj);
                    break;
                }
            }
        }
        let formData = new FormData();
        formData.append("header.passwd", "123456");
        formData.append("header.version", "string");
        formData.append("header.serviceCode", "AFM011");
        formData.append("header.seqNo", "1");
        formData.append("header.datetime", "1");
        formData.append("header.channel", "AD_001");
        formData.append("header.ext", "213");
        formData.append("body.GID", opt.gid);
        formData.append("body.selected", JSON.stringify(multi2));
        const result = () => request.post('AdminMember', 'SetMemberGroup', formData)
        let resultData = await result();
        if (resultData.code >= 0) {
            message.success(resultData.msg);
            const obj = this.UserModalInfo;
            this.setMemberGroupTransferData({
                type: obj.type,
                gid: obj.info.gid
            });
        } else {
            message.error(resultData.msg);
        }
        this.transferLoading = false;
    }

    //获取没有选中的菜单
    @action.bound setUnSelectMenu = async (opt) => {
        const result = () => request.post('AdminMember', 'GetUnAdminMemberGroup', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFM004",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "gid": opt.gid,
            }
        })
        let resultData = await result();

        return new Promise((resolve, reject) => {
            if (resultData.code >= 0) {
                let list = resultData.value.map((item, index) => {
                    return {
                        key: item.memGroupID,
                        title: item.memGroupName,
                        description: item.memGroupName,
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
        const result = () => request.post('AdminMember', 'GetAdminMemberGroup', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFM005",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "gid": opt.gid,
            }
        })
        let resultData = await result();


        return new Promise((resolve, reject) => {
            if (resultData.code >= 0) {
                let list = resultData.value.map((item, index) => {
                    return {
                        key: item.memGroupID,
                        title: item.memGroupName,
                        description: item.memGroupName,
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

    @action.bound setUserModalShow = (opt) => {
        this.UserModalShow = opt.flag;
    }
    @action.bound setUserModalInfo = (opt) => {
        this.UserModalInfo = opt;
    }

    //获取会员列表
    @action.bound setUserMemberList = async (opt) => {
        const result = () => request.post('AdminMember', 'GetPaggingAdminMember', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFM001",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "memberID": "",
                "mobile": "",
                "gid": "",
                "realName": "",
                "dir": "",
                "sort": "",
                "pageIndex": 1,
                "pageSize": 9999,
            }
        })
        let resultData = await result();

        if (resultData.code >= 0) {
            let list = resultData.value.map((item, index) => {
                return {
                    key: index,
                    companyID: item.companyID,
                    memberID: item.memberID,
                    realName: item.realName,
                    sex: item.sex,
                    mobile: item.mobile,
                    email: item.email,
                    registerTime: item.registerTime,
                    isActivate: item.isActivate,
                    lastLogonIP: item.lastLogonIP,
                    isFreeze: item.isFreeze,
                    isMobileBind: item.isMobileBind,
                    passWord: item.passWord,
                    gid: item.gid,
                }
            })
            this.UserMemberList.replace(list);
        }
    }

    //添加会员
    @action.bound addUser = async (opt) => {

        let formData = new FormData();
        formData.append("header.passwd", "123456");
        formData.append("header.version", "string");
        formData.append("header.serviceCode", "AFM009");
        formData.append("header.seqNo", "1");
        formData.append("header.datetime", "1");
        formData.append("header.channel", "AD_001");
        formData.append("header.ext", "213");
        formData.append("body.CompanyID", opt.CompanyID);
        formData.append("body.RealName", opt.RealName);
        formData.append("body.Mobile", opt.Mobile);
        formData.append("body.Sex", opt.Sex);
        formData.append("body.Email", opt.Email);
        formData.append("body.selected", JSON.stringify(opt.selected));

        const result = () => request.post('AdminMember', 'CreateAdminMember', formData)
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setUserMemberList();
            this.UserModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }
    //修改会员
    @action.bound modifyUser = async (opt) => {
        const result = () => request.post('AdminMember', 'UpadateAdminMemInfo', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFM010",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "gid": opt.gid,
                "companyID": opt.companyID,
                "mobile": opt.mobile,
                "sex": opt.sex,
                "realName": opt.realName,
                "email": opt.email,
                "memberID": opt.memberID,
                "memState": 0,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setUserMemberList();
            this.UserModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }

    //重置密码
    @action.bound resetPwd = async (opt) => {
        const result = () => request.post('AdminMember', 'ResetMemberPsw', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFM008",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "gid": opt.gid,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setUserMemberList();
            this.UserModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }

    //冻结账号
    @action.bound IsFreeze = async (opt) => {
        const result = () => request.post('AdminMember', 'RockAdminMember', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFM006",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "gid": opt.gid,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setUserMemberList();
            this.UserModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }

    //解冻账号
    @action.bound UnIsFreeze = async (opt) => {
        const result = () => request.post('AdminMember', 'UnRockAdminMember', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFM007",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "gid": opt.gid,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setUserMemberList();
            this.UserModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }

}