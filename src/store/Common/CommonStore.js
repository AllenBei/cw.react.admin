import {observable, action,computed} from 'mobx';

export default class CommonStore {
    @observable leftNavCollapsedState = false;
    //全局路由
    @observable AuthRouter = null;

    @computed get getLeftNavCollapsedState() {
        return this.leftNavCollapsedState;
    }
    @computed get getAuthRouter() {
        return this.AuthRouter;
    }
    @action.bound changeLeftNavCollapsedState(){
        this.leftNavCollapsedState = !this.leftNavCollapsedState;
    }
    @action.bound setAuthRouter(obj){
        this.AuthRouter = obj;
    }
}
