import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, ButtonGroup, Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import Input from "../../common/form-fields/Input";
import NumericPad from "../../common/NumericPad";

@observer
export default class Discount extends Component {
    render() {
        const {
            discountStore, discountStore: {
                showDiscountModal,
                formData
            },
            settingStore
        } = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={showDiscountModal} toggle={e => discountStore.onClickToggleDiscountModal()} centered
                       className="modal-600 item-price-modal">
                    <ModalHeader toggle={e => discountStore.onClickToggleDiscountModal()}>Discount</ModalHeader>
                    <ModalBody>
                        <Row className="mb-30">
                            <Col sm="8">
                                <ButtonGroup className="mr-0 w-100">
                                    {
                                        discountStore.types.map(
                                            (type, key) => <Button
                                                color={(type === formData.type) ? "secondary" : "light"}
                                                key={key}
                                                onClick={(e) => discountStore.onChangeType(type)} block
                                                className="mt-0">
                                                {type}
                                            </Button>
                                        )
                                    }
                                </ButtonGroup>
                            </Col>
                            <Col sm="4">
                                <Input
                                    type="text"
                                    value={discountStore.discount}
                                    wrapperClass="item-price-field"
                                    disabled
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="8">
                                <NumericPad onClick={discountStore.onClickNumber}
                                            onClickClear={discountStore.onClickClear}
                                            className="item-price-calculator"/>
                            </Col>
                            <Col sm="4" className="d-flex flex-column justify-content-between">
                                <div className="item-price-actions">
                                    <p className="item-price-btw">
                                        Discount <span>{settingStore.applicationSettings.CurrencySign }{formData.amount || 0}</span>
                                    </p>
                                    <p className="item-price-btw">
                                        Before Discount <span>{settingStore.applicationSettings.CurrencySign }{discountStore.beforeDiscount}</span>
                                    </p>
                                    <p className="item-price-btw">
                                        After Discount <span>{settingStore.applicationSettings.CurrencySign }{discountStore.afterDiscount}</span>
                                    </p>
                                </div>
                                <div className="item-price-actions bottom">
                                    <Button color="secondary" block
                                            onClick={e => discountStore.onClearDiscount()}>Cancel</Button>
                                    <Button color="primary" block
                                            onClick={e => discountStore.onClickSaveDiscount()}>Apply</Button>
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}