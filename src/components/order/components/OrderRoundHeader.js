import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button} from 'reactstrap';

@observer
export default class OrderRoundHeader extends Component {

    render() {

        return (
            <div className="order-round-header row no-gutters">
                <div className="col order-round-label">Round</div>
                <div className="col flex-shrink-0 d-flex flex-row-reverse order-rounds">
                    <Button color="primary" className="order-round">1</Button>
                    <Button color="secondary" className="order-round">2</Button>
                    <Button color="secondary" className="order-round">3</Button>
                </div>
            </div>
        );
    }
}