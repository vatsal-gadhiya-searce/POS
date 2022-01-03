import {observable, action} from 'mobx';
import SectionPlan from "../../components/section/SectionPlan";
import RatioLayoutManager from "../../utils/layoutManager/RatioLayoutManager";
import BasePage from "../BasePage";
import {AddGuestStore} from "../../stores/modal-stores/section/AddGuestStore";
import {MenuTypeStore} from "../../stores/modal-stores/section/MenuTypeStore";
import {TableOptionsStore} from "../../stores/modal-stores/section/TableOptionsStore";
import {SettingsStore} from "../../stores/modal-stores/section/SettingsStore";
import {checkIsValid,getCookie} from "../../utils/helper";
import  _ from 'lodash';

export default class SectionPlanPage extends BasePage {
    component = SectionPlan;

    @observable floor = null;
    @observable floors = null;

    @observable objectStatus = null;

    @observable isLoading = true;

    @observable floorWidth = 0;
    @observable floorHeight = 0;

    groupedTables = [];

    layoutManager = null;
    addGuestStore = null;
    menuTypeStore = null;
    tableOptionsStore = null;
    settingsStore = null;

    groupsFloor = null;
    selectedTable = null;

    @action
    load() {
        window.localStorage.removeItem('currentFloor');
        let groups = getCookie('selectedTableGroups');
        this.groupsFloor = checkIsValid(groups);
        this.settingsStore = new SettingsStore(this);
        this.addGuestStore = new AddGuestStore(this);
        this.menuTypeStore = new MenuTypeStore(this);
        this.tableOptionsStore = new TableOptionsStore(this);
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
        this.setGroups();
    };

    @action
    selectFloor = (floor) => {
        this.floor = floor;
        this.groupedTableIds = [];
        this.setGroups();
    };

    @action
    setGroups(){
        this.groupedTables = _.filter(this.groupsFloor, (value) => {
            return value.floorId === this.floor.Id;
        })
    }

    /*
    **HighLight group
    */

    @observable groupedTableIds = [];
    @observable groupTooltipOpen = false;

    @action
    onClickGroup(values) {
        this.groupedTableIds = values;
    }

    @action
    onToggleGroupTooltip() {
        this.groupTooltipOpen = !this.groupTooltipOpen;
    }
}