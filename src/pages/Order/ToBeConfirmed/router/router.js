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

const ToBeConfirmedTable = Loadable({loader: () => import('../ToBeConfirmedTable'), loading: MyLoadingComponent});
const ToBeConfirmedForm = Loadable({loader: () => import('../ToBeConfirmedForm'), loading: MyLoadingComponent});

class IRouter extends Component {
    render(){
        return (
            <HashRouter>
                    <Switch>
                        <Route path="/admin/Order/ToBeConfirmed/ToBeConfirmedTable" component={ToBeConfirmedTable} />
                        <Route path="/admin/Order/ToBeConfirmed/ToBeConfirmedForm" component={ToBeConfirmedForm} />
                        <Redirect from="/admin/Order/ToBeConfirmed" to="/admin/Order/ToBeConfirmed/ToBeConfirmedTable"/>
                    </Switch>
            </HashRouter>
        )
    }
}

export default IRouter;