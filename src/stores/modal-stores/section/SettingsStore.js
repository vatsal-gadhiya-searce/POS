import { observable } from 'mobx';
import {action} from "mobx";

export class SettingsStore {

    @observable isSettingsModalOpen = false;

    constructor(page) {
        this.page = page;
    }

    @action
    toggleSettingsModal = () => {
        this.isSettingsModalOpen = !this.isSettingsModalOpen;
    };
}