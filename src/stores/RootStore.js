import { RouterState, RouterStore } from 'mobx-state-router';
import { routes } from '../routes';
import {generateRoutes} from "../utils/generateRoutes";
import PageStore from "./PageStore";
import {UiStore} from "./UiStore";
import Api from "../services/Api";
import {SettingStore} from "./SettingStore";

const notFound = new RouterState('notFound');

export class RootStore {
    routerStore = new RouterStore(this, generateRoutes(routes), notFound);
    pageStore = new PageStore(this);
    uiStore = new UiStore(this);
    api = new Api(this);
    settingStore = new SettingStore(this);
    localStorage = null;

    constructor(localStorage) {
        this.localStorage = localStorage;
    }
}