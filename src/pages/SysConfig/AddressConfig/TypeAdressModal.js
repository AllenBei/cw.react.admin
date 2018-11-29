import React, { Component } from 'react';
import '@/assets/style/scss/modules/SysConfig/MenuConfig.scss';
import TypeAdressForm from './TypeAdressForm'
import { AddressConfigStores } from '@/store/store.js';
import { observer } from 'mobx-react'
import { Modal } from 'antd';
@observer
class TypeAdressModal extends Component {

    handleCancel = (e) => {
        AddressConfigStores.setAddressUrlTypeModalShow({ flag: false });
    }

    render() {
        return (
            <Modal className="TypeAdressModal"
                title={AddressConfigStores.getAddressUrlTypeModalInfo.type === 'add' ? '新增类型' : '编辑类型'}
                visible={AddressConfigStores.getAddressUrlTypeModalShow}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                closable={true}
                destroyOnClose={true} >
                <TypeAdressForm/>
            </Modal>
        );
    }
}

export default TypeAdressModal;