export default class BasePage {
    rootStore = null;
    params = null;
    queryParams = null;
    api = null;

    constructor(rootStore, params, queryParams) {
        this.rootStore = rootStore;
        this.params = params;
        this.queryParams = queryParams;
    }

    setApi(api) {
        this.api = api;
    }
}