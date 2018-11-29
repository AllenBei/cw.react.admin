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

const InStockTable = Loadable({loader: () => import('../InStockTable'), loading: MyLoadingComponent});
const InStockEditForm = Loadable({loader: () => import('../InStockEditForm'), loading: MyLoadingComponent});

class IRouter extends Component {
    render(){
        return (
            <HashRouter>
                    <Switch>
                        <Route path="/admin/Order/InStock/InStockTable" component={InStockTable} />
                        <Route path="/admin/Order/InStock/InStockEditForm" component={InStockEditForm} />
                        <Redirect from="/admin/Order/InStock" to="/admin/Order/InStock/InStockTable"/>
                    </Switch>
            </HashRouter>
        )
    }
}

export default IRouter;