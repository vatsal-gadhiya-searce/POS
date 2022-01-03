import { observable } from 'mobx';
import {action} from "mobx";
import _ from "lodash";

export class TableStore {

    constructor(page) {
        this.page = page;
    }

    @observable isAddTableModal = false;
    @observable formData = {
        "TableName" : '',
        "seat" : '',
        "type" : 1
    };

    @action
    showAddTableModal = (type) => {
        if (type === 21) {
            this.page.lineStore.showAddLineModal();
        }
        else if (type < 3) {
            this.formData.type = type;
            this.isAddTableModal = true;
        }
        else {
            this.page.shapeStore.showAddShapeModal();
        }
    };

    @action
    onClickAddTable() {
        if(this.formData.TableName.toString().trim().length > 0) {
            let table = _.clone(this.page.table);
            table.Shape = this.formData.type;
            if (this.formData.type === 2) {
                table.Width = 100;
                table.Height = 100;
            }
            table.TableName = this.formData.TableName;
            table.Capacity = parseInt(this.formData.seat,10);
            table.Id = 0;
            table.PositionLeft = 10;
            table.PositionTop = 15;
            table.IdOperationType = 1;
            table.IdFloor= this.page.floor.Id;
            this.page.floor.LayoutObjects.push(table);
            this.page.floor = _.clone(this.page.floor);
        }
        this.clearAddTableModal();
    }

    @action
    clearAddTableModal() {
        this.isAddTableModal = false;
        this.formData = { "TableName" : '', "seat" : '', "type" : 1};
    }

    /**
     * Edit Table Modal
     */
    @observable isEditTableModal = false;
    @observable tableIndex = null;

    @action
    showEditTableModal = (table) => {
        this.tableIndex = this.page.floor.LayoutObjects.indexOf(table);
        this.formData.TableName = table.TableName;
        this.formData.seat = table.Capacity ? table.Capacity : 4;
        this.isEditTableModal = true;
    };

    @action
    onClickEditTableSave() {
        if(this.formData.TableName.toString().trim().length > 0) {
            let table = _.clone(this.page.floor.LayoutObjects[this.tableIndex]);
            table.TableName = this.formData.TableName;
            table.Capacity = parseInt(this.formData.seat,10);
            table.IdOperationType = 2;
            if(table.Id === 0){
                table.IdOperationType = 1;
            }
            this.page.floor.LayoutObjects[this.tableIndex] = table;
            this.page.floor = _.clone(this.page.floor);
        }
        this.clearEditTableModal();
    }

    @action
    onClickTableClone() {
        let table =  _.clone(this.page.floor.LayoutObjects[this.tableIndex]);
        table.Id = 0;
        table.TableName = this.formData.TableName
            ? this.formData.TableName
            : table.TableName;
        table.Capacity = (this.formData.seat) ? this.formData.seat : table.Capacity;
        table.PositionLeft = Math.round(Math.random() * 100);
        table.PositionTop = Math.round(Math.random() * 150);
        table.IdOperationType = 1;
        this.page.floor.LayoutObjects.push(table);
        this.page.floor = _.clone(this.page.floor);
        this.clearEditTableModal();
    }

    @action
    onClickTableDelete() {
        let table =  _.clone(this.page.floor.LayoutObjects[this.tableIndex]);
        table.IdOperationType = 3;
        this.page.floor.LayoutObjects[this.tableIndex] = table;
        this.page.floor = _.clone(this.page.floor);
        this.clearEditTableModal();
    }

    @action
    clearEditTableModal() {
        this.formData = { "TableName" : '', "seat" : ''};
        this.isEditTableModal = false;
        this.tableIndex = null;
    }

}