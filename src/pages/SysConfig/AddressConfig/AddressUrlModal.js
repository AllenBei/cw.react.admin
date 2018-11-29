import React, { Component } from 'react';
import AddressUrlForm from './AddressUrlForm'
import { AddressConfigStores } from '@/store/store.js';
import { observer } from 'mobx-react'
import { Modal } from 'antd';
@observer
class TypeAdressModal extends Component {

    handleCancel = (e) => {
        AddressConfigStores.setAddressUrlModalShow({ flag: false });
    }

    render() {
        return (
            <Modal className="UrlAddressModal"
                title={AddressConfigStores.getAddressUrlModalInfo.type === 'add' ? '新增Url' : '编辑Url'}
                visible={AddressConfigStores.getAddressUrlModalShow}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                closable={true}
                destroyOnClose={true} >
                <AddressUrlForm/>
            </Modal>
        );
    }
}

export default TypeAdressModal;