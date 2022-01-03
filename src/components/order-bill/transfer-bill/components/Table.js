import React from 'react';
import {observer} from 'mobx-react';

@observer
export default class Table extends React.Component {
    render() {
        const {left, top, height, width, table, fontSize, bigFontSize} = this.props.table;

        const borderRadius = table.Shape === 1 ? 5 : width / 2;
        const tableStyle = {
            left,
            top,
            width,
            position: "absolute",
            height: height,
            fontSize: fontSize,
            lineHeight: fontSize + 'px',
            borderRadius: borderRadius,
            //boxShadow: '0 0 5px #222',
        };

        const tableTopStyle = {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
        };

        const tableBottomStyle = {
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
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
            <div className={ "tbl " + (this.props.page.currentTable === table.Id  || this.props.page.selectedTable === table.Id ? 'selected'  : '')}  style={tableStyle}
                 onClick={ e => { this.props.page.onSelectTable(table.Id) }}>
                <div className="table-top" style={tableTopStyle}>
                    <div className="table-section1" style={tableSection1Style}>
                        {table.TableName}
                    </div>
                    <div className="table-section2" style={tableSection2Style}>
                        0/4
                    </div>
                </div>
                <div className="table-bottom" style={tableBottomStyle}>
                    <div className="table-section3">
                        -
                    </div>
                    <div className="table-section4">
                        -
                    </div>
                </div>
            </div>
        );
    }
}