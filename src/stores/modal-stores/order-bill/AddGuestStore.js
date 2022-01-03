import {observable} from 'mobx';
import {action} from "mobx";
import _ from "lodash";

export class AddGuestStore {

    @observable isAddGuestModal = false;
    @observable currentTable = {};
    @observable guestFormData = _.range(1, 7);
    @observable selectedGuest = 1;
    @observable showManualGuestAdd = false;
    @observable map = new Map([['array' , []]]);

    constructor(page) {
        this.page = page;
        this.currentTable = page.currentTable;
    }

    @action
    showAddGuestModal = () => {
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
        let order = {};
        order.SittingPersons = this.selectedGuest;
        order.IdTable = parseInt(this.currentTable.Id,10);
        order.OperationType = 1;
        order.Note = '';
        order.CustomerName = null;
        this.page.rootStore.api.postOrder(order).then((response)=>
        {
            if(response){
                this.page.rootStore.routerStore.goTo('NewOrder', {"tableId" : (this.currentTable.Id) ? this.currentTable.Id.toString() : '3612' });
            }
        });
    }
}