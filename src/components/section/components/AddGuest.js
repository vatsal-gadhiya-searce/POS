import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Input from "../../common/form-fields/Input";

@observer
export default class AddGuest extends Component {
    render() {

        const {addGuestStore, addGuestStore: {isAddGuestModal, selectedGuest}} = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={isAddGuestModal} toggle={e => {
                    addGuestStore.clearAddGuestModal()
                }} centered
                       className="modal-400">
                    <ModalHeader toggle={e => {addGuestStore.clearAddGuestModal()}}>
                        Table {addGuestStore.currentTable.TableName} <span className="table-label ml-1">A</span>
                    </ModalHeader>
                    <ModalBody>
                        <h3 className="modal-subhead">Guests</h3>
                        {!addGuestStore.showManualGuestAdd ?
                            <React.Fragment>
                                <div className="guests">
                                    {addGuestStore.guestFormData.map((value, key) => {
                                        return (
                                            <div className="guest-wrap" key={key}
                                                 onClick={e => addGuestStore.onClickGuestNumber(value)}>
                                                <div className={"guest " + (selectedGuest === value ? "selected" : '')}>{value}</div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                                <div className="modal-btns">
                                    <Button color="secondary" size="lg" block onClick={e => addGuestStore.showManualInputField()}>Manual</Button>
                                </div>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <div className="mt-3">
                                    <Input type="text" name="guests" value={addGuestStore.selectedGuest}
                                           onChange={e => (addGuestStore.onClickGuestNumber(e.target.value))}
                                            autoFocus={true}/>
                                    <div className="modal-btns">
                                        <Button color="secondary" size="lg" block onClick={e => addGuestStore.showManualInputField()}>Select Value</Button>
                                    </div>
                                </div>
                            </React.Fragment>
                        }
                    </ModalBody>
                    <ModalFooter className="d-flex">
                        <Button color="primary" size="md" className="w-100" onClick={e => addGuestStore.onClickGuestOk()}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}