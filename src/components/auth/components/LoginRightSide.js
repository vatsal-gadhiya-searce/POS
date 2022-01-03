import React from "react";
import PassCodePad from "./PassCodePad";
import {observer} from 'mobx-react';
import PassCodeInput from "./PassCodeInput";

@observer
export default class LoginRightSide extends React.Component {

    render() {
        const page=this.props.page;

        return (
            <div className="login-right d-flex flex-column justify-content-center">
                <div className="calculator d-flex flex-column mx-auto py-0">
                    <div className="calc-pass flex-fill">
                        <PassCodeInput className="justify-content-center" page={this.props.page}/>
                    </div>
                    <div className="calc-keys d-flex flex-wrap flex-shrink-0 pb-0">
                        <PassCodePad className="calc-col main" onClick={page.onClickNumber}
                                     onClickClear={page.onClickClear} onClickLogin={page.onClickLogin}/>
                    </div>
                </div>
            </div>
        );
    }
}