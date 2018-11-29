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

const ShippedTable = Loadable({loader: () => import('../ShippedTable'), loading: MyLoadingComponent});

class IRouter extends Component {
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Route path="/admin/Order/Shipped/ShippedTable" component={ShippedTable} />
                    <Redirect from="/admin/Order/Shipped" to="/admin/Order/Shipped/ShippedTable"/>
                </Switch>
            </HashRouter>
        )
    }
}

export default IRouter;