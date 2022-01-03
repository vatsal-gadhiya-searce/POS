import JsonParser from "../utils/JsonParser";
import ProductOrder from "./ProductOrder";
import Course from "./Course";

export default class Order {

    Id = 0;
    IdTable = 0;
    OperationType = 0;
    TypeDiscount = "0";
    SittingPersons = 0;
    Discount = 0;
    CurrentCourse = [];
    Note = null;
    AvailableTableSufixes = [];
    OrderedProducts = [];
    CustomerName = null;
    TableSufix = '';

    createFromJson(json) {
        this.Id = JsonParser.int(json,'Id');
        this.TableSufix = JsonParser.string(json, 'TableSufix');
        this.IdTable = JsonParser.int(json, 'IdTable');
        this.OperationType = JsonParser.int(json, 'OperationType');
        this.SittingPersons = JsonParser.int(json, 'SittingPersons');
        this.TypeDiscount = JsonParser.string(json, 'TypeDiscount');
        this.Note = JsonParser.string(json, 'Note');
        this.CustomerName = JsonParser.string(json, 'CustomerName');
        this.Discount = JsonParser.float(json, 'Discount');
        this.CurrentCourse = Course.createFromJson(JsonParser.array(json, 'CurrentCourse'));
        this.OrderedProducts = JsonParser.array(json, 'OrderedProducts').map(ProductOrder.createFromJson);
        this.AvailableTableSufixes = JsonParser.array(json, 'AvailableTableSufixes');
    }

    static createFromJson(json) {
        const order = new Order();
        order.createFromJson(json);
        return order;
    }
}