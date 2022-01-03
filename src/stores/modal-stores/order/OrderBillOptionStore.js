import {observable, action} from 'mobx';

export class OrderBillOptionStore {

    @observable showBillOptions = false;

    constructor(page) {
        this.page = page;
    }

    @action
    onToggleBillOptions() {
        this.showBillOptions = !this.showBillOptions;
    }
}