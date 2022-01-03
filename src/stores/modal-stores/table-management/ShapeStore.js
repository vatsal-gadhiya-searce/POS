import { observable } from 'mobx';
import {action} from "mobx";
import _ from "lodash";

export class ShapeStore {

    @observable isAddShapeModal = false;
    @observable isEditShapeModal = false;
    @observable shapeIndex = null;
    @observable shapeModalFormData = {
        'shape' : "11",
        'name' : '',
    };

    constructor(page) {
        this.page = page;
    }

    @action
    showAddShapeModal = () => {
        this.isAddShapeModal = true;
    };

    @action
    onClickAddShape() {
        if(this.shapeModalFormData.name.toString().trim().length > 0
            || this.shapeModalFormData.shape !== "11") {
            let shape  = _.clone(this.page.table);
            if(this.shapeModalFormData.shape !== "11") {
                this.shapeModalFormData.name = null;
            }
            shape.TableName = this.shapeModalFormData.name;
            shape.Shape = parseInt(this.shapeModalFormData.shape,10);
            shape.Id = 0;
            shape.PositionLeft = 10;
            shape.PositionTop = 10;
            shape.IdOperationType = 1;
            shape.IdFloor= this.page.floor.Id;
            this.page.floor.LayoutObjects.push(shape);
            this.page.selectFloor(_.clone(this.page.floor));
        }
        this.clearAddShapeModal();
    }

    @action
    showEditShapeModal = (shapes) => {
        this.shapeIndex = _.findIndex(this.page.floor.LayoutObjects, shapes);
        this.shapeModalFormData.name = shapes.TableName;
        this.shapeModalFormData.shape = (shapes.Shape) ? shapes.Shape.toString() : "11";
        this.isEditShapeModal = true;
    };

    @action
    onClickEditShape() {
        if(this.shapeModalFormData.name.toString().trim().length > 0
            || this.shapeModalFormData.shape !== "11") {
            let shape = _.clone(this.page.floor.LayoutObjects[this.shapeIndex]);
            if (this.shapeModalFormData.shape !== "11") {
                this.shapeModalFormData.name = '';
                shape.TableName = null;
            }
            shape.TableName = this.shapeModalFormData.name;
            shape.Shape = parseInt(this.shapeModalFormData.shape,10);
            shape.IdOperationType = 2;
            if(shape.Id === 0){
                shape.IdOperationType = 1;
            }
            this.page.floor.LayoutObjects[this.shapeIndex] = shape;
            this.page.floor = _.clone(this.page.floor);
        }
        this.clearAddShapeModal();
    }

    @action
    onClickShapeClone() {
        let shape =  _.clone(this.page.floor.LayoutObjects[this.shapeIndex]);
        if(this.shapeModalFormData.shape !== "11") {
            this.shapeModalFormData.name = null;
        }
        shape.TableName = (this.shapeModalFormData.name) ? this.shapeModalFormData.name : shape.TableName;
        shape.Shape = parseInt(this.shapeModalFormData.shape,10);
        shape.Id = 0;
        shape.PositionLeft = 10;
        shape.PositionTop= 10;
        shape.IdOperationType = 1;
        this.page.floor.LayoutObjects.push(shape);
        this.page.floor = _.clone(this.page.floor);
        this.clearAddShapeModal();
    }

    @action
    onClickShapeDelete() {
        let shape =  _.clone(this.page.floor.LayoutObjects[this.shapeIndex]);
        shape.IdOperationType = 3;
        this.page.floor.LayoutObjects[this.shapeIndex] = shape;
        this.page.floor = _.clone(this.page.floor);
        this.clearAddShapeModal()
    }

    @action
    clearAddShapeModal() {
        this.isAddShapeModal = false;
        this.isEditShapeModal = false;
        this.shapeIndex = null;
        this.shapeModalFormData = {
            'shape' : '11',
            'name' : '',
        };
    }
}