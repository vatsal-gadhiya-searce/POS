import JsonParser from "../utils/JsonParser";
import Payment from "./Payment";
import Order from "./Order";

export default class Bill {

    Id = 0;
    Order = {};
    Payments = [];
    IdTableDestination = 0;
    IdTableSuffixDestination = '';

    createFromJson(json) {
        this.Id = JsonParser.int(json, 'Id');
        this.Order = Order.createFromJson(JsonParser.array(json, 'Order'));
        this.Payments = Payment.createFromJson(JsonParser.array(json, 'Payments'));
        this.IdTableDestination = JsonParser.int(json, 'IdTableDestination');
        this.IdTableSuffixDestination = JsonParser.string(json, 'IdTableSuffixDestination');
    }

    addBill(){
        this.Id = Math.round(Math.random()*200);
        this.Order = { OrderedProducts : []};
        this.Payments = [];
        this.IdTableDestination = 0;
        this.IdTableSuffixDestination = 0;

    }

    static createFromJson(json) {
        const bill = new Bill();
        bill.createFromJson(json);
        return bill;
    }

    static addBill() {
        const bill = new Bill();
        bill.addBill();
        return bill;
    }

}