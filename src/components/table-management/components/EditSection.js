import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "reactstrap";
import Input from "../../common/form-fields/Input";

@observer
export default class EditSection extends Component {
    render() {
        const { page: {
                sectionStore,
                sectionStore: {isEditSectionModal, formData, sectionModalFormError}
            }
        } = this.props;

        return (
            <div>
                <Modal isOpen={isEditSectionModal} toggle={e => {
                    sectionStore.clearEditSectionModal()
                }} centered
                       className="modal-400">
                    <ModalHeader toggle={e => {
                        sectionStore.clearEditSectionModal()
                    }}>Edit Section</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Name"
                            error={sectionModalFormError ? sectionModalFormError['name'] : ''}
                            value={formData.name}
                            onChange={e => formData.name = e.target.value}
                        />
                        <div className="modal-btns">
                            <Button color="secondary" size="lg" block onClick={e => sectionStore.onClickSectionClone()}>Duplicate
                                Section</Button>
                            <Button color="danger" size="lg" block onClick={e => {
                                sectionStore.onClickDeleteSection()
                            }}>Delete Section</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter className="d-flex">
                        <Button color="secondary" size="md" className="w-50" onClick={e => {
                            sectionStore.clearEditSectionModal()
                        }}>Cancel</Button>
                        <Button color="primary" size="md" className="w-50" onClick={e => {
                            sectionStore.onClickEditSectionSave()
                        }}>Save</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}