import React from 'react';
import {observer} from 'mobx-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

@observer
export default class OrderBillOptions extends React.Component {

    render() {
        const { orderBillOptionStore, addGuestStore, deleteBillStore }  = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={orderBillOptionStore.showBillOptions} toggle={e=>orderBillOptionStore.onToggleBillOptions()} centered
                       className="share-modal">
                    <ModalHeader toggle={ e =>orderBillOptionStore.onToggleBillOptions()}>Bill</ModalHeader>
                    <ModalBody>
                        <Button color="primary" size="lg" block onClick={ e => addGuestStore.showAddGuestModal()}>Add Guests</Button>
                        <Button color="primary" block>Add Bill</Button>
                        <Button color="primary" block>Split Bill</Button>
                        <Button color="primary" block>Transfer Bill</Button>
                        <Button color="danger" block onClick={ e => deleteBillStore.onToggleDeleteBill() }>Delete Bill</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" size="lg" block onClick={e=>orderBillOptionStore.onToggleBillOptions()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}