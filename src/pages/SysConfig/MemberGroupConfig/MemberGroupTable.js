import React, { Component } from 'react';
import { MemberGroupConfigStores } from '@/store/store.js'
import { Table, Button, Popconfirm } from 'antd';
import { observer } from 'mobx-react'
import MemberGroupModal from './MemberGroupModal';
@observer
class MemberGroupTable extends Component {

    state = {
        columns: [
            { title: 'MemGroupID', dataIndex: 'memGroupID', key: '1', width: 120, },
            { title: '类别名', dataIndex: 'memGroupName', key: '2', width: 200, },
            { title: '描述', dataIndex: 'memGroupDes', key: '3' },
            {
                title: '操作', key: '4', width: 140,
                render: (record) => {
                    return (
                        <div className='edit'>
                            <Button type="primary" icon="edit" onClick={() => { this.showModalParent('edit', record) }}></Button>
                            <Popconfirm title="确认删除此会员组?" cancelText="取消" okText="确定" onConfirm={() => { this.deleteMemberGroup(record) }} >
                                <Button type="danger" icon="delete" ></Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        MemberGroupConfigStores.setMemberGroupList({
            pageIndex: 1
        });
    }

    //删除
    deleteMemberGroup = (obj) => {
        MemberGroupConfigStores.deleteMemberGroup({
            index: obj.index,
            memgroupid: obj.memGroupID
        });
    }

    //展示模态框
    showModalParent = (type, info) => {
        MemberGroupConfigStores.setMemberGroupModalShow({ flag: true });
        info ? MemberGroupConfigStores.setMemberGroupModalInfo({
            type: type,
            info: info
        }) : MemberGroupConfigStores.setMemberGroupModalInfo({
            type: type
        });
    }

    render() {
        return (
            <div className="TypeAdressTable">
                <Table
                    size={"small"}
                    columns={this.state.columns}
                    dataSource={MemberGroupConfigStores.getMemberGroupList.length > 0 ? MemberGroupConfigStores.getMemberGroupList : null}
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
                        hideOnSinglePage:true
                    }}
                />
                <MemberGroupModal/>
            </div>
        );
    }
}

export default MemberGroupTable;