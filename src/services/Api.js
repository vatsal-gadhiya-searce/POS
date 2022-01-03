import Floor from "../models/Floor";
import AppConfig from "../AppConfig";
import {computed} from "mobx";
import Networking from "../utils/Networking";
import Order from "../models/Order";

export default class Api {
    rootStore = null;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @computed
    get apiUrl() {
        return AppConfig.API_URL;
    }

    getLayout() {
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {
                        Id: 1,
                        FloorName: 'Ground',
                        DisplayOrder: 1,
                        LineElements: '',
                        PrinterName: 1,
                        LayoutObjects: [
                            {
                                Id: 1,
                                BlockTime: false,
                                Height: 100,
                                IdBillPrinter: 1,
                                IdFloor: 1,
                                Lock: null,
                                PositionLeft: 200,
                                PositionTop: 200,
                                Reserved: false,
                                Shape: 1,
                                TableName: 'Default',
                                TemporaryName: 'Default temp',
                                Width: 200,
                                Capacity: 2,
                                IdOperationType: 0,
                            },
                            {
                                Id: 2,
                                BlockTime: false,
                                Height: 100,
                                IdBillPrinter: 1,
                                IdFloor: 1,
                                Lock: null,
                                PositionLeft: 400,
                                PositionTop: 400,
                                Reserved: false,
                                Shape: 1,
                                TableName: 'Table 1',
                                TemporaryName: 'Default temp',
                                Width: 200,
                                Capacity: 2,
                                IdOperationType: 0,
                            }
                        ],
                    },
                ]);
            }, 300);
        });
        return myPromise.then((data) => {
            return data.map(Floor.createFromJson);
        });
    }

    getObjectStatus() {
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {
                        IdObject: 1,
                        SittingPersons: 4,
                        TableColoring: {
                            FillColor: 'RED',
                            TextColor: 'White',
                            OutlineColor: 'Black',
                        },
                        ActivationTime: '2021-10-03 11:00:00 AM'
                    },
                    {
                        IdObject: 2,
                        SittingPersons: 4,
                        TableColoring: {
                            FillColor: 'GREEN',
                            TextColor: 'White',
                            OutlineColor: 'Black',
                        },
                        ActivationTime: '2021-10-03 10:00:00 AM'
                    },
                ]);
            }, 300);
        });
        return myPromise.then((data) => {
            return data;
        });
//        return Networking.get(this.apiUrl + 'v2/administration/layout/status').then((data) => {
//            return data;
//        });
    }

    postLayout(data) {
        return Networking.post(this.apiUrl + 'v2/administration/layout', data).then((data) => {
            return data.map(Floor.createFromJson);
        });
    }

    getOrder(tableId) {
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([{
                    Id: 1,
                    IdTable: 1,
                    OperationType:0,
                    TypeDiscount: "0",
                    SittingPersons:  4,
                    Discount: 0,
                    CurrentCourse: [],
                    Note: null,
                    AvailableTableSufixes: [],
                    OrderedProducts: [],
                    CustomerName: null,
                    TableSufix: '',
                }]);
            }, 300);
        });
        return myPromise.then((data) => {
            return Array.isArray(data) ? data.map(Order.createFromJson) : Order.createFromJson(data);
        });

//        return Networking.get(this.apiUrl + 'v2/order/table/'+tableId).then((data) => {
//            return Array.isArray(data) ? data.map(Order.createFromJson) : Order.createFromJson(data);
//        });
    }

    getOrderWithSuffix(tableId, suffix) {
            return Networking.get(this.apiUrl + 'v2/order/table/'+tableId+'/sufix/'+suffix).then((data) => {
            return data
        });
    }

    postOrder(data) {
        return Networking.post(this.apiUrl + 'v2/order', data).then((data) => {
            return Array.isArray(data) ? data.map(Order.createFromJson) : Order.createFromJson(data);
        });
    }

    postAddBill(bill) {
        return Networking.get(this.apiUrl + '/v2/bill',bill).then((data) => {
            return data
        });
    }
}