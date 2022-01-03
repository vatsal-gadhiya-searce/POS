import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Select from "../../common/form-fields/Select";

@observer
export default class AddLine extends Component {
    render() {
        const {lineStore, lineStore: { isAddLineModal }} = this.props.page;

        return (
            <React.Fragment>
                <Modal isOpen={isAddLineModal} toggle={e => { lineStore.clearAddLineModal() }} centered
                       className="modal-400">
                    <ModalHeader toggle={e => { lineStore.clearAddLineModal() }}>Add Line</ModalHeader>
                    <ModalBody>
                        <Select
                            label="Line Type"
                            options={ [
                                {label : "Horizontal", value : "21" },
                                {label : "Vertical", value : "22" }
                            ]}
                            value={ lineStore.lineType }
                            onChange={ e => { lineStore.lineType = e.target.value }}
                        />
                    </ModalBody>
                    <ModalFooter className="d-flex">
                        <Button color="secondary" size="md" className="w-50" onClick={ e => { lineStore.clearAddLineModal() } } >Cancel</Button>
                        <Button color="primary" size="md" className="w-50" onClick={e => { lineStore.onClickAddLine() } }>Add</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}