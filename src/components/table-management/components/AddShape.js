import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "reactstrap";
import Input from "../../common/form-fields/Input";
import Select from "../../common/form-fields/Select";

@observer
export default class AddShape extends Component {
    render() {
        const { shapeStore, shapeStore: {isAddShapeModal, shapeModalFormData} } = this.props.page;
        let disabled = shapeModalFormData.shape !== "11";

        return (
            <React.Fragment>
                <Modal isOpen={isAddShapeModal} toggle={ e => { shapeStore.clearAddShapeModal() } } centered
                       className="modal-400">
                    <ModalHeader toggle={ e => { shapeStore.clearAddShapeModal() } }>Add Shape</ModalHeader>
                    <ModalBody>
                        <Select
                            label="Shapes"
                            options={ [
                                {label : "Default", value : "11" },
                                {label : "Entrance", value : "12"},
                                {label : "Reception", value : "13" },
                                {label : "Restrooms", value : "14" },
                                {label : "Kitchen", value : "15" }
                                ]
                            }
                            value={ shapeModalFormData.shape }
                            onChange={ e => { shapeModalFormData.shape = e.target.value }}
                        />

                        <Input
                            label="Name"
                            disabled={disabled}
                            value={shapeModalFormData.name}
                            onChange={ e => { shapeModalFormData.name = e.target.value } }
                        />
                    </ModalBody>
                    <ModalFooter className="d-flex">
                        <Button color="secondary" size="lg" className="w-50" onClick={e => { shapeStore.clearAddShapeModal() } }>Cancel</Button>
                        <Button color="primary" size="lg" className="w-50" onClick={e => { shapeStore.onClickAddShape() } }>Add</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}