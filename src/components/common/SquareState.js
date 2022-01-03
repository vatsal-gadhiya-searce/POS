import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class SquareState extends Component {

    render() {
        const { onClick, parentClassName, className, value, children } = this.props;

        return (
            <div className={parentClassName} onClick={onClick}>
                <div className={className}>
                    { children ? children : value  }
                </div>
            </div>
        );
    }
}