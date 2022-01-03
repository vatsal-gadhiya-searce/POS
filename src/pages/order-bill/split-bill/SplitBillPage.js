import {observable, action} from 'mobx';
import BasePage from "../../BasePage";
import SplitBill from "../../../components/order-bill/split-bill/SplitBill";
import Bill from "../../../models/Bill";
import * as _ from "lodash";

export default class SplitBillPage extends BasePage {
    component= SplitBill;

    @observable isLoading = true;
    @observable billItems = this.rootStore.settingStore.staticData.MainCategories[1].SubCategory[1].Products;
    @observable bills = [];
    @observable selectedBillItems = [];
    @observable selectedBill = null;

    @action
    load(){
        this.isLoading = false;
    }

    @action
    addBill = () => {
        let newBill = Bill.addBill();
        this.bills.push(newBill);
    };

    onSelectItem = (item) => {
        if(this.selectedBillItems && this.selectedBillItems.includes(item)){
          this.selectedBillItems  = this.selectedBillItems.filter((selectedBillItem) => {
                return selectedBillItem.Id !== item.Id;
            });
        }else {
            this.selectedBillItems.push(item);
        }
    };

    selectSpitBill = (billId) => {
        this.selectedBill = this.bills.find((bill) => {
            return parseInt(billId,10) === parseInt(bill.Id,10);
        });
        this.selectedBillItems.map((selectedBillItem) => {
            return this.selectedBill.Order.OrderedProducts.push(selectedBillItem);
        });

        this.bills = _.clone(this.bills);

        this.selectedBillItems.map((selectedBillItem) => {
            return this.removeItem(selectedBillItem);
        });
        this.selectedBillItems = [];
    };
    
    removeItem = (item) => {
        this.billItems = this.billItems.filter((billItem) => {
            return billItem.Id !==  item.Id;
        });
    }
}