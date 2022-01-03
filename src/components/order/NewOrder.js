import React, {Component} from 'react';
import {observer} from 'mobx-react';
import BottomNavigation from "./components/BottomNavigation";
import Menu from "./components/Menu";
import AddItemLabel from "./components/AddItemLabel";
import AddItemQty from "./components/AddItemQty";
import AddItemPrice from "./components/AddItemPrice";
import SeatSelection from "./components/SeatSelection";
import CourseSelection from "./components/CourseSelection";
import OrderSuccess from "./components/OrderSuccess";
import OrderDetail from "./components/OrderDetail";
import CourseFire from "./components/CourseFire";
import OrderBillOptions from "./components/OrderBillOptions";
import AddGuest from "../section/components/AddGuest";
import DeleteBill from "./components/DeleteBill";
import Course from "./components/Course";

@observer
export default class NewOrder extends Component {

    render() {
        const {
            isLoading, courseSelectionStore,
            orderBillOptionStore,
            courseFireStore,
            customItemModalStore,
            addGuestStore,
            deleteBillStore,
            courseStore,
            rootStore: {settingStore}
        } = this.props.page;

        if (isLoading) {
            return (
                <div className="loader-wrap">
                    <div className="background-loader"/>
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className="d-flex flex-column flex-fill">
                    <div className="flex-fill row">
                        <OrderDetail page={this.props.page}/>
                        <Menu page={this.props.page}/>
                    </div>
                    <BottomNavigation page={this.props.page} className="flex-shrink-0"/>
                </div>
                <OrderSuccess page={this.props.page}/>
                <AddItemLabel customItemModalStore={customItemModalStore}/>
                <AddItemPrice customItemModalStore={customItemModalStore} settingStore={settingStore}/>
                <AddItemQty customItemModalStore={customItemModalStore}/>
                <SeatSelection courseSelectionStore={courseSelectionStore} className="seat-selection-wrap"/>
                <CourseSelection courseSelectionStore={courseSelectionStore} className="course-selection-wrap"/>
                <CourseFire courseFireStore={courseFireStore}/>
                <OrderBillOptions orderBillOptionStore={orderBillOptionStore} addGuestStore={addGuestStore}
                                  deleteBillStore={deleteBillStore}/>
                <AddGuest addGuestStore={addGuestStore}/>
                <DeleteBill deleteBillStore={deleteBillStore}/>
                <Course courseStore={courseStore} className="course-selection-wrap"/>
            </React.Fragment>
        );
    }
}