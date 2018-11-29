import React, { Component } from 'react';  //Fragment
import { observer } from 'mobx-react'
import Router from './router/router.js';
import '@/assets/style/scss/modules/Order/OrderTable.scss';

@observer
class Shipped extends Component {

    render() {
        return (
            <Router/>
        )
    }
}

export default Shipped;