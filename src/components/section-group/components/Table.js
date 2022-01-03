import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Table extends Component {
    render() {
        const {table: {left, top, height, width, table, fontSize, bigFontSize}, status} = this.props;

        const borderRadius = table.Shape === 1 ? 5 : width / 2;
        let selected='';

        let index = this.props.page.selectedTables.indexOf(table.Id);

        if(index > -1){
            selected='selected';
        }

        let date = status && new Date(status.ActivationTime);
        const tableStyle = {
            left,
            top,
            width,
            position: "absolute",
            height: height,
            fontSize: fontSize,
            lineHeight: fontSize + 'px',
            borderRadius: borderRadius,
            border: 1,
            borderStyle: "solid",
            background: status && status.TableColoring.FillColor,
            color: status && status.TableColoring.TextColor,
            borderColor: status && status.TableColoring.OutlineColor,
        };

        const tableTopStyle = {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            backgroundColor: 'rgba(33,33,33,.3)'
        };

        const tableBottomStyle = {
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
            fontSize: '12px',
            fontStyle: 'bold',
        };

        const circlePadding = table.Shape === 2 ? width / 10 : null;

        const tableSection1Style = {
            fontSize: bigFontSize,
            fontWeight: 600,
            lineHeight: bigFontSize + 'px',
            paddingLeft: circlePadding,
            paddingTop: circlePadding,
        };

        const tableSection2Style = {
            fontSize: fontSize,
            lineHeight: fontSize + 'px',
            paddingRight: circlePadding,
            paddingTop: circlePadding,
        };

        return (
            <div className={ "tbl " + selected}  style={tableStyle}
                 onClick={ e => { this.props.page.onSelectTable(table.Id) }}>
                <div className="table-top" style={tableTopStyle}>
                    <div className="table-section1" style={tableSection1Style}>
                        {table.TableName}
                    </div>
                    <div className="table-section2" style={tableSection2Style}>
                        {status && status.SittingPersons} / {table.Capacity ? table.Capacity : 4}
                    </div>
                </div>
                <div className="table-bottom" style={tableBottomStyle}>
                    <div className="table-section3">
                        {date && (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())}:{date && (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())}
                        {date && (date.getHours() > 11 ? ' PM' : ' AM')}
                    </div>
                    <div className="table-section4">
                        -
                    </div>
                </div>
            </div>
        );
    }
}