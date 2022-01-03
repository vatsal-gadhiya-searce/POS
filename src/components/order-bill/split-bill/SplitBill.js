import React,{Component} from "react";
import {observer} from "mobx-react/index";
import BottomNavigation from "./components/BottomNavigation";
import SplitBillRightSide from "./components/SplitBillRightSide";
import SplitBillLeftSide from "./components/SplitBillLeftSide";

@observer
export default class SplitBill extends Component {
    render() {
        const {isLoading, bills} = this.props.page;

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
                    <SplitBillLeftSide page={this.props.page} isClickable={true}/>
                    <SplitBillRightSide page={this.props.page} bills={bills}/>
                </div>
                <BottomNavigation page={this.props.page} className="flex-shrink-0"/>
            </div>
        );
    }
}