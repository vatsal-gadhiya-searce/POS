import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Button, Modal,  ModalFooter, ModalHeader} from "reactstrap";

@observer
export default class DeleteLine extends Component {
    render() {
        const {lineStore, lineStore: { isDeleteLineModal }} = this.props.page;

        return (
            <React.Fragment>
                <Modal isOpen={isDeleteLineModal} toggle={e => { lineStore.hideDeleteLineModal() }} centered
                       className="modal-400">
                    <ModalHeader toggle={e => { lineStore.hideDeleteLineModal() }}>Delete Line</ModalHeader>
                    <ModalFooter className="d-flex">
                        <Button color="secondary" size="md" className="w-50" onClick={ e => { lineStore.hideDeleteLineModal() } } >Cancel</Button>
                        <Button color="danger" size="md" className="w-50" onClick={e => { lineStore.onClickLineDelete() } }>Delete</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}