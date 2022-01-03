import _ from "lodash";

export class ResizeDragDropStore {

    constructor(page) {
        this.page = page;
    }
    
    onResizeCall(table, ref, direction, position) {
        let index = this.page.floor.LayoutObjects.indexOf(table);
        this.calculateRatio("LayoutObjects", index, table, ref, position);
    }

    onDragStopCall(table, d) {
        let index = this.page.floor.LayoutObjects.indexOf(table);
        this.calculateXyRatio("LayoutObjects", index, table, d);
    }

    onShapeResizeCall(shape, ref, direction, position) {
        let index = this.page.floor.LayoutObjects.indexOf(shape);
        this.calculateRatio("LayoutObjects", index, shape, ref, position);
    }

    onShapeDragStopCall(shape, d) {
        let index = this.page.floor.LayoutObjects.indexOf(shape);
        this.calculateXyRatio("LayoutObjects", index, shape, d);
    }

    onLineResizeCall(line, ref, direction, position) {
        let index = this.page.floor.LayoutObjects.indexOf(line);
        this.calculateRatio("LayoutObjects", index, line, ref, position, (line.Shape === 22) , (line.Shape === 21));
    }

    onLineDragStopCall(line, d) {
        let index = this.page.floor.LayoutObjects.indexOf(line);
        this.calculateXyRatio("LayoutObjects", index, line, d);
    }

    calculateXyRatio(key, index, dimensions, d) {
        const horizontalRatio = this.page.floorWidth / 1200;
        const verticalRatio = this.page.floorHeight / 800;
        dimensions.PositionLeft = Math.round(d.x / horizontalRatio);
        dimensions.PositionTop = Math.round(d.y / verticalRatio);
        dimensions.IdOperationType = 2;
        if(dimensions.Id === 0){
            dimensions.IdOperationType = 1;
        }
        this.page.floor[key][index] = dimensions;
        this.page.selectFloor(_.clone(this.page.floor));
    }

    calculateRatio(key, index, dimensions, ref, position, verticalEnable = true, horizontalEnable = true) {
        const horizontalRatio = this.page.floorWidth / 1200;
        const verticalRatio = this.page.floorHeight / 800;
        const minRatio = Math.min(horizontalRatio, verticalRatio);
        if(horizontalEnable) {
            dimensions.Width = Math.round(parseInt(ref.style.width, 10) / minRatio);
        }
        if(verticalEnable) {
            dimensions.Height = Math.round(parseInt(ref.style.height, 10) / minRatio);
        }
        dimensions.PositionLeft = Math.round(position.x / horizontalRatio);
        dimensions.PositionTop = Math.round(position.y / verticalRatio);
        dimensions.IdOperationType = 2;
        if(dimensions.Id === 0){
            dimensions.IdOperationType = 1;
        }
        this.page.floor[key][index] = dimensions;
        this.page.selectFloor(_.clone(this.page.floor));
    }

}