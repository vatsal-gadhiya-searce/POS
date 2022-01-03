import React, {Component} from 'react';
import {observer} from 'mobx-react';
import TableStatus from "./components/TableStatus";
import BottomNavigation from "./components/BottomNavigation";
import TableLayout from "./components/TableLayout";
import SettingsModal from "./components/SettingsModal";
import ButtonNavigation from "../common/ButtonNavigation";
import AddGuest from "./components/AddGuest";
import TableOptions from "./components/TableOptions";
import MenuType from "./components/MenuType";
import TableGroups from "./components/TableGroups";

@observer
export default class SectionPlan extends Component {
    render() {
        const {isLoading, floors, groupedTables, layoutManager: {tables}} = this.props.page;

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
                        <div className="search-wrap">
                            <button className="btn btn-secondary rounded-circle">
                                <span className="icon-search"/>
                            </button>
                        </div>
                        <div className="user-wrap">
                            <div className="user-profile">
                                {/* If image
                                    <img src="http://via.placeholder.com/100/fff/ddd" alt="user profile" className="rounded-circle"/>
                                    else
                                */}
                                <span className="icon-user rounded-circle"/>
                            </div>
                        </div>
                        <ButtonNavigation
                            onChange={this.props.page.selectFloor}
                            buttons={floors}
                            buttonLabel="FloorName"
                            buttonValue="Id"
                            activeButton={this.props.page.floor}
                        />
                    </div>
                    <div className="flex-fill d-flex">
                        <div className="table-groups">
                            {
                                groupedTables && groupedTables.length ?
                                    <TableGroups page={this.props.page}/>
                                    : null
                            }
                        </div>
                        <TableLayout tables={tables}  page={this.props.page}/>
                        <TableStatus className="flex-shrink-0" settingStore={this.props.page.rootStore.settingStore}/>
                    </div>
                    <BottomNavigation page={this.props.page} className="flex-shrink-0"/>
                </div>
                <div className="search-modal d-flex flex-column flex-fill">
                    <div className="search-result-wrap mx-auto">
                        <div className="search-bar d-flex">
                            <div className="input-group flex-fill mr-2">
                                <div className="input-group-prepend">
                                    <span className="input-group-text icon-search"/>
                                </div>
                                <input type="text" className="form-control"/>
                            </div>
                            <button className="btn btn-primary">Done</button>
                        </div>
                        <h4 className="search-title">Results</h4>
                        <div className="search-results">

                        </div>
                    </div>
                </div>
                <SettingsModal page={this.props.page}/>

                <AddGuest addGuestStore={this.props.page.addGuestStore}/>
                <MenuType page={this.props.page}/>
                <TableOptions page={this.props.page}/>
            </React.Fragment>
        );

    }

}