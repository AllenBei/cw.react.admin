import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { AuthStores } from '@/store/store.js';
import { observer } from 'mobx-react'
const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div className="tipsCenter">Loading...</div>;
    }
    else if (error) {
        return <div className="tipsCenter">Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};

/**公共组件 start**/
const App = Loadable({ loader: () => import('./App'), loading: MyLoadingComponent });
const Login = Loadable({ loader: () => import('./pages/Login/Login'), loading: MyLoadingComponent });
const AdminLayout = Loadable({ loader: () => import('./components/AdminLayout/AdminLayout'), loading: MyLoadingComponent });
const Home = Loadable({ loader: () => import('./pages/Home/Home'), loading: MyLoadingComponent });
const Page404 = Loadable({ loader: () => import('./pages/Error/Page404'), loading: MyLoadingComponent });
/**公共组件 end**/
/**功能模块 start**/
//菜单管理
const MenuConfig = Loadable({ loader: () => import('./pages/SysConfig/MenuConfig/MenuConfig'), loading: MyLoadingComponent });
//地址管理
const AddressConfig = Loadable({ loader: () => import('./pages/SysConfig/AddressConfig/AddressConfig'), loading: MyLoadingComponent });
//会员组管理
const MemberGroupConfig = Loadable({ loader: () => import('./pages/SysConfig/MemberGroupConfig/MemberGroupConfig'), loading: MyLoadingComponent });
/**公司管理模块**/
const ComManagement = Loadable({ loader: () => import('./pages/Company/ComManagement/ComManagement'), loading: MyLoadingComponent });
//订单管理模块--订单待确认
const ToBeConfirmed = Loadable({ loader: () => import('./pages/Order/ToBeConfirmed/ToBeConfirmed'), loading: MyLoadingComponent });
//订单管理模块--备货中
const InStock = Loadable({ loader: () => import('./pages/Order/InStock/InStock'), loading: MyLoadingComponent });
//后台用户管理模块
const UserConfig = Loadable({ loader: () => import('./pages/Account/UserConfig'), loading: MyLoadingComponent });
// 商品管理模块
const ProductInfo = Loadable({ loader: () => import('./pages/Product/productInfo'), loading: MyLoadingComponent });
//售卖机管理模块
const VendingMachineManagement = Loadable({ loader: () => import('./pages/Company/VendingMachineManagement/VendingMachineManagement'), loading: MyLoadingComponent });
//商城管理模块
const MallManagement = Loadable({ loader: () => import('./pages/Company/MallManagement/MallManagement'), loading: MyLoadingComponent });
//订单管理模块--发货中
const Shipped = Loadable({ loader: () => import('./pages/Order/Shipped/Shipped'), loading: MyLoadingComponent });

/**功能模块 end**/
@observer
class IRouter extends Component {

    render() {
        const routers = AuthStores.getMenusRouter;
        if (routers.length > 0) {
            return (
                <HashRouter>
                    <App>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/admin" render={() =>
                                <AdminLayout>
                                    <Switch>
                                        {
                                            routers.map((item, index) => {
                                                
                                                try {
                                                    if (item.path.length>0) {
                                                        return (
                                                            <Route path={item.path} component={eval(item.component)} key={item.path} />
                                                        )
                                                    }
                                                } catch (e) {
                                                    return (
                                                        <Route path={item.path} component={Page404} key={item.path} />
                                                    )
                                                }
                                            })
                                        }
                                        <Route component={Page404} />
                                    </Switch>
                                </AdminLayout>
                            } />
                            <Redirect from="/" to="/admin/Home" />
                            <Route component={Page404} />
                        </Switch>
                    </App>
                </HashRouter>
            )
        } else {
            return (
                <HashRouter>
                    <App>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/admin" render={() =>
                                <AdminLayout>
                                    <Switch>
                                        加载中...
                                    </Switch>
                                </AdminLayout>
                            } />
                            <Redirect from="/" to="/admin/home" />
                            <Route component={Page404} />
                        </Switch>
                    </App>
                </HashRouter>
            )
        }

    }
}

export default IRouter;