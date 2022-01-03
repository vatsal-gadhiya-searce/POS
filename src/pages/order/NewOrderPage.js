import {observable, action} from 'mobx';
import RatioLayoutManager from "../../utils/layoutManager/RatioLayoutManager";
import BasePage from "../BasePage";
import NewOrder from "../../components/order/NewOrder";
import {CustomItemStore} from "../../stores/modal-stores/order/CustomItemStore";
import {ProductNoteStore} from "../../stores/component-stores/ProductNoteStore";
import {CourseSelectionStore} from "../../stores/modal-stores/order/CourseSelectionStore";
import {getFormatDate, getFormatTime, scrollToBottomOfElement} from "../../utils/helper";
import {ModifierStore} from "../../stores/component-stores/ModifierStore";
import {CourseFireStore} from "../../stores/modal-stores/order/CourseFireStore";
import {OrderBillOptionStore} from "../../stores/modal-stores/order/OrderBillOptionStore";
import {AddGuestStore} from "../../stores/modal-stores/order/AddGuestStore";
import {DeleteBillStore} from "../../stores/modal-stores/order/DeleteBillStore";
import {ProductSearchStore} from "../../stores/component-stores/ProductSearchStore";
import {CourseStore} from "../../stores/modal-stores/order/CourseStore";
import _ from 'lodash';
import ProductOrder from "../../models/ProductOrder";

export default class NewOrderPage extends BasePage {
    component = NewOrder;

    @observable isLoading = true;

    @observable floorWidth = 0;
    @observable floorHeight = 0;

    layoutManager = null;

    @observable menuItemSlider;
    @observable subCategoriesSlider;
    @observable mainCategorySlider;

    @observable selectedMainCategoryTab = '';
    @observable mainCategories = [];

    @observable subCategories = [];
    @observable selectedSubCategory = null;

    @observable selectedProducts = [];
    @observable orders = null;
    @observable orderObject = {};
    @observable productList = [];
    @observable combinedItems = [];
    @observable isCombineProduct = false;

    customItemModalStore = null;
    productNoteStore = null;
    courseSelectionStore = null;
    modifierStore = null;
    courseFireStore = null;
    orderBillOptionStore = null;
    deleteBillStore = null;
    productSearchStore = null;
    courseStore = null;

    @observable floor = null;
    @observable currentDate = getFormatDate(new Date());
    @observable currentTime = getFormatTime(new Date());
    @observable totalGuest = 4;

    @observable combineId;

    @observable isHoldBtnClicked = false;
    @observable holdProducts = [];

    @action
    load() {
        this.customItemModalStore = new CustomItemStore(this);
        this.productNoteStore = new ProductNoteStore(this);
        this.courseSelectionStore = new CourseSelectionStore(this);
        this.modifierStore = new ModifierStore(this);
        this.courseFireStore = new CourseFireStore(this);
        this.orderBillOptionStore = new OrderBillOptionStore(this);
        this.deleteBillStore = new DeleteBillStore(this);
        this.productSearchStore = new ProductSearchStore(this);
        this.courseStore = new CourseStore(this);

        this.mainCategories = this.rootStore.settingStore.staticData.MainCategories ? this.rootStore.settingStore.staticData.MainCategories : [];
        if (_.first(this.mainCategories)) {
            this.toggleMainCategory(_.first(this.mainCategories));
        }

        this.layoutManager = new RatioLayoutManager(this.rootStore, this);
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

        this.rootStore.api.getOrder(parseInt(this.params.tableId, 10))
            .then(response =>{
                console.log(response);
                if(response){
                    this.setOrders(response);
                }
                else {
                    let order = {};
                    order.SittingPersons = this.totalGuest;
                    order.IdTable = parseInt(this.params.tableId, 10);
                    order.OperationType = 1;
                    order.Note = '';
                    order.CustomerName = null;
                    this.page.rootStore.api.postOrder(order).then((newOrder)=>
                    {
                        if(newOrder){
                            this.setOrders(newOrder);
                        }
                    });
                }
            });
    }

    @action
    setOrders = (orders) => {
        if (orders) {
            this.orders = _.clone(orders);
            this.orderObject = this.orders[0];
            this.addCombineItem();
            this.isLoading = false;
        }
    };

    @action
    addCombineItem(){
        _.map(this.orderObject.OrderedProducts,(combinedProduct)=>{
            if(combinedProduct.IdCombination > 0){
                let combineIndex = _.findIndex(this.orderObject.OrderedProducts,combinedProduct);
                if(combineIndex > -1) {
                    let existingItem = this.combinedItems.find((combine)=>combine.combineId === combinedProduct.IdCombination);
                    if(existingItem){
                        existingItem.products = _.filter(this.orderObject.OrderedProducts,{IdCombination : combinedProduct.IdCombination});
                    }
                    else{
                        let newCombineItem = {};
                        newCombineItem.index = combineIndex;
                        newCombineItem.combineId = combinedProduct.IdCombination;
                        newCombineItem.products = _.filter(this.orderObject.OrderedProducts,{IdCombination : combinedProduct.IdCombination});
                        this.combinedItems.push(newCombineItem);
                    }
                }
            }
        });
    }

    @action
    toggleMainCategory(categories) {
        this.selectedMainCategoryTab = categories.Id;
        this.subCategories = categories.SubCategory ? categories.SubCategory : [];
        this.onSubMenuChange(_.first(this.subCategories));
    }

    @action
    onSubMenuChange(category) {
        this.selectedSubCategory = category.Id;
        this.productList = category.Products && category.Products.length ? category.Products : [];
        if (this.menuItemSlider) {
            this.menuItemSlider.slickGoTo(0);
            this.subCategoriesSlider.slickGoTo(0);
        }
    }

    @action
    onToggleCombineProduct() {
        this.modifierStore.clearModifiers();
        this.productSearchStore.onHideSearch();
        this.productNoteStore.onClickToggleNote(false);
        this.isCombineProduct = !this.isCombineProduct;
        if (this.isCombineProduct) {
            this.combineId = Math.floor(Math.random() * 20000 + 1);
        } else {
            this.combineId = null;
        }
    }

    @action
    onClickSuffix(suffix){
        this.productNoteStore.showProductNote = false;
        this.productSearchStore.showSearchScreen = false;
        // this.api.getOrderWithSuffix(this.currentTable.Id,suffix).then(response =>{
        //     console.log(response);
        // });
        let suffixIndex = _.findIndex(this.orders,{TableSufix : suffix});
        this.orderObject = this.orders[suffixIndex];
    }

    @action
    onClickProduct(product) {
        product = _.clone(product);
        if(this.isCombineProduct){
            product.IsComboProduct = true;
            product.IdCombination = this.combineId;
        }
        if(!product.IsOnHold) {
            product.IsOnHold = false;
            let productItem = _.clone(ProductOrder.addProduct(product));
            this.selectItem(productItem);
        }
    }

    @action
    selectItem(product) {
        let selectedIndex = 0;
        if(this.isCombineProduct){
            selectedIndex = _.findIndex(this.orderObject.OrderedProducts, {IdProduct: product.IdProduct, IsComboProduct: true , IdCombination : product.IdCombination});
        }
        else{
            selectedIndex = _.findIndex(this.orderObject.OrderedProducts, {IdProduct: product.IdProduct, IsComboProduct: false});
        }
        if (selectedIndex >= 0) {
            this.orderObject.OrderedProducts.splice(selectedIndex, 1);
        } else {
            if(product.showModifier && product.ProductModifiers.length > 0) {
                product = this.setMandatoryModifiers(product);
                this.modifierStore.onClickShowModifier(product);
            }
            this.orderObject.OrderedProducts.push(product);
        }
        this.addCombineItem();
        this.orderObject = _.clone(this.orderObject);
        let suffixIndex = _.findIndex(this.orders,{TableSufix : this.orderObject.TableSufix});
        this.orders[suffixIndex] = this.orderObject;
        this.orders = _.clone(this.orders);
        scrollToBottomOfElement();

    }

    @action
    setMandatoryModifiers(product) {
        let mandatoryModifiers = this.modifierStore.getMandatoryModifiersByProduct(product.ProductModifiers);
        if(mandatoryModifiers) {
            product.modifiers = [];
            mandatoryModifiers.forEach(value => {
                for (let i = 0; i < value.SelectionMin; i++) {
                    product.modifiers.push({modifier: value, item: null});
                }
            });
        }
        return product;
    }

    /** Hold Product */
    @action
    onHoldBtnClick() {
        this.isHoldBtnClicked = !this.isHoldBtnClicked;
        if(this.isHoldBtnClicked === false) {
            let products = this.orderObject.OrderedProducts;
            let holdProduct = _.filter(products, (value) => {
                if(value.IsComboProduct) {
                    value.IsOnHold = false;
                }
                return value.IsOnHold === true;
            });
            let suffixIndex = _.findIndex(this.holdProducts, {suffix : this.orderObject.TableSufix});
                if(suffixIndex > -1) {
                    this.holdProducts[suffixIndex].products = holdProduct ? holdProduct : [];
                }
                else{
                    this.holdProducts.push({'products': holdProduct , suffix : this.orderObject.TableSufix});
                }
        }
    }

    @action
    onClickSelectHold(item, index, type) {
        if(this.isHoldBtnClicked && !item.IsComboProduct) {
            item.IsOnHold = !item.IsOnHold;
            if (type === 'normal') {
                this.orderObject.OrderedProducts[index] = item;
            } else if (type === 'hold') {
                let suffixIndex = _.findIndex(this.holdProducts, {suffix : this.orderObject.TableSufix});
                this.holdProducts[suffixIndex].products[index] = item;
            }
            this.orderObject = _.clone(this.orderObject);
        }
    }

    @action
    onSendOrder() {
        let updateOrder = {
            OperationType: 2,
            Id: this.orderObject.Id,
            IdTable: this.orderObject.IdTable,
            TableSufix: this.orderObject.TableSufix,
            SittingPersons: this.orderObject.SittingPersons,
            TypeDiscount: this.orderObject.TypeDiscount,
            Discount: this.orderObject.Discount,
            CurrentCourse: this.orderObject.CurrentCourse,
            CustomerName: this.orderObject.CustomerName,
            OrderedProducts: this.orderObject.OrderedProducts.filter((product) => product.IsOnHold === false),
            Note: this.orderObject.Note,
        };
        let existingOrderNewProduct = {
            Id: this.orderObject.Id,
            IdTable: this.orderObject.IdTable,
            OperationType: 0,
            TableSufix: this.orderObject.TableSufix,
            SittingPersons: this.orderObject.SittingPersons,
            TypeDiscount: this.orderObject.TypeDiscount,
            Discount: this.orderObject.Discount,
            OrderedProducts: this.orderObject.OrderedProducts.filter((product) => product.IsOnHold === false && product.Id===0),
        };
        this.rootStore.api.postOrder(existingOrderNewProduct).then((response) => {
            if (response) {
                this.rootStore.routerStore.goTo('sectionPlan');
            }
        });
        // let index = _.findIndex(this.orderObject.OrderedProducts , {Id : 0});
        // if(index > -1){
        //     this.rootStore.api.postOrder(existingOrderNewProduct).then((response) => {
        //         if (response) {
        //             console.log(response);
        //             this.rootStore.routerStore.goTo('sectionPlan');
        //         }
        //     });
        // }
        // else{
        //     this.rootStore.api.postOrder(updateOrder).then((response) => {
        //         if (response) {
        //             console.log(response);
        //             this.rootStore.routerStore.goTo('sectionPlan');
        //         }
        //     });
        // }
    }

    /**
     * show Modifier
     */
    @action
    onClickShowModifier() {
        let $lastSelectedProduct = _.findLast(this.selectedProducts);
        if ($lastSelectedProduct && $lastSelectedProduct.ProductModifiers.length) {
            this.modifierStore.onClickShowModifier($lastSelectedProduct);
        }
    }

    /** General Note **/
    @observable isGeneralNote = false;
    @observable generalNote = '';

    @action
    onShowGeneralNote() {
        this.isGeneralNote = !this.isGeneralNote;
        this.productSearchStore.showSearchScreen = false;
        this.productNoteStore.showProductNote = false;
        this.modifierStore.showModifier = false;
        if(this.generalNote !== ''){
            this.orderObject.Note = this.generalNote;
            this.orderObject.IdOperationType = 2;
        }
    }

    @action
    onDeleteGeneralNote() {
        this.isGeneralNote = false;
        this.generalNote = '';
        if(this.orderObject.Note){
            this.orderObject.Note = null;
        }
    }

    @action
    onCloseCourseModal(item, combineId) {
        if(combineId) {
            let selectedIndex = _.findIndex(this.selectedProducts[combineId]['products'], {Id: item.Id});
            this.selectedProducts[combineId]['products'][selectedIndex] = item;
        } else {
            let selectedIndex = _.findIndex(this.selectedProducts, {Id: item.Id});
            this.selectedProducts[selectedIndex] = item;
        }
    }
}