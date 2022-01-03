import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "reactstrap";
import Input from "../../common/form-fields/Input";

@observer
export default class AddItemQty extends Component {
    render() {
        const {
            customItemModalStore, customItemModalStore: {
                showCustomItemQty, customItemFormData
            }
        } = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={showCustomItemQty} toggle={customItemModalStore.clearCustomItem } centered
                       className="modal-400">
                    <ModalHeader toggle={customItemModalStore.clearCustomItem}>Quantity</ModalHeader>
                    <ModalBody>
                        <div className="d-flex numeric-field mx-auto">
                            <Button color="secondary" onClick={ e => customItemModalStore.onToggleItemQty(true)}><span className="icon-minus" /></Button>
                            <Input
                                type="number"
                                value={customItemFormData.qty}
                                onChange={ e => customItemModalStore.onChangeItemQty(e.target.value) }
                            />
                            <Button color="secondary" onClick={ e => customItemModalStore.onToggleItemQty(false)}><span className="icon-plus"/></Button>
                        </div>
                    </ModalBody>
                    <ModalFooter className="flex-column">
                        <Button color="secondary" size="lg" className="mr-0" block onClick={customItemModalStore.clearCustomItem}>Cancel</Button>
                        <Button color="primary" size="lg" className="ml-0" block onClick={customItemModalStore.onClickSaveCustomItem}>Add</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}