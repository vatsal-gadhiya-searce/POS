import BasePage from "../../BasePage";
import {action, observable} from "mobx";
import RatioLayoutManager from "../../../utils/layoutManager/RatioLayoutManager";
import TransferBill from "../../../components/order-bill/transfer-bill/TransferBill";

export default class TransferBillPage extends BasePage{
    component= TransferBill;

    @observable floor = null;
    @observable floors = null;

    @observable isLoading = true;
    @observable isSettingsModalOpen = false;

    @observable floorWidth = 0;
    @observable floorHeight = 0;

    @observable currentTable = parseInt(this.params.tableId,10);
    @observable selectedTable = 0;
    
    layoutManager = null;

    @action
    load() {
        this.isLoading = true;
        this.layoutManager = new RatioLayoutManager(this.rootStore, this);

        this.rootStore.api.getLayout().then(this.setFloors);
    }

    @action
    setFloors = (floors) => {
        this.isLoading = false;
        this.floors = floors;
        this.floor = floors[0];
    };

    @action
    selectFloor = (floor) => {
        this.floor = floor;
    };

    @action
    onSelectTable(tableId){
        this.selectedTable = tableId;
    }

    @action
    onClickDone() {
        this.rootStore.routerStore.goTo('OrderBill', {tableId : this.params.tableId});
    }
}