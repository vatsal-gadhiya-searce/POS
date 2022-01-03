import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Badge, Button} from "reactstrap";

@observer
export default class OrderDetailHeader extends Component {

    render() {
        const {page: {orderObject,orderBillOptionStore}, table, totalGuest, currentDate, currentTime} = this.props;
        return (
            <div className="order-header flex-shrink-0">
                <div className="order-header-top">
                    <div className="d-flex justify-content-between">
                        <div>
                            {orderObject.AvailableTableSufixes ? orderObject.AvailableTableSufixes.map((value, key) => {
                                return <Badge onClick={e=> this.props.page.onClickSuffix(value)} color="primary" key={key}> {value}</Badge>
                            }) : null
                            }
                        </div>
                        <div>
                            <Button color="secondary" className="light">
                                <span className="icon-plus"/>
                            </Button>
                            <Button color="secondary" onClick={e => {orderBillOptionStore.onToggleBillOptions()}}>
                                <span className="icon-settings"/>
                            </Button>
                        </div>
                    </div>
                    <div className="order-meta d-flex justify-content-between">
                        <span><strong>Table {table.TableName}</strong> • {totalGuest}/{table.Capacity ? table.Capacity : 6} • #00100</span>
                        <span className="flex-shrink-0">{currentDate} • <strong> {currentTime}</strong></span>
                    </div>
                </div>
                <div className="order-header-btm">New Order</div>
            </div>
        );
    }
}