import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Badge} from "reactstrap";


@observer
export default class CombineSubItem extends Component {

    render() {
        const {item, object, index, productNoteStore, settingStore, courseStore} = this.props;
        return (
            <React.Fragment>
                <tr className={"order-item-sub " + (productNoteStore.orderItem.Name && productNoteStore.orderItem.Name === item.Name ? "selected" : "")}>
                    <td className="flag"> {item.Note ?
                        <span className={"icon-note"}/> : null}</td>
                    <td className="order-quantity">{item.Quantity}x</td>
                    <td onClick={e => productNoteStore.onClickToggleNote(true, item, index)}>{item.Name}  </td>
                    <td className="order-item-type"> {item.CurrentCourse && item.CurrentCourse.Name ?
                        item.CurrentCourse.IsChangable ?
                            <Badge className="badge pointer"
                                   onClick={e => courseStore.onShowCourse(item)}>{item.CurrentCourse.Name} </Badge>
                            :
                            <Badge className="badge pointer">{item.CurrentCourse.Name} </Badge>

                        : null}</td>
                    <td className="order-item-price">{settingStore.applicationSettings.CurrencySign} { (item.Price && parseFloat(item.Price).toFixed(2)) || 0.00}</td>
                </tr>
                {
                    item.modifiers && item.modifiers.map((value, key) => {
                        return <tr className="order-item-sub" key={key}>
                            <td/>
                            <td/>
                            <td>{value.modifier.Title}: <span>{value.item && value.item.Name}</span></td>
                            <td/>
                            <td className="text-right"> {value.item && settingStore.applicationSettings.CurrencySign + value.item.Price}</td>
                        </tr>
                    })
                }
            </React.Fragment>
        );
    }
}