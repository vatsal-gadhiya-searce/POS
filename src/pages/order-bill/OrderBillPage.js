import {observable, action} from 'mobx';
import BasePage from "../BasePage";
import Bill from "../../components/order-bill/Bill";
import {TipStore} from "../../stores/modal-stores/order-bill/TipStore";
import {DiscountStore} from "../../stores/modal-stores/order-bill/DiscountStore";
import {GratuityStore} from "../../stores/modal-stores/order-bill/GratuityStore";
import {AddGuestStore} from "../../stores/modal-stores/order-bill/AddGuestStore";


export default class OrderBillPage extends BasePage {
    component = Bill;

    @observable isLoading = true;
    @observable tipData = {
        percentage : 0,
        amount : '-'
    };
    @observable discountData = {
        percentage : 0,
        amount : '-'
    };
    @observable gratuity = {
        percentage : 0,
        amount : '-',
        is_auto : false
    };
    @observable currentTable;
    @observable floor;

    tipStore = null;
    discountStore = null;
    gratuityStore = null;
    addGuestStore = null;

    totalGuest = 0;

    @action
    load() {
        this.isLoading = false;
        this.tipStore = new TipStore(this);
        this.discountStore = new DiscountStore(this);
        this.gratuityStore = new GratuityStore(this);
        try {
            this.floor = JSON.parse(window.localStorage.getItem('currentFloor'));
            this.totalGuest = window.localStorage.getItem('selectedGuest');
            this.currentTable = this.floor.LayoutObjects.find((table) => {
                return (table.Id === parseInt(this.params.tableId, 10) ? table : null);
            });
            if (!this.currentTable) {
                this.rootStore.routerStore.goTo('sectionPlan');
            } else {
                this.isLoading = false;
            }
        } catch (e) {
            this.rootStore.routerStore.goTo('sectionPlan');
        }

        this.addGuestStore = new AddGuestStore(this);

    }

    @action
    onClickTransferBill = () => {
        this.rootStore.routerStore.goTo('transferBill', { tableId : this.params.tableId.toString() })
    }
}