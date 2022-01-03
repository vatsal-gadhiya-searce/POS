import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Shape extends Component {
    render() {
        const {status, shape:{left, top, height, width, table, fontSize}} = this.props;

        const borderRadius = table.Shape === 11 ? 5 : width / 2;

        const shapeStyle = {
            width,
            height: height,
            fontSize: fontSize,
            lineHeight: fontSize + 'px',
            borderRadius: borderRadius,
            left,
            top,
            border: 1,
            borderStyle: "solid",
            background: status && status.TableColoring.FillColor ,
            color: status && status.TableColoring.TextColor,
            borderColor : status && status.TableColoring.OutlineColor,
        };


        return (
            <div className="shape" style={shapeStyle}>
                <div className="shape-center">
                    { table.Shape === 11 ? table.TableName : <span className="icon-restroom"/>}
                </div>
            </div>
        );
    }
}