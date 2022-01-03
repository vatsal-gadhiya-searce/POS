import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class OrderListHeader extends Component {

    render() {

        return (
            <div className="order-list-header row no-gutters">
                <div className="col order-seat">
                    Seat 1
                </div>
                <div className="col order-course">
                    Course 1
                </div>
                <div className="col flex-shrink-0 order-list-header-icon">
                    <span className="icon-fire"/>
                </div>
            </div>
        );
    }
}