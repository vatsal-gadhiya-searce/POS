import JsonParser from "../utils/JsonParser";
import Course from "./Course";
import ProductModifier from "./ProductModifier";

export default class ProductOrder {

    IdOperationType = 0;
    IdCombination = null;
    Quantity = 0;
    Round = 0;
    StatusType = 0;
    Note = null;
    IsOnHold = false;
    IsComboProduct = false;
    Id = 0;
    IdProduct = 0;
    DisplayOrder = 0;
    Name = '';
    Price = 0;
    HasModifiers = false;
    ShowModifiers = false;
    OutOfStock = false;
    ProductModifiers = [];
    CurrentCourse = [];
    IsOpenPrice = false;

    createFromJson(json) {
        this.Id = JsonParser.int(json, 'Id');
        this.IdCombination = JsonParser.int(json, 'IdCombination');
        this.Quantity = JsonParser.int(json, 'Quantity');
        this.Round = JsonParser.int(json, 'Round');
        this.StatusType = JsonParser.int(json, 'StatusType');
        this.Note = JsonParser.string(json, 'Note');
        this.IdOperationType = JsonParser.int(json, 'IdOperationType');
        this.IdProduct = JsonParser.int(json, 'IdProduct');
        this.IsOnHold = JsonParser.bool(json, 'IsOnHold');
        this.IsComboProduct = JsonParser.bool(json, 'IsComboProduct');
        this.DisplayOrder = JsonParser.int(json, 'DisplayOrder');
        this.Name = JsonParser.string(json, 'Name');
        this.Price = JsonParser.float(json, 'Price');
        this.HasModifiers = JsonParser.bool(json, 'HasModifiers');
        this.ShowModifiers = JsonParser.bool(json, 'ShowModifiers');
        this.OutOfStock = JsonParser.bool(json, 'OutOfStock');
        this.IsOpenPrice = JsonParser.bool(json, 'IsOpenPrice');
        this.ProductModifiers = JsonParser.array(json, 'ProductModifiers').map(ProductModifier.createFromJson);
        this.CurrentCourse = Course.createFromJson(JsonParser.array(json, 'CurrentCourse'));
    }

    addProduct(product) {
        this.Id = 0;
        this.IdCombination = product.IdCombination ? product.IdCombination : 0;
        this.Quantity = 1;
        this.Round = product.Round ? product.Round : 0;
        this.StatusType = 0;
        this.Note = '';
        this.IdOperationType = 1;
        this.IdProduct = product.Id ? product.Id : 0;
        this.IsOnHold = product.IsOnHold ? product.IsOnHold : false;
        this.IsComboProduct = product.IsComboProduct ? product.IsComboProduct : false;
        this.DisplayOrder = product.DisplayOrder ? product.DisplayOrder : 0;
        this.Name = product.Name ? product.Name : '';
        this.Price = product.Price ? product.Price : 0;
        this.HasModifiers = product.HasModifiers ? product.HasModifiers : false;
        this.ShowModifiers = product.ShowModifiers ? product.ShowModifiers : false;
        this.OutOfStock = product.OutOfStock ? product.OutOfStock : false;
        this.IsOpenPrice = product.IsOpenPrice ? product.IsOpenPrice : false;
        this.ProductModifiers = [];
        this.CurrentCourse = product.CurrentCourse ? product.CurrentCourse : [];
    }

    static createFromJson(json) {
        const productOrder = new ProductOrder();
        productOrder.createFromJson(json);
        return productOrder;
    }

    static addProduct(product){
        const newProduct = new ProductOrder();
        newProduct.addProduct(product);
        return newProduct;
    }
}


