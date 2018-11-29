import React, { Component } from 'react';
import { MenuConfigStores } from '@/store/store.js'
import { Table, Button, Popconfirm } from 'antd';
import MenuModal from './MenuModal'
import { observer } from 'mobx-react'
@observer
class MenuTable extends Component {

    state = {
        columns: [
            { title: 'menuID', dataIndex: 'menuID', key: '1', width: 100, },
            { title: '菜单标题', dataIndex: 'menuName', key: '2' },
            {
                title: '操作', key: '4', width: 120,
                render: (record) => {
                    return (
                        <div className='edit'>
                            <Button type="primary" icon="edit" onClick={() => { this.showModalParent('edit', record) }}></Button>
                            <Popconfirm title="确认删除此菜单?" cancelText="取消" okText="确定" onConfirm={() => { this.deleteMenu(record) }} >
                                <Button type="danger" icon="delete" ></Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        MenuConfigStores.setMenuList();
    }

    //删除
    deleteMenu = (obj) => {
        MenuConfigStores.deleteMenu({
            index: obj.index,
            menuID: obj.menuID
        });
    }

    //展示模态框
    showModalParent = (type, info) => {
        MenuConfigStores.setMenuModalShow({ flag: true });
        info ? MenuConfigStores.setMenuModalInfo({
            type: type,
            info: info
        }) : MenuConfigStores.setMenuModalInfo({
            type: type
        });
    }

    setTypeUrl = (record) => {
        MenuConfigStores.setMenuItemList({ menuID: record.menuID })
    }

    render() {
        return (
            <div className="MenuTable">
                <Table
                    size={"small"}
                    columns={this.state.columns}
                    dataSource={MenuConfigStores.getMenuList.length > 0 ? MenuConfigStores.getMenuList : null}
                    bordered
                    scroll={{ y: (document.body.offsetHeight - 230) }}
                    pagination={false}
                    onRow={(record) => {
                        return {
                            onClick: () => { this.setTypeUrl(record) },// 点击行获取分类对应Url
                        };
                    }}
                    title={() => {
                        return (
                            <Button type="primary" icon="plus" onClick={() => {
                                this.showModalParent('add')
                            }}>新增</Button>
                        );
                    }} />
                <MenuModal/>
            </div>
        );
    }
}

export default MenuTable;