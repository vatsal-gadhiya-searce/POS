import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class OrderSubItem extends Component {

    render() {
        const {item, value, currencySign} = this.props;
        return (
            <tr className="order-item-sub">
                {item.noteIcon ? <td/> : null}
                <td/>
                <td>{value.modifier.Title}: <span>{value.item && value.item.Name}</span></td>
                <td/>
                <td className="order-item-price"> { value.item && currencySign + value.item.Price }</td>
            </tr>
        );
    }
}