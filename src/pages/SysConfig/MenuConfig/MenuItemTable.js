import React, { Component } from 'react';
import { MenuConfigStores } from '@/store/store.js'
import { Table, Button, Popconfirm } from 'antd';
import MenuItemModal from './MenuItemModal'
import { observer } from 'mobx-react'
@observer
class MenuItemTable extends Component {

    state = {
        columns: [
            { title: 'menuItemID', dataIndex: 'menuItemID', key: '1', width: 150, },
            { title: '菜单项标题', dataIndex: 'text', key: '2' },
            {
                title: '操作', key: '4', width: 120,
                render: (record) => {
                    return (
                        <div className='edit'>
                            <Button type="primary" icon="edit" onClick={() => { this.showModalParent('edit', record) }}></Button>
                            <Popconfirm title="确认删除此菜单项?" cancelText="取消" okText="确定" onConfirm={() => { this.deleteMenuItem(record) }} >
                                <Button type="danger" icon="delete" ></Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }

    //删除
    deleteMenuItem = (obj) => {
        MenuConfigStores.deleteMenuItem({
            index: obj.index,
            menuItemID: obj.menuItemID
        });
    }

    //展示模态框
    showModalParent = (type, info) => {
        if(MenuConfigStores.getnowMenuID===null) return;
        MenuConfigStores.setMenuItemModalShow({ flag: true });
        info ? MenuConfigStores.setMenuItemModalInfo({
            type: type,
            info: info
        }) : MenuConfigStores.setMenuItemModalInfo({
            type: type
        });
    }
    render() {
        return (
            <div className="MenuItemTable">
                <Table
                    size={"small"}
                    columns={this.state.columns}
                    dataSource={MenuConfigStores.getMenuItemList.length > 0 ? MenuConfigStores.getMenuItemList : null}
                    bordered
                    scroll={{ y: (document.body.offsetHeight - 230) }}
                    pagination={false}
                    title={() => {
                        return (
                            <Button type="primary" icon="plus" onClick={() => {
                                this.showModalParent('add')
                            }}>新增</Button>
                        );
                    }} />
                <MenuItemModal/>
            </div>
        );
    }
}

export default MenuItemTable;