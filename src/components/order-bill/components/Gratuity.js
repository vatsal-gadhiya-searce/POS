import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import Input from "../../common/form-fields/Input";
import NumericPad from "../../common/NumericPad";
import Switch from "react-switch";

@observer
export default class Gratuity extends Component {

    render() {
        const {gratuityStore, gratuityStore: {showGratuityModal, formData} , settingStore} = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={showGratuityModal} toggle={e => gratuityStore.onClickToggleGratuityModal()} centered
                       className="modal-600 item-price-modal">
                    <ModalHeader toggle={e => gratuityStore.onClickToggleGratuityModal()}>Gratuity</ModalHeader>
                    <ModalBody>
                        <Row className="mb-3">
                            <Col sm="8" className="d-flex align-items-center">
                                <label htmlFor="auto_gratuity" className="switch-label px-2">
                                    <Switch
                                        onChange={gratuityStore.handleChange}
                                        checked={formData.is_auto}
                                        id="auto_gratuity"
                                        onColor="#fff"
                                        offColor="#fff"
                                        onHandleColor="#0075b0"
                                        offHandleColor="#343c44"
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        width={60}
                                        height={30}
                                        handleDiameter={30}
                                    />
                                    <span>Set Auto gratuity</span>
                                </label>
                            </Col>
                            <Col sm="4">
                                <Input
                                    type="text"
                                    value={gratuityStore.gratuity}
                                    wrapperClass="item-price-field"
                                    disabled
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="8">
                                <NumericPad onClick={gratuityStore.onClickNumber}
                                            onClickClear={gratuityStore.onClickClear}
                                            className="item-price-calculator"/>
                            </Col>
                            <Col sm="4" className="d-flex flex-column justify-content-between">
                                <div className="item-price-actions">
                                    <p className="item-price-btw">
                                        Gratuity <span>{settingStore.applicationSettings.CurrencySign }{formData.amount || 0}</span>
                                    </p>
                                    <p className="item-price-btw">
                                        Before Gratuity <span>{settingStore.applicationSettings.CurrencySign }{gratuityStore.beforeGratuity}</span>
                                    </p>
                                    <p className="item-price-btw">
                                        After Gratuity <span>{settingStore.applicationSettings.CurrencySign }{gratuityStore.afterGratuity}</span>
                                    </p>
                                </div>
                                <div className="item-price-actions bottom">
                                    <Button color="secondary" block
                                            onClick={e => gratuityStore.onClearGratuity()}>Cancel</Button>
                                    <Button color="primary" block
                                            onClick={e => gratuityStore.onClickSaveGratuity(e)}>Apply</Button>
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}