import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {RouterLink} from 'mobx-state-router';

@observer
export default class TableOptionsModal extends Component {

    render() {
        const {addGuestStore, tableOptionsStore, tableOptionsStore: { isTableOptionsModal } } = this.props.page;
        return (
            <div>
                <Modal isOpen={isTableOptionsModal} toggle={e => tableOptionsStore.clearTableOptionsModal()} centered
                       className="share-modal">
                    <ModalHeader toggle={e => tableOptionsStore.clearTableOptionsModal()}>Table Options</ModalHeader>
                    <ModalBody>
                        <Button color="primary" size="lg" block onClick={ e => addGuestStore.showAddGuestModal(tableOptionsStore.currentTable.Id)}>Add Guests</Button>
                        <RouterLink routeName="OrderBill" params={ {"tableId" : (tableOptionsStore.currentTable.Id) ? tableOptionsStore.currentTable.Id.toString() : '3612' }} className="btn btn-primary btn-md btn-block">
                            Add Bill
                        </RouterLink>
                        <Button color="primary" size="lg" block>Split Bill</Button>
                        <Button color="primary" size="lg" block>Transfer Bill</Button>
                        <RouterLink routeName="combineTables" className="btn btn-primary btn-lg btn-block">
                            Combine Tables (One Bill)
                        </RouterLink>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" size="lg" block onClick={ e => tableOptionsStore.clearTableOptionsModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}