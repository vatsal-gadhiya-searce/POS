import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Order from "./Order";
import OrderDetailHeader from "./OrderDetailHeader";
import OrderDetailFooter from "./OrderDetailFooter";

@observer
export default class OrderDetail extends Component {

    render() {
        let {page, page: { rootStore : { settingStore }}} = this.props;
        return (
            <div className="col-5 col-lg-4 d-flex">
                <div className="order-form-wrap flex-fill d-flex flex-column">
                    <OrderDetailHeader page={page} floor={page.floor} table={page.currentTable} totalGuest={page.totalGuest}
                                       currentDate={page.currentDate} currentTime={page.currentTime}/>
                    <Order page={page}/>
                    <OrderDetailFooter settingStore={settingStore} page={page}/>
                </div>
            </div>
        );
    }
}