import React from "react";
import {observer} from 'mobx-react';
import LoginLeftSide from "./components/LoginLeftSide";
import LoginRightSide from "./components/LoginRightSide";
import Message from "./components/Message";
import CheckOut from "./components/CheckOut";
import CheckedIn from "./components/CheckedIn";

@observer
export default class Login extends React.Component {

    render() {
        const {page,page: {checkIn, isSyncing, synced, checkOut, checkedOut}} = this.props;

        return (<React.Fragment>

            {checkIn || checkOut ? <Message page={page} from={'sync'} message={"Syncing"}/> : ''}
            {isSyncing ? <Message page={page} from={'sync success'} message={"Sync Successful"}/> : ''}
            {synced && checkIn ? <CheckedIn page={page}/> : ''}
            {synced && checkOut ? <CheckOut page={page}/> : ''}
            {checkedOut ? <Message page={page} from={'checked out'} message={"Check out  Successful"}/> : ''}

            {!checkedOut && !checkIn && !isSyncing && !synced && !checkOut ?

                    <div className="d-flex flex-column flex-fill">
                        <div className="d-flex flex-fill justify-content-center">
                            <LoginLeftSide page={page}/>
                            <LoginRightSide page={page}/>
                        </div>
                    </div>
                : null}
        </React.Fragment>);
    }
}