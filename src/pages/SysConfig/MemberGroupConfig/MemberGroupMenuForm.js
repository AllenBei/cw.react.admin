import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Button, Transfer, Spin } from 'antd';
import { MemberGroupConfigStores } from '@/store/store.js';
@observer
class MemberGroupMenuForm extends Component {
    state = {
        dataSource: MemberGroupConfigStores.getMemberGroupTransferData,
        targetKeys: MemberGroupConfigStores.getMemberGroupTransferTargetKey,
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const obj = MemberGroupConfigStores.getMemberGroupModalInfo;
        MemberGroupConfigStores.setMemberGroupTransferData({ memgroupid: obj.info.memGroupID });
    }

    handleChange = (targetKeys, direction, moveKeys) => {
        this.setState({ targetKeys });
    }

    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    submitData = () => {
        const obj = MemberGroupConfigStores.getMemberGroupModalInfo;
        MemberGroupConfigStores.modifyMemberGroupTransfer({
            newKey: this.state.targetKeys,
            memgroupid: obj.info.memGroupID
        })
    }

    render() {
        if (!MemberGroupConfigStores.getTransferLoading) {
            return (
                <div className="MemberGroupMenuForm">
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
                <div className="MemberGroupMenuForm">
                    <Spin tip="数据加载中..." />
                </div>
            )
        }

    }
}
export default MemberGroupMenuForm;