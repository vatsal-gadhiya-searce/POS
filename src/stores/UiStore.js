import { observable } from 'mobx';
import jquery from 'jquery';
import {action} from "mobx";

export class UiStore {
    @observable pendingRequestCount = 0;

    @observable.struct windowDimensions = UiStore.getWindowDimensions();

    constructor() {
        jquery(window).resize(() => {
            this.windowDimensions = UiStore.getWindowDimensions();
        });
    }

    static getWindowDimensions() {
        //setTimeout(function(){
            return {
                width: jquery('.layout').width(),
                height: jquery('.layout').height()
            };
        //},200);
    }

    @observable isLoading = true;

    @action
    toggleModal = (key) => {
        this[key] = !this[key];
    };
}