import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class OrderItem extends Component {

    render() {
        const {settingStore} = this.props;
        return (
            <React.Fragment>
                <div className="bill-item">{/*optional class - selected*/}
                    <table className="table table-sm mb-0">
                        <thead>
                        <tr className="bill-item-main">
                            <td className="bill-quantity">1x</td>
                            <td>Product</td>
                            <td className="text-right">{settingStore.applicationSettings.CurrencySign}10.00</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bill-item-sub">
                            <td/>
                            <td>Preparation: <span>Med-Rare</span></td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr className="bill-item-sub">
                            <td/>
                            <td>Sides: <span>Fries</span></td>
                            <td className="text-right">-</td>
                        </tr>
                        <tr className="bill-item-sub">
                            <td/>
                            <td>Salads: <span>Balsamic</span></td>
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