import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Square from "../../common/Square";
import PaymentType from "./PaymentType";
import {InputGroup, InputGroupAddon, Input} from 'reactstrap';
import NumericPad from "../../common/NumericPad";
import Tip from "./Tip";
import Discount from "./Discount";
import Gratuity from "./Gratuity";

@observer
export default class BillRightSide extends Component {
    onClickPayment = (v) => {
        console.log("Called");
    };

    render() {

        const {page, page: {tipStore, discountStore, gratuityStore, rootStore: {settingStore}}} = this.props;

        return (
            <div className="col-7 col-lg-8 col-xxl-9 d-flex pl-2">
                <div className="calculator flex-fill d-flex flex-column mx-auto">
                    <div className="calc-header d-flex mx-auto flex-shrink-0">
                        <InputGroup className="flex-fill mr-2">
                            <Input value={settingStore.applicationSettings.CurrencySign + "23"} disabled/>
                            <InputGroupAddon addonType="append">{settingStore.applicationSettings.CurrencySign} 0.00</InputGroupAddon>
                        </InputGroup>
                        <div className="calc-value">{settingStore.applicationSettings.CurrencySign} 0.00</div>
                    </div>
                    <div className="calc-status row no-gutters">
                        <div className="col px-2">
                            Discount <strong>{page.discountData.percentage}%</strong><br/>
                            <strong>{page.discountData.amount ? page.discountData.amount : '-'} </strong>
                        </div>
                        <div className="col px-2">
                            Tip <strong>{page.tipData.percentage}%</strong><br/>
                            <strong>{page.tipData.amount ? page.tipData.amount : '-'} </strong>
                        </div>
                        <div className="col px-2">
                            Gratuity <strong>{page.gratuity.percentage}%</strong><br/>
                            <strong>{page.gratuity.amount ? page.gratuity.amount : '-'} </strong>
                        </div>
                        <div className="col px-2"/>
                        <div className="col px-2"/>
                    </div>

                    <PaymentType page={this.props.page}/>

                    <div className="calc-keys d-flex flex-wrap">
                        <div className="calc-col">
                            <Square page={this.props.page} value={settingStore.applicationSettings.CurrencySign + "10"}
                                    className="secondary bigger" onClick={e => this.onClickPayment("cash")}/>
                            <Square page={this.props.page} value={settingStore.applicationSettings.CurrencySign + "20"}
                                    className="secondary bigger" onClick={e => this.onClickPayment("cash")}/>
                            <Square page={this.props.page} value={settingStore.applicationSettings.CurrencySign + "50"}
                                    className="secondary bigger" onClick={e => this.onClickPayment("cash")}/>
                            <Square page={this.props.page} value={settingStore.applicationSettings.CurrencySign + "100"}
                                    className="secondary bigger" onClick={e => this.onClickPayment("cash")}/>
                        </div>

                        <NumericPad className="calc-col main" onClick={this.onClickPayment}
                                    onClickClear={this.onClickPayment}/>

                        <div className="calc-col flex-wrap">
                            <Square page={this.props.page} value="Discount" className="secondary"
                                    onClick={e => discountStore.onClickToggleDiscountModal()}/>
                            <Square page={this.props.page} value="Tip" className="secondary"
                                    onClick={e => tipStore.onClickToggleTipModal()}/>
                            <Square page={this.props.page} value="Gratuity" className="secondary"
                                    onClick={e => gratuityStore.onClickToggleGratuityModal()}/>
                            <Square page={this.props.page} value="Done" className="primary bigger"
                                    onClick={e => this.onClickPayment("cash")}/>
                        </div>
                    </div>
                    <Tip tipStore={tipStore} settingStore={settingStore}/>
                    <Discount discountStore={discountStore} settingStore={settingStore}/>
                    <Gratuity gratuityStore={gratuityStore} settingStore={settingStore}/>
                </div>
            </div>
        );
    }
}