import React, {Component} from 'react';
import {Rnd} from "react-rnd";

export default class Line extends Component {
    render() {
        const {left, top, height, width, table} = this.props.line;
        const {resizeDragDropStore, lineStore} = this.props.page;

        const lineStyle = {
            width,
            height: height + 8,
        };

        const lineInnerStyle = {
            width,
            height: height,
        };

        const lineRightDragStyle = {
            top: table.Shape === 22 ? "100%" : '50%',
            right: table.Shape === 22 ? "-6px" : '-8px',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,.3)',
        };

        const lineLeftDragStyle = {
            top: table.Shape === 22 ? "0%" : '50%',
            left: table.Shape === 22 ? "-6px" : '-8px',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,.3)',
        };

        return (
            <Rnd
                bounds={".render-layout"}
                minWidth={5}
                minHeight={5}
                enableResizing={{
                    bottom: false,
                    bottomRight: true,
                    bottomLeft: true,
                    left: false,
                    right: false,
                    top: false,
                    topRight: true,
                    topLeft: true
                }}
                size={{width: width, height: height}}
                position={{x: left, y: top}}
                onDragStop={(e, d) => {
                    resizeDragDropStore.onLineDragStopCall(table, d);
                }}
                onResize={(e, direction, ref, delta, position) => {
                    resizeDragDropStore.onLineResizeCall(table, ref, direction, position);
                }}
            >
                <div className="line" style={lineStyle} onClick={e => lineStore.onClickLineModalShow(table)}>
                    <div className="line-drag left" style={lineLeftDragStyle}/>
                    <div className="line-drag right" style={lineRightDragStyle}/>
                    <div className="line-inner" style={lineInnerStyle}/>
                </div>
            </Rnd>
        );
    }
}