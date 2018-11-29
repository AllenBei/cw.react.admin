import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Button, Transfer, Spin } from 'antd';
import { UserConfigStores } from '@/store/store.js';
@observer
class EditMemberGroupMenuForm extends Component {
    state = {
        dataSource: UserConfigStores.getMemberGroupTransferData,
        targetKeys: UserConfigStores.getMemberGroupTransferTargetKey,
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const obj = UserConfigStores.getUserModalInfo;
        UserConfigStores.setMemberGroupTransferData({
            type: obj.type,
            gid: obj.info.gid
        });
    }

    handleChange = (targetKeys, direction, moveKeys) => {
        this.setState({ targetKeys });
    }

    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    submitData = () => {
        const obj = UserConfigStores.getUserModalInfo;
        UserConfigStores.modifyMemberGroupTransfer({
            newKey: this.state.targetKeys,
            gid: obj.info.gid
        })
    }

    render() {
        if (!UserConfigStores.getTransferLoading) {
            return (
                <div className="EditMemberGroupMenuForm">
                    <Transfer
                        dataSource={this.state.dataSource}
                        showSearch
                        listStyle={{
                            width: 250,
                            height: 250,
                        }}
                        filterOption={this.filterOption}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleChange}
                        render={item => `${item.title}`}
                    />
                    <Button type="primary" onClick={() => { this.submitData() }}>保存会员组菜单配置</Button>
                </div>
            );
        } else {
            return (
                <div className="EditMemberGroupMenuForm">
                    <Spin tip="数据加载中..." />
                </div>
            )
        }

    }
}
export default EditMemberGroupMenuForm;