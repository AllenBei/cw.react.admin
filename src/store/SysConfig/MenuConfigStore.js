import { observable, action, computed } from 'mobx';
import request from '@/util/request.js';
import { message } from 'antd';

export default class MenuConfigStore {

    //当前菜单 
    @observable nowMenuID = null;
    //当前选中前端下拉类型
    @observable nowFrontType = null;
    //当前选中后端下拉类型
    @observable nowBackType = null;
    //列表数据
    @observable MenuList = [];
    @observable MenuItemList = [];
    //弹框显示
    @observable MenuModalShow = false;
    @observable MenuItemModalShow = false;
    //弹框数据
    @observable MenuModalInfo = {};
    @observable MenuItemModalInfo = {};
    //下拉框数据
    @observable MenuItemTypeOptions = [];
    @observable MenuItemFrontUrlOptions = [];
    @observable MenuItemBackUrlOptions = [];
    //下拉框初始化信息
    @observable MenuItemSelectInit = {
        secondURLCataID: null,
        secondUrlID: null,
        urlCataID: null,
        urlid: null,
    };

    @computed get getnowMenuID() {
        return this.nowMenuID;
    }
    @computed get getMenuList() {
        return this.MenuList;
    }
    @computed get getMenuItemList() {
        return this.MenuItemList;
    }
    @computed get getMenuModalShow() {
        return this.MenuModalShow;
    }
    @computed get getMenuItemModalShow() {
        return this.MenuItemModalShow;
    }
    @computed get getMenuModalInfo() {
        return this.MenuModalInfo;
    }
    @computed get getMenuItemModalInfo() {
        return this.MenuItemModalInfo;
    }
    @computed get getMenuItemSelectInit() {
        return this.MenuItemSelectInit;
    }
    @computed get getMenuItemTypeOptions() {
        return this.MenuItemTypeOptions;
    }
    @computed get getMenuItemFrontUrlOptions() {
        return this.MenuItemFrontUrlOptions;
    }
    @computed get getMenuItemBackUrlOptions() {
        return this.MenuItemBackUrlOptions;
    }

    //操作菜单弹窗
    @action.bound setMenuModalShow = (opt) => {
        this.MenuModalShow = opt.flag;
    }
    @action.bound setMenuItemModalShow = (opt) => {
        this.MenuItemModalShow = opt.flag;
        if (!opt.flag) {
            this.MenuItemSelectInit = {
                secondURLCataID: null,
                secondUrlID: null,
                urlCataID: null,
                urlid: null,
            };
        }
    }

    //操作菜单弹窗数据
    @action.bound setMenuModalInfo = (opt) => {
        this.MenuModalInfo = opt;
    }
    @action.bound setMenuItemModalInfo = (opt) => {
        this.MenuItemModalInfo = opt;
    }

    //下拉框初始化数据
    @action.bound setMenuItemSelectInit = async (opt) => {
        const result = () => request.post('AdminURL', 'GetUrlInfosByUrlID', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU020",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "urlID": opt.urlID,
                "secondUrlID": opt.secondUrlID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            this.MenuItemSelectInit = resultData.value
            this.setMenuItemUrlOptionsByCataId({ type: 'Front', cataid: this.MenuItemSelectInit.secondURLCataID });
            this.setMenuItemUrlOptionsByCataId({ type: 'Back', cataid: this.MenuItemSelectInit.urlCataID })
        }
    }

