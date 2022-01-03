import React, {Component} from 'react';

export default class Line extends Component {
    render() {
        const {status, line: {left, top, height, width}} = this.props;

        const lineStyle = {
            width,
            height: height + 8,
            top,
            left,
            background: status && status.TableColoring.FillColor ,
            color: status && status.TableColoring.TextColor,
        };

        const lineInnerStyle = {
            width,
            height: height,
        };

        return (
            <div className="line" style={lineStyle}>
                <div className="line-inner" style={lineInnerStyle}/>
            </div>
        );
    }
}