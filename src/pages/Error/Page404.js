import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Button } from 'antd';
import Img from '@/assets/images/404.png';
import '@/assets/style/scss/modules/404/404.scss';


@withRouter
class Page404 extends Component {
    handleClick() {
        this.props.history.push("../Home");
    }
    render() {
        return (
            <div className="Page404" >
                <img src={Img} alt="" />
                <Button className="comeBack" onClick={() => this.handleClick()}>
                    <Icon type="reload" theme="outlined" />返回主页
             </Button>

            </div>
        );
    }
}

export default Page404;