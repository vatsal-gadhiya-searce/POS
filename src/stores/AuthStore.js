import {observable, action} from 'mobx';

export default class AuthStore {
    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }
}