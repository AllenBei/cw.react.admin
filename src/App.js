import React, {Component,Fragment} from 'react';
import {AuthStores} from '@/store/store.js'
import {observer} from 'mobx-react'
import { withRouter } from 'react-router-dom'

@withRouter
@observer
class App extends Component {

  componentWillMount(){
    AuthStores.getUserInfo(this.props.history)
  }

  render() {
    return (
        <Fragment>
          {this.props.children}
        </Fragment>
    );
  }
}

export default App;