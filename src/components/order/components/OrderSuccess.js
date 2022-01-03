import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class OrderSuccess extends React.Component {

    render() {
        return(
            <div className="message-overlay d-none">
                <div className="message-wrap">
                    <div className="message-icon">
                        <span className="icon-save"/>
                    </div>
                    <div className="message-label">
                        Order Sent
                    </div>
                </div>
            </div>
        );
    }
}