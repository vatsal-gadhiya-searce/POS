import React from "react";
import { Button } from "reactstrap";
import {getSumOfItems} from "../../../utils/helper";
import {observer} from "mobx-react";

@observer
export default class OrderDetailFooter extends React.Component {

    render() {
        const { page, settingStore } = this.props;
        const holdColor = page.isHoldBtnClicked ? "primary" : "secondary";
        return (
            <div className="order-footer flex-shrink-0">
                <div className="d-flex">
                    <Button color={holdColor} size="lg" className="btn-hold" onClick={ e => page.onHoldBtnClick(e)}>Hold</Button>
                    <Button color="primary" size="lg" className="btn-send" onClick={ e => page.onSendOrder(e)}>Send</Button>
                </div>
                <div className="order-due d-flex justify-content-between align-items-center">
                    <span className="w-25 text-center">Due</span>
                    <div className="due-amount w-75 text-right pr-2 pr-xl-3">
                        <span className="currency">{ settingStore.applicationSettings.CurrencySign }</span> {(page.orderObject.OrderedProducts && page.orderObject.OrderedProducts.length > 0) ? (getSumOfItems(page.orderObject.OrderedProducts, 'Price')).toFixed(2) : "0.00"}
                    </div>
                </div>
            </div>
        )
    }
}