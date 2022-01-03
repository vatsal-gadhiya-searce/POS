import {observable, action} from 'mobx';
import _ from 'lodash';
import {removeCharacter} from "../../../utils/helper";

export class TipStore {

    @observable showTipModal = false;

    @observable beforeTip = 20;
    @observable afterTip = 20;
    @observable tip = '';

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
    onClickToggleTipModal() {
        this.showTipModal = !this.showTipModal;
        this.tip = '';
        this.calculateTip();
    }

    @action
    onChangeType(type) {
        this.formData.type = type;
        this.tip = '';
        this.calculateTip();
    };

    @action
    calculateTip() {
        this.formData.amount = '';
        this.formData.percentage = '';
        let tipAmount = parseFloat(this.tip);
        this.afterTip = this.beforeTip;
        if (this.formData.type === 'Amount' && tipAmount > 0) {
            this.afterTip = this.beforeTip + tipAmount;
            this.formData.amount = tipAmount;
            this.formData.percentage = (tipAmount * 100) / this.beforeTip;
        } else if (tipAmount > 0) {
            if(tipAmount > 100) {
                alert("The tip percentage allow only 0 to 100");
                this.tip = removeCharacter(this.tip);
                return;
            }
            this.formData.amount = (this.beforeTip * tipAmount) / 100;
            this.afterTip = this.beforeTip + (this.beforeTip * tipAmount) / 100;
            this.formData.percentage = tipAmount;
        }
    }

    @action
    onClearTip() {
        this.showTipModal = false;
        this.formData = {
            amount: '',
            percentage: '',
            type: 'Amount',
        };
    };

    @action
    onClickSaveTip(e) {
        this.page.tipData = _.clone(this.formData);
        this.showTipModal = false;
    };

    @action
    onClickNumber = (value) => {
        this.tip = this.tip + value;
        this.calculateTip();
    };

    @action
    onClickClear = () => {
        this.tip = removeCharacter(this.tip);
        this.calculateTip();
    };

}
