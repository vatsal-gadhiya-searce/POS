import {observable} from 'mobx';
import {action} from "mobx";
import _ from "lodash";

export class AddGuestStore {

    @observable isAddGuestModal = false;
    @observable currentTable = {};
    @observable guestFormData = _.range(1, 7);
    @observable selectedGuest = 1;
    @observable showManualGuestAdd = false;

    constructor(page) {
        this.page = page;
    }

    @action
    showAddGuestModal(tableId) {
        this.page.tableOptionsStore.isTableOptionsModal = false;
        if (tableId) {
            this.currentTable = this.page.floor.LayoutObjects.find((table) => {
                return (table.Id === tableId ? table : '');
            });
        }
        let currentTableSeats = this.currentTable.Capacity;
        if (currentTableSeats) {
            this.guestFormData = _.range(1, (currentTableSeats + 1))
        }
        this.isAddGuestModal = true;
        this.page.selectedTable = this.currentTable;
        window.localStorage.setItem('selectedGuest', this.selectedGuest);
        window.localStorage.setItem('currentFloor', JSON.stringify(this.page.floor));
    };

    @action
    clearAddGuestModal() {
        this.isAddGuestModal = false;
        this.showManualGuestAdd=false;
        this.selectedGuest = 1;
        window.localStorage.removeItem('currentFloor');
        window.localStorage.removeItem('selectedGuest');
    }

    @action
    onClickGuestNumber(guest) {
        this.selectedGuest = guest;
        window.localStorage.setItem('selectedGuest', guest);
    }

    @action
    showManualInputField() {
        this.showManualGuestAdd = !this.showManualGuestAdd;
    }

    @action
    onClickGuestOk() {
        this.isAddGuestModal = false;
        this.page.rootStore.routerStore.goTo('NewOrder', {"tableId" : (this.currentTable.Id) ? this.currentTable.Id.toString() : '3612'});

    }
}