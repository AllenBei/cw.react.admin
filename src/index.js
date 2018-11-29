import React from 'react';
import ReactDOM from 'react-dom';
import Router from '@/router';
import 'babel-polyfill'
import '@/theme.less';
import '@/assets/style/scss/base.scss';
ReactDOM.render( <Router/> , document.getElementById('root'));