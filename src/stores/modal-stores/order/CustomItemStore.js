import {observable} from 'mobx';
import {action} from "mobx";
import {scrollToBottomOfElement} from "../../../utils/helper";

export class CustomItemStore {

    @observable customItemFormData = this.getData();
    @observable showCustomItemLabel = false;
    @observable showCustomItemPrice = false;
    @observable showCustomItemQty = false;
    @observable selectedBTW = 0;

    constructor(page) {
        this.page = page;
    }

    getData = () => {
        return {
            qty: 1,
            btw: 0,
            DisplayOrder: 0,
            HasModifiers: false,
            Name: "",
            OutOfStock: true,
            Price: "",
            ProductModifiers: []
        }
    };

    @action
    onClickShowCustomItem = (e, key = 'showCustomItemLabel') => {
        this[key] = true;
    };

    @action
    clearCustomItem = () => {
        this.showCustomItemLabel = false;
        this.showCustomItemPrice = false;
        this.showCustomItemQty = false;
        this.selectedBTW = 0;
        this.customItemFormData = this.getData();
    };

    @action
    onClickSaveCustomItemLabel = (e) => {
        this.showCustomItemLabel = false;
        setTimeout(() => {
            this.onClickShowCustomItem(e, 'showCustomItemPrice');
        }, 500);
    };

    @action
    onClickSaveCustomItemPrice = (e) => {
        this.showCustomItemPrice = false;
        setTimeout(() => {
            this.onClickShowCustomItem(e, "showCustomItemQty");
        }, 500)
    };

    @action
    onChangeItemPrice = (value) => {
        this.customItemFormData.Price = value;
        this.onClickCalculateBTW(this.selectedBTW)
    };

    @action
    onClickCalculateBTW = (percentage) => {
        this.selectedBTW = percentage;
        this.customItemFormData.btw = (this.customItemFormData.Price) ? (parseInt(this.customItemFormData.Price, 10) * percentage) / 100 : 0;
    };

    /** Add Item Qty Modal **/
    @action
    onChangeItemQty = (value) => {
        this.customItemFormData.qty = value
    };

    @action
    onToggleItemQty = (remove = false) => {
        this.customItemFormData.qty = (remove)
            ? (this.customItemFormData.qty > 1
                ? this.customItemFormData.qty - 1 : 1)
            : this.customItemFormData.qty + 1
    };

    /**
     * Numeric Pad
     * @param value
     */
    @action
    onClickNumber = (value) => {
        this.customItemFormData.Price = this.customItemFormData.Price +  value;
        this.onClickCalculateBTW(this.selectedBTW);
    };

    @action
    onClickClear = () => {
        let price = this.customItemFormData.Price;
        this.customItemFormData.Price = price.substr(0, price.length - 1);
        this.onClickCalculateBTW(this.selectedBTW);
    };

    @action
    onClickSaveCustomItem = () => {
        this.customItemFormData.Price = Number(this.customItemFormData.Price);
        this.page.selectedProducts.push(this.customItemFormData);
        scrollToBottomOfElement();
        this.clearCustomItem();
    };
}