import {observable, computed} from 'mobx';
import _ from "lodash";


export default class RatioLayoutManager {
    @observable rootStore;

    @observable page;

    constructor(rootStore, page) {
        this.rootStore = rootStore;
        this.page = page;
    }

    @computed get tables() {
        const {floorWidth, floorHeight} = this.page;

        if (!this.page.floor) {
            return [];
        }

        const horizontalRatio = floorWidth / 1200;
        const verticalRatio = floorHeight / 800;
        const minRatio = Math.min(horizontalRatio, verticalRatio);

        return this.page.floor.LayoutObjects.map((table) => {
            return {
                width: table.Width * minRatio,
                height: table.Height * minRatio,
                left: table.PositionLeft * horizontalRatio,
                top: table.PositionTop * verticalRatio,
                fontSize: Math.min(Math.round(14 * minRatio), 14),
                bigFontSize: Math.min(Math.round(20 * minRatio), 22),
                table,
            };
        });
    }

    // @computed get shapes() {
    //     const {floorWidth, floorHeight} = this.page;
    //
    //     if (!this.page.floor) {
    //         return [];
    //     }
    //
    //     const horizontalRatio = floorWidth / 1200;
    //     const verticalRatio = floorHeight / 800;
    //     const minRatio = Math.min(horizontalRatio, verticalRatio);
    //
    //     return this.page.floor.Shapes.map((shape) => {
    //         return {
    //             width: shape.Width * minRatio,
    //             height: shape.Height * minRatio,
    //             left: shape.PositionLeft * horizontalRatio,
    //             top: shape.PositionTop * verticalRatio,
    //             fontSize: Math.min(Math.round(14 * minRatio), 14),
    //             bigFontSize: Math.min(Math.round(20 * minRatio), 22),
    //             shape,
    //         };
    //     });
    // }
    //
    // @computed get lines() {
    //     const {floorWidth, floorHeight} = this.page;
    //
    //     if (!this.page.floor) {
    //         return [];
    //     }
    //
    //     const horizontalRatio = floorWidth / 1200;
    //     const verticalRatio = floorHeight / 800;
    //     const minRatio = Math.min(horizontalRatio, verticalRatio);
    //
    //     return this.page.floor.Lines.map((line) => {
    //         return {
    //             width: line.Width * minRatio,
    //             height: line.Height * minRatio,
    //             left: line.PositionLeft * horizontalRatio,
    //             top: line.PositionTop * verticalRatio,
    //             fontSize: Math.min(Math.round(14 * minRatio), 14),
    //             bigFontSize: Math.min(Math.round(20 * minRatio), 22),
    //             line,
    //         };
    //     });
    // }

    @computed get menuItem() {
        // let totalSlide = this.slideToShow * this.slideRows;
        // let productList = _.clone(this.page.productList);
        // if(productList) {
        //     _.each(productList, (value, key) => {
        //         if (key !== 0 && (key % totalSlide) === 0) {
        //             productList.splice((key - 1), 0, {name: "Modifier", isModifier: true});
        //         }
        //     });
        //     productList.splice((productList.length), 0, {name: "Modifier", isModifier: true});
        // }
        return _.clone(this.page.productList);
    }

    @computed get slideToShow() {
        const {floorWidth} = this.page;
        if (floorWidth < 550) {
            return 3;
        }
        if (floorWidth < 600) {
            return 4
        }
        if (floorWidth < 797) {
            return 5
        }
        if (floorWidth <= 1063) {
            return 6
        }

        return 8
    }

    @computed get slideRows() {
        const {floorHeight} = this.page;
        if (floorHeight < 600) {
            return 3;
        } else if (floorHeight < 700) {
            return 4;
        }
        return 5;
    }
}