    //根据cataId获取url
    @action.bound setMenuItemUrlOptionsByCataId = async (opt) => {
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
                "pageIndex": 1,
                "pageSize": 999,
                "cataid": opt.cataid,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            let list = resultData.value.map((item, index) => {
                return {
                    key: index,
                    urlTitle: item.urlTitle,
                    urlid: item.urlid,
                    urlContent: item.urlContent,
                }
            });
            if (opt.type === 'Front') {
                this.MenuItemFrontUrlOptions.replace(list);
            } else {
                this.MenuItemBackUrlOptions.replace(list);
            }
            if (opt.flag) {
                if (resultData.value.length > 0) {
                    this.MenuItemSelectInit.urlid = resultData.value[0].urlid
                } else {
                    this.MenuItemSelectInit.urlid = null
                }
            }
        }
    }

    //请求类型下拉框
    @action.bound setMenuItemTypeOptions = async (opt) => {
        const result = () => request.post('AdminURL', 'GetAllURLCata', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFU001",
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
            this.MenuItemTypeOptions.replace(list);
        }
    }

    //请求菜单
    @action.bound setMenuList = async (opt) => {
        const result = () => request.post('AdminMenu', 'GetPaggingMenu', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFE001",
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
                    menuID: item.menuID,
                    menuName: item.menuName,
                    menuType: item.menuType,
                }
            })
            this.MenuList.replace(list);
            this.nowMenuID = null;
        }
    }

    //请求菜单项
    @action.bound setMenuItemList = async (opt) => {
        const result = () => request.post('AdminMenu', 'GetAllMenuItemByMenuID', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFE010",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "menuID": opt.menuID
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            let list = resultData.value.map((item, index) => {
                return {
                    key: index,
                    menuID: item.menuID,
                    menuItemID: item.menuItemID,
                    pMenuItemID: item.pMenuItemID,
                    secondURLID: item.secondURLID,
                    text: item.text,
                    urlid: item.urlid,
                }
            })
            this.MenuItemList.replace(list);
            this.nowMenuID = opt.menuID
        } else {
            this.MenuItemList.replace([]);
            this.nowMenuID = opt.menuID
        }
    }

    //添加分类菜单
    @action.bound addMenu = async (opt) => {
        const result = () => request.post('AdminMenu', 'AddMenu', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFE003",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "menuName": opt.menuName,
                "menuType": opt.menuType,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setMenuList();
            this.MenuModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }

    //添加菜单项
    @action.bound addMenuItem = async (opt) => {
        const result = () => request.post('AdminMenu', 'AddMenuItem', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFE007",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "menuID": this.getnowMenuID,
                "pMenuItemID": 0,
                "menuItemText": opt.menuItemText,
                "urlid": opt.urlid,
                "secondURLID": opt.secondURLID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setMenuItemList({ menuID: this.getnowMenuID });
            this.setMenuItemModalShow({ flag: false });
        } else {
            message.error(resultData.msg);
        }
    }

    //修改分类
    @action.bound modifyMenu = async (opt) => {
        const result = () => request.post('AdminMenu', 'EditMenu', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFE004",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "menuID": opt.menuID,
                "menuName": opt.menuName,
                "menuType": opt.menuType,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setMenuList();
            this.MenuModalShow = false;
        } else {
            message.error(resultData.msg);
        }
    }

    //修改菜单项
    @action.bound modifyMenuItem = async (opt) => {
        const result = () => request.post('AdminMenu', 'EditMenuItem', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFE008",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "menuItemID": opt.menuItemID,
                "menuItemText": opt.menuItemText,
                "menuItemURLID": opt.urlid,
                "secondURLID": opt.secondURLID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setMenuItemList({ menuID: this.getnowMenuID });
            this.setMenuItemModalShow({ flag: false });
        } else {
            message.error(resultData.msg);
        }
    }

    //删除菜单
    @action.bound deleteMenu = async (opt) => {
        const result = () => request.post('AdminMenu', 'DeleteMenu', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFE005",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "menuID": opt.menuID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.nowMenuID = null;
            this.MenuItemList = [];
            this.setMenuList();
        } else {
            message.error(resultData.msg);
        }
    }

    //删除菜单项
    @action.bound deleteMenuItem = async (opt) => {
        const result = () => request.post('AdminMenu', 'DeleteMenuItem', {
            "header": {
                "passwd": "123456",
                "version": "string",
                "serviceCode": "AFE009",
                "seqNo": "1",
                "datetime": "1",
                "channel": "AD_001",
                "ext": "213"
            },
            "body": {
                "menuItemID": opt.menuItemID,
            }
        })
        let resultData = await result();
        if (resultData.code > 0) {
            message.success(resultData.msg);
            this.setMenuItemList({ menuID: this.getnowMenuID });
        } else {
            message.error(resultData.msg);
        }
    }
}