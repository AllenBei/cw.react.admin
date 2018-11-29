import React, { Component } from 'react';
import '@/assets/style/scss/modules/SysConfig/MenuConfig.scss';
import { MenuConfigStores } from '@/store/store.js';
import MenuForm from './MenuForm.js'
import { observer } from 'mobx-react'
import { Modal } from 'antd';
@observer
class MenuModal extends Component {

    handleCancel = (e) => {
        MenuConfigStores.setMenuModalShow({ flag: false });
    }

    render() {
        return (
            <Modal className="MenuModal"
                title={MenuConfigStores.getMenuModalInfo.type === 'add' ? '新增菜单' : '编辑菜单'}
                visible={MenuConfigStores.getMenuModalShow}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                closable={true}
                destroyOnClose={true} >
                <MenuForm/>
            </Modal>
        );
    }
}

export default MenuModal;