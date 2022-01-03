import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Select from "../../common/form-fields/Select";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

@observer
export default class EditShape extends Component {
    render() {
        const { shapeStore, shapeStore: {isLoading, isEditShapeModal, shapeModalFormData} } = this.props.page;
        let disabled = shapeModalFormData.shape !== "11";


        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <React.Fragment>
                <Modal isOpen={isEditShapeModal} toggle={e => { shapeStore.clearAddShapeModal() }} centered
                       className="modal-400">
                    <ModalHeader toggle={e => { shapeStore.clearAddShapeModal() }}>Edit Shape</ModalHeader>
                    <ModalBody>
                        <Select
                            label="Shapes"
                            options={ [
                                {label : "Default", value : "11" },
                                {label : "Entrance", value : "12" },
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
                        <div className="modal-btns">
                            <Button color="secondary" size="lg" block onClick={e => shapeStore.onClickShapeClone() } >Duplicate Shape</Button>
                            <Button color="danger" size="lg" block onClick={e => { shapeStore.onClickShapeDelete() } }>Delete Shape</Button>
                        </div>
                    </ModalBody>
                    <ModalFooter className="d-flex">
                        <Button color="secondary" size="lg" className="w-50" onClick={e => { shapeStore.clearAddShapeModal() } }>Cancel</Button>
                        <Button color="primary" size="lg" className="w-50" onClick={e => { shapeStore.onClickEditShape() } }>Save</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}