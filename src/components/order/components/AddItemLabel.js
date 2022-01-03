import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "reactstrap";
import Input from "../../common/form-fields/Input";

@observer
export default class AddItemLabel extends Component {
    render() {
        const {
            customItemModalStore,
            customItemModalStore: {
                showCustomItemLabel,
                customItemFormData
            }
        } = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={showCustomItemLabel} toggle={customItemModalStore.clearCustomItem } centered
                       className="modal-400">
                    <ModalHeader toggle={customItemModalStore.clearCustomItem}>Label</ModalHeader>
                    <ModalBody>
                        <Input
                            value={customItemFormData.Name}
                            onChange={ e => customItemFormData.Name = e.target.value}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" size="lg" block onClick={customItemModalStore.onClickSaveCustomItemLabel}>Save</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}