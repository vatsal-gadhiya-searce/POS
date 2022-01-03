import React from 'react';
import {observer} from 'mobx-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

@observer
export default class CourseFire extends React.Component {

    render() {
        const {courseFireStore} = this.props;
        return (
            <React.Fragment>
                <Modal isOpen={courseFireStore.isCourseFireModal} toggle={e => courseFireStore.onShowCourseFireModal()}
                       centered
                       className="share-modal">
                    <ModalHeader toggle={e => courseFireStore.onShowCourseFireModal()}>Fire</ModalHeader>
                    <ModalBody>
                        {courseFireStore.courses.map((value, key) => {
                            return <div className="menu-wrap" key={key}
                                        onClick={e => courseFireStore.onFireCourse(value)}>
                                <div className={"menu"}> Course {value} </div>
                            </div>
                        })}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" size="lg" block
                                onClick={e => courseFireStore.onShowCourseFireModal()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}