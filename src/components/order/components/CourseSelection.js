import React from 'react';
import Square from "../../common/Square";
import {observer} from 'mobx-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

@observer
export default class CourseSelection extends React.Component {

    render() {
        const {className, courseSelectionStore} = this.props;

        return (<React.Fragment>
                <div>
                    <Modal isOpen={courseSelectionStore.isCourseSelectionModal}
                           toggle={e => courseSelectionStore.onShowCourseSelectionModal()} centered
                           className="share-modal">
                        <ModalHeader toggle={e => courseSelectionStore.onShowCourseSelectionModal()}>Course
                            Selection</ModalHeader>
                        <ModalBody>
                            <div className={"d-flex flex-wrap " + (className ? className : "")}>
                                {courseSelectionStore.courses.map((value) => {
                                    return (
                                        <Square key={value} value={value}
                                                onClick={e => courseSelectionStore.onClickCourse(value)}/>
                                    )
                                })}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" size="md" block
                                    onClick={e => courseSelectionStore.onShowCourseSelectionModal()}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </React.Fragment>
        );
    }
}