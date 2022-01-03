import React, {Component} from 'react';
import {Rnd} from "react-rnd";

export default class Shape extends Component {
    render() {
        const {left, top, height, width, table, fontSize} = this.props.shape;
        const { resizeDragDropStore, shapeStore } = this.props.page;

        const borderRadius = table.Shape === 11 ? 5 : width / 2;

        const shapeStyle = {
            width,
            height: height,
            fontSize: fontSize,
            lineHeight: fontSize + 'px',
            borderRadius: borderRadius,
        };

        const shapeEditStyle = {
            fontSize: fontSize * 1.25
        };

        const shapeDragStyle = {
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
                    resizeDragDropStore.onShapeDragStopCall(table ,d);
                }}
                onResize={(e, direction, ref, delta, position) => {
                    resizeDragDropStore.onShapeResizeCall(table, ref, direction, position);
                }}
            >
                <div className="shape" style={shapeStyle} onClick={ e => { shapeStore.showEditShapeModal(table) } } >
                    <div className="shape-edit" style={shapeEditStyle} >
                        <span className="icon-edit" />
                    </div>
                    <div className="shape-drag" style={shapeDragStyle}>
                        <span/>
                    </div>
                    <div className="shape-center">
                        { table.Shape === 11 ? table.TableName : <span className="icon-restroom"/>}
                    </div>
                </div>
            </Rnd>
        );
    }
}