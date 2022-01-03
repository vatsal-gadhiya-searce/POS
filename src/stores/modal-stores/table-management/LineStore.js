import {observable} from 'mobx';
import {action} from "mobx";
import _ from "lodash";

export class LineStore {

    @observable isAddLineModal = false;
    @observable isDeleteLineModal = false;
    @observable lineIndex;
    @observable lineType = "21";

    constructor(page) {
        this.page = page;
    }

    @action
    showAddLineModal = () => {
        this.isAddLineModal = true;
    };

    @action
    onClickAddLine() {
        this.page.floor.LayoutObjects.push({
            Capacity:0,
            Id: 0,
            BlockTime : false,
            PositionLeft: 10,
            Width: (this.lineType === "21") ? 400 : 5,
            Height: (this.lineType === "22") ? 400 : 5,
            IdBillPrinter: null,
            IdFloor: this.page.floor.Id,
            Lock: false,
            PositionTop: 10,
            Shape: parseInt(this.lineType,10),
            TableName: null,
            Reserved: false,
            TemporaryName: null,
            IdOperationType: 1
        });
        this.page.selectFloor(_.clone(this.page.floor));
        this.clearAddLineModal();
    }

    @action
    clearAddLineModal() {
        this.isAddLineModal = false;
    }

    @action
    onClickLineModalShow(line) {
        this.lineIndex = this.page.floor.LayoutObjects.indexOf(line);
        this.isDeleteLineModal = true;
    }

    @action
    onClickLineDelete() {
        let line =  _.clone(this.page.floor.LayoutObjects[this.lineIndex]);
        line.IdOperationType = 3;
        this.page.floor.LayoutObjects[this.lineIndex] = line;
        this.page.floor = _.clone(this.page.floor);
        this.hideDeleteLineModal();
    }

    @action
    hideDeleteLineModal() {
        this.isDeleteLineModal = false;
    }
}