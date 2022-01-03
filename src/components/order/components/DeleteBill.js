import React from 'react';
import {observer} from 'mobx-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Badge} from 'reactstrap';

@observer
export default class DeleteBill extends React.Component {

    render() {
        const { deleteBillStore } = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={deleteBillStore.showDeleteBill} toggle={e=>deleteBillStore.onToggleDeleteBill()} centered
                       className="modal-400">
                    <ModalHeader toggle={ e =>deleteBillStore.onToggleDeleteBill()}>Delete Bill</ModalHeader>
                    <ModalBody>
                        <div className="delete-bill-info text-center mt-30">
                            <Badge color="secondary" className="delete-bill-badge rounded-circle mx-auto">A</Badge>
                            <p className="lead"><span className="font-semi-bold">Table 1</span> • 4/4 • #00100</p>
                            <p className="delete-bill-message mt-5 mx-auto">Are you sure you want to delete this bill?</p>
                        </div>
                        <Button color="danger" size="lg" block>Delete Bill</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" size="lg" block onClick={e=>deleteBillStore.onToggleDeleteBill()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}