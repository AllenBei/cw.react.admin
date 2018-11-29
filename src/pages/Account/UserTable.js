import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { observer } from 'mobx-react'
import { UserConfigStores } from '@/store/store.js'
import { dataFormat } from '@/util/util.js'
import UserModal from './UserModal.js'
@observer
class UserTable extends Component {

    state = {
        columns: [
            { title: 'memberID', dataIndex: 'memberID', key: '1' },
            { title: '用户真实姓名', dataIndex: 'realName', key: '2', width: 130, },
            {
                title: '性别', dataIndex: 'sex', key: '3', width: 60,
                render: (text) => {
                    return (
                        <span>{text === 1 ? '男' : '女'}</span>
                    )
                }
            },
            { title: '手机', dataIndex: 'mobile', key: '4', width: 100, },
            { title: '邮箱', dataIndex: 'email', key: '5', width: 180, },
            {
                title: '注册时间', dataIndex: 'registerTime', key: '6', width: 130,
                render: (text) => {
                    return (
                        <span>{dataFormat(text,'yyyy-MM-dd')}</span>
                    )
                }
            },
            {
                title: '激活状态', dataIndex: 'isActivate', key: '7', width: 80,
                render: (text) => {
                    return (
                        <span>{text ? '已激活' : '未激活'}</span>
                    )
                }
            },
            {
                title: '操作', key: '8', width: 70,
                render: (record) => {
                    return (
                        <div className='edit'>
                            <Button type="primary" icon="edit" onClick={() => { this.showModalParent('edit', record) }}></Button>
                        </div>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        UserConfigStores.setUserMemberList();
    }

    //展示模态框
    showModalParent = (type, info) => {
        UserConfigStores.setUserModalShow({ flag: true });
        info ? UserConfigStores.setUserModalInfo({
            type: type,
            info: info
        }) : UserConfigStores.setUserModalInfo({
            type: type
        });
    }

    render() {
        return (
            <div className="TypeAdressTable">
                <Table
                    size={"small"}
                    columns={this.state.columns}
                    dataSource={UserConfigStores.getUserMemberList.length > 0 ? UserConfigStores.getUserMemberList : null}
                    bordered
                    scroll={{ y: (document.body.offsetHeight - 245) }}
                    title={() => {
                        return (
                            <Button type="primary" icon="plus" onClick={() => {
                                this.showModalParent('add')
                            }}>新增</Button>
                        );
                    }}
                    pagination={{
                        pageSize:20,
                        hideOnSinglePage: true
                    }}
                />
                <UserModal/>
            </div>
        );
    }
}

export default UserTable;