import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {getSumOfItems, getSumOfQuantity} from "../../../utils/helper";
import CombineSubItem from "./CombineSubItem";

@observer
export default class CombineItem extends Component {

    render() {
        let {item, combine, object, page: {productNoteStore, courseStore, rootStore: {settingStore}}} = this.props;
        return (
            <div className="order-item">
                <table className="table mb-0">
                    <thead>
                    <tr className={"order-item-main "}>
                        <td className="flag"><span className={"icon-link"}/></td>
                        <td className="order-quantity">{(combine.products && combine.products.length > 0) ? (getSumOfQuantity(combine.products, 'Quantity')) : 0}x</td>
                        <td>Combine product</td>
                        <td/>
                        <td className="text-right">{settingStore.applicationSettings.CurrencySign}{(combine.products && combine.products.length > 0) ? (getSumOfItems(combine.products, 'Price')).toFixed(2) : "0.00"}</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        combine.products ? combine.products.map((value, keys) => {
                            return (
                                <CombineSubItem object={object} courseStore={courseStore} productNoteStore={productNoteStore}
                                                settingStore={settingStore} item={value} key={keys} index={(combine.index + keys)}/>
                            )
                        }) : null
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}