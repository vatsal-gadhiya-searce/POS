import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Button} from "reactstrap";
import Input from "../../common/form-fields/Input";

@observer
export default class AddTable extends Component {
    render() {
        const { page: {
            tableStore,
            tableStore : { isAddTableModal, formData}
        } } = this.props;

        return (
            <div>
                <Modal isOpen={isAddTableModal} toggle={ e => { tableStore.clearAddTableModal() } } centered
                       className="share-modal">
                    <ModalHeader toggle={ e => { tableStore.clearAddTableModal() } }>Add Table</ModalHeader>
                    <ModalBody>
                        <Input
                            label="Table No."
                            value={formData.TableName}
                            onChange={ e => formData.TableName = e.target.value}
                        />

                        <Input
                            label="Max. Seats"
                            type="number"
                            value={formData.seat}
                            onChange={ e => formData.seat = e.target.value}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" size="lg" block onClick={e => { tableStore.onClickAddTable() } }>Add</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}