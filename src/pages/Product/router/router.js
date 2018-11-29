import React,{Component} from 'react';
import {HashRouter,Switch,Route,Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

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

const Table = Loadable({loader: () => import('../ProductTable'), loading: MyLoadingComponent});
const AddFrom = Loadable({loader: () => import('../ProductAdd'), loading: MyLoadingComponent});

class IRouter extends Component {
    render(){
        return (
            <HashRouter>
                    <Switch>
                        <Route path="/admin/Product/ProductInfo/Table" component={Table} />
                        <Route path="/admin/Product/ProductInfo/Add" component={AddFrom} />
                        <Redirect from="/admin/Product/ProductInfo/" to="/admin/Product/ProductInfo/Table"/>
                    </Switch>
            </HashRouter>
        )
    }
}

export default IRouter;