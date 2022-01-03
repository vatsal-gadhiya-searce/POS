import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class SplitBillItem extends Component {
    render() {
        const {settingStore, billItem, page, disabled, onClick} = this.props;

        return (
            <React.Fragment>
                <div className={page.selectedBillItems.includes(billItem) ? " bill-item selected" : "bill-item"} disabled={disabled} onClick={onClick}>
                    <table className="table table-sm mb-0">
                        <thead>
                        <tr className="bill-item-main">
                            <td className="bill-quantity">1x</td>
                            <td>{billItem.Name ? billItem.Name : 'Product'}</td>
                            <td className="text-right">{settingStore.applicationSettings.CurrencySign}{billItem.Price ? billItem.Price  : 10}</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bill-item-sub">
                            <td/>
                            <td>Preparation: <span>Med-Rare</span></td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr className="blank">
                            <td/>
                            <td/>
                            <td/>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}