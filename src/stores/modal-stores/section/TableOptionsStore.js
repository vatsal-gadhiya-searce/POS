import { observable } from 'mobx';
import {action} from "mobx";

export class TableOptionsStore {

    @observable isTableOptionsModal = false;
    @observable currentTable='';

    constructor(page){
        this.page=page;
    }

    @action
    showTableOptionsModal(tableId) {
        this.currentTable=this.page.floor.LayoutObjects.find((table)=> {
            return (table.Id===tableId ? table : '');
        });
        this.isTableOptionsModal = true;
    };

    @action
    clearTableOptionsModal() {
        this.isTableOptionsModal = false;
    }
}
