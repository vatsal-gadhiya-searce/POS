import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Square from "../../common/Square";

@observer
export default class PaymentType extends Component {
    onClickPayment = (v) => {
        console.log("Called");
    };

    render() {
        return (
            <React.Fragment>
                <div className="payment-types">
                    <Square page={this.props.page} value="Cash" className="selected" onClick={ e => this.onClickPayment("cash")}/>
                    <Square page={this.props.page} value="Card" onClick={ e => this.onClickPayment("cash")}/>
                    <Square page={this.props.page} value="Credit" onClick={ e => this.onClickPayment("cash")}/>
                    <Square page={this.props.page} value="Gift" onClick={ e => this.onClickPayment("cash")}/>
                    <Square page={this.props.page} value="Pin" onClick={ e => this.onClickPayment("cash")}/>
                </div>
            </React.Fragment>
        );
    }
}