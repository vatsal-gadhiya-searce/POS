import {observable, action} from 'mobx';
import {removeCharacter} from "../../../utils/helper";
import _ from "lodash";

export class GratuityStore {

    @observable showGratuityModal = false;

    @observable beforeGratuity = 20;
    @observable afterGratuity = 20;
    @observable gratuity = '';

    @observable formData = {
        amount: '',
        percentage:'',
        is_auto:false,
    };

    constructor(page) {
        this.page = page;
    }

    @action
    onClickToggleGratuityModal() {
        this.showGratuityModal = !this.showGratuityModal;
        this.gratuity = '';
        this.formData.is_auto = false;
        this.calculateGratuity();
    }

    @action
    handleChange=(e)=>{
        this.formData.is_auto = e;
    };

    @action
    calculateGratuity() {
        let gratuityAmount = parseFloat(this.gratuity);
        let amount = (this.beforeGratuity * gratuityAmount) / 100;
        let notAllowablePercentage = ((gratuityAmount > 100) || (amount > this.beforeGratuity));
        if (notAllowablePercentage) {
            alert("Gratuity cannot be greater than total bill or greater than 100%");
            this.gratuity = removeCharacter(this.gratuity);
            return;
        }

        this.formData.amount = '';
        this.formData.percentage='';
        this.afterGratuity = this.beforeGratuity;

        if (gratuityAmount > 0) {
            this.afterGratuity = (this.beforeGratuity - amount).toFixed(2);
            this.formData.amount = amount;
            this.formData.percentage = gratuityAmount;
        }
    }

    @action
    onClearGratuity() {
        this.showGratuityModal = false;
        this.formData = {
            amount: '',
            percentage:'',
            is_auto:false
        };
    };

    @action
    onClickSaveGratuity(e) {
        this.page.gratuity = _.clone(this.formData);
        this.showGratuityModal = false;
    }
    ;

    @action
    onClickNumber = (value) => {
        this.gratuity = this.gratuity + value;
        this.calculateGratuity();
    };

    @action
    onClickClear = () => {
        this.gratuity = removeCharacter(this.gratuity);
        this.calculateGratuity();
    };

}
