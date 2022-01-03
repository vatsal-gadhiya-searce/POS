import {RouterState} from "mobx-state-router";

const checkForUserSignedIn = (fromState, toState, routerStore) => {
    const currentUser=window.localStorage.getItem("currentUser");
    if (currentUser) {
        return Promise.resolve();
    } else {
        return Promise.reject(new RouterState('login'));
    }
};
export const routes = [
    {
        name: 'home',
        pattern: '/',
        beforeEnter:checkForUserSignedIn,
        middleware: ['checkVersion'],
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/section/SectionPlanPage'),
    },
    {
        name: 'login',
        pattern: '/login',
        middleware: ['checkVersion'],
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/auth/LoginPage'),
    },
    {
        name: 'sectionPlan',
        pattern: '/section-plan',
        beforeEnter:checkForUserSignedIn,
        middleware: ['checkVersion'],
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/section/SectionPlanPage'),
    },
    {
        name: 'tableManagement',
        pattern: '/table-management',
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/table-management/TableManagementPage'),
    },
    {
        name: 'tableManagement',
        pattern: '/table-management',
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/table-management/TableManagementPage'),
    },
    {
        name: 'combineTables',
        pattern: '/combine-tables',
        middleware: ['checkVersion'],
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/section-group/SelectCombineTablesPage'),
    },
    {
        name: 'NewOrder',
        pattern: '/:tableId/order',
        middleware: ['checkVersion'],
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/order/NewOrderPage'),
    },
    {
        name: 'OrderBill',
        pattern: '/:tableId/order-bill',
        middleware: ['checkVersion'],
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/order-bill/OrderBillPage'),
    },
    {
        name: 'transferBill',
        pattern: '/:tableId/transfer-bill',
        page: () => import(/* webpackChunkName: "todo-list" */ './pages/order-bill/transfer-bill/TransferBillPage'),
    },
    {
        name: 'splitBill',
        pattern: '/:tableId/split-bill',
        middleware: ['checkVersion'],
        page: () => import(/* webpackChunkName: "split-bill" */ './pages/order-bill/split-bill/SplitBillPage'),
    },
    {
        name: 'serviceStation',
        pattern: '/service-station',
        middleware: ['checkVersion'],
        page: () => import(/* webpackChunkName: "split-bill" */ './pages/service-station/ServiceStationPage'),
    },
    {
        name: 'notFound',
        pattern: '/not-found'
    }
];