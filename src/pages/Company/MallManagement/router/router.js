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

const MallList = Loadable({loader: () => import('../MallList'), loading: MyLoadingComponent});
const MallForm = Loadable({loader: () => import('../MallForm'), loading: MyLoadingComponent});

class IRouter extends Component {
    render(){
        return (
            <HashRouter>
                    <Switch>
                        <Route path="/admin/company/MallManagement/MallList" component={MallList} />
                        <Route path="/admin/company/MallManagement/MallForm" component={MallForm} />
                        <Redirect from="/admin/company/MallManagement" to="/admin/company/MallManagement/MallList"/>
                    </Switch>
            </HashRouter>
        )
    }
}

export default IRouter;