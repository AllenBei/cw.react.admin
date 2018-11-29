import React, { Component } from 'react';
import {observer} from 'mobx-react'
import Router from './router/router.js';

@observer
class ProductInfo extends Component {
    render() {
        return (
            <Router/>
        )
    }
}

export default ProductInfo;
