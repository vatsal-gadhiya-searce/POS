import React from 'react';
import Square from "./Square";

export default class NumericPad extends React.Component {

    render() {
        const {className} = this.props;

        return (
            <React.Fragment>
                <div className={"d-flex flex-wrap " + (className ? className : "")}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
                        return (
                            <Square page={this.props.page} className="calc-key" key={value} value={value} onClick={ e => this.props.onClick(value)}/>
                        )
                    })}
                    <Square page={this.props.page} className="calc-key" value="." onClick={e => this.props.onClick('.')} />
                    <Square page={this.props.page} className="calc-key" value="0" onClick={e => this.props.onClick(0)} />
                    <Square page={this.props.page} className="calc-key" value="C" onClick={e => this.props.onClickClear()} />
                </div>
            </React.Fragment>
        );
    }
}