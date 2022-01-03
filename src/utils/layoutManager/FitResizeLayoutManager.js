import { observable, computed } from 'mobx';


export default class FitResizeLayoutManager {
    @observable rootStore;

    @observable page;

    constructor(rootStore, page) {
        this.rootStore = rootStore;
        this.page = page;
    }

    @computed get resizeRatio() {
        const {windowDimensions} = this.rootStore.uiStore;

        const layoutRatio = 3/2;
        const windowRatio = windowDimensions.width / windowDimensions.height;
        const horizontalRatio = windowDimensions.width / 1200;
        const verticalRatio = windowDimensions.height / 800;

        return layoutRatio > windowRatio ? horizontalRatio : verticalRatio;
    }

    @computed get tables() {
        if (!this.page.floor) {
            return [];
        }

        return this.page.floor.LayoutObjects.map((table) => {
            return {
                width: table.Width * this.resizeRatio,
                height: table.Height * this.resizeRatio,
                left: table.PositionLeft * this.resizeRatio,
                top: table.PositionTop * this.resizeRatio,
                fontSize: Math.min(Math.round(14 * this.resizeRatio), 14),
                bigFontSize: Math.min(Math.round(20 * this.resizeRatio), 22),
                table,
            };
        });
    }

    @computed get floorLayout() {
        const {windowDimensions} = this.rootStore.uiStore;

        return {
            left: (windowDimensions.width - 1200 * this.resizeRatio) / 2,
            right: (windowDimensions.width - 1200 * this.resizeRatio) / 2,
            top: (windowDimensions.height - 800 * this.resizeRatio) / 2,
            bottom: (windowDimensions.height - 800 * this.resizeRatio) / 2,
        };
    }
}