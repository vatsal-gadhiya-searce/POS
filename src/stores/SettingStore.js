import { observable } from 'mobx';
import {SettingService} from "../services/SettingService";

export class SettingStore {
    @observable version = '';
    @observable staticData = [];
    @observable applicationSettings = {};
    @observable tableColoringLegend = [];

    rootStore;
    settingService;
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.settingService = new SettingService(rootStore);
    }

    checkVersion = () => {
        return new Promise((resolve , reject) => {
            this.settingService.getVersion().then(response => {
                this.version = (response) ? response.Version : '';
                //if (this.version.toString().trim() !== this.rootStore.localStorage.getItem('version')) {
                    this.rootStore.pageStore.loading = true;
                    this.rootStore.localStorage.setItem('version', this.version);
                    this.getSettings().then(() => {
                        this.rootStore.pageStore.loading = false;
                        resolve();
                    });
//                } else {
//                    resolve();
//                }
            });
        });
    };

    getSettings = () => {
        return new Promise((resolve , reject) => {
            this.settingService.getSettings().then(response => {
                this.staticData = response.StaticData;
                this.applicationSettings = response.ApplicationSettings;
                this.tableColoringLegend = response.TableColoringLegend;
                resolve();
            });
        });
    }
}