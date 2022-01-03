import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {RouterLink} from 'mobx-state-router';

@observer
export default class SettingsModal extends Component {

    render() {
        const {page:{settingsStore}} = this.props;
        return (
            <div>
                <Modal isOpen={settingsStore.isSettingsModalOpen} toggle={settingsStore.toggleSettingsModal} centered
                       className="share-modal">
                    <ModalHeader toggle={settingsStore.toggleSettingsModal}>Settings</ModalHeader>
                    <ModalBody>
                        <RouterLink routeName="tableManagement" className="btn btn-primary btn-lg btn-block">
                            Table Management
                        </RouterLink>
                        <Button color="primary" size="lg" block>Reports</Button>
                        <Button color="primary" size="lg" block>Printers</Button>
                        <Button color="primary" size="lg" block>Staff</Button>
                        <Button color="primary" size="lg" block>Refresh Menu</Button>
                        <Button color="primary" size="lg" block>Backup Menu</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" size="lg" block onClick={settingsStore.toggleSettingsModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}