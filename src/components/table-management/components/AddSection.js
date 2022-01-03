import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "reactstrap";
import Input from "../../common/form-fields/Input";

@observer
export default class AddSection extends Component {
    render() {
        const { page: {
            sectionStore,
            sectionStore : {isAddSectionModal, formData, sectionModalFormError}
        } } = this.props;

        return (
            <div>
                <Modal isOpen={isAddSectionModal} toggle={ e => { sectionStore.clearAddSectionModal() } } centered
                       className="modal-400">
                    <ModalHeader toggle={ e => { sectionStore.clearAddSectionModal() } }>Add Section</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Name"
                            error={sectionModalFormError ? sectionModalFormError['name'] : ''}
                            value={formData.name}
                            onChange={ e => formData.name = e.target.value}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" size="lg" block onClick={e => { sectionStore.onClickSectionSave() } }>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}