import React,{Component} from "react";
import {observer} from "mobx-react/index";
import BottomNavigation from "./components/BottomNavigation";
import TableLayout from "./components/TableLayout";
import ButtonNavigation from "../../common/ButtonNavigation";

@observer
export default class TransferBill extends Component {
    render() {
        const {isLoading, floors, layoutManager: {tables}} = this.props.page;

        if (isLoading) {
            return  (
                <div className="loader-wrap">
                    <div className="background-loader"/>
                </div>
            );
        }

        return (
            <div className="d-flex flex-column flex-fill">
                <div className="d-flex justify-content-center p-3 button-wrap flex-shrink-0">
                    <ButtonNavigation
                        onChange={this.props.page.selectFloor}
                        buttons={floors}
                        buttonLabel="FloorName"
                        buttonValue="Id"
                        activeButton={this.props.page.floor}
                    />
                </div>
                <div className="flex-fill d-flex">
                    <TableLayout tables={tables} page={this.props.page}/>
                </div>
                <BottomNavigation page={this.props.page} className="flex-shrink-0"/>
            </div>
        );
    }
}