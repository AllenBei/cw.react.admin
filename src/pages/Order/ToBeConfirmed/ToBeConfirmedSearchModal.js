import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Modal, Button, Input, Select } from 'antd';
import { ToBeConfirmedStores } from '@/store/store.js'
import { observer } from 'mobx-react'
import SearchForm from './SearchForm.js'


@observer
class ToBeConfirmedSearchModal extends Component {

    handleCancel = (e) => {
        ToBeConfirmedStores.setToBeConfirmedSearchModalShow({ flag: false });
    }

    render() {
        return (
            <Modal className="ToBeConfirmedSearchModal"
                title={'请输入您要查找的信息'}
                visible={ToBeConfirmedStores.getToBeConfirmedSearchModalShow}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                closable={true}
                destroyOnClose={true} >
                <SearchForm />
            </Modal>
        );
    }
}

export default ToBeConfirmedSearchModal;