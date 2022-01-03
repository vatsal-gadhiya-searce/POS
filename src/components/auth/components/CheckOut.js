import React from 'react';
import {observer} from 'mobx-react';
import {Button} from "reactstrap";

@observer
export default class CheckOut extends React.Component {

    render() {
        const page=this.props.page;
        return(
            <div className="message-overlay">
                <div className="message-wrap">
                    <div className="message-user">
                        <img src="https://via.placeholder.com/80" alt="profile" className="img-fluid"/>
                    </div>
                    <div className="message-label">
                        {page.currentUser.name}, do you want to check out?
                    </div>
                    <div className="mt-5">
                        <Button color="secondary" size="lg" className="message-btn" onClick={e=>page.onCancel()}>Cancel</Button>
                        <Button color="primary" size="lg" className="message-btn" onClick={e=>page.onCheckOut()}>Check Out</Button>
                    </div>
                </div>
            </div>
        );
    }
}