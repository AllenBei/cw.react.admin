import { observable, action, computed } from 'mobx';
import { AuthStores } from '@/store/store.js'
import request from '@/util/request.js';
import { message } from 'antd';
import { setLocal } from '@/util/localStorage.js'
export default class LoginStore {
    @observable isLoginState = false;
    @observable onLoginState = false;

    @computed get getOnLoginState() {
        return this.onLoginState;
    }
    @computed get getIsLoginState() {
        return this.isLoginState;
    }

    //改变登陆状态
    @action.bound changeIsLoginState = async (flag, routerPush) => {
        this.isLoginState = flag
    }

    //登录
    @action.bound loginIn = async (values, routerPush) => {
        const result = () => request.post('AdminMain', 'LoginNoCheck', {
            "userName": values.userName,
            "password": values.password,
        });
        this.onLoginState = true
        let resultData = await result();
        if (resultData.code === 100) {
            this.isLoginState = true;
            //判断是否要记住账号和密码
            if (values.remember) {
                setLocal('loginUserName', values.userName);
                setLocal('loginPassword', values.password);
            } else {
                setLocal('loginUserName', '');
                setLocal('loginPassword', '');
            }
            message.success(resultData.msg);
            //获取用户信息和菜单信息
            AuthStores.getUserInfo(routerPush);
            setTimeout(() => {
                this.onLoginState = false;
                routerPush.push('/admin/home')
            }, 2000);
        } else {
            message.error(resultData.msg);
            setTimeout(() => {
                this.onLoginState = false;
            }, 2000);
        }
    }

    //登出
    @action.bound loginOut = async (routerPush, timeout) => {
        const result = () => request.post('AdminMain', 'Logout');
        let resultData = await result();
        if (resultData.code === 100) {
            this.isLoginState = false;
            if (!timeout) {
                message.success(resultData.msg);
            }
            setTimeout(() => {
                routerPush.push('/login')
            }, 2000);
        } else {
            message.error(resultData.msg);
        }
    }



}

