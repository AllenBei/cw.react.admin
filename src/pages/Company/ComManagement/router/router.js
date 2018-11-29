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

const Table = Loadable({loader: () => import('../Table'), loading: MyLoadingComponent});
const AddFrom = Loadable({loader: () => import('../AddFrom'), loading: MyLoadingComponent});

class IRouter extends Component {
    render(){
        return (
            <HashRouter>
                    <Switch>
                        <Route path="/admin/company/comManagement/Table" component={Table} />
                        <Route path="/admin/company/comManagement/Add" component={AddFrom} />
                        <Redirect from="/admin/company/comManagement" to="/admin/company/comManagement/Table"/>
                    </Switch>
            </HashRouter>
        )
    }
}

export default IRouter;