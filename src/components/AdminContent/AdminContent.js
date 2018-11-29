import React, { Component } from 'react';
//引入store
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
@withRouter
@observer
class AdminContent extends Component {
    render() {
        return (
            <div className="AdminContent" >
                {this.props.routes}
            </div>
        );
    }
}

export default AdminContent;