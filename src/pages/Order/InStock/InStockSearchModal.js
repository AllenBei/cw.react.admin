import React, { Component } from 'react';
import { Modal,} from 'antd';
import { InStockStores } from '@/store/store.js'
import { observer } from 'mobx-react'
import SearchForm from './SearchForm.js'


@observer
class InstockSearchModal extends Component {

    handleCancel = (e) => {
        InStockStores.setInstockSearchState({ flag: false });
    }

    render() {
        return (
            <Modal className="ToBeConfirmedSearchModal"
                title={'请输入您要查找的信息'}
                visible={InStockStores.InstockSearchStates}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                closable={true}
                destroyOnClose={true} >
                <SearchForm />
            </Modal>
        );
    }
}

export default InstockSearchModal;