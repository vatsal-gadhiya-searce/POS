import React, {Component} from 'react';
import Textarea from "../../common/form-fields/Textarea";
import {observer} from 'mobx-react';
import {Button} from 'reactstrap';

@observer
export default class GeneralNote extends Component {
    render() {
        const page = this.props.page;
        return (
            <div className="flex-fill general-note mx-auto">
                <form>
                    <div className="d-flex justify-content-between align-items-center general-note-actions">
                        <Button color="danger" size="md" onClick={e=>page.onDeleteGeneralNote()}>
                            <span className="icon-trash"/>
                        </Button>
                        <Button color="primary" size="lg" className="px-4" onClick={e=>page.onShowGeneralNote()}>Done</Button>
                    </div>
                    <div>
                        <div className="general-note-input">
                            <Textarea
                                autoFocus={true}
                                value={page.generalNote}
                                onChange={e => (page.generalNote = e.target.value)}
                                rows={3}
                                readOnly={false}
                                required={true}
                                id="generalNote"
                            />
                            <span className="icon-note"/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}