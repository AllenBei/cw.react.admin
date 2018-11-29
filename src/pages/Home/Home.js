import React, { Component } from 'react';
import AdminBreadcrumb from '@/components/AdminBreadcrumb/AdminBreadcrumb';
import '@/assets/style/scss/modules/Home/Home.scss';
import { Calendar } from 'antd';
class Home extends Component {

    render() {
        return (
            <div className="Home Modules">
                <AdminBreadcrumb bcRoute={[{ title: '首页', path: '' }]} />
                <div className="mainContentWarp">
                    <div className="mainContent">
                        <Calendar fullscreen={false}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;