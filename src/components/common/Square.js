import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Square extends Component {

    render() {
        const {onClick, className, value } = this.props;

        return (
            <React.Fragment>
                <div className="square-wrap" onClick={onClick}>
                    <div className={"square " + (className ? className : "")}> { value }</div>
                </div>
            </React.Fragment>
        );
    }
}