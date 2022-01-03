import { observable } from 'mobx';
import {action} from "mobx";
import _ from "lodash";

export class SectionStore {

    @observable isAddSectionModal = false;
    @observable formData = {
        name : ''
    };

    constructor(page) {
        this.page = page;
    }

    @action
    showAddSectionModal = () => {
        this.isAddSectionModal = true;
    };

    @action
    onClickSectionSave() {
        if(this.formData.name.toString().trim().length > 0) {
            let floor = _.clone(this.page.floor);
            floor.Id = 0;
            floor.FloorName = this.formData.name;
            floor.LayoutObjects = [];
            floor.IdOperationType = 1;
            floor.DisplayOrder = this.page.floors.length + 1;
            this.page.floors.push(floor);
            this.page.selectFloor(floor);
        }
        this.clearAddSectionModal();
    }

    @action
    clearAddSectionModal() {
        this.formData = { name : '' };
        this.isAddSectionModal = false;
    }

    /**
     * Edit Section Modal
     */
    @observable isEditSectionModal = false;

    @action
    showEditSectionModal = () => {
        this.formData.name = this.page.floor.FloorName;
        this.isEditSectionModal = true;
    };

    @action
    onClickEditSectionSave() {
        if(this.formData.name.toString().trim().length > 0) {
            let floors = _.clone(this.page.floors);
            let floor = this.page.floor;
            let index = _.findIndex(floors, { 'Id' : floor.Id});
            this.page.floor.FloorName = this.formData.name;
            this.page.floor.IdOperationType = 2;
            if(this.page.floor.Id === 0){
                this.page.floor.IdOperationType = 1;
            }
            floors[index] = _.clone(this.page.floor);
            this.page.floors = floors;
        }
        this.clearEditSectionModal();
    }

    @action
    onClickSectionClone() {
        let floor = _.clone(this.page.floor);
        floor.Id = 0;
        floor.FloorName = (this.formData.name.toString().trim().length > 0)
            ? this.formData.name
            : floor.FloorName ;
        floor.IdOperationType = 1;
        floor.LayoutObjects = _.clone(floor.LayoutObjects);
        floor.DisplayOrder = this.page.floors.length + 1;
        this.page.floors.push(floor);
        this.page.selectFloor(floor);
        this.clearEditSectionModal();
    }

    @action
    onClickDeleteSection() {
        this.page.floor.IdOperationType = 3;
        this.page.selectFloor(this.page.floors[0]);
        this.clearEditSectionModal()
    }

    @action
    clearEditSectionModal() {
        this.formData = { name : '' };
        this.isEditSectionModal = false;
    }
}