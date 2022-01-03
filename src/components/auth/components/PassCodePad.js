import React from 'react';
import Square from "../../common/Square";
import {observer} from 'mobx-react';

@observer
export default class PassCodePad extends React.Component {

    render() {
        const {className} = this.props;

        return (
                <div className={"d-flex flex-wrap " + (className ? className : "")}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
                        return (
                            <Square page={this.props.page} className="calc-key" key={value} value={value} onClick={ e => this.props.onClick(value)}/>
                        )
                    })}
                    <Square page={this.props.page} className="bigger" value="Clear" onClick={e => this.props.onClickClear()} />
                    <Square page={this.props.page} className="calc-key" value="0" onClick={e => this.props.onClick(0)} />
                    <Square page={this.props.page} className="primary bigger" value="Login" onClick={e => this.props.onClickLogin()} />
                </div>
        );
    }
}