import React, {Component} from 'react';
import {observer} from 'mobx-react';
import OrderSubItem from "../OrderSubItem";
import {Badge} from "reactstrap";


@observer
export default class HoldOrderItem extends Component {

    renderIconTd = (item) => {
        const { page } = this.props;
        if (item.IsOnHold && !page.isHoldBtnClicked) {
            return <td className="flag"><span
                className={"icon-pin"}/></td>;
        } else if (!item.IsOnHold && page.isHoldBtnClicked) {
            return <td className="flag"><span
                className={"icon-pin hold"}/></td>;
        } else if (item.IsOnHold && page.isHoldBtnClicked) {
            return <td className="flag"><span
                className={"icon-pin hold active"}/></td>;
        } else if (item.Note) {
            return <td className="flag"><span className={"icon-note"}/></td>;
        }
        return null;
    };

    onClickItemHold = (item, index, type) =>{
        this.props.page.onClickSelectHold(item, index, type);
    };

    render() {
        const {
            index,
            object,
            item,
            page: {
                rootStore: {
                    settingStore
                }
            }
        } = this.props;

        return (
            <div className="order-item">
                <table className="table mb-0">
                    <thead>
                    <tr className={"order-item-main "} onClick={e => this.props.page.isHoldBtnClicked && this.onClickItemHold(item, index, 'hold')}>
                        {this.renderIconTd(item)}
                        <td className="order-quantity">{item.Quantity}x</td>
                        <td>{item.Name}  </td>
                        <td className="order-item-type"> {item.CurrentCourse && item.CurrentCourse.Name ?
                            <Badge className="badge pointer">{item.CurrentCourse.Name} </Badge>
                            : null}</td>
                        <td className="order-item-price">{settingStore.applicationSettings.CurrencySign} {parseFloat(item.Price) || 0.00} </td>
                    </tr>
                    </thead>
                    {
                        <tbody>
                        {
                            item.modifiers && item.modifiers.map((value, key) => {
                                return <OrderSubItem item={item} value={value} key={key}
                                                     currencySign={settingStore.applicationSettings.CurrencySign}/>
                            })
                        }
                        </tbody>
                    }
                </table>
            </div>
        );
    }
}