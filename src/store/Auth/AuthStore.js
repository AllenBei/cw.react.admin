import { observable, action, computed } from 'mobx';
import request from '@/util/request.js';
import { LoginStores, Common } from '@/store/store.js'

class AuthStore {


    //用户信息 
    @observable userInfoState = {}
    //菜单
    @observable menusState = []
    @observable menusRouter = []

    @computed get getUserInfoState() {
        return this.userInfoState
    }
    @computed get getMenusState() {
        return this.menusState
    }
    @computed get getMenusRouter() {
        return this.menusRouter
    }

    @action.bound getUserInfo = async (routerPush) => {
        Common.setAuthRouter(routerPush)
        const result = () => request.post('AdminMember', 'GetAdminMember', routerPush)

        let resultData = await result();

        //获取到用户信息对象
        if (resultData.code === 100) {
            this.userInfoState = resultData.value;
            LoginStores.changeIsLoginState(true);
            const resultMenus = () => request.post('AdminMenu', 'GetAdminMenu');
            let resultMenusData = await resultMenus();
            if (resultMenusData.value.length > 0) {
                this.menusState.replace(this.menuDataInit(resultMenusData.value));
                this.setMenusRouter(this.menusState);
                if (routerPush.location.pathname === '/login')
                    routerPush.push('/admin/home');
            }
        } else {
            if (routerPush.location.pathname !== '/login')
                routerPush.push('/login');
        }
    }

    //设置路由目录
    @action.bound setMenusRouter = async (data) => {
        let menusRouterArr = []
        for (let item of data) {
            if (item.children) {
                for (let itemChild of item.children) {
                    let obj = {
                        component: itemChild.key.split('/')[itemChild.key.split('/').length - 1],
                        path: itemChild.key
                    }
                    menusRouterArr.push(obj);
                }
            } else {
                let obj = {
                    component: item.key.split('/')[item.key.split('/').length - 1],
                    path: item.key
                }
                menusRouterArr.push(obj);
            }
        }
        // console.log(menusRouterArr);
        
        this.menusRouter.replace(menusRouterArr);
    }

    //处理后台获取回来的菜单格式
    menuDataInit = (data) => {
        const home = {
            title: '主页',
            key: '/admin/Home',
        };
        let otherMenus = [];
        for (let item1th of data) {
            let item1thObj = {
                title: item1th.menuName,
                key: item1th.menuID,
                children: []
            }
            for (let item2th of item1th.menuItems) {
                let item2thObj = {
                    title: item2th.text,
                    key: item2th.secondURL,
                }
                item1thObj.children.push(item2thObj)
            }
            otherMenus.push(item1thObj)
        }
        return [home, ...otherMenus];
    }
}

export default AuthStore