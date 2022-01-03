import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class Message extends React.Component {
    componentWillMount() {
        let timeOut = setTimeout(()=>{
            clearTimeout(timeOut);
            this.props.page.callbackAction(this.props.from);
        }, 3000);
    }

    render() {
        return(
            <div className="message-overlay d-flex">
                <div className="message-wrap">
                    <div className="message-icon">
                        <span className="icon-save"/>
                    </div>
                    <div className="message-label">
                        { this.props.message }
                    </div>
                </div>
            </div>
        );
    }
}