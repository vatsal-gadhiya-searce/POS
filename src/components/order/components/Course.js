import React from 'react';
import Square from "../../common/Square";
import {observer} from 'mobx-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

@observer
export default class Course extends React.Component {

    render() {
        const {className, courseStore} = this.props;

        return (
            <React.Fragment>
                <Modal isOpen={courseStore.showCourse}
                       toggle={e => courseStore.onClearCourse()} centered
                       className="share-modal">
                    <ModalHeader toggle={e => courseStore.onClearCourse()}>Course</ModalHeader>
                    <ModalBody>
                        <div className={"d-flex flex-wrap " + (className ? className : "")}>
                            {courseStore.availableCourses.map((value, key) => {
                                return (
                                    <Square key={key} value={value.Name}
                                            className={ value.Id === courseStore.selectedCourse.Id ? 'selected' : ''}
                                            onClick={e => courseStore.onSelectCourse(value)}/>
                                )
                            })}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" size="md" block
                                onClick={e => courseStore.onDone()}>Done</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}