import React from "react";
import {Button} from "reactstrap";
import {observer} from 'mobx-react';

@observer
export default class LoginLeftSide extends React.Component{

    render(){
        const page=this.props.page;
        return(
            <div className="login-left d-flex flex-column justify-content-center">

                <div className="login-logo-box d-flex flex-column">
                    <div className="login-logo flex-fill d-flex flex-column justify-content-center">
                        <div className="logo-img mx-auto">
                            <img src="http://via.placeholder.com/200x250" alt="logo"/>
                        </div>
                    </div>
                    <div className="flex-shrink-0 login-left-actions d-flex">
                        <Button color="secondary" size="lg" onClick={e=>page.onClickCheckIn()} className="flex-fill">Check in</Button>
                        <Button color="secondary" size="lg" onClick={e=>page.onClickCheckOut()} className="flex-fill check-out">Out</Button>
                    </div>
                </div>

            </div>);
    }
}