import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Bill from "./Bill";

@observer
export default class SplitBillRightSide extends Component {

    render() {
        let {page, bills} = this.props;

        return (
            <React.Fragment>
                {
                    bills.map((bill, key) => {
                        return <Bill page={page}  bills={bills} bill={bill} key={key} billId={key}/>
                    })
                }
            </React.Fragment>
        );
    }
}