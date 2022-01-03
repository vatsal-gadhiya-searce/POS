import {observable, action} from 'mobx';
import TableManagement from "../../components/table-management/TableManagement";
import RatioLayoutManager from "../../utils/layoutManager/RatioLayoutManager";
import BasePage from "./../BasePage";
import {SectionStore} from "../../stores/modal-stores/table-management/SectionStore";
import {TableStore} from "../../stores/modal-stores/table-management/TableStore";
import {ShapeStore} from "../../stores/modal-stores/table-management/ShapeStore";
import {LineStore} from "../../stores/modal-stores/table-management/LineStore";
import {ResizeDragDropStore} from "../../stores/modal-stores/table-management/ResizeDragDropStore";

export default class TableManagementPage extends BasePage {
    component = TableManagement;

    @observable floor = null;
    @observable floors = null;

    @observable floorWidth = 0;
    @observable floorHeight = 0;

    @observable isLoading = true;
    @observable table = null;

    layoutManager = null;
    sectionStore = null;
    tableStore = null;
    shapeStore = null;
    lineStore = null;
    resizeDragDropStore = null;

    @action
    load() {
        this.isLoading = true;
        this.layoutManager = new RatioLayoutManager(this.rootStore, this);
        this.sectionStore = new SectionStore(this);
        this.tableStore = new TableStore(this);
        this.shapeStore = new ShapeStore(this);
        this.lineStore = new LineStore(this);
        this.resizeDragDropStore = new ResizeDragDropStore(this);

        this.rootStore.api.getLayout().then(this.setFloors);
    }

    @action
    setFloors = (floors) => {
        this.isLoading = false;
        this.floors = floors;
        if(this.floors.length > 0) {
            this.floor = floors[0];
            this.table = this.floor.LayoutObjects[0];
        }
    };

    @action
    selectFloor = (floor) => {
        this.floor = floor;
    };

    @action
    onClickSave = () => {
        this.rootStore.api.postLayout(this.floors).then((response)=>{
            this.rootStore.routerStore.goTo("home");
        });
    };


}