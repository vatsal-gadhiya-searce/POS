import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class TableStatus extends Component {

    statusArray = {
        "Non-active table": "available",
        "Active table": "active",
        "Drinks ordered": "drinks",
        "Bring new servet": "starters",
        "Between courses": "mains",
        "Dessert": "deserts",
        "Idle table (15 min not ordered)": "pending",
        "WaiterCall": "timeout",
        "Proforma printed": "billed",
        "Call Lize": "clear",
        "Transfer table": '',
        "Special Wishes": '',
    };

    render() {
        const {settingStore: {tableColoringLegend}} = this.props;

        return (
            <div className="table-status-sidebar">
                <div className="table-status-wrap">
                    {
                        tableColoringLegend.map((value, key) => {
                            return (
                            <div key={key} className={"table-status"} style={{
                                "backgroundColor": value.FillColor,
                                "borderColor": value.OutLineColor,
                                "color": value.TextColor,
                            }}>
                                <span className={"icon-status-"+this.statusArray[value.Description]} style={{"color": value.TextColor}} />
                                <span style={{ "color": value.TextColor}}>{value.Description}</span>
                            </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}