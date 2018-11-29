import React, { Component } from 'react';
import { AddressConfigStores } from '@/store/store.js'
import { Table, Button, Popconfirm } from 'antd';
import { observer } from 'mobx-react';
import AddressUrlModal from './AddressUrlModal'
@observer
class UrlAdressTable extends Component {

    state = {
        columns: [
            { title: 'urlID', dataIndex: 'urlid', key: '1', width: 100, },
            { title: '标题', dataIndex: 'urlTitle', key: '2', width: 150, },
            { title: '地址', dataIndex: 'urlContent', key: '3' },
            {
                title: '操作', key: '4', width: 120,
                render: (record) => {
                    return (
                        <div className='edit'>
                            <Button type="primary" icon="edit" onClick={() => { this.showModalParent('edit', record) }}></Button>
                            <Popconfirm title="确认删除此Url?" cancelText="取消" okText="确定" onConfirm={() => { this.deleteMenu(record) }} >
                                <Button type="danger" icon="delete" ></Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }

    //删除
    deleteMenu = (obj) => {
        console.log(obj);

        AddressConfigStores.deleteAddressUrl({
            index: obj.index,
            urlID: obj.urlid,
            cataid: obj.urlCataID,
        });
    }

    //展示模态框
    showModalParent = (type, info) => {

        if (AddressConfigStores.getNowCataid != null) {
            AddressConfigStores.setAddressUrlModalShow({ flag: true });
            info ? AddressConfigStores.setAddressUrlModalInfo({
                type: type,
                info: info
            }) : AddressConfigStores.setAddressUrlModalInfo({
                type: type,
            });
        }
    }

    render() {
        return (
            <div className="UrlAdressTable">
                <Table
                    size={"small"}
                    columns={this.state.columns}
                    dataSource={AddressConfigStores.getAddressUrlList.length > 0 ? AddressConfigStores.getAddressUrlList : null}
                    bordered
                    scroll={{ y: (document.body.offsetHeight - 270) }}
                    pagination={false}
                    title={() => {
                        return (
                            <Button type="primary" icon="plus" onClick={() => {
                                this.showModalParent('add')
                            }}>新增</Button>
                        );
                    }} />
                <AddressUrlModal />
            </div>
        );
    }
}

export default UrlAdressTable;