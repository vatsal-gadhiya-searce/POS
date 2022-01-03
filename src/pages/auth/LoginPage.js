import {observable, action} from 'mobx';
import BasePage from "../BasePage";
import Login from "../../components/auth/Login";

export default class LoginPage extends BasePage {

    component = Login;

    @observable checkInTime = '';
    @observable checkOutTime = '';

    @observable isSyncing = false;
    @observable synced = false;
    @observable checkIn = false;
    @observable checkOut = false;
    @observable checkedOut = false;

    @observable formData = {
        id: '',
        name:'',
        password: '',
    };

    @observable currentUser=null;

    @action
    load() {
        this.currentUser = JSON.parse(window.localStorage.getItem("currentUser"));
    }

    @action
    onClickCheckIn() {
        if(this.currentUser) {
            this.checkIn = true;
            setTimeout(() => {
                this.isSyncing = true;
            }, 5000);
        }
    }

    @action
    onClickCheckOut() {
        if(this.currentUser) {
            this.checkOut = true;
            setTimeout(() => {
                this.isSyncing = true;
            }, 5000);
        }
    }

    @action
    onCheckOut(){
        window.localStorage.removeItem("currentUser");
        this.currentUser=null;
        this.synced = false;
        this.checkOut = false;
        this.checkedOut=true;
        setTimeout(()=>{
            this.checkedOut=false;
        }, 5000);
    }

    onClickNumber = (number) => {
        if(this.formData.password.toString().trim().length <= 4){
            this.formData.password = this.formData.password + number;
        }
    };

    onClickClear = () => {
        this.formData.password = '';
    };

    onClickLogin = () => {
        if(this.formData.password.toString().trim().length === 4){
            this.formData.id=Math.floor(Math.random() * 100) + 1;
            this.formData.name=Math.random().toString(36).substring(2, 15);
            window.localStorage.setItem("currentUser",JSON.stringify(this.formData));
            this.formData.password='';
            this.rootStore.routerStore.goTo('sectionPlan');
        }

    };

    callbackAction(from = 'sync') {
        this.synced = (from === 'sync success');
        this.isSyncing = (from === 'sync');
        this.checkedOut=(from === 'checked out');
    }

    @action
    onCancel(){
        this.synced = false;
        this.checkIn=false;
        this.checkedOut=false;
        this.isSyncing=false;
        this.checkOut=false;
    }

    @action
    onLogin(){
        this.synced = false;
        this.checkIn=false;
        this.rootStore.routerStore.goTo('sectionPlan');
    }
}