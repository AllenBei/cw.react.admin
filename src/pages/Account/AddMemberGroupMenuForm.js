import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Transfer, Spin } from 'antd';
import { UserConfigStores } from '@/store/store.js';
@observer
class MemberGroupMenuForm extends Component {
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
            gid: ''
        });
    }

    handleChange = (targetKeys, direction, moveKeys) => {
        this.setState({ targetKeys }, () => {
            UserConfigStores.setAddForMulti2({ newKey: this.state.targetKeys });
            console.log(UserConfigStores.getAddForMulti2);
        });
    }

    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    render() {
        if (!UserConfigStores.getTransferLoading) {
            return (
                <div className="MemberGroupMenuForm">
                    <Transfer
                        dataSource={this.state.dataSource}
                        showSearch
                        listStyle={{
                            width: 220,
                            height: 220,
                        }}
                        filterOption={this.filterOption}
                        targetKeys={this.state.targetKeys}
                        onChange={this.handleChange}
                        render={item => `${item.title}`}
                    />
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