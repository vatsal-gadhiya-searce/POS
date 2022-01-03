function resolve(obj) {
    return obj && obj.__esModule ? obj.default : obj;
}

function generatePageOnEnter(route) {
    let pagePromise = null;

    route.onPageEnter = (routerState, routerStore) => {
        if (!pagePromise) {
            pagePromise = Promise.resolve(route.page()).then(module => {
                return resolve(module);
            }).catch(err => {
                throw err;
            });
        }

        pagePromise.then((page) => {
            const {rootStore, rootStore: {pageStore}} = routerStore;
            pageStore.showPage(new page(rootStore, routerState.params, routerState.queryParams));
        });

        return pagePromise;
    }
}

export function generateRoutes(routes) {
    const generatedRoutes = [];

    for (const route of routes) {
        if (route.page) {
            generatePageOnEnter(route);
        }
        generatedRoutes.push(route);
    }

    return generatedRoutes;
}