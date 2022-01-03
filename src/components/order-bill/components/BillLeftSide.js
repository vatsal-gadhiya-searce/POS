import React, {Component} from 'react';
import {observer} from 'mobx-react';
import _ from "lodash";
import {Button} from "reactstrap";
import BillItem from "./BillItem";

@observer
export default class BillLeftSide extends Component {

    onClickShowEditItem  = ( ) => {

    };

    render() {
        let { page, page: { rootStore : { settingStore }} } = this.props;
        return (
            <div className="col-5 col-lg-4 col-xxl-3 d-flex pr-2">
                <div className="bill-wrap flex-fill d-flex flex-column">

                    <div className="bill-label">
                        <span>A</span>
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
                            <span className="font-semi-bold">{page.currentTable.TableName}</span> #00100
                        </div>
                        <div className="bill-date-time">
                            10-10-15 &nbsp; <span className="font-semi-bold">12:00 PM</span>
                        </div>
                    </div>

                    <div className="bill-items flex-fill">
                        {
                            _.map(_.range(1, 10), (value) => {
                                return <BillItem onClick={e => { this.onClickShowEditItem()} } key={ value} settingStore={settingStore} > { value }</BillItem>
                            })
                        }
                    </div>

                    <div className="bill-total">
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

                    <div className="bill-footer flex-shrink-0 d-flex">
                        <Button color="secondary" size="lg" className="flex-grow-1" onClick={page.addGuestStore.showAddGuestModal}>Add</Button>
                        <Button color="secondary" size="lg" className="flex-grow-1">Split</Button>
                        <Button color="secondary" size="lg" className="flex-grow-1" onClick={page.onClickTransferBill}>Transfer</Button>
                    </div>

                </div>
            </div>
        );
    }
}