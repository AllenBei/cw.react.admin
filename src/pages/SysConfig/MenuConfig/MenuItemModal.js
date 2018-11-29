import React, { Component } from 'react';
import { MenuConfigStores } from '@/store/store.js';
import MenuItemForm from './MenuItemForm.js'
import { observer } from 'mobx-react'
import { Modal } from 'antd';
@observer
class MenuItemModal extends Component {

    handleCancel = (e) => {
        MenuConfigStores.setMenuItemModalShow({ flag: false });
    }

    render() {
        return (
            <Modal className="MenuItemModal"
                title={MenuConfigStores.getMenuItemModalInfo.type === 'add' ? '新增菜单' : '编辑菜单'}
                visible={MenuConfigStores.getMenuItemModalShow}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                closable={true}
                destroyOnClose={true} >
                <MenuItemForm/>
            </Modal>
        );
    }
}

export default MenuItemModal;