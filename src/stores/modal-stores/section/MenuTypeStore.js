import { observable } from 'mobx';
import {action} from "mobx";

export class MenuTypeStore {

    @observable isMenuTypeModal = false;
    @observable menuTypes = ['A La Carte', 'All You Can Eat' , 'Take Away'];
    @observable selectedMenuType = 'A La Carte';
    @observable currentTable = {};

    constructor(page) {
        this.page = page;
    }

    @action
    showMenuTypeModal() {
        this.currentTable = this.page.selectedTable;
        this.isMenuTypeModal = true;
    };

    @action
    clearMenuTypeModal() {
        this.isMenuTypeModal = false;
        window.localStorage.removeItem('currentFloor');
    }

    @action
    onClickMenuType(menuType) {
        this.selectedMenuType = menuType;
    }
}