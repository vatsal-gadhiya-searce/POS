import {observable} from 'mobx';
import {action} from "mobx";
import _ from 'lodash';

export class ProductNoteStore {

    @observable showProductNote = false;
    @observable orderItem = {
        Note: '',
        Quantity: 0,
        IdOperationType: 0,
        ProductModifiers: [],
        Price : 0,
    };
    @observable productItem = {};
    @observable index = 0;

    allergies = _.range(0, 15);
    combineId = null;

    constructor(page) {
        this.page = page;
    }

    @action
    onClickToggleNote = (boolState, item, index) => {
        if(item){
            if(item.IsComboProduct){
                this.combineId = item.IdCombination;
            }
            this.setItem(item);
        }
        if(index){
            this.index = index;
        }
        this.showProductNote = boolState;
        this.page.isGeneralNote = false;
        this.page.productSearchStore.showSearchScreen = false;
        this.page.modifierStore.showModifier = false;
    };

    @action
    setItem = (item) => {
        item = _.clone(item);
        this.orderItem.Note = item.Note;
        this.orderItem.Quantity = item.Quantity;
        this.orderItem.IdOperationType = item.IdOperationType;
        this.orderItem.Price = item.Price;
        this.orderItem.selectedAllergies = item.selectedAllergies ? item.selectedAllergies : [];
        this.mainCategories = this.page.rootStore.settingStore.staticData.MainCategories ? this.page.rootStore.settingStore.staticData.MainCategories : [];
        this.mainCategories.find((category) => {
            category.SubCategory.find((subCategory) => {
                subCategory.Products.find(product => {
                    if (product.Id === item.IdProduct) {
                        this.productItem = product;
                    }
                });
            });
        });
        this.page.modifierStore.setData(item,this.productItem,this.index);
    };

    @action
    onClickDeleteItem() {
        this.page.orderObject.OrderedProducts = this.deleteItem(this.page.orderObject.OrderedProducts);
        this.page.orderObject = _.clone(this.page.orderObject);
        this.onClickToggleNote(false);
    }

    @action
    deleteItem(selectedItem) {
        if (this.index >= 0) {
            let currentItem = selectedItem[this.index];
            currentItem.Note = this.orderItem.Note;
            currentItem.Quantity = this.orderItem.Quantity;
            currentItem.Price = this.orderItem.Price;
            currentItem.IdOperationType = 3;
            selectedItem[this.index] = currentItem;
            return selectedItem;
        }
        return selectedItem;
    }

    @action
    onClickDone() {
        this.page.orderObject.OrderedProducts = this.modifyItem(this.page.orderObject.OrderedProducts);
        this.page.orderObject = _.clone(this.page.orderObject);
        this.onClickToggleNote(false);
    }

    /**
     * Single item modify
     * @param selectedItem
     * @returns {*}
     */
    @action
    modifyItem(selectedItem) {
        let icon = this.orderItem.Note && this.orderItem.Note.toString().trim().length > 0 ? 'note' : '';
        this.orderItem.noteIcon = this.orderItem.selectedAllergies && this.orderItem.selectedAllergies.length ? 'flag' : icon;
        this.orderItem.Price = this.page.modifierStore.getTotalPrice();
        if (this.index >= 0) {
            let currentItem = selectedItem[this.index];
            currentItem.ProductModifiers = [];
            currentItem.Note = this.orderItem.Note;
            currentItem.Quantity = this.orderItem.Quantity;
            currentItem.Price = currentItem.Quantity * this.orderItem.Price;
            currentItem.ProductModifiers =  this.page.modifierStore.addModifiers(currentItem);
            currentItem.IdOperationType = currentItem.Id === 0 ? 1 : 2;
            selectedItem[this.index] = currentItem;
            return selectedItem;
        }
        return selectedItem;
    }

    /**
     * Allergies
     * @param value
     */
    @action
    onClickSelectAllergies(value) {
        let selectedIndex = _.indexOf(this.orderItem.selectedAllergies, value);
        if (selectedIndex >= 0) {
            this.orderItem.selectedAllergies.splice(selectedIndex, 1);
        } else {
            this.orderItem.selectedAllergies.push(value);
        }
    }

    /**
     * Modify Qty
     * @param value
     */
    @action
    onChangeItemQty(value) {
        this.orderItem.Quantity = value ? value : 0;
    }

    @action
    onChangeItemNote(value) {
        this.orderItem.Note = value ? value : '';
    }

    /**
     * Modify Qty
     * @param remove
     */
    @action
    onToggleItemQty(remove = false) {
        this.orderItem.Quantity = (remove)
            ? (this.orderItem.Quantity > 1
                ? this.orderItem.Quantity - 1 : 1)
            : this.orderItem.Quantity + 1;
    }
}