import {observable, action} from 'mobx';

export class DeleteBillStore {

    @observable showDeleteBill = false;

    constructor(page) {
        this.page = page;
    }

    @action
    onToggleDeleteBill() {
        this.showDeleteBill = !this.showDeleteBill;
    }
}