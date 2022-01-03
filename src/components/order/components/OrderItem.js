import React, {Component} from 'react';
import {observer} from 'mobx-react';
import OrderSubItem from "./OrderSubItem";
import {Badge} from "reactstrap";


@observer
export default class OrderItem extends Component {

    renderIconTd = (item) => {
        const  { page } = this.props;
        if (!item.IsOnHold && page.isHoldBtnClicked) {
            return <td className="flag"><span
                className={"icon-pin hold"}/></td>;
        }
        if (item.IsOnHold && page.isHoldBtnClicked) {
            return <td className="flag"><span
                className={"icon-pin hold active"}/></td>;
        }
        if (item.Note) {
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
            item,
            object,
            page: {
                productNoteStore,
                courseStore,
                rootStore: {
                    settingStore
                }
            }
        } = this.props;

        return (
            <div className="order-item">
                <table className="table mb-0">
                    <thead>
                    <tr className={"order-item-main " + (productNoteStore.orderItem.Id && productNoteStore.orderItem.Id === item.Id ? "selected" : "")} onClick={ e => this.props.page.isHoldBtnClicked && this.onClickItemHold(item, index, 'normal')}>
                        {this.renderIconTd(item)}
                        <td className="order-quantity">{item.Quantity}x</td>
                        <td onClick={e => !this.props.page.isHoldBtnClicked && productNoteStore.onClickToggleNote(true, item, index)}>{item.Name}  </td>
                        <td className="order-item-type"> {item.CurrentCourse && item.CurrentCourse.Name ?
                            item.CurrentCourse.IsChangable ?
                                <Badge className="badge pointer"
                                       onClick={e => courseStore.onShowCourse(item)}>{item.CurrentCourse.Name} </Badge>
                                :
                                <Badge className="badge pointer">{item.CurrentCourse.Name} </Badge>

                            : null}</td>

                        <td className="order-item-price">{settingStore.applicationSettings.CurrencySign} {parseFloat(item.Price) || 0.00} </td>
                    </tr>
                    </thead>
                    {
                        <tbody>
                        {
                            item.ShowModifiers && item.ProductModifiers.map((value, key) => {
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