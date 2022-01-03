import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import {Button} from "reactstrap";
import Input from "../../common/form-fields/Input";
import NumericPad from "../../common/NumericPad";

@observer
export default class AddItemPrice extends Component {
    render() {
        const {
            customItemModalStore,
            customItemModalStore: {
                showCustomItemPrice,
                customItemFormData
            },
            settingStore
        } = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={showCustomItemPrice} toggle={customItemModalStore.clearCustomItem } centered
                       className="modal-600 item-price-modal">
                    <ModalHeader toggle={customItemModalStore.clearCustomItem}>Price</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col sm="8">
                                <Input
                                    type="text"
                                    value={customItemFormData.Price}
                                    onChange={ e => customItemModalStore.onChangeItemPrice(e.target.value)}
                                    wrapperClass="item-price-field"
                                    disabled
                                />
                            </Col>
                            <Col sm="4">
                                <p className="item-price-btw">
                                    BTW <span>{settingStore.applicationSettings.CurrencySign } {customItemFormData.btw}</span>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="8">
                                <NumericPad onClick={customItemModalStore.onClickNumber} onClickClear={customItemModalStore.onClickClear} className="item-price-calculator" />
                            </Col>
                            <Col sm="4" className="d-flex flex-column justify-content-between">
                                <div className="item-price-actions">
                                    <Button color="secondary" block className={customItemModalStore.selectedBTW === 0 ? 'selected' : ''}
                                            onClick={ e => customItemModalStore.onClickCalculateBTW(0) }>0%</Button>
                                    <Button color="secondary" block className={customItemModalStore.selectedBTW === 10 ? 'selected' : ''}
                                            onClick={ e => customItemModalStore.onClickCalculateBTW(10) }>10%</Button>
                                    <Button color="secondary" block className={customItemModalStore.selectedBTW === 20 ? 'selected' : ''}
                                            onClick={ e => customItemModalStore.onClickCalculateBTW(20) }>20%</Button>
                                </div>
                                <div className="item-price-actions bottom">
                                    <Button color="secondary" block onClick={customItemModalStore.clearCustomItem}>Cancel</Button>
                                    <Button color="primary" block onClick={customItemModalStore.onClickSaveCustomItemPrice}>Next</Button>
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}