import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, ButtonGroup, Col, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import Input from "../../common/form-fields/Input";
import NumericPad from "../../common/NumericPad";

@observer
export default class Tip extends Component {
    render() {
        const {
            tipStore, tipStore: {
                showTipModal,
                formData
            },
            settingStore
        } = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={showTipModal} toggle={e => tipStore.onClickToggleTipModal()} centered
                       className="modal-600 item-price-modal">
                    <ModalHeader toggle={e => tipStore.onClickToggleTipModal()}>Tip</ModalHeader>
                    <ModalBody>
                        <Row className="mb-30">
                            <Col sm="8">
                                <ButtonGroup className="mr-0 w-100">
                                    {
                                        tipStore.types.map(
                                            (type, key) => <Button
                                                color={(type === formData.type) ? "secondary" : "light"}
                                                key={key}
                                                onClick={(e) => tipStore.onChangeType(type)} block
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
                                    value={tipStore.tip}
                                    wrapperClass="item-price-field"
                                    disabled
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="8">
                                <NumericPad onClick={tipStore.onClickNumber} onClickClear={tipStore.onClickClear}
                                            className="item-price-calculator"/>
                            </Col>
                            <Col sm="4" className="d-flex flex-column justify-content-between">
                                <div className="item-price-actions">
                                    <p className="item-price-btw">
                                        Tip <span>{settingStore.applicationSettings.CurrencySign }{formData.amount || 0}</span>
                                    </p>
                                    <p className="item-price-btw">
                                        Before Tip <span>{settingStore.applicationSettings.CurrencySign }{tipStore.beforeTip}</span>
                                    </p>
                                    <p className="item-price-btw">
                                        After Tip <span>{settingStore.applicationSettings.CurrencySign }{tipStore.afterTip}</span>
                                    </p>
                                </div>
                                <div className="item-price-actions bottom">
                                    <Button color="secondary" block onClick={e => tipStore.onClearTip()}>Cancel</Button>
                                    <Button color="primary" block
                                            onClick={e => tipStore.onClickSaveTip(e)}>Apply</Button>
                                </div>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}