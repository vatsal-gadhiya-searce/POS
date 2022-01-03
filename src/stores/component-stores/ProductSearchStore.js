import {action, observable} from "mobx";
import _ from "lodash";

export class ProductSearchStore {
    @observable showSearchScreen = false;
    @observable searchString = '';
    @observable filteredResult = [];

    constructor(page) {
        this.page = page;
    }

    @action
    onClickSearch() {
        this.onSearchClear();
        this.showSearchScreen = true;
        this.page.isGeneralNote = false;
        this.page.productNoteStore.showProductNote = false;
        this.page.modifierStore.showModifier = false;
    }

    @action
    onHideSearch() {
        this.onSearchClear();
        this.showSearchScreen = false;
    }

    @action
    onSearchItem(text) {
        this.searchString = text;
        let products = [];
        _.map(this.page.mainCategories, (mainCat) => {
            _.map(mainCat.SubCategory, (subCate) => {
                _.map(subCate.Products, (product) => {
                    if (!_.find(products, {Name: product.Name})) {
                        products.push(product);
                    }
                });
            });
        });

        this.filteredResult = _.filter(products, (product) => {
            let string = product.Name.toString().trim().toLowerCase();
            return string.includes(this.searchString.toString().trim().toLowerCase())
        });

        if (this.searchString.toString().trim() === '') {
            this.filteredResult = [];
        }
    }

    @action
    onSearchClear() {
        this.searchString = '';
        this.filteredResult = [];
    }
}