import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {Rnd} from "react-rnd";

@observer
export default class Table extends Component {
    render() {
        const {left, top, height, width, table, fontSize, bigFontSize} = this.props.table;
        const { resizeDragDropStore, tableStore } = this.props.page;

        const borderRadius = table.Shape === 1 ? 5 : width / 2;

        const tableStyle = {
            fontSize: fontSize,
            lineHeight: fontSize + 'px',
            borderRadius: borderRadius,
            boxShadow: '0 0 5px #222',
        };

        const tableTopStyle = {
            borderRadius: borderRadius,
        };

        const circlePadding = table.Shape === 2 ? width / 10 : null;

        const tableSection1Style = {
            fontSize: bigFontSize,
            fontWeight: 600,
            lineHeight: bigFontSize + 'px',
            paddingLeft: circlePadding,
        };

        const tableSection2Style = {
            fontSize: fontSize,
            lineHeight: fontSize + 'px',
            paddingRight: circlePadding,
        };

        const tableEditStyle = {
            fontSize: fontSize * 1.25
        };

        const tableDragStyle = {
            width: fontSize * 1.15,
            height: fontSize * 1.15
        };

        return (
            <Rnd
                bounds={".render-layout"}
                minWidth={50}
                minHeight={50}
                enableResizing = {{
                    bottom: true,
                    bottomRight: true,
                    bottomLeft: true,
                    left: true,
                    right: true,
                    top: true,
                    topRight: false,
                    topLeft: true
                }}
                size={{ width: width,  height: height }}
                position={{ x: left, y: top }}
                onDragStop={(e, d) => {
                    resizeDragDropStore.onDragStopCall(table ,d);
                }}
                onResize={(e, direction, ref, delta, position) => {
                    resizeDragDropStore.onResizeCall(table, ref, direction, position);
                }}
            >
                <div className="tbl" style={tableStyle}  >
                    <div className="table-edit" style={tableEditStyle} onClick={ e => { tableStore.showEditTableModal(table) }}>
                        <span className="icon-edit" />
                    </div>
                    <div className="table-drag" style={tableDragStyle}>
                        <span/>
                    </div>
                    <div className="table-top alt" style={tableTopStyle}>
                        <div className="table-section1" style={tableSection1Style}>
                            {table.TableName}
                        </div>
                        <div className="table-section2" style={tableSection2Style}>
                            0/ { table.Capacity ? table.Capacity : 4 }
                        </div>
                    </div>
                </div>
            </Rnd>
        );
    }
}