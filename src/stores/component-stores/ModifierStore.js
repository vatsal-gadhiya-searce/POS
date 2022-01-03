import {computed, observable, action} from 'mobx';
import _ from 'lodash';
import ProductModifier from "../../models/ProductModifier";

export class ModifierStore {

    constructor(page) {
        this.page = page;
    }

    @observable showModifier = false;
    @observable selectedModifier = [];
    selectedProduct = {
        Price : [],
    };
    @observable modifiers = [];
    @observable index = 0;

    @action
    setData = (item, productItem, index) => {
        this.selectedProduct.Price = productItem.Price;
        this.selectedModifier = item.ProductModifiers;
        this.modifiers = productItem.ProductModifiers;
        this.index = index;
    };

    @action
    getTotalPrice() {
        if (this.selectedModifier && this.selectedModifier.length > 0) {
            let modifiersPrice = ( _.sum(
                _.map(this.selectedModifier, (value) => {
                    return _.sum(
                        _.map(value.ProductModifierItems, (item) => {
                            return item.Price;
                        })
                    );
                })
            ));
            return (modifiersPrice ? modifiersPrice : 0) + this.selectedProduct.Price;
        }
        return this.selectedProduct.Price;
    }

    @action
    onClickShowModifier(item) {
        this.setData(item);
        this.showModifier = true;
    }

    @action
    clearModifiers() {
        this.modifiers = [];
        this.selectedModifier = [];
        this.showModifier = false;
    }

    @action
    onClickModifierItem(modifier,item) {
        modifier = _.clone(modifier);
        item = _.clone(item);
        item.Description = item.Name;
        let sameModifierIndex = _.findIndex(this.selectedModifier,{IdProductModifier : modifier.IdProductModifier});
        if(sameModifierIndex > -1){
            let sameItemIndex =this.selectedModifier[sameModifierIndex].ProductModifierItems.findIndex(productItem => productItem.Name === item.Name || productItem.Description === item.Name);
            if(sameItemIndex > -1){
                this.selectedModifier[sameModifierIndex].ProductModifierItems.splice(sameItemIndex, 1);
            }
            else if(modifier.SelectionMax > 0 && this.selectedModifier[sameModifierIndex].ProductModifierItems.length >= modifier.SelectionMax){
                return;
            }
            else{
                this.selectedModifier[sameModifierIndex].ProductModifierItems.push(item);
            }
        }
        else{
            modifier.ProductModifierItems = [];
            modifier.ProductModifierItems.push(item);
            this.selectedModifier.push(modifier);
        }

        // let index = _.findIndex(this.selectedModifier, {modifier: modifier,item: item});
        // let nullIndex = _.findIndex(this.selectedModifier, {modifier: modifier, item: null});
        // if (index > -1) {
        //     this.selectedModifier.splice(index, 1);
        // } else if (nullIndex > -1) {
        //     this.selectedModifier[nullIndex] = {modifier: modifier, item: item};
        // } else {
        //     let selectOneIndex =  _.findIndex(this.selectedModifier, {modifier: modifier});
        //     if (selectOneIndex > -1 && modifier.SelectionMin === 1 && modifier.SelectionMax === 1) {
        //         this.selectedModifier[selectOneIndex] = {modifier: modifier, item: item};
        //     } else if (modifier.SelectionMax > 0 && modifier.SelectionMax <= _.filter(this.selectedModifier, {modifier: modifier}).length) {
        //         return;
        //     } else {
        //         modifier.ProductModifierItems = [];
        //         this.selectedModifier.push({modifier: modifier , item: item});
        //     }
        // }
        this.selectedModifier = _.clone(this.selectedModifier);
    }

    @action
    onClickDone() {
        if(this.index >= 0){
            let currentItem = this.page.orderObject.OrderedProducts[this.index];
            currentItem.ProductModifiers = this.addModifiers(currentItem);
            this.page.orderObject.OrderedProducts[this.index] = currentItem;
        }
        this.clearModifiers();
    }

    @action
    addModifiers(currentItem){
        this.selectedModifier.map((value) => {
            return currentItem.ProductModifiers.push(ProductModifier.addModifier(value));
        });
        return currentItem.ProductModifiers;
    }

    @action
    onClickDeleteItem() {
        this.clearModifiers();
    }

    @computed get hasDisabledDoneButton() {
        return this.modifiers.filter((modifier) => {
            return modifier.SelectionMin > 0 && modifier.IsMandatory;
        }).length > this.selectedModifier.filter((modifier) => {
            return modifier.SelectionMin > 0 &&
                modifier.SelectionMin <= modifier.ProductModifierItems.length
                && modifier.SelectionMax >= modifier.ProductModifierItems.length
                && modifier.IsMandatory
        }).length;

    }

    @action
    getModifierType(modifier) {
        if (!modifier.IsMandatory || modifier.SelectionMin <= 0) {
            return ' Optional ' + (modifier.SelectionMax > 0 ? '( Maximum ' + modifier.SelectionMax + ')' : '');
        } else if (modifier.SelectionMin === 1 && modifier.SelectionMax === 1) {
            return ' Select One Method';
        } else if (modifier.SelectionMin > 0 && modifier.SelectionMax > 0) {
            return ' Minimum of ' + modifier.SelectionMin + ' and Maximum of ' + modifier.SelectionMax;
        }
    }

    @action
    getMandatoryModifiersByProduct(modifiers) {
        return _.filter(modifiers, {IsMandatory: true});
    }
}