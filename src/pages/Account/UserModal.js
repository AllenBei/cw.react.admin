import React, { Component } from 'react';
import { UserConfigStores } from '@/store/store.js';
import UserInfoForm from './UserInfoForm.js'
import EditUserInfoForm from './EditUserInfoForm.js'
import EditMemberGroupMenuForm from './EditMemberGroupMenuForm.js'
import { observer } from 'mobx-react'
import { Modal, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

@observer
class UserModal extends Component {

    handleCancel = (e) => {
        UserConfigStores.setUserModalShow({ flag: false });
    }

    render() {
        let obj = UserConfigStores.getUserModalInfo;
        if (obj.type === 'add') {
            return (
                <Modal className="UserModal"
                    title={'新增会员'}
                    visible={UserConfigStores.getUserModalShow}
                    onCancel={this.handleCancel}
                    closable={true}
                    destroyOnClose={true} >
                    <UserInfoForm />
                </Modal>
            );
        } else {
            return (
                <Modal className="UserModal"
                    title={'编辑会员'}
                    visible={UserConfigStores.getUserModalShow}
                    onCancel={this.handleCancel}
                    closable={true}
                    destroyOnClose={true} >
                    <Tabs type="card">
                        <TabPane tab="编辑会员信息" key="1">
                            <EditUserInfoForm />
                        </TabPane>
                        <TabPane tab="编辑管理组菜单" key="2">
                            <EditMemberGroupMenuForm />
                        </TabPane>
                    </Tabs>
                </Modal>
            );
        }

    }
}

export default UserModal;