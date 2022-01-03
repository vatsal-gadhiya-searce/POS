import BasePage from "../BasePage";
import SelectCombineTables from "../../components/section-group/SelectCombineTables";
import {action, observable} from "mobx";
import RatioLayoutManager from "../../utils/layoutManager/RatioLayoutManager";
import {checkIsValid,getCookie, setCookie} from "../../utils/helper";
import _ from 'lodash';

export default class SelectCombineTablesPage extends BasePage{
    component= SelectCombineTables;

    @observable floor = null;
    @observable floors = null;
    @observable objectStatus = null;

    @observable isLoading = true;
    @observable isSettingsModalOpen = false;

    @observable floorWidth = 0;
    @observable floorHeight = 0;

    layoutManager = null;

    @action
    load() {
        this.isLoading = true;
        this.layoutManager = new RatioLayoutManager(this.rootStore, this);

        this.rootStore.api.getLayout().then(response => {
            this.rootStore.api.getObjectStatus().then(status => this.setFloors(response, status));
        });
    }

    @action
    setFloors = (floors, ObjectStatus) => {
        this.isLoading = false;
        this.floors = floors;
        this.floor = floors[0];
        this.objectStatus = ObjectStatus;
    };

    @action
    selectFloor = (floor) => {
        this.floor = floor;
    };

    @observable selectedTables = [];

    @action
    onSelectTable(tableId){
        let index = this.selectedTables.indexOf(tableId);
        if(index > -1) {
            this.selectedTables.splice(index, 1);
        } else {
            this.selectedTables.push(tableId);
        }
    }

    @action
    onClickDone() {
        let groups = [];
        let availableGroups = getCookie('selectedTableGroups');
        if(availableGroups) {
            groups = checkIsValid(availableGroups);
        }

        this.selectedTables.map((selectedTable) => {
            let index = this.floor.LayoutObjects.findIndex((table) => table.Id === selectedTable);
            if(index <= -1){
                this.selectedTables = [];
            }
        });

        if(this.selectedTables.length > 0){
            let index = _.findIndex(groups, {groups : this.selectedTables , floorId: this.floor.Id});
            if(index <= -1){
                groups.push({ 'groups' : this.selectedTables, floorId : this.floor.Id });
                setCookie('selectedTableGroups', JSON.stringify(groups), 1);
            }
        }
        this.rootStore.routerStore.goTo('sectionPlan', {});

    }
}