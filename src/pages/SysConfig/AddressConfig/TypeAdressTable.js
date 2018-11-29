import React, { Component } from 'react';
import { AddressConfigStores } from '@/store/store.js'
import { Table, Button, Popconfirm } from 'antd';
import TypeAdressModal from './TypeAdressModal'
import { observer } from 'mobx-react'
@observer
class TypeAdressTable extends Component {

    state = {
        columns: [
            { title: 'UrlCataID', dataIndex: 'urlCataID', key: '1', width: 100, },
            { title: 'Url分类', dataIndex: 'urlCataName', key: '2' },
            {
                title: '操作', key: '4', width: 120,
                render: (record) => {
                    return (
                        <div className='edit'>
                            <Button type="primary" icon="edit" onClick={() => { this.showModalParent('edit', record) }}></Button>
                            <Popconfirm title="确认删除此分类?" cancelText="取消" okText="确定" onConfirm={() => { this.deleteMenu(record) }} >
                                <Button type="danger" icon="delete" ></Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        AddressConfigStores.setAddressUrlTypeList();
    }

    //删除
    deleteMenu = (obj) => {
        AddressConfigStores.deleteAddressType({
            index: obj.index,
            urlCataID: obj.urlCataID
        });
    }

    //展示模态框
    showModalParent = (type, info) => {
        AddressConfigStores.setAddressUrlTypeModalShow({ flag: true });
        info ? AddressConfigStores.setAddressUrlTypeModalInfo({
            type: type,
            info: info
        }) : AddressConfigStores.setAddressUrlTypeModalInfo({
            type: type
        });
    }

    setTypeUrl = (record) => {
        AddressConfigStores.setAddressUrlList({ cataid: record.urlCataID })
    }

    render() {
        return (
            <div className="TypeAdressTable">
                <Table
                    size={"small"}
                    columns={this.state.columns}
                    dataSource={AddressConfigStores.getAddressUrlTypeList.length > 0 ? AddressConfigStores.getAddressUrlTypeList : null}
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
                <TypeAdressModal/>
            </div>
        );
    }
}

export default TypeAdressTable;