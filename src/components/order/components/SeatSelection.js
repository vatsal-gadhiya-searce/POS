import React from 'react';
import Square from "../../common/Square";
import {observer} from 'mobx-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

@observer
export default class SeatSelection extends React.Component {

    render() {
        const {className, courseSelectionStore } = this.props;

        return (<React.Fragment>
                <div>
                    <Modal isOpen={courseSelectionStore.isSeatSelectionModal}
                           toggle={e => courseSelectionStore.onShowSeatSelectionModal()} centered
                           className="share-modal">
                        <ModalHeader toggle={e => courseSelectionStore.onShowSeatSelectionModal()}>Seat
                            Selection</ModalHeader>
                        <ModalBody>
                            <div className={"d-flex flex-wrap " + (className ? className : "")}>
                                {courseSelectionStore.seats.map((value) => {
                                    return (
                                        <Square key={value} value={value}
                                                onClick={e => courseSelectionStore.onClickSeat(value)}/>
                                    )
                                })}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" size="lg" block
                                    onClick={e => courseSelectionStore.onShowSeatSelectionModal()}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}