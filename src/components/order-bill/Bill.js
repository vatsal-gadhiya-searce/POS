import React, {Component} from 'react';
import {observer} from 'mobx-react';
import BillLeftSide from "./components/BillLeftSide";
import BillRightSide from "./components/BillRightSide";
import BottomNavigation from "./components/BottomNavigation";
import AddGuest from "../section/components/AddGuest";

@observer
export default class Bill extends Component {

    render() {
        const {isLoading, addGuestStore} = this.props.page;

        if (isLoading) {
            return  (
                <div className="loader-wrap">
                    <div className="background-loader"/>
                </div>
            );
        }

        return (
            <div className="d-flex flex-column flex-fill">
                <div className="flex-fill row">
                    <BillLeftSide page={this.props.page}/>
                    <BillRightSide page={this.props.page}/>
                </div>
                <BottomNavigation page={this.props.page} className="flex-shrink-0"/>
                <AddGuest addGuestStore={addGuestStore}/>
            </div>
        );
    }
}