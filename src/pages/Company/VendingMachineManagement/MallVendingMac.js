import React, { Component } from 'react';
import {MallVendingMacStores} from '@/store/store.js'
import '@/assets/style/scss/modules/ComManagement.scss';
import { Table,} from 'antd';
import {observer} from 'mobx-react'

@observer
class MallList extends Component {
    state = {
        columns : [
            { title: '公司名称',  dataIndex: 'mallName', key: '1' }
        ]
    }
    componentWillMount(){
        MallVendingMacStores.getMallComState()
        // console.log(MallVendingMacStores.getMallState);
        
    }
    setComID(record){
        MallVendingMacStores.getMallMacInfoState(record.mallID);
    }

    render() {
        return(
            <div className="mainContentWarp">
                    <div className="mainContent">
                        <Table className="tableList"
                            size={'small'}
                            columns={this.state.columns}
                            bordered
                            dataSource={MallVendingMacStores.getMallState.length>0?MallVendingMacStores.getMallState:null}
                            scroll={{ y:(document.body.offsetHeight-230)}}
                            pagination={false}
                            onRow={(record) => {
                                return {
                                    onClick: () => { this.setComID(record) }
                                };
                            }}
                            />
                    </div>
            </div>
        )
    }
}

export default MallList;