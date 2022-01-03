import {observable, action, reaction} from 'mobx';
import {RouterState} from "mobx-state-router";
import {routeMiddleware} from "../utils/middleware";

export default class PageStore {
    rootStore = null;
    @observable currentPage = null;
    currentPageLoadPromise = null;
    @observable loading = false;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.observeRouterStateChanges();
    }

    @action
    showPage(page) {
        this.currentPage = page;
        this.currentPageLoadPromise = Promise.resolve(page.load());
        this.currentPage.setApi(this.rootStore.api);
    }

    observeRouterStateChanges = () => {
        reaction(
            () => this.rootStore.routerStore.routerState,
            routerState => {
                const route = this.rootStore.routerStore.getRoute(routerState.routeName);
                if (route.middleware) {
                    route.middleware
                        .reduce((promise: Promise<void>, hook) => {
                            const middleware = routeMiddleware[hook];
                            return middleware
                                ? promise.then(() => middleware(routerState, this.rootStore.routerStore))
                                : promise;
                        }, Promise.resolve())
                        .then(() => {
                            if (route.page && route.onPageEnter) {
                                route.onPageEnter(routerState, this.rootStore.routerStore);
                            }
                        })
                        .catch((redirectState: RouterState) => {
                            if (!(redirectState instanceof RouterState)) {
                                throw new Error("toState is undefined");
                            }
                            this.rootStore.routerStore.goTo(redirectState);
                        });
                } else {
                    if (route.page && route.onPageEnter) {
                        route.onPageEnter(routerState, this.rootStore.routerStore);
                    }
                }
            },
            {
                onError: e => {
                    throw new Error(e);
                }
            }
        );
    };
}