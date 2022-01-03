import {observable, action} from 'mobx';
import _ from "lodash";

export class AddGuestStore {

    @observable isAddGuestModal = false;
    @observable currentTable = {};
    @observable guestFormData = _.range(1, 5);
    @observable selectedGuest = 1;
    @observable showManualGuestAdd = false;

    constructor(page) {
        this.page = page;
        this.currentTable = page.currentTable;
    }

    @action
    showAddGuestModal() {
        this.isAddGuestModal = true;
    };

    @action
    clearAddGuestModal() {
        this.isAddGuestModal = false;
        this.showManualGuestAdd=false;
        this.selectedGuest = 1;
    }

    @action
    onClickGuestNumber(guest) {
        this.selectedGuest = guest;
        this.page.totalGuest = guest;
    }

    @action
    showManualInputField() {
        this.showManualGuestAdd = !this.showManualGuestAdd;
    }

    @action
    onClickGuestOk() {
        this.isAddGuestModal = false;
        this.page.orderBillOptionStore.onToggleBillOptions()
    }
}