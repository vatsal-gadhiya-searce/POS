import {observable, action} from 'mobx';
import _ from "lodash";
import {removeCharacter} from "../../../utils/helper";

export class DiscountStore {

    @observable showDiscountModal = false;

    @observable beforeDiscount = 20;
    @observable afterDiscount = 20;
    @observable discount = '';


    @observable formData = {
        amount: '',
        percentage: '',
        type: 'Amount',
    };

    @observable types = ["Amount", "Percentage"];

    constructor(page) {
        this.page = page;
    }

    @action
    onClickToggleDiscountModal() {
        this.showDiscountModal = !this.showDiscountModal;
        this.discount = '';
        this.calculateDiscount();
    }

    @action
    onChangeType(type) {
        this.formData.type = type;
        this.discount = '';
        this.calculateDiscount();
    };

    @action
    calculateDiscount() {
        let discountAmount = parseFloat(this.discount) || 0;
        let amount= ((this.beforeDiscount * (discountAmount)) / 100);
        let notAllowableAmount=(this.formData.type==='Amount' && discountAmount > this.beforeDiscount);
        let notAllowablePercentage=(this.formData.type==='Percentage' && ( (discountAmount > 100) || (amount > this.beforeDiscount)));

        if(notAllowableAmount || notAllowablePercentage ){
            alert("Discount cannot be greater than total bill or not greater than 100 %");
            this.discount = removeCharacter(this.discount);
            return;
        }

        this.formData.amount = '';
        this.formData.percentage = '';
        this.afterDiscount = this.beforeDiscount;

        if (discountAmount > 0 && this.formData.type === 'Amount') {
            this.afterDiscount = this.beforeDiscount - discountAmount;
            this.formData.amount = discountAmount;
             this.formData.percentage = (discountAmount * 100) / this.beforeDiscount;
        } else if(discountAmount > 0){
            this.formData.amount = amount;
            this.afterDiscount = (this.beforeDiscount - this.formData.amount).toFixed(2);
            this.formData.percentage = discountAmount;
        }
    }


    @action
    onClearDiscount() {
        this.showDiscountModal = false;
        this.formData = {
            amount: '',
            percentage:'',
            type: 'Amount',
        };
    };

    @action
    onClickSaveDiscount() {
        this.page.discountData = _.clone(this.formData);
        this.showDiscountModal = false;
    }
    ;

    @action
    onClickNumber = (value) => {
        this.discount = this.discount + value;
        this.calculateDiscount();
    };

    @action
    onClickClear = () => {
        this.discount = removeCharacter(this.discount);
        this.calculateDiscount();
    };
}
