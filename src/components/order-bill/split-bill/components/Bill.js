import React, {Component} from 'react';
import {observer} from 'mobx-react';
import * as _ from "lodash";
import SplitBillItem from "./SplitBillItem";

@observer
export default class Bill extends Component{

    render(){
        let { page, page: { rootStore : { settingStore }} , bill, bills} = this.props;

        return(
            <div className="col-4 col-lg-3 col-xxl-3 d-flex pr-2">
                <div className="bill-wrap flex-fill d-flex flex-column">

                    <div className="bill-label">
                        <span>{bill.name ? bill.name : "A"}</span>
                    </div>

                    <div className="bill-header">
                        <div className="bill-company d-flex align-items-center">
                            <div className="bill-company-logo">
                                <img src="http://via.placeholder.com/200x150" alt="logo"/>
                            </div>
                            <div className="bill-company-details">
                                <h3>The Blue Crane &amp; The Butterfly</h3>
                                <p className="mb-0">145 Dorpstreet<br/>Stellenbosch, 7600</p>
                            </div>
                        </div>
                    </div>

                    <div className="bill-table-meta-wrap d-flex justify-content-between flex-shrink-0">
                        <div className="bill-table-meta">
                            <span className="font-semi-bold">Table 1,2,5</span> #00100
                        </div>
                        <div className="bill-date-time">
                            10-10-15 &nbsp; <span className="font-semi-bold">12:00 PM</span>
                        </div>
                    </div>

                    <div className="bill-items flex-fill" onClick={() => page.selectSpitBill(bill.Id)}>
                        {
                            bill.Order.OrderedProducts ?
                                _.map(bill.Order.OrderedProducts, (item, key) => {
                                    return <SplitBillItem
                                        disabled={true}
                                        key={key}
                                        settingStore={settingStore}
                                        page={page}
                                        billItem={item}
                                    >
                                    </SplitBillItem>
                                })
                                : null
                        }
                    </div>

                    <div className="bill-total flex-shrink-0">
                        <table className="table table-sm">
                            <tbody>
                            <tr>
                                <td className="font-semi-bold pl-2 pb-1">Total</td>
                                <td className="font-semi-bold text-right text-nowrap pr-2 pb-1">{settingStore.applicationSettings.CurrencySign }23.00</td>
                            </tr>
                            <tr>
                                <td className="pl-2">VAT @ 6%</td>
                                <td className="text-right text-nowrap pr-2">{settingStore.applicationSettings.CurrencySign }1.38</td>
                            </tr>
                            <tr>
                                <td className="pl-2">VAT @ 21%</td>
                                <td className="text-right text-nowrap pr-2">{settingStore.applicationSettings.CurrencySign }4.83</td>
                            </tr>
                            <tr>
                                <td className="font-semi-bold pl-2 pt-2">Due</td>
                                <td className="font-semi-bold text-right text-nowrap pr-2 pt-2">{settingStore.applicationSettings.CurrencySign }23.00</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}