import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Input from "../../common/form-fields/Input";

@observer
export default class EditTable extends Component {
    render() {
        const {
            page: {
                tableStore,
                tableStore: {isEditTableModal, formData}
            }
        } = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={isEditTableModal} toggle={e => {
                    tableStore.clearEditTableModal()
                }} centered
                       className="modal-400">
                    <ModalHeader toggle={e => {
                        tableStore.clearEditTableModal()
                    }}>Edit Table</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Table No."
                            value={formData ? formData.TableName : ''}
                            onChange={e => formData.TableName = e.target.value}
                        />
                        <Input
                            label="Max. Seats"
                            type="number"
                            value={formData ? formData.seat : ''}
                            onChange={e => formData.seat = e.target.value}
                        />
                        <div className="modal-btns">
                            <Button color="secondary" size="lg" block onClick={e => tableStore.onClickTableClone()}>Duplicate
                                Table</Button>
                            <Button color="danger" size="lg" block onClick={e => {
                                tableStore.onClickTableDelete()
                            }}>Delete Table</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter className="d-flex">
                        <Button color="secondary" size="md" className="w-50" onClick={e => {
                            tableStore.clearEditTableModal()
                        }}>Cancel</Button>
                        <Button color="primary" size="md" className="w-50" onClick={e => {
                            tableStore.onClickEditTableSave()
                        }}>Save</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}