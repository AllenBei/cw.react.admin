import React, { Component } from 'react';
import { MemberGroupConfigStores } from '@/store/store.js';
import MemberGroupForm from './MemberGroupForm.js'
import MemberGroupMenuForm from './MemberGroupMenuForm.js'
import { observer } from 'mobx-react'
import { Modal, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

@observer
class MemberGroupModal extends Component {

    handleCancel = (e) => {
        MemberGroupConfigStores.setMemberGroupModalShow({ flag: false });
    }

    render() {
        let obj = MemberGroupConfigStores.getMemberGroupModalInfo;
        return (
            <Modal className="MemberGroupModal"
                width={600}
                height={460}
                title={obj.type === 'add' ? '新增会员组' : '编辑会员组'}
                visible={MemberGroupConfigStores.getMemberGroupModalShow}
                onCancel={this.handleCancel}
                closable={true}
                destroyOnClose={true} >
                <Tabs type="card">
                    <TabPane tab="会员组" key="1">
                        <MemberGroupForm />
                    </TabPane>
                    {
                        obj.type === 'edit' ?
                            <TabPane tab="会员组菜单配置" key="2">
                                <MemberGroupMenuForm />
                            </TabPane> : null
                    }
                </Tabs>
            </Modal>
        );
    }
}

export default MemberGroupModal;