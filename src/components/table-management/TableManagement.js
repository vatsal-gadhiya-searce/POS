import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button} from 'reactstrap';
import TableLayout from "./components/TableLayout";
import BottomNavigation from "./components/BottomNavigation";
import ButtonNavigation from "../common/ButtonNavigation";
import AddSection from "./components/AddSection";
import EditSection from "./components/EditSection";
import AddTable from "./components/AddTable";
import AddShape from "./components/AddShape";
import EditTable from "./components/EditTable";
import AddLine from "./components/AddLine";
import DeleteLine from "./components/DeleteLine";
import EditShape from "./components/EditShape";

@observer
export default class TableManagement extends Component {

    render() {
        const {isLoading, floors, layoutManager: {tables}} = this.props.page;
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
                    <div className="d-flex justify-content-center p-3 button-wrap flex-shrink-0">
                        <ButtonNavigation
                            onChange={this.props.page.selectFloor}
                            buttons={floors}
                            buttonLabel="FloorName"
                            buttonValue="Id"
                            activeButton={this.props.page.floor}
                        >
                            <Button className="btn-add"
                                    onClick={this.props.page.sectionStore.showAddSectionModal}>+</Button>
                        </ButtonNavigation>
                        <div className="btn-table-edit mr-3">
                            <Button color="primary" onClick={e => {
                                this.props.page.sectionStore.showEditSectionModal()
                            }}>
                                <span className="icon-edit"/>
                            </Button>
                        </div>
                    </div>
                    <div className="flex-fill d-flex">
                        <TableLayout tables={tables} page={this.props.page}/>
                    </div>
                    <BottomNavigation page={this.props.page} className="table-btm-nav flex-shrink-0"/>
                    <AddSection page={this.props.page}/>
                    <EditSection page={this.props.page}/>
                    <AddTable page={this.props.page}/>
                    <EditTable page={this.props.page}/>
                    <AddShape page={this.props.page}/>
                    <EditShape page={this.props.page}/>
                    <AddLine page={this.props.page}/>
                    <DeleteLine page={this.props.page}/>
                </div>
            </React.Fragment>
        );
    }
}