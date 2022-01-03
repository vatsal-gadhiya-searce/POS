import {RouterState, RouterStore} from "mobx-state-router";

export const checkVersion = (toState: RouterState, routerStore: RouterStore) => {
    const {
        rootStore: { settingStore }
    } = routerStore;
    return Promise.all([
        settingStore.checkVersion()
    ]);
};

export const routeMiddleware = {
    'checkVersion': checkVersion
};