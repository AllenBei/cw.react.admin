import React, { Component } from 'react';  //Fragment
import { observer } from 'mobx-react'
import Router from './router/router.js';
@observer
class ComManagement extends Component {

    render() {
        return (
            <Router/>
        )
    }
}

export default ComManagement